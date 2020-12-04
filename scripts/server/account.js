// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: account.js
// DESC: Provides account functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initAccountScript() {
	console.log("[Asshat.Account]: Initializing account script ...");
	addAccountCommandHandlers();
	console.log("[Asshat.Account]: Account script initialized!");
}

// ---------------------------------------------------------------------------

function addAccountCommandHandlers() {
	console.log("[Asshat.Account]: Adding account command handlers ...");
	let accountCommands = serverCommands.account;
	for(let i in accountCommands) {
		addCommandHandler(accountCommands[i].command, accountCommands[i].handlerFunction);
	}
	console.log("[Asshat.Account]: Account command handlers added!");
}

// ---------------------------------------------------------------------------

function loginCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}
	
	if(!isClientRegistered(client)) {
		messageClientError(client, "Your name is not registered! Use /register to make an account.");
		return false;
	}
	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	checkLogin(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function registerCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	if(isClientRegistered(client)) {
		messageClientError(client, "Your name is already registered!");
		return false;
	}
	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
	
	checkRegistration(client, params);
	//getClientData(client).accountData = accountData;
	//messageClientSuccess(client, "Your account has been created!");
	//messageClientAlert(client, "To play on the server, you will need to make a character.");
}

// ---------------------------------------------------------------------------

function changePasswordCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}
	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let oldPassword = splitParams[0];
	let newPassword = splitParams[1];

	if(isAccountPasswordCorrect(getClientData(client).accountData, hashAccountPassword(client.name, oldPassword))) {
		messageClientError(client, "The old password is invalid!");
		return false;
	}
	
	if(!doesPasswordMeetRequirements(newPassword)) {
		messageClientError(client, "The new password must meet the requirements!");
		messageClientInfo(client, "Passwords must have at least one capital letter, one lowercase letter, and one number!");
		return false;
	}
	
	getClientData(client).accountData.password = hashAccountPassword(getClientData(client).accountData.name, params);
	messageClientSuccess(client, "Your password has been changed!");
}

// ---------------------------------------------------------------------------

function switchCharacterCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	getClientCurrentSubAccount(client).spawnPosition = client.player.position;
	getClientCurrentSubAccount(client).spawnHeading = client.player.heading;

	saveSubAccountToDatabase(getClientCurrentSubAccount(client));
	
	client.despawnPlayer();
	showConnectCameraToPlayer(client);
	showCharacterSelectToClient(client);
}

// ---------------------------------------------------------------------------

function newCharacterCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}
	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let firstName = splitParams[0];
	let lastName = splitParams[1];

	checkNewCharacter(client, firstName, lastName, "01/01/1901", "Liberty City", serverConfig.newCharacter.skin);	
}

// ---------------------------------------------------------------------------

function useCharacterCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}
	}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}
	
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let characterId = Number(params) || 1;

	selectCharacter(client, characterId-1);
}

// ---------------------------------------------------------------------------

function isClientLoggedIn(client) {
	let loggedIn = getClientData(client).loggedIn;
	return loggedIn;
}

// ---------------------------------------------------------------------------

