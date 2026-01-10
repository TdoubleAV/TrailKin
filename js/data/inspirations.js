/**
 * @fileoverview Static data for environment items and character backgrounds.
 * Used by quest and character generators.
 * Refactored to use i18n keys instead of hardcoded strings.
 */

/**
 * @typedef {Object} InspirationItem
 * @property {string} id - Unique identifier (slug)
 * @property {string} itemKey - Translation key for real-world item name
 * @property {string} fantasyKey - Translation key for fantasy item names
 */

/**
 * Inspiration data organized by environment
 * @type {Object.<string, InspirationItem[]>}
 */
export const inspirationData = {
    wald: [
        { id: "spitzer_stein", itemKey: "inspiration.data.wald.spitzer_stein.item", fantasyKey: "inspiration.data.wald.spitzer_stein.fantasy" },
        { id: "runder_kiesel", itemKey: "inspiration.data.wald.runder_kiesel.item", fantasyKey: "inspiration.data.wald.runder_kiesel.fantasy" },
        { id: "ast_klein", itemKey: "inspiration.data.wald.ast_klein.item", fantasyKey: "inspiration.data.wald.ast_klein.fantasy" },
        { id: "tannenzapfen", itemKey: "inspiration.data.wald.tannenzapfen.item", fantasyKey: "inspiration.data.wald.tannenzapfen.fantasy" },
        { id: "eichel", itemKey: "inspiration.data.wald.eichel.item", fantasyKey: "inspiration.data.wald.eichel.fantasy" },
        { id: "moos", itemKey: "inspiration.data.wald.moos.item", fantasyKey: "inspiration.data.wald.moos.fantasy" },
        { id: "feder", itemKey: "inspiration.data.wald.feder.item", fantasyKey: "inspiration.data.wald.feder.fantasy" },
        { id: "blatt_besonders", itemKey: "inspiration.data.wald.blatt_besonders.item", fantasyKey: "inspiration.data.wald.blatt_besonders.fantasy" },
        { id: "rinde", itemKey: "inspiration.data.wald.rinde.item", fantasyKey: "inspiration.data.wald.rinde.fantasy" },
        { id: "blume", itemKey: "inspiration.data.wald.blume.item", fantasyKey: "inspiration.data.wald.blume.fantasy" },
        { id: "wurzel", itemKey: "inspiration.data.wald.wurzel.item", fantasyKey: "inspiration.data.wald.wurzel.fantasy" },
        { id: "erde_sand", itemKey: "inspiration.data.wald.erde_sand.item", fantasyKey: "inspiration.data.wald.erde_sand.fantasy" },
        { id: "baumstumpf", itemKey: "inspiration.data.wald.baumstumpf.item", fantasyKey: "inspiration.data.wald.baumstumpf.fantasy" },
        { id: "pilz", itemKey: "inspiration.data.wald.pilz.item", fantasyKey: "inspiration.data.wald.pilz.fantasy" },
        { id: "ameise", itemKey: "inspiration.data.wald.ameise.item", fantasyKey: "inspiration.data.wald.ameise.fantasy" },
        { id: "spinnennetz", itemKey: "inspiration.data.wald.spinnennetz.item", fantasyKey: "inspiration.data.wald.spinnennetz.fantasy" },
        { id: "hohler_baum", itemKey: "inspiration.data.wald.hohler_baum.item", fantasyKey: "inspiration.data.wald.hohler_baum.fantasy" },
        { id: "kleeblatt", itemKey: "inspiration.data.wald.kleeblatt.item", fantasyKey: "inspiration.data.wald.kleeblatt.fantasy" },
        { id: "farn", itemKey: "inspiration.data.wald.farn.item", fantasyKey: "inspiration.data.wald.farn.fantasy" },
        { id: "kaefer", itemKey: "inspiration.data.wald.kaefer.item", fantasyKey: "inspiration.data.wald.kaefer.fantasy" },
        { id: "vogelgesang", itemKey: "inspiration.data.wald.vogelgesang.item", fantasyKey: "inspiration.data.wald.vogelgesang.fantasy" },
        { id: "sonnenstrahl", itemKey: "inspiration.data.wald.sonnenstrahl.item", fantasyKey: "inspiration.data.wald.sonnenstrahl.fantasy" },
        { id: "bach", itemKey: "inspiration.data.wald.bach.item", fantasyKey: "inspiration.data.wald.bach.fantasy" },
        { id: "grosser_stein", itemKey: "inspiration.data.wald.grosser_stein.item", fantasyKey: "inspiration.data.wald.grosser_stein.fantasy" },
        { id: "beere", itemKey: "inspiration.data.wald.beere.item", fantasyKey: "inspiration.data.wald.beere.fantasy" },
        { id: "loewenzahn", itemKey: "inspiration.data.wald.loewenzahn.item", fantasyKey: "inspiration.data.wald.loewenzahn.fantasy" },
        { id: "schneckenhaus", itemKey: "inspiration.data.wald.schneckenhaus.item", fantasyKey: "inspiration.data.wald.schneckenhaus.fantasy" },
        { id: "harz", itemKey: "inspiration.data.wald.harz.item", fantasyKey: "inspiration.data.wald.harz.fantasy" },
        { id: "vogelnest", itemKey: "inspiration.data.wald.vogelnest.item", fantasyKey: "inspiration.data.wald.vogelnest.fantasy" },
        { id: "baum_umgestuerzt", itemKey: "inspiration.data.wald.baum_umgestuerzt.item", fantasyKey: "inspiration.data.wald.baum_umgestuerzt.fantasy" },
        { id: "wildspur", itemKey: "inspiration.data.wald.wildspur.item", fantasyKey: "inspiration.data.wald.wildspur.fantasy" },
        { id: "holzscheit", itemKey: "inspiration.data.wald.holzscheit.item", fantasyKey: "inspiration.data.wald.holzscheit.fantasy" },
        { id: "nadeln", itemKey: "inspiration.data.wald.nadeln.item", fantasyKey: "inspiration.data.wald.nadeln.fantasy" },
        { id: "kletterpflanze", itemKey: "inspiration.data.wald.kletterpflanze.item", fantasyKey: "inspiration.data.wald.kletterpflanze.fantasy" },
        { id: "blatt_haufen", itemKey: "inspiration.data.wald.blatt_haufen.item", fantasyKey: "inspiration.data.wald.blatt_haufen.fantasy" },
        { id: "knospe", itemKey: "inspiration.data.wald.knospe.item", fantasyKey: "inspiration.data.wald.knospe.fantasy" },
        { id: "biene", itemKey: "inspiration.data.wald.biene.item", fantasyKey: "inspiration.data.wald.biene.fantasy" },
        { id: "schmetterling", itemKey: "inspiration.data.wald.schmetterling.item", fantasyKey: "inspiration.data.wald.schmetterling.fantasy" },
        { id: "gluehwuermchen", itemKey: "inspiration.data.wald.gluehwuermchen.item", fantasyKey: "inspiration.data.wald.gluehwuermchen.fantasy" },
        { id: "grashuepfer", itemKey: "inspiration.data.wald.grashuepfer.item", fantasyKey: "inspiration.data.wald.grashuepfer.fantasy" },
        { id: "blatt_bunt", itemKey: "inspiration.data.wald.blatt_bunt.item", fantasyKey: "inspiration.data.wald.blatt_bunt.fantasy" },
        { id: "nuss", itemKey: "inspiration.data.wald.nuss.item", fantasyKey: "inspiration.data.wald.nuss.fantasy" },
        { id: "kuerbis", itemKey: "inspiration.data.wald.kuerbis.item", fantasyKey: "inspiration.data.wald.kuerbis.fantasy" },
        { id: "eiszapfen", itemKey: "inspiration.data.wald.eiszapfen.item", fantasyKey: "inspiration.data.wald.eiszapfen.fantasy" },
        { id: "spur_schnee", itemKey: "inspiration.data.wald.spur_schnee.item", fantasyKey: "inspiration.data.wald.spur_schnee.fantasy" },
        { id: "ast_kahl", itemKey: "inspiration.data.wald.ast_kahl.item", fantasyKey: "inspiration.data.wald.ast_kahl.fantasy" },
        { id: "raureif", itemKey: "inspiration.data.wald.raureif.item", fantasyKey: "inspiration.data.wald.raureif.fantasy" },
        { id: "stechpalme", itemKey: "inspiration.data.wald.stechpalme.item", fantasyKey: "inspiration.data.wald.stechpalme.fantasy" }
    ],
    stadt: [
        { id: "muenze", itemKey: "inspiration.data.stadt.muenze.item", fantasyKey: "inspiration.data.stadt.muenze.fantasy" },
        { id: "kronkorken", itemKey: "inspiration.data.stadt.kronkorken.item", fantasyKey: "inspiration.data.stadt.kronkorken.fantasy" },
        { id: "gummiband", itemKey: "inspiration.data.stadt.gummiband.item", fantasyKey: "inspiration.data.stadt.gummiband.fantasy" },
        { id: "schnur", itemKey: "inspiration.data.stadt.schnur.item", fantasyKey: "inspiration.data.stadt.schnur.fantasy" },
        { id: "glitzerpapier", itemKey: "inspiration.data.stadt.glitzerpapier.item", fantasyKey: "inspiration.data.stadt.glitzerpapier.fantasy" },
        { id: "stein_weg", itemKey: "inspiration.data.stadt.stein_weg.item", fantasyKey: "inspiration.data.stadt.stein_weg.fantasy" },
        { id: "stoeckchen", itemKey: "inspiration.data.stadt.stoeckchen.item", fantasyKey: "inspiration.data.stadt.stoeckchen.fantasy" },
        { id: "knopf", itemKey: "inspiration.data.stadt.knopf.item", fantasyKey: "inspiration.data.stadt.knopf.fantasy" },
        { id: "ampel_rot", itemKey: "inspiration.data.stadt.ampel_rot.item", fantasyKey: "inspiration.data.stadt.ampel_rot.fantasy" },
        { id: "ampel_gruen", itemKey: "inspiration.data.stadt.ampel_gruen.item", fantasyKey: "inspiration.data.stadt.ampel_gruen.fantasy" },
        { id: "kanaldeckel", itemKey: "inspiration.data.stadt.kanaldeckel.item", fantasyKey: "inspiration.data.stadt.kanaldeckel.fantasy" },
        { id: "statue", itemKey: "inspiration.data.stadt.statue.item", fantasyKey: "inspiration.data.stadt.statue.fantasy" },
        { id: "taube", itemKey: "inspiration.data.stadt.taube.item", fantasyKey: "inspiration.data.stadt.taube.fantasy" },
        { id: "bank", itemKey: "inspiration.data.stadt.bank.item", fantasyKey: "inspiration.data.stadt.bank.fantasy" },
        { id: "laterne", itemKey: "inspiration.data.stadt.laterne.item", fantasyKey: "inspiration.data.stadt.laterne.fantasy" },
        { id: "muelleimer", itemKey: "inspiration.data.stadt.muelleimer.item", fantasyKey: "inspiration.data.stadt.muelleimer.fantasy" },
        { id: "schaufensterpuppe", itemKey: "inspiration.data.stadt.schaufensterpuppe.item", fantasyKey: "inspiration.data.stadt.schaufensterpuppe.fantasy" },
        { id: "bus_bahn", itemKey: "inspiration.data.stadt.bus_bahn.item", fantasyKey: "inspiration.data.stadt.bus_bahn.fantasy" },
        { id: "fahrrad", itemKey: "inspiration.data.stadt.fahrrad.item", fantasyKey: "inspiration.data.stadt.fahrrad.fantasy" },
        { id: "zebrastreifen", itemKey: "inspiration.data.stadt.zebrastreifen.item", fantasyKey: "inspiration.data.stadt.zebrastreifen.fantasy" },
        { id: "hochhaus", itemKey: "inspiration.data.stadt.hochhaus.item", fantasyKey: "inspiration.data.stadt.hochhaus.fantasy" },
        { id: "baustelle", itemKey: "inspiration.data.stadt.baustelle.item", fantasyKey: "inspiration.data.stadt.baustelle.fantasy" },
        { id: "kran", itemKey: "inspiration.data.stadt.kran.item", fantasyKey: "inspiration.data.stadt.kran.fantasy" },
        { id: "graffiti", itemKey: "inspiration.data.stadt.graffiti.item", fantasyKey: "inspiration.data.stadt.graffiti.fantasy" },
        { id: "hund", itemKey: "inspiration.data.stadt.hund.item", fantasyKey: "inspiration.data.stadt.hund.fantasy" },
        { id: "handschuh", itemKey: "inspiration.data.stadt.handschuh.item", fantasyKey: "inspiration.data.stadt.handschuh.fantasy" },
        { id: "zeitungsbox", itemKey: "inspiration.data.stadt.zeitungsbox.item", fantasyKey: "inspiration.data.stadt.zeitungsbox.fantasy" },
        { id: "springbrunnen", itemKey: "inspiration.data.stadt.springbrunnen.item", fantasyKey: "inspiration.data.stadt.springbrunnen.fantasy" },
        { id: "treppe", itemKey: "inspiration.data.stadt.treppe.item", fantasyKey: "inspiration.data.stadt.treppe.fantasy" },
        { id: "schild_verkehr", itemKey: "inspiration.data.stadt.schild_verkehr.item", fantasyKey: "inspiration.data.stadt.schild_verkehr.fantasy" },
        { id: "uhr", itemKey: "inspiration.data.stadt.uhr.item", fantasyKey: "inspiration.data.stadt.uhr.fantasy" },
        { id: "gitterzaun", itemKey: "inspiration.data.stadt.gitterzaun.item", fantasyKey: "inspiration.data.stadt.gitterzaun.fantasy" },
        { id: "auto_rot", itemKey: "inspiration.data.stadt.auto_rot.item", fantasyKey: "inspiration.data.stadt.auto_rot.fantasy" },
        { id: "auto_blau", itemKey: "inspiration.data.stadt.auto_blau.item", fantasyKey: "inspiration.data.stadt.auto_blau.fantasy" },
        { id: "regenschirm", itemKey: "inspiration.data.stadt.regenschirm.item", fantasyKey: "inspiration.data.stadt.regenschirm.fantasy" },
        { id: "plakatwand", itemKey: "inspiration.data.stadt.plakatwand.item", fantasyKey: "inspiration.data.stadt.plakatwand.fantasy" },
        { id: "baeckerei", itemKey: "inspiration.data.stadt.baeckerei.item", fantasyKey: "inspiration.data.stadt.baeckerei.fantasy" },
        { id: "kiosk", itemKey: "inspiration.data.stadt.kiosk.item", fantasyKey: "inspiration.data.stadt.kiosk.fantasy" },
        { id: "polizeiauto", itemKey: "inspiration.data.stadt.polizeiauto.item", fantasyKey: "inspiration.data.stadt.polizeiauto.fantasy" },
        { id: "feuerwehr", itemKey: "inspiration.data.stadt.feuerwehr.item", fantasyKey: "inspiration.data.stadt.feuerwehr.fantasy" }
    ],
    quartier: [
        { id: "katze", itemKey: "inspiration.data.quartier.katze.item", fantasyKey: "inspiration.data.quartier.katze.fantasy" },
        { id: "gartenzwerg", itemKey: "inspiration.data.quartier.gartenzwerg.item", fantasyKey: "inspiration.data.quartier.gartenzwerg.fantasy" },
        { id: "briefkasten", itemKey: "inspiration.data.quartier.briefkasten.item", fantasyKey: "inspiration.data.quartier.briefkasten.fantasy" },
        { id: "zaun", itemKey: "inspiration.data.quartier.zaun.item", fantasyKey: "inspiration.data.quartier.zaun.fantasy" },
        { id: "blumentopf", itemKey: "inspiration.data.quartier.blumentopf.item", fantasyKey: "inspiration.data.quartier.blumentopf.fantasy" },
        { id: "giesskanne", itemKey: "inspiration.data.quartier.giesskanne.item", fantasyKey: "inspiration.data.quartier.giesskanne.fantasy" },
        { id: "fussabtreter", itemKey: "inspiration.data.quartier.fussabtreter.item", fantasyKey: "inspiration.data.quartier.fussabtreter.fantasy" },
        { id: "vogelhaus", itemKey: "inspiration.data.quartier.vogelhaus.item", fantasyKey: "inspiration.data.quartier.vogelhaus.fantasy" },
        { id: "garage", itemKey: "inspiration.data.quartier.garage.item", fantasyKey: "inspiration.data.quartier.garage.fantasy" },
        { id: "fahne", itemKey: "inspiration.data.quartier.fahne.item", fantasyKey: "inspiration.data.quartier.fahne.fantasy" },
        { id: "schaukel", itemKey: "inspiration.data.quartier.schaukel.item", fantasyKey: "inspiration.data.quartier.schaukel.fantasy" },
        { id: "sandkasten", itemKey: "inspiration.data.quartier.sandkasten.item", fantasyKey: "inspiration.data.quartier.sandkasten.fantasy" },
        { id: "rutsche", itemKey: "inspiration.data.quartier.rutsche.item", fantasyKey: "inspiration.data.quartier.rutsche.fantasy" },
        { id: "trampolin", itemKey: "inspiration.data.quartier.trampolin.item", fantasyKey: "inspiration.data.quartier.trampolin.fantasy" },
        { id: "grill", itemKey: "inspiration.data.quartier.grill.item", fantasyKey: "inspiration.data.quartier.grill.fantasy" },
        { id: "liegestuhl", itemKey: "inspiration.data.quartier.liegestuhl.item", fantasyKey: "inspiration.data.quartier.liegestuhl.fantasy" },
        { id: "hecke", itemKey: "inspiration.data.quartier.hecke.item", fantasyKey: "inspiration.data.quartier.hecke.fantasy" },
        { id: "muelltonne", itemKey: "inspiration.data.quartier.muelltonne.item", fantasyKey: "inspiration.data.quartier.muelltonne.fantasy" },
        { id: "fahrradklingel", itemKey: "inspiration.data.quartier.fahrradklingel.item", fantasyKey: "inspiration.data.quartier.fahrradklingel.fantasy" },
        { id: "kreide", itemKey: "inspiration.data.quartier.kreide.item", fantasyKey: "inspiration.data.quartier.kreide.fantasy" },
        { id: "paketbote", itemKey: "inspiration.data.quartier.paketbote.item", fantasyKey: "inspiration.data.quartier.paketbote.fantasy" },
        { id: "nachbar", itemKey: "inspiration.data.quartier.nachbar.item", fantasyKey: "inspiration.data.quartier.nachbar.fantasy" },
        { id: "hundebellen", itemKey: "inspiration.data.quartier.hundebellen.item", fantasyKey: "inspiration.data.quartier.hundebellen.fantasy" },
        { id: "rasenmaeher", itemKey: "inspiration.data.quartier.rasenmaeher.item", fantasyKey: "inspiration.data.quartier.rasenmaeher.fantasy" },
        { id: "solarleuchte", itemKey: "inspiration.data.quartier.solarleuchte.item", fantasyKey: "inspiration.data.quartier.solarleuchte.fantasy" },
        { id: "skateboard", itemKey: "inspiration.data.quartier.skateboard.item", fantasyKey: "inspiration.data.quartier.skateboard.fantasy" },
        { id: "hupfspiel", itemKey: "inspiration.data.quartier.hupfspiel.item", fantasyKey: "inspiration.data.quartier.hupfspiel.fantasy" },
        { id: "fussballtor", itemKey: "inspiration.data.quartier.fussballtor.item", fantasyKey: "inspiration.data.quartier.fussballtor.fantasy" },
        { id: "basketballkorb", itemKey: "inspiration.data.quartier.basketballkorb.item", fantasyKey: "inspiration.data.quartier.basketballkorb.fantasy" },
        { id: "vogeltränke", itemKey: "inspiration.data.quartier.vogeltränke.item", fantasyKey: "inspiration.data.quartier.vogeltränke.fantasy" },
        { id: "insektenhotel", itemKey: "inspiration.data.quartier.insektenhotel.item", fantasyKey: "inspiration.data.quartier.insektenhotel.fantasy" },
        { id: "windrad", itemKey: "inspiration.data.quartier.windrad.item", fantasyKey: "inspiration.data.quartier.windrad.fantasy" },
        { id: "wohnwagen", itemKey: "inspiration.data.quartier.wohnwagen.item", fantasyKey: "inspiration.data.quartier.wohnwagen.fantasy" },
        { id: "anhaenger", itemKey: "inspiration.data.quartier.anhaenger.item", fantasyKey: "inspiration.data.quartier.anhaenger.fantasy" },
        { id: "kompost", itemKey: "inspiration.data.quartier.kompost.item", fantasyKey: "inspiration.data.quartier.kompost.fantasy" },
        { id: "waescheleine", itemKey: "inspiration.data.quartier.waescheleine.item", fantasyKey: "inspiration.data.quartier.waescheleine.fantasy" },
        { id: "garage_offen", itemKey: "inspiration.data.quartier.garage_offen.item", fantasyKey: "inspiration.data.quartier.garage_offen.fantasy" },
        { id: "doppel_muell", itemKey: "inspiration.data.quartier.doppel_muell.item", fantasyKey: "inspiration.data.quartier.doppel_muell.fantasy" },
        { id: "rosenbogen", itemKey: "inspiration.data.quartier.rosenbogen.item", fantasyKey: "inspiration.data.quartier.rosenbogen.fantasy" },
        { id: "gartenhaus", itemKey: "inspiration.data.quartier.gartenhaus.item", fantasyKey: "inspiration.data.quartier.gartenhaus.fantasy" }
    ],
    altstadt: [
        { id: "kopfsteinpflaster", itemKey: "inspiration.data.altstadt.kopfsteinpflaster.item", fantasyKey: "inspiration.data.altstadt.kopfsteinpflaster.fantasy" },
        { id: "brunnen", itemKey: "inspiration.data.altstadt.brunnen.item", fantasyKey: "inspiration.data.altstadt.brunnen.fantasy" },
        { id: "kirchturm", itemKey: "inspiration.data.altstadt.kirchturm.item", fantasyKey: "inspiration.data.altstadt.kirchturm.fantasy" },
        { id: "glockenschlag", itemKey: "inspiration.data.altstadt.glockenschlag.item", fantasyKey: "inspiration.data.altstadt.glockenschlag.fantasy" },
        { id: "gasse_eng", itemKey: "inspiration.data.altstadt.gasse_eng.item", fantasyKey: "inspiration.data.altstadt.gasse_eng.fantasy" },
        { id: "schild_alt", itemKey: "inspiration.data.altstadt.schild_alt.item", fantasyKey: "inspiration.data.altstadt.schild_alt.fantasy" },
        { id: "fachwerkhaus", itemKey: "inspiration.data.altstadt.fachwerkhaus.item", fantasyKey: "inspiration.data.altstadt.fachwerkhaus.fantasy" },
        { id: "tor_bogen", itemKey: "inspiration.data.altstadt.tor_bogen.item", fantasyKey: "inspiration.data.altstadt.tor_bogen.fantasy" },
        { id: "statue_hist", itemKey: "inspiration.data.altstadt.statue_hist.item", fantasyKey: "inspiration.data.altstadt.statue_hist.fantasy" },
        { id: "mauer", itemKey: "inspiration.data.altstadt.mauer.item", fantasyKey: "inspiration.data.altstadt.mauer.fantasy" },
        { id: "fensterladen", itemKey: "inspiration.data.altstadt.fensterladen.item", fantasyKey: "inspiration.data.altstadt.fensterladen.fantasy" },
        { id: "blumenkasten", itemKey: "inspiration.data.altstadt.blumenkasten.item", fantasyKey: "inspiration.data.altstadt.blumenkasten.fantasy" },
        { id: "laterne_alt", itemKey: "inspiration.data.altstadt.laterne_alt.item", fantasyKey: "inspiration.data.altstadt.laterne_alt.fantasy" },
        { id: "wappen", itemKey: "inspiration.data.altstadt.wappen.item", fantasyKey: "inspiration.data.altstadt.wappen.fantasy" },
        { id: "holztor", itemKey: "inspiration.data.altstadt.holztor.item", fantasyKey: "inspiration.data.altstadt.holztor.fantasy" },
        { id: "turmuhr", itemKey: "inspiration.data.altstadt.turmuhr.item", fantasyKey: "inspiration.data.altstadt.turmuhr.fantasy" },
        { id: "wasserspeier", itemKey: "inspiration.data.altstadt.wasserspeier.item", fantasyKey: "inspiration.data.altstadt.wasserspeier.fantasy" },
        { id: "marktplatz", itemKey: "inspiration.data.altstadt.marktplatz.item", fantasyKey: "inspiration.data.altstadt.marktplatz.fantasy" },
        { id: "rathaus", itemKey: "inspiration.data.altstadt.rathaus.item", fantasyKey: "inspiration.data.altstadt.rathaus.fantasy" },
        { id: "baeckerei_duft", itemKey: "inspiration.data.altstadt.baeckerei_duft.item", fantasyKey: "inspiration.data.altstadt.baeckerei_duft.fantasy" },
        { id: "buchladen", itemKey: "inspiration.data.altstadt.buchladen.item", fantasyKey: "inspiration.data.altstadt.buchladen.fantasy" },
        { id: "antiquitaeten", itemKey: "inspiration.data.altstadt.antiquitaeten.item", fantasyKey: "inspiration.data.altstadt.antiquitaeten.fantasy" },
        { id: "taube_dach", itemKey: "inspiration.data.altstadt.taube_dach.item", fantasyKey: "inspiration.data.altstadt.taube_dach.fantasy" },
        { id: "efeu", itemKey: "inspiration.data.altstadt.efeu.item", fantasyKey: "inspiration.data.altstadt.efeu.fantasy" },
        { id: "kellerfenster", itemKey: "inspiration.data.altstadt.kellerfenster.item", fantasyKey: "inspiration.data.altstadt.kellerfenster.fantasy" },
        { id: "torbogen", itemKey: "inspiration.data.altstadt.torbogen.item", fantasyKey: "inspiration.data.altstadt.torbogen.fantasy" },
        { id: "zelt_ma", itemKey: "inspiration.data.altstadt.zelt_ma.item", fantasyKey: "inspiration.data.altstadt.zelt_ma.fantasy" },
        { id: "gitter_schmied", itemKey: "inspiration.data.altstadt.gitter_schmied.item", fantasyKey: "inspiration.data.altstadt.gitter_schmied.fantasy" },
        { id: "sonnenuhr", itemKey: "inspiration.data.altstadt.sonnenuhr.item", fantasyKey: "inspiration.data.altstadt.sonnenuhr.fantasy" },
        { id: "wappen_haus", itemKey: "inspiration.data.altstadt.wappen_haus.item", fantasyKey: "inspiration.data.altstadt.wappen_haus.fantasy" },
        { id: "ritter", itemKey: "inspiration.data.altstadt.ritter.item", fantasyKey: "inspiration.data.altstadt.ritter.fantasy" },
        { id: "burggraben", itemKey: "inspiration.data.altstadt.burggraben.item", fantasyKey: "inspiration.data.altstadt.burggraben.fantasy" },
        { id: "stadtmauer_turm", itemKey: "inspiration.data.altstadt.stadtmauer_turm.item", fantasyKey: "inspiration.data.altstadt.stadtmauer_turm.fantasy" },
        { id: "pforte_klein", itemKey: "inspiration.data.altstadt.pforte_klein.item", fantasyKey: "inspiration.data.altstadt.pforte_klein.fantasy" },
        { id: "zunftzeichen", itemKey: "inspiration.data.altstadt.zunftzeichen.item", fantasyKey: "inspiration.data.altstadt.zunftzeichen.fantasy" },
        { id: "klingel_messing", itemKey: "inspiration.data.altstadt.klingel_messing.item", fantasyKey: "inspiration.data.altstadt.klingel_messing.fantasy" },
        { id: "buntglas", itemKey: "inspiration.data.altstadt.buntglas.item", fantasyKey: "inspiration.data.altstadt.buntglas.fantasy" },
        { id: "fahne_turm", itemKey: "inspiration.data.altstadt.fahne_turm.item", fantasyKey: "inspiration.data.altstadt.fahne_turm.fantasy" },
        { id: "museum", itemKey: "inspiration.data.altstadt.museum.item", fantasyKey: "inspiration.data.altstadt.museum.fantasy" },
        { id: "eisdiele", itemKey: "inspiration.data.altstadt.eisdiele.item", fantasyKey: "inspiration.data.altstadt.eisdiele.fantasy" }
    ]
};

