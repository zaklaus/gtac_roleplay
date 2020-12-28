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
	getServerData().clans = loadClansFromDatabase();
	console.log("[Asshat.Clan]: Clan script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadClansFromDatabase() {
	console.log("[Asshat.Clan]: Loading clans from database ...");

	let tempClans = [];
	let dbConnection = connectToDatabase();
	let dbAssoc;
	
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM clan_main WHERE clan_deleted = 0 AND clan_server = ${getServerId()}`);
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

	console.log(`[Asshat.Clan]: ${tempClans.length} clans loaded from database successfully!`);
	return tempClans;
}

// ----------------------------------------------------------------------------

function createClanCommand(command, params, client) {
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
	messageClientSuccess(client, `The [#FF9900]${params} [#FFFFFF]clan has been created!`);
}

// ----------------------------------------------------------------------------

function deleteClanCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getClanFromParams(params);

	if(!getClanData(clanId)) {
		messageClientError(client, "That clan ID does not exist!");
		return false;
	}

	messageClientSuccess(client, `The [#FF9900]${getClanData(clanId).name} [#FFFFFF]clan has been deleted!`);
	deleteClan(clanId);
}

// ----------------------------------------------------------------------------

function setClanOwnerCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("owner"))) {
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
	if(!doesClientHaveClanPermission(client, getClanFlagValue("clanTag"))) {
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
	if(!doesClientHaveClanPermission(client, getClanFlagValue("clanName"))) {
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
	if(!doesClientHaveClanPermission(client, getClanFlagValue("memberTag"))) {
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
	if(!doesClientHaveClanPermission(client, getClanFlagValue("rankTag"))) {
		messageClientError(client, "You can not change a clan ranks's tag!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId, splitParams[0]);

	if(!getClanRankData(clanId, rankId)) {
		messageClientError(client, "Clan rank not found!");
		return false;
	}	
}

// ----------------------------------------------------------------------------

function addClanMemberFlagCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("memberFlags"))) {
		messageClientError(client, "You can not change a clan member's permissions!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);

	if(!targetClient) {
		messageClientError(client, "Clan member not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messageClientError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);	
	getClientCurrentSubAccount(client).clanFlags = getClientCurrentSubAccount(client).clanFlags | flagValue;
	messageClientSuccess(client, `You added the [#AAAAAA]${splitParams[1]} [#FFFFFF]clan flag to [#AAAAAA]${getCharacterFullName(client)}`);	
}

// ----------------------------------------------------------------------------

function removeClanMemberFlagCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("memberFlags"))) {
		messageClientError(client, "You can not change a clan member's permissions!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);

	if(!targetClient) {
		messageClientError(client, "Clan member not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messageClientError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);	
	getClientCurrentSubAccount(client).clanFlags = getClientCurrentSubAccount(client).clanFlags & ~flagValue;
	messageClientSuccess(client, `You removed the [#AAAAAA]${splitParams[1]} [#FFFFFF]clan flag from [#AAAAAA]${getCharacterFullName(client)}`);	
}

// ----------------------------------------------------------------------------

function addClanRankFlagCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("rankFlags"))) {
		messageClientError(client, "You can not change a clan rank's permissions!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId, splitParams[0]);

	if(!getClanRankData(clanId, rankId)) {
		messageClientError(client, "Clan rank not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messageClientError(client, "Clan flag not found!");
		return false;
	}	

	let flagValue = getClanFlagValue(splitParams[1]);

	getClanRankData(clanId, rankId).flags = getClanRankData(clanId, rankId).flags | flagValue;
	messageClientSuccess(client, `You added the [#AAAAAA]${splitParams[1]} [#FFFFFF]clan flag to rank [#AAAAAA]${getClanRankData(clanId, rankId).name}`);	
}

// ----------------------------------------------------------------------------

function removeClanRankFlagCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("rankFlags"))) {
		messageClientError(client, "You can not change a clan rank's permissions!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId, splitParams[0]);

	if(!getClanRankData(clanId, rankId)) {
		messageClientError(client, "Clan rank not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messageClientError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);

	getClanRankData(clanId, rankId).flags = getClanRankData(clanId, rankId).flags & ~flagValue;
	messageClientSuccess(client, `You removed the [#AAAAAA]${splitParams[1]} [#FFFFFF]clan flag from rank [#AAAAAA]${getClanRankData(clanId, rankId).name}`);	
}

// ----------------------------------------------------------------------------

function setClanMemberTitleCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("memberTitle"))) {
		messageClientError(client, "You can not change a clan member's title!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId);

	if(!getClanRankData(clanId, rankId)) {
		messageClientError(client, "Clan rank not found!");
		return false;
	}

	let oldMemberTitle = getClientCurrentSubAccount(client).clanTitle;
	getClientCurrentSubAccount(client).clanTitle = params;
	messageClientSuccess(client, `You changed the name of [#AAAAAA]${getCharacterFullName(client)} [#FFFFFF]from [#AAAAAA]${oldMemberTitle} [#FFFFFF]to [#AAAAAA]${params}`);	
}

// ----------------------------------------------------------------------------

function setClanRankTitleCommand(command, params, client) {
	if(!doesClientHaveClanPermission(client, getClanFlagValue("rankTitle"))) {
		messageClientError(client, "You can not change your clan's rank titles!");
		return false;
	}	

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messageClientError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId);

	if(!getClanRankData(clanId, rankId)) {
		messageClientError(client, "Clan rank not found!");
		return false;
	}

	let oldRankName = getClanRankData(clanId, rankId).name;
	getClanRankData(clanId, rankId).name = params;
	messageClientSuccess(client, `You changed the name of rank ${rankId} from [#AAAAAA]${oldRankName} [#FFFFFF]to [#AAAAAA]${params}`);
}

// ----------------------------------------------------------------------------

function createClan(name) {
	let dbConnection = connectToDatabase();
	let escapedName = name;
	
	if(dbConnection) {
		escapedName = escapeDatabaseString(dbConnection, escapedName)
		let dbQuery = queryDatabase(dbConnection, `INSERT INTO clan_main (clan_server, clan_name) VALUES (${getServerId()}, '${escapedName}')`);
		disconnectFromDatabase(dbConnection);

		let tempClanData = loadClanFromDatabaseById(getDatabaseInsertId(dbConnection));
		if(tempClanData != false) {
			let tempClan = serverClasses.clanData(tempClanData);
			getServerData().clans.push(tempClan);
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