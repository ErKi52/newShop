const express = require("express");
const router = express.Router();

// Warenkorb-Seite
router.get("/", (req, res) => {
  res.render("cart");
});

module.exports = router;
