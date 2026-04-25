// 1. data Import
import { services } from "./servicesData.js";

// 2. DOM Elements
const header = document.getElementById("header");
const navbar = document.getElementById("navbar-links");
const searchInput = document.getElementById("search-field");
const searchBtn = document.querySelector(".search-section button");

const resultCard = document.getElementById("result-card");
const countDiv = document.getElementById("search-count");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    // up to 50px after change style
    header.classList.add("scrolled");
    navbar.classList.add("scrolled");
    header.classList.remove("transparent");
    navbar.classList.remove("transparent");
  } else {
    header.classList.add("transparent");
    navbar.classList.add("transparent");
    header.classList.remove("scrolled");
    navbar.classList.remove("scrolled");
  }
});

header.classList.add("transparent");
navbar.classList.add("transparent");

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

// popup close
const popup = document.getElementById("welcome-msg");
if (popup) {
  popup.addEventListener("click", () => {
    popup.style.opacity = "0";

    setTimeout(() => {
      popup.remove();
    }, 600);
  });
}

// 5. Search Logic
window.searchLink = function (demoQuery = null) {
  let query = (demoQuery || searchInput.value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");

  if (!query) {
    resultCard.style.display = "none";
    return;
  }

  // const filteredResults = services.filter(
  //   (service) =>
  //     service.title.toLowerCase().includes(query) ||
  //     service.main.toLowerCase().includes(query) ||
  //     service.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
  // );
  const filteredResults = services.filter((service) => {
    const title = service.title.toLowerCase();
    const main = service.main.toLowerCase();
    const keywords = service.keywords.join(" ").toLowerCase();

    return (
      title.includes(query) || main.includes(query) || keywords.includes(query)
    );
  });

  // const uniqueResults = [
  //   ...new Map(results.map((item) => [item.title, item])).values(),
  // ];

  displayResults(filteredResults);
};

// 6. Display Results Logic
function displayResults(results) {
  resultCard.innerHTML = "";
  resultCard.style.display = "block";
  countDiv.style.display = "block";

  if (results.length > 0) {
    countDiv.innerHTML = `Showing ${results.length} result(s) found for you.`;
  } else {
    countDiv.style.display = "none";
    countDiv.textContent = "No results found. Try another word.";
    return;
  }

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

// 7. Event Listeners
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

// const results = services.filter((service) =>
//   service.keywords.some((keyword) => keyword.includes(searchText)),
// );

// search function
// const searchServices = (query) => {
//   return services.filter(
//     (service) =>
//       service.title.toLowerCase().includes(query.toLowerCase()) ||
//       service.keywords.some((keyword) =>
//         keyword.toLowerCase().includes(query.toLowerCase()),
//       ),
//   );
// };
