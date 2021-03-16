// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

// ===========================================================================

let bigMessageFont = null;
let logoImage = null;

let logoPos = toVector2(gta.width-132, gta.height-132);
let logoSize = toVector2(128, 128);

let jobRouteStopBlip = null;
let jobRouteStopSphere = null;

let smallGameMessageFont = null;
let smallGameMessageText = "";
let smallGameMessageColour = COLOUR_WHITE;
let smallGameMessageTimer = null;

let inSphere = false;
let inVehicle = false;
let inVehicleSeat = false;
let isWalking = false;
let isSpawned = false;

let localPlayerJobType = 0;
let localPlayerWorking = false;

let mouseCameraEnabled = false;

let garbageCollectorInterval = null;

let parkedVehiclePosition = false;
let parkedVehicleHeading = false;

let renderHUD = true;
let renderLabels = true;
let renderLogo = true;
let renderSmallGameMessage = true;
let renderScoreboard = true;
let renderHotBar = true;
let renderItemActionDelay = true;

let logLevel = LOG_ALL;

let weaponDamageEnabled = {};
let weaponDamageEvent = {};

let forceWeapon = 0;
let forceWeaponAmmo = 0;
let forceWeaponClipAmmo = 0;

let itemActionDelayDuration = 0;
let itemActionDelayStart = 0;
let itemActionDelayEnabled = false;
let itemActionDelayPosition = toVector2(gta.width/2, gta.height-100);
let itemActionDelaySize = toVector2(100, 10);

let drunkEffectAmount = 0;
let drunkEffectDurationTimer = null;

let controlsEnabled = false;

let usingSkinSelector = false;

// ===========================================================================

addEvent("OnLocalPlayerEnterSphere", 1);
addEvent("OnLocalPlayerExitSphere", 1);
addEvent("OnLocalPlayerEnteredVehicle", 1);
addEvent("OnLocalPlayerExitedVehicle", 1);
addEvent("OnLocalPlayerSwitchWeapon", 2);

// ===========================================================================

bindEventHandler("onResourceReady", thisResource, function(event, resource) {
	if(resource == thisResource) {
		let fontStream = openFile("files/fonts/pricedown.ttf");
		if(fontStream != null) {
            bigMessageFont = lucasFont.createFont(fontStream, 28.0);
            smallGameMessageFont = lucasFont.createFont(fontStream, 20.0);
			fontStream.close();
		}

		let logoStream = openFile(mainLogoPath);
		if(logoStream != null) {
			logoImage = drawing.loadPNG(logoStream);
			logoStream.close();
		}
    }

    triggerNetworkEvent("ag.clientReady");

    openAllGarages();
});

// ===========================================================================

bindEventHandler("onResourceStart", thisResource, function(event, resource) {
    if(gta.game == GAME_GTA_SA) {
        gta.setDefaultInteriors(false);
        gta.setCiviliansEnabled(false);
    }
    garbageCollectorInterval = setInterval(collectAllGarbage, 1000*60);
    addNetworkHandler("ag.passenger", enterVehicleAsPassenger);

    triggerNetworkEvent("ag.clientStarted");
    addEventHandler("onProcess", processEvent);
});

// ===========================================================================

bindEventHandler("onResourceStop", thisResource, function(event, resource) {
    removeEventHandler("onProcess");
});

// ===========================================================================

addEventHandler("onKeyUp", function(event, virtualKey, physicalKey, keyModifiers) {
    if(usingSkinSelector) {
        if(physicalKey == SDLK_d) {
            if(getGameData(gta.game).allowedSkins.length-1 == skinSelectorIndex) {
                skinSelectorIndex = 0;
            }
            localPlayer.skin = getGameData(gta.game).allowedSkins[skinSelectorIndex];
        } else if(physicalKey == SDLK_a) {
            if(getGameData(gta.game).allowedSkins.length-1 == 0) {
                skinSelectorIndex = getGameData(gta.game).allowedSkins.length-1;
            }
            localPlayer.skin = getGameData(gta.game).allowedSkins[skinSelectorIndex];
        } else if(physicalKey == SDLK_RETURN) {
            triggerNetworkEvent("ag.skinSelected", getGameData(gta.game).allowedSkins[skinSelectorIndex]);
            usingSkinSelector = false;
        }
    }
});

