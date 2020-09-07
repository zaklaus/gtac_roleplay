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
        gta.setCiviliansEnabled(true);
        gta.setTrafficEnabled(true);		
	}
});