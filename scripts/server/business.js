// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: business.js
// DESC: Provides business functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initBusinessScript() {
	console.log("[Asshat.Business]: Initializing business script ...");
	serverData.businesses = loadBusinessesFromDatabase();
	createAllBusinessPickups();
	addBusinessCommandHandlers();
	console.log("[Asshat.Business]: Business script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addBusinessCommandHandlers() {
	console.log("[Asshat.Business]: Adding business commands!");
	let businessCommands = serverCommands.business;
	for(let i in businessCommands) {
		addCommandHandler(businessCommands[i].command, businessCommands[i].handlerFunction);
	}
	console.log("[Asshat.Business]: Business commands added!");
	return true;
}

// ---------------------------------------------------------------------------

function loadBusinessesFromDatabase() {
	console.log("[Asshat.Business]: Loading businesses from database ...");

	let tempBusinesses = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `biz_main` WHERE `biz_server` = " + String(serverId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempBusinessData = new serverClasses.businessData(dbAssoc);
					tempBusinessData.locations = loadBusinessLocationsFromDatabase(tempBusinessData.databaseId);
					tempBusinesses.push(tempBusinessData);
					console.log(`[Asshat.Business]: Business '${tempBusinessData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Business]: ${tempBusinesses.length} businesses loaded from database successfully!`);
	return tempBusinesses;
}

// ---------------------------------------------------------------------------

function loadBusinessLocationsFromDatabase(businessId) {
	console.log("[Asshat.Business]: Loading locations from database ...");

	let tempBusinessLocations = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `biz_loc` WHERE `biz_loc_biz` = " + String(businessId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempBusinessLocationData = new serverClasses.businessLocationData(dbAssoc);
					tempBusinessLocations.push(tempBusinessLocationData);
					console.log(`[Asshat.Business]: Location '${tempBusinessLocationData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Business]: ${tempBusinessLocations.length} location for business ${businessId} loaded from database successfully!`);
	return tempBusinessLocations;
}

// ---------------------------------------------------------------------------

function createBusinessCommand(command, params, client) {
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

	if(isClientSpawned(client)) {
		messageClientError("You must be spawned to use this command!");
		return false;
	}

	createBusiness(params, client.player.position, getClientInterior(client), getClientVirtualWorld(client));
	messageClientSuccess(client, "Business created in " + getAreaName(client.player.position) + " (" + params + ")");
}

// ---------------------------------------------------------------------------

function createBusinessLocationCommand(command, params, client) {
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

	if(isClientSpawned(client)) {
		messageClientError("You must be spawned to use this command!");
		return false;
	}

	let locationType = String(splitParams[0]);
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);	

	createBusinessLocation(locationType, businessId);
	messageClientSuccess(client, "Business created in " + getAreaName(client.player.position) + " (" + params + ")");
}

// ---------------------------------------------------------------------------

function createBusiness(name, entrancePosition, interiorId, virtualWorld) {
	let dbConnection = connectToDatabase();
	let escapedName = name;
	
	if(dbConnection) {
		escapedName = escapeDatabaseString(dbConnection, escapedName)
		let dbQuery = queryDatabase(dbConnection, "INSERT INTO `biz_main` (`biz_server`, `biz_name`, `biz_entrance_x`, `biz_entrance_y`, `biz_entrance_z`, `biz_entrance_int`, `biz_entrance_vw`) VALUES (" + String(serverId) + ", '" + escapedName + "', " + String(entrancePosition.x) + ", " + String(entrancePosition.y) + ", " + String(entrancePosition.z) + ", " + String(interiorId) + ", " + String(virtualWorld) + ")");
		disconnectFromDatabase(dbConnection);

		let tempBusinessData = loadBusinessFromDatabaseById(dbConnection.insertID);
		if(tempBusinessData != false) {
			let tempBusiness = new serverClasses.businessData(tempBusinessData);
			serverData.business.push(tempBusiness);
		}
	}
	return true;
}

// ---------------------------------------------------------------------------

function deleteBusinessCommand(command, params, client) {
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

	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);
	deleteBusiness(businessId);
	messageClientSuccess(client, `Business '${tempBusinessData.name} deleted!`);
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationCommand(command, params, client) {
	messageClientError(client, "This command is under construction!");
	return false;

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

	//let businessId = Number(splitParams[1]);
	//deleteBusinessLocation(businessId);
	//messageClientSuccess(client, `Business '${tempBusinessData.name} deleted!`);
}

// ---------------------------------------------------------------------------

function setBusinessNameCommand(command, params, client) {
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

	let splitParams = params.split(" ");

	let newBusinessName = String(splitParams[0]);
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);

	serverData.businesses[businessId].name = newBusinessName;
	messageClientSuccess(client, `Business '${serverData.businesses[businessId].name}' renamed to '${newBusinessName}'!`);
}

// ---------------------------------------------------------------------------

