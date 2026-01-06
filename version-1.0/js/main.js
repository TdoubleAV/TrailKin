
import { loadGame, saveGame } from './state.js';
import { runRouter } from './router.js';
import { generateInspiration, generateQuest } from './modules/quest.js';
import { createNewGroup, renameCurrentGroup, deleteCurrentGroup, switchGroup } from './modules/group.js';
import { addCharacter, generateRandomChar, removeChar, updateChar, modStat, removeCharItem, addCharItem } from './modules/char.js';
import { addGroupItem, removeItem } from './modules/inventory.js';
import { showInputModal, closeModal } from './modules/modal.js';

// Global exports for HTML onclick compatibility
window.createNewGroup = createNewGroup;
window.renameCurrentGroup = renameCurrentGroup;
window.deleteCurrentGroup = deleteCurrentGroup;
window.switchGroup = switchGroup;
window.addCharacter = addCharacter;
window.generateRandomChar = generateRandomChar;
window.removeChar = removeChar;
window.updateChar = updateChar;
window.modStat = modStat;
window.removeCharItem = removeCharItem;
window.addCharItem = addCharItem;
window.addGroupItem = addGroupItem;
window.removeItem = removeItem;
window.showInputModal = showInputModal;
window.closeModal = closeModal;

// Theme Logic
window.toggleTheme = function () {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};

// Init Code
document.addEventListener('DOMContentLoaded', () => {
    // Theme Init
    if (localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    loadGame();
    runRouter();

    // Event Listeners for Generators
    document.querySelectorAll('.inspiration-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Visual feedback
            document.querySelectorAll('.inspiration-btn').forEach(b => b.classList.remove('ring-2', 'ring-emerald-500'));
            btn.classList.add('ring-2', 'ring-emerald-500');
            generateInspiration(btn.dataset.env);
        });
    });

    const questBtn = document.getElementById('generate-quest-btn');
    if (questBtn) questBtn.addEventListener('click', generateQuest);

    // Initial Generator Call
    generateInspiration('wald');
});
