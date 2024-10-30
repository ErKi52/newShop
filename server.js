const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy-Daten für Produkte
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
];

// Hauptseite
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route für Produkte
app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
