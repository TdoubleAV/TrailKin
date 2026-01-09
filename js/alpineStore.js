/**
 * @fileoverview Alpine.js store for game state management
 * Provides reactive data binding for the entire application
 */

import { createDefaultGroup, appState, saveGame, getCurrentGroup } from './state.js';
import { inspirationData, characterBackgrounds } from './data/inspirations.js';
import { statusesData } from './data/statuses.js';

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
        currentTab: 'schnellstart', // Controls which section is visible (routing)

        // --- Generator State ---
        quest: {
            inspiration: null, // Holds the result of the "Ideen-Generator" { item: '', fantasy: '' }
            lastEnv: null
        },

        // --- Bingo State ---
        bingo: {
            grid: [],
            env: 'wald',
            size: 3 // 3x3 or 4x4
        },

        // --- SSP Helper State ---
        ssp: {
            result: null, // 'win', 'draw', 'lose'
            playerChoice: null,
            gmChoice: null
        },

        // --- Available Statuses (from data) ---
        availableStatuses: statusesData.statuses || [],

        // --- Global Components ---
        modal: {
            open: false,
            type: 'input',
            title: '',
            value: '',
            options: [],
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
        // --- Modal System ---
        showModal(title, defaultValue, callback) {
            this.modal.type = 'input';
            this.modal.title = title;
            this.modal.value = defaultValue || '';
            this.modal.callback = callback;
            this.modal.open = true;
            setTimeout(() => {
                const input = document.querySelector('[x-ref="modalInput"]');
                if (input) input.focus();
            }, 50);
        },

        showSelectionModal(title, options, callback) {
            this.modal.type = 'selection';
            this.modal.title = title;
            this.modal.options = options;
            this.modal.callback = callback;
            this.modal.open = true;
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
        openInspirationModal() {
            const envOptions = [
                { label: this.t('inspiration.forest'), value: 'wald', emoji: '🌳' },
                { label: this.t('inspiration.neighborhood'), value: 'quartier', emoji: '🏡' },
                { label: this.t('inspiration.city'), value: 'stadt', emoji: '🏙️' },
                { label: this.t('inspiration.oldtown'), value: 'altstadt', emoji: '🏰' }
            ];

            this.showSelectionModal(this.t('modals.selectEnv'), envOptions, (env) => {
                if (env) this.generateInspiration(env);
            });
        },

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

            this.currentGroup.quest = {
                env: env,
                items: items,
                active: true,
                date: new Date().toLocaleDateString()
            };
            this.saveGame();

            // Switch to group view
            window.location.hash = '#gruppe';
            this.currentTab = 'gruppe';
        },

        // --- Bingo Logic ---
        generateBingo(env, size) {
            const data = inspirationData[env] || [];
            if (data.length < size * size) return; // Should not happen with our large lists

            this.bingo.env = env;
            this.bingo.size = parseInt(size);

            const shuffled = shuffleArray([...data]);
            this.bingo.grid = shuffled.slice(0, size * size).map(item => ({
                item: item.item,
                fantasy: item.fantasy,
                found: false
            }));
        },

        toggleBingoCheck(index) {
            if (this.bingo.grid[index]) {
                this.bingo.grid[index].found = !this.bingo.grid[index].found;
            }
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
                name: 'Neuer Entdecker',
                class: 'Abenteurer',
                hp: 10,
                maxHp: 10,
                mana: 0,
                inventory: [],
                statuses: []
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
                name: 'Neuer Entdecker',
                class: randomBg.name,
                hp: 3,
                maxHp: 3,
                mana: 0,
                inventory: [randomBg.item + ' (' + randomBg.name + ')'],
                statuses: []
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
            this.saveGame();
        },

        // --- Status Management ---
        addStatus(charId, statusId) {
            if (!this.currentGroup) return;
            const char = this.currentGroup.characters.find(c => c.id === charId);
            if (!char) return;
            if (!char.statuses) char.statuses = [];

            const statusDef = this.availableStatuses.find(s => s.id === statusId);
            if (!statusDef) return;

            // Don't add duplicate statuses
            if (char.statuses.some(s => s.id === statusId)) return;

            char.statuses.push({
                id: statusDef.id,
                name: statusDef.name,
                emoji: statusDef.emoji,
                effect: statusDef.effect,
                cure: statusDef.cure,
                type: statusDef.type
            });
            this.saveGame();
        },

        removeStatus(charId, statusId) {
            if (!this.currentGroup) return;
            const char = this.currentGroup.characters.find(c => c.id === charId);
            if (!char || !char.statuses) return;

            char.statuses = char.statuses.filter(s => s.id !== statusId);
            this.saveGame();
        },

        showAddStatusModal(charId) {
            const char = this.currentGroup?.characters.find(c => c.id === charId);
            if (!char) return;

            // Get available statuses not already on character
            const existing = (char.statuses || []).map(s => s.id);
            const available = this.availableStatuses.filter(s => !existing.includes(s.id));

            if (available.length === 0) {
                alert('Alle Zustände sind bereits aktiv!');
                return;
            }

            // Use custom selection modal
            const statusOptions = available.map(s => ({
                label: s.name,
                value: s.id,
                emoji: s.emoji
            }));

            this.showSelectionModal('Zustand wählen', statusOptions, (selectedId) => {
                if (selectedId) {
                    this.addStatus(charId, selectedId);
                }
            });
        },

        // --- SSP Helper ---
        playSSP(playerChoice) {
            const choices = ['rock', 'paper', 'scissors'];
            const gmChoice = choices[Math.floor(Math.random() * choices.length)];

            this.ssp.playerChoice = playerChoice;
            this.ssp.gmChoice = gmChoice;

            // Determine result
            if (playerChoice === gmChoice) {
                this.ssp.result = 'draw';
            } else if (
                (playerChoice === 'rock' && gmChoice === 'scissors') ||
                (playerChoice === 'paper' && gmChoice === 'rock') ||
                (playerChoice === 'scissors' && gmChoice === 'paper')
            ) {
                this.ssp.result = 'win';
            } else {
                this.ssp.result = 'lose';
            }
        },

        resetSSP() {
            this.ssp.result = null;
            this.ssp.playerChoice = null;
            this.ssp.gmChoice = null;
        },

        getSSPEmoji(choice) {
            const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
            return emojis[choice] || '';
        }
    });
}
