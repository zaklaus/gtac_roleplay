// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: house.js
// DESC: Provides house commands, functions, and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initHouseScript() {
	logToConsole(LOG_INFO, "[VRR.House]: Initializing house script ...");
	getServerData().houses = loadHousesFromDatabase();

	if(getServerConfig().createHousePickups) {
		createAllHousePickups();
	}

	if(getServerConfig().createHouseBlips) {
		createAllHouseBlips();
	}

	setAllHouseIndexes();
	logToConsole(LOG_INFO, "[VRR.House]: House script initialized successfully!");
	return true;
}

// ===========================================================================

function loadHousesFromDatabase() {
	logToConsole(LOG_INFO, "[VRR.House]: Loading houses from database ...");
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
					logToConsole(LOG_VERBOSE, `[VRR.House]: House '${tempHouseData.description}' (ID ${tempHouseData.databaseId}) loaded!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	logToConsole(LOG_INFO, `[VRR.House]: ${tempHouses.length} houses loaded from database successfully!`);
	return tempHouses;
}

// ===========================================================================

function createHouseCommand(command, params, client) {
	let tempHouseData = createHouse(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].house, getGameConfig().blipSprites[getServerGame()].house, getPlayerInterior(client), getPlayerDimension(client));
	let houseId = getServerData().houses.push(tempHouseData);

	saveAllHousesToDatabase();

	createHouseEntrancePickup(houseId);
	createHouseExitPickup(houseId);
	createHouseEntranceBlip(houseId);
	createHouseExitBlip(houseId);

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}created house ${getInlineChatColourByType("houseGreen")}${tempHouseData.description}`);
}

// ===========================================================================

function lockUnlockHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	getHouseData(houseId).locked = !getHouseData(houseId).locked;

	for(let i in getHouseData(houseId).locations) {
		if(getHouseData(houseId).locations[i].type == VRR_HOUSE_LOC_DOOR) {
			setEntityData(getHouseData(houseId).locations[i].entrancePickup, "vrr.label.locked", getHouseData(houseId).locked, true);
		}
	}

	messagePlayerSuccess(client, `House '${getHouseData(houseId).description}' ${getLockedUnlockedTextFromBool((getHouseData(houseId).locked))}!`);
}

// ===========================================================================

function setHouseDescriptionCommand(command, params, client) {
	let newHouseDescription = toString(params);

	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	let oldDescription = getHouseData(houseId).description;
	getHouseData(houseId).description = newHouseDescription;

	for(let i in getHouseData(houseId).locations) {
		if(getHouseData(houseId).locations[i].type == VRR_HOUSE_LOC_DOOR) {
			setEntityData(getHouseData(houseId).entrancePickup, "vrr.label.name", getHouseData(houseId).description, true);
		}
	}

	messageAdmins(`${getPlayerName(client)} renamed house ${getInlineChatColourByType("houseGreen")}${oldDescription} ${getInlineChatColourByName("white")}to ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description}`);
}

// ===========================================================================

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

	getHouseData(houseId).ownerType = VRR_HOUSEOWNER_PLAYER;
	getHouseData(houseId).ownerId = getServerData().clients[newHouseOwner.index].accountData.databaseId;
	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description} ${getInlineChatColourByName("white")}owner to ${getInlineChatColourByName("lightGrey")}${newHouseOwner.name}`);
}

// ===========================================================================

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

	getHouseData(houseId).ownerType = VRR_HOUSEOWNER_CLAN;
	getHouseData(houseId).ownerId = getClanData(clanId).databaseId;
	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description} ${getInlineChatColourByName("white")}owner to the ${getInlineChatColourByType("clanOrange")}${getClanData(clanId).name} ${getInlineChatColourByName("white")}clan!`);
}

// ===========================================================================

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
			deleteGameElement(getHouseData(houseId).entrancePickup);
		}

		createHouseEntrancePickup(houseId);
	}

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]pickup display to [#AAAAAA]${toLowerCase(typeParam)}`);
}

// ===========================================================================

