// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: house.js
// DESC: Provides house commands, functions, and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initHouseScript() {
	console.log("[Asshat.House]: Initializing house script ...");
	getServerData().houses = loadHousesFromDatabase();
	createAllHousePickups();
	createAllHouseBlips();
	console.log("[Asshat.House]: House script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadHousesFromDatabase() {
	console.log("[Asshat.House]: Loading houses from database ...");
	let tempHouses = [];
	let dbConnection = connectToDatabase();
	let dbAssoc;
	
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM house_main WHERE house_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempHouseData = new serverClasses.houseData(dbAssoc);
					tempHouses.push(tempHouseData);
					console.log(`[Asshat.House]: House '${tempHouseData.description}' (ID ${tempHouseData.databaseId}) loaded!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	console.log(`[Asshat.House]: ${tempHouses.length} houses loaded from database successfully!`);
	return tempHouses;
}

// ---------------------------------------------------------------------------

function createHouseCommand(command, params, client) {
	let tempHouseData = createHouse(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].house, getGameConfig().blipSprites[getServerGame()].house, getPlayerInterior(client), getPlayerVirtualWorld(client));
	getServerData().houses.push(tempHouseData);
	
	sendHouseLabelToPlayers(getServerData().houses.length-1);

	messageClientSuccess(client, `House [#009900]${tempHouseData.description} [#FFFFFF]created!`);
}

// ---------------------------------------------------------------------------

function lockUnlockHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));
	
	if(!getHouseData(houseId)) {
		messageClientError("House not found!");
		return false;
	}	

	getHouseData(houseId).locked = !getHouseData(houseId).locked;
	messageClientSuccess(client, `House '${getHouseData(houseId).description}' ${getLockedUnlockedTextFromBool((getHouseData(houseId).locked))}!`);
}

// ---------------------------------------------------------------------------

function setHouseDescriptionCommand(command, params, client) {
	let newHouseDescription = toString(params);

	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messageClientError("House not found!");
		return false;
	}	

	let oldDescription = getHouseData(houseId).description;
	getHouseData(houseId).description = newHouseDescription;
	messageClientSuccess(client, `House '${oldDescription}' description set to '${newHouseDescription}'!`);
}

// ---------------------------------------------------------------------------

function setHouseOwnerCommand(command, params, client) {
	let newHouseOwner = getPlayerFromParams(params);
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!newHouseOwner) {
		messageClientError("Player not found!");
		return false;
	}

	if(!getHouseData(houseId)) {
		messageClientError("House not found!");
		return false;
	}

	getHouseData(houseId).ownerType = AG_HOUSEOWNER_PLAYER;
	getHouseData(houseId).ownerId = getServerData().clients[newHouseOwner.index].accountData.databaseId;
	messageClientSuccess(client, `House '${getHouseData(houseId).name}' owner set to '${newHouseOwner.name}'!`);
}

// ---------------------------------------------------------------------------

function setHouseClanCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	let clan = getClanFromParams(params);

	if(!clan) {
		messageClientError(client, "That clan is invalid or doesn't exist!");
		return false;
	}

	if(!getHouseData(houseId)) {
		messageClientError("Business not found!");
		return false;
	}

	getHouseData(houseId).ownerType = AG_HOUSEOWNER_CLAN;
	getHouseData(houseId).ownerId = getClanData(clanId).databaseId;
	messageClientSuccess(client, `House ${getHouseData(houseId).name} owner set to the [#AAAAAA]${getClanData(clanId).name} [#FFFFFF]clan!`);
}

// ---------------------------------------------------------------------------

