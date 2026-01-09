import { inspirationData } from '../../js/data/inspirations.js';
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

// Configuration
env.allowLocalModels = false;
env.useBrowserCache = true;

// DOM Elements
const video = document.getElementById('camera-feed');
const canvas = document.getElementById('capture-canvas');
const captureBtn = document.getElementById('capture-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsList = document.getElementById('results-list');
const loadingOverlay = document.getElementById('loading-overlay');
const progressBar = document.getElementById('progress-fill');

let classifier = null;
let stream = null;
let translations = null;

// Nature Inspirations (Candidate Labels)
// Will be populated from inspirations.js + en.json
let CANDIDATE_LABELS = [];
let CANDIDATE_MAP = {}; // Maps "A photo of..." label back to ID/Details

async function loadData() {
    try {
        const [enResponse, deResponse] = await Promise.all([
            fetch('../../js/i18n/en.json'),
            fetch('../../js/i18n/de.json')
        ]);

        const enData = await enResponse.json();
        const deData = await deResponse.json();

        translations = enData.inspiration.data;
        const translationsDE = deData.inspiration.data;

        // Flatten all environments into one list for the prototype
        const allItems = [
            ...inspirationData.wald,
            ...inspirationData.stadt,
            ...inspirationData.quartier,
            ...inspirationData.altstadt
        ];

        // Unique items only (checking IDs)
        const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());

        // Build Prompts
        // We use the English Item Name from the JSON
        // Structure map: itemKey -> "inspiration.data.wald.moos.item"
        // In JSON: data.wald.moos.item

        // Helper to resolve nested keys
        const resolve = (dataRoot, key) => {
            const parts = key.split('.');
            // parts: ["inspiration", "data", "wald", "moos", "item"]
            // The JSON structure starts inside "data" (as imported above)
            // So we need parts[2] (env), parts[3] (id), parts[4] (type)
            if (parts.length < 5) return key;
            const env = parts[2];
            const id = parts[3];
            const type = parts[4];

            return dataRoot[env]?.[id]?.[type] || key;
        };

        CANDIDATE_LABELS = uniqueItems.map(item => {
            const englishName = resolve(translations, item.itemKey);
            const germanName = resolve(translationsDE, item.itemKey);
            const prompt = `A photo of ${englishName}`;

            // Store mapping to find it back
            CANDIDATE_MAP[prompt] = {
                id: item.id,
                itemKey: item.itemKey,
                englishName: englishName,
                germanName: germanName,
            };

            return prompt;
        });

        console.log(`Loaded ${CANDIDATE_LABELS.length} candidate labels.`);

    } catch (e) {
        console.error("Failed to load data:", e);
        // Fallback
        CANDIDATE_LABELS = ["A photo of Moss", "A photo of a Stone", "A photo of a Tree"];
    }
}

// Initialize AI
async function initAI(modelId = 'Xenova/clip-vit-base-patch16') {
    try {
        // Dispose previous classifier if exists
        if (classifier) {
            // Transformers.js doesn't have a clear 'dispose' on the pipeline yet in all versions, 
            // but letting it be garbage collected by clearing reference helps.
            classifier = null;
        }

        // Show Loading UI
        loadingOverlay.classList.remove('opacity-0', 'pointer-events-none');
        captureBtn.disabled = true;

        const modelName = document.querySelector(`option[value="${modelId}"]`).text;
        document.querySelector('#loading-overlay .text-emerald-400').textContent = `Lade ${modelName}...`;

        // Callback for progress updates
        const progressCallback = (info) => {
            if (info.status === 'progress') {
                const percent = Math.round(info.progress || 0);
                progressBar.style.width = `${percent}%`;
            }
        };

        // Load CLIP model (Zero-Shot Image Classification)
        console.log(`Loading model: ${modelId}`);
        classifier = await pipeline('zero-shot-image-classification', modelId, {
            progress_callback: progressCallback
        });

        // UI Update: AI Ready
        loadingOverlay.classList.add('opacity-0', 'pointer-events-none');
        captureBtn.disabled = false;
        console.log("AI Model Loaded!");

        // Update debug info
        document.querySelector('.text-stone-600.font-mono').textContent = `Transformer.js v3 | Model: ${modelName}`;

    } catch (error) {
        console.error("AI Loading failed:", error);
        const overlayText = document.querySelector('#loading-overlay .text-emerald-400');
        if (overlayText) {
             overlayText.innerHTML = `<span class="text-red-500">Fehler: ${error.message}</span>`;
             document.getElementById('progress-bar').classList.add('hidden');
        } else {
             // Fallback if overlay structure is gone
             loadingOverlay.innerHTML = `<div class="text-red-500 font-bold">Fehler beim Laden:<br>${error.message}</div>`;
        }
    }
}

