// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Produkte-Seite
router.get("/", (req, res) => {
  // Hier könntest du die Produkte aus der Datenbank abrufen
  Product.findAll() // oder eine andere Methode, um Produkte abzurufen
    .then((products) => {
      res.render("products", { products: products });
    })
    .catch((err) => {
      console.error("Fehler beim Abrufen der Produkte:", err);
      res.status(500).send("Interner Serverfehler");
    });
});

// Details zu einem Produkt
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (product) {
      res.render("productDetail", { product });
    } else {
      res.status(404).send("Produkt nicht gefunden");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Produkts:", error);
    res.status(500).send("Ein Fehler ist aufgetreten");
  }
});

module.exports = router;
