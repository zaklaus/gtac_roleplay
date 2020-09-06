// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

let allServerBlips = [];
let currentServerBlips = [];

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

function syncVehicle(vehicle) {
    if(vehicle.getData("ag.lights") != null) {
        let lights = vehicle.getData("ag.lights");
        if(lights != vehicle.lights) {
            vehicle.lights = lights;
        }
    }  

    if(vehicle.getData("ag.engine") != null) {
        let engine = vehicle.getData("ag.engine");
        if(engine != vehicle.engine) {
            vehicle.engine = engine;
        }
    }

    if(vehicle.getData("ag.siren") != null) {
        let siren = vehicle.getData("ag.siren");
        if(siren != vehicle.siren) {
            vehicle.siren = siren;
        }  
    }
}
addNetworkHandler("ag.veh.sync", syncVehicle);

// ---------------------------------------------------------------------------

function syncCivilian(civilian) {

}
addNetworkHandler("ag.civ.sync", syncCivilian);

// ---------------------------------------------------------------------------

addEventHandler("onElementStreamIn", function(event, element) {
    switch(element.type) {
        case ELEMENT_VEHICLE:
            syncVehicle(element);
            break;

        case ELEMENT_CIVILIAN:
            syncCivilian(element);
            break;

        default:
            break;
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.blips", function(blipData) {
    for(let i in blipData) {
        allServerBlips.push(blipData);
    }
});

// ---------------------------------------------------------------------------

function showIslandBlips() {
    for(let i in allServerBlips) {
        let position = new Vec3(allServerBlips[i][1], allServerBlips[i][2], allServerBlips[i][3]);
        if(getIslandFromPosition(position) == getIslandFromPosition(localPlayer.position)) {
            let tempBlip = createBlip(position, allServerBlips[i][0], allServerBlips[i][4], allServerBlips[i][5]);
            currentServerBlips.push(tempBlip);
        }
    }
}

// ---------------------------------------------------------------------------

function getIslandFromPosition(position) {
    switch(gta.game) {
        case GAME_GTA_III:
            if(position.x > 616) {        
                return 1;
            } else if(position.x < -283) {
                return 3;
            }
            return 2;

        default: 
            return 0;
    }
}

// ---------------------------------------------------------------------------

addEventHandler("onPedSpawn", function(event, ped) {
    console.log("localPlayer: " + localPlayer);

    // Nasty workaround since localPlayer is null as the player spawns (reported as client bug #194)
    setTimeout(attemptToShowBlipsOnSpawn, 500, ped);
});

// ---------------------------------------------------------------------------

function attemptToShowBlipsOnSpawn(ped) {
    if(ped == localPlayer) {
        showIslandBlips();
    }
}

// ---------------------------------------------------------------------------