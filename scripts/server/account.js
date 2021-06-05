// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: account.js
// DESC: Provides account functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initAccountScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Account]: Initializing account script ...");
	logToConsole(LOG_DEBUG, "[Asshat.Account]: Account script initialized!");
}

// ===========================================================================

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

// ===========================================================================

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

// ===========================================================================

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

// ===========================================================================

function toggleAccountGUICommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("noGUI");

	if(!doesPlayerHaveGUIEnabled(client)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerNormal(client, `⚙️ You will now be shown GUI (if enabled on current server)`);
		logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled GUI for their account ON.`);
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerNormal(client, `⚙️ You will not be shown GUI anymore. Any GUI stuff will be shown as messages in the chatbox instead.`);
		logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled GUI for their account OFF.`);
	}

	if(!isPlayerLoggedIn(client)) {
		if(getPlayerData().accountData.databaseId != 0) {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				showPlayerLoginGUI(client);
				logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI`);
			} else {
				messagePlayerNormal(client, `👋 Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, getColourByName("softGreen"));
				logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled)`);
			}
		} else {
			if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
				showPlayerRegistrationGUI(client);
				logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register GUI`);
			} else {
				messagePlayerNormal(client, `👋 Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, getColourByName("softGreen"));
				logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register message (GUI disabled)`);
			}
		}
	}
	return true;
}

// ===========================================================================

function toggleAccountServerLogoCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("noServerLogo");

	if(!doesPlayerHaveLogoEnabled(client)) {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings & ~flagValue;
		messagePlayerNormal(client, `⚙️ You will ${getBoolRedGreenInlineColour(true)}now [#FFFFFF]be shown the server logo (if enabled on current server)`);
		logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled the server logo ON for their account`);
		if(getServerConfig().showLogo) {
			updatePlayerShowLogoState(client, true);
		}
	} else {
		getPlayerData(client).accountData.settings = getPlayerData(client).accountData.settings | flagValue;
		messagePlayerNormal(client, `⚙️ You will ${getBoolRedGreenInlineColour(false)}not [#FFFFFF]be shown the server logo.`);
		logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled the server logo OFF for their account`);
		updatePlayerShowLogoState(client, false);
	}

	return true;
}

// ===========================================================================

// UNFINISHED!
// TO-DO: Make GUI, add command to generate code to add to auth app and command to input code returned by auth app
function toggleAccountTwoFactorAuthCommand(command, params, client) {
	let flagValue = getAccountSettingsFlagValue("twoStepAuth");

	if(getEmailConfig().enabled) {
		if(getPlayerData(client).accountData.emailAddress != "") {
			messagePlayerError(client, "You need to add your email to your account to use two-factor authentication.");
			messagePlayerTip(client, "[#FFFFFF]Use [#AAAAAA]/setemail [#FFFFFF]to add your email.");
			return false;
		}

		if(isAccountEmailVerified(getPlayerData(client).accountData)) {
			messagePlayerError(client, "You need to verify your email to your account to use two-factor authentication.");
			messagePlayerTip(client, "[#FFFFFF]Use [#AAAAAA]/verifyemail [#FFFFFF]to verify your email.");
			return false;
		}
	}

	if(!doesPlayerHaveTwoFactorAuthEnabled(client)) {
		getPlayerData(client).accountData.settings = addBitFlag(getPlayerData(client).accountData.settings, flagValue);
		messagePlayerSuccess(client, `[#FFFFFF]You have turned ${getBoolRedGreenInlineColour(false)}ON [#FFFFFF] two factor authentication![#AAAAAA]${addtoAuthenticatorCode}`);
		messagePlayerAlert(client, "You will be required to enter a code sent to your email every time you log on.");
		logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled two-factor authentication ON for their account`);
	} else {
		getPlayerData(client).accountData.settings = removeBitFlag(getPlayerData(client).accountData.settings, flagValue);
		messagePlayerSuccess(client, `You have turned ${getBoolRedGreenInlineColour(false)}OFF [#FFFFFF]two-factor authentication for login.`);
		messagePlayerAlert(client, "You won't be required to enter a code sent to your email every time you log on anymore.");
		logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has toggled two-factor authentication OFF for their account`);
	}
	return true;
}

// ===========================================================================

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

// ===========================================================================

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

// ===========================================================================

function setAccountChatScrollLinesCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(isNaN(params)) {
		messagePlayerError(client, "The line amount must be a number!");
		return false;
	}

	if(toInteger(params) < 1 || toInteger(params) > 6) {
		messagePlayerError(client, "The line amount must be between 1 and 6!");
		return false;
	}

	let lines = Math.ceil(toInteger(params));

	getPlayerData(client).accountData.chatScrollLines = lines;
	sendPlayerChatScrollLines(client, lines);
	messagePlayerSuccess(client, `Your chatbox will now scroll ${toInteger(lines)} lines at a time!`);
}

// ===========================================================================

function setAccountEmailCommand(command, params, client) {
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

	//if(.emailAddress != "") {
	//	messagePlayerError(client, `Your email is already set!`);
	//	return false;
	//}

	if(getPlayerData(client).accountData.emailAddress != "" && isAccountEmailVerified(getPlayerData(client).accountData)) {
		messagePlayerError(client, `You already set your email and verified it!`);
		return false;
	}

	setAccountEmail(getPlayerData(client).accountData, emailAddress);

	let emailVerificationCode = generateEmailVerificationCode();
	setAccountEmailVerificationCode(getPlayerData(client).accountData, emailVerificationCode);
	sendEmailVerificationEmail(client, emailVerificationCode);

	messagePlayerSuccess(client, `Your email has been set!`);
	messagePlayerAlert(client, `Please verify your email to enable extra account security and recovery features.`);
	messagePlayerAlert(client, `A verification code and instructions have been sent to your email.`);
	saveAccountToDatabase(getPlayerData(client).accountData);
}

// ===========================================================================

function verifyAccountEmailCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let verificationCode = splitParams[0];

	if(isAccountEmailVerified(getPlayerData(client).accountData)) {
		messagePlayerError(client, `You already verified your email!`);
		return false;
	}

	if(module.hashing.sha512(verificationCode) != getPlayerData(client).accountData.emailVerificationCode) {
		messagePlayerError(client, `Invalid email verification code! A new one has been created and sent to your email.`);
		let emailVerificationCode = generateEmailVerificationCode();
		setAccountEmailVerificationCode(getPlayerData(client).accountData, emailVerificationCode);
		sendEmailVerificationEmail(client, emailVerificationCode);
		return false;
	}

	getPlayerData(client).accountData.flags.moderation = addBitFlag(getPlayerData(client).accountData.flags.moderation, getModerationFlagValue("emailVerified"));
	getPlayerData(client).accountData.emailVerificationCode = "";

	messagePlayerSuccess(client, `Your email has been verified!`);
	messagePlayerAlert(client, `You can now use your email for password resets, two-factor authentication, alerts, and more!`);
	saveAccountToDatabase(getPlayerData(client).accountData);
}

// ===========================================================================

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

	// TO-DO: Command (like /verifydiscord or use this one for second step too) to input verification code sent to email.
	//getPlayerData(client).accountData.emailAddress = emailAddress;
	//messagePlayerSuccess(client, "Your discord account has been attached to your game account!");
}

// ===========================================================================

function isPlayerLoggedIn(client) {
	if(isConsole(client)) {
		return true;
	}

	if(getPlayerData(client) != null) {
		return getPlayerData(client).loggedIn;
	}

	return false;
}

// ===========================================================================

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

// ===========================================================================

function doesPasswordMeetRequirements(password) {
	// Will be added soon
	return true;
}

// ===========================================================================

function isAccountPasswordCorrect(accountData, password) {
	if(accountData.password == password) {
		return true;
	}

	return false;
}

// ===========================================================================

function loadAccountFromName(accountName, fullLoad = false) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		accountName = escapeDatabaseString(dbConnection, accountName);
		let dbQueryString = `SELECT acct_main.*, acct_svr.*, INET_NTOA(acct_ip) AS ipstring FROM acct_main INNER JOIN acct_svr ON acct_svr.acct_svr_acct = acct_main.acct_id AND acct_svr.acct_svr_svr = ${getServerId()} WHERE acct_name = '${accountName}' LIMIT 1;`;
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

// ===========================================================================

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

// ===========================================================================

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

// ===========================================================================

function isNameRegistered(name) {
	let accountData = loadAccountFromName(name, true);
	if(accountData.databaseId > 0) {
		return true;
	}

	return false;
}

// ===========================================================================

function hashAccountPassword(name, password) {
	let hashFunction = getAccountHashingFunction();
	let saltedInfo = saltAccountInfo(name, password);
	return hashFunction(saltedInfo);
}

// ===========================================================================

function saltAccountInfo(name, password) {
	return "ag.gaming." + toString(accountSaltHash) + "." + toString(name) + "." + toString(password);
}

// ===========================================================================

function loginSuccess(client) {
	logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} successfully logged in.`);
	getPlayerData(client).loggedIn = true;

	updateConnectionLogOnAuth(client, getPlayerData(client).accountData.databaseId);

	if(doesPlayerHaveStaffPermission(client, "developer") || doesPlayerHaveStaffPermission(client, "manageServer")) {
		logToConsole(LOG_WARN, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} has needed permissions and is being given administrator access`);
		client.administrator = true;
	}

	if(getPlayerData(client).subAccounts.length == 0) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerPromptGUI(client, "You have no characters. Would you like to make one?", "No characters");
			getPlayerData(client).promptType = AG_PROMPT_CREATEFIRSTCHAR;
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the no characters prompt GUI`);
		} else {
			messagePlayerAlert(client, `You have no characters. Use /newchar to make one.`);
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the no characters message (GUI disabled)`);
		}
	} else {
		showCharacterSelectToClient(client);
	}

	getPlayerData(client).accountData.ipAddress = client.ip;

	sendRemovedWorldObjectsToPlayer(client);
	sendPlayerChatScrollLines(client, getPlayerData(client).accountData.chatScrollLines);

	messagePlayerNormal(null, `👋 ${client.name} has joined the server`, getColourByName("softYellow"));
}

// ===========================================================================

function saveAccountToDatabase(accountData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		//logToConsole(LOG_VERBOSE, `Escaping account data for ${getPlayerDisplayForConsole(client)}`);
		let safePassword = escapeDatabaseString(dbConnection, accountData.password);
		//logToConsole(LOG_VERBOSE, `${getPlayerDisplayForConsole(accountData.name)}'s password escaped successfully`);
		let safeStaffTitle = escapeDatabaseString(dbConnection, accountData.staffTitle);
		//logToConsole(LOG_VERBOSE, `${getPlayerDisplayForConsole(client)}'s staff title escaped successfully`);
		let safeEmailAddress = escapeDatabaseString(dbConnection, accountData.emailAddress);
		//logToConsole(LOG_VERBOSE, `${getPlayerDisplayForConsole(client)}'s email address escaped successfully`);

		let dbQueryString =
			`UPDATE acct_main SET
				 acct_email='${safeEmailAddress}',
				acct_pass='${safePassword}',
				acct_discord=${accountData.discordAccount},
				acct_ip=INET_ATON('${accountData.ipAddress}'),
				acct_code_verifyemail='${accountData.emailVerificationCode}'
			 WHERE acct_id=${accountData.databaseId}`;

			 /*
			 	acct_settings=${accountData.settings},
				acct_staff_title='${safeStaffTitle}',
				acct_staff_flags=${accountData.flags.admin},
				acct_mod_flags=${accountData.flags.moderation},
			*/

		//dbQueryString = dbQueryString.trim();
		dbQueryString = dbQueryString.replace(/(?:\r\n|\r|\n|\t)/g, "");

		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		freeDatabaseQuery(dbQuery);
		dbQuery = null;

		dbQueryString =
			`UPDATE acct_svr SET
				 acct_svr_acct='${accountData.databaseId}',
			 	acct_svr_settings=${accountData.flags.settings},
				acct_svr_staff_title='${safeStaffTitle}',
				acct_svr_staff_flags=${accountData.flags.admin},
				acct_svr_mod_flags=${accountData.flags.moderation},
				acct_svr_chat_scroll_lines=${accountData.chatScrollLines}
			 WHERE acct_svr_acct=${accountData.databaseId} AND acct_svr_svr = ${getServerId()}`;

		//dbQueryString = dbQueryString.trim();
		dbQueryString = dbQueryString.replace(/(?:\r\n|\r|\n|\t)/g, "");

		dbQuery = queryDatabase(dbConnection, dbQueryString);
		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
	}
}

// ===========================================================================

function saveAccountKeyBindsDatabase(keyBindData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		//logToConsole(LOG_VERBOSE, `Escaping account keybinds data for ${getPlayerDisplayForConsole(client)}`);
		let safeCommandString = escapeDatabaseString(dbConnection, keyBindData.commandString);
		//logToConsole(LOG_VERBOSE, `${getPlayerDisplayForConsole(client)}'s keybind command string escaped successfully`);
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

// ===========================================================================

function saveAccountStaffNotesDatabase(staffNoteData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeNoteContent = escapeDatabaseString(dbConnection, staffNoteData.note);
		//logToConsole(LOG_VERBOSE, `${getPlayerDisplayForConsole(client)}'s staff note string escaped successfully`);
		if(staffNoteData.databaseId == 0) {
			let dbQueryString = `INSERT INTO acct_note (acct_note_message, acct_note_who_added, acct_note_when_added, acct_note_server, acct_note_acct) VALUES ('${safeNoteContent}', ${staffNoteData.whoAdded}, UNIX_TIMESTAMP(), ${getServerId()}, ${staffNoteData.account}`;
			staffNoteData.databaseId = getDatabaseInsertId(dbConnection);
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
		}

		disconnectFromDatabase(dbConnection);
	}
}

// ===========================================================================

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

// ===========================================================================

function createAccount(name, password, email = "") {
	let dbConnection = connectToDatabase();

	if(dbConnection) {
		let hashedPassword = hashAccountPassword(name, password);
		let safeName = escapeDatabaseString(dbConnection, name);
		let safeEmail = escapeDatabaseString(dbConnection, email);

		let dbQuery = queryDatabase(dbConnection, `INSERT INTO acct_main (acct_name, acct_pass, acct_email, acct_when_registered) VALUES ('${safeName}', '${hashedPassword}', '${safeEmail}', UNIX_TIMESTAMP())`);
		if(getDatabaseInsertId(dbConnection) > 0) {
			let tempAccountData = loadAccountFromId(getDatabaseInsertId(dbConnection), false);
			createDefaultKeybindsForAccount(tempAccountData.databaseId);
			createDefaultAccountServerData(tempAccountData.databaseId);
			tempAccountData.keyBinds = loadAccountKeybindsFromDatabase(tempAccountData.databaseId);
			tempAccountData.messages = loadAccountMessagesFromDatabase(tempAccountData.databaseId);
			tempAccountData.notes = loadAccountStaffNotesFromDatabase(tempAccountData.databaseId);
			tempAccountData.contacts = loadAccountContactsFromDatabase(tempAccountData.databaseId);
			return tempAccountData;
		}
	}

	return false;
}

// ===========================================================================

function checkLogin(client, password) {
	getPlayerData(client).loginAttemptsRemaining = getPlayerData(client).loginAttemptsRemaining-1;
	if(getPlayerData(client).loginAttemptsRemaining <= 0) {
		client.disconnect();
	}

	if(isPlayerLoggedIn(client)) {
		logToConsole(LOG_WARN, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but is already logged in`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			sendPlayerLoginSuccess(client);
		} else {
			messagePlayerError(client, "You are already logged in!");
		}

		return false;
	}

	if(!isPlayerRegistered(client)) {
		logToConsole(LOG_WARN, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but is not registered`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerRegistratonGUI(client);
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register GUI`);
		} else {
			messagePlayerError(client, "Your name is not registered! Use /register to make an account.");
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register message (GUI disabled)`);
		}
		return false;
	}

	if(areParamsEmpty(password)) {
		logToConsole(LOG_WARN, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but failed (empty password). ${getPlayerData(client).loginAttemptsRemaining} login attempts remaining`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerLoginFailedGUI(client, `Invalid password! ${getPlayerData(client).loginAttemptsRemaining} tries remaining.`);
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI with ${getPlayerData(client).loginAttemptsRemaining} login attempts remaining alert.`);
		} else {
			messagePlayerError(client, `You must enter a password! ${getPlayerData(client).loginAttemptsRemaining} tries remaining.`);
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled) with ${getPlayerData(client).loginAttemptsRemaining} login attempts remaining alert.`);
		}
		return false;
	}

	if(!isAccountPasswordCorrect(getPlayerData(client).accountData, hashAccountPassword(client.name, password))) {
		logToConsole(LOG_WARN, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} attempted to login but failed (wrong password). ${getPlayerData(client).loginAttemptsRemaining} login attempts remaining`);
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerLoginFailedGUI(client, `Invalid password! ${getPlayerData(client).loginAttemptsRemaining} tries remaining.`);
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI with ${getPlayerData(client).loginAttemptsRemaining} login attempts remaining alert.`);
		} else {
			messagePlayerError(client, `Invalid password! ${getPlayerData(client).loginAttemptsRemaining} tries remaining.`);
			logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled) with ${getPlayerData(client).loginAttemptsRemaining} login attempts remaining alert.`);
		}
		return false;
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		showPlayerLoginSuccessGUI(client);
	}

	loginSuccess(client);
}

