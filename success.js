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

document.getElementById("email-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("email-status");
  const input = document.getElementById("email-input");
  const button = document.getElementById("send-email");
  const email = input.value.trim();

  if (!email) {
    status.textContent = "Please enter your email address.";
    status.style.color = "var(--coral)";
    return;
  }

  if (!currentBible) {
    status.textContent = "Please wait for your character bible to load.";
    status.style.color = "var(--coral)";
    return;
  }

  // Set loading state
  button.disabled = true;
  button.textContent = "Sending...";
  status.textContent = "";

  try {
    const response = await fetch('https://oc-foundry-server.vercel.app/api/send-bible', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        bible: currentBible
      })
    });

    const data = await response.json();

    if (response.ok) {
      status.textContent = "✨ Sent! Check your inbox (and spam folder just in case).";
      status.style.color = "var(--lavender)";
      input.value = '';
      button.textContent = "Sent!";
      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Send";
      }, 3000);
    } else {
      throw new Error(data.error || 'Failed to send');
    }

  } catch (error) {
    console.error('Email send error:', error);
    status.textContent = "Sorry, something went wrong. Please try again.";
    status.style.color = "var(--coral)";
    button.disabled = false;
    button.textContent = "Send";
  }
});

// DOWNLOAD PDF BUTTON - uses browser's built-in print-to-PDF
document.getElementById("download-pdf").addEventListener("click", () => {
  // Show helpful modal before opening print dialog
  const overlay = document.createElement("div");
  overlay.id = "print-instructions";
  overlay.innerHTML = `
        <div class="print-modal">
      <button class="close-modal" id="close-print-modal">×</button>
      <h2>Save your character bible ✨</h2>
      <p>In the print dialog that opens, please:</p>
      <ol>
        <li>Set <strong>Destination</strong> to <strong>"Save as PDF"</strong></li>
        <li>Click <strong>More settings</strong> and:
          <ul>
            <li>Tick <strong>"Background graphics"</strong> (very important!)</li>
            <li>Untick <strong>"Headers and footers"</strong> to remove the URL</li>
            <li>Set <strong>Margins</strong> to <strong>"None"</strong> or <strong>"Minimum"</strong></li>
          </ul>
        </li>
        <li>Click <strong>Save</strong></li>
      </ol>
      <button class="print-cta" id="open-print-dialog">Open print dialog →</button>
      <p class="print-note">Your bible will save as a beautiful PDF to your Downloads folder.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("close-print-modal").addEventListener("click", () => {
    overlay.remove();
  });

  document.getElementById("open-print-dialog").addEventListener("click", () => {
    overlay.remove();
    setTimeout(() => window.print(), 100);
  });
});
