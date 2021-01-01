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
    if(getServerConfig().discordEnabled) {
        messageDiscord(`:warning: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerNormal(client, messageText, colour = COLOUR_WHITE) {
    if(isConsole(client)) {
        console.log(`[Asshat.Messaging] ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messageClient(`${messageText}`, client, colour);
    } else {
        messageDiscordUser(client, `${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messageAdmins(messageText, colour = COLOUR_WHITE) {
    let clients = getClients();
    for(let i in clients) {
        if(clients[i].console) {
            console.log(`[Asshat.Messaging] 🛡️ ${messageText}`);
        } else {
            if(doesPlayerHaveStaffPermission(clients[i], getStaffFlagValue("basicModeration"))) {
                messageClient(`🛡️ ${messageText}`, clients[i], getColourByName("softRed"));
            }
        }

    }
}

// ---------------------------------------------------------------------------

function messagePlayerError(client, messageText) {
    if(isConsole(client)) {
        console.log(`[Asshat.Messaging] ERROR:  ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `🚫 ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:no_entry_sign: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerSyntax(client, messageText) {
    if(isConsole(client)) {
        console.log(`[Asshat.Messaging] USAGE:  ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `⌨️ USAGE: [#FFFFFF] ${messageText}`, getColourByType("syntaxMessage"));
    } else {
        messageDiscordUser(client, `:keyboard: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerAlert(client, messageText) {
    if(isConsole(client)) {
        console.log(`[Asshat.Messaging] ALERT: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `⚠️ [#FFFFFF] ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:warning: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerSuccess(client, messageText) {
    if(isConsole(client)) {
        console.log(`[Asshat.Messaging] SUCCESS: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `👍 [#FFFFFF] ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:thumbsup: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerInfo(client, messageText) {
    if(isConsole(client)) {
        console.log(`[INFO] ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `ℹ️ [#FFFFFF] ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:information_source: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerTip(client, messageText) {
    if(isConsole(client)) {
        console.log(`[TIP] ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `ℹ️ [#FFFFFF] ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:information_source: ${messageText}`);
    }
}

// ---------------------------------------------------------------------------

function messagePlayerTalk(client, talkingClient, messageText) {
    messagePlayerNormal(client, `${getClientSubAccountName(talkingClient)} says: ${messageText}`, getColourByType("talkMessage"));
}

// ---------------------------------------------------------------------------

function messagePlayerWhisper(client, whisperingClient, messageText) {
    messagePlayerNormal(client, `${getClientSubAccountName(whisperingClient)} whispers: ${messageText}`, getColourByType("whisperMessage"));
}

// ---------------------------------------------------------------------------

function messagePlayerShout(client, shoutingClient, messageText) {
    messagePlayerNormal(client, `${getClientSubAccountName(shoutingClient)} shouts: ${messageText}!`, getColourByType("shoutMessage"));
}

// ---------------------------------------------------------------------------

function messagePlayerDoAction(client, doingActionClient, messageText) {
    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `${messageText} * (${getClientSubAccountName(doingActionClient)})`, getColourByType("doActionMessage"));
    }
}

// ---------------------------------------------------------------------------

function messagePlayerMeAction(client, doingActionClient, messageText) {
    messagePlayerNormal(client, `${getClientSubAccountName(doingActionClient)} ${messageText}`, getColourByType("meActionMessage"));
}

// ---------------------------------------------------------------------------

function messagePlayerClanChat(client, clanChattingClient, messageText) {
    messagePlayerNormal(client, `(${getClientSubAccountClanRank(clanChattingClient)}) ${getClientSubAccountName(clanChattingClient)} says (clan): ${messageText}`, getColourByType("clanChatMessage"));
}

// ---------------------------------------------------------------------------

function messagePlayerAdminChat(client, adminChattingClient, messageText) {
    messagePlayerNormal(client, `[ADMIN CHAT] [#AAAAAA]${getPlayerData(adminChattingClient).accountData.staffTitle} [#CCCCCC]${getPlayerData(adminChattingClient).accountData.name}: [#FFFFFF]${messageText}`, getColourByType("orange"));
}

// ---------------------------------------------------------------------------