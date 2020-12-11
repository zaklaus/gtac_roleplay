// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: messaging.js
// DESC: Provides messaging functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function messageAdminAction(messageText) {
    message(`⚠️ ${messageText}`, getColourByName("orange"));
    messageDiscord(`:warning: ${messageText}`);
}

// ---------------------------------------------------------------------------

function messageClientNormal(client, messageText, colour = COLOUR_WHITE) {
    if(client.console) {
        console.log(`${messageText}`);
        return true;
    }

    if(client instanceof Client) {
        messageClient(`${messageText}`, client, colour);
    } else {
        messageDiscordUser(client, `${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientError(client, messageText) {
    if(client.console) {
        console.log(`🚫 ${messageText}`);
        return true;
    }

    if(client instanceof Client) {
        messageClientNormal(client, `🚫 ${messageText}`, getColourByType("errorMessage"));
    } else {
        messageDiscordUser(client, `:no_entry_sign: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientSyntax(client, messageText) {
    if(client.console) {
        console.log(`⌨️ ${messageText}`);
        return true;
    }

    if(client instanceof Client) {
        messageClientNormal(client, `⌨️ USAGE: [#FFFFFF] ${messageText}`, getColourByType("syntaxMessage"));
    } else {
        messageDiscordUser(client, `:keyboard: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientAlert(client, messageText) {
    if(client.console) {
        console.log(`⚠️ ${messageText}`);
        return true;
    }

    if(client instanceof Client) {
        messageClientNormal(client, `⚠️ [#FFFFFF] ${messageText}`, getColourByType("alertMessage"));
    } else {
        messageDiscordUser(client, `:warning: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientSuccess(client, messageText) {
    if(client.console) {
        console.log(`👍 ${messageText}`);
        return true;
    }

    if(client instanceof Client) {
        messageClientNormal(client, `👍 [#FFFFFF] ${messageText}`, getColourByType("successMessage"));
    } else {
        messageDiscordUser(client, `:thumbsup: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageClientInfo(client, messageText) {
    if(client.console) {
        console.log(`ℹ️ ${messageText}`);
        return true;
    }
        
    if(client instanceof Client) {
        messageClientNormal(client, `ℹ️ [#FFFFFF] ${messageText}`, getColourByType("successMessage"));
    } else {
        messageDiscordUser(client, `:information_source: ${messageText}`);
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