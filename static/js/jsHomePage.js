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

const countrySelect = document.getElementById('country');
const countryApiUrl = 'https://restcountries.com/v3.1/all';

fetch(countryApiUrl)
  .then((response) => response.json())
  .then((countries) => {
    countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.name.common;
      option.text = country.name.common;
      countrySelect.add(option);
    });
  })
  .catch((error) => {
    console.error('Error fetching countries:', error);
  });

let reviews = document.querySelectorAll('.review');
let currentIndex = 0;

function showReview(index) {
  reviews.forEach((review, i) => {
    if (i === index) {
      review.classList.add('show');
    } else {
      review.classList.remove('show');
    }
  });
}

function toggleSignupForm() {
  var form = document.getElementById("loginForm");
  var confirmPasswordContainer = document.getElementById("confirmPasswordContainer");
  var userNameContainer = document.getElementById("userNameContainer");
  var userNameInput = document.getElementById("userNameInput");
  var submitButton = form.querySelector("button[type='submit']");
  var toggleButton = document.getElementById("toggleButton");

  var form = document.getElementById("loginForm");
  var signupUrl = form.getAttribute('data-signup-url');
  var loginUrl = form.getAttribute('data-login-url');
  if (submitButton.textContent === "Log In") {
    toggleButton.textContent = "Log In";
    submitButton.textContent = "Sign Up";
    form.setAttribute("action", signupUrl);
    userNameContainer.style.display = "block";
    var confirmPassword = document.createElement("input");
    confirmPassword.type = "password";
    confirmPassword.name = "confirm_password";
    confirmPassword.placeholder = "Confirm Password";
    confirmPassword.required = true;
    confirmPasswordContainer.appendChild(confirmPassword);
  } else {
    toggleButton.textContent = "Sign Up";
    submitButton.textContent = "Log In";
    form.setAttribute("action", loginUrl);
    userNameContainer.style.display = "none";
    confirmPasswordContainer.innerHTML = '';
  }
}



function toggleLoginForm() {
  var form = document.getElementById("loginFormContainer");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var form = this;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
    .then(response => response.json())
    .then(data => {
      var messageContainer = document.getElementById('message');
      messageContainer.textContent = data.message;
      messageContainer.style.display = 'block';
      if (data.status === 'success') {
        messageContainer.style.color = 'green';
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          location.reload();
        }
      } else {
        messageContainer.style.color = 'red';
      }
      setTimeout(function () {
        messageContainer.style.display = 'none';
      }, 5000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function createCard(animal) {
  return `
  <div class="card" style="width: 18rem;">
  <img src="${animal.image}" class="card-img-top" alt="Image of ${animal.name}">
  <div class="card-body">
    <h5 class="card-title">${animal.name}</h5>
    <p class="card-text">${animal["interesting-fact"]}</p>
  </div>
</div>
  `;
}


function openGallery(id) {
  var gallery = document.getElementById('gallery');


  var galleryPath = {
    'mammals': '/api/mammals',
    'birds': '/api/bird',
    'reptiles': '/api/reptile',
    'amphibians': '/api/amphibian'
  };


  if (galleryPath[id]) {
    fetch(galleryPath[id])
      .then(response => response.json())
      .then(data => {
        gallery.innerHTML = data.map(createCard).join('');
        gallery.style.display = 'flex';
        setTimeout(function () {
          gallery.classList.add('show');
        }, 20);
      });
  }
}

var galleryPath = {
  'mammals': '/api/mammals',
  'birds': '/api/bird',
  'reptiles': '/api/reptile',
  'amphibians': '/api/amphibian'
};

if (galleryPath[id]) {
  fetch(galleryPath[id])
    .then(response => response.json())
    .then(data => {
      gallery.innerHTML = data.map(createCard).join('');
    });
}




