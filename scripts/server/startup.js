// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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
	console.log("[AsshatRP.Startup]: Checking for required modules ...");

	if(!checkForHashingModule()) {
		console.warn("[AsshatRP.Startup]: Hashing module is not loaded!");
		console.warn("[AsshatRP.Startup]: This resource will now shutdown.");
		thisResource.stop();
	}
	
	if(!checkForMySQLModule()) {
		console.warn("[AsshatRP.Startup]: MySQL module is not loaded!");
		console.warn("[AsshatRP.Startup]: This resource will now shutdown.");
		thisResource.stop();
	}

	console.log("[AsshatRP.Startup]: All required modules loaded!");
	return true;
}

// ---------------------------------------------------------------------------

initServerScripts();

// ----------------------------------------------------------------------------