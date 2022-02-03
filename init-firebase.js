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
