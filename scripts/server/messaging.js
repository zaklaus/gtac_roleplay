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
}

// ===========================================================================

function messagePlayerNormal(client, messageText, colour = COLOUR_WHITE) {
    if(isConsole(client)) {
        console.log(messageText);
        logToConsole(LOG_INFO, `[VRR.Messaging] ${messageText}`);
        return true;
    }

    sendChatBoxMessageToPlayer(client, `${replaceColoursInMessage(messageText)}`, colour);
}

// ===========================================================================

function messageAdmins(messageText, colour = COLOUR_WHITE) {
    let plainMessage = removeColoursInMessage(messageText);
    console.warn(`🛡️ ${plainMessage}`);

    let clients = getClients();
    for(let i in clients) {
        if(doesPlayerHaveStaffPermission(clients[i], getStaffFlagValue("basicModeration"))) {
            messagePlayerNormal(clients[i], `🛡️ ${messageText}`, getColourByName("softRed"));
        }
    }

    if(getServerConfig().discordConfig.sendAdminEvents) {
        messageDiscordAdminChannel(plainMessage);
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
        messageDiscordUser(client, `🚫 ${messageText}`);
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
        messageDiscordUser(client, `⌨️ ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerAlert(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] ALERT: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `⚠️ ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `⚠️ ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerSuccess(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] SUCCESS: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `👍 ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `👍 ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerInfo(client, messageText) {
    if(isConsole(client)) {
        logToConsole(LOG_INFO, `[VRR.Messaging] INFO: ${messageText}`);
        return true;
    }

    if(!isClientFromDiscord(client)) {
        messagePlayerNormal(client, `ℹ️ ${messageText}`, getColourByName("white"));
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
        messagePlayerNormal(client, `ℹ️ ${messageText}`, getColourByName("white"));
    } else {
        messageDiscordUser(client, `:information_source: ${messageText}`);
    }
}

// ===========================================================================

function messagePlayerTalk(client, talkingClient, messageText) {
    messagePlayerNormal(client, `🗣️ ${getPlayerAccentInlineOutput(talkingClient)}${getClientSubAccountName(talkingClient)} says: ${messageText}`, getColourByType("talkMessage"));
}

// ===========================================================================

function messagePlayerWhisper(client, whisperingClient, messageText) {
    messagePlayerNormal(client, `🤫 ${getPlayerAccentInlineOutput(whisperingClient)}${getClientSubAccountName(whisperingClient)} whispers: ${messageText}`, getColourByType("whisperMessage"));
}

// ===========================================================================

function messagePlayerShout(client, shoutingClient, messageText) {
    messagePlayerNormal(client, `🗣️ ${getPlayerAccentInlineOutput(shoutingClient)}${getClientSubAccountName(shoutingClient)} shouts: ${messageText}!`, getColourByType("shoutMessage"));
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
    messagePlayerNormal(client, `👥 ${getInlineChatColourByName("clanOrange")}${(getPlayerClanRankName(clanChattingClient) != false) ? getPlayerClanRankName(clanChattingClient) : "No Rank"} ${getCharacterFullName(clanChattingClient)} ${getInlineChatColourByName("white")}says (clan): ${getInlineChatColourByName("lightGrey")}${messageText}`, getColourByType("clanChatMessage"));
}

// ===========================================================================

function messagePlayerAdminChat(client, adminChattingClient, messageText) {
    messagePlayerNormal(client, `🛡️ [ADMIN CHAT] ${getInlineChatColourByName("lightGrey")}${getPlayerData(adminChattingClient).accountData.staffTitle} [#CCCCCC]${getPlayerData(adminChattingClient).accountData.name}: ${getInlineChatColourByName("white")}${messageText}`, getColourByType("orange"));
}

// ===========================================================================

function messagePlayerNewbieTip(client, message) {
    if(!hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("noActionTips"))) {
        messagePlayerNormal(client, `💡 TIP: ${message}`);
    }
}

// ===========================================================================

function messagePlayerTimedRandomTip(client, message) {
    if(isPlayerLoggedIn(client) && isPlayerSpawned(client)) {
        if(!hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("noTimedRandomTips"))) {
            messagePlayerNormal(client, `💡 TIP: ${message}`);
        }
    }
}

// ===========================================================================