window.saveToCart = function (button) {
  const product = JSON.parse(button.getAttribute("data-product"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isAlreadyInCart = cart.some((item) => item.id === product.id);

  if (!isAlreadyInCart) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} wurde in den Warenkorb hinzugefügt!`);
  } else {
    alert(`${product.name} ist bereits im Warenkorb.`);
  }
};

function createLeftDiv() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-container");
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");

  leftContainer.innerHTML = "";
  rightContainer.innerHTML = "";

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  if (cart.length === 0) {
    leftContainer.remove();
    rightContainer.remove();
    const emptyMsg = document.createElement("div");
    emptyMsg.textContent = "Der Warenkorb ist leer";
    cartContainer.appendChild(emptyMsg);
    return;
  }

  let totalPrice = 0;

  cart.forEach((product) => {
    const row = document.createElement("tr");

    const cellImage = document.createElement("td");
    const img = document.createElement("img");
    img.className = "cart-image";
    img.src = product.image;
    img.alt = product.name;
    img.style.width = "80px";
    cellImage.appendChild(img);
    row.appendChild(cellImage);

    const cellName = document.createElement("td");
    cellName.textContent = product.name;
    row.appendChild(cellName);

    // Spalte: Anzahl mit Eingabefeld (Input Type Number)
    const cellSelect = document.createElement("td");
    const quantitySelect = document.createElement("select");
    quantitySelect.className = "cart-quantity";
    quantitySelect.style.width = "60px";

    // Optionen für das Dropdown-Menü (von 1 bis 5)
    for (let i = 1; i <= 5; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }

    // Event-Listener für Mengenänderungen
    quantitySelect.addEventListener("input", () => {
      updateCartSummary();
    });

    cellSelect.appendChild(quantitySelect);
    row.appendChild(cellSelect);

    const cellPrice = document.createElement("td");
    cellPrice.textContent = product.price.toFixed(2) + " €";
    row.appendChild(cellPrice);

    const cellRemoveButton = document.createElement("td");
    const removeArticleButton = document.createElement("button");
    removeArticleButton.textContent = "X";
    removeArticleButton.classList.add("remove-article");
    cellRemoveButton.appendChild(removeArticleButton);
    row.appendChild(cellRemoveButton);

    removeArticleButton.addEventListener("click", function () {
      removeCartProduct(product.id);
    });

    totalPrice += parseFloat(product.price);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  leftContainer.appendChild(table);

  cartSummary(totalPrice);
}

function cartSummary(totalPrice) {
  const shippingCosts = "5,00";
  const total = totalPrice + parseFloat(shippingCosts);

  createRightDiv("Zwischensumme", `${totalPrice.toFixed(2)} €`);
  createRightDiv("Versandkosten", `${shippingCosts} €`);
  createRightDiv(
    "Gesamtpreis",
    `${total.toFixed(2).replace(".", ",")} €`,
    true
  );
}

function createRightDiv(labelText, valueText, isTotal = false) {
  const rightContainer = document.querySelector(".right-container");

  const row = document.createElement("div");
  row.classList.add("row");
  if (isTotal) row.classList.add("total");

  // Label-Element erstellen
  const label = document.createElement("div");
  label.classList.add("label");
  label.textContent = labelText;

  // Wert-Element erstellen
  const value = document.createElement("div");
  value.classList.add("value");
  value.textContent = valueText;

  // Label und Wert in die Zeile (row) einfügen
  row.appendChild(label);
  row.appendChild(value);

  // Zeile in den Container einfügen
  rightContainer.appendChild(row);
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  // Berechne die Gesamtsumme basierend auf den gewählten Mengen
  cart.forEach((product, index) => {
    const quantitySelect = document.querySelectorAll(`.cart-quantity`)[index]; // Finde das zugehörige Select-Element
    const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1; // Standard auf 1, wenn nicht gefunden
    totalPrice += parseFloat(product.price) * quantity;
  });

  // Aktualisiere die Zusammenfassung im right-container
  const rightContainer = document.querySelector(".right-container");
  rightContainer.innerHTML = ""; // Clear previous summary
  cartSummary(totalPrice); // Berechne und zeige die neue Gesamtsumme an
}

function removeCartProduct(id) {
  const products = JSON.parse(localStorage.getItem("cart") || []);
  const cartProducts = products.filter((product) => product.id !== id); // Filtert die Produkte

  // Speichere die neuen Produkte im localStorage
  localStorage.setItem("cart", JSON.stringify(cartProducts));

  // Aktualisiere den Warenkorb, um die Änderungen anzuzeigen
  createLeftDiv();
}

document.addEventListener("DOMContentLoaded", createLeftDiv);