// ===========================================================================

function checkRegistration(client, password, confirmPassword = "", emailAddress = "") {
	logToConsole(LOG_DEBUG, "[Asshat.Account]: Checking registration for " + toString(client.name));

	if(isPlayerRegistered(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerLoginGUI(client);
		} else {
			messagePlayerError(client, "Your name is already registered!");
		}
		return false;
	}

	if(isPlayerLoggedIn(client)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerLoginSuccessGUI(client);
		} else {
			messagePlayerError(client, "You are already logged in!");
		}
		return false;
	}

	if(areParamsEmpty(password)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerRegistrationFailedGUI(client, "Password cannot be blank!");
		} else {
			messagePlayerError(client, "The password cannot be blank!");
		}
		return false;
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(areParamsEmpty(confirmPassword)) {
			showPlayerRegistrationFailedGUI(client, "Password confirm cannot be blank!");
			return false;
		}
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(areParamsEmpty(emailAddress)) {
			showPlayerRegistrationFailedGUI(client, "Email address cannot be blank!");
			return false;
		}
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(password != confirmPassword) {
			showPlayerRegistrationFailedGUI(client, "The passwords must match!");
			return false;
		}
	}

	if(!doesPasswordMeetRequirements(password)) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			// Work on this later. Function should return true by default anyway for now.
			showPlayerRegistrationFailedGUI(client, "Password doesn't meet requirements!");
		} else {
			messagePlayerError(client, "Password doesn't meet requirements!");
		}
		return false
	}

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		if(!isValidEmailAddress(emailAddress)) {
			showPlayerRegistrationFailedGUI(client, "You must put a valid email!");
			return false
		}
	}

	let accountData = createAccount(client.name, password, emailAddress);
	if(!accountData) {
		if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
			showPlayerRegistrationFailedGUI(client, "Your account could not be created!");
		} else {
			messagePlayerAlert(client, "Your account could not be created!");
		}

		messagePlayerAlert(client, "Asshat Gaming staff have been notified of the problem and will fix it shortly.");
		return false;
	}

	getPlayerData(client).accountData = accountData;
	getPlayerData(client).loggedIn = true;

	messagePlayerSuccess(client, "Your account has been created!");
	messagePlayerAlert(client, "Don't forget to verify your email! A verification code has been sent to you");
	messagePlayerAlert(client, "To play on the server, you will need to make a character.");

	if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
		showPlayerRegistrationSuccessGUI(client);
		showPlayerPromptGUI(client, "You have no characters. Would you like to make one?", "No Characters");
		getPlayerData(client).promptType = AG_PROMPT_CREATEFIRSTCHAR;

		if(getEmailConfig().enabled) {
			let emailVerificationCode = generateEmailVerificationCode();
			setAccountEmailVerificationCode(getPlayerData(client).accountData, emailVerificationCode);
			sendEmailVerificationEmail(client, emailVerificationCode);
		}
	} else {
		messagePlayerAlert(client, `You have no characters. Use /newchar to make one.`);
	}
};

