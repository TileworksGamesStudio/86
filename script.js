/**
 * Game Hub Controller & Luxury Atmosphere Engine
 * Dark Burnt-Orange Cocktail Lounge Transformation
 */
(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Game Grid Data Model (Preserved)
     -------------------------------------------------------------------------- */
  const GAMES = [
    { id: "crossword", name: "Crossword", url: "https://tileworksgamesstudio.github.io/86Crossword/", enabled: true, icon: "grid" },
    { id: "connections", name: "Connections", url: "https://tileworksgamesstudio.github.io/86Connections/", enabled: true, icon: "nodes" },
    { id: "trivia", name: "Trivia", url: "https://tileworksgamesstudio.github.io/86Trivia/", enabled: true, icon: "help" },
    { id: "hangman", name: "Hangman", url: "https://tileworksgamesstudio.github.io/86Hangman/", enabled: true, icon: "text" },
    { id: "specs", name: "Specs", url: "https://tileworksgamesstudio.github.io/86Specs/", enabled: true, icon: "check" },
    { id: "memory", name: "Memory", url: "https://tileworksgamesstudio.github.io/86Memory/", enabled: true, icon: "cards" },
    { id: "spelling-bee", name: "Letters", url: "https://tileworksgamesstudio.github.io/86SpellingBee/", enabled: true, icon: "hex" },
    { id: "wordle", name: "Wordle", url: "https://tileworksgamesstudio.github.io/86Wordle/", enabled: true, icon: "rows" },
    { id: "extra", name: "Word Search", url: "https://tileworksgamesstudio.github.io/86Wordsearch/", enabled: true, icon: "plus" }
  ];

  /* --------------------------------------------------------------------------
     High-End Restrained Vector Icons
     -------------------------------------------------------------------------- */
  const ICONS = {
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    nodes: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.8"/><circle cx="18" cy="6" r="2.8"/><circle cx="6" cy="18" r="2.8"/><circle cx="18" cy="18" r="2.8"/><line x1="8.8" y1="6" x2="15.2" y2="6"/><line x1="6" y1="8.8" x2="6" y2="15.2"/><line x1="18" y1="8.8" x2="18" y2="15.2"/><line x1="8.8" y1="18" x2="15.2" y2="18"/></svg>',
    help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.8-2.8 2.8"/><line x1="12" y1="16.5" x2="12.01" y2="16.5"/></svg>',
    text: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="6" y1="17" x2="20" y2="17"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 11.2V12a9.5 9.5 0 1 1-5.63-8.68"/><polyline points="21.5 4.5 12 14 9 11"/></svg>',
    cards: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="12.5" height="14.5" rx="2"/><rect x="8.5" y="4" width="12.5" height="14.5" rx="2"/></svg>',
    hex: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2.5 20.5 7.5 20.5 16.5 12 21.5 3.5 16.5 3.5 7.5 12 2.5"/></svg>',
    rows: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="3.8" rx="1.2"/><rect x="3" y="10.1" width="18" height="3.8" rx="1.2"/><rect x="3" y="16.2" width="18" height="3.8" rx="1.2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
  };

  /* --------------------------------------------------------------------------
     12 Distinct Cocktail Garnish Silhouettes (Vector Library)
     -------------------------------------------------------------------------- */
  const GARNISH_SVGS = [
    // 1. Orange Twist
    '<svg viewBox="0 0 40 40"><path d="M8 32 C 14 18, 16 12, 28 8 C 34 6, 36 12, 30 18 C 22 26, 14 26, 12 30 C 10 34, 18 36, 24 33" fill="none" stroke="#D56A2D" stroke-width="3" stroke-linecap="round"/></svg>',
    
    // 2. Lemon Twist
    '<svg viewBox="0 0 40 40"><path d="M10 10 C 18 4, 30 8, 28 18 C 26 28, 12 24, 14 34 C 15 39, 26 38, 30 32" fill="none" stroke="#E8C973" stroke-width="2.8" stroke-linecap="round"/></svg>',
    
    // 3. Lime Wheel
    '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#B88A3A" stroke-width="1.8"/><circle cx="20" cy="20" r="13" fill="none" stroke="#8C6426" stroke-width="1"/><circle cx="20" cy="20" r="2.5" fill="#D8B45A"/><line x1="20" y1="7" x2="20" y2="33" stroke="#8C6426" stroke-width="1"/><line x1="7" y1="20" x2="33" y2="20" stroke="#8C6426" stroke-width="1"/><line x1="11" y1="11" x2="29" y2="29" stroke="#8C6426" stroke-width="1"/><line x1="11" y1="29" x2="29" y2="11" stroke="#8C6426" stroke-width="1"/></svg>',
    
    // 4. Lemon Wheel
    '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#E8C973" stroke-width="1.8"/><circle cx="20" cy="20" r="13.5" fill="none" stroke="#CBA248" stroke-width="0.9"/><circle cx="20" cy="20" r="2.2" fill="#F1D88A"/><line x1="20" y1="7" x2="20" y2="33" stroke="#CBA248" stroke-width="0.9"/><line x1="7" y1="20" x2="33" y2="20" stroke="#CBA248" stroke-width="0.9"/><line x1="11" y1="11" x2="29" y2="29" stroke="#CBA248" stroke-width="0.9"/><line x1="11" y1="29" x2="29" y2="11" stroke="#CBA248" stroke-width="0.9"/></svg>',
    
    // 5. Dehydrated Orange Wheel
    '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="rgba(167,70,31,0.18)" stroke="#A7461F" stroke-width="2.2"/><circle cx="20" cy="20" r="12" fill="none" stroke="#D56A2D" stroke-width="1" stroke-dasharray="2,2"/><circle cx="20" cy="20" r="3" fill="#6E3214"/><line x1="20" y1="8" x2="20" y2="32" stroke="#A7461F" stroke-width="1.2"/><line x1="8" y1="20" x2="32" y2="20" stroke="#A7461F" stroke-width="1.2"/><line x1="11.5" y1="11.5" x2="28.5" y2="28.5" stroke="#A7461F" stroke-width="1.2"/><line x1="11.5" y1="28.5" x2="28.5" y2="11.5" stroke="#A7461F" stroke-width="1.2"/></svg>',
    
    // 6. Dehydrated Lemon Wheel
    '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="rgba(140,100,38,0.18)" stroke="#8C6426" stroke-width="2.2"/><circle cx="20" cy="20" r="12.5" fill="none" stroke="#B88A3A" stroke-width="1" stroke-dasharray="3,1.5"/><circle cx="20" cy="20" r="2.8" fill="#523912"/><line x1="20" y1="8" x2="20" y2="32" stroke="#8C6426" stroke-width="1.1"/><line x1="8" y1="20" x2="32" y2="20" stroke="#8C6426" stroke-width="1.1"/><line x1="11.5" y1="11.5" x2="28.5" y2="28.5" stroke="#8C6426" stroke-width="1.1"/><line x1="11.5" y1="28.5" x2="28.5" y2="11.5" stroke="#8C6426" stroke-width="1.1"/></svg>',
    
    // 7. Cocktail Cherry with Stem
    '<svg viewBox="0 0 40 40"><circle cx="16" cy="26" r="8" fill="rgba(167,70,31,0.3)" stroke="#A7461F" stroke-width="1.8"/><path d="M16 18 C 17 10, 24 6, 32 8" fill="none" stroke="#CBA248" stroke-width="1.8" stroke-linecap="round"/><circle cx="14" cy="24" r="2" fill="#E8C973" opacity="0.6"/></svg>',
    
    // 8. Maraschino Cherry Pair
    '<svg viewBox="0 0 40 40"><circle cx="13" cy="27" r="6.5" fill="rgba(167,70,31,0.3)" stroke="#D56A2D" stroke-width="1.6"/><circle cx="27" cy="25" r="6.5" fill="rgba(167,70,31,0.3)" stroke="#D56A2D" stroke-width="1.6"/><path d="M13 21 C 15 14, 18 8, 22 6 C 24 9, 25 14, 27 19" fill="none" stroke="#CBA248" stroke-width="1.6" stroke-linecap="round"/></svg>',
    
    // 9. Mint Sprig
    '<svg viewBox="0 0 40 40"><path d="M20 34 L20 12" stroke="#8C6426" stroke-width="1.8" stroke-linecap="round"/><path d="M20 26 C 12 25, 10 18, 14 16 C 18 14, 20 22, 20 26 Z" fill="rgba(140,100,38,0.2)" stroke="#CBA248" stroke-width="1.3"/><path d="M20 22 C 28 21, 30 14, 26 12 C 22 10, 20 18, 20 22 Z" fill="rgba(140,100,38,0.2)" stroke="#CBA248" stroke-width="1.3"/><path d="M20 14 C 16 8, 24 8, 20 4 C 17 8, 19 12, 20 14 Z" fill="rgba(140,100,38,0.2)" stroke="#E8C973" stroke-width="1.3"/></svg>',
    
    // 10. Rosemary Sprig
    '<svg viewBox="0 0 40 40"><line x1="10" y1="34" x2="30" y2="8" stroke="#8C6426" stroke-width="1.8" stroke-linecap="round"/><line x1="14" y1="29" x2="8" y2="24" stroke="#CBA248" stroke-width="1.4" stroke-linecap="round"/><line x1="16" y1="26" x2="22" y2="22" stroke="#CBA248" stroke-width="1.4" stroke-linecap="round"/><line x1="19" y1="22" x2="13" y2="17" stroke="#CBA248" stroke-width="1.4" stroke-linecap="round"/><line x1="22" y1="18" x2="28" y2="14" stroke="#CBA248" stroke-width="1.4" stroke-linecap="round"/><line x1="25" y1="14" x2="20" y2="9" stroke="#E8C973" stroke-width="1.4" stroke-linecap="round"/></svg>',
    
    // 11. Green Olive with Cocktail Pick
    '<svg viewBox="0 0 40 40"><line x1="6" y1="34" x2="34" y2="6" stroke="#CBA248" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="20" cy="20" rx="9.5" ry="7" transform="rotate(-45 20 20)" fill="rgba(110,78,27,0.3)" stroke="#B88A3A" stroke-width="1.8"/><circle cx="21" cy="19" r="2.8" fill="#D56A2D"/></svg>',
    
    // 12. Cucumber Ribbon
    '<svg viewBox="0 0 40 40"><path d="M8 28 C 14 34, 24 30, 20 22 C 16 14, 30 18, 28 8" fill="none" stroke="#9C732C" stroke-width="3" stroke-linecap="round"/><path d="M10 27 C 15 32, 23 29, 19 22 C 16 15, 28 18, 27 9" fill="none" stroke="#E8C973" stroke-width="1.2" stroke-linecap="round"/></svg>'
  ];

  /* --------------------------------------------------------------------------
     State & Storage Logic (Preserved)
     -------------------------------------------------------------------------- */
  const STORAGE_KEY = "game_hub_settings";
  const state = {
    sound: true,
    animations: true
  };

  function loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.sound === "boolean") state.sound = parsed.sound;
        if (typeof parsed.animations === "boolean") state.animations = parsed.animations;
      }
    } catch (e) {
      // Local storage fallback
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Local storage fallback
    }
  }

  /* --------------------------------------------------------------------------
     Cocktail Lounge Synthesized Sound Engine (User-Gesture Safe Web Audio)
     -------------------------------------------------------------------------- */
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // Pure crystal / muted brass chime tone
  function playSound(freq = 520, type = "sine", duration = 0.08, endFreqRatio = 0.6) {
    if (!state.sound) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * endFreqRatio), now + duration);

      // Warm, subtle gain envelope
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (err) {
      // Audio fails silently
    }
  }

  // Delicate two-tone crystal chime for modal openings
  function playCrystalChime() {
    if (!state.sound) return;
    playSound(680, "sine", 0.08, 0.95);
    setTimeout(() => {
      playSound(1020, "triangle", 0.12, 0.8);
    }, 45);
  }

  /* --------------------------------------------------------------------------
     Cocktail Garnish Background Spawning Engine
     -------------------------------------------------------------------------- */
  let garnishInterval = null;
  const activeGarnishes = new Set();
  const MAX_GARNISHES = 9;

  function spawnGarnish() {
    if (!state.animations) return;
    const stage = document.getElementById("garnish-stage");
    if (!stage) return;
    if (activeGarnishes.size >= MAX_GARNISHES) return;

    const el = document.createElement("div");
    el.className = "garnish-item";

    // Randomize SVG type 0 - 11
    const iconIndex = Math.floor(Math.random() * GARNISH_SVGS.length);
    el.innerHTML = GARNISH_SVGS[iconIndex];

    // Randomize depth class
    const depthRoll = Math.random();
    let depthClass = "garnish-mid";
    let speedMult = 1;
    let size = 34 + Math.random() * 12;

    if (depthRoll < 0.35) {
      depthClass = "garnish-distant";
      speedMult = 1.35;
      size = 22 + Math.random() * 8;
    } else if (depthRoll > 0.8) {
      depthClass = "garnish-near";
      speedMult = 0.75;
      size = 44 + Math.random() * 10;
    }
    el.classList.add(depthClass);
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    // Horizontal position
    const startX = 5 + Math.random() * 90;
    const drift = (Math.random() - 0.5) * 60;
    const rotationStart = Math.random() * 360;
    const rotationDelta = (Math.random() - 0.5) * 180;
    const duration = (18 + Math.random() * 14) * speedMult;

    el.style.left = `${startX}vw`;
    el.style.bottom = "-60px";
    el.style.opacity = "0";

    stage.appendChild(el);
    activeGarnishes.add(el);

    const startTime = performance.now();

    function step(now) {
      const elapsed = (now - startTime) / 1000;
      const progress = elapsed / duration;

      if (progress >= 1 || !state.animations) {
        if (el.parentNode) el.parentNode.removeChild(el);
        activeGarnishes.delete(el);
        return;
      }

      // Vertical rise from bottom to top
      const currentY = progress * 118; // percent viewport height
      const currentDrift = Math.sin(progress * Math.PI) * drift;
      const currentRot = rotationStart + progress * rotationDelta;

      // Soft fade in, smooth fade out at ceiling
      let alpha = 1;
      if (progress < 0.12) {
        alpha = progress / 0.12;
      } else if (progress > 0.85) {
        alpha = (1 - progress) / 0.15;
      }

      el.style.transform = `translate3d(${currentDrift}px, -${currentY}vh, 0) rotate(${currentRot}deg)`;
      el.style.opacity = alpha;

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function startGarnishEngine() {
    stopGarnishEngine();
    if (!state.animations) return;
    
    // Seed initial garnishes staggered on screen
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        spawnGarnish();
      }, i * 900);
    }

    garnishInterval = setInterval(() => {
      spawnGarnish();
    }, 2800);
  }

  function stopGarnishEngine() {
    if (garnishInterval) {
      clearInterval(garnishInterval);
      garnishInterval = null;
    }
    const stage = document.getElementById("garnish-stage");
    if (stage) stage.innerHTML = "";
    activeGarnishes.clear();
  }

  /* --------------------------------------------------------------------------
     Grid Renderer (Preserved Logic & Structure)
     -------------------------------------------------------------------------- */
  function renderGrid() {
    const grid = document.getElementById("game-grid");
    if (!grid) return;

    const fragment = document.createDocumentFragment();

    GAMES.forEach((item) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";

      if (item && item.enabled) {
        const link = document.createElement("a");
        link.className = "tile";
        link.href = item.url || "#";
        link.setAttribute("role", "listitem");
        link.setAttribute("aria-label", `Play ${item.name}`);

        link.addEventListener("click", () => {
          playSound(580, "triangle", 0.07, 0.7);
        });

        const iconEl = document.createElement("div");
        iconEl.className = "tile-icon";
        iconEl.innerHTML = ICONS[item.icon] || ICONS.grid;

        const label = document.createElement("span");
        label.className = "tile-label";
        label.textContent = item.name;

        link.appendChild(iconEl);
        link.appendChild(label);
        cell.appendChild(link);
      } else {
        cell.classList.add("is-empty");
        cell.setAttribute("aria-hidden", "true");
      }

      fragment.appendChild(cell);
    });

    grid.innerHTML = "";
    grid.appendChild(fragment);
  }

  /* --------------------------------------------------------------------------
     Modal & Slide-Up Sheet Dialog Controller
     -------------------------------------------------------------------------- */
  let activeModal = null;
  let previouslyFocused = null;

  function openModal(modalEl, triggerBtn) {
    if (!modalEl) return;
    initAudio();
    playCrystalChime();

    previouslyFocused = triggerBtn || document.activeElement;
    activeModal = modalEl;

    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.classList.add("is-active");

    modalEl.hidden = false;
    void modalEl.offsetHeight; // Reflow trigger
    modalEl.classList.add("is-open");

    if (triggerBtn) {
      triggerBtn.setAttribute("aria-expanded", "true");
    }

    const focusable = modalEl.querySelector("button, [href], input, [tabindex]:not([tabindex='-1'])");
    if (focusable) focusable.focus();

    document.addEventListener("keydown", handleKeydown);
  }

  function closeModal() {
    if (!activeModal) return;
    playSound(400, "sine", 0.05, 0.5);

    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.classList.remove("is-active");

    activeModal.classList.remove("is-open");

    const closingModal = activeModal;
    setTimeout(() => {
      if (!closingModal.classList.contains("is-open")) {
        closingModal.hidden = true;
      }
    }, 320);

    const btnSettings = document.getElementById("btn-settings");
    const btnDonate = document.getElementById("btn-donate");
    if (btnSettings) btnSettings.setAttribute("aria-expanded", "false");
    if (btnDonate) btnDonate.setAttribute("aria-expanded", "false");

    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }

    activeModal = null;
    document.removeEventListener("keydown", handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  /* --------------------------------------------------------------------------
     Settings & Event Interaction Setup
     -------------------------------------------------------------------------- */
  function applyAnimationState() {
    if (state.animations) {
      document.body.classList.remove("animations-disabled");
      startGarnishEngine();
    } else {
      document.body.classList.add("animations-disabled");
      stopGarnishEngine();
    }
  }

  function setupInteractions() {
    const btnInstagram = document.getElementById("btn-instagram");
    const btnSettings = document.getElementById("btn-settings");
    const btnDonate = document.getElementById("btn-donate");

    const modalSettings = document.getElementById("settings-modal");
    const modalDonate = document.getElementById("donate-modal");
    const btnCloseSettings = document.getElementById("close-settings");
    const btnCloseDonate = document.getElementById("close-donate");
    const backdrop = document.getElementById("modal-backdrop");

    const soundToggle = document.getElementById("toggle-sound");
    const animToggle = document.getElementById("toggle-animations");
    const stripeLink = document.getElementById("stripe-donate-link");

    // Initialize toggle state from storage
    if (soundToggle) soundToggle.checked = state.sound;
    if (animToggle) animToggle.checked = state.animations;
    applyAnimationState();

    // Instagram Tile Click
    if (btnInstagram) {
      btnInstagram.addEventListener("click", () => {
        playSound(640, "sine", 0.06, 0.75);
      });
    }

    // Toggle Sound
    if (soundToggle) {
      soundToggle.addEventListener("change", (e) => {
        state.sound = e.target.checked;
        saveSettings();
        if (state.sound) playSound(640, "sine", 0.06, 0.9);
      });
    }

    // Toggle Animations
    if (animToggle) {
      animToggle.addEventListener("change", (e) => {
        state.animations = e.target.checked;
        saveSettings();
        applyAnimationState();
        if (state.sound) playSound(520, "sine", 0.05, 0.85);
      });
    }

    // Modal Triggers
    if (btnSettings && modalSettings) {
      btnSettings.addEventListener("click", () => openModal(modalSettings, btnSettings));
    }

    if (btnDonate && modalDonate) {
      btnDonate.addEventListener("click", () => openModal(modalDonate, btnDonate));
    }

    if (btnCloseSettings) {
      btnCloseSettings.addEventListener("click", closeModal);
    }

    if (btnCloseDonate) {
      btnCloseDonate.addEventListener("click", closeModal);
    }

    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    if (stripeLink) {
      stripeLink.addEventListener("click", () => {
        playSound(740, "triangle", 0.1, 0.95);
      });
    }
  }

  /* --------------------------------------------------------------------------
     Initialization
     -------------------------------------------------------------------------- */
  function init() {
    loadSettings();
    renderGrid();
    setupInteractions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();