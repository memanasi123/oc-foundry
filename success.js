// ============================================
// OC FOUNDRY — SUCCESS PAGE LOGIC
// Supports single purchase + multi bucket purchase
// ============================================

const pick = list => list[Math.floor(Math.random() * list.length)];

function detectWorld(character) {
  const text = `${character.archetype || ""} ${character.hook || ""} ${character.visual || ""}`.toLowerCase();

  if (/witch|wizard|magic|kingdom|court|healer|forest|dragon|elven|realm|scroll|cartographer|storm courier|relic|garden witch/i.test(text)) return "fantasy";
  if (/florist|radio|photographer|apartment|café|cafe|coffee|museum|city|neighborhood|shop|baker|rooftop radio/i.test(text)) return "modern";
  if (/orbit|colony|ship|space|synthesist|salvager|botanist|archivist|starship|signal|robot|memory|circuit/i.test(text)) return "scifi";
  if (/ghost|medium|graveyard|candlemaker|séance|seance|archive keeper|detective|hollow|crow|mercer/i.test(text)) return "horror";
  if (/railway|society|apothecary|ballroom|manor|gaslit|canal|victorian|edwardian|exhibition/i.test(text)) return "historical";
  if (/wasteland|drowned|scavenger|survivor|highway|seed vault|forager|radio runner|floodline|post-apoc/i.test(text)) return "postapoc";

  const worlds = Object.keys(extendedContent || {});
  return worlds[Math.floor(Math.random() * worlds.length)] || "fantasy";
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
    quiz: pick(pools.quiz)
  };
}

function getPurchasedCharacters() {
  const purchasedCart = JSON.parse(localStorage.getItem("ocFoundryPurchasedCart") || "null");
  if (purchasedCart && purchasedCart.length) return purchasedCart;

  const single = JSON.parse(localStorage.getItem("ocFoundryCharacter") || "null");
  return single ? [single] : [];
}

