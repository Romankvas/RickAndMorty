import { setupPagination } from "./pagination.js";
import { openModal } from "./modal.js";

const getCharacters = async (page) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (errror) {
    console.log(errror);
  }
};

const getOneCharacter = async (id) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response.json();
    return data;
  } catch (errror) {
    console.log(errror);
  }
};

const characterCardTemplete = (character) => {
  return `
          <div class="card" style="background-image:url(${character.image})">
              <h3>${character.name}</h3>
          </div>
      `;
};

export const addCharactersToPage = async (currentPage) => {
  const charactersPage = document.getElementById("page-characters");
  charactersPage.innerHTML = "";
  const { info, results } = await getCharacters(currentPage);

  results.forEach((el) => {
    const characterCardHTML = characterCardTemplete(el);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML += characterCardHTML;

    const card = tempDiv.firstElementChild;

    card.addEventListener("click", async () => {
      const character = await getOneCharacter(el.id);
      openModal(character);
    });

    charactersPage.append(card);
  });

  setupPagination(currentPage, info.pages, addCharactersToPage, "characters");
};
