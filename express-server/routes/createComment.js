const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;

// createComment, body {
//   commentUser: {
//     id: '1',
//     commentValue: 'sdfgh',
//     user: {
//       id: 10,
//       name: 'f',
//       email: 'f@1',
//       password: '$2b$10$tG.2HXUHYxP6iFSaNKKpCuRP5rSRwKs2.eUbxSiYnz/qnGIQONCWi'
//     }
//   }
// }
module.exports = (db) => {
  
  const checkCommentUnlocks = (user) => {
      let badgeToAdd;
      if (user.comment_count === 25) {
        badgeToAdd = 11;
      } else if (user.comment_count === 10) {
        badgeToAdd = 10;
      } else if (user.comment_count === 5) {
        badgeToAdd = 9;
      } else if (user.comment_count === 1) {
        badgeToAdd = 8;
      }
        
      const query = {
            text: `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)`,
            values: [user.id, badgeToAdd]
        }

      if (badgeToAdd) {
        return db.query(query)
            .then(result => result.rows)
            .catch(err => err);
      }
    };
  
  router.post("/", (req, res) => {
    console.log("createComment, body", req.body);
    const {id, commentValue, user} = req.body.commentUser;


    db.query(`INSERT INTO comments (user_id, post_id, message)
    VALUES ($1, $2, $3) RETURNING *;`, [user.id, id, commentValue])
      .then(data => {
        //Update user stats
          db.query(`UPDATE users SET comment_count = comment_count + 1
                    WHERE users.id = $1 RETURNING *;`, [user.id])
            .then(data => {
              let badgeCheckUser =  data.rows[0];
              checkCommentUnlocks(badgeCheckUser);
        // res.redirect("/api");
        // return res.status(200)
        
        return res.status(200).send("OK");

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
