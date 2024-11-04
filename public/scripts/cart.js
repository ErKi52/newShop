window.saveToCart = function (button) {
  const product = JSON.parse(button.getAttribute("data-product"));

  console.log(product.id);

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

  const cartContainer = document.getElementById("cartContainer");

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ["Image", "Title", "Price"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  cart.forEach((product) => {
    const productCard = document.createElement("div");
    //productCard.className = "product-card";
    productCard.id = `product-${product.id}`;

    const row = document.createElement("tr");

    const cellImage = document.createElement("td");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.style.width = "50px";
    cellImage.appendChild(img);
    row.appendChild(cellImage);

    const cellName = document.createElement("td");
    cellName.textContent = product.name;
    row.appendChild(cellName);

    const cellPrice = document.createElement("td");
    cellPrice.textContent = product.price.toFixed(2) + " €";
    row.appendChild(cellPrice);

    tbody.appendChild(row);

    /* const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.style.width = "50px"; */
  });

  table.appendChild(tbody);
  cartContainer.appendChild(table);
}

document.addEventListener("DOMContentLoaded", loadCart);

/* const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.style.width = "50px";

    const productName = document.createElement("h4");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Preis: ${product.price
      .toFixed(2)
      .replace(".", ",")} €`;

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);

    cartContainer.appendChild(productCard); */
