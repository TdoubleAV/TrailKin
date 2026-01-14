/**
 * @fileoverview Alpine.js store for game state management
 * Provides reactive data binding for the entire application
 */

import { createDefaultGroup, appState, saveGame, getCurrentGroup } from './state.js';
import { inspirationData, characterBackgrounds } from './data/inspirations.js';
import { statusesData } from './data/statuses.js';
import { getRandomEducationalTask, narrativeThemes } from './data/educationalPool.js';
import { sparkTables } from './data/sparkTables.js';
import { QuestBuilder } from './logic/QuestBuilder.js';

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
        currentTab: 'spiel', // Default is now Play/Adventure
        prepareTab: 'quest', // Initial sub-tab for Generator
        helpTab: 'quickstart', // Initial sub-tab for Regelwerk
        eduTheme: 'random', // Selected narrative theme for educational quests

        // --- Module System State ---
        // Note: Fail Forward (was C) is now a game principle, always active
        modules: {
            A: true, // Challenges (Core)
            B: true, // Tension (Core)
            C: false, // Fail Forward (deprecated as module, now core)
            D: false, // Combat (NEW)
            dog: false // Modul Fellnase (Optional)
        },

        // --- Generator State ---
        quest: {
            inspirations: [], // Array of inspiration objects { id, item, fantasy }
            lastEnv: 'wald',
            builder: {
                scenario: 'exploration',
                complexity: 'medium',
                env: 'wald',
                educational: false,      // Educational mode toggle
                learningGoal: 'nature'   // Selected learning category
            }
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

        // --- Essenz-Raster State ---
        essenzNumbers: [], // Selected numbers for duel (max 2)

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

        // --- Translation Helper (delegates to i18n store) ---
        t(key) {
            return Alpine.store('i18n')?.t(key) ?? `[${key}]`;
        },

        // --- Analytics Consent Management ---
        resetAnalyticsConsent() {
            localStorage.removeItem('umami_consent');
            location.reload(); // Re-show modal
        },

        // --- Routing & Theme Management ---
        setTab(tab) {
            this.currentTab = tab;
            window.location.hash = '#' + tab;
            window.scrollTo(0, 0); // Reset scroll on tab change

            // Reset sub-tabs if needed
            if (tab === 'prepare' && !this.prepareTab) this.prepareTab = 'quest';
            if (tab === 'help' && !this.helpTab) this.helpTab = 'quickstart';
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
                // Map old hashes to new ones if necessary, or just use as is
                const map = {
                    'gruppe': 'spiel',
                    'schnellstart': 'hilfe',
                    'regeln': 'hilfe',
                    'inspiration': 'vorbereiten',
                    'quest': 'vorbereiten',
                    'bingo': 'vorbereiten'
                };
                this.currentTab = map[hash] || hash;

                // Set specific sub-tabs based on old hashes
                if (hash === 'regeln') this.helpTab = 'rules';
                if (hash === 'inspiration') this.prepareTab = 'inspiration';
                if (hash === 'bingo') this.prepareTab = 'bingo';
            }

            // Add FAB Scroll Listener
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const fabContainer = document.querySelector('.fab-container');
                if (!fabContainer) return;

                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > 50) {
                    // Scrolling down
                    fabContainer.classList.add('scrolling-down');
                } else {
                    // Scrolling up
                    fabContainer.classList.remove('scrolling-down');
                }
                lastScrollTop = scrollTop;
            }, { passive: true });
        },

        // --- Persistence (LocalStorage) ---
        saveGame() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                groups: this.groups,
                activeGroupId: this.activeGroupId,
                modules: this.modules // Save module settings
            }));
        },

        loadGame() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                this.groups = data.groups || [];
                this.activeGroupId = data.activeGroupId;

                // Load modules if present, otherwise keep defaults
                if (data.modules) {
                    this.modules = { ...this.modules, ...data.modules };
                }

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
                { label: this.t('inspiration.oldtown'), value: 'altstadt', emoji: '🏰' },
                { label: this.t('inspiration.beach'), value: 'strand', emoji: '🏖️' },
                { label: this.t('inspiration.mountains'), value: 'gebirge', emoji: '⛰️' },
                { label: this.t('inspiration.winter'), value: 'winter', emoji: '❄️' }
            ];

            this.showSelectionModal(this.t('selectEnv'), envOptions, (env) => {
                if (env) {
                    this.quest.lastEnv = env;
                    this.addInspiration(env);
                }
            });
        },

        // Add a new inspiration to the list
        addInspiration(env) {
            const data = inspirationData[env || this.quest.lastEnv] || [];
            if (data.length === 0) return;

            const item = data[Math.floor(Math.random() * data.length)];
            this.quest.inspirations.push({
                id: Date.now() + Math.random(),
                itemKey: item.itemKey,
                fantasyKey: item.fantasyKey
            });
        },

        // Remove a specific inspiration by id
        removeInspiration(id) {
            this.quest.inspirations = this.quest.inspirations.filter(i => i.id !== id);
        },

        // Re-roll a specific inspiration (replace with new random one)
        rerollInspiration(id) {
            const data = inspirationData[this.quest.lastEnv] || [];
            if (data.length === 0) return;

            const index = this.quest.inspirations.findIndex(i => i.id === id);
            if (index === -1) return;

            const newItem = data[Math.floor(Math.random() * data.length)];
            this.quest.inspirations[index] = {
                id: Date.now() + Math.random(),
                itemKey: newItem.itemKey,
                fantasyKey: newItem.fantasyKey
            };
        },

        // Clear all inspirations
        clearInspirations() {
            this.quest.inspirations = [];
        },

        // Legacy single-item support (for backwards compatibility)
        generateInspiration(env) {
            this.quest.lastEnv = env;
            this.addInspiration(env);
        },

        generateQuest(env) {
            // Forward to V2 with defaults for simplicity if called from legacy
            this.generateQuestV2('exploration', env || this.quest.lastEnv, 'medium');
        },

        // --- Schema Validation ---
        validateQuest(quest) {
            const required = ['id', 'title', 'hook', 'scenario_type', 'env', 'nodes'];
            const missing = required.filter(field => !quest[field]);

            if (missing.length > 0) {
                console.error('❌ Quest Validation Failed: Missing fields', missing);
                return false;
            }

            if (!Array.isArray(quest.nodes) || quest.nodes.length === 0) {
                console.error('❌ Quest Validation Failed: Nodes must be non-empty array');
                return false;
            }

            // Validate nodes have required fields
            const invalidNodes = quest.nodes.filter(n => !n.type || !n.description);
            if (invalidNodes.length > 0) {
                console.error('❌ Quest Validation Failed: Invalid nodes', invalidNodes);
                return false;
            }

            console.log('✅ Quest Schema Validated');
            return true;
        },

        generateQuestV2(scenarioType, env, complexity) {
            if (!this.currentGroup) return;

            const lang = Alpine.store('i18n')?.current || 'de';
            const dogActive = this.modules?.dog || false;
            const builder = new QuestBuilder(this.t.bind(this), lang, dogActive);

            const quest = builder.buildStandardQuest(scenarioType, env, complexity);

            this.currentGroup.quest = quest;
            this.validateQuest(this.currentGroup.quest);
            this.saveGame();
            this.setTab('gruppe');
        },

        /**
         * Generates a random Spark (Sensory or Oracle) for GM inspiration
         * Triggered by the Spark button in the active quest UI
         */
        generateSpark() {
            // 50% chance of Sensory, 50% chance of Oracle
            const isSensory = Math.random() < 0.5;
            let title = '';
            let text = '';
            let icon = '✨';

            const activeLang = Alpine.store('i18n')?.current || 'de';

            if (isSensory) {
                // Sensory Table (D10)
                const roll = Math.floor(Math.random() * sparkTables.sensory.length);
                const spark = sparkTables.sensory[roll];
                title = this.t('quest.v2.spark.sensoryTitle');
                text = activeLang === 'de' ? spark.text : spark.text_en;
                icon = spark.icon;
            } else {
                // Oracle Table (Action + Theme)
                const actionList = sparkTables.oracle.actions[activeLang] || sparkTables.oracle.actions.de;
                const themeList = sparkTables.oracle.themes[activeLang] || sparkTables.oracle.themes.de;

                const action = actionList[Math.floor(Math.random() * actionList.length)];
                const theme = themeList[Math.floor(Math.random() * themeList.length)];

                title = this.t('quest.v2.spark.oracleTitle');
                text = `${action} + ${theme}`;
                icon = '🔮';
            }

            // Reuse the Modal for output
            this.showModal(
                `${icon} ${title}`,
                text,
                () => { },
                false
            );
        },

        /**
         * Generates an educational quest based on LP21 learning goals
         * Uses the educationalPool data to create hidden-education quests
         */
        generateEducationalQuest(env, learningGoal) {
            if (!this.currentGroup) return;

            const lang = Alpine.store('i18n')?.current || 'de';
            const builder = new QuestBuilder(this.t.bind(this), lang);

            const quest = builder.buildEducationalQuest(env, this.eduTheme);

            if (!quest) {
                console.warn('No educational task found for', env);
                return;
            }

            this.currentGroup.quest = quest;
            console.log('🎓 Educational Quest generated:', this.currentGroup.quest);

            this.validateQuest(this.currentGroup.quest);
            this.saveGame();
            this.setTab('gruppe');
        },

        toggleNode(nodeId) {
            if (!this.currentGroup?.quest?.nodes) return;
            const node = this.currentGroup.quest.nodes.find(n => n.id === nodeId);
            if (node) {
                node.completed = !node.completed;
                this.saveGame();
            }
        },

        rerollNode(nodeId) {
            if (!this.currentGroup?.quest?.nodes) return;
            const nodeIndex = this.currentGroup.quest.nodes.findIndex(n => n.id === nodeId);
            if (nodeIndex === -1) return;

            const env = this.currentGroup.quest.env || 'wald';
            const envData = inspirationData[env] || inspirationData['wald'];
            const newItem = envData[Math.floor(Math.random() * envData.length)];

            this.currentGroup.quest.nodes[nodeIndex].target_item_key = newItem.itemKey;
            this.currentGroup.quest.nodes[nodeIndex].description = this.t(`quest.v2.nodeTypes.${this.currentGroup.quest.nodes[nodeIndex].type}`).replace('{0}', this.t(newItem.itemKey));

            this.saveGame();
        },

        removeNode(nodeId) {
            if (!this.currentGroup?.quest?.nodes) return;
            this.currentGroup.quest.nodes = this.currentGroup.quest.nodes.filter(n => n.id !== nodeId);

            // If all nodes are gone, end quest
            if (this.currentGroup.quest.nodes.length === 0) {
                this.currentGroup.quest.active = false;
            }

            this.saveGame();
        },

        addComplication() {
            if (!this.currentGroup?.quest) return;

            const env = this.currentGroup.quest.env || 'wald';
            const compPool = this.t('quest.v2.complications');
            const envPool = compPool[env] || compPool['wald'] || [];

            if (envPool.length > 0) {
                const newComplication = envPool[Math.floor(Math.random() * envPool.length)];
                this.currentGroup.quest.complication = newComplication;
                this.saveGame();
            }
        },

        generateFailForward() {
            const actions = this.t('consequences.actions');
            const flavors = this.t('consequences.flavors');

            if (!actions || !flavors) return;

            const action = actions[Math.floor(Math.random() * actions.length)];
            const flavor = flavors[Math.floor(Math.random() * flavors.length)];

            // Show result in a custom modal or alert for now
            // using the detailed description
            const title = `⚡ ${this.t('consequences.title')} ⚡`;
            const content = `${action.name}: ${action.desc}\n\n(${flavor.name}: ${flavor.desc})`;

            // Re-using the input modal as a simple info modal for now by providing a dummy callback
            this.showModal(title, content, () => { });

            // Hack to make the input readonly and look like a message
            setTimeout(() => {
                const input = document.querySelector('[x-ref="modalInput"]');
                if (input) {
                    input.value = content;
                    input.readOnly = true;
                }
            }, 50);
        },

        // --- Combat System (Modul D) ---
        startCombat() {
            if (!this.currentGroup) return;
            // Initialize combat state if missing
            if (!this.currentGroup.combat) {
                this.currentGroup.combat = { active: false, playerWins: 0, gmWins: 0, round: 1 };
            }
            this.currentGroup.combat.active = true;
            this.currentGroup.combat.playerWins = 0;
            this.currentGroup.combat.gmWins = 0;
            this.currentGroup.combat.round = 1;

            // Open Essenz-Raster automatically
            this.randomEssenzNumbers();
            this.currentTab = 'regeln'; // Switch to rules to see essence grid

            this.saveGame();
        },

        winCombatRound() {
            if (!this.currentGroup || !this.currentGroup.combat) return;
            this.currentGroup.combat.playerWins++;
            this.currentGroup.combat.round++;

            // Check Win Condition (Best of 3)
            if (this.currentGroup.combat.playerWins >= 2) {
                this.endCombat(true);
            } else {
                this.saveGame();
            }
        },

        loseCombatRound() {
            if (!this.currentGroup || !this.currentGroup.combat) return;
            this.currentGroup.combat.gmWins++;
            this.currentGroup.combat.round++;

            // Check Loss Condition
            if (this.currentGroup.combat.gmWins >= 2) {
                this.endCombat(false);
            } else {
                this.saveGame();
            }
        },

        endCombat(victory) {
            if (!this.currentGroup || !this.currentGroup.combat) return;

            if (victory) {
                this.showModal('Gewonnen! 🎉', 'Ihr habt das Monster vertrieben!', () => { }, true);
            } else {
                this.generateFailForward();
            }

            this.currentGroup.combat.active = false;
            this.currentTab = 'gruppe'; // Go back to group
            this.saveGame();
        },

        cancelCombat() {
            if (this.currentGroup && this.currentGroup.combat) {
                this.currentGroup.combat.active = false;
                this.saveGame();
            }
        },



        // --- Tension Clocks (Modul B) ---
        addClock(label = 'Spannung', max = 4) {
            if (!this.currentGroup) return;
            if (!this.currentGroup.clocks) this.currentGroup.clocks = [];

            this.currentGroup.clocks.push({
                id: Date.now(),
                label: label,
                current: 0,
                max: max
            });
            this.saveGame();
        },

        advanceClock(clockId) {
            if (!this.currentGroup || !this.currentGroup.clocks) return;
            const clock = this.currentGroup.clocks.find(c => c.id === clockId);
            if (clock) {
                clock.current++;
                if (clock.current >= clock.max) {
                    // Trigger consequence? For now just visual completion.
                    this.showModal('⏰ Uhr voll!', `Die Uhr "${clock.label}" ist abgelaufen!`, () => { }, true);
                }
                this.saveGame();
            }
        },

        removeClock(clockId) {
            if (!this.currentGroup || !this.currentGroup.clocks) return;
            this.currentGroup.clocks = this.currentGroup.clocks.filter(c => c.id !== clockId);
            this.saveGame();
        },

        // --- Mumm Regeneration (Core/Heart) ---
        openRegenMenu(charId) {
            const char = this.currentGroup.characters.find(c => c.id === charId);
            if (!char) return;

            const actions = this.t('regeneration.actions');
            if (!actions || actions.length === 0) return;

            // Use modal to show actions list? 
            // Better: use a dedicated "Regen Modal" or genericize `showModal` to support list selection.
            // Let's use a simple list modal approach.

            // Hacky List Modal:
            this.modal.title = `⚡ Mumm auffüllen für ${char.name}`;
            this.modal.type = 'list'; // New modal type
            this.modal.options = actions.map(act => ({
                label: `${act.action} (+${act.amount})`,
                value: act.action,
                callback: () => {
                    this.regenerateMumm(charId, act.amount);
                    this.modal.open = false;
                }
            }));
            this.modal.open = true;
        },

        regenerateMumm(charId, amount) {
            this.modStat(charId, 'hp', amount); // Mumm is HP in code
            // Visual feedback?
            this.saveGame();
        },

        // --- Bingo Logic ---
        generateBingo(env, size) {
            const data = inspirationData[env] || [];
            if (data.length < size * size) return; // Should not happen with our large lists

            this.bingo.env = env;
            this.bingo.size = parseInt(size);

            const shuffled = shuffleArray([...data]);
            this.bingo.grid = shuffled.slice(0, size * size).map(item => ({
                itemKey: item.itemKey,
                fantasyKey: item.fantasyKey,
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
            this.showModal(this.t('modals.newGroupTitle'), this.t('modals.newGroupDefault'), (name) => {
                // Step 2: Ask for Companion
                const companionOptions = [
                    { label: '🐕 Hund (Bello)', value: 'dog', emoji: '🐕' },
                    { label: '🐈 Katze (Mauzi)', value: 'cat', emoji: '🐈' },
                    { label: '❌ Kein Begleiter', value: 'none', emoji: '❌' }
                ];

                this.showSelectionModal(this.t('group.selectCompanion') || 'Begleiter wählen', companionOptions, (companionType) => {
                    const newGroup = createDefaultGroup(name, companionType);
                    this.groups.push(newGroup);
                    this.activeGroupId = newGroup.id;
                    this.saveGame();
                });
            });
        },

        renameGroup() {
            if (!this.currentGroup) return;
            this.showModal(this.t('modals.renameGroupTitle'), this.currentGroup.name, (newName) => {
                this.currentGroup.name = newName;
                this.saveGame();
            });
        },

        deleteGroup() {
            if (this.groups.length <= 1) {
                alert(this.t('errors.cannotDeleteLastGroup'));
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
                name: this.t('characters.newHero'),
                class: this.t('characters.adventurer'),
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
            const bgName = this.t(randomBg.nameKey);
            const bgItem = this.t(randomBg.itemKey);
            this.currentGroup.characters.push({
                id: Date.now(),
                name: this.t('characters.newHero'),
                class: bgName,
                hp: 3,
                maxHp: 3,
                mana: 0,
                inventory: [bgItem + ' (' + bgName + ')'],
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

                this.showModal(this.t('modals.newItemForChar') + ' ' + char.name, '', (newItem) => {
                    char.inventory.push(newItem);
                    this.saveGame();
                });
            }
        },

        // --- Inventory Management (Shared & Personal) ---
        addGroupItem() {
            if (!this.currentGroup) return;
            if (this.currentGroup.inventory.length >= 3) return; // Limit to 3 slots (Manifesto v2)

            this.showModal(this.t('modals.newItemTitle'), '', (itemName) => {
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
                name: this.t(`statuses.${statusDef.id}.name`),
                emoji: statusDef.emoji,
                effect: this.t(`statuses.${statusDef.id}.effect`),
                cure: this.t(`statuses.${statusDef.id}.cure`),
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
                alert(this.t('errors.allStatusesActive'));
                return;
            }

            // Use custom selection modal with translated status names
            const statusOptions = available.map(s => ({
                label: this.t(`statuses.${s.id}.name`),
                value: s.id,
                emoji: s.emoji
            }));

            this.showSelectionModal(this.t('modals.selectStatus'), statusOptions, (selectedId) => {
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
        },

        // --- Essenz-Raster Methods ---
        selectEssenzNumber(n) {
            const idx = this.essenzNumbers.indexOf(n);
            if (idx > -1) {
                // Deselect if already selected
                this.essenzNumbers.splice(idx, 1);
            } else if (this.essenzNumbers.length < 2) {
                // Select if we have room
                this.essenzNumbers.push(n);
            } else {
                // Replace oldest selection
                this.essenzNumbers.shift();
                this.essenzNumbers.push(n);
            }
        },

        randomEssenzNumbers() {
            const n1 = Math.floor(Math.random() * 10) + 1;
            let n2 = Math.floor(Math.random() * 10) + 1;
            while (n2 === n1) {
                n2 = Math.floor(Math.random() * 10) + 1;
            }
            this.essenzNumbers = [n1, n2];
        },

        getEssenzWord(num, column) {
            if (num < 1 || num > 10) return '';
            // Get translated grid
            const gridKey = `essenz.grid${column}`;
            const grid = this.t(gridKey);

            // If translation returns an array, use it
            if (Array.isArray(grid) && grid.length > num) {
                return grid[num];
            }
            return `[${gridKey} #${num}]`;
        },

        // =====================================================================
        // MERMAID DIAGRAM RENDERING (Reactive to Module Toggle State)
        // =====================================================================
        // 
        // This function builds the game loop diagram dynamically.
        // The diagram changes based on which modules are active.
        //
        // KISS PRINCIPLE:
        // - Core flow is always shown (Intention → How? → Works!)
        // - Module A adds "Luck" path
        // - Module B adds "Timer" element (shown as note)
        // - Module C adds "Fail Forward" path
        // - Modules D/E/F are "invisible" (affect gameplay, not diagram)
        //
        // =====================================================================
        renderDiagram() {
            // Step 1: Find the container element
            const container = document.getElementById('mermaid-container');
            if (!container) {
                console.warn('renderDiagram: No container found');
                return;
            }
            if (!window.mermaid) {
                console.warn('renderDiagram: Mermaid not loaded');
                return;
            }

            // Step 2: Create a shortcut for translations
            const t = (key) => this.t(key);

            // Step 3: Get current module state
            const m = this.modules; // { A: true, B: false, C: true, ... }

            // Step 4: Build the diagram piece by piece
            // We use an array of lines, then join them at the end.
            const lines = [];

            // -----------------------------------------------------------------
            // CORE FLOW (Always visible)
            // -----------------------------------------------------------------
            // Node A: Child's intention
            // Node B: Guide asks "How?"
            // Node W: "It works!" (simple success)
            lines.push(`graph TD`);
            lines.push(`    A["🎯 ${t('rules.loop.step1')}"]`);
            lines.push(`    B{"${t('rules.loop.step2')}"}`)
            lines.push(`    W["✨ ${t('rules.loop.works')}"]`);
            lines.push(`    A --> B`);
            lines.push(`    B -->|"${t('rules.loop.works')}"| W`);

            // -----------------------------------------------------------------
            // CHALLENGE PATHS (Only if any challenge module is active)
            // -----------------------------------------------------------------
            const hasAnyChallengeModule = m.A || m.B;

            if (hasAnyChallengeModule) {
                // Node H: "How do you solve it?" choice
                lines.push(`    H{"${t('rules.loop.how')}"}`);
                lines.push(`    B -->|"${t('rules.loop.risky')}"| H`);

                // Module A: Luck path (Rock-Paper-Scissors, dice, etc.)
                if (m.A) {
                    lines.push(`    L["🎲 ${t('rules.loop.luck')}"]`);
                    lines.push(`    H --> L`);
                    lines.push(`    L --> R`);
                }

                // Essenz-Duell / Search path (always available if challenges exist)
                lines.push(`    S["👁️ ${t('rules.loop.search')}"]`);
                lines.push(`    H --> S`);
                lines.push(`    S --> R`);

                // Physical skill path (balancing, throwing, etc.)
                lines.push(`    K["💪 ${t('rules.loop.skill')}"]`);
                lines.push(`    H --> K`);
                lines.push(`    K --> R`);

                // Result node
                lines.push(`    R{"${t('rules.loop.step3')}"}`);

                // Success path
                lines.push(`    OK["✅ ${t('rules.loop.success')}"]`);
                lines.push(`    R -->|"${t('rules.loop.success')}"| OK`);
                lines.push(`    OK --> W`);

                // Module C: Fail Forward path
                if (m.C) {
                    lines.push(`    F["⚡ ${t('rules.loop.fail')}"]`);
                    lines.push(`    R -->|"${t('rules.loop.fail')}"| F`);

                    // Module B: Tension/Clocks
                    if (m.B) {
                        lines.push(`    T["⏰ ${t('rules.loop.tension')}"]`);
                        lines.push(`    F --> T`);
                        lines.push(`    T --> W`); // Eventually we continue
                    } else {
                        lines.push(`    F --> W`);
                    }
                } else {
                    // If No Fail Forward, Failure might stop loop or retry
                    lines.push(`    R -->|"${t('rules.loop.fail')}"| H`);
                }

                // Module D: Combat (Alternate Path)
                if (m.D) {
                    lines.push(`    C["⚔️ ${t('combat.start') || 'Kampf'}"]`);
                    lines.push(`    H --> C`);
                    lines.push(`    C --> R`);
                }
            }

            // -----------------------------------------------------------------
            // STYLING (Colors for different node types)
            // -----------------------------------------------------------------
            lines.push(`    style A fill:#d4edda,stroke:#28a745`);  // Green: Start
            lines.push(`    style B fill:#fff3cd,stroke:#ffc107`);  // Yellow: Question
            lines.push(`    style W fill:#d4edda,stroke:#28a745`);  // Green: Success

            if (hasAnyChallengeModule) {
                lines.push(`    style H fill:#cce5ff,stroke:#007bff`);  // Blue: Choice
                lines.push(`    style R fill:#f8d7da,stroke:#dc3545`);  // Red: Result
                if (m.A) lines.push(`    style L fill:#e2e3e5,stroke:#6c757d`);
                lines.push(`    style S fill:#e2e3e5,stroke:#6c757d`);
                lines.push(`    style K fill:#e2e3e5,stroke:#6c757d`);
                lines.push(`    style OK fill:#d4edda,stroke:#28a745`);
                if (m.C) lines.push(`    style F fill:#fff3cd,stroke:#ffc107`);
            }

            // Step 5: Join all lines into final Mermaid definition
            const definition = lines.join('\n');

            // Step 6: Render with Mermaid
            const diagramId = 'diagram-' + Date.now();
            try {
                window.mermaid.render(diagramId, definition).then(({ svg }) => {
                    container.innerHTML = svg;
                });
            } catch (e) {
                console.error('Mermaid render error:', e);
                container.innerHTML = '<p style="color:red;">Diagram error</p>';
            }
        }
    });
}
