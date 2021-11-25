// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: config.js
// DESC: Provides server configuration
// TYPE: Server (JavaScript)
// ===========================================================================

let serverConfig = {};
let databaseConfig = {};
let emailConfig = {};
let gameConfig = {};

// ===========================================================================

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
	keyBind: [],
	exitPropertyDistance: 3.0,
	enterPropertyDistance: 3.0,
	businessDimensionStart: 5000,
	houseDimensionStart: 100,
	buyVehicleDriveAwayDistance: 25.0,
	returnToJobVehicleTime: 30,
	walkieTalkieSpeakerDistance: 15,
	walkieTalkieTalkDistance: 15,
	phoneSpeakerDistance: 15,
	phoneTalkDistance: 15,
	tazerEffectDuration: 15000,
	vehicleRepairDistance: 5,
	weaponEquippableTypes: [
		VRR_ITEM_USETYPE_WEAPON,
		VRR_ITEM_USETYPE_TAZER,
		VRR_ITEM_USETYPE_EXTINGUISHER,
		VRR_ITEM_USETYPE_SPRAYPAINT,
		VRR_ITEM_USETYPE_PEPPERSPRAY,
	],
	onFootOnlyItems: [
		VRR_ITEM_USETYPE_VEHREPAIR,
		VRR_ITEM_USETYPE_VEHCOLOUR,
		VRR_ITEM_USETYPE_VEHUPGRADE_PART,
		VRR_ITEM_USETYPE_VEHLIVERY,
		VRR_ITEM_USETYPE_VEHTIRE,
	],
	itemActionStateReset: 5000,
	subAccountNameAllowedCharacters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	emailValidationRegex: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	itemActionDelayExtraTimeout: 1000,
	geoIPCountryDatabaseFilePath: "geoip-country.mmdb",
	geoIPCityDatabaseFilePath: "geoip-city.mmdb",
	randomTipInterval: 600000,
	accents: [
        "English",
        "French",
        "Russian",
        "Scottish",
        "Irish",
        "Spanish",
        "Southern American",
        "Italian",
        "Australian",
        "Jamaican",
        "Israeli",
        "Dutch",
        "Brazilian",
        "Portuguese",
        "German",
        "Canadian",
        "Chinese",
        "Japanese",
        "Turkish",
        "Korean",
        "Estonian",
        "Sicilian",
        "Indian",
		"Rough",
    ],
	locales: [
		["English", "english"],
	],
};

// ===========================================================================

function loadGameConfig() {
	return gameData;
};

// ===========================================================================

function initConfigScript() {
	logToConsole(LOG_INFO, "[VRR.Config]: Initializing config script ...");
	gameConfig = loadGameConfig();
	serverConfig = loadServerConfigFromGameAndPort(server.game, server.port, getMultiplayerMod());
	applyConfigToServer(serverConfig);
	logToConsole(LOG_INFO, "[VRR.Config]: Config script initialized!");
}

// ===========================================================================

function loadServerConfigFromGameAndPort(gameId, port, mpMod) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_game = ${gameId} AND svr_port = ${port} AND svr_mpmod = ${mpMod} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempServerConfigData = new ServerData(dbAssoc);
				freeDatabaseQuery(dbQuery);
				return tempServerConfigData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	return false;
}

// ===========================================================================

function loadServerConfigFromId(tempServerId) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_id = ${tempServerId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempServerConfigData = new ServerData(dbAssoc);
				freeDatabaseQuery(dbQuery);
				return tempServerConfigData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	return false;
}

// ===========================================================================

function applyConfigToServer(tempServerConfig) {
	if(isTimeSupported()) {
		setGameTime(tempServerConfig.hour, tempServerConfig.minute, tempServerConfig.minuteDuration)
	}

	if(isWeatherSupported()) {
		game.forceWeather(tempServerConfig.weather);
	}

	updateServerRules();
}

// ===========================================================================

