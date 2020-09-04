// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: item.js
// DESC: Provides item functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initItemScript() {
	return true;
}

// ---------------------------------------------------------------------------

function addItemCommandHandlers() {
	return true;
}

// ---------------------------------------------------------------------------

function loadItemsFromDatabase() {
	let tempItems = [];
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQuery = dbConnection.query("SELECT * FROM `item_main` WHERE `item_server` = " + getServerGame())
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbFetchAssoc = dbQuery.fetchAssoc()) {
					let tempItemData = getClasses().itemData(dbFetchAssoc);
					tempItems.push(tempItemData);
				}
			}
			dbQuery.free();
		}
		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

