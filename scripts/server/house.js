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
	serverData.houses = loadHousesFromDatabase();
	createAllHousePickups();
	addHouseCommandHandlers();
	console.log("[Asshat.House]: House script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addHouseCommandHandlers() {
	console.log("[Asshat.House]: Adding house commands!");
	let houseCommands = serverCommands.house;
	for(let i in houseCommands) {
		addCommandHandler(houseCommands[i].command, houseCommands[i].handlerFunction);
	}
	console.log("[Asshat.House]: House commands added!");
	return true;
}

// ---------------------------------------------------------------------------

function loadHousesFromDatabase() {
	console.log("[Asshat.House]: Loading houses from database ...");
	let tempHouses = [];
	let dbConnection = connectToDatabase();
	
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, "SELECT * FROM `house_main` WHERE `house_server` = " + String(serverId))
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbFetchAssoc = fetchQueryAssoc(dbQuery)) {
					let tempHouseData = getClasses().houseData(dbFetchAssoc);
					tempHouses.push(tempHouseData);
					console.log("[Asshat.House]: Houses '" + String(tempHouseData.databaseId) + "' loaded!");
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	console.log("[Asshat.House]: " + String(tempHouses.length) + " houses loaded from database successfully!");
	return tempHouses;
}

// ---------------------------------------------------------------------------

function getHouseDataFromDatabaseId(databaseId) {
	let matchingHouses = serverData.houses.filter(b => b.databaseId == databaseId)
	if(matchingHouses.length == 1) {
		return matchingHouses[0];
	}
	return false;
}

// ---------------------------------------------------------------------------

function getClosestHouseEntrance(position) {
	return serverData.houses.reduce((i, j) => ((i.entrancePosition.distance(position) <= j.entrancePosition.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function isPlayerInAnyBusiness(player) {
	if(player.getData("ag.inHouse")) {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function getPlayerHouse(player) {
	if(player.getData("ag.inHouse")) {
		return player.getData("ag.inHouse");
	}

	return false;
}

// ---------------------------------------------------------------------------

function saveAllHousesToDatabase() {

}

// ---------------------------------------------------------------------------

function createAllHousePickups() {
	for(let i in serverData.houses) {
		serverData.houses.pickup = createPickup(serverConfig.housePickupModel, serverData.houses[i].position);
		serverData.houses[i].pickup.setData("ag.ownerType", AG_PICKUP_HOUSE, true);
        serverData.houses[i].pickup.setData("ag.ownerId", i, true);
	}
}

// ---------------------------------------------------------------------------