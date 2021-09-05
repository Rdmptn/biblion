const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;




module.exports = (db) => {
  
  router.get("/", (req, res) => {
    // console.log("register, body", req.body);
    // const body = req.params;
    // console.log("userPosts", body);



    db.query(`SELECT users.name, posts.id, posts.summary, posts.opinion, books.title, books.author, books.cover_url, categories.topic, badges.image
              FROM users JOIN posts on users.id = posts.user_id 
              JOIN books ON posts.book_id=books.id 
              JOIN categories ON books.category_id=categories.id
              JOIN badges ON badges.id = users.active_badge ;`)
      .then(data => {
        // console.log(data.rows[0]);
        // req.session.user_id = data.rows[0].id;
        // res.redirect("/api");
        const posts = data.rows
        console.log("POSTSSSS:", posts);
        return res.status(200).send({ posts })


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

 // JOIN comments ON comments.post_id = posts.id
              // JOIN likes ON likes.post_id = posts.id

// , count(comments.id) AS comments, count(likes.id) AS likes


// SELECT * FROM posts WHERE user_id = $1;
// (`SELECT * FROM posts WHERE user_id = $1;`, [body.id])