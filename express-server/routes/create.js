const express = require('express');
const router  = express.Router();

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
              //Create the new book with associated category id
              db.query(`INSERT INTO books (category_id, title, author)
                        VALUES ($1, $2, $3) RETURNING books.id;`, [categoryId, post.title, post.author])
                .then(data => {
                  let bookId = data.rows[0].id
                  db.query(`INSERT INTO posts (user_id, book_id, summary, opinion)
                            VALUES ($1, $2, $3, $4) RETURNING posts.id;`, [post.user_id, bookId, post.summary, post.opinion])
                    .then(data => {
                      res.json(data);
                    })
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