// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: messaging.js
// DESC: Provides messaging functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initMessagingScript() {
	logToConsole(LOG_INFO, "[VRR.Messaging]: Initializing messaging script ...");
	logToConsole(LOG_INFO, "[VRR.Messaging]: Messaging script initialized successfully!");
}

// ===========================================================================

function messageAdminAction(messageText) {
    messagePlayerNormal(null, `⚠️ ${messageText}`, getColourByName("orange"));
    if(getServerConfig().discordEnabled) {
        messageDiscord(`:warning: ${messageText}`);
    }
    //logToConsole(LOG_INFO, `[VRR.Messaging] ADMIN: ${messageText}`);
}

// ===========================================================================

function messagePlayerNormal(client, messageText, colour = COLOUR_WHITE) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] ${messageText}`);
        return true;
    }

    sendChatBoxMessageToPlayer(client, `${messageText}`, colour);

    //if(!isClientFromDiscord(client)) {
    //
    //} else {
    //    messageDiscordUser(client, `${messageText}`);
    //}
}

// ===========================================================================

function messageAdmins(messageText, colour = COLOUR_WHITE) {
    let clients = getClients();
    for(let i in clients) {
        if(isConsole(clients[i])) {
            logToConsole(LOG_INFO, `[VRR.Messaging] ADMINS: ${messageText}`);
        } else {
            if(doesPlayerHaveStaffPermission(clients[i], getStaffFlagValue("basicModeration"))) {
                sendChatBoxMessageToPlayer(clients[i], `🛡️ ${messageText}`, getColourByName("softRed"));
            }
        }

    }
}

// ===========================================================================

function messagePlayerError(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] ERROR:  ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `🚫 ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:no_entry_sign: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerSyntax(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] USAGE:  ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `⌨️ USAGE: ${getInlineChatColourByName("white")} ${messageText}`, getColourByType("syntaxMessage"));
    } else {
        messageDiscordUser(client, `:keyboard: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerAlert(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] ALERT: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `⚠️ ${getInlineChatColourByName("white")} ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:warning: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerSuccess(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] SUCCESS: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `👍 ${getInlineChatColourByName("white")} ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:thumbsup: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerInfo(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] INFO: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `ℹ️ ${getInlineChatColourByName("white")} ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:information_source: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerTip(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] TIP: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `ℹ️ ${getInlineChatColourByName("white")} ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:information_source: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerTalk(client, talkingClient, messageText) {
    messagePlayerNormal(client, `🗣️ ${getClientSubAccountName(talkingClient)} says: ${messageText}`, getColourByType("talkMessage"));
}

// ===========================================================================

function messagePlayerWhisper(client, whisperingClient, messageText) {
    messagePlayerNormal(client, `🤫 ${getClientSubAccountName(whisperingClient)} whispers: ${messageText}`, getColourByType("whisperMessage"));
}

// ===========================================================================

function messagePlayerShout(client, shoutingClient, messageText) {
    messagePlayerNormal(client, `🗣️ ${getClientSubAccountName(shoutingClient)} shouts: ${messageText}!`, getColourByType("shoutMessage"));
}

// ===========================================================================

function messagePlayerDoAction(client, doingActionClient, messageText) {
    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `${messageText} * (${getClientSubAccountName(doingActionClient)})`, getColourByType("doActionMessage"));
    }
}

// ===========================================================================

function messagePlayerMeAction(client, doingActionClient, messageText) {
    messagePlayerNormal(client, `${getClientSubAccountName(doingActionClient)} ${messageText}`, getColourByType("meActionMessage"));
}

// ===========================================================================

function messagePlayerClanChat(client, clanChattingClient, messageText) {
    messagePlayerNormal(client, `👥 (${getClientSubAccountClanRank(clanChattingClient)}) ${getClientSubAccountName(clanChattingClient)} says (clan): ${messageText}`, getColourByType("clanChatMessage"));
}

// ===========================================================================

function messagePlayerAdminChat(client, adminChattingClient, messageText) {
    messagePlayerNormal(client, `🛡️ [ADMIN CHAT] ${getInlineChatColourByName("lightGrey")}${getPlayerData(adminChattingClient).accountData.staffTitle} [#CCCCCC]${getPlayerData(adminChattingClient).accountData.name}: ${getInlineChatColourByName("white")}${messageText}`, getColourByType("orange"));
}

// ===========================================================================