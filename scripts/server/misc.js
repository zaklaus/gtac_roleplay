// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: misc.js
// DESC: Provides any uncategorized functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function initBusinessScript() {
	console.log("[Asshat.Misc]: Initializing misc script ...");
	addMiscCommandHandlers();
	console.log("[Asshat.Misc]: Misc script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addMiscCommandHandlers() {
	console.log("[Asshat.Misc]: Adding misc commands!");
	let businessCommands = serverCommands.misc;
	for(let i in businessCommands) {
		addCommandHandler(businessCommands[i].command, businessCommands[i].handlerFunction);
	}
	console.log("[Asshat.Misc]: Misc commands added!");
	return true;
}

// ---------------------------------------------------------------------------

function setTimeCommand(command, params, client) {
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
	let hour = Number(splitParams[0]) || 0;
	let minute = Number(splitParams[1]) || 0;

	if(hour > 23 || hour < 0) {
		messageClientError(client, "The hour must be between 0 and 23!");
		return false;		
    }

	if(minute > 59 || minute < 0) {
		messageClientError(client, "The minute must be between 0 and 59!");
		return false;		
    }    
    
    gta.time.hour = hour;
    gta.time.minute = minute;

	messageAdminAction(`${client.name} set the time to ${makeReadableTime(hour, minute)}`);
	return true;
}

// ---------------------------------------------------------------------------

function setWeatherCommand(command, params, client) {
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
	let weatherId = getWeatherFromParams(splitParams[0]);

	if(!weatherId) {
		messageClientError(client, `That weather ID or name is invalid!`);
		return false;
    } 
    
    gta.forceWeather(weatherId);

    messageAdminAction(`${client.name} set the weather to to ${weatherNames[server.game][weatherId]}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function setSnowingCommand(command, params, client) {
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
    let fallingSnow = Number(splitParams[0]) || 0;
    let groundSnow = Number(splitParams[1]) || 0;

    serverConfig.fallingSnow = 0;

    messageAdminAction(`${client.name} turned falling snow ${getOnOffFromBool(intToBool(fallingSnow))} and ground snow ${getOnOffFromBool(intToBool(groundSnow))}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function toggleServerLogoCommand(command, params, client) {
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
    let logoState = Number(params) || 1;

    serverConfig.useLogo = !!logoState;

    messageAdminAction(`${client.name} turned the server logo image ${getOnOffFromBool(!!logoState).toLowerCase()}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function getPositionCommand(command, params, client) {
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

	let position = client.player.position;

	messageClientNormal(client, `Your position is: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	console.log(`Position: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterSpawnPositionCommand(command, params, client) {
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

	let position = client.player.position;
	serverConfig.newCharacter.spawnPosition = position;
	serverConfig.newCharacter.spawnHeading = client.player.heading;

    messageClientNormal(client, `The new character spawn position has been set to ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`)
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterMoneyCommand(command, params, client) {
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
	let amount = Number(splitParams[0]) || 1000;

	serverConfig.newCharacter.cash = skinId;

    messageClientNormal(client, `The new character money has been set to $${amount}`);
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterSkinCommand(command, params, client) {
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

	let skinId = 0;
	if(areParamsEmpty(params)) {
		skinId = client.player.modelIndex;
	} else {
		skinId = getSkinFromParams(params);
	}

	serverConfig.newCharacter.skin = skinId;

    messageClientNormal(client, `The new character skin has been set to ${getSkinNameFromId(skinId)} (ID ${skinId})`);
	return true;
}

// ---------------------------------------------------------------------------

function submitIdeaCommand(command, params, client) {
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

	submitIdea(client, params);

    messageClientNormal(client, `Your suggestion/idea has been sent to the developers!`);
	return true;
}

// ---------------------------------------------------------------------------

function submitBugCommand(command, params, client) {
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

	submitBugReport(client, params);

    messageClientNormal(client, `Your bug report has been sent to the developers!`);
	return true;
}

// ---------------------------------------------------------------------------