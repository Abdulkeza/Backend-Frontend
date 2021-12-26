import { resolvePathname } from "../init-firebase.js";

const form = document.querySelector("form");
const tbody = document.querySelector(".post-table");
const edit = document.querySelectorAll(".edit");
const remove = document.querySelectorAll(".remove");
const addNew = document.getElementById("add-article");
const save = document.getElementById("save");

var postRef = firebase.database().ref("posts/");

// write data

var savePost = (title, author, text) => {
  //savePost helpus us to create new artical with 3 parameters and push it to postRef(our database refarence)
  var newPostRef = postRef.push();
  newPostRef.set({
    title: title,
    author: author,
    text: text,
  });
  //swal("Artical added", "success"); // This part can not work. please see the function I created about shpwing notification
  // to learn more about using SweetAlerts.

  // As a example see the proper implementation here

  Swal.fire({
    text: "Article added",
    icone: "success",
  });
  console.log("new Artical added"); // No need to log the notification after setting up visual one

  /*
  Use the above implementation or the function to define a proper notification
  
  */
  //   ($(".post-table").innerHTML = ""), listPosts();
};

if (window.location.pathname == resolvePathname("/newArtical.html")) {
  try {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      savePost(form.title.value, form.author.value, form.text.value);
      setTimeout(() => {
        window.location.pathname = resolvePathname("/dashbord.html");
      }, 3000);
    });
  } catch (error) {}
}

//read section

function read() {
  //read function help us to read data from the firebase
  postRef.on("value", (snapshot) => {
    //postRef.on help us to access the actual content in our firebase
    let articles = snapshot.val();
    try {
      tbody.innerHTML = "";
      Object.keys(articles).forEach((key) => {
        let article = articles[key];
        console.log(key);

        let tr = `
          <tr >
    
              <td>${article.title}</td>
              <td>${article.author}</td>
              
              <td>
                  <button class="edit" data-key = '${key}'>Edit</button>
                  <button class="remove" data-key = '${key}'>Delete</button>
              </td>
          </tr>`;
        tbody.innerHTML += tr;
      });
    } catch (error) {
      console.log(error);
    }
  });
}

read();

const postTable = document.querySelector(".post-table");

//Edit and Delete button/Actions

try {
  postTable.addEventListener("click", (e) => {
    const { target } = e;
    if (target.matches("tr td button.edit")) {
      let articleId = e.target.getAttribute("data-key");
      //above statement help us to get the ID of a post
      console.log("ArticleId", articleId);
      postRef
        .child(articleId)
        //above line help us to access every single element of content
        .get()
        .then((snapshot) => {
          console.log(snapshot.val());
          localStorage.setItem("activeEdit", articleId);
          //above function help

          setTimeout(() => {
            window.location.pathname = resolvePathname("/edit.html");
          }, 300); //use small time

          // A user should receive an instant effect after clicking a button
          // That is why you should not use the timeout function or reduce the
          // time to an untociable time to simulate page loading
        });
    } else if (target.matches(".remove")) {
      //Explain this concept of using the getAttribute
      let articleId = e.target.getAttribute("data-key");
      //above line, we are assigning ID of individual Article to articleId
      console.log("ArticleID ", articleId);

      // Please modify this call
      //You were in the right way to calling the function even provided the options correctly

      swal({
        title: "Are you sure you want to delete this Article?",
        text: "Once deleted, it will be lost permonently",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        //To use the promise callback, please refer to this.
        // https://sweetalert2.github.io/#:~:text=A%20confirm%20dialog%2C%20with%20a%20function%20attached%20to%20the%20%22Confirm%22%2Dbutton
        if (willDelete) {
          postRef.child(articleId).remove();

          //change this call also
          swal("Article deleted!", {
            icon: "success",
          });
        }
      });

      // console.log("Article Removed susseccfully!!!!1");
    }
  });
} catch (error) {
  //use a function to nitify a user
}

//Editting Article Section

if (window.location.pathname == resolvePathname("/edit.html")) {
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let text = document.getElementById("text");

  let articleId = localStorage.getItem("activeEdit");
  // What happens when there is no ID stored in Localstorage

  postRef
    .child(articleId)
    //Accessing individual element of post
    .get()
    .then((snapshot) => {
      title.value = snapshot.val().title;
      author.value = snapshot.val().author;
      text.value = snapshot.val().text;
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    title = title.value;
    author = author.value;
    text = text.value;

    let data = {
      title: title,
      text: text,
    };
    updatePost(articleId, data);
    //Calling updatePost function for updating post

    swal("Successfully updated.");
    setTimeout(() => {
      window.location.pathname = resolvePathname("/dashbord.html");
    }, 4000); // 4 seconds is a long time to wait for process
    // At least keep it at 2 and show a loader.
    //Look through fontawesome library
  });

  const cancel = document.getElementById("cancel");
  cancel.addEventListener("click", () => {
    console.log("cancel clicked");
    localStorage.removeItem("activeEdit", articleId);
    //This one is great

    setTimeout(() => {
      window.location.pathname = resolvePathname("/dashbord.html");
    }, 2000);
  });
}

var updatePost = (articleId, data) => {
  /** We take two parameter:
   *      articleID: to find the article being editted
   *      data: collected from the submitted form*/

  //Above line, allow us to update title and text according to an ArticleID
  postRef.child(articleId).update(data); //Use new added data to update the article

  // To-Do
  //Check if a given field was edited or not.
  //It is not efficient to update all fields, even when they were not changed.
  //Look for field properties which allow us to know if a given field has changed.
  console.log("Post Updated");
  // Notify a user
};
