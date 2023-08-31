function toggleLoginForm() {
  let form = document.getElementById("loginFormContainer");
  if (form !== null) {
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
}
function toggleSignupForm() {
  let form = document.getElementById('loginForm');
  let userNameContainer = document.getElementById('userNameContainer');
  let confirmPasswordContainer = document.getElementById('confirmPasswordContainer');
  if (form && userNameContainer && confirmPasswordContainer) {
    let passwordInput = form.querySelector('input[name="password"]');
    let confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
    let userNameInput = userNameContainer.querySelector('input[name="username"]');
    let emailInput = form.querySelector('input[name="email"]');
    if (form.action.endsWith("/login")) {
      form.action = form.dataset.signupUrl;
      form.querySelector('button[type="submit"]').textContent = "Sign Up";
      document.getElementById('toggleButton').textContent = "Log In";
      userNameContainer.style.display = 'block';
      if (!confirmPasswordContainer.firstChild) {
        confirmPasswordInput = document.createElement('input');
        confirmPasswordInput.type = 'password';
        confirmPasswordInput.name = 'confirmPassword';
        confirmPasswordInput.placeholder = 'Confirm Password';
        confirmPasswordContainer.appendChild(confirmPasswordInput);
      }
      confirmPasswordContainer.style.display = 'block';
    } else {
      form.noValidate = true;
      if (confirmPasswordContainer.firstChild) {
        confirmPasswordInput = confirmPasswordContainer.firstChild;
        confirmPasswordContainer.removeChild(confirmPasswordInput);
      }
      form.action = form.dataset.loginUrl;
      form.querySelector('button[type="submit"]').textContent = "Log In";
      document.getElementById('toggleButton').textContent = "Sign Up";
      userNameContainer.style.display = 'none';
    }
    if (passwordInput) passwordInput.value = "";
    if (userNameInput) userNameInput.value = "";
    if (confirmPasswordInput) confirmPasswordInput.value = "";
    if (emailInput) emailInput.value = ""; 
  }
}
let loginForm = document.getElementById('loginForm');
if (loginForm !== null) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();  
    let userNameContainer = document.getElementById('userNameContainer');
    let userNameInput = userNameContainer.querySelector('input[name="username"]');
    let passwordInput = this.querySelector('input[name="password"]');
    let confirmPasswordInput = this.querySelector('input[name="confirmPassword"]');
    if (this.action.endsWith("/signup") && (userNameInput.value === "" || passwordInput.value === "" || confirmPasswordInput.value === "")) {
      alert("Por favor, rellena todos los campos.");
      return;
    }
    let formData = new FormData(this);
    fetch(this.action, {
      method: this.method,
      body: formData
    }).then(response => response.json()).then(data => {
      if (data.status === 'success') {
        alert(data.message);  
        window.location.href = data.redirect;  
      } else {
        alert('Error: ' + data.message);  
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  });
}
