// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
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

	let returnVal = "Nothing";
	try {
		returnVal = eval("(" + params + ")");
	} catch(error) {
		messageClientError(client, "The code could not be executed!");
		return false;
	}

	messageClientSuccess(client, "Server code executed!");
	messageClientNormal(client, `Code: ${params}`);
	messageClientNormal(client, `Returns: ${returnVal}`);
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

	let splitParams = params.split(" ");
	let targetClient = getClientFromParams(splitParams[0]);
	let targetCode = splitParams.slice(1).join(" ");

	console.log(targetCode);

	if(!targetClient) {
		messageClientError(client, "That player was not found!");
		return false;		
	}

	if(targetCode == "") {
		messageClientError(client, "You didn't enter any code!");
		return false;		
	}

	triggerNetworkEvent("ag.runCode", targetClient, targetCode);

	messageClientSuccess(client, "Executing client code for " + String(targetClient.name) + "!");
	messageClientNormal(client, "Code: " + targetCode);
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

addNetworkHandler("ag.runCodeFail", function(client, returnTo, code) {
	let returnClient = getClientFromParams(returnTo);
	if(!returnClient) {
		return false;
	}

	messageClientError(returnClient, `Client code failed to execute for ${client.name}!`);
	messageClientNormal(returnClient, `Code: ${code}`, getColourByName("yellow"));
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.runCodeFail", function(client, returnTo, returnVal, code) {
	let returnClient = getClientFromParams(returnTo);
	if(!returnClient) {
		return false;
	}

	messageClientSuccess(returnClient, `Client code executed for ${client.name}!`);
	messageClientNormal(returnClient, `Code: ${code}`, getColourByName("yellow"));
	messageClientNormal(returnClient, `Returns: ${returnVal}`, getColourByName("yellow"));
});

// ---------------------------------------------------------------------------

function submitIdea(client, ideaText) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeIdeaMessage = escapeDatabaseString(dbConnection, ideaText);
		executeDatabaseQuery(dbConnection, `INSERT INTO idea_main (idea_server, idea_script_ver, idea_who_added, idea_when_added, idea_message, idea_pos_x, idea_pos_y, idea_pos_z, idea_rot_z, idea_svr_start, idea_session) VALUES (${serverId}, '${scriptVersion}', ${getClientData(client).accountData.databaseId}, UNIX_TIMESTAMP(), '${safeIdeaMessage}', ${client.getData("ag.pos").x}, ${client.getData("ag.pos").y}, ${client.getData("ag.pos").z}, ${client.getData("ag.heading")}, ${serverStartTime}, ${client.getData("ag.session")})`)
	}
}

// ---------------------------------------------------------------------------

function submitBugReport(client, bugText) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeBugMessage = escapeDatabaseString(dbConnection, bugText);
		executeDatabaseQuery(dbConnection, `INSERT INTO bug_main (bug_server, bug_script_ver, bug_who_added, bug_when_added, bug_message, bug_pos_x, bug_pos_y, bug_pos_z, bug_rot_z, bug_svr_start, bug_session) VALUES (${serverId}, '${scriptVersion}', ${getClientData(client).accountData.databaseId}, UNIX_TIMESTAMP(), '${safeBugMessage}', ${client.getData("ag.pos").x}, ${client.getData("ag.pos").y}, ${client.getData("ag.pos").z}, ${client.getData("ag.heading")}, ${serverStartTime}, ${client.getData("ag.session")})`)
	}
}

// ---------------------------------------------------------------------------