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

// Essential inline translations (prevent placeholder flash)
// Full translations are loaded asynchronously and override these
const fallbackTranslations = {
    de: {
        meta: { name: 'Deutsch', flag: '🇩🇪' },
        nav: {
            start: '🚀 Start',
            group: '🛡️ Gruppe',
            rules: '📜 Regeln',
            ideas: '💡 Ideen',
            quest: '🗺️ Quest',
            bingo: '🎲 Bingo'
        },
        header: {
            title: 'Trailkin',
            tagline: 'Dein Abenteuer beginnt vor der Haustür',
            themeToggle: 'Thema wechseln'
        }
    },
    en: {
        meta: { name: 'English', flag: '🇬🇧' },
        nav: {
            start: '🚀 Start',
            group: '🛡️ Group',
            rules: '📜 Rules',
            ideas: '💡 Ideas',
            quest: '🗺️ Quest',
            bingo: '🎲 Bingo'
        },
        header: {
            title: 'Trailkin',
            tagline: 'Your adventure starts at your doorstep',
            themeToggle: 'Toggle theme'
        }
    }
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

// Backup: Remove skeleton loader when Alpine is fully initialized
// (in case translations load before this fires)
document.addEventListener('alpine:initialized', () => {
    console.log('🎬 Alpine initialized event fired');
    // Give translations a chance to load first, then remove loader
    setTimeout(() => {
        const loader = document.getElementById('app-loader');
        if (loader) {
            console.log('🔄 Removing skeleton loader (alpine:initialized fallback)');
            loader.classList.add('opacity-0');
            setTimeout(() => loader.remove(), 300);
        }
    }, 100);
});

// 2. Inject Alpine.js (will start immediately after script loads)
const script = document.createElement('script');
script.src = ALPINE_URL;
script.defer = true;
script.onerror = () => {
    console.error('❌ Failed to load Alpine.js');
    document.body.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
            <h1 style="color: #dc3545;">⚠️ Loading Error</h1>
            <p>Alpine.js failed to load. Please refresh the page.</p>
            <button onclick="location.reload()" style="padding: 0.5rem 1rem; cursor: pointer;">
                Refresh
            </button>
        </div>
    `;
};
document.head.appendChild(script);
console.log('⏳ Injecting Alpine.js...');

// Boot-Check: Verify Alpine initialized within 5 seconds
setTimeout(() => {
    if (!window.Alpine || !window.Alpine.store('game')) {
        console.error('❌ Alpine.js store failed to initialize within timeout');
        // Only show error if page is still in broken state
        const navLinks = document.querySelectorAll('.nav-link');
        const hasContent = navLinks.length > 0 && navLinks[0].textContent.trim() !== '';
        if (!hasContent) {
            document.body.innerHTML = `
                <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
                    <h1 style="color: #dc3545;">⚠️ Initialization Error</h1>
                    <p>The application failed to start. Please try refreshing.</p>
                    <button onclick="location.reload()" style="padding: 0.5rem 1rem; cursor: pointer;">
                        Refresh
                    </button>
                </div>
            `;
        }
    } else {
        console.log('✅ Boot-Check passed: Alpine.js is running');
    }
}, 5000);

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

        // Remove skeleton loader with fade animation
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.classList.add('opacity-0');
            setTimeout(() => loader.remove(), 300);
        }
    } catch (error) {
        console.error('❌ Failed to load translations:', error);
        console.warn('⚠️ Using fallback translations');
        // Still remove loader on error
        const loader = document.getElementById('app-loader');
        if (loader) loader.remove();
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
