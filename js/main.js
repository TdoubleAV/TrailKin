import { initAlpineStore } from './alpineStore.js';
import { initI18nStore } from './i18n/index.js';

// ========================================================================
// SYNCHRONOUS INITIALIZATION PATTERN (v3.1 - Race Condition Fix)
// ========================================================================
// 1. Initialize stores SYNCHRONOUSLY with fallback data
// 2. Inject Alpine.js (starts immediately, stores are ready)
// 3. Load translations ASYNCHRONOUSLY and update reactively
// ========================================================================

const ALPINE_URL = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js';

// Minimal fallback translations (always available)
const fallbackTranslations = {
    de: { meta: { name: 'Deutsch', flag: '🇩🇪' } },
    en: { meta: { name: 'English', flag: '🇬🇧' } }
};

// 1. SYNCHRONOUS: Initialize stores with fallback data
document.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine;

    console.log('🚀 Initializing stores (synchronous)...');

    // Init i18n store with fallback
    initI18nStore(Alpine, fallbackTranslations);

    // Init main game store
    initAlpineStore(Alpine);
    Alpine.store('game').loadGame();

    console.log('✅ Alpine stores initialized');
});

// 2. Inject Alpine.js (will start immediately after script loads)
const script = document.createElement('script');
script.src = ALPINE_URL;
script.defer = true;
script.onerror = () => console.error('❌ Failed to load Alpine.js');
document.head.appendChild(script);
console.log('⏳ Injecting Alpine.js...');

// 3. ASYNCHRONOUS: Load real translations and update store reactively
(async () => {
    console.log('⏳ Loading translations...');
    try {
        const basePath = window.location.pathname.includes('/TrailKin/') ? '/TrailKin' : '';
        const [de, en] = await Promise.all([
            fetch(`${basePath}/js/i18n/de.json`).then(r => r.json()),
            fetch(`${basePath}/js/i18n/en.json`).then(r => r.json())
        ]);

        // Wait for Alpine to be ready
        await new Promise(resolve => {
            if (window.Alpine && window.Alpine.store('i18n')) {
                resolve();
            } else {
                const interval = setInterval(() => {
                    if (window.Alpine && window.Alpine.store('i18n')) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            }
        });

        // Reactively update translations
        window.TRAILKIN_TRANSLATIONS = { de, en };
        window.Alpine.store('i18n').updateTranslations({ de, en });
        console.log('✅ Translations loaded and updated');
    } catch (error) {
        console.error('❌ Failed to load translations:', error);
        console.warn('⚠️ Using fallback translations');
    }
})();

// ========================================================================
// GLOBAL EVENT LISTENERS
// ========================================================================

window.addEventListener('hashchange', () => {
    const tab = window.location.hash.substring(1);
    if (tab && window.Alpine && window.Alpine.store('game')) {
        window.Alpine.store('game').currentTab = tab;
    }
});
