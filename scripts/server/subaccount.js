// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: subaccount.js
// DESC: Provides subaccount (character) functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initSubAccountScript() {
	console.log("[Asshat.SubAccount]: Initializing account script ...");
	addSubAccountCommandHandlers();
	console.log("[Asshat.SubAccount]: Account script initialized!");
}

// ---------------------------------------------------------------------------

function addSubAccountCommandHandlers() {
	console.log("[Asshat.SubAccount]: Adding sub account command handlers ...");
	let subAccountCommands = serverCommands.subAccount;
	for(let i in subAccountCommands) {
		addCommandHandler(subAccountCommands[i].command, subAccountCommands[i].handlerFunction);
	}
	console.log("[Asshat.SubAccount]: Sub Account command handlers added!");
}

// ---------------------------------------------------------------------------

function loadSubAccountFromName(firstName, lastName) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		firstName = escapeDatabaseString(dbConnection, firstName);
		lastName = escapeDatabaseString(dbConnection, lastName);
		let dbQueryString = `SELECT * FROM sacct_main WHERE sacct_name_first = '${firstName}' AND sacct_name_last = '${lastName}' LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			let dbAssoc = fetchQueryAssoc(dbQuery);
			freeDatabaseQuery(dbQuery);
			return new serverClasses.subAccountData(dbAssoc);
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function loadSubAccountFromId(subAccountId) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM sacct_main WHERE sacct_id = ${subAccountId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			let dbAssoc = fetchQueryAssoc(dbQuery);
			freeDatabaseQuery(dbQuery);
			return new serverClasses.subAccountData(dbAssoc);
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function loadSubAccountsFromAccount(accountId) {
	let tempSubAccounts = [];
	let dbAssoc = false;
	if(accountId > 0) {
		let dbConnection = connectToDatabase();
		if(dbConnection) {
			let dbQueryString = `SELECT * FROM sacct_main WHERE sacct_acct = ${accountId} AND sacct_server = ${serverId}`;
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			if(dbQuery) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempSubAccount = new serverClasses.subAccountData(dbAssoc);
					tempSubAccounts.push(tempSubAccount);
				}
				freeDatabaseQuery(dbQuery);
			}
			disconnectFromDatabase(dbConnection);
		}
	}
	
	return tempSubAccounts;
}

// ---------------------------------------------------------------------------

function saveSubAccountToDatabase(subAccountData) {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let dbQueryString = `UPDATE sacct_main SET sacct_pos_x=${subAccountData.spawnPosition.x}, sacct_pos_y=${subAccountData.spawnPosition.y}, sacct_pos_z=${subAccountData.spawnPosition.z}, sacct_angle=${subAccountData.spawnHeading}, sacct_skin=${subAccountData.skin}, sacct_cash=${subAccountData.cash}, sacct_job=${subAccountData.job} WHERE sacct_id=${subAccountData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		//freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
    }
}

// ---------------------------------------------------------------------------

function createSubAccount(accountId, firstName, lastName, skinId, dateOfBirth, placeOfOrigin) {
	console.log(`[Asshat.Account] Attempting to create subaccount ${firstName} ${lastName} in database`);
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let safeFirstName = escapeDatabaseString(dbConnection, firstName);
		let safeLastName = escapeDatabaseString(dbConnection, lastName);
		let safePlaceOfOrigin = escapeDatabaseString(dbConnection, placeOfOrigin);

		let dbQuery = queryDatabase(dbConnection, `INSERT INTO sacct_main (sacct_acct, sacct_name_first, sacct_name_last, sacct_skin, sacct_origin, sacct_when_born, sacct_pos_x, sacct_pos_y, sacct_pos_z, sacct_angle, sacct_cash, sacct_server, sacct_health, sacct_when_made, sacct_when_lastlogin) VALUES (${accountId}, '${safeFirstName}', '${safeLastName}', ${skinId}, '${safePlaceOfOrigin}', '${dateOfBirth}', ${getServerConfig().newCharacter.spawnPosition.x}, ${getServerConfig().newCharacter.spawnPosition.y}, ${getServerConfig().newCharacter.spawnPosition.z}, ${getServerConfig().newCharacter.spawnHeading}, ${getServerConfig().newCharacter.money}, ${serverId}, 100, UNIX_TIMESTAMP(), 0)`);
		if(getDatabaseInsertId(dbConnection) > 0) {
			return loadSubAccountFromId(getDatabaseInsertId(dbConnection));
		}
		disconnectFromDatabase(dbConnection);
	}

	return false;
}

// ---------------------------------------------------------------------------

