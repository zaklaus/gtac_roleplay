// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: clan.js
// DESC: Provides clan functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initClanScript() {
	console.log("[Asshat.Clan]: Initializing clans script ...");
	serverData.clans = loadClansFromDatabase();
	addClanCommandHandlers();
	console.log("[Asshat.Clan]: Clan script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addClanCommandHandlers() {
	console.log("[Asshat.Clan]: Adding clan command handlers ...");
	let clanCommands = serverCommands.clan;
	for(let i in clanCommands) {
		addCommandHandler(clanCommands[i].command, clanCommands[i].handlerFunction);
	}
	console.log("[Asshat.Clan]: Clan command handlers added successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadClansFromDatabase() {
	console.log("[Asshat.Clan]: Loading clans from database ...");

	let tempClans = [];
	let dbConnection = connectToDatabase();
	let dbAssoc;
	
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, "SELECT * FROM `clan_main` WHERE `clan_deleted` = 0 AND `clan_server` = " + String(serverId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempClanData = getClasses().clanData(dbAssoc);
					tempClanData.members = loadClanMembersFromDatabase(tempClanData.databaseId);
					tempClanData.ranks = loadClanRanksFromDatabase(tempClanData.databaseId);
					tempClans.push(tempClanData);
					console.log(`[Asshat.Clan]: Clan '${tempClanData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log("[Asshat.Clan]: " + String(tempClans.length) + " clans loaded from database successfully!");
	return tempClans;
}

// ----------------------------------------------------------------------------

function createClanCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(doesClanNameExist(params)) {
		messageClientError(client, "A clan with that name already exists!");
		return false;
	}

	// Create clan without owner. Can set owner with /clanowner afterward
	createClan(params);
	messageClientSuccess(client, "The '" + params + "' clan has been created!");
}

// ----------------------------------------------------------------------------

function deleteClanCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(isNaN(params)) {
		messageClientError(client, "The clan ID must be a number!");
		return false;
	}

	if(!doesClanIDExist(Number(params))) {
		messageClientError(client, "That clan ID does not exist!");
		return false;
	}

	messageClientSuccess(client, "The '" + getClanData(Number(params)).name + "' clan has been deleted!");
	deleteClan(Number(params));
}

// ----------------------------------------------------------------------------

function setClanOwnerCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "owner")) {
		messageClientError(client, "You must be the clan owner to use this command!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanTagCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "clanTag")) {
		messageClientError(client, "You can not change the clan tag!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanNameCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "clanName")) {
		messageClientError(client, "You can not change the clan name!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanMemberTagCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "memberTag")) {
		messageClientError(client, "You can not change a clan member's tag!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanRankTagCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "rankTag")) {
		messageClientError(client, "You can not change a clan ranks's tag!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanMemberFlagsCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "memberFlags")) {
		messageClientError(client, "You can not change a clan member's permissions!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanRankFlagsCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "rankFlags")) {
		messageClientError(client, "You can not change a clan ranks's permissions!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanMemberTitleCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "memberFlags")) {
		messageClientError(client, "You can not change a clan member's title!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function setClanRankTitleCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	if(!doesClientHaveClanPermission(client, "rankTitle")) {
		messageClientError(client, "You can not change a clan ranks's title!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ----------------------------------------------------------------------------

function createClan(name) {
	let dbConnection = connectToDatabase();
	let serverId = getServerId();
	let escapedName = name;
	
	if(dbConnection) {
		escapedName = escapeDatabaseString(dbConnection, escapedName)
		let dbQuery = queryDatabase(dbConnection, `INSERT INTO clan_main (clan_server, clan_name) VALUES (${serverId}, '${escapedName}')`);
		disconnectFromDatabase(dbConnection);

		let tempClanData = loadClanFromDatabaseById(getDatabaseInsertId(dbConnection));
		if(tempClanData != false) {
			let tempClan = serverClasses.clanData(tempClanData);
			serverData.clans.push(tempClan);
		}
	}
	return true;
}

// ----------------------------------------------------------------------------

function deleteClan(clanId) {
	saveClansToDatabase();

	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `UPDATE clan_main SET clan_deleted = 1 WHERE clan_id = ${clanId}`);
		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);

		reloadAllClans();
		return true;
	}

	return false;
}

// ----------------------------------------------------------------------------

function getClanData(clanId) {
	let clans = getServerData().clans;
	for(let i in clans) {
		if(clans[i].databaseId == clanId) {
			return clans[i];
		}
	}

	return false;
}

// ----------------------------------------------------------------------------

function doesClanNameExist(name) {
	let clans = getServerData().clans;
	for(let i in clans) {
		if(clans[i].name == name) {
			return true;
		}
	}

	return false;
}

// ----------------------------------------------------------------------------

function doesClanIdExist(clanId) {
	let clans = getServerData().clans;
	for(let i in clans) {
		if(clans[i].databaseId == clanId) {
			return true;
		}
	}

	return false;
}

// ----------------------------------------------------------------------------

function reloadAllClans() {
	getServerData().clans = loadClansFromDatabase();
}

// ----------------------------------------------------------------------------

function saveClansToDatabase() {
	let clans = getServerData().clans;
	for(let i in clans) {
		saveClanToDatabase(clans[i]);
	}
}

// ----------------------------------------------------------------------------

function saveClanToDatabase(clanData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `UPDATE clan_main SET clan_name = '${escapeDatabaseString(dbConnection, clanData.name)}', clan_owner = ${clanData.ownerId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
		return true;
	}

	return false;
}

// ----------------------------------------------------------------------------

function setClanTag(clanId, tag) {
	getClanData(clanId).tag = tag;
}

// ----------------------------------------------------------------------------

function setClanOwner(clanId, ownerId) {
	getClanData(clanId).ownerId = ownerId;
}

// ----------------------------------------------------------------------------

function setClanMemberTag(memberId, tag) {
	// finish this later, need to query db
}

// ----------------------------------------------------------------------------

function setClanMemberFlags(memberId, flags) {
	// finish this later, need to query db
}

// ----------------------------------------------------------------------------

function setClanMemberTitle(memberId, title) {
	// finish this later, need to query db
}

// ----------------------------------------------------------------------------

function setClanRankTag(clanId, rankId, tag) {
	getClanRankData(clanId, rankId).tag = tag;
}

// ----------------------------------------------------------------------------

function setClanRankFlags(clanId, rankId, flags) {
	getClanRankData(clanId, rankId).flags = flags;
}

// ----------------------------------------------------------------------------

function setClanRankTitle(clanId, rankId, title) {
	getClanRankData(clanId, rankId).title = title;
}

// ----------------------------------------------------------------------------

function saveAllClansToDatabase() {

}

// ---------------------------------------------------------------------------