/* __________ Tags ___________ */
const openRolesButton = document.querySelector(".rules-button");
const bonusRules = document.querySelector(".rules-main-container");
const closeRolesButton = document.querySelector(
  ".close-rules-container-button"
);

/* __________ Tags ___________ */

openRolesButton?.addEventListener("click", () => {
  bonusRules.style.transform = "scale(1)";
});

closeRolesButton?.addEventListener("click", () => {
  bonusRules.style.transform = "scale(0)";
});
