/**
 * @fileoverview Domain Models & Data Factories
 * Defines the shape of core entities (Group, Character) and utility constants.
 * Note: Actual state management is handled by alpineStore.js.
 */

/**
 * @typedef {Object} Character
 * @property {number} id - Unique character identifier
 * @property {string} name - Character name
 * @property {string} class - Character class/role
 * @property {number} hp - Current hit points
 * @property {number} maxHp - Maximum hit points
 * @property {number} mana - Current mana/willpower
 * @property {string[]} [inventory] - Personal equipment slots (max 3)
 */

/**
 * @typedef {Object} QuestItem
 * @property {string} item - Real-world item name
 * @property {string} fantasy - Fantasy item name
 */

/**
 * @typedef {Object} Group
 * @property {number} id - Unique group identifier
 * @property {string} name - Group name
 * @property {Character[]} characters - Array of characters in this group
 * @property {string[]} inventory - Shared inventory items (max 12)
 * @property {QuestItem[]|null} currentQuest - Active quest items (3 items)
 */

/**
 * @typedef {Object} AppState
 * @property {Group[]} groups - All character groups
 * @property {number|null} activeGroupId - Currently selected group ID
 * @property {QuestItem[]|null} currentQuest - Legacy quest field (deprecated)
 */

/** @type {string} LocalStorage key for game data persistence */
const STORAGE_KEY = 'wald_rpg_save_v2';

/**
 * Creates a new group with default characters
 * @param {string} name - The name for the new group
 * @returns {Group} A new group object with default characters
 */
export function createDefaultGroup(name) {
    return {
        id: Date.now(),
        name: name,
        characters: [
            { id: 1, name: 'Entdecker 1', class: 'Abenteurer', hp: 3, maxHp: 3, mana: 0, inventory: [] },
            { id: 2, name: 'Bello', class: 'Spürnase', hp: 3, maxHp: 3, mana: 5, inventory: [] }
        ],
        inventory: [],
        currentQuest: null
    };
}

/** @type {AppState} Global application state */
export const appState = {
    groups: [],
    activeGroupId: null
};

/**
 * Gets the currently active group
 * @returns {Group|undefined} The active group object, or undefined if not found
 */
export function getCurrentGroup() {
    return appState.groups.find(g => g.id === appState.activeGroupId);
}

/**
 * Persists current game state to localStorage
 * @returns {void}
 */
export function saveGame() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

/**
 * Loads game state from localStorage
 * Initializes default state if no saved data exists
 * @returns {void}
 */
export function loadGame() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        Object.assign(appState, JSON.parse(saved));
    } else {
        // Init default group if empty
        const defaultGroup = createDefaultGroup('Abenteuergruppe 1');
        appState.groups = [defaultGroup];
        appState.activeGroupId = defaultGroup.id;
        saveGame();
    }
}
