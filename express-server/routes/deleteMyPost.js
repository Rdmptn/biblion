const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');



// router.post("/", (req, res) => {
//     console.log("register, body", req.body);
//     const body = req.body;

    
    
//   });


// module.exports = router;




module.exports = (db) => {
  
  // router.get("/:id", (req, res) => {
  //   // console.log("register, body", req.body);
  //   const body = req.params;
  //   console.log("userPosts", body);


  //   db.query(`SELECT posts.id, posts.summary, posts.opinion, books.title, books.author, books.cover_url, categories.topic 
  //   FROM posts JOIN books ON posts.book_id=books.id 
  //   JOIN categories ON books.category_id=categories.id 
  //   WHERE posts.id = $1;`, [body.id])
  //     .then(data => {
  //       console.log(data.rows[0]);
  //       // req.session.user_id = data.rows[0].id;
  //       // res.redirect("/api");
  //       const post = data.rows[0];
  //       return res.status(200).send({ post })


  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });


  router.post("/", (req, res) => {
    // console.log("createComment, body", req.body);
    const postId = req.body;
    console.log("<<<<<<<deletepost", req.body);

    db.query(`DELETE FROM posts WHERE id=$1`, [postId.id])
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


// DELETE FROM table_name
// WHERE condition;