// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: moderation.js
// DESC: Provides moderation commands, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initModerationScript() {
	logToConsole(LOG_INFO, "[VRR.Moderation]: Initializing moderation script ...");
	logToConsole(LOG_INFO, "[VRR.Moderation]: Moderation script initialized successfully!");
}

// ===========================================================================

function kickClientCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent kicking admins with really high permissions
	if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot kick this person!");
			return false;
		}
	}

	messageAdminAction(`${targetgetPlayerName(client)} has been kicked from the server.`);
	targetClient.disconnect();
}

// ===========================================================================

function setClientStaffTitleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let staffTitle = splitParams.slice(1).join(" ");

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	// Prevent setting titles on staff with really high permissions
	if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot set this person's staff title!");
			return false;
		}
	}

	getPlayerData(targetClient).accountData.staffTitle = staffTitle;
	messagePlayerSuccess(client, `You set ${targetgetPlayerName(client)}'s staff title to ${staffTitle}`);
	messagePlayerAlert(client, `${getPlayerName(client)} set your staff title to ${staffTitle}`);
	targetClient.disconnect();
}

// ===========================================================================

function muteClientCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent muting admins with really high permissions
	if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot mute this person!");
			return false;
		}
	}

	messageAdminAction(`${targetgetPlayerName(client)} has been muted by an admin!`);
	getPlayerData(targetClient).muted = true;
}

// ===========================================================================

function unMuteClientCommand(command, params, client) {

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent unmuting admins with really high permissions
    if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot unmute this person!");
			return false;
		}
	}

	messageAdminAction(`${targetgetPlayerName(client)} has been unmuted by an admin!`);
	getPlayerData(targetClient).muted = false;
}

// ===========================================================================

function freezeClientCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent freeze admins with really high permissions
    if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot freeze this person!");
			return false;
		}
	}

	messageAdminAction(`${toString(targetgetPlayerName(client))} has been frozen by an admin!`);
	//setPlayerFrozenState(client, state);
	setPlayerControlState(client, false);
}

// ===========================================================================

function unFreezeClientCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent unfreezing admins with really high permissions
    if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot freeze this person!");
			return false;
		}
	}

	messageAdminAction(`${toString(targetgetPlayerName(client))} has been un-frozen by an admin!`);
	//sendPlayerFrozenState(client, false);
	setPlayerControlState(client, true);
}

// ===========================================================================

function gotoPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setTimeout(function() {
		setPlayerPosition(client, getPosBehindPos(getPlayerPosition(targetClient), getPlayerHeading(targetClient), 2));
		setPlayerHeading(client, getPlayerHeading(targetClient));
		setPlayerInterior(client, getPlayerInterior(targetClient));
		setPlayerDimension(client, getPlayerInterior(targetClient));
	}, 1000);

	messagePlayerSuccess(client, `You teleported to ${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)}`);
}

// ===========================================================================

function gotoVehicleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(typeof getServerData().vehicles[toInteger(params)] == "undefined") {
		messagePlayerError(client, "That vehicle ID doesn't exist!");
	}

	let vehicle = getServerData().vehicles[toInteger(params)].vehicle;

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setTimeout(function() {
		setPlayerPosition(client, getPosAbovePos(getVehiclePosition(vehicle), 3.0));
		setPlayerInterior(client, 0);
		setPlayerDimension(client, getElementDimension(vehicle));
	}, 500);

	messagePlayerSuccess(client, `You teleported to a ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("lightGrey")}(ID ${vehicle.id})`);
}

// ===========================================================================

function gotoBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let businessId = getBusinessFromParams(params)

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "That business doesn't exist!");
		return false;
	}

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setTimeout(function() {
		setPlayerPosition(client, getBusinessData(businessId).entrancePosition);
		setPlayerInterior(client, getBusinessData(businessId).entranceInterior);
		setPlayerDimension(client, getBusinessData(businessId).entranceDimension);
	}, 500);

	messagePlayerSuccess(client, `You teleported to business ${getInlineChatColourByType("businessBlue")}${getBusinessData(businessId).name} ${getInlineChatColourByName("lightGrey")}(ID ${businessId})`);
}