// ===========================================================================

function isValidEmailAddress(emailAddress) {
	return true;
}

// ===========================================================================

function saveAllClientsToDatabase() {
	logToConsole(LOG_DEBUG, "[Asshat.Account]: Saving all clients to database ...");
	getClients().forEach(function(client) {
		savePlayerToDatabase(client);
	});
	logToConsole(LOG_DEBUG, "[Asshat.Account]: All clients saved to database successfully!");
}

// ===========================================================================

function savePlayerToDatabase(client) {
	if(getPlayerData(client) == null) {
		return false;
	}

	if(!getPlayerData(client).loggedIn) {
		return false;
	}

	logToConsole(LOG_DEBUG, `[Asshat.Account]: Saving client ${client.name} to database ...`);
	saveAccountToDatabase(getPlayerData(client).accountData);

	if(getPlayerData(client).currentSubAccount != -1) {
		//let subAccountData = getPlayerCurrentSubAccount(client);

		if(client.player != null) {
			if(getPlayerData(client).returnToPosition != null) {
				getPlayerCurrentSubAccount(client).spawnPosition = getPlayerData(client).returnToPosition;
				getPlayerCurrentSubAccount(client).spawnHeading = getPlayerData(client).returnToHeading;
				getPlayerCurrentSubAccount(client).interior = getPlayerData(client).returnToInterior;
				getPlayerCurrentSubAccount(client).dimension = getPlayerData(client).returnToDimension;
			} else {
				getPlayerCurrentSubAccount(client).spawnPosition = getPlayerPosition(client);
				getPlayerCurrentSubAccount(client).spawnHeading = getPlayerHeading(client);
				getPlayerCurrentSubAccount(client).interior = getPlayerInterior(client);
				getPlayerCurrentSubAccount(client).dimension = getPlayerDimension(client);
			}
		}

		saveSubAccountToDatabase(getPlayerCurrentSubAccount(client));
	}
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Saved client ${getPlayerDisplayForConsole(client)} to database successfully!`);
	return true;
}

// ===========================================================================

function initClient(client) {
	if(isConsole(client)) {
		return false;
	}

	sendPlayerGUIColours(client);
	sendPlayerGUIInit(client);

	showConnectCameraToPlayer(client);
	//playRadioStreamForPlayer(client, getServerConfig().introMusicURL, true);
	messageClient(`Please wait ...`, client, getColourByName("softGreen"));

	setTimeout(function() {
		if(client != null) {

			clearChatBox(client);
			let tempAccountData = loadAccountFromName(client.name, true);
			let tempSubAccounts = loadSubAccountsFromAccount(tempAccountData.databaseId);

			getServerData().clients[client.index] = new serverClasses.clientData(client, tempAccountData, tempSubAccounts);

			let sessionId = saveConnectionToDatabase(client);
			getServerData().clients[client.index].session = sessionId;
			getServerData().clients[client.index].connectTime = Math.ceil(sdl.ticks);

			if(tempAccountData != false) {
				if(isAccountAutoIPLoginEnabled(tempAccountData) && getPlayerData(client).accountData.ipAddress == client.ip) {
					messagePlayerAlert(client, "You have been automatically logged in via IP!");
					loginSuccess(client);
				} else {
					if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
						logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login GUI.`);
						showPlayerLoginGUI(client);
					} else {
						logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the login message (GUI disabled).`);
						messagePlayerNormal(client, `Welcome back to Asshat Gaming RP, ${client.name}! Please /login to continue.`, getColourByName("softGreen"));
					}
				}
			} else {
				if(getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client)) {
					logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register GUI.`);
					showPlayerRegistrationGUI(client);
				} else {
					logToConsole(LOG_DEBUG, `[Asshat.Account] ${getPlayerDisplayForConsole(client)} is being shown the register message (GUI disabled).`);
					messagePlayerNormal(client, `Welcome to Asshat Gaming RP, ${client.name}! Please /register to continue.`, getColourByName("softGreen"));
				}
			}
		}
	}, 2500);
}

