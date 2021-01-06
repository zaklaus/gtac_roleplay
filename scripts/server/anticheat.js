// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: anticheat.js
// DESC: Provides anticheat functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initAntiCheatScript() {
    console.log("[Asshat.AntiCheat]: Initializing anticheat script ...");
    getServerData().antiCheat.whiteListedGameScripts = loadAntiCheatGameScriptWhiteListFromDatabase();
    getServerData().antiCheat.blackListedGameScripts = loadAntiCheatGameScriptBlackListFromDatabase();
	console.log("[Asshat.AntiCheat]: Anticheat script initialized!");
}
// ---------------------------------------------------------------------------

function loadAntiCheatGameScriptWhiteListFromDatabase() {
    console.log(`[Asshat.AntiCheat] Loading whitelisted game scripts ...`);
    let dbConnection = connectToDatabase();
    let tempWhiteListedGameScripts = [];

	if(dbConnection) {
		let dbQueryString = `SELECT * FROM ac_script_wl WHERE ac_script_wl_enabled = 1 AND ac_script_wl_server = ${getServerId()}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
                let tempWhiteListedGameScriptData = new serverClasses.whiteListedGameScriptData(dbAssoc);
                tempWhiteListedGameScripts.push(tempWhiteListedGameScriptData);
                console.log(`[Asshat.AntiCheat] Whitelisted game script '${tempWhiteListedGameScriptData.scriptName}' loaded successfully!`);
            }
        }
        disconnectFromDatabase(dbConnection);
    }
    console.log(`[Asshat.AntiCheat] ${tempWhiteListedGameScripts.length} whitelisted game scripts loaded!`);
    return tempWhiteListedGameScripts;
}

// ---------------------------------------------------------------------------

function loadAntiCheatGameScriptBlackListFromDatabase() {
    console.log(`[Asshat.AntiCheat] Loading blacklisted game scripts ...`);
    let dbConnection = connectToDatabase();
    let tempBlackListedGameScripts = [];

	if(dbConnection) {
		let dbQueryString = `SELECT * FROM ac_script_bl WHERE ac_script_bl_enabled = 1 AND ac_script_bl_server = ${getServerId()}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
                let tempBlackListedGameScriptData = new serverClasses.blackListedGameScriptData(dbAssoc);
                tempBlackListedGameScripts.push(tempBlackListedGameScriptData);
                console.log(`[Asshat.AntiCheat] Blacklisted game script '${tempBlackListedGameScriptData.scriptName}' loaded successfully!`);
            }
        }
        disconnectFromDatabase(dbConnection);
    }
    console.log(`[Asshat.AntiCheat] ${tempBlackListedGameScripts.length} blacklisted game scripts loaded!`);
    return tempBlackListedGameScripts;
}

// ---------------------------------------------------------------------------