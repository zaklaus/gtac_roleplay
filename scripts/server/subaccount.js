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
	console.log("[Asshat.SubAccount]: Initializing subaccount script ...");
	console.log("[Asshat.SubAccount]: SubAccount script initialized!");
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
			let dbQueryString = `SELECT * FROM sacct_main WHERE sacct_acct = ${accountId} AND sacct_server = ${getServerId()}`;
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
		let dbQueryString = `UPDATE sacct_main SET sacct_pos_x=${subAccountData.spawnPosition.x}, sacct_pos_y=${subAccountData.spawnPosition.y}, sacct_pos_z=${subAccountData.spawnPosition.z}, sacct_angle=${subAccountData.spawnHeading}, sacct_skin=${subAccountData.skin}, sacct_cash=${subAccountData.cash}, sacct_job=${subAccountData.job}, sacct_int=${subAccountData.interior}, sacct_vw=${subAccountData.dimension} WHERE sacct_id=${subAccountData.databaseId}`;
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

		let dbQuery = queryDatabase(dbConnection, `INSERT INTO sacct_main (sacct_acct, sacct_name_first, sacct_name_last, sacct_skin, sacct_origin, sacct_when_born, sacct_pos_x, sacct_pos_y, sacct_pos_z, sacct_angle, sacct_cash, sacct_server, sacct_health, sacct_when_made, sacct_when_lastlogin) VALUES (${accountId}, '${safeFirstName}', '${safeLastName}', ${skinId}, '${safePlaceOfOrigin}', '${dateOfBirth}', ${getServerConfig().newCharacter.spawnPosition.x}, ${getServerConfig().newCharacter.spawnPosition.y}, ${getServerConfig().newCharacter.spawnPosition.z}, ${getServerConfig().newCharacter.spawnHeading}, ${getServerConfig().newCharacter.money}, ${getServerId()}, 100, UNIX_TIMESTAMP(), 0)`);
		if(getDatabaseInsertId(dbConnection) > 0) {
			return loadSubAccountFromId(getDatabaseInsertId(dbConnection));
		}
		disconnectFromDatabase(dbConnection);
	}

	return false;
}

// ---------------------------------------------------------------------------

