// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: utilities.js
// DESC: Provides util functions and arrays with data
// TYPE: Client (JavaScript)
// ===========================================================================

let weaponSlots = [
    false,
    [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
    ],
    [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        6,
        6,
        8,
        8,
        7,
        7,
        7,
        7,
        9,
        -1,
        9,
    ],
    [
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        8,
        8,
        8,
        -1,
        -1,
        -1,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        5,
        5,
        4,
        6,
        6,
        7,
        7,
        7,
        7,
        8,
        12,
        9,
        9,
        9,
        9,
        9,
        11,
        9,
        9,
        9,
    ],
];

function openAllGarages() {
    switch(gta.game) {
        case GAME_GTA_III:
            for(let i=0;i<=26;i++) {
                openGarage(i);
                gta.NO_SPECIAL_CAMERA_FOR_THIS_GARAGE(i);
            }
            break;

        case GAME_GTA_VC:
            for(let i=0;i<=32;i++) {
                openGarage(i);
                gta.NO_SPECIAL_CAMERA_FOR_THIS_GARAGE(i);
            }
            break;

        case GAME_GTA_SA:
            for(let i=0;i<=44;i++) {
                openGarage(i);
            }
            break;

        default:
            break;
    }
}

// ===========================================================================

function closeAllGarages() {
    switch(gta.game) {
        case GAME_GTA_III:
            for(let i=0;i<=26;i++) {
                closeGarage(i);
                gta.NO_SPECIAL_CAMERA_FOR_THIS_GARAGE(i);
            }
            break;

        case GAME_GTA_VC:
            for(let i=0;i<=32;i++) {
                closeGarage(i);
                gta.NO_SPECIAL_CAMERA_FOR_THIS_GARAGE(i);
            }
            break;

        case GAME_GTA_SA:
            for(let i=0;i<=44;i++) {
                closeGarage(i);
            }
            break;

        default:
            break;
    }
}

// ===========================================================================

function setLocalPlayerFrozenState(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting frozen state to ${state}`);
    gui.showCursor(state, !state);
}

// ===========================================================================

function setLocalPlayerControlState(controlState, cursorState = false) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting control state to ${controlState} (Cursor: ${cursorState})`);
    controlsEnabled = controlState;
    localPlayer.invincible = true;
    localPlayer.collisionsEnabled = controlState;
    localPlayer.invincible = false;
}

// ===========================================================================

function fadeLocalCamera(state, time) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Fading camera ${(state)?"in":"out"} for ${time} seconds`);
    gta.fadeCamera(state, time);
}

// ===========================================================================

function removeLocalPlayerFromVehicle() {
    localPlayer.removeFromVehicle();
}

// ===========================================================================

function restoreLocalCamera() {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Camera restored`);
    gta.restoreCamera(true);
};

// ===========================================================================

function clearLocalPlayerOwnedPeds() {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Clearing all self-owned peds ...`);
    clearSelfOwnedPeds();
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] All self-owned peds cleared`);
};

// ===========================================================================

function setLocalCameraLookAt(cameraPosition, cameraLookAt) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Set camera to look at [${cameraLookAt.x}, ${cameraLookAt.y}, ${cameraLookAt.z}] from [${cameraPosition.x}, ${cameraPosition.y}, ${cameraPosition.z}]`);
    gta.setCameraLookAt(cameraPosition, cameraLookAt, true);
}

// ===========================================================================

function setCityAmbienceState(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Ambient civilians and traffic ${(state) ? "enabled" : "disabled"}`);
    gta.setTrafficEnabled(state);
    gta.setGenerateCarsAroundCamera(state);
    if(gta.game != GAME_GTA_SA) {
        gta.setCiviliansEnabled(state);
    }
    clearSelfOwnedPeds();
}

// ===========================================================================

function runClientCode(code, returnTo) {
	let returnValue = "Nothing";
	try {
		returnValue = eval("(" + code + ")");
	} catch(error) {
		triggerNetworkEvent("ag.runCodeFail", returnTo, code);
		return false;
    }
    triggerNetworkEvent("ag.runCodeSuccess", returnTo, code, returnValue);
}

// ===========================================================================

function enterVehicleAsPassenger() {
	if(localPlayer.vehicle == null) {
		let tempVehicle = getClosestVehicle(localPlayer.position);
		if(tempVehicle != null) {
			localPlayer.enterVehicle(tempVehicle, false);
		}
	}
}

// ===========================================================================

