import { resolvePathname } from "../resolvePath.js";

const form = document.querySelector("form");
const editForm = document.getElementById("editForm");

const titleValue = document.getElementById("title");
const authorValue = document.getElementById("author");
const textValue = document.getElementById("text");
let blogArticle = document.querySelector(".articles");
const save = document.getElementById("save");

// const url = "http://localhost:9000/api/v1/blogs";
const url = "https://adeoapi.herokuapp.com/api/v1/blogs";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(titleValue.value);

  const token = localStorage.getItem("token")

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      title: titleValue.value,
      author: authorValue.value,
      body: textValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const dataArr = [];
      dataArr.push(data);

      try {
        let articles = dataArr.blogs;
        blogArticle.innerHTML = "";
        articles.forEach((article) => {
          let tr = `
            <div class="articles">
                <div class="article" data-id = '${article._id}'>
                    <h3>${article.title}</h3>
                    <p>${article.body}</p>
                    <em> <h4>Written by ${article.author}</h4> </em>
                <div id="submit-comment"></div>
                <a class="logged-in btn btn-read" href="subscribe.html" data-ref="${article}">SUBSCRIBE</a>
                </div>
            </div>`;

          blogArticle.innerHTML += tr;
        });

      } catch (error) {
        console.log(error);
      }
    });


    Swal.fire({
      text: "Article Created!",
      icone: "success",
    });

    setTimeout(() => {
      window.location.pathname = resolvePathname("/dashbord.html")
    }, 3000);
   
  });