/**
 * @typedef {Object} CharacterBackground
 * @property {string} id - Unique identifier (slug)
 * @property {string} nameKey - Translation key for background name
 * @property {string} itemKey - Translation key for starting item
 */

/**
 * Available character backgrounds with starting items
 * Uses i18n key references for multilingual support
 * @type {CharacterBackground[]}
 */
export const characterBackgrounds = [
    { id: "waldlaeufer", nameKey: "characterBackgrounds.waldlaeufer.name", itemKey: "characterBackgrounds.waldlaeufer.item" },
    { id: "kraeuterkundiger", nameKey: "characterBackgrounds.kraeuterkundiger.name", itemKey: "characterBackgrounds.kraeuterkundiger.item" },
    { id: "dieb", nameKey: "characterBackgrounds.dieb.name", itemKey: "characterBackgrounds.dieb.item" },
    { id: "ritter", nameKey: "characterBackgrounds.ritter.name", itemKey: "characterBackgrounds.ritter.item" },
    { id: "magier", nameKey: "characterBackgrounds.magier.name", itemKey: "characterBackgrounds.magier.item" },
    { id: "barde", nameKey: "characterBackgrounds.barde.name", itemKey: "characterBackgrounds.barde.item" },
    { id: "haendler", nameKey: "characterBackgrounds.haendler.name", itemKey: "characterBackgrounds.haendler.item" },
    { id: "schmied", nameKey: "characterBackgrounds.schmied.name", itemKey: "characterBackgrounds.schmied.item" },
    { id: "gaukler", nameKey: "characterBackgrounds.gaukler.name", itemKey: "characterBackgrounds.gaukler.item" },
    { id: "alchemist", nameKey: "characterBackgrounds.alchemist.name", itemKey: "characterBackgrounds.alchemist.item" },
    { id: "bestienjaeger", nameKey: "characterBackgrounds.bestienjaeger.name", itemKey: "characterBackgrounds.bestienjaeger.item" },
    { id: "entdecker", nameKey: "characterBackgrounds.entdecker.name", itemKey: "characterBackgrounds.entdecker.item" }
];
