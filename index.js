function goToPage(page) {
    window.location.href = page;
  }

function loadPart(id, file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(" cannot find the file: " + file);
      return res.text();
    })
    .then(data => document.getElementById(id).innerHTML = data)
    .catch(err => console.error(err));
}

window.addEventListener("DOMContentLoaded", () => {
  loadPart("header", "/main/header.html"); 
  loadPart("footer", "/main/footer.html"); 
});


function getTranslationPath() {
  return "../../arabic.json"; 
}

function translate(lang) {
  const pageId = document.body.dataset.page; 
  const jsonPath = getTranslationPath();

  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      const pageData = data.pages[pageId];
      if (!pageData) return;

      if (lang === "ar") {
        const h1 = document.querySelector("h1");
        if (h1) h1.innerText = pageData.h1;

        const desc = document.querySelector(".def-figure p");
        if (desc) desc.innerText = pageData.desc;

        const aboutTitle = document.querySelector(".about h2");
        if (aboutTitle) aboutTitle.innerText = pageData["about-title"];

        const aboutPs = document.querySelectorAll(".about p");
        if (aboutPs.length >= 2) {
          aboutPs[0].innerText = pageData["about-p1"];
          aboutPs[1].innerText = pageData["about-p2"];
        }

        const workTitle = document.querySelector(".work h2");
        if (workTitle) workTitle.innerText = pageData["work-title"];

        const workPs = document.querySelectorAll(".work p");
        if (workPs.length >= 2) {
          workPs[0].innerText = pageData["work-p1"];
          workPs[1].innerText = pageData["work-p2"];
        }
      }
      // إذا اللغة إنجليزية، نترك الصفحة كما هي افتراضياً
    });
}

// ----------------------
// تحميل الهيدر المشترك
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  fetch("../../main/header.html")
    .then(res => res.text())
    .then(data => {
      const headerContainer = document.createElement("div");
      headerContainer.id = "header-container";
      headerContainer.innerHTML = data;
      document.body.prepend(headerContainer);

      // بعد ما يتحمل الهيدر، نربط السليكتر للغة
      const langSelect = document.getElementById("language-select");
      if (langSelect) {
        langSelect.addEventListener("change", () => {
          const selectedLang = langSelect.value;
          if (selectedLang === "en") {
            location.reload(); // إعادة تحميل للإنجليزية
          } else {
            translate(selectedLang); // ترجمة عربي
          }
        });
      }
    });

  // ترجمة افتراضية عند التحميل (الإنجليزية)
});