function showCharacterSelectToClient(client) {
	getPlayerData(client).switchingCharacter = true;

	if(doesPlayerHaveAutoSelectLastCharacterEnabled(client)) {
		if(getPlayerData().subAccounts != null) {
			if(getPlayerData().subAccounts.length > 0) {
				selectCharacter(client, getPlayerLastUsedSubAccount(client));
				return true;
			}
		}
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		getPlayerData(client).currentSubAccount = 0;
		let tempSubAccount = getPlayerData(client).subAccounts[0];
		triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the character select GUI`);
	} else {	
		//let emojiNumbers = ["➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒"];
		//let emojiNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
		//let emojiNumbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
		messagePlayerNormal(client, `You have the following characters. Use /usechar <id> to select one:`, getColourByName("teal"));
		getPlayerData(client).subAccounts.forEach(function(subAccount, index) {
			messagePlayerNormal(client, `${index+1} • [#AAAAAA]${subAccount.firstName} ${subAccount.lastName}`);
		});
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the character select/list message (GUI disabled)`);
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

	if(!skinId) {
		skinId = getServerConfig().newCharacter.skin;
	}

	let subAccountData = createSubAccount(getPlayerData(client).accountData.databaseId, firstName, lastName, skinId, dateOfBirth, placeOfOrigin);
	if(!subAccountData) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.newCharacterFailed", client, "Something went wrong. Your character could not be created!");
		} else {
			messagePlayerAlert(client, "Something went wrong. Your character could not be created!");
		}
		messagePlayerAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getPlayerData(client).subAccounts = loadSubAccountsFromAccount(getPlayerData(client).accountData.databaseId);
	getPlayerData(client).currentSubAccount = 0;
	let tempSubAccount = getPlayerData(client).subAccounts[0];
	showCharacterSelectToClient(client);
}
addNetworkHandler("ag.checkNewCharacter", checkNewCharacter);

// ---------------------------------------------------------------------------

addNetworkHandler("ag.previousCharacter", function(client) {
	if(getPlayerData(client).subAccounts.length > 1) {
		if(getPlayerData(client).currentSubAccount <= 0) {
			getPlayerData(client).currentSubAccount = getPlayerData(client).subAccounts.length-1;
		} else {
			getPlayerData(client).currentSubAccount--;
		}

		let subAccountId = getPlayerData(client).currentSubAccount;
		let tempSubAccount = getPlayerData(client).subAccounts[subAccountId];
		triggerNetworkEvent("ag.switchCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.nextCharacter", function(client) {
	if(getPlayerData(client).subAccounts.length > 1) {
		if(getPlayerData(client).currentSubAccount >= getPlayerData(client).subAccounts.length-1) {
			getPlayerData(client).currentSubAccount = 0;
		} else {
			getPlayerData(client).currentSubAccount++;
		}

		let subAccountId = getPlayerData(client).currentSubAccount;
		let tempSubAccount = getPlayerData(client).subAccounts[subAccountId];
		triggerNetworkEvent("ag.switchCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	}
});

// ---------------------------------------------------------------------------

async function selectCharacter(client, characterId = -1) {
	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		triggerNetworkEvent("ag.characterSelectSuccess", client);
	}

	if(characterId != -1) {
		getPlayerData(client).currentSubAccount = characterId;
	}

	let tempSubAccount = getPlayerCurrentSubAccount(client);
	spawnPlayer(client, tempSubAccount.spawnPosition, tempSubAccount.spawnHeading, tempSubAccount.skin);

	tempSubAccount.lastLogin = new Date().getTime();

	messagePlayerAlert(client, `You are now playing as: [#0099FF]${tempSubAccount.firstName} ${tempSubAccount.lastName}`, getColourByName("white"));
	messagePlayerNormal(client, "This server is in early development and may restart at any time for updates.", getColourByName("orange"));
	messagePlayerNormal(client, "Please report any bugs using /bug and suggestions using /idea", getColourByName("yellow"));
	
	triggerNetworkEvent("ag.restoreCamera", client);
	setEntityData(client, "ag.spawned", true, true);
	while(client.player == null) {};
	
	setTimeout(function() {
		setEntityData(client.player, "ag.spawned", true, true);
		//triggerNetworkEvent("ag.restoreCamera", client);
		setPlayerPosition(client, tempSubAccount.spawnPosition);
		setPlayerHeading(client, tempSubAccount.spawnHeading);
		setPlayerInterior(client, tempSubAccount.interior);
		setPlayerVirtualWorld(client, tempSubAccount.dimension);
		setTimeout(function() {
			updatePlayerCash(client);
		}, 1000);		
	}, client.ping+1000);

	updateAllPlayerNameTags();

	getPlayerData(client).switchingCharacter = false;
	triggerNetworkEvent("ag.jobType", client, tempSubAccount.job);
}
addNetworkHandler("ag.selectCharacter", selectCharacter);

// ---------------------------------------------------------------------------

function switchCharacterCommand(command, params, client) {
	getPlayerCurrentSubAccount(client).spawnPosition = getPlayerPosition(client);
	getPlayerCurrentSubAccount(client).spawnHeading = getPlayerHeading(client);
	getPlayerCurrentSubAccount(client).interior = getPlayerInterior(client);
	getPlayerCurrentSubAccount(client).dimension = getPlayerVirtualWorld(client);

	saveSubAccountToDatabase(getPlayerCurrentSubAccount(client));
	
	resetClientStuff(client);

	client.despawnPlayer();
	showConnectCameraToPlayer(client);
	showCharacterSelectToClient(client);
}

// ---------------------------------------------------------------------------

function newCharacterCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let firstName = splitParams[0];
	let lastName = splitParams[1];

	checkNewCharacter(client, firstName, lastName, "01/01/1901", "Liberty City", getServerConfig().newCharacter.skin);	
}

// ---------------------------------------------------------------------------

function useCharacterCommand(command, params, client) {
	if(!getPlayerData(client).switchingCharacter) {
		messagePlayerError(client, "Use /switchchar to save this character and return to the characters screen first!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let characterId = toInteger(params) || 1;

	selectCharacter(client, characterId-1);
}

// ---------------------------------------------------------------------------

function getPlayerLastUsedSubAccount(client) {
	let subAccounts = getPlayerData(client).subAccounts;
	lastUsed = 0;
	for(let i in subAccounts) {
		if(subAccounts[i].lastLogin > subAccounts[lastUsed].lastLogin) {
			lastUsed = i;
		}
	}
	return lastUsed;
}

// ---------------------------------------------------------------------------

function transferCharacterToServer(subAccountDatabaseId, newServerId) {
	quickDatabaseQuery(`UPDATE sacct_main SET sacct_server = ${newServerId}, sacct_skin = ${loadServerConfigFromId(newServerId).newCharacter.skin} WHERE sacct_id = ${subAccountDatabaseId} LIMIT 1;`);
}

// ---------------------------------------------------------------------------

function getCharacterFullName(client) {
	return `${getPlayerCurrentSubAccount(client).firstName} ${getPlayerCurrentSubAccount(client).lastName}`;
}

// ---------------------------------------------------------------------------