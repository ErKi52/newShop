const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Setze den EJS-Pfad und die Template-Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware für statische Dateien
app.use(express.static(path.join(__dirname, "public")));

// Dummy-Daten für Favoriten (Erstelle diese, wenn du noch keine echte Logik hast)
const favorites = [
  { id: 1, name: "Favorit 1", price: 15 },
  { id: 2, name: "Favorit 2", price: 25 },
];

app.get("/", (req, res) => {
  console.log("GET request for the home page");
  res.render("index"); // rendere index.ejs
});

// Produkte-Seite
app.get("/products", (req, res) => {
  // Hier könntest du die Produkte aus deiner Datenbank oder API holen
  const products = [
    { id: 1, name: "Produkt 1", price: 10 },
    { id: 2, name: "Produkt 2", price: 20 },
  ];
  res.render("products", { products: products });
});

// Hauptseite
app.get("/", (req, res) => {
  res.render("index");
});

// Produkte-Seite
app.get("/products", (req, res) => {
  res.render("products", { products: products });
});

// Favoriten-Seite
app.get("/favorites", (req, res) => {
  res.render("favorites", { favorites: favorites }); // 'favorites' ist das Array von Favoriten
});

// Warenkorb-Seite
app.get("/cart", (req, res) => {
  res.render("cart");
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id == productId);
  res.render("productDetail", { product: product });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
