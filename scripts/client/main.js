// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

setErrorMode(RESOURCEERRORMODE_STRICT);

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

addEventHandler("OnResourceStart", function(event, resource) {
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

    //if(gta.standardControls) {
    //    mouseCameraEnabled = true;
    //}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.connectCamera", function(cameraPosition, cameraLookat) {
    gta.fadeCamera(true);
    gta.setCameraLookAt(cameraPosition, cameraLookat, true);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.restoreCamera", function() {
    gta.restoreCamera(true);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.logo", function(state) {
    showLogo = state;
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

// ---------------------------------------------------------------------------

addEventHandler("onPickupCollected", function(event, pickup, ped) {
});

// ---------------------------------------------------------------------------

bindEventHandler("onResourceStart", thisResource, function(event, resource) {
    triggerNetworkEvent("ag.clientStarted");  
    
    if(gta.game == GAME_GTA_SA) {
        gta.setDefaultInteriors(false);
        gta.setCiviliansEnabled(false);
    }

    addNetworkHandler("ag.passenger", enterVehicleAsPassenger);
});

// ---------------------------------------------------------------------------

bindEventHandler("onResourceReady", thisResource, function(event, resource) {
    triggerNetworkEvent("ag.clientReady");
});


// ----------------------------------------------------------------------------

bindEventHandler("OnResourceStop", thisResource, function(event, resource) {

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
    localPlayer.clearWeapons();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.giveWeapon", function(weaponId, ammo, active) {
    localPlayer.giveWeapon(weaponId, ammo, active);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showRegisterMessage", function() {
    showRegisterMessage = true;
    showLoginMessage = false;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showLoginMessage", function() {
    showLoginMessage = true;
    showRegisterMessage = false;
});

// ---------------------------------------------------------------------------

function syncVehicle(vehicle) {
    if(getEntityData(vehicle, "ag.lights") != null) {
        let lights = getEntityData(vehicle, "ag.lights");
        if(lights != vehicle.lights) {
            vehicle.lights = lights;
        }
    }

    if(getEntityData(vehicle, "ag.engine") != null) {
        let engine = getEntityData(vehicle, "ag.engine");
        if(engine != vehicle.engine) {
            vehicle.engine = engine;
        }
    }

    if(getEntityData(vehicle, "ag.siren") != null) {
        let siren = getEntityData(vehicle, "ag.siren");
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

addNetworkHandler("ag.enterProperty", function(position, heading, interior, dimension) {
    gta.fadeCamera(false, 1.0);
    setTimeout(function() {
        localPlayer.position = position;
        localPlayer.heading = heading;

        localPlayer.interior = interior;
        gta.cameraInterior = interior;

        setTimeout(function() {
            //localPlayer.position = position;
            //localPlayer.heading = heading;
            gta.fadeCamera(true, 1.0);
        }, 1000);
    }, 1100);

    //localPlayer.dimension = dimension;
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.exitProperty", function(position, heading, interior, dimension) {
    gta.fadeCamera(false, 1.0);
    setTimeout(function() {
        localPlayer.interior = interior;
        gta.cameraInterior = interior;

        setTimeout(function() {
            localPlayer.position = position;
            localPlayer.heading = heading;
            gta.fadeCamera(true, 1.0);
        }, 1000);
    }, 1100);
    //localPlayer.dimension = dimension;
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
        let position = localPlayer.position;
        if(localPlayer.vehicle) {
            position = localPlayer.vehicle.position;
        }

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
                triggerEvent("OnLocalPlayerEnterVehicle", inVehicle, inVehicle);
                triggerNetworkEvent("ag.onPlayerEnterVehicle");
            }
        } else {
            if(inVehicle) {
                triggerEvent("OnLocalPlayerExitVehicle", inVehicle, inVehicle);
                triggerNetworkEvent("ag.onPlayerExitVehicle");
                inVehicle = false;
            }           
        }
        
        // Using vehicle.engine doesn't disable the vehicle. Need to find another way
        if(localPlayer.vehicle != null) {
            if(!localPlayer.vehicle.engine) {
                localPlayer.vehicle.velocity = toVector3(0.0, 0.0, 0.0);
                localPlayer.vehicle.turnVelocity = toVector3(0.0, 0.0, 0.0);   
            }
        }
    }
}

// ---------------------------------------------------------------------------

addEventHandler("OnDrawnHUD", function (event) {
    if(bigMessageFont != null && mainLogo != null) {
        /*
        if(showLoginMessage) {
            let logoPos = toVector2(gta.width/2-128, gta.height/2-256);
            let logoSize = toVector2(256, 256);
            drawing.drawRectangle(mainLogo, logoPos, logoSize);

            let y = gta.height/2+10;

            bigMessageFont.render(`Welcome back to Asshat Gaming, ${localClient.name}`, [gta.width/2, y], gta.width, 0.0, 0.0, bigMessageFont.size, COLOUR_WHITE, false, false, false, true);
            y += 18;
            bigMessageFont.render(`Please /login to access your account`, [gta.width/2, y], gta.width, 0.0, 0.0, bigMessageFont.size, COLOUR_WHITE, false, false, false, true);
        }

        if(showRegisterMessage) {
            let logoPos = toVector2(gta.width/2-128, gta.height/2-256);
            let logoSize = toVector2(256, 256);
            drawing.drawRectangle(mainLogo, logoPos, logoSize);

            let y = gta.height/2+10;

            bigMessageFont.render(`Welcome to Asshat Gaming, ${localClient.name}`, [gta.width/2, y], gta.width, 0.0, 0.0, bigMessageFont.size, COLOUR_WHITE, false, false, false, true);
            y += 18;
            bigMessageFont.render(`Please /register to create an account`, [gta.width/2, y], gta.width, 0.0, 0.0, bigMessageFont.size, COLOUR_WHITE, false, false, false, true);
        }
        */
    }

    if(smallGameMessageFont != null) {
        if(smallGameMessageFont != "") {
            smallGameMessageFont.render(smallGameMessageText, [0, gta.height-50], gta.width, 0.5, 0.0, smallGameMessageFont.size, smallGameMessageColour, true, true, false, true);
        }
        return false;
    }

    // Draw logo in corner of screen
    if(mainLogo != null && showLogo) {
        let logoPos = toVector2(gta.width-132, gta.height-132);
        let logoSize = toVector2(128, 128);
        drawing.drawRectangle(mainLogo, logoPos, logoSize);
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

