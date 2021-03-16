// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: moderation.js
// DESC: Provides moderation commands, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initModerationScript() {
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

	messageAdminAction(`${targetClient.name} has been kicked from the server.`);
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
	messagePlayerSuccess(client, `You set ${targetClient.name}'s staff title to ${staffTitle}`);
	messagePlayerAlert(client, `${client.name} set your staff title to ${staffTitle}`);
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

	messageAdminAction(`${targetClient.name} has been muted by an admin!`);
	setEntityData(targetClient, "ag.muted", true, false);
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

	messageAdminAction(`${targetClient.name} has been unmuted by an admin!`);
	removeEntityData(targetClient, "ag.muted");
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

	messageAdminAction(`${toString(targetClient.name)} has been frozen by an admin!`);
	setPlayerFrozenState(client, state);
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

	messageAdminAction(`${toString(targetClient.name)} has been un-frozen by an admin!`);
	sendPlayerFrozenState(client, false);
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

	messagePlayerSuccess(client, `You teleported to [#AAAAAA]${targetClient.name}`);
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
		setPlayerDimension(client, getVehicleDimension(vehicle));
	}, 500);

	messagePlayerSuccess(client, `You teleported to a [#CC22CC]${getVehicleName(vehicle)} [#AAAAAA](ID ${vehicle.id})`);
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

	messagePlayerSuccess(client, `You teleported to business [#0099FF]${getBusinessData(businessId).name} [#AAAAAA](ID ${businessId})`);
}

// ===========================================================================

function gotoGameLocationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let gameLocationId = getGameLocationFromParams(params)

	if(!gameLocationId) {
		messagePlayerError(client, "That game location doesn't exist!");
		return false;
	}

	setPlayerVelocity(client, toVector3(0.0, 0.0, 0.0));
	setTimeout(function() {
		setPlayerPosition(client, getGameData().locations[businessId][1]);
		setPlayerInterior(client, 0);
		setPlayerDimension(client, 0);
	}, 500);

	messagePlayerSuccess(client, `You teleported to game location [#AAAAAA]${getGameData().locations[businessId][0]}`);
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

	messagePlayerSuccess(client, `You teleported to business [#0099FF]${getHouseData(houseId).description} [#AAAAAA](ID ${houseId})`);
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

	messagePlayerSuccess(client, `You teleported to location [#AAAAAA]${jobLocationId} [#FFFFFF]for the [#AAAAAA]${getJobData(jobId).name} [#FFFFFF]job`);
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

	messagePlayerSuccess(client, `You teleported to coordinates [#AAAAAA]${x}, ${y}, ${z} with interior ${int} and dimension ${vw}`);
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

	messagePlayerSuccess(client, `You teleported backward [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ===========================================================================

function teleportLeftCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosToLeftOfPos(getPlayerPosition(client), getPlayerHeading(client), params));

	messagePlayerSuccess(client, `You teleported left [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ===========================================================================

function teleportUpCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosAbovePos(getPlayerPosition(client), params));

	messagePlayerSuccess(client, `You teleported up [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ===========================================================================

function teleportDownCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosBelowPos(getPlayerPosition(client), params));

	messagePlayerSuccess(client, `You teleported down [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ===========================================================================

function teleportRightCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	setPlayerPosition(client, getPosToRightOfPos(getPlayerPosition(client), getPlayerHeading(client), params));

	messagePlayerSuccess(client, `You teleported right [#AAAAAA]${params} [#FFFFFF]meters`);
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
		messagePlayerInfo(client, `${targetClient.name}'s interior is [#AAAAAA]${getPlayerInterior(targetClient)}`);
		return false;
	}

	let interiorId = splitParams[1];
	setPlayerInterior(targetClient, Number(interiorId));
	messagePlayerSuccess(client, `You set ${targetClient.name}'s interior to [#AAAAAA]${interiorId}`);
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
		messagePlayerInfo(client, `[#AAAAAA]${targetClient.name}'s [#FFFFFF]virtual world is [#AAAAAA]${getPlayerDimension(targetClient)}`);
		return false;
	}

	let dimensionId = splitParams[1];
	setPlayerDimension(targetClient, Number(dimensionId));
	messagePlayerSuccess(client, `You set [#AAAAAA]${targetClient.name}'s [#FFFFFF]virtual world to [#AAAAAA]${dimensionId}`);
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

	if(isPlayerInAnyBusiness(client)) {
		let businessData = getBusinessData(getPlayerBusiness(client));
		setPlayerInterior(targetClient, businessData.exitInterior);
		setPlayerDimension(targetClient, businessData.exitDimension);
	}

	if(isPlayerInAnyHouse(client)) {
		let houseData = getHouseData(getPlayerHouse(client));
		setPlayerInterior(targetClient, houseData.exitInterior);
		setPlayerDimension(client, houseData.exitDimension);
	}

	messagePlayerSuccess(client, `You teleported [#AAAAAA]${targetClient.name} [#FFFFFF]to you.`);
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
	messagePlayerSuccess(client, `You have ${getBoolRedGreenInlineColour(true)}given [#AAAAAA]${targetClient.name} [#FFFFFF]the [#AAAAAA]${flagName} [#FFFFFF]staff flag`);
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
	messagePlayerSuccess(client, `You have ${getBoolRedGreenInlineColour(false)}taken [#FFFFFF]the [#AAAAAA]${flagName} [#FFFFFF]staff flag from [#AAAAAA]${targetClient.name}`);
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
	messagePlayerSuccess(client, `You have removed all staff flags from [#AAAAAA]${targetClient.name}`);
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

	messagePlayerInfo(client, `[#FFFFFF]${targetClient.name}'s staff flags: [#AAAAAA]${tempStaffFlags.join("[#FFFFFF], [#AAAAAA]")}`);
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

	messagePlayerInfo(client, `[#FFFFFF]Staff flags: [#AAAAAA]${getServerBitFlagKeys().join("[#FFFFFF], [#AAAAAA]")}`);
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

	getPlayerCurrentSubAccount(targetClient).cash += amount;
	updatePlayerCash(targetClient);
	messagePlayerSuccess(client, `You gave [#AAAAAA]$${amount} [#FFFFFF]to [#AAAAAA]${getCharacterFullName(targetClient)}`);
	messagePlayerAlert(client, `An admin gave you [#AAAAAA]$${amount}`);
}

// ===========================================================================