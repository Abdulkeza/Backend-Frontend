import { resolvePathname } from "../resolvePath.js";

const form = document.querySelectorAll("form");

// const url = "http://localhost:9000/api/v1/blogs";
const url = "https://adeoapi.herokuapp.com/api/v1/blogs"

if (localStorage != null) {
  let articleId = localStorage.getItem("activeEdit");
  console.log("Local ID ", articleId);

  fetch(`${url}/${articleId}`)
    .then((response) => response.json())
    .then((data) => {

      console.log(data);

      try {
        let articles = data.blog;
        console.log("This is a detail of artical: ", articles);
        editForm.innerHTML = "";

        let myForm = `
    <form action="" id ="editForm" >
    <input type="text" value=${articles.title} placeholder="Title" name="title" id="title">
    <input type="text" value=${articles.author} placeholder="Author" name="author" id="author" disabled>
    <textarea name="text"  cols="30" rows="25" id="text">${articles.body}</textarea>
    
    <div class="bottom-action">
    <button id="cancel">Cancel</button>
    <button id="save" type="submit">Save</button>
    </div>
</form>`;

        editForm.innerHTML += myForm;
      } catch (error) {}
    });

  //update post

  const editForm = document.getElementById("editForm");
  const save = document.getElementById("save");
  const cancel = document.getElementById("cancel");

  const titleValue = document.getElementById("title");
  const authorValue = document.getElementById("author");
  const textValue = document.getElementById("text");

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let articleId = window.localStorage.getItem("activeEdit");

    const { target } = e;
    const formData = new FormData(e.target)
    let data = {}
    var object = {};
     formData.forEach(function(value, key){ object[key] = value; }); 
  
     const token = localStorage.getItem("token");
     
      fetch(`${url}/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(
         object ),
      })
        .then((response) => response.json())
        .then(() => {
          Swal.fire({
            text: "Article Updated",
            icone: "success",
          });
         window.localStorage.removeItem('activeEdit')
  
        });


      setTimeout(() => {
        window.location.pathname = resolvePathname("/dashbord.html");
      }, 3000);
    
  });
}

