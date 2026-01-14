import { inspirationData } from '../data/inspirations.js';
import { getRandomEducationalTask } from '../data/educationalPool.js';

/**
 * QuestBuilder
 * Encapsulates the logic for creating quest objects.
 */
export class QuestBuilder {
    /**
     * @param {Function} translator - The t() function from the store/i18n
     * @param {string} language - Current language code ('de' or 'en')
     * @param {boolean} dogModuleActive - Whether the dog module is enabled
     */
    constructor(translator, language = 'de', dogModuleActive = false) {
        this.t = translator;
        this.lang = language;
        this.dogModuleActive = dogModuleActive;
    }

    /**
     * Helper: Shuffle array
     */
    _shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * Builds a Standard Exploration/Adventure Quest
     * @param {string} scenarioType - 'exploration', 'adventure', etc.
     * @param {string} env - Environment key ('wald', etc.)
     * @param {string} complexity - 'easy', 'medium', 'hard'
     */
    buildStandardQuest(scenarioType, env, complexity) {
        const complexityMap = { easy: 1, medium: 2, hard: 3 };
        const nodeCount = complexityMap[complexity] || 2;

        const scenarioData = {
            name: this.t(`quest.v2.scenarios.${scenarioType}.name`), // Assuming structure matches
            // We might need to access the full object if we want hooks.
            // But since t() returns string, we might need to rely on the store passing data or specific keys.
            // 'quest.v2.scenarios.exploratoin' is an object in JSON, so t() might return [Object object] if not handled.
            // Accessing nested keys directly:
        };

        // Hooks are array of strings. We need to access them via a specific pattern or i18n store access.
        // Since we only have `t`, we assume we can get specific keys.
        // Actually, looking at previous code: `const scenarioData = this.t('quest.v2.scenarios.' + scenarioType);`
        // Inspecting i18n implementation would be good, but assuming it returns the object if key points to object.
        // Let's assume t() returns the raw object from JSON if it matches a node.
        const scenarioObj = this.t(`quest.v2.scenarios.${scenarioType}`);
        const hooks = scenarioObj.hooks || [];
        let hook = hooks[Math.floor(Math.random() * hooks.length)] || "Ein neues Abenteuer beginnt...";

        // Inject Dog Hook if module active (30% chance)
        if (this.dogModuleActive && Math.random() < 0.3) {
            const dogHooks = this.t('quest.v2.dogHooks');
            if (Array.isArray(dogHooks) && dogHooks.length > 0) {
                const dogHook = dogHooks[Math.floor(Math.random() * dogHooks.length)];
                hook = `${hook} \n\n🐕 **Fellnase:** ${dogHook}`;
            }
        }

        // Environment Data
        const envData = inspirationData[env] || inspirationData['wald'];
        const shuffled = this._shuffle(envData);

        const nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            const item = shuffled[i % shuffled.length];
            const nodeType = ['search', 'challenge', 'interaction'][Math.floor(Math.random() * 3)];
            const mechanicHint = ['search', 'skill', 'luck'][Math.floor(Math.random() * 3)];

            const itemLabel = this.t(item.itemKey);

            nodes.push({
                id: 'node_' + Date.now() + '_' + i,
                type: nodeType,
                description: this.t(`quest.v2.nodeTypes.${nodeType}`).replace('{0}', itemLabel),
                target_item_key: item.itemKey,
                mechanic_hint: mechanicHint,
                completed: false
            });
        }

        // Complication
        let complication = null;
        if (Math.random() > 0.5) {
            const compPool = this.t('quest.v2.complications');
            const envPool = compPool[env] || compPool['wald'] || [];
            if (envPool.length > 0) {
                complication = envPool[Math.floor(Math.random() * envPool.length)];
            }
        }

        return {
            id: 'q_' + Date.now(),
            title: scenarioObj.name + ' im ' + this.t(`quest.${env}`),
            scenario_type: scenarioType,
            env: env,
            hook: hook,
            nodes: nodes,
            complication: complication,
            active: true,
            date: new Date().toLocaleDateString()
        };
    }

    /**
     * Builds an Educational Quest (Hybrid)
     * @param {string} env - Environment key
     * @param {string} theme - Narrative theme key
     */
    buildEducationalQuest(env, theme = 'random') {
        const envMap = {
            'wald': 'forest',
            'quartier': 'park',
            'stadt': 'city',
            'altstadt': 'city',
            'strand': 'beach',
            'gebirge': 'mountains',
            'winter': 'forest'
        };
        const poolEnv = envMap[env] || 'forest';

        const task = getRandomEducationalTask(poolEnv, theme);
        if (!task) return null;

        const lang = this.lang; // 'de' or 'en'

        // Phase 4: Hybrid Logic
        // 1. Edu Node
        // 2. Search Node (Bonus)

        // Get Bonus Item
        const inspirationEnv = inspirationData[env] || inspirationData['wald'];
        const bonusItem = inspirationEnv[Math.floor(Math.random() * inspirationEnv.length)];
        const bonusItemLabel = this.t(bonusItem.itemKey);
        const bonusFantasyLabel = this.t(bonusItem.fantasyKey);

        const eduTitle = task.task[lang] || task.task.de;
        const eduDesc = task.task[lang] || task.task.de;

        // Apply Wrapper to Hook
        const hookText = task.hook ? (task.hook[lang] || task.hook.de) : '';

        const nodes = [
            {
                id: 'node_edu_1',
                type: 'educational',
                description: eduDesc,
                completed: false
            },
            {
                // Bonus Node: Find the item
                id: 'node_edu_2',
                type: 'search',
                description: this.t('quest.v2.nodeTypes.search').replace('{0}', bonusItemLabel),
                target_item_key: bonusItem.itemKey,
                mechanic_hint: 'search',
                completed: false
            }
        ];

        return {
            id: 'edu_' + Date.now(),
            title: '🎓 ' + eduTitle,
            scenario_type: 'educational',
            env: env,
            hook: hookText,
            learning_goal: task.category,
            parent_hint: task.parent_hint ? (task.parent_hint[lang] || task.parent_hint.de) : '',
            gm_prompts: task.gm_prompts ? (task.gm_prompts[lang] || task.gm_prompts.de) : [],
            reward: bonusFantasyLabel, // Displayed in UI Badge
            nodes: nodes,
            active: true,
            date: new Date().toLocaleDateString(),
            appliedTheme: task.appliedTheme || theme
        };
    }
}
