// ============================================
// OC FOUNDRY — D&D 5E GENERATOR LOGIC (FAIL-SAFE)
// ============================================

let selectedClass = "any";
let selectedRace = "any";
let currentDndCharacter = null;
let rollCount = 0;

const pick = list => (list && list.length) ? list[Math.floor(Math.random() * list.length)] : "";

// Generate realistic D&D 5e ability scores with modifiers
function generateAbilityScores(primaryStat) {
  const standardArray = [15, 14, 13, 12, 10, 8];
  const shuffled = [...standardArray].sort(() => Math.random() - 0.5);
  
  const stats = { str: 10, dex: 10, con: 12, int: 10, wis: 10, cha: 10 };
  const keys = ["str", "dex", "con", "int", "wis", "cha"];
  
  const primary = primaryStat || "str";
  stats[primary] = 15;
  
  const remainingKeys = keys.filter(k => k !== primary);
  const remainingScores = shuffled.filter(s => s !== 15);

  remainingKeys.forEach((key, i) => {
    stats[key] = remainingScores[i] || 10;
  });

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
  
  const rollMessages = [
    "Rolling d20... 🎲",
    "Checking Initiative... ⚔️",
    "Consulting the Spellbook... 📜",
    "Natural 20! ✨",
    "Gathering Party... 🛡️"
  ];

  if (overlay && diceText) {
    diceText.innerHTML = pick(rollMessages);
    overlay.hidden = false;
  }

  // Fail-safe execution block
  setTimeout(() => {
    try {
      rollCount += 1;
      
      const raceKeys = Object.keys(dndData?.races || { human: {} });
      const classKeys = Object.keys(dndData?.classes || { fighter: {} });

      const raceKey = selectedRace === "any" ? pick(raceKeys) : selectedRace;
      const classKey = selectedClass === "any" ? pick(classKeys) : selectedClass;

      const raceObj = dndData.races[raceKey] || dndData.races.human;
      const classObj = dndData.classes[classKey] || dndData.classes.fighter;
      
      const nameList = dndData.names[raceKey] || dndData.names.human;
      const name = pick(nameList) || "Adventurer";
      const background = pick(dndData.backgrounds) || "Outlander";
      const alignment = pick(dndData.alignments) || "Neutral Good";
      const hook = pick(dndData.hooks) || "A mysterious hero with a past.";
      const gear = pick(dndData.equipment) || "Traveler's clothes and a dagger.";
      const feature = dndData.features[classKey] || "Class Feature";
      const palette = pick(dndData.palettes) || ["#E9A5A2", "#F6D7AC", "#8DB9AA", "#5B617C"];
      const scores = generateAbilityScores(classObj.primary);

      // Update Text Elements
      const setText = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
      };

      setText("dnd-name", name);
      setText("dnd-meta", `${raceObj.name} ${classObj.name} · ${background}`);
      setText("dnd-alignment", alignment);
      setText("dnd-hook", `"${hook}"`);

      // Update Stats
      setText("stat-str", scores.str);
      setText("stat-dex", scores.dex);
      setText("stat-con", scores.con);
      setText("stat-int", scores.int);
      setText("stat-wis", scores.wis);
      setText("stat-cha", scores.cha);

      // Details
      setText("dnd-feature", feature);
      setText("dnd-gear", gear);
      setText("dnd-personality", `Driven by a strict code of ${alignment}. ${raceObj.traits}`);
      setText("dnd-prompt", `Miniature / Art Concept: Frame ${name} in action using ${feature.split("&")[0]} while wearing gear matching their ${background} background.`);
      setText("sheet-number", `NO. ${String(rollCount).padStart(3, "0")}`);

      // Swatch rendering
      const paletteEl = document.getElementById("palette");
      if (paletteEl) {
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
      }

      // Storage
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
      const emptyState = document.getElementById("empty-state");
      const resultContent = document.getElementById("result-content");
      const unlockTease = document.getElementById("unlock-tease");
      const charSheet = document.getElementById("character-sheet");

      if (emptyState) emptyState.hidden = true;
      if (resultContent) resultContent.hidden = false;
      if (unlockTease) unlockTease.hidden = false;
      setText("tease-name", name.split(" ")[0]);
      if (charSheet) charSheet.classList.remove("empty");

      const genSec = document.getElementById("generator");
      if (genSec) genSec.scrollIntoView({ behavior: "smooth", block: "center" });

    } catch (err) {
      console.error("D&D Roll Error:", err);
    } finally {
      // ALWAYS hide overlay, even if an error occurred
      if (overlay) overlay.hidden = true;
    }
  }, 600);
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

const genBtn = document.getElementById("dnd-generate");
if (genBtn) genBtn.addEventListener("click", rollDndCharacter);

const regenBtn = document.getElementById("dnd-regenerate");
if (regenBtn) regenBtn.addEventListener("click", rollDndCharacter);

const rerollBtn = document.getElementById("dnd-reroll");
if (rerollBtn) {
  rerollBtn.addEventListener("click", () => {
    if (currentDndCharacter) {
      const raceKey = selectedRace === "any" ? "human" : selectedRace;
      const nameList = dndData?.names[raceKey] || dndData?.names?.human || ["Adventurer"];
      const newName = pick(nameList);
      const nameEl = document.getElementById("dnd-name");
      if (nameEl) nameEl.textContent = newName;
      currentDndCharacter.name = newName;
      localStorage.setItem("ocFoundryCharacter", JSON.stringify(currentDndCharacter));
    }
  });
}

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
