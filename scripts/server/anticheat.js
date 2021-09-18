// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: anticheat.js
// DESC: Provides anticheat functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initAntiCheatScript() {
    logToConsole(LOG_DEBUG, "[VRR.AntiCheat]: Initializing anticheat script ...");
    getServerData().antiCheat.whiteListedGameScripts = loadAntiCheatGameScriptWhiteListFromDatabase();
    getServerData().antiCheat.blackListedGameScripts = loadAntiCheatGameScriptBlackListFromDatabase();
	logToConsole(LOG_DEBUG, "[VRR.AntiCheat]: Anticheat script initialized!");
}
// ===========================================================================

function loadAntiCheatGameScriptWhiteListFromDatabase() {
    logToConsole(LOG_DEBUG, `[VRR.AntiCheat] Loading whitelisted game scripts ...`);
    let dbConnection = connectToDatabase();
    let tempWhiteListedGameScripts = [];

	if(dbConnection) {
		let dbQueryString = `SELECT * FROM ac_script_wl WHERE ac_script_wl_enabled = 1 AND ac_script_wl_server = ${getServerId()}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
                let tempWhiteListedGameScriptData = new WhiteListedGameScriptData(dbAssoc);
                tempWhiteListedGameScripts.push(tempWhiteListedGameScriptData);
                logToConsole(LOG_DEBUG, `[VRR.AntiCheat] Whitelisted game script '${tempWhiteListedGameScriptData.scriptName}' loaded successfully!`);
            }
        }
        disconnectFromDatabase(dbConnection);
    }
    logToConsole(LOG_DEBUG, `[VRR.AntiCheat] ${tempWhiteListedGameScripts.length} whitelisted game scripts loaded!`);
    return tempWhiteListedGameScripts;
}

// ===========================================================================

function loadAntiCheatGameScriptBlackListFromDatabase() {
    logToConsole(LOG_DEBUG, `[VRR.AntiCheat] Loading blacklisted game scripts ...`);
    let dbConnection = connectToDatabase();
    let tempBlackListedGameScripts = [];

	if(dbConnection) {
		let dbQueryString = `SELECT * FROM ac_script_bl WHERE ac_script_bl_enabled = 1 AND ac_script_bl_server = ${getServerId()}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
                let tempBlackListedGameScriptData = new BlackListedGameScriptData(dbAssoc);
                tempBlackListedGameScripts.push(tempBlackListedGameScriptData);
                logToConsole(LOG_DEBUG, `[VRR.AntiCheat] Blacklisted game script '${tempBlackListedGameScriptData.scriptName}' loaded successfully!`);
            }
        }
        disconnectFromDatabase(dbConnection);
    }
    logToConsole(LOG_DEBUG, `[VRR.AntiCheat] ${tempBlackListedGameScripts.length} blacklisted game scripts loaded!`);
    return tempBlackListedGameScripts;
}

// ===========================================================================

function clearPlayerStateToEnterExitProperty(client) {
    if(getPlayerData(client).pedState != VRR_PEDSTATE_READY) {
		if(getPlayerData(client).pedState == VRR_PEDSTATE_ENTERINGVEHICLE) {
			sendPlayerClearPedState(client);
			getPlayerData(client).pedState = VRR_PEDSTATE_READY;
		} else {
			return false;
		}
	}
}

// ===========================================================================