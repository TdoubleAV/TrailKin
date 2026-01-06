# Walkthrough - Version 3.0: Alpine.js Migration

## Overview
This update migrates the entire application from Vanilla JS/ES Modules to **Alpine.js (v3)**. This transition significantly improves Developer Experience (DX) by removing boilerplate DOM manipulation code and enhancing User Experience (UX) with instant reactivity.

## Changes Implemented

### 1. Architecture: Centralized State
- **`alpineStore.js`**: Created a central Store (`Alpine.store('game', ...)`) that holds all application state:
  - Groups & Characters
  - Inventory
  - Active Quest
  - Modal State
  - Theme
- **Reactivity**: All UI updates happen automatically when store data changes, removing the need for manual `render*()` functions.

### 2. Module Cleanup
- **Removed**: Legacy DOM manipulation logic from `char.js`, `group.js`, `inventory.js`, `quest.js`.
- **Simplified**: `main.js` now acts only as an entry point to initialize Alpine and the Router.
- **Deleted**: `modules/modal.js` (replaced by Alpine reactive modal).

### 3. UI Migration
All sections in `index.html` were converted to use Alpine directives:
- **Groups**: `x-for` loop for dropdown, `@click` for management.
- **Characters**: Reactive list with `x-for`. Stats (HP/Mana) update instantly without full re-render.
- **Inventory**: Dynamic grid using `x-for="i in 12"`.
- **Quest Generator**: Reactive buttons and templates.
- **Modal**: A single, shared modal component controlled by store state (`modal.open`).
- **Theme**: Reactive toggle using proper store state.

### 4. Initialization Fixes
- Solved a race condition where Alpine initialized before the store was ready by explicitly waiting for `alpine:init` or initializing synchronously if Alpine is already loaded.

## Verification Results

### Functionality
- **Group Management**: Creating, renaming, deleting groups works and persists to LocalStorage.
- **Reactivity**: Changing a character's HP updates the number immediately.
- **Persistence**: Reloading the page restores the exact state (including active group and theme).
- **Theme**: Dark/Light mode toggles correctly and persists.

### Performance
- **Speed**: The app feels much snappier as only changed DOM elements are updated (fine-grained reactivity).
- **Code Size**: Significant reduction in imperative JavaScript code.

## Next Steps
- Consider bundling Alpine.js locally instead of CDN for offline capability.
- Refactor `js/router.js` eventually to be fully Alpine-native (e.g., using `x-show` on sections instead of hash-based visibility), though the current hybrid approach works well.
