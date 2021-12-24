import { showNotification } from "../init-firebase.js";

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

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
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

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      showNotification(
        `Welcome <b>${user.displayName}. You are being redirected`,
        (type = undefined),
        (duration = 2000)
      );

      setTimeout(() => {
        window.location.pathname = "/blog.html";
      }, 2500);
    })
    .catch((error) => {
      console.log(error);
      showNotification(`<b>${error.message}</b>`, (type = "error"));
    });
});
