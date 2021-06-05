// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: database.js
// DESC: Provides database handling, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================

let persistentDatabaseConnection = null;

// ===========================================================================

function initDatabaseScript() {
	logToConsole(LOG_INFO, "[Asshat.Database]: Initializing database script ...");
	databaseConfig = loadDatabaseConfiguration();
	logToConsole(LOG_INFO, "[Asshat.Database]: Database script initialized successfully!");
}

// ===========================================================================

function connectToDatabase() {
	if(persistentDatabaseConnection == null) {
		logToConsole(LOG_DEBUG, "[Asshat.Database] Initializing database connection ...");
		persistentDatabaseConnection = module.mysql.connect(databaseConfig.host, databaseConfig.user, databaseConfig.pass, databaseConfig.name, databaseConfig.port);
		if(persistentDatabaseConnection.error) {
			console.warn("[Asshat.Database] Database connection error: " + toString(persistentDatabaseConnection.error));
			persistentDatabaseConnection = null;
			return false;
		}

		logToConsole(LOG_DEBUG, "[Asshat.Database] Database connection successful!");
		return persistentDatabaseConnection;
	} else {
		logToConsole(LOG_DEBUG, "[Asshat.Database] Using existing database connection.");
		return persistentDatabaseConnection;
	}
}

// ===========================================================================

function disconnectFromDatabase(dbConnection) {
	if(!databaseConfig.usePersistentConnection) {
		try {
			dbConnection.close();
			logToConsole(LOG_DEBUG, `[Asshat.Database] Database connection closed successfully`);
		} catch(error) {
			logToConsole(LOG_ERROR, `[Asshat.Database] Database connection could not be closed! (Error: ${error})`);
		}
	}
	return true;
}

// ===========================================================================

function queryDatabase(dbConnection, queryString) {
	logToConsole(LOG_DEBUG, `[Asshat.Database] Query string: ${queryString}`);
	return dbConnection.query(queryString);
}

// ===========================================================================

function escapeDatabaseString(dbConnection, unsafeString = "") {
	if(!dbConnection) {
		dbConnection = connectToDatabase();
	}

	if(typeof unsafeString == "string") {
		return dbConnection.escapeString(unsafeString);
	}
	return unsafeString;
}

// ===========================================================================

function getDatabaseInsertId(dbConnection) {
	return dbConnection.insertId;
}

// ===========================================================================

function getQueryNumRows(dbQuery) {
	return dbQuery.numRows;
}

// ===========================================================================

function getDatabaseError(dbConnection) {
	return dbConnection.error;
}

// ===========================================================================

function freeDatabaseQuery(dbQuery) {
	if(dbQuery != null) {
		dbQuery.free();
	}
	return;
}

// ===========================================================================

function fetchQueryAssoc(dbQuery) {
	return dbQuery.fetchAssoc();
}

// ===========================================================================

function quickDatabaseQuery(queryString) {
	let dbConnection = connectToDatabase();
	let insertId = 0;
	if(dbConnection) {
		logToConsole(LOG_DEBUG, `[Asshat.Database] Query string: ${queryString}`);
		let dbQuery = queryDatabase(dbConnection, queryString);
		if(getDatabaseInsertId(dbConnection)) {
			insertId = getDatabaseInsertId(dbConnection);
			logToConsole(LOG_DEBUG, `[Asshat.Database] Query returned insert id ${insertId}`);
		}

		if(dbQuery) {
			try {
				freeDatabaseQuery(dbQuery);
				logToConsole(LOG_DEBUG, `[Asshat.Database] Query result free'd successfully`);
			} catch(error) {
				logToConsole(LOG_ERROR, `[Asshat.Database] Query result could not be free'd! (Error: ${error})`);
			}
		}

		disconnectFromDatabase(dbConnection);

		if(insertId != 0) {
			return insertId;
		}

		return true;
	}
	return false;
}

// ===========================================================================

function executeDatabaseQueryCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(!targetClient) {
		messagePlayerError(client, "That player was not found!");
		return false;
	}

	if(targetCode == "") {
		messagePlayerError(client, "You didn't enter any code!");
		return false;
	}

	let success = quickDatabaseQuery(params);

	if(!success) {
		messagePlayerAlert(client, `Database query failed to execute: [#AAAAAA]${query}`);
	} else if(typeof success != "boolean") {
		messagePlayeSuccess(client, `Database query successful: [#AAAAAA]${query}`);
		messagePlayerInfo(client, `Returns: ${success}`);
	} else {
		messagePlayeSuccess(client, `Database query successful: [#AAAAAA]${query}`);
	}
	return true;
}

// ===========================================================================

function setConstantsAsGlobalVariablesInDatabase() {
	let dbConnection = connectToDatabase();
	let entries = Object.entries(global);
	for(let i in entries) {
		logToConsole(LOG_DEBUG, `[Asshat.Database] Checking entry ${i} (${entries[i]})`);
		if(toString(i).slice(0, 3).indexOf("AG_") != -1) {
			logToConsole(LOG_DEBUG, `[Asshat.Database] Adding ${i} (${entries[i]}) to database global variables`);
		}
	}
}

// ===========================================================================

function loadDatabaseConfiguration() {
	let databaseConfigFile = loadTextFile("config/database.json");
	return JSON.parse(databaseConfigFile);
}