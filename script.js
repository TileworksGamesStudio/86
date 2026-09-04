/**
 * BARTENDER GAMES HUB - CONTROLLER & REGISTRY
 * 
 * Central data-driven portal for launching bartender games.
 * Adding a game only requires inserting a new entry into `GAMES_CATALOGUE`.
 */

'use strict';

/* ==========================================================================
   1. SHARED MODERN SVG ICON REGISTRY
   Visually coherent iconography sharing stroke weight, palettes, and mood.
   ========================================================================== */
const ICONS = {
  // Crossword puzzle grid symbol
  crossword: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="4" stroke="#D9A63A" stroke-width="1.8"/>
      <line x1="12" y1="4" x2="12" y2="28" stroke="#D9A63A" stroke-width="1.4" opacity="0.6"/>
      <line x1="20" y1="4" x2="20" y2="28" stroke="#D9A63A" stroke-width="1.4" opacity="0.6"/>
      <line x1="4" y1="12" x2="28" y2="12" stroke="#D9A63A" stroke-width="1.4" opacity="0.6"/>
      <line x1="4" y1="20" x2="28" y2="20" stroke="#D9A63A" stroke-width="1.4" opacity="0.6"/>
      <rect x="4" y="4" width="8" height="8" fill="#C45B28" opacity="0.85"/>
      <rect x="20" y="12" width="8" height="8" fill="#C45B28" opacity="0.85"/>
      <rect x="12" y="20" width="8" height="8" fill="#96352A" opacity="0.9"/>
    </svg>
  `,

  // Cocktail shaker & speed pour dynamic symbol
  speedPour: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Cobbler Shaker Body -->
      <path d="M11 15L13 27C13 28.1 13.9 29 15 29H17C18.1 29 19 28.1 19 27L21 15H11Z" fill="#C45B28" fill-opacity="0.2" stroke="#D9A63A" stroke-width="1.8" stroke-linejoin="round"/>
      <!-- Shaker Shoulder -->
      <path d="M9 15C9 13 11 11 16 11C21 11 23 13 23 15H9Z" stroke="#D9A63A" stroke-width="1.8" fill="#60402B"/>
      <!-- Shaker Cap -->
      <rect x="13" y="6" width="6" height="5" rx="1.5" fill="#D9A63A" stroke="#D9A63A" stroke-width="1.5"/>
      <!-- Speed Motion Streaks -->
      <path d="M5 8L8 10" stroke="#FAF2EB" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
      <path d="M24 7L27 9" stroke="#FAF2EB" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
      <path d="M25 24L28 22" stroke="#FAF2EB" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>
  `,

  // Coupette & glassware silhouettes
  glassware: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Coupe Bowl -->
      <path d="M6 10C6 16.5 11 18 16 18C21 18 26 16.5 26 10H6Z" fill="#C45B28" fill-opacity="0.25" stroke="#D9A63A" stroke-width="1.8" stroke-linejoin="round"/>
      <!-- Stem -->
      <line x1="16" y1="18" x2="16" y2="27" stroke="#FAF2EB" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Base -->
      <path d="M10 27H22" stroke="#D9A63A" stroke-width="2" stroke-linecap="round"/>
      <!-- Liquid Line & Olive Garnish -->
      <line x1="8" y1="12" x2="24" y2="12" stroke="#C45B28" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="16" cy="9" r="2.5" fill="#96352A" stroke="#FAF2EB" stroke-width="1"/>
    </svg>
  `,

  // Connections / flavor molecular network
  connections: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="7" r="3.5" fill="#D9A63A"/>
      <circle cx="7" cy="22" r="3.5" fill="#C45B28"/>
      <circle cx="25" cy="22" r="3.5" fill="#96352A"/>
      <circle cx="16" cy="19" r="2.5" fill="#FAF2EB"/>
      <line x1="16" y1="10.5" x2="16" y2="16.5" stroke="#FAF2EB" stroke-width="1.6" stroke-dasharray="2 2"/>
      <line x1="9.5" y1="20" x2="13.5" y2="19" stroke="#FAF2EB" stroke-width="1.6"/>
      <line x1="22.5" y1="20" x2="18.5" y2="19" stroke="#FAF2EB" stroke-width="1.6"/>
    </svg>
  `,

  // Recipe cards & flash recall
  flashcards: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="9" y="5" width="16" height="20" rx="3" transform="rotate(8 9 5)" fill="#60402B" stroke="#D9A63A" stroke-width="1.6"/>
      <rect x="6" y="7" width="16" height="20" rx="3" fill="#271A14" stroke="#C45B28" stroke-width="1.8"/>
      <line x1="10" y1="12" x2="18" y2="12" stroke="#D9A63A" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10" y1="16" x2="16" y2="16" stroke="#FAF2EB" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10" y1="20" x2="14" y2="20" stroke="#FAF2EB" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>
  `,

  // Spirits globe & distillation trivia
  spirits: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Distillation Alembic Still outline -->
      <path d="M8 25C8 20 12 18 14 15V9C14 7.5 15.5 6 17 6H19C20.5 6 22 7.5 22 9C22 12 26 13 26 17" stroke="#D9A63A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Still Base Kettle -->
      <path d="M6 25C6 22 9 20 15 20C21 20 24 22 24 25C24 27 21 28 15 28C9 28 6 27 6 25Z" fill="#C45B28" fill-opacity="0.3" stroke="#FAF2EB" stroke-width="1.5"/>
      <circle cx="26" cy="18" r="1.5" fill="#D9A63A"/>
      <!-- Warm Flame -->
      <path d="M13 29C13 29 15 27 15 29C15 29 17 27 17 29" stroke="#96352A" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // Fallback icon for future game entries lacking a custom SVG
  fallback: `
    <svg class="tile-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke="#D9A63A" stroke-width="1.8" stroke-dasharray="2 2"/>
      <path d="M12 16L15 19L20 13" stroke="#C45B28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
};

