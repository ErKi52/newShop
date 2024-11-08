// Express-Server wird gestartet, der verschiedene Routen und eine Datenbankverbindung einrichtet

const express = require("express");
const path = require("path");
const productRoutes = require("./routes/products");
const favoritesRoutes = require("./routes/favorites");
const homeRoutes = require("./routes/home");
const cartRoutes = require("./routes/cart");
const productDetailRoutes = require("./routes/productDetail");
const sequelize = require("./config/database");
const syncDatabase = require("./config/syncDatabase");
const fetchAndStoreProducts = require("./fetchData");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views")); //  ist eine Variable, die das aktuelle Verzeichnis der Datei angibt, in der der Code ausgeführt wird.
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Einbindung der Routen
app.use("/", homeRoutes);
app.use("/products", productRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/cart", cartRoutes);
app.use("/productDetail", productDetailRoutes);

// Synchronisiert die Datenbank und ladet Produkte von der API
const startServer = async () => {
  try {
    await syncDatabase(); // Synchronisiere die Datenbank
    await fetchAndStoreProducts(); // Lade und speichere Produkte, falls noch nicht vorhanden
  } catch (error) {
    console.error("Fehler beim Starten des Servers:", error);
  }
};

// Startet den Server
startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
