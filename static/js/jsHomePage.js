const sliderWords = document.querySelectorAll(".slider-word");
const galleries = document.querySelectorAll(".gallery");

sliderWords.forEach((word) => {
  word.addEventListener("click", () => {
    const galleryToShow = word.getAttribute("data-gallery");
    galleries.forEach((gallery) => {
      gallery.classList.remove("active");
      if (gallery.id === galleryToShow) {
        gallery.classList.add("active");
      }
    });
    sliderWords.forEach((w) => {
      w.classList.remove("active");
    });
    word.classList.add("active");
  });
});
const figures = document.querySelectorAll("figure");

figures.forEach((figure) => {
  const img = figure.querySelector("img");
  const caption = figure.querySelector("figcaption");
  const alt = img.getAttribute("alt");
  caption.textContent = alt;
});
