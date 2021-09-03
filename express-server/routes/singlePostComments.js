const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;




module.exports = (db) => {
  
  router.get("/:id", (req, res) => {
    // console.log("register, body", req.body);
    const body = req.params;


    db.query(`SELECT comments.id, comments.message 
    FROM posts JOIN comments ON posts.id=comments.post_id 
    WHERE posts.id = $1;`, [body.id])
      .then(data => {
        console.log(data.rows[0]);
        // req.session.user_id = data.rows[0].id;
        // res.redirect("/api");
        const comments = data.rows
        return res.status(200).send({ comments })


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