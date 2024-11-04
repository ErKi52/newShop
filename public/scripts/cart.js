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

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const leftContainer = document.querySelector(".left-container");

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  if (!leftContainer) return;

  leftContainer.innerHTML = "";
  cart.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.id = `product-${product.id}`;

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

    // Optional: Event-Listener für Mengenänderungen
    quantitySelect.addEventListener("input", () => {
      console.log(
        `Anzahl von ${product.name} geändert zu: ${quantitySelect.value}`
      );
    });

    cellSelect.appendChild(quantitySelect);
    row.appendChild(cellSelect);

    const cellPrice = document.createElement("td");
    cellPrice.textContent = product.price.toFixed(2) + " €";
    row.appendChild(cellPrice);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  leftContainer.appendChild(table);
}

function cartSummary() {
  const leftContainer = document.querySelector(".right-container");

  
}

document.addEventListener("DOMContentLoaded", loadCart);
