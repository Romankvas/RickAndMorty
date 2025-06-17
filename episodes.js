import { setupPagination } from "./pagination.js";

export const getEpisodes = async (page) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (errror) {
    console.log(errror);
  }
};

const episodeCardTemplete = (episode) => {
  return `
          <div class="container-item">
              <h3>${episode.name}</h3>
              <p>${episode.air_date}</p>
          </div>
      `;
};

export const addEpisodesToPage = async (currentPage) => {
  const episodesPage = document.getElementById("page-episodes");
  episodesPage.innerHTML = "";
  const { info, results } = await getEpisodes(currentPage);

  results.forEach((el) => {
    const episodeCardHTML = episodeCardTemplete(el);
    episodesPage.innerHTML += episodeCardHTML;
  });

  setupPagination(currentPage, info.pages, addEpisodesToPage, "episodes");
};
