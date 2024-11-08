"use strict";

// modal.js
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("filterModal");
  const openModalButton = document.getElementById("openFilterModal");
  const closeModalButton = document.querySelector(".modal .close");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  // Funktion zum Öffnen des Modals
  function openModal() {
    modal.style.display = "block";
  }

  // Funktion zum Schließen des Modals
  function closeModal() {
    modal.style.display = "none";
  }

  // Nur numerische Eingaben für Preisfelder erlauben
  function enforceNumericInput(event) {
    if (!/^[0-9]*$/.test(event.key)) {
      event.preventDefault();
    }
  }

  minPriceInput.addEventListener("keypress", enforceNumericInput);
  maxPriceInput.addEventListener("keypress", enforceNumericInput);

  // Öffnet des Modals beim Klicken auf den Button
  openModalButton.addEventListener("click", openModal);

  // Schließt des Modals beim Klicken auf das Schließen-Symbol
  closeModalButton.addEventListener("click", closeModal);

  // Schließt des Modals beim Klick außerhalb des Inhaltsbereichs
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