function giveLocalPlayerWeapon(weaponId, ammo, active) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Giving weapon ${weaponId} with ${ammo} ammo`);
    localPlayer.giveWeapon(weaponId, ammo, active);
    forceWeaponAmmo = localPlayer.getWeaponAmmunition(getWeaponSlot(weaponId));
    forceWeaponClipAmmo = localPlayer.getWeaponClipAmmunition(getWeaponSlot(weaponId));
    forceWeapon = weaponId;
}

// ===========================================================================

function giveLocalPlayerWeapon(weaponId, ammo, active) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Giving weapon ${weaponId} with ${ammo} ammo`);
    localPlayer.giveWeapon(weaponId, ammo, active);
    forceWeaponAmmo = localPlayer.getWeaponAmmunition(getWeaponSlot(weaponId));
    forceWeaponClipAmmo = localPlayer.getWeaponClipAmmunition(getWeaponSlot(weaponId));
    forceWeapon = weaponId;
}

// ===========================================================================

function clearLocalPlayerWeapons() {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Clearing weapons`);
    localPlayer.clearWeapons();
    forceWeapon = 0;
    forceWeaponAmmo = 0;
    forceWeaponClipAmmo = 0;
}

// ===========================================================================

function getClosestVehicle(pos) {
    return getVehicles().reduce((i, j) => (i.position.distance(pos) < j.position.distance(pos)) ? i : j);
}

// ===========================================================================

function setLocalPlayerPosition(position) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting position to ${position.x}, ${position.y}, ${position.z}`);
    localPlayer.position = position;
}

// ===========================================================================

function setLocalPlayerHeading(heading) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting heading to ${heading}`);
    localPlayer.heading = heading;
}

// ===========================================================================

function setLocalPlayerInterior(interior) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting interior to ${interior}`);
    localPlayer.interior = interior;
    gta.cameraInterior = interior;
}

// ===========================================================================

function setSnowState(fallingSnow, groundSnow) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting falling snow to ${fallingSnow} and ground snow to ${groundSnow}`);
    if(!isNull(snowing)) {
        snowing = fallingSnow;
        forceSnowing(groundSnow);
    }
}

// ===========================================================================

function setLocalPlayerHealth(health) {
    localPlayer.health = health;
}

// ===========================================================================

function isSnowEnabled() {
    return (typeof snowing != "undefined");
}

// ===========================================================================

function playPedSpeech(pedName, speechId) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Making ${pedName}'s ped talk (${speechId})`);
    gta.SET_CHAR_SAY(int, int);
}

// ===========================================================================

function clearLocalPedState() {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Clearing local ped state`);
    localPlayer.clearObjective();
}

// ===========================================================================

function getWeaponSlot(weaponId) {
	return weaponSlots[gta.game][weaponId];
}

// ===========================================================================

function setLocalPlayerDrunkEffect(amount, duration) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Drunk effect set to ${amount} for ${duration}ms`);
    drunkEffectAmount = 0;
    drunkEffectDurationTimer = setInterval(function() {
        drunkEffectAmount = drunkEffectAmount;
        if(drunkEffectAmount > 0) {
            gta.SET_MOTION_BLUR(drunkEffectAmount);
        } else {
            clearInterval(drunkEffectDurationTimer);
            drunkEffectDurationTimer = null;
        }
    }, 1000);
}

// ===========================================================================

function getLocalPlayerVehicleSeat() {
    for(let i = 0 ; i <= 4 ; i++) {
        if(localPlayer.vehicle.getOccupant(i) == localPlayer) {
            return i;
        }
    }
}

// ===========================================================================

function clearSelfOwnedPeds() {
    logToConsole(LOG_DEBUG, `Clearing self-owned peds`);
    getElementsByType(ELEMENT_CIVILIAN).forEach(function(ped) {
        if(ped.isOwner) {
            destroyElement(ped);
        }
    });
}

// ===========================================================================

function setMouseCameraState(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] ${(state)?"Enabled":"Disabled"} mouse camera`);
    mouseCameraEnabled = !mouseCameraEnabled;
    SetStandardControlsEnabled(!mouseCameraEnabled);
}

// ===========================================================================

function setMouseCursorState(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] ${(state)?"Enabled":"Disabled"} mouse cursor`);
    gui.showCursor(state, !state);
}

// ===========================================================================

function setPlayerWeaponDamageEvent(clientName, eventType) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Set ${clientName} damage event type to ${eventType}`);
    weaponDamageEvent[clientName] = eventType;
}

// ===========================================================================

function setPlayerWeaponDamageEnabled(clientName, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] ${(state)?"Enabled":"Disabled"} damage from ${clientName}`);
    weaponDamageEnabled[clientName] = state;
}

// ===========================================================================

function setLocalPlayerCash(amount) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Setting local player money`);
    localPlayer.money = amount;
}

// ===========================================================================

function removeWorldObject(model, position, range) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Removing world object ${model} at X: ${position.x}, Y: ${position.x}, Z: ${position.x} with range of ${range}`);
    gta.removeWorldObject(model, position, range);
}

// ===========================================================================