function saveServerConfigToDatabase() {
	logToConsole(LOG_DEBUG, `[VRR.Config]: Saving server ${getServerConfig().databaseId} configuration to database ...`);
	if(getServerConfig().needsSaved) {
		let dbConnection = connectToDatabase();
		if(dbConnection) {
			let data = [
				["svr_logo", boolToInt(getServerConfig().showLogo)],
				["svr_gui", boolToInt(getServerConfig().useGUI)],
				["svr_start_time_hour", getServerConfig().hour],
				["svr_start_time_min", getServerConfig().minute],
				["svr_start_weather", getServerConfig().weather],
				["svr_start_snow_falling", boolToInt(getServerConfig().fallingSnow)],
				["svr_start_snow_ground", boolToInt(getServerConfig().groundSnow)],
				["svr_newchar_pos_x", getServerConfig().newCharacter.spawnPosition.x],
				["svr_newchar_pos_y", getServerConfig().newCharacter.spawnPosition.y],
				["svr_newchar_pos_z", getServerConfig().newCharacter.spawnPosition.z],
				["svr_newchar_rot_z", getServerConfig().newCharacter.spawnHeading],
				["svr_newchar_skin", getServerConfig().newCharacter.skin],
				["svr_newchar_money", getServerConfig().newCharacter.money],
				["svr_gui_col1_r", getServerConfig().guiColourPrimary[0]],
				["svr_gui_col1_g", getServerConfig().guiColourPrimary[1]],
				["svr_gui_col1_b", getServerConfig().guiColourPrimary[2]],
				["svr_gui_col2_r", getServerConfig().guiColourSecondary[0]],
				["svr_gui_col2_g", getServerConfig().guiColourSecondary[1]],
				["svr_gui_col2_b", getServerConfig().guiColourSecondary[2]],
				["svr_connectcam_pos_x", getServerConfig().connectCameraPosition.x],
				["svr_connectcam_pos_y", getServerConfig().connectCameraPosition.y],
				["svr_connectcam_pos_z", getServerConfig().connectCameraPosition.z],
				["svr_connectcam_lookat_x", getServerConfig().connectCameraLookAt.x],
				["svr_connectcam_lookat_y", getServerConfig().connectCameraLookAt.y],
				["svr_connectcam_lookat_z", getServerConfig().connectCameraLookAt.z],
				["svr_charselect_cam_pos_x", getServerConfig().characterSelectCameraPosition.x],
				["svr_charselect_cam_pos_y", getServerConfig().characterSelectCameraPosition.y],
				["svr_charselect_cam_pos_z", getServerConfig().characterSelectCameraPosition.z],
				["svr_charselect_cam_lookat_x", getServerConfig().characterSelectCameraLookAt.x],
				["svr_charselect_cam_lookat_y", getServerConfig().characterSelectCameraLookAt.y],
				["svr_charselect_cam_lookat_z", getServerConfig().characterSelectCameraLookAt.z],
				["svr_charselect_ped_pos_x", getServerConfig().characterSelectPedPosition.x],
				["svr_charselect_ped_pos_y", getServerConfig().characterSelectPedPosition.y],
				["svr_charselect_ped_pos_z", getServerConfig().characterSelectPedPosition.z],
				["svr_charselect_ped_rot_z", getServerConfig().characterSelectPedHeading],
				["svr_charselect_int", getServerConfig().characterSelectInterior],
				["svr_charselect_vw", getServerConfig().characterSelectDimension],
				["svr_inflation_multiplier", getServerConfig().inflationMultiplier],
				["svr_ac_enabled", getServerConfig().antiCheat.enabled],
				["svr_ac_check_scripts", getServerConfig().antiCheat.checkGameScripts],
				["svr_ac_script_wl", getServerConfig().antiCheat.gameScriptWhiteListEnabled],
				["svr_ac_script_bl", getServerConfig().antiCheat.gameScriptBlackListEnabled],
				["svr_job_pickups", boolToInt(getServerConfig().createJobPickups)],
				["svr_job_blips", boolToInt(getServerConfig().createJobBlips)],
				["svr_biz_pickups", boolToInt(getServerConfig().createBusinessPickups)],
				["svr_biz_blips", boolToInt(getServerConfig().createBusinessBlips)],
				["svr_house_pickups", boolToInt(getServerConfig().createHousePickups)],
				["svr_house_blips", boolToInt(getServerConfig().createHouseBlips)],
				["svr_intro_music", getServerConfig().introMusic],
			];

			let dbQuery = null;
			let queryString = createDatabaseUpdateQuery("svr_main", data, `svr_id=${getServerConfig().databaseId}`);
			dbQuery = queryDatabase(dbConnection, queryString);

			getServerConfig().needsSaved = false;
			freeDatabaseQuery(dbQuery);
			disconnectFromDatabase(dbConnection);

		}
	}
	logToConsole(LOG_DEBUG, `[VRR.Config]: Server ${getServerConfig().databaseId} configuration saved to database!`);
}

