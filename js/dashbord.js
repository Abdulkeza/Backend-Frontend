// import Swal from "../sweetalert2";
import { resolvePathname } from "../init-firebase.js";

const tbody = document.querySelector(".post-table");
const form = document.querySelectorAll("form");
const edit = document.querySelectorAll(".edit");
const remove = document.querySelectorAll(".remove");
const addNew = document.querySelectorAll(".add-article");

// const url = "http://localhost:9000/api/v1/blogs";
const url = "https://adeoapi.herokuapp.com/api/v1/blogs";

const titleValue = document.getElementById("title");
const authorValue = document.getElementById("author");
const textValue = document.getElementById("text");
let blogArticle = document.querySelector(".articles");

//read section in dashboard
const read = async () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      let articles = data.blogs;

      try {
        tbody.innerHTML = "";
        articles.forEach((article) => {
          let tr = `
          <tr >
    
              <td>${article.title} </td>
              <td>${article.author}</td>
              
              <td>
                  <button class="edit" data-key = '${article._id}' myTitle = '${article.title} author='${article.author}'>Edit</button>
                  <button class="remove" data-key = '${article._id}'>Delete</button>
              </td>
          </tr>`;
          tbody.innerHTML += tr;
        });
      } catch (error) {
        console.log(error);
      }
    });
};

read();

//Edit and Delete button/Actions

const postTable = document.querySelector(".post-table");
const editForm = document.getElementById("editForm");

const token = localStorage.getItem("token");

try {
  postTable.addEventListener("click", async (e) => {
    const { target } = e;

    if (target.matches("tr td button.edit")) {
      let articleId = e.target.getAttribute("data-key");

      const getArticle = async () => {
        fetch(`${url}/${articleId}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);

            var localID = localStorage.setItem("activeEdit", articleId);

            // let savedID = window.localStorage.getItem("activeEdit");
            // console.log("Local ID ", savedID);

            setTimeout(() => {
              window.location.pathname = resolvePathname("/edit.html");
            }, 1000);
          });
      };

      getArticle();
    } else if (target.matches(".remove")) {
      const deletePost = () => {
        let articleId = e.target.getAttribute("data-key");
        console.log(articleId);

        //Fetch delete post
        fetch(`${url}/${articleId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            console.log(res.json());

            // window.setTimeout(() =>{location.reload()},2000)
          })
          .then((response) => {
            console.log(response);
          })

          .catch((err) => {});
      };

      //!!Notify a user
      swal({
        title: "Are you sure you want to delete this Article?",
        text: "Once deleted, it will be lost permonently",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((proceedDelete) => {
        console.log(proceedDelete);

        if (proceedDelete) {
          deletePost();

          swal("Article deleted!", {
            icon: "success",
          });
          window.setTimeout(() => {
            location.reload();
          }, 2000);
        }
      });
    }
  });
} catch (error) {}

//!!Displaying all users
// const userUrl = "http://localhost:9000/api/v1/users";
const userUrl = "https://adeoapi.herokuapp.com/api/v1/users";

const userBody = document.querySelector(".user-table");

const readUser = async () => {
  const token = localStorage.getItem("token");
  fetch(userUrl, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      let users = data.users;

      try {
        userBody.innerHTML = "";
        users.forEach((user) => {
          let tr = `
          <tr >
    
              <td>${user.name} </td>
              <td>${user.email}</td>
              
              <td>
                  <button class="edit" user-key = '${user._id}' myName = '${user.name} email='${user.email}'>Edit</button>
                  <button class="remove" user-key = '${user._id}'>Delete</button>
              </td>
          </tr>`;
          userBody.innerHTML += tr;
        });
      } catch (error) {
        console.log(error);
      }
    });
};

readUser();

//!!delete a user

userBody.addEventListener("click", (e) => {
  e.preventDefault();
  const { target } = e;

  const deleteUser = () => {
    if (target.matches("tr td button.remove")) {
      let userId = e.target.getAttribute("user-key");

      fetch(`${userUrl}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        console.log(response);
      });
    }
  };

  swal({
    title: "Are you sure you want to delete this user?",
    text: "Once deleted, he/she will be lost",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((proceedDelete) => {
    console.log(proceedDelete);

    if (proceedDelete) {
      deleteUser();

      swal("Article deleted!", {
        icon: "success",
      });
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });
});
