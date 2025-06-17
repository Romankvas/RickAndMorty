import { getEpisodes } from "./episodes.js";
import {
    addToWatchList,
    getWatchList,
    removeFromWatchList,
    toggleWatched,
} from "./storage.js";
const createWatchListItem = (episode) => {
    return `
    <div class="watch-list-item" data-id="${episode.id}">
      <div class="watch-list-item-info">
        <h3>${episode.name}</h3>
        <p>${episode.air_date}</p>
      </div>
      <div class="watch-list-item-controls">
        <label class="watched-checkbox">
          <input type="checkbox" ${episode.watched ? "checked" : ""}>
          Watched
        </label>
        <button class="remove-btn">Remove</button>
      </div>
    </div>
  `;
};

const renderWatchList = () => {
    const watchList = getWatchList();
    const watchListContainer = document.getElementById("watch-list-container");

    watchListContainer.innerHTML = "";

    if (watchList.length === 0) {
        watchListContainer.innerHTML =
            '<p class = "empty-list"> Your watch list is empty</p>';
        return;
    }
    console.log(watchList);
    
    watchList.forEach((episode) => {
        const episodeElement = document.createElement("div");
        episodeElement.innerHTML = createWatchListItem(episode);
        const watchListItem = episodeElement.firstElementChild;
        watchListContainer.appendChild(watchListItem);

        const checkbox = watchListItem.querySelector("input[type='checkbox']");
        const removeBtn = watchListItem.querySelector(".remove-btn");

        if (checkbox) {
            checkbox.addEventListener("change", () => {
                toggleWatched(episode.id);
                renderWatchList();
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                removeFromWatchList(episode.id);
                renderWatchList();
            });
        }
    })

};

export const setupWatchList = async () => {
    const watchListPage = document.getElementById("page-watchlist");
    const allEpisodes = [];
    for (let i = 1; i <= 3; i++) {
        const { results } = await getEpisodes(i);
        results.forEach((episode) => {
            allEpisodes.push(episode);
        });
    }
    
    const select = document.getElementById("episode-select");
    allEpisodes.forEach((episode) => {
        const option = document.createElement("option");
        option.value = episode.id;
        option.textContent = episode.name;
        select.appendChild(option);
    });

    const addButton = document.getElementById("add-episode-btn");
    addButton.addEventListener("click", () => {
        const selectedEpisode = allEpisodes.find(
            (episode) => episode.id === parseInt(select.value
            ));

        if (selectedEpisode) {
            addToWatchList(selectedEpisode);
            renderWatchList();
            select.value = "";
        }
    });
    renderWatchList();
};
