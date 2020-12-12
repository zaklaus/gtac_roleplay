// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: nametags.js
// DESC: Provides nametags for VRS
// TYPE: Client (JavaScript)
// ===========================================================================

// ----------------------------------------------------------------------------

// Configuration
let nametagFont = null;
let afkStatusFont = null;
let pingFont = null;
let nametagDistance = 50.0;
let nametagWidth = 70;

// ----------------------------------------------------------------------------

addEventHandler("OnResourceReady", function(event, resource) {
	if (resource == thisResource) {
		nametagFont = lucasFont.createDefaultFont(12.0, "Roboto", "Light");
		afkStatusFont = lucasFont.createDefaultFont(18.0, "Roboto", "Light");
	}
});

// ----------------------------------------------------------------------------

function drawNametag(x, y, health, armour, text, ping, alpha, distance, colour, afk, skin) {
	if(nametagFont == null) {
		return false;
	}
	
	alpha *= 0.75;
	let width = nametagWidth;
	health = Math.max(0.0, Math.min(1.0, health));
    armour = Math.max(0.0, Math.min(1.0, armour));
    
    // Starts at bottom and works it's way up
    // -------------------------------------------
    // Health Bar
	
	if(gta.game == GAME_GTA_III) {
		// Mickey Hamfists is ridiculously tall. Raise the nametag for him a bit
		if(skin == 109) {
			y -= 20;
		} else {
			y -= 5;
		}
	}
	
	if(health > 0.0) {
		let hx = x-width/2;
		let hy = y-10/2;
		let colourB = toColour(0, 0, 0, Math.floor(255.0*alpha)); // Background colour (black)
		drawing.drawRectangle(null, [hx, hy], [width, 8], colourB, colourB, colourB, colourB);
		let colour = toColour(Math.floor(255.0*alpha), Math.floor(255.0-(health*255.0)), Math.floor(health*255.0), 0); // Health bar colour (varies, depending on health)
		drawing.drawRectangle(null, [hx+2, hy+2], [(width-4)*health, 10-6], colour, colour, colour, colour);
	}
    
    // Armour Bar
	if (armour > 0.0)
	{
		// Go up 10 pixels to draw the next part
		y -= 10;		
		let hx = x-width/2;
		let hy = y-10/2;
		let colourB = toColour(Math.floor(255.0*alpha), 0, 0, 0); // Background colour (black)
		drawing.drawRectangle(null, [hx, hy], [width, 8], colourB, colourB, colourB, colourB);
		let colour = toColour(Math.floor(255.0*alpha), 255, 255, 255); // Armour bar colour (white)
		drawing.drawRectangle(null, [hx+2, hy+2], [(width-4)*armour, 10-6], colour, colour, colour, colour);
	}
    
	y -= 20;
    
    // Nametag
	if(nametagFont != null) {
		let size = nametagFont.measure(text, game.width, 0.0, 0.0, nametagFont.size, false, false);
		let colourT = toColour(Math.floor(255.0*alpha), 255, 255, 255);
		nametagFont.render(text, [x-size[0]/2, y-size[1]/2], game.width, 0.0, 0.0, nametagFont.size, colour, false, false, false, true);
	}
	
    // Go up another 10 pixels for the next part
    y -= 20;	
	
    // AFK Status
	if(afkStatusFont != null) {
		if(afk) {
			let size = afkStatusFont.measure("PAUSED", game.width, 0.0, 0.0, afkStatusFont.size, false, false);
			afkStatusFont.render("PAUSED", [x-size[0]/2, y-size[1]/2], game.width, 0.0, 0.0, afkStatusFont.size, toColour(255, 0, 0, 255), false, false, false, true);
		}
	}
}

// ----------------------------------------------------------------------------

function updateNametags(element) {
	if(localPlayer != null) {
		let playerPos = localPlayer.position;
		let elementPos = element.position;
        let client = getClientFromPlayerElement(element);       
		
		elementPos[2] += 0.9;
		
		let screenPos = getScreenFromWorldPosition(elementPos);
		if (screenPos[2] >= 0.0) {
			let health = element.health/100.0;
			if(health > 1.0) {
				health = 1.0;
			}
			
			let armour = element.armour/100.0;
			if(armour > 1.0) {
				armour = 1.0; 
			}
			
			let distance = playerPos.distance(elementPos);
			if(distance <= nametagDistance) {
				if(element.type == ELEMENT_PLAYER) {
                    let name = element.name;
                    let colour = COLOUR_WHITE;
                    let afk = false;        
            
                    if(getEntityData(client, "ag.name") != null) {
                        name = getEntityData(client, "ag.name");
                    }
            
                    if(getEntityData(client, "ag.afk") != null) {
                        afk = true;
                    }

                    if(getEntityData(client, "ag.colour") != null) {
                        colour = getEntityData(client, "ag.colour");
					}

					drawNametag(screenPos[0], screenPos[1], health, armour, name, 0, 1.0-distance/nametagDistance, distance, colour, afk, element.skin);
				}
			}
		}
	}
}

// ----------------------------------------------------------------------------

function getClientFromPlayer(player) {
	getClients().forEach(function(client) {
		if(client.player == player) {
			return client;
		}
	});
}

// ----------------------------------------------------------------------------

addEventHandler("OnDrawnHUD", function(event) {
	//if(gta.game >= GAME_GTA_IV) {
	//	return false;
	//}
	
	//getElementsByType(ELEMENT_PLAYER).forEach(function(player) {
	//	updateNametags(player)
	//})
});

// ----------------------------------------------------------------------------