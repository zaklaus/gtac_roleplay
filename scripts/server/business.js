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
	getServerData().businesses = loadBusinessesFromDatabase();
	createAllBusinessPickups();
	createAllBusinessBlips();
	console.log("[Asshat.Business]: Business script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadBusinessFromId(businessId) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM biz_main WHERE biz_id = ${businessId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			let dbAssoc = fetchQueryAssoc(dbQuery);
			freeDatabaseQuery(dbQuery);
			return new serverClasses.businessData(dbAssoc);
		}
		disconnectFromDatabase(dbConnection);
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function loadBusinessesFromDatabase() {
	console.log("[Asshat.Business]: Loading businesses from database ...");

	let tempBusinesses = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `SELECT * FROM biz_main WHERE biz_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempBusinessData = new serverClasses.businessData(dbAssoc);
					tempBusinessData.locations = loadBusinessLocationsFromDatabase(tempBusinessData.databaseId);
					tempBusinesses.push(tempBusinessData);
					console.log(`[Asshat.Business]: Business '${tempBusinessData.name}' (ID ${tempBusinessData.databaseId}) loaded from database successfully!`);
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
	//console.log("[Asshat.Business]: Loading locations from database ...");

	let tempBusinessLocations = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `biz_loc` WHERE `biz_loc_biz` = " + toString(businessId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempBusinessLocationData = new serverClasses.businessLocationData(dbAssoc);
					tempBusinessLocations.push(tempBusinessLocationData);
					//console.log(`[Asshat.Business]: Location '${tempBusinessLocationData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	//console.log(`[Asshat.Business]: ${tempBusinessLocations.length} location for business ${businessId} loaded from database successfully!`);
	return tempBusinessLocations;
}

// ---------------------------------------------------------------------------

function createBusinessCommand(command, params, client) {
	let tempBusinessData = createBusiness(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].business, getGameConfig().blipSprites[getServerGame()].business, getPlayerInterior(client), getPlayerVirtualWorld(client));
	getServerData().businesses.push(tempBusinessData);
	
	sendBusinessLabelToPlayers(getServerData().businesses.length-1);

	messageClientSuccess(client, `Business [#0099FF]${tempBusinessData.name} [#FFFFFF]created!`);
}

// ---------------------------------------------------------------------------

function createBusinessLocationCommand(command, params, client) {
	if(!isPlayerSpawned(client)) {
		messageClientError("You must be spawned to use this command!");
		return false;
	}

	let locationType = toString(splitParams[0]);
	let businessId = toInteger(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));	

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}		

	let tempBusinessLocationData = createBusinessLocation(locationType, businessId);
	getServerData().businesses[businessId].push(tempBusinessLocationData);

	messageClientSuccess(client, `Business location [#0099FF]${params} [#FFFFFF]created for business [#0099FF]${tempBusinessData.name}`);
}

// ---------------------------------------------------------------------------

function createBusiness(name, entrancePosition, exitPosition, entrancePickupModel = -1, entranceBlipModel = -1, entranceInteriorId = 0, entranceVirtualWorld = 0, exitInteriorId = -1, exitVirtualWorld = -1, exitPickupModel = -1, exitBlipModel = -1) {
	let tempBusinessData = new serverClasses.businessData(false);
	tempBusinessData.name = name;

	tempBusinessData.entrancePosition = entrancePosition;
	tempBusinessData.entranceRotation = 0.0;
	tempBusinessData.entrancePickupModel = entrancePickupModel;
	tempBusinessData.entranceBlipModel = entranceBlipModel;
	tempBusinessData.entranceInterior = entranceInteriorId;
	tempBusinessData.entranceDimension = entranceVirtualWorld;

	tempBusinessData.exitPosition = exitPosition;
	tempBusinessData.exitRotation = 0.0;
	tempBusinessData.exitPickupModel = exitPickupModel;
	tempBusinessData.exitBlipModel = exitBlipModel;
	tempBusinessData.exitInterior = exitInteriorId;
	tempBusinessData.exitDimension = exitVirtualWorld;	

	if(entrancePickupModel != -1) {
		tempBusinessData.entrancePickup = gta.createPickup(entrancePickupModel, entrancePosition, getGameConfig().pickupTypes[getServerGame()].business);
	}

	if(entranceBlipModel != -1) {
		tempBusinessData.entranceBlip = gta.createBlip(entrancePosition, entranceBlipModel, 1, getColourByName("lightPurple")); 
	}

	return tempBusinessData;
}

