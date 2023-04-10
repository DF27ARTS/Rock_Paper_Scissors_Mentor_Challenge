import "./rules-container.js";
import "./start-game.js";
import "./play-again.js";

export const getTotalAmount = () => {
  const currentAmount = localStorage.getItem("totalAmount");
  if (currentAmount) return currentAmount;
  else return 0;
};

const totalScoreAmount = document.querySelector(".score-amount");
totalScoreAmount.textContent = Math.max(0, getTotalAmount());
