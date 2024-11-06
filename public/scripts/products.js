"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Öffnen und Schließen des Modals
  const modal = document.getElementById("filterModal");
  const openModalButton = document.getElementById("openFilterModal");
  const closeModalButton = document.querySelector(".modal .close");

  openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Klick außerhalb des Modals zum Schließen
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Eingabe-Validierung für Preisfelder
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  function enforceNumericInput(event) {
    if (!/^[0-9]*$/.test(event.key)) {
      event.preventDefault();
    }
  }

  minPriceInput.addEventListener("keypress", enforceNumericInput);
  maxPriceInput.addEventListener("keypress", enforceNumericInput);
});
