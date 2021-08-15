// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: mafiac.js
// DESC: Provides natives for Mafia Connected
// TYPE: Client (JavaScript)
// ===========================================================================

function setUpInitialGame() {
    if(mafia.game == GAME_MAFIA_ONE) {
        mafia.mapEnabled = false;
        mafia.setTrafficEnabled(false);
    }
}

// ===========================================================================

addEventHandler("OnMapLoaded", function(event) {
    initClientScripts();
});

// ===========================================================================