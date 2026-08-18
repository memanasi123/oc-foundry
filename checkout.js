const button = document.getElementById("pay-button");

function getCharacter() {
  return JSON.parse(localStorage.getItem("ocFoundryCharacter") || "null");
}

function renderCharacter() {
  const savedCharacter = getCharacter();

  if (!savedCharacter) {
    button.disabled = true;
    button.textContent = "Generate a character first";
    return null;
  }

  document.getElementById("checkout-name").textContent = savedCharacter.name;
  document.getElementById("checkout-archetype").textContent =
    `${savedCharacter.archetype} · ${savedCharacter.age}`;
  document.getElementById("checkout-hook").textContent = savedCharacter.hook;

  document
    .querySelector(".mini-sheet")
    .style.setProperty("--sheet-accent", savedCharacter.palette?.[0] || "#999");

  button.disabled = false;
  button.textContent = "Continue to secure payment →";

  return savedCharacter;
}

renderCharacter();

button.addEventListener("click", () => {
  const savedCharacter = getCharacter();
  if (!savedCharacter) return;

  button.textContent = "Preparing checkout… ✨";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Payment provider not connected yet 💳";
    setTimeout(() => {
      button.disabled = false;
      button.textContent = "Try again";
    }, 1500);
  }, 1000);
});
