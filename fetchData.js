// Es werden Produkte von der API abgerufen.
// Diese werden in die DB gespeichert

const axios = require("axios");
const sequelize = require("./config/database");
const Product = require("./models/Product");

// Funktion zum Abrufen und Speichern von Daten
async function fetchAndStoreProducts() {
  try {
    // Überprüfe, ob Produkte bereits in der Datenbank vorhanden sind
    const productCount = await Product.count();

    if (productCount > 0) {
      console.log(
        "Produkte sind bereits in der Datenbank vorhanden. API-Import übersprungen."
      );
      return; // Die Funktion wird beendet, wenn bereits Produkte vorhanden sind
    }

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
      });
    }

    console.log("Produkte wurden erfolgreich in die Datenbank gespeichert.");
  } catch (error) {
    console.error("Fehler beim Abrufen der Produkte:", error);
  }
}

// Aufruf der Funktion
module.exports = fetchAndStoreProducts;
