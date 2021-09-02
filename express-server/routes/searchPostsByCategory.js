const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');




module.exports = (db) => {
  
  router.get("/:topic", (req, res) => {
    // console.log("register, body", req.body);
    const body = req.params;
    console.log("searchCategoy++++===>>>>>", body);

    db.query(`SELECT posts.summary, posts.opinion, books.title, books.author, books.cover_url, categories.topic 
    FROM posts JOIN books ON posts.book_id=books.id 
    JOIN categories ON books.category_id=categories.id 
    WHERE categories.topic = $1;`, [body.topic])
      .then(data => {
        console.log(data.rows[0]);
        // req.session.user_id = data.rows[0].id;
        // res.redirect("/api");
        const posts = data.rows
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


// SELECT * FROM posts WHERE user_id = $1;
// (`SELECT * FROM posts WHERE user_id = $1;`, [body.id])