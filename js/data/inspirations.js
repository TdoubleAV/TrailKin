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
        // Standard
        { item: "Spitzer Stein", fantasy: "Drachenschuppe, Pfeilspitze, Splitter eines magischen Kristalls" },
        { item: "Runder Kieselstein", fantasy: "Kobold-Gold, versteinertes Troll-Auge" },
        { item: "Ast (klein)", fantasy: "Zauberstab, Dolch, Schlüssel" },
        { item: "Tannenzapfen", fantasy: "Drachen-Ei in Stasis, 'Knirsch-Granate'" },
        { item: "Eichel / Kastanie", fantasy: "Juwel des Eichhörnchen-Königs, Zwergen-Helm, Energie-Kapsel" },
        { item: "Moos", fantasy: "Bart des Baumgeistes, Elfen-Teppich, Verbandszeug" },
        { item: "Feder", fantasy: "Feder eines Greifen, Schreibfeder für unsichtbare Tinte" },
        { item: "Blatt (besonders)", fantasy: "Elfen-Brief, Tarnumhang (imaginär), Feen-Flügel" },
        { item: "Rinde", fantasy: "Schild, Schatzkarte, Haut eines Ents" },
        { item: "Blume", fantasy: "Heiltrank-Zutat, Fee im Schlaf, Sonnensplitter" },
        { item: "Wurzel", fantasy: "Schlangen-Amulett, Zauber-Rute, Stolperfalle der Goblins" },
        { item: "Erde / Sand (in Dose)", fantasy: "Feenstaub, Schießpulver" },
        { item: "Baumstumpf", fantasy: "Tisch der Zwerge, Altar der Druiden, Feen-Tanzplatz" },
        { item: "Pilz", fantasy: "Hocker für Wichtel, Gift-Warnung, Magischer Regenschirm" },
        { item: "Ameise", fantasy: "Soldat der Erdarmee, Kundschafter" },
        { item: "Spinnennetz", fantasy: "Traumfänger, Netzfalle einer Riesenspinne, Feen-Hängematte" },
        { item: "Hohler Baum", fantasy: "Portal in die Unterwelt, Versteck eines Waldläufers" },
        { item: "Kleeblatt", fantasy: "Glücksbringer, Schlüssel zur Feenwelt" },
        { item: "Farn", fantasy: "Dinosaurier-Pflanze, Wedel des Windes" },
        { item: "Käfer", fantasy: "Gepanzerter Transporter, Juwel auf Beinen" },
        { item: "Vogelgesang", fantasy: "Geheime Botschaft der Elfen, Warnruf der Wächter" },
        { item: "Sonnenstrahl durch Blätter", fantasy: "Pfad der Erleuchtung, Segen des Lichtgottes" },
        { item: "Bach / Pfütze", fantasy: "Spiegel der Wahrheit, Trank des Lebens, Ozean für Ameisen" },
        { item: "Großer Stein", fantasy: "Schlafender Troll, Sitz des Rates, Meteorit" },
        { item: "Beere (nicht essen!)", fantasy: "Explosive Kugel, Giftköder, Rubine" },
        { item: "Löwenzahn", fantasy: "Sonnensplitter, Wunsch-Verteiler (Pusteblume)" },
        { item: "Schneckenhaus", fantasy: "Mobile Festung, Helm für Däumling, Spiral-Amulett" },
        { item: "Harz", fantasy: "Bernstein, Blut des Baumes, Magischer Kleber" },
        { item: "Vogelnest (oben)", fantasy: "Wachturm der Lüfte, Schatzkammer der Elstern" },
        { item: "Umgestürzter Baum", fantasy: "Brücke über den Abgrund, Gefallener Riese" },
        { item: "Wildspur", fantasy: "Pfad der Bestie, Zeichen des Werwolfs" },
        { item: "Holzscheit", fantasy: "Brennstoff für den Drachenatem, Riesen-Zahnstocher" },
        { item: "Weiche Nadeln", fantasy: "Bett der Waldfee, Grünes Fell" },
        { item: "Kletterpflanze", fantasy: "Grüne Schlange, Leiter der Wichtel" },
        { item: "Haufen Blätter", fantasy: "Versteck des Waldschrats, Drachennest" },

        // Saisonal (Frühling/Sommer)
        { item: "Knospe", fantasy: "Drachen-Ei (klein), Frische Energie" },
        { item: "Biene", fantasy: "Honig-Sammlerin der Königin, Goldener Bote" },
        { item: "Schmetterling", fantasy: "Verzauberte Fee, Bunter Bote" },
        { item: "Glühwürmchen (abends)", fantasy: "Irrlicht, Fee mit Laterne" },
        { item: "Grashüpfer", fantasy: "Spring-Ryter, Bote des Sommers" },

        // Saisonal (Herbst)
        { item: "Buntes Blatt (Rot/Gelb)", fantasy: "Feuer-Rune, Goldmünze der Natur" },
        { item: "Nuss", fantasy: "Verschlossene Truhe, Gehirn-Nahrung" },
        { item: "Kürbis (Feld)", fantasy: "Kopf des Kopflosen Reiters, Riesen-Bombe" },

        // Saisonal (Winter)
        { item: "Eiszapfen", fantasy: "Kristall-Dolch, Zahn des Frostriesen" },
        { item: "Spur im Matsch/Schnee", fantasy: "Hinweis auf das Monster, Pfad des Vorgängers" },
        { item: "Kahler Ast", fantasy: "Knochenhand, Skelett-Finger" },
        { item: "Raureif", fantasy: "Diamant-Staub, Hauch des Eisdrachen" },
        { item: "Stechpalme/Nadelbaum", fantasy: "Der Unbesiegbare, Wächter des Winters" }
    ],
    stadt: [
        { item: "Münze / Centstück", fantasy: "Golddublone, Amulett, Bestechungsgeld" },
        { item: "Kronkorken", fantasy: "Schild für Mäuse, Medaille, Währung der Zukunft" },
        { item: "Gummiband", fantasy: "Fesseln, Bogensehne, Wurm" },
        { item: "Stück Schnur", fantasy: "Kletterseil, Lasso, Ariadne-Faden" },
        { item: "Glitzerpapier", fantasy: "Magische Schriftrolle, Spiegel, Scherbe eines Portals" },
        { item: "Stein (vom Weg)", fantasy: "Meteorit, 'Sprechender Stein', Wurfgeschoss" },
        { item: "Stöckchen", fantasy: "Dietrich, Zauberstab, Zeigestab" },
        { item: "Verlorener Knopf", fantasy: "Schildkröten-Panzer, Auge eines Golems, Magischer Siegel" },
        { item: "Rote Ampel", fantasy: "Das Auge des Wächters (Sauron), Kraftfeld-Sperre" },
        { item: "Grüne Ampel", fantasy: "Erlaubnis des Königs, Kraftfeld offen" },
        { item: "Kanaldeckel", fantasy: "Eingang zum Dungeon, Schild des Titanen, Pizza-Lieferung" },
        { item: "Statue", fantasy: "Versteinerter Held, Wächter der Zeit" },
        { item: "Taube", fantasy: "Spion des Zauberers, Bote, Geflügelte Ratte" },
        { item: "Bank", fantasy: "Rastplatz der Abenteurer, Thron" },
        { item: "Laterne", fantasy: "Leuchtfeuer, Bannkreis gegen Schatten" },
        { item: "Mülleimer", fantasy: "Schlund des Nimmersatt, Mimic (Vorsicht!)" },
        { item: "Schaufenster-Puppe", fantasy: "Gefangene Seele, Golem in Stasis" },
        { item: "Bus / Bahn", fantasy: "Eiserner Wurm, Transporter der Gilde" },
        { item: "Fahrrad", fantasy: "Stahlross, Schnelles Reittier" },
        { item: "Zebrastreifen", fantasy: "Magische Brücke, Pfad der Sicherheit" },
        { item: "Wolkenkratzer / Hochhaus", fantasy: "Turm des Magiers, Berg aus Glas" },
        { item: "Baustelle", fantasy: "Chaos-Zone, Werkstatt der Zwerge" },
        { item: "Kran", fantasy: "Gigantischer mechanischer Arm, Drachenhals" },
        { item: "Graffiti", fantasy: "Alte Runen, Zeichen der Rebellen, Höhlenmalerei" },
        { item: "Hund an Leine", fantasy: "Gezähmte Bestie, Begleiter eines anderen Helden" },
        { item: "Verlorener Handschuh", fantasy: "Abgefallene Hand, Geist-Hülle" },
        { item: "Zeitungsbox", fantasy: "Orakel der Neuigkeiten, Kasten der Weisheit" },
        { item: "Springbrunnen", fantasy: "Quelle der Jugend, Wasser-Elementar" },
        { item: "Treppe", fantasy: "Stufen zum Schicksal, Bergpfad" },
        { item: "Schild (Verkehr)", fantasy: "Gesetzestafel, Warnung vor Drachen" },
        { item: "Uhr (öffentlich)", fantasy: "Auge der Zeit, Countdown" },
        { item: "Gitterzaun", fantasy: "Käfigwand, Netz aus Stahl" },
        { item: "Auto (rot)", fantasy: "Feuer-Streitwagen" },
        { item: "Auto (blau)", fantasy: "Wasser-Gleiter" },
        { item: "Regenschirm", fantasy: "Schild gegen den Himmelszorn, Pilz-Ersatz" },
        { item: "Plakatwand", fantasy: "Verkündung des Königs, Fahndungsplakat" },
        { item: "Bäckerei", fantasy: "Versorgungsstation, Quelle des Lebens (Brot)" },
        { item: "Kiosk", fantasy: "Händler der kleinen Schätze, Informationsbörse" },
        { item: "Polizeiauto", fantasy: "Wache der Stadt, Blaue Ritter" },
        { item: "Feuerwehr", fantasy: "Drachenjäger, Wasser-Magier" }
    ],
    quartier: [
        { item: "Katze", fantasy: "Wächter der Straße, Spion der Hexe, Mini-Tiger" },
        { item: "Gartenzwerg", fantasy: "Versteinerter Gnom, Wächter des Vorgartens" },
        { item: "Briefkasten", fantasy: "Maul des Nachrichten-Monsters, Schatzkiste" },
        { item: "Zaun", fantasy: "Barrikade gegen Orks, Grenze zum Nachbarreich" },
        { item: "Blumentopf", fantasy: "Alchemie-Kessel, Helm eines Riesen" },
        { item: "Gießkanne", fantasy: "Regenmacher, Rüssel-Tier" },
        { item: "Fußabtreter", fantasy: "Falle, Willkommens-Rune" },
        { item: "Vogelhaus", fantasy: "Luftschloss, Taverne für Geflügelte" },
        { item: "Garage", fantasy: "Höhle des Metall-Tieres, Waffenkammer" },
        { item: "Fahne", fantasy: "Banner der Burg, Wind-Anzeiger" },
        { item: "Schaukel", fantasy: "Katapult (inaktiv), Pendel der Zeit" },
        { item: "Sandkasten", fantasy: "Wüste der Verdammnis, Ausgrabungsstätte" },
        { item: "Rutsche", fantasy: "Schnellreise-Portal, Drachenzunge" },
        { item: "Trampolin", fantasy: "Sprungfeld zur Wolkenstadt, Netzfalle" },
        { item: "Grill", fantasy: "Schmiedefeuer, Altar der Fleischeslust" },
        { item: "Liegestuhl", fantasy: "Thron der Entspannung" },
        { item: "Hecke", fantasy: "Labyrinth-Wand, Versteck" },
        { item: "Mülltonne", fantasy: "Goblinstadt-Eingang, Rumpelkammer" },
        { item: "Fahrradklingel", fantasy: "Alarm-Glocke, Schall-Waffe" },
        { item: "Kreidezeichnung", fantasy: "Magische Bannkreis, Portal-Markierung" },
        { item: "Paketbote", fantasy: "Königlicher Kurier, Lieferant seltener Artefakte" },
        { item: "Nachbar", fantasy: "Dorfbewohner, NPC (Questgeber?)" },
        { item: "Hundebellen", fantasy: "Warnruf der Bestien, Alarmsirene" },
        { item: "Rasenmäher", fantasy: "Gras-Fresser, Lärm-Monster" },
        { item: "Solarleuchte", fantasy: "Licht-Samen, Stern am Boden" },
        { item: "Skateboard/Roller", fantasy: "Boden-Gleiter, Schneller Schuh" },
        { item: "Hupfspiel (Kreide)", fantasy: "Ritual-Muster, Pfad der Prüfung" },
        { item: "Fußballtor (klein)", fantasy: "Netz des Fängers, Tor zur Arena" },
        { item: "Basketballkorb", fantasy: "Ring des Feuers, Hohes Ziel" },
        { item: "Vogeltränke", fantasy: "See der Zwerge, Heilquelle" },
        { item: "Insektenhotel", fantasy: "Kaserne der Flug-Einheit, Mehrfamilienhaus" },
        { item: "Windrad", fantasy: "Energie-Sammler, Hypnose-Gerät" },
        { item: "Wohnwagen", fantasy: "Mobiles Haus, Wagen des fahrenden Händlers" },
        { item: "Anhänger", fantasy: "Lastesel, Kiste auf Rädern" },
        { item: "Komposthaufen", fantasy: "Alchemie-Labor (lange Gärung), Hügel der Würmer" },
        { item: "Wäscheleine", fantasy: "Fahnenschmuck, Geister-Parade" },
        { item: "Garage offen", fantasy: "Maul der Höhle, Einladung zum Plündern" },
        { item: "Doppel-Mülltonne", fantasy: "Zwillingstürme des Abfalls, Wächter der Gasse" },
        { item: "Rosenbogen", fantasy: "Pforte der Dornen, Portal der Liebe" },
        { item: "Gartenhaus", fantasy: "Hütte des Eremiten, Geheimversteck" }
    ],
    altstadt: [
        { item: "Kopfsteinpflaster", fantasy: "Rücken des Drachen, Schuppenpanzer am Boden" },
        { item: "Brunnen", fantasy: "Quelle der Weisheit, Portal in die Tiefe" },
        { item: "Kirchturm", fantasy: "Aussichtspost der Greifenreiter, Magierturm" },
        { item: "Glockenschlag", fantasy: "Stimme der Titanen, Zeit-Signal" },
        { item: "Enger Gasse", fantasy: "Schlucht der Schatten, Diebespfad" },
        { item: "Altes Schild (Wirtshaus)", fantasy: "Wappen einer Gilde, Hängendes Orakel" },
        { item: "Fachwerkhaus", fantasy: "Haus der Holzwürmer, Skelett-Haus" },
        { item: "Tor / Bogen", fantasy: "Portal in eine andere Zeit, Drachenmaul" },
        { item: "Statue (historisch)", fantasy: "Versteinerter König, Gedenkstätte" },
        { item: "Mauer", fantasy: "Festungswall, Grenze der Zivilisation" },
        { item: "Fensterladen", fantasy: "Augenlid des Hauses, Schild" },
        { item: "Blumenkasten", fantasy: "Hängende Gärten, Lebensspender" },
        { item: "Laterne (alt)", fantasy: "Gaslicht, Irrlicht-Käfig" },
        { item: "Wappen", fantasy: "Geheimcode, Familien-Siegel" },
        { item: "Schweres Holztor", fantasy: "Dungeon-Eingang, Riesen-Tür" },
        { item: "Turmuhr", fantasy: "Auge des Chronos, Schicksalsrad" },
        { item: "Wasserspeier", fantasy: "Versteinerter Dämon, Wächter" },
        { item: "Marktplatz", fantasy: "Versammlungsort, Arena" },
        { item: "Rathaus", fantasy: "Palast des Herrschers, Gildenhaus" },
        { item: "Bäckerei (Duft)", fantasy: "Alchemie-Labor (Heiltränke/Brot)" },
        { item: "Buchladen", fantasy: "Bibliothek des Wissens, Schriftrollen-Lager" },
        { item: "Antiquitäten", fantasy: "Laden der verfluchten Gegenstände, Schatzkammer" },
        { item: "Taube auf Dach", fantasy: "Wächter, Spion" },
        { item: "Efeu an Wand", fantasy: "Grüner Bart, Natur-Rüstung" },
        { item: "Kellerfenster", fantasy: "Blick in den Kerker, Versteck" },
        { item: "Torbogen", fantasy: "Portal der Helden, Mund der Stadt" },
        { item: "Mittelalterliches Zelt", fantasy: "Feldlager der Armee, Händler-Stand" },
        { item: "Schmiedeeisernes Gitter", fantasy: "Netz aus Stahl, Gefängniswand" },
        { item: "Sonnenuhr", fantasy: "Schatten-Zeiger, Antiker Computer" },
        { item: "Wappen am Haus", fantasy: "Zeichen des Schutzes, Magische Rune" },
        { item: "Ritter-Figur", fantasy: "Golemwächter, Rüstung ohne Geist" },
        { item: "Burggraben (Rest)", fantasy: "Alter Fluss, Sumpf der Erinnerung" },
        { item: "Stadtmauer-Turm", fantasy: "Ausguck, Sniper-Nest" },
        { item: "Kleine Pforte", fantasy: "Hobbit-Eingang, Diebe-Einstieg" },
        { item: "Zunftzeichen (Brezl/Schere)", fantasy: "Goldenes Idol, Zeichen der Macht" },
        { item: "Messing-Klingel", fantasy: "Rufknopf für Diener, Goldener Knopf" },
        { item: "Buntglas-Fenster", fantasy: "Kaleidoskop-Schild, Heiliges Licht" },
        { item: "Fahne am Turm", fantasy: "Signal an die Drachenreiter, Stolz der Stadt" },
        { item: "Museum", fantasy: "Halle der Ahnen, Speicher des Wissens" },
        { item: "Eisdiele", fantasy: "Tempel des Frosts, Süße Verführung" }
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