// ===========================================================================

addNetworkHandler("ag.cameraLookAt", function(cameraPosition, cameraLookat) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Set camera to look at ${cameraPosition.x}, ${cameraPosition.y}, ${cameraPosition.z}`);
    gta.setCameraLookAt(cameraPosition, cameraLookat, true);
});

// ===========================================================================

addNetworkHandler("ag.restoreCamera", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Camera restored`);
    gta.restoreCamera(true);
});

// ===========================================================================

addNetworkHandler("ag.clearPeds", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Clearing all self-owned peds ...`);
    clearSelfOwnedPeds();
    logToConsole(LOG_DEBUG, `[Asshat.Main] All self-owned peds cleared`);
});

// ===========================================================================

addNetworkHandler("ag.logo", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Server logo ${(state) ? "enabled" : "disabled"}`);
    renderLogo = state;
});

// ===========================================================================

addNetworkHandler("ag.ambience", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Ambient civilians and traffic ${(state) ? "enabled" : "disabled"}`);
    gta.setTrafficEnabled(state);
    gta.setGenerateCarsAroundCamera(state);
    if(gta.game != GAME_GTA_SA) {
        gta.setCiviliansEnabled(state);
    }
    clearSelfOwnedPeds();
});

// ===========================================================================

addNetworkHandler("ag.runCode", function(code, returnTo) {
	let returnValue = "Nothing";
	try {
		returnValue = eval("(" + code + ")");
	} catch(error) {
		triggerNetworkEvent("ag.runCodeFail", returnTo, code);
		return false;
    }
    triggerNetworkEvent("ag.runCodeSuccess", returnTo, code, returnValue);
});

// -------------------------------------------------------------------------

function enterVehicleAsPassenger() {
	if(localPlayer.vehicle == null) {
		let tempVehicle = getClosestVehicle(localPlayer.position);
		if(tempVehicle != null) {
			localPlayer.enterVehicle(tempVehicle, false);
		}
	}
}

// -------------------------------------------------------------------------

function getClosestVehicle(pos) {
    return getVehicles().reduce((i, j) => (i.position.distance(pos) < j.position.distance(pos)) ? i : j);
}

// -------------------------------------------------------------------------

addNetworkHandler("ag.clearWeapons", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Clearing weapons`);
    localPlayer.clearWeapons();
    forceWeapon = 0;
    forceWeaponAmmo = 0;
    forceWeaponClipAmmo = 0;
});

// ===========================================================================

addNetworkHandler("ag.giveWeapon", function(weaponId, ammo, active) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Giving weapon ${weaponId} with ${ammo} ammo`);
    localPlayer.giveWeapon(weaponId, ammo, active);
    forceWeaponAmmo = localPlayer.getWeaponAmmunition(getWeaponSlot(weaponId));
    forceWeaponClipAmmo = localPlayer.getWeaponClipAmmunition(getWeaponSlot(weaponId));
    forceWeapon = weaponId;
});

// ===========================================================================

addEventHandler("OnElementStreamIn", function(event, element) {
    switch(element.type) {
        case ELEMENT_VEHICLE:
            syncVehicleProperties(element);
            break;

        case ELEMENT_CIVILIAN:
            syncCivilianProperties(element);
            break;

        case ELEMENT_PLAYER:
            //syncPlayerProperties(element);
            break;

        case ELEMENT_OBJECT:
            //syncObjectProperties(element);
            break;

        default:
            break;
    }
});

// ===========================================================================

addNetworkHandler("ag.blips", function(blipData) {
    for(let i in blipData) {
        allServerBlips.push(blipData[i]);
    }
});

// ===========================================================================

function showIslandBlips() {
    for(let i in allServerBlips) {
        let position = toVector3(allServerBlips[i][1], allServerBlips[i][2], allServerBlips[i][3]);
        if(getIslandFromPosition(position) == getIslandFromPosition(localPlayer.position)) {
            let tempBlip = createBlip(position, allServerBlips[i][0], allServerBlips[i][4], allServerBlips[i][5]);
            currentServerBlips.push(tempBlip);
        }
    }
}

// ===========================================================================

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

// ===========================================================================

addNetworkHandler("ag.position", function(position) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting position to ${position.x}, ${position.y}, ${position.z}`);
    localPlayer.position = position;
});