function createBibleCard(bible, index, total) {
  const wrapper = document.createElement("article");
  wrapper.className = "bible-content multi-bible-card";
  wrapper.style.marginBottom = "34px";

  wrapper.innerHTML = `
    <div class="multi-bible-label">Sheet ${index + 1} of ${total}</div>

    <section class="bible-section bible-cover">
      <p class="bible-label">CHARACTER BIBLE</p>
      <h2>${escapeHtml(bible.name)}</h2>
      <p class="cover-meta">${escapeHtml(bible.archetype)} · ${escapeHtml(bible.age)}</p>
      <p class="cover-hook">"${escapeHtml(bible.hook)}"</p>
      <div class="cover-palette">
        ${(bible.palette || []).map(c => `<span style="background:${c}"></span>`).join("")}
      </div>
    </section>

    <section class="bible-section">
      <h3>Backstory</h3>
      <div class="section-body">
        ${(bible.backstory || "")
          .split("\\n\\n")
          .map(p => `<p>${escapeHtml(p)}</p>`)
          .join("")}
      </div>
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
        ${(bible.voice?.lines || []).map(l => `<blockquote>"${escapeHtml(l)}"</blockquote>`).join("")}
      </div>
    </section>

    <section class="bible-section symbol-section">
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
        ${(bible.relationships || []).map(r => `
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
        ${(bible.drawingPrompts || []).map(p => `<li>${escapeHtml(p)}</li>`).join("")}
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

  // Apply world class + palette vars on each card
  wrapper.classList.add(`world-${bible.world}`);
  wrapper.style.setProperty("--char-color-1", bible.palette?.[0] || "#E9A5A2");
  wrapper.style.setProperty("--char-color-2", bible.palette?.[1] || "#F6D7AC");
  wrapper.style.setProperty("--char-color-3", bible.palette?.[2] || "#8DB9AA");
  wrapper.style.setProperty("--char-color-4", bible.palette?.[3] || "#5B617C");

  // Cover gradient using palette
  const cover = wrapper.querySelector(".bible-cover");
  if (cover && bible.palette?.length) {
    cover.style.background = `linear-gradient(135deg, ${bible.palette[0]}22 0%, ${bible.palette[1]}33 50%, ${bible.palette[3]}22 100%)`;
  }

  return wrapper;
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function loadAllBibles() {
  const characters = getPurchasedCharacters();
  const host = document.getElementById("bible-content");
  const empty = document.getElementById("bible-empty");
  const titleName = document.getElementById("bible-name");

  if (!characters.length) {
    if (host) host.hidden = true;
    if (empty) empty.hidden = false;
    if (titleName) titleName.textContent = "your";
    return [];
  }

  if (empty) empty.hidden = true;

  // Keep first character saved for old single-flow bits
  localStorage.setItem("ocFoundryCharacter", JSON.stringify(characters[0]));

  // Generate bibles
  const bibles = characters.map(generateBible);

  // Save all generated bibles
  localStorage.setItem("ocFoundryBibles", JSON.stringify(bibles));
  localStorage.setItem("ocFoundryBible", JSON.stringify(bibles[0])); // backward compatible

  // Update header text
  if (titleName) {
    if (bibles.length === 1) {
      titleName.textContent = `${bibles[0].name.split(" ")[0]}'s`;
    } else {
      titleName.textContent = `${bibles.length} character`;
    }
  }

  // Set body world class from first bible for page atmosphere
  document.body.className = `bible-page world-${bibles[0].world}`;

  // Render all cards
  // Use a container after header
  let listHost = document.getElementById("multi-bible-list");
  if (!listHost) {
    listHost = document.createElement("div");
    listHost.id = "multi-bible-list";
    // put it where old single bible content was
    if (host && host.parentNode) {
      host.parentNode.insertBefore(listHost, host);
    } else {
      document.querySelector(".bible-wrap")?.appendChild(listHost);
    }
  }

  // Hide old single template block
  if (host) host.hidden = true;

  listHost.innerHTML = "";
  bibles.forEach((bible, index) => {
    listHost.appendChild(createBibleCard(bible, index, bibles.length));
  });

  return bibles;
}

// Load everything
const allBibles = loadAllBibles();
const currentBible = allBibles[0] || null;

// EMAIL BUTTON
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

    if (!email) {
      status.textContent = "Please enter your email address.";
      status.style.color = "var(--coral)";
      return;
    }

    if (!currentBible) {
      status.textContent = "No character bible found.";
      status.style.color = "var(--coral)";
      return;
    }

    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";

    try {
      // For now email first bible (multi-email can be next upgrade)
      const response = await fetch("https://oc-foundry-server.vercel.app/api/send-bible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bible: currentBible })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to send");

      status.textContent = "✨ Sent! Check your inbox (and spam).";
      status.style.color = "var(--lavender)";
      input.value = "";
      button.textContent = "Sent!";
      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Send";
      }, 3000);
    } catch (err) {
      console.error(err);
      status.textContent = "Sorry, something went wrong. Please try again.";
      status.style.color = "var(--coral)";
      button.disabled = false;
      button.textContent = "Send";
    }
  });
}

// DOWNLOAD PDF BUTTON
const downloadBtn = document.getElementById("download-pdf");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
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
              <li>Tick <strong>"Background graphics"</strong></li>
              <li>Untick <strong>"Headers and footers"</strong></li>
              <li>Set <strong>Margins</strong> to <strong>"None"</strong> or <strong>"Minimum"</strong></li>
            </ul>
          </li>
          <li>Click <strong>Save</strong></li>
        </ol>
        <button class="print-cta" id="open-print-dialog">Open print dialog →</button>
        <p class="print-note">If you bought multiple sheets, all of them are on this page.</p>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById("close-print-modal").addEventListener("click", () => overlay.remove());
    document.getElementById("open-print-dialog").addEventListener("click", () => {
      overlay.remove();
      setTimeout(() => window.print(), 100);
    });
  });
}
