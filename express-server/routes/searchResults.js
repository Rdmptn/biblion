const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  
  router.post("/", (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    const searchTerm = Object.keys(obj)[0].toLowerCase();
    const noResults = {message: "No results found!"};
    let posts = [];

    //First check if book already exists in books table
    db.query(`SELECT books.id FROM books WHERE LOWER(books.title) LIKE $1 OR LOWER(books.author) LIKE $1;`, ['%' + searchTerm + '%'])
      .then(data => {
        //If it does grab all matching book ids and search for any posts with them
        if (data.rowCount > 0) {
          let results = data.rows;
          for (let result of results) {
            let book_id = result.id;
            db.query(`SELECT posts.id FROM posts WHERE posts.book_id = $1;`, [book_id])
              .then(data => {
                let postResults = data.rows;
                for (let postResult of postResults) {
                  let post_id = postResult.id;
                  // db.query(`SELECT * FROM posts WHERE posts.id = $1;`, [post_id])
                  db.query(`SELECT posts.summary, posts.opinion, books.title, books.author, categories.topic 
                            FROM posts JOIN books ON posts.book_id=books.id 
                            JOIN categories ON books.category_id=categories.id 
                            WHERE posts.id = $1;`, [post_id])
                    .then(data => {
                      let thisPost = data.rows[0];
                      posts.push(thisPost);
                      if (results[results.length-1] === result && postResults[postResults.length-1] === postResult) { 
                        res.json(posts)
                      }
                    })
                }
              })  
          }
        // If it doesn't, display a message
        } else {
          res.json(noResults);
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