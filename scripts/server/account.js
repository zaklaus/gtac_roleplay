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
	if(!isPlayerRegistered(client)) {
		messagePlayerError(client, "Your name is not registered! Use /register to make an account.");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	checkLogin(client, params);
	return true;
}

// ---------------------------------------------------------------------------

function autoLoginByIPCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("autoLoginIP");

	if(isAccountAutoIPLoginEnabled(getPlayerData(client).accountData)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerSuccess(client, `You will not be automatically logged in via your current IP (${client.ip})`);
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerSuccess(client, `You will now be automatically logged in from your current IP (${client.ip})`);
	}
	return true;
}

// ---------------------------------------------------------------------------

function autoSelectLastCharacterCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("autoSelectLastCharacter");

	if(doesPlayerHaveAutoSelectLastCharacterEnabled(client)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerSuccess(client, `You will not be automatically spawned as your last used character`);
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerSuccess(client, `You will now be automatically spawned as your last used character`);
	}
	return true;
}

// ---------------------------------------------------------------------------

function toggleAccountGUICommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("noGUI");

	if(!doesPlayerHaveGUIEnabled(client)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerNormal(client, `⚙️ You will now be shown GUI (if enabled on current server)`);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled GUI for their account ON.`);
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerNormal(client, `⚙️ You will not be shown GUI anymore. Any GUI stuff will be shown as messages in the chatbox instead.`);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled GUI for their account OFF.`);
	}

	if(!isPlayerLoggedIn(client)) {
		if(getPlayerData().accountData.databaseId != 0) {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				triggerNetworkEvent("ag.showLogin", client);
				console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI`);
			} else {
				messageClient(`👋 Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, client, getColourByName("softGreen"));
				console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled)`);
			}
		} else {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				triggerNetworkEvent("ag.showRegistration", client);
				console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register GUI`);
			} else {
				messageClient(`👋 Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, client, getColourByName("softGreen"));
				console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register message (GUI disabled)`);
			}
		}
	}
	return true;
}

// ---------------------------------------------------------------------------

function toggleAccountServerLogoCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("noServerLogo");

	if(!doesPlayerHaveLogoEnabled(client)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerNormal(client, `⚙️ You will ${getBoolRedGreenInlineColour(true)}now [#FFFFFF]be shown the server logo (if enabled on current server)`);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled the server logo ON for their account`);
		triggerNetworkEvent("ag.logo", client, true);
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerNormal(client, `⚙️ You will ${getBoolRedGreenInlineColour(false)}not [#FFFFFF]be shown the server logo.`);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled the server logo OFF for their account`);
		triggerNetworkEvent("ag.logo", client, false);
	}

	return true;
}

// ---------------------------------------------------------------------------

