import { setupPagination } from "./pagination.js";

const getLocations = async (page) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/location/?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (errror) {
    console.log(errror);
  }
};

const locationCardTemplete = (location) => {
  return `
          <div class="container-item">
              <h3>${location.name}</h3>
              <p>Type: ${location.type}</p>
              <p>Dimension: ${location.dimension}</p>
          </div>
      `;
};

export const addLocationsToPage = async (currentPage) => {
  const locationsPage = document.getElementById("page-locations");
  locationsPage.innerHTML = "";
  const { info, results } = await getLocations(currentPage);

  results.forEach((el) => {
    const locationCardHTML = locationCardTemplete(el);
    locationsPage.innerHTML += locationCardHTML;
  });

  setupPagination(currentPage, info.pages, addLocationsToPage, "locations");
}; 