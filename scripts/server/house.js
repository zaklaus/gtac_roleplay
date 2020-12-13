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
		let dbQuery = queryDatabase(dbConnection, "SELECT * FROM `house_main` WHERE `house_server` = " + toString(serverId))
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempHouseData = serverClasses.houseData(dbAssoc);
					tempHouses.push(tempHouseData);
					console.log("[Asshat.House]: Houses '" + toString(tempHouseData.databaseId) + "' loaded!");
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	console.log("[Asshat.House]: " + toString(tempHouses.length) + " houses loaded from database successfully!");
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
	return getServerData().houses.reduce((i, j) => ((i.entrancePosition.distance(position) <= j.entrancePosition.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getPlayerHouse(client) {
	if(doesEntityDataExist("ag.inHouse")) {
		return player.getData("ag.inHouse");
	}

	return false;
}

// ---------------------------------------------------------------------------

function saveAllHousesToDatabase() {

}

// ---------------------------------------------------------------------------

function createAllHousePickups() {
	for(let i in getServerData().houses) {
		getServerData().houses.pickup = createPickup(getServerConfig().housePickupModel, getServerData().houses[i].position);
		getServerData().houses[i].pickup.setData("ag.ownerType", AG_PICKUP_HOUSE, true);
        getServerData().houses[i].pickup.setData("ag.ownerId", i, true);
	}
}

// ---------------------------------------------------------------------------