function setBusinessOwnerCommand(command, params, client) {
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

	if(isClientSpawned(client)) {
		messageClientError("You must be spawned to use this command!");
		return false;
	}

	let splitParams = params.split(" ");

	let newBusinessOwner = getClientFromParams(splitParams[0]);
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);

	if(!newBusinessOwner) {
		messageClientError("Player not found!");
		return false;
	}

	if(!getBusinessDataFromDatabaseId(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	serverData.businesses[businessId].ownerId = serverData.clients[newBusinessOwner.index].accountData.databaseId;
	messageClientSuccess(client, `Business '${serverData.businesses[businessId].name}' owner set to '${newBusinessOwner.name}'!`);
}

// ---------------------------------------------------------------------------

function lockBusinessCommand(command, params, client) {
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

	if(isClientSpawned(client)) {
		messageClientError("You must be spawned to use this command!");
		return false;
	}

	let splitParams = params.split(" ");

	let businessId = Number(splitParams[0]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);

	serverData.businesses[businessId].locked = !serverData.businesses[businessId].locked;
	messageClientSuccess(client, "Business " + serverData.businesses[businessId].name + " " + (serverData.businesses[businessId].locked) ? "locked" : "unlocked" + "!");
}

// ---------------------------------------------------------------------------

function setBusinessEntranceFeeCommand(command, params, client) {
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

	let splitParams = params.split(" ");

	let entranceFee = Number(splitParams[0]) || 0;
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);

	serverData.businesses[businessId].entranceFee = entranceFee;
	messageClientSuccess(client, `Business '${serverData.businesses[businessId].name}' entrance fee to $'${entranceFee}'!`);
}

// ---------------------------------------------------------------------------

function withdrawFromBusinessCommand(command, params, client) {
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

	let splitParams = params.split(" ");

	let amount = Number(splitParams[0]) || 0;
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);

	let tempBusinessData = serverData.businesses.filter(b => b.databaseId == businessId)[0];
	
	if(serverData.businesses[businessId].till < amount) {
		messageClientError(client, `Business '${tempBusinessData.name}' doesn't have that much money! Use /bizbalance.`);
		return false;
	}

	serverData.businesses[businessId].till -= amount;
	getClientCurrentSubAccount(client).cash += amount;
	updatePlayerCash(client);
	messageClientSuccess(client, `You withdrew $${amount} from business '${tempBusinessData.name}''s till'`);
}

// ---------------------------------------------------------------------------

function depositIntoBusinessCommand(command, params, client) {
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

	let splitParams = params.split(" ");

	let amount = Number(splitParams[0]) || 0;
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);
	
	if(getClientCurrentSubAccount(client).cash < amount) {
		messageClientError(client, `You don't have that much money! You only have $${getClientCurrentSubAccount(client).cash}`);
		return false;
	}

	serverData.businesses[businessId].till += amount;
	getClientCurrentSubAccount(client).cash -= amount;
	updatePlayerCash(client);
	messageClientSuccess(client, `You deposited $${amount} into business '${tempBusinessData.name}''s till'`);
}

// ---------------------------------------------------------------------------

function viewBusinessTillAmountCommand(command, params, client) {
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

	//if(areParamsEmpty(params)) {
	//	messageClientSyntax(client, getCommandSyntaxText(command));
	//	return false;
	//}

	let splitParams = params.split(" ");

	let businessId = Number(splitParams[0]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position);

	messageClientSuccess(client, `Business '${serverData.businesses[businessId].name}''s till has $'${serverData.businesses[businessId].till}'!`);
}

// ---------------------------------------------------------------------------

function getBusinessDataFromDatabaseId(databaseId) {
	let matchingBusinesses = serverData.businesses.filter(b => b.databaseId == businessId)
	if(matchingBusinesses.length == 1) {
		return matchingBusinesses[0];
	}
	return false;
}

// ---------------------------------------------------------------------------

