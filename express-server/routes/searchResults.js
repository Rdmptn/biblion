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
            db.query(`SELECT posts.id FROM posts WHERE posts.book_id = $1 ORDER BY posts.id DESC;`, [book_id])
              .then(data => {
                let postResults = data.rows;
                for (let postResult of postResults) {
                  let post_id = postResult.id;
                  db.query(`SELECT users.name, posts.id, posts.summary, posts.opinion, books.title, books.author, books.cover_url, categories.topic, badges.image, posts.created_at
                            FROM users JOIN posts on users.id = posts.user_id 
                            JOIN books ON posts.book_id=books.id 
                            JOIN categories ON books.category_id=categories.id
                            JOIN badges ON badges.id = users.active_badge
                            WHERE posts.id = $1;`, [post_id])
                    .then(data => {
                      let thisPost = data.rows[0];
                      posts.push(thisPost);
                      if (results[results.length-1] === result && postResults[postResults.length-1] === postResult) { 
                        console.log("RESULTS:", posts);
                        function compare( a, b ) {
                          if ( a.created_at < b.created_at ){
                            return 1;
                          }
                          if ( a.created_at > b.created_at ){
                            return -1;
                          }
                          return 0;
                        }

                        posts.sort( compare );
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