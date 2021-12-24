function validate() {
  const form = document.getElementById("form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  var emailIndicator = document.getElementById("emailValid");

  var nameIndicator = document.getElementById("nameValid");

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
}

validate();

//Submitting user questions/comments

const form = document.querySelector("form");
const button = document.querySelectorAll(".btn");

var Qref = firebase.database().ref("Questions/");

//write comment

var saveQuestion = (userName, userEmail, message) => {
  var newQRef = Qref.push();
  newQRef.set({
    name: userName,
    email: userEmail,
    message: message,
  });
};

try {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveQuestion(form.name.value, form.email.value, form.message.value);
    swal("Successfully submitted", "See you soon!", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 5000);
  });
} catch (error) {}
