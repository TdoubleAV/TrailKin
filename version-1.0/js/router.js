
import { renderGroupSelector } from './modules/group.js';
import { renderCharacters } from './modules/char.js';
import { renderInventory } from './modules/inventory.js';
import { renderQuest } from './modules/quest.js';
import { getCurrentGroup } from './state.js';

export function runRouter() {
    function handleRoute() {
        const hash = window.location.hash || '#start';
        showSection(hash.substring(1));
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Init
}

function showSection(sectionId) {
    // Hide all
    document.querySelectorAll('.game-section').forEach(el => {
        el.classList.add('hidden');
    });
    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('active');
    });

    // Show active
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
    }

    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Refresh data if needed
    if (sectionId === 'gruppe') {
        renderGroupSelector();
        renderCharacters();
        renderInventory();
    }
    if (sectionId === 'quest') {
        const group = getCurrentGroup();
        if (group && group.currentQuest) {
            renderQuest(group.currentQuest);
        }
    }
}
