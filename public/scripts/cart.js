// Hinzufügen, Entfernen und Verwalten von Produkten im Warenkorb einer Webseite,
// Es wird der Browser-Speicher (localStorage) genutzt

"use strict";

const addedToCart = "added to cart".toUpperCase();
const addToCart = "add to cart".toUpperCase();

window.addToCart = function (button) {
  const product = JSON.parse(button.getAttribute("data-product"));
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // -> wenn keine Daten im localStorage,  ein leerer Warenkorb als Standardwert

  // Überprüfung, ob ein Produkt bereits im Warenkorb vorhanden ist
  const isAlreadyInCart = cart.some((item) => item.id === product.id); // Callback-Funktion; es vergleicht die id mit der id im Warenkorb

  if (!isAlreadyInCart) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Button deaktivieren und Farbe ändern
    button.disabled = true;
    button.classList.add("disabled");
    button.textContent = addedToCart;
  } else {
    // Wenn das Produkt schon im Warenkorb ist, wird es entfernt
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Button wieder aktivieren und Farbe zurücksetzen
    button.disabled = false;
    button.classList.remove("disabled");
    button.textContent = addToCart;
  }

  createLeftDiv();
};

// Funktion, um den "Warenkorb"-Button zu deaktivieren
function disableButton(button) {
  button.disabled = true;
  button.textContent = addedToCart;
}

// Funktion, um den "Warenkorb"-Button zu aktivieren
function enableButton(button) {
  button.disabled = false;
  button.textContent = addToCart;
}

function createLeftDiv() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartContainer = document.querySelector(".cart-container");
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");

  if (!cartContainer || !leftContainer || !rightContainer) {
    return; // Falls die Container nicht existieren, breche die Funktion ab.
  }

  leftContainer.innerHTML = "";
  rightContainer.innerHTML = "";

  if (cart.length === 0) {
    // Container ausblenden, wenn leer
    leftContainer.style.display = "none";
    rightContainer.style.display = "none";

    const emptyMsg = document.createElement("div");
    emptyMsg.textContent = "Der Warenkorb ist leer";
    cartContainer.appendChild(emptyMsg);
    return;
  } else {
    // Wenn der Warenkorb nicht leer ist, stelle die Container wieder her
    leftContainer.style.display = "block";
    rightContainer.style.display = "block";
  }

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  let totalPrice = 0;

  cart.forEach((product) => {
    const row = document.createElement("tr");

    const cellImage = document.createElement("td");
    const img = document.createElement("img");
    img.className = "cart-image";
    img.src = product.image;
    img.alt = product.name;
    cellImage.appendChild(img);
    row.appendChild(cellImage);

    const cellName = document.createElement("td");
    cellName.textContent = product.name;
    row.appendChild(cellName);

    const cellSelect = document.createElement("td");
    const quantitySelect = document.createElement("select");
    quantitySelect.className = "cart-quantity";

    for (let i = 1; i <= 5; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }

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
  const shippingCosts = "5.00";
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

  const label = document.createElement("div");
  label.classList.add("label");
  label.textContent = labelText;

  const value = document.createElement("div");
  value.classList.add("value");
  value.textContent = valueText;

  row.appendChild(label);
  row.appendChild(value);
  rightContainer.appendChild(row);
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  cart.forEach((product, index) => {
    const quantitySelect = document.querySelectorAll(`.cart-quantity`)[index];
    const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
    totalPrice += parseFloat(product.price) * quantity;
  });

  const rightContainer = document.querySelector(".right-container");
  rightContainer.innerHTML = "";
  cartSummary(totalPrice);
}

function removeCartProduct(id) {
  let products = JSON.parse(localStorage.getItem("cart")) || [];
  products = products.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(products));

  createLeftDiv();

  const button = document.querySelector(`[data-product-id='${id}']`);
  if (button) {
    enableButton(button);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /* setTimeout(() => {
    createLeftDiv(); // Verzögert die Ausführung von createLeftDiv()
  }, 300); */
  createLeftDiv();

  const cartButtons = document.querySelectorAll(".cart-button");

  cartButtons.forEach((button) => {
    initializeCartButton(button);
    button.addEventListener("click", function () {
      window.addToCart(button);
    });
  });
});

// initializeCartButton(button) prüft, ob ein Produkt bereits im Warenkorb ist
// und passt den Zustand des "Warenkorb"-Buttons entsprechend an

function initializeCartButton(button) {
  const productId = button.getAttribute("data-product-id");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const isAlreadyDisabled = cart.some((cart) => cart.id == productId);

  if (isAlreadyDisabled) {
    button.disabled = true;
    button.classList.add("disabled");
    button.textContent = addedToCart;
  } else {
    button.disabled = false;
    button.classList.remove("disabled");
    button.textContent = addToCart;
  }
}
