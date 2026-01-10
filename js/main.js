import { initAlpineStore } from './alpineStore.js';
import { initI18nStore } from './i18n/index.js';

// ========================================================================
// SEQUENTIAL LOADER PATTERN
// ========================================================================
// 1. Fetch data (translations, config)
// 2. Initialize stores
// 3. Inject Alpine.js (starts the app)
// ========================================================================

const ALPINE_URL = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js';

async function bootstrap() {
    console.log('🚀 Bootstrapping Trailkin...');

    // 1. Fetch Translations
    let translations = { de: null, en: null };
    try {
        const basePath = window.location.pathname.includes('/TrailKin/') ? '/TrailKin' : '';
        const [de, en] = await Promise.all([
            fetch(`${basePath}/js/i18n/de.json`).then(r => r.json()),
            fetch(`${basePath}/js/i18n/en.json`).then(r => r.json())
        ]);
        translations = { de, en };
        console.log('✅ Translations loaded');
    } catch (error) {
        console.error('❌ Failed to load translations:', error);
        // Fallback
        translations = {
            de: { meta: { name: 'Deutsch', flag: '🇩🇪' } },
            en: { meta: { name: 'English', flag: '🇬🇧' } }
        };
    }

    // 2. Setup Alpine initialization hook
    document.addEventListener('alpine:init', () => {
        const Alpine = window.Alpine;

        // Init i18n store with loaded data
        initI18nStore(Alpine, translations);

        // Init main game store
        initAlpineStore(Alpine);
        Alpine.store('game').loadGame();

        console.log('✅ Alpine stores initialized');
    });

    // 3. Inject Alpine.js Script
    // This ensures Alpine loads ONLY after we are ready to handle alpine:init
    const script = document.createElement('script');
    script.src = ALPINE_URL;
    script.defer = true;
    script.onerror = () => console.error('❌ Failed to load Alpine.js');
    document.head.appendChild(script);
    console.log('⏳ Injecting Alpine.js...');
}

// Start the sequence
bootstrap();

// ========================================================================
// GLOBAL EVENT LISTENERS
// ========================================================================

window.addEventListener('hashchange', () => {
    const tab = window.location.hash.substring(1);
    if (tab && window.Alpine && window.Alpine.store('game')) {
        window.Alpine.store('game').currentTab = tab;
    }
});
