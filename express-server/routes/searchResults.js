const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  
  router.post("/", (req, res) => {
    const searchTerm = "";
    const posts = [];
    const noResults = {message: "No results found!"};

    //First check if book already exists in books table
    db.query(`SELECT books.id FROM books WHERE books.title = $1 OR books.author = $1;`, [searchTerm])
      .then(data => {
        //If it does grab all matching book ids and search for any posts with them
        if (data.rowCount > 0) {
          let results = data.rows;
          for (let result of results) {
            let book_id = result.id;
            db.query(`SELECT posts.id FROM posts WHERE books.id = $1;`, [book_id])
              .then(data => {
                let postResults = data.rows;
                for (let postResult of postResults) {
                  let post_id = postResult.id;
                  db.query(`SELECT * FROM posts WHERE posts.id = $1;`, [post_id])
                    .then(data => {
                      let thisPost = data.rows[0];
                      posts.push(thisPost);
                    })
                }
              }) 
          }
          res.json({posts})
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