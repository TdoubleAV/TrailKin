---
description: Ensure all text is multilingual from the start - i18n best practices
---

# Trailkin i18n Development Workflow

This project is **multilingual by design**. All user-facing text must be translatable.

## Core Principles

1. **Never hardcode user-facing text** in HTML, JavaScript, or data files
2. **Always use i18n keys** from the start, even for German-first development
3. **All translations live in** `/js/i18n/de.json` and `/js/i18n/en.json`

## How to Add New Text

### In HTML Templates
```html
<!-- ❌ WRONG -->
<h3>Meine Gruppe</h3>

<!-- ✅ CORRECT -->
<h3 x-text="$t('group.title')"></h3>
```

### In JavaScript (alpineStore.js)
```javascript
// ❌ WRONG
this.showModal('Name der neuen Gruppe', 'Neue Gruppe', callback);

// ✅ CORRECT
this.showModal(this.t('modals.newGroupTitle'), this.t('modals.newGroupDefault'), callback);
```

### For Data Files (statuses.js, inspirations.js, etc.)
```javascript
// ❌ WRONG - Hardcoded strings
{ id: "itchy", name: "Juckreiz", effect: "Hüpfe auf einem Bein" }

// ✅ CORRECT - Use i18n key references
{ id: "itchy", nameKey: "statuses.itchy.name", effectKey: "statuses.itchy.effect" }

// Then resolve in runtime with this.t(status.nameKey)
```

## JSON Structure Convention

```json
{
  "section": {
    "subsection": {
      "key": "Translated text"
    }
  }
}
```

Example paths:
- `nav.start` → Navigation items
- `group.title` → Group section
- `modals.cancel` → Modal dialogs
- `statuses.itchy.name` → Status effect names

## Translation Workflow

1. **Add DE key first** to `de.json`
2. **Add EN key** to `en.json` (required!)
3. **Reference in code** using `$t('key.path')` or `this.t('key.path')`
4. **Test both languages** before committing

## Files to Update

| Type | Location | Method |
|------|----------|--------|
| UI Labels | `index.html` | `x-text="$t('...')"` |
| Buttons | `index.html` | `x-text="$t('...')"` |
| Modals | `alpineStore.js` | `this.t('...')` |
| Alerts | `alpineStore.js` | `this.t('errors...')` |
| Data | `js/data/*.js` | Key references + runtime lookup |

## Testing

// turbo
```bash
# Start local server
python3 -m http.server 8080
```

1. Open http://localhost:8080
2. Click 🇩🇪 for German, 🇬🇧 for English
3. Navigate through all sections
4. Verify no `[key.missing]` placeholders appear
