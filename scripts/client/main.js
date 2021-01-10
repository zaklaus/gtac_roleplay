// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

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

let renderHUD = false;
let renderLabels = false;
let renderLogo = false;
let renderSmallGameMessage = false;
let renderScoreboard = false;
let renderHotBar = false;

let logLevel = LOG_DEBUG;

let weaponDamageEnabled = {};
let weaponDamageEvent = AG_WEAPON_DAMAGE_EVENT_NONE;

// ---------------------------------------------------------------------------

addEvent("OnLocalPlayerEnterSphere", 1);
addEvent("OnLocalPlayerExitSphere", 1);
addEvent("OnLocalPlayerEnterVehicle", 1);
addEvent("OnLocalPlayerExitVehicle", 1);

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

bindEventHandler("onResourceStart", thisResource, function(event, resource) {
    if(gta.game == GAME_GTA_SA) {
        gta.setDefaultInteriors(false);
        gta.setCiviliansEnabled(false);
    }
    garbageCollectorInterval = setInterval(collectAllGarbage, 1000*60);
    addNetworkHandler("ag.passenger", enterVehicleAsPassenger);

    triggerNetworkEvent("ag.clientStarted");
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.connectCamera", function(cameraPosition, cameraLookat) {
    gta.fadeCamera(true);
    gta.setCameraLookAt(cameraPosition, cameraLookat, true);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.restoreCamera", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Camera restored`);
    gta.restoreCamera(true);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clearPeds", function() {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Clearing all self-owned peds ...`);
    clearSelfOwnedPeds();
    logToConsole(LOG_DEBUG, `[Asshat.Main] All self-owned peds cleared`);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.logo", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Server logo ${(state) ? "enabled" : "disabled"}`);
    renderLogo = state;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.ambience", function(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Ambient civilians and traffic ${(state) ? "enabled" : "disabled"}`);
    gta.setTrafficEnabled(state);
    gta.setGenerateCarsAroundCamera(state);
    if(gta.game != GAME_GTA_SA) {
        gta.setCiviliansEnabled(state);
    }
    clearSelfOwnedPeds();
});

// ---------------------------------------------------------------------------

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
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.giveWeapon", function(weaponId, ammo, active) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Giving weapon ${weaponId} with ${ammo} ammo`);
    localPlayer.giveWeapon(weaponId, ammo, active);
});

// ---------------------------------------------------------------------------

addEventHandler("onElementStreamIn", function(event, element) {
    switch(element.type) {
        case ELEMENT_VEHICLE:
            syncVehicleProperties(element);
            break;

        case ELEMENT_CIVILIAN:
            syncCivilianProperties(element);
            break;

        case ELEMENT_PLAYER:
            syncPlayerProperties(element);
            break;

        default:
            break;
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.blips", function(blipData) {
    for(let i in blipData) {
        allServerBlips.push(blipData[i]);
    }
});

// ---------------------------------------------------------------------------

function showIslandBlips() {
    for(let i in allServerBlips) {
        let position = toVector3(allServerBlips[i][1], allServerBlips[i][2], allServerBlips[i][3]);
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
     // Nasty workaround since localPlayer is null as the player spawns (reported as client bug #194)
    setTimeout(initLocalPlayer, 500, ped);
});

// ---------------------------------------------------------------------------

function attemptToShowBlipsOnSpawn(ped) {
    if(ped == localPlayer) {
        showIslandBlips();
    }
}

// ---------------------------------------------------------------------------

addNetworkHandler("ag.skin", function(skin) {
    localPlayer.skin = skin;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.pedSkin", function(ped, skin) {
    ped.skin = skin;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.position", function(position) {
    localPlayer.position = position;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.heading", function(heading) {
    localPlayer.heading = heading;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.interior", function(interior) {
    localPlayer.interior = interior;
    gta.cameraInterior = interior;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.dimension", function(dimension) {
    localPlayer.dimension = dimension;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.removeFromVehicle", function() {
    localPlayer.removeFromVehicle();
});

// ---------------------------------------------------------------------------

function initLocalPlayer(player) {
    addEventHandler("onProcess", processEvent);
}

// ---------------------------------------------------------------------------

function processEvent(event, deltaTime) {
    if(localPlayer != null) {
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
                triggerNetworkEvent("ag.onPlayerEnterVehicle");
                inVehicle = localPlayer.vehicle;
                inVehicleSeat = getLocalPlayerVehicleSeat();

                if(inVehicleSeat == 0) {
                    inVehicle.engine = false;
                    if(!inVehicle.engine) {
                        parkedVehiclePosition = inVehicle.position;
                        parkedVehicleHeading = inVehicle.heading;
                    }
                }
            }
        } else {
            if(inVehicle) {
                triggerNetworkEvent("ag.onPlayerExitVehicle");
                if(inVehicleSeat) {
                    parkedVehiclePosition = false;
                    parkedVehicleHeading = false;
                }
                inVehicle = false;
                inVehicleSeat = false;
            }
        }
    }
}