// Model Switch Listener
const modelSelect = document.getElementById('model-select');
modelSelect.addEventListener('change', (e) => {
    initAI(e.target.value);
});

// Initialize Camera
async function initCamera() {
    try {
        // Try back camera first (environment)
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });
        video.srcObject = stream;

        // Wait for video metadata to load to set canvas size
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };

    } catch (error) {
        console.error("Camera access denied:", error);
        resultsList.innerHTML = `<div class="text-red-500 text-center">Kein Kamerazugriff.<br>Bitte erlaube Zugriff.</div>`;
    }
}

// Capture & Classify
async function captureAndClassify() {
    if (!classifier) return;

    // 1. Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 2. UI: Freeze state
    video.style.display = 'none';
    canvas.style.display = 'block';
    captureBtn.hidden = true;
    resetBtn.hidden = false;

    // 3. Show "Thinking" state
    resultsList.innerHTML = `
        <div class="flex items-center justify-center py-4 space-x-2 animate-pulse">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-75"></div>
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150"></div>
        </div>
    `;

    // 4. Run Inference (convert canvas to data URL for easy consumption by library)
    // Ideally we pass the raw data, but dataURL is simplest for prototype
    const image = canvas.toDataURL('image/jpeg');

    try {
        const output = await classifier(image, CANDIDATE_LABELS);
        // output looks like: [{ label: 'Mossy Stone', score: 0.95 }, ...]

        displayResults(output);

    } catch (error) {
        console.error("Inference error:", error);
        resultsList.innerHTML = `<div class="text-red-400 text-center">Analyse fehlgeschlagen.</div>`;
    }
}

// Display Logic
function displayResults(output) {
    // Take top 3
    const top3 = output.slice(0, 3);

    resultsList.innerHTML = top3.map((result, index) => {
        const percent = Math.round(result.score * 100);
        // Highlight the winner
        const colorClass = index === 0 ? "text-emerald-300 font-bold text-lg" : "text-stone-400 text-sm";
        const barColor = index === 0 ? "bg-emerald-500" : "bg-stone-600";

        // Lookup German Name
        // result.label is the prompt: "A photo of Moss"
        const details = CANDIDATE_MAP[result.label] || { germanName: result.label };
        const displayName = details.germanName;

        return `
            <div class="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors" onclick="alert('Du hast ${displayName} gewählt!')">
                <div class="${colorClass}">${displayName}</div>
                <div class="flex items-center gap-2">
                    <div class="w-16 h-1.5 bg-stone-700 rounded-full overflow-hidden">
                        <div class="${barColor} h-full" style="width: ${percent}%"></div>
                    </div>
                    <span class="text-xs font-mono text-stone-500 w-8 text-right">${percent}%</span>
                </div>
            </div>
        `;
    }).join('');

    // Hint
    resultsList.innerHTML += `<div class="text-xs text-center text-stone-600 mt-3 pt-2 border-t border-stone-700">Tippe auf ein Ergebnis um es zu nutzen!</div>`;
}

// Reset Logic
function resetCamera() {
    canvas.style.display = 'none';
    video.style.display = 'block';
    captureBtn.hidden = false;
    resetBtn.hidden = true;
    resultsList.innerHTML = `<div class="text-stone-500 italic text-center text-sm py-4">Bereit für nächstes Foto...</div>`;
}

// Event Listeners
captureBtn.addEventListener('click', captureAndClassify);
resetBtn.addEventListener('click', resetCamera);

// Start everything
loadData().then(() => {
    initCamera();
    // Load whatever is selected by default (or the first one)
    initAI(modelSelect.value);
});
