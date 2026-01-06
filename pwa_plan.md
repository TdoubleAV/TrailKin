# PWA & Offline Support Implementation Plan

## Goal
Transform the "Abenteuer-Spaziergänger" web page into a Progressive Web App (PWA). This will allow users to install it on their phones and use it offline (critical for outdoor walks where signal might be poor).

## User Review Required
> [!NOTE]
> This requires generating icon assets. I will use the `generate_image` tool to create placeholder icons if I can, or use simple emojis/text if image generation is limited. For now, I'll rely on a basic manifest setup.

## Proposed Changes

### 1. Web App Manifest (`manifest.json`)
- [x] Create `manifest.json` file. (EXISTING)
- [x] Icons verified in `icons/`.

### 2. Service Worker (`sw.js`)
- [NEW] Create `sw.js`.
- Implement caching strategy: **Stale-While-Revalidate** or **Cache-First** for assets.
- Cache:
    - `index.html`
    - `js/main.js`, `js/alpineStore.js`, `js/state.js`
    - `js/data/inspiration.js`
    - `manifest.json`, `icons/*`
    - CDN Resources (Alpine.js, Tailwind - *Note: We will try to cache these given we depend on them.*)

### 3. App Entry Point (`index.html`)
- [MODIFY] Link `manifest.json` (if not linked).
- [MODIFY] Add script to register `sw.js`.

## Verification Plan
1. **Lighthouse Audit**: Run browser audit to verify PWA criteria.
2. **Offline Test**: Disconnect network, reload page. It should still work.
3. **Installability**: Check for "Install" prompt in browser.
