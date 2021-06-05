// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: afk.js
// DESC: Provides AFK detection
// TYPE: Client (JavaScript)
// ===========================================================================

function initAFKScript() {
	logToConsole(LOG_DEBUG, "[VRR.AFK]: Initializing AFK script ...");
	logToConsole(LOG_DEBUG, "[VRR.AFK]: AFK script initialized!");
}

// ===========================================================================

function processLostFocusAFK(event) {
	sendServerNewAFKStatus(true);
	//if(localPlayer != null) {
	//	localPlayer.collisionsEnabled = false;
	//	gta.setCiviliansEnabled(false);
	//	gta.setTrafficEnabled(false);
	//}
}

// ===========================================================================

function processFocusAFK(event) {
    sendServerNewAFKStatus(false);
	//if(localPlayer != null) {
	//	localPlayer.collisionsEnabled = true;
	//	if(gta.game != GAME_GTA_SA) {
	//		gta.setCiviliansEnabled(true);
	//	}
    //    gta.setTrafficEnabled(true);
	//}
}

// ===========================================================================