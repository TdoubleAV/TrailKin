<p align="center">
  <img src="./icons/icon-192.png" alt="Trailkin Logo" width="120">
</p>

<h1 align="center">Trailkin - Family Adventure Walks</h1>

<p align="center">
  <strong>Turn ordinary walks into extraordinary adventures</strong>
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
  <img src="https://img.shields.io/badge/version-3.1-emerald" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/PWA-ready-purple" alt="PWA Ready">
</p>

---

## What is Trailkin?

**Trailkin** (formerly *Abenteuer-Spaziergaenger*) is a free, open-source web app that transforms family walks into imaginative tabletop-style adventures. Originally designed for a German-speaking audience, it is a lightweight RPG companion that runs directly in your browser - no downloads, no accounts, no internet required after initial load.

Perfect for:
- **Families** with kids aged 6-12
- **Dog owners** looking to make walks more engaging  
- **Tabletop RPG fans** who want rules-light outdoor play
- **Nature lovers** who want to gamify exploration

---

## Features

### Core Game Features
- **Character Management** - Create and track heroes with HP, Willpower, and 3 equipment slots
- **Multi-Group Support** - Manage multiple adventure parties (e.g., "Weekend Warriors", "School Walk Crew")
- **Shared Inventory** - 12-slot group backpack for magical items found along the way
- **Quest Generator** - Instant fetch quests tailored to your environment (Forest, City, Suburb, Old Town)
- **Inspiration Generator** - Transform real-world objects into fantasy items ("A pinecone? That is a dragon scale!")

### Technical Features
- **Progressive Web App (PWA)** - Install on your phone home screen
- **Works Offline** - Full functionality without internet after first visit
- **Dark/Light Mode** - Automatic theme detection + manual toggle
- **Zero Dependencies** - Pure HTML/CSS/JS + Alpine.js (via CDN)
- **LocalStorage Persistence** - Your data stays on your device

### Design
- Beautiful, child-friendly UI with emerald/amber color scheme
- Responsive design for phones, tablets, and desktops
- Smooth animations and transitions
- German language interface (English version planned)

---

## Demo

**[Try Trailkin Live](https://YOUR_USERNAME.github.io/trailkin/)**

> *Replace with your actual GitHub Pages URL after deployment*

---

## Quick Start

### The 60-Second Rules

1. **Assign Roles** - One player is the Game Master (GM), others are heroes. Your dog? A magical companion!

2. **Start a Quest** - Use the Quest Generator or pick a simple goal: *"Find 3 magical objects before we reach the park!"*

3. **Use Your Surroundings** - A stick becomes a wizard staff, a puddle becomes a portal, a bench becomes a resting shrine.

4. **Resolve Challenges** - When things get tricky, use Rock-Paper-Scissors or creative storytelling to determine success.

5. **Have Fun!** - There are no wrong answers. The goal is to create memories, not to "win."

---

## How to Play

### Characters

Each hero has:

| Stat | Description |
|------|-------------|
| **HP (Puste)** | Health/Stamina - Lose some when you fail challenges |
| **WIL (Wille)** | Willpower - Spend to activate special abilities |
| **Equipment** | 3 slots for personal items |

### Game Modules

The app includes optional rule modules:

- **Module A: Conflict Resolution** - Rock-Paper-Scissors, "Odd or Even", or skill-based challenges (balance on a log!)
- **Module B: Tension Mechanics** - Progress clocks and real-world timers ("Find the artifact before we reach the bridge!")
- **Module C: Consequence Mechanics** - Fun status effects ("You are Itchy - hop on one foot until cured!")

### Sample Adventure

> *"You feel a disturbance in the magical ley-lines. Your faithful hound sniffs the air... Today is no ordinary walk. The Forest King has sent a warning: a dark power approaches the boundary. You must patrol the path and collect three enchanted objects to stabilize the barrier!"*

---

## Installation

### Option 1: Use Online (Recommended)
Visit the [live demo](#demo) - that is it! The app works entirely in your browser.

### Option 2: Install as PWA
1. Open the app in Chrome/Edge/Safari
2. Click "Install" or "Add to Home Screen"
3. Launch from your home screen like a native app

### Option 3: Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/trailkin.git

# Navigate to the project
cd trailkin

# Serve with any static server, e.g.:
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000 in your browser
```

### Option 4: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings > Pages
3. Set Source to "Deploy from a branch" > main > /root
4. Your site is live at https://YOUR_USERNAME.github.io/trailkin/

---

## Project Structure

```
trailkin/
|-- index.html          # Main single-page application
|-- manifest.json       # PWA manifest
|-- sw.js               # Service Worker for offline support
|-- icons/
|   |-- icon-192.png    # App icon (192x192)
|   |-- icon-512.png    # App icon (512x512)
|-- js/
|   |-- main.js         # App entry point
|   |-- alpineStore.js  # Alpine.js reactive state management
|   |-- state.js        # State utilities
|-- docs/
    |-- spaziergang_rpg.md    # Full game reference (German)
    |-- premium_roadmap.md    # Future monetization plans
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure |
| **Tailwind CSS** (CDN) | Styling |
| **Alpine.js** (CDN) | Reactive UI and State Management |
| **LocalStorage** | Data Persistence |
| **Service Worker** | Offline Support |
| **PWA Manifest** | Installability |

---

## Roadmap

### Completed (v3.1)
- [x] Core game mechanics
- [x] Character and group management
- [x] Quest/Inspiration generators
- [x] PWA offline support
- [x] Dark mode

### Coming Soon
- [ ] English language support
- [ ] More environment packs (Beach, Mountains, Winter)
- [ ] Custom quest builder
- [ ] Cloud sync (optional, premium feature)
- [ ] Printable character sheets

### Future Ideas
- NPC generator
- Encounter difficulty calculator
- Session notes / adventure journal
- Sound effects and ambient audio

---

## Contributing

Contributions are welcome! Here is how you can help:

1. **Report Bugs** - Open an issue with reproduction steps
2. **Suggest Features** - Start a discussion with your idea
3. **Translate** - Help bring Trailkin to more languages
4. **Design** - Contribute art, icons, or UI improvements
5. **Code** - Fork, improve, and submit a pull request

### Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/trailkin.git
cd trailkin
# Open index.html directly or use a local server
```

No build step required - it is just HTML, CSS, and vanilla JS with Alpine.js!

---

## Support the Project

If Trailkin brings joy to your family walks, consider supporting its development:

<p align="center">
  <a href="https://ko-fi.com/abenteuer">
    <img src="https://img.shields.io/badge/Ko--fi-Support%20Me-ff5e5b?logo=ko-fi" alt="Ko-fi">
  </a>
  <a href="https://github.com/sponsors/YOUR_USERNAME">
    <img src="https://img.shields.io/badge/GitHub-Sponsor-ea4aaa?logo=github" alt="GitHub Sponsors">
  </a>
</p>

---

## Credits

- **Original Concept**: Inspired by [Cairn RPG](https://cairnrpg.com/) by Ben Milton
- **Development**: Created with love for outdoor family adventures
- **Icons**: Custom designed for the forest adventure theme

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Trailkin Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<p align="center">
  Made with love for outdoor adventures<br>
  <strong>Trailkin v3.1</strong> - Dein Abenteuer beginnt vor der Haustuer
</p>
