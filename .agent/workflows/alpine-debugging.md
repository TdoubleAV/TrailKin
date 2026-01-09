---
description: The "Trailkin Standard" - Essential workflow for Alpine.js development and debugging.
---

# 🌲 Trailkin Development & Debugging Workflow

**Essence:** Trailkin relies on a Global Store (`alpineStore.js`) for *all* state. The UI (`index.html`) should be a pure reflection of that state.

---

## 🛑 The 3 Golden Rules
*Violating these caused 90% of past bugs.*

1.  **NO Nested `x-data`:**
    *   **Bad:** `<div x-data="$store.game"><section x-data="$store.game">`
    *   **Good:** `<div x-data="$store.game"><section>`
    *   *Why:* Initializes the store twice, breaking the singleton connection. Child scopes lose reactivity.

2.  **NO Native Dialogs (`alert`/`prompt`):**
    *   **Bad:** `const name = prompt("Name?");`
    *   **Good:** `this.showModal("Name?", "", (val) => ...)`
    *   *Why:* Native dialogs block the thread, can't be styled, and fail in some test environments. Use the standardized Modal system.

3.  **Explicit Visual Bindings:**
    *   **Bad:** `<a class="active">` (Static)
    *   **Good:** `<a :class="$store.game.currentTab === 'foo' ? 'active' : ''">`
    *   *Why:* `x-show` handles *existence*, but `:class` handles *feedback*.

---

## 🚀 Release Protocol

**Versioning:** `vX.Y` (e.g., v3.5)
**Type:** Annotated Tags Only!

```bash
# 1. Update Version Numbers
# - index.html (Footer)
# - js/i18n/*.json
# - README.md

# 2. Commit Changes
git commit -m "chore: Bump version to v3.5"

# 3. Create Annotated Tag
git tag -a v3.5 -m "Release v3.5: Features X, Y, Z"

# 4. Verify
git show v3.5
```

---

## 🛠️ Feature Implementation Checklist

### 1. State First (Data & Logic)
*   [ ] **Define:** Object or Array in `alpineStore.js`?
*   [ ] **Mutate:** Create methods (`addX`, `removeX`).
*   [ ] **Persist:** Call `this.saveGame()` after changes.
*   [ ] **Debug:** Check `Alpine.store('game').state` in Console.

### 2. UI Binding (Structure & Feedback)
*   [ ] **Visibility:** `x-show` (DO NOT use `x-if` unless necessary).
*   [ ] **Feedback:** `:class` for active states (e.g., selected tabs).
*   [ ] **Content:** `x-text` for dynamic text.
*   [ ] **Accessibility:** Are buttons large enough? Do they have `title`?

### 3. Interaction (Modals & Input)
*   [ ] **No Prompts:** Use `this.showModal()` or `this.showSelectionModal()`.
*   [ ] **Feedback:** Does the button show a reaction (color change) on click?
*   [ ] **Validation:** Is empty input handled?

---

## 🐞 Debugging Protocol

### Level 1: "It doesn't show up"
1.  **Check the Data:** Open Console -> `Alpine.store('game').myFeature`
    *   Is it `undefined`? -> Typo in Store.
    *   Is it empty? -> Initialization logic missing.
2.  **Check the Binding:**
    *   Right-click element -> Inspect.
    *   Does it have `display: none`? -> `x-show` condition is false.

### Level 2: "It doesn't update"
1.  **Check Reactivity:**
    *   Are you modifying a *local copy* or the *store reference*?
    *   *Debug:* `console.log(Alpine.store('game').currentGroup)` before/after click.
2.  **Check Scope:**
    *   Do you have `x-data` on a child element? **Remove it.**

### Level 3: "Data Mismatch"
*   *Symptom:* `x-for` renders nothing, but data exists.
*   *Cause:* You are trying to loop over an Object, or access properties of an Array.
*   *Fix:* console.log the raw data structure.

---

## 🧪 Pre-Commit Test flight
// turbo-all
1.  **Load:** Does the page load without Red console errors?
2.  **Nav:** Do **all** tabs switch AND highlight correctly?
3.  **Interact:** Open a Modal (e.g., Rename Group). Does it close?
4.  **State:** Refresh page. Is data persisted?
