const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');





module.exports = (db) => {
  
  router.get("/:id", (req, res) => {
    // console.log("register, body", req.body);
    const body = req.params;


    db.query(`SELECT COUNT(*) 
    FROM posts JOIN likes ON posts.id=likes.post_id 
    WHERE posts.id = $1;`, [body.id])
      .then(data => {
        console.log("likesCount", data.rows[0]);
        // req.session.user_id = data.rows[0].id;
        // res.redirect("/api");
        const likesCount = data.rows[0];
        console.log("likesCount++++====", likesCount);
        return res.status(200).send({ likesCount })


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