// UNFINISHED!
// TO-DO: Make GUI, add command to generate code to add to auth app and command to input code returned by auth app
function toggleAccountTwoFactorAuthCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("twoStepAuth");

	if(getPlayerData(client).emailAddress != "") {
		messagePlayerError(client, "You need to add your email to your account to use two-factor authentication.");
		messagePlayerTip(client, "[#FFFFFF]Use [#AAAAAA]/setemail [#FFFFFF]to add your email.");
		return false;
	}

	if(!isValidEmailAddress(getPlayerData(client).emailAddress)) {
		messagePlayerError(client, "The email you previously added is not valid.");
		messagePlayerTip(client, "[#FFFFFF]Use [#AAAAAA]/setemail [#FFFFFF]to add a valid email.");
		return false;
	}

	if(!doesPlayerHaveTwoFactorAuthEnabled(client)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerSuccess(client, `[#FFFFFF]Use this code to add your account into your authenticator app: [#AAAAAA]${addtoAuthenticatorCode}`);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled two-factor authentication ON for their account`);
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerSuccess(client, `You have turned ${getBoolRedGreenInlineColour(false)}OFF [#FFFFFF]two-factor authentication for login.`);
		console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled two-factor authentication OFF for their account`);
	}
	return true;
}

// ---------------------------------------------------------------------------

function registerCommand(command, params, client) {
	if(isPlayerRegistered(client)) {
		messagePlayerError(client, "Your name is already registered!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	checkRegistration(client, params);
	//getPlayerData(client).accountData = accountData;
	//messagePlayerSuccess(client, "Your account has been created!");
	//messagePlayerAlert(client, "To play on the server, you will need to make a character.");
}

// ---------------------------------------------------------------------------

function changePasswordCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let oldPassword = splitParams[0];
	let newPassword = splitParams[1];

	if(isAccountPasswordCorrect(getPlayerData(client).accountData, hashAccountPassword(client.name, oldPassword))) {
		messagePlayerError(client, "The old password is invalid!");
		return false;
	}

	if(!doesPasswordMeetRequirements(newPassword)) {
		messagePlayerError(client, "The new password must meet the requirements!");
		messagePlayerInfo(client, "Passwords must have at least one capital letter, one lowercase letter, and one number!");
		return false;
	}

	getPlayerData(client).accountData.password = hashAccountPassword(getPlayerData(client).accountData.name, params);
	messagePlayerSuccess(client, "Your password has been changed!");
}

// ---------------------------------------------------------------------------

function setAccountEmailCommand(command, params, client) {
	messagePlayerError(client, `This command is not yet finished and will be available soon!`);
	return false;

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let emailAddress = splitParams[0];

	if(!isValidEmailAddress(emailAddress)) {
		messagePlayerError(client, `The email '${emailAddress} is not valid!`);
		return false;
	}

	// TO-DO: Command (like /verifyemail or use this one for second step too) to input verification code sent to email.
	//getPlayerData(client).accountData.emailAddress = emailAddress;
	messagePlayerSuccess(client, "Your password has been changed!");
}

// ---------------------------------------------------------------------------

function setAccountDiscordCommand(command, params, client) {
	messagePlayerError(client, `This command is not yet finished and will be available soon!`);
	return false;

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let discordName = splitParams[0];

	if(!isValidEmailAddress(emailAddress)) {
		messagePlayerError(client, `The discord '${discordName} is not valid!`);
		return false;
	}

	// TO-DO: Command (like /verifyemail or use this one for second step too) to input verification code sent to email.
	//getPlayerData(client).accountData.emailAddress = emailAddress;
	//messagePlayerSuccess(client, "Your discord account has been attached to your game account!");
}

// ---------------------------------------------------------------------------

function isPlayerLoggedIn(client) {
	if(isConsole(client)) {
		return true;
	}

	if(getPlayerData(client) != null) {
		return getPlayerData(client).loggedIn;
	}

	return false;
}

// ---------------------------------------------------------------------------

