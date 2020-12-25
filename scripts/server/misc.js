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

	messageClientNormal(client, `Your position is: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterSpawnPositionCommand(command, params, client) {
	let position = client.player.position;
	getServerConfig().newCharacter.spawnPosition = position;
	getServerConfig().newCharacter.spawnHeading = client.player.heading;

    messageClientNormal(client, `The new character spawn position has been set to ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`)
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterMoneyCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let amount = toInteger(splitParams[0]) || 1000;

	getServerConfig().newCharacter.cash = skinId;

    messageClientNormal(client, `The new character money has been set to $${amount}`);
	return true;
}

// ---------------------------------------------------------------------------

function setNewCharacterSkinCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let skinId = 0;
	if(areParamsEmpty(params)) {
		skinId = client.player.modelIndex;
	} else {
		skinId = getSkinFromParams(params);
	}

	getServerConfig().newCharacter.skin = skinId;

    messageClientNormal(client, `The new character skin has been set to ${getSkinNameFromId(skinId)} (ID ${skinId})`);
	return true;
}

// ---------------------------------------------------------------------------

function submitIdeaCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	submitIdea(client, params);

    messageClientNormal(client, `Your suggestion/idea has been sent to the developers!`);
	return true;
}

// ---------------------------------------------------------------------------

function submitBugReportCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	submitBugReport(client, params);

    messageClientNormal(client, `Your bug report has been sent to the developers!`);
	return true;
}

// ---------------------------------------------------------------------------

function enterExitPropertyCommand(command, params, client) {
	if(isPlayerInAnyHouse(client)) {
		let inHouse = getServerData().houses[getPlayerHouse(client)];
		if(getDistance(inHouse.exitPosition, getPlayerPosition(client)) <= getServerConfig().exitPropertyDistance) {
			if(inHouse.locked) {
				meActionToNearbyPlayers(client, "tries to open the house door but fails because it's locked");
				return false;
			}
			meActionToNearbyPlayers(client, "opens the door and exits the house");
			triggerNetworkEvent("ag.exitProperty", client, inHouse.entrancePosition, inHouse.entranceRotation, inHouse.entranceInterior, inHouse.entranceDimension);
			client.player.dimension = inHouse.entranceDimension;
			removeEntityData(client, "ag.inHouse");
		}
		return true;
	}

	if(isPlayerInAnyBusiness(client)) {
		let inBusiness = getServerData().businesses[getPlayerBusiness(client)];
		if(getDistance(inBusiness.exitPosition, getPlayerPosition(client)) <= getServerConfig().exitPropertyDistance) {
			if(inBusiness.locked) {
				meActionToNearbyPlayers(client, "tries to open the business door but fails because it's locked");
				return false;
			}					
			meActionToNearbyPlayers(client, "opens the door and exits the business");
			triggerNetworkEvent("ag.exitProperty", client, inBusiness.entrancePosition, inBusiness.entranceRotation, inBusiness.entranceInterior, inBusiness.entranceDimension);
			client.player.dimension = inBusiness.entranceDimension;
			removeEntityData(client, "ag.inBusiness");
		}
		return true;	
	}

	if(getServerData().businesses.length > 0) {
		let closestBusinessId = getClosestBusinessEntrance(getPlayerPosition(client));
		let closestBusiness = getBusinessData(closestBusinessId)
		if(getDistance(closestBusiness.entrancePosition, getPlayerPosition(client)) <= getServerConfig().enterPropertyDistance) {
			if(!doesBusinessHaveInterior(closestBusinessId)) {
				messageClientAlert(client, "This business does not have an interior.");
				messageClientTip(client, "You can use business commands at the door.");
				return false;
			}

			if(closestBusiness.locked) {
				meActionToNearbyPlayers(client, "tries to open the business door but fails because it's locked");
				return false;
			}
			
			meActionToNearbyPlayers(client, "opens the door and enters the business");
			triggerNetworkEvent("ag.enterProperty", client, closestBusiness.exitPosition, closestBusiness.exitRotation, closestBusiness.exitInterior, closestBusinessId+getServerConfig().businessDimensionStart);
			client.player.dimension = closestBusiness.exitDimension;
			setEntityData(client, "ag.inBusiness", closestBusinessId);
			return true;
		}
	}

	if(getServerData().houses.length > 0) {
		let closestHouseId = getClosestHouseEntrance(getPlayerPosition(client));
		let closestHouse = getHouseData(closestHouseId);
		//let distance = getDistance(closestHouse.entrancePosition, getPlayerPosition(client));
		if(getDistance(closestHouse.entrancePosition, getPlayerPosition(client)) <= getServerConfig().enterPropertyDistance) {
			if(!doesHouseHaveInterior(closestHouseId)) {
				messageClientAlert(client, "This house does not have an interior.");
				messageClientTip(client, "You can use house commands at the door.");
				return false;
			}

			if(closestHouse.locked) {
				meActionToNearbyPlayers(client, "tries to open the house door but fails because it's locked");
				return false;
			}

			meActionToNearbyPlayers(client, "opens the door and enters the house");
			triggerNetworkEvent("ag.enterProperty", client, closestHouse.exitPosition, closestHouse.exitRotation, closestHouse.exitInterior, closestHouse+getServerConfig().houseDimensionStart);
			//client.player.dimension = closestHouse.exitDimension;
			setEntityData(client, "ag.inHouse", closestHouseId);
			return true;
		}
	}

	//messageClientError(client, "You aren't close enough to a door!");
	
	return true;
}

// ---------------------------------------------------------------------------

function sendRemovedWorldObjectsToPlayer(client) {
	for(let i in getServerConfig().removedWorldObjects[getServerGame()]) {
		console.log(`[Asshat.Misc] Sending removed world object ${i} (${getServerConfig().removedWorldObjects[getServerGame()][i].model}) to ${client.name}`);
		triggerNetworkEvent("ag.removeWorldObject", client, getServerConfig().removedWorldObjects[getServerGame()][i].model, getServerConfig().removedWorldObjects[getServerGame()][i].position, getServerConfig().removedWorldObjects[getServerGame()][i].range);
	}
}

// ---------------------------------------------------------------------------