function setHouseInteriorTypeCommand(command, params, client) {
	let splitParams = params.split(" ");
	let typeParam = splitParams[0] || "none";
	let houseId = getHouseFromParams(splitParams[1]) || (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client));

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		let tempHouseLocation = new serverClasses.houseLocationData(false);

		if(toLowerCase(typeParam) == "none") {
			tempHouseLocation.exitPosition = toVector3(0.0, 0.0, 0.0);
			tempHouseLocation.exitInterior = -1;
			getHouseData(houseId).hasInterior = false;
			messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}remove house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description} ${getInlineChatColourByName("white")}interior`);
			return false;
		}

		if(isNull(getGameConfig().interiorTemplates[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid interior type! Use an interior type name");
			messagePlayerInfo(client, `Interior Types: ${getInlineChatColourByName("lightGrey")}${Object.keys(getGameConfig().interiorTemplates[getServerGame()]).join(", ")}`)
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

// ===========================================================================

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
			deleteGameElement(getHouseData(houseId).entranceBlip);
		}

		createHouseEntranceBlip(houseId);
	}

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]blip display to [#AAAAAA]${toLowerCase(typeParam)}`);
}

// ===========================================================================

function moveHouseEntranceCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayer(client, "You need to be near or inside a house!");
		return false;
	}

	getHouseData(houseId).locations[0].entrancePosition = getPlayerPosition(client);
	getHouseData(houseId).locations[0].entranceDimension = getPlayerDimension(client);
	getHouseData(houseId).locations[0].entranceInterior = getPlayerInterior(client);

	deleteAllHouseBlips(houseId);
	deleteAllHousePickups(houseId);
	createAllHouseBlips(houseId);
	createAllHousePickups(houseId);

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}moved house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description} ${getInlineChatColourByName("white")}entrance to their position`);
}

// ===========================================================================

function moveHouseExitCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayer(client, "You need to be near or inside a house!");
		return false;
	}

	getHouseData(houseId).locations = [];

	getHouseData(houseId).locations[0].entrancePosition = getPlayerPosition(client);
	getHouseData(houseId).locations[0].entranceDimension = getPlayerDimension(client);
	getHouseData(houseId).locations[0].exitInterior = getPlayerInterior(client);

	deleteAllHouseBlips(houseId);
	deleteAllHousePickups(houseId);
	createAllHouseBlips(houseId);
	createAllHousePickups(houseId);

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}moved house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description} ${getInlineChatColourByName("white")}exit to their position`);
}

// ===========================================================================

function deleteHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}
	tempHouseData = getHouseData(houseId);

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}deleted house ${getInlineChatColourByType("houseGreen")}${getHouseData(houseId).description}`);
	deleteHouse(houseId, getPlayerData(client).accountData.databaseId);
}

// ===========================================================================

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

	deleteAllHouseBlips(houseId);
	deleteAllHousePickups(houseId);

	removePlayersFromHouse(houseId);

	getServerData().houses.splice(houseId, 1);
}

// ===========================================================================

function removePlayerFromHouses(client) {
	if(isPlayerInAnyHouse(client)) {
		exitHouse(client);
	}
}

// ===========================================================================

function createHouse(description, entrancePosition, exitPosition, entrancePickupModel = -1, entranceBlipModel = -1, entranceInteriorId = 0, entranceVirtualWorld = 0, exitInteriorId = -1, exitVirtualWorld = -1, exitPickupModel = -1, exitBlipModel = -1) {
	let tempHouseData = new serverClasses.houseData(false);
	tempHouseData.description = description;

	let tempHouseLocation = new serverClasses.houseLocationData(false);
	tempHouseLocation.entrancePosition = entrancePosition;
	tempHouseLocation.entranceRotation = 0.0;
	tempHouseLocation.entrancePickupModel = entrancePickupModel;
	tempHouseLocation.entranceBlipModel = entranceBlipModel;
	tempHouseLocation.entranceInterior = entranceInteriorId;
	tempHouseLocation.entranceDimension = entranceVirtualWorld;

	tempHouseLocation.exitPosition = exitPosition;
	tempHouseLocation.exitRotation = 0.0;
	tempHouseLocation.exitPickupModel = exitPickupModel;
	tempHouseLocation.exitBlipModel = exitBlipModel;
	tempHouseLocation.exitInterior = exitInteriorId;
	tempHouseLocation.exitDimension = exitVirtualWorld;

	tempHouseData.locations.push(tempHouseLocation);

	return tempHouseData;
}

// ===========================================================================

function getHouseDataFromDatabaseId(databaseId) {
	let matchingHouses = getServerData().houses.filter(b => b.databaseId == databaseId)
	if(matchingHouses.length == 1) {
		return matchingHouses[0];
	}
	return false;
}

// ===========================================================================

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

// ===========================================================================

function getPlayerHouse(client) {
	if(doesEntityDataExist(client, "vrr.inHouse")) {
		return getEntityData(client, "vrr.inHouse");
	}

	return -1;
}

// ===========================================================================

function saveAllHousesToDatabase() {
	logToConsole(LOG_INFO, `[VRR.House]: Saving all server houses to database ...`);
	for(let i in getServerData().houses) {
		saveHouseToDatabase(i);
	}
	logToConsole(LOG_INFO, `[VRR.House]: Saving all server houses to database ...`);
}

// ===========================================================================

function saveHouseToDatabase(houseId) {
	let tempHouseData = getServerData().houses[houseId];

	logToConsole(LOG_VERBOSE, `[VRR.House]: Saving house '${tempHouseData.databaseId}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeHouseDescription = escapeDatabaseString(dbConnection, tempHouseData.description);

		let data = [
			["house_server", getServerId()],
			["house_description", safeHouseDescription],
			["house_owner_type", tempHouseData.ownerType],
			["house_owner_id", tempHouseData.ownerId],
			["house_locked", boolToInt(tempHouseData.locked)],
			["house_entrance_fee", tempHouseData.entranceFee],
			["house_entrance_pos_x", tempHouseData.entrancePosition.x],
			["house_entrance_pos_y", tempHouseData.entrancePosition.x],
			["house_entrance_pos_z", tempHouseData.entrancePosition.z],
			["house_entrance_rot_z", tempHouseData.entranceRotation],
			["house_entrance_int", tempHouseData.entranceInterior],
			["house_entrance_vw", tempHouseData.entranceDimension],
			["house_entrance_pickup", tempHouseData.entrancePickupModel],
			["house_entrance_blip", tempHouseData.entranceBlipModel],
			["house_exit_pos_x", tempHouseData.exitPosition.x],
			["house_exit_pos_y", tempHouseData.exitPosition.y],
			["house_exit_pos_z", tempHouseData.exitPosition.z],
			["house_exit_rot_z", tempHouseData.exitRotation],
			["house_exit_int", tempHouseData.exitInterior],
			["house_exit_vw", tempHouseData.databaseId+getGlobalConfig().houseDimensionStart],
			["house_exit_pickup", tempHouseData.exitPickupModel],
			["house_exit_blip", tempHouseData.exitBlipModel],
			["house_has_interior", boolToInt(tempHouseData.hasInterior)],
			["house_buy_price", tempHouseData.buyPrice],
			["house_rent_price", tempHouseData.rentPrice],
		];

		let dbQuery = null;
		if(tempHouseData.databaseId == 0) {
			let queryString = createDatabaseInsertQuery("house_main", data);
			dbQuery = queryDatabase(dbConnection, queryString);
			getServerData().houses[houseId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let queryString = createDatabaseUpdateQuery("house_main", data, `WHERE house_id=${tempHouseData.databaseId}`);
			dbQuery = queryDatabase(dbConnection, queryString);
		}

		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
		return true;
	}
	logToConsole(LOG_VERBOSE, `[VRR.House]: Saved house '${tempHouseData.description}' to database!`);

	return false;
}

// ===========================================================================

function createAllHousePickups() {
	for(let i in getServerData().houses) {
		createHouseEntrancePickup(i);
		createHouseExitPickup(i);
	}
}

// ===========================================================================

function createAllHouseBlips() {
	for(let i in getServerData().houses) {
		createHouseEntranceBlip(i);
		createHouseExitBlip(i);
	}
}

// ===========================================================================

function createHouseEntrancePickup(houseId) {
	if(!getServerConfig().createHousePickups) {
		return false;
	}

	if(getHouseData(houseId).entrancePickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].house;

		if(getServerData().houses[houseId].entrancePickupModel != 0) {
			pickupModelId = getHouseData(houseId).entrancePickupModel;
		}

		getHouseData(houseId).entrancePickup = createGamePickup(pickupModelId, getHouseData(houseId).entrancePosition, getGameConfig().pickupTypes[getServerGame()].house);
		setElementOnAllDimensions(getHouseData(houseId).entrancePickup, false);
		setElementDimension(getHouseData(houseId).entrancePickup, getHouseData(houseId).entranceDimension);
		setEntityData(getHouseData(houseId).entrancePickup, "vrr.owner.type", VRR_PICKUP_HOUSE_ENTRANCE, false);
		setEntityData(getHouseData(houseId).entrancePickup, "vrr.owner.id", houseId, false);
		setEntityData(getHouseData(houseId).entrancePickup, "vrr.label.type", VRR_LABEL_HOUSE, true);
		setEntityData(getHouseData(houseId).entrancePickup, "vrr.label.name", getHouseData(houseId).description, true);
		setEntityData(getHouseData(houseId).entrancePickup, "vrr.label.locked", getHouseData(houseId).locked, true);
		if(getHouseData(houseId).buyPrice > 0) {
			setEntityData(getHouseData(houseId).entrancePickup, "vrr.label.price", getHouseData(houseId).buyPrice, true);
		}
		addToWorld(getHouseData(houseId).entrancePickup);
	}
}

