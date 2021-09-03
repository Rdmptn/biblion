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
  
  router.post("/", (req, res) => {
    console.log("createComment, body", req.body);
    const {id, commentValue, user} = req.body.commentUser;


    db.query(`INSERT INTO comments (user_id, post_id, message)
    VALUES ($1, $2, $3) RETURNING *;`, [user.id, id, commentValue])
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
