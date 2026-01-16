/**
 * @fileoverview Shared language configuration for Trailkin
 * Single source of truth for all language metadata
 */

export const LANGUAGES = [
    {
        code: 'de',
        name: 'Deutsch',
        flag: '🇩🇪'
    },
    {
        code: 'en',
        name: 'English',
        flag: '🇬🇧'
    },
    /*,
        {
            code: 'es',
            name: 'Español',
            flag: '🇪🇸'
        }
    */
];

/**
 * Get language by code
 * @param {string} code - Language code (de, en, es)
 * @returns {Object|undefined} Language object or undefined
 */
export function getLanguage(code) {
    return LANGUAGES.find(lang => lang.code === code);
}

/**
 * Get all language codes
 * @returns {string[]} Array of language codes
 */
export function getLanguageCodes() {
    return LANGUAGES.map(lang => lang.code);
}
