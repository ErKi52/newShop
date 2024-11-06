// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { Op } = require("sequelize");

// Produkte-Seite mit Filteroptionen
router.get("/", async (req, res) => {
  // Filter-Parameter aus der URL (z.B. ?category=Electronics)
  const { category, minPrice, maxPrice } = req.query;

  // Filter-Objekt für die Datenbankabfrage
  let filter = {};

  // Kategorie-Filter hinzufügen, falls Kategorie gesetzt ist
  if (category) {
    filter.category = category; // Sicherstellen, dass die Kategorie korrekt zugeordnet wird
  }

  // Preisfilter hinzufügen, falls minPrice oder maxPrice gesetzt sind
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price[Op.gte] = parseFloat(minPrice); // Mindestpreis
    if (maxPrice) filter.price[Op.lte] = parseFloat(maxPrice); // Höchstpreis
  }

  // Konsolenausgabe zur Überprüfung der Filterbedingungen
  // console.log("Filter-Bedingungen:", filter);

  try {
    // Produkte aus der Datenbank abrufen, basierend auf den Filtern
    const products = await Product.findAll({ where: filter }); // Nutzung des Filter-Objekts in der Abfrage

    res.render("products", { products: products });
  } catch (err) {
    // Detaillierte Fehlerausgabe, um zu verstehen, was schief geht
    console.error("Fehler beim Abrufen der Produkte:", err);
    res.status(500).send("Interner Serverfehler");
  }
});

module.exports = router;
