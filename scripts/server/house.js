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
	//createAllHousePickups();
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
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM house_main WHERE house_server = ${serverId}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempHouseData = new serverClasses.houseData(dbAssoc);
					tempHouses.push(tempHouseData);
					console.log(`[Asshat.House]: House '${tempHouseData.databaseId}' loaded!`);
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
		if(tempHouseData.databaseId == 0) {
			let dbQueryString = `INSERT INTO house_main (house_server, house_description, house_owner_type, house_owner_id, house_locked, house_entrance_pos_x, house_entrance_pos_y, house_entrance_pos_z, house_entrance_rot_z, house_entrance_int, house_entrance_vw, house_exit_pos_x, house_exit_pos_y, house_exit_pos_z, house_exit_rot_z, house_exit_int, house_exit_vw) VALUES ('${tempHouseData.description}', ${tempHouseData.ownerType}, ${tempHouseData.ownerId}, ${boolToInt(tempHouseData.locked)}, ${tempHouseData.entrancePosition.x}, ${tempHouseData.entrancePosition.y}, ${tempHouseData.entrancePosition.z}, ${tempHouseData.entranceRotation}, ${tempHouseData.entranceInterior}, ${tempHouseData.entranceDimension}, ${tempHouseData.exitPos.x}, ${tempHouseData.exitPos.y}, ${tempHouseData.exitPos.z}, ${tempHouseData.exitHeading}, ${tempHouseData.exitInterior}, ${tempHouseData.exitDimension})`;
			queryDatabase(dbConnection, dbQueryString);
			getServerData().houses[houseId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE house_main SET house_description=${tempHouseData.description}, house_owner_type=${tempHouseData.ownerType}, house_owner_id=${tempHouseData.ownerId}, house_locked=${boolToInt(tempHouseData.locked)}, house_entrance_pos_x=${tempHouseData.entrancePosition.x}, house_entrance_pos_y=${tempHouseData.entrancePosition.y}, house_entrance_pos_z=${tempHouseData.entrancePosition.z}, house_entrance_rot_z=${tempHouseData.entranceRotation}, house_entrance_int=${tempHouseData.entranceInterior}, house_entrance_vw=${tempHouseData.entranceDimension}, house_exit_pos_x=${tempHouseData.exitPosition.x}, house_exit_pos_y=${tempHouseData.exitPosition.y}, house_exit_pos_z=${tempHouseData.exitPosition.z}, house_exit_rot_z=${tempHouseData.exitRotation}, house_exit_int=${tempHouseData.exitInterior}, house_exit_vw=${tempHouseData.exitDimension} WHERE house_id=${tempHouseData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Business]: Saved house '${tempHouseData.databaseId}' to database!`);

	return false;	
}

// ---------------------------------------------------------------------------

function createAllHousePickups() {
	for(let i in getServerData().houses) {
		getServerData().houses[i].pickup = gta.createPickup(getServerConfig().pickupModels[getServerGame()].house, getServerData().houses[i].entrancePosition);
		getServerData().houses[i].pickup.setData("ag.ownerType", AG_PICKUP_HOUSE, true);
        getServerData().houses[i].pickup.setData("ag.ownerId", i, true);
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
		messageClientError(client, "Business not found!");
		return false;
	}

	let ownerName = "Unknown";
	switch(getHouseData(houseId).ownerType) {
		case AG_HOUSEOWNER_CLAN:
			ownerName = getClanData(getBusinessData(houseId).ownerId).name;
			break;

		case AG_BIZOWNER_PLAYER:
			let accountData = loadAccountFromId(getBusinessData(houseId).ownerId);
			ownerName = `${accountData.name} [${accountData.databaseId}]`;
			break;

		case AG_BIZOWNER_NONE:
			ownerName = "None"
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