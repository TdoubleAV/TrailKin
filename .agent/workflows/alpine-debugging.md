---
description: Alpine.js debugging checklist and best practices
---

# Alpine.js Debugging Workflow

Nutze diesen Workflow bei Reaktivitätsproblemen in Alpine.js Apps.

## Schnell-Diagnose

1. **Browser Console öffnen** (F12 → Console)
   - Rote Fehler? → Syntaxfehler oder fehlende Imports
   - "...is not defined"? → Scope-Problem mit x-data

2. **Alpine DevTools installieren** (Chrome/Firefox Extension)
   - Store-Werte live prüfen
   - Component-Hierarchie inspizieren

## Häufige Fehlerquellen

### Problem: UI reagiert nicht auf Store-Änderungen

**Prüfe:**
- [ ] Gibt es redundante `x-data` Attribute auf Child-Elementen?
- [ ] Verwenden `x-show`/`x-for` die direkte `$store.name.property` Referenz?
- [ ] Ist nur EIN `x-data` pro Component-Hierarchie vorhanden?

**Fix:**
```html
<!-- ❌ FALSCH -->
<div x-data="$store.game">
  <section x-data="$store.game" x-show="currentTab === 'foo'">

<!-- ✅ RICHTIG -->
<div x-data="$store.game">
  <section x-show="$store.game.currentTab === 'foo'">
```

### Problem: Module lädt nicht (Syntaxfehler)

**Prüfe:**
- [ ] Keine Markdown-Fences (```) in JS-Dateien?
- [ ] Alle Imports referenzieren existierende Dateien?
- [ ] `type="module"` am Script-Tag?

### Problem: Script-Reihenfolge

**Korrekte Reihenfolge im `<head>`:**
```html
<!-- 1. Eigene Module zuerst (registrieren alpine:init Listener) -->
<script type="module" src="js/main.js"></script>
<!-- 2. Alpine.js mit defer -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x/dist/cdn.min.js"></script>
```

## Vor jedem Commit

// turbo-all
1. App im Browser öffnen
2. Console auf Fehler prüfen (keine roten Meldungen)
3. Alle Tabs durchklicken
4. Ein Feature testen

## Vollständige Dokumentation

Siehe: `/home/lumin/.gemini/antigravity/brain/e0661634-6927-4a50-a417-814c86b73eaa/lessons_learned_report.md`