// ---------------------------------------------------------------------------

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
            return false;
        }
    }

    if(renderLogo) {
        if(logoImage != null) {
            drawing.drawRectangle(logoImage, logoPos, logoSize);
        }
    }

    if(renderScoreboard) {
        if(localPlayer != nul && isKeyDown()) {
            renderScoreboard();
        }
    }
});

// ---------------------------------------------------------------------------

function openAllGarages() {
    switch(gta.game) {
        case GAME_GTA_III:
            for(let i=0;i<=26;i++) {
                openGarage(i);
            }
            break;

        case GAME_GTA_VC:
            for(let i=0;i<=32;i++) {
                openGarage(i);
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

// ---------------------------------------------------------------------------

function closeAllGarages() {
    switch(gta.game) {
        case GAME_GTA_III:
            for(let i=0;i<=26;i++) {
                closeGarage(i);
            }
            break;

        case GAME_GTA_VC:
            for(let i=0;i<=32;i++) {
                closeGarage(i);
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

// ---------------------------------------------------------------------------

addNetworkHandler("ag.freeze", function(state) {
    gui.showCursor(state, !state);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.control", function(controlState, cursorState = false) {
    gui.showCursor(cursorState, controlState);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.cursortoggle", function() {
    gui.showCursor(!gui.cursorEnabled, false);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.fadeCamera", function(state, time) {
    gta.fadeCamera(state, time);
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedWasted", function(event, wastedPed, killerPed, weapon, pedPiece) {
    wastedPed.clearWeapons();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showBusStop", function(position, colour) {
    if(gta.game == GAME_GTA_SA) {
        jobRouteStopSphere = gta.createPickup(1318, position, 1);
    } else {
        jobRouteStopSphere = gta.createSphere(position, 3);
        jobRouteStopSphere.colour = colour;
    }

    jobRouteStopBlip = gta.createBlip(position, 0, 2, colour);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.snow", function(fallingSnow, groundSnow) {
    if(!isNull(snowing)) {
        snowing = fallingSnow;
        forceSnowing(groundSnow);
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.money", function(amount) {
    localPlayer.money = amount;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.removeWorldObject", function(model, position, range) {
    logToConsole(LOG_DEBUG, `Removing world object ${model} at X: ${position.x}, Y: ${position.x}, Z: ${position.x} with range of ${range}`);
    gta.removeWorldObject(model, position, range);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.excludeGroundSnow", function(model) {
    logToConsole(LOG_DEBUG, `Disabling ground snow for object model ${model}`);
    groundSnow.excludeModel(model);
});

// ---------------------------------------------------------------------------

addEventHandler("OnLocalPlayerEnterSphere", function(event, sphere) {
    if(sphere == jobRouteStopSphere) {
        enteredJobRouteSphere();
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.smallGameMessage", function(text, colour, duration) {
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

// ---------------------------------------------------------------------------

function enteredJobRouteSphere() {
    triggerNetworkEvent("ag.arrivedAtBusStop");
    destroyElement(jobRouteStopSphere);
    destroyElement(jobRouteStopBlip);
    jobRouteStopSphere = null;
    jobRouteStopBlip = null;
}

// ---------------------------------------------------------------------------

addNetworkHandler("ag.jobType", function(tempJobType) {
    localPlayerJobType = tempJobType;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.working", function(tempWorking) {
    localPlayerWorking = tempWorking;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.spawned", function(client, state) {
    isSpawned = state;
    syncPlayerProperties(localPlayer);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.weaponDamageEvent", function(clientName, eventType) {
    weaponDamageEvent[clientName] = eventType;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.weaponDamageEnabled", function(clientName, state) {
    weaponDamageEnabled[clientName] = state;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.mouseCamera", function(state) {
    mouseCameraEnabled = !mouseCameraEnabled;
    SetStandardControlsEnabled(!mouseCameraEnabled);
});

// ---------------------------------------------------------------------------

function clearSelfOwnedPeds() {
    getElementsByType(ELEMENT_CIVILIAN).forEach(function(ped) {
        if(ped.isOwner) {
            destroyElement(ped);
        }
    });
}

// ---------------------------------------------------------------------------

addNetworkHandler("ag.set2DRendering", function(hudState, labelState, smallGameMessageState, scoreboardState, hotBarState) {
    renderHUD = hudState;
    setHUDEnabled(hudState);

    renderLabels = labelState;
    renderSmallGameMessage = smallGameMessageState;
    renderScoreboard = scoreboardState;
    renderHotBar = hotBarState;
});

// ---------------------------------------------------------------------------

function getLocalPlayerVehicleSeat() {
    for(let i = 0 ; i <= 4 ; i++) {
        if(localPlayer.vehicle.getOccupant(i) == localPlayer) {
            return i;
        }
    }
}

// ---------------------------------------------------------------------------

addEventHandler("OnPedInflictDamage", function(event, damagedPed, damagerEntity, weaponId, healthLoss, pedPiece) {
    //if(damagedPed.isType(ELEMENT_PLAYER)) {
    //    if(localPlayer != null) {
    //
    //    }
    //    if(damagerEntity.isType(ELEMENT_PLAYER))
});