// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: sync.js
// DESC: Provides some elements and data sync
// TYPE: Client (JavaScript)
// ===========================================================================

// ===========================================================================

function processSync(event, deltaTime) {
    if(localPlayer != null) {
        if(gta.game == GAME_GTA_IV) {
            triggerNetworkEvent("ag.player.position", localPlayer.position);
            triggerNetworkEvent("ag.player.heading", localPlayer.heading);
        }

        if(localPlayer.health <= 0) {
            logToConsole(LOG_DEBUG, `Local player died`);
            localPlayer.clearWeapons();
            triggerNetworkEvent("ag.playerDeath", localPlayer.position);
        }
    }
}

// ===========================================================================

function toggleVehicleEngine(vehicle, state) {
    vehicle.engine = state;
}

// ===========================================================================

function toggleVehicleLights(vehicle, state) {
    getElementFromId(vehicle).lights = state;
}

// ===========================================================================

function repairVehicle(syncId) {
    getVehicleFromSyncId(syncId).fix();
}

// ===========================================================================

function syncVehicleProperties(vehicle) {
    if(doesEntityDataExist(vehicle, "ag.lights")) {
        let lightStatus = getEntityData(vehicle, "ag.lights");
        vehicle.lights = lightStatus;
    }

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

    //if(doesEntityDataExist(vehicle, "ag.suspensionHeight")) {
    //    let suspensionHeight = getEntityData(vehicle, "ag.suspensionHeight");
    //    vehicle.setSuspensionHeight(suspensionHeight);
    //}

    if(getGame() == GAME_GTA_SA) {
        if(doesEntityDataExist(vehicle, "ag.upgrades")) {
            let upgrades = getEntityData(vehicle, "ag.upgrades");
            for(let i in upgrades) {
                vehicle.addUpgrade(upgrades[i]);
            }
        }
    }

    if(getGame() == GAME_GTA_SA || getGame() == GAME_GTA_IV) {
        if(doesEntityDataExist(vehicle, "ag.livery")) {
            let livery = getEntityData(vehicle, "ag.livery");
            if(getGame() == GAME_GTA_SA) {
                vehicle.setPaintJob(livery);
            } else if(getGame() == GAME_GTA_IV) {
                vehicle.livery = livery;
            }
        }
    }

    //gta.REMOVE_UPSIDEDOWN_CAR_CHECK(gta.GET_VEHICLE_ID(vehicle));
}

// ===========================================================================

