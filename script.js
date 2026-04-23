// // import servicesData file
// import { services } from "./servicesData.js";
// console.log(services);

// // 1. Header & Navigation Logic
// const header = document.getElementById("header");
// const navbar = document.getElementById("navbar-links");

// window.addEventListener("scroll", function () {
//   if (window.scrollY > 50) {
//     // up to 50px after change style
//     header.classList.add("scrolled");
//     navbar.classList.add("scrolled");
//     header.classList.remove("transparent");
//     navbar.classList.remove("transparent");
//   } else {
//     header.classList.add("transparent");
//     navbar.classList.add("transparent");
//     header.classList.remove("scrolled");
//     navbar.classList.remove("scrolled");
//   }
// });

// // Initial state
// header.classList.add("transparent");
// navbar.classList.add("transparent");

// // Mobile Menu Toggle Function
// function headers() {
//   const more_btns = document.getElementById("menu-btns");
//   const icon = more_btns.querySelector("i");

//   more_btns.addEventListener("click", (e) => {
//     e.stopPropagation();
//     navbar.classList.toggle("active");

//     if (navbar.classList.contains("active")) {
//       icon.classList.add("fa-xmark");
//       icon.classList.remove("fa-bars-staggered");
//     } else {
//       icon.classList.add("fa-bars-staggered");
//       icon.classList.remove("fa-xmark");
//     }
//   });
// }
// headers();

// // 3. Search & Display Logic
// function searchLink(demoQuery = null) {
//   window.searchLink = searchLink;
//   const searchInput = document.getElementById("search-field");
//   const resultCard = document.getElementById("result-card");

//   // User ටයිප් කළ අගය හෝ Demo අගය ලබා ගැනීම
//   let query = (demoQuery || searchInput.value).toLowerCase().trim();

//   if (query === "") {
//     resultCard.style.display = "none";
//     resultCard.innerHTML = "";
//     return;
//   }

//   const results = searchCategories(query);
//   displayResults(results);
// }

// // Category search function
// function searchCategories(searchText) {
//   return services.filter((service) => {
//     const titleMatch = service.title.toLowerCase().includes(searchText);
//     const categoryMatch = service.main.toLowerCase().includes(searchText);
//     const keywordMatch = service.keywords.some((keyword) =>
//       keyword.toLowerCase().includes(searchText),
//     );
//     return titleMatch || categoryMatch || keywordMatch;
//   });
// }

// // Display result function (නිවැරදි කරන ලද)
// function displayResults(results) {
//   const resultDiv = document.getElementById("result-card");
//   resultDiv.innerHTML = ""; // පරණ results ඉවත් කිරීම
//   resultDiv.style.display = "block";

//   if (results.length === 0) {
//     resultDiv.innerHTML = `
//       <p style="color: #ff4d4d; padding: 15px; text-align: center; font-weight: bold;">
//         <i class="fa-solid fa-circle-exclamation fa-fade"></i>
//         No results found. Please check your spelling or try different keywords.
//       </p>
//     `;
//     return;
//   }

//   // සියලුම ප්‍රතිඵල loop එකක් හරහා පෙන්වීම
//   results.forEach((service) => {
//     // URL එක නිවැරදිව පරීක්ෂා කිරීම
//     const finalUrl = service.url.startsWith("http")
//       ? service.url
//       : "https://" + service.url;

//     resultDiv.innerHTML += `
//       <div
//         class="disCard"
//         style="display: flex; justify-content: space-between; align-items: center; padding: 12px; margin-bottom: 8px; background: rgba(255,255,255,0.1); border-radius: 6px;">
//         <div>
//           <h2 style="font-size: 1.1rem; margin: 0;">${service.title}</h2>
//         </div>
//         <a
//           href="${finalUrl}"
//           target="_blank"
//           style="color: #14d198; text-decoration: none; font-weight: bold; font-size: 0.9rem;">
//           Visit Portal <i class="fa-solid fa-chevron-right"></i>
//         </a>
//       </div>
//     `;
//   });
// }

// // Auto-update Copyright Year
// const yearSpan = document.getElementById("year");
// if (yearSpan) yearSpan.innerText = new Date().getFullYear();

// 1. දත්ත Import කරගැනීම
import { services } from "./servicesData.js";

// 2. DOM Elements ලබාගැනීම
const header = document.getElementById("header");
const navbar = document.getElementById("navbar-links");
const searchInput = document.getElementById("search-field");
const searchBtn = document.querySelector(".search-section button");
const resultCard = document.getElementById("result-card");

// 3. Scroll Effect Logic
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    navbar.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    navbar.classList.remove("scrolled");
  }
});

// 4. Mobile Menu Toggle
function initNavigation() {
  const more_btns = document.getElementById("menu-btns");
  const icon = more_btns.querySelector("i");

  more_btns.addEventListener("click", (e) => {
    e.stopPropagation();
    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
      icon.classList.replace("fa-bars-staggered", "fa-xmark");
    } else {
      icon.classList.replace("fa-xmark", "fa-bars-staggered");
    }
  });
}
initNavigation();

// 5. Search Logic (මෙහි function එක 'window' එකට සම්බන්ධ කර ඇත)
window.searchLink = function (demoQuery = null) {
  let query = (demoQuery || searchInput.value).toLowerCase().trim();

  if (!query) {
    resultCard.style.display = "none";
    return;
  }

  const filteredResults = services.filter(
    (service) =>
      service.title.toLowerCase().includes(query) ||
      service.main.toLowerCase().includes(query) ||
      service.keywords.some((kw) => kw.toLowerCase().includes(query)),
  );

  displayResults(filteredResults);
};

// 6. Display Results Logic
function displayResults(results) {
  resultCard.innerHTML = "";
  resultCard.style.display = "block";

  if (results.length === 0) {
    resultCard.innerHTML = `
      <p style="color: #ff4d4d; padding: 15px; text-align: center;">
        No results found. Try another word.
      </p>
  `;
    return;
  }

  results.forEach((service) => {
    const finalUrl = service.url.startsWith("http")
      ? service.url
      : "https://" + service.url;
    resultCard.innerHTML += `
      <div
        class="disCard"
        style="display: flex; justify-content: space-between; align-items: center; padding: 12px; margin-bottom: 8px; background: rgba(255,255,255,0.1); border-radius: 6px;">
        <div>
          <h2 style="font-size: 1.1rem; margin: 0;">${service.title}</h2>
        </div>
        <a
          href="${finalUrl}"
          target="_blank"
          style="color: #14d198; text-decoration: none; font-weight: bold;">
          Visit <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>
    `;
  });
}

// 7. Event Listeners (HTML onclick වෙනුවට)
if (searchBtn) {
  searchBtn.addEventListener("click", () => window.searchLink());
}

if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") window.searchLink();
  });
}

// 8. Copyright Year Auto-update
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.innerText = new Date().getFullYear();