// ---------------------------------------------------------------------------

function deleteBusinessCommand(command, params, client) {
	let businessId = toInteger(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}		

	deleteBusiness(businessId);
	messageClientSuccess(client, `Business [#0099FF]${tempBusinessData.name} [#FFFFFF]deleted!`);
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationCommand(command, params, client) {
	//let businessId = toInteger(splitParams[1]);
	//deleteBusinessLocation(businessId);
	//messageClientSuccess(client, `Business '${tempBusinessData.name} deleted!`);
}

// ---------------------------------------------------------------------------

function setBusinessNameCommand(command, params, client) {
	let splitParams = params.split(" ");

	let newBusinessName = toString(params);

	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}	

	getBusinessData(businessId).name = newBusinessName;
	messageClientSuccess(client, `Business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]renamed to '${newBusinessName}'!`);
}

// ---------------------------------------------------------------------------

function setBusinessOwnerCommand(command, params, client) {
	let splitParams = params.split(" ");

	let newBusinessOwner = getClientFromParams(params);
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!newBusinessOwner) {
		messageClientError("Player not found!");
		return false;
	}

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_PLAYER;
	getBusinessData(businessId).ownerId = getServerData().clients[newBusinessOwner.index].accountData.databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner set to '${newBusinessOwner.name}'!`);
}

// ---------------------------------------------------------------------------

function setBusinessClanCommand(command, params, client) {
	let clanId = getClanFromParams(params);
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	if(!getClanData(clanId)) {
		messageClientError("Clan not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_CLAN;
	getBusinessData(businessId).ownerId = getClanData(clanId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner set to [#AAAAAA]${getClanData(clanId).name} [#FFFFFF]clan`);
}

// ---------------------------------------------------------------------------

function setBusinessJobCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));	
	
	let closestJobLocation = getClosestJobLocation(getVehiclePosition(vehicle));
	let jobId = closestJobLocation.job;

	if(!areParamsEmpty(params)) {
		jobId = getJobIdFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	if(!getJobData(jobId)) {
		messageClientError("Job not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_JOB;
	getBusinessData(businessId).ownerId = getJobData(jobId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner set to the [#AAAAAA]${getJobData(jobId).name} [#FFFFFF]job`);
}


// ---------------------------------------------------------------------------

function setBusinessPublicCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));	

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_PUBLIC;
	getBusinessData(businessId).ownerId = 0;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner set to [#AAAAAA]public`);
}

// ---------------------------------------------------------------------------

function lockBusinessCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));
	
	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}	

	getBusinessData(businessId).locked = !getBusinessData(businessId).locked;
	messageClientSuccess(client, `${getLockedUnlockedEmojiFromBool((getBusinessData(businessId).locked))} Business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]${getLockedUnlockedTextFromBool((getBusinessData(businessId).locked))}!`);
}

// ---------------------------------------------------------------------------

function setBusinessEntranceFeeCommand(command, params, client) {
	let entranceFee = toInteger(params) || 0;
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	getBusinessData(businessId).entranceFee = entranceFee;
	messageClientSuccess(client, `Business '${getBusinessData(businessId).name}' entrance fee to $'${entranceFee}'!`);
}

// ---------------------------------------------------------------------------

function getBusinessInfoCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!areParamsEmpty(params)) {
		businessId = toInteger(params);
	}

	if(!getBusinessData(businessId)) {
		messageClientError(client, "Business not found!");
		return false;
	}

	let ownerName = "Unknown";
	switch(getBusinessData(businessId).ownerType) {
		case AG_BIZOWNER_CLAN:
			ownerName = getClanData(getBusinessData(businessId).ownerId).name;
			break;

		case AG_BIZOWNER_JOB:
			ownerName = getJobData(getBusinessData(businessId).ownerId).name;
			break;

		case AG_BIZOWNER_PLAYER:
			let subAccountData = loadSubAccountFromId(getBusinessData(businessId).ownerId);
			ownerName = `${subAccountData.firstName} ${subAccountData.lastName} [${subAccountData.databaseId}]`;
			break;

		case AG_BIZOWNER_NONE:
			ownerName = "None";
			break;

		case AG_BIZOWNER_PUBLIC:
			ownerName = "Public";
			break;			
	}	

	messageClientInfo(client, `[#0099FF][Business Info] [#FFFFFF]Name: [#AAAAAA]${getBusinessData(businessId).name}, [#FFFFFF]Owner: [#AAAAAA]${ownerName} (${getBusinessOwnerTypeText(getBusinessData(businessId).ownerType)}), [#FFFFFF]Locked: [#AAAAAA]${getYesNoFromBool(intToBool(getBusinessData(businessId).locked))}, [#FFFFFF]ID: [#AAAAAA]${businessId}/${getBusinessData(businessId).databaseId}`);
}

