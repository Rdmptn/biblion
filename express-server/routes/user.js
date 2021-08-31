const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;




module.exports = (db) => {
  
  router.get("/current", (req, res) => {
    const user_id = req.session["user_id"];
    res.status(200).send(`${req.session["user_id"]}`);
  });


  return router;
};
