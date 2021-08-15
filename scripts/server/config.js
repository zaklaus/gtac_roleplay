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
let globalConfig = {};
let gameConfig = {};

// ===========================================================================

function loadGlobalConfig() {
	return {
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
		weaponEquippableTypes: [
			VRR_ITEM_USETYPE_WEAPON,
			VRR_ITEM_USETYPE_TAZER,
			VRR_ITEM_USETYPE_EXTINGUISHER,
			VRR_ITEM_USETYPE_SPRAYPAINT,
			VRR_ITEM_USETYPE_PEPPERSPRAY,
		],
		itemActionStateReset: 5000,
		subAccountNameAllowedCharacters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		emailValidationRegex: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
		itemActionDelayExtraTimeout: 1000,
	};
}

// ===========================================================================

function loadGameConfig() {
	return gameData;
};

// ===========================================================================

function initConfigScript() {
	logToConsole(LOG_INFO, "[VRR.Config]: Initializing config script ...");
	globalConfig = loadGlobalConfig();
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
				let tempServerConfigData = new serverClasses.serverConfigData(dbAssoc);
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
				let tempServerConfigData = serverClasses.serverConfigData(dbAssoc);
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
		gta.forceWeather(tempServerConfig.weather);
	}

	updateServerRules();
}

// ===========================================================================

function saveServerConfigToDatabase(serverConfigData) {
	logToConsole(LOG_DEBUG, `[VRR.Config]: Saving server ${serverConfigData.databaseId} configuration to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeServerName = escapeDatabaseString(dbConnection, serverConfigData.name);
		let safePassword = escapeDatabaseString(dbConnection, serverConfigData.password);

		let dbQueryString = `UPDATE svr_main SET svr_logo=${boolToInt(serverConfigData.showLogo)}, svr_gui=${boolToInt(getServerConfig().useGUI)}, svr_start_time_hour=${serverConfigData.hour}, svr_start_time_min=${serverConfigData.minute}, svr_start_weather=${serverConfigData.weather}, svr_start_snow_falling=${boolToInt(serverConfigData.fallingSnow)}, svr_start_snow_ground=${boolToInt(serverConfigData.groundSnow)}, svr_newchar_pos_x=${serverConfigData.newCharacter.spawnPosition.x}, svr_newchar_pos_y=${serverConfigData.newCharacter.spawnPosition.y}, svr_newchar_pos_z=${serverConfigData.newCharacter.spawnPosition.z}, svr_newchar_rot_z=${serverConfigData.newCharacter.spawnHeading}, svr_newchar_money=${serverConfigData.newCharacter.money}, svr_newchar_skin=${serverConfigData.newCharacter.skin}, svr_gui_col1_r=${serverConfigData.guiColour[0]}, svr_gui_col1_g=${serverConfigData.guiColour[1]}, svr_gui_col1_b=${serverConfigData.guiColour[2]} WHERE svr_id = ${serverConfigData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		disconnectFromDatabase(dbConnection);
	}
	logToConsole(LOG_DEBUG, `[VRR.Config]: Server ${serverConfigData.databaseId} configuration saved to database!`);
}

// ===========================================================================

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

function setTimeCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let hour = toInteger(splitParams[0]) || 0;
	let minute = toInteger(splitParams[1]) || 0;

	if(hour > 23 || hour < 0) {
		messagePlayerError(client, "The hour must be between 0 and 23!");
		return false;
    }

	if(minute > 59 || minute < 0) {
		messagePlayerError(client, "The minute must be between 0 and 59!");
		return false;
    }

	getServerConfig().hour = minute;
	getServerConfig().minute = minute;

    gta.time.hour = getServerConfig().hour;
    gta.time.minute = getServerConfig().minute;

	//checkServerGameTime();

	messageAdminAction(`${getPlayerName(client)} set the time to ${makeReadableTime(hour, minute)}`);
	return true;
}


// ===========================================================================

function setMinuteDurationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let minuteDuration = toInteger(params) || 60000;
	getServerConfig().minuteDuration = minuteDuration;
	setTimeMinuteDuration(null, minuteDuration);

	messageAdminAction(`${getPlayerName(client)} set the minute duration to ${minuteDuration}ms`);
	return true;
}

// ===========================================================================

function setWeatherCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let weatherId = getWeatherFromParams(splitParams[0]);

	if(!weatherId) {
		messagePlayerError(client, `That weather ID or name is invalid!`);
		return false;
    }

    gta.forceWeather(toInteger(weatherId));
	getServerConfig().weather = weatherId;

    messageAdminAction(`${getPlayerName(client)} set the weather to ${getInlineChatColourByName("lightGrey")}${getGameData().weatherNames[getServerGame()][toInteger(weatherId)]}`);
    updateServerRules();
	return true;
}

// ===========================================================================

function setSnowingCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
    let fallingSnow = intToBool(toInteger(splitParams[0]) || 0) || !getServerConfig().fallingSnow;
	let groundSnow = intToBool(toInteger(splitParams[1]) || 0) || !getServerConfig().groundSnow;

	getServerConfig().fallingSnow = fallingSnow;
	getServerConfig().groundSnow = groundSnow;

	updatePlayerSnowState(null);

    messageAdminAction(`${getPlayerName(client)} ${getInlineChatColourByName("orange")}turned falling snow ${getBoolRedGreenInlineColour(fallingSnow)}${getOnOffFromBool(fallingSnow)} ${getInlineChatColourByName("orange")}and ground snow ${getBoolRedGreenInlineColour(groundSnow)}${getOnOffFromBool(groundSnow)}`);
    updateServerRules();
	return true;
}

// ===========================================================================

function toggleServerLogoCommand(command, params, client) {
	getServerConfig().useLogo = !getServerConfig().useLogo;

	updatePlayerShowLogoState(null, getServerConfig().useLogo);

    messageAdminAction(`${getPlayerName(client)} turned the server logo image ${getBoolRedGreenInlineColour(getServerConfig().useLogo)}${toUpperCase(getOnOffFromBool(getServerConfig().useLogo))}`);
    updateServerRules();
	return true;
}

// ===========================================================================

function toggleAntiCheatScriptWhitelist(command, params, client) {
	getServerConfig().antiCheat.gameScriptWhiteListEnabled = !getServerConfig().antiCheat.gameScriptWhiteListEnabled;

	updatePlayerShowLogoState(null, getServerConfig().antiCheat.gameScriptWhiteListEnabled);

    messageAdminAction(`${getPlayerName(client)} turned anticheat game script whitelist ${getBoolRedGreenInlineColour(getServerConfig().antiCheat.gameScriptWhiteListEnabled)}${toUpperCase(getOnOffFromBool(getServerConfig().antiCheat.gameScriptWhiteListEnabled))}`);
    updateServerRules();
	return true;
}

// ===========================================================================

function toggleAntiCheatScriptBlacklist(command, params, client) {
	getServerConfig().antiCheat.gameScriptBlackListEnabled = !getServerConfig().antiCheat.gameScriptBlackListEnabled;

	updatePlayerShowLogoState(null, getServerConfig().antiCheat.gameScriptBlackListEnabled);

    messageAdminAction(`${getPlayerName(client)} turned anticheat game script blacklist ${getBoolRedGreenInlineColour(getServerConfig().antiCheat.gameScriptBlackListEnabled)}${toUpperCase(getOnOffFromBool(getServerConfig().antiCheat.gameScriptBlackListEnabled))}`);
    updateServerRules();
	return true;
}

// ===========================================================================

function toggleServerGUICommand(command, params, client) {
    getServerConfig().useGUI = !getServerConfig().useGUI;

    messageAdminAction(`${getPlayerName(client)} turned GUI ${toLowerCase(getOnOffFromBool(getServerConfig().useGUI))} for this server`);
    updateServerRules();
	return true;
}

// ===========================================================================

function reloadServerConfigurationCommand(command, params, client) {
	serverConfig = loadServerConfigFromGameAndPort(server.game, server.port);
	applyConfigToServer(serverConfig);
	updateServerRules();

    messageAdminAction(`${getPlayerName(client)} reloaded the server configuration`);

	return true;
}

// ===========================================================================

function reloadEmailConfigurationCommand(command, params, client) {
	emailConfig = loadEmailConfiguration();
    messageAdminAction(`${getPlayerName(client)} reloaded the email configuration`);
	return true;
}

// ===========================================================================

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
