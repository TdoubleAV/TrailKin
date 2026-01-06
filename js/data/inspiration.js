/**
 * @fileoverview Static data for environment items and character backgrounds.
 * Used by quest and character generators.
 */

/**
 * @typedef {Object} InspirationItem
 * @property {string} item - Real-world item name
 * @property {string} fantasy - Fantasy item names (comma-separated)
 */

/**
 * Inspiration data organized by environment
 * @type {Object.<string, InspirationItem[]>}
 */
export const inspirationData = {
    wald: [
        { item: "Spitzer Stein", fantasy: "Drachenschuppe, Pfeilspitze, Splitter eines magischen Kristalls" },
        { item: "Runder Kieselstein", fantasy: "Kobold-Gold, versteinertes Troll-Auge" },
        { item: "Ast (klein)", fantasy: "Zauberstab, Dolch, Schlüssel" },
        { item: "Tannenzapfen", fantasy: "Drachen-Ei, 'Knirsch-Granate'" },
        { item: "Eichel / Kastanie", fantasy: "Juwel des Eichhörnchen-Königs, Zwergen-Helm" },
        { item: "Moos", fantasy: "Bart des Baumgeistes, Verbandszeug" },
        { item: "Feder", fantasy: "Feder eines Greifen, Schreibfeder für unsichtbare Tinte" },
        { item: "Blatt (besonders)", fantasy: "Elfen-Brief, Tarnumhang (imaginär)" },
        { item: "Rinde", fantasy: "Schild, Schatzkarte" },
        { item: "Blume", fantasy: "Heiltrank-Zutat, Fee im Schlaf" },
        { item: "Wurzel", fantasy: "Schlangen-Amulett, Zauber-Rute" },
        { item: "Erde / Sand (in Dose)", fantasy: "Feenstaub, Schießpulver" }
    ],
    stadt: [
        { item: "Münze / Centstück", fantasy: "Golddublone, Amulett" },
        { item: "Kronkorken", fantasy: "Schild, Medaille" },
        { item: "Gummiband", fantasy: "Fesseln, Bogensehne" },
        { item: "Stück Schnur", fantasy: "Kletterseil, Lassso" },
        { item: "Glitzerpapier", fantasy: "Magische Schriftrolle, Spiegel" },
        { item: "Stein (vom Weg)", fantasy: "Meteorit, 'Sprechender Stein'" },
        { item: "Stöckchen", fantasy: "Dietrich, Zauberstab" },
        { item: "Verlorener Knopf", fantasy: "Schildkröten-Panzer, Auge eines Golems" }
    ]
};

/**
 * @typedef {Object} CharacterBackground
 * @property {string} name - Background/class name
 * @property {string} item - Starting item for this background
 */

/**
 * Available character backgrounds with starting items
 * @type {CharacterBackground[]}
 */
export const characterBackgrounds = [
    { name: "Waldläufer", item: "Bogen" },
    { name: "Kräuterkundiger", item: "Heiltrank" },
    { name: "Dieb", item: "Dietrich" },
    { name: "Ritter", item: "Schild" },
    { name: "Magier", item: "Zauberstab" },
    { name: "Barde", item: "Laute" },
    { name: "Händler", item: "Münzbeutel" },
    { name: "Schmied", item: "Hammer" },
    { name: "Gaukler", item: "Jonglierbälle" },
    { name: "Alchemist", item: "Reagenzglas" },
    { name: "Bestienjäger", item: "Netz" },
    { name: "Entdecker", item: "Kompass" }
];
