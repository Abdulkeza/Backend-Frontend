import { resolvePathname } from "../init-firebase.js";

// Change functions to ES6 structure
const validate = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  var message = document.getElementById("message");
  const submit = document.querySelector("#submit");
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  let emailIndicator = document.getElementById("emailValid");

  let nameIndicator = document.getElementById("nameValid");

  try {
    var namePattern =
      /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;

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
  } catch (error) {
    console.log(error);
  }

  email.addEventListener("keyup", () => {
    if (email.value.match(pattern)) {
      emailIndicator.classList.add("valid");
      emailIndicator.classList.remove("invalid");
      console.log("Matched");
    } else {
      emailIndicator.classList.add("invalid");
      emailIndicator.classList.remove("valid");
      console.log("Invalid");
    }
    if (email.value == "") {
      emailIndicator.classList.remove("invalid");
      emailIndicator.classList.remove("valid");
    }
  });

  if (
    !name.value.match(namePattern) ||
    !email.value.match(pattern) ||
    message.value == ""
  ) {
    submit.disabled = true;
  } else {
    submit.disabled = false;
  }
};

var form = document.getElementById("form");
form.addEventListener("change", () => {
  validate();
});

// const url = "http://localhost:9000/api/v1/contacts/contactUs";
const url = "https://adeoapi.herokuapp.com/api/v1/contacts/contactUs"

//Submitting user questions/comments

var form = document.querySelector("form");
const button = document.querySelectorAll(".btn");
const nameValue = document.getElementById("name");
const emailValue = document.getElementById("email");
const messageValue = document.getElementById("message");
const userMessage = document.querySelector(".messages");

// var Qref = firebase.database().ref("Questions/");

//write comment

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue.value,
      email: emailValue.value,
      message: messageValue.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const dataArr = [];
      dataArr.push(data);
      try {
        let contacts = dataArr.messages.val();

        userMessage.innerHTML = "";

        contacts.forEach((message) => {
          let tr = `
        <div class ="main-message">
         <div class= "message" data-id = '${message}'>
         <button > <img src="../img/Delete.png" alt="Delete" class="delete" data-id = '${message}' > </button>
         <h3>${message.name} </h3>
         <h4>Email: ${message.email} </h4>
         <p>${message.message}</p>

         </div>

        </div>`;
          // userMessage.insertBefore(tr, userMessage.firstChild)
          userMessage.innerHTML += tr;
        });
      } catch (error) {
        console.log(error);
      }
    });
console.log("message sent")
    Swal.fire({
      text: "Successfully submitted!",
      icone: "success",
    });

    setTimeout(() => {
      window.location.pathname = resolvePathname("/index.html")
    }, 3000);
});
