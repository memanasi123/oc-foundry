// ============================================
// OC FOUNDRY — SUCCESS PAGE LOGIC
// Loads the character and generates the full bible
// ============================================

const pick = list => list[Math.floor(Math.random() * list.length)];

function detectWorld(character) {
  // Try to detect world from the archetype or hook text
  // Fall back to a random world if we cannot detect
  const text = `${character.archetype} ${character.hook} ${character.visual}`.toLowerCase();

  if (/witch|wizard|magic|kingdom|court|healer|forest|dragon|elven|realm|scroll|cartographer|storm courier|relic|garden witch/i.test(text)) return "fantasy";
  if (/florist|radio|photographer|apartment|café|cafe|coffee|museum|city|neighborhood|shop|baker|rooftop radio/i.test(text)) return "modern";
  if (/orbit|colony|ship|space|synthesist|salvager|botanist|archivist|starship|signal|robot|memory|circuit/i.test(text)) return "scifi";
  if (/ghost|medium|graveyard|candlemaker|séance|seance|archive keeper|detective.*moth|hollow|crow|mercer/i.test(text)) return "horror";
  if (/railway|society|apothecary|ballroom|manor|gaslit|canal|victorian|edwardian|exhibition/i.test(text)) return "historical";
  if (/wasteland|drowned|scavenger|survivor|highway|seed vault|forager|radio runner|floodline|post-apoc/i.test(text)) return "postapoc";

  // Fallback: pick a random world
  const worlds = Object.keys(extendedContent);
  return worlds[Math.floor(Math.random() * worlds.length)];
}

function generateBible(character) {
  const world = detectWorld(character);
  const pools = extendedContent[world];

  const wardrobe = pick(pools.wardrobes);
  const voice = pick(pools.voice);
  const relationships = pick(pools.relationships);
  const drawingPrompts = pick(pools.drawingPrompts);
  const symbol = pick(pools.symbols);
  const quiz = pick(pools.quiz);
  const backstory = pick(pools.backstories);

  return {
    ...character,
    world,
    backstory,
    wardrobe,
    voice,
    relationships,
    drawingPrompts,
    symbol,
    quiz
  };
}

function renderBible(bible) {
  // Add world class to body for themed styling
  document.body.className = `bible-page world-${bible.world}`;

  // Set the name in the header
  document.getElementById("bible-name").textContent = bible.name.split(" ")[0] + "'s";

  // COVER
  document.getElementById("cover-name").textContent = bible.name;
  document.getElementById("cover-meta").textContent = `${bible.archetype} · ${bible.age}`;
  document.getElementById("cover-hook").textContent = `"${bible.hook}"`;
  document.getElementById("cover-palette").innerHTML = bible.palette
    .map(c => `<span style="background:${c}"></span>`)
    .join("");

  // Apply palette color to cover background
  const cover = document.getElementById("bible-cover");
  cover.style.background = `linear-gradient(135deg, ${bible.palette[0]}22 0%, ${bible.palette[1]}33 50%, ${bible.palette[3]}22 100%)`;
  cover.style.borderColor = bible.palette[0] + "44";

  // BACKSTORY
  document.getElementById("section-backstory").innerHTML = bible.backstory
    .split("\n\n")
    .map(p => `<p>${p}</p>`)
    .join("");

  // PERSONALITY GRID
  document.getElementById("section-personality").textContent = bible.personality;
  document.getElementById("section-detail").textContent = bible.detail;
  document.getElementById("section-tension").textContent = bible.tension;
  document.getElementById("section-visual").textContent = bible.visual;

  // VOICE
  document.getElementById("voice-pattern").textContent = bible.voice.pattern;
  document.getElementById("voice-lines").innerHTML = bible.voice.lines
    .map(l => `<blockquote>"${l}"</blockquote>`)
    .join("");

  // SYMBOL & MOTIFS
  document.getElementById("symbol-main").textContent = bible.symbol.symbol;
  document.getElementById("symbol-motifs").textContent = bible.symbol.motifs.join(", ");
  document.getElementById("symbol-scent").textContent = bible.symbol.scent;
  document.getElementById("symbol-sound").textContent = bible.symbol.sound;
  document.getElementById("symbol-texture").textContent = bible.symbol.texture;

  // WARDROBE
  document.getElementById("wardrobe-everyday").textContent = bible.wardrobe.everyday;
  document.getElementById("wardrobe-formal").textContent = bible.wardrobe.formal;
  document.getElementById("wardrobe-action").textContent = bible.wardrobe.action;

  // RELATIONSHIPS
  document.getElementById("relationships").innerHTML = bible.relationships
    .map(r => `
      <div class="rel-card">
        <p class="rel-role">${r.role}</p>
        <p class="rel-name">${r.name}</p>
        <p class="rel-note">${r.note}</p>
      </div>
    `)
    .join("");

  // DRAWING PROMPTS
  document.getElementById("drawing-prompts").innerHTML = bible.drawingPrompts
    .map(p => `<li>${p}</li>`)
    .join("");

  // SCENE PROMPT (from free)
  document.getElementById("section-scene").textContent = bible.scene;

  // QUIZ
  document.getElementById("quiz-cafe").textContent = bible.quiz.cafe;
  document.getElementById("quiz-bag").textContent = bible.quiz.bag;
  document.getElementById("quiz-criticism").textContent = bible.quiz.criticism;
  document.getElementById("quiz-fear").textContent = bible.quiz.fear;
  document.getElementById("quiz-comfort").textContent = bible.quiz.comfort;

  // Apply palette colors dynamically
  document.documentElement.style.setProperty("--char-color-1", bible.palette[0]);
  document.documentElement.style.setProperty("--char-color-2", bible.palette[1]);
  document.documentElement.style.setProperty("--char-color-3", bible.palette[2]);
  document.documentElement.style.setProperty("--char-color-4", bible.palette[3]);

  // Reveal the content
  document.getElementById("bible-content").hidden = false;
  document.getElementById("bible-empty").hidden = true;
}

function loadBible() {
  const saved = localStorage.getItem("ocFoundryCharacter");

  if (!saved) {
    // No character found - show empty state
    document.getElementById("bible-content").hidden = true;
    document.getElementById("bible-empty").hidden = false;
    document.getElementById("bible-name").textContent = "your";
    return null;
  }

  const character = JSON.parse(saved);

  // Check if we already generated a bible - if so, reuse it
  const savedBible = localStorage.getItem("ocFoundryBible");
  let bible;

  if (savedBible) {
    const parsed = JSON.parse(savedBible);
    // Only reuse if it matches the current character
    if (parsed.name === character.name && parsed.archetype === character.archetype) {
      bible = parsed;
    }
  }

  if (!bible) {
    bible = generateBible(character);
    localStorage.setItem("ocFoundryBible", JSON.stringify(bible));
  }

  renderBible(bible);
  return bible;
}

// Load on page ready
const currentBible = loadBible();

// EMAIL BUTTON
document.getElementById("show-email").addEventListener("click", () => {
  const form = document.getElementById("email-form");
  form.hidden = !form.hidden;
});

document.getElementById("email-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const status = document.getElementById("email-status");
  status.textContent = "Email delivery is coming soon! ✨";
  status.style.color = "var(--lavender)";
});

// DOWNLOAD PDF BUTTON (placeholder for now)
document.getElementById("download-pdf").addEventListener("click", () => {
  alert("PDF download is being built in Phase 4! For now, enjoy the preview below.");
});
