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

	initConfigScript();

	initClassScript();
	initDatabaseScript();
	initBitFlagScript();
	initBusinessScript();
	initClanScript();
	initHouseScript();
	initChatScript();
	initModerationScript();
	initAccountScript();
	initSubAccountScript();
	initChatScript();
	initJobScript();
	initVehicleScript();
	initDeveloperScript();
	initKeyBindScript();
	initEventScript();
	initAntiCheatScript();
	initItemScript();

	initTimers();

	//gta.time.hour = getServerConfig().startup.hour;
	//gta.time.minute = getServerConfig().startup.minute;
	//gta.forceWeather(getServerConfig().startup.weather);

	initAllClients();

	loadGameFixesResource();

	serverStartTime = new Date().getTime()/1000;

	initCommandScript();
}

// ---------------------------------------------------------------------------

function checkForHashingModule() {
	if(typeof module.hashing == "undefined") {
		return false;
	}
	return true;
}

// ---------------------------------------------------------------------------

function checkForMySQLModule() {
	if(typeof module.mysql == "undefined") {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function checkForAllRequiredModules() {
	logToConsole(LOG_DEBUG, "[Asshat.Startup]: Checking for required modules ...");

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

	logToConsole(LOG_DEBUG, "[Asshat.Startup]: All required modules loaded!");
	return true;
}

// ---------------------------------------------------------------------------

initServerScripts();

// ---------------------------------------------------------------------------