const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  
  router.get("/:id", (req, res) => {
    const body = req.params;
    console.log("userPosts", body);


    db.query(`SELECT users.name, posts.id, posts.summary, posts.opinion, books.title, books.author, books.cover_url, categories.topic, badges.image
    FROM users JOIN posts ON users.id=posts.user_id
    JOIN books ON posts.book_id=books.id 
    JOIN categories ON books.category_id=categories.id 
    JOIN badges ON badges.id = users.active_badge
    WHERE posts.user_id = $1;`, [body.id])
      .then(data => {
        console.log(data.rows[0]);
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
