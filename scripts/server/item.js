// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: item.js
// DESC: Provides item functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initItemScript() {
	return true;
}

// ---------------------------------------------------------------------------

function loadItemsFromDatabase() {
	let tempItems = [];
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM item_main WHERE item_server = ${getServerGame()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbFetchAssoc = fetchQueryAssoc(dbQuery)) {
					let tempItemData = new serverClasses.itemData(dbFetchAssoc);
					tempItems.push(tempItemData);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	return tempItems;
}

// ---------------------------------------------------------------------------

function loadItemTypesFromDatabase() {
	let tempItemTypes = [];
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM item_type WHERE item_type_enabled = 1 AND item_type_server = ${getServerId()}`);
		if(dbQuery) {
			if(getQueryNumRows(dbQuery) > 0) {
				while(dbFetchAssoc = fetchQueryAssoc(dbQuery)) {
					let tempItemTypeData = new serverClasses.itemTypeData(dbFetchAssoc);
					tempItemTypes.push(tempItemTypeData);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	return tempItemTypes;
}

// ---------------------------------------------------------------------------

function dropItemCommand(command, params, client) {

}

// ---------------------------------------------------------------------------

function useItemCommand(command, params, client) {

}

// ---------------------------------------------------------------------------

function pickupItemCommand(command, params, client) {
	let itemId = getClosestItemOnGround(getPlayerPosition(client));

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to pick up is bugged. Please contact an admin.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).type)) {
		messagePlayerError(client, `The item you're trying to pick up is bugged. Please contact an admin.`);
		return false;
	}

	if(getDistance(getPlayerPosition(client), getItemData(itemId).position) > getGlobalConfig().droppedItemPickupRange) {
		messagePlayerError(client, `You're too far away!`);
		return false;
	}

	playerPickupItem(client, itemId);
}

// ---------------------------------------------------------------------------

function dropItemCommand(command, params, client) {
	let itemId = getClosestItemOnGround(getPlayerPosition(client));

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to pick up is bugged. Please contact an admin.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).type)) {
		messagePlayerError(client, `The item you're trying to pick up is bugged. Please contact an admin.`);
		return false;
	}

	if(getDistance(getPlayerPosition(client), getItemData(itemId).position) > getGlobalConfig().droppedItemPickupRange) {
		messagePlayerError(client, `You're too far away!`);
		return false;
	}

	playerDropItem(client, itemId);
}

// ---------------------------------------------------------------------------

function playerUseItem(client, itemIndex) {

}

// ---------------------------------------------------------------------------

function playerDropItem(client, itemIndex) {

}

// ---------------------------------------------------------------------------

function playerPickupItem(client, itemIndex) {

}

// ---------------------------------------------------------------------------