function isPlayerRegistered(client) {
	if(isConsole(client)) {
		return true;
	}

	if(getPlayerData(client).accountData != false) {
		if(getPlayerData(client).accountData.databaseId != 0) {
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
		let dbQueryString = `SELECT *, INET_NTOA(acct_ip) AS ipstring FROM acct_main WHERE acct_name = '${accountName}' LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempAccountData = new serverClasses.accountData(dbAssoc);
				if(fullLoad) {
					tempAccountData.keyBinds = loadAccountKeybindsFromDatabase(tempAccountData.databaseId);
					tempAccountData.messages = loadAccountMessagesFromDatabase(tempAccountData.databaseId);
					tempAccountData.notes = loadAccountStaffNotesFromDatabase(tempAccountData.databaseId);
					tempAccountData.contacts = loadAccountContactsFromDatabase(tempAccountData.databaseId);
				}
				freeDatabaseQuery(dbQuery);
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
		let dbQueryString = `SELECT *, INET_NTOA(acct_ip) AS ipstring FROM acct_main WHERE acct_id = ${accountId} LIMIT 1;`;
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
	switch(toLowerCase(getGlobalConfig().accountPasswordHash)) {
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
	console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} successfully logged in.`);
	getPlayerData(client).loggedIn = true;

	if(doesPlayerHaveStaffPermission(client, "developer") || doesPlayerHaveStaffPermission(client, "manageServer")) {
		console.warn(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} has needed permissions and is being given administrator access`);
		client.administrator = true;
	}

	if(getPlayerData(client).subAccounts.length == 0) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No characters");
			setEntityData(client, "ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the no characters prompt GUI`);
		} else {
			messagePlayerAlert(client, `You have no characters. Use /newchar to make one.`);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the no characters message (GUI disabled)`);
		}
	} else {
		showCharacterSelectToClient(client);
	}

	getPlayerData(client).accountData.ipAddress = client.ip;

	sendRemovedWorldObjectsToPlayer(client);
	sendAccountKeyBindsToClient(client);

	message(`👋 ${client.name} has joined the server`, getColourByName("softYellow"));
}

// ---------------------------------------------------------------------------

function saveAccountToDatabase(accountData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safePassword = escapeDatabaseString(dbConnection, accountData.password);
		let safeStaffTitle = escapeDatabaseString(dbConnection, accountData.staffTitle);
		let safeEmailAddress = escapeDatabaseString(dbConnection, accountData.emailAddress);
		//let safeIRCAccount = dbConnection.escapetoString(accountData.ircAccount);

		let dbQueryString = `UPDATE acct_main SET acct_pass='${safePassword}', acct_settings=${accountData.settings}, acct_staff_flags=${accountData.flags.admin}, acct_staff_title='${safeStaffTitle}', acct_mod_flags=${toString(accountData.flags.moderation)}, acct_discord=${toString(accountData.discordAccount)}, acct_email='${safeEmailAddress}', acct_ip=INET_ATON('${accountData.ipAddress}') WHERE acct_id=${accountData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		//freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

function saveAccountKeyBindsDatabase(keyBindData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeCommandString = escapeDatabaseString(dbConnection, keyBindData.commandString);
		if(keyBindData.databaseId == 0) {
			let dbQueryString = `INSERT INTO acct_hotkey (acct_hotkey_cmdstr, acct_hotkey_key, acct_hotkey_down, acct_hotkey_enabled) VALUES ('${safeCommandString}', ${keyBindData.key}, ${boolToInt(keyBindData.keyState)}, ${boolToInt(keyBindData.enabled)}, ${keyBindData.account}`;
			keyBindData.databaseId = getDatabaseInsertId(dbConnection);
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
		} else {
			let dbQueryString = `UPDATE acct_hotkey SET acct_hotkey_cmdstr='${safeCommandString}', acct_hotkey_key=${keyBindData.key}, acct_hotkey_down=${boolToInt(keyBindData.keyState)}, acct_hotkey_enabled=${boolToInt(keyBindData.enabled)} WHERE acct_hotkey_id=${keyBindData.databaseId}`;
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
		}

		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

function saveAccountStaffNotesDatabase(staffNoteData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeNoteContent = escapeDatabaseString(dbConnection, staffNoteData.note);
		if(staffNoteData.databaseId == 0) {
			let dbQueryString = `INSERT INTO acct_note (acct_note_message, acct_note_who_added, acct_note_when_added, acct_note_server, acct_note_acct) VALUES ('${safeNoteContent}', ${staffNoteData.whoAdded}, UNIX_TIMESTAMP(), ${getServerId()}, ${staffNoteData.account}`;
			staffNoteData.databaseId = getDatabaseInsertId(dbConnection);
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
		}

		disconnectFromDatabase(dbConnection);
	}
}

// ---------------------------------------------------------------------------

/*
function saveAccountContactsDatabase(accountContactData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeNoteContent = escapeDatabaseString(dbConnection, accountContactData.note);
		if(accountContactData.databaseId == 0) {
			let dbQueryString = `INSERT INTO acct_contact (acct_contact_note, acct_contact_, acct_note_when_added, acct_note_server, acct_note_acct) VALUES ('${safeNoteContent}', ${staffNoteData.whoAdded}, UNIX_TIMESTAMP(), ${getServerId()}, ${staffNoteData.account}`;
			staffNoteData.databaseId = getDatabaseInsertId(dbConnection);
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
		}// else {
		//	let dbQueryString = `UPDATE acct_hotkey SET acct_hotkey_cmdstr='${safeCommandString}', acct_hotkey_key=${keyBindData.key}, acct_hotkey_down=${boolToInt(keyBindData.keyState)}, acct_hotkey_enabled=${boolToInt(keyBindData.enabled)} WHERE acct_hotkey_id=${keyBindData.databaseId}`;
		//	let dbQuery = queryDatabase(dbConnection, dbQueryString);
		//	freeDatabaseQuery(dbQuery);
		//}

		disconnectFromDatabase(dbConnection);
	}
}
*/

// ---------------------------------------------------------------------------

function createAccount(name, password, email = "") {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let hashedPassword = hashAccountPassword(name, password);
		let safeName = escapeDatabaseString(dbConnection, name);
		let safeEmail = escapeDatabaseString(dbConnection, email);

		let dbQuery = queryDatabase(dbConnection, `INSERT INTO acct_main (acct_name, acct_pass, acct_email) VALUES ('${safeName}', '${hashedPassword}', '${safeEmail}')`);
		if(getDatabaseInsertId(dbConnection) > 0) {
			let accountData = loadAccountFromId(getDatabaseInsertId(dbConnection), true);
			createDefaultKeybindsForAccount(accountData.databaseId);
			return accountData;
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function checkLogin(client, password) {
	let loginAttemptsRemaining = getEntityData(client, "ag.loginAttemptsRemaining")-1;

	if(isPlayerLoggedIn(client)) {
		console.warn(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but is already logged in`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginSuccess", client);
		} else {
			messagePlayerError(client, "You are already logged in!");
		}

		return false;
	}

	if(!isPlayerRegistered(client)) {
		console.warn(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but is not registered`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.showRegistration", client);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register GUI`);
		} else {
			messagePlayerError(client, "Your name is not registered! Use /register to make an account.");
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register message (GUI disabled)`);
		}
		return false;
	}

	if(areParamsEmpty(password)) {
		console.warn(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but failed (empty password). ${loginAttemptsRemaining} login attempts remaining`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginFailed", client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI with ${loginAttemptsRemaining} login attempts remaining alert.`);
		} else {
			messagePlayerError(client, `You must enter a password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled) with ${loginAttemptsRemaining} login attempts remaining alert.`);
		}
		return false;
	}

	if(!isAccountPasswordCorrect(getPlayerData(client).accountData, hashAccountPassword(client.name, password))) {
		console.warn(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but failed (wrong password). ${loginAttemptsRemaining} login attempts remaining`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginFailed", client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI with ${loginAttemptsRemaining} login attempts remaining alert.`);
		} else {
			messagePlayerError(client, `Invalid password! ${loginAttemptsRemaining} tries remaining.`);
			console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled) with ${loginAttemptsRemaining} login attempts remaining alert.`);
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

	if(isPlayerRegistered(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.showLogin", client);
		} else {
			messagePlayerError(client, "Your name is already registered!");
		}
		return false;
	}

	if(isPlayerLoggedIn(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.loginSuccess", client);
		} else {
			messagePlayerError(client, "You are already logged in!");
		}
		return false;
	}

	if(areParamsEmpty(password)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			triggerNetworkEvent("ag.registrationFailed", client, "Password cannot be blank!");
		} else {
			messagePlayerError(client, "The password cannot be blank!");
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
			messagePlayerError(client, "Password doesn't meet requirements!");
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
			messagePlayerAlert(client, "Something went wrong. Your account could not be created!");
		}

		messagePlayerAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getPlayerData(client).accountData = accountData;
	getPlayerData(client).loggedIn = true;

	messagePlayerSuccess(client, "Your account has been created!");
	messagePlayerAlert(client, "To play on the server, you will need to make a character.");

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		triggerNetworkEvent("ag.registrationSuccess", client);
		triggerNetworkEvent("ag.showPrompt", client, "You have no characters. Would you like to make one?", "No Characters");
		setEntityData(client, "ag.prompt", AG_PROMPT_CREATEFIRSTCHAR, false);
	} else {
		messagePlayerAlert(client, `You have no characters. Use /newchar to make one.`);
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
		savePlayerToDatabase(client);
	});
	console.log("[Asshat.Account]: All clients saved to database successfully!");
}

// ---------------------------------------------------------------------------

function savePlayerToDatabase(client) {
	if(getPlayerData(client) == null) {
		return false;
	}

	if(!getPlayerData(client).loggedIn) {
		return false;
	}

	console.log(`[Asshat.Account]: Saving client ${client.name} to database ...`);
	saveAccountToDatabase(getPlayerData(client).accountData);

	if(getPlayerData(client).currentSubAccount != -1) {
		let subAccountData = getPlayerCurrentSubAccount(client);

		if(client.player != null) {
			subAccountData.spawnPosition = getPlayerPosition(client);
			subAccountData.spawnHeading = getPlayerHeading(client);
			subAccountData.interior = getPlayerInterior(client);
			subAccountData.dimension = getPlayerVirtualWorld(client);
		}

		saveSubAccountToDatabase(subAccountData);
	}
	console.log(`[Asshat.Account]: Saved client ${getPlayerDisplayForConsole(client)} to database successfully!`);
	return true;
}

// ---------------------------------------------------------------------------

function initClient(client) {
	if(isConsole(client)) {
		return false;
	}

	triggerNetworkEvent("ag.guiColour", client, getServerConfig().guiColour[0], getServerConfig().guiColour[1], getServerConfig().guiColour[2]);
	triggerNetworkEvent("ag.logo", client, getServerConfig().showLogo);
	triggerNetworkEvent("ag.snow", client, getServerConfig().fallingSnow, getServerConfig().groundSnow);

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
			if(isAccountAutoIPLoginEnabled(tempAccountData) && getPlayerData(client).accountData.ipAddress == client.ip) {
				messagePlayerAlert(client, "You have been automatically logged in via IP!");
				loginSuccess(client);
			} else {
				if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
					console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI.`);
					triggerNetworkEvent("ag.showLogin", client);
				} else {
					console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled).`);
					messageClient(`Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, client, getColourByName("softGreen"));
				}
			}
		} else {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register GUI.`);
				triggerNetworkEvent("ag.showRegistration", client);
			} else {
				console.log(`[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register message (GUI disabled).`);
				messageClient(`Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, client, getColourByName("softGreen"));
			}
		}
	}, 2500);
}

