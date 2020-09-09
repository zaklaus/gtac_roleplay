// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: developer.js
// DESC: Provides developer operation, commands, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initDeveloperScript() {
	console.log("[Asshat.Developer]: Initializing developer script ...");
	addDeveloperCommandHandlers()
	console.log("[Asshat.Developer]: Developer script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addDeveloperCommandHandlers() {
	console.log("[Asshat.Developer]: Adding developer command handlers ...");
	let developerCommands = serverCommands.developer;
	for(let i in developerCommands) {
		addCommandHandler(developerCommands[i].command, developerCommands[i].handlerFunction);
	}
	console.log("[Asshat.Developer]: Developer command handlers added!");
	return true;
}

// ---------------------------------------------------------------------------

function executeServerCodeCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	try {
		eval(params);
	} catch(error) {
		messageClientError(client, "The code could not be executed!");
		return false;
	}

	messageClientSuccess(client, "Code executed!");
	messageClientNormal(client, "Code: " + params);
	return true;
}

// ---------------------------------------------------------------------------

function executeClientCodeCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let targetClient = getClientFromParams(splitParams[0]);
	let code = splitParams.slice(1).join(" ");

	if(!targetClient) {
		messageClientError(client, "That player was not found!");
		return false;		
	}

	if(code.length > 0) {
		messageClientError(client, "You didn't enter any code!");
		return false;		
	}

	triggerNetworkEvent("ag.runcode", targetClient, code);

	messageClientSuccess(client, "Client code executed for " + String(targetClient.name) + "!");
	messageClientNormal(client, "Code: " + params);
	return true;
}

// ---------------------------------------------------------------------------

function saveAllServerDataCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	messageClientInfo(client, `[#FF9900]Saving all server data to database ...`);
	saveAllServerDataToDatabase();
	messageClientSuccess(client, `[#FF9900]All server data saved to database!`);
	return true;
}

// ---------------------------------------------------------------------------

function restartGameModeCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	consoleCommand("refresh");
	thisResource.restart();
	return true;
}

// ---------------------------------------------------------------------------