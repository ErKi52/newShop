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
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      if (product) {
        res.render("productDetail", { product: product });
      } else {
        res.status(404).send("Produkt nicht gefunden");
      }
    })
    .catch((err) => {
      console.error("Fehler beim Abrufen des Produkts:", err);
      res.status(500).send("Interner Serverfehler");
    });
});

module.exports = router;
