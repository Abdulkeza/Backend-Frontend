const form = document.querySelector("form");
const tbody = document.querySelector(".post-table");
const edit = document.querySelectorAll(".edit");
const remove = document.querySelectorAll(".remove");
const addNew = document.getElementById("add-article");
const save = document.getElementById("save");

const dbRef = db.ref();
var postRef = firebase.database().ref("posts/");

// console.log(app.name);
console.log("this is dashbord");

// write data

var savePost = (title, author, text) => {
  //savePost helpus us to create new artical with 3 parameters and push it to postRef(our database refarence)
  var newPostRef = postRef.push();
  newPostRef.set({
    title: title,
    author: author,
    text: text,
  });
  swal("Artical added", "success");
  console.log("new Artical added");
  //   ($(".post-table").innerHTML = ""), listPosts();
};

if (window.location.pathname == "/newArtical.html") {
  try {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      savePost(form.title.value, form.author.value, form.text.value);
      setTimeout(() => {
        window.location.pathname = "/dashbord.html";
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
            window.location.pathname = "/edit.html";
          }, 2000);
        });
    } else if (target.matches(".remove")) {
      let articleId = e.target.getAttribute("data-key");
      //above line, we are assigning ID of individual Article to articleId
      console.log("ArticleID ", articleId);

      swal({
        title: "Are you sure you want to delete this Article?",
        text: "Once deleted, it will be lost permonently",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          postRef.child(articleId).remove();
          swal("Article deleted!", {
            icon: "success",
          });
        }
      });

      // console.log("Article Removed susseccfully!!!!1");
    }
  });
} catch (error) {}

//Editting Article Section

if (window.location.pathname == "/edit.html") {
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let text = document.getElementById("text");

  let articleId = localStorage.getItem("activeEdit");

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
      window.location.pathname = "/dashbord.html";
    }, 4000);
  });

  const cancel = document.getElementById("cancel");
  cancel.addEventListener("click", () => {
    console.log("cancel clicked");
    localStorage.removeItem("activeEdit", articleId);

    setTimeout(() => {
      window.location.pathname = "/dashbord.html";
    }, 2000);
  });
}

var updatePost = (articleId, data) => {
  //Above line, allow us to update title and text according to an ArticleID
  postRef.child(articleId).update(data);
  console.log("Post Updated");
};
