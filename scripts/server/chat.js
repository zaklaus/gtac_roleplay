// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: chat.js
// DESC: Provides chat functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initChatScript() {
	logToConsole(LOG_INFO, "[Asshat.Chat]: Initializing chat script ...");
	logToConsole(LOG_INFO, "[Asshat.Chat]: Chat script initialized successfully!");
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

	messageAdmins(`[#FFFF00][Admin Chat] [#AAAAAA]${client.name} [#CCCCCC](${getPlayerStaffTitle(client)})[#FFFFFF]: ${params}`);
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
		//if(clients[i] != client) {
			messagePlayerTalk(clients[i], client, messageText);
		//}
	}
}

// ===========================================================================

function phoneOutgoingToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().talkDistance);
	for(let i in clients) {
		messagePlayerNormal(`[#CCCCCC]${getCharacterFullName(client)} [#AAAAAA](to phone): [#FFFFFF]${messageText}`);
	}
}

// ===========================================================================

function phoneIncomingToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().radioSpeakerDistance);
	for(let i in clients) {
		messagePlayerNormal(`[#CCCCCC]${getCharacterFullName(client)} [#AAAAAA](from phone): [#FFFFFF]${messageText}`);
	}
}

// ===========================================================================

function whisperToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().talkDistance);
	for(let i in clients) {
		//if(clients[i] != client) {
			messagePlayerWhisper(clients[i], client, messageText);
		//}
	}
}

// ===========================================================================

function shoutToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().shoutDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messagePlayerShout(clients[i], client, messageText);
		//}
	}
}

// ===========================================================================

function doActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().doActionDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messagePlayerDoAction(clients[i], client, messageText);
		//}
	}
}

// ===========================================================================

function meActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(getPlayerPosition(client), getGlobalConfig().meActionDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messagePlayerMeAction(clients[i], client, messageText);
		//}
	}
}

// ===========================================================================

function clanChat(client, messageText) {
	let clients = getClients();
	for(let i in clients) {
		if(getPlayerCurrentSubAccount(client).clan != getPlayerCurrentSubAccount(clients[i]).clan) {
			messageClientClanChat(clients[i], client, messageText);
		}
	}
}

// ===========================================================================