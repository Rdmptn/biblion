const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    // req.session = null;
    // clear cookie session
    res.redirect("/");
  });

  return router;
};