
import { appState, saveGame, getCurrentGroup } from '../state.js';
import { characterBackgrounds } from '../data/inspiration.js';
import { showInputModal } from './modal.js';
import { renderInventory as renderSharedInventory } from './inventory.js'; // if needed, but char updates don't usually affect shared inventory unless transfer

export function renderCharacters() {
    const list = document.getElementById('char-list');
    list.innerHTML = '';
    const group = getCurrentGroup();
    if (!group) return;

    group.characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'hero-card bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 p-4 rounded-lg relative transition-colors';

        // Ensure inventory exists
        if (!char.inventory) char.inventory = [];

        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <input type="text" value="${char.name}" data-char-id="${char.id}" data-field="name" class="char-input font-bold text-lg bg-transparent border-b border-transparent focus:border-emerald-500 outline-none w-2/3 text-stone-800 dark:text-stone-200">
                    <input type="text" value="${char.class}" data-char-id="${char.id}" data-field="class" class="char-input text-sm text-stone-500 dark:text-stone-400 bg-transparent block w-full">
                </div>
                <button onclick="removeChar(${char.id})" class="text-red-400 hover:text-red-600 text-lg p-1" title="Held löschen">❌</button>
            </div>
            
            <div class="flex items-center gap-4 mt-3">
                 <div class="flex-1">
                    <label class="text-xs font-bold text-red-700 dark:text-red-400 uppercase">HP (Puste)</label>
                    <div class="flex items-center gap-2">
                        <button onclick="modStat(${char.id}, 'hp', -1)" class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold hover:bg-red-200 dark:hover:bg-red-800 transition-colors">-</button>
                        <span class="font-mono text-xl w-6 text-center text-stone-800 dark:text-stone-200">${char.hp}</span>
                        <button onclick="modStat(${char.id}, 'hp', 1)" class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">+</button>
                    </div>
                </div>
                <div class="flex-1">
                     <label class="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Wille (WIL)</label>
                    <div class="flex items-center gap-2">
                        <button onclick="modStat(${char.id}, 'mana', -1)" class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">-</button>
                        <span class="font-mono text-xl w-6 text-center text-stone-800 dark:text-stone-200">${char.mana}</span>
                        <button onclick="modStat(${char.id}, 'mana', 1)" class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">+</button>
                    </div>
                </div>
            </div>
            
            <!-- Personal Slots -->
            <div class="mt-3 pt-3 border-t border-emerald-100 dark:border-emerald-800">
                <label class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase mb-1 block">Ausrüstung (3 Slots)</label>
                <div class="grid grid-cols-3 gap-2">
                    ${[0, 1, 2].map(i => {
            const item = char.inventory[i] ? char.inventory[i] : '';
            if (item) {
                return `
                                <div class="aspect-square bg-white dark:bg-stone-800 border border-emerald-500 rounded flex items-center justify-center p-1 relative group text-xs text-center overflow-hidden">
                                    <span class="text-[10px] leading-tight break-words w-full h-full flex items-center justify-center">${item}</span>
                                    <button onclick="removeCharItem(${char.id}, ${i})" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity text-[10px]">×</button>
                                </div>`;
            } else {
                return `
                                <div class="aspect-square bg-transparent border border-dashed border-stone-300 dark:border-stone-600 rounded flex items-center justify-center text-stone-300 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5" onclick="addCharItem(${char.id})">
                                    +
                                </div>`;
            }
        }).join('')}
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

export function addCharacter() {
    const group = getCurrentGroup();
    if (!group) return;
    const newChar = {
        id: Date.now(),
        name: 'Neuer Held',
        class: 'Abenteurer',
        hp: 10, // Default 10? Old code had 3 or 10 depending on version. Last prompt said "3".
        maxHp: 10,
        mana: 0,
        inventory: []
    };
    // Fix: previous code used 10 for basic addCharacter? 
    // Wait, let's check index.html. `addCharacter` used `hp: 10`. `generateRandomChar` used `hp: 3`.
    // I will stick to what was there.
    group.characters.push(newChar);
    saveGame();
    renderCharacters();
}

export function generateRandomChar() {
    const backgrounds = characterBackgrounds || [];
    if (backgrounds.length === 0) return addCharacter();

    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const group = getCurrentGroup();
    if (!group) return;

    const newChar = {
        id: Date.now(),
        name: 'Neuer Held',
        class: randomBg.name,
        hp: 3,
        maxHp: 3,
        mana: 0,
        inventory: [randomBg.item + " (" + randomBg.name + ")"]
    };
    group.characters.push(newChar);

    saveGame();
    renderCharacters();
}

export function removeChar(id) {
    // Removed confirm dialog as per previous user request/current implementation
    const group = getCurrentGroup();
    if (!group) return;
    group.characters = group.characters.filter(c => c.id !== id);
    saveGame();
    renderCharacters();
}

export function updateChar(id, field, value) {
    const group = getCurrentGroup();
    if (!group) return;
    const char = group.characters.find(c => c.id === id);
    if (char) {
        char[field] = value;
        saveGame();
    }
}

export function modStat(id, stat, amount) {
    const group = getCurrentGroup();
    if (!group) return;
    const char = group.characters.find(c => c.id === id);
    if (char) {
        char[stat] = Math.max(0, char[stat] + amount);
        saveGame();
        renderCharacters();
    }
}

export function removeCharItem(charId, slotIndex) {
    const group = getCurrentGroup();
    if (!group) return;
    const char = group.characters.find(c => c.id === charId);
    if (char && char.inventory) {
        char.inventory.splice(slotIndex, 1);
        saveGame();
        renderCharacters();
    }
}

export function addCharItem(charId) {
    const group = getCurrentGroup();
    if (!group) return;
    const char = group.characters.find(c => c.id === charId);
    if (char) {
        if (!char.inventory) char.inventory = [];
        if (char.inventory.length >= 3) return;

        showInputModal('Neues Item für ' + char.name, '', 'Item Name', (newItem) => {
            char.inventory.push(newItem);
            saveGame();
            renderCharacters();
        });
    }
}
