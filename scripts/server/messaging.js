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
        messageClientNormal(client, `🚫 ${messageText}`, getColourByType("errorMessage"));
    } else {
        messageDiscordUser(client, `🚫 ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientSyntax(client, messageText) {
    if(client instanceof Client) {
        messageClientNormal(client, `⌨️ [#FFFFFF] ${messageText}`, getColourByType("syntaxMessage"));
    } else {
        messageDiscordUser(client, `⌨️ ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientAlert(client, messageText) {
    if(client instanceof Client) {
        messageClientNormal(client, `⚠️ [#FFFFFF] ${messageText}`, getColourByType("alertMessage"));
    } else {
        messageDiscordUser(client, `⚠️ ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientSuccess(client, messageText) {
    if(client instanceof Client) {
        messageClientNormal(client, `👍 [#FFFFFF] ${messageText}`, getColourByType("successMessage"));
    } else {
        messageDiscordUser(client, `👍 ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientInfo(client, messageText) {
    if(client instanceof Client) {
        messageClientNormal(client, `ℹ️ [#FFFFFF] ${messageText}`, getColourByType("successMessage"));
    } else {
        messageDiscordUser(client, `ℹ️ ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientTalk(client, talkingClient, messageText) {
    messageClientNormal(client, `${getClientSubAccountName(client)} says: ${messageText}`, getColourByType("talkMessage"));
}

// ---------------------------------------------------------------------------

function messageClientWhisper(client, talkingClient, messageText) {
    messageClientNormal(client, `${getClientSubAccountName(client)} whispers: ${messageText}`, getColourByType("whisperMessage"));
}

// ---------------------------------------------------------------------------

function messageClientShout(client, talkingClient, messageText) {
    messageClientNormal(client, `${getClientSubAccountName(client)} shouts: ${messageText}!`, getColourByType("shoutMessage"));
}

// ---------------------------------------------------------------------------

function messageClientDoAction(client, talkingClient, messageText) {
    if(client instanceof Client) {
        messageClientNormal(client, `${messageText} * (${getClientSubAccountName(client)})`, getColourByType("doActionMessage"));
    }
}

// ---------------------------------------------------------------------------

function messageClientMeAction(client, talkingClient, messageText) {
    messageClientNormal(client, `${getClientSubAccountName(client)} ${messageText}`, getColourByType("meActionMessage"));
}

// ---------------------------------------------------------------------------

function messageClientClanChat(client, talkingClient, messageText) {
    messageClientNormal(client, `(${getClientSubAccountClanRank(talkingClient)}) ${getClientSubAccountName(talkingClient)} says (clan): ${messageText}`, getColourByType("clanChatMessage"));
}

// ---------------------------------------------------------------------------