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
	addModerationCommandHandlers();
}

// ---------------------------------------------------------------------------

function addModerationCommandHandlers() {
	let moderationCommands = serverCommands.moderation;
	for(let i in moderationCommands) {
		addCommandHandler(moderationCommands[i].command, moderationCommands[i].handlerFunction);
	}
}

// ---------------------------------------------------------------------------

function kickClientCommand(command, params, client) {
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
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent kicking admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		messageClientError(client, "You cannot kick this person!");
        return false;
	}
	
	message("[#996600][ADMIN]: [#FFFFFF]" + toString(targetClient.name) + " has been kicked from the server.");
	targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function muteClientCommand(command, params, client) {
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
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent muting admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		messageClientError(client, "You cannot mute this person!");
        return false;
	}
	
	message("[#996600][ADMIN]: [#FFFFFF]" + toString(targetClient.name) + " has been muted!");
	targetClient.setData("ag.muted", true, false);
}

// ---------------------------------------------------------------------------

function unMuteClientCommand(command, params, client) {
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
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent unmuting admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		messageClientError(client, "You cannot unmute this person!");
        return false;
	}
	
	message("[#996600][ADMIN]: [#FFFFFF]" + toString(targetClient.name) + " has been unmuted!");
	targetClient.removeData("ag.muted");
}

// ---------------------------------------------------------------------------

function freezeClientCommand(command, params, client) {
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
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent freeze admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		messageClientError(client, "You cannot freeze this person!");
        return false;
	}
	
	message("[#996600][ADMIN]: [#FFFFFF]" + toString(targetClient.name) + " has been frozen!");
	triggerNetworkEvent("ag.frozen", client, true);
}

// ---------------------------------------------------------------------------

function unFreezeClientCommand(command, params, client) {
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
	
    let targetClient = getClientFromParams(params);
    if(!targetClient) {
        messageClientError(client, "That player is not connected!");
        return false;
    }

	// Prevent unfreezing admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		messageClientError(client, "You cannot freeze this person!");
        return false;
	}
	
	message(`[#996600][ADMIN]: [#FFFFFF]${toString(targetClient.name)} has been un-frozen!`);
	triggerNetworkEvent("ag.frozen", client, false);
}

// ---------------------------------------------------------------------------

function addStaffFlagCommand(command, params, client) {
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

	// Prevent setting flags on admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		if(!doesClientHaveStaffPermission(client, "manageServer") && !doesClientHaveStaffPermission(client, "developer")) {
			messageClientError(client, "You cannot give staff flags to this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messageClientError(client, "That staff flag doesn't exist!");
        return false;		
	}

	giveClientStaffFlag(targetClient, flagName);
	messageClientSuccess(client, `You have given ${client.name} the ${flagName} staff flag!`);
}

// ---------------------------------------------------------------------------

function takeStaffFlagCommand(command, params, client) {
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

	// Prevent setting flags on admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		if(!doesClientHaveStaffPermission(client, "manageServer") && !doesClientHaveStaffPermission(client, "developer")) {
			messageClientError(client, "You cannot take staff flags from this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messageClientError(client, "That staff flag doesn't exist!");
        return false;		
	}

	takeClientStaffFlag(targetClient, flagName);
	messageClientSuccess(client, `You have taken the ${flagName} staff flag from ${targetClient.name}!`);
}

// ---------------------------------------------------------------------------

function clearStaffFlagsCommand(command, params, client) {
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

	// Prevent setting flags on admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "manageServer") || doesClientHaveStaffPermission(targetClient, "developer")) {
		if(!doesClientHaveStaffPermission(client, "manageServer") && !doesClientHaveStaffPermission(client, "developer")) {
			messageClientError(client, "You cannot clear staff flags for this person!");
			return false;
		}
	}

	if(!getStaffFlagValue(flagName)) {
		messageClientError(client, "That staff flag doesn't exist!");
        return false;		
	}

	clearClientStaffFlags(targetClient);
	messageClientSuccess(client, `You have cleared all staff flags off of ${targetClient.name}!`);
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
	for(let i in getServerData().staffFlagKeys) {
		let tempFlagValue = getStaffFlagValue(getServerData().staffFlagKeys[i]);
		if(doesClientHaveStaffPermission(client, tempFlagValue)) {
			tempStaffFlags.push(getServerData().staffFlagKeys[i]);
		}
	}

	messageClientInfo(client, `${targetClient.name}'s staff flags: ${tempStaffFlags.join(", ")}`);
}

// ---------------------------------------------------------------------------

function allStaffFlagsCommand(command, params, client) {
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

	messageClientInfo(client, `Staff flags: ${getServerData().staffFlagKeys.join(", ")}`);
}

// ---------------------------------------------------------------------------