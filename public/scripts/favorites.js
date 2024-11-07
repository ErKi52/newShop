// puböic/scripts/favorites.js

"use strict";

const addedToFavorites = "added to fav".toUpperCase();
const addToFav = "add to fav".toUpperCase();

// Funktion, um ein Produkt zu den Favoriten hinzuzufügen
window.saveToFavorites = function (button) {
  // Produkt-JSON aus dem data-product Attribut des Buttons holen
  const product = JSON.parse(button.getAttribute("data-product"));

  // Favoriten aus dem localStorage abrufen oder ein leeres Array erstellen
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Prüfen, ob das Produkt bereits in den Favoriten ist
  const isAlreadyFavorited = favorites.some((fav) => fav.id === product.id);

  if (!isAlreadyFavorited) {
    // Produkt zu den Favoriten hinzufügen
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Button deaktivieren und Farbe ändern
    button.disabled = true;
    button.classList.add("disabled"); // Favoritenfarbe anwenden
    button.textContent = addedToFavorites; // Text ändern
  } else {
    // Wenn das Produkt schon in den Favoriten ist, entfernen wir es
    favorites = favorites.filter((fav) => fav.id !== product.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Button wieder aktivieren und Farbe zurücksetzen
    button.disabled = false;
    button.classList.remove("disabled"); // Standardfarbe zurücksetzen
    button.textContent = addToFav; // Text zurücksetzen
  }
};

// Funktion, um den "Merken"-Button zu deaktivieren
function disableButton(button) {
  button.disabled = true; // Button deaktivieren
  button.textContent = addedToFavorites;
}

// Funktion, um den "Merken"-Button zu aktivieren
function enableButton(button) {
  button.disabled = false; // Button aktivieren
  button.textContent = addToFav; // Optional: Text zurücksetzen
}

// Funktion, um den Button beim Laden der Seite zu initialisieren
function initializeFavButton(button) {
  const productId = button.getAttribute("data-product-id");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const isAlreadyFavorited = favorites.some((fav) => fav.id == productId);

  if (isAlreadyFavorited) {
    // Wenn das Produkt in den Favoriten ist, Button deaktivieren und Farbe ändern
    button.disabled = true;
    button.classList.add("disabled");
    button.textContent = addedToFavorites;
  } else {
    // Wenn das Produkt nicht in den Favoriten ist, Button aktiv lassen
    button.disabled = false;
    button.classList.remove("disabled");
    button.textContent = addToFav;
  }
}

// Funktion, um die Favoriten auf der Favoriten-Seite zu laden
function loadFavorites() {
  // Favoriten aus dem localStorage abrufen
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Element auf der Favoriten-Seite finden, wo die Favoriten angezeigt werden
  const favoritesContainer = document.getElementById("favoritesContainer");

  // Prüfen, ob das Element vorhanden ist (um Fehler zu vermeiden)
  if (!favoritesContainer) return;

  // HTML für jeden Favoriten erstellen und zur Seite hinzufügen
  favoritesContainer.innerHTML = "";
  favorites.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.id = `product-${product.id}`;

    // a-tag -> productdetail-page
    const productLink = document.createElement("a");
    productLink.href = `/productDetail/${product.id}`;

    // Produktbild
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add("product-image");

    // Produktname
    const productName = document.createElement("h2");
    productName.textContent = product.name;

    // Produktbeschreibung
    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    // Produktpreis
    const productPrice = document.createElement("p");
    productPrice.textContent = `Preis: ${product.price
      .toFixed(2)
      .replace(".", ",")} €`;

    // Remove-Button
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "REMOVE";

    // Cart-Button
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("cart-button");
    addToCartButton.textContent = "Warenkorb";
    addToCartButton.setAttribute("data-product-id", product.id); // Das Produkt ID als Attribut setzen
    addToCartButton.setAttribute("data-product", JSON.stringify(product));

    // Füge die Elemente zur Produktkarte hinzu
    productLink.appendChild(productImage);
    productCard.appendChild(productLink);
    productCard.appendChild(productName);
    productCard.appendChild(productDescription);
    productCard.appendChild(productPrice);
    productCard.appendChild(removeButton);
    productCard.appendChild(addToCartButton);

    favoritesContainer.appendChild(productCard);

    // Eventlistener für den Entfernen-Button
    removeButton.addEventListener("click", function () {
      removeFavProduct(product.id);
    });

    // Eventlistener für den Cart-Button hinzufügen
    addToCartButton.addEventListener("click", function () {
      addFavToCart(product);
    });
  });
}

function addFavToCart(product) {
  // Warenkorb aus dem localStorage abrufen oder ein leeres Array erstellen
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Prüfen, ob das Produkt bereits im Warenkorb ist
  const isAlreadyInCart = cart.some((item) => item.id === product.id);

  if (!isAlreadyInCart) {
    // Produkt zum Warenkorb hinzufügen und im localStorage speichern
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Button deaktivieren und visuell ändern
  const addToCartButton = document.querySelector(
    `[data-product-id='${product.id}']`
  );
  if (addToCartButton) {
    addToCartButton.disabled = true; // Button deaktivieren
    addToCartButton.classList.add("disabled"); // CSS-Klasse für die Farbe ändern
    addToCartButton.textContent = "Im Warenkorb"; // Text anpassen
  }
}

// Löschen und Erstellen einer neuen Liste
function removeFavProduct(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id !== id); // Nur die Produkte behalten, die nicht entfernt werden

  // Produkte aus der aktualisierten Fav-Seite werden zurück ins localStorage gespeichert
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();

  // Den "Merken"-Button wieder aktivieren
  const button = document.querySelector(`[data-product-id='${id}']`);
  if (button) {
    enableButton(button); // Button aktivieren, wenn das Produkt entfernt wurde
  }
}

// Beim Laden der Favoriten-Seite die Favoriten aus dem localStorage anzeigen
document.addEventListener("DOMContentLoaded", function () {
  // Alle Merken-Buttons beim Laden der Seite initialisieren
  const buttons = document.querySelectorAll(".fav-button");
  buttons.forEach((button) => initializeFavButton(button));

  loadFavorites();
});
