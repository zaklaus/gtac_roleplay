// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

let bigMessageFont = null;
let mainLogo = null;

let showLogo = true;

let busStopBlip = null;
let busStopSphere = null;

// ---------------------------------------------------------------------------

addNetworkHandler("ag.connectCamera", function(cameraPosition, cameraLookat) {
    //if(gta.game < GAME_GTA_IV) {
        gta.fadeCamera(true);
        gta.setCameraLookAt(cameraPosition, cameraLookat, true);
        //gta.setGenerateCarsAroundCamera(true);
    //}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.restoreCamera", function() {
    //if(gta.game < GAME_GTA_IV) {
        gta.restoreCamera(true);
        //gta.setGenerateCarsAroundCamera(false);
    //}
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
    console.log(`PICKUP COLLECTED: Ped ${ped.id}, ${pickup.id}`);
});

// ---------------------------------------------------------------------------

bindEventHandler("onResourceStart", thisResource, function(event, resource) {
    triggerNetworkEvent("ag.clientReady");

    addEvent("OnLocalPlayerEnterSphere", 1);
    addEvent("OnLocalPlayerExitSphere", 1);
    addEvent("OnLocalPlayerEnterVehicle", 2);
    addEvent("OnLocalPlayerExitVehicle", 2);   
    
    if(gta.game == GAME_GTA_SA) {
        gta.setDefaultInteriors(false);
        gta.setCiviliansEnabled(false);
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
addNetworkHandler("ag.veh.sync", syncVehicle)
;

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
        getElementsByType(ELEMENT_MARKER).forEach(function(sphere) {
            if(localPlayer.position.distance(sphere.position) <= sphere.radius) {
                if(localPlayer.getData("ag.inSphere") == null) {
                    localPlayer.setData("ag.inSphere", sphere);
                    triggerEvent("OnLocalPlayerEnterSphere", sphere, sphere);
                    triggerNetworkEvent("ag.onPlayerEnterSphere", sphere);
                }
            } else {
                if(localPlayer.getData("ag.inSphere") != null) {
                    localPlayer.removeData("ag.inSphere");
                    triggerEvent("OnLocalPlayerExitSphere", sphere, sphere);
                    triggerNetworkEvent("ag.onPlayerExitSphere", sphere);
                }           
            }
        });

        if(localPlayer.vehicle) {
            if(!inVehicle) {
                inVehicle = localPlayer.vehicle;
                triggerEvent("OnLocalPlayerEnterVehicle", inVehicle, inVehicle);
                console.log(`Entered vehicle: ${inVehicle.id}`);
                triggerNetworkEvent("ag.onPlayerEnterVehicle", localPlayer.vehicle);
            }
        } else {
            if(inVehicle) {
                triggerEvent("OnLocalPlayerExitVehicle", inVehicle, inVehicle);
                console.log(`Exited vehicle: ${inVehicle.id}`);
                triggerNetworkEvent("ag.onPlayerExitVehicle", localPlayer.vehicle);
                inVehicle = false;
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

    // Draw logo in corner of screen
    if(mainLogo != null && showLogo) {
        let logoPos = toVector2(gta.width-132, gta.height-132);
        let logoSize = toVector2(128, 128);
        drawing.drawRectangle(mainLogo, logoPos, logoSize);
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnResourceStart", function(event, resource) {
	if(resource == thisResource) {
		let fontStream = openFile("files/fonts/pricedown.ttf");
		if(fontStream != null) {
			bigMessageFont = lucasFont.createFont(fontStream, 28.0);
			fontStream.close();
		}
		
		let logoStream = openFile("files/images/main-logo.png");
		if(logoStream != null) {
			mainLogo = drawing.loadPNG(logoStream);
			logoStream.close();
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

addNetworkHandler("ag.fadeCamera", function(state, time) {
    gta.fadeCamera(state, time);
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedWasted", function(event, wastedPed, killerPed, weapon, pedPiece) {
    wastedPed.clearWeapons();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showBusStop", function(position, colour) {
    busStopSphere = gta.createSphere(position, 3);
    busStopBlip = gta.createBlip(position, 0, 2, colour);

    bindEventHandler("OnLocalPlayerEnterSphere", busStopSphere, function(event, sphere) {
        triggerNetworkEvent("ag.arrivedAtBusStop");
        unbindEventHandler("OnLocalPlayerEnterSphere", busStopSphere);
        destroyElement(busStopSphere);
        destroyElement(busStopBlip);
        busStopSphere = null;
        busStopBlip = null;
    });
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.snow", function(fallingSnow, groundSnow) {
    if(!isNull(snowing)) {
        snowing = fallingSnow;
        forceSnowing(groundSnow);
    }
});

// ---------------------------------------------------------------------------