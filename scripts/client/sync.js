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
            triggerNetworkEvent("ag.player.death", localPlayer.position, localPlayer.heading.toFixed(2));
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

addNetworkHandler("ag.veh.lock", function(syncId, lockState) {
    if(isGTAIV()) {
        getVehicleFromSyncId(syncId).locked = lockState;
    } else {
        getVehicleFromSyncId(syncId).carLock = lockState;
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.lights", function(syncId, lightState) {
    getVehicleFromSyncId(syncId).lights = lightState;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.engine", function(syncId, engineState) {
    getVehicleFromSyncId(syncId).engine = engineState;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.colours", function(syncId, colour1, colour2) {
    getVehicleFromSyncId(syncId).colour1 = colour1;
    getVehicleFromSyncId(syncId).colour2 = colour2;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.veh.repair", function(syncId) {
    getVehicleFromSyncId(syncId).fix();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.iv.syncPosition", function(state) {
    syncPosition = state;
});

// ---------------------------------------------------------------------------

function getVehicleFromIVSyncId(syncId) {
    let vehicles = getVehicles();
    for(let i in vehicles) {
        if(getEntityData(vehicles[i], "ag.syncId")) {
            if(getEntityData(vehicles[i], "ag.syncId") == syncId) {
                return vehicles[i];
            }
        }
    }
}

// ---------------------------------------------------------------------------

function getVehicleFromSyncId(syncId) {
    let vehicles = getVehicles();
    for(let i in vehicles) {
        if(getEntityData(vehicles[i], "ag.syncId") != null) {
            if(getEntityData(vehicles[i], "ag.syncId") == syncId) {
                return vehicles[i];
            }
        }
    }
}

// ---------------------------------------------------------------------------