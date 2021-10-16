// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: chat.js
// DESC: Provides chat functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initChatScript() {
	logToConsole(LOG_INFO, "[VRR.Chat]: Initializing chat script ...");
	logToConsole(LOG_INFO, "[VRR.Chat]: Chat script initialized successfully!");
	return true;
}

// ===========================================================================

function meActionCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	meActionToNearbyPlayers(client, params);
	return true;
}

// ===========================================================================

function doActionCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	doActionToNearbyPlayers(client, params);
	return true;
}

// ===========================================================================

function shoutCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	shoutToNearbyPlayers(client, params);
	return true;
}

// ===========================================================================

function megaphoneChatCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(canPlayerUseMegaphone(client)) {

	}

	megaPhoneToNearbyPlayers(client, params);
	return true;
}

// ===========================================================================

function talkCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	talkToNearbyPlayers(client, params);
	return true;
}

// ===========================================================================

function whisperCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	whisperToNearbyPlayers(client, params);
	return true;
}

// ===========================================================================

function adminChatCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	messageAdmins(`${getInlineChatColourByType("jobYellow")}[Admin Chat] ${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} [#CCCCCC](${getPlayerStaffTitle(client)})${getInlineChatColourByName("white")}: ${params}`);
}

// ===========================================================================

function clanChatCommand(command, params, client) {
	if(isPlayerMuted(client)) {
		messagePlayerError(client, "You are muted and can't chat!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	clanChat(client, params);
}

// ===========================================================================

function talkToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().talkDistance);
	for(let i in clients) {
		if(getPlayerInterior(client) == getPlayerInterior(clients[i] && getPlayerDimension(client) == getPlayerDimension(clients[i]))) {
			messagePlayerTalk(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function phoneOutgoingToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().talkDistance);
	for(let i in clients) {
		messagePlayerNormal(`[#CCCCCC]${getCharacterFullName(client)} ${getInlineChatColourByName("lightGrey")}(to phone): ${getInlineChatColourByName("white")}${messageText}`);
	}
}

// ===========================================================================

function phoneIncomingToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().radioSpeakerDistance);
	for(let i in clients) {
		messagePlayerNormal(`[#CCCCCC]${getCharacterFullName(client)} ${getInlineChatColourByName("lightGrey")}(from phone): ${getInlineChatColourByName("white")}${messageText}`);
	}
}

// ===========================================================================

function whisperToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().talkDistance);
	for(let i in clients) {
		if(getPlayerInterior(client) == getPlayerInterior(clients[i]) && getPlayerDimension(client) == getPlayerDimension(clients[i])) {
			messagePlayerWhisper(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function shoutToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().shoutDistance);
	for(let i in clients) {
		if(getPlayerInterior(client) == getPlayerInterior(clients[i]) && getPlayerDimension(client) == getPlayerDimension(clients[i])) {
			messagePlayerShout(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function megaphoneToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().megaphoneDistance);
	for(let i in clients) {
		if(getPlayerInterior(client) == getPlayerInterior(clients[i]) && getPlayerDimension(client) == getPlayerDimension(clients[i])) {
			messagePlayerShout(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function doActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().doActionDistance);
	for(let i in clients) {
		if(getPlayerInterior(client) == getPlayerInterior(clients[i]) && getPlayerDimension(client) == getPlayerDimension(clients[i])) {
			messagePlayerDoAction(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function meActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().meActionDistance);
	for(let i in clients) {
		if(getPlayerInterior(client) == getPlayerInterior(clients[i]) && getPlayerDimension(client) == getPlayerDimension(clients[i])) {
			messagePlayerMeAction(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function clanChat(client, messageText) {
	let clients = getClients();
	for(let i in clients) {
		if(arePlayersInSameClan(client, clients[i])) {
			messagePlayerClanChat(clients[i], client, messageText);
		}
	}
}

// ===========================================================================

function canPlayerUseMegaphone(client) {
	if(isPlayerHoldingItemOfType(client, VRR_ITEM_USETYPE_MEGAPHONE)) {
		if(isPlayerActiveItemEnabled(client)) {
			return true;
		}
	}

	if(getPlayerVehicle(client)) {
		if(doesVehicleHaveMegaphone(getPlayerVehicle(client))) {
			return true;
		}
	}

	return false;
}