// ===========================================================================

/**
 *
 * @return {ServerConfigData} - Server configuration data
 *
 */
function getServerConfig() {
	return serverConfig;
}

// ===========================================================================

function getGameConfig() {
	return gameConfig;
}

// ===========================================================================

function getGlobalConfig() {
	return globalConfig;
}

// ===========================================================================

function getServerId() {
	return getServerConfig().databaseId;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function setTimeCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let hour = toInteger(splitParams[0]);
	let minute = toInteger(splitParams[1]);

	if(hour > 23 || hour < 0) {
		messagePlayerError(client, "The hour must be between 0 and 23!");
		return false;
    }

	if(minute > 59 || minute < 0) {
		messagePlayerError(client, "The minute must be between 0 and 59!");
		return false;
    }

	getServerConfig().hour = hour;
	getServerConfig().minute = minute;

    game.time.hour = getServerConfig().hour;
    game.time.minute = getServerConfig().minute;

	//checkServerGameTime();

	getServerConfig().needsSaved = true;

	messageAdminAction(`${getPlayerName(client)} set the time to ${makeReadableTime(hour, minute)}`);
	return true;
}


// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function setMinuteDurationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let minuteDuration = toInteger(params);
	getServerConfig().minuteDuration = minuteDuration;
	setTimeMinuteDuration(null, minuteDuration);

	getServerConfig().needsSaved = true;

	messageAdminAction(`${getPlayerName(client)} set the minute duration to ${minuteDuration}ms`);
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function setWeatherCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let weatherId = getWeatherFromParams(splitParams[0]);

	if(!weatherId) {
		messagePlayerError(client, `That weather ID or name is invalid!`);
		return false;
    }

    game.forceWeather(toInteger(weatherId));
	getServerConfig().weather = weatherId;

	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} set the weather to {ALTCOLOUR}${getGameData().weatherNames[getServerGame()][toInteger(weatherId)]}`);
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function setSnowingCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
    let falling = splitParams[1];
	let ground = splitParams[1];

	getServerConfig().fallingSnow = intToBool(toInteger(falling));
	getServerConfig().groundSnow = intToBool(toInteger(ground));

	updatePlayerSnowState(null);

	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} ${getInlineChatColourByName("orange")}turned falling snow ${getBoolRedGreenInlineColour(falling)}${getOnOffFromBool(falling)} ${getInlineChatColourByName("orange")}and ground snow ${getBoolRedGreenInlineColour(ground)}${getOnOffFromBool(ground)}`);
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function setServerGUIColoursCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
    let colourRed = toInteger(splitParams[0]) || 255;
	let colourGreen = toInteger(splitParams[1]) || 255;
	let colourBlue = toInteger(splitParams[2]) || 255;

	getServerConfig().guiColour = [colourRed, colourGreen, colourBlue];

	let clients = getClients();
	for(let i in clients) {
		sendPlayerGUIColours(clients[i]);
	}

	getServerConfig().needsSaved = true;

    //messageAdminAction(`${getPlayerName(client)} ${getInlineChatColourByName("orange")}set the server ${getBoolRedGreenInlineColour(fallingSnow)}${getOnOffFromBool(fallingSnow)} ${getInlineChatColourByName("orange")}and ground snow ${getBoolRedGreenInlineColour(groundSnow)}${getOnOffFromBool(groundSnow)}`);
    //updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function toggleServerLogoCommand(command, params, client) {
	getServerConfig().useLogo = !getServerConfig().useLogo;

	updatePlayerShowLogoState(null, getServerConfig().useLogo);

    messageAdminAction(`${getPlayerName(client)} turned the server logo image ${getBoolRedGreenInlineColour(getServerConfig().useLogo)}${toUpperCase(getOnOffFromBool(getServerConfig().useLogo))}`);
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function toggleAntiCheatScriptWhitelist(command, params, client) {
	getServerConfig().antiCheat.gameScriptWhiteListEnabled = !getServerConfig().antiCheat.gameScriptWhiteListEnabled;
	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} turned anticheat game script whitelist ${getBoolRedGreenInlineColour(getServerConfig().antiCheat.gameScriptWhiteListEnabled)}${toUpperCase(getOnOffFromBool(getServerConfig().antiCheat.gameScriptWhiteListEnabled))}`);
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function toggleAntiCheatScriptBlacklist(command, params, client) {
	getServerConfig().antiCheat.gameScriptBlackListEnabled = !getServerConfig().antiCheat.gameScriptBlackListEnabled;
	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} turned anticheat game script blacklist ${getBoolRedGreenInlineColour(getServerConfig().antiCheat.gameScriptBlackListEnabled)}${toUpperCase(getOnOffFromBool(getServerConfig().antiCheat.gameScriptBlackListEnabled))}`);
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function toggleServerGUICommand(command, params, client) {
    getServerConfig().useGUI = !getServerConfig().useGUI;
	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} turned GUI ${toLowerCase(getOnOffFromBool(getServerConfig().useGUI))} for this server`);
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function toggleServerUseRealWorldTimeCommand(command, params, client) {
    getServerConfig().useRealTime = !getServerConfig().useRealTime;
	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} turned real-world time ${toLowerCase(getOnOffFromBool(getServerConfig().useRealTime))} for this server (GMT ${addPositiveNegativeSymbol(getServerConfig().realTimeZone)})`);
	updateServerGameTime();
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function setServerRealWorldTimeZoneCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    getServerConfig().realTimeZone = toInteger(params);
	getServerConfig().needsSaved = true;

    messageAdminAction(`${getPlayerName(client)} set the time zone for in-game's real-world time to GMT ${addPositiveNegativeSymbol(getServerConfig().realTimeZone)}`);
	updateServerGameTime();
    updateServerRules();
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function reloadServerConfigurationCommand(command, params, client) {
	serverConfig = loadServerConfigFromGameAndPort(server.game, server.port);
	applyConfigToServer(serverConfig);
	updateServerRules();

    messageAdminAction(`${getPlayerName(client)} reloaded the server configuration`);

	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function reloadEmailConfigurationCommand(command, params, client) {
	emailConfig = loadEmailConfiguration();
    messageAdminAction(`${getPlayerName(client)} reloaded the email configuration`);
	return true;
}

// ===========================================================================

/**
 * This is a command handler function.
 *
 * @param {string} command - The command name used by the player
 * @param {string} params - The parameters/args string used with the command by the player
 * @param {Client} client - The client/player that used the command
 * @return {bool} Whether or not the command was successful
 *
 */
function reloadDatabaseConfigurationCommand(command, params, client) {
	//if(!databaseInUse) {
		if(databaseConfig.usePersistentConnection && isDatabaseConnected(persistentDatabaseConnection)) {
			console.warn(`[VRR.Database] Closing persistent database connection`);
			persistentDatabaseConnection.close();
			persistentDatabaseConnection = null;
		}
		databaseEnabled = false;
		databaseConfig = loadEmailConfig();
		messageAdminAction(`${getPlayerName(client)} reloaded the database configuration`);
		databaseEnabled = true;
		if(databaseConfig.usePersistentConnection) {
			connectToDatabase();
		}
	//}

	return true;
}

// ===========================================================================

function getServerIntroMusicURL() {
	//if(server.getCVar("theme") != null) {
	//	if(server.getCVar("theme") == VRR_THEME_CHRISTMAS) {
	//
	//	}
	//}
	return getServerConfig().introMusicURL;
}

// ===========================================================================