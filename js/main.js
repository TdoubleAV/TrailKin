import { initAlpineStore } from './alpineStore.js';

// ========================================================================
// ALPINE.JS INITIALIZATION
// ========================================================================
// We need to ensure the store is initialized BEFORE Alpine scans the DOM.
// This supports both synchronous (CDN) and asynchronous loading patterns.
// ========================================================================

try {
    if (window.Alpine) {
        // Scenario 1: Alpine is already loaded (e.g. deferred script finished)
        initAlpineStore(window.Alpine);
        window.Alpine.store('game').loadGame();
    } else {
        // Scenario 2: Alpine is not yet loaded. Wait for the event.
        document.addEventListener('alpine:init', () => {
            initAlpineStore(window.Alpine);
            window.Alpine.store('game').loadGame();
        });
    }
} catch (e) {
    console.error("Alpine initialization failed:", e);
}

// ========================================================================
// GLOBAL EVENT LISTENERS
// ========================================================================

// Handle Browser Back/Forward buttons and external hash changes
window.addEventListener('hashchange', () => {
    const tab = window.location.hash.substring(1);
    if (tab && window.Alpine) {
        window.Alpine.store('game').currentTab = tab;
    }
});

// Initial Generator Call (ensure store is ready)
document.addEventListener('alpine:initialized', () => {
    Alpine.store('game').generateInspiration('wald');
});
