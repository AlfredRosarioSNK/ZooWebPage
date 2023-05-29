function toggleLoginForm() {
  var form = document.getElementById("loginFormContainer");
  if (form !== null) {
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
}


function openGallery(id) {
  var gallery = document.getElementById('gallery');


  var galleryPath = {
    'mammals': '/api/mammals',
    'birds': '/api/bird',
    'reptiles': '/api/reptile',
    'amphibians': '/api/amphibian'
  };

  const iconWrappers = document.querySelectorAll('.icon-wrapper');
  for (const wrapper of iconWrappers) {
    if (wrapper.querySelector('img').getAttribute('onclick').includes(id)) {
      wrapper.classList.add('selected');
    } else {
      wrapper.classList.remove('selected');
    }
  }

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

function toggleSignupForm() {
  let form = document.getElementById('loginForm');
  let userNameContainer = document.getElementById('userNameContainer');
  let confirmPasswordContainer = document.getElementById('confirmPasswordContainer');

  if (form && userNameContainer && confirmPasswordContainer) {
    if (form.action.endsWith("/login")) {
      form.action = form.dataset.signupUrl;
      form.querySelector('button[type="submit"]').textContent = "Sign Up";
      document.getElementById('toggleButton').textContent = "Log In";
      userNameContainer.style.display = 'block';
      form.noValidate = false;

      if (!confirmPasswordContainer.firstChild) {
        let confirmPasswordInput = document.createElement('input');
        confirmPasswordInput.type = 'password';
        confirmPasswordInput.name = 'confirmPassword';
        confirmPasswordInput.placeholder = 'Confirm Password';
        confirmPasswordInput.required = true;
        confirmPasswordContainer.appendChild(confirmPasswordInput);
      }

      confirmPasswordContainer.style.display = 'block';
      confirmPasswordContainer.firstChild.required = true;
    } else {

      form.noValidate = true;
      if (confirmPasswordContainer.firstChild) {
        let confirmPasswordInput = confirmPasswordContainer.firstChild;
        confirmPasswordInput.required = false;
        confirmPasswordContainer.removeChild(confirmPasswordInput);
      }
      form.action = form.dataset.loginUrl;
      form.querySelector('button[type="submit"]').textContent = "Log In";
      document.getElementById('toggleButton').textContent = "Sign Up";
      userNameContainer.style.display = 'none';


      confirmPasswordContainer.style.display = 'none';

    }
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


document.addEventListener('DOMContentLoaded', (event) => {

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

  let ticketLink = document.querySelector('.ticket-links');

  if (ticketLink) {
    ticketLink.addEventListener('click', function (e) {

      if (this.classList.contains('disabled')) {

        toggleLoginForm();

        e.preventDefault();
      }
    });
  }
  let loginForm = document.getElementById('loginForm');
  if (loginForm !== null) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var confirmPasswordContainer = document.getElementById('confirmPasswordContainer');
      var confirmPasswordInput = confirmPasswordContainer ? confirmPasswordContainer.firstChild : null;


      if (confirmPasswordContainer && confirmPasswordInput) {

        if (confirmPasswordContainer.style.display === 'none' && confirmPasswordInput.required) {

          confirmPasswordInput.required = false;
        }
      }

      var form = this;

      setTimeout(function () {
        if (form.action.endsWith("/signup") && confirmPasswordContainer.style.display !== 'none') {
          var password = form.querySelector('input[name="password"]').value;
          var confirmPassword = form.querySelector('input[name="confirmPassword"]').value;

          if (password !== confirmPassword) {
            var messageContainer = document.getElementById('message');
            messageContainer.textContent = "Passwords do not match.";
            messageContainer.style.display = 'block';
            messageContainer.style.color = 'red';
            setTimeout(function () {
              messageContainer.style.display = 'none';
            }, 5000);
            return;
          }
        }

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
      }, 0);
    });
  }
  let mybutton = document.getElementById("myBtn");

  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  document.getElementById('splash-screen').style.display = 'flex';

  window.addEventListener('load', function () {
    document.getElementById('splash-screen').style.display = 'none';
  });

  $(document).ready(function () {
    $(".dropbtn").click(function () {
      $(".dropdown-content").toggle();
    });
  });

});

