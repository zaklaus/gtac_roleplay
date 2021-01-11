// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: gui.js
// DESC: Provides GUI functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

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

function playerPromptAnswerNo(client) {
    if(!getEntityData(client, "ag.prompt")) {
        return false;
    }

    switch(getEntityData(client, "ag.prompt")) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            showPlayerErrorGUI(client, "You don't have a character to play. Goodbye!", "No Characters")
            setTimeout(function() { client.disconnect(); }, 5000);
            break;

        default:
            break;
    }

    client.removeData("ag.prompt");
}

// ---------------------------------------------------------------------------

function playerPromptAnswerYes(client) {
    if(!getEntityData(client, "ag.prompt")) {
        return false;
    }

    switch(getEntityData(client, "ag.prompt")) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            showPlayerNewCharacterGUI(client);
            break;

        default:
            break;
    }

    client.removeData("ag.prompt");
}

// ---------------------------------------------------------------------------