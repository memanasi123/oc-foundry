const savedCharacter = JSON.parse(localStorage.getItem("ocFoundryCharacter") || "null");
const button = document.getElementById("pay-button");
if (savedCharacter) {
  document.getElementById("checkout-name").textContent = savedCharacter.name;
  document.getElementById("checkout-archetype").textContent = `${savedCharacter.archetype} · ${savedCharacter.age}`;
  document.getElementById("checkout-hook").textContent = savedCharacter.hook;
  document.querySelector(".mini-sheet").style.setProperty("--sheet-accent", savedCharacter.palette[0]);
} else {
  button.disabled = true;
  button.textContent = "Generate a character first";
}
button.addEventListener("click", () => { if (!savedCharacter) return; button.textContent = "Payment connection needed"; });
