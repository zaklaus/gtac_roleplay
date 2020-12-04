// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: startup.js
// DESC: Provides startup/shutdown procedures
// TYPE: Server (JavaScript)
// ===========================================================================

function initServerScripts() {

	checkForAllRequiredModules();

	initClassScript();
	initDatabaseScript();

	initCommandScript();

	initBusinessScript();
	initClanScript();
	initHouseScript();
	initChatScript();
	initModerationScript();
	initAccountScript();
	initChatScript();
	initJobScript();
	initVehicleScript();
	initDeveloperScript();

	initTimers();

	//gta.time.hour = serverConfig.startup.hour;
	//gta.time.minute = serverConfig.startup.minute;
	//gta.forceWeather(serverConfig.startup.weather);

	initAllClients();
}

// ---------------------------------------------------------------------------

function checkForHashingModule() {
	if(module.hashing == "undefined") {
		return false;
	}
	return true;
}

// ---------------------------------------------------------------------------

function checkForMySQLModule() {
	if(module.mysql == "undefined") {
		return false;
	}
	
	return true;
}

// ---------------------------------------------------------------------------

function checkForAllRequiredModules() {
	console.log("[Asshat.Startup]: Checking for required modules ...");

	if(!checkForHashingModule()) {
		console.warn("[Asshat.Startup]: Hashing module is not loaded!");
		console.warn("[Asshat.Startup]: This resource will now shutdown.");
		thisResource.stop();
	}
	
	if(!checkForMySQLModule()) {
		console.warn("[Asshat.Startup]: MySQL module is not loaded!");
		console.warn("[Asshat.Startup]: This resource will now shutdown.");
		thisResource.stop();
	}

	console.log("[Asshat.Startup]: All required modules loaded!");
	return true;
}

// ---------------------------------------------------------------------------

loadServerConfig();
initServerScripts();

// ---------------------------------------------------------------------------