// ---------------------------------------------------------------------------

function setBusinessPickupCommand(command, params, client) {
	let typeParam = params || "business";
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!getBusinessData(businessId)) {
		messageClientError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().pickupModels[getServerGame()][typeParam])) {
			messageClientError(client, "Invalid business type! Use a business type name or a pickup model ID");
			messageClientInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().pickupModels[getServerGame()]).join(", ")}`)
			return false;
		}

		getBusinessData(businessId).entrancePickupModel = getGameConfig().pickupModels[getServerGame()][typeParam];
	} else {
		getBusinessData(businessId).entrancePickupModel = toInteger(typeParam);
	}

	if(getBusinessData(businessId).entrancePickupModel != -1) {
		if(getBusinessData(businessId).entrancePickup != null) {
			destroyElement(getBusinessData(businessId).entrancePickup);
			getBusinessData(businessId).entrancePickup = null;
		}

		getBusinessData(businessId).entrancePickup = gta.createPickup(getBusinessData(businessId).entrancePickupModel, getBusinessData(businessId).entrancePosition);
		getBusinessData(businessId).pickup.setData("ag.ownerType", AG_PICKUP_BUSINESS, true);
		getBusinessData(businessId).pickup.setData("ag.ownerId", i, true);
	}	

	messageClientSuccess(client, `Business '${getBusinessData(businessId).name}' pickup display set to '${toLowerCase(typeParam)}'!`);
}

// ---------------------------------------------------------------------------

function setBusinessBlipCommand(command, params, client) {
	let splitParams = params.split(" ");

	let typeParam = splitParams[0] || "business";
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!getBusinessData(businessId)) {
		messageClientError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().blipSprites[getServerGame()][typeParam])) {
			messageClientError(client, "Invalid business type! Use a business type name or a blip image ID");
			messageClientInfo(client, `Blip Types: [#AAAAAA]${Object.keys(getGameConfig().blipSprites[getServerGame()]).join(", ")}`)
			return false;
		}

		getBusinessData(businessId).entranceBlipModel = getGameConfig().blipSprites[getServerGame()][typeParam];
	} else {
		getBusinessData(businessId).entranceBlipModel = toInteger(typeParam);
	}

	if(getBusinessData(businessId).entranceBlipModel != -1) {
		if(getBusinessData(businessId).entranceBlip != null) {
			destroyElement(getBusinessData(businessId).entranceBlip);
			getBusinessData(businessId).entranceBlip = null;
		}

		getBusinessData(businessId).entranceBlip = gta.createPickup(getBusinessData(businessId).entranceBlipModel, getBusinessData(businessId).entrancePosition);
	}	

	messageClientSuccess(client, `Business '${getBusinessData(businessId).name}' blip display set to '${toLowerCase(typeParam)}'!`);
}

// ---------------------------------------------------------------------------

function withdrawFromBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let amount = toInteger(splitParams[0]) || 0;
	let businessId = toInteger(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messageClientError("Business not found!");
		return false;
	}

	let tempBusinessData = getServerData().businesses.filter(b => b.databaseId == businessId)[0];
	
	if(getServerData().businesses[businessId].till < amount) {
		messageClientError(client, `Business '${tempBusinessData.name}' doesn't have that much money! Use /bizbalance.`);
		return false;
	}

	getServerData().businesses[businessId].till -= amount;
	getClientCurrentSubAccount(client).cash += amount;
	updatePlayerCash(client);
	messageClientSuccess(client, `You withdrew $${amount} from business '${tempBusinessData.name}''s till'`);
}

