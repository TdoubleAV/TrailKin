
import { appState, saveGame, createDefaultGroup, getCurrentGroup } from '../state.js';
import { showInputModal } from './modal.js';
import { renderCharacters } from './char.js';
import { renderInventory } from './inventory.js';
import { renderQuest } from './quest.js';

export function renderGroupSelector() {
    const select = document.getElementById('group-select');
    select.innerHTML = '';
    appState.groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.textContent = group.name;
        if (group.id === appState.activeGroupId) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

export function switchGroup(groupId) {
    appState.activeGroupId = parseInt(groupId);
    saveGame();
    renderCharacters();
    renderInventory();
    const group = getCurrentGroup();
    if (group && group.currentQuest) {
        renderQuest(group.currentQuest);
    } else {
        // Reset quest display logic handled in quest module typically, but here manually:
        const questOutput = document.getElementById('quest-output');
        const questList = document.getElementById('quest-list');
        if (questOutput.querySelector('h3')) questOutput.querySelector('h3').textContent = 'Eure heutige Mission:';
        if (questList) questList.innerHTML = '';
    }
}

export function createNewGroup() {
    showInputModal('Name der neuen Gruppe', 'Neue Gruppe', 'Gruppenname', (name) => {
        const newGroup = createDefaultGroup(name);
        appState.groups.push(newGroup);
        appState.activeGroupId = newGroup.id;
        saveGame();
        renderGroupSelector();
        renderCharacters();
        renderInventory();
        // Clear quest view
        const questList = document.getElementById('quest-list');
        if (questList) questList.innerHTML = '';
    });
}

export function renameCurrentGroup() {
    const group = getCurrentGroup();
    if (!group) return;
    showInputModal('Neuer Name für die Gruppe', group.name, 'Gruppenname', (newName) => {
        group.name = newName;
        saveGame();
        renderGroupSelector();
    });
}

export function deleteCurrentGroup() {
    if (appState.groups.length <= 1) {
        alert('Du kannst die letzte Gruppe nicht löschen!');
        return;
    }
    const currentId = appState.activeGroupId;
    appState.groups = appState.groups.filter(g => g.id !== currentId);
    appState.activeGroupId = appState.groups[0].id; // Fallback to first
    saveGame();
    renderGroupSelector();
    renderCharacters();
    renderInventory();
    // Reset quest
    const group = getCurrentGroup();
    if (group && group.currentQuest) {
        renderQuest(group.currentQuest);
    } else {
        const questList = document.getElementById('quest-list');
        if (questList) questList.innerHTML = '';
    }
}
