# Vision Quest: AI-Prototype Strategy

## Goal
Create a standalone prototype to validate if browser-based AI can meaningfuly classify user photos of nature to trigger relevant Trailkin "inspirations".

## Core Concept: "Zero-Shot" Classification
Unlike traditional image classifiers that output fixed labels like "tree" or "rock", we will use **CLIP (Contrastive Language-Image Pre-Training)**.

*   **How it works:** We provide the image AND a list of text options (Trailkin inspirations).
*   **The AI decides:** Which text option best matches the image.
*   **Why implementation matters:** This connects the camera directly to our specific game content without retraining a model.

## Technology Stack
*   **Library:** [Transformers.js](https://huggingface.co/docs/transformers.js) (v3)
*   **Model:** `Xenova/clip-vit-base-patch16` (Quantized for web)
    *   *Alternative for speed:* `Xenova/mobileclip` (if available/compatible)
*   **Execution Backend:**
    1.  **WebGPU:** Primary target (fastest, modern phones).
    2.  **WASM (SIMD):** Fallback for older devices.
*   **UI:** Simple HTML/JS with Tailwind CSS (CDN).

## Implementation Plan

### Phase 1: The "Vision Quest" Prototype Setup
Location: `prototypes/vision-quest/`

1.  **Basic Camera UI:**
    *   `<video>` feed for realtime preview.
    *   Capture button to freeze frame.
2.  **AI Pipeline:**
    *   Load Transformers.js pipeline.
    *   Define a static list of "Nature Inspirations" (e.g., "Mossy Stone", "Twisted Branch", "Cloud formation", "Spiderweb").
3.  **Inference:**
    *   Run zero-shot classification on the captured frame against the list.
    *   Display the top 3 matches with confidence scores.

### Phase 2: Performance Testing
*   Measure "Time to Interactive" (Model download size).
*   Measure "Inference Speed" (Time to classify one photo).
*   Test on user's mobile device via local network.

### Phase 3: UX Refinement (Mental Sandbox)
*   *Idea:* Instead of just classifying, maybe "hunting" for specific things?
*   *Constraint Check:* How hot does the phone get? Battery usage?

## Directory Structure
```
trailkin/
└── prototypes/
    └── vision-quest/
        ├── index.html      # Main UI
        ├── script.js       # Logic & AI loading
        └── styles.css      # Minimal styling
```

## Risks & Mitigations
*   **Download Size:** The model is ~100MB+. We must cache it efficiently.
*   **Speed:** WebGPU is fast, but WASM fallback might be slow (1-2s inference). We will show a "Thinking..." spinner.
*   **Accuracy:** CLIP is distinct generic. It might confuse "stick" with "snake". We frame this as "Magic Interpretation" in the game context.
