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

let syncPosition = false;

addEventHandler("onProcess", function(event, deltaTime) {
    //if(gta.game == GAME_GTA_IV) {
        getVehicles().forEach(function(vehicle) {
            if(vehicle.isSyncer && vehicle.getData("ag.syncId") != null) {
                triggerNetworkEvent("ag.veh.sync", vehicle.getData("ag.syncId"), vehicle.position, vehicle.heading.toFixed(2));
            }
        });
        
        if(localPlayer != null && syncPosition) {
            if(localPlayer.health <= 0) {
                triggerNetworkEvent("ag.player.death", localPlayer.position, localPlayer.heading.toFixed(2));
            } else {
                triggerNetworkEvent("ag.player.sync", localPlayer.position, localPlayer.heading.toFixed(2));

                if(localPlayer.vehicle) {
                    if(localPlayer.getData("ag.veh") == null) {
                        if(localPlayer.vehicle.getData("ag.syncId") != null) {
                            triggerNetworkEvent("ag.iv.veh", localPlayer.getData("ag.syncId"));
                            localPlayer.setData("ag.veh", localPlayer.vehicle);
                        }
                    }
                } else {
                    if(localPlayer.getData("ag.veh") != null) {
                        triggerNetworkEvent("ag.iv.veh", -1);
                        localPlayer.removeData("ag.veh", localPlayer.vehicle);
                    }
                }
            }
        }
    //}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.vehicle", function(syncId, model, position, heading, colour1, colour2, locked, lights) { //livery, dirtLevel, locked, lights) {
    let vehicle = createVehicle(model, position, heading);
    vehicle.setData("ag.syncId", syncId);
    vehicle.colour1 = colour1;
    vehicle.colour2 = colour2;
    //vehicle.livery = livery;
    //vehicle.dirtLevel = dirtLevel;
    vehicle.carLock = locked;
    vehicle.lights = lights;
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
        if(vehicles[i].getData("ag.syncId")) {
            if(vehicles[i].getData("ag.syncId") == syncId) {
                return vehicles[i];
            }
        }
    }
}

// ---------------------------------------------------------------------------

function getVehicleFromSyncId(syncId) {
    let vehicles = getVehicles();
    for(let i in vehicles) {
        if(vehicles[i].getData("ag.syncId") != null) {
            if(vehicles[i].getData("ag.syncId") == syncId) {
                return vehicles[i];
            }
        }
    }
}

// ---------------------------------------------------------------------------