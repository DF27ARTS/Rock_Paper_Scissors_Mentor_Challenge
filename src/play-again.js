const gameOptions = document.querySelector(".game-options-contaner");
const newGameContainer = document.querySelector(".play-game-container");

const singlePlayerIcon = document.querySelectorAll(".single-player-icon")[1];

export const newGame = () => {
  singlePlayerIcon.style.transform = "scale(0)";

  newGameContainer.style.transform = "scale(0)";
  setTimeout(() => {
    newGameContainer.style.display = "none";

    gameOptions.style.display = "block";
    setTimeout(() => {
      gameOptions.style.transform = "scale(1)";
    }, 50);
  }, 100);
};
