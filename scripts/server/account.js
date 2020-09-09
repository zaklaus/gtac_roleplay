// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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
	
	if(isAccountPasswordCorrect(getClientData(client).accountData, hashAccountPassword(client.name, params))) {
		messageClientError(client, "Incorrect username or password!");
		return false;
	}
	
	loginSuccess(client);
	//messageClientSuccess(client, "You have been logged in! Press left CTRL to spawn.");
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
	
	if(!doesPasswordMeetRequirements(params)) {
		return false
	}

	let accountData = createAccount(client.name, params);
	if(!accountData) {
		messageClientError(client, "Something went wrong, and your account could not be created!");
		messageClientAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getClientData(client).accountData = accountData;
	messageClientSuccess(client, "Your account has been created!");
	messageClientAlert(client, "To play on the server, you will need to make a character.");
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

	let tempSubAccount = getClientCurrentSubAccount(client);
	saveSubAccountToDatabase(tempSubAccount);
	
	client.despawnPlayer();
	triggerNetworkEvent("ag.connectCamera", client, serverConfig.connectCameraPosition[server.game], serverConfig.connectCameraLookAt[server.game]);
	triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);	
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
		accountName = dbConnection.escapeString(accountName);
		let dbQueryString = `SELECT * FROM acct_main WHERE acct_name = '${accountName}' LIMIT 1;`;
		let dbQuery = dbConnection.query(dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = dbQuery.fetchAssoc();
				let tempAccountData = new serverClasses.accountData(dbAssoc);

				dbQuery.free();
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
		let dbQuery = dbConnection.query(dbQueryString);
		if(dbQuery) {
			let dbAssoc = dbQuery.fetchAssoc();
			dbQuery.free();
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
		firstName = dbConnection.escapeString(firstName);
		lastName = dbConnection.escapeString(lastName);
		let dbQueryString = `SELECT * FROM sacct_main WHERE sacct_name_first = '${firstName}' AND sacct_name_last = '${lastName}' LIMIT 1;`;
		let dbQuery = dbConnection.query(dbQueryString);
		if(dbQuery) {
			let dbAssoc = dbQuery.fetchAssoc();
			dbQuery.free();
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
		let dbQuery = dbConnection.query(dbQueryString);
		if(dbQuery) {
			let dbAssoc = dbQuery.fetchAssoc();
			dbQuery.free();
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
			let dbQueryString = `SELECT * FROM sacct_main WHERE sacct_acct = ${accountId};`;
			let dbQuery = dbConnection.query(dbQueryString);
			if(dbQuery) {
				while(dbAssoc = dbQuery.fetchAssoc()) {
					let tempSubAccount = new serverClasses.subAccountData(dbAssoc);
					tempSubAccounts.push(tempSubAccount);
				}
				dbQuery.free();
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
	return "asshat.gaming." + String(accountSaltHash) + "." + String(name) + "." + String(password);
}

// ---------------------------------------------------------------------------

function loginSuccess(client) {
	getClientData(client).loggedIn = true;

	if(doesClientHaveStaffPermission(client, "developer") || doesClientHaveStaffPermission(client, "manageServer")) {
		client.administrator = true;
	}

	triggerNetworkEvent("ag.loginSuccess", client);
}

// ---------------------------------------------------------------------------

function saveAccountToDatabase(accountData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) { 
		let safePassword = dbConnection.escapeString(accountData.password);
		let safeStaffTitle = dbConnection.escapeString(accountData.staffTitle);
		let safeEmailAddress = dbConnection.escapeString(accountData.emailAddress);
		//let safeIRCAccount = dbConnection.escapeString(accountData.ircAccount);

		let dbQueryString = `UPDATE acct_main SET acct_pass='${safePassword}', acct_settings=${accountData.settings}, acct_staff_flags=${accountData.flags.admin}, acct_staff_title='${safeStaffTitle}', acct_mod_flags=${String(accountData.flags.moderation)}, acct_discord=${String(accountData.discordAccount)}, acct_email='${safeEmailAddress}' WHERE acct_id=${accountData.databaseId}`;
		let dbQuery = dbConnection.query(dbQueryString);
		//dbQuery.free();
		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

function saveSubAccountToDatabase(subAccountData) {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let dbQueryString = `UPDATE sacct_main SET sacct_pos_x=${subAccountData.spawnPosition.x}, sacct_pos_y=${subAccountData.spawnPosition.y}, sacct_pos_z=${subAccountData.spawnPosition.z}, sacct_angle=${subAccountData.spawnHeading}, sacct_skin=${subAccountData.skin}, sacct_cash=${subAccountData.cash} WHERE sacct_id=${subAccountData.databaseId}`;
		let dbQuery = dbConnection.query(dbQueryString);
		//dbQuery.free();
		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

function createAccount(name, password, email = "") {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let hashedPassword = hashAccountPassword(name, password);
		let safeName = dbConnection.escapeString(name);
		let safeEmail = dbConnection.escapeString(email);

		let dbQuery = dbConnection.query(`INSERT INTO acct_main (acct_name, acct_pass, acct_email) VALUES ('${safeName}', '${hashedPassword}', '${safeEmail}')`);
		if(dbConnection.insertId > 0) {
			return loadAccountFromId(dbConnection.insertId);
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function createSubAccount(accountId, firstName, lastName, skinId, dateOfBirth, placeOfOrigin) {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let safeFirstName = dbConnection.escapeString(firstName);
		let safeLastName = dbConnection.escapeString(lastName);
		let safePlaceOfOrigin = dbConnection.escapeString(placeOfOrigin);

		let dbQuery = dbConnection.query(`INSERT INTO sacct_main (sacct_acct, sacct_name_first, sacct_name_last, sacct_skin, sacct_origin, sacct_when_born, sacct_pos_x, sacct_pos_y, sacct_pos_z, sacct_cash) VALUES (${accountId}, '${safeFirstName}', '${safeLastName}', ${skinId}, '${safePlaceOfOrigin}', '${dateOfBirth}', ${serverConfig.newCharacter.spawnPosition.x}, ${serverConfig.newCharacter.spawnPosition.y}, ${serverConfig.newCharacter.spawnPosition.z}, ${serverConfig.newCharacter.money})`);
		if(dbConnection.insertId > 0) {
			return loadSubAccountFromId(dbConnection.insertId);
		}
		disconnectFromDatabase(dbConnection);
	}

	return false;
}

// ---------------------------------------------------------------------------

addNetworkHandler("ag.checkLogin", function(client, password) {
	let loginAttemptsRemaining = client.getData("ag.loginAttemptsRemaining")-1;

	if(isClientLoggedIn(client)) {
		//messageClientError(client, "You are already logged in!");
		triggerNetworkEvent("ag.loginSuccess", client);
		return false;
	}
	
	if(!isClientRegistered(client)) {
		//messageClientError(client, "Your name is not registered! Use /register to make an account.");
		triggerNetworkEvent("ag.showRegistration", client);
		return false;
	}

	if(areParamsEmpty(password)) {
		//messageClientError(client, "You must enter a password!");
		triggerNetworkEvent("ag.loginFailed", client, "Invalid password! " + String(loginAttemptsRemaining) + " tries remaining.");		
		return false;
	}
	
	if(!isAccountPasswordCorrect(getClientData(client).accountData, hashAccountPassword(client.name, password))) {
		//messageClientError(client, "Invalid password!");
		triggerNetworkEvent("ag.loginFailed", client, "Invalid password! " + String(loginAttemptsRemaining) + " tries remaining.");
		return false;
	}

	loginSuccess(client);

	if(getClientData(client).subAccounts.length == 0) {
		triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No characters");
		client.setData("ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
	} else {
		getClientData(client).currentSubAccount = 0;
		let tempSubAccount = getClientData(client).subAccounts[0];
		triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
	}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.checkRegistration", function(client, password, confirmPassword, emailAddress) {
	console.log("[Asshat.Account]: Checking registration for " + String(client.name));

	if(isClientRegistered(client)) {
		//messageClientError(client, "Your name is already registered!");
		triggerNetworkEvent("ag.showLogin", client);
		return false;
	}

	if(isClientLoggedIn(client)) {
		//messageClientError(client, "You are already logged in!");
		triggerNetworkEvent("ag.loginSuccess", client);
		return false;
	}

	if(areParamsEmpty(password)) {
		triggerNetworkEvent("ag.registrationFailed", client, "Password cannot be blank!");
		return false;
	}

	if(areParamsEmpty(confirmPassword)) {
		triggerNetworkEvent("ag.registrationFailed", client, "Password confirm cannot be blank!");
		return false;
	}

	if(areParamsEmpty(emailAddress)) {
		triggerNetworkEvent("ag.registrationFailed", client, "Email address cannot be blank!");
		return false;
	}

	if(password != confirmPassword) {
		triggerNetworkEvent("ag.registrationFailed", client, "The passwords must match!");
		return false;
	}
	
	if(!doesPasswordMeetRequirements(password)) {
		// Work on this later. Function should return true by default anyway for now.
		triggerNetworkEvent("ag.registrationFailed", client, "Password doesn't meet requirements!");
		return false
	}

	if(!isValidEmailAddress(emailAddress)) {
		// Work on this later. Function should return true by default anyway for now.
		triggerNetworkEvent("ag.registrationFailed", client, "You must put a valid email!");
		return false
	}

	let accountData = createAccount(client.name, password, emailAddress);
	if(!accountData) {
		triggerNetworkEvent("ag.registrationFailed", client, "Something went wrong. Your account could not be created!");
		messageClientAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getClientData(client).accountData = accountData;
	getClientData(client).loggedIn = true;

	messageClientSuccess(client, "Your account has been created!");
	messageClientAlert(client, "To play on the server, you will need to make a character.");
	triggerNetworkEvent("ag.registrationSuccess", client);
	triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No Characters");

	client.setData("ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.checkNewCharacter", function(client, firstName, lastName, dateOfBirth, placeOfOrigin, skinId) {
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
		triggerNetworkEvent("ag.newCharacterFailed", client, "Something went wrong. Your character could not be created!");
		messageClientAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getClientData(client).subAccounts = loadSubAccountsFromAccount(getClientData(client).accountData.databaseId);
	triggerNetworkEvent("ag.newCharacterSuccess", client);

	getClientData(client).currentSubAccount = 0;
	let tempSubAccount = getClientData(client).subAccounts[0];
	triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
});

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

addNetworkHandler("ag.selectCharacter", function(client) {
	triggerNetworkEvent("ag.characterSelectSuccess", client);

	let subAccountId = getClientData(client).currentSubAccount;
	let tempSubAccount = getClientData(client).subAccounts[subAccountId];
	spawnPlayer(client, tempSubAccount.spawnPosition, tempSubAccount.spawnHeading, tempSubAccount.skin);
});

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
	triggerNetworkEvent("ag.connectCamera", client, serverConfig.connectCameraPosition[server.game], serverConfig.connectCameraLookAt[server.game]);
	
	let tempAccountData = loadAccountFromName(client.name);
	let tempSubAccounts = loadSubAccountsFromAccount(tempAccountData.databaseId);
	
	serverData.clients[client.index] = new serverClasses.clientData(client, tempAccountData, tempSubAccounts);

	if(tempAccountData != false) {
		triggerNetworkEvent("ag.showLogin", client);
		//messageClient("Welcome back to Asshat Gaming RP, " + String(client.name) + "! Please /login to continue.", client, serverConfig.colour.byName["white"]);
	} else {
		triggerNetworkEvent("ag.showRegistration", client);
		//messageClient("Welcome to Asshat Gaming RP, " + String(client.name) + "! Please /register to continue.", client, serverConfig.colour.byName["white"]);
	}

	sendAllBlips(client);
}

// ---------------------------------------------------------------------------

function getClientData(client) {
	return serverData.clients[client.index];
}

// ---------------------------------------------------------------------------