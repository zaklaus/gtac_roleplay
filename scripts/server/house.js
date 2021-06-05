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

	if(getServerConfig().createHousePickups) {
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
					tempHouseData.locations = loadHouseLocationsFromDatabase(tempHouseData.databaseId);
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

function loadHouseLocationsFromDatabase(houseId) {
	console.log(`[VRR.House]: Loading locations for business '${getBusinessData(businessId).name}' from database ...`);

	let tempHouseLocations = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;

	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `SELECT * FROM house_loc WHERE house_loc_house=${houseId}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempHouseLocationData = new serverClasses.houseLocationData(dbAssoc);
					tempHouseLocations.push(tempHouseLocationData);
					console.log(`[VRR.House]: Location for house '${getHouseData(houseId).name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[VRR.House]: ${tempHouseLocations.length} locations for house '${getHouseData(houseId).name}' loaded from database successfully`);
	return tempHouseLocations;
}

// ---------------------------------------------------------------------------

function createHouseCommand(command, params, client) {
	let tempHouseData = createHouse(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].house, getGameConfig().blipSprites[getServerGame()].house, getPlayerInterior(client), getPlayerDimension(client));
	getServerData().houses.push(tempHouseData);

	createHouseEntrancePickup(getServerData().houses.length-1);
	createHouseExitPickup(getServerData().houses.length-1);
	createHouseEntranceBlip(getServerData().houses.length-1);
	createHouseExitBlip(getServerData().houses.length-1);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]created house [#11CC11]${tempHouseData.description}`);
}

// ===========================================================================

function lockUnlockHouseCommand(command, params, client) {
	let houseId = toInteger((isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)));
	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	getHouseData(houseId).locked = !getHouseData(houseId).locked;
	setEntityData(getHouseData(houseId).entrancePickup, "ag.label.locked", getHouseData(houseId).locked, true);
	messagePlayerSuccess(client, `House '${getHouseData(houseId).description}' ${getLockedUnlockedTextFromBool((getHouseData(houseId).locked))}!`);
}

// ===========================================================================

function setHouseDescriptionCommand(command, params, client) {
	let newHouseDescription = toString(params);

	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}

	let oldDescription = getHouseData(houseId).description;
	getHouseData(houseId).description = newHouseDescription;
	setEntityData(getHouseData(houseId).entrancePickup, "ag.label.name", getHouseData(houseId).description, true);
	messageAdmins(`${client.name} renamed house [#11CC11]${oldDescription} [#FFFFFF]to [#11CC11]${getHouseData(houseId).description}`);
}

// ===========================================================================

function setHouseOwnerCommand(command, params, client) {
	let newHouseOwner = getPlayerFromParams(params);
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

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
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]owner to [#AAAAAA]${newHouseOwner.name}`);
}

// ===========================================================================

function setHouseClanCommand(command, params, client) {
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

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
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]owner to the [#FF9900]${getClanData(clanId).name} [#FFFFFF]clan!`);
}

// ===========================================================================

function setHousePickupCommand(command, params, client) {
	let typeParam = params || "house";
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	let entrancePickupModel = getGameConfig().pickupModels[getServerGame()].house;

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().pickupModels[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid house type! Use a house type name or a pickup model ID");
			messagePlayerInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().pickupModels[getServerGame()]).join(", ")}`);
			return false;
		}

		entrancePickupModel = getGameConfig().pickupModels[getServerGame()][typeParam];
	} else {
		entrancePickupModel = toInteger(typeParam);
	}

	for(let i in getHouseData(houseId).locations) {
		getHouseData(houseId).locations[i].entrancePickupModel = entrancePickupModel;
		deleteHouseLocationEntrancePickup(houseId, i);
		if(getHouseData(houseId).locations[i].entrancePickupModel != -1) {
			createHouseLocationEntrancePickup(houseId, i);
		}
	}

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]pickup display to [#AAAAAA]${entrancePickupModel}`);
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

// ===========================================================================

