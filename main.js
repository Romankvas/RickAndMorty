import { addCharactersToPage } from "./character.js";
import { addEpisodesToPage } from "./episodes.js";
import { addLocationsToPage } from "./locations.js";
import { setupWatchList } from "./watchlist.js";
const allPages = [
  { pageName: "home", functionName: null, currentPage: 1, isPagination: false },
  {
    pageName: "characters",
    functionName: addCharactersToPage,
    currentPage: 1,
    isPagination: true,
  },
  {
    pageName: "episodes",
    functionName: addEpisodesToPage,
    currentPage: 1,
    isPagination: true,
  },
  {
    pageName: "locations",
    functionName: addLocationsToPage,
    currentPage: 1,
    isPagination: true,
  },
  {
    pageName: "watchList",
    functionName: setupWatchList,
    currentPage: null,
    isPagination: false,
  },
];

// Робимо allPages доступним глобально
window.allPages = allPages;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav ul li").forEach((li) => {
    li.addEventListener("click", function (event) {
      event.preventDefault();

      const pageId = this.id;
      const currentPage = allPages.find(page => page.pageName === pageId);

      // Приховування всіх сторінок і показ тої на яку нажали
      document
        .querySelectorAll(".page")
        .forEach((page) => (page.style.display = "none"));

      document.getElementById(`page-${pageId}`).style.display = "flex";

      // Видалення від всіх вкладок класу active і добавляєм до того на який нажали
      document
        .querySelectorAll("nav ul li")
        .forEach((li) => li.classList.remove("active"));

      this.classList.add("active");

      // Приховування пагінації
      document.getElementById("pagination").style.display = "none";

      if (currentPage && currentPage.functionName) {
        currentPage.functionName(currentPage.currentPage);
      }

      if (currentPage && currentPage.isPagination) {
        document.getElementById("pagination").style.display = "flex";
      }
    });
  });
});

setupWatchList();
