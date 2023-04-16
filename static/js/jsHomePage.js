const sliderWords = document.querySelectorAll(".slider-word");
const galleries = document.querySelectorAll(".gallery");

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

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = searchInput.value;
  const api_url = `https://api.api-ninjas.com/v1/animals?name=${name}`;

  fetch(api_url, {
    headers: {
      "X-Api-Key": "rQFVUenlLXpQGf0+o0kgtw==ciAdRxWMJyLN0WPx"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});