function syncCivilianProperties(civilian) {
    if(getGame() == GAME_GTA_III) {
        if(doesEntityDataExist(civilian, "ag.scale")) {
            let scaleFactor = getEntityData(civilian, "ag.scale");
            let tempMatrix = civilian.matrix;
            tempMatrix.setScale(toVector3(scaleFactor.x, scaleFactor.y, scaleFactor.z));
            let tempPosition = civilian.position;
            civilian.matrix = tempMatrix;
            tempPosition.z += scaleFactor.z;
            civilian.position = tempPosition;
        }
    }

    if(getGame() == GAME_GTA_SA) {
        if(doesEntityDataExist(civilian, "ag.fightStyle")) {
            let fightStyle = getEntityData(civilian, "ag.fightStyle");
            civilian.setFightStyle(fightStyle[0], fightStyle[1]);
        }
    }

    if(getGame() == GAME_GTA_III) {
        if(doesEntityDataExist(civilian, "ag.walkStyle")) {
            let walkStyle = getEntityData(civilian, "ag.walkStyle");
            civilian.walkStyle = walkStyle;
        }
    }

    if(getGame() == GAME_GTA_IV) {
        if(doesEntityDataExist(civilian, "ag.bodyPropHair")) {
            let bodyPropHair = getEntityData(civilian, "ag.bodyPropHair");
            civilian.changeBodyProp(0, bodyPropHair[0], bodyPropHair[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropHead")) {
            let bodyPropHead = getEntityData(civilian, "ag.bodyPropHead");
            civilian.changeBodyProp(1, bodyPropHead[0], bodyPropHead[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropEyes")) {
            let bodyPropEyes = getEntityData(civilian, "ag.bodyPropEyes");
            civilian.changeBodyProp(1, bodyPropEyes[0], bodyPropEyes[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropLeftHand")) {
            let bodyPropLeftHand = getEntityData(civilian, "ag.bodyPropLeftHand");
            civilian.changeBodyProp(1, bodyPropLeftHand[0], bodyPropLeftHand[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropRightHand")) {
            let bodyPropRightHand = getEntityData(civilian, "ag.bodyPropRightHand");
            civilian.changeBodyProp(1, bodyPropRightHand[0], bodyPropRightHand[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropLeftWrist")) {
            let bodyPropLeftWrist = getEntityData(civilian, "ag.bodyPropLeftWrist");
            civilian.changeBodyProp(1, bodyPropLeftWrist[0], bodyPropLeftWrist[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropRightWrist")) {
            let bodyPropRightWrist = getEntityData(civilian, "ag.bodyPropRightWrist");
            civilian.changeBodyProp(1, bodyPropRightWrist[0], bodyPropRightWrist[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropRightWrist")) {
            let bodyPropRightWrist = getEntityData(civilian, "ag.bodyPropRightWrist");
            civilian.changeBodyProp(1, bodyPropRightWrist[0], bodyPropRightWrist[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropHip")) {
            let bodyPropHip = getEntityData(civilian, "ag.bodyPropHip");
            civilian.changeBodyProp(1, bodyPropHip[0], bodyPropHip[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropLeftFoot")) {
            let bodyPropLeftFoot = getEntityData(civilian, "ag.bodyPropLeftFoot");
            civilian.changeBodyProp(1, bodyPropLeftFoot[0], bodyPropLeftFoot[1]);
        }

        if(doesEntityDataExist(civilian, "ag.bodyPropRightFoot")) {
            let bodyPropRightFoot = getEntityData(civilian, "ag.bodyPropRightFoot");
            civilian.changeBodyProp(1, bodyPropRightFoot[0], bodyPropRightFoot[1]);
        }
    }

    if(doesEntityDataExist(civilian, "ag.anim")) {
        let animData = getEntityData(vehicle, "ag.anim");
        civilian.addAnimation(animData[0], animData[1]);
    }
}

// ===========================================================================

function syncPlayerProperties(player) {
    if(getGame() == GAME_GTA_III) {
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

    if(getGame() == GAME_GTA_SA) {
        if(doesEntityDataExist(player, "ag.fightStyle")) {
            let fightStyle = getEntityData(player, "ag.fightStyle");
            player.fightStyle = fightStyle;
        }
    }

    //if(getGame() == GAME_GTA_SA) {
    //    if(doesEntityDataExist(player, "ag.walkStyle")) {
    //        let walkStyle = getEntityData(player, "ag.walkStyle");
    //        player.walkStyle = walkStyle;
    //    }
    //}

    if(getGame() == GAME_GTA_IV) {
        if(doesEntityDataExist(player, "ag.bodyPartHair")) {
            let bodyPartHead = getEntityData(player, "ag.bodyPartHair");
            player.changeBodyPart(0, bodyPartHead[0], bodyPartHair[1]);
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

    if(getGame() == GAME_GTA_IV) {
        if(doesEntityDataExist(player, "ag.bodyPropHair")) {
            let bodyPropHair = getEntityData(player, "ag.bodyPropHair");
            player.changeBodyProp(0, bodyPropHair[0], bodyPropHair[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropHead")) {
            let bodyPropHead = getEntityData(player, "ag.bodyPropHead");
            player.changeBodyProp(1, bodyPropHead[0], bodyPropHead[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropEyes")) {
            let bodyPropEyes = getEntityData(player, "ag.bodyPropEyes");
            player.changeBodyProp(1, bodyPropEyes[0], bodyPropEyes[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropLeftHand")) {
            let bodyPropLeftHand = getEntityData(player, "ag.bodyPropLeftHand");
            player.changeBodyProp(1, bodyPropLeftHand[0], bodyPropLeftHand[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropRightHand")) {
            let bodyPropRightHand = getEntityData(player, "ag.bodyPropRightHand");
            player.changeBodyProp(1, bodyPropRightHand[0], bodyPropRightHand[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropLeftWrist")) {
            let bodyPropLeftWrist = getEntityData(player, "ag.bodyPropLeftWrist");
            player.changeBodyProp(1, bodyPropLeftWrist[0], bodyPropLeftWrist[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropRightWrist")) {
            let bodyPropRightWrist = getEntityData(player, "ag.bodyPropRightWrist");
            player.changeBodyProp(1, bodyPropRightWrist[0], bodyPropRightWrist[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropRightWrist")) {
            let bodyPropRightWrist = getEntityData(player, "ag.bodyPropRightWrist");
            player.changeBodyProp(1, bodyPropRightWrist[0], bodyPropRightWrist[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropHip")) {
            let bodyPropHip = getEntityData(player, "ag.bodyPropHip");
            player.changeBodyProp(1, bodyPropHip[0], bodyPropHip[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropLeftFoot")) {
            let bodyPropLeftFoot = getEntityData(player, "ag.bodyPropLeftFoot");
            player.changeBodyProp(1, bodyPropLeftFoot[0], bodyPropLeftFoot[1]);
        }

        if(doesEntityDataExist(player, "ag.bodyPropRightFoot")) {
            let bodyPropRightFoot = getEntityData(player, "ag.bodyPropRightFoot");
            player.changeBodyProp(1, bodyPropRightFoot[0], bodyPropRightFoot[1]);
        }
    }
}

// ===========================================================================

function syncObjectProperties(object) {
    if(getGame() == GAME_GTA_III) {
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
}

// ===========================================================================

function syncElementProperties(element) {
    switch(element.type) {
        case ELEMENT_VEHICLE:
            syncVehicleProperties(element);
            break;

        case ELEMENT_PED:
            syncCivilianProperties(element);
            break;

        case ELEMENT_PLAYER:
            syncPlayerProperties(element);
            break;

        case ELEMENT_OBJECT:
            syncObjectProperties(element);
            break;

        default:
            break;
    }
}

// ===========================================================================