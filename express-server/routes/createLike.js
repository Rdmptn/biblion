const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


module.exports = (db) => {
  
  router.post("/", (req, res) => {
    console.log("createLike, body", req.body);
    
    // 
    const id = req.body.id;
    const user_id = req.body.user.id;

    db.query(`INSERT INTO likes (user_id, post_id)
    VALUES ($1, $2) RETURNING *;`, [user_id, id])
      .then(data => {
        console.log(data.rows[0]);
        // res.redirect("/api");
        // return res.status(200)
        
        return res.status(200).send("OK");


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
