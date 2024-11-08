// Express-Router-Route für die Favoriten-Seite

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("favorites");
});

module.exports = router;