// ===========================================================================

function gotoGameLocationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let gameLocationId = getGameLocationFromParams(params);

	if(!gameLocationId) {
		messagePlayerError(client, "That game location doesn't exist!");
		return false;
	}

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setTimeout(function() {
		setPlayerPosition(client, getGameData().locations[getServerGame()][gameLocationId][1]);
		setPlayerInterior(client, 0);
		setPlayerDimension(client, 0);
	}, 500);

	messagePlayerSuccess(client, `You teleported to game location ${getInlineChatColourByName("lightGrey")}${getGameData().locations[getServerGame()][gameLocationId][0]}`);
}

// ===========================================================================

function gotoHouseCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let houseId = getHouseFromParams(params)

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "That house doesn't exist!");
		return false;
	}

	client.player.velocity = toVector3(0.0, 0.0, 0.0);
	setTimeout(function() {
		setPlayerPosition(client, getHouseData(houseId).entrancePosition);
		setPlayerInterior(client, getHouseData(houseId).entranceInterior);
		setPlayerDimension(client, getHouseData(houseId).entranceDimension);
	}, 500);

	messagePlayerSuccess(client, `You teleported to business ${getInlineChatColourByType("businessBlue")}${getHouseData(houseId).description} ${getInlineChatColourByName("lightGrey")}(ID ${houseId})`);
}

// ===========================================================================

function gotoJobLocationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let jobId = getJobFromParams(splitParams[0]) || getClosestJobLocation(getPlayerPosition(client)).job;

	if(!getJobData(jobId)) {
		messagePlayerError(client, `That job does not exist!`);
		return false;
	}

	let jobLocationId = splitParams[1] || 0;

	if(typeof getJobData(jobId).locations[jobLocationId] == "undefined") {
		messagePlayerError(client, `That location ID does not exist!`);
		return false;
	}

	client.player.velocity = toVector3(0.0, 0.0, 0.0);
	setPlayerPosition(client, getJobData(jobId).locations[jobLocationId].position);
	setPlayerInterior(client, getJobData(jobId).locations[jobLocationId].interior);
	setPlayerDimension(client, getJobData(jobId).locations[jobLocationId].dimension);

	messagePlayerSuccess(client, `You teleported to location ${getInlineChatColourByName("lightGrey")}${jobLocationId} ${getInlineChatColourByName("white")}for the ${getInlineChatColourByName("lightGrey")}${getJobData(jobId).name} ${getInlineChatColourByName("white")}job`);
}

// ===========================================================================

function gotoPositionCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.replace(",", "").split(" ");
	let x = splitParams[0] || getPlayerPosition(client).x;
	let y = splitParams[1] || getPlayerPosition(client).y;
	let z = splitParams[2] || getPlayerPosition(client).z;
	let int = splitParams[3] || getPlayerInterior(client);
	let vw = splitParams[4] || getPlayerDimension(client);

	let newPosition = toVector3(Number(x), Number(y), Number(z));

	let jobId = getJobFromParams(splitParams[0]) || getClosestJobLocation(getPlayerPosition(client)).job;

	client.player.velocity = toVector3(0.0, 0.0, 0.0);
	setPlayerPosition(client, newPosition);
	setPlayerInterior(client, Number(int));
	setPlayerDimension(client, Number(vw));

	messagePlayerSuccess(client, `You teleported to coordinates ${getInlineChatColourByName("lightGrey")}${x}, ${y}, ${z} with interior ${int} and dimension ${vw}`);
}

// ===========================================================================

function teleportForwardCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), params));

	messagePlayerSuccess(client, `You teleported forward ${params} meters`);
}

// ===========================================================================

function teleportBackwardCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosBehindPos(getPlayerPosition(client), getPlayerHeading(client), params));

	messagePlayerSuccess(client, `You teleported backward ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportLeftCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosToLeftOfPos(getPlayerPosition(client), getPlayerHeading(client), params));

	messagePlayerSuccess(client, `You teleported left ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportUpCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosAbovePos(getPlayerPosition(client), params));

	messagePlayerSuccess(client, `You teleported up ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportDownCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosBelowPos(getPlayerPosition(client), params));

	messagePlayerSuccess(client, `You teleported down ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportRightCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosToRightOfPos(getPlayerPosition(client), getPlayerHeading(client), params));

	messagePlayerSuccess(client, `You teleported right ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function playerInteriorCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	if(!targetClient) {
		messagePlayerError(client, "Player not found!");
		return false;
	}

	if(getParamsCount(params, " ") == 1) {
		messagePlayerInfo(client, `${targetgetPlayerName(client)}'s interior is ${getInlineChatColourByName("lightGrey")}${getPlayerInterior(targetClient)}`);
		return false;
	}

	let interiorId = splitParams[1];
	setPlayerInterior(targetClient, Number(interiorId));
	messagePlayerSuccess(client, `You set ${targetgetPlayerName(client)}'s interior to ${getInlineChatColourByName("lightGrey")}${interiorId}`);
}

// ===========================================================================

function playerVirtualWorldCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	if(!targetClient) {
		messagePlayerError(client, "Player not found!");
		return false;
	}

	if(getParamsCount(params, " ") == 1) {
		messagePlayerInfo(client, `${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)}'s ${getInlineChatColourByName("white")}virtual world is ${getInlineChatColourByName("lightGrey")}${getPlayerDimension(targetClient)}`);
		return false;
	}

	let dimensionId = splitParams[1];
	setPlayerDimension(targetClient, Number(dimensionId));
	messagePlayerSuccess(client, `You set ${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)}'s ${getInlineChatColourByName("white")}virtual world to ${getInlineChatColourByName("lightGrey")}${dimensionId}`);
}

// ===========================================================================

function getPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	removePlayerFromVehicle(targetClient);
	setPlayerPosition(targetClient, getPosBehindPos(getPlayerPosition(client), getPlayerHeading(client), 2));
	setPlayerHeading(targetClient, getPlayerHeading(client));
	setPlayerInterior(targetClient, getPlayerInterior(client));
	setPlayerDimension(targetClient, getPlayerDimension(client));

	if(isPlayerInAnyBusiness(client)) {
		setEntityData(client, "vrr.inBusiness", getPlayerBusiness(client));
	}

	if(isPlayerInAnyBusiness(client)) {
		setEntityData(client, "vrr.inHouse", getPlayerBusiness(client));
	}

	messagePlayerSuccess(client, `You teleported ${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)} ${getInlineChatColourByName("white")}to you.`);
	messagePlayerAlert(targetClient, `An admin has teleported you to their location`);
}

// ===========================================================================

function addStaffFlagCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split("");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent setting flags on admins with really high permissions
    if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot give staff flags to this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messagePlayerError(client, "That staff flag doesn't exist!");
        return false;
	}

	givePlayerStaffFlag(targetClient, flagName);
	messagePlayerSuccess(client, `You have ${getBoolRedGreenInlineColour(true)}given ${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)} ${getInlineChatColourByName("white")}the ${getInlineChatColourByName("lightGrey")}${flagName} ${getInlineChatColourByName("white")}staff flag`);
}

// ===========================================================================

function takeStaffFlagCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split("");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent setting flags on admins with really high permissions
    if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot take staff flags from this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messagePlayerError(client, "That staff flag doesn't exist!");
        return false;
	}

	takePlayerStaffFlag(targetClient, flagName);
	messagePlayerSuccess(client, `You have ${getBoolRedGreenInlineColour(false)}taken ${getInlineChatColourByName("white")}the ${getInlineChatColourByName("lightGrey")}${flagName} ${getInlineChatColourByName("white")}staff flag from ${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)}`);
}

// ===========================================================================

function clearStaffFlagsCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split("");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	// Prevent setting flags on admins with really high permissions
	if(doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesPlayerHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesPlayerHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messagePlayerError(client, "You cannot clear staff flags for this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messagePlayerError(client, "That staff flag doesn't exist!");
        return false;
	}

	clearPlayerStaffFlags(targetClient);
	messagePlayerSuccess(client, `You have removed all staff flags from ${getInlineChatColourByName("lightGrey")}${targetgetPlayerName(client)}`);
}

// ===========================================================================

function getStaffFlagsCommand(command, params, client) {
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

	let splitParams = params.split("");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	let tempStaffFlags = [];
	let serverBitFlagKeys = getServerBitFlagKeys();
	for(let i in serverBitFlagKeys) {
		let tempFlagValue = getStaffFlagValue(serverBitFlagKeys[i]);
		if(doesPlayerHaveStaffPermission(client, tempFlagValue)) {
			tempStaffFlags.push(serverBitFlagKeys[i]);
		}
	}

	messagePlayerInfo(client, `${getInlineChatColourByName("white")}${targetgetPlayerName(client)}'s staff flags: ${getInlineChatColourByName("lightGrey")}${tempStaffFlags.join(getInlineChatColourByName("white"))}, ${getInlineChatColourByName("lightGrey")}")}`);
}

// ===========================================================================

function allStaffFlagsCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split("");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	messagePlayerInfo(client, `${getInlineChatColourByName("white")}Staff flags: ${getInlineChatColourByName("lightGrey")}${getServerBitFlagKeys().join(getInlineChatColourByName("white"))}, ${getInlineChatColourByName("lightGrey")}")}`);
}

// ===========================================================================

function givePlayerMoneyCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let amount = toInteger(splitParams[1]);

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	givePlayerMoney(client, toInteger(amount));
	updatePlayerCash(targetClient);
	messagePlayerSuccess(client, `You gave ${getInlineChatColourByName("lightGrey")}$${amount} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}`);
	messagePlayerAlert(client, `An admin gave you ${getInlineChatColourByName("lightGrey")}$${amount}`);
}

// ===========================================================================

function forcePlayerAccentCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let newAccent = splitParams[1] || "none";

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	if(toLowerCase(newAccent) == "none") {
		newAccent = "";
	}

	setPlayerAccentText(client, newAccent);

	if(newAccent == "") {
		messagePlayerSuccess(client, `You removed ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}accent.`);
		messagePlayerAlert(client, `An admin removed your accent.`);
	} else {
		messagePlayerSuccess(client, `You set ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}accent to ${getInlineChatColourByName("lightGrey")}${newAccent}`);
		messagePlayerAlert(client, `An admin set your accent to ${getInlineChatColourByName("lightGrey")}${newAccent}`);
	}
}

// ===========================================================================

function forceCharacterNameChangeCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	getPlayerData(targetClient).changingCharacterName = true;

	messagePlayerSuccess(client, `You forced ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)} (${getCharacterFullName(targetClient)}) ${getInlineChatColourByName("white")}to change their character's name.`);
	showPlayerNewCharacterFailedGUI(targetClient, "Non-RP name! Choose a new one:");
}

// ===========================================================================

function forceCharacterNameCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	//if(areThereEnoughParams(params, 3, " ")) {
	//	messagePlayerSyntax(client, getCommandSyntaxText(command));
	//	return false;
	//}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let firstName = splitParams[1];
	let lastName = splitParams[2];

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	firstName = fixCharacterName(firstName);
	lastName = fixCharacterName(lastName);
	let newName = `${firstName} ${lastName}`;
	let oldName = getCharacterFullName(targetClient);

	getPlayerCurrentSubAccount(targetClient).firstName = firstName;
	getPlayerCurrentSubAccount(targetClient).lastName = lastName;

	messagePlayerSuccess(client, `You forced ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}'s ${getInlineChatColourByName("white")}current character name from ${getInlineChatColourByName("lightGrey")}${oldName} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${newName}`);

	updateAllPlayerNameTags();
}

// ===========================================================================