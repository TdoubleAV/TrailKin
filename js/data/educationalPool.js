/**
 * Educational Pool - Smart Learning Goals for Hidden Education Quests
 * Based on Swiss Lehrplan 21 (Aargau) - NMG & Mathematik
 * 
 * Each entry maps a curriculum competency to a game task with narrative wrappers.
 */

export const educationalPool = [
    // ============================================================
    // NATURE (Biology, Weather)
    // ============================================================
    {
        id: "nmg_2_1_leaves",
        lp21_code: "NMG.2.1",
        category: "nature",
        cycle: [1, 2],
        env: ["forest", "park", "suburb"],
        task: {
            de: "Finde 3 Blätter mit unterschiedlichen Rändern (gezackt, glatt, gewellt).",
            en: "Find 3 leaves with different edge types (serrated, smooth, wavy)."
        },
        parent_hint: {
            de: "Gezackt = Eiche/Kastanie, Glatt = Buche, Gewellt/Gelappt = Ahorn",
            en: "Serrated = Oak/Chestnut, Smooth = Beech, Wavy/Lobed = Maple"
        },
        gm_prompts: {
            de: ["Frage: 'Wie fühlt sich das Blatt an?'", "Wenn gefunden: 'Der Druide nickt zufrieden.'"],
            en: ["Ask: 'How does the leaf feel?'", "When found: 'The druid nods approvingly.'"]
        },
        narrative_wrappers: {
            magic: { de: "Der Trank braucht 3 verschiedene Blatt-Essenzen.", en: "The potion needs 3 different leaf essences." },
            scifi: { de: "Sammle 3 Bio-Proben für den Scanner.", en: "Collect 3 bio-samples for the scanner." },
            nature: { de: "Der Waldgeist bittet um 3 verschiedene Blätter.", en: "The forest spirit asks for 3 different leaves." }
        }
    },
    {
        id: "nmg_2_4_tree_types",
        lp21_code: "NMG.2.4",
        category: "nature",
        cycle: [1, 2],
        env: ["forest", "park"],
        task: {
            de: "Finde einen Nadelbaum und einen Laubbaum. Was unterscheidet sie?",
            en: "Find a conifer and a deciduous tree. What's the difference?"
        },
        parent_hint: {
            de: "Nadeln vs. Blätter, immergrün vs. Laubabwurf im Herbst",
            en: "Needles vs. leaves, evergreen vs. drops leaves in autumn"
        },
        narrative_wrappers: {
            magic: { de: "Der Druide braucht Holz von zwei verschiedenen Baumarten.", en: "The druid needs wood from two tree species." },
            nature: { de: "Der Förster fragt: Welche Bäume wachsen hier?", en: "The ranger asks: What trees grow here?" }
        }
    },
    {
        id: "nmg_2_1_animal_traces",
        lp21_code: "NMG.2.1",
        category: "nature",
        cycle: [1, 2],
        env: ["forest", "park", "mountains"],
        task: {
            de: "Suche nach Tierspuren: Löcher, Nester, angenagte Zapfen oder Federn.",
            en: "Look for animal traces: holes, nests, gnawed pinecones, or feathers."
        },
        parent_hint: {
            de: "Spechthöhlen in Bäumen, Maulwurfshügel, Eichhörnchen-Zapfen",
            en: "Woodpecker holes in trees, mole hills, squirrel-chewed pinecones"
        },
        narrative_wrappers: {
            magic: { de: "Der Jäger sucht Hinweise auf magische Wesen.", en: "The hunter seeks signs of magical creatures." },
            nature: { de: "Wer wohnt in diesem Wald? Finde Beweise!", en: "Who lives in this forest? Find evidence!" },
            detective: { de: "Detektiv-Auftrag: Sichere Beweise am Tatort Natur!", en: "Detective mission: Secure evidence at the nature crime scene!" }
        }
    },
    {
        id: "nmg_4_2_wind",
        lp21_code: "NMG.4.2",
        category: "nature",
        cycle: [1, 2],
        env: ["forest", "city", "beach", "mountains"],
        task: {
            de: "Bestimme die Windrichtung. Woher weht er? Nutze Blätter, Gras oder Wolken.",
            en: "Determine the wind direction. Where is it coming from? Use leaves, grass, or clouds."
        },
        parent_hint: {
            de: "Blätter bewegen sich in Windrichtung, Wolken zeigen Höhenwind",
            en: "Leaves move with wind direction, clouds show high-altitude wind"
        },
        narrative_wrappers: {
            magic: { de: "Der Windmagier muss wissen, woher die Böe kommt.", en: "The wind mage must know where the gust originates." },
            scifi: { de: "Der Wetter-Computer braucht lokale Winddaten.", en: "The weather computer needs local wind data." },
            pirate: { de: "Kapitän! Woher weht der Wind? Müssen wir die Segel drehen?", en: "Captain! Where's the wind coming from? Must we turn the sails?" }
        }
    },

    // ============================================================
    // OBSERVATION (Physics, Materials)
    // ============================================================
    {
        id: "nmg_3_1_hardness",
        lp21_code: "NMG.3.1",
        category: "observation",
        cycle: [1, 2],
        env: ["forest", "city", "beach", "mountains"],
        task: {
            de: "Finde 3 Objekte: eines härter als Holz, eines weicher als ein Blatt, eines dazwischen.",
            en: "Find 3 objects: one harder than wood, one softer than a leaf, one in between."
        },
        parent_hint: {
            de: "Stein > Holz > Blatt > Moos",
            en: "Stone > Wood > Leaf > Moss"
        },
        narrative_wrappers: {
            magic: { de: "Der Schmied braucht Materialien aller Härteklassen.", en: "The blacksmith needs materials of all hardness levels." },
            scifi: { de: "Kalibriere den Härte-Sensor mit 3 Proben.", en: "Calibrate the hardness sensor with 3 samples." },
            pirate: { de: "Der Schiffszimmermann prüft das Holz für den neuen Mast.", en: "The shipwright tests the wood for the new mast." }
        }
    },
    {
        id: "nmg_3_1_float_sink",
        lp21_code: "NMG.3.1",
        category: "observation",
        cycle: [1],
        env: ["beach", "park"],
        task: {
            de: "Finde etwas, das im Wasser schwimmt, und etwas, das sinkt. Warum?",
            en: "Find something that floats and something that sinks. Why?"
        },
        parent_hint: {
            de: "Holz/Blätter schwimmen (leichter als Wasser), Steine sinken (schwerer)",
            en: "Wood/leaves float (lighter than water), stones sink (heavier)"
        },
        narrative_wrappers: {
            magic: { de: "Die Wassernixe testet dein Wissen über ihre Welt.", en: "The water sprite tests your knowledge of her realm." }
        }
    },

    // ============================================================
    // MINDFULNESS (Senses)
    // ============================================================
    {
        id: "nmg_4_1_sounds",
        lp21_code: "NMG.4.1",
        category: "mindfulness",
        cycle: [1, 2],
        env: ["forest", "park", "mountains", "beach"],
        task: {
            de: "Schließe 1 Minute die Augen. Finde 3 Geräusche, die nicht von Menschen stammen.",
            en: "Close your eyes for 1 minute. Find 3 sounds not made by humans."
        },
        parent_hint: {
            de: "Vogelgesang, Blätterrascheln, Wasserplätschern, Wind",
            en: "Birdsong, rustling leaves, water splashing, wind"
        },
        gm_prompts: {
            de: ["Frage: 'Was war das leiseste Geräusch?'", "Tipp: 'Halte die Hände hinter die Ohren wie ein Luchs.'"],
            en: ["Ask: 'What was the quietest sound?'", "Tip: 'Cup your hands behind your ears like a lynx.'"]
        },
        narrative_wrappers: {
            magic: { de: "Der Waldgeist spricht nur zu denen, die zuhören können.", en: "The forest spirit speaks only to those who can listen." },
            nature: { de: "Welche Stimmen hörst du im Wald?", en: "What voices do you hear in the forest?" }
        }
    },

    // ============================================================
    // ORIENTATION (Space, Math/Estimation)
    // ============================================================
    {
        id: "nmg_8_1_north",
        lp21_code: "NMG.8.1",
        category: "orientation",
        cycle: [2],
        env: ["forest", "park", "mountains"],
        task: {
            de: "Bestimme Norden ohne Kompass. Nutze die Sonne oder Moos an Bäumen.",
            en: "Find North without a compass. Use the sun or moss on trees."
        },
        parent_hint: {
            de: "Sonne: Mittags im Süden (CH). Moos: Wächst oft auf der Nordseite (schattig/feucht).",
            en: "Sun: South at noon (CH). Moss: Often grows on north side (shady/moist)."
        },
        gm_prompts: {
            de: ["Frage: 'Wo steht die Sonne gerade?'", "Challenge: 'Zeige mir Osten ohne zu zögern.'"],
            en: ["Ask: 'Where is the sun right now?'", "Challenge: 'Point to East without hesitation.'"]
        },
        narrative_wrappers: {
            magic: { de: "Der verlorene Wanderer braucht deine Hilfe zur Orientierung.", en: "The lost traveler needs your help to orient." },
            nature: { de: "Finde den Weg ohne moderne Hilfsmittel!", en: "Find the way without modern tools!" }
        }
    },
    {
        id: "nmg_8_5_map_compare",
        lp21_code: "NMG.8.5",
        category: "orientation",
        cycle: [2],
        env: ["city", "suburb", "oldtown"],
        task: {
            de: "Vergleiche die Karte auf dem Handy mit der echten Umgebung. Finde 3 Übereinstimmungen.",
            en: "Compare the phone map with the real surroundings. Find 3 matches."
        },
        parent_hint: {
            de: "Straßennamen, Gebäudeformen, Plätze, Kreuzungen",
            en: "Street names, building shapes, squares, intersections"
        },
        narrative_wrappers: {
            scifi: { de: "Der Navi-Roboter muss seine Karte kalibrieren.", en: "The navigation robot needs to calibrate its map." },
            nature: { de: "Welche Symbole auf der Karte kannst du in echt finden?", en: "Which map symbols can you find in real life?" },
            pirate: { de: "Die Schatzkarte ist alt. Stimmt sie noch mit der Umgebung überein?", en: "The treasure map is old. Does it still match the surroundings?" }
        }
    },
    {
        id: "ma_2_1_shapes",
        lp21_code: "MA.2.1",
        category: "orientation",
        cycle: [1],
        env: ["forest", "city", "park", "beach"],
        task: {
            de: "Finde natürliche Formen: 1 Dreieck (Astgabel), 1 Kreis (Stein), 1 Rechteck.",
            en: "Find natural shapes: 1 triangle (branch fork), 1 circle (stone), 1 rectangle."
        },
        parent_hint: {
            de: "Astgabeln = Dreiecke, runde Steine = Kreise, Rinden = Rechtecke",
            en: "Branch forks = triangles, round stones = circles, bark pieces = rectangles"
        },
        narrative_wrappers: {
            magic: { de: "Der Geometrie-Zauberer braucht 3 Urformen für sein Ritual.", en: "The geometry wizard needs 3 primal shapes for his ritual." }
        }
    },
    {
        id: "ma_3_1_estimate_distance",
        lp21_code: "MA.3.1",
        category: "orientation",
        cycle: [1, 2],
        env: ["forest", "city", "park", "beach", "mountains"],
        task: {
            de: "Schätze die Schritte bis zum nächsten Baum/Laterne. Dann zähle nach!",
            en: "Estimate the steps to the next tree/lamppost. Then count!"
        },
        parent_hint: {
            de: "Übung macht den Meister. Nach ein paar Versuchen wird die Schätzung besser.",
            en: "Practice makes perfect. After a few tries, estimates improve."
        },
        narrative_wrappers: {
            magic: { de: "Der Troll lässt dich nur passieren, wenn du die Distanz schätzt.", en: "The troll only lets you pass if you estimate the distance." },
            scifi: { de: "Der Entfernungsmesser ist kaputt. Schätze manuell!", en: "The range finder is broken. Estimate manually!" }
        }
    },
    {
        id: "ma_3_3_time_estimate",
        lp21_code: "MA.3.3",
        category: "orientation",
        cycle: [1, 2],
        env: ["forest", "city", "park", "beach", "mountains"],
        task: {
            de: "Einer schließt die Augen. Sage 'Stop', wenn du glaubst, dass 60 Sekunden um sind.",
            en: "One person closes their eyes. Say 'Stop' when you think 60 seconds have passed."
        },
        parent_hint: {
            de: "Langsam bis 60 zählen hilft. 'Einundzwanzig, zweiundzwanzig...'",
            en: "Counting slowly to 60 helps. 'Twenty-one, twenty-two...'"
        },
        narrative_wrappers: {
            magic: { de: "Der Zeitzauber wirkt nur, wenn du die Zeit genau spürst.", en: "The time spell only works if you sense time precisely." }
        }
    }
];

