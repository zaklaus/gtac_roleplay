// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: afk.js
// DESC: Provides AFK detection
// TYPE: Client (JavaScript)
// ===========================================================================

// ----------------------------------------------------------------------------

addEventHandler("OnLostFocus", function(event) {
	triggerNetworkEvent("ag.afk", true);
	if(localPlayer != null) {
		localPlayer.collisionsEnabled = false;
		gta.setCiviliansEnabled(false);
		gta.setTrafficEnabled(false);
	}
});

// ----------------------------------------------------------------------------

addEventHandler("OnFocus", function(event) {
    triggerNetworkEvent("ag.afk", false);
	if(localPlayer != null) {
		localPlayer.collisionsEnabled = true;
		if(gta.game != GAME_GTA_SA) {
			gta.setCiviliansEnabled(true);
		}
        gta.setTrafficEnabled(true);		
	}
});

// ----------------------------------------------------------------------------