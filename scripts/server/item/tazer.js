// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: tazer.js
// DESC: Provides features and usage for the tazer item type
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function isPlayerTazed(client) {
    return (getPlayerData(client).pedState == AG_PEDSTATE_TAZED);
}

// ---------------------------------------------------------------------------

function tazePlayer(client) {
    getPlayerData(client).pedState = AG_PEDSTATE_TAZED;
    setPlayerControlState(client, false);

    setTimeout(function() {
        unTazePlayer(client);
        doActionToNearbyPlayers(client, `The tazer effect wears off`);
    }, getGlobalConfig().tazerEffectDuration);
}

// ---------------------------------------------------------------------------

function unTazePlayer(client) {
    getPlayerData(client).pedState = AG_PEDSTATE_READY;
    setPlayerControlState(client, true);
}

// ---------------------------------------------------------------------------