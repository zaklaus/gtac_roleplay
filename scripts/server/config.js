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
	colour: {
		byType: {
			talkMessage: toColour(200, 200, 200),
			shoutMessage: toColour(255, 255, 200),
			whisperMessage: toColour(130, 130, 130),
			doActionMessage: toColour(153, 50, 204, 255),
			meActionMessage: toColour(153, 50, 204, 255),
			errorMessage: toColour(237, 67, 55, 255),
			syntaxMessage: toColour(200, 200, 200, 255),
			normalMessage: toColour(255, 255, 255, 255),
			alertMessage: toColour(255, 255, 0, 255),
			successMessage: toColour(0, 180, 0, 255),
			clanChatMessage: toColour(0, 190, 0, 255),
		},
		byName: {
			white: toColour(255, 255, 255, 255),
			black: toColour(0, 0, 0, 255),
			red: toColour(255, 0, 0, 255),
			yellow: toColour(255, 255, 0, 255),
			royalBlue: toColour(0, 0, 255, 255),
			teal: toColour(0, 255, 255, 255),
			orange: toColour(255, 128, 0, 255),
			lightGrey: toColour(200, 200, 200, 255),
			mediumGrey: toColour(150, 150, 150, 255),
			darkGrey: toColour(64, 64, 64, 255),
			policeBlue: toColour(70, 130, 180, 255),
			medicPink: toColour(219, 112, 147, 255),
			firefighterRed: toColour(205, 92, 92, 255),
			busDriverGreen: toColour(50, 205, 50, 255),
			taxiDriverYellow: toColour(240, 230, 140, 255),
			burntYellow: toColour(210, 210, 0, 255),
			burntOrange: toColour(210, 120, 0, 255),
			bankGreen: toColour(0, 150, 0, 255),
			softGreen: toColour(144, 255, 96, 255),
		}
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
	pickupModels: {

	},
	pickupTypes: [
		{},

		{ // GTA 3
			business: 2,
		},
		
		{ // GTA Vice City
			business: 2,
		},

		{ // GTA San Andreas
			business: 2,
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
    let fallingSnow = splitParams[0] || 0;
	let groundSnow = splitParams[1] || 0;
	
	fallingSnow = intToBool(toInteger(fallingSnow));
	groundSnow = intToBool(toInteger(groundSnow));

	getServerConfig().fallingSnow = fallingSnow;
	getServerConfig().groundSnow = groundSnow;

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

    getServerConfig().useLogo = !getServerConfig().useLogo;

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