// ===========================================================================

function createHouseEntranceBlip(houseId) {
	if(!getServerConfig().createHouseBlips) {
		return false;
	}

	if(getHouseData(houseId).entranceBlipModel != -1) {
		let blipModelId = getGameConfig().blipSprites[getServerGame()].house;

		if(getServerData().houses[houseId].entranceBlipModel != 0) {
			blipModelId = getHouseData(houseId).entranceBlipModel;
		}

		getHouseData(houseId).entranceBlip = createGameBlip(getHouseData(houseId).entrancePosition, blipModelId, 1, getColourByName("houseGreen"));
		setElementDimension(getHouseData(houseId).entranceBlip, getHouseData(houseId).entranceDimension);
		setElementOnAllDimensions(getHouseData(houseId).entranceBlip, false);
		//getHouseData(houseId).entranceBlip.streamInDistance = 300;
		//getHouseData(houseId).entranceBlip.streamOutDistance = 350;
		setEntityData(getHouseData(houseId).entranceBlip, "vrr.owner.type", VRR_BLIP_HOUSE_ENTRANCE, false);
		setEntityData(getHouseData(houseId).entranceBlip, "vrr.owner.id", houseId, false);
		addToWorld(getHouseData(houseId).entranceBlip);
	}
}

// ===========================================================================

function createHouseExitPickup(houseId) {
	if(!getServerConfig().createHousePickups) {
		return false;
	}

	if(getHouseData(houseId).hasInterior) {
		if(getHouseData(houseId).exitPickupModel != -1) {
			let pickupModelId = getGameConfig().pickupModels[getServerGame()].exit;

			if(getServerData().houses[houseId].exitPickupModel != 0) {
				pickupModelId = getHouseData(houseId).exitPickupModel;
			}

			getHouseData(houseId).exitPickup = createGamePickup(pickupModelId, getHouseData(houseId).exitPosition, getGameConfig().pickupTypes[getServerGame()].house);
			setElementDimension(getHouseData(houseId).exitPickup, getHouseData(houseId).exitDimension);
			setElementOnAllDimensions(getHouseData(houseId).exitPickup, false);
			setEntityData(getHouseData(houseId).exitPickup, "vrr.owner.type", VRR_PICKUP_HOUSE_EXIT, false);
			setEntityData(getHouseData(houseId).exitPickup, "vrr.owner.id", houseId, false);
			setEntityData(getHouseData(houseId).exitPickup, "vrr.label.type", VRR_LABEL_EXIT, true);
			addToWorld(getHouseData(houseId).exitPickup);
		}
	}
}

// ===========================================================================

function createHouseExitBlip(houseId) {
	if(!getServerConfig().createHouseBlips) {
		return false;
	}

	if(getHouseData(houseId).hasInterior) {
		if(getHouseData(houseId).exitBlipModel != -1) {
			let blipModelId = getGameConfig().blipSprites[getServerGame()].house;

			if(getServerData().houses[houseId].exitBlipModel != 0) {
				blipModelId = getHouseData(houseId).exitBlipModel;
			}

			getHouseData(houseId).exitBlip = createGameBlip(blipModelId, getHouseData(houseId).exitPosition, 1, getColourByName("houseGreen"));
			setElementDimension(getHouseData(houseId).exitBlip, getHouseData(houseId).entranceDimension);
			setElementOnAllDimensions(getHouseData(houseId).exitBlip, false);
			setEntityData(getHouseData(houseId).exitBlip, "vrr.owner.type", VRR_BLIP_HOUSE_EXIT, false);
			setEntityData(getHouseData(houseId).exitBlip, "vrr.owner.id", houseId, false);
			addToWorld(getHouseData(houseId).exitBlip);
		}
	}
}

// ===========================================================================

function getHouseOwnerTypeText(ownerType) {
	switch(ownerType) {
		case VRR_HOUSEOWNER_CLAN:
			return "clan";

		case VRR_HOUSEOWNER_PLAYER:
			return "player";

		case VRR_BIZOWNER_NONE:
			return "not owned";

		case VRR_BIZOWNER_PUBLIC:
			return "not owned";

		case VRR_BIZOWNER_JOB:
			return "job";

		default:
			return "unknown";
	}
}

