// Funktion, um ein Produkt zu den Favoriten hinzuzufügen
window.saveToFavorites = function (button) {
  // Produkt-JSON aus dem data-product Attribut des Buttons holen
  const product = JSON.parse(button.getAttribute("data-product"));

  // Favoriten aus dem localStorage abrufen oder ein leeres Array erstellen
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Prüfen, ob das Produkt bereits in den Favoriten ist
  const isAlreadyFavorited = favorites.some((fav) => fav.id === product.id);
  if (!isAlreadyFavorited) {
    favorites.push(product); // Produkt hinzufügen
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Favoriten speichern
    alert(`${product.name} wurde zu den Favoriten hinzugefügt!`);
  } else {
    alert(`${product.name} ist bereits in den Favoriten.`);
  }
};

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

    // Produktbild
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.style.width = "150px";

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

    // Füge die Elemente zur Produktkarte hinzu
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productDescription);
    productCard.appendChild(productPrice);
    productCard.appendChild(removeButton);

    favoritesContainer.appendChild(productCard);

    removeButton.addEventListener("click", function () {
      console.log("Klick");
      removeFavProduct(product.id);
    });
  });
}

// Löschen und erstellen einer neuen Liste
function removeFavProduct(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id !== id); // Nur die Produkte behalten, die nicht entfernt werden

  // Produkte aus der aktualisierten Fav-Seite werden zurück ins localstorage gespeichert
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

// Beim Laden der Favoriten-Seite die Favoriten aus dem localStorage anzeigen
document.addEventListener("DOMContentLoaded", loadFavorites);
