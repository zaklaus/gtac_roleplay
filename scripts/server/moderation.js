// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: moderation.js
// DESC: Provides moderation commands, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initModerationScript() {
}

// ---------------------------------------------------------------------------

function kickClientCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent kicking admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot kick this person!");
			return false;
		}
	}
	
	messageAdminAction(`${targetClient.name} has been kicked from the server.`);
	targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function setClientStaffTitleCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	let splitParams = params.split(" ");
	let targetClient = getClientFromParams(splitParams[0]);
	let staffTitle = splitParams.slice(1).join(" ");

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
	}

	// Prevent setting titles on staff with really high permissions
	if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot set this person's staff title!");
			return false;
		}
	}
	
	getPlayerData(targetClient).accountData.staffTitle = staffTitle;
	messageClientSuccess(client, `You set ${targetClient.name}'s staff title to ${staffTitle}`);
	messageClientAlert(client, `${client.name} set your staff title to ${staffTitle}`);
	targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function muteClientCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent muting admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot mute this person!");
			return false;
		}
	}
	
	messageAdminAction(`${targetClient.name} has been muted by an admin!`);
	setEntityData(targetClient, "ag.muted", true, false);
}

// ---------------------------------------------------------------------------

function unMuteClientCommand(command, params, client) {
	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent unmuting admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot unmute this person!");
			return false;
		}
	}		
	
	messageAdminAction(`${targetClient.name} has been unmuted by an admin!`);
	removeEntityData(targetClient, "ag.muted");
}

// ---------------------------------------------------------------------------

function freezeClientCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent freeze admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot freeze this person!");
			return false;
		}
	}
	
	messageAdminAction(`${toString(targetClient.name)} has been frozen by an admin!`);
	triggerNetworkEvent("ag.frozen", client, true);
}

// ---------------------------------------------------------------------------

function unFreezeClientCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent unfreezing admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot freeze this person!");
			return false;
		}
	}
	
	messageAdminAction(`${toString(targetClient.name)} has been un-frozen by an admin!`);
	triggerNetworkEvent("ag.frozen", client, false);
}

// ---------------------------------------------------------------------------

function gotoPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }
	
	//message(`[#996600][ADMIN]: [#FFFFFF]${toString(targetClient.name)} has been un-frozen by an admin!`);
	
	triggerNetworkEvent("ag.position", client, getPosBehindPos(getPlayerPosition(targetClient), getPlayerHeading(targetClient), 2));
	triggerNetworkEvent("ag.heading", client, getPlayerHeading(targetClient));
	
	if(isPlayerInAnyBusiness(targetClient)) {
		let businessData = getBusinessData(getPlayerBusiness(targetClient));
		triggerNetworkEvent("ag.interior", client, businessData.exitInterior);
		//triggerNetworkEvent("ag.dimension", client, businessData.exitInterior);
		client.player.dimension = businessData.exitDimension;
	}

	if(isPlayerInAnyHouse(targetClient)) {
		let houseData = getHouseData(getPlayerHouse(targetClient));
		triggerNetworkEvent("ag.interior", client, houseData.exitInterior);
		//triggerNetworkEvent("ag.dimension", client, houseData.exitInterior);
		client.player.dimension = houseData.exitDimension;
	}
	messageClientSuccess(client, `You teleported to [#AAAAAA]${targetClient.name}`);
}

// ---------------------------------------------------------------------------

function teleportToVehicleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(typeof getServerData().vehicles[toInteger(params)] == "undefined") {
		messageClientError(client, "That vehicle ID doesn't exist!");
	}

	let vehicle = getServerData().vehicles[toInteger(params)].vehicle;
	
	triggerNetworkEvent("ag.position", client, getPosAbovePos(getVehiclePosition(vehicle), 3.0));
	
	messageClientSuccess(client, `You teleported to vehicle [#AAAAAA]${toInteger(params)}`);
}

// ---------------------------------------------------------------------------

function teleportForwardCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	triggerNetworkEvent("ag.position", client, getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), params));
	
	messageClientSuccess(client, `You teleported forward ${params} meters`);
}

// ---------------------------------------------------------------------------

function teleportBackwardCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	triggerNetworkEvent("ag.position", client, getPosBehindPos(getPlayerPosition(client), getPlayerHeading(client), params));
	
	messageClientSuccess(client, `You teleported backward [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ---------------------------------------------------------------------------

function teleportLeftCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	triggerNetworkEvent("ag.position", client, getPosToLeftOfPos(getPlayerPosition(client), getPlayerHeading(client), params));
	
	messageClientSuccess(client, `You teleported left [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ---------------------------------------------------------------------------

function teleportUpCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	triggerNetworkEvent("ag.position", client, getPosAbovePos(getPlayerPosition(client), params));
	
	messageClientSuccess(client, `You teleported up [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ---------------------------------------------------------------------------

function teleportDownCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	triggerNetworkEvent("ag.position", client, getPosBelowPos(getPlayerPosition(client), params));
	
	messageClientSuccess(client, `You teleported down [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ---------------------------------------------------------------------------

function teleportRightCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	triggerNetworkEvent("ag.position", client, getPosToRightOfPos(getPlayerPosition(client), getPlayerHeading(client), params));
	
	messageClientSuccess(client, `You teleported right [#AAAAAA]${params} [#FFFFFF]meters`);
}

// ---------------------------------------------------------------------------

function getPlayerCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
	}

	triggerNetworkEvent("ag.removeFromVehicle", targetClient);
	triggerNetworkEvent("ag.position", targetClient, getPosBehindPos(getPlayerPosition(client), getPlayerHeading(client), 2));
	triggerNetworkEvent("ag.heading", targetClient, getPlayerHeading(client));
	
	if(isPlayerInAnyBusiness(client)) {
		let businessData = getBusinessData(getPlayerBusiness(client));
		triggerNetworkEvent("ag.interior", targetClient, businessData.exitInterior);
		//triggerNetworkEvent("ag.dimension", client, businessData.exitInterior);
		targetClient.player.dimension = businessData.exitDimension;
	}

	if(isPlayerInAnyHouse(client)) {
		let houseData = getHouseData(getPlayerHouse(client));
		triggerNetworkEvent("ag.interior", targetClient, houseData.exitInterior);
		//triggerNetworkEvent("ag.dimension", client, houseData.exitInterior);
		targetClient.player.dimension = houseData.exitDimension;
	}

	messageClientSuccess(client, `You teleported [#AAAAAA]${targetClient.name} [#FFFFFF]to you.`);
	messageClientAlert(targetClient, `An admin has teleported you to their location`);
}

// ---------------------------------------------------------------------------

function addStaffFlagCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	let splitParams = params.split("");
	let targetClient = getClientFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent setting flags on admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot give staff flags to this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messageClientError(client, "That staff flag doesn't exist!");
        return false;
	}

	giveClientStaffFlag(targetClient, flagName);
	messageClientSuccess(client, `You have ${getBoolRedGreenInlineColour(true)}given [#AAAAAA]${targetClient.name} [#FFFFFF]the [#AAAAAA]${flagName} [#FFFFFF]staff flag`);
}

// ---------------------------------------------------------------------------

function takeStaffFlagCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	let splitParams = params.split("");
	let targetClient = getClientFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent setting flags on admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot take staff flags from this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messageClientError(client, "That staff flag doesn't exist!");
        return false;		
	}

	takeClientStaffFlag(targetClient, flagName);
	messageClientSuccess(client, `You have ${getBoolRedGreenInlineColour(false)}taken [#FFFFFF]the [#AAAAAA]${flagName} [#FFFFFF]staff flag from [#AAAAAA]${targetClient.name}`);
}

// ---------------------------------------------------------------------------

function clearStaffFlagsCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	let splitParams = params.split("");
	let targetClient = getClientFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent setting flags on admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("manageServer")) || doesClientHaveStaffPermission(targetClient, getStaffFlagsCommand("developer"))) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagsCommand("manageServer")) && !doesClientHaveStaffPermission(client, getStaffFlagsCommand("developer"))) {
			messageClientError(client, "You cannot clear staff flags for this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messageClientError(client, "That staff flag doesn't exist!");
        return false;		
	}

	clearClientStaffFlags(targetClient);
	messageClientSuccess(client, `You have removed all staff flags from [#AAAAAA]${targetClient.name}`);
}

// ---------------------------------------------------------------------------

function getStaffFlagsCommand(command, params, client) {
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
	
	let splitParams = params.split("");
	let targetClient = getClientFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
	}
	
	let tempStaffFlags = [];
	let serverBitFlagKeys = getServerBitFlagKeys();
	for(let i in serverBitFlagKeys) {
		let tempFlagValue = getStaffFlagValue(serverBitFlagKeys[i]);
		if(doesClientHaveStaffPermission(client, tempFlagValue)) {
			tempStaffFlags.push(serverBitFlagKeys[i]);
		}
	}

	messageClientInfo(client, `[#FFFFFF]${targetClient.name}'s staff flags: [#AAAAAA]${tempStaffFlags.join("[#FFFFFF], [#AAAAAA]")}`);
}

// ---------------------------------------------------------------------------

function allStaffFlagsCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	let splitParams = params.split("");
	let targetClient = getClientFromParams(splitParams[0]);
	let flagName = splitParams[1] || "none";

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
	}

	messageClientInfo(client, `[#FFFFFF]Staff flags: [#AAAAAA]${getServerBitFlagKeys().join("[#FFFFFF], [#AAAAAA]")}`);
}

// ---------------------------------------------------------------------------

function givePlayerMoneyCommand(command, params, client) {	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	let splitParams = params.split(" ");
	let targetClient = getClientFromParams(splitParams[0]);
	let amount = toInteger(splitParams[1]);

    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
	}
	
	getClientCurrentSubAccount(targetClient).cash += amount;
	updatePlayerCash(targetClient);
	messageClientSuccess(client, `You gave [#AAAAAA]$${amount} [#FFFFFF]to [#AAAAAA]${getCharacterFullName(targetClient)}`);
	messageClientAlert(client, `An admin gave you [#AAAAAA]$${amount}`);
}

// ---------------------------------------------------------------------------