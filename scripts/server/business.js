// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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
	
	if(dbConnection) {
		dbQuery = dbConnection.query("SELECT * FROM `biz_main` WHERE `biz_server` = " + String(serverId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbFetchAssoc = dbQuery.fetchAssoc()) {
					let tempBusinessData = businessData(dbFetchAssoc);
					tempBusinesses.push(tempBusinessData);
					console.log(`[Asshat.Business]: Business '${tempBusinessData.name}' loaded from database successfully!`);
				}
			}
			dbQuery.free();
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log("[Asshat.Business]: " + String(tempBusinesses.length) + " businesses loaded from database successfully!");
	return tempBusinesses;
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

function createBusiness(name, entrancePosition, interiorId, virtualWorld) {
	let dbConnection = connectToDatabase();
	let escapedName = name;
	
	if(dbConnection) {
		escapedName = dbConnection.escapeString(escapedName)
		let dbQuery = dbConnection.query("INSERT INTO `biz_main` (`biz_server`, `biz_name`, `biz_entrance_x`, `biz_entrance_y`, `biz_entrance_z`, `biz_entrance_int`, `biz_entrance_vw`) VALUES (" + String(serverId) + ", '" + escapedName + "', " + String(entrancePosition.x) + ", " + String(entrancePosition.y) + ", " + String(entrancePosition.z) + ", " + String(interiorId) + ", " + String(virtualWorld) + ")");
		disconnectFromDatabase(dbConnection);

		let tempBusinessData = loadBusinessFromDatabaseById(dbConnection.insertID);
		if(tempBusinessData != false) {
			let tempBusiness = getClasses().businessData(tempBusinessData);
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

	let businessId = Number(params);

	let tempBusinessData = serverData.businesses.filter(b => b.databaseId == businessId)[0];
	deleteBusiness(businessId);
	messageClientSuccess(client, `Business '${tempBusinessData.name} deleted!`);
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
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position).databaseId;

	let tempBusinessData = serverData.businesses.filter(b => b.databaseId == businessId)[0];

	serverData.businesses[businessId].name = newBusinessName;
	messageClientSuccess(client, `Business '${tempBusinessData.name}' renamed to '${newBusinessName}'!`);
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
	let businessId = Number(splitParams[1]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position).databaseId;

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

	let businessId = Number(splitParams[0]) || (isPlayerInAnyBusiness(client.player)) ? getPlayerBusiness(client.player) : getClosestBusinessEntrance(client.player.position).databaseId;

	serverData.businesses[businessId].locked = !serverData.businesses[businessId].locked;
	messageClientSuccess(client, "Business " + serverData.businesses[businessId].name + " " + (serverData.businesses[businessId].locked) ? "locked" : "unlocked" + "!");
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

}

// ---------------------------------------------------------------------------

function createAllBusinessPickups() {
	for(let i in serverData.businesses) {
		serverData.businesses.pickup = createPickup(serverConfig.businessPickupModel, serverData.businesses[i].position);
		serverData.businesses[i].pickup.setData("ag.ownerType", AG_PICKUP_BUSINESS, true);
        serverData.businesses[i].pickup.setData("ag.ownerId", i, true);
	}
}