function setHousePickupCommand(command, params, client) {
	let typeParam = params || "house";
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messageClientError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().pickupModels[getServerGame()][typeParam])) {
			messageClientError(client, "Invalid house type! Use a house type name or a pickup model ID");
			messageClientInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().pickupModels[getServerGame()]).join(", ")}`)
			return false;
		}

		getHouseData(houseId).entrancePickupModel = getGameConfig().pickupModels[getServerGame()][typeParam];
	} else {
		getHouseData(houseId).entrancePickupModel = toInteger(typeParam);
	}

	if(getHouseData(houseId).entrancePickupModel != -1) {
		if(getHouseData(houseId).entrancePickup != null) {
			destroyElement(getHouseData(houseId).entrancePickup);
		}

		createHouseEntrancePickup(houseId);
	}	

	messageClientSuccess(client, `House '${getHouseData(houseId).description}' pickup display set to '${toLowerCase(typeParam)}'!`);
}

// ---------------------------------------------------------------------------

function setHouseBlipCommand(command, params, client) {
	let typeParam = params || "house";
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messageClientError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().blipSprites[getServerGame()][typeParam])) {
			messageClientError(client, "Invalid house type! Use a house type name or a blip image ID");
			messageClientInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().blipSprites[getServerGame()]).join(", ")}`)
			return false;
		}

		getHouseData(houseId).entranceBlipModel = getGameConfig().blipSprites[getServerGame()][typeParam];
	} else {
		getHouseData(houseId).entranceBlipModel = toInteger(typeParam);
	}

	if(getHouseData(houseId).entranceBlipModel != -1) {
		if(getHouseData(houseId).entranceBlip != null) {
			destroyElement(getHouseData(houseId).entranceBlip);
		}

		createHouseEntranceBlip(houseId);
	}	

	messageClientSuccess(client, `House '${getHouseData(houseId).description}' blip display set to '${toLowerCase(typeParam)}'!`);
}

// ---------------------------------------------------------------------------

function moveHouseEntranceCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));
	
	getHouseData(houseId).entrancePosition = getPlayerPosition(client);
	getHouseData(houseId).entranceDimension = getPlayerVirtualWorld(client);
	getHouseData(houseId).entranceInterior = getPlayerInterior(client);

	deleteHouseEntranceBlip(houseId);
	deleteHouseEntrancePickup(houseId);
	
	createHouseEntranceBlip(houseId);
	createHouseEntrancePickup(houseId);	

	messageClientSuccess(client, `House '${getHouseData(houseId).description}' entrance has been moved to your position`);
}

// ---------------------------------------------------------------------------

function moveHouseExitCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));
	
	getHouseData(houseId).entrancePosition = getPlayerPosition(client);
	getHouseData(houseId).entranceDimension = getPlayerVirtualWorld(client);
	getHouseData(houseId).entranceInterior = getPlayerInterior(client);
	
	deleteHouseExitBlip(houseId);
	deleteHouseExitPickup(houseId);
	
	createHouseExitBlip(houseId);
	createHouseExitPickup(houseId);

	messageClientSuccess(client, `House '${getHouseData(houseId).description}' exit has been moved to your position`);
}

// ---------------------------------------------------------------------------

function deleteHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messageClientError("Business not found!");
		return false;
	}
	tempHouseData = getHouseData(houseId);

	messageClientSuccess(client, `House '${tempHouseData.description}' deleted!`);
	deleteHouse(houseId, getPlayerData(client).accountData.databaseId);
}

// ---------------------------------------------------------------------------

function deleteHouse(houseId, whoDeleted = 0) {
	let tempHouseData = getServerData().houses[houseId];

	let dbConnection = connectToDatabase();
	let dbQuery = null;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `UPDATE house_main SET house_deleted = 1 AND house_who_deleted = ${whoDeleted} AND house_when_deleted = UNIX_TIMESTAMP() WHERE house_id = ${tempHouseData.databaseId} LIMIT 1`);
		if(dbQuery) {
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	deleteHouseEntrancePickup(houseId);
	deleteHouseExitPickup(houseId);

	deleteHouseEntranceBlip(houseId);
	deleteHouseExitBlip(houseId);	

	removePlayersFromHouse(houseId);
}

// ---------------------------------------------------------------------------

function removePlayerFromHouses(client) {
	if(isPlayerInAnyHouse(client)) {
		exitHouse(client);
	}
}

// ---------------------------------------------------------------------------

