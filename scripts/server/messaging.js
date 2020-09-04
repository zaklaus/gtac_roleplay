// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: messaging.js
// DESC: Provides messaging functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function messageClientError(client, messageText) {
    if(client instanceof Client) {
        messageClient("🚫 " + String(messageText), client, getColourByType("errorMessage"));
    } else {
        messageDiscordUser("🚫 " + String(messageText), client);
    }
}

// ---------------------------------------------------------------------------

function messageClientSyntax(client, messageText) {
    if(client instanceof Client) {
        messageClient("⌨️ [#FFFFFF] " + String(messageText), client, getColourByType("syntaxMessage"));
    } else {
        messageDiscordUser("⌨️ " + String(messageText), client);
    }
}

// ---------------------------------------------------------------------------

function messageClientAlert(client, messageText) {
    if(client instanceof Client) {
        messageClient("⚠️ [#FFFFFF] " + String(messageText), client, getColourByType("alertMessage"));
    } else {
        messageDiscordUser("⚠️ " + String(messageText), client);
    }
}

// ---------------------------------------------------------------------------

function messageClientSuccess(client, messageText) {
    if(client instanceof Client) {
        messageClient("👍 [#FFFFFF] " + String(messageText), client, getColourByType("successMessage"));
    } else {
        messageDiscordUser("👍 " + String(messageText), client);
    }
}

// ---------------------------------------------------------------------------

function messageClientInfo(client, messageText) {
    if(client instanceof Client) {
        messageClient("ℹ️ [#FFFFFF] " + String(messageText), client, getColourByType("successMessage"));
    } else {
        messageDiscordUser("ℹ️ " + String(messageText), client);
    }
}

// ---------------------------------------------------------------------------

function messageClientTalk(client, talkingClient, messageText) {
    messageClient(getClientSubAccountName(client) + " says: " + String(messageText), client, getColourByType("talkMessage"));
}

// ---------------------------------------------------------------------------

function messageClientWhisper(client, talkingClient, messageText) {
    messageClient(getClientSubAccountName(client) + " whispers: " + String(messageText), client, getColourByType("whisperMessage"));
}

// ---------------------------------------------------------------------------

function messageClientShout(client, talkingClient, messageText) {
    messageClient(getClientSubAccountName(client) + " shouts: " + String(messageText) + "!", client, getColourByType("shoutMessage"));
}

// ---------------------------------------------------------------------------

function messageClientDoAction(client, talkingClient, messageText) {
    if(client instanceof Client) {
        messageClient(String(messageText) + " * (" + getClientSubAccountName(client) + ")", client, getColourByType("doActionMessage"));
    }
}

// ---------------------------------------------------------------------------

function messageClientMeAction(client, talkingClient, messageText) {
    messageClient(getClientSubAccountName(client) + " " + String(messageText), client, getColourByType("meActionMessage"));
}

// ---------------------------------------------------------------------------