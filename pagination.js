const prevPage = document.querySelector("#prevPage");
const nextPage = document.querySelector("#nextPage");
const pageCounter = document.querySelector("#pageCounter");

let prevClickHandler;
let nextClickHandler;
let currentPageState = 1;
let currentPageName = '';

// Функція для переходу на попередню сторінку
const handlePrevPageClick = (currentPage, currentFunction, pageName) => {
  if (currentPage > 1) {
    currentPageState = currentPage - 1;
    currentFunction(currentPageState);
    handlePaginationPageNumber(currentPageState);
    updatePageState(pageName, currentPageState);
  } else {
    alert("You are on the first page");
  }
};

// Функція для переходу на наступну сторінку
const handleNextPageClick = (currentPage, lastPage, currentFunction, pageName) => {
  if (currentPage < lastPage) {
    currentPageState = currentPage + 1;
    currentFunction(currentPageState);
    handlePaginationPageNumber(currentPageState);
    updatePageState(pageName, currentPageState);
  } else {
    alert("You are on the last page");
  }
};

// Оновлюємо стан сторінки в масиві allPages
const updatePageState = (pageName, newPage) => {
  const page = window.allPages.find(p => p.pageName === pageName);
  if (page) {
    page.currentPage = newPage;
  }
};

// Створюємо пагінацію
export const setupPagination = (currentPage, lastPage, currentFunction, pageName) => {
  removeEventListeners();
  currentPageState = currentPage;
  currentPageName = pageName;
  handlePaginationPageNumber(currentPageState);

  prevClickHandler = () => handlePrevPageClick(currentPageState, currentFunction, pageName);
  nextClickHandler = () => handleNextPageClick(currentPageState, lastPage, currentFunction, pageName);

  prevPage.addEventListener("click", prevClickHandler);
  nextPage.addEventListener("click", nextClickHandler);
};

// Видаляємо старі слухачі
const removeEventListeners = () => {
  if (prevClickHandler) prevPage.removeEventListener("click", prevClickHandler);
  if (nextClickHandler) nextPage.removeEventListener("click", nextClickHandler);
};

// Показуємо поточну сторінку
const handlePaginationPageNumber = (currentPage) => {
  pageCounter.innerHTML = currentPage;
};
