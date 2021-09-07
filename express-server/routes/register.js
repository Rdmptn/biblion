const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  
  router.post("/", (req, res) => {
    const body = req.body;
    const password = body.password; 
    const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(`SELECT users.id FROM users WHERE users.email = $1;`, [body.email])
    .then(data => {
      if(data.rowCount > 0) {
        res.json({ error: "Email address already in use." });
      }  else {
     

      db.query(`INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;`, [body.name, body.email, hashedPassword])
        .then(data => {
          req.session.user_id = data.rows[0].id;
          const user = data.rows[0]
          db.query(`INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2);`, [user.id, 1])
            .then(data => {
            return res.status(200).send({ user })

          })
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ error: err.message });
        });
      }
     });
      
    });


  return router;
};
