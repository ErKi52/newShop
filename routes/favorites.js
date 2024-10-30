const express = require("express");
const router = express.Router();

const favorites = [
  { id: 1, name: "Favorit 1", price: 15 },
  { id: 2, name: "Favorit 2", price: 25 },
];

router.get("/", (req, res) => {
  res.render("favorites", { favorites });
});

module.exports = router;
