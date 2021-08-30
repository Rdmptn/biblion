const express = require('express');
const router  = express.Router();



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;




module.exports = (db) => {
  
  router.post("/", (req, res) => {
    console.log("register, body", req.body);
    const body = req.body;


    db.query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;`, [body.name, body.email, body.password])
      .then(data => {
        // res.cookie("user_id", data.rows[0].id);
        // res.redirect("/api");

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
