// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

addNetworkHandler("ag.connectCamera", function(cameraPosition, cameraLookat) {
    gta.fadeCamera(true);
    gta.setCameraLookAt(cameraPosition, cameraLookat, true);
});

// ---------------------------------------------------------------------------

addEventHandler("onPickupCollected", function(event, pickup, ped) {
    // This won't be needed in next GTAC update. onPickupCollccted has been added server side
    if(ped == localPlayer) {
        triggerNetworkEvent("ag.onPickupCollected", pickup);
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clearWeapons", function() {
    localPlayer.clearWeapons();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.giveWeapon", function(weaponId, ammo, active) {
    localPlayer.giveWeapon(weaponId, ammo, active);
});

// ---------------------------------------------------------------------------