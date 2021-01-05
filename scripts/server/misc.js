// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: misc.js
// DESC: Provides any uncategorized functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function initMiscScript() {
	console.log("[Asshat.Misc]: Initializing misc script ...");
	console.log("[Asshat.Misc]: Misc script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function getPositionCommand(command, params, client) {
	let position = client.player.position;

	messagePlayerNormal(client, `Your position is: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	console.log(`${getPlayerDisplayForConsole(client)}'s position is: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	return true;
}

// ---------------------------------------------------------------------------

function toggleMouseCursorCommand(command, params, client) {
	triggerNetworkEvent("ag.cursorToggle", client);
	return true;
}

// ---------------------------------------------------------------------------

function toggleMouseCameraCommand(command, params, client) {
	triggerNetworkEvent("ag.mouseCamera", client);
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterSpawnPositionCommand(command, params, client) {
	let position = client.player.position;
	getServerConfig().newCharacter.spawnPosition = position;
	getServerConfig().newCharacter.spawnHeading = client.player.heading;

    messagePlayerNormal(client, `The new character spawn position has been set to ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`)
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterMoneyCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let amount = toInteger(splitParams[0]) || 1000;

	getServerConfig().newCharacter.cash = skinId;

    messagePlayerNormal(client, `The new character money has been set to $${amount}`);
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterSkinCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let skinId = 0;
	if(areParamsEmpty(params)) {
		skinId = client.player.modelIndex;
	} else {
		skinId = getSkinFromParams(params);
	}

	getServerConfig().newCharacter.skin = skinId;

    messagePlayerNormal(client, `The new character skin has been set to ${getSkinNameFromId(skinId)} (ID ${skinId})`);
	return true;
}

// ---------------------------------------------------------------------------

function submitIdeaCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	submitIdea(client, params);

    messagePlayerNormal(client, `Your suggestion/idea has been sent to the developers!`);
	return true;
}

// ---------------------------------------------------------------------------

function submitBugReportCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	submitBugReport(client, params);

    messagePlayerNormal(client, `Your bug report has been sent to the developers!`);
	return true;
}

// ---------------------------------------------------------------------------