// ===========================================================================

addNetworkHandler("ag.position", function(position) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting position to ${position.x}, ${position.y}, ${position.z}`);
    localPlayer.position = position;
});

// ===========================================================================

addNetworkHandler("ag.heading", function(heading) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting heading to ${heading}`);
    localPlayer.heading = heading;
});

// ===========================================================================

addNetworkHandler("ag.interior", function(interior) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Interior set to ${interior}`);
    localPlayer.interior = interior;
    gta.cameraInterior = interior;
});

// ===========================================================================

addNetworkHandler("ag.removeFromVehicle", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Removing local player from vehicle`);
    localPlayer.removeFromVehicle();
});

// ===========================================================================

function processEvent(event, deltaTime) {
    if(gta.game != GAME_GTA_IV) {
        gta.clearMessages();
    }

    if(localPlayer != null) {
        if(isSpawned) {
            if(!controlsEnabled) {
                //localPlayer.velocity = new Vec3(0.0, 0.0, 0.0);
                localPlayer.clearObjective();
            }

            localPlayer.wantedLevel = 0;

            let position = localPlayer.position;
            if(localPlayer.vehicle) {
                position = localPlayer.vehicle.position;
            }

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

            getElementsByType(ELEMENT_PICKUP).forEach(function(pickup) {
                if(pickup.isOwner) {
                    destroyElement(pickup);
                }
            });

            getElementsByType(ELEMENT_MARKER).forEach(function(sphere) {
                if(position.distance(sphere.position) <= sphere.radius) {
                    if(!inSphere) {
                        inSphere = sphere;
                        triggerEvent("OnLocalPlayerEnterSphere", null, sphere);
                        //triggerNetworkEvent("ag.onPlayerEnterSphere", sphere);
                    }
                } else {
                    if(inSphere) {
                        inSphere = false;
                        triggerEvent("OnLocalPlayerExitSphere", null, sphere);
                        //triggerNetworkEvent("ag.onPlayerExitSphere", sphere);
                    }
                }
            });

            if(gta.game == GAME_GTA_SA) {
                if(jobRouteStopSphere != null) {
                    if(position.distance(jobRouteStopSphere.position) <= 2.0) {
                        enteredJobRouteSphere();
                    }
                }
            }

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
    }
}

// ===========================================================================

addEventHandler("OnDrawnHUD", function (event) {
    if(!renderHUD) {
        return false;
    }

    if(localPlayer == null) {
        return false;
    }

    if(renderSmallGameMessage) {
        if(smallGameMessageFont != null) {
            if(smallGameMessageFont != "") {
                smallGameMessageFont.render(smallGameMessageText, [0, gta.height-50], gta.width, 0.5, 0.0, smallGameMessageFont.size, smallGameMessageColour, true, true, false, true);
            }
        }
    }

    if(renderLogo) {
        if(logoImage != null) {
            drawing.drawRectangle(logoImage, logoPos, logoSize);
        }
    }

    if(renderScoreboard) {
        if(isKeyDown(SDLK_TAB)) {
            processScoreboardRendering();
        }
    }

    if(renderLabels && gta.game != GAME_GTA_IV) {
        processLabelRendering();
    }

    if(renderItemActionDelay) {
        //logToConsole(LOG_DEBUG, `Item action delay render enabled`);
        if(itemActionDelayEnabled) {
            //logToConsole(LOG_DEBUG, `Item action delay enabled`);
            let finishTime = itemActionDelayStart+itemActionDelayDuration;
            if(sdl.ticks >= finishTime) {
                logToConsole(LOG_DEBUG, `Item action delay finish time reached`);
                itemActionDelayEnabled = false;
                itemActionDelayDuration = 0;
                itemActionDelayStart = 0;
                triggerNetworkEvent("ag.itemActionDelayComplete");
            } else {
                let progressWidth = itemActionDelaySize.x-Math.ceil((finishTime-sdl.ticks)/100);
                logToConsole(LOG_DEBUG, `Item action delay in progress - ${Math.ceil((finishTime-sdl.ticks)/100)} - ${progressWidth}/${itemActionDelaySize.x}`);
                drawing.drawRectangle(null, [itemActionDelayPosition.x-(itemActionDelaySize.x/2), itemActionDelayPosition.y-(itemActionDelaySize.y/2)], [progressWidth, itemActionDelaySize.y], COLOUR_LIME, COLOUR_LIME, COLOUR_LIME, COLOUR_LIME);
            }
        }
    }

    if(usingSkinSelector) {

    }
});

// ===========================================================================

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

addNetworkHandler("ag.freeze", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting frozen state to ${state}`);
    gui.showCursor(state, !state);
});

// ===========================================================================

addNetworkHandler("ag.control", function(controlState, cursorState = false) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting control state to ${controlState} (Cursor: ${cursorState})`);
    controlsEnabled = controlState;
    localPlayer.invincible = true;
    localPlayer.collisionsEnabled = controlState;
    localPlayer.invincible = false;
});