function showCharacterSelectToClient(client) {
	if(getServerConfig().useGUI) {
		getClientData(client).currentSubAccount = 0;
		let tempSubAccount = getClientData(client).subAccounts[0];
		triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	} else {	
		//let emojiNumbers = ["➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒"];
		//let emojiNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
		messageClientNormal(client, `You have the following characters. Use /usechar <id> to select one:`, getColourByName("teal"));
		getClientData(client).subAccounts.forEach(function(subAccount, index) {
			messageClientNormal(client, `${index+1} • [#CCCCCC]${subAccount.firstName} ${subAccount.lastName}`);
		});
	}
}

// ---------------------------------------------------------------------------

function checkNewCharacter(client, firstName, lastName, dateOfBirth, placeOfOrigin, skinId) {
	if(areParamsEmpty(firstName)) {
		triggerNetworkEvent("ag.newCharacterFailed", client, "First name cannot be blank!");
		return false;
	}
	firstName = firstName.trim();

	if(areParamsEmpty(lastName)) {
		triggerNetworkEvent("ag.newCharacterFailed", client, "Last name cannot be blank!");
		return false;
	}
	lastName = lastName.trim();

	if(areParamsEmpty(dateOfBirth)) {
		triggerNetworkEvent("ag.newCharacterFailed", client, "Date of birth cannot be blank!");
		return false;
	}

	if(areParamsEmpty(placeOfOrigin)) {
		triggerNetworkEvent("ag.newCharacterFailed", client, "Place of origin cannot be blank!");
		return false;
	}

	if(areParamsEmpty(skinId)) {
		triggerNetworkEvent("ag.newCharacterFailed", client, "Invalid skin!");
		return false;
	}

	let subAccountData = createSubAccount(getClientData(client).accountData.databaseId, firstName, lastName, skinId, dateOfBirth, placeOfOrigin);
	if(!subAccountData) {
		if(getServerConfig().useGUI) {
			triggerNetworkEvent("ag.newCharacterFailed", client, "Something went wrong. Your character could not be created!");
		} else {
			messageClientAlert(client, "Something went wrong. Your character could not be created!");
		}
		messageClientAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getClientData(client).subAccounts = loadSubAccountsFromAccount(getClientData(client).accountData.databaseId);
	getClientData(client).currentSubAccount = 0;
	let tempSubAccount = getClientData(client).subAccounts[0];
	showCharacterSelectToClient(client);
}
addNetworkHandler("ag.checkNewCharacter", checkNewCharacter);

// ---------------------------------------------------------------------------

addNetworkHandler("ag.previousCharacter", function(client) {
	if(getClientData(client).subAccounts.length > 1) {
		if(getClientData(client).currentSubAccount <= 0) {
			getClientData(client).currentSubAccount = getClientData(client).subAccounts.length-1;
		} else {
			getClientData(client).currentSubAccount--;
		}

		let subAccountId = getClientData(client).currentSubAccount;
		let tempSubAccount = getClientData(client).subAccounts[subAccountId];
		triggerNetworkEvent("ag.switchCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.nextCharacter", function(client) {
	if(getClientData(client).subAccounts.length > 1) {
		if(getClientData(client).currentSubAccount >= getClientData(client).subAccounts.length-1) {
			getClientData(client).currentSubAccount = 0;
		} else {
			getClientData(client).currentSubAccount++;
		}

		let subAccountId = getClientData(client).currentSubAccount;
		let tempSubAccount = getClientData(client).subAccounts[subAccountId];
		triggerNetworkEvent("ag.switchCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	}
});

// ---------------------------------------------------------------------------

function selectCharacter(client, characterId = -1) {
	if(getServerConfig().useGUI) {
		triggerNetworkEvent("ag.characterSelectSuccess", client);
	}

	if(characterId != -1) {
		getClientData(client).currentSubAccount = characterId;
	}

	let tempSubAccount = getClientCurrentSubAccount(client);
	spawnPlayer(client, tempSubAccount.spawnPosition, tempSubAccount.spawnHeading, tempSubAccount.skin);

	messageClientAlert(client, `You are now playing as: [#0099FF]${tempSubAccount.firstName} ${tempSubAccount.lastName}`, getColourByName("white"));
	messageClientNormal(client, "This server is in early development and may restart at any time for updates.", getColourByName("orange"));
	messageClientNormal(client, "Please report any bugs using /bug and suggestions using /idea", getColourByName("yellow"));
	triggerNetworkEvent("ag.restoreCamera", client);
	setEntityData(client, "ag.spawned", true, true);
	setEntityData(client, "ag.position", tempSubAccount.spawnPosition, true);
	setEntityData(client, "ag.heading", tempSubAccount.spawnHeading, true);

	if(isGTAIV()) {
		triggerNetworkEvent("ag.iv.syncPosition", client, true);
		spawnAllVehicles();
	}
}
addNetworkHandler("ag.selectCharacter", selectCharacter);