function enterExitPropertyCommand(command, params, client) {
	if(isPlayerInAnyHouse(client)) {
		let inHouse = getServerData().houses[getPlayerHouse(client)];
		if(getDistance(inHouse.exitPosition, getPlayerPosition(client)) <= getGlobalConfig().exitPropertyDistance) {
			if(inHouse.locked) {
				meActionToNearbyPlayers(client, "tries to open the house door but fails because it's locked");
				return false;
			}
			meActionToNearbyPlayers(client, "opens the door and exits the house");
			fadeCamera(client, false, 1.0);
			disableCityAmbienceForPlayer(client);
			setTimeout(function() {
				setPlayerPosition(client, inHouse.entrancePosition);
				setPlayerHeading(client, inHouse.entranceRotation);
				setPlayerVirtualWorld(client, inHouse.entranceDimension);
				setPlayerInterior(client, inHouse.entranceInterior);
				setTimeout(function() {
					fadeCamera(client, true, 1.0);
					setTimeout(function() {
						enableCityAmbienceForPlayer(client);
						clearPlayerOwnedPeds(client);
					}, 2000);
				}, 1000);
			}, 1100);
			removeEntityData(client, "ag.inHouse");
		}
		return true;
	}

	if(isPlayerInAnyBusiness(client)) {
		let inBusiness = getServerData().businesses[getPlayerBusiness(client)];
		if(getDistance(inBusiness.exitPosition, getPlayerPosition(client)) <= getGlobalConfig().exitPropertyDistance) {
			if(inBusiness.locked) {
				meActionToNearbyPlayers(client, "tries to open the business door but fails because it's locked");
				return false;
			}
			meActionToNearbyPlayers(client, "opens the door and exits the business");
			fadeCamera(client, false, 1.0);
			disableCityAmbienceForPlayer(client);
			setTimeout(function() {
				setPlayerPosition(client, inBusiness.entrancePosition);
				setPlayerHeading(client, inBusiness.entranceRotation);
				setPlayerVirtualWorld(client, inBusiness.entranceDimension);
				setPlayerInterior(client, inBusiness.entranceInterior);
				setTimeout(function() {
					fadeCamera(client, true, 1.0);
					setTimeout(function() {
						enableCityAmbienceForPlayer(client);
						clearPlayerOwnedPeds(client);
					}, 2000);
				}, 1000);
			}, 1100);
			removeEntityData(client, "ag.inBusiness");
			console.log(`[Asshat.Misc] ${getPlayerDisplayForConsole(client)} entered business ${inBusiness.name}[${inBusiness.index}/${inBusiness.databaseId}]`);
		}
		return true;
	}

	if(getServerData().businesses.length > 0) {
		let closestBusinessId = getClosestBusinessEntrance(getPlayerPosition(client));
		let closestBusiness = getBusinessData(closestBusinessId)
		if(getDistance(closestBusiness.entrancePosition, getPlayerPosition(client)) <= getGlobalConfig().enterPropertyDistance) {
			if(!doesBusinessHaveInterior(closestBusinessId)) {
				messagePlayerAlert(client, "This business does not have an interior.");
				messagePlayerTip(client, "You can use business commands at the door.");
				return false;
			}

			if(closestBusiness.locked) {
				meActionToNearbyPlayers(client, "tries to open the business door but fails because it's locked");
				return false;
			}

			meActionToNearbyPlayers(client, "opens the door and enters the business");

			fadeCamera(client, false, 1.0);
			disableCityAmbienceForPlayer(client);
			setTimeout(function() {
				setPlayerPosition(client, closestBusiness.exitPosition);
				setPlayerHeading(client, closestBusiness.exitRotation);
				setPlayerVirtualWorld(client, closestBusiness.exitDimension);
				setPlayerInterior(client, closestBusiness.exitInterior);
				setTimeout(function() {
					fadeCamera(client, true, 1.0);
				}, 1000);
			}, 1100);
			setEntityData(client, "ag.inBusiness", closestBusinessId);
			return true;
		}
	}

	if(getServerData().houses.length > 0) {
		let closestHouseId = getClosestHouseEntrance(getPlayerPosition(client));
		let closestHouse = getHouseData(closestHouseId);
		//let distance = getDistance(closestHouse.entrancePosition, getPlayerPosition(client));
		if(getDistance(closestHouse.entrancePosition, getPlayerPosition(client)) <= getGlobalConfig().enterPropertyDistance) {
			if(!doesHouseHaveInterior(closestHouseId)) {
				messagePlayerAlert(client, "This house does not have an interior.");
				messagePlayerTip(client, "You can use house commands at the door.");
				return false;
			}

			if(closestHouse.locked) {
				meActionToNearbyPlayers(client, "tries to open the house door but fails because it's locked");
				return false;
			}

			meActionToNearbyPlayers(client, "opens the door and enters the house");

			fadeCamera(client, false, 1.0);
			disableCityAmbienceForPlayer(client);
			setTimeout(function() {
				setPlayerPosition(client, closestHouse.exitPosition);
				setPlayerHeading(client, closestHouse.exitRotation);
				setPlayerVirtualWorld(client, closestHouse.exitDimension);
				setPlayerInterior(client, closestHouse.exitInterior);
				setTimeout(function() {
					fadeCamera(client, true, 1.0);
				}, 1000);
			}, 1100);
			setEntityData(client, "ag.inHouse", closestHouseId);
			return true;
		}
	}

	//messagePlayerError(client, "You aren't close enough to a door!");

	return true;
}

// ---------------------------------------------------------------------------

function sendRemovedWorldObjectsToPlayer(client) {
	for(let i in getGameConfig().removedWorldObjects[getServerGame()]) {
		console.log(`[Asshat.Misc] Sending removed world object ${i} (${getGameConfig().removedWorldObjects[getServerGame()][i].model}) to ${client.name}`);
		triggerNetworkEvent("ag.removeWorldObject", client, getGameConfig().removedWorldObjects[getServerGame()][i].model, getGameConfig().removedWorldObjects[getServerGame()][i].position, getGameConfig().removedWorldObjects[getServerGame()][i].range);
	}
	return true;
}

// ---------------------------------------------------------------------------

function loadGameFixesResource() {
	switch(getServerGame()) {
		case GAME_GTA_III:
			findResourceByName("asshat-gta3").start();
			break;

		default:
			break;
	}
	return true;
}

// ---------------------------------------------------------------------------