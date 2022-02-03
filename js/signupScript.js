import { resolvePathname, showNotification } from "../init-firebase.js";

function validate() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");
  const submit = document.querySelector("#submit");
  const emailInnerText = document.getElementById("E-innerText");
  const pswdInnerText = document.getElementById("pswd-innerText");

  var nameIndicator = document.getElementById("nameValid");
  var LnameIndicator = document.getElementById("LnameValid");
  var namePattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

  //validating name

  name.addEventListener("keyup", () => {
    if (name.value.match(namePattern)) {
      nameIndicator.classList.add("valid");
      nameIndicator.classList.remove("invalid");
    } else {
      nameIndicator.classList.add("invalid");
      nameIndicator.classList.remove("valid");
    }
    if (name.value == "") {
      nameIndicator.classList.remove("invalid");
      nameIndicator.classList.remove("valid");
    }
  });

  //validating email

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  var emailIndicator = document.getElementById("emailValid");

  email.addEventListener("keyup", () => {
    if (email.value.match(emailPattern)) {
      emailIndicator.classList.add("valid");
      emailIndicator.classList.remove("invalid");
      emailInnerText.innerHTML = "Your email is valid.";
      emailInnerText.style.color = "#00ff00";
    } else {
      emailIndicator.classList.add("invalid");
      emailIndicator.classList.remove("valid");
      emailInnerText.innerHTML = "You entered invalid email.";
      emailInnerText.style.color = "#ff0000";
    }
    if (email.value == "") {
      emailIndicator.classList.remove("invalid");
      emailIndicator.classList.remove("valid");
    }
  });

  //validating password

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
  var passwordIndicator = document.getElementById("password1Valid");

  password1.addEventListener("keyup", () => {
    if (password1.value.match(passwordPattern)) {
      passwordIndicator.classList.add("valid");
      passwordIndicator.classList.remove("invalid");
      pswdInnerText.innerHTML = "You entered valid password";
      pswdInnerText.style.color = "#00ff00";
    } else {
      passwordIndicator.classList.add("invalid");
      passwordIndicator.classList.remove("valid");
      pswdInnerText.innerHTML =
        " -should be at least 3 chracter <br>- 1 uppercase, 1 lowercase, a number.";
      pswdInnerText.style.color = "#ff0000";
    }
    if (password1.value == "") {
      passwordIndicator.classList.remove("invalid");
      passwordIndicator.classList.remove("valid");
    }
  });

  var password2Indicator = document.getElementById("password2Valid");

  password2.addEventListener("keyup", () => {
    if (password1.value === password2.value) {
      password2Indicator.classList.add("valid");
      password2Indicator.classList.remove("invalid");
      console.log("password matched");
    } else {
      password2Indicator.classList.add("invalid");
      password2Indicator.classList.remove("valid");
    }
    if (password2.value == "") {
      password2Indicator.classList.remove("invalid");
      password2Indicator.classList.remove("valid");
    }
  });

  //disabling button

  if (
    !name.value.match(namePattern) ||
    !email.value.match(emailPattern) ||
    !password1.value.match(passwordPattern) ||
    !password1.value === password2.value
  ) {
    submit.disabled = true;
  } else {
    submit.disabled = false;
  }
}

const Form = document.getElementById("signup-form");
Form.addEventListener("change", () => {
  validate();
});


//!!Register a new user
// const url = "http://localhost:9000/api/v1/users/register";
const url = "https://adeoapi.herokuapp.com/api/v1/users/register";

const form = document.querySelector("form");

const password2 = document.getElementById("password2");
const submit = document.querySelector("#submit");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password1 = document.getElementById("password1");

  let myBody = {
    name: name.value,
    email: email.value,
    password: password1.value,
  };

  $.ajax({
    url: url,
    data: myBody,
    method: "POST",
    success: (response) => {

      showNotification(
        `Dear <b class="text-primary">${response.name}</b>, Your account has been created.`
      );
      console.log(response);

      setTimeout(() => {
        window.location.pathname = resolvePathname("/login.html");
      }, 4000);
          
    },
    
    error: (error) => {
      console.log(error);
      showNotification(error.message, "error");
    },
  });

});