// ===========================================================================

function saveConnectionToDatabase(client) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeName = escapeDatabaseString(dbConnection, client.name);
		let dbQueryString = `INSERT INTO conn_main (conn_when_connect, conn_server, conn_script_version, conn_game_version, conn_client_version, conn_name, conn_ip) VALUES (UNIX_TIMESTAMP(), ${getServerConfig().databaseId}, '${scriptVersion}', '${client.gameVersion}', '0.0.0', '${safeName}', INET_ATON('${client.ip}'))`;
		let query = queryDatabase(dbConnection, dbQueryString);
		setEntityData(client, "ag.connection", getDatabaseInsertId(dbConnection));
	}
}

// ===========================================================================

function createDefaultKeybindsForAccount(accountDatabaseId) {
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Creating default keybinds for account ${accountDatabaseId} ...`);
	for(let j = 1 ; j <= 4 ; j++) {
		logToConsole(LOG_DEBUG, `[Asshat.Account]: Creating default keybinds for account ${accountDatabaseId} on server ${j} ...`);
		for(let i in getGlobalConfig().keyBind.defaultKeyBinds) {
			logToConsole(LOG_DEBUG, `[Asshat.Account]: Creating default keybind ${i} for account ${accountDatabaseId} on server ${j} with key ${sdl.getKeyFromName(getGlobalConfig().keyBind.defaultKeyBinds[i].keyName.toLowerCase())} ...`);
			let dbQueryString = `INSERT INTO acct_hotkey (acct_hotkey_acct, acct_hotkey_server, acct_hotkey_key, acct_hotkey_cmdstr, acct_hotkey_when_added, acct_hotkey_down) VALUES (${accountDatabaseId}, ${j}, ${sdl.getKeyFromName(getGlobalConfig().keyBind.defaultKeyBinds[i].keyName.toLowerCase())}, '${getGlobalConfig().keyBind.defaultKeyBinds[i].commandString}', UNIX_TIMESTAMP(), ${getGlobalConfig().keyBind.defaultKeyBinds[i].keyState})`;
			quickDatabaseQuery(dbQueryString);
			logToConsole(LOG_DEBUG, `[Asshat.Account]: Created default keybind ${i} for account ${accountDatabaseId} on server ${j} with key ${sdl.getKeyFromName(getGlobalConfig().keyBind.defaultKeyBinds[i].keyName.toLowerCase())}!`);
		}
		logToConsole(LOG_DEBUG, `[Asshat.Account]: Create default keybinds for account ${accountDatabaseId} on server ${j}!`);
	}
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Created default keybinds for account ${accountDatabaseId} successfully!`);
}