function createHouse(description, entrancePosition, exitPosition, entrancePickupModel = -1, entranceBlipModel = -1, entranceInteriorId = 0, entranceVirtualWorld = 0, exitInteriorId = -1, exitVirtualWorld = -1, exitPickupModel = -1, exitBlipModel = -1) {
	let tempHouseData = new serverClasses.houseData(false);
	tempHouseData.description = description;

	tempHouseData.entrancePosition = entrancePosition;
	tempHouseData.entranceRotation = 0.0;
	tempHouseData.entrancePickupModel = entrancePickupModel;
	tempHouseData.entranceBlipModel = entranceBlipModel;
	tempHouseData.entranceInterior = entranceInteriorId;
	tempHouseData.entranceDimension = entranceVirtualWorld;

	tempHouseData.exitPosition = exitPosition;
	tempHouseData.exitRotation = 0.0;
	tempHouseData.exitPickupModel = exitPickupModel;
	tempHouseData.exitBlipModel = exitBlipModel;
	tempHouseData.exitInterior = exitInteriorId;
	tempHouseData.exitDimension = exitVirtualWorld;	

	if(entrancePickupModel != -1) {
		tempHouseData.entrancePickup = gta.createPickup(entrancePickupModel, entrancePosition, getGameConfig().pickupTypes[getServerGame()].house);
	}

	if(entranceBlipModel != -1) {
		tempHouseData.entranceBlip = gta.createBlip(entrancePosition, entranceBlipModel, 1, getColourByName("lime")); 
	}		

	return tempHouseData;
}

// ---------------------------------------------------------------------------

function getHouseDataFromDatabaseId(databaseId) {
	let matchingHouses = getServerData().houses.filter(b => b.databaseId == databaseId)
	if(matchingHouses.length == 1) {
		return matchingHouses[0];
	}
	return false;
}

// ---------------------------------------------------------------------------

function getClosestHouseEntrance(position) {
	let houses = getServerData().houses;
	let closest = 0;
	for(let i in houses) {
		if(getDistance(houses[i].entrancePosition, position) <= getDistance(houses[closest].entrancePosition, position)) {
			closest = i;
		}
	}
	return closest;
}

// ---------------------------------------------------------------------------

function getPlayerHouse(client) {
	if(doesEntityDataExist(client, "ag.inHouse")) {
		return getEntityData(client, "ag.inHouse");
	}

	return false;
}

// ---------------------------------------------------------------------------

function saveAllHousesToDatabase() {
	for(let i in getServerData().houses) {
		saveHouseToDatabase(i);
	}
}

// ---------------------------------------------------------------------------

function saveHouseToDatabase(houseId) {
	let tempHouseData = getServerData().houses[houseId];

	console.log(`[Asshat.House]: Saving house '${tempHouseData.databaseId}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeHouseDescription = escapeDatabaseString(dbConnection, tempHouseData.description);
		if(tempHouseData.databaseId == 0) {
			let dbQueryString = `INSERT INTO house_main (house_server, house_description, house_owner_type, house_owner_id, house_locked, house_entrance_pos_x, house_entrance_pos_y, house_entrance_pos_z, house_entrance_rot_z, house_entrance_int, house_entrance_vw, house_exit_pos_x, house_exit_pos_y, house_exit_pos_z, house_exit_rot_z, house_exit_int, house_exit_vw) VALUES (${getServerId()}, '${safeHouseDescription}', ${tempHouseData.ownerType}, ${tempHouseData.ownerId}, ${boolToInt(tempHouseData.locked)}, ${tempHouseData.entrancePosition.x}, ${tempHouseData.entrancePosition.y}, ${tempHouseData.entrancePosition.z}, ${tempHouseData.entranceRotation}, ${tempHouseData.entranceInterior}, ${tempHouseData.entranceDimension}, ${tempHouseData.exitPosition.x}, ${tempHouseData.exitPosition.y}, ${tempHouseData.exitPosition.z}, ${tempHouseData.exitRotation}, ${tempHouseData.exitInterior}, ${tempHouseData.exitDimension})`;
			queryDatabase(dbConnection, dbQueryString);
			getServerData().houses[houseId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE house_main SET house_description='${safeHouseDescription}', house_owner_type=${tempHouseData.ownerType}, house_owner_id=${tempHouseData.ownerId}, house_locked=${boolToInt(tempHouseData.locked)}, house_entrance_pos_x=${tempHouseData.entrancePosition.x}, house_entrance_pos_y=${tempHouseData.entrancePosition.y}, house_entrance_pos_z=${tempHouseData.entrancePosition.z}, house_entrance_rot_z=${tempHouseData.entranceRotation}, house_entrance_int=${tempHouseData.entranceInterior}, house_entrance_vw=${tempHouseData.entranceDimension}, house_exit_pos_x=${tempHouseData.exitPosition.x}, house_exit_pos_y=${tempHouseData.exitPosition.y}, house_exit_pos_z=${tempHouseData.exitPosition.z}, house_exit_rot_z=${tempHouseData.exitRotation}, house_exit_int=${tempHouseData.exitInterior}, house_exit_vw=${tempHouseData.exitDimension} WHERE house_id=${tempHouseData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Business]: Saved house '${tempHouseData.description}' to database!`);

	return false;	
}

