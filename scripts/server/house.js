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
	logToConsole(LOG_DEBUG, "[Asshat.House]: Initializing house script ...");
	getServerData().houses = loadHousesFromDatabase();
	createAllHousePickups();
	createAllHouseBlips();
	setAllHouseIndexes();
	logToConsole(LOG_DEBUG, "[Asshat.House]: House script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadHousesFromDatabase() {
	logToConsole(LOG_DEBUG, "[Asshat.House]: Loading houses from database ...");
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
					logToConsole(LOG_DEBUG, `[Asshat.House]: House '${tempHouseData.description}' (ID ${tempHouseData.databaseId}) loaded!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	logToConsole(LOG_DEBUG, `[Asshat.House]: ${tempHouses.length} houses loaded from database successfully!`);
	return tempHouses;
}

// ---------------------------------------------------------------------------

function createHouseCommand(command, params, client) {
	let tempHouseData = createHouse(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].house, getGameConfig().blipSprites[getServerGame()].house, getPlayerInterior(client), getPlayerVirtualWorld(client));
	getServerData().houses.push(tempHouseData);

	createHouseEntrancePickup(getServerData().houses.length-1);
	createHouseExitPickup(getServerData().houses.length-1);
	createHouseEntranceBlip(getServerData().houses.length-1);
	createHouseExitBlip(getServerData().houses.length-1);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]created house [#11CC11]${tempHouseData.description}`);
}

// ---------------------------------------------------------------------------

function lockUnlockHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	getHouseData(houseId).locked = !getHouseData(houseId).locked;
	getHouseData(houseId).entrancePickup.setData("ag.label.locked", getHouseData(houseId).locked, true);
	messagePlayerSuccess(client, `House '${getHouseData(houseId).description}' ${getLockedUnlockedTextFromBool((getHouseData(houseId).locked))}!`);
}

// ---------------------------------------------------------------------------

function setHouseDescriptionCommand(command, params, client) {
	let newHouseDescription = toString(params);

	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	let oldDescription = getHouseData(houseId).description;
	getHouseData(houseId).description = newHouseDescription;
	getHouseData(houseId).entrancePickup.setData("ag.label.name", getHouseData(houseId).description, true);
	messageAdmins(`${client.name} renamed house [#11CC11]${oldDescription} [#FFFFFF]to [#11CC11]${getHouseData(houseId).description}`);
}

// ---------------------------------------------------------------------------

function setHouseOwnerCommand(command, params, client) {
	let newHouseOwner = getPlayerFromParams(params);
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!newHouseOwner) {
		messagePlayerError("Player not found!");
		return false;
	}

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	getHouseData(houseId).ownerType = AG_HOUSEOWNER_PLAYER;
	getHouseData(houseId).ownerId = getServerData().clients[newHouseOwner.index].accountData.databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]owner to [#AAAAAA]${newHouseOwner.name}`);
}

// ---------------------------------------------------------------------------

function setHouseClanCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	let clan = getClanFromParams(params);

	if(!clan) {
		messagePlayerError(client, "That clan is invalid or doesn't exist!");
		return false;
	}

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	getHouseData(houseId).ownerType = AG_HOUSEOWNER_CLAN;
	getHouseData(houseId).ownerId = getClanData(clanId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]owner to the [#FF9900]${getClanData(clanId).name} [#FFFFFF]clan!`);
}

// ---------------------------------------------------------------------------

function setHousePickupCommand(command, params, client) {
	let typeParam = params || "house";
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().pickupModels[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid house type! Use a house type name or a pickup model ID");
			messagePlayerInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().pickupModels[getServerGame()]).join(", ")}`)
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

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]pickup display to [#AAAAAA]${toLowerCase(typeParam)}`);
}

// ---------------------------------------------------------------------------

