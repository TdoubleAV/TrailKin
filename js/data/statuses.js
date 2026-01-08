/**
 * @fileoverview Status effects data for Trailkin
 * Exported as a JavaScript module for browser compatibility
 */

export const statusesData = {
    statuses: [
        {
            id: "itchy",
            name: "Juckreiz",
            emoji: "🌿",
            effect: "Hüpfe auf einem Bein",
            cure: "Finde ein Heilblatt (Gänseblümchen)",
            type: "negative"
        },
        {
            id: "strong",
            name: "Stark",
            emoji: "💪",
            effect: "Nächste Probe gelingt automatisch",
            cure: "Verbraucht sich nach einer Probe",
            type: "positive"
        },
        {
            id: "invisible",
            name: "Unsichtbar",
            emoji: "👻",
            effect: "Du darfst 2 Min nicht sprechen",
            cure: "Zeit läuft ab",
            type: "neutral"
        },
        {
            id: "cursed",
            name: "Verflucht",
            emoji: "💀",
            effect: "Verliere alle Unentschieden-Proben",
            cure: "Finde einen besonderen Stein",
            type: "negative"
        },
        {
            id: "lucky",
            name: "Glückskind",
            emoji: "🍀",
            effect: "Gewinne alle Unentschieden-Proben",
            cure: "Verbraucht sich nach einer Probe",
            type: "positive"
        },
        {
            id: "tired",
            name: "Müde",
            emoji: "😴",
            effect: "Renne 10 Schritte zur Erholung",
            cure: "Bewegungs-Aktion ausführen",
            type: "negative"
        },
        {
            id: "brave",
            name: "Mutig",
            emoji: "🦁",
            effect: "+1 Mut für die nächste Aktion",
            cure: "Verbraucht sich nach einer Aktion",
            type: "positive"
        },
        {
            id: "wet",
            name: "Pitschnass",
            emoji: "💧",
            effect: "Schüttle dich wie ein Hund",
            cure: "Aktion ausführen",
            type: "negative"
        }
    ]
};
