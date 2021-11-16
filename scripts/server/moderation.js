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

	messageAdminAction(`${getPlayerName(targetClient)} has been kicked from the server.`);
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
	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}set ${getPlayerName(targetClient)}'s staff title to ${staffTitle}`);
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

	messageAdmins(`${targetClient.name} ${getInlineChatColourByName("white")}has been muted by ${client.name}!`);
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

	messageAdmins(`${targetClient.name} ${getInlineChatColourByName("white")}has been un-muted by ${client.name}!`);
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

	messageAdmins(`${targetClient.name} ${getInlineChatColourByName("white")}has been frozen by ${client.name}!`);
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

	messageAdmins(`${targetClient.name} ${getInlineChatColourByName("white")}has been un-frozen by ${client.name}!`);
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
	setPlayerPosition(client, getPosBehindPos(getPlayerPosition(targetClient), getPlayerHeading(targetClient), 2));
	setPlayerHeading(client, getPlayerHeading(targetClient));
	setPlayerInterior(client, getPlayerInterior(targetClient));
	setPlayerDimension(client, getPlayerInterior(targetClient));
	updateInteriorLightsForPlayer(client, true);

	//setTimeout(function() {
	//	setPlayerPosition(client, getPosBehindPos(getPlayerPosition(targetClient), getPlayerHeading(targetClient), 2));
	//	setPlayerHeading(client, getPlayerHeading(targetClient));
	//	setPlayerInterior(client, getPlayerInterior(targetClient));
	//	setPlayerDimension(client, getPlayerInterior(targetClient));
	//	updateInteriorLightsForPlayer(client, true);
	//}, 1000);

	messagePlayerSuccess(client, `You teleported to ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}`);
}

// ===========================================================================

function getGeoIPInformationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let targetClient = getPlayerFromParams(params);
    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
    }

	let countryName = module.geoip.getCountryName(getGlobalConfig().geoIPCountryDatabaseFilePath, targetClient.ip);
	let subDivisionName = module.geoip.getSubdivisionName(getGlobalConfig().geoIPCityDatabaseFilePath, targetClient.ip);
	let cityName = module.geoip.getCityName(getGlobalConfig().geoIPCityDatabaseFilePath, targetClient.ip);

	messagePlayerInfo(client, `${getInlineChatColourByName("lightGrey")}${targetClient.name} ${getInlineChatColourByName("white")}is from ${getInlineChatColourByName("lightGrey")}${cityName}, ${subDivisionName}, ${countryName}`);
}

// ===========================================================================

function gotoVehicleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(typeof getServerData().vehicles[toInteger(params)-1] == "undefined") {
		messagePlayerError(client, "That vehicle ID doesn't exist!");
	}

	let vehicle = getServerData().vehicles[toInteger(params)-1].vehicle;

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setPlayerPosition(client, getPosAbovePos(getVehiclePosition(vehicle), 3.0));
	setPlayerInterior(client, 0);
	setPlayerDimension(client, getElementDimension(vehicle));
	updateInteriorLightsForPlayer(client, true);

	//setTimeout(function() {
	//	setPlayerPosition(client, getPosAbovePos(getVehiclePosition(vehicle), 3.0));
	//	setPlayerInterior(client, 0);
	//	setPlayerDimension(client, getElementDimension(vehicle));
	//	updateInteriorLightsForPlayer(client, true);
	//}, 500);

	messagePlayerSuccess(client, `You teleported to a ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("lightGrey")}(ID ${vehicle.id})`);
}

// ===========================================================================

function getVehicleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(typeof getServerData().vehicles[toInteger(params)-1] == "undefined") {
		messagePlayerError(client, "That vehicle ID doesn't exist!");
	}

	let vehicle = getServerData().vehicles[toInteger(params)-1].vehicle;

	setElementPosition(vehicle, getPosInFrontOfPos(getPlayerPosition(client), fixAngle(getPlayerHeading(client)), 5.0));
	setElementInterior(vehicle, getPlayerInterior(client));
	setElementDimension(vehicle, getPlayerDimension(client));

	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}teleported a ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("lightGrey")}(ID ${vehicle.id}) ${getInlineChatColourByName("white")}to you`);
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
	setPlayerPosition(client, getBusinessData(businessId).entrancePosition);
	setPlayerInterior(client, getBusinessData(businessId).entranceInterior);
	setPlayerDimension(client, getBusinessData(businessId).entranceDimension);
	updateInteriorLightsForPlayer(client, true);

	//setTimeout(function() {
	//	setPlayerPosition(client, getBusinessData(businessId).entrancePosition);
	//	setPlayerInterior(client, getBusinessData(businessId).entranceInterior);
	//	setPlayerDimension(client, getBusinessData(businessId).entranceDimension);
	//	updateInteriorLightsForPlayer(client, true);
	//}, 500);

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
	setPlayerPosition(client, getGameData().locations[getServerGame()][gameLocationId][1]);
	setPlayerInterior(client, 0);
	setPlayerDimension(client, 0);
	updateInteriorLightsForPlayer(client, true);

	//setTimeout(function() {
	//	setPlayerPosition(client, getGameData().locations[getServerGame()][gameLocationId][1]);
	//	setPlayerInterior(client, 0);
	//	setPlayerDimension(client, 0);
	//	updateInteriorLightsForPlayer(client, true);
	//}, 500);

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

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setPlayerPosition(client, getHouseData(houseId).entrancePosition);
	setPlayerInterior(client, getHouseData(houseId).entranceInterior);
	setPlayerDimension(client, getHouseData(houseId).entranceDimension);
	updateInteriorLightsForPlayer(client, true);

	//setTimeout(function() {
	//	setPlayerPosition(client, getHouseData(houseId).entrancePosition);
	//	setPlayerInterior(client, getHouseData(houseId).entranceInterior);
	//	setPlayerDimension(client, getHouseData(houseId).entranceDimension);
	//	updateInteriorLightsForPlayer(client, true);
	//}, 500);

	messagePlayerSuccess(client, `You teleported to house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description} ${getInlineChatColourByName("lightGrey")}(ID ${houseId})`);
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
	updateInteriorLightsForPlayer(client, true);

	messagePlayerSuccess(client, `You teleported to location ${getInlineChatColourByName("lightGrey")}${jobLocationId} ${getInlineChatColourByName("white")}for the ${getInlineChatColourByName("jobYellow")}${getJobData(jobId).name} ${getInlineChatColourByName("white")}job`);
}

// ===========================================================================

function gotoNewPlayerSpawnCommand(command, params, client) {
	client.player.velocity = toVector3(0.0, 0.0, 0.0);
	setPlayerPosition(client, getServerConfig().newCharacter.spawnPosition);
	setPlayerInterior(client, 0);
	setPlayerDimension(client, 0);
	updateInteriorLightsForPlayer(client, true);

	messagePlayerSuccess(client, `You teleported to the new character spawn location!`);
}

// ===========================================================================

function gotoPositionCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	params = params.replace(",", "");
	splitParams = params.split(" ");
	let x = splitParams[0] || getPlayerPosition(client).x;
	let y = splitParams[1] || getPlayerPosition(client).y;
	let z = splitParams[2] || getPlayerPosition(client).z;
	let int = splitParams[3] || getPlayerInterior(client);
	let vw = splitParams[4] || getPlayerDimension(client);

	let newPosition = toVector3(toInteger(x), toInteger(y), toInteger(z));

	let jobId = getJobFromParams(splitParams[0]) || getClosestJobLocation(getPlayerPosition(client)).job;

	client.player.velocity = toVector3(0.0, 0.0, 0.0);
	setPlayerPosition(client, newPosition);
	setPlayerInterior(client, toInteger(int));
	setPlayerDimension(client, toInteger(vw));
	updateInteriorLightsForPlayer(client, true);

	messagePlayerSuccess(client, `You teleported to coordinates ${getInlineChatColourByName("lightGrey")}${x}, ${y}, ${z} with interior ${int} and dimension ${vw}`);
}

// ===========================================================================

function teleportForwardCommand(command, params, client) {
	let distance = 1.0;
	if(!areParamsEmpty(params)) {
		if(!isNaN(params)) {
			distance = toFloat(params);
		}
	}

	setPlayerPosition(client, getPosInFrontOfPos(getPlayerPosition(client), fixAngle(getPlayerHeading(client)), distance));

	messagePlayerSuccess(client, `You teleported forward ${distance} meters`);
}

// ===========================================================================

function teleportBackwardCommand(command, params, client) {
	let distance = 1.0;
	if(!areParamsEmpty(params)) {
		if(!isNaN(params)) {
			distance = toFloat(params);
		}
	}

	setPlayerPosition(client, getPosBehindPos(getPlayerPosition(client), fixAngle(getPlayerHeading(client)), distance));

	messagePlayerSuccess(client, `You teleported backward ${getInlineChatColourByName("lightGrey")}${distance} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportLeftCommand(command, params, client) {
	let distance = 1.0;
	if(!areParamsEmpty(params)) {
		if(!isNaN(params)) {
			distance = toFloat(params);
		}
	}

	setPlayerPosition(client, getPosToLeftOfPos(getPlayerPosition(client), fixAngle(getPlayerHeading(client)), distance));

	messagePlayerSuccess(client, `You teleported left ${getInlineChatColourByName("lightGrey")}${distance} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportUpCommand(command, params, client) {
	let distance = 1.0;
	if(!areParamsEmpty(params)) {
		if(!isNaN(params)) {
			distance = toFloat(params);
		}
	}

	setPlayerPosition(client, getPosAbovePos(getPlayerPosition(client), distance));

	messagePlayerSuccess(client, `You teleported up ${getInlineChatColourByName("lightGrey")}${distance} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportDownCommand(command, params, client) {
	let distance = 1.0;
	if(!areParamsEmpty(params)) {
		if(!isNaN(params)) {
			distance = toFloat(params);
		}
	}

	setPlayerPosition(client, getPosBelowPos(getPlayerPosition(client), distance));

	messagePlayerSuccess(client, `You teleported down ${getInlineChatColourByName("lightGrey")}${distance} ${getInlineChatColourByName("white")}meters`);
}

// ===========================================================================

function teleportRightCommand(command, params, client) {
	let distance = 1.0;
	if(!areParamsEmpty(params)) {
		if(!isNaN(params)) {
			distance = toFloat(params);
		}
	}

	setPlayerPosition(client, getPosToRightOfPos(getPlayerPosition(client), fixAngle(getPlayerHeading(client)), distance));

	messagePlayerSuccess(client, `You teleported right ${getInlineChatColourByName("lightGrey")}${distance} ${getInlineChatColourByName("white")}meters`);
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
		messagePlayerInfo(client, `${getPlayerName(targetClient)}'s interior is ${getInlineChatColourByName("lightGrey")}${getPlayerInterior(targetClient)}`);
		return false;
	}

	let interiorId = splitParams[1];
	setPlayerInterior(targetClient, Number(interiorId));
	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}set ${getPlayerName(targetClient)}'s interior to ${getInlineChatColourByName("lightGrey")}${interiorId}`);
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
		messagePlayerInfo(client, `${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}'s ${getInlineChatColourByName("white")}virtual world is ${getInlineChatColourByName("lightGrey")}${getPlayerDimension(targetClient)}`);
		return false;
	}

	let dimensionId = splitParams[1];
	setPlayerDimension(targetClient, Number(dimensionId));
	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}set ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}'s ${getInlineChatColourByName("white")}virtual world to ${getInlineChatColourByName("lightGrey")}${dimensionId}`);
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

	getPlayerData(targetClient).returnToPosition = getPlayerPosition(targetClient);
	getPlayerData(targetClient).returnToHeading = getPlayerPosition(targetClient);
	getPlayerData(targetClient).returnToDimension = getPlayerDimension(targetClient);
	getPlayerData(targetClient).returnToInterior = getPlayerInterior(targetClient);
	getPlayerData(targetClient).returnToType = VRR_RETURNTO_TYPE_ADMINGET;

	if(isPlayerInAnyHouse(targetClient)) {
		getPlayerData(targetClient).returnToHouse = getPlayerHouse(targetClient);
	}

	if(isPlayerInAnyBusiness(targetClient)) {
		getPlayerData(targetClient).returnToBusiness = getPlayerBusiness(targetClient);
	}

	removePlayerFromVehicle(targetClient);
	setPlayerPosition(targetClient, getPosBehindPos(getPlayerPosition(client), getPlayerHeading(client), 2));
	setPlayerHeading(targetClient, getPlayerHeading(client));
	setPlayerInterior(targetClient, getPlayerInterior(client));
	setPlayerDimension(targetClient, getPlayerDimension(client));

	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}teleported ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)} ${getInlineChatColourByName("white")}to their position.`);
	messagePlayerAlert(targetClient, `An admin has teleported you to their location`);
}

// ===========================================================================

function returnPlayerCommand(command, params, client) {
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

	if(getPlayerData(targetClient).returnToPosition == null) {
        messagePlayerError(client, "There is nowhere to return that player to!");
        return false;
	}

	setPlayerPosition(targetClient, getPlayerData(targetClient).returnToPosition);
	setPlayerHeading(targetClient, getPlayerData(targetClient).returnToHeading);
	setPlayerInterior(targetClient, getPlayerData(targetClient).returnToInterior);
	setPlayerDimension(targetClient, getPlayerData(targetClient).returnToDimension);

	getPlayerData(targetClient).returnToPosition = null;
	getPlayerData(targetClient).returnToHeading = null;
	getPlayerData(targetClient).returnToDimension = null;
	getPlayerData(targetClient).returnToInterior = null;
	getPlayerData(targetClient).returnToHouse = null;
	getPlayerData(targetClient).returnToBusiness = null;
	getPlayerData(targetClient).returnToType = VRR_RETURNTO_TYPE_NONE;

	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}returned ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)} ${getInlineChatColourByName("white")}to their previous position.`);
	messagePlayerAlert(targetClient, `An admin has returned you to your previous location`);
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
	messageAdmins(`${client.name} has ${getInlineChatColourByName("white")}given ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)} ${getInlineChatColourByName("white")}the ${getInlineChatColourByName("lightGrey")}${flagName} ${getInlineChatColourByName("white")}staff flag`);
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
	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}has taken the ${getInlineChatColourByName("lightGrey")}${flagName} ${getInlineChatColourByName("white")}staff flag from ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}`);
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
	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}removed all staff flags from ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}`);
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

	messagePlayerInfo(client, `${getInlineChatColourByName("white")}${getPlayerName(targetClient)}'s staff flags: ${getInlineChatColourByName("lightGrey")}${tempStaffFlags.join(getInlineChatColourByName("white"))}, ${getInlineChatColourByName("lightGrey")}")}`);
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

	givePlayerCash(client, toInteger(amount));
	updatePlayerCash(targetClient);
	//messagePlayerSuccess(client, `You gave ${getInlineChatColourByName("lightGrey")}$${amount} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}`);
	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}gave ${getInlineChatColourByName("lightGrey")}$${amount} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}`)
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
		//messagePlayerSuccess(client, `You removed ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}accent.`);
		messageAdmins(client, `${client.name} removed ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}accent.`);
		messagePlayerAlert(client, `An admin removed your accent.`);
	} else {
		//messagePlayerSuccess(client, `You set ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}accent to ${getInlineChatColourByName("lightGrey")}${newAccent}`);
		messageAdmins(`${client.name} set ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}accent to ${getInlineChatColourByName("lightGrey")}${newAccent}`)
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

	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}forced ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)} (${getCharacterFullName(targetClient)}) ${getInlineChatColourByName("white")}to change their character's name.`);
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

	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}forced ${getInlineChatColourByName("lightGrey")}${getPlayerName(targetClient)}'s ${getInlineChatColourByName("white")}current character name from ${getInlineChatColourByName("lightGrey")}${oldName} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${newName}`);

	updateAllPlayerNameTags();
}

