// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: bans.js
// DESC: Provides ban functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

const banType = {
    none: 0,
    account: 1,
    subAccount: 3,
    ipAddress: 4,
    uid: 5,
};

// ---------------------------------------------------------------------------

function initBanScript() {
    console.log("[Asshat.Ban]: Initializing ban script ...");
    addBanCommandHandlers();
    console.log("[Asshat.Ban]: Ban script initialized!");
}

// ---------------------------------------------------------------------------

function addBanCommandHandlers() {
    console.log("[Asshat.Ban]: Adding ban command handlers ...");
	let banCommands = serverData.commands.ban;
	for(let i in banCommands) {
		addCommandHandler(banCommands[i].command, banCommands[i].handlerFunction);
    }
    console.log("[Asshat.Ban]: Bans command handlers added! ...");
}

// ---------------------------------------------------------------------------

function accountBanCommand(command, params, client, fromDiscord) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	// Prevent banning admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "ManageServer") || doesClientHaveStaffPermission(targetClient, "Developer")) {
		messageClientError(client, "You cannot ban this person!");
        return false;
	}

	message(`[#996600][ADMIN]: [#FFFFFF]${getClientData(targetClient).accountData.name} has been banned from the server (account ban).`);
	banAccount(getClientData(targetClient).accountData.databaseId, getClientData(client).accountData.databaseId, "");
	targetClient.disconnect();	
}

// ---------------------------------------------------------------------------

function subAccountBanCommand(command, params, client, fromDiscord) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	// Prevent banning admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, "ManageServer") || doesClientHaveStaffPermission(targetClient, "Developer")) {
		messageClientError(client, "You cannot ban this person!");
		return false;
	}

	message(`[#996600][ADMIN]: [#FFFFFF]${getClientData(targetClient).currentSubAccountData.name} has been banned from the server (character ban).`);
	banSubAccount(getClientData(targetClient).currentSubAccountData.databaseId, getClientData(client).accountData.databaseId, "");
}

// ---------------------------------------------------------------------------

function ipBanCommand(command, params, client, fromDiscord) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
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

	message(`[#996600][ADMIN]: [#FFFFFF]vtargetClient.name} has been banned from the server (IP ban).`);
	banIPAddress(targetClient.ip, getClientData(client).accountData.databaseId, "");	
}

// ---------------------------------------------------------------------------

function banAccount(accountId, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapeString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_detail, ban_who_banned, ban_reason) VALUES (${banType.account}, ${accountId}, ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function banSubAccount(subAccountId, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapeString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_detail, ban_who_banned, ban_reason) VALUES (${banType.subAccount}, ${subAccountId}, ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function banIPAddress(ipAddress, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapeString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_detail, ban_who_banned, ban_reason) VALUES (${banType.ipAddress}, INET_ATON(${ipAddress}), ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanAccount(accountId, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, "UPDATE `ban_main` SET `ban_who_removed` = " + adminAccountId + ", `ban_removed` = 1 WHERE `ban_type` = " + banType.account + " AND ban_detail` = " + accountId + " AND `ban_removed` = 0");
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanSubAccount(subAccountId, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, "UPDATE `ban_main` SET `ban_who_removed` = " + adminAccountId + ", `ban_removed` = 1 WHERE `ban_type` = " + banType.subAccount + " AND ban_detail` = " + subAccountId + " AND `ban_removed` = 0");
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanIPAddress(ipAddress, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, "UPDATE `ban_main` SET `ban_who_removed` = " + adminAccountId + ", `ban_removed` = 1 WHERE `ban_type` = " + banType.ipAddress + " AND ban_detail` = " + ipAddress + " AND `ban_removed` = 0");
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function isAccountBanned(accountId) {
    let bans = serverData.bans;
    for(let i in bans) {
        if(bans[i].type == banType.account) {
            if(bans[i].detail == accountId) {
                return true;
            }
        }
    }

    return false;
}

// ---------------------------------------------------------------------------

function isSubAccountBanned(subAccountId) {
    let bans = serverData.bans;
    for(let i in bans) {
        if(bans[i].type == banType.subAcount) {
            if(bans[i].detail == subAccountId) {
                return true;
            }
        }
    }
    
    return false;
}

// ---------------------------------------------------------------------------

function isIpAddressBanned(ipAddress) {
    let bans = serverData.bans;
    for(let i in bans) {
        if(bans[i].type == banType.ipAddress) {
            if(bans[i].detail == ipAddress) {
                return true;
            }
        }
    }
    
    return false;
}

// ---------------------------------------------------------------------------