/**
 * Get tasks filtered by environment and cycle
 * @param {string} env - Environment key (forest, city, etc.)
 * @param {number} cycle - Age cycle (1 or 2)
 * @returns {Array} Filtered educational tasks
 */
export function getEducationalTasks(env, cycle = 1) {
    return educationalPool.filter(task =>
        task.env.includes(env) && task.cycle.includes(cycle)
    );
}

/**
 * Core Narrative Archetypes with Generic Fallbacks
 */
export const narrativeThemes = {
    fantasy: {
        name: { de: "Fantasy", en: "Fantasy" },
        emoji: "🧙‍♂️",
        fallback: {
            de: "Ein alter Zauberer erscheint: 'Nur wer diese Prüfung besteht, darf passieren. {task}'",
            en: "An old wizard appears: 'Only those who pass this test may proceed. {task}'"
        }
    },
    adventure: {
        name: { de: "Abenteuer", en: "Adventure" },
        emoji: "🤠",
        fallback: {
            de: "Der Expeditionsleiter ruft: 'Team! Wir brauchen das für unsere Reise. {task}'",
            en: "The expedition leader calls: 'Team! We need this for our journey. {task}'"
        }
    },
    detective: {
        name: { de: "Detektiv", en: "Detective" },
        emoji: "🔍",
        fallback: {
            de: "Ein mysteriöser Fall! 'Detektiv, kombinieren Sie: {task}'",
            en: "A mysterious case! 'Detective, deduce this: {task}'"
        }
    },
    guardian: {
        name: { de: "Naturwächter", en: "Nature Guardian" },
        emoji: "🍃",
        fallback: {
            de: "Der Waldwächter flüstert: 'Beschütze das Gleichgewicht. {task}'",
            en: "The forest guardian whispers: 'Protect the balance. {task}'"
        }
    },
    scifi: {
        name: { de: "Sci-Fi", en: "Sci-Fi" },
        emoji: "👽",
        fallback: {
            de: "Alien-Signal empfangen. Dekodiere Nachricht: '{task}'",
            en: "Alien signal received. Decoding message: '{task}'"
        }
    },
    survival: {
        name: { de: "Überleben", en: "Survival" },
        emoji: "🔥",
        fallback: {
            de: "Die Vorräte sind knapp. Um zu überleben: {task}",
            en: "Supplies are low. To survive: {task}"
        }
    }
};

