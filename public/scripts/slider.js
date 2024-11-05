let currentIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.style.transform = "translateX(0)"; // Aktuelle Slide zurücksetzen
    } else if (i < index) {
      slide.style.transform = "translateX(-100%)"; // Vorherige Slides nach links schieben
    } else {
      slide.style.transform = "translateX(100%)"; // Nächste Slides nach rechts schieben
    }
  });

  slides[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Starte den Slider automatisch
setInterval(nextSlide, 4000);
