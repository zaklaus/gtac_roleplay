// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: config.js
// DESC: Provides server configuration
// TYPE: Server (JavaScript)
// ===========================================================================

let serverConfig = {
	useGUI: true,
	name: "Asshat Gaming Roleplay",
	password: "LockedForStartup*128",
	hour: 0,
	minute: 0,
	weather: 1,
	fallingSnow: 0,
	groundSnow: 0,
	showLogo: true,	
	guiColour: [200, 200, 200],
	antiCheat: {
		enabled: true,
		checkGameScripts: true,
		gameScriptBlackList: [],
		gameScriptWhiteList: [],
	},
	accountPasswordHash: "SHA512",
	connectCameraPosition: false,
	connectCameraLookAt: false,
	newCharacter: {
		spawnPosition: false,
		spawnHeading: 0.0,
		money: 0,
	},
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
			business: 2,
			house: 2,
			bank: 2,
			clothes: 2,
			info: 2,
		},
		
		{ // GTA Vice City
			business: 2,
			house: 2,
			bank: 2,
			clothes: 2,
			info: 2,
		},

		{ // GTA San Andreas
			business: 1,
			house: 1,
			bank: 1,
			clothes: 1,
			info: 1,
		}	
	],
	// Not implemented yet
	keybindText: {
		actionKey: "E",
		vehicleEngineKey: "I",
		vehicleLightsKey: "K",
		vehicleLocksKey: "L",
	},
	keybinds: {
		actionKey: SDLK_e,
		vehicleEngineKey: SDLK_e,
		vehicleLightsKey: SDLK_k,
		vehicleLocksKey: SDLK_l,		
	},
	discordBotToken: "",
	discordEnabled: false,
	defaultKeybinds: [
		new serverClasses.keyBindData(false, SDLK_i, "engine"),
		new serverClasses.keyBindData(false, SDLK_k, "lights"),
		new serverClasses.keyBindData(false, SDLK_l, "lock"),
	],
	exitPropertyDistance: 3.0,
	enterPropertyDistance: 3.0,
	businessDimensionStart: 1000,
	houseDimensionStart: 3000,
};

// ----------------------------------------------------------------------------

function initConfigScript() {
	console.log("[Asshat.Config]: Initializing config script ...");
	console.log("[Asshat.Config]: Config script initialized!");
}

// ---------------------------------------------------------------------------

function loadServerConfig() {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_game = ${server.game} AND svr_port = ${server.port} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);

				serverId = dbAssoc["svr_id"];
				getServerConfig().name = dbAssoc["svr_name"];
				getServerConfig().password = dbAssoc["svr_password"];
				getServerConfig().newCharacter.spawnPosition = toVector3(dbAssoc["svr_newchar_pos_x"], dbAssoc["svr_newchar_pos_y"], dbAssoc["svr_newchar_pos_z"]);
				getServerConfig().newCharacter.spawnHeading = dbAssoc["svr_newchar_rot_z"];
				getServerConfig().newCharacter.money = dbAssoc["svr_newchar_money"];
				getServerConfig().newCharacter.bank = dbAssoc["svr_newchar_bank"];
				getServerConfig().newCharacter.skin = dbAssoc["svr_newchar_skin"];

				getServerConfig().connectCameraPosition = toVector3(dbAssoc["svr_connectcam_pos_x"], dbAssoc["svr_connectcam_pos_y"], dbAssoc["svr_connectcam_pos_z"]);
				getServerConfig().connectCameraLookAt = toVector3(dbAssoc["svr_connectcam_lookat_x"], dbAssoc["svr_connectcam_lookat_y"], dbAssoc["svr_connectcam_lookat_z"]);
				getServerConfig().hour = toInteger(dbAssoc["svr_start_time_hour"]);
				getServerConfig().minute = toInteger(dbAssoc["svr_start_time_min"]);
				getServerConfig().weather = toInteger(dbAssoc["svr_start_weather"]);
				getServerConfig().fallingSnow = intToBool(dbAssoc["svr_start_snow_falling"]);
				getServerConfig().groundSnow = intToBool(dbAssoc["svr_start_snow_ground"]);
				getServerConfig().useGUI = intToBool(dbAssoc["svr_gui"]);
				getServerConfig().guiColour = [toInteger(dbAssoc["svr_gui_col1_r"]), toInteger(dbAssoc["svr_gui_col1_g"]), toInteger(dbAssoc["svr_gui_col1_b"])];

				getServerConfig().antiCheat.enabled = intToBool(dbAssoc["svr_ac_enabled"]);
				getServerConfig().antiCheat.checkGameScripts = intToBool(dbAssoc["svr_ac_check_scripts"]);

				getServerConfig().antiCheat.gameScriptWhiteList = loadAntiCheatGameScriptWhiteListFromDatabase(serverId);
				getServerConfig().antiCheat.gameScriptBlackList = loadAntiCheatGameScriptBlackListFromDatabase(serverId);

				applyConfigToServer();

				freeDatabaseQuery(dbQuery);
			}
		}
		disconnectFromDatabase(dbConnection);
	}	
}

