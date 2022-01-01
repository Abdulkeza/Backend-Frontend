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
        <div >
         <div class= "message" data-id = '${message}'>
         <button class="delete" data-id = '${message}' > <img src="../img/Delete.png" alt="Delete" > </button>
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

let message = document.querySelector(".messages");

try {
  message.addEventListener("click", (e) => {
    const { target } = e;

    if (target.matches(".delete")) {
      let messageId = e.target.getAttribute("data-id");
      // messageRef.child(messageId).remove();

      console.log("message deleted");
    }
    // Delete.addEventListener("click", (e)=>{
    //   e.preventDefault()
    //   console.log("Delete button Clicked");
    // })
  });
} catch (error) {
  console.log(error);
}