// ---------------------------------------------------------------------------

function depositIntoBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let amount = toInteger(splitParams[0]) || 0;
	let businessId = toInteger(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));
	
	if(getClientCurrentSubAccount(client).cash < amount) {
		messageClientError(client, `You don't have that much money! You only have $${getClientCurrentSubAccount(client).cash}`);
		return false;
	}

	getServerData().businesses[businessId].till += amount;
	getClientCurrentSubAccount(client).cash -= amount;
	updatePlayerCash(client);
	messageClientSuccess(client, `You deposited $${amount} into business '${tempBusinessData.name}''s till'`);
}

// ---------------------------------------------------------------------------

function viewBusinessTillAmountCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	messageClientSuccess(client, `Business '${getServerData().businesses[businessId].name}' till has $'${getServerData().businesses[businessId].till}'!`);
}

// ---------------------------------------------------------------------------

function moveBusinessEntranceCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));
	
	getBusinessData(businessId).entrancePosition = getPlayerPosition(client);
	getBusinessData(businessId).entranceDimension = getPlayerVirtualWorld(client);
	getBusinessData(businessId).entranceInterior = getPlayerInterior(client);
	
	deleteBusinessEntranceBlip(businessId);
	deleteBusinessEntrancePickup(businessId);

	createBusinessEntranceBlip(businessId);
	createBusinessEntrancePickup(businessId);

	messageClientSuccess(client, `Business '${getBusinessData(businessId).name}' entrance has been moved to your position`);
}

// ---------------------------------------------------------------------------

function moveBusinessExitCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));
	
	getBusinessData(businessId).exitPosition = getPlayerPosition(client);
	getBusinessData(businessId).exitDimension = getPlayerVirtualWorld(client);
	getBusinessData(businessId).exitInterior = getPlayerInterior(client);
	
	deleteBusinessExitBlip(businessId);
	deleteBusinessExitPickup(businessId);
	
	createBusinessExitBlip(businessId);
	createBusinessExitPickup(businessId);

	messageClientSuccess(client, `Business '${getBusinessData(businessId).name}' exit has been moved to your position`);
}

// ---------------------------------------------------------------------------

function getBusinessDataFromDatabaseId(databaseId) {
	let matchingBusinesses = getServerData().businesses.filter(b => b.databaseId == businessId)
	if(matchingBusinesses.length == 1) {
		return matchingBusinesses[0];
	}
	return false;
}

// ---------------------------------------------------------------------------

function getClosestBusinessEntrance(position) {
	let closest = 0;
	let businesses = getServerData().businesses;
	for(let i in businesses) {
		if(getDistance(position, businesses[i].entrancePosition) <= getDistance(position, businesses[closest].entrancePosition)) {
			closest = i;
		}
	}
	return closest;
}

// ---------------------------------------------------------------------------

