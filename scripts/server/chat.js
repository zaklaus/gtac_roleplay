// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: chat.js
// DESC: Provides chat functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initChatScript() {
	console.log("[Asshat.Chat]: Initializing chat script ...");
	addChatCommandHandlers();
	console.log("[Asshat.Chat]: Chat script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addChatCommandHandlers() {
	console.log("[Asshat.Chat]: Adding chat command handlers ...");
	let chatCommands = serverCommands.chat;
	for(let i in chatCommands) {
		addCommandHandler(chatCommands[i].command, chatCommands[i].handlerFunction);
	}	
	console.log("[Asshat.Chat]: Chat command handlers added successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function meActionCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	meActionToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function doActionCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	doActionToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function shoutCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	shoutToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function talkCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	talkToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function whisperCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	whisperToNearbyPlayers(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function talkToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, serverConfig.talkDistance);
	for(let i in clients) {
		//if(clients[i] != client) {
			messageClientTalk(clients[i], client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function whisperToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, serverConfig.talkDistance);
	for(let i in clients) {
		//if(clients[i] != client) {
			messageClientWhisper(clients[i], client, messageText);
		//}
	}	
}

// ---------------------------------------------------------------------------

function shoutToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, serverConfig.shoutDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messageClientShout(clients[i], client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function doActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, serverConfig.doActionDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messageClientDoAction(clients[i], client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------

function meActionToNearbyPlayers(client, messageText) {
	let clients = getClientsInRange(client.player.position, serverConfig.meActionDistance);
	for(let i in clients) {
		//if(clients[i].index != client.index) {
			messageClientMeAction(clients[i], client, messageText);
		//}
	}
}

// ---------------------------------------------------------------------------