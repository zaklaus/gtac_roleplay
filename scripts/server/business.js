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
					console.log(`[Asshat.Business]: Business '${tempBusinessData.name}' (ID ${tempBusinessData.databaseId}) loaded from database successfully`);
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
	console.log(`[Asshat.Business]: Loading locations for business ${businessId} from database ...`);

	let tempBusinessLocations = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `SELECT * FROM biz_loc WHERE biz_loc_biz=${businessId}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempBusinessLocationData = new serverClasses.businessLocationData(dbAssoc);
					tempBusinessLocations.push(tempBusinessLocationData);
					console.log(`[Asshat.Business]: Location for business '${businessId}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Business]: ${tempBusinessLocations.length} locations for business ${businessId} loaded from database successfully`);
	return tempBusinessLocations;
}

// ---------------------------------------------------------------------------

function createBusinessCommand(command, params, client) {
	let tempBusinessData = createBusiness(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].business, getGameConfig().blipSprites[getServerGame()].business, getPlayerInterior(client), getPlayerVirtualWorld(client));
	getServerData().businesses.push(tempBusinessData);

	createBusinessEntrancePickup(getServerData().businesses.length-1);
	createBusinessExitPickup(getServerData().businesses.length-1);
	createBusinessEntranceBlip(getServerData().businesses.length-1);
	createBusinessExitBlip(getServerData().businesses.length-1);	

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]created business [#0099FF]${tempBusinessData.name}`);
}

// ---------------------------------------------------------------------------

function createBusinessLocationCommand(command, params, client) {
	if(!isPlayerSpawned(client)) {
		messagePlayerError("You must be spawned to use this command!");
		return false;
	}

	let locationType = toString(splitParams[0]);
	let businessId = (isPlayerInAnyBusiness(splitParams[1])) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}	

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}		

	let tempBusinessLocationData = createBusinessLocation(locationType, businessId);
	getServerData().businesses[businessId].push(tempBusinessLocationData);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]created location [#0099FF]${params} [#FFFFFF]for business [#0099FF]${tempBusinessData.name}`);
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

	return tempBusinessData;
}

// ---------------------------------------------------------------------------

function deleteBusinessCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}		

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]deleted business [#0099FF]${getBusinessData(businessId).name}`);
	deleteBusiness(businessId, getPlayerData(client).accountData.databaseId);
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationCommand(command, params, client) {
	//let businessId = toInteger(splitParams[1]);
	//deleteBusinessLocation(businessId);
	//messagePlayerSuccess(client, `Business '${tempBusinessData.name} deleted!`);
}

// ---------------------------------------------------------------------------

function setBusinessNameCommand(command, params, client) {
	let newBusinessName = toString(params);

	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}	

	let oldBusinessName = getBusinessData(businessId).name;
	getBusinessData(businessId).name = newBusinessName;
	getBusinessData(businessId).entrancePickup.setData("ag.label.name", getBusinessData(businessId).name, true);
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]renamed business [#0099FF]${oldBusinessName} [#FFFFFF]to [#0099FF]${newBusinessName}`);
}

// ---------------------------------------------------------------------------