function getClosestBusinessEntrance(position) {
	return serverData.businesses.reduce((i, j) => ((i.entrancePosition.distance(position) <= j.entrancePosition.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function isPlayerInAnyBusiness(player) {
	if(player.getData("ag.inBusiness")) {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function getPlayerBusiness(player) {
	if(player.getData("ag.inBusiness")) {
		return player.getData("ag.inBusiness");
	}

	return false;
}

// ---------------------------------------------------------------------------

function saveAllBusinessesToDatabase() {
	for(let i in serverData.businesses) {
		saveBusinessToDatabase(i);
	}
}

// ---------------------------------------------------------------------------

function saveBusinessToDatabase(businessId) {
	let tempBusinessData = serverData.businesses[businessId]
	console.log(`[Asshat.Business]: Saving business '${tempBusinessData.name}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		if(tempBusinessData.databaseId == 0) {
			let dbQueryString = `INSERT INTO biz_main (biz_name, biz_owner_type, biz_owner_id, biz_locked, biz_entrance_fee, biz_till, biz_entrance_pos_x, biz_entrance_pos_y, biz_entrance_pos_z, biz_entrance_rot_z, biz_entrance_int, biz_entrance_vw, biz_exit_pos_x, biz_exit_pos_y, biz_exit_pos_z, biz_exit_rot_z, biz_exit_int, biz_exit_vw) VALUES ('${tempBusinessData.name}', ${tempBusinessData.ownerType}, ${tempBusinessData.ownerId}, ${boolToInt(tempBusinessData.locked)}, ${tempBusinessData.entranceFee}, ${tempBusinessData.till}, ${tempBusinessData.entrancePos.x}, ${tempBusinessData.entrancePos.y}, ${tempBusinessData.entrancePos.z}, ${tempBusinessData.entranceHeading}, ${tempBusinessData.entranceInterior}, ${tempBusinessData.entranceDimension}, ${tempBusinessData.exitPos.x}, ${tempBusinessData.exitPos.y}, ${tempBusinessData.exitPos.z}, ${tempBusinessData.exitHeading}, ${tempBusinessData.exitInterior}, ${tempBusinessData.exitDimension})`;
			queryDatabase(dbConnection, dbQueryString);
			serverData.businesses[businessId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE biz_main SET biz_name=${tempBusinessData.name}, biz_owner_type=${tempBusinessData.ownerType}, biz_owner_id=${tempBusinessData.ownerId}, biz_locked=${boolToInt(tempBusinessData.locked)}, biz_entrance_fee=${tempBusinessData.entranceFee}, biz_till=${tempBusinessData.till}, biz_entrance_pos_x=${tempBusinessData.entrancePos.x}, biz_entrance_pos_y=${tempBusinessData.entrancePos.y}, biz_entrance_pos_z=${tempBusinessData.entrancePos.z}, biz_entrance_rot_z=${tempBusinessData.entranceHeading}, biz_entrance_int=${tempBusinessData.entranceInterior}, biz_entrance_vw=${tempBusinessData.entranceDimension}, biz_exit_pos_x=${tempBusinessData.exitPos.x}, biz_exit_pos_y=${tempBusinessData.exitPos.y}, biz_exit_pos_z=${tempBusinessData.exitPos.z}, biz_exit_rot_z=${tempBusinessData.exitHeading}, biz_exit_int=${tempBusinessData.exitInterior}, biz_exit_vw=${tempBusinessData.exitDimension} WHERE biz_id=${tempBusinessData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Business]: Saved business '${tempBusinessData.name}' to database!`);

	return false;	
}

// ---------------------------------------------------------------------------

function createAllBusinessPickups() {
	for(let i in serverData.businesses) {
		serverData.businesses.pickup = createPickup(serverConfig.businessPickupModel, serverData.businesses[i].position);
		serverData.businesses[i].pickup.setData("ag.ownerType", AG_PICKUP_BUSINESS, true);
        serverData.businesses[i].pickup.setData("ag.ownerId", i, true);
	}
}

// ---------------------------------------------------------------------------

function deleteBusiness(businessId) {
	let tempBusinessData = serverData.businesses[businessId];

	let dbConnection = connectToDatabase();
	let dbQuery = null;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `UPDATE biz_main SET biz_deleted = 1 AND biz_who_deleted = ${getClientData(client).accountData.databaseId} AND biz_when_deleted = UNIX_TIMESTAMP() WHERE biz_id = ${tempBusinessData.databaseId} LIMIT 1`);
		if(dbQuery) {
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	destroyElement(tempBusinessData.pickup);
	removePlayersFromBusiness(businessId);
}

// ---------------------------------------------------------------------------

/*
function deleteBusiness(businessId) {
	let tempBusinessData = serverData.businesses[businessId];

	let dbConnection = connectToDatabase();
	let dbQuery = null;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `UPDATE biz_main SET biz_deleted = 1 AND biz_who_deleted = ${getClientData(client).accountData.databaseId} AND biz_when_deleted = UNIX_TIMESTAMP() WHERE biz_id = ${tempBusinessData.databaseId} LIMIT 1`);
		if(dbQuery) {
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	destroyElement(tempBusinessData.pickup);
	removePlayersFromBusiness(businessId);
}
*/

// ---------------------------------------------------------------------------

function removePlayersFromBusiness(businessId) {
	getClients().forEach(function(client) {
		if(client.getData("ag.inBusiness")) {
			if(client.getData("ag.inBusiness") == businessId) {
				exitBusiness(client);
			}
		}
	});
}

// ---------------------------------------------------------------------------

function exitBusiness(client) {
	let businessId = client.getData("ag.inBusiness");
	if(client.player) {
		triggerNetworkEvent("ag.interior", client, serverData.businesses[businessId].entranceInterior);
		triggerNetworkEvent("ag.dimension", client, serverData.businesses[businessId].entranceDimension);
		triggerNetworkEvent("ag.position", client, serverData.businesses[businessId].entrancePosition);
	}
}

// ---------------------------------------------------------------------------