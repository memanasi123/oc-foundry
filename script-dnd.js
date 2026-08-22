// ============================================
// OC FOUNDRY — D&D 5E GENERATOR LOGIC
// ============================================

let selectedClass = "any";
let selectedRace = "any";
let currentDndCharacter = null;
let rollCount = 0;

const pick = list => list[Math.floor(Math.random() * list.length)];

// Generate realistic D&D 5e ability scores with modifiers
function generateAbilityScores(primaryStat) {
  const standardArray = [15, 14, 13, 12, 10, 8];
  
  // Shuffle array
  const shuffled = [...standardArray].sort(() => Math.random() - 0.5);
  
  // Ensure primary stat gets the highest score (15)
  const stats = { str: 10, dex: 10, con: 12, int: 10, wis: 10, cha: 10 };
  const keys = ["str", "dex", "con", "int", "wis", "cha"];
  
  // Give 15 to primary
  stats[primaryStat] = 15;
  const remainingKeys = keys.filter(k => k !== primaryStat);
  const remainingScores = shuffled.filter(s => s !== 15);

  remainingKeys.forEach((key, i) => {
    stats[key] = remainingScores[i] || 10;
  });

  // Calculate +mod helper: Math.floor((score - 10) / 2)
  const formatMod = (score) => {
    const mod = Math.floor((score - 10) / 2);
    return `${score} (${mod >= 0 ? "+" + mod : mod})`;
  };

  return {
    str: formatMod(stats.str),
    dex: formatMod(stats.dex),
    con: formatMod(stats.con),
    int: formatMod(stats.int),
    wis: formatMod(stats.wis),
    cha: formatMod(stats.cha)
  };
}

function rollDndCharacter() {
  const overlay = document.getElementById("dice-overlay");
  const diceText = document.getElementById("dice-text");
  
  // Array of fun D&D rolling messages
  const rollMessages = [
    "Rolling d20... 🎲",
    "Checking Initiative... ⚔️",
    "Consulting the Spellbook... 📜",
    "Natural 20! ✨",
    "Gathering Party... 🛡️"
  ];

  // 1. Show spinning dice overlay
  if (overlay) {
    diceText.innerHTML = pick(rollMessages);
    overlay.hidden = false;
  }

  // 2. Wait 750ms for the dice tumble animation, then reveal hero
  setTimeout(() => {
    rollCount += 1;
    
    const raceKey = selectedRace === "any" ? pick(Object.keys(dndData.races)) : selectedRace;
    const classKey = selectedClass === "any" ? pick(Object.keys(dndData.classes)) : selectedClass;

    const raceObj = dndData.races[raceKey];
    const classObj = dndData.classes[classKey];
    
    const nameList = dndData.names[raceKey] || dndData.names.human;
    const name = pick(nameList);
    const background = pick(dndData.backgrounds);
    const alignment = pick(dndData.alignments);
    const hook = pick(dndData.hooks);
    const gear = pick(dndData.equipment);
    const feature = dndData.features[classKey] || "Class Feature";
    const palette = pick(dndData.palettes);
    const scores = generateAbilityScores(classObj.primary);

    // Update UI Elements
    document.getElementById("dnd-name").textContent = name;
    document.getElementById("dnd-meta").textContent = `${raceObj.name} ${classObj.name} · ${background}`;
    document.getElementById("dnd-alignment").textContent = alignment;
    document.getElementById("dnd-hook").textContent = `"${hook}"`;

    // Update Stats
    document.getElementById("stat-str").textContent = scores.str;
    document.getElementById("stat-dex").textContent = scores.dex;
    document.getElementById("stat-con").textContent = scores.con;
    document.getElementById("stat-int").textContent = scores.int;
    document.getElementById("stat-wis").textContent = scores.wis;
    document.getElementById("stat-cha").textContent = scores.cha;

    // Details
    document.getElementById("dnd-feature").textContent = feature;
    document.getElementById("dnd-gear").textContent = gear;
    document.getElementById("dnd-personality").textContent = `Driven by a strict code of ${alignment}. ${raceObj.traits}`;
    document.getElementById("dnd-prompt").textContent = `Miniature / Art Concept: Frame ${name} in action using ${feature.split("&")[0]} while wearing gear matching their ${background} background.`;

    document.getElementById("sheet-number").textContent = `NO. ${String(rollCount).padStart(3, "0")}`;

    // Swatch rendering
    const paletteEl = document.getElementById("palette");
    paletteEl.innerHTML = `
      <div class="palette-stack">
        ${palette.map(color => `
          <div class="swatch-row" title="Click to copy ${color}" onclick="navigator.clipboard.writeText('${color}')">
            <div class="swatch-pill" style="background-color: ${color} !important;"></div>
            <span class="swatch-code">${color}</span>
          </div>
        `).join("")}
      </div>
    `;

    // Build character object for storage
    currentDndCharacter = {
      name,
      archetype: `${raceObj.name} ${classObj.name} (${background})`,
      age: alignment,
      hook,
      visual: `5e ${raceObj.name} ${classObj.name} with ${background} background. Primary gear: ${gear}`,
      personality: `Driven by ${alignment} alignment. ${raceObj.traits}`,
      detail: `Feature: ${feature}`,
      tension: `Flaw: Bound by their background history as a ${background}.`,
      scene: `D&D 5e Key Moment: ${name} using ${feature} in a critical encounter.`,
      palette,
      world: "fantasy"
    };

    localStorage.setItem("ocFoundryCharacter", JSON.stringify(currentDndCharacter));

    // Reveal UI
    document.getElementById("empty-state").hidden = true;
    document.getElementById("result-content").hidden = false;
    document.getElementById("unlock-tease").hidden = false;
    document.getElementById("tease-name").textContent = name.split(" ")[0];
    document.getElementById("character-sheet").classList.remove("empty");

    // Hide dice overlay
    if (overlay) overlay.hidden = true;

    // Smooth scroll to character
    document.getElementById("generator").scrollIntoView({ behavior: "smooth", block: "center" });

  }, 750);
}

