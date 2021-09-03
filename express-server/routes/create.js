const express = require('express');
const router  = express.Router();
const axios =  require('axios');

module.exports = (db) => {
  
  router.post("/", (req, res) => {
    const post = req.body;

    //First check if book already exists in books table
    db.query(`SELECT books.id FROM books WHERE books.title = $1 AND books.author = $2;`, [post.title, post.author])
      .then(data => {
        //If it does grab the book_id and create a new post
        if (data.rowCount === 1) {
          let bookId = data.rows[0].id
          db.query(`INSERT INTO posts (user_id, book_id, summary, opinion)
                    VALUES ($1, $2, $3, $4) RETURNING posts.id;`, [post.user_id, bookId, post.summary, post.opinion])
            .then(data => {
              res.json(data);
            })  
        // If it doesn't, first create the book, then create the post using that book_id
        } else {
          //Get category id for genre
          db.query(`SELECT id FROM categories WHERE topic = $1`, [post.genre])
            .then(data => {
              let categoryId = data.rows[0].id;
              //Try to find book on google books api, return pages and cover image if found
              axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${post.title}+inauthor:${post.author}&country=CA`)
                .then(data => {
                  if (data.data.items) {
                    //Create the new book with associated category id and pages/cover image from api
                    let cover_url = data.data.items[0].volumeInfo.imageLinks.thumbnail;
                    let book_pages = data.data.items[0].volumeInfo.pageCount;
                    db.query(`INSERT INTO books (category_id, title, author, pages, cover_url)
                            VALUES ($1, $2, $3, $4, $5) RETURNING books.id;`, [categoryId, post.title, post.author, book_pages, cover_url])
                    .then(data => {
                      let bookId = data.rows[0].id
                      db.query(`UPDATE users SET post_count = post_count + 1, page_count = page_count + $1
                                WHERE users.id = $2 RETURNING *;`, [book_pages, post.user_id])
                      .then(data => {
                        console.log("After update post count:", data.rows[0]);
                      //Create the new post
                        db.query(`INSERT INTO posts (user_id, book_id, summary, opinion)
                                  VALUES ($1, $2, $3, $4) RETURNING posts.id;`, [post.user_id, bookId, post.summary, post.opinion])
                          .then(data => {
                            res.json(data);
                          })
                      })
                    })
                  } else {
                    //Create the new book with associated category id using default page/image data
                    db.query(`INSERT INTO books (category_id, title, author)
                            VALUES ($1, $2, $3) RETURNING books.id;`, [categoryId, post.title, post.author])
                            .then(data => {
                      let bookId = data.rows[0].id
                      db.query(`UPDATE users SET post_count = post_count + 1
                                WHERE users.id = $1;`, [post.user_id])
                      .then(data => {
                      //Create the new post 
                      db.query(`INSERT INTO posts (user_id, book_id, summary, opinion)
                                VALUES ($1, $2, $3, $4) RETURNING posts.id;`, [post.user_id, bookId, post.summary, post.opinion])
                        .then(data => {
                          res.json(data);
                        })
                      })
                    })
                  }
                })  
              })  
            }      
          })
        
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};