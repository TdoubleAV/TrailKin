import { initAlpineStore } from './alpineStore.js';
import { initI18nStore } from './i18n/index.js';

// ========================================================================
// ALPINE.JS INITIALIZATION
// ========================================================================
// Register the store BEFORE Alpine starts processing the DOM.
// This uses the 'alpine:init' event which fires before DOM processing.
// ========================================================================

// Guard against multiple initializations
let storeInitialized = false;

async function initStore(Alpine) {
    if (storeInitialized) return;
    storeInitialized = true;

    await initI18nStore(Alpine);  // Initialize i18n first (loads translations)
    initAlpineStore(Alpine);
    Alpine.store('game').loadGame();
    console.log('Trailkin store initialized');
}

// Always add the event listener first (synchronously)
document.addEventListener('alpine:init', async () => {
    await initStore(window.Alpine);
});

// If Alpine is already available (shouldn't happen with defer, but just in case)
if (window.Alpine && window.Alpine.store && !storeInitialized) {
    // Alpine might already be past init, try to register anyway
    initStore(window.Alpine);
}

// ========================================================================
// GLOBAL EVENT LISTENERS
// ========================================================================

// Handle Browser Back/Forward buttons and external hash changes
window.addEventListener('hashchange', () => {
    const tab = window.location.hash.substring(1);
    if (tab && window.Alpine && window.Alpine.store('game')) {
        window.Alpine.store('game').currentTab = tab;
    }
});

// Note: No longer auto-generating initial inspiration
// Users now start with empty list and add ideas manually
