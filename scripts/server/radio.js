// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: radio.js
// DESC: Provides radio station streaming
// TYPE: Server (JavaScript)
// ===========================================================================

let radioStations = [];

// ===========================================================================

function initRadioScript() {
	logToConsole(LOG_INFO, "[Asshat.Radio]: Initializing radio script ...");
    radioStations = loadRadioStationsFromDatabase();
	logToConsole(LOG_INFO, "[Asshat.Radio]: Radio script initialized successfully!");
	return true;
}

// ===========================================================================

function loadRadioStationsFromDatabase() {
	logToConsole(LOG_INFO, "[Asshat.Radio]: Loading radio stations from database ...");
	let dbConnection = connectToDatabase();
	let tempRadioStations = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM radio_main`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempRadioStationData = new serverClasses.radioStationData(dbAssoc);
				tempRadioStations.push(tempRadioStationData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[Asshat.Radio]: ${tempRadioStations.length} radio stations loaded from database successfully!`);
	return tempRadioStations;
}

// ===========================================================================