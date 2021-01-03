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

	// Use GTAC command handlers for these since they need to be available on console
	addCommandHandler("sc", executeServerCodeCommand);
	addCommandHandler("cc", executeServerCodeCommand);
	addCommandHandler("docmd", simulateCommandForPlayer);
	addCommandHandler("allcmd", simulateCommandForAllPlayers);

	console.log("[Asshat.Developer]: Developer script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function simulateCommandForPlayer(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isPlayerLoggedIn(client)) {
			messagePlayerError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messagePlayerError(client, "You do not have permission to use this command!");
		return false;
	}

	if(areParamsEmpty(params) || !areThereEnoughParams(params, 2)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let tempCommand = splitParams[1];
	tempCommand.replace("/", "");
	let tempParams = splitParams.slice(2).join(" ");

	if(!targetClient) {
		messagePlayerError(client, "Invalid player name or ID");
		return false;
	}

	if(!getCommand(tempCommand)) {
		messagePlayerError(client, `The command [#AAAAAA]/${command} [#FFFFFF]does not exist! Use /help for commands and information.`);
		return false;
	}

	getCommand(toLowerCase(tempCommand)).handlerFunction(tempCommand, tempParams, targetClient);
	messagePlayerSuccess(client, `The command string [#AAAAAA]/${tempCommand} ${tempParams}[#FFFFFF] has been simulated for [#AAAAAA]${targetClient.name}`);
	return true;
}

// ---------------------------------------------------------------------------

function simulateCommandForAllPlayers(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isPlayerLoggedIn(client)) {
			messagePlayerError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messagePlayerError(client, "You do not have permission to use this command!");
		return false;
	}

	if(areParamsEmpty(params) || !areThereEnoughParams(params, 2)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let tempCommand = splitParams[0];
	tempCommand.replace("/", "");
	let tempParams = splitParams.slice(1).join(" ");

	if(!getCommand(tempCommand)) {
		messagePlayerError(client, `The command [#AAAAAA]/${command} [#FFFFFF]does not exist! Use /help for commands and information.`);
		return false;
	}

	let clients = getClients();
	for(let i in clients) {
		if(!clients[i].console) {
			getCommand(toLowerCase(tempCommand)).handlerFunction(tempCommand, tempParams, clients[i]);
		}
	}
	messagePlayerSuccess(client, `The command string [#AAAAAA]/${tempCommand} ${tempParams}[#FFFFFF] has been simulated for all players!`);
	return true;
}

// ---------------------------------------------------------------------------

function executeServerCodeCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isPlayerLoggedIn(client)) {
			messagePlayerError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messagePlayerError(client, "You do not have permission to use this command!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let returnVal = "Nothing";
	try {
		returnVal = eval("(" + params + ")");
	} catch(error) {
		messagePlayerError(client, "The code could not be executed!");
		return false;
	}

	messagePlayerSuccess(client, "Server code executed!");
	messagePlayerNormal(client, `Code: ${params}`);
	messagePlayerNormal(client, `Returns: ${returnVal}`);
	return true;
}

// ---------------------------------------------------------------------------

function executeClientCodeCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isPlayerLoggedIn(client)) {
			messagePlayerError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messagePlayerError(client, "You do not have permission to use this command!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let targetCode = splitParams.slice(1).join(" ");

	if(!targetClient) {
		messagePlayerError(client, "That player was not found!");
		return false;
	}

	if(targetCode == "") {
		messagePlayerError(client, "You didn't enter any code!");
		return false;
	}

	triggerNetworkEvent("ag.runCode", targetClient, targetCode, client.index);

	messagePlayerSuccess(client, "Executing client code for " + toString(targetClient.name) + "!");
	messagePlayerNormal(client, "Code: " + targetCode);
	return true;
}

// ---------------------------------------------------------------------------

function saveAllServerDataCommand(command, params, client) {
	messageAdmins(`[#FF9900]Saving all server data to database ...`);
	saveAllServerDataToDatabase();
	messageAdmins(`[#FF9900]All server data saved to database!`);
	return true;
}

// ---------------------------------------------------------------------------

function restartGameModeCommand(command, params, client) {
	message(`[#FF9900]The server game mode is restarting!`, getColourByName("orange"));
	consoleCommand("refresh");
	thisResource.restart();
	return true;
}

// ---------------------------------------------------------------------------

addNetworkHandler("ag.runCodeFail", function(client, returnTo, code) {
	let returnClient = getPlayerFromParams(returnTo);
	if(!returnClient) {
		return false;
	}

	messagePlayerError(returnClient, `Client code failed to execute for ${client.name}!`);
	messagePlayerNormal(returnClient, `Code: ${code}`, getColourByName("yellow"));
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.runCodeSuccess", function(client, returnTo, returnVal, code) {
	let returnClient = getPlayerFromParams(returnTo);
	if(!returnClient) {
		return false;
	}

	messagePlayerSuccess(returnClient, `Client code executed for ${client.name}!`);
	messagePlayerNormal(returnClient, `Code: ${code}`, getColourByName("yellow"));
	messagePlayerNormal(returnClient, `Returns: ${returnVal}`, getColourByName("yellow"));
});

// ---------------------------------------------------------------------------

function submitIdea(client, ideaText) {
	let position = (getPlayerVehicle(client)) ? getVehiclePosition(getPlayerVehicle(client)) : getPlayerPosition(client);
	let heading = (getPlayerVehicle(client)) ? getVehicleHeading(getPlayerVehicle(client)) : getPlayerHeading(client);
	let session = 0;
	let databaseId = 0;

	if(isConsole(client)) {
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
	let position = (getPlayerVehicle(client)) ? getVehiclePosition(getPlayerVehicle(client)) : getPlayerPosition(client);
	let heading = (getPlayerVehicle(client)) ? getVehicleHeading(getPlayerVehicle(client)) : getPlayerHeading(client);
	let session = 0;
	let databaseId = 0;

	if(isConsole(client)) {
		databaseId = -1;
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

function isDevelopmentServer() {
	return intToBool(server.getCVar("devserver"));
}

// ---------------------------------------------------------------------------