// ---------------------------------------------------------------------------

function createAllHousePickups() {
	for(let i in getServerData().houses) {
		createHouseEntrancePickup(i);
		createHouseExitPickup(i);
	}
}

// ---------------------------------------------------------------------------

function createAllHouseBlips() {
	for(let i in getServerData().houses) {
		createHouseEntranceBlip(i);
		createHouseExitBlip(i);
	}
}

// ---------------------------------------------------------------------------

function createHouseEntrancePickup(houseId) {
	if(getServerData().houses[houseId].entrancePickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].house;

		if(getServerData().houses[houseId].entrancePickupModel != 0) {
			pickupModelId = getServerData().houses[houseId].entrancePickupModel;
		}
		
		getServerData().houses[houseId].pickup = gta.createPickup(pickupModelId, getServerData().houses[houseId].entrancePosition);
		getServerData().houses[houseId].pickup.dimension = getServerData().houses[houseId].entranceDimension;
		getServerData().houses[houseId].pickup.interior = getServerData().houses[houseId].entranceInterior;			
		getServerData().houses[houseId].pickup.setData("ag.ownerType", AG_PICKUP_HOUSE, false);
		getServerData().houses[houseId].pickup.setData("ag.ownerId", houseId, false);
	}
}

// ---------------------------------------------------------------------------

function createHouseExitPickup(houseId) {
	return false;
}

// ---------------------------------------------------------------------------

function createHouseEntranceBlip(houseId) {
	return false;
}

// ---------------------------------------------------------------------------

function createHouseExitBlip(houseId) {
	return false;
}

// ---------------------------------------------------------------------------

function getHouseOwnerTypeText(ownerType) {
	switch(ownerType) {
		case AG_HOUSEOWNER_CLAN:
			return "clan";

		case AG_HOUSEOWNER_PLAYER:
			return "player";		

		case AG_BIZOWNER_NONE:
			return "not owned";

		case AG_BIZOWNER_PUBLIC:
			return "not owned";	
			
		case AG_BIZOWNER_JOB:
			return "job";					
		
		default:
			return "unknown";
	}
}

// ---------------------------------------------------------------------------

function getHouseInfoCommand(command, params, client) {
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		houseId = toInteger(params);
	}

	if(!getHouseData(houseId)) {
		messageClientError(client, "House not found!");
		return false;
	}

	let ownerName = "Unknown";
	switch(getHouseData(houseId).ownerType) {
		case AG_HOUSEOWNER_CLAN:
			ownerName = getClanData(getHouseData(houseId).ownerId).name;
			break;

		case AG_HOUSEOWNER_PLAYER:
			let subAccountData = loadSubAccountFromId(getHouseData(houseId).ownerId);
			ownerName = `${subAccountData.firstName} ${subAccountData.lastName} [${subAccountData.databaseId}]`;
			break;

		case AG_HOUSEOWNER_NONE:
			ownerName = "None";
			break;

		case AG_HOUSEOWNER_PUBLIC:
			ownerName = "Public";
			break;

		case AG_HOUSEOWNER_JOB:
			ownerName = getJobData(getHouseData(houseId).ownerId).name;
			break;				
	}	

	messageClientNormal(client, `🏠 [#11CC11][House Info] [#FFFFFF]Description: [#AAAAAA]${getHouseData(houseId).description}, [#FFFFFF]Owner: [#AAAAAA]${ownerName} (${getHouseOwnerTypeText(getHouseData(houseId).ownerType)}), [#FFFFFF]Locked: [#AAAAAA]${getYesNoFromBool(intToBool(getHouseData(houseId).locked))}, [#FFFFFF]ID: [#AAAAAA]${houseId}/${getHouseData(houseId).databaseId}`);
}

// ---------------------------------------------------------------------------

function isPlayerInAnyHouse(client) {
	return doesEntityDataExist(client, "ag.inHouse");
}

// ---------------------------------------------------------------------------

function getHouseData(houseId) {
	if(typeof getServerData().houses[houseId] != "undefined") {
		return getServerData().houses[houseId];
	}
}

// ---------------------------------------------------------------------------

