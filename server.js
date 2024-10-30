// server.js
const express = require("express");
const path = require("path");
const productRoutes = require("./routes/products");
const favoritesRoutes = require("./routes/favorites");
const homeRoutes = require("./routes/home");
const cartRoutes = require("./routes/cart");
const sequelize = require("./config/database");
const syncDatabase = require("./config/syncDatabase");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Binde Routen ein
app.use("/", homeRoutes); // Hauptseite
app.use("/products", productRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/cart", cartRoutes); // Warenkorbseite

// Synchronisiere die Datenbank
syncDatabase();

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
