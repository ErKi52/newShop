const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

const desiredCategory = "electronics";

// Home-Seite
router.get("/", async (req, res) => {
  console.log("GET request for the home page");

  try {
    // Hole alle Produkte mit Bild-URLs
    const products = await Product.findAll({
      where: { category: desiredCategory },
      attributes: ["image"],
      raw: true, // Gibt nur die Rohdaten zurück, kein Sequelize-Objekt
    });

    // Extrahiere die Bild-URLs
    const images = products.map((product) => product.image).filter(Boolean);

    // Wähle zufällig 10 Bilder aus
    const shuffled = images.sort(() => 0.5 - Math.random());
    const selectedImages = shuffled.slice(0, 10);

    // Render die View mit den ausgewählten Bildern
    res.render("index", { images: selectedImages });
  } catch (error) {
    console.error("Fehler beim Abrufen der Bilder:", error);
    res.status(500).send("Fehler beim Abrufen der Bilder");
  }
});

module.exports = router;
