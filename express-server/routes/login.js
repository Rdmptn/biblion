const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.post("/", (req, res) => {
    // const { email, password } = req.query;
    const body = req.body;

    db.query(`SELECT * FROM users WHERE email = $1;`, [body.email])

      .then((data) => {
        const user = data.rows[0];
        if (!user) res.json({ error: "Email not found." });

        // if (user && bcrypt.compareSync(password, user.password)) {
        if (user && body.password === user.password) {
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
