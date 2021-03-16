// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: handcuff.js
// DESC: Provides features and usage for the handcuff item type
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================

function isPlayerHandCuffed(client) {
    return (getPlayerData(client).pedState == AG_PEDSTATE_BINDED);
}

// ===========================================================================

function handCuffPlayer(client) {
    getPlayerData(client).pedState = AG_PEDSTATE_BINDED;
    setPlayerControlState(client, false);
}

// ===========================================================================

function unHandCuffPlayer(client) {
    getPlayerData(client).pedState = AG_PEDSTATE_READY;
    setPlayerControlState(client, true);
}

// ===========================================================================

function isPlayerSurrendered(client) {
    return (getPlayerData(client).pedState == AG_PEDSTATE_TAZED || getPlayerData(client).pedState == AG_PEDSTATE_HANDSUP);
}

// ===========================================================================