function setBusinessOwnerCommand(command, params, client) {
	let newBusinessOwner = getPlayerFromParams(params);
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!newBusinessOwner) {
		messagePlayerError("Player not found!");
		return false;
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_PLAYER;
	getBusinessData(businessId).ownerId = getServerData().clients[newBusinessOwner.index].accountData.databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner to [#AAAAAA]${newBusinessOwner.name}`);
}

// ---------------------------------------------------------------------------

function setBusinessClanCommand(command, params, client) {
	let clanId = getClanFromParams(params);
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}

	if(!getClanData(clanId)) {
		messagePlayerError("Clan not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_CLAN;
	getBusinessData(businessId).ownerId = getClanData(clanId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner to the [#FF9900]${getClanData(clanId).name} [#FFFFFF]clan`);
}

// ---------------------------------------------------------------------------

function setBusinessJobCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}
	
	let closestJobLocation = getClosestJobLocation(getVehiclePosition(vehicle));
	let jobId = closestJobLocation.job;

	if(!areParamsEmpty(params)) {
		jobId = getJobIdFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}

	if(!getJobData(jobId)) {
		messagePlayerError("Job not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_JOB;
	getBusinessData(businessId).ownerId = getJobData(jobId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner to the [#FFFF00]${getJobData(jobId).name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function setBusinessPublicCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}	

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_PUBLIC;
	getBusinessData(businessId).ownerId = 0;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner set to [#AAAAAA]public`);
}

// ---------------------------------------------------------------------------

function lockBusinessCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}
	
	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}	

	getBusinessData(businessId).locked = !getBusinessData(businessId).locked;
	getBusinessData(businessId).entrancePickup.setData("ag.label.locked", getBusinessData(businessId).locked, true);
	messagePlayerSuccess(client, `${getLockedUnlockedEmojiFromBool((getBusinessData(businessId).locked))} Business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]${getLockedUnlockedTextFromBool((getBusinessData(businessId).locked))}!`);
}

// ---------------------------------------------------------------------------

function setBusinessEntranceFeeCommand(command, params, client) {
	let splitParams = params.split(" ");
	let entranceFee = toInteger(splitParams[0]) || 0;
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}

	getBusinessData(businessId).entranceFee = entranceFee;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]entrance fee to [#AAAAAAA]$${entranceFee}`);
}

// ---------------------------------------------------------------------------

function getBusinessInfoCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
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

	messagePlayerInfo(client, `[#0099FF][Business Info] [#FFFFFF]Name: [#AAAAAA]${getBusinessData(businessId).name}, [#FFFFFF]Owner: [#AAAAAA]${ownerName} (${getBusinessOwnerTypeText(getBusinessData(businessId).ownerType)}), [#FFFFFF]Locked: [#AAAAAA]${getYesNoFromBool(intToBool(getBusinessData(businessId).locked))}, [#FFFFFF]ID: [#AAAAAA]${businessId}/${getBusinessData(businessId).databaseId}`);
}

// ---------------------------------------------------------------------------

function setBusinessPickupCommand(command, params, client) {
	let splitParams = params.split(" ");
	let typeParam = splitParams[0] || "business";
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().pickupModels[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid business type! Use a business type name or a pickup model ID");
			messagePlayerInfo(client, `Pickup Types: [#AAAAAA]${Object.keys(getGameConfig().pickupModels[getServerGame()]).join(", ")}`)
			return false;
		}

		getBusinessData(businessId).entrancePickupModel = getGameConfig().pickupModels[getServerGame()][typeParam];
	} else {
		getBusinessData(businessId).entrancePickupModel = toInteger(typeParam);
	}

	deleteBusinessEntrancePickup(businessId);
	deleteBusinessExitPickup(businessId);
	createBusinessEntrancePickup(businessId);
	createBusinessExitPickup(businessId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]pickup display to [#AAAAAA]${toLowerCase(typeParam)}'!`);
}

// ---------------------------------------------------------------------------

function setBusinessBlipCommand(command, params, client) {
	let splitParams = params.split(" ");

	let typeParam = splitParams[0] || "business";
	let closestEntrance = getClosestBusinessEntrance(getPlayerPosition(client));
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : closestEntrance.business;

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(isNull(getGameConfig().blipSprites[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid business type! Use a business type name or a blip image ID");
			messagePlayerInfo(client, `Blip Types: [#AAAAAA]${Object.keys(getGameConfig().blipSprites[getServerGame()]).join(", ")}`)
			return false;
		}

		getBusinessData(businessId).entranceBlipModel = getGameConfig().blipSprites[getServerGame()][typeParam];
	} else {
		getBusinessData(businessId).entranceBlipModel = toInteger(typeParam);
	}

	deleteBusinessLocationEntranceBlip(businessId, closestEntrance.index);
	deleteBusinessLocationExitBlip(businessId, closestEntrance.index);
	createBusinessLocationEntranceBlip(businessId, closestEntrance.index);
	createBusinessLocationExitBlip(businessId, closestEntrance.index);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]blip display to [#AAAAAA]${toLowerCase(typeParam)}`);
}

// ---------------------------------------------------------------------------

function withdrawFromBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let amount = toInteger(splitParams[0]) || 0;
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!getBusinessData(businessId)) {
		messagePlayerError("Business not found!");
		return false;
	}

	let tempBusinessData = getServerData().businesses.filter(b => b.databaseId == businessId)[0];
	
	if(getServerData().businesses[businessId].till < amount) {
		messagePlayerError(client, `Business '${tempBusinessData.name}' doesn't have that much money! Use /bizbalance.`);
		return false;
	}

	getServerData().businesses[businessId].till -= amount;
	getPlayerCurrentSubAccount(client).cash += amount;
	updatePlayerCash(client);
	messagePlayerSuccess(client, `You withdrew $${amount} from business '${tempBusinessData.name}''s till'`);
}

// ---------------------------------------------------------------------------

function depositIntoBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let amount = toInteger(splitParams[0]) || 0;
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}	
	
	if(getPlayerCurrentSubAccount(client).cash < amount) {
		messagePlayerError(client, `You don't have that much money! You only have $${getPlayerCurrentSubAccount(client).cash}`);
		return false;
	}

	getServerData().businesses[businessId].till += amount;
	getPlayerCurrentSubAccount(client).cash -= amount;
	updatePlayerCash(client);
	messagePlayerSuccess(client, `You deposited $${amount} into business '${tempBusinessData.name}''s till'`);
}

