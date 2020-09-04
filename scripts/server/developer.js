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
	let developerCommands = serverCommands.database;
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

function restartGameModeCommand(command, params, client) {
	if(client.administrator) {
		consoleCommand("/refresh");
		thisResource.restart();
	}

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

	thisResource.restart();
	return true;
}

// ---------------------------------------------------------------------------

function developerAnnounceCommand(command, params, client) {
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

	developerAnnouncement(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function queryDatabaseCommand(command, params, client) {
	//if(client == consoleClient) {
		let databaseConnection = connectToDatabase();
		if(databaseConnection.error) {
			console.error("Database error: " + databaseConnection.error);
			return false;
		}

		let query = databaseConnection.query(params);
		if(databaseConnection.error) {
			console.error("Query error: " + databaseConnection.error);
			return false;			
		}
		console.log("Query executed!");
		console.log(query.fetchRow()[0]);
	//}
}
addCommandHandler("query", queryDatabaseCommand);


// ---------------------------------------------------------------------------