// ---------------------------------------------------------------------------

function saveSessionToDatabase(client) {
	// To-do
	return 0;
}

// ---------------------------------------------------------------------------

function createDefaultKeybindsForAccount(accountDatabaseId) {
	for(let i in getGlobalConfig().defaultKeybinds) {
		console.log(i);
		let dbQueryString = `INSERT INTO acct_hotkey (acct_hotkey_acct, acct_hotkey_key, acct_hotkey_cmdstr, acct_hotkey_when_added, acct_hotkey_down) VALUES (${accountDatabaseId}, ${getGlobalConfig().defaultKeybinds[i].key}, '${getGlobalConfig().defaultKeybinds[i].commandString}', UNIX_TIMESTAMP(), ${boolToInt(getGlobalConfig().defaultKeybinds[i].keyState)})`;
		console.log(dbQueryString);
		quickDatabaseQuery(dbQueryString);
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
		dbQuery = queryDatabase(dbConnection, `SELECT * FROM acct_hotkey WHERE acct_hotkey_enabled = 1 AND acct_hotkey_acct = ${accountDatabaseID}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempAccountKeyBindData = new serverClasses.keyBindData(dbAssoc);
					tempAccountKeybinds.push(tempAccountKeyBindData);
					console.log(`[Asshat.Account]: Account keybind '${tempAccountKeyBindData.databaseId}' (Key ${tempAccountKeyBindData.key} '${sdl.getKeyName(tempAccountKeyBindData.key)}') loaded from database successfully!`);
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

function doesPlayerHaveGUIEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("noGUI"))) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function doesPlayerHaveLogoEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("noServerLogo"))) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function doesPlayerHaveAutoLoginByIPEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("autoLoginIP"))) {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function doesPlayerHaveAutoSelectLastCharacterEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("autoSelectLastCharacter"))) {
		return true;
	}

	return true;
}

// ---------------------------------------------------------------------------

function getPlayerStaffTitle(client) {
	return getPlayerData(client).accountData.staffTitle;
}