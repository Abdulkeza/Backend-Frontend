console.log("initialization of firebase lemmemgo");

const firebaseConfig = {
  apiKey: "AIzaSyBzTdedYr_iahsV7dDur9FEzSXgeuVs7cI",
  authDomain: "eagle-app-1b978.firebaseapp.com",
  projectId: "eagle-app-1b978",
  storageBucket: "eagle-app-1b978.appspot.com",
  messagingSenderId: "456708535525",
  appId: "1:456708535525:web:53178c8f141c412b97500c",
  databaseURL:
    "https://eagle-app-1b978-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
//  console.log(app.name);

export const showNotification = (
  message,
  type = "success",
  duration = 3000
) => {
  Swal.fire({
    html: message,
    icon: type,
    timer: duration,
    showConfirmButton: false,
  });
};

export const resolvePathname = (path) => {
  let host = window.location.host;
  // console.log(host);
  let local = "127.0.0.1";
  let gitHost = "abdulkeza.github.io";
  if (host.startsWith(local)) {
    return path;
  } else if (host.startsWith(gitHost)) {
    let newPath = "/Mywebsite" + path;
    return newPath;
  } else {
    return path;
  }
};
