function goToPage(page) {
  window.location.href = page;
}

function loadPart(id, file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("cannot find the file: " + file);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(err));
}

window.addEventListener("DOMContentLoaded", () => {
  loadPart("header", "/main/header.html");
  loadPart("footer", "/main/footer.html");
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("../../main/header.html")
    .then(res => res.text())
    .then(data => {
      const headerContainer = document.createElement("div");
      headerContainer.id = "header-container";
      headerContainer.innerHTML = data;
      document.body.prepend(headerContainer);
    })
    .catch(err => console.error(err));
});
