// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: iv.js
// DESC: Provides IV fixes and sync
// TYPE: Client (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

addEventHandler("onProcess", function(event, deltaTime) {
    getVehicles().forEach(function(vehicle) {
        if(vehicle.isSyncer && vehicle.getData("ag.syncId") != null) {
            triggerNetworkEvent("ag.veh.sync", vehicle.getData("ag.syncId"), vehicle.position, vehicle.heading);
        }
    }); 
    
    if(localPlayer != null) {
        triggerNetworkEvent("ag.player.sync", localPlayer.position, localPlayer.heading);
    }
});

addNetworkHandler("ag.vehicle", function(model, x, y, z, syncId, colour1, colour2, locked, lights) { //livery, dirtLevel, locked, lights) {
    let vehicle = createVehicle(model, position, heading);
    vehicle.setData("ag.syncid", syncId);
    vehicle.colour1 = colour1;
    vehicle.colour2 = colour2;
    //vehicle.livery = livery;
    //vehicle.dirtLevel = dirtLevel;
    vehicle.carLock = locked;
    vehicle.lights = lights;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.lock", function(syncId, lockState) {
    getVehicles().forEach(function(vehicle) {
        if(vehicle.getData("ag.syncId") == syncId) {
            vehicle.carLock = lockState;
        }
    });
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.lights", function(syncId, lightState) {
    getVehicles().forEach(function(vehicle) {
        if(vehicle.getData("ag.syncId") == syncId) {
            vehicle.lights = lightState;
        }
    });
});

// ---------------------------------------------------------------------------