/* Chevron SVG used uniformly across cards */
const CHEVRON_SVG = `
  <svg class="tile-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
`;

/* ==========================================================================
   2. DATA-DRIVEN GAME CATALOGUE
   Structured catalogue containing real game destinations and metadata.
   ========================================================================== */
const GAMES_CATALOGUE = [
  {
    id: "crossword",
    title: "Bar Crossword",
    description: "Decode mixology terminology, classic formulas, and technical jargon.",
    icon: "crossword",
    url: "./crossword/",
    category: "Word",
    isNew: false,
    isVisible: true,
    order: 1
  },
  {
    id: "recipe-rush",
    title: "Recipe Rush",
    description: "Call the specs under pressure: build cocktail orders against the clock.",
    icon: "speedPour",
    url: "./recipe-rush/",
    category: "Speed",
    isNew: true,
    isVisible: true,
    order: 2
  },
  {
    id: "glassware-match",
    title: "Glassware Challenge",
    description: "Pair classic drinks to their historic stems, vessels, and correct ice.",
    icon: "glassware",
    url: "./glassware/",
    category: "Recognition",
    isNew: false,
    isVisible: true,
    order: 3
  },
  {
    id: "flavor-connections",
    title: "Flavor Connections",
    description: "Group ingredients, liqueurs, and spirits by botanical profiles.",
    icon: "connections",
    url: "./connections/",
    category: "Matching",
    isNew: true,
    isVisible: true,
    order: 4
  },
  {
    id: "spirits-origin",
    title: "Spirits of Origin",
    description: "Explore geography, denominations of origin, and distillation styles.",
    icon: "spirits",
    url: "./spirits/",
    category: "Trivia",
    isNew: false,
    isVisible: true,
    order: 5
  },
  {
    id: "speed-recall",
    title: "Classic Flashcards",
    description: "Master standard IBA ratios, modifiers, and classic garnish specs.",
    icon: "flashcards",
    url: "./flashcards/",
    category: "Memory",
    isNew: false,
    isVisible: true,
    order: 6
  }
];

/* ==========================================================================
   3. RENDERING & UX ENGINE
   ========================================================================== */
class GameHub {
  constructor(catalogue, containerId, countIndicatorId) {
    this.catalogue = catalogue;
    this.container = document.getElementById(containerId);
    this.countIndicator = document.getElementById(countIndicatorId);
  }

  /**
   * Initializes the hub, validates data, and attaches interactions
   */
  init() {
    if (!this.container) {
      console.error("GameHub Error: Main container element not found.");
      return;
    }

    this.render();
  }

