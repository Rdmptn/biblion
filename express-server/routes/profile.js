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
    console.log("userPosts", body);


    db.query(`SELECT * FROM users WHERE id = $1;`, [body.id])
      .then(data => {
        const profile = data.rows[0];
        const active_badge = profile.active_badge;
        db.query(`SELECT image FROM badges WHERE id = $1;`, [active_badge])
        .then(data => {
          profile.image = data.rows[0].image;
          db.query(`SELECT * FROM badges 
                    JOIN user_badges ON badges.id = user_badges.badge_id
                    WHERE user_id = $1;`, [body.id])
          .then(data => {
            profile.unlocked_badges = data.rows;
            return res.status(200).send({ profile })
          })
        })
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