function isPlayerInAnyBusiness(client) {
	if(doesEntityDataExist(client, "ag.inBusiness")) {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function getPlayerBusiness(client) {
	if(doesEntityDataExist(client, "ag.inBusiness")) {
		return getEntityData(client, "ag.inBusiness");
	}

	return false;
}

// ---------------------------------------------------------------------------

function saveAllBusinessesToDatabase() {
	for(let i in getServerData().businesses) {
		saveBusinessToDatabase(i);
	}
}

// ---------------------------------------------------------------------------

function saveBusinessToDatabase(businessId) {
	let tempBusinessData = getServerData().businesses[businessId]
	console.log(`[Asshat.Business]: Saving business '${tempBusinessData.name}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeBusinessName = escapeDatabaseString(dbConnection, tempBusinessData.name);
		if(tempBusinessData.databaseId == 0) {
			let dbQueryString = `INSERT INTO biz_main (biz_server, biz_name, biz_owner_type, biz_owner_id, biz_locked, biz_entrance_fee, biz_till, biz_entrance_pos_x, biz_entrance_pos_y, biz_entrance_pos_z, biz_entrance_rot_z, biz_entrance_int, biz_entrance_vw, biz_exit_pos_x, biz_exit_pos_y, biz_exit_pos_z, biz_exit_rot_z, biz_exit_int, biz_exit_vw) VALUES (${getServerId()}, '${safeBusinessName}', ${tempBusinessData.ownerType}, ${tempBusinessData.ownerId}, ${boolToInt(tempBusinessData.locked)}, ${tempBusinessData.entranceFee}, ${tempBusinessData.till}, ${tempBusinessData.entrancePosition.x}, ${tempBusinessData.entrancePosition.y}, ${tempBusinessData.entrancePosition.z}, ${tempBusinessData.entranceRotation}, ${tempBusinessData.entranceInterior}, ${tempBusinessData.entranceDimension}, ${tempBusinessData.exitPosition.x}, ${tempBusinessData.exitPosition.y}, ${tempBusinessData.exitPosition.z}, ${tempBusinessData.exitRotation}, ${tempBusinessData.exitInterior}, ${tempBusinessData.exitDimension})`;
			queryDatabase(dbConnection, dbQueryString);
			getServerData().businesses[businessId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE biz_main SET biz_name='${safeBusinessName}', biz_owner_type=${tempBusinessData.ownerType}, biz_owner_id=${tempBusinessData.ownerId}, biz_locked=${boolToInt(tempBusinessData.locked)}, biz_entrance_fee=${tempBusinessData.entranceFee}, biz_till=${tempBusinessData.till}, biz_entrance_pos_x=${tempBusinessData.entrancePosition.x}, biz_entrance_pos_y=${tempBusinessData.entrancePosition.y}, biz_entrance_pos_z=${tempBusinessData.entrancePosition.z}, biz_entrance_rot_z=${tempBusinessData.entranceRotation}, biz_entrance_int=${tempBusinessData.entranceInterior}, biz_entrance_vw=${tempBusinessData.entranceDimension}, biz_exit_pos_x=${tempBusinessData.exitPosition.x}, biz_exit_pos_y=${tempBusinessData.exitPosition.y}, biz_exit_pos_z=${tempBusinessData.exitPosition.z}, biz_exit_rot_z=${tempBusinessData.exitRotation}, biz_exit_int=${tempBusinessData.exitInterior}, biz_exit_vw=${tempBusinessData.exitDimension} WHERE biz_id=${tempBusinessData.databaseId}`;
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
	for(let i in getServerData().businesses) {
		createBusinessEntrancePickup(i);
		createBusinessExitPickup(i);
	}
}

// ---------------------------------------------------------------------------

function createAllBusinessBlips() {
	for(let i in getServerData().businesses) {
		createBusinessEntranceBlip(i);
		createBusinessExitBlip(i);
	}
}

// ---------------------------------------------------------------------------

function createBusinessEntrancePickup(businessId) {
	if(getServerData().businesses[businessId].pickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].business;

		if(getServerData().businesses[businessId].entrancePickupModel != 0) {
			pickupModelId = getServerData().businesses[businessId].entrancePickupModel;
		}

		getServerData().businesses[businessId].entrancePickup = gta.createPickup(pickupModelId, getServerData().businesses[businessId].entrancePosition);
		//getServerData().businesses[businessId].entrancePickup.dimension = getServerData().businesses[i].entranceDimension;
		//getServerData().businesses[businessId].entrancePickup.interior = getServerData().businesses[i].entranceInterior;
		getServerData().businesses[businessId].entrancePickup.setData("ag.ownerType", AG_PICKUP_BUSINESS, true);
		getServerData().businesses[businessId].entrancePickup.setData("ag.ownerId", businessId, true);
	}
}

// ---------------------------------------------------------------------------

function createBusinessEntranceBlip(businessId) {
	return false;
}

// ---------------------------------------------------------------------------

function createBusinessExitPickup(businessId) {
	return false;
}

// ---------------------------------------------------------------------------

function createBusinessExitBlip(businessId) {
	return false;
}

// ---------------------------------------------------------------------------

function deleteBusiness(businessId) {
	let tempBusinessData = getServerData().businesses[businessId];

	let dbConnection = connectToDatabase();
	let dbQuery = null;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `UPDATE biz_main SET biz_deleted = 1 AND biz_who_deleted = ${getPlayerData(client).accountData.databaseId} AND biz_when_deleted = UNIX_TIMESTAMP() WHERE biz_id = ${tempBusinessData.databaseId} LIMIT 1`);
		if(dbQuery) {
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	deleteBusinessEntrancePickup(businessId);
	deleteBusinessExitPickup(businessId);

	deleteBusinessEntranceBlip(businessId);
	deleteBusinessExitBlip(businessId);	

	removePlayersFromBusiness(businessId);
}

// ---------------------------------------------------------------------------

function removePlayersFromBusiness(businessId) {
	getClients().forEach(function(client) {
		if(doesBusinessHaveInterior(businessId)) {
			if(doesEntityDataExist(client, "ag.inBusiness")) {
				if(getEntityData(client, "ag.inBusiness") == businessId) {
					exitBusiness(client);
				}
			}
		}
	});
}

// ---------------------------------------------------------------------------

function exitBusiness(client) {
	let businessId = getEntityData(client, "ag.inBusiness");
	if(isPlayerSpawned(client)) {
		triggerNetworkEvent("ag.interior", client, getServerData().businesses[businessId].entranceInterior);
		triggerNetworkEvent("ag.dimension", client, getServerData().businesses[businessId].entranceDimension);
		triggerNetworkEvent("ag.position", client, getServerData().businesses[businessId].entrancePosition);
	}
}

// ---------------------------------------------------------------------------

function getBusinessOwnerTypeText(ownerType) {
	switch(ownerType) {
		case AG_BIZOWNER_CLAN:
			return "clan";

		case AG_BIZOWNER_JOB:
			return "job";

		case AG_BIZOWNER_PLAYER:
			return "player";		

		case AG_BIZOWNER_NONE:
		case AG_BIZOWNER_PUBLIC:
			return "not owned";			
			
		default:
			return "unknown";
	}
}

// ---------------------------------------------------------------------------

function getBusinessData(businessId) {
	if(typeof getServerData().businesses[businessId] != null) {
		return getServerData().businesses[businessId];
	}
	return false;
}

// ---------------------------------------------------------------------------

function doesBusinessHaveInterior(businessId) {
	//if(!getBusinessData(businessId)) {
	//	return false;
	//}

	let businessData = getBusinessData(businessId);
	//if(businessData.exitPosition == toVector3(0.0, 0.0, 0.0)) {
	//	return false;
	//}

	//if(businessData.exitInterior == businessData.exitInterior) {
	//	return false;
	//}

	if(businessData.exitInterior == 0) {
		return false;
	}

	if(businessData.exitInterior == -1) {
		return false;
	}	

	return true;
}

// ---------------------------------------------------------------------------

function sendAllBusinessLabelsToPlayer(client) {
	let tempBusinessLabels = [];
	for(let i in getServerData().businesses) {
		tempBusinessLabels.push([i, getServerData().businesses[i].entrancePosition, getGameConfig().propertyLabelHeight[getServerGame()], getServerData().businesses[i].name, getServerData().businesses[i].locked, false]);
	}
		
	triggerNetworkEvent("ag.bizlabel.all", client, tempBusinessLabels);
}

// ---------------------------------------------------------------------------

function sendBusinessLabelToPlayers(businessId) {
	triggerNetworkEvent("ag.bizlabel.add", null, businessId, getServerData().businesses[businessId].entrancePosition, getGameConfig().propertyLabelHeight[getServerGame()], getServerData().businesses[businessId].name, getServerData().businesses[businessId].locked, false);
}

// ---------------------------------------------------------------------------

function deleteBusinessEntrancePickup(businessId) {
	if(getBusinessData(businessId).entrancePickup != null) {
		destroyElement(getBusinessData(businessId).entrancePickup);
		getBusinessData(businessId).entrancePickup = null;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessExitPickup(businessId) {
	if(getBusinessData(businessId).exitPickup != null) {
		destroyElement(getBusinessData(businessId).exitPickup);
		getBusinessData(businessId).exitPickup = null;
	}	
}

// ---------------------------------------------------------------------------

function deleteBusinessEntranceBlip(businessId) {
	if(getBusinessData(businessId).entranceBlip != null) {
		destroyElement(getBusinessData(businessId).entranceBlip);
		getBusinessData(businessId).entranceBlip = null;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessExitBlip(businessId) {
	if(getBusinessData(businessId).exitBlip != null) {
		destroyElement(getBusinessData(businessId).exitBlip);
		getBusinessData(businessId).exitBlip = null;
	}	
}

// ---------------------------------------------------------------------------