/**
 * @fileoverview i18n (Internationalization) Alpine.js store
 * Provides reactive language switching and translation helpers
 * 
 * Uses inline JSON data for maximum browser compatibility.
 * Translations are embedded at build time to avoid fetch/import issues.
 */

const LANG_STORAGE_KEY = 'trailkin_lang';

/**
 * Embedded translations - loaded synchronously for Alpine.js compatibility
 * These are kept in sync with de.json and en.json
 */
let translations = {};

/**
 * Load translations from JSON files via fetch
 * Called before Alpine.js initializes
 */
async function loadTranslations() {
    try {
        const [deResponse, enResponse] = await Promise.all([
            fetch('./js/i18n/de.json'),
            fetch('./js/i18n/en.json')
        ]);

        if (!deResponse.ok || !enResponse.ok) {
            throw new Error('Failed to load translation files');
        }

        translations.de = await deResponse.json();
        translations.en = await enResponse.json();

        return true;
    } catch (error) {
        console.error('i18n: Failed to load translations', error);
        // Fallback to empty translations - app will show [key] placeholders
        translations.de = {};
        translations.en = {};
        return false;
    }
}

/**
 * Initializes i18n Alpine.js store
 * @param {Object} Alpine - Alpine.js instance
 */
export async function initI18nStore(Alpine) {
    // Load translations before setting up store
    await loadTranslations();

    Alpine.store('i18n', {
        // Current active language
        current: 'de',

        // Available languages
        languages: ['de', 'en'],

        // Language metadata for UI
        get languageOptions() {
            return this.languages.map(lang => ({
                code: lang,
                name: translations[lang]?.meta?.name || lang,
                flag: translations[lang]?.meta?.flag || '🌐'
            }));
        },

        /**
         * Initialize i18n store
         * Detects user's preferred language from:
         * 1. localStorage (previous choice)
         * 2. Browser language
         * 3. Default to German
         */
        init() {
            // Check localStorage first
            const saved = localStorage.getItem(LANG_STORAGE_KEY);
            if (saved && this.languages.includes(saved)) {
                this.current = saved;
            } else {
                // Check browser language
                const browserLang = navigator.language?.split('-')[0];
                if (browserLang && this.languages.includes(browserLang)) {
                    this.current = browserLang;
                }
            }

            // Update HTML lang attribute
            document.documentElement.lang = this.current;
        },

        /**
         * Switch to a different language
         * @param {string} lang - Language code (e.g., 'en', 'de')
         */
        setLanguage(lang) {
            if (!this.languages.includes(lang)) {
                console.warn(`Language ${lang} not available`);
                return;
            }

            this.current = lang;
            localStorage.setItem(LANG_STORAGE_KEY, lang);
            document.documentElement.lang = lang;
        },

        /**
         * Get translation for a key path
         * @param {string} key - Dot-separated key path (e.g., 'nav.start')
         * @returns {string} Translated string or key if not found
         */
        t(key) {
            const keys = key.split('.');
            let value = translations[this.current];

            // Navigate the key path
            for (const k of keys) {
                if (value === undefined || value === null) break;
                value = value[k];
            }

            // Fallback to German if not found in current language
            if (value === undefined && this.current !== 'de') {
                value = translations['de'];
                for (const k of keys) {
                    if (value === undefined || value === null) break;
                    value = value[k];
                }
            }

            // Return key if still not found (helps debug missing translations)
            return value ?? `[${key}]`;
        }
    });

    /**
     * Alpine.js magic helper $t()
     * Usage in templates: x-text="$t('nav.start')"
     */
    Alpine.magic('t', () => {
        return (key) => Alpine.store('i18n').t(key);
    });
}
