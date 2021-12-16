
const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      document.querySelectorAll(".user-name").forEach((element) =>{
        element.innerHTML = user.displayName
      })
      console.log(user)
  
      document.querySelectorAll(".logged-in").forEach((element) =>{
        element.style.display = "block";
      })
  
      document.querySelectorAll(".logged-out").forEach((element) =>{
        element.style.display = "none";
      })
      // ...
    } else {
      // User is signed out // ...
    //   console.log('note legged in');
      document.querySelectorAll(".logged-in").forEach((element) =>{
        element.style.display = "none";
      })
    }

  });

 // logout
 



const logout = document.querySelector('#log-out');
logout.addEventListener("click", (e) =>{
    e.preventDefault();
    auth.signOut().then(() =>{
        alert("you will be logged out!");
        // console.log("user signed out");

        setTimeout(() =>{
            window.location.pathname = "/blog.html";
        }, 5000);
    })
})
  