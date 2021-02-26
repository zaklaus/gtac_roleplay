// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: client.js
// DESC: Provides wrapped client natives for GTAC
// TYPE: Natives (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function getClientGame() {
	return gta.game;
}

// ---------------------------------------------------------------------------

function sendToServer(eventName, ...args) {
    triggerNetworkEvent.call(eventName, args);
}

// ---------------------------------------------------------------------------

function receiveFromServer(eventName, handlerFunction) {
    addNetworkHandler(eventName, handlerFunction);
}

// ---------------------------------------------------------------------------

function listenFromServer(eventName, handlerFunction) {
    addNetworkHandler(eventName, handlerFunction);
}

// ---------------------------------------------------------------------------