// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: scoreboard.js
// DESC: Provides scoreboard feature and rendering
// TYPE: Client (JavaScript)
// ===========================================================================

let titleFont = null;
let listFont = null;

let pausedColour = COLOUR_RED;

// -------------------------------------------------------------------------

bindEventHandler("OnResourceReady", thisResource, function(event, resource) {
	titleFont = lucasFont.createDefaultFont(22.0, "Roboto", "Regular");
	listFont = lucasFont.createDefaultFont(12.0, "Roboto", "Light");
});

// -------------------------------------------------------------------------

addEventHandler("OnDrawnHUD", function (event) {
	if(!renderHUD) {
		return false;
	}

	if(!renderScoreboard) {
		return false;
	}

	if(localPlayer != null) {
		if(isKeyDown(SDLK_TAB)) {
			if(listFont != null && titleFont != null) {
				let scoreboardStart = (game.height/2)-(Math.floor(getClients().length/2)*20);
				let titleSize = titleFont.measure("PLAYERS", game.width, 0.0, 1.0, 10, false, false);
				titleFont.render("PLAYERS", [game.width/2, scoreboardStart-50], 0, 0.5, 0.0, titleFont.size, COLOUR_WHITE, false, false, false, true);

				titleSize = titleFont.measure("____________________________", game.width, 0.0, 1.0, 10, false, false);
				titleFont.render("____________________________", [game.width/2, scoreboardStart-35], 0, 0.5, 0.0, titleFont.size, COLOUR_WHITE, false, false, false, true);

				let clients = getClients();
				for(let i in clients) {
					if(!clients[i].console) {
						let name = clients[i].name;
						let colour = COLOUR_WHITE;
						let paused = false;
						let ping = "-1";

						if(typeof playerNames[clients[i].name] != "undefined") {
							name = playerNames[clients[i].name];
						}

						if(typeof playerPaused[clients[i].name] != "undefined") {
							paused = playerPaused[clients[i].name];
						}

						if(typeof playerColours[clients[i].name] != "undefined") {
							colour = playerColours[clients[i].name];
						}

						if(typeof playerPing[clients[i].name] != "undefined") {
							ping = toString(playerPing[clients[i].name]);
						}

						// Player ID
						let text = String(clients[i].index);
						let size = listFont.measure(text, 75, 0.0, 1.0, 10, false, false);
						listFont.render(text, [game.width/2-100, scoreboardStart + (i*20)], 0, 0.5, 0.0, listFont.size, COLOUR_WHITE, false, false, false, true);

						// Player Name
						text = name;
						size = listFont.measure(text, 100, 0.0, 1.0, 10, false, false);
						listFont.render(text, [game.width/2, scoreboardStart + (i*20)], 0, 0.5, 0.0, listFont.size, colour, false, false, false, true);

						// Ping
						text = ping;
						size = listFont.measure(ping, 75, 0.0, 1.0, 10, false, false);
						listFont.render(ping, [game.width/2+100, scoreboardStart + (i*20)], 0, 0.5, 0.0, listFont.size, COLOUR_WHITE, false, false, false, true);

						// PAUSED Status (depends on resource "afk")
						if(paused == true) {
							size = listFont.measure("PAUSED", 100, 0.0, 1.0, 10, false, false);
							listFont.render("PAUSED", [game.width/2+200, scoreboardStart + (i*20)], 0, 0.5, 0.0, listFont.size, pausedColour, false, false, false, true);
						}
					}
				}
			}
		}
	}
});