// ===========================================================================

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
		case VRR_HOUSEOWNER_CLAN:
			ownerName = getClanData(getHouseData(houseId).ownerId).name;
			break;

		case VRR_HOUSEOWNER_PLAYER:
			let subAccountData = loadSubAccountFromId(getHouseData(houseId).ownerId);
			ownerName = `${subAccountData.firstName} ${subAccountData.lastName} [${subAccountData.databaseId}]`;
			break;

		case VRR_HOUSEOWNER_NONE:
			ownerName = "None";
			break;

		case VRR_HOUSEOWNER_PUBLIC:
			ownerName = "Public";
			break;

		case VRR_HOUSEOWNER_JOB:
			ownerName = getJobData(getHouseData(houseId).ownerId).name;
			break;
	}

	messagePlayerNormal(client, `🏠 ${getInlineChatColourByType("houseGreen")}[House Info] ${getInlineChatColourByName("white")}Description: ${getInlineChatColourByName("lightGrey")}${getHouseData(houseId).description}, ${getInlineChatColourByName("white")}Owner: ${getInlineChatColourByName("lightGrey")}${ownerName} (${getHouseOwnerTypeText(getHouseData(houseId).ownerType)}), ${getInlineChatColourByName("white")}Locked: ${getInlineChatColourByName("lightGrey")}${getYesNoFromBool(intToBool(getHouseData(houseId).locked))}, ${getInlineChatColourByName("white")}ID: ${getInlineChatColourByName("lightGrey")}${houseId}/${getHouseData(houseId).databaseId}`);
}

// ===========================================================================

function isPlayerInAnyHouse(client) {
	return doesEntityDataExist(client, "vrr.inHouse");
}

// ===========================================================================

function getHouseData(houseId) {
	if(typeof getServerData().houses[houseId] != "undefined") {
		return getServerData().houses[houseId];
	}
}

// ===========================================================================

function doesHouseHaveInterior(houseId) {
	return getHouseData(houseId).hasInterior;
}

// ===========================================================================

function deleteHouseEntrancePickup(houseId) {
	if(getHouseData(houseId).entrancePickup != null) {
		//removeFromWorld(getHouseData(houseId).entrancePickup);
		deleteGameElement(getHouseData(houseId).entrancePickup);
		getHouseData(houseId).entrancePickup = null;
	}
}

// ===========================================================================

function deleteHouseExitPickup(houseId) {
	if(getHouseData(houseId).exitPickup != null) {
		//removeFromWorld(getHouseData(houseId).exitPickup);
		deleteGameElement(getHouseData(houseId).exitPickup);
		getHouseData(houseId).exitPickup = null;
	}
}

// ===========================================================================

function deleteHouseEntranceBlip(houseId) {
	if(getHouseData(houseId).entranceBlip != null) {
		//removeFromWorld(getHouseData(houseId).entranceBlip);
		deleteGameElement(getHouseData(houseId).entranceBlip);
		getHouseData(houseId).entranceBlip = null;
	}
}

// ===========================================================================

function deleteHouseExitBlip(houseId) {
	if(getHouseData(houseId).exitBlip != null) {
		//removeFromWorld(getHouseData(houseId).exitBlip);
		deleteGameElement(getHouseData(houseId).exitBlip);
		getHouseData(houseId).exitBlip = null;
	}
}

// ===========================================================================

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

// ===========================================================================

function exitHouse(client) {
	let houseId = getPlayerHouse(client);
	if(isPlayerSpawned(client)) {
		setPlayerInterior(client, getServerData().house[houseId].entranceInterior);
		setPlayerDimension(client, getServerData().house[houseId].entranceDimension);
		setPlayerPosition(client, getServerData().house[houseId].entrancePosition);
	}
	removeEntityData(client, "vrr.inHouse");
}

// ===========================================================================

function setAllHouseIndexes() {
	for(let i in getServerData().houses) {
		getServerData().houses[i].index = i;
	}
}

// ===========================================================================

function cacheAllHouseItems() {
	for(let i in getServerData().houses) {
		cacheHouseItems(i);
	}
}

// ===========================================================================

function cacheHouseItems(houseId) {
	getHouseData(houseId).itemCache = [];

	for(let i in getServerData().items) {
		if(getItemData(i).ownerType == VRR_ITEM_OWNER_HOUSE && getItemData(i).ownerId == getHouseData(houseId).databaseId) {
			getHouseData(houseId).itemCache.push(i);
		}
	}
}

// ===========================================================================

function getHouseIdFromDatabaseId(databaseId) {
	let houses = getServerData().houses;
	for(let i in houses) {
		if(houses[i].databaseId == databaseId) {
			return i;
		}
	}
}

// ===========================================================================