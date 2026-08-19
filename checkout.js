const button = document.getElementById("pay-button");

const BACKEND_URL = "https://oc-foundry-server.vercel.app";

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

button.addEventListener("click", async () => {
  const savedCharacter = getCharacter();

  if (!savedCharacter) return;

  button.textContent = "Redirecting… ✨";
  button.disabled = true;

  try {
    const res = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // 👇 THIS IS THE ONLY PART WE ARE CHANGING 👇
      body: JSON.stringify({
        items: [
          {
            price: 'price_1U63XSBMLlQjaKDGM5aa3DWA',
            quantity: 1
          }
        ]
      })
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("No checkout URL returned from server");
    }

  } catch (error) {
    console.error(error);

    button.textContent = "Something went wrong 💔 Try again";

    setTimeout(() => {
      button.disabled = false;
      button.textContent = "Continue to secure payment →";
    }, 2000);
  }
});