// Filter listeners
document.querySelectorAll("#class-filters .filter").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedClass = btn.dataset.class;
    document.querySelectorAll("#class-filters .filter").forEach(b => b.classList.toggle("active", b === btn));
  });
});

document.querySelectorAll("#race-filters .filter").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedRace = btn.dataset.race;
    document.querySelectorAll("#race-filters .filter").forEach(b => b.classList.toggle("active", b === btn));
  });
});

document.getElementById("dnd-generate").addEventListener("click", rollDndCharacter);
document.getElementById("dnd-regenerate").addEventListener("click", rollDndCharacter);
document.getElementById("dnd-reroll").addEventListener("click", () => {
  if (currentDndCharacter) {
    const raceKey = selectedRace === "any" ? "human" : selectedRace;
    const nameList = dndData.names[raceKey] || dndData.names.human;
    const newName = pick(nameList);
    document.getElementById("dnd-name").textContent = newName;
    currentDndCharacter.name = newName;
    localStorage.setItem("ocFoundryCharacter", JSON.stringify(currentDndCharacter));
  }
});

// Bucket Integration
const addBucketBtn = document.getElementById("add-to-bucket");
if (addBucketBtn) {
  addBucketBtn.addEventListener("click", () => {
    if (!currentDndCharacter) return;
    const cart = JSON.parse(localStorage.getItem("ocFoundryCart") || "[]");
    cart.push({
      ...currentDndCharacter,
      cartId: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    });
    localStorage.setItem("ocFoundryCart", JSON.stringify(cart));
    addBucketBtn.textContent = "Added to Bucket ✓";
    setTimeout(() => { addBucketBtn.textContent = "Add to bucket"; }, 1500);
  });
}
