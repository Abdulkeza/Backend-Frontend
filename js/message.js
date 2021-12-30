const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    document.querySelectorAll(".user-name").forEach((element) => {
      element.innerHTML = user.displayName;
    });
  }
});

//displaying messages

var userMessage = document.querySelector(".messages");
var messageRef = firebase.database().ref("Questions/");

var displayMessage = () => {
  messageRef.on("value", (snapshot) => {
    var messages = snapshot.val();

    userMessage.innerHTML = "";

    for (let message in messages) {
      let tr = `
        <div class= "messages">
         <div class= "message" data-id = '${message}'>
         <h3>${messages[message].name} </h3>
         <h4>Email: ${messages[message].email} </h4>
         <p>${messages[message].message}</p>

         </div>

        </div>`;
      userMessage.innerHTML += tr;
    }
  });
};
displayMessage();