function doesHouseHaveInterior(houseId) {
	//if(!getHouseData(houseId)) {
	//	return false;
	//}

	//let houseData = getHouseData(houseId);
	//if(houseData.exitPosition == toVector3(0.0, 0.0, 0.0)) {
	//	return false;
	//}

	//if(houseData.exitDimension == houseData.entranceDimension) {
	//	return false;
	//}

	if(houseData.exitInterior == 0) {
		return false;
	}

	if(houseData.exitInterior == -1) {
		return false;
	}	

	return true;
}

// ---------------------------------------------------------------------------

function sendAllHouseLabelsToPlayer(client) {
	let tempHouseLabels = [];
	let totalHouses = getServerData().houses.length;
	let housesPerNetworkEvent = 100;
	let totalNetworkEvents = Math.ceil(totalHouses/housesPerNetworkEvent);
	for(let i = 0 ; i < totalNetworkEvents ; i++) {
		for(let j = 0 ; j < housesPerNetworkEvent ; j++) {
			let tempHouseId = (i*housesPerNetworkEvent)+j;
			if(typeof getServerData().houses[tempHouseId] != "undefined") {
				tempHouseLabels.push([tempHouseId, getServerData().houses[tempHouseId].entrancePosition, getGameConfig().propertyLabelHeight[getServerGame()], getServerData().houses[tempHouseId].description, getServerData().houses[tempHouseId].locked, false]);
			}
		}
		triggerNetworkEvent("ag.houselabel.all", client, tempHouseLabels);
		tempHouseLabels = [];
	}
}

// ---------------------------------------------------------------------------

function sendHouseLabelToPlayers(houseId) {
	triggerNetworkEvent("ag.houselabel.add", null, houseId, getServerData().houses[houseId].entrancePosition, getGameConfig().propertyLabelHeight[getServerGame()], getServerData().houses[houseId].description, getServerData().houses[houseId].locked, false);
}

// ---------------------------------------------------------------------------

function deleteHouseEntrancePickup(houseId) {
	if(getHouseData(houseId).entrancePickup != null) {
		destroyElement(getHouseData(houseId).entrancePickup);
		getHouseData(houseId).entrancePickup = null;
	}
}

// ---------------------------------------------------------------------------

function deleteHouseExitPickup(houseId) {
	if(getHouseData(houseId).exitPickup != null) {
		destroyElement(getHouseData(houseId).exitPickup);
		getHouseData(houseId).exitPickup = null;
	}	
}

// ---------------------------------------------------------------------------

function deleteHouseEntranceBlip(houseId) {
	if(getHouseData(houseId).entranceBlip != null) {
		destroyElement(getHouseData(houseId).entranceBlip);
		getHouseData(houseId).entranceBlip = null;
	}
}

// ---------------------------------------------------------------------------

function deleteHouseExitBlip(houseId) {
	if(getHouseData(houseId).exitBlip != null) {
		destroyElement(getHouseData(houseId).exitBlip);
		getHouseData(houseId).exitBlip = null;
	}	
}

// ---------------------------------------------------------------------------

function reloadAllHousesCommand(command, params, client) {
	let clients = getClients();
	for(let i in clients) {
		if(isPlayerInAnyHouse(clients[i])) {
			removePlayerFromHouses(clients[i]);
		}
	}

	for(let i in getServerData().houses) {
		deleteHouseExitBlip(i);
		deleteHouseEntranceBlip(i);
		deleteHouseExitPickup(i);
		deleteHouseEntrancePickup(i);
	}
	
	getServerData().houses = null;
	getServerData().houses = loadHouseFromDatabase();
	createAllHousePickups();
	createAllHouseBlips();

	for(let i in clients) {
		sendAllHouseLabelsToPlayer(clients[i]);
	}

	messageAdminAction(`All houses have been reloaded by an admin!`);
}

// ---------------------------------------------------------------------------

function exitHouse(client) {
	let houseId = getPlayerHouse(client);
	if(isPlayerSpawned(client)) {
		triggerNetworkEvent("ag.interior", client, getServerData().house[houseId].entranceInterior);
		triggerNetworkEvent("ag.dimension", client, getServerData().house[houseId].entranceDimension);
		triggerNetworkEvent("ag.position", client, getServerData().house[houseId].entrancePosition);
	}
	removeEntityData(client, "ag.inHouse");
}

// ---------------------------------------------------------------------------