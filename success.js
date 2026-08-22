// ============================================
// OC FOUNDRY — MULTI-SHEET SUCCESS PAGE
// ============================================

const pick = (list) => list[Math.floor(Math.random() * list.length)];

function detectWorld(character) {
  if (character.world && extendedContent[character.world]) {
    return character.world;
  }

  const text = `${character.archetype || ""} ${character.hook || ""} ${character.visual || ""}`.toLowerCase();

  if (/witch|wizard|magic|kingdom|court|healer|forest|dragon|relic|storm courier|garden witch/i.test(text)) return "fantasy";
  if (/florist|radio|photographer|apartment|cafe|café|coffee|museum|baker|intern/i.test(text)) return "modern";
  if (/orbit|colony|ship|space|botanist|archivist|signal|robot|memory|circuit|synthesist/i.test(text)) return "scifi";
  if (/ghost|medium|graveyard|candlemaker|archive keeper|hollow|crow|detective/i.test(text)) return "horror";
  if (/railway|apothecary|ballroom|manor|gaslit|canal|society|exhibition/i.test(text)) return "historical";
  if (/wasteland|drowned|scavenger|seed vault|forager|radio runner|floodline|post-apoc/i.test(text)) return "postapoc";

  return "fantasy";
}

function generateBible(character) {
  const world = detectWorld(character);
  const pools = extendedContent[world];

  return {
    ...character,
    world,
    backstory: pick(pools.backstories),
    wardrobe: pick(pools.wardrobes),
    voice: pick(pools.voice),
    relationships: pick(pools.relationships),
    drawingPrompts: pick(pools.drawingPrompts),
    symbol: pick(pools.symbols),
    quiz: pick(pools.quiz),
  };
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPurchasedCharacters() {
  // Check for proof of payment
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("payment_id");
  const paidToken = localStorage.getItem("ocFoundryPaidToken");
  const purchasedCart = JSON.parse(localStorage.getItem("ocFoundryPurchasedCart") || "null");
  const purchasedChar = JSON.parse(localStorage.getItem("ocFoundryPurchasedCharacter") || "null");

  // GATE: Must have a payment ID or paid token/items
  const hasProofOfPayment = Boolean(paymentId || paidToken || (purchasedCart && purchasedCart.length) || purchasedChar);

  if (!hasProofOfPayment) {
    // Payment required — return empty list to trigger locked screen
    return [];
  }

  if (Array.isArray(purchasedCart) && purchasedCart.length) {
    return purchasedCart;
  }

  if (purchasedChar) {
    return [purchasedChar];
  }

  const single = JSON.parse(localStorage.getItem("ocFoundryCharacter") || "null");
  return single ? [single] : [];
}

function createBibleCard(bible, index, total) {
    // IF THIS IS A D&D CHARACTER, RENDER THE D&D DOSSIER & STAT BLOCK
    // IF THIS IS A D&D CHARACTER, RENDER THE FULL 3-PAGE D&D DOSSIER
  if (bible.isDnd) {
    const card = document.createElement("article");
    card.className = `multi-bible-card world-${bible.world || 'fantasy'}`;
    
    card.style.setProperty("--char-color-1", bible.palette?.[0] || "#E9A5A2");
    card.style.setProperty("--char-color-2", bible.palette?.[1] || "#F6D7AC");
    card.style.setProperty("--char-color-3", bible.palette?.[2] || "#8DB9AA");
    card.style.setProperty("--char-color-4", bible.palette?.[3] || "#5B617C");

    const scores = bible.scores || { str: "16 (+3)", dex: "14 (+2)", con: "14 (+2)", int: "10 (+0)", wis: "12 (+1)", cha: "8 (-1)" };
    const tactics = (typeof dndData !== "undefined" && dndData.tactics && dndData.tactics[bible.dndClass]) ? dndData.tactics[bible.dndClass] : "Adapts quickly in battle using class features and tactical positioning.";
    const questHooks = (typeof dndData !== "undefined" && dndData.questHooks) ? dndData.questHooks : [bible.hook];
    const rels = (typeof dndData !== "undefined" && dndData.relationships) ? pick(dndData.relationships) : [];

    card.innerHTML = `
      <div class="multi-bible-label">D&amp;D 5E ADVENTURER DOSSIER · Sheet ${index + 1} of ${total}</div>

      <!-- PAGE 1: COVER -->
      <section class="bible-section bible-cover">
        <p class="bible-label">D&amp;D 5E CHARACTER DOSSIER</p>
        <h2>${escapeHtml(bible.name)}</h2>
        <p class="cover-meta">${escapeHtml(bible.archetype)} · ${escapeHtml(bible.age)}</p>
        <p class="cover-hook">"${escapeHtml(bible.hook)}"</p>
        <div class="cover-palette">
          <div class="palette-stack">
            ${(bible.palette || []).map((c) => `
              <div class="swatch-row" title="Click to copy ${c}" onclick="navigator.clipboard.writeText('${c}')">
                <div class="swatch-pill" style="background-color: ${c} !important;"></div>
                <span class="swatch-code">${c}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- PAGE 2: STAT BLOCK & 5E TRAITS -->
      <section class="bible-section">
        <h3>5e Ability Scores</h3>
        <div class="dnd-stats-grid">
          <div class="stat-box"><span class="stat-lbl">STR</span><strong>${escapeHtml(scores.str)}</strong></div>
          <div class="stat-box"><span class="stat-lbl">DEX</span><strong>${escapeHtml(scores.dex)}</strong></div>
          <div class="stat-box"><span class="stat-lbl">CON</span><strong>${escapeHtml(scores.con)}</strong></div>
          <div class="stat-box"><span class="stat-lbl">INT</span><strong>${escapeHtml(scores.int)}</strong></div>
          <div class="stat-box"><span class="stat-lbl">WIS</span><strong>${escapeHtml(scores.wis)}</strong></div>
          <div class="stat-box"><span class="stat-lbl">CHA</span><strong>${escapeHtml(scores.cha)}</strong></div>
        </div>
      </section>

      <section class="bible-section bible-grid">
        <div>
          <h4>Ideal</h4>
          <p>${escapeHtml(bible.ideal || "Greater Good: Protect the innocent.")}</p>
        </div>
        <div>
          <h4>Bond</h4>
          <p>${escapeHtml(bible.bond || "Bound by oath to an old party.")}</p>
        </div>
        <div>
          <h4>Flaw</h4>
          <p>${escapeHtml(bible.flaw || "Overly trusting of strangers.")}</p>
        </div>
        <div>
          <h4>Starting Trinket</h4>
          <p>${escapeHtml(bible.trinket || "A brass orb that hums quietly.")}</p>
        </div>
      </section>

      <section class="bible-section">
        <h3>Origin Backstory</h3>
        <div class="section-body">
          <p>${escapeHtml(bible.backstory || "")}</p>
        </div>
      </section>

      <!-- PAGE 3: COMBAT, SPELLS, RELATIONS & HOOKS -->
      <section class="bible-section">
        <h3>Spells, Features &amp; Combat Tactics</h3>
        <p style="margin-bottom:8px;"><strong>Class Feature:</strong> ${escapeHtml(bible.feature || "")}</p>
        <p style="margin-bottom:8px;"><strong>Spells / Maneuvers Known:</strong> ${escapeHtml(bible.spellList || "")}</p>
        <p style="margin-bottom:8px;"><strong>Tactical Strategy:</strong> ${escapeHtml(tactics)}</p>
        <p><strong>Starting Equipment:</strong> ${escapeHtml(bible.gear || "")}</p>
      </section>

      <section class="bible-section">
        <h3>Party Connections &amp; Allies</h3>
        <div class="relationships">
          ${rels.map((r) => `
            <div class="rel-card">
              <p class="rel-role">${escapeHtml(r.role)}</p>
              <p class="rel-name">${escapeHtml(r.name)}</p>
              <p class="rel-note">${escapeHtml(r.note)}</p>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="bible-section">
        <h3>5e Quest Hooks for DMs</h3>
        <ol class="drawing-prompts">
          ${questHooks.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
        </ol>
      </section>

      <section class="bible-section">
        <h3>Roleplay &amp; Personality Overview</h3>
        <p>${escapeHtml(bible.personality || "")}</p>
      </section>
    `;

    return card;
  }
  const card = document.createElement("article");
  card.className = `multi-bible-card world-${bible.world}`;

  // per-card palette vars
  card.style.setProperty("--char-color-1", bible.palette?.[0] || "#E9A5A2");
  card.style.setProperty("--char-color-2", bible.palette?.[1] || "#F6D7AC");
  card.style.setProperty("--char-color-3", bible.palette?.[2] || "#8DB9AA");
  card.style.setProperty("--char-color-4", bible.palette?.[3] || "#5B617C");

  const backstoryHtml = String(bible.backstory || "")
    .split(/\n\n+/)
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  card.innerHTML = `
    <div class="multi-bible-label">Sheet ${index + 1} of ${total} · ${escapeHtml(bible.world)}</div>

    <section class="bible-section bible-cover">
      <p class="bible-label">CHARACTER BIBLE</p>
      <h2>${escapeHtml(bible.name || "")}</h2>
      <p class="cover-meta">${escapeHtml(bible.archetype || "")} · ${escapeHtml(bible.age || "")}</p>
      <p class="cover-hook">"${escapeHtml(bible.hook || "")}"</p>
      <div class="cover-palette">
  <div class="palette-stack">
    ${(bible.palette || []).map((c) => `
      <div class="swatch-row" title="Click to copy ${c}" onclick="navigator.clipboard.writeText('${c}')">
        <div class="swatch-pill" style="background-color: ${c} !important;"></div>
        <span class="swatch-code">${c}</span>
      </div>
    `).join("")}
  </div>
</div>
    </section>

    <section class="bible-section">
      <h3>Backstory</h3>
      <div class="section-body">${backstoryHtml}</div>
    </section>

    <section class="bible-section bible-grid">
      <div>
        <h4>Personality</h4>
        <p>${escapeHtml(bible.personality || "")}</p>
      </div>
      <div>
        <h4>Signature detail</h4>
        <p>${escapeHtml(bible.detail || "")}</p>
      </div>
      <div>
        <h4>Inner tension</h4>
        <p>${escapeHtml(bible.tension || "")}</p>
      </div>
      <div>
        <h4>Visual vibe</h4>
        <p>${escapeHtml(bible.visual || "")}</p>
      </div>
    </section>

    <section class="bible-section">
      <h3>Voice &amp; speech</h3>
      <p class="voice-pattern">${escapeHtml(bible.voice?.pattern || "")}</p>
      <div class="voice-lines">
        ${(bible.voice?.lines || []).map((l) => `<blockquote>"${escapeHtml(l)}"</blockquote>`).join("")}
      </div>
    </section>

    <section class="bible-section">
      <h3>Symbol &amp; motifs</h3>
      <p class="symbol-main"><strong>Personal symbol:</strong> <span>${escapeHtml(bible.symbol?.symbol || "")}</span></p>
      <div class="symbol-grid">
        <div><h5>Motifs</h5><p>${escapeHtml((bible.symbol?.motifs || []).join(", "))}</p></div>
        <div><h5>Scent</h5><p>${escapeHtml(bible.symbol?.scent || "")}</p></div>
        <div><h5>Sound</h5><p>${escapeHtml(bible.symbol?.sound || "")}</p></div>
        <div><h5>Texture</h5><p>${escapeHtml(bible.symbol?.texture || "")}</p></div>
      </div>
    </section>

    <section class="bible-section">
      <h3>Wardrobe</h3>
      <div class="wardrobe-grid">
        <div class="outfit"><h5>Everyday</h5><p>${escapeHtml(bible.wardrobe?.everyday || "")}</p></div>
        <div class="outfit"><h5>Formal</h5><p>${escapeHtml(bible.wardrobe?.formal || "")}</p></div>
        <div class="outfit"><h5>Action</h5><p>${escapeHtml(bible.wardrobe?.action || "")}</p></div>
      </div>
    </section>

    <section class="bible-section">
      <h3>Relationship web</h3>
      <div class="relationships">
        ${(bible.relationships || []).map((r) => `
          <div class="rel-card">
            <p class="rel-role">${escapeHtml(r.role)}</p>
            <p class="rel-name">${escapeHtml(r.name)}</p>
            <p class="rel-note">${escapeHtml(r.note)}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="bible-section">
      <h3>Drawing prompts</h3>
      <ol class="drawing-prompts">
        ${(bible.drawingPrompts || []).map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
      </ol>
    </section>

    <section class="bible-section">
      <h3>Signature scene</h3>
      <p>${escapeHtml(bible.scene || "")}</p>
    </section>

    <section class="bible-section quiz-section">
      <h3>Quick questions</h3>
      <div class="quiz-grid">
        <div><h5>Café order</h5><p>${escapeHtml(bible.quiz?.cafe || "")}</p></div>
        <div><h5>In their bag</h5><p>${escapeHtml(bible.quiz?.bag || "")}</p></div>
        <div><h5>Handling criticism</h5><p>${escapeHtml(bible.quiz?.criticism || "")}</p></div>
        <div><h5>Deepest fear</h5><p>${escapeHtml(bible.quiz?.fear || "")}</p></div>
        <div><h5>True comfort</h5><p>${escapeHtml(bible.quiz?.comfort || "")}</p></div>
      </div>
    </section>
  `;

  return card;
}

function loadAllBibles() {
  const characters = getPurchasedCharacters();
  const empty = document.getElementById("bible-empty");
  const titleName = document.getElementById("bible-name");
  const listHost = document.getElementById("multi-bible-list");

  if (!listHost) {
    console.error("missing #multi-bible-list in success.html");
    return [];
  }

      const header = document.querySelector(".bible-header");

  if (!characters.length) {
    if (header) header.style.display = "none"; // Hide top header & buttons for unpaid users
    if (empty) {
      empty.hidden = false;
      empty.innerHTML = `
        <p class="eyebrow" style="justify-content:center;"><span></span> Payment Required 🔒</p>

        <h1 style="font:700 clamp(36px, 5vw, 56px)/0.95 Fraunces, serif; letter-spacing:-2px; margin:20px 0 12px; color:var(--ink);">
          Character Bible Locked
        </h1>

        <p style="color:var(--muted); max-width:460px; margin:0 auto 28px; line-height:1.6; font-size:15px;">
          Full 3-page Character Bibles (backstory, wardrobe, dialogue, relationships, drawing prompts) unlock automatically after purchasing a character sheet for ₹60.
        </p>

        <a href="index.html" class="pay-button" style="display:inline-block; width:auto; padding:14px 28px; text-decoration:none;">
          ← Go to generator
        </a>
      `;
    }
    listHost.innerHTML = "";
    return [];
  }

  // If paid: ensure header is visible
  if (header) header.style.display = "block";
  if (empty) empty.hidden = true;

  const bibles = characters.map(generateBible);
  localStorage.setItem("ocFoundryCharacter", JSON.stringify(characters[0]));
  localStorage.setItem("ocFoundryBibles", JSON.stringify(bibles));
  localStorage.setItem("ocFoundryBible", JSON.stringify(bibles[0]));

  if (titleName) {
    titleName.textContent = bibles.length === 1
      ? `${(bibles[0].name || "Character").split(" ")[0]}'s`
      : `${bibles.length} character`;
  }

  // Neutral page shell; each card carries its own world class
  document.body.className = "bible-page";

  listHost.innerHTML = "";
  bibles.forEach((bible, index) => {
    listHost.appendChild(createBibleCard(bible, index, bibles.length));
  });

  return bibles;
}

const allBibles = loadAllBibles();
const currentBible = allBibles[0] || null;

// Email button
const showEmailBtn = document.getElementById("show-email");
if (showEmailBtn) {
  showEmailBtn.addEventListener("click", () => {
    const form = document.getElementById("email-form");
    if (form) form.hidden = !form.hidden;
  });
}

const emailForm = document.getElementById("email-form");
if (emailForm) {
  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("email-status");
    const input = document.getElementById("email-input");
    const button = document.getElementById("send-email");
    const email = input?.value?.trim();

    if (!email || !currentBible) {
      status.textContent = "Email and character bible are required.";
      status.style.color = "var(--coral)";
      return;
    }

    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch("https://oc-foundry-server.vercel.app/api/send-bible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bible: currentBible }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed");

      status.textContent = "✨ Sent! Check your inbox (and spam).";
      status.style.color = "var(--lavender)";
      button.textContent = "Sent!";
      input.value = "";
    } catch (err) {
      console.error(err);
      status.textContent = "Sorry, something went wrong. Try again.";
      status.style.color = "var(--coral)";
      button.textContent = "Send";
    } finally {
      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Send";
      }, 2500);
    }
  });
}

// PDF button
const downloadBtn = document.getElementById("download-pdf");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.id = "print-instructions";
    overlay.innerHTML = `
      <div class="print-modal">
        <button class="close-modal" id="close-print-modal">×</button>
        <h2>Save your character bible ✨</h2>
        <p>In the print dialog:</p>
        <ol>
          <li>Set <strong>Destination</strong> to <strong>Save as PDF</strong></li>
          <li>Enable <strong>Background graphics</strong></li>
          <li>Disable <strong>Headers and footers</strong></li>
          <li>Click <strong>Save</strong></li>
        </ol>
        <button class="print-cta" id="open-print-dialog">Open print dialog →</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById("close-print-modal").onclick = () => overlay.remove();
    document.getElementById("open-print-dialog").onclick = () => {
      overlay.remove();
      setTimeout(() => window.print(), 100);
    };
  });
}
