/**
 * ==========================================================================
 * TILEWORKS: THE BARTENDER GAMES — CONTROLLER
 * ==========================================================================
 * Self-contained, zero-dependency, performance-tuned controller for:
 * 1. Centralized 9-tile configuration (independent enable/disable & URL control)
 * 2. High-aesthetic cocktail garnish particle system (~7-10 active)
 * 3. Cinematic logo intro sequence with ~0.8s hold and forward exit
 * 4. Snappy Neo-Brutalist 3D glass fall-through with zero-lag navigation handoff
 * 5. Full keyboard, screen-reader, and reduced-motion compliance
 * ==========================================================================
 */

(function () {
  "use strict";

  /* ========================================================================
     1. TILE CONFIGURATION — EDIT DIRECTLY AS DESIRED
     ======================================================================== */
  const TILES_CONFIG = [
    {
      id: "crossword",
      name: "Crossword",
      url: "https://tileworksgamesstudio.github.io/86Crossword/",
      enabled: false,
      icon: "crossword"
    },
    {
      id: "connections",
      name: "Connections",
      url: "https://tileworksgamesstudio.github.io/86Connections/",
      enabled: true,
      icon: "connections"
    },
    {
      id: "trivia",
      name: "Trivia",
      url: "https://tileworksgamesstudio.github.io/86Trivia/",
      enabled: true,
      icon: "trivia"
    },
    {
      id: "hangman",
      name: "Hangman",
      url: "https://tileworksgamesstudio.github.io/86Hangman/",
      enabled: true,
      icon: "hangman"
    },
    {
      id: "specs",
      name: "Specs",
      url: "https://tileworksgamesstudio.github.io/86Specs/",
      enabled: true,
      icon: "specs"
    },
    {
      id: "memory",
      name: "Memory",
      url: "https://tileworksgamesstudio.github.io/86Memory/",
      enabled: true,
      icon: "memory"
    },
    {
      id: "spelling-bee",
      name: "Spelling Bee",
      url: "https://tileworksgamesstudio.github.io/86SpellingBee/",
      enabled: true,
      icon: "spelling-bee"
    },
    {
      id: "wordle",
      name: "Wordle",
      url: "https://tileworksgamesstudio.github.io/86Wordle/",
      enabled: true,
      icon: "wordle"
    },
    {
      id: "donate",
      name: "Donate",
      url: "https://tileworksgamesstudio.github.io/86Donate",
      enabled: false,
      icon: "donate"
    }
  ];

  /* Centralized Instagram Destination URL */
  const INSTAGRAM_URL = "https://instagram.com/tileworks_studio";

  /* Animation & Interaction Timing Tokens (in milliseconds) */
  const TIMINGS = {
    logoHoldDuration: 800,        // Explicit ~0.8 second hold
    logoSettleDuration: 650,      // Elastic settle bounce
    logoExitDuration: 680,        // Forward fly-through duration
    tileFallDuration: 270,        // Snappy, seamless glass plunge
    navigationDispatchLead: 240,  // Fast handoff before browser unload
    gridEntranceStagger: 40,      // Gentle stagger across 9 cells
    repeatVisitFastIntro: true    // Instant bypass on repeat visits in session
  };

  /* ========================================================================
     2. SVG ICON REGISTRY (FINE GOLD LINE ART)
     ======================================================================== */
  const SVG_ICONS = {
    // Crossword: Mini refined crossword matrix
    crossword: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <rect x="9" y="3" width="6" height="6" fill="currentColor" fill-opacity="0.2" />
        <rect x="3" y="9" width="6" height="6" fill="currentColor" fill-opacity="0.2" />
        <rect x="15" y="15" width="6" height="6" fill="currentColor" fill-opacity="0.2" />
      </svg>
    `,

    // Connections: 4 linked nodes
    connections: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="6" height="6" rx="1.5" />
        <rect x="14.5" y="3.5" width="6" height="6" rx="1.5" />
        <rect x="3.5" y="14.5" width="6" height="6" rx="1.5" />
        <rect x="14.5" y="14.5" width="6" height="6" rx="1.5" />
        <line x1="9.5" y1="6.5" x2="14.5" y2="6.5" stroke-dasharray="1.5 1.5" />
        <line x1="6.5" y1="9.5" x2="6.5" y2="14.5" stroke-dasharray="1.5 1.5" />
        <line x1="17.5" y1="9.5" x2="17.5" y2="14.5" stroke-dasharray="1.5 1.5" />
        <line x1="9.5" y1="17.5" x2="14.5" y2="17.5" stroke-dasharray="1.5 1.5" />
      </svg>
    `,

    // Trivia: Knowledge seal with spark
    trivia: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 2-2.3 3.5" />
        <circle cx="12" cy="16.7" r="0.75" fill="currentColor" />
      </svg>
    `,

    // Hangman: Elegant scaffold and word blank motif
    hangman: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20h8" />
        <path d="M7 20V4h8v3" />
        <circle cx="15" cy="9.5" r="2.5" />
        <path d="M15 12v4" />
        <path d="M13 13.5l4 0" />
      </svg>
    `,

    // Specs: Cocktail measurement challenge specification
    specs: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
        <line x1="8" y1="15" x2="14" y2="15" />
        <path d="M15 13l2.5 2.5L20 13" stroke-width="1.3" />
      </svg>
    `,

    // Memory: Two matching cards in subtle perspective
    memory: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="10" height="14" rx="1.8" />
        <rect x="11" y="5" width="10" height="14" rx="1.8" />
        <path d="M6.5 10a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" />
        <circle cx="8" cy="14.5" r="0.6" fill="currentColor" />
        <path d="M14.5 10a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" />
        <circle cx="16" cy="14.5" r="0.6" fill="currentColor" />
      </svg>
    `,

    // Spelling Bee: Honeycomb cell with botanical bee motif
    "spelling-bee": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.5l7 4v9l-7 4-7-4v-9l7-4z" />
        <ellipse cx="12" cy="12" rx="2" ry="3.5" />
        <path d="M10 10.5C8 9 6.5 10 7 11.5c.5 1.5 3 1 3 1" />
        <path d="M14 10.5C16 9 17.5 10 17 11.5c-.5 1.5-3 1-3 1" />
      </svg>
    `,

    // Wordle: 5 letter-grid tiles row motif
    wordle: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
        <line x1="2.5" y1="9.3" x2="21.5" y2="9.3" />
        <line x1="2.5" y1="14.6" x2="21.5" y2="14.6" />
        <line x1="6.3" y1="4" x2="6.3" y2="20" />
        <line x1="10.1" y1="4" x2="10.1" y2="20" />
        <line x1="13.9" y1="4" x2="13.9" y2="20" />
        <line x1="17.7" y1="4" x2="17.7" y2="20" />
        <path d="M11 12l1 1 2-2" stroke-width="1.6" />
      </svg>
    `,

    // Donate: Hospitality spark coupette
    donate: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 5h12l-1 5a5 5 0 0 1-10 0L6 5z" />
        <line x1="12" y1="10" x2="12" y2="18" />
        <line x1="8" y1="18" x2="16" y2="18" />
        <path d="M12 2v2" />
        <path d="M11 3a1 1 0 0 1 2 0c0 1-1 1.5-1 2.5" stroke-width="1.2" />
      </svg>
    `
  };

  /* ========================================================================
     3. GARNISH ILLUSTRATION LIBRARY (LUXURY COCKTAIL LINE ART)
     ======================================================================== */
  const GARNISH_SHAPES = [
    // Orange Peel Twist
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round"><path d="M8 24c2-6 8-8 12-4s2 8-4 10-9-5-7-12c1.5-5.5 8-8 13-6" /></svg>`,
    // Dehydrated Citrus Wheel
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3"><circle cx="16" cy="16" r="13" /><circle cx="16" cy="16" r="10.5" stroke-dasharray="2 1.5" /><circle cx="16" cy="16" r="2.2" /><line x1="16" y1="5.5" x2="16" y2="13.8" /><line x1="16" y1="18.2" x2="16" y2="26.5" /><line x1="5.5" y1="16" x2="13.8" y2="16" /><line x1="18.2" y1="16" x2="26.5" y2="16" /><line x1="8.5" y1="8.5" x2="14.4" y2="14.4" /><line x1="17.6" y1="17.6" x2="23.5" y2="23.5" /><line x1="8.5" y1="23.5" x2="14.4" y2="17.6" /><line x1="17.6" y1="14.4" x2="23.5" y2="8.5" /></svg>`,
    // Citrus Wedge
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3"><path d="M6 10a14 14 0 0 0 20 14L6 10z" /><path d="M9 12a10.5 10.5 0 0 0 15 11L9 12z" /><line x1="9" y1="12" x2="18" y2="21" /><line x1="13.5" y1="12" x2="20" y2="18" /><line x1="10" y1="16" x2="15" y2="21" /></svg>`,
    // Mint Sprig
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round"><path d="M16 27V9" /><path d="M16 19c-4-4-9-2-9 3s5 3 9-3z" /><path d="M16 15c4-4 9-2 9 3s-5 3-9-3z" /><path d="M16 9c-3-4-7-3-7 1s4 3 7-1z" /><path d="M16 9c3-4 7-3 7 1s-4 3-7-1z" /></svg>`,
    // Cherries
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round"><circle cx="10" cy="22" r="5" /><circle cx="22" cy="21" r="5" /><path d="M10 17c2-8 7-11 11-13" /><path d="M22 16c-1-7-3-10-1-12" /><path d="M16 5c2-2 5-1 6 0" /></svg>`,
    // Rosemary Sprig
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.2" stroke-linecap="round"><line x1="6" y1="26" x2="26" y2="6" /><path d="M12 20l-4-3m8-1l-4-3m8-1l-4-3" /><path d="M20 12l3 4m-7-1l3 4m-7-1l3 4" /></svg>`,
    // Olive on Pick
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3"><line x1="4" y1="28" x2="28" y2="4" /><ellipse cx="16" cy="16" rx="5.5" ry="8" transform="rotate(-45 16 16)" /><circle cx="14" cy="14" r="1.5" stroke-width="1" /></svg>`,
    // Star Anise
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.2"><path d="M16 10l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" /><circle cx="16" cy="16" r="2" /></svg>`,
    // Cucumber Ribbon
    `<svg viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round"><path d="M6 22c5 4 15 4 20-2s-3-10-8-8-12 1-12-6 8-6 15-2" /></svg>`
  ];

  /* ========================================================================
     4. APPLICATION STATE
     ======================================================================== */
  const AppState = {
    PHASE: "INTRO", // 'INTRO' | 'READY' | 'NAVIGATING'
    isLocked: false,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  /* Cache Key DOM Elements */
  const introStage = document.getElementById("intro-stage");
  const introLogo = document.getElementById("intro-logo");
  const introLogoFallback = document.getElementById("intro-logo-fallback");
  const gameGrid = document.getElementById("game-grid");
  const instagramLink = document.getElementById("instagram-link");
  const garnishLayer = document.getElementById("garnish-layer");

  /* ========================================================================
     5. INITIALIZATION
     ======================================================================== */
  function init() {
    if (instagramLink) {
      instagramLink.href = INSTAGRAM_URL;
    }

    renderGridStructure();

    const hasSeenIntro = sessionStorage.getItem("tw_hub_intro_seen") === "true";

    if (AppState.reducedMotion || (TIMINGS.repeatVisitFastIntro && hasSeenIntro)) {
      skipIntroToGrid();
    } else {
      executeCinematicIntro();
    }

    initGarnishSystem();
    setupVisibilityLifecycle();
  }

  /* ========================================================================
     6. GRID RENDERING (STRICT 9 POSITIONS)
     ======================================================================== */
  function renderGridStructure() {
    if (!gameGrid) return;
    gameGrid.innerHTML = "";

    TILES_CONFIG.forEach((tile, index) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.setAttribute("data-index", index);

      if (tile.enabled === true) {
        const link = document.createElement("a");
        link.className = "tile-link";
        link.href = tile.url;
        link.setAttribute("data-id", tile.id);
        link.setAttribute("aria-label", `Open ${tile.name}`);
        link.setAttribute("role", "listitem");

        const iconWrap = document.createElement("div");
        iconWrap.className = "tile-icon";
        iconWrap.innerHTML = SVG_ICONS[tile.icon] || SVG_ICONS.crossword;

        const label = document.createElement("span");
        label.className = "tile-name";
        label.textContent = tile.name;

        link.appendChild(iconWrap);
        link.appendChild(label);

        bindTileInteraction(link, tile.url);
        cell.appendChild(link);
      } else {
        // Disabled tile creates intentional speakeasy glass recess
        cell.classList.add("is-empty");
        cell.setAttribute("aria-hidden", "true");
      }

      gameGrid.appendChild(cell);
    });
  }

  /* ========================================================================
     7. SNAPPY TILE INTERACTION & ACCELERATED FALL-THROUGH
     ======================================================================== */
  function bindTileInteraction(link, destinationUrl) {
    // Instant tactile feedback
    link.addEventListener("pointerdown", function () {
      if (AppState.isLocked) return;
      link.classList.add("is-pressed");
    });

    link.addEventListener("pointerup", function () {
      link.classList.remove("is-pressed");
    });

    link.addEventListener("pointercancel", function () {
      link.classList.remove("is-pressed");
    });

    // Primary Click with Instant Responsive Transition
    link.addEventListener("click", function (event) {
      event.preventDefault();

      if (AppState.isLocked || AppState.PHASE !== "READY") {
        return;
      }

      // Lock UI immediately
      AppState.isLocked = true;
      AppState.PHASE = "NAVIGATING";

      gameGrid.classList.add("locked");

      if (AppState.reducedMotion) {
        window.location.href = destinationUrl;
        return;
      }

      // Trigger ultra-fast 3D glass plunge
      link.classList.remove("is-pressed");
      link.classList.add("is-falling");

      // Dispatch navigation swiftly before animation tail to kill perception of lag
      setTimeout(() => {
        window.location.href = destinationUrl;
      }, TIMINGS.navigationDispatchLead);
    });
  }

  /* ========================================================================
     8. CINEMATIC LOGO INTRO SEQUENCE
     ======================================================================== */
  function executeCinematicIntro() {
    if (!introStage) {
      revealGameGrid();
      return;
    }

    if (introLogo) {
      introLogo.onerror = function () {
        introLogo.style.display = "none";
        if (introLogoFallback) {
          introLogoFallback.style.display = "flex";
        }
      };
    }

    try {
      sessionStorage.setItem("tw_hub_intro_seen", "true");
    } catch (e) {
      /* Session storage not available */
    }

    // Step 1: Logo enters and settles
    requestAnimationFrame(() => {
      introStage.classList.add("enter");
    });

    // Step 2: Hold for ~0.8s, then fly forward beyond camera
    const holdStartTime = TIMINGS.logoSettleDuration;

    setTimeout(() => {
      introStage.classList.remove("enter");
      introStage.classList.add("exit");

      // Grid smoothly starts its emergence as logo moves forward
      setTimeout(() => {
        revealGameGrid();

        setTimeout(() => {
          introStage.style.display = "none";
        }, TIMINGS.logoExitDuration);
      }, 150);
    }, holdStartTime + TIMINGS.logoHoldDuration);
  }

  function skipIntroToGrid() {
    if (introStage) {
      introStage.style.display = "none";
    }
    revealGameGrid(true);
  }

  /* ========================================================================
     9. GAME GRID ENTRANCE
     ======================================================================== */
  function revealGameGrid(isInstant) {
    AppState.PHASE = "READY";
    AppState.isLocked = false;

    const cells = gameGrid ? gameGrid.querySelectorAll(".grid-cell") : [];

    if (isInstant || AppState.reducedMotion) {
      cells.forEach((cell) => {
        const link = cell.querySelector(".tile-link");
        if (link) {
          link.style.opacity = "1";
          link.style.transform = "none";
        }
      });
      return;
    }

    cells.forEach((cell, index) => {
      const link = cell.querySelector(".tile-link");
      if (!link) return;

      const row = Math.floor(index / 3);
      const col = index % 3;
      const staggerDelay = (row + col) * TIMINGS.gridEntranceStagger;

      cell.classList.add("emerging");
      link.style.animationDelay = `${staggerDelay}ms`;

      setTimeout(() => {
        cell.classList.remove("emerging");
        link.style.animationDelay = "";
      }, 700 + staggerDelay);
    });
  }

  /* ========================================================================
     10. AMBIENT GARNISH PARTICLE ENGINE
     ======================================================================== */
  const GARNISH_SETTINGS = {
    targetCount: window.innerWidth < 480 ? 7 : 9,
    speedMin: 0.28,
    speedMax: 0.65,
    lateralDrift: 0.35
  };

  let activeGarnishList = [];
  let garnishAnimationId = null;
  let isWindowVisible = true;

  function initGarnishSystem() {
    if (!garnishLayer || AppState.reducedMotion) return;

    for (let i = 0; i < GARNISH_SETTINGS.targetCount; i++) {
      const item = createGarnishElement();
      item.y = Math.random() * window.innerHeight;
      item.x = Math.random() * (window.innerWidth - 60) + 30;
      activeGarnishList.push(item);
      garnishLayer.appendChild(item.el);
    }

    startGarnishLoop();
  }

  function createGarnishElement() {
    const el = document.createElement("div");
    el.className = "garnish-item";

    const svgTemplate = GARNISH_SHAPES[Math.floor(Math.random() * GARNISH_SHAPES.length)];
    el.innerHTML = svgTemplate;

    const size = Math.floor(Math.random() * 16) + 30; // 30px to 46px
    el.style.setProperty("--size", `${size}px`);

    return {
      el: el,
      size: size,
      x: Math.random() * (window.innerWidth - 60) + 30,
      y: window.innerHeight + size + (Math.random() * 60),
      speedY: Math.random() * (GARNISH_SETTINGS.speedMax - GARNISH_SETTINGS.speedMin) + GARNISH_SETTINGS.speedMin,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: (Math.random() * 0.015) + 0.008,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.32,
      baseOpacity: (Math.random() * 0.28) + 0.38
    };
  }

  function startGarnishLoop() {
    if (AppState.reducedMotion) return;

    let lastTime = performance.now();

    function update(time) {
      if (!isWindowVisible) {
        garnishAnimationId = requestAnimationFrame(update);
        return;
      }

      const delta = Math.min((time - lastTime) / 16.66, 2.5);
      lastTime = time;

      const viewportHeight = window.innerHeight;
      const glowThreshold = viewportHeight * 0.72;

      for (let i = 0; i < activeGarnishList.length; i++) {
        const item = activeGarnishList[i];

        item.y -= item.speedY * delta;
        item.driftAngle += item.driftSpeed * delta;
        item.x += Math.sin(item.driftAngle) * GARNISH_SETTINGS.lateralDrift * delta;
        item.rotation += item.rotSpeed * delta;

        if (item.y < -item.size - 20) {
          item.y = viewportHeight + item.size + (Math.random() * 40);
          item.x = Math.random() * (window.innerWidth - 60) + 30;
          item.speedY = Math.random() * (GARNISH_SETTINGS.speedMax - GARNISH_SETTINGS.speedMin) + GARNISH_SETTINGS.speedMin;
          item.rotation = Math.random() * 360;
        }

        let opacity = item.baseOpacity;
        if (item.y > viewportHeight - 80) {
          opacity *= Math.max(0, (viewportHeight - item.y) / 80);
        } else if (item.y < 90) {
          opacity *= Math.max(0, item.y / 90);
        }

        const inLightZone = item.y > glowThreshold;
        if (inLightZone && !item.inGlow) {
          item.inGlow = true;
          item.el.classList.add("in-glow");
        } else if (!inLightZone && item.inGlow) {
          item.inGlow = false;
          item.el.classList.remove("in-glow");
        }

        item.el.style.opacity = opacity.toFixed(3);
        item.el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) rotate(${item.rotation.toFixed(1)}deg)`;
      }

      garnishAnimationId = requestAnimationFrame(update);
    }

    garnishAnimationId = requestAnimationFrame(update);
  }

  /* ========================================================================
     11. LIFECYCLE & RESIZE
     ======================================================================== */
  function setupVisibilityLifecycle() {
    document.addEventListener("visibilitychange", () => {
      isWindowVisible = !document.hidden;
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        GARNISH_SETTINGS.targetCount = window.innerWidth < 480 ? 7 : 9;
      }, 250);
    });
  }

  /* ========================================================================
     12. BOOTSTRAP
     ======================================================================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
