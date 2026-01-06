
import { appState, saveGame, getCurrentGroup } from '../state.js';
import { inspirationData } from '../data/inspiration.js';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function generateInspiration(env) {
    const output = document.getElementById('inspiration-output');
    const data = inspirationData[env] || [];
    if (data.length === 0) return;

    const item = data[Math.floor(Math.random() * data.length)];
    output.innerHTML = `
        <div class="fade-in bg-stone-50 dark:bg-stone-900 border-l-4 border-emerald-500 p-3 rounded">
            <div class="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Du findest:</div>
            <div class="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-1">"${item.item}"</div>
            <div class="text-sm text-stone-600 dark:text-stone-300 italic">...vielleicht ist es <span class="text-emerald-600 dark:text-emerald-500">${item.fantasy}</span>?</div>
        </div>
    `;
}

export function generateQuest() {
    const envSelect = document.getElementById('quest-env-select');
    const env = envSelect.value;
    const data = inspirationData[env] || [];
    const shuffledData = shuffleArray([...data]);
    const newQuestItems = shuffledData.slice(0, 3);

    // Save Quest to current group
    const group = getCurrentGroup();
    if (group) {
        group.currentQuest = newQuestItems;
        saveGame();
    }
    renderQuest(newQuestItems);
}

export function renderQuest(questItems) {
    const questOutput = document.getElementById('quest-output');
    const questList = document.getElementById('quest-list');

    if (!questItems || questItems.length === 0) return;

    questOutput.querySelector('h3').textContent = "Eure laufende Mission:";
    const p = questOutput.querySelector('p');
    if (p) p.remove();
    questList.innerHTML = '';

    questItems.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'flex items-center fade-in text-stone-800 dark:text-stone-200';
        li.innerHTML = `
           <span class="text-emerald-600 dark:text-emerald-400 mr-3 text-xl">✔️</span> 
           <span>Finde eine <strong>"${item.fantasy.split(',')[0]}"</strong> (z.B. ${item.item})</span>
        `;
        questList.appendChild(li);
    });
}
