function validate() {
  const form = document.getElementById("form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  var emailIndicator = document.getElementById("emailValid");

  var nameIndicator = document.getElementById("nameValid");

  var namePattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
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