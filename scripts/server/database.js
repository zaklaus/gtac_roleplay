// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: database.js
// DESC: Provides database handling, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ----------------------------------------------------------------------------

let databaseConfig = {
	host: "158.69.238.64",
	user: "db24053",
	pass: "G3At3d7BsA",
	name: "db24053",
	port: 3306,
	usePersistentConnection: true,
}

let persistentDatabaseConnection = null;

// ----------------------------------------------------------------------------

function initDatabaseScript() {
	console.log("[Asshat.Database]: Initializing database script ...");
	addDatabaseCommandHandlers()
	console.log("[Asshat.Database]: Database script initialized successfully!");
}

// ----------------------------------------------------------------------------

function addDatabaseCommandHandlers() {
	console.log("[Asshat.Database]: Adding database command handlers ...");
	let databaseCommands = serverCommands.database;
	for(let i in databaseCommands) {
		addCommandHandler(databaseCommands[i].command, databaseCommands[i].handlerFunction);
	}
	console.log("[Asshat.Database]: Database command handlers added!");
}

// ----------------------------------------------------------------------------

function connectToDatabase() {
	if(persistentDatabaseConnection == null) {
		console.log("[Asshat.Database] Initializing database connection ...");
		persistentDatabaseConnection = module.mysql.connect(databaseConfig.host, databaseConfig.user, databaseConfig.pass, databaseConfig.name, databaseConfig.port);
		if(persistentDatabaseConnection.error) {
			console.warn("[Asshat.Database] Database connection error: " + String(persistentDatabaseConnection.error));
			persistentDatabaseConnection = null;
			return false;
		}

		console.log("[Asshat.Database] Database connection successful!");
		return persistentDatabaseConnection;	
	} else {
		console.log("[Asshat.Database] Using existing database connection.");
		return persistentDatabaseConnection;
	}
}

// ----------------------------------------------------------------------------

function disconnectFromDatabase(dbConnection) {
	if(!databaseConfig.usePersistentConnection) {
		dbConnection.close();
	}
	return true;
}

// ----------------------------------------------------------------------------

function queryDatabase(dbConnection, queryString) {
	return dbConnection.query(queryString);
}

// ----------------------------------------------------------------------------

function escapeDatabaseString(dbConnection, unsafeString) {
	return dbConnection.escapeString(unsafeString);
}

// ----------------------------------------------------------------------------

function getDatabaseInsertId(dbConnection) {
	return dbConnection.insertId;
}

// ----------------------------------------------------------------------------

function getDatabaseError(dbConnection) {
	return dbConnection.error;
}

// ----------------------------------------------------------------------------

function freeDatabaseQuery(dbQuery) {
	dbQuery.free();
	return;
}

// ----------------------------------------------------------------------------

function fetchQueryAssoc(dbQuery) {
	return dbQuery.fetchAssoc();
}

// ----------------------------------------------------------------------------