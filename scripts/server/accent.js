// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: accent.js
// DESC: Provides accent functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function getPlayerAccentText(client) {
    return getPlayerCurrentSubAccount(client).accent;
}

// ===========================================================================

function setPlayerAccentText(client, text) {
    getPlayerCurrentSubAccount(client).accent = text;
}

// ===========================================================================

function doesPlayerHaveAccent(client) {
    return (getPlayerCurrentSubAccount(client).accent != "");
}

// ===========================================================================

function getPlayerAccentInlineOutput(client) {
    let outputText = "";
    //if(doesPlayerHaveAccent(client)) {
    //    outputText = `[${getPlayerAccentText(client)}]`;
    //}

    return outputText;
}

// ===========================================================================