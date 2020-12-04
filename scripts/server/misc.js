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
    let logoState = Number(splitParams[0]) || 1;

    serverConfig.useLogo = !!logoState;

    messageAdminAction(`${client.name} turned the server logo image ${getOnOffFromBool(intToBool(fallingSnow))}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------