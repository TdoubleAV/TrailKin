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
 * @property {string[]} inventory - Shared inventory items (Schatzkammer, max 3)
 * @property {QuestItem[]|null} currentQuest - Active quest items
 */

/**
 * @typedef {Object} AppState
 * @property {Group[]} groups - All character groups
 * @property {number|null} activeGroupId - Currently selected group ID
 * @property {QuestItem[]|null} currentQuest - Legacy quest field (deprecated)
 */

/** @type {string} LocalStorage key for game data persistence */
const STORAGE_KEY = 'wald_rpg_save_v2';

/** @type {number} Counter for unique character IDs */
let charIdCounter = 1;

/**
 * Creates a new character object
 * @param {string} name - Character name
 * @param {string} charClass - Character class/role
 * @returns {Character} A new character object
 */
function createCharacter(name, charClass) {
    return {
        id: charIdCounter++,
        name: name,
        class: charClass,
        hp: 3,
        maxHp: 3,
        inventory: []
    };
}

/**
 * Creates a new group with default characters
 * @param {string} name - The name for the new group
 * @param {string} companionType - 'dog', 'cat', or 'none'
 * @returns {Group} A new group object with default characters
 */
export function createDefaultGroup(name, companionType = 'dog') {
    const chars = [
        createCharacter('Entdecker 1', 'explorer'),
        createCharacter('Entdecker 2', 'scout')
    ];

    if (companionType === 'dog') {
        chars.push(createCharacter('Bello', 'dog'));
    } else if (companionType === 'cat') {
        chars.push(createCharacter('Mauzi', 'cat'));
    }

    return {
        id: Date.now(),
        name: name,
        characters: chars,
        inventory: [],
        currentQuest: null,
        combat: { active: false, playerWins: 0, gmWins: 0, round: 1 },
        clocks: [],
        journal: [] // Adventure journal for consequences, sparks, notes
    };
}

/** @type {AppState} Global application state */
export const appState = {
    groups: [],
    activeGroupId: null,
    modules: null // Persisted module configuration
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