  /**
   * Validates and returns visible items ordered by display index
   */
  getValidGames() {
    return this.catalogue
      .filter(game => game && game.isVisible !== false && game.id && game.title)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  }

  /**
   * Generates DOM elements for each game entry
   */
  render() {
    const activeGames = this.getValidGames();

    // Update footer count indicator
    if (this.countIndicator) {
      this.countIndicator.textContent = `${activeGames.length} Game${activeGames.length === 1 ? '' : 's'} Available`;
    }

    // Handle empty state gracefully
    if (activeGames.length === 0) {
      this.renderEmptyState();
      return;
    }

    // Clean container and mark loading state complete
    this.container.innerHTML = '';
    this.container.setAttribute('aria-busy', 'false');

    // Build cards
    activeGames.forEach((game, index) => {
      const tile = this.createTileElement(game, index);
      this.container.appendChild(tile);
    });
  }

  /**
   * Constructs an individual accessible card node
   */
  createTileElement(game, index) {
    const anchor = document.createElement('a');
    anchor.className = 'game-tile';
    anchor.href = game.url || '#';
    anchor.setAttribute('role', 'article');
    anchor.setAttribute('aria-label', `${game.title}. ${game.description || ''}`);

    // Stagger animation timing slightly for polished page load
    anchor.style.animationDelay = `${index * 55}ms`;
    anchor.classList.add('is-visible');

    // Resolve icon or fallback
    const iconSvg = ICONS[game.icon] || ICONS.fallback;

    // Optional tags/labels
    const newBadgeHtml = game.isNew ? `<span class="badge-new" aria-label="Newly Added">NEW</span>` : '';
    const categoryHtml = game.category ? `<span class="badge-category">${this.escapeHtml(game.category)}</span>` : '';

    anchor.innerHTML = `
      <div class="tile-icon-box">
        ${iconSvg}
      </div>
      <div class="tile-content">
        <div class="tile-header-line">
          <span class="tile-title">${this.escapeHtml(game.title)}</span>
          ${categoryHtml}
          ${newBadgeHtml}
        </div>
        <p class="tile-description">${this.escapeHtml(game.description || 'Practice bartending knowledge.')}</p>
      </div>
      <div class="tile-action">
        ${CHEVRON_SVG}
      </div>
    `;

    // Bind event handlers for tactile navigation & touch feedback
    this.bindInteractions(anchor, game);

    return anchor;
  }

  /**
   * Binds touch, press, and click navigation feedback
   */
  bindInteractions(element, game) {
    // Touch feedback
    element.addEventListener('touchstart', () => {
      element.classList.add('is-active');
    }, { passive: true });

    element.addEventListener('touchend', () => {
      element.classList.remove('is-active');
    }, { passive: true });

    element.addEventListener('touchcancel', () => {
      element.classList.remove('is-active');
    }, { passive: true });

    // Click launch confirmation
    element.addEventListener('click', (e) => {
      // Prevent instant navigation if custom transitions or mock routes exist
      if (element.getAttribute('href').startsWith('#')) {
        e.preventDefault();
      }

      element.classList.add('launching');

      // Feedback delay ensures visual compression and state transition are perceived
      if (!element.getAttribute('href').startsWith('#')) {
        // If clicking a genuine link, allow default navigation to run naturally
        return;
      }

      setTimeout(() => {
        element.classList.remove('launching');
      }, 350);
    });
  }

  /**
   * Renders intentional empty state if catalogue has 0 visible games
   */
  renderEmptyState() {
    this.container.innerHTML = `
      <div class="hub-empty-state">
        <svg class="hub-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
        <h2 class="hub-empty-title">Games In Preparation</h2>
        <p class="hub-empty-desc">The cocktail roster is currently updating. Please check back soon.</p>
      </div>
    `;
    this.container.setAttribute('aria-busy', 'false');
  }

  /**
   * Simple HTML escaper to protect UI from arbitrary string injections
   */
  escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

/* ==========================================================================
   4. BOOTSTRAP ON DOM CONTENT LOADED
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const hub = new GameHub(GAMES_CATALOGUE, 'game-grid', 'game-count-indicator');
  hub.init();
});