function setHouseInteriorTypeCommand(command, params, client) {
	let splitParams = params.split(" ");
	let typeParam = splitParams[0] || "none";
	let houseId = getHouseFromParams(splitParams[1]) || (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client));

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(toLowerCase(typeParam) == "none") {
			getHouseData(houseId).exitPosition = toVector3(0.0, 0.0, 0.0);
			getHouseData(houseId).exitInterior = -1;
			getHouseData(houseId).hasInterior = false;
			messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]remove house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]interior`);
			return false;
		}

		if(isNull(getGameConfig().interiorTemplates[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid interior type! Use an interior type name or an existing house database ID");
			messagePlayerInfo(client, `Interior Types: [#AAAAAA]${Object.keys(getGameConfig().interiorTemplates[getServerGame()]).join(", ")}`)
			return false;
		}

		getHouseData(houseId).exitPosition = getGameConfig().interiorTemplates[getServerGame()][typeParam].exitPosition;
		getHouseData(houseId).exitInterior = getGameConfig().interiorTemplates[getServerGame()][typeParam].exitInterior;
		getHouseData(houseId).exitDimension = getHouseData(houseId).databaseId+getGlobalConfig().houseDimensionStart;
		getHouseData(houseId).hasInterior = true;
	} else {
		if(!getHouseData(houseId)) {
			messagePlayerError(client, "Business ID not found!");
			return false;
		}
		getHouseData(houseId).exitPosition = getHouseData(houseId).exitPosition;
		getHouseData(houseId).exitInterior = getHouseData(houseId).exitInterior;
		getHouseData(houseId).exitDimension = getHouseData(houseId).databaseId+getGlobalConfig().houseDimensionStart;
		getHouseData(houseId).hasInterior = true;
	}

	deleteHouseEntrancePickup(houseId);
	deleteHouseExitPickup(houseId);
	createHouseEntrancePickup(houseId);
	createHouseExitPickup(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]interior type to [#AAAAAA]${toLowerCase(typeParam)}`);
}

// ---------------------------------------------------------------------------

function setHouseBlipCommand(command, params, client) {
	let typeParam = params || "house";
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().blipSprites[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid house type! Use a house type name or a blip image ID");
			messagePlayerInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().blipSprites[getServerGame()]).join(", ")}`)
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

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]blip display to [#AAAAAA]${toLowerCase(typeParam)}`);
}

// ---------------------------------------------------------------------------

function moveHouseEntranceCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayer(client, "You need to be near or inside a house!");
		return false;
	}

	getHouseData(houseId).entrancePosition = getPlayerPosition(client);
	getHouseData(houseId).entranceDimension = getPlayerVirtualWorld(client);
	getHouseData(houseId).entranceInterior = getPlayerInterior(client);

	deleteHouseEntranceBlip(houseId);
	deleteHouseEntrancePickup(houseId);

	createHouseEntranceBlip(houseId);
	createHouseEntrancePickup(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]entrance to their position`);
}

// ---------------------------------------------------------------------------

function moveHouseExitCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayer(client, "You need to be near or inside a house!");
		return false;
	}

	getHouseData(houseId).exitPosition = getPlayerPosition(client);
	getHouseData(houseId).exitDimension = getPlayerVirtualWorld(client);
	getHouseData(houseId).exitInterior = getPlayerInterior(client);

	deleteHouseExitBlip(houseId);
	deleteHouseExitPickup(houseId);

	createHouseExitBlip(houseId);
	createHouseExitPickup(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]exit to their position`);
}

// ---------------------------------------------------------------------------

function deleteHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}
	tempHouseData = getHouseData(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]deleted house [#11CC11]${getHouseData(houseId).description}`);
	deleteHouse(houseId, getPlayerData(client).accountData.databaseId);
}

// ---------------------------------------------------------------------------

