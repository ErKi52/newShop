// routes/productDetail.js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// GET Produktdetails
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // Finde das Produkt anhand der ID
    if (product) {
      res.render("productDetail", { product }); // Render die Produktdetailseite
    } else {
      res.status(404).send("Produkt nicht gefunden");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Produkts:", error);
    res.status(500).send("Serverfehler");
  }
});

module.exports = router;
