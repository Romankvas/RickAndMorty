const modalOverlay = document.querySelector("#modal-overlay");
const modal = document.getElementById("modal");

const characterModalTemplete = (character) => {
    return `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="">
            <ul>
              <li><b>Status:</b>${character.status}</li>
              <li><b>Species:</b>${character.species}</li>
              <li><b>Gender:</b>${character.gender}</li>
              <li><b>Location:</b>${character.location.name}</li>
            </ul>
        `;
  };

export const openModal = (character) => {
    modalOverlay.style.display = "flex";
    modal.style.display = "flex";

    modal.innerHTML = characterModalTemplete(character);
}

modalOverlay.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    modal.style.display = "none";
})