function isClientRegistered(client) {
	if(getClientData(client).accountData != false) {
		if(getClientData(client).accountData.databaseId != 0) {
			return true;
		}
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function doesPasswordMeetRequirements(password) {
	// Will be added soon
	return true;
}

// ---------------------------------------------------------------------------

function isAccountPasswordCorrect(accountData, password) {
	if(accountData.password == password) {
		return true;
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function loadAccountFromName(accountName) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		accountName = escapeDatabaseString(dbConnection, accountName);
		let dbQueryString = `SELECT * FROM acct_main WHERE acct_name = '${accountName}' LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempAccountData = new serverClasses.accountData(dbAssoc);

				freeDatabaseQuery(dbQuery);
				return tempAccountData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function loadAccountFromId(accountId) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM acct_main WHERE acct_id = ${accountId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			let dbAssoc = fetchQueryAssoc(dbQuery);
			freeDatabaseQuery(dbQuery);
			return new serverClasses.accountData(dbAssoc);
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
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

function getAccountHashingFunction() {
	switch(serverConfig.accountPasswordHash.toLowerCase()) {
		case "md5":
			return module.hashing.md5;
			
		case "sha1":
			return module.hashing.sha1;

		case "sha224":
			return module.hashing.sha224;		
			
		case "sha256":
			return module.hashing.sha256;	

		case "sha384":
			return module.hashing.sha384;	

		case "sha512":
			return module.hashing.sha512;	

		case "ripemd128":
			return module.hashing.ripemd128;	

		case "ripemd160":
			return module.hashing.ripemd160;		

		case "ripemd256":
			return module.hashing.ripemd256;

		case "ripemd320":
			return module.hashing.ripemd320;

		case "whirlpool":
			return module.hashing.whirlpool;			
	}
}

// ---------------------------------------------------------------------------

function isNameRegistered(name) {
	let accountData = loadAccountFromName(name);
	if(accountData.databaseId > 0) {
		return true;
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function hashAccountPassword(name, password) {
	let hashFunction = getAccountHashingFunction();
	let saltedInfo = saltAccountInfo(name, password);
	return hashFunction(saltedInfo);
}

// ---------------------------------------------------------------------------

function saltAccountInfo(name, password) {
	return "ag.gaming." + String(accountSaltHash) + "." + String(name) + "." + String(password);
}

// ---------------------------------------------------------------------------

function loginSuccess(client) {
	getClientData(client).loggedIn = true;

	if(doesClientHaveStaffPermission(client, "developer") || doesClientHaveStaffPermission(client, "manageServer")) {
		client.administrator = true;
	}

	if(serverConfig.useGUI) {
		triggerNetworkEvent("ag.loginSuccess", client);
	}
}

// ---------------------------------------------------------------------------

function saveAccountToDatabase(accountData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) { 
		let safePassword = escapeDatabaseString(dbConnection, accountData.password);
		let safeStaffTitle = escapeDatabaseString(dbConnection, accountData.staffTitle);
		let safeEmailAddress = escapeDatabaseString(dbConnection, accountData.emailAddress);
		//let safeIRCAccount = dbConnection.escapeString(accountData.ircAccount);

		let dbQueryString = `UPDATE acct_main SET acct_pass='${safePassword}', acct_settings=${accountData.settings}, acct_staff_flags=${accountData.flags.admin}, acct_staff_title='${safeStaffTitle}', acct_mod_flags=${String(accountData.flags.moderation)}, acct_discord=${String(accountData.discordAccount)}, acct_email='${safeEmailAddress}' WHERE acct_id=${accountData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		//freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

function saveSubAccountToDatabase(subAccountData) {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let dbQueryString = `UPDATE sacct_main SET sacct_pos_x=${subAccountData.spawnPosition.x}, sacct_pos_y=${subAccountData.spawnPosition.y}, sacct_pos_z=${subAccountData.spawnPosition.z}, sacct_angle=${subAccountData.spawnHeading}, sacct_skin=${subAccountData.skin}, sacct_cash=${subAccountData.cash} WHERE sacct_id=${subAccountData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		//freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

function createAccount(name, password, email = "") {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let hashedPassword = hashAccountPassword(name, password);
		let safeName = escapeDatabaseString(dbConnection, name);
		let safeEmail = escapeDatabaseString(dbConnection, email);

		let dbQuery = queryDatabase(dbConnection, `INSERT INTO acct_main (acct_name, acct_pass, acct_email) VALUES ('${safeName}', '${hashedPassword}', '${safeEmail}')`);
		if(getDatabaseInsertId(dbConnection) > 0) {
			return loadAccountFromId(getDatabaseInsertId(dbConnection));
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function createSubAccount(accountId, firstName, lastName, skinId, dateOfBirth, placeOfOrigin) {
	console.log(`[Asshat.Account] Attempting to create subaccount ${firstName} ${lastName} in database`);
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let safeFirstName = escapeDatabaseString(dbConnection, firstName);
		let safeLastName = escapeDatabaseString(dbConnection, lastName);
		let safePlaceOfOrigin = escapeDatabaseString(dbConnection, placeOfOrigin);

		let dbQuery = queryDatabase(dbConnection, `INSERT INTO sacct_main (sacct_acct, sacct_name_first, sacct_name_last, sacct_skin, sacct_origin, sacct_when_born, sacct_pos_x, sacct_pos_y, sacct_pos_z, sacct_angle, sacct_cash, sacct_server) VALUES (${accountId}, '${safeFirstName}', '${safeLastName}', ${skinId}, '${safePlaceOfOrigin}', '${dateOfBirth}', ${serverConfig.newCharacter.spawnPosition.x}, ${serverConfig.newCharacter.spawnPosition.y}, ${serverConfig.newCharacter.spawnPosition.z}, ${serverConfig.newCharacter.spawnHeading}, ${serverConfig.newCharacter.money}, ${serverId})`);
		if(getDatabaseInsertId(dbConnection) > 0) {
			return loadSubAccountFromId(getDatabaseInsertId(dbConnection));
		}
		disconnectFromDatabase(dbConnection);
	}

	return false;
}

// ---------------------------------------------------------------------------

function checkLogin(client, password) {
	let loginAttemptsRemaining = client.getData("ag.loginAttemptsRemaining")-1;

	if(isClientLoggedIn(client)) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.loginSuccess", client);
		} else {
			messageClientError(client, "You are already logged in!");
		}
		return false;
	}
	
	if(!isClientRegistered(client)) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.showRegistration", client);
		} else {
			messageClientError(client, "Your name is not registered! Use /register to make an account.");
		}		
		return false;
	}

	if(areParamsEmpty(password)) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.loginFailed", client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);		
		} else {
			messageClientError(client, "You must enter a password!");
		}
		return false;
	}
	
	if(!isAccountPasswordCorrect(getClientData(client).accountData, hashAccountPassword(client.name, password))) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.loginFailed", client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
		} else {
			messageClientError(client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
		}
		return false;
	}

	loginSuccess(client);

	if(getClientData(client).subAccounts.length == 0) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No characters");
			client.setData("ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
		} else {
			messageClientAlert(client, `You have no characters. Use /newchar to make one.`);
		}
	} else {
		showCharacterSelectToClient(client);
	}
}
addNetworkHandler("ag.checkLogin", checkLogin);

// ---------------------------------------------------------------------------

function checkRegistration(client, password, confirmPassword = "", emailAddress = "") {
	console.log("[Asshat.Account]: Checking registration for " + String(client.name));

	if(isClientRegistered(client)) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.showLogin", client);
		} else {
			messageClientError(client, "Your name is already registered!");
		}
		return false;
	}

	if(isClientLoggedIn(client)) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.loginSuccess", client);
		} else {
			messageClientError(client, "You are already logged in!");
		}
		return false;
	}

	if(areParamsEmpty(password)) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.registrationFailed", client, "Password cannot be blank!");
		} else {
			messageClientError(client, "The password cannot be blank!");
		}
		return false;
	}

	if(serverConfig.useGUI) {
		if(areParamsEmpty(confirmPassword)) {
			triggerNetworkEvent("ag.registrationFailed", client, "Password confirm cannot be blank!");
			return false;
		}
	}

	if(serverConfig.useGUI) {
		if(areParamsEmpty(emailAddress)) {
			triggerNetworkEvent("ag.registrationFailed", client, "Email address cannot be blank!");
			return false;
		}
	}

	if(serverConfig.useGUI) {
		if(password != confirmPassword) {
			triggerNetworkEvent("ag.registrationFailed", client, "The passwords must match!");
			return false;
		}
	}
	
	if(!doesPasswordMeetRequirements(password)) {
		if(serverConfig.useGUI) {
			// Work on this later. Function should return true by default anyway for now.
			triggerNetworkEvent("ag.registrationFailed", client, "Password doesn't meet requirements!");
		} else {
			messageClientError(client, "Password doesn't meet requirements!");
		}
		return false
	}

	if(serverConfig.useGUI) {
		if(!isValidEmailAddress(emailAddress)) {
			triggerNetworkEvent("ag.registrationFailed", client, "You must put a valid email!");
			return false
		}
	}

	let accountData = createAccount(client.name, password, emailAddress);
	if(!accountData) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.registrationFailed", client, "Something went wrong. Your account could not be created!");
		} else {
			messageClientAlert(client, "Something went wrong. Your account could not be created!");
		}
		
		messageClientAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getClientData(client).accountData = accountData;
	getClientData(client).loggedIn = true;

	messageClientSuccess(client, "Your account has been created!");
	messageClientAlert(client, "To play on the server, you will need to make a character.");
	
	if(serverConfig.useGUI) {
		triggerNetworkEvent("ag.registrationSuccess", client);
		triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No Characters");
		client.setData("ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
	} else {
		messageClientAlert(client, `You have no characters. Use /newchar to make one.`);
	}
};
addNetworkHandler("ag.checkRegistration", checkRegistration);

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
		if(serverConfig.useGUI) {
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
	if(serverConfig.useGUI) {
		triggerNetworkEvent("ag.characterSelectSuccess", client);
	}

	if(characterId != -1) {
		getClientData(client).currentSubAccount = characterId;
	}

	console.log(getClientData(client).currentSubAccount);

	let tempSubAccount = getClientCurrentSubAccount(client);
	spawnPlayer(client, tempSubAccount.spawnPosition, tempSubAccount.spawnHeading, tempSubAccount.skin);

	messageClientNormal(client, `You are playing as ${tempSubAccount.firstName} ${tempSubAccount.lastName}`, getColourByName("white"));
	messageClientNormal(client, "This server is in early development and may restart at any time for updates.", getColourByName("orange"));
	messageClientNormal(client, "Please report any bugs using /bug and suggestions using /idea", getColourByName("yellow"));
	triggerNetworkEvent("ag.restoreCamera", client);
}
addNetworkHandler("ag.selectCharacter", selectCharacter);

// ---------------------------------------------------------------------------

function isValidEmailAddress(emailAddress) {
	return true;
}

// ---------------------------------------------------------------------------

function saveAllClientsToDatabase() {
	console.log("[Asshat.Account]: Saving all clients to database ...");
	getClients().forEach(function(client) {
		saveClientToDatabase(client);
	});
	console.log("[Asshat.Account]: All clients saved to database successfully!");
}

// ---------------------------------------------------------------------------

function saveClientToDatabase(client) {
	if(getClientData(client) == null) {
		return false;
	}
	
	if(!getClientData(client).loggedIn) {
		return false;
	}

	console.log(`[Asshat.Account]: Saving client ${client.name} to database ...`);
	saveAccountToDatabase(getClientData(client).accountData);
	let subAccountData = getClientCurrentSubAccount(client);
	
	if(client.player) {
		subAccountData.spawnPosition = client.player.position;
		subAccountData.spawnHeading = client.player.heading; 
	}

	saveSubAccountToDatabase(subAccountData);
	console.log(`[Asshat.Account]: Saved client ${client.name} to database successfully!`);
	return true;
}

// ---------------------------------------------------------------------------

function initClient(client) {
	serverData.clients[client.index] = null;
	triggerNetworkEvent("ag.logo", client, serverConfig.showLogo);
	showConnectCameraToPlayer(client);
	clearChatBox(client);
	
	let tempAccountData = loadAccountFromName(client.name);
	let tempSubAccounts = loadSubAccountsFromAccount(tempAccountData.databaseId);
	
	serverData.clients[client.index] = new serverClasses.clientData(client, tempAccountData, tempSubAccounts);

	if(tempAccountData != false) {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.showLogin", client);
		} else {
			messageClient(`Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, client, serverConfig.colour.byName.softGreen);
		}
	} else {
		if(serverConfig.useGUI) {
			triggerNetworkEvent("ag.showRegistration", client);
		} else {
			messageClient(`Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, client, serverConfig.colour.byName.softGreen);
		}
	}

	if(server.game < GAME_GTA_IV) {
		sendAllBlips(client);
	}
}

// ---------------------------------------------------------------------------

function getClientData(client) {
	return serverData.clients[client.index];
}

// ---------------------------------------------------------------------------

function showCharacterSelectToClient(client) {
	if(serverConfig.useGUI) {
		getClientData(client).currentSubAccount = 0;
		let tempSubAccount = getClientData(client).subAccounts[0];
		triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	} else {	
		//let emojiNumbers = ["➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒"];
		//let emojiNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
		messageClientNormal(client, `You have the following characters. Use /usechar <id> to select one:`, serverConfig.colour.byName.teal);
		getClientData(client).subAccounts.forEach(function(subAccount, index) {
			messageClientNormal(client, `${index+1} • [#CCCCCC]${subAccount.firstName} ${subAccount.lastName}`);
		});
	}
}

// ---------------------------------------------------------------------------

