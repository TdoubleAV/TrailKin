/**
 * @fileoverview i18n (Internationalization) Alpine.js store
 * Provides reactive language switching and translation helpers
 */

const LANG_STORAGE_KEY = 'trailkin_lang';

/**
 * Initializes i18n Alpine.js store with pre-fetched data
 * @param {Object} Alpine - Alpine.js instance
 * @param {Object} translationData - The loaded translation files { de: {...}, en: {...} }
 */
export function initI18nStore(Alpine, translationData) {
    if (!translationData || !translationData.de) {
        console.warn('i18n: No translation data provided!');
        translationData = {
            de: { meta: { name: 'Deutsch', flag: '🇩🇪' } },
            en: { meta: { name: 'English', flag: '🇬🇧' } }
        };
    }

    // Store translations globally for easier debugging access
    window.TRAILKIN_TRANSLATIONS = translationData;

    Alpine.store('i18n', {
        // Current active language
        current: 'de',

        // Available languages
        languages: ['de', 'en'],

        // Language metadata for UI
        get languageOptions() {
            return this.languages.map(lang => ({
                code: lang,
                name: translationData[lang]?.meta?.name || lang,
                flag: translationData[lang]?.meta?.flag || '🌐'
            }));
        },

        /**
         * Initialize i18n store
         */
        init() {
            const saved = localStorage.getItem(LANG_STORAGE_KEY);
            if (saved && this.languages.includes(saved)) {
                this.current = saved;
            } else {
                const browserLang = navigator.language?.split('-')[0];
                if (browserLang && this.languages.includes(browserLang)) {
                    this.current = browserLang;
                }
            }
            document.documentElement.lang = this.current;
        },

        /**
         * Switch to a different language with smooth fade transition
         */
        setLanguage(lang) {
            if (!this.languages.includes(lang)) {
                console.warn(`Language ${lang} not available`);
                return;
            }

            // Smooth fade transition
            const main = document.querySelector('main');
            if (main) {
                main.style.transition = 'opacity 0.15s ease-out';
                main.style.opacity = '0';

                setTimeout(() => {
                    this.current = lang;
                    localStorage.setItem(LANG_STORAGE_KEY, lang);
                    document.documentElement.lang = lang;

                    // Fade back in
                    main.style.opacity = '1';
                }, 150);
            } else {
                // Fallback without animation
                this.current = lang;
                localStorage.setItem(LANG_STORAGE_KEY, lang);
                document.documentElement.lang = lang;
            }
        },

        /**
         * Get translation for a key path
         */
        t(key) {
            const keys = key.split('.');
            let value = translationData[this.current];

            for (const k of keys) {
                if (value === undefined || value === null) break;
                value = value[k];
            }

            // Fallback to German
            if (value === undefined && this.current !== 'de') {
                value = translationData['de'];
                for (const k of keys) {
                    if (value === undefined || value === null) break;
                    value = value[k];
                }
            }

            return value ?? `[${key}]`;
        },

        /**
         * Reactively update translations after async load
         * @param {Object} newData - New translation data { de: {...}, en: {...} }
         */
        updateTranslations(newData) {
            if (!newData || !newData.de || !newData.en) {
                console.warn('i18n: Invalid translation data for update');
                return;
            }

            // Update global reference
            translationData = newData;
            window.TRAILKIN_TRANSLATIONS = newData;

            // Trigger reactivity by toggling language
            const current = this.current;
            this.current = current === 'de' ? 'en' : 'de';
            setTimeout(() => {
                this.current = current;
            }, 0);

            console.log('✅ i18n: Translations updated');
        }
    });

    /**
     * Alpine.js magic helper $t()
     */
    Alpine.magic('t', () => {
        return (key) => Alpine.store('i18n').t(key);
    });
}
