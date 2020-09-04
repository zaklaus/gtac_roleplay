// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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

function kickClientCommand(command, params, client, fromDiscord) {
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
	
	message("[#996600][ADMIN]: [#FFFFFF]" + String(targetClient.name) + " has been kicked from the server.");
	targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function muteClientCommand(command, params, client, fromDiscord) {
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
	
	message("[#996600][ADMIN]: [#FFFFFF]" + String(targetClient.name) + " has been muted!");
	targetClient.setData("ag.muted", true, false);
}

// ---------------------------------------------------------------------------

function unMuteClientCommand(command, params, client, fromDiscord) {
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
	
	message("[#996600][ADMIN]: [#FFFFFF]" + String(targetClient.name) + " has been unmuted!");
	targetClient.removeData("ag.muted");
}

// ---------------------------------------------------------------------------

function freezeClientCommand(command, params, client, fromDiscord) {
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
	
	message("[#996600][ADMIN]: [#FFFFFF]" + String(targetClient.name) + " has been frozen!");
	triggerNetworkEvent("ag.frozen", client, true);
}

// ---------------------------------------------------------------------------

function unFreezeClientCommand(command, params, client, fromDiscord) {
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
	
	message("[#996600][ADMIN]: [#FFFFFF]" + String(targetClient.name) + " has been un-frozen!");
	triggerNetworkEvent("ag.frozen", client, false);
}

// ---------------------------------------------------------------------------