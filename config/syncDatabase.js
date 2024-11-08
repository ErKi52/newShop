/* 
die Datenbank wird mit den in Sequelize definierten 
Modellen synchronisiert.
Sie lädt dazu die sequelize-Datenbankverbindung, 
das Product-Modell und eine Funktion fetchAndStoreProducts. 
*/

const sequelize = require("./database");
const Product = require("../models/Product");
const fetchAndStoreProducts = require("../fetchData");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Modelle synchronisiert.");

    await fetchAndStoreProducts();

    /* await Product.create({
      name: "Testprodukt",
      price: 19.99,
      description: "Ein einfaches Testprodukt",
    });
    console.log("Testprodukt hinzugefügt."); */
  } catch (err) {
    console.error("Fehler bei der Synchronisierung der Modelle:", err);
  }
};

module.exports = syncDatabase;
