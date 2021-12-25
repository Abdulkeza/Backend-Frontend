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
      window.location.pathname = "/blog.html";
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
                    

                    <section id="contact_us">

                    <form method="post" id="form" class="contact-form">
                    <h3>We’re happy to hear from you</h3>
                        <div class="text-area">
                            <div class="name ind">
        
                                <input type="text" name="name" id="name" placeholder="Your name"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])$+" title="Name must be at least 3 chracter" maxlength="25"
                                    minlength="3" required>
                                <span class="indicator" id="nameValid"></span>
                            </div>
                            <div class="email ind">
                                <input type="email" name="email" id="email" placeholder="Your email" required>
                                <span class="indicator" id="emailValid"></span>
        
                            </div>
        
                            <div class="your-message">
                                <textarea name="message" placeholder="Your message" minlength="5" maxlength="1000" rows="4"
                                    required></textarea>
        
                            </div>
                            <div class="contact-btn">
                                <button type="submit" class="btn">Submit</button>
                                <!-- <a href="#" class="btn">Submit</a> -->
                            </div>
        
                        </div>
                    </form>
        
        
        
                </section>
        
        
                <div id="submit-comment"></div>
                </div>
            </div>`;

      blogArticle.innerHTML += tr;
    }

    // console.log(blogArticle);
  });
}

displayArticle();
