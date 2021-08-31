const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;




module.exports = (db) => {
  
  router.post("/", (req, res) => {
    console.log("register, body", req.body);
    const body = req.body;
    const password = body.password; 
    const hashedPassword = bcrypt.hashSync(password, 10);


    db.query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;`, [body.name, body.email, hashedPassword])
      .then(data => {
        console.log(data.rows[0]);
        req.session.user_id = data.rows[0].id;
        // res.redirect("/api");
        const user = data.rows[0]
        return res.status(200).send({ user })


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