// ===========================================================================

addNetworkHandler("ag.fadeCamera", function(state, time) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Fading camera ${(state)?"in":"out"} for ${time} seconds`);
    gta.fadeCamera(state, time);
});

// ===========================================================================

addEventHandler("OnPedWasted", function(event, wastedPed, killerPed, weapon, pedPiece) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Ped ${wastedPed.name} died`);
    wastedPed.clearWeapons();
});

// ===========================================================================

addNetworkHandler("ag.showBusStop", function(position, colour) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Showing bus stop`);
    if(gta.game == GAME_GTA_SA) {
        jobRouteStopSphere = gta.createPickup(1318, position, 1);
    } else {
        jobRouteStopSphere = gta.createSphere(position, 3);
        jobRouteStopSphere.colour = colour;
    }

    jobRouteStopBlip = gta.createBlip(position, 0, 2, colour);
});

// ===========================================================================

addNetworkHandler("ag.snow", function(fallingSnow, groundSnow) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting falling snow to ${fallingSnow} and ground snow to ${groundSnow}`);
    if(!isNull(snowing)) {
        snowing = fallingSnow;
        forceSnowing(groundSnow);
    }
});

// ===========================================================================

addNetworkHandler("ag.money", function(amount) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting local player money`);
    localPlayer.money = amount;
});

// ===========================================================================

addNetworkHandler("ag.removeWorldObject", function(model, position, range) {
    logToConsole(LOG_DEBUG, `Removing world object ${model} at X: ${position.x}, Y: ${position.x}, Z: ${position.x} with range of ${range}`);
    gta.removeWorldObject(model, position, range);
});

// ===========================================================================

addNetworkHandler("ag.excludeGroundSnow", function(model) {
    logToConsole(LOG_DEBUG, `Disabling ground snow for object model ${model}`);
    groundSnow.excludeModel(model);
});

// ===========================================================================

addEventHandler("OnLocalPlayerEnterSphere", function(event, sphere) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Local player entered sphere`);
    if(sphere == jobRouteStopSphere) {
        enteredJobRouteSphere();
    }
});

// ===========================================================================

addNetworkHandler("ag.smallGameMessage", function(text, colour, duration) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Showing small game message '${text}' for ${duration}ms`);
    if(smallGameMessageText != "") {
        clearTimeout(smallGameMessageTimer);
    }

    smallGameMessageColour = colour;
    smallGameMessageText = text;

    smallGameMessageTimer = setTimeout(function() {
        smallGameMessageText = "";
        smallGameMessageColour = COLOUR_WHITE;
        smallGameMessageTimer = null;
    }, duration);
});

// ===========================================================================

function enteredJobRouteSphere() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Entered job route sphere`);
    triggerNetworkEvent("ag.arrivedAtBusStop");
    destroyElement(jobRouteStopSphere);
    destroyElement(jobRouteStopBlip);
    jobRouteStopSphere = null;
    jobRouteStopBlip = null;
}