// ----------------------------------------------------------------------------

function applyConfigToServer() {
	server.name = getServerConfig().name;
	server.password = getServerConfig().password;
	gta.time.hour = getServerConfig().hour;
	gta.time.minute = getServerConfig().minute;
	gta.forceWeather(getServerConfig().weather);

	updateServerRules();
}

// ----------------------------------------------------------------------------

function saveServerConfigToDatabase() {
	console.log(`[Asshat.Config]: Saving server configuration to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) { 
		let safeServerName = escapeDatabaseString(dbConnection, getServerConfig().name);
		let safePassword = escapeDatabaseString(dbConnection, getServerConfig().password);

		let dbQueryString = `UPDATE svr_main SET svr_logo=${boolToInt(getServerConfig().showLogo)}, svr_gui=${boolToInt(getServerConfig().useGUI)}, svr_password='${safePassword}', svr_name='${safeServerName}', svr_start_time_hour=${getServerConfig().hour}, svr_start_time_min=${getServerConfig().minute}, svr_start_weather=${getServerConfig().weather}, svr_start_snow_falling=${boolToInt(getServerConfig().fallingSnow)}, svr_start_snow_ground=${boolToInt(getServerConfig().groundSnow)}, svr_newchar_pos_x=${getServerConfig().newCharacter.spawnPosition.x}, svr_newchar_pos_y=${getServerConfig().newCharacter.spawnPosition.y}, svr_newchar_pos_z=${getServerConfig().newCharacter.spawnPosition.z}, svr_newchar_rot_z=${getServerConfig().newCharacter.spawnHeading}, svr_newchar_money=${getServerConfig().newCharacter.money}, svr_newchar_skin=${getServerConfig().newCharacter.skin}, svr_gui_col1_r=${getServerConfig().guiColour[0]}, svr_gui_col1_g=${getServerConfig().guiColour[1]}, svr_gui_col1_b=${getServerConfig().guiColour[2]} WHERE svr_id = ${serverId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		disconnectFromDatabase(dbConnection);
	}
	console.log(`[Asshat.Config]: Server configuration saved to database!`);
}

// ----------------------------------------------------------------------------

function getServerConfig() {
	return serverConfig;
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
    let fallingSnow = Number(splitParams[0]) || !getServerConfig().fallingSnow;
	let groundSnow = Number(splitParams[1]) || !getServerConfig().groundSnow;
	
	fallingSnow = intToBool(toInteger(fallingSnow));
	groundSnow = intToBool(toInteger(groundSnow));

	getServerConfig().fallingSnow = fallingSnow;
	getServerConfig().groundSnow = groundSnow;

	triggerNetworkEvent("ag.snow", null, fallingSnow, groundSnow);

    messageAdminAction(`${client.name} turned falling snow ${getOnOffFromBool(fallingSnow)} and ground snow ${getOnOffFromBool(groundSnow)}`);
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

    messageAdminAction(`${client.name} turned the server logo image ${toLowerCase(getOnOffFromBool(getServerConfig().useLogo))}`);
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
