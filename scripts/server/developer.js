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
	console.log("[Asshat.Developer]: Developer script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function simulatePlayerCommand(command, params, client) {
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

	if(areParamsEmpty(params) || !areThereEnoughParams(params, 3)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);
	let tempCommand = splitParams[1];
	let tempParams = splitParams.slice(2).join(" ");

	if(!targetClient) {
		messageClientError(client, "Invalid player name or ID");
		return false;
	}

	if(!getCommand(tempCommand)) {
		messageClientError(client, `The command [#AAAAAA]/${command} [#FFFFFF]does not exist! Use /help for commands and information.`);
		return false;
	}

	onPlayerCommand(tempCommand, tempParams, targetClient);
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

	if(!targetClient) {
		messageClientError(client, "That player was not found!");
		return false;		
	}

	if(targetCode == "") {
		messageClientError(client, "You didn't enter any code!");
		return false;		
	}

	triggerNetworkEvent("ag.runCode", targetClient, targetCode);

	messageClientSuccess(client, "Executing client code for " + toString(targetClient.name) + "!");
	messageClientNormal(client, "Code: " + targetCode);
	return true;
}

// ---------------------------------------------------------------------------

function saveAllServerDataCommand(command, params, client) {


	messageClientInfo(client, `[#FF9900]Saving all server data to database ...`);
	saveAllServerDataToDatabase();
	messageClientSuccess(client, `[#FF9900]All server data saved to database!`);
	return true;
}

// ---------------------------------------------------------------------------

function restartGameModeCommand(command, params, client) {


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

addNetworkHandler("ag.runCodeSuccess", function(client, returnTo, returnVal, code) {
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
	let position = (getPlayerVehicle(client)) ? getVehiclePosition(getPlayerVehicle(client)) : getPlayerPosition(client);
	let heading = (getPlayerVehicle(client)) ? getVehicleHeading(getPlayerVehicle(client)) : getPlayerHeading(client);
	let session = 0;
	let databaseId = 0;

	if(client.console) {
		databaseId = -1;
	} else {
		databaseId = getPlayerData(client).accountData.databaseId;
	}
		
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeIdeaMessage = escapeDatabaseString(dbConnection, ideaText);
		queryDatabase(dbConnection, `INSERT INTO idea_main (idea_server, idea_script_ver, idea_who_added, idea_when_added, idea_message, idea_pos_x, idea_pos_y, idea_pos_z, idea_rot_z, idea_svr_start, idea_session) VALUES (${getServerId()}, '${scriptVersion}', ${databaseId}, UNIX_TIMESTAMP(), '${safeIdeaMessage}',${position.x}, ${position.y}, ${position.z}, ${heading}, ${serverStartTime}, ${session})`);
	}
}

// ---------------------------------------------------------------------------

function submitBugReport(client, bugText) {
	let position = toVector3(0.0, 0.0, 0.0);
	let heading = 0.0;
	let session = 0;
	let databaseId = 0;

	if(getEntityData(client, "ag.position")) {
		position = getEntityData(client, "ag.position");
	}

	if(getEntityData(client, "ag.heading")) {
		heading = getEntityData(client, "ag.heading");
	}

	if(getEntityData(client, "ag.session")) {
		session = getEntityData(client, "ag.session");
	}

	if(client.console) {
		databaseId = -1
	} else {
		databaseId = getPlayerData(client).accountData.databaseId;
	}

	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeBugMessage = escapeDatabaseString(dbConnection, bugText);
		queryDatabase(dbConnection, `INSERT INTO bug_main (bug_server, bug_script_ver, bug_who_added, bug_when_added, bug_message, bug_pos_x, bug_pos_y, bug_pos_z, bug_rot_z, bug_svr_start, bug_session) VALUES (${getServerId()}, '${scriptVersion}', ${databaseId}, UNIX_TIMESTAMP(), '${safeBugMessage}', ${position.x}, ${position.y}, ${position.z}, ${heading}, ${serverStartTime}, ${session})`);
	}
}

// ---------------------------------------------------------------------------