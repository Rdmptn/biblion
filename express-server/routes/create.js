const express = require('express');
const router  = express.Router();
const axios =  require('axios');



module.exports = (db) => {
  
  const badgeChecker = (data) => {
    let checkUser = data.rows[0];
    checkPostUnlocks(checkUser);
    checkPageUnlocks(checkUser);
  }
  
  const checkPostUnlocks = (user) => {
      let badgeToAdd;
      if (user.post_count === 10) {
        badgeToAdd = 4;
      } else if (user.post_count === 5) {
        badgeToAdd = 3;
      } else if (user.post_count === 1) {
        badgeToAdd = 2;
      }
        
      const query = {
            text: `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)`,
            values: [user.id, badgeToAdd]
        }

      if (badgeToAdd) {
        return db.query(query)
            .then(result => result.rows)
            .catch(err => err);
      }
    };
    
    const checkPageUnlocks = (user) => {
      let badgeToAdd;
      if (user.page_count >= 10000) {
        badgeToAdd = 7;
      } else if (user.page_count >= 5000) {
        badgeToAdd = 6;
      } else if (user.page_count >= 1000) {
        badgeToAdd = 5;
      }
        
      const query = {
            text: `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)`,
            values: [user.id, badgeToAdd]
        }

      if (badgeToAdd) {
        return db.query(query)
            .then(result => result.rows)
            .catch(err => err);
      }
    };
  
  router.post("/", (req, res) => {
    const post = req.body;

    //First check if book already exists in books table
    db.query(`SELECT books.id, books.pages FROM books WHERE books.title = $1 AND books.author = $2;`, [post.title, post.author])
      .then(data => {
        //If it does grab the book_id and create a new post
        if (data.rowCount === 1) {
          let bookId = data.rows[0].id
          let pages = data.rows[0].pages
          //Update user stats
          db.query(`UPDATE users SET post_count = post_count + 1, page_count = page_count + $1
                    WHERE users.id = $2 RETURNING *;`, [pages, post.user_id])
          .then(data => {
            badgeChecker(data);
            db.query(`INSERT INTO posts (user_id, book_id, summary, opinion)
                      VALUES ($1, $2, $3, $4) RETURNING posts.id;`, [post.user_id, bookId, post.summary, post.opinion])
              .then(data => {
                res.json(data);
              })  
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
                    if (data.data.items[0].volumeInfo.imageLinks && data.data.items[0].volumeInfo.pageCount) {
                      //Create the new book with associated category id and pages/cover image from api
                      let cover_url = data.data.items[0].volumeInfo.imageLinks.thumbnail;
                      let book_pages = data.data.items[0].volumeInfo.pageCount;
                      db.query(`INSERT INTO books (category_id, title, author, pages, cover_url)
                              VALUES ($1, $2, $3, $4, $5) RETURNING books.id;`, [categoryId, post.title, post.author, book_pages, cover_url])
                      .then(data => {
                        let bookId = data.rows[0].id
                        //Update user stats
                        db.query(`UPDATE users SET post_count = post_count + 1, page_count = page_count + $1
                                  WHERE users.id = $2 RETURNING *;`, [book_pages, post.user_id])
                        .then(data => {
                          badgeChecker(data);
                        //Create the new post
                          db.query(`INSERT INTO posts (user_id, book_id, summary, opinion)
                                    VALUES ($1, $2, $3, $4) RETURNING posts.id;`, [post.user_id, bookId, post.summary, post.opinion])
                            .then(data => {
                              res.json(data);
                            })
                        })
                      })
                    } 
                  } else {
                    //Create the new book with associated category id using default page/image data
                    db.query(`INSERT INTO books (category_id, title, author)
                            VALUES ($1, $2, $3) RETURNING books.id;`, [categoryId, post.title, post.author])
                            .then(data => {
                      let bookId = data.rows[0].id
                      //Update user stats
                      db.query(`UPDATE users SET post_count = post_count + 1
                                WHERE users.id = $1 RETURNING *;`, [post.user_id])
                      .then(data => {
                        badgeChecker(data);
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