function setHouseBlipCommand(command, params, client) {
	let typeParam = params || "house";
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	let entranceBlipModel = getGameConfig().blipSprites[getServerGame()].house;

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().blipSprites[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid house type! Use a house type name or a blip image ID");
			messagePlayerInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().blipSprites[getServerGame()]).join(", ")}`)
			return false;
		}

		entranceBlipModel = getGameConfig().blipSprites[getServerGame()][typeParam];
	} else {
		entranceBlipModel = toInteger(typeParam);
	}

	if(getHouseData(houseId).entranceBlipModel != -1) {
		if(getHouseData(houseId).entranceBlip != null) {
			deleteGameElement(getHouseData(houseId).entranceBlip);
		}
	}

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]blip display to [#AAAAAA]${entranceBlipModel}`);
}

// ===========================================================================

function moveHouseEntranceCommand(command, params, client) {
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

	if(!getHouseData(houseId)) {
		messagePlayer(client, "You need to be near or inside a house!");
		return false;
	}

	getHouseData(houseId).entrancePosition = getPlayerPosition(client);
	getHouseData(houseId).entranceDimension = getPlayerDimension(client);
	getHouseData(houseId).entranceInterior = getPlayerInterior(client);

	deleteHouseEntranceBlip(houseId);
	deleteHouseEntrancePickup(houseId);

	createHouseEntranceBlip(houseId);
	createHouseEntrancePickup(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]entrance to their position`);
}

// ===========================================================================

function moveHouseExitCommand(command, params, client) {
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

	if(!getHouseData(houseId)) {
		messagePlayer(client, "You need to be near or inside a house!");
		return false;
	}

	getHouseData(houseId).exitPosition = getPlayerPosition(client);
	getHouseData(houseId).exitDimension = getPlayerDimension(client);
	getHouseData(houseId).exitInterior = getPlayerInterior(client);

	deleteHouseExitBlip(houseId);
	deleteHouseExitPickup(houseId);

	createHouseExitBlip(houseId);
	createHouseExitPickup(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved house [#11CC11]${getHouseData(houseId).description} [#FFFFFF]exit to their position`);
}

// ===========================================================================