// ===========================================================================

function createDefaultAccountServerData(accountDatabaseId) {
	for(let i = 1 ; i <= 4 ; i++) {
		let dbQueryString = `INSERT INTO acct_svr (acct_svr_acct, acct_svr_svr) VALUES (${accountDatabaseId}, ${i})`;
		quickDatabaseQuery(dbQueryString);
	}
}

// ===========================================================================

function loadAccountKeybindsFromDatabase(accountDatabaseID) {
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Loading account keybinds for account ${accountDatabaseID} from database ...`);

	let tempAccountKeybinds = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;

	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `SELECT * FROM acct_hotkey WHERE acct_hotkey_enabled = 1 AND acct_hotkey_acct = ${accountDatabaseID} AND acct_hotkey_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempAccountKeyBindData = new serverClasses.keyBindData(dbAssoc);
					tempAccountKeybinds.push(tempAccountKeyBindData);
					logToConsole(LOG_DEBUG, `[Asshat.Account]: Account keybind '${tempAccountKeyBindData.databaseId}' (Key ${tempAccountKeyBindData.key} '${sdl.getKeyName(tempAccountKeyBindData.key)}') loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_DEBUG, `[Asshat.Account]: ${tempAccountKeybinds.length} account keybinds for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountKeybinds;
}

// ===========================================================================

function loadAccountStaffNotesFromDatabase(accountDatabaseID) {
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Loading account staff notes for account ${accountDatabaseID} from database ...`);

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
					logToConsole(LOG_DEBUG, `[Asshat.Account]: Account staff note '${tempAccountStaffNoteData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_DEBUG, `[Asshat.Account]: ${tempAccountStaffNotes.length} account staff notes for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountStaffNotes;
}

// ===========================================================================

function loadAccountContactsFromDatabase(accountDatabaseID) {
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Loading account contacts for account ${accountDatabaseID} from database ...`);

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
					logToConsole(LOG_DEBUG, `[Asshat.Account]: Account contact '${tempAccountContactData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_DEBUG, `[Asshat.Account]: ${tempAccountContacts.length} account contacts for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountContacts;
}

// ===========================================================================

function loadAccountMessagesFromDatabase(accountDatabaseID) {
	logToConsole(LOG_DEBUG, `[Asshat.Account]: Loading account messages for account ${accountDatabaseID} from database ...`);

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
					logToConsole(LOG_DEBUG, `[Asshat.Account]: Account contact '${tempAccountMessageData.databaseId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_DEBUG, `[Asshat.Account]: ${tempAccountMessages.length} account messages for account ${accountDatabaseID} loaded from database successfully!`);
	return tempAccountMessages;
}

// ===========================================================================

function isAccountAutoIPLoginEnabled(accountData) {
	let accountSettings = accountData.settings;
	let flagValue = getAccountSettingsFlagValue("autoLoginIP");
	return hasBitFlag(accountSettings, flagValue);
}

// ===========================================================================

function doesPlayerHaveGUIEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("noGUI"))) {
		return false;
	}

	return true;
}

// ===========================================================================

function doesPlayerHaveLogoEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("noServerLogo"))) {
		return false;
	}

	return true;
}

// ===========================================================================

function doesPlayerHaveAutoLoginByIPEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("autoLoginIP"))) {
		return true;
	}

	return false;
}

// ===========================================================================

function doesPlayerHaveAutoSelectLastCharacterEnabled(client) {
	if(hasBitFlag(getPlayerData(client).accountData.settings, getAccountSettingsFlagValue("autoSelectLastCharacter"))) {
		return true;
	}

	return false;
}

// ===========================================================================

function getPlayerStaffTitle(client) {
	return getPlayerData(client).accountData.staffTitle;
}

// ===========================================================================

function isAccountEmailVerified(accountData) {
	return hasBitFlag(accountData.flags.moderation, getModerationFlagValue("emailVerified"));
}

// ===========================================================================

function isAccountTwoFactorAuthenticationVerified(accountData) {
	return hasBitFlag(accountData.flags.moderation, getModerationFlagValue("twoFactorAuthVerified"));
}

// ===========================================================================

function setAccountEmail(accountData, emailAddress) {
	accountData.emailAddress = emailAddress;
}

// ===========================================================================

function setAccountEmailVerificationCode(accountData, emailVerificationCode) {
	accountData.emailVerificationCode = module.hashing.sha512(emailVerificationCode);
}

// ===========================================================================

function generateEmailVerificationCode() {
	return generateRandomString(10);
}

// ===========================================================================

function sendEmailVerificationEmail(client, emailVerificationCode) {
	let emailBodyText = getEmailConfig().bodyContent.confirmEmail;
	emailBodyText = emailBodyText.replace("{VERIFICATIONCODE}", emailVerificationCode);

	sendEmail(getPlayerData(client).accountData.emailAddress, getPlayerData(client).accountData.name, `Confirm email on Asshat Gaming RP`, emailBodyText);
}

// ===========================================================================

function verifyAccountEmail(accountData, verificationCode) {
	let emailVerificationCode = generateRandomString(10);

	let emailBodyText = getEmailConfig().bodyContent.confirmEmail;
	emailBodyText = emailBodyText.replace("{VERIFICATIONCODE}", emailVerificationCode);

	sendEmail(getPlayerData(client).accountData.emailAddress, getPlayerData(client).accountData.name, `Confirm email on Asshat Gaming RP`, emailBodyText);

	getPlayerData(client).accountData.emailAddress = emailAddress;
	getPlayerData(client).accountData.emailVerificationCode = module.hashing.sha512(emailVerificationCode);
}

// ===========================================================================