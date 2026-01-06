```
/**
 * @fileoverview Alpine.js store for game state management
 * Provides reactive data binding for the entire application
 */

import { createDefaultGroup, appState, saveGame, getCurrentGroup } from './state.js';
import { runRouter } from './router.js';
import { inspirationData, characterBackgrounds } from './data/inspiration.js';

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} The shuffled array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const STORAGE_KEY = 'wald_rpg_save_v2';

/**
 * Initializes Alpine.js store with game state and methods
 * @param {Object} Alpine - Alpine.js instance
 */
export function initAlpineStore(Alpine) {
    Alpine.store('game', {
        // ========================================================================
        // STATE MANAGEMENT
        // ========================================================================
        
        // --- Core Data ---
        groups: [], // List of all adventure groups
        activeGroupId: null, // ID of the currently selected group
        
        // --- UI State ---
        theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
        currentTab: 'regeln', // Controls which section is visible (routing)

        // --- Generator State ---
        quest: {
            inspiration: null, // Holds the result of the "Ideen-Generator" { item: '', fantasy: '' }
            lastEnv: null
        },

        // --- Global Components ---
        modal: {
            open: false,
            title: '',
            value: '',
            callback: null
        },

        // ========================================================================
        // COMPUTED PROPERTIES
        // ========================================================================

        // Helper to get the active group object safely
        get currentGroup() {
            return this.groups.find(g => g.id === this.activeGroupId) || this.groups[0];
        },

        // ========================================================================
        // ACTIONS
        // ========================================================================

        // --- Routing & Theme Management ---
        setTab(tab) {
            this.currentTab = tab;
            window.location.hash = '#' + tab;
            window.scrollTo(0, 0); // Reset scroll on tab change
        },

        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', this.theme);
            if (this.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        init() {
            // Apply initial theme
            if (this.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            // Init Routing
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.currentTab = hash;
            }
        },

        // --- Persistence (LocalStorage) ---
        saveGame() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                groups: this.groups,
                activeGroupId: this.activeGroupId
            }));
        },

        loadGame() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                this.groups = data.groups || [];
                this.activeGroupId = data.activeGroupId;

                // Ensure at least one group
                if (this.groups.length === 0) {
                    this.groups = [createDefaultGroup('Abenteuergruppe 1')];
                    this.activeGroupId = this.groups[0].id;
                }
            } else {
                // Initialize with default group
                this.groups = [createDefaultGroup('Abenteuergruppe 1')];
                this.activeGroupId = this.groups[0].id;
                this.saveGame();
            }
        },

        // --- Modal System (Single Source of Truth) ---
        showModal(title, defaultValue, callback) {
            this.modal.title = title;
            this.modal.value = defaultValue || '';
            this.modal.callback = callback;
            this.modal.open = true;
            // Focus input next tick
            setTimeout(() => {
                const input = document.querySelector('[x-ref="modalInput"]');
                if (input) input.focus();
            }, 50);
        },

        closeModal() {
            this.modal.open = false;
            this.modal.callback = null;
        },

        confirmModal() {
            if (this.modal.value.trim() && this.modal.callback) {
                this.modal.callback(this.modal.value.trim());
            }
            this.closeModal();
        },

        // --- Generator Logic ---
        generateInspiration(env) {
            const data = inspirationData[env] || [];
            if (data.length === 0) return;
            const item = data[Math.floor(Math.random() * data.length)];
            this.quest.inspiration = item;
            this.quest.lastEnv = env;
        },

        generateQuest(env) {
            if (!this.currentGroup) return;

            const data = inspirationData[env] || [];
            if (data.length < 3) return;

            const shuffled = shuffleArray([...data]);
            const items = shuffled.slice(0, 3).map(item => ({
                item: item.item,
                fantasy: item.fantasy
            }));

            this.currentGroup.currentQuest = items;
            this.saveGame();
            
            // Switch to group view
            window.location.hash = '#gruppe';
            runRouter();
        },

        // --- Group Management (Create, Rename, Delete) ---
        createGroup() {
            this.showModal('Name der neuen Gruppe', 'Neue Gruppe', (name) => {
                const newGroup = createDefaultGroup(name);
                this.groups.push(newGroup);
                this.activeGroupId = newGroup.id;
                this.saveGame();
            });
        },

        renameGroup() {
            if (!this.currentGroup) return;
            this.showModal('Neuer Name für die Gruppe', this.currentGroup.name, (newName) => {
                this.currentGroup.name = newName;
                this.saveGame();
            });
        },

        deleteGroup() {
            if (this.groups.length <= 1) {
                alert('Du kannst die letzte Gruppe nicht löschen!');
                return;
            }
            this.groups = this.groups.filter(g => g.id !== this.activeGroupId);
            this.activeGroupId = this.groups[0].id;
            this.saveGame();
        },

        // --- Character Management ---
        addCharacter() {
            if (!this.currentGroup) return;
            this.currentGroup.characters.push({
                id: Date.now(),
                name: 'Neuer Held',
                class: 'Abenteurer',
                hp: 10,
                maxHp: 10,
                mana: 0,
                inventory: []
            });
            this.saveGame();
        },

        generateRandomChar() {
            if (!this.currentGroup) return;
            const backgrounds = characterBackgrounds || [];
            if (backgrounds.length === 0) {
                this.addCharacter();
                return;
            }

            const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
            this.currentGroup.characters.push({
                id: Date.now(),
                name: 'Neuer Held',
                class: randomBg.name,
                hp: 3,
                maxHp: 3,
                mana: 0,
                inventory: [randomBg.item + ' (' + randomBg.name + ')']
            });
            this.saveGame();
        },

        removeChar(charId) {
            if (!this.currentGroup) return;
            this.currentGroup.characters = this.currentGroup.characters.filter(c => c.id !== charId);
            this.saveGame();
        },

        modStat(charId, stat, amount) {
            if (!this.currentGroup) return;
            const char = this.currentGroup.characters.find(c => c.id === charId);
            if (char) {
                char[stat] = Math.max(0, char[stat] + amount);
                this.saveGame();
            }
        },

        removeCharItem(charId, slotIndex) {
            if (!this.currentGroup) return;
            const char = this.currentGroup.characters.find(c => c.id === charId);
            if (char && char.inventory) {
                char.inventory.splice(slotIndex, 1);
                // Also remove trailing undefined if any (clean up array holes)
                char.inventory = char.inventory.filter(i => i);
                this.saveGame();
            }
        },

        addCharItem(charId) {
            if (!this.currentGroup) return;
            const char = this.currentGroup.characters.find(c => c.id === charId);
            if (char) {
                if (!char.inventory) char.inventory = [];
                if (char.inventory.length >= 3) return;

                this.showModal('Neues Item für ' + char.name, '', (newItem) => {
                    char.inventory.push(newItem);
                    this.saveGame();
                });
            }
        },

        // --- Inventory Management (Shared & Personal) ---
        addGroupItem() {
            if (!this.currentGroup) return;
            if (this.currentGroup.inventory.length >= 12) return;

            this.showModal('Neuer Gegenstand', '', (itemName) => {
                this.currentGroup.inventory.push(itemName);
                this.saveGame();
            });
        },

        removeItem(index) {
            if (!this.currentGroup) return;
            this.currentGroup.inventory.splice(index, 1);
            // Don't filter here as we want to maintain slot positions? 
            // Original logic just spliced, so slots shift. My UI loop is generic.
            // If I splice, indices shift. 
            // My UI renders inventory[i]. If it shifts, it's fine.
            this.saveGame();
        }
    });
}
```
