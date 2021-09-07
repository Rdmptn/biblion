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
    // console.log("createComment, body", req.body);
    const sOUser = req.body;
    console.log("<<<<<<<", req.body);

   
      db.query(`UPDATE posts
       SET summary=$1, opinion=$2
       WHERE id=$3;`, [sOUser.summary, sOUser.opinion, sOUser.id])
        .then(data => {
          //Update user stats
            
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