function excludeModelFromGroundSnow(model) {
    logToConsole(LOG_DEBUG, `[Asshat.Utilities] Disabling ground snow for object model ${model}`);
    groundSnow.excludeModel(model);
}

// ===========================================================================

function destroyAutoCreatedPickups() {
    getElementsByType(ELEMENT_PICKUP).forEach(function(pickup) {
        if(pickup.isOwner) {
            destroyElement(pickup);
        }
    });
}

// ===========================================================================

function processLocalPlayerControlState() {
    if(localPlayer == null) {
        return false;
    }

    if(isSpawned) {
        return false;
    }

    if(!controlsEnabled) {
        clearLocalPedState();
    }
}

// ===========================================================================

function clearLocalPlayerWantedLevel() {
    if(localPlayer == null) {
        return false;
    }

    if(isSpawned) {
        return false;
    }

    localPlayer.wantedLevel = 0;
}

// ===========================================================================

function processLocalPlayerVehicleControlState() {
    let position = getLocalPlayerPosition();

    if(inVehicle && localPlayer.vehicle != null) {
        if(!localPlayer.vehicle.engine) {
            localPlayer.vehicle.velocity = toVector3(0.0, 0.0, 0.0);
            localPlayer.vehicle.turnVelocity = toVector3(0.0, 0.0, 0.0);
            if(parkedVehiclePosition) {
                localPlayer.vehicle.position = parkedVehiclePosition;
                localPlayer.vehicle.heading = parkedVehicleHeading;
            }
        } else {
            if(parkedVehiclePosition) {
                parkedVehiclePosition = false;
                parkedVehicleHeading = false;
            }
        }
    }
}

// ===========================================================================

function processLocalPlayerSphereEntryExitHandling() {
    let position = getLocalPlayerPosition();

    getElementsByType(ELEMENT_MARKER).forEach(function(sphere) {
        if(position.distance(sphere.position) <= sphere.radius) {
            if(!inSphere) {
                inSphere = sphere;
                triggerEvent("OnLocalPlayerEnterSphere", null, sphere);
            }
        } else {
            if(inSphere) {
                inSphere = false;
                triggerEvent("OnLocalPlayerExitSphere", null, sphere);
            }
        }
    });
}

// ===========================================================================

function processJobRouteSphere() {
    if(gta.game == GAME_GTA_SA) {
        if(jobRouteStopSphere != null) {
            if(position.distance(jobRouteStopSphere.position) <= 2.0) {
                enteredJobRouteSphere();
            }
        }
    }
}

// ===========================================================================

function forceLocalPlayerEquippedWeaponItem() {
    if(forceWeapon != 0) {
        if(localPlayer.weapon != forceWeapon) {
            localPlayer.weapon = forceWeapon;
            localPlayer.setWeaponClipAmmunition(getWeaponSlot(forceWeapon), forceWeaponClipAmmo);
            localPlayer.setWeaponAmmunition(getWeaponSlot(forceWeapon), forceWeaponAmmo);
        } else {
            forceWeaponClipAmmo = localPlayer.getWeaponClipAmmunition(getWeaponSlot(forceWeapon));
            forceWeaponAmmo = localPlayer.getWeaponAmmunition(getWeaponSlot(forceWeapon));
        }
    } else {
        if(localPlayer.weapon > 0) {
            localPlayer.clearWeapons();
        }
    }
}

// ===========================================================================

function getLocalPlayerPosition() {
    let position = localPlayer.position;
    if(localPlayer.vehicle) {
        position = localPlayer.vehicle.position;
    }

    return position;
}

// ===========================================================================

function processLocalPlayerVehicleEntryExitHandling() {
    if(localPlayer.vehicle) {
        if(!inVehicle) {
            inVehicle = localPlayer.vehicle;
            inVehicleSeat = getLocalPlayerVehicleSeat();
            triggerEvent("OnLocalPlayerEnteredVehicle", inVehicle, inVehicleSeat);
        }
    } else {
        if(inVehicle) {
            triggerEvent("OnLocalPlayerExitedVehicle", inVehicle, inVehicleSeat);
            inVehicle = false;
            inVehicleSeat = false;
        }
    }
}

// ===========================================================================

function getVehicleForNetworkEvent(vehicleArg) {
    // Soon this will also be used to get the IV vehicle via it's ID
    return vehicleArg;
}

// ===========================================================================

function getPosInFrontOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle+(Math.PI/2)))*distance));
	let z = pos.z;

	return toVector3(x, y, z);
}

// ===========================================================================

function getAllowedSkinIndexBySkinId(skinId) {
    for(let i in allowedSkins[gta.game]) {
        if(skinId == allowedSkins[gta.game][i][0]) {
            return i;
        }
    }
    return -1;
}

// ===========================================================================