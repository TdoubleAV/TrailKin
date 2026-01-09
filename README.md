<p align="center">
  <img src="./icons/icon-192.png" alt="Trailkin Logo" width="120">
</p>

<h1 align="center">Trailkin — Make Every Walk an Adventure</h1>

<p align="center">
  <strong>Kill boredom. Spark imagination. Get outside.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> |
  <a href="#demo">Demo</a> |
  <a href="#quick-start">Quick Start</a> |
  <a href="#how-to-play">How to Play</a> |
  <a href="#installation">Installation</a> |
  <a href="#contributing">Contributing</a> |
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.2-emerald" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/PWA-ready-purple" alt="PWA Ready">
</p>

---

## What is Trailkin?

**Trailkin** is a free, open-source web app that transforms family walks into imaginative adventures. It's a simple companion tool that runs directly in your browser—no downloads, no accounts, no internet required after the first load.

Think of it as a "boredom killer" for walks. Your kid doesn't want to go outside? Now they're on a quest to find a dragon scale (a.k.a. a pointy stone).

**Perfect for:**
- **Families** with kids aged 5-12 who need a reason to go outside
- **Dog owners** looking to make walks more engaging
- **Educators** who want to gamify nature walks
- **Anyone** who wants to turn a boring stroll into an adventure

---

## Features

### Core Features
- **Explorer Management** — Create and track Explorers with Energy, Spirit, and 3 equipment slots
- **Multi-Group Support** — Manage multiple adventure parties (e.g., "Weekend Crew", "School Walk")
- **Team Backpack** — 12-slot shared inventory for magical items found along the way
- **Quest Generator** — Instant collection quests tailored to your environment (Forest, City, Suburb, Old Town)
- **Idea Generator** — Transform real-world objects into fantasy items ("A pinecone? That's a dragon scale!")

### Technical Features
- **Progressive Web App (PWA)** — Install on your phone's home screen
- **Works Offline** — Full functionality without internet after first visit
- **Dark/Light Mode** — Automatic theme detection + manual toggle
- **Zero Dependencies** — Pure HTML/CSS/JS + Alpine.js (via CDN)
- **LocalStorage Persistence** — Your data stays on your device

---

## Demo

**[Try Trailkin Live](https://TdoubleAV.github.io/trailkin/)**

> *Replace with your actual GitHub Pages URL after deployment*

---

## Quick Start

### The Adventure in 3 Steps
*(Based on our "Active Play" Philosophy: The world is your game board)*

1.  **Assign Roles** — **Guide** (Storyteller) and **Explorers** (Kids). Your dog? A magical companion!
2.  **Start a Quest** — "Find 3 magical objects" (Collection) or "Defeat the Troll" (Duel).
3.  **Play "The Duel"** — No dice, just perception!
    *   *Guide calls:* "Find something **Hard** that is **Round**!" (using the app's Essence Grid)
    *   *Explorers:* Have 30 seconds to find a real object.

---

## How to Play (Rules v5.1)

### The Core Mechanic: Essence Duel
Conflicts are resolved by finding real-world objects.
*   **Guide** combines words from the **Essence Grid** (e.g., "Wooden + Shiny").
*   **Explorers** search their surroundings.

### Explorers & Resources
| Stat | Description |
|------|-------------|
| **Energy (Puste)** | Stamina — Lose 1 on failure (Fail Forward: story continues!). |
| **Courage (Mut)** | Spend 1 "Fantasy Spark" to reroll or invent a story detail. |
| **Backpack** | 3 slots for real sticks, stones, and leaves. |

### Module F: The Animal Companion
Turn dog commands into magic spells:
*   **"Look"** = See invisible spirits
*   **"Touch"** = Break magical seals
*   **"Leave it"** = Disarm traps

---

## Installation

### Option 1: Use Online (Recommended)
Visit the [live demo](#demo) — that's it! The app works entirely in your browser.

### Option 2: Install as PWA
1. Open the app in Chrome/Edge/Safari
2. Click "Install" or "Add to Home Screen"
3. Launch from your home screen like a native app

### Option 3: Run Locally

```bash
git clone https://github.com/TdoubleAV/trailkin.git
cd trailkin
python -m http.server 8000
# Open http://localhost:8000
```

### Option 4: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings > Pages
3. Set Source to "Deploy from a branch" > main > /root
4. Your site is live at `https://TdoubleAV.github.io/trailkin/`

---

## Project Structure

```
trailkin/
├── index.html          # Main single-page application
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker for offline support
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── js/
    ├── main.js         # App entry point
    ├── alpineStore.js  # Alpine.js reactive state
    ├── state.js        # State utilities
    └── i18n/           # Language files (en.json, de.json)
```

---

## Roadmap

### Completed (v3.5)
- [x] Core adventure mechanics
- [x] Explorer and group management
- [x] Quest/Inspiration generators
- [x] PWA offline support
- [x] Dark mode

### Coming Soon
- [ ] Full English language support (UI toggle)
- [ ] More environment packs (Beach, Mountains, Winter)
- [ ] Custom quest builder
- [ ] Printable adventure sheets

---

## Contributing

Contributions are welcome!

1. **Report Bugs** — Open an issue with reproduction steps
2. **Suggest Features** — Start a discussion with your idea
3. **Translate** — Help bring Trailkin to more languages
4. **Code** — Fork, improve, and submit a pull request

No build step required — it's just HTML, CSS, and vanilla JS with Alpine.js!

---

## Support the Project

If Trailkin brings joy to your family walks, consider supporting its development:

<p align="center">
  <a href="https://ko-fi.com/tdoubleav">
    <img src="https://img.shields.io/badge/Ko--fi-Support%20Me-ff5e5b?logo=ko-fi" alt="Ko-fi">
  </a>
</p>

---

## Credits

- **Inspiration**: The spirit of outdoor play and family time
- **Development**: Created with ❤️ for outdoor adventures
- **Icons**: Custom designed for the adventure theme

---

## License

This project is licensed under the **MIT License**.

---

<p align="center">
  Made with 💚 for outdoor adventures<br>
  <strong>Trailkin v3.5</strong> — Your adventure starts at your doorstep
</p>