// ---------------------------------------------------------------------------

function viewBusinessTillAmountCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}	

	messagePlayerSuccess(client, `Business '${getServerData().businesses[businessId].name}' till has $'${getServerData().businesses[businessId].till}'!`);
}

// ---------------------------------------------------------------------------

function moveBusinessEntranceCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}	
	
	getBusinessData(businessId).entrancePosition = getPlayerPosition(client);
	getBusinessData(businessId).entranceDimension = getPlayerVirtualWorld(client);
	getBusinessData(businessId).entranceInterior = getPlayerInterior(client);
	
	deleteBusinessEntranceBlip(businessId);
	deleteBusinessEntrancePickup(businessId);

	createBusinessEntranceBlip(businessId);
	createBusinessEntrancePickup(businessId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]entrance to their position`);
}

// ---------------------------------------------------------------------------

function moveBusinessExitCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)).business;

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}
	
	getBusinessData(businessId).exitPosition = getPlayerPosition(client);
	getBusinessData(businessId).exitDimension = getPlayerVirtualWorld(client);
	getBusinessData(businessId).exitInterior = getPlayerInterior(client);
	
	deleteBusinessExitBlip(businessId);
	deleteBusinessExitPickup(businessId);
	
	createBusinessExitBlip(businessId);
	createBusinessExitPickup(businessId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]exit to their position`);
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
	let closest = getServerData().businesses[0].locations[0];
	for(let i in businesses) {
		for(let j in getServerData().businesses[i].locations) {
			if(getDistance(position, businesses[i].locations[j].entrancePosition) <= getDistance(position, closest.entrancePosition)) {
				closest = getServerData().businesses[i].locations[j];
			}
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
		for(let j in getServerData().businesses[i].locations) {
			createBusinessLocationEntrancePickup(i, j);
			createBusinessLocationExitPickup(i, j);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllBusinessBlips() {
	for(let i in getServerData().businesses) {
		for(let j in getServerData().businesses[i].locations) {
			createBusinessLocationEntranceBlip(i, j);
			createBusinessLocationExitBlip(i, j);
		}
	}
}

// ---------------------------------------------------------------------------

function createBusinessLocationEntrancePickup(businessId, locationId) {
	if(getBusinessData(businessId).locations[locationId].entrancePickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].business;

		if(getServerData().businesses[businessId].locations[locationId].entrancePickupModel != 0) {
			pickupModelId = getBusinessData(businessId).locations[locationId].entrancePickupModel;
		}

		getBusinessData(businessId).locations[locationId].entrancePickup = gta.createPickup(pickupModelId, getBusinessData(businessId).locations[locationId].entrancePosition);
		getBusinessData(businessId).locations[locationId].entrancePickup.onAllDimensions = false;
		getBusinessData(businessId).locations[locationId].entrancePickup.dimension = getBusinessData(businessId).locations[locationId].entranceDimension;
		getBusinessData(businessId).locations[locationId].entrancePickup.setData("ag.owner.type", AG_PICKUP_BUSINESS_ENTRANCE, false);
		getBusinessData(businessId).locations[locationId].entrancePickup.setData("ag.owner.id", businessId, false);
		getBusinessData(businessId).locations[locationId].entrancePickup.setData("ag.label.type", AG_LABEL_BUSINESS, true);
		getBusinessData(businessId).locations[locationId].entrancePickup.setData("ag.label.name", getBusinessData(businessId).name, true);
		getBusinessData(businessId).locations[locationId].entrancePickup.setData("ag.label.locked", getBusinessData(businessId).locked, true);
		if(getBusinessData(businessId).buyPrice > 0) {
			getBusinessData(businessId).locations[locationId].entrancePickup.setData("ag.label.price", getBusinessData(businessId).buyPrice, true);
		}
		addToWorld(getBusinessData(businessId).locations[locationId].entrancePickup);
	}
}

// ---------------------------------------------------------------------------

function createBusinessLocationEntranceBlip(businessId, locationId) {
	if(getBusinessData(businessId).locations[locationId].entranceBlipModel != -1) {
		let blipModelId = getGameConfig().blipSprites[getServerGame()].business;

		if(getServerData().businesses[businessId].entranceBlipModel != 0) {
			blipModelId = getBusinessData(businessId).locations[locationId].entranceBlipModel;
		}

		getBusinessData(businessId).locations[locationId].entranceBlip = gta.createBlip(getBusinessData(businessId).locations[locationId].entrancePosition, blipModelId, 1, getColourByName("businessBlue"));
		getBusinessData(businessId).locations[locationId].entranceBlip.onAllDimensions = false;
		getBusinessData(businessId).locations[locationId].entranceBlip.dimension = getBusinessData(businessId).locations[locationId].entranceDimension;
		getBusinessData(businessId).locations[locationId].entranceBlip.setData("ag.owner.type", AG_BLIP_BUSINESS_ENTRANCE, false);
		getBusinessData(businessId).locations[locationId].entranceBlip.setData("ag.owner.id", businessId, false);
		addToWorld(getBusinessData(businessId).locations[locationId].entranceBlip);
	}
}

// ---------------------------------------------------------------------------

function createBusinessLocationExitPickup(businessId, locationId) {
	if(getBusinessData(businessId).hasInterior) {
		if(getBusinessData(businessId).locations[locationId].exitPickupModel != -1) {
			let pickupModelId = getGameConfig().pickupModels[getServerGame()].exit;

			if(getServerData().businesses[businessId].locations[locationId].exitPickupModel != 0) {
				pickupModelId = getBusinessData(businessId).locations[locationId].exitPickupModel;
			}

			getBusinessData(businessId).locations[locationId].exitPickup = gta.createPickup(pickupModelId, getBusinessData(businessId).locations[locationId].exitPosition);
			getBusinessData(businessId).locations[locationId].exitPickup.onAllDimensions = false;
			getBusinessData(businessId).locations[locationId].exitPickup.dimension = getBusinessData(businessId).locations[locationId].exitDimension;
			getBusinessData(businessId).locations[locationId].exitPickup.setData("ag.owner.type", AG_PICKUP_BUSINESS_EXIT, false);
			getBusinessData(businessId).locations[locationId].exitPickup.setData("ag.owner.id", businessId, false);			
			getBusinessData(businessId).locations[locationId].exitPickup.setData("ag.label.type", AG_LABEL_EXIT, true);
			addToWorld(getBusinessData(businessId).locations[locationId].exitPickup);
		}
	}
}

// ---------------------------------------------------------------------------

function createBusinessLocationExitBlip(businessId, locationId) {
	if(getBusinessData(businessId).hasInterior) {
		if(getBusinessData(businessId).locations[locationId].exitBlipModel != -1) {
			let blipModelId = getGameConfig().blipSprites[getServerGame()].business;

			if(getServerData().businesses[businessId].locations[locationId].exitBlipModel != 0) {
				blipModelId = getBusinessData(businessId).locations[locationId].exitBlipModel;
			}

			getBusinessData(businessId).locations[locationId].exitBlip = gta.createBlip(getBusinessData(businessId).locations[locationId].exitPosition, blipModelId, 1, getColourByName("businessBlue"));
			getBusinessData(businessId).locations[locationId].exitBlip.onAllDimensions = false;
			getBusinessData(businessId).locations[locationId].exitBlip.dimension = getBusinessData(businessId).locations[locationId].entranceDimension;
			//getBusinessData(businessId).exitBlip.interior = getBusinessData(businessId).exitInterior;
			getBusinessData(businessId).locations[locationId].exitBlip.setData("ag.owner.type", AG_BLIP_BUSINESS_EXIT, false);
			getBusinessData(businessId).locations[locationId].exitBlip.setData("ag.owner.id", businessId, false);
			addToWorld(getBusinessData(businessId).locations[locationId].exitBlip);
		}
	}
}

// ---------------------------------------------------------------------------

function deleteBusiness(businessId, deletedBy = 0) {
	let tempBusinessData = getServerData().businesses[businessId];

	let dbConnection = connectToDatabase();
	let dbQuery = null;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, `DELETE FROM biz_main WHERE biz_id = ${tempBusinessData.databaseId}`);
		if(dbQuery) {
			freeDatabaseQuery(dbQuery);
		}

		dbQuery = queryDatabase(dbConnection, `DELETE FROM biz_loc WHERE biz_loc_biz = ${tempBusinessData.databaseId}`);
		if(dbQuery) {
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	deleteBusinessEntrancePickups(businessId);
	deleteBusinessExitPickups(businessId);

	deleteBusinessEntranceBlips(businessId);
	deleteBusinessExitBlips(businessId);	

	removePlayersFromBusiness(businessId);

	getServerData().businesses.splice(businessId, 1);
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

function removePlayerFromBusinesses(client) {
	if(isPlayerInAnyBusiness(client)) {
		exitBusiness(client);
	}
}

// ---------------------------------------------------------------------------

function exitBusiness(client) {
	let businessId = getEntityData(client, "ag.inBusiness");
	if(isPlayerSpawned(client)) {
		setPlayerInterior(client, getServerData().businesses[businessId].entranceInterior);
		setPlayerVirtualWorld(client, client, getServerData().businesses[businessId].entranceDimension);
		setPlayerPosition(client, client, getServerData().businesses[businessId].entrancePosition);
	}
	removeEntityData(client, "ag.inBusiness");
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
	return getBusinessData(businessId).hasInterior;
}

// ---------------------------------------------------------------------------

function deleteBusinessEntrancePickups(businessId) {
	for(let i in getServerData().businesses[businessId].locations) {
		deleteBusinessLocationEntrancePickup(businessId, i);
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessEntranceBlips(businessId) {
	for(let i in getServerData().businesses[businessId].locations) {
		deleteBusinessLocationEntranceBlip(businessId, i);
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessExitPickups(businessId) {
	for(let i in getServerData().businesses[businessId].locations) {
		deleteBusinessLocationExitPickup(businessId, i);
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessExitBlips(businessId) {
	for(let i in getServerData().businesses[businessId].locations) {
		deleteBusinessLocationExitBlip(businessId, i);
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationEntrancePickup(businessId, locationId) {
	if(getBusinessData(businessId).locations[locationId].entrancePickup) {
		destroyElement(getBusinessData(businessId).locations[locationId].entrancePickup);
		getBusinessData(businessId).locations[locationId].entrancePickup = false;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationExitPickup(businessId, locationId) {
	if(getBusinessData(businessId).locations[locationId].exitPickup) {
		destroyElement(getBusinessData(businessId).locations[locationId].exitPickup);
		getBusinessData(businessId).locations[locationId].exitPickup = false;
	}	
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationEntranceBlip(businessId, locationId) {
	if(getBusinessData(businessId).locations[locationId].entranceBlip) {
		destroyElement(getBusinessData(businessId).locations[locationId].entranceBlip);
		getBusinessData(businessId).locations[locationId].entranceBlip = false;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessLocationExitBlip(businessId, locationId) {
	if(getBusinessData(businessId).locations[locationId].exitBlip) {
		destroyElement(getBusinessData(businessId).locations[locationId].exitBlip);
		getBusinessData(businessId).locations[locationId].exitBlip = false;
	}	
}

// ---------------------------------------------------------------------------

function reloadAllBusinessesCommand(command, params, client) {
	let clients = getClients();
	for(let i in clients) {
		if(isPlayerInAnyBusiness(clients[i])) {
			removePlayerFromBusinesses(clients[i]);
		}
	}

	for(let i in getServerData().businesses) {
		deleteBusinessExitBlip(i);
		deleteBusinessEntranceBlip(i);
		deleteBusinessExitPickup(i);
		deleteBusinessEntrancePickup(i);
	}
	
	//forceAllPlayersToStopWorking();
	getServerData().businesses = null;
	getServerData().businesses = loadBusinessesFromDatabase();
	createAllBusinessPickups();
	createAllBusinessBlips();

	for(let i in clients) {
		sendAllBusinessLabelsToPlayer(clients[i]);
	}	

	messageAdminAction(`All businesses have been reloaded by an admin!`);
}

// ---------------------------------------------------------------------------