// ===========================================================================

addNetworkHandler("ag.jobType", function(tempJobType) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Set local player job type to ${tempJobType}`);
    localPlayerJobType = tempJobType;
});

// ===========================================================================

addNetworkHandler("ag.working", function(tempWorking) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting working state to ${tempWorking}`);
    localPlayerWorking = tempWorking;
});

// ===========================================================================

addNetworkHandler("ag.spawned", function(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting spawned state to ${state}`);
    isSpawned = state;
    if(state) {
        if(gta.game == GTA_GAME_III || gta.game == GTA_GAME_VC) {
            gta.SET_PLAYER_NEVER_GETS_TIRED(gta.GET_PLAYER_ID(), 0);
            gta.setGameStat(STAT_PROGRESSMADE, 9999);
            gta.setGameStat(STAT_TOTALPROGRESSINGAME, 9999);
        }

        if(gta.game == GTA_GAME_SA) {
            gta.setGameStat(STAT_WEAPONTYPE_PISTOL_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_PISTOL_SILENCED_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_DESERT_EAGLE_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_SHOTGUN_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_SAWNOFF_SHOTGUN_SKILL, 1);
            gta.setGameStat(STAT_WEAPONTYPE_SPAS12_SHOTGUN_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_MICRO_UZI_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_MP5_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_AK47_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_M4_SKILL, 400);
            gta.setGameStat(STAT_DRIVING_SKILL, 9999);
            gta.setGameStat(STAT_FAT, 0);
            gta.setGameStat(STAT_ENERGY, 9999);
            gta.setGameStat(STAT_CYCLE_SKILL, 9999);
            gta.setGameStat(STAT_BIKE_SKILL, 9999);
            gta.setGameStat(STAT_GAMBLING, 9999);
            gta.setGameStat(STAT_PROGRESS_MADE, 9999);
            gta.setGameStat(STAT_RESPECT, 0);
            gta.setGameStat(STAT_RESPECT_TOTAL, 0);
            gta.setGameStat(STAT_SEX_APPEAL, 0);
            gta.setGameStat(STAT_STAMINA, 9999);
            gta.setGameStat(STAT_TOTAL_PROGRESS, 100);
            gta.setGameStat(STAT_UNDERWATER_STAMINA, 9999);
            gta.setGameStat(STAT_BODY_MUSCLE, 0);
        }
    }
});

// ===========================================================================

addNetworkHandler("ag.weaponDamageEvent", function(clientName, eventType) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Set ${clientName} damage event type to ${eventType}`);
    weaponDamageEvent[clientName] = eventType;
});

// ===========================================================================

addNetworkHandler("ag.weaponDamageEnabled", function(clientName, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] ${(state)?"Enabled":"Disabled"} damage from ${clientName}`);
    weaponDamageEnabled[clientName] = state;
});

// ===========================================================================

addNetworkHandler("ag.mouseCamera", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] ${(state)?"Enabled":"Disabled"} mouse camera`);
    mouseCameraEnabled = !mouseCameraEnabled;
    SetStandardControlsEnabled(!mouseCameraEnabled);
});

// ===========================================================================

addNetworkHandler("ag.mouseCursor", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] ${(state)?"Enabled":"Disabled"} mouse cursor`);
    gui.showCursor(state, !state);
});

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

addNetworkHandler("ag.set2DRendering", function(hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Updating render states (HUD: ${hudState}, Labels: ${labelState}, Bottom Text: ${smallGameMessageState}, Scoreboard: ${scoreboardState}, HotBar: ${hotBarState}, Item Action Delay: ${itemActionDelayState})`);
    renderHUD = hudState;
    setHUDEnabled(hudState);

    renderLabels = labelState;
    renderSmallGameMessage = smallGameMessageState;
    renderScoreboard = scoreboardState;
    renderHotBar = hotBarState;
    renderItemActionDelay = itemActionDelayState;
});

