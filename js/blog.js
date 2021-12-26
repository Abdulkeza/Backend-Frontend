import { resolvePathname } from "../init-firebase.js";

const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    document.querySelectorAll(".user-name").forEach((element) => {
      element.innerHTML = user.displayName;
    });
    console.log(user);

    document.querySelectorAll(".logged-in").forEach((element) => {
      element.style.display = "block";
    });

    document.querySelectorAll(".logged-out").forEach((element) => {
      element.style.display = "none";
    });
    // ...
  } else {
    // User is signed out // ...
    document.querySelectorAll(".logged-in").forEach((element) => {
      element.style.display = "none";
    });
  }
});

// logout

const logout = document.querySelector("#log-out");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    // alert("you will be logged out!");
    // console.log("user signed out");

    setTimeout(() => {
      window.location.pathname = resolvePathname("/blog.html");
    }, 2000);
  });
});

//Displaying blog post

let blogArticle = document.querySelector(".articles");
// let articleRef = db.ref('articles/')
var postRef = firebase.database().ref("posts/");

function displayArticle() {
  postRef.on("value", (snapshot) => {
    let articles = snapshot.val();
    blogArticle.innerHTML = "";
    for (let article in articles) {
      let tr = `
            <div class="articles">
                <div class="article" data-id = '${article}'>
                    <h3>${articles[article].title}</h3>
                    <p>${articles[article].text}</p>
                    <em> <h4>Written by ${articles[article].author}</h4> </em>
                <div id="submit-comment"></div>
                <a class="btn btn-read" href="#none" data-ref="${article}">READ MORE</a>
                </div>
            </div>`;

      blogArticle.innerHTML += tr;
    }

    // console.log(blogArticle);
  });
}

displayArticle();
