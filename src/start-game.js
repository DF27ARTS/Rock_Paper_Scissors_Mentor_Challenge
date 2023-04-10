/* __________ Inport __________ */
import { getTotalAmount } from "./main.js";
import { newGame } from "./play-again.js";

/* __________ Tags __________ */
const BonusGameOptions = document.querySelector(".game-options-contaner");
const BonusGameButtons = document.querySelectorAll(
  '[area-button="single-button-option"]'
);
const OptionButtons = document.querySelectorAll('[area-click="click-button"]');

const playAgainButton = document.querySelector(".container-winner-play-again");

const WinnerGameContainer = document.querySelector(".play-game-container");

/* __________ Variables __________ */
const OPTIONS = [
  { name: "scissors", url: "./images/icon-scissors.svg" },
  { name: "paper", url: "./images/icon-paper.svg" },
  { name: "rock", url: "./images/icon-rock.svg" },
  { name: "lizard", url: "./images/icon-lizard.svg" },
  { name: "spock", url: "./images/icon-spock.svg" },
];

/* __________ Function __________ */
const getRandomOption = () => {
  const RANDOM_NUMBER = Math.round(Math.random(0) * 4);
  return OPTIONS[RANDOM_NUMBER];
};

const selectWinner = (playerOne, playerTwo) => {
  switch (playerOne) {
    case "scissors":
      if (playerTwo === "paper" || playerTwo === "lizard") return true;
      else if (playerTwo === "spock" || playerTwo === "rock") return false;
      break;
    case "paper":
      if (playerTwo === "rock" || playerTwo === "spock") return true;
      else if (playerTwo === "lizard" || playerTwo === "scissors") return false;
      break;
    case "rock":
      if (playerTwo === "lizard" || playerTwo === "scissors") return true;
      else if (playerTwo === "paper" || playerTwo === "spock") return false;
      break;
    case "lizard":
      if (playerTwo === "spock" || playerTwo === "paper") return true;
      else if (playerTwo === "scissors" || playerTwo === "rock") return false;
      break;
    case "spock":
      if (playerTwo === "scissors" || playerTwo === "rock") return true;
      else if (playerTwo === "paper" || playerTwo === "lizard") return false;
      break;
    default:
      break;
  }
};

const setWinner = (playerOne, PlayerTwo) => {
  const winner = selectWinner(playerOne, PlayerTwo);
  const totalScoreAmount = document.querySelector(".score-amount");

  const containerWinner = document.querySelector(".container-winner");
  const winnerText = containerWinner.firstElementChild;

  if (winner) {
    const WINNER = document.querySelector('[area-single-player="player"]');
    WINNER.classList.add("single-player-icon-active");

    const amount = parseInt(getTotalAmount()) + 1;
    localStorage.setItem("totalAmount", Math.max(0, amount));
    totalScoreAmount.textContent = getTotalAmount() <= 0 ? 0 : getTotalAmount();

    winnerText.textContent = "YOU WIN";
  } else {
    const WINNER = document.querySelector('[area-single-player="computer"]');
    WINNER.classList.add("single-player-icon-active");

    const amount = parseInt(getTotalAmount()) - 1;
    localStorage.setItem("totalAmount", Math.max(0, amount));
    totalScoreAmount.textContent = getTotalAmount() <= 0 ? 0 : getTotalAmount();

    winnerText.textContent = "YOU LOSE";
  }
  containerWinner?.classList.add("open");
};

const setComputerOption = (PlayerOption) => {
  const singlePlayerIcon = document.querySelectorAll(".single-player-icon")[1];
  const singleOptionImg = document.querySelectorAll(
    '[area-player-icon="icon image"]'
  )[1];

  const ComputerOptionSelected = getRandomOption();

  if (PlayerOption === ComputerOptionSelected.name) {
    setComputerOption(PlayerOption);
  } else {
    setTimeout(() => {
      singlePlayerIcon.setAttribute("area-button", ComputerOptionSelected.name);
      singleOptionImg.src = ComputerOptionSelected.url;
      singlePlayerIcon.style.transform = "scale(1)";

      setWinner(PlayerOption, ComputerOptionSelected.name);
    }, 3000);
  }
};

const startNewGame = (URL) => {
  const currentActiveWinner = document.querySelector(
    ".single-player-icon-active"
  );
  currentActiveWinner?.classList.remove("single-player-icon-active");

  const containerWinner = document.querySelector(".container-winner");
  containerWinner?.classList.remove("open");

  const setUserOption = () => {
    WinnerGameContainer.style.display = "grid";
    WinnerGameContainer.style.transform = "scale(1)";

    const buttonAttribute = URL.split("/")
      [URL.split("/").length - 1].split(".")[0]
      .split("-")[1];

    const singlePlayerIcon = document.querySelectorAll(
      ".single-player-icon"
    )[0];
    singlePlayerIcon.setAttribute("area-button", buttonAttribute);

    const singleOptionImg = document.querySelectorAll(
      '[area-player-icon="icon image"]'
    )[0];
    singleOptionImg.src = URL;

    setComputerOption(buttonAttribute);
  };

  BonusGameOptions.style.transform = "scale(0)";
  BonusGameOptions.style.display = "none";
  setUserOption();
};

const setClickAnimation = (index) => {
  OptionButtons[index].classList.add("button-clicked");

  setTimeout(() => {
    OptionButtons[index].classList.remove("button-clicked");
  }, 250);
};

/* __________ Listeners __________ */
BonusGameButtons.forEach((button, inndex) => {
  button.addEventListener("click", ({ target: { currentSrc } }) => {
    setClickAnimation(inndex);
    setTimeout(() => {
      startNewGame(currentSrc);
    }, 400);
  });
});

playAgainButton.addEventListener("click", () => newGame());