// ===========================================================================

function getLocalPlayerVehicleSeat() {
    for(let i = 0 ; i <= 4 ; i++) {
        if(localPlayer.vehicle.getOccupant(i) == localPlayer) {
            return i;
        }
    }
}

// ===========================================================================

addEventHandler("OnPedInflictDamage", function(event, damagedEntity, damagerEntity, weaponId, healthLoss, pedPiece) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] ${damagerEntity.name} (${damagerEntity.name}, ${damagerEntity.type} - ${typeof damagerEntity}) damaged ${damagedEntity} (${damagedEntity.name}, ${damagedEntity.type} - ${typeof damagedEntity}) at part ${pedPiece} with weapon ${weaponId}`);
    if(!isNull(damagedEntity) && !isNull(damagerEntity)) {
        if(damagedEntity.isType(ELEMENT_PLAYER)) {
            if(damagedEntity == localPlayer) {
                if(!weaponDamageEnabled[damagerEntity.name]) {
                    event.preventDefault();
                    triggerNetworkEvent("ag.weaponDamage", damagerEntity.name, weaponId, pedPiece, healthLoss);
                }
            }
        }
    }
});

// ===========================================================================

addEventHandler("OnLocalPlayerExitedVehicle", function(event, vehicle, seat) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Local player exited vehicle`);
    triggerNetworkEvent("ag.onPlayerExitVehicle");
    if(inVehicleSeat) {
        parkedVehiclePosition = false;
        parkedVehicleHeading = false;
    }
});

// ===========================================================================

addEventHandler("OnLocalPlayerEnteredVehicle", function(event, vehicle, seat) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Local player entered vehicle`);
    triggerNetworkEvent("ag.onPlayerEnterVehicle", getVehicleForNetworkEvent(vehicle), seat);

    if(inVehicleSeat == 0) {
        if(inVehicle.owner != -1) {
            inVehicle.engine = false;
            if(!inVehicle.engine) {
                parkedVehiclePosition = inVehicle.position;
                parkedVehicleHeading = inVehicle.heading;
            }
        }
    }
});

// ===========================================================================

addNetworkHandler("ag.showItemActionDelay", function(duration) {
    itemActionDelayDuration = duration;
    itemActionDelayStart = sdl.ticks;
    itemActionDelayEnabled = true;
    logToConsole(LOG_DEBUG, `Item action delay started. Duration: ${itemActionDelayDuration}, Start: ${itemActionDelayStart}, Rendering Enabled: ${renderItemActionDelay}`);
});

// ===========================================================================

function getWeaponSlot(weaponId) {
	return getGameData().weaponSlots[gta.game][weaponId];
}

// ===========================================================================

addNetworkHandler("ag.drunkEffect", function(amount, duration) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Drunk effect set to ${amount} for ${duration}ms`);
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
});

// ===========================================================================

addNetworkHandler("ag.clearPedState", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Clearing local ped state`);
    localPlayer.clearObjective();
});

// ===========================================================================

addNetworkHandler("ag.pedSpeech", function(pedName, speechId) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Making ${pedName}'s ped talk (${speechId})`);
    gta.SET_CHAR_SAY(int, int)
});

// ===========================================================================

addNetworkHandler("ag.hotbar", function(activeSlot, itemsArray) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Updating hotbar`);
});

// ===========================================================================

function getPedFromNetworkEvent(ped) {
    //let peds = getPeds();
    //for(let i in peds) {
    //    if(peds)
    //}

    return getElementFromId(ped);
}

// ===========================================================================

addNetworkHandler("ag.skinSelect", function() {
    usingSkinSelector = true;
    let frontCameraPosition = getPosInFrontOfPos(localPlayer.position, localPlayer.heading, 5);
    setCameraLookAt(frontCamPos, localPlayer.position);
    gui.toggleCursor(true, false);
    localPlayer.invincible = true;
    localPlayer.setProofs(true, true, true, true, true);
    localPlayer.collisionsEnabled = false;
});

// ===========================================================================

function isSnowEnabled() {
    return (typeof snowing != "undefined");
}

// ===========================================================================