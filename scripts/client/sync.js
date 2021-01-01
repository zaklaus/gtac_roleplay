// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: sync.js
// DESC: Provides some elements and data sync
// TYPE: Client (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

let inVehicle = null;

// ---------------------------------------------------------------------------

addEventHandler("onProcess", function(event, deltaTime) {
    if(localPlayer != null && localPlayer.getData("ag.spawned") != null) {
        if(localPlayer.health <= 0) {
            localPlayer.clearWeapons();
            triggerNetworkEvent("ag.player.death", localPlayer.position);
        }
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.vehicle", function(syncId, model, position, heading, colour1, colour2, locked, lights) { //livery, dirtLevel, locked, lights) {
    let vehicle = createVehicle(model, position, heading);
    setEntityData(vehicle, "ag.syncId", syncId);
    vehicle.colour1 = colour1;
    vehicle.colour2 = colour2;
    //vehicle.livery = livery;
    //vehicle.dirtLevel = dirtLevel;
    vehicle.carLock = locked;
    vehicle.lights = lights;
    serverVehicles.push(vehicle);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.engine", function(vehicle, state) {
    vehicle.engine = state;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.lights", function(vehicle, state) {
    vehicle.lights = state;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.repair", function(syncId) {
    getVehicleFromSyncId(syncId).fix();
});

// ---------------------------------------------------------------------------