/**
 * Get a random educational task for a given environment
 * @param {string} env - Environment key
 * @param {string} narrativeStyle - Narrative style key (or 'random')
 * @returns {Object|null} A random task with narrative wrapper applied
 */
export function getRandomEducationalTask(env, narrativeStyle = 'random') {
    const tasks = getEducationalTasks(env);
    if (tasks.length === 0) return null;

    const task = tasks[Math.floor(Math.random() * tasks.length)];

    // Determine target theme
    let targetTheme = narrativeStyle;
    if (targetTheme === 'random' || !narrativeThemes[targetTheme]) {
        const themeKeys = Object.keys(narrativeThemes);
        targetTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    }

    // Try to find specific wrapper, otherwise use generic fallback
    let hookObj = { de: "", en: "" };

    // Check if task has specific wrapper for this theme
    // Note: Some legacy keys might not match exactly (e.g. 'magic' vs 'fantasy'), we map them manually if needed
    // For now, we rely on exact matches or fallback
    const legacyMap = { 'fantasy': 'magic', 'guardian': 'nature' };
    const lookupKey = legacyMap[targetTheme] || targetTheme;

    if (task.narrative_wrappers && task.narrative_wrappers[lookupKey]) {
        hookObj = task.narrative_wrappers[lookupKey];
    } else {
        // Use Generic Fallback
        const fallback = narrativeThemes[targetTheme].fallback;
        const taskTextDe = task.task.de.charAt(0).toLowerCase() + task.task.de.slice(1); // Lowercase for insertion if needed?
        // Actually, fallback templates usually expect full sentences or independent clauses.
        // Let's just insert the task text as is.
        hookObj = {
            de: fallback.de.replace('{task}', task.task.de),
            en: fallback.en.replace('{task}', task.task.en)
        };
    }

    return {
        ...task,
        hook: hookObj,
        appliedTheme: targetTheme // Metadata for UI if needed
    };
}
