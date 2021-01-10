// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: gui.js
// DESC: Provides GUI functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function showPlayerLoginGUI(client, errorMessage = "") {
    triggerNetworkEvent("ag.showLogin", client);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationGUI(client, errorMessage = "") {
    triggerNetworkEvent("ag.showRegistration", client);
}

// ---------------------------------------------------------------------------

function showPlayerNewCharacterGUI(client) {
    triggerNetworkEvent("ag.showNewCharacter", client);
}

// ---------------------------------------------------------------------------

function showPlayerCharacterSelectGUI(client, firstName, lastName, placeOfOrigin, dateOfBirth, skin) {
    triggerNetworkEvent("ag.showCharacterSelect", client, firstName, lastName, placeOfOrigin, dateOfBirth, skin);
}

// ---------------------------------------------------------------------------

function showPlayerPromptGUI(client, promptMessage, promptTitle) {
    triggerNetworkEvent("ag.showPrompt", client, promptMessage, promptTitle);
}

// ---------------------------------------------------------------------------

function showPlayerPromptGUI(client) {

}

// ---------------------------------------------------------------------------

function showPlayerPhoneGUI(client) {

}

// ---------------------------------------------------------------------------

function showPlayerItemInventoryGUI(client) {

}

// ---------------------------------------------------------------------------