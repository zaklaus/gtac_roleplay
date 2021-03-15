// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: sync.js
// DESC: Provides some elements and data sync
// TYPE: Client (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

addEventHandler("onProcess", function(event, deltaTime) {
    if(localPlayer != null && isSpawned) {
        if(gta.game == GAME_GTA_IV) {
            triggerNetworkEvent("ag.player.position", localPlayer.position);
            triggerNetworkEvent("ag.player.heading", localPlayer.heading);
        }

        if(localPlayer.health <= 1) {
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

addNetworkHandler("ag.veh.sync", function(event, vehicle) {
    if(vehicle != null) {
        syncVehicleProperties(vehicle);
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.civ.sync", function(event, civilian) {
    if(civilian != null) {
        syncCivilianProperties(civilian);
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.player.sync", function(event, player) {
    if(player != null) {
        syncPlayerProperties(player);
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.obj.sync", function(event, object) {
    if(object != null) {
        syncObjectProperties(object);
    }
});

// ---------------------------------------------------------------------------

function syncVehicleProperties(vehicle) {
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

    if(doesEntityDataExist(vehicle, "ag.upgrades")) {
        let upgrades = getEntityData(vehicle, "ag.upgrades");
        for(let i in upgrades) {
            vehicle.addUpgrade(upgrades[i]);
        }
    }

    if(doesEntityDataExist(vehicle, "ag.livery")) {
        let upgrades = getEntityData(vehicle, "ag.livery");
        if(getServerGame() == GAME_GTA_SA) {
            vehicle.setPaintJob(livery);
        } else if(getServerGame() == GAME_GTA_IV) {
            vehicle.livery = livery;
        }
    }

    //gta.REMOVE_UPSIDEDOWN_CAR_CHECK(gta.GET_VEHICLE_ID(vehicle));
}

// ---------------------------------------------------------------------------

function syncCivilianProperties(civilian) {
    if(doesEntityDataExist(civilian, "ag.scale")) {
        let scaleFactor = getEntityData(civilian, "ag.scale");
		let tempMatrix = civilian.matrix;
		tempMatrix.setScale(toVector3(scaleFactor.x, scaleFactor.y, scaleFactor.z));
		let tempPosition = civilian.position;
		civilian.matrix = tempMatrix;
		tempPosition.z += scaleFactor.z;
		civilian.position = tempPosition;
    }

    if(doesEntityDataExist(civilian, "ag.fightStyle")) {
        let fightStyle = getEntityData(civilian, "ag.fightStyle");
        civilian.fightStyle = fightStyle;
    }

    if(doesEntityDataExist(civilian, "ag.walkStyle")) {
        let walkStyle = getEntityData(civilian, "ag.walkStyle");
        civilian.walkStyle = walkStyle;
        //if(gta.game == GAME_GTA_III || gta.game == GAME_GTA_VC) {
        //    gta.SET_ANIM_GROUP_FOR_CHAR()
        //}
    }

    if(doesEntityDataExist(civilian, "ag.bodyPartHead")) {
        let bodyPartHead = getEntityData(civilian, "ag.bodyPartHead");
        civilian.changeBodyPart(1, bodyPartHead[0], bodyPartHead[1]);
    }

    if(doesEntityDataExist(civilian, "ag.bodyPartUpper")) {
        let bodyPartUpper = getEntityData(civilian, "ag.bodyPartUpper");
        civilian.changeBodyPart(1, bodyPartUpper[0], bodyPartUpper[1]);
    }

    if(doesEntityDataExist(civilian, "ag.bodyPartLower")) {
        let bodyPartLower = getEntityData(civilian, "ag.bodyPartLower");
        civilian.changeBodyPart(1, bodyPartLower[0], bodyPartLower[1]);
    }
}

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

    if(doesEntityDataExist(player, "ag.fightStyle")) {
        let fightStyle = getEntityData(player, "ag.fightStyle");
        player.fightStyle = fightStyle;
    }

    if(doesEntityDataExist(player, "ag.walkStyle")) {
        let walkStyle = getEntityData(player, "ag.walkStyle");
        player.walkStyle = walkStyle;
    }

    if(doesEntityDataExist(player, "ag.bodyPartHead")) {
        let bodyPartHead = getEntityData(player, "ag.bodyPartHead");
        player.changeBodyPart(1, bodyPartHead[0], bodyPartHead[1]);
    }

    if(doesEntityDataExist(player, "ag.bodyPartUpper")) {
        let bodyPartUpper = getEntityData(player, "ag.bodyPartUpper");
        player.changeBodyPart(1, bodyPartUpper[0], bodyPartUpper[1]);
    }

    if(doesEntityDataExist(player, "ag.bodyPartLower")) {
        let bodyPartLower = getEntityData(player, "ag.bodyPartLower");
        player.changeBodyPart(1, bodyPartLower[0], bodyPartLower[1]);
    }
}

// ---------------------------------------------------------------------------

function syncObjectProperties(object) {
    if(doesEntityDataExist(object, "ag.scale")) {
        let scaleFactor = getEntityData(object, "ag.scale");
		let tempMatrix = object.matrix;
		tempMatrix.setScale(toVector3(scaleFactor.x, scaleFactor.y, scaleFactor.z));
		let tempPosition = object.position;
		object.matrix = tempMatrix;
		tempPosition.z += scaleFactor.z;
		object.position = tempPosition;
    }
}

// ---------------------------------------------------------------------------