// ===========================================================================

function forcePlayerSkinCommand(command, params, client) {
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
	let skinIndex = getSkinModelIndexFromParams(splitParams[1]);

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	if(!skinIndex) {
        messagePlayerError(client, "That skin is invalid!");
        return false;
	}

	getPlayerCurrentSubAccount(targetClient).skin = skinIndex;
	setPlayerSkin(targetClient, skinIndex);

	messageAdmins(`${client.name} ${getInlineChatColourByName("white")}set ${getPlayerName(targetClient)}'s ${getInlineChatColourByName("white")}skin to ${getInlineChatColourByName("lightGrey")}${getGameData().skins[getGame()][skinIndex][1]}`);
}

// ===========================================================================

function getAllVehiclesOwnedByPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(params);

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	let vehicles = getAllVehiclesOwnedByPlayer(targetClient);

	messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Player Vehicles ${getInlineChatColourByType("clanOrange")}==========================`);
	for(let i in vehicles) {
		messagePlayerNormal(client, `🚗 ${getInlineChatColourByType("vehiclePurple")}[Vehicle Info] ${getInlineChatColourByName("white")}ID: ${getInlineChatColourByName("lightGrey")}${vehicles[i].index}, ${getInlineChatColourByName("white")}DatabaseID: ${getInlineChatColourByName("lightGrey")}${vehicles[i].databaseId}, ${getInlineChatColourByName("white")}Type: ${getInlineChatColourByName("lightGrey")}${getVehicleName(vehicles[i].vehicle)}[${vehicles[i].model}], ${getInlineChatColourByName("white")}BuyPrice: ${getInlineChatColourByName("lightGrey")}${vehicles[i].buyPrice}, ${getInlineChatColourByName("white")}RentPrice: ${getInlineChatColourByName("lightGrey")}${vehicles[i].rentPrice}, ${getInlineChatColourByName("white")}Locked: ${getInlineChatColourByName("lightGrey")}${getYesNoFromBool(vehicles[i].locked)}, ${getInlineChatColourByName("white")}Engine: ${getInlineChatColourByName("lightGrey")}${getYesNoFromBool(vehicles[i].engine)}`);
	}
}

// ===========================================================================

function getAllBusinessesOwnedByPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(params);

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	let businesses = getAllBusinessesOwnedByPlayer(targetClient);

	messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Player Businesses ${getInlineChatColourByType("clanOrange")}========================`);
	for(let i in businesses) {
		messagePlayerNormal(client, `🏢 ${getInlineChatColourByType("businessBlue")}[Business Info] ${getInlineChatColourByName("white")}Name: ${getInlineChatColourByName("lightGrey")}${businesses[i].name}, ${getInlineChatColourByName("white")}Locked: ${getInlineChatColourByName("lightGrey")}${getYesNoFromBool(intToBool(businesses[i].locked))}, ${getInlineChatColourByName("white")}ID: ${getInlineChatColourByName("lightGrey")}${businesses[i].index}/${businesses[i].databaseId}`);
	}
}

// ===========================================================================

function getAllHousesOwnedByPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(params);

    if(!targetClient) {
        messagePlayerError(client, "That player is not connected!");
        return false;
	}

	let houses = getAllHousesOwnedByPlayer(targetClient);

	messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Player Houses ${getInlineChatColourByType("clanOrange")}============================`);
	for(let i in houses) {
		messagePlayerNormal(client, `🏠 ${getInlineChatColourByType("houseGreen")}[House Info] ${getInlineChatColourByName("white")}Description: ${getInlineChatColourByName("lightGrey")}${houses[i].description}, ${getInlineChatColourByName("white")}Locked: ${getInlineChatColourByName("lightGrey")}${getYesNoFromBool(intToBool(houses[i].locked))}, ${getInlineChatColourByName("white")}ID: ${getInlineChatColourByName("lightGrey")}${houses[i].index}/${houses[i].databaseId}`);
	}
}

// ===========================================================================