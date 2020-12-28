// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: config.js
// DESC: Provides server configuration
// TYPE: Server (JavaScript)
// ===========================================================================

let serverConfig = {};

let globalConfig = {
	accountPasswordHash: "SHA512",
	npcFarProximity: 100,
	npcMediumProximity: 40,
	npcCloseProximity: 12,
	meActionDistance: 20,
	doActionDistance: 15,
	shoutDistance: 30,
	talkDistance: 10,
	whisperDistance: 2,
	megaphoneDistance: 40,
	vehicleLockDistance: 5,
	startWorkingDistance: 5,
	takeJobDistance: 5,
	stopWorkingDistance: 10,
	spawnCarDistance: 5,
	payAndSprayDistance: 5,	
	defaultKeybinds: [
		new serverClasses.keyBindData(false, toInteger(SDLK_i), "engine"),
		new serverClasses.keyBindData(false, toInteger(SDLK_k), "lights"),
		new serverClasses.keyBindData(false, toInteger(SDLK_l), "lock"),
		new serverClasses.keyBindData(false, toInteger(SDLK_f), "enter"),
		new serverClasses.keyBindData(false, toInteger(SDLK_g), "passenger"),
		new serverClasses.keyBindData(false, toInteger(SDLK_m), "cursor"),
	],
	exitPropertyDistance: 3.0,
	enterPropertyDistance: 3.0,
	businessDimensionStart: 1000,
	houseDimensionStart: 3000,	
	buyVehicleDriveAwayDistance: 25.0,
	returnToJobVehicleTime: 30,
};

let gameConfig = {
	blipSprites: [
		false,
		{	// GTA III
			policeStation: 8,
			fireStation: 9,
			hospital: 12, 
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			restaurant: -1,
			fastFood: -1,
			bank: 0,
			fuelStation: -1,
			business: -1,
			house: -1,
		},
		{	// GTA VC
			policeStation: 0,
			fireStation: 0,
			hospital: 0, 
			ammunation: 16,
			payAndSpray: 27,
			vehicleDealership: 7,
			restaurant: -1,
			fastFood: -1,
			bank: 0,
			fuelStation: -1,
			business: -1,
			house: -1,			
		},
		{	// GTA SA
			policeStation: 30,
			fireStation: 20,
			hospital: 22, 
			ammunation: 6,
			payAndSpray: 63,
			vehicleDealership: 55,
			restaurant: -1,
			fastFood: -1,
			bank: 52,
			fuelStation: 0,
			business: -1,
			house: -1,			
		},
		{	// GTA UG
			policeStation: 8,
			fireStation: 9,
			hospital: 12, 
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			restaurant: -1,
			fastFood: -1,
			bank: 52,
			fuelStation: 0,
			business: -1,
			house: -1,			
		},
		{	// GTA IV
			policeStation: 8,
			fireStation: 9,
			hospital: 12, 
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			restaurant: -1,
			fastFood: -1,
			bank: 52,
			fuelStation: 0,
			business: -1,
			house: -1,			
		},						
	],
	pickupModels: [
		{},

		{ // GTA 3
			policeStation: 1361,
			fireStation: 1361,
			hospital: 1361, 
			ammunation: 1361,
			payAndSpray: 1361,
			vehicleDealership: 1361,
			restaurant: 1361,
			fastFood: 1361,
			bank: 1323,
			fuelStation: 1361,
			business: 1361,
			house: 1361,
			clothes: 1361,
			misc: 1361,
		},
		
		{ // GTA Vice City
			policeStation: 406,
			fireStation: 406,
			hospital: 406, 
			ammunation: 406,
			payAndSpray: 406,
			vehicleDealership: 406,
			restaurant: 406,
			fastFood: 406,
			bank: 408,
			fuelStation: 406,
			business: 406,
			house: 407,
			clothes: 409,
			misc: 1361,
		},

		{ // GTA San Andreas
			policeStation: 1239,
			fireStation: 1239,
			hospital: 1239, 
			ammunation: 1239,
			payAndSpray: 1239,
			vehicleDealership: 1239,
			restaurant: 1239,
			fastFood: 1239,
			bank: 1274,
			fuelStation: 1239,
			business: 1272,
			house: 1273,
			clothes: 1239,
		}
	],
	pickupTypes: [
		{},

		{ // GTA 3
			business: 0,
			house: 0,
			bank: 0,
			clothes: 0,
			info: 0,
		},
		
		{ // GTA Vice City
			business: 0,
			house: 0,
			bank: 0,
			clothes: 0,
			info: 0,
		},

		{ // GTA San Andreas
			business: 1,
			house: 1,
			bank: 1,
			clothes: 1,
			info: 1,
		}	
	],

	// THIS IS SCREEN HEIGHT, NOT ACTUAL DOOR POSITION IN THE WORLD
	propertyLabelHeight: [
		false,
		85,
		85,
		85,
		85,
		85,
		85,
	],

	removedWorldObjects: [
		false,
		[
			new serverClasses.removedWorldObjectData("fraightback04", new Vec3(1229.88, -84.8012, 13.4004), 50.0), // Truck trailer in Easy Credit Autos dealership parking lot
			new serverClasses.removedWorldObjectData("fraightback03", new Vec3(1239.49, -68.0529, 11.6914), 50.0), // Truck trailer in Easy Credit Autos dealership parking lot
		],
		[],
		[],
		[],
		[],
		[],
	]
};

// ----------------------------------------------------------------------------

function initConfigScript() {
	console.log("[Asshat.Config]: Initializing config script ...");
	console.log("[Asshat.Config]: Config script initialized!");
}

// ---------------------------------------------------------------------------

function loadServerConfigFromGameAndPort(gameId, port) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_game = ${gameId} AND svr_port = ${port} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempServerConfigData = new serverClasses.serverConfigData(dbAssoc);
				freeDatabaseQuery(dbQuery);
				return tempServerConfigData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}	
	return false;
}

// ---------------------------------------------------------------------------

function loadServerConfigFromId(tempServerId) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_id = ${tempServerId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempServerConfigData = serverClasses.serverConfigData(dbAssoc);
				freeDatabaseQuery(dbQuery);
				return tempServerConfigData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	return false;
}

// ----------------------------------------------------------------------------

function applyConfigToServer(tempServerConfig) {
	server.name = tempServerConfig.name;
	server.password = tempServerConfig.password;
	gta.time.hour = tempServerConfig.hour;
	gta.time.minute = tempServerConfig.minute;
	gta.forceWeather(tempServerConfig.weather);

	updateServerRules();
}

// ----------------------------------------------------------------------------

function saveServerConfigToDatabase(serverConfigData) {
	console.log(`[Asshat.Config]: Saving server ${serverConfigData.databaseId} configuration to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) { 
		let safeServerName = escapeDatabaseString(dbConnection, serverConfigData.name);
		let safePassword = escapeDatabaseString(dbConnection, serverConfigData.password);

		let dbQueryString = `UPDATE svr_main SET svr_logo=${boolToInt(serverConfigData.showLogo)}, svr_gui=${boolToInt(getServerConfig().useGUI)}, svr_password='${safePassword}', svr_name='${safeServerName}', svr_start_time_hour=${serverConfigData.hour}, svr_start_time_min=${serverConfigData.minute}, svr_start_weather=${serverConfigData.weather}, svr_start_snow_falling=${boolToInt(serverConfigData.fallingSnow)}, svr_start_snow_ground=${boolToInt(serverConfigData.groundSnow)}, svr_newchar_pos_x=${serverConfigData.newCharacter.spawnPosition.x}, svr_newchar_pos_y=${serverConfigData.newCharacter.spawnPosition.y}, svr_newchar_pos_z=${serverConfigData.newCharacter.spawnPosition.z}, svr_newchar_rot_z=${serverConfigData.newCharacter.spawnHeading}, svr_newchar_money=${serverConfigData.newCharacter.money}, svr_newchar_skin=${serverConfigData.newCharacter.skin}, svr_gui_col1_r=${serverConfigData.guiColour[0]}, svr_gui_col1_g=${serverConfigData.guiColour[1]}, svr_gui_col1_b=${serverConfigData.guiColour[2]} WHERE svr_id = ${serverConfigData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		disconnectFromDatabase(dbConnection);
	}
	console.log(`[Asshat.Config]: Server ${serverConfigData.databaseId} configuration saved to database!`);
}

// ----------------------------------------------------------------------------

function getServerConfig() {
	return serverConfig;
}

// ----------------------------------------------------------------------------

function getGameConfig() {
	return gameConfig;
}

// ----------------------------------------------------------------------------

function getGlobalConfig() {
	return globalConfig;
}

// ----------------------------------------------------------------------------

function getServerId() {
	return getServerConfig().databaseId;
}

// ----------------------------------------------------------------------------

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
	let hour = toInteger(splitParams[0]) || 0;
	let minute = toInteger(splitParams[1]) || 0;

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
    
    gta.forceWeather(toInteger(weatherId));

    messageAdminAction(`${client.name} set the weather to [#AAAAAA]${weatherNames[getServerGame()][toInteger(weatherId)]}`);
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
    let fallingSnow = Number(splitParams[0]) || !getServerConfig().fallingSnow;
	let groundSnow = Number(splitParams[1]) || !getServerConfig().groundSnow;
	
	fallingSnow = intToBool(toInteger(fallingSnow));
	groundSnow = intToBool(toInteger(groundSnow));

	getServerConfig().fallingSnow = fallingSnow;
	getServerConfig().groundSnow = groundSnow;

	triggerNetworkEvent("ag.snow", null, fallingSnow, groundSnow);

    messageAdminAction(`${client.name} turned falling snow ${getBoolRedGreenInlineColour(fallingSnow)}${getOnOffFromBool(fallingSnow)} [#FFFFFF]and ground snow ${getBoolRedGreenInlineColour(groundSnow)}${getOnOffFromBool(groundSnow)}`);
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

	getServerConfig().useLogo = !getServerConfig().useLogo;
	
	triggerNetworkEvent("ag.logo", null, intToBool(getServerConfig().useLogo));

    messageAdminAction(`${client.name} turned the server logo image ${getBoolRedGreenInlineColour(getServerConfig().useLogo)}${toUpperCase(getOnOffFromBool(getServerConfig().useLogo))}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function toggleServerGUICommand(command, params, client) {
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

    getServerConfig().useGUI = !getServerConfig().useGUI;

    messageAdminAction(`${client.name} turned GUI ${toLowerCase(getOnOffFromBool(getServerConfig().useGUI))} for this server`);
    updateServerRules();
	return true;
}

// ----------------------------------------------------------------------------
