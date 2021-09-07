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

    if (sOUser.summaryValue && sOUser.opinionValue) {
      db.query(`UPDATE posts
       SET summary=$1, opinion=$2
       WHERE id=$3;`, [sOUser.summaryValue, sOUser.opinionValue, sOUser.id])
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
    } else if (sOUser.summaryValue) {
      db.query(`UPDATE posts
       SET summary=$1
       WHERE id=$2;`, [sOUser.summaryValue, sOUser.id])
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

    } else if (sOUser.opinionValue) {
      db.query(`UPDATE posts
       SET opinion=$1
       WHERE id=$2;`, [sOUser.opinionValue, sOUser.id])
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

    }

    
  });


  return router;
};


