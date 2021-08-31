const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const body = req.body;
    const password = body.password; 
    // const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])

      .then((data) => {
        const user = data.rows[0];
        if (!user) res.json({ error: "Email not found." });

        if (user && bcrypt.compareSync(password, user.password)) {
        // if (user && hashedPassword === user.password) {
          res.json(user);
        } else {
          //invalid password
          res.json({ error: "Incorrect password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: err.message });
      });
  });

  return router;
};
