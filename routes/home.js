const express = require("express");
const router = express.Router();

// Home-Seite
router.get("/", (req, res) => {
  console.log("GET request for the home page");
  res.render("index");
});

module.exports = router;
