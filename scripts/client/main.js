// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

let allServerBlips = [];
let currentServerBlips = [];

let bigMessageFont = null;
let mainLogo = null;

let showLogo = true;

// ---------------------------------------------------------------------------

addNetworkHandler("ag.connectCamera", function(cameraPosition, cameraLookat) {
    //if(gta.game < GAME_GTA_IV) {
        gta.fadeCamera(true);
        gta.setCameraLookAt(cameraPosition, cameraLookat, true);
    //}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.restoreCamera", function() {
    //if(gta.game < GAME_GTA_IV) {
        gta.restoreCamera(true);
    //}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.logo", function(state) {
    showLogo = state;
});

// ---------------------------------------------------------------------------

addEventHandler("onPickupCollected", function(event, pickup, ped) {
    console.log(`PICKUP COLLECTED: Ped ${ped.id}, ${pickup.id}`);
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
        allServerBlips.push(blipData[i]);
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

addNetworkHandler("ag.interior", function(interior) {
    localPlayer.interior = interior;
    cameraInterior = interior;
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
    attemptToShowBlipsOnSpawn(player);
    if(gta.game < GAME_GTA_IV) {
        addEventHandler("onProcess", processEvent);
    }   
}

// ---------------------------------------------------------------------------

function processEvent(event, deltaTime) {
    getElementsByType(ELEMENT_MARKER).forEach(function(sphere) {
        if(localPlayer.position.distance(sphere.position) <= sphere.radius) {
            if(localPlayer.getData("ag.inSphere") == null) {
                localPlayer.setData("ag.inSphere", sphere);
                triggerNetworkEvent("ag.onPlayerEnterSphere", sphere);
            }
        } else {
            if(localPlayer.getData("ag.inSphere")) {
                localPlayer.removeData("ag.inSphere", sphere);
                triggerNetworkEvent("ag.onPlayerExitSphere", sphere);
            }           
        }
    });
}

// ---------------------------------------------------------------------------

addEventHandler("OnDrawnHUD", function (event) {
    if(bigMessageFont != null && mainLogo != null) {
        /*
        if(showLoginMessage) {
            let logoPos = new Vec2(gta.width/2-128, gta.height/2-256);
            let logoSize = new Vec2(256, 256);
            drawing.drawRectangle(mainLogo, logoPos, logoSize);

            let y = gta.height/2+10;

            bigMessageFont.render(`Welcome back to Asshat Gaming, ${localClient.name}`, [gta.width/2, y], gta.width, 0.0, 0.0, bigMessageFont.size, COLOUR_WHITE, false, false, false, true);
            y += 18;
            bigMessageFont.render(`Please /login to access your account`, [gta.width/2, y], gta.width, 0.0, 0.0, bigMessageFont.size, COLOUR_WHITE, false, false, false, true);
        }

        if(showRegisterMessage) {
            let logoPos = new Vec2(gta.width/2-128, gta.height/2-256);
            let logoSize = new Vec2(256, 256);
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
        let logoPos = new Vec2(gta.width-132, gta.height-132);
        let logoSize = new Vec2(128, 128);
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