const sliderWords = document.querySelectorAll(".slider-word");
const galleries = document.querySelectorAll(".gallery");

// Show the initially active gallery
galleries.forEach((gallery) => {
  if (gallery.classList.contains("active")) {
    gallery.style.maxHeight = "100vh";
  }
});

sliderWords.forEach((word) => {
  word.addEventListener("click", () => {
    const galleryToShow = word.getAttribute("data-gallery");
    galleries.forEach((gallery) => {
      if (gallery.id === galleryToShow) {
        gallery.classList.add("active");
        gallery.style.maxHeight = "100vh";
      } else {
        gallery.classList.remove("active");
        gallery.style.maxHeight = "0";
      }
    });
    sliderWords.forEach((w) => {
      w.classList.remove("active");
    });
    word.classList.add("active");
  });
});


figures.forEach((figure) => {
  const img = figure.querySelector("img");
  const caption = figure.querySelector("figcaption");
  const alt = img.getAttribute("alt");
  caption.textContent = alt;
});
