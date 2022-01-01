import { resolvePathname } from "../init-firebase.js";

const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    document.querySelectorAll(".user-name").forEach((element) => {
      element.innerHTML = user.displayName;
    });
  }
});

var logout = document.getElementById("log-out");
try {
  logout.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
      setTimeout(() => {
        window.location.pathname = resolvePathname("/blog.html");
        // window.location.pathname = "blog.html";
      }, 1000);
      console.log("logged out");
    });
  });
} catch (error) {
  console.log(error);
}

//displaying messages

var userMessage = document.querySelector(".messages");
var messageRef = firebase.database().ref("Questions/");

var displayMessage = () => {
  messageRef.on("value", (snapshot) => {
    var messages = snapshot.val();

    userMessage.innerHTML = "";

    for (let message in messages) {
      let tr = `
        <div class ="main-message">
         <div class= "message" data-id = '${message}'>
         <button > <img src="../img/Delete.png" alt="Delete" class="delete" data-id = '${message}' > </button>
         <h3>${messages[message].name} </h3>
         <h4>Email: ${messages[message].email} </h4>
         <p>${messages[message].message}</p>

         </div>

        </div>`;
      // userMessage.insertBefore(tr, userMessage.firstChild)
      userMessage.innerHTML += tr;
    }
  });
};
displayMessage();

let message = document.querySelector(".messages");

try {
  message.addEventListener("click", (e) => {
    const { target } = e;

    if (target.matches(".delete")) {
      let messageId = e.target.getAttribute("data-id");
      messageRef.child(messageId).remove();
    }
  });
} catch (error) {
  console.log(error);
}
