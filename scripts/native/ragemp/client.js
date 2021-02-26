// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: client.js
// DESC: Provides wrapped client natives for RAGEMP
// TYPE: Natives (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function getClientGame() {
	return AG_GAME_GTA_V;
}

// ---------------------------------------------------------------------------

function sendToServer(eventName, ...args) {
    mp.events.call(eventName, args);
}

// ---------------------------------------------------------------------------

function receiveFromServer(eventName, handlerFunction) {
    mp.events.add(eventName, handlerFunction);
}

// ---------------------------------------------------------------------------