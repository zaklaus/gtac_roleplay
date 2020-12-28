// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: chat.js
// DESC: Provides chat functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initChatScript() {
	console.log("[Asshat.Chat]: Initializing chat script ...");
	console.log("[Asshat.Chat]: Chat script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function meActionCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	meActionToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function doActionCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	doActionToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function shoutCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	shoutToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function talkCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	talkToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function whisperCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}	

	whisperToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function adminChatCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	messageAdmins(`[#FFFF00][Admin Chat] [#AAAAAA]${client.name} [#CCCCCC](${getPlayerStaffTitle(client)}) [#FFFFFF]:${params}`);
}

// ---------------------------------------------------------------------------

function clanChatCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	clanChat(client, params);
}

// ---------------------------------------------------------------------------

function talkToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, getGlobalConfig().talkDistance);
	for(let i in clients) {
		//if(clients[i] != client) {
			messageClientTalk(getClientFromPlayerElement(clients[i]), client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function whisperToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, getGlobalConfig().talkDistance);
	for(let i in clients) {
		//if(clients[i] != client) {
			messageClientWhisper(getClientFromPlayerElement(clients[i]), client, messageText);
		//}
	}	
}

// ---------------------------------------------------------------------------

function shoutToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, getGlobalConfig().shoutDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messageClientShout(getClientFromPlayerElement(clients[i]), client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function doActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, getGlobalConfig().doActionDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messageClientDoAction(getClientFromPlayerElement(clients[i]), client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function meActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, getGlobalConfig().meActionDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messageClientMeAction(getClientFromPlayerElement(clients[i]), client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function clanChat(client, messageText) {
	let clients = getClients();
	for(let i in clients) {
		if(getClientCurrentSubAccount(client).clan != getClientCurrentSubAccount(clients[i]).clan) {
			messageClientClanChat(getClientFromPlayerElement(clients[i]), client, messageText);
		}
	}
}

// ---------------------------------------------------------------------------