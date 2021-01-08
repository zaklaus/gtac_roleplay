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

addEventHandler("onProcess", function(event, deltaTime) {
    if(localPlayer != null && isSpawned) {
        if(localPlayer.health <= 0) {
            localPlayer.clearWeapons();
            triggerNetworkEvent("ag.player.death", localPlayer.position);
        }
    }
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

function syncVehicleProperties(vehicle) {
    //if(doesEntityDataExist(vehicle, "ag.lights")) {
    //    let lights = getEntityData(vehicle, "ag.lights");
    //    if(lights != vehicle.lights) {
    //        vehicle.lights = lights;
    //    }
    //}

    //if(doesEntityDataExist(vehicle, "ag.engine")) {
    //    let engine = getEntityData(vehicle, "ag.engine");
    //    if(engine != vehicle.engine) {
    //        vehicle.engine = engine;
    //    }
    //}

    //if(doesEntityDataExist(vehicle, "ag.siren")) {
    //    let siren = getEntityData(vehicle, "ag.siren");
    //    if(siren != vehicle.siren) {
    //        vehicle.siren = siren;
    //    }
    //}

    if(doesEntityDataExist(vehicle, "ag.panelStatus")) {
        let panelsStatus = getEntityData(vehicle, "ag.panelStatus");
        for(let i in panelsStatus) {
            vehicle.setPanelStatus(i, panelsStatus[i]);
        }
    }

    if(doesEntityDataExist(vehicle, "ag.wheelStatus")) {
        let wheelsStatus = getEntityData(vehicle, "ag.wheelStatus");
        for(let i in wheelsStatus) {
            vehicle.setWheelStatus(i, wheelsStatus[i]);
        }
    }

    if(doesEntityDataExist(vehicle, "ag.lightStatus")) {
        let lightStatus = getEntityData(vehicle, "ag.lightStatus");
        for(let i in lightStatus) {
            vehicle.setLightStatus(i, lightStatus[i]);
        }
    }

    if(doesEntityDataExist(vehicle, "ag.suspensionHeight")) {
        let suspensionHeight = getEntityData(vehicle, "ag.suspensionHeight");
        vehicle.setSuspensionHeight(suspensionHeight);
    }
}
addNetworkHandler("ag.veh.sync", syncVehicleProperties);

// ---------------------------------------------------------------------------

function syncCivilianProperties(civilian) {
    if(doesEntityDataExist(civilian, "ag.scale") != null) {
        let scaleFactor = getEntityData(civilian, "ag.scale");
		let tempMatrix = civilian.matrix;
		tempMatrix.setScale(toVector3(scaleFactor.x, scaleFactor.y, scaleFactor.z));
		let tempPosition = civilian.position;
		civilian.matrix = tempMatrix;
		tempPosition.z += scaleFactor.z;
		civilian.position = tempPosition;
    }
}
addNetworkHandler("ag.civ.sync", syncCivilianProperties);

// ---------------------------------------------------------------------------

function syncPlayerProperties(player) {
    if(doesEntityDataExist(player, "ag.scale")) {
        let scaleFactor = getEntityData(player, "ag.scale");
		let tempMatrix = player.matrix;
		tempMatrix.setScale(toVector3(scaleFactor.x, scaleFactor.y, scaleFactor.z));
		let tempPosition = player.position;
		player.matrix = tempMatrix;
		tempPosition.z += scaleFactor.z;
		player.position = tempPosition;
    }
}
addNetworkHandler("ag.player.sync", syncPlayerProperties);

// ---------------------------------------------------------------------------