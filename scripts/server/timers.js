// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: timers.js
// DESC: Provides timer functions and features
// TYPE: Server (JavaScript)
// ===========================================================================

let serverTimers = {};

// ---------------------------------------------------------------------------

function updateTimeRule() {
	server.setRule("Time", makeReadableTime(gta.time.hour, gta.time.minute));
}

// ---------------------------------------------------------------------------

function saveAllServerDataToDatabase() {
	console.log("[Asshat.Utilities]: Saving all server data to database ...");
	saveAllClientsToDatabase();
	saveAllVehiclesToDatabase();;
	saveAllHousesToDatabase();
	saveAllBusinessesToDatabase();
	saveAllClansToDatabase();
	console.log("[Asshat.Utilities]: Saved all server data to database!");
}

// ---------------------------------------------------------------------------

function initTimers() {
    serverTimers.saveDataIntervalTimer = setInterval(saveAllServerDataToDatabase, 600000);
    serverTimers.updateTimeRuleTimer = setInterval(updateTimeRule, 1000);
}