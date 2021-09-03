const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  
  
  router.post("/", (req, res) => {
    const profile = req.body;
    db.query(`UPDATE users SET active_badge = $1
              WHERE users.id = $2 RETURNING *;`, [profile.set_badge, profile.id])
      .then(data => {
        console.log("DATA:", data);
        res.json(data);
      })
  });


  return router;
};