function deleteHouse(houseId, whoDeleted = 0) {
	let tempHouseData = getServerData().houses[houseId];

	let dbConnection = connectToDatabase();
	let dbQuery = null;

	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `DELETE FROM house_main WHERE house_id = ${tempHouseData.databaseId}`);
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

	getServerData().houses.splice(houseId, 1);
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

	logToConsole(LOG_DEBUG, `[Asshat.House]: Saving house '${tempHouseData.databaseId}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeHouseDescription = escapeDatabaseString(dbConnection, tempHouseData.description);
		if(tempHouseData.databaseId == 0) {
			let dbQueryString = `INSERT INTO house_main (house_server, house_description, house_owner_type, house_owner_id, house_locked, house_entrance_pos_x, house_entrance_pos_y, house_entrance_pos_z, house_entrance_rot_z, house_entrance_int, house_entrance_vw, house_exit_pos_x, house_exit_pos_y, house_exit_pos_z, house_exit_rot_z, house_exit_int, house_exit_vw, house_has_interior) VALUES (${getServerId()}, '${safeHouseDescription}', ${tempHouseData.ownerType}, ${tempHouseData.ownerId}, ${boolToInt(tempHouseData.locked)}, ${tempHouseData.entrancePosition.x}, ${tempHouseData.entrancePosition.y}, ${tempHouseData.entrancePosition.z}, ${tempHouseData.entranceRotation}, ${tempHouseData.entranceInterior}, ${tempHouseData.entranceDimension}, ${tempHouseData.exitPosition.x}, ${tempHouseData.exitPosition.y}, ${tempHouseData.exitPosition.z}, ${tempHouseData.exitRotation}, ${tempHouseData.exitInterior}, ${tempHouseData.exitDimension}, ${boolToInt(tempHouseData.hasInterior)})`;
			queryDatabase(dbConnection, dbQueryString);
			getServerData().houses[houseId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE house_main SET house_description='${safeHouseDescription}', house_owner_type=${tempHouseData.ownerType}, house_owner_id=${tempHouseData.ownerId}, house_locked=${boolToInt(tempHouseData.locked)}, house_entrance_pos_x=${tempHouseData.entrancePosition.x}, house_entrance_pos_y=${tempHouseData.entrancePosition.y}, house_entrance_pos_z=${tempHouseData.entrancePosition.z}, house_entrance_rot_z=${tempHouseData.entranceRotation}, house_entrance_int=${tempHouseData.entranceInterior}, house_entrance_vw=${tempHouseData.entranceDimension}, house_exit_pos_x=${tempHouseData.exitPosition.x}, house_exit_pos_y=${tempHouseData.exitPosition.y}, house_exit_pos_z=${tempHouseData.exitPosition.z}, house_exit_rot_z=${tempHouseData.exitRotation}, house_exit_int=${tempHouseData.exitInterior}, house_exit_vw=${tempHouseData.exitDimension}, house_has_interior=${boolToInt(tempHouseData.hasInterior)} WHERE house_id=${tempHouseData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	logToConsole(LOG_DEBUG, `[Asshat.house]: Saved house '${tempHouseData.description}' to database!`);

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
	if(getHouseData(houseId).entrancePickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].house;

		if(getServerData().houses[houseId].entrancePickupModel != 0) {
			pickupModelId = getHouseData(houseId).entrancePickupModel;
		}

		getHouseData(houseId).entrancePickup = gta.createPickup(pickupModelId, getHouseData(houseId).entrancePosition);
		getHouseData(houseId).entrancePickup.onAllDimensions = false;
		getHouseData(houseId).entrancePickup.dimension = getHouseData(houseId).entranceDimension;
		//getHouseData(houseId).entrancePickup.interior = getHouseData(houseId).entranceInterior;
		getHouseData(houseId).entrancePickup.setData("ag.owner.type", AG_PICKUP_HOUSE_ENTRANCE, false);
		getHouseData(houseId).entrancePickup.setData("ag.owner.id", houseId, false);
		getHouseData(houseId).entrancePickup.setData("ag.label.type", AG_LABEL_HOUSE, true);
		getHouseData(houseId).entrancePickup.setData("ag.label.name", getHouseData(houseId).description, true);
		getHouseData(houseId).entrancePickup.setData("ag.label.locked", getHouseData(houseId).locked, true);
		if(getHouseData(houseId).buyPrice > 0) {
			getHouseData(houseId).entrancePickup.setData("ag.label.price", getHouseData(houseId).buyPrice, true);
		}
		addToWorld(getHouseData(houseId).entrancePickup);
	}
}

// ---------------------------------------------------------------------------

function createHouseEntranceBlip(houseId) {
	if(getHouseData(houseId).entranceBlipModel != -1) {
		let blipModelId = getGameConfig().blipSprites[getServerGame()].house;

		if(getServerData().houses[houseId].entranceBlipModel != 0) {
			blipModelId = getHouseData(houseId).entranceBlipModel;
		}

		getHouseData(houseId).entranceBlip = gta.createBlip(getHouseData(houseId).entrancePosition, blipModelId, 1, getColourByName("houseGreen"));
		getHouseData(houseId).entranceBlip.onAllDimensions = false;
		getHouseData(houseId).entranceBlip.dimension = getHouseData(houseId).entranceDimension;
		//getHouseData(houseId).entranceBlip.interior = getHouseData(houseId).entranceInterior;
		getHouseData(houseId).entranceBlip.setData("ag.owner.type", AG_BLIP_HOUSE_ENTRANCE, false);
		getHouseData(houseId).entranceBlip.setData("ag.owner.id", houseId, false);
		addToWorld(getHouseData(houseId).entranceBlip);
	}
}

// ---------------------------------------------------------------------------

function createHouseExitPickup(houseId) {
	if(getHouseData(houseId).hasInterior) {
		if(getHouseData(houseId).exitPickupModel != -1) {
			let pickupModelId = getGameConfig().pickupModels[getServerGame()].exit;

			if(getServerData().houses[houseId].exitPickupModel != 0) {
				pickupModelId = getHouseData(houseId).exitPickupModel;
			}

			getHouseData(houseId).exitPickup = gta.createPickup(pickupModelId, getHouseData(houseId).exitPosition);
			getHouseData(houseId).exitPickup.onAllDimensions = false;
			getHouseData(houseId).exitPickup.dimension = getHouseData(houseId).exitDimension;
			//getHouseData(houseId).exitPickup.interior = getHouseData(houseId).exitInterior;
			getHouseData(houseId).exitPickup.setData("ag.owner.type", AG_PICKUP_HOUSE_EXIT, false);
			getHouseData(houseId).exitPickup.setData("ag.owner.id", houseId, false);
			getHouseData(houseId).exitPickup.setData("ag.label.type", AG_LABEL_EXIT, true);
			addToWorld(getHouseData(houseId).exitPickup);
		}
	}
}

// ---------------------------------------------------------------------------

function createHouseExitBlip(houseId) {
	if(getHouseData(houseId).hasInterior) {
		if(getHouseData(houseId).exitBlipModel != -1) {
			let blipModelId = getGameConfig().blipSprites[getServerGame()].house;

			if(getServerData().houses[houseId].exitBlipModel != 0) {
				blipModelId = getHouseData(houseId).exitBlipModel;
			}

			getHouseData(houseId).exitBlip = gta.createBlip(blipModelId, getHouseData(houseId).exitPosition, 1, getColourByName("houseGreen"));
			getHouseData(houseId).exitBlip.onAllDimensions = false;
			getHouseData(houseId).exitBlip.dimension = getHouseData(houseId).entranceDimension;
			//getHouseData(houseId).exitBlip.interior = getHouseData(houseId).exitInterior;
			getHouseData(houseId).exitBlip.setData("ag.owner.type", AG_BLIP_HOUSE_EXIT, false);
			getHouseData(houseId).exitBlip.setData("ag.owner.id", houseId, false);
			addToWorld(getHouseData(houseId).exitBlip);
		}
	}
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
		messagePlayerError(client, "House not found!");
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

	messagePlayerNormal(client, `🏠 [#11CC11][House Info] [#FFFFFF]Description: [#AAAAAA]${getHouseData(houseId).description}, [#FFFFFF]Owner: [#AAAAAA]${ownerName} (${getHouseOwnerTypeText(getHouseData(houseId).ownerType)}), [#FFFFFF]Locked: [#AAAAAA]${getYesNoFromBool(intToBool(getHouseData(houseId).locked))}, [#FFFFFF]ID: [#AAAAAA]${houseId}/${getHouseData(houseId).databaseId}`);
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
	return getHouseData(houseId).hasInterior;
}

// ---------------------------------------------------------------------------

function deleteHouseEntrancePickup(houseId) {
	if(getHouseData(houseId).entrancePickup != null) {
		//removeFromWorld(getHouseData(houseId).entrancePickup);
		destroyElement(getHouseData(houseId).entrancePickup);
		getHouseData(houseId).entrancePickup = null;
	}
}

// ---------------------------------------------------------------------------

function deleteHouseExitPickup(houseId) {
	if(getHouseData(houseId).exitPickup != null) {
		//removeFromWorld(getHouseData(houseId).exitPickup);
		destroyElement(getHouseData(houseId).exitPickup);
		getHouseData(houseId).exitPickup = null;
	}
}

// ---------------------------------------------------------------------------

function deleteHouseEntranceBlip(houseId) {
	if(getHouseData(houseId).entranceBlip != null) {
		//removeFromWorld(getHouseData(houseId).entranceBlip);
		destroyElement(getHouseData(houseId).entranceBlip);
		getHouseData(houseId).entranceBlip = null;
	}
}

// ---------------------------------------------------------------------------

function deleteHouseExitBlip(houseId) {
	if(getHouseData(houseId).exitBlip != null) {
		//removeFromWorld(getHouseData(houseId).exitBlip);
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
	getServerData().houses = loadHousesFromDatabase();
	createAllHousePickups();
	createAllHouseBlips();

	messageAdminAction(`All houses have been reloaded by an admin!`);
}

// ---------------------------------------------------------------------------

function exitHouse(client) {
	let houseId = getPlayerHouse(client);
	if(isPlayerSpawned(client)) {
		setPlayerInterior(client, getServerData().house[houseId].entranceInterior);
		setPlayerVirtualWorld(client, getServerData().house[houseId].entranceDimension);
		setPlayerPosition(client, getServerData().house[houseId].entrancePosition);
	}
	removeEntityData(client, "ag.inHouse");
}

// ---------------------------------------------------------------------------

function setAllHouseIndexes() {
	for(let i in getServerData().houses) {
		getServerData().houses[i].index = i;
	}
}

// ---------------------------------------------------------------------------