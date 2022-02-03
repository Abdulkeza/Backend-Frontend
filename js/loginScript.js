import { resolvePathname, showNotification } from "../init-firebase.js";

function validate() {
  const form = document.getElementById("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  var emailIndicator = document.getElementById("emailValid");

  email.addEventListener("keyup", () => {
    if (email.value.match(emailPattern)) {
      emailIndicator.classList.add("valid");
      emailIndicator.classList.remove("invalid");
      // console.log('Valid email');
    } else {
      emailIndicator.classList.add("invalid");
      emailIndicator.classList.remove("valid");
      // console.log('Invalid')
    }
    if (email.value == "") {
      emailIndicator.classList.remove("invalid");
      emailIndicator.classList.remove("valid");
    }
  });

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
  var passwordIndicator = document.getElementById("passwordValid");

  password.addEventListener("keyup", () => {
    if (password.value.match(passwordPattern)) {
      passwordIndicator.classList.add("valid");
      passwordIndicator.classList.remove("invalid");
      // console.log('Valid password');
    } else {
      passwordIndicator.classList.add("invalid");
      passwordIndicator.classList.remove("valid");
      // console.log('Invalid');
    }
    if (password.value == "") {
      passwordIndicator.classList.remove("invalid");
      passwordIndicator.classList.remove("valid");
    }
  });
}
validate();

// const url = "http://localhost:9000/api/v1/users/login";
const url = "https://adeoapi.herokuapp.com/api/v1/users/login"

const email = document.getElementById("email");
const password = document.getElementById("password");

//!!User Login
const loginUser = (data) => {

  // let user = {
  //   email: email.value,
  //   password: password.value,
  // }
  $.ajax({
    url: url,
    method: "POST",
    data: data,
    success: (response) => {
      console.log(response)
      const user = {
        id: response.id,
        name: response.name,
      };

      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", response.authToken);
      localStorage.setItem("authenticated", true);

      showNotification(
        `Welcome <b>${user.name}. You are being redirected`,
        undefined,
        5000
      );

      setTimeout(() => {
        window.location.pathname = resolvePathname("/blog.html");
      }, 3000);
    },
  }).catch((error) => {
    console.log(error);
    showNotification(`<b>${error.message}</b>`, "error");
  });
};

//!!Form for Login
const loginForm = document.getElementById("form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (!email || !password) {
      // showNotification(`<b>Invalid credentials</b>`);
    } else {
      const data = { email: email, password: password };

      loginUser(data);
    }
  } catch (error) {
    showNotification(`<b>${error.message}</b>`, "error");
  }
});