function deleteHouseCommand(command, params, client) {
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

	if(!getHouseData(houseId)) {
		messagePlayerError("House not found!");
		return false;
	}
	tempHouseData = getHouseData(houseId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]deleted house [#11CC11]${getHouseData(houseId).description}`);
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

	deleteHouseEntrancePickup(houseId);
	deleteHouseExitPickup(houseId);

	deleteHouseEntranceBlip(houseId);
	deleteHouseExitBlip(houseId);

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
	let closest = getServerData().houses[0].locations[0];
	for(let i in houses) {
		for(let j in getServerData().houses[i].locations) {
			if(getDistance(position, houses[i].locations[j].entrancePosition) <= getDistance(position, closest.entrancePosition)) {
				closest = getServerData().houses[i].locations[j];
			}
		}
	}
	return closest;
}

// ===========================================================================

function getPlayerHouse(client) {
	if(doesEntityDataExist(client, "ag.inHouse")) {
		return getEntityData(client, "ag.inHouse");
	}

	return false;
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
		if(tempHouseData.databaseId == 0) {
			let dbQueryString = `INSERT INTO house_main (house_server, house_description, house_owner_type, house_owner_id, house_locked, house_entrance_pos_x, house_entrance_pos_y, house_entrance_pos_z, house_entrance_rot_z, house_entrance_int, house_entrance_vw, house_exit_pos_x, house_exit_pos_y, house_exit_pos_z, house_exit_rot_z, house_exit_int, house_exit_vw, house_has_interior) VALUES (${getServerId()}, '${safeHouseDescription}', ${tempHouseData.ownerType}, ${tempHouseData.ownerId}, ${boolToInt(tempHouseData.locked)}, ${tempHouseData.entrancePosition.x}, ${tempHouseData.entrancePosition.y}, ${tempHouseData.entrancePosition.z}, ${tempHouseData.entranceRotation}, ${tempHouseData.entranceInterior}, ${tempHouseData.entranceDimension}, ${tempHouseData.exitPosition.x}, ${tempHouseData.exitPosition.y}, ${tempHouseData.exitPosition.z}, ${tempHouseData.exitRotation}, ${tempHouseData.exitInterior}, ${tempHouseData.exitDimension}, ${boolToInt(tempHouseData.hasInterior)})`;

			queryDatabase(dbConnection, dbQueryString);
			getServerData().houses[houseId].databaseId = getDatabaseInsertId(dbConnection);
		} else {

			let dbQueryString =
				`UPDATE house_main SET
					 house_description='${safeHouseDescription}',
					house_owner_type=${tempHouseData.ownerType},
					house_owner_id=${tempHouseData.ownerId},
					house_locked=${boolToInt(tempHouseData.locked)},
					house_entrance_pos_x=${tempHouseData.entrancePosition.x},
					house_entrance_pos_y=${tempHouseData.entrancePosition.y},
					house_entrance_pos_z=${tempHouseData.entrancePosition.z},
					house_entrance_rot_z=${tempHouseData.entranceRotation},
					house_entrance_int=${tempHouseData.entranceInterior},
					house_entrance_vw=${tempHouseData.entranceDimension},
					house_exit_pos_x=${tempHouseData.exitPosition.x},
					house_exit_pos_y=${tempHouseData.exitPosition.y},
					house_exit_pos_z=${tempHouseData.exitPosition.z},
					house_exit_rot_z=${tempHouseData.exitRotation},
					house_exit_int=${tempHouseData.exitInterior},
					house_exit_vw=${tempHouseData.exitDimension},
					house_buy_price=${tempHouseData.buyPrice},
					house_rent_price=${tempHouseData.rentPrice},
					house_has_interior=${boolToInt(tempHouseData.hasInterior)}
				 WHERE house_id=${tempHouseData.databaseId}`;

			//dbQueryString = dbQueryString.trim();
			dbQueryString = dbQueryString.replace(/(?:\r\n|\r|\n|\t)/g, "");

			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
			disconnectFromDatabase(dbConnection);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	logToConsole(LOG_VERBOSE, `[VRR.House]: Saved house '${tempHouseData.description}' to database!`);

	return false;
}

// ===========================================================================

function saveHouseLocationToDatabase(houseId, locationId) {
	let tempHouseLocationData = getHouseData(houseId).locations[locationId];

	console.log(`[VRR.House]: Saving house location ${tempHouseLocationData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		if(tempHouseLocationData.databaseId == 0) {
			let dbQueryString = `INSERT INTO house_loc (house_loc_house, house_loc_locked, house_loc_entrance_pos_x, house_loc_entrance_pos_y, house_loc_entrance_pos_z, house_loc_entrance_rot_z, house_loc_entrance_int, house_loc_entrance_vw, house_loc_exit_pos_x, house_loc_exit_pos_y, house_loc_exit_pos_z, house_loc_exit_rot_z, house_loc_exit_int, house_loc_exit_vw) VALUES (${tempHouseLocationData.databaseId}, ${boolToInt(tempHouseLocationData.locked)}, ${tempHouseLocationData.entrancePosition.x}, ${tempHouseLocationData.entrancePosition.y}, ${tempHouseLocationData.entrancePosition.z}, ${tempHouseLocationData.entranceRotation}, ${tempHouseLocationData.entranceInterior}, ${tempHouseLocationData.entranceDimension}, ${tempHouseLocationData.exitPosition.x}, ${tempHouseLocationData.exitPosition.y}, ${tempHouseLocationData.exitPosition.z}, ${tempHouseLocationData.exitRotation}, ${tempHouseLocationData.exitInterior}, ${tempHouseLocationData.exitDimension})`;
			queryDatabase(dbConnection, dbQueryString);
			tempHouseLocationData.databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE house_loc SET house_loc_house=${getHouseData(houseId).databaseId}', house_loc_locked=${tempHouseLocationData.locked}, house_loc_entrance_pos_x=${tempHouseLocationData.entrancePosition.x}, house_loc_entrance_pos_y=${tempHouseLocationData.entrancePosition.y}, house_loc_entrance_pos_z=${tempHouseLocationData.entrancePosition.z}, house_loc_entrance_rot_z=${tempHouseLocationData.entranceRotation}, house_loc_entrance_int=${tempHouseLocationData.entranceInterior}, house_loc_entrance_vw=${tempHouseLocationData.entranceDimension}, house_loc_exit_pos_x=${tempHouseLocationData.exitPosition.x}, house_loc_exit_pos_y=${tempHouseLocationData.exitPosition.y}, house_loc_exit_pos_z=${tempHouseLocationData.exitPosition.z}, house_loc_exit_rot_z=${tempHouseData.exitRotation}, house_loc_exit_int=${tempHouseLocationData.exitInterior}, house_loc_exit_vw=${tempHouseLocationData.exitDimension} WHERE house_loc_id=${tempHouseLocationData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[VRR.house]: Saved house location ${tempHouseLocationData.databaseId} to database!`);

	return false;
}

// ---------------------------------------------------------------------------

function createAllHousePickups() {
	for(let i in getServerData().houses) {
		for(let j in getServerData().houses[i].locations) {
			createHouseLocationEntrancePickup(i, j);
			createHouseLocationExitPickup(i, j);
		}
	}
}

// ===========================================================================

function createAllHouseBlips() {
	for(let i in getServerData().houses) {
		for(let j in getServerData().houses[i].locations) {
			createHouseLocationEntranceBlip(i, j);
			createHouseLocationExitBlip(i, j);
		}
	}
}

// ===========================================================================

function createHouseEntrancePickup(houseId, locationId) {
	if(getHouseData(houseId).locations[locationId].entrancePickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].house;

		if(getServerData().houses[houseId].entrancePickupModel != 0) {
			pickupModelId = getHouseData(houseId).locations[locationId].entrancePickupModel;
		}

		getHouseData(houseId).locations[locationId].entrancePickup = gta.createPickup(pickupModelId, getHouseData(houseId).locations[locationId].entrancePosition);
		getHouseData(houseId).locations[locationId].entrancePickup.onAllDimensions = false;
		getHouseData(houseId).locations[locationId].entrancePickup.dimension = getHouseData(houseId).locations[locationId].entranceDimension;
		getHouseData(houseId).locations[locationId].entrancePickup.setData("ag.owner.type", VRR_PICKUP_HOUSE_ENTRANCE, false);
		getHouseData(houseId).locations[locationId].entrancePickup.setData("ag.owner.id", houseId, false);
		getHouseData(houseId).locations[locationId].entrancePickup.setData("ag.label.type", VRR_LABEL_HOUSE, true);
		getHouseData(houseId).locations[locationId].entrancePickup.setData("ag.label.name", getHouseData(houseId).description, true);
		getHouseData(houseId).locations[locationId].entrancePickup.setData("ag.label.locked", getHouseData(houseId).locked, true);
		if(getHouseData(houseId).buyPrice > 0) {
			getHouseData(houseId).locations[locationId].entrancePickup.setData("ag.label.price", getHouseData(houseId).buyPrice, true);
		}
		addToWorld(getHouseData(houseId).locations[locationId].entrancePickup);
	}
}

// ===========================================================================

function createHouseEntranceBlip(houseId, locationId) {
	if(getHouseData(houseId).locations[locationId].entranceBlipModel != -1) {
		let blipModelId = getGameConfig().blipSprites[getServerGame()].house;

		if(getServerData().houses[houseId].locations[locationId].entranceBlipModel != 0) {
			blipModelId = getHouseData(houseId).locations[locationId].entranceBlipModel;
		}

		getHouseData(houseId).locations[locationId].entranceBlip = gta.createBlip(getHouseData(houseId).locations[locationId].entrancePosition, blipModelId, 1, getColourByName("houseGreen"));
		getHouseData(houseId).locations[locationId].entranceBlip.onAllDimensions = false;
		getHouseData(houseId).locations[locationId].entranceBlip.dimension = getHouseData(houseId).locations[locationId].entranceDimension;
		getHouseData(houseId).locations[locationId].entranceBlip.setData("ag.owner.type", VRR_BLIP_HOUSE_ENTRANCE, false);
		getHouseData(houseId).locations[locationId].entranceBlip.setData("ag.owner.id", houseId, false);
		addToWorld(getHouseData(houseId).locations[locationId].entranceBlip);
	}
}

// ===========================================================================

function createHouseExitPickup(houseId, locationId) {
	if(getHouseData(houseId).hasInterior) {
		if(getHouseData(houseId).locations[locationId].exitPickupModel != -1) {
			let pickupModelId = getGameConfig().pickupModels[getServerGame()].exit;

			if(getServerData().houses[houseId].locations[locationId].exitPickupModel != 0) {
				pickupModelId = getHouseData(houseId).locations[locationId].exitPickupModel;
			}

			getHouseData(houseId).locations[locationId].exitPickup = gta.createPickup(pickupModelId, getHouseData(houseId).locations[locationId].exitPosition);
			getHouseData(houseId).locations[locationId].exitPickup.onAllDimensions = false;
			getHouseData(houseId).locations[locationId].exitPickup.dimension = getHouseData(houseId).locations[locationId].exitDimension;
			getHouseData(houseId).locations[locationId].exitPickup.setData("ag.owner.type", VRR_PICKUP_HOUSE_EXIT, false);
			getHouseData(houseId).locations[locationId].exitPickup.setData("ag.owner.id", houseId, false);
			getHouseData(houseId).locations[locationId].exitPickup.setData("ag.label.type", VRR_LABEL_EXIT, true);
			addToWorld(getHouseData(houseId).locations[locationId].exitPickup);
		}
	}
}

// ===========================================================================

function createHouseExitBlip(houseId, locationId) {
	if(getHouseData(houseId).hasInterior) {
		if(getHouseData(houseId).locations[locationId].exitBlipModel != -1) {
			let blipModelId = getGameConfig().locations[locationId].blipSprites[getServerGame()].house;

			if(getServerData().houses[houseId].exitBlipModel != 0) {
				blipModelId = getHouseData(houseId).locations[locationId].exitBlipModel;
			}

			getHouseData(houseId).locations[locationId].exitBlip = gta.createBlip(getHouseData(houseId).locations[locationId].exitPosition, blipModelId, 1, getColourByName("houseGreen"));
			getHouseData(houseId).locations[locationId].exitBlip.onAllDimensions = false;
			getHouseData(houseId).locations[locationId].exitBlip.dimension = getHouseData(houseId).locations[locationId].entranceDimension;
			getHouseData(houseId).locations[locationId].exitBlip.setData("ag.owner.type", VRR_BLIP_HOUSE_EXIT, false);
			getHouseData(houseId).locations[locationId].exitBlip.setData("ag.owner.id", houseId, false);
			addToWorld(getHouseData(houseId).locations[locationId].exitBlip);
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
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client)).house;

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

	messagePlayerNormal(client, `🏠 [#11CC11][House Info] [#FFFFFF]Description: [#AAAAAA]${getHouseData(houseId).description}, [#FFFFFF]Owner: [#AAAAAA]${ownerName} (${getHouseOwnerTypeText(getHouseData(houseId).ownerType)}), [#FFFFFF]Locked: [#AAAAAA]${getYesNoFromBool(intToBool(getHouseData(houseId).locked))}, [#FFFFFF]ID: [#AAAAAA]${houseId}/${getHouseData(houseId).databaseId}`);
}

// ===========================================================================

function isPlayerInAnyHouse(client) {
	return doesEntityDataExist(client, "ag.inHouse");
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

function deleteHouseLocationEntrancePickup(houseId) {
	if(getHouseData(houseId).locations[locationId].entrancePickup != null) {
		destroyElement(getHouseData(houseId).locations[locationId].entrancePickup);
		getHouseData(houseId).locations[locationId].entrancePickup = null;
	}
}

// ===========================================================================

function deleteHouseLocationExitPickup(houseId, locationId) {
	if(getHouseData(houseId).locations[locationId].exitPickup != null) {
		destroyElement(getHouseData(houseId).locations[locationId].exitPickup);
		getHouseData(houseId).locations[locationId].exitPickup = null;
	}
}

// ===========================================================================

function deleteHouseLocationEntranceBlip(houseId, locationId) {
	if(getHouseData(houseId).locations[locationId].entranceBlip != null) {
		destroyElement(getHouseData(houseId).locations[locationId].entranceBlip);
		getHouseData(houseId).locations[locationId].entranceBlip = null;
	}
}

// ===========================================================================

function deleteHouseLocationExitBlip(houseId, locationId) {
	if(getHouseData(houseId).locations[locationId].exitBlip != null) {
		destroyElement(getHouseData(houseId).locations[locationId].exitBlip);
		getHouseData(houseId).locations[locationId].exitBlip = null;
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
		deleteHouseExitBlips(i);
		deleteHouseEntranceBlips(i);
		deleteHouseExitPickups(i);
		deleteHouseEntrancePickups(i);
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
	removeEntityData(client, "ag.inHouse");
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