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
	console.log("[Asshat.Account]: Account script initialized!");
}

// ---------------------------------------------------------------------------

function loginCommand(command, params, client) {
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

function autoLoginByIPCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("autoLoginIP");
	
	if(isAccountAutoIPLoginEnabled(getClientData(client).accountData)) {
		getClientData(client).accountData.settings = getClientData(client).accountData.settings & ~flagValue;
		messageClientSuccess(client, `You will not be automatically logged in via your current IP (${client.ip})`);
	} else {
		getClientData(client).accountData.settings = getClientData(client).accountData.settings | flagValue;
		messageClientSuccess(client, `You will now be automatically logged in from your current IP (${client.ip})`);
	}
	return true;
}

// ---------------------------------------------------------------------------

function toggleAccountGUICommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("noGUI");
	
	if(!doesPlayerHaveGUIEnabled(client)) {
		getClientData(client).accountData.settings = getClientData(client).accountData.settings & ~flagValue;
		messageClientSuccess(client, `You will now be shown GUI (if enabled on current server)`);
		console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} has toggled GUI on for their account`);
	} else {
		getClientData(client).accountData.settings = getClientData(client).accountData.settings | flagValue;
		messageClientSuccess(client, `You will not be shown GUI anymore. Any GUI stuff will be shown as messages in the chatbox instead.`);
		console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} has toggled GUI off for their account`);
	}

	if(!isClientLoggedIn(client)) {
		if(getClientData().accountData.databaseId != 0) {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				triggerNetworkEvent("ag.showLogin", client);
				console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the login GUI`);
			} else {
				messageClient(`Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, client, getColourByName("softGreen"));
				console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the login message (GUI disabled)`);
			}
		} else {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				triggerNetworkEvent("ag.showRegistration", client);
				console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the register GUI`);
			} else {
				messageClient(`Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, client, getColourByName("softGreen"));
				console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the register message (GUI disabled)`);
			}
		}
	}
	return true;
}

// ---------------------------------------------------------------------------

function registerCommand(command, params, client) {
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

function isClientLoggedIn(client) {
	if(client.console) {
		return true;
	}

	let loggedIn = getClientData(client).loggedIn;
	return loggedIn;
}

// ---------------------------------------------------------------------------

function isClientRegistered(client) {
	if(client.console) {
		return true;
	}

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

function loadAccountFromName(accountName, fullLoad = false) {
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
				if(fullLoad) {
					tempAccountData.keyBinds = loadAccountKeybindsFromDatabase(tempAccountData.databaseId);
					tempAccountData.messages = loadAccountMessagesFromDatabase(tempAccountData.databaseId);
					tempAccountData.notes = loadAccountStaffNotesFromDatabase(tempAccountData.databaseId);
					tempAccountData.contacts = loadAccountContactsFromDatabase(tempAccountData.databaseId);
				}

				return tempAccountData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function loadAccountFromId(accountId, fullLoad = false) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM acct_main WHERE acct_id = ${accountId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			let dbAssoc = fetchQueryAssoc(dbQuery);
			let tempAccountData = new serverClasses.accountData(dbAssoc);
			freeDatabaseQuery(dbQuery);
			if(fullLoad) {
				tempAccountData.keyBinds = loadAccountKeybindsFromDatabase(tempAccountData.databaseId);
				tempAccountData.messages = loadAccountMessagesFromDatabase(tempAccountData.databaseId);
				tempAccountData.notes = loadAccountStaffNotesFromDatabase(tempAccountData.databaseId);
				tempAccountData.contacts = loadAccountContactsFromDatabase(tempAccountData.databaseId);
			}

			return tempAccountData;
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getAccountHashingFunction() {
	switch(toLowerCase(getServerConfig().accountPasswordHash)) {
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
	let accountData = loadAccountFromName(name, true);
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
	return "ag.gaming." + toString(accountSaltHash) + "." + toString(name) + "." + toString(password);
}

// ---------------------------------------------------------------------------

function loginSuccess(client) {
	console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} successfully logged in.`);
	getClientData(client).loggedIn = true;

	if(doesClientHaveStaffPermission(client, "developer") || doesClientHaveStaffPermission(client, "manageServer")) {
		console.warn(`[Asshat.Account] ${getClientDisplayForConsole(client)} has needed permissions and is being given administrator access`);
		client.administrator = true;
	}

	if(getClientData(client).subAccounts.length == 0) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No characters");
			setEntityData(client, "ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the no characters prompt GUI`);
		} else {
			messageClientAlert(client, `You have no characters. Use /newchar to make one.`);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the no characters message (GUI disabled)`);
		}
	} else {
		showCharacterSelectToClient(client);
	}
	
	getClientData(client).accountData.ipAddress = client.ip;
}

// ---------------------------------------------------------------------------

function saveAccountToDatabase(accountData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) { 
		let safePassword = escapeDatabaseString(dbConnection, accountData.password);
		let safeStaffTitle = escapeDatabaseString(dbConnection, accountData.staffTitle);
		let safeEmailAddress = escapeDatabaseString(dbConnection, accountData.emailAddress);
		//let safeIRCAccount = dbConnection.escapetoString(accountData.ircAccount);

		let dbQueryString = `UPDATE acct_main SET acct_pass='${safePassword}', acct_settings=${accountData.settings}, acct_staff_flags=${accountData.flags.admin}, acct_staff_title='${safeStaffTitle}', acct_mod_flags=${toString(accountData.flags.moderation)}, acct_discord=${toString(accountData.discordAccount)}, acct_email='${safeEmailAddress}', acct_ip='${accountData.ipAddress}' WHERE acct_id=${accountData.databaseId}`;
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

function checkLogin(client, password) {
	let loginAttemptsRemaining = getEntityData(client, "ag.loginAttemptsRemaining")-1;

	if(isClientLoggedIn(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginSuccess", client);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} has successfully logged in`);
		} else {
			messageClientError(client, "You are already logged in!");
			console.warn(`[Asshat.Account] ${getClientDisplayForConsole(client)} attempted to login but is already logged in`);
		}
		return false;
	}
	
	if(!isClientRegistered(client)) {
		console.warn(`[Asshat.Account] ${getClientDisplayForConsole(client)} attempted to login but is not registered`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.showRegistration", client);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the register GUI`);
		} else {
			messageClientError(client, "Your name is not registered! Use /register to make an account.");
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the register message (GUI disabled)`);
		}		
		return false;
	}

	if(areParamsEmpty(password)) {
		console.warn(`[Asshat.Account] ${getClientDisplayForConsole(client)} attempted to login but failed (empty password). ${loginAttemptsRemaining} login attempts remaining`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginFailed", client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);	
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the login GUI with ${loginAttemptsRemaining} login attempts remaining alert.`);	
		} else {
			messageClientError(client, `You must enter a password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the login message (GUI disabled) with ${loginAttemptsRemaining} login attempts remaining alert.`);
		}
		return false;
	}
	
	if(!isAccountPasswordCorrect(getClientData(client).accountData, hashAccountPassword(client.name, password))) {
		console.warn(`[Asshat.Account] ${getClientDisplayForConsole(client)} attempted to login but failed (wrong password). ${loginAttemptsRemaining} login attempts remaining`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginFailed", client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the login GUI with ${loginAttemptsRemaining} login attempts remaining alert.`);
		} else {
			messageClientError(client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getClientDisplayForConsole(client)} is being shown the login message (GUI disabled) with ${loginAttemptsRemaining} login attempts remaining alert.`);
		}
		return false;
	}
	
	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		triggerNetworkEvent("ag.loginSuccess", client);
	}

	loginSuccess(client);
}
addNetworkHandler("ag.checkLogin", checkLogin);

// ---------------------------------------------------------------------------

function checkRegistration(client, password, confirmPassword = "", emailAddress = "") {
	console.log("[Asshat.Account]: Checking registration for " + toString(client.name));

	if(isClientRegistered(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.showLogin", client);
		} else {
			messageClientError(client, "Your name is already registered!");
		}
		return false;
	}

	if(isClientLoggedIn(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginSuccess", client);
		} else {
			messageClientError(client, "You are already logged in!");
		}
		return false;
	}

	if(areParamsEmpty(password)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.registrationFailed", client, "Password cannot be blank!");
		} else {
			messageClientError(client, "The password cannot be blank!");
		}
		return false;
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(areParamsEmpty(confirmPassword)) {
			triggerNetworkEvent("ag.registrationFailed", client, "Password confirm cannot be blank!");
			return false;
		}
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(areParamsEmpty(emailAddress)) {
			triggerNetworkEvent("ag.registrationFailed", client, "Email address cannot be blank!");
			return false;
		}
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(password != confirmPassword) {
			triggerNetworkEvent("ag.registrationFailed", client, "The passwords must match!");
			return false;
		}
	}
	
	if(!doesPasswordMeetRequirements(password)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			// Work on this later. Function should return true by default anyway for now.
			triggerNetworkEvent("ag.registrationFailed", client, "Password doesn't meet requirements!");
		} else {
			messageClientError(client, "Password doesn't meet requirements!");
		}
		return false
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(!isValidEmailAddress(emailAddress)) {
			triggerNetworkEvent("ag.registrationFailed", client, "You must put a valid email!");
			return false
		}
	}

	let accountData = createAccount(client.name, password, emailAddress);
	if(!accountData) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
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
	
	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		triggerNetworkEvent("ag.registrationSuccess", client);
		triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No Characters");
		setEntityData(client, "ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
	} else {
		messageClientAlert(client, `You have no characters. Use /newchar to make one.`);
	}
};
addNetworkHandler("ag.checkRegistration", checkRegistration);

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
	
	subAccountData.spawnPosition = getPlayerPosition(client);
	subAccountData.spawnHeading = getPlayerHeading(client);

	saveSubAccountToDatabase(subAccountData);
	console.log(`[Asshat.Account]: Saved client ${client.name} to database successfully!`);
	return true;
}

// ---------------------------------------------------------------------------

function initClient(client) {
	triggerNetworkEvent("ag.guiColour", client, getServerConfig().guiColour[0], getServerConfig().guiColour[1], getServerConfig().guiColour[2]);
	triggerNetworkEvent("ag.logo", client, getServerConfig().showLogo);

	showConnectCameraToPlayer(client);
	messageClient(`Please wait ...`, client, getColourByName("softGreen"));
	
	setTimeout(function() {
		let sessionId = saveSessionToDatabase(client);
		setEntityData(client, "ag.session", sessionId, false);

		clearChatBox(client);
		let tempAccountData = loadAccountFromName(client.name, true);
		let tempSubAccounts = loadSubAccountsFromAccount(tempAccountData.databaseId);
		
		getServerData().clients[client.index] = new serverClasses.clientData(client, tempAccountData, tempSubAccounts);

		if(tempAccountData != false) {
			if(isAccountAutoIPLoginEnabled(tempAccountData) && getClientData(client).accountData.ipAddress == client.ip) {
				messageClientAlert(client, "You have been automatically logged in via IP!");
				loginSuccess(client);
			} else {
				if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
					triggerNetworkEvent("ag.showLogin", client);
				} else {
					messageClient(`Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, client, getColourByName("softGreen"));
				}
			}
		} else {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				triggerNetworkEvent("ag.showRegistration", client);
			} else {
				messageClient(`Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, client, getColourByName("softGreen"));
			}
		}
	}, 2500);

	//if(server.game < GAME_GTA_IV) {
	//	sendAllBlips(client);
	//}
}

// ---------------------------------------------------------------------------

function saveSessionToDatabase(client) {
	// To-do
	return 0;
}

// ---------------------------------------------------------------------------

function createDefaultKeybindsForAccount(accountDatabaseId) {
	for(let i in getServerConfig().defaultKeybinds) {
		quickDatabaseQuery(`INSERT INTO acct_hotkey (acct_hotkey_acct, acct_hotkey_key, acct_hotkey_cmdstr, acct_hotkey_when_added) VALUES (${accountDatabaseId}, ${getServerConfig().defaultKeybinds[i].key}, '${getServerConfig().defaultKeybinds[i].commandString}', UNIX_TIMESTAMP())`);
	}
}

// ---------------------------------------------------------------------------

function loadAccountKeybindsFromDatabase(accountDatabaseID) {
	console.log(`[Asshat.Account]: Loading account keybinds for account ${accountDatabaseID} from database ...`);

	let tempAccountKeybinds = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `acct_hotkey` WHERE `acct_hotkey_enabled` = 1 AND `acct_hotkey_acct` = " + toString(accountDatabaseID));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempAccountKeyBindData = new serverClasses.accountKeybindData(dbAssoc);
					tempAccountKeybinds.push(tempAccountKeybinds);
					console.log(`[Asshat.Account]: Account keybind '${tempAccountKeyBindData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Account]: ${tempAccountKeybinds.length} account keybinds for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountKeybinds;
}

// ---------------------------------------------------------------------------

function loadAccountStaffNotesFromDatabase(accountDatabaseID) {
	console.log(`[Asshat.Account]: Loading account staff notes for account ${accountDatabaseID} from database ...`);

	let tempAccountStaffNotes = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `acct_note` WHERE `acct_note_deleted` = 0 AND `acct_note_acct` = " + toString(accountDatabaseID));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempAccountStaffNoteData = new serverClasses.accountStaffNoteData(dbAssoc);
					tempAccountStaffNotes.push(tempAccountStaffNoteData);
					console.log(`[Asshat.Account]: Account staff note '${tempAccountStaffNoteData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Account]: ${tempAccountStaffNotes.length} account staff notes for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountStaffNotes;
}

// ---------------------------------------------------------------------------

function loadAccountContactsFromDatabase(accountDatabaseID) {
	console.log(`[Asshat.Account]: Loading account contacts for account ${accountDatabaseID} from database ...`);

	let tempAccountContacts = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `acct_contact` WHERE `acct_contact_deleted` = 0 AND `acct_contact_acct` = " + toString(accountDatabaseID));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempAccountContactData = new serverClasses.accountContactData(dbAssoc);
					tempAccountContacts.push(tempAccountContactData);
					console.log(`[Asshat.Account]: Account contact '${tempAccountContactData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Account]: ${tempAccountContacts.length} account contacts for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountContacts;
}

// ---------------------------------------------------------------------------

function loadAccountMessagesFromDatabase(accountDatabaseID) {
	console.log(`[Asshat.Account]: Loading account messages for account ${accountDatabaseID} from database ...`);

	let tempAccountMessages = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `acct_msg` WHERE `acct_msg_deleted` = 0 AND `acct_msg_acct` = " + toString(accountDatabaseID));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempAccountMessageData = new serverClasses.accountContactData(dbAssoc);
					tempAccountMessages.push(tempAccountMessageData);
					console.log(`[Asshat.Account]: Account contact '${tempAccountMessageData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Account]: ${tempAccountMessages.length} account messages for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountMessages;
}

// ---------------------------------------------------------------------------

function isAccountAutoIPLoginEnabled(accountData) {
	let accountSettings = accountData.settings;
	let flagValue = getAccountSettingsFlagValue("autoLoginIP");
	return hasBitFlag(accountSettings, flagValue);
}

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clientReady", function(client) {

});

// ---------------------------------------------------------------------------

function doesPlayerHaveGUIEnabled(client) {
	if(hasBitFlag(getClientData(client).accountData.settings, getAccountSettingsFlagValue("noGUI"))) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function doesPlayerHaveAutoLoginByIPEnabled(client) {
	if(hasBitFlag(getClientData(client).accountData.settings, getAccountSettingsFlagValue("autoLoginIP"))) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------