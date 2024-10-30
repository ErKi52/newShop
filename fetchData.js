// fetchProducts.js
const axios = require("axios");
const sequelize = require("./config/database"); // Stelle sicher, dass die Datenbankverbindung hier importiert ist
const Product = require("./models/Product");

// Funktion zum Abrufen und Speichern von Daten
async function fetchAndStoreProducts() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    // Speichere die Produkte in der Datenbank
    for (const product of products) {
      await Product.create({
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        // Füge hier weitere Felder hinzu, die du in der DB speichern möchtest
      });
    }

    console.log("Produkte wurden erfolgreich in die Datenbank gespeichert.");
  } catch (error) {
    console.error("Fehler beim Abrufen der Produkte:", error);
  }
}

// Aufruf der Funktion
module.exports = fetchAndStoreProducts;
