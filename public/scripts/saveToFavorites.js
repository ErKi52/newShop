/* // Funktion, die aufgerufen wird, wenn der "Merken"-Button geklickt wird
function saveToFavorites(product) {
  // 1. Produkt zum localStorage hinzufügen
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = favorites.some((fav) => fav.id === product.id);

  if (!exists) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${product.name} wurde zu den Favoriten hinzugefügt.`);
  } else {
    alert(`${product.name} ist bereits in den Favoriten.`);
  }

  // 2. Produkt dynamisch zur Favoriten-Seite hinzufügen (Option 1)
  addToFavoritesPage(product);
}

// Funktion, um das Produkt dynamisch zur Favoriten-Seite hinzuzufügen (Option 1)
function addToFavoritesPage(product) {
  const favoritesList = document.querySelector("#favorites-list");

  if (favoritesList) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Preis: ${product.price} €</p>
      `;
    favoritesList.appendChild(productCard);
  }
}
 */
