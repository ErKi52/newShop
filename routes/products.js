// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { Op } = require("sequelize");

// Produkte-Seite mit Filteroptionen
router.get("/", async (req, res) => {
  // Filter-Parameter aus der URL (z.B. ?category=Electronics)
  const { category, minPrice, maxPrice, sort } = req.query;

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

  // Sortier-Optionen
  let order = [];
  if (sort === "asc") {
    order = [["price", "ASC"]]; // Preis aufsteigend
  } else if (sort === "desc") {
    order = [["price", "DESC"]]; // Preis absteigend
  }

  // Konsolenausgabe zur Überprüfung der Filterbedingungen
  /* console.log("Filter-Bedingungen:", filter); */

  try {
    // Produkte aus der Datenbank abrufen, basierend auf den Filtern
    const products = await Product.findAll({ where: filter, order: order }); // Nutzung des Filter-Objekts in der Abfrage

    // Übergebe alle relevanten Parameter an die View
    res.render("products", {
      products: products,
      category: category, // Gibt die aktuelle Kategorie zurück, damit das Dropdown korrekt angezeigt wird
      minPrice: minPrice,
      maxPrice: maxPrice,
      sort: sort, // Gibt den aktuellen Sortierungswert zurück
    });
  } catch (err) {
    console.error("Fehler beim Abrufen der Produkte:", err);
    res.status(500).send("Interner Serverfehler");
  }
});

// Reset der Filter-Parameter
router.get("/reset", async (req, res) => {
  // Leere Filter-Objekte, keine Filter oder Sortierungen
  const filter = {};
  let order = [];

  try {
    // Produkte aus der Datenbank abrufen ohne Filter und Sortierung
    const products = await Product.findAll({ where: filter, order: order });

    // Weiterleitung auf die Standard-Produktseite ohne Filter
    res.redirect("/products"); // Diese Zeile lädt die Seite ohne Filter und Sortierung neu
  } catch (err) {
    console.error("Fehler beim Zurücksetzen der Filter:", err);
    res.status(500).send("Interner Serverfehler");
  }
});

module.exports = router;
