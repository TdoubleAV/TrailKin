
export const appState = {
    groups: [],
    activeGroupId: null
};

const STORAGE_KEY = 'wald_rpg_save_v2';

export function saveGame() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

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

export function createDefaultGroup(name) {
    return {
        id: Date.now(),
        name: name,
        characters: [],
        inventory: new Array(12).fill(null), // 12 shared slots
        currentQuest: null
    };
}

export function getCurrentGroup() {
    return appState.groups.find(g => g.id === appState.activeGroupId);
}
