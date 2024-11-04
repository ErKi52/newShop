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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Binde Routen ein
app.use("/", homeRoutes);
app.use("/products", productRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/cart", cartRoutes);
app.use("/productDetail", productDetailRoutes)

// Synchronisiere die Datenbank und lade Produkte von der API
const startServer = async () => {
  try {
    await syncDatabase(); // Synchronisiere die Datenbank
    await fetchAndStoreProducts(); // Lade und speichere Produkte, falls noch nicht vorhanden
  } catch (error) {
    console.error("Fehler beim Starten des Servers:", error);
  }
};

// Starte den Server
startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
