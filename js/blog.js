import { resolvePathname } from "../init-firebase.js";


const loggedUser = () => {
  const userData = localStorage.getItem("user")
  const user = JSON.parse(userData)

  const token = localStorage.getItem("token")

  if (token) {
    var uid = user.id;

    document.querySelectorAll(".user-name").forEach((element) => {
      element.innerHTML = user.name;
    });
    
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
};

loggedUser()


// logout
const logout = document.querySelector("#log-out");
logout.addEventListener("click", (e) => {
  e.preventDefault();
 
  localStorage.clear();

    setTimeout(() => {
      window.location.pathname = resolvePathname("/blog.html");
    }, 2000);
  
});



//Displaying blog post
let blogArticle = document.querySelector(".articles");

const url = "https://adeoapi.herokuapp.com/api/v1/blogs";
// const url ="http://localhost:9000/api/v1/blogs";


const displayArticle = async () =>{
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      try {     
      let articles = data.blogs;
      blogArticle.innerHTML = "";
      articles.forEach((article) => {
        let tr = `
            <div class="articles">
                <div class="article" data-id = '${article._id}'>
                    <h3>${article.title}</h3>
                   <p>${article.body}</p>
                    <em> <h4>Written by ${article.author}</h4> </em> 
                <div id="submit-comment"></div>
                <a class="logged-in btn btn-read" href="#p" data-ref="${article}">read more</a>
                </div>
            </div>`;

        blogArticle.innerHTML += tr;
      });
    } catch (error) {
        console.log(error)
    }
    });
}

displayArticle();


