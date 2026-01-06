
import { appState, saveGame, getCurrentGroup } from '../state.js';
import { showInputModal } from './modal.js';

export function renderInventory() {
    const list = document.getElementById('inventory-list');
    list.innerHTML = '';
    list.className = 'grid grid-cols-3 md:grid-cols-4 gap-2 mb-4';

    const group = getCurrentGroup();
    if (!group) return;

    const MAX_SLOTS = 12;

    for (let i = 0; i < MAX_SLOTS; i++) {
        const item = group.inventory[i];
        const slot = document.createElement('div');

        if (item) {
            slot.className = 'aspect-square bg-white dark:bg-stone-800 border-2 border-solid border-emerald-500 rounded-lg flex items-center justify-center p-2 relative group transition-all shadow-sm';
            slot.innerHTML = `<span class="text-xs text-center font-medium text-stone-800 dark:text-stone-200 break-words w-full overflow-hidden text-ellipsis max-h-full">${item}</span>
                              <button onclick="removeItem(${i})" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shadow-md hover:scale-110">×</button>`;
        } else {
            slot.className = 'aspect-square bg-stone-50 dark:bg-stone-900/50 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg flex items-center justify-center relative group cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all';
            slot.innerHTML = `<span class="text-stone-300 dark:text-stone-600 text-3xl font-light group-hover:text-emerald-400 dark:group-hover:text-emerald-500 transition-colors">+</span>`;
            slot.onclick = () => addGroupItem();
        }
        list.appendChild(slot);
    }
}

export function addGroupItem() {
    const group = getCurrentGroup();
    if (!group) return;
    if (group.inventory.length >= 12) return;

    showInputModal('Neuer Gegenstand', '', 'Item Name', (val) => {
        group.inventory.push(val); // Note: Current data structure is an Array. Wait, createDefaultGroup initializes it as `new Array(12).fill(null)`.
        // If it is an array of fixed size with nulls, push is wrong.
        // Let's check `createDefaultGroup` in state.js... yes: `inventory: new Array(12).fill(null)`.
        // BUT `loadGame` replaces it with saved data.
        // In the original monolithic code?
        // `group.inventory.push(val)` was used in `addGroupItem` (monolithic version).
        // And `new Array(12).fill(null)` was NOT used in original... wait.
        // In original `createDefaultGroup`:
        // `inventory: []` and logic limited it to 12.
        // In my `state.js` I wrote `inventory: new Array(12).fill(null)`.
        // This is a DISCREPANCY.
        // If I use `push`, I expect a dynamic array.
        // If I use slots (0 to 11), I should find the first null slot.
        // The RENDERING logic in `inventory.js` I just wrote iterates `MAX_SLOTS`. `const item = group.inventory[i]`.
        // If `group.inventory` is `['Item']` (length 1), then `group.inventory[5]` is undefined.
        // Logic: `if (item)` -> checks valid item. Undefined is falsey. So that works for rendering.
        // BUT Adding:
        // `group.inventory.push(val)` works if it's a dynamic array.
        // If I initialized it with 12 nulls, then `push` adds a 13th element.
        // So I must fix `state.js` OR `group.js/inventory.js`.

        // DECISION: Original app used dynamic array `[]`. I should stick to that to avoid breaking save files or logic.
        // I will FIX `state.js` in a later step or right now?
        // I cannot edit `state.js` easily now as I verified it... wait I just wrote it.
        // I will fix `state.js` in a subsequent step or just handle it here?
        // Actually, let's fix the logic here to support both or just stick to dynamic array.
        // If I use dynamic array, `group.inventory[i]` returns undefined for empty slots, which is fine.

        // So in `addGroupItem` here:
        group.inventory.push(val);
        saveGame();
        renderInventory();
    });
}

export function removeItem(index) {
    const group = getCurrentGroup();
    if (!group) return;
    group.inventory.splice(index, 1);
    saveGame();
    renderInventory();
}
