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
let mainLogo = null;

let showLogo = true;

let jobRouteStopBlip = null;
let jobRouteStopSphere = null;

let smallGameMessageFont = null;
let smallGameMessageText = "";
let smallGameMessageColour = COLOUR_WHITE;
let smallGameMessageTimer = null;

let inSphere = false;

let localPlayerJobType = 0;
let localPlayerWorking = false;

let mouseCameraEnabled = false;

let isWalking = false;

// ---------------------------------------------------------------------------

addEvent("OnLocalPlayerEnterSphere", 1);
addEvent("OnLocalPlayerExitSphere", 1);
addEvent("OnLocalPlayerEnterVehicle", 2);
addEvent("OnLocalPlayerExitVehicle", 2);

// ---------------------------------------------------------------------------

bindEventHandler("onResourceReady", thisResource, function(event, resource) {
	if(resource == thisResource) {
		let fontStream = openFile("files/fonts/pricedown.ttf");
		if(fontStream != null) {
            bigMessageFont = lucasFont.createFont(fontStream, 28.0);
            smallGameMessageFont = lucasFont.createFont(fontStream, 20.0);
			fontStream.close();
		}

		let logoStream = openFile("files/images/main-logo.png");
		if(logoStream != null) {
			mainLogo = drawing.loadPNG(logoStream);
			logoStream.close();
		}
    }

    triggerNetworkEvent("ag.clientReady");
});

// ---------------------------------------------------------------------------

bindEventHandler("onResourceStart", thisResource, function(event, resource) {
    triggerNetworkEvent("ag.clientStarted");

    if(gta.game == GAME_GTA_SA) {
        gta.setDefaultInteriors(false);
        gta.setCiviliansEnabled(false);
    }

    // Run garbage collector every minute
    garbageCollectorInterval = setInterval(collectAllGarbage, 1000*60);

    addNetworkHandler("ag.passenger", enterVehicleAsPassenger);
});


// ---------------------------------------------------------------------------

addNetworkHandler("ag.connectCamera", function(cameraPosition, cameraLookat) {
    gta.fadeCamera(true);
    gta.setCameraLookAt(cameraPosition, cameraLookat, true);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.restoreCamera", function() {
    console.log(`[Asshat.Main] Camera restored`);
    gta.restoreCamera(true);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clearPeds", function() {
    console.log(`[Asshat.Main] Clearing all self-owned peds ...`);
    getElementsByType(ELEMENT_CIVILIAN).forEach(function(ped) {
        if(ped.isOwner) {
            destroyElement(ped);
        }
    });
    console.log(`[Asshat.Main] All self-owned peds cleared`);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.logo", function(state) {
    console.log(`[Asshat.Main] Server logo ${(state) ? "enabled" : "disabled"}`);
    showLogo = state;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.ambience", function(state) {
    console.log(`[Asshat.Main] Ambient civilians and traffic ${(state) ? "enabled" : "disabled"}`);
    gta.setTrafficEnabled(state);
    if(gta.game != GAME_GTA_SA) {
        gta.setCiviliansEnabled(state);
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.runCode", function(code, returnTo) {
	let returnVal = "Nothing";
	try {
		returnVal = eval("(" + code + ")");
	} catch(error) {
		triggerNetworkEvent("ag.runCodeFail", returnTo, code);
		return false;
    }
    triggerNetworkEvent("ag.runCodeSuccess", returnTo, returnVal, code);
});

// ----------------------------------------------------------------------------

function enterVehicleAsPassenger() {
	if(localPlayer.vehicle == null) {
		let tempVehicle = getClosestVehicle(localPlayer.position);
		if(tempVehicle != null) {
			localPlayer.enterVehicle(tempVehicle, false);
		}
	}
}

// ----------------------------------------------------------------------------

function getClosestVehicle(pos) {
    return getVehicles().reduce((i, j) => (i.position.distance(pos) < j.position.distance(pos)) ? i : j);
}

// ----------------------------------------------------------------------------

addNetworkHandler("ag.clearWeapons", function() {
    console.log(`[Asshat.Main] Clearing weapons`);
    localPlayer.clearWeapons();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.giveWeapon", function(weaponId, ammo, active) {
    console.log(`[Asshat.Main] Giving weapon ${weaponId} with ${ammo} ammo`);
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
                triggerEvent("OnLocalPlayerEnterVehicle", inVehicle, inVehicle);
                triggerNetworkEvent("ag.onPlayerEnterVehicle");
                inVehicle = localPlayer.vehicle;
            }
        } else {
            if(inVehicle) {
                triggerEvent("OnLocalPlayerExitVehicle", inVehicle, inVehicle);
                triggerNetworkEvent("ag.onPlayerExitVehicle");
                inVehicle = false;
            }
        }
    }
}

// ---------------------------------------------------------------------------

addEventHandler("OnRender", function(event) {
    // OnProcess was allowing vehicles to slide slowly. This shouldn't.
    if(inVehicle) {
        if(!localPlayer.vehicle.engine) {
            localPlayer.vehicle.velocity = toVector3(0.0, 0.0, 0.0);
            localPlayer.vehicle.turnVelocity = toVector3(0.0, 0.0, 0.0);
            if(vehicleParkedPosition) {
                localPlayer.vehicle.position = parkedVehiclePosition;
                localPlayer.vehicle.heading = parkedVehicleHeading;
            }
        } else {
            if(vehicleParkedPosition) {
                parkedVehiclePosition = false;
                parkedVehicleHeading = false;
            }
        }
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnDrawnHUD", function (event) {
    if(smallGameMessageFont != null) {
        if(smallGameMessageFont != "") {
            smallGameMessageFont.render(smallGameMessageText, [0, gta.height-50], gta.width, 0.5, 0.0, smallGameMessageFont.size, smallGameMessageColour, true, true, false, true);
        }
        return false;
    }

    // Draw logo in corner of screen
    if(mainLogo != null) {
        if(showLogo) {
            let logoPos = toVector2(gta.width-132, gta.height-132);
            let logoSize = toVector2(128, 128);
            drawing.drawRectangle(mainLogo, logoPos, logoSize);
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
    console.log(`Removing world object ${model} at X: ${position.x}, Y: ${position.x}, Z: ${position.x} with range of ${range}`);
    gta.removeWorldObject(model, position, range);
});

// ---------------------------------------------------------------------------

addEventHandler("OnLocalPlayerEnterSphere", function(event, sphere) {
    if(sphere == jobRouteStopSphere) {
        enteredJobRouteSphere();
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnLocalPlayerEnterVehicle", function(event, vehicle) {
    localPlayer.vehicle.engine = false;
    if(!localPlayer.vehicle.engine) {
        parkedVehiclePosition = vehicle.position;
        parkedVehicleHeading = vehicle.position;
    }
});

// ---------------------------------------------------------------------------

//addEventHandler("OnPickupCollected", function(event, pickup, ped) {
//    if(localPlayer != null) {
//        if(ped == localPlayer) {
//            if(pickup == jobRouteStopSphere) {
//                triggerNetworkEvent("ag.arrivedAtBusStop");
//                destroyElement(jobRouteStopSphere);
//                destroyElement(jobRouteStopBlip);
//                jobRouteStopSphere = null;
//                jobRouteStopBlip = null;
//            }
//        }
//    }
//});

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

addNetworkHandler("ag.mouseCamera", function(state) {
    mouseCameraEnabled = !mouseCameraEnabled;
    SetStandardControlsEnabled(!mouseCameraEnabled);
});

// ---------------------------------------------------------------------------

