const firebaseConfig = {
  apiKey: "AIzaSyBzTdedYr_iahsV7dDur9FEzSXgeuVs7cI",
  authDomain: "eagle-app-1b978.firebaseapp.com",
  projectId: "eagle-app-1b978",
  storageBucket: "eagle-app-1b978.appspot.com",
  messagingSenderId: "456708535525",
  appId: "1:456708535525:web:53178c8f141c412b97500c",
  databaseURL:
    "https://eagle-app-1b978-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
//  console.log(app.name);
console.log("initialization of firebase");

function validate() {
  const form = document.getElementById("signup-form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");
  const submit = document.querySelector("#submit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var nameIndicator = document.getElementById("nameValid");
  var LnameIndicator = document.getElementById("LnameValid");
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

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  var emailIndicator = document.getElementById("emailValid");

  email.addEventListener("keyup", () => {
    if (email.value.match(emailPattern)) {
      emailIndicator.classList.add("valid");
      emailIndicator.classList.remove("invalid");
    } else {
      emailIndicator.classList.add("invalid");
      emailIndicator.classList.remove("valid");
    }
    if (email.value == "") {
      emailIndicator.classList.remove("invalid");
      emailIndicator.classList.remove("valid");
    }
  });

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  var passwordIndicator = document.getElementById("password1Valid");

  password1.addEventListener("keyup", () => {
    if (password1.value.match(passwordPattern)) {
      passwordIndicator.classList.add("valid");
      passwordIndicator.classList.remove("invalid");
    } else {
      passwordIndicator.classList.add("invalid");
      passwordIndicator.classList.remove("valid");
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

  submit.addEventListener("submit", (e) => {
    if (
      name.value.match(namePattern) &&
      email.value.match(emailPattern) &&
      password1.value.match(passwordPattern) &&
      password1.value === password2.value
    ) {
      console.log("u entered valid input");
    }else{
      
      console.log("you entered invalid input");
      e.preventDefault();
    }
  });
}
validate();

//connecting to database

//reading data from database to console

const dbRef = db.ref();

dbRef
  .child("person1")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("no value available");
    }
  })
  .catch((error) => {
    console.log(error),
      setTimeout(() => {
        getpersons();
      }, 5000);
  });

const getpersons = () => {
  dbRef
    .child("person1")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("no value available");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

function signupRegister(name, password, email) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("User cccreated");
      user.updateProfile({
        displayName: name,
      });
      console.log("Profie updated");
      alert("your acount has been created. you will be redirected in 5s");
      setTimeout(() => {
        window.location.pathname = "/blog.html";
      }, 5000);
    })

    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name, password, email;
  name = document.getElementById("name").value;
  password = document.getElementById("password1").value;
  email = document.getElementById("email").value;
  signupRegister(name, password, email);

});
