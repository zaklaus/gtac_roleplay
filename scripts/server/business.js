// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: business.js
// DESC: Provides business functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initBusinessScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Business]: Initializing business script ...");
	getServerData().businesses = loadBusinessesFromDatabase();

	if(getServerConfig().createBusinessPickups) {
		createAllBusinessPickups();
	}

	if(getServerConfig().createBusinessPickups) {
		createAllBusinessBlips();
	}

	setAllBusinessIndexes();
	cacheAllBusinessItems();
	logToConsole(LOG_DEBUG, "[Asshat.Business]: Business script initialized successfully!");
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
	logToConsole(LOG_DEBUG, "[Asshat.Business]: Loading businesses from database ...");

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
					logToConsole(LOG_DEBUG, `[Asshat.Business]: Business '${tempBusinessData.name}' (ID ${tempBusinessData.databaseId}) loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_DEBUG, `[Asshat.Business]: ${tempBusinesses.length} businesses loaded from database successfully!`);
	return tempBusinesses;
}

// ---------------------------------------------------------------------------

function loadBusinessLocationsFromDatabase(businessId) {
	//logToConsole(LOG_DEBUG, "[Asshat.Business]: Loading locations from database ...");

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
					//logToConsole(LOG_DEBUG, `[Asshat.Business]: Location '${tempBusinessLocationData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	//logToConsole(LOG_DEBUG, `[Asshat.Business]: ${tempBusinessLocations.length} location for business ${businessId} loaded from database successfully!`);
	return tempBusinessLocations;
}

// ---------------------------------------------------------------------------

function createBusinessCommand(command, params, client) {
	let tempBusinessData = createBusiness(params, getPlayerPosition(client), toVector3(0.0, 0.0, 0.0), getGameConfig().pickupModels[getServerGame()].business, getGameConfig().blipSprites[getServerGame()].business, getPlayerInterior(client), getPlayerDimension(client));
	getServerData().businesses.push(tempBusinessData);

	createBusinessEntrancePickup(getServerData().businesses.length-1);
	createBusinessExitPickup(getServerData().businesses.length-1);
	createBusinessEntranceBlip(getServerData().businesses.length-1);
	createBusinessExitBlip(getServerData().businesses.length-1);

	saveBusinessToDatabase(getServerData().businesses.length-1);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]created business [#0099FF]${tempBusinessData.name}`);
}

// ---------------------------------------------------------------------------

function createBusinessLocationCommand(command, params, client) {
	if(!isPlayerSpawned(client)) {
		messagePlayerError(client, "You must be spawned to use this command!");
		return false;
	}

	let locationType = toString(splitParams[0]);
	let businessId = (isPlayerInAnyBusiness(splitParams[1])) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
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
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
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

	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	let oldBusinessName = getBusinessData(businessId).name;
	getBusinessData(businessId).name = newBusinessName;
	setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.name", getBusinessData(businessId).name, true);
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]renamed business [#0099FF]${oldBusinessName} [#FFFFFF]to [#0099FF]${newBusinessName}`);
}

// ---------------------------------------------------------------------------

function setBusinessOwnerCommand(command, params, client) {
	let newBusinessOwner = getPlayerFromParams(params);
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!newBusinessOwner) {
		messagePlayerError(client, "Player not found!");
		return false;
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_PLAYER;
	getBusinessData(businessId).ownerId = getServerData().clients[newBusinessOwner.index].accountData.databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner to [#AAAAAA]${newBusinessOwner.name}`);
}

// ---------------------------------------------------------------------------

function setBusinessClanCommand(command, params, client) {
	let clanId = getClanFromParams(params);
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_CLAN;
	getBusinessData(businessId).ownerId = getClanData(clanId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner to the [#FF9900]${getClanData(clanId).name} [#FFFFFF]clan`);
}

// ---------------------------------------------------------------------------

function setBusinessJobCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	let closestJobLocation = getClosestJobLocation(getVehiclePosition(vehicle));
	let jobId = closestJobLocation.job;

	if(!areParamsEmpty(params)) {
		jobId = getJobIdFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(!getJobData(jobId)) {
		messagePlayerError(client, "Job not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_JOB;
	getBusinessData(businessId).ownerId = getJobData(jobId).databaseId;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner to the [#FFFF00]${getJobData(jobId).name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function setBusinessPublicCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	getBusinessData(businessId).ownerType = AG_BIZOWNER_PUBLIC;
	getBusinessData(businessId).ownerId = 0;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]owner set to [#AAAAAA]public`);
}

// ---------------------------------------------------------------------------

function lockBusinessCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	getBusinessData(businessId).locked = !getBusinessData(businessId).locked;
	setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.locked", getBusinessData(businessId).locked, true);
	messagePlayerSuccess(client, `${getLockedUnlockedEmojiFromBool((getBusinessData(businessId).locked))} Business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]${getLockedUnlockedTextFromBool((getBusinessData(businessId).locked))}!`);
}

// ---------------------------------------------------------------------------

function setBusinessEntranceFeeCommand(command, params, client) {
	let splitParams = params.split(" ");
	let entranceFee = toInteger(splitParams[0]) || 0;
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
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

	messagePlayerInfo(client, `🏢 [#0099FF][Business Info] [#FFFFFF]Name: [#AAAAAA]${getBusinessData(businessId).name}, [#FFFFFF]Owner: [#AAAAAA]${ownerName} (${getBusinessOwnerTypeText(getBusinessData(businessId).ownerType)}), [#FFFFFF]Locked: [#AAAAAA]${getYesNoFromBool(intToBool(getBusinessData(businessId).locked))}, [#FFFFFF]ID: [#AAAAAA]${businessId}/${getBusinessData(businessId).databaseId}`);
}

// ---------------------------------------------------------------------------

function setBusinessPickupCommand(command, params, client) {
	let splitParams = params.split(" ");
	let typeParam = splitParams[0] || "business";
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

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

function setBusinessInteriorTypeCommand(command, params, client) {
	let splitParams = params.split(" ");
	let typeParam = splitParams[0] || "business";
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(isNaN(typeParam)) {
		if(toLowerCase(typeParam) == "none") {
			getBusinessData(businessId).exitPosition = toVector3(0.0, 0.0, 0.0);
			getBusinessData(businessId).exitInterior = 0;
			getBusinessData(businessId).hasInterior = false;
			messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]remove business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]interior`);
			return false;
		}

		if(isNull(getGameConfig().interiorTemplates[getServerGame()][typeParam])) {
			messagePlayerError(client, "Invalid interior type! Use an interior type name or an existing business database ID");
			messagePlayerInfo(client, `Interior Types: [#AAAAAA]${Object.keys(getGameConfig().interiorTemplates[getServerGame()]).join(", ")}`)
			return false;
		}

		messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]set business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]interior type to [#AAAAAA]${toLowerCase(typeParam)}`);
		getBusinessData(businessId).exitPosition = getGameConfig().interiorTemplates[getServerGame()][typeParam].exitPosition;
		getBusinessData(businessId).exitInterior = getGameConfig().interiorTemplates[getServerGame()][typeParam].exitInterior;
		getBusinessData(businessId).exitDimension = getBusinessData(businessId).databaseId+getGlobalConfig().businessDimensionStart;
		getBusinessData(businessId).hasInterior = true;
	} else {
		if(!getBusinessData(businessId)) {
			messagePlayerError(client, "Business ID not found!");
			return false;
		}
		getBusinessData(businessId).exitPosition = getBusinessData(businessId).exitPosition;
		getBusinessData(businessId).exitInterior = getBusinessData(businessId).exitInterior;
		getBusinessData(businessId).exitDimension = getBusinessData(businessId).databaseId+getGlobalConfig().businessDimensionStart;
		getBusinessData(businessId).hasInterior = true;
	}

	deleteBusinessEntrancePickup(businessId);
	deleteBusinessExitPickup(businessId);
	createBusinessEntrancePickup(businessId);
	createBusinessExitPickup(businessId);
}

// ---------------------------------------------------------------------------

function setBusinessBlipCommand(command, params, client) {
	let splitParams = params.split(" ");

	let typeParam = splitParams[0] || "business";
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

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

	deleteBusinessEntranceBlip(businessId);
	deleteBusinessExitBlip(businessId);
	createBusinessEntranceBlip(businessId);
	createBusinessExitBlip(businessId);

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
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(getBusinessData(businessId).till < amount) {
		messagePlayerError(client, `Business [#0099FF]${tempBusinessData.name} doesn't have that much money! Use /bizbalance.`);
		return false;
	}

	getBusinessData(businessId).till -= amount;
	getPlayerCurrentSubAccount(client).cash += amount;
	updatePlayerCash(client);
	messagePlayerSuccess(client, `You withdrew $${amount} from business [#0099FF]${getBusinessData(businessId).name} till`);
}

// ---------------------------------------------------------------------------

function setBusinessBuyPriceCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let amount = toInteger(splitParams[0]) || 0;
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(amount < 0) {
		messagePlayerError(client, `The amount can't be less than 0!`);
		return false;
	}

	getBusinessData(businessId).buyPrice = amount;
	setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.price", getBusinessData(businessId).buyPrice, true);
	messagePlayerSuccess(client, `[#FFFFFF]You set the [#0099FF]${getBusinessData(businessId).name} business's for-sale price to [#AAAAAA]$${amount}`);
}

// ---------------------------------------------------------------------------

function depositIntoBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let amount = toInteger(splitParams[0]) || 0;
	let businessId = getBusinessFromParams(splitParams[1]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	if(getPlayerCurrentSubAccount(client).cash < amount) {
		messagePlayerError(client, `You don't have that much money! You only have $${getPlayerCurrentSubAccount(client).cash}`);
		return false;
	}

	getBusinessData(businessId).till += amount;
	getPlayerCurrentSubAccount(client).cash -= amount;
	updatePlayerCash(client);
	messagePlayerSuccess(client, `You deposited $${amount} into business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]till`);
}

// ---------------------------------------------------------------------------

function orderItemForBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(!areThereEnoughParams(params, 3, " ")) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let itemType = getItemTypeFromParams(splitParams.slice(0,-2).join(" "));

	if(!getItemTypeData(itemType)) {
		messagePlayerError(client, "Invalid item type name or ID!");
		messagePlayerInfo(client, "Use [#AAAAAA]/itemtypes [#FFFFFF]for a list of items");
		return false;
	}
	let pricePerItem = getOrderPriceForItemType(itemType);

	let amount = toInteger(splitParams.slice(-2, -1)) || 1;
	let value = toInteger(splitParams.slice(-1)) || getItemTypeData(itemType).capacity;
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	logToConsole(LOG_DEBUG, `[Asshat.Business] ${getPlayerDisplayForConsole(client)} is ordering ${amount} ${splitParams.slice(0,-2).join(" ")} (${value})`);

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "You must be inside or near a business door!");
		return false;
	}

	let orderTotalCost = pricePerItem*amount;

	//getPlayerData(client).promptType = AG_PROMPT_BIZORDER;
	getPlayerData(client).businessOrderAmount = amount;
	getPlayerData(client).businessOrderBusiness = businessId;
	getPlayerData(client).businessOrderItem = itemType;
	getPlayerData(client).businessOrderValue = value;

	showPlayerPrompt(client, AG_PROMPT_BIZORDER, `Ordering ${amount} ${getPluralForm(getItemTypeData(itemType).name)} (${getItemValueDisplay(itemType, value)}) at $${pricePerItem} each will cost a total of $${orderTotalCost}`, "Business Order Cost");
}

// ---------------------------------------------------------------------------

function orderItemForBusiness(businessId, itemType, amount) {
	if(getBusinessData(businessId).till < orderTotalCost) {
		let neededAmount = orderTotalCost-getBusinessData(businessId).till;
		//messagePlayerError(client, `The business doesn't have enough money (needs [#AAAAAA]$${neededAmount} [#FFFFFF]more)! Use [#AAAAAA]/bizdeposit [#FFFFFF]to add money to the business.`);
		return false;
	}

	getBusinessData(businessId).till -= orderTotalCost;
	addToBusinessInventory(businessId, itemType, amount);
	//messagePlayerSuccess(client, `You ordered ${amount} ${getPluralForm(getItemTypeData(itemType).name)} (${getItemValueDisplay(itemType, value)}) at $${getItemTypeData(itemType).orderPrice} each for business [#0099FF]${getBusinessData(businessId).name}`);
}

// ---------------------------------------------------------------------------

function viewBusinessTillAmountCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	messagePlayerSuccess(client, `Business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]till has [#AAAAAA]$${getBusinessData(businessId).till}`);
}

// ---------------------------------------------------------------------------

function moveBusinessEntranceCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	getBusinessData(businessId).entrancePosition = getPlayerPosition(client);
	getBusinessData(businessId).entranceDimension = getPlayerDimension(client);
	getBusinessData(businessId).entranceInterior = getPlayerInterior(client);

	deleteBusinessEntranceBlip(businessId);
	deleteBusinessEntrancePickup(businessId);

	createBusinessEntranceBlip(businessId);
	createBusinessEntrancePickup(businessId);

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]moved business [#0099FF]${getBusinessData(businessId).name} [#FFFFFF]entrance to their position`);
}

// ---------------------------------------------------------------------------

function moveBusinessExitCommand(command, params, client) {
	let businessId = toInteger((isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client)));

	if(!areParamsEmpty(params)) {
		businessId = getBusinessFromParams(params);
	}

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	getBusinessData(businessId).exitPosition = getPlayerPosition(client);
	getBusinessData(businessId).exitDimension = getPlayerDimension(client);
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
	let closest = 0;
	for(let i in getServerData().businesses) {
		if(getDistance(position, getServerData().businesses[i].entrancePosition) <= getDistance(position, getServerData().businesses[closest].entrancePosition)) {
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
	logToConsole(LOG_DEBUG, `[Asshat.Business]: Saving business '${tempBusinessData.name}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeBusinessName = escapeDatabaseString(dbConnection, tempBusinessData.name);
		if(tempBusinessData.databaseId == 0) {
			let dbQueryString = `INSERT INTO biz_main (
					biz_server,
					biz_name,
					biz_owner_type,
					biz_owner_id,
					biz_locked,
					biz_entrance_fee,
					biz_till,
					biz_entrance_pos_x,
					biz_entrance_pos_y,
					biz_entrance_pos_z,
					biz_entrance_rot_z,
					biz_entrance_int,
					biz_entrance_vw,
					biz_exit_pos_x,
					biz_exit_pos_y,
					biz_exit_pos_z,
					biz_exit_rot_z,
					biz_exit_int,
					biz_exit_vw,
					biz_has_interior
				) VALUES (
					${getServerId()},
					'${safeBusinessName}',
					${tempBusinessData.ownerType},
					${tempBusinessData.ownerId},
					${boolToInt(tempBusinessData.locked)},
					${tempBusinessData.entranceFee},
					${tempBusinessData.till},
					${tempBusinessData.entrancePosition.x},
					${tempBusinessData.entrancePosition.y},
					${tempBusinessData.entrancePosition.z},
					${tempBusinessData.entranceRotation},
					${tempBusinessData.entranceInterior},
					${tempBusinessData.entranceDimension},
					${tempBusinessData.exitPosition.x},
					${tempBusinessData.exitPosition.y},
					${tempBusinessData.exitPosition.z},
					${tempBusinessData.exitRotation},
					${tempBusinessData.exitInterior},
					${tempBusinessData.databaseId+getGlobalConfig().businessDimensionStart},
					${boolToInt(tempBusinessData.hasInterior)}
				)`;
			queryDatabase(dbConnection, dbQueryString);
			getServerData().businesses[businessId].databaseId = getDatabaseInsertId(dbConnection);
		} else {

			let dbQueryString =
				`UPDATE biz_main SET
					 biz_name='${safeBusinessName}',
					biz_owner_type=${tempBusinessData.ownerType},
					biz_owner_id=${tempBusinessData.ownerId},
					biz_locked=${boolToInt(tempBusinessData.locked)},
					biz_entrance_fee=${tempBusinessData.entranceFee},
					biz_till=${tempBusinessData.till},
					biz_entrance_pos_x=${tempBusinessData.entrancePosition.x},
					biz_entrance_pos_y=${tempBusinessData.entrancePosition.y},
					biz_entrance_pos_z=${tempBusinessData.entrancePosition.z},
					biz_entrance_rot_z=${tempBusinessData.entranceRotation},
					biz_entrance_int=${tempBusinessData.entranceInterior},
					biz_entrance_vw=${tempBusinessData.entranceDimension},
					biz_exit_pos_x=${tempBusinessData.exitPosition.x},
					biz_exit_pos_y=${tempBusinessData.exitPosition.y},
					biz_exit_pos_z=${tempBusinessData.exitPosition.z},
					biz_exit_rot_z=${tempBusinessData.exitRotation},
					biz_exit_int=${tempBusinessData.exitInterior},
					biz_exit_vw=${tempBusinessData.exitDimension},
					biz_has_interior=${boolToInt(tempBusinessData.hasInterior)}
					biz_buy_price=${tempBusinessData.buyPrice}
				 WHERE biz_id=${tempBusinessData.databaseId}`;

			dbQueryString = dbQueryString.replace(/(?:\r\n|\r|\n|\t)/g, "");
			logToConsole(LOG_DEBUG, dbQueryString);
			let dbQuery = queryDatabase(dbConnection, dbQueryString);
			freeDatabaseQuery(dbQuery);
			disconnectFromDatabase(dbConnection);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	logToConsole(LOG_DEBUG, `[Asshat.Business]: Saved business '${tempBusinessData.name}' to database!`);

	return false;
}

// ---------------------------------------------------------------------------

function createAllBusinessPickups() {
	for(let i in getServerData().businesses) {
		createBusinessEntrancePickup(i);
		//createBusinessExitPickup(i);
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
	if(getBusinessData(businessId).entrancePickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].business;

		if(getServerData().businesses[businessId].entrancePickupModel != 0) {
			pickupModelId = getBusinessData(businessId).entrancePickupModel;
		}

		getBusinessData(businessId).entrancePickup = gta.createPickup(pickupModelId, getBusinessData(businessId).entrancePosition);
		getBusinessData(businessId).entrancePickup.onAllDimensions = false;
		getBusinessData(businessId).entrancePickup.dimension = getBusinessData(businessId).entranceDimension;
		setEntityData(getBusinessData(businessId).entrancePickup, "ag.owner.type", AG_PICKUP_BUSINESS_ENTRANCE, false);
		setEntityData(getBusinessData(businessId).entrancePickup, "ag.owner.id", businessId, false);
		setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.type", AG_LABEL_BUSINESS, true);
		setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.name", getBusinessData(businessId).name, true);
		setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.locked", getBusinessData(businessId).locked, true);
		if(getBusinessData(businessId).buyPrice > 0) {
			setEntityData(getBusinessData(businessId).entrancePickup, "ag.label.price", getBusinessData(businessId).buyPrice, true);
		}
		addToWorld(getBusinessData(businessId).entrancePickup);
	}
}

// ---------------------------------------------------------------------------

function createBusinessEntranceBlip(businessId) {
	if(getBusinessData(businessId).entranceBlipModel != -1) {
		let blipModelId = getGameConfig().blipSprites[getServerGame()].business;

		if(getServerData().businesses[businessId].entranceBlipModel != 0) {
			blipModelId = getBusinessData(businessId).entranceBlipModel;
		}

		getBusinessData(businessId).entranceBlip = gta.createBlip(getBusinessData(businessId).entrancePosition, blipModelId, 1, getColourByName("businessBlue"));
		getBusinessData(businessId).entranceBlip.onAllDimensions = false;
		getBusinessData(businessId).entranceBlip.dimension = getBusinessData(businessId).entranceDimension;
		//getBusinessData(businessId).entranceBlip.interior = getBusinessData(businessId).entranceInterior;
		setEntityData(getBusinessData(businessId).entranceBlip, "ag.owner.type", AG_BLIP_BUSINESS_ENTRANCE, false);
		setEntityData(getBusinessData(businessId).entranceBlip, "ag.owner.id", businessId, false);
		addToWorld(getBusinessData(businessId).entranceBlip);
	}
}

// ---------------------------------------------------------------------------

function createBusinessExitPickup(businessId) {
	if(getBusinessData(businessId).hasInterior) {
		if(getBusinessData(businessId).exitPickupModel != -1) {
			let pickupModelId = getGameConfig().pickupModels[getServerGame()].exit;

			if(getServerData().businesses[businessId].exitPickupModel != 0) {
				pickupModelId = getBusinessData(businessId).exitPickupModel;
			}

			getBusinessData(businessId).exitPickup = gta.createPickup(pickupModelId, getBusinessData(businessId).exitPosition);
			getBusinessData(businessId).exitPickup.onAllDimensions = false;
			getBusinessData(businessId).exitPickup.dimension = getBusinessData(businessId).exitDimension;
			//getBusinessData(businessId).exitPickup.interior = getBusinessData(businessId).exitInterior;
			setEntityData(getBusinessData(businessId).exitPickup, "ag.owner.type", AG_PICKUP_BUSINESS_EXIT, false);
			setEntityData(getBusinessData(businessId).exitPickup, "ag.owner.id", businessId, false);
			setEntityData(getBusinessData(businessId).exitPickup, "ag.label.type", AG_LABEL_EXIT, true);
			addToWorld(getBusinessData(businessId).exitPickup);
		}
	}
}

// ---------------------------------------------------------------------------

function createBusinessExitBlip(businessId) {
	if(getBusinessData(businessId).hasInterior) {
		if(getBusinessData(businessId).exitBlipModel != -1) {
			let blipModelId = getGameConfig().blipSprites[getServerGame()].business;

			if(getServerData().businesses[businessId].exitBlipModel != 0) {
				blipModelId = getBusinessData(businessId).exitBlipModel;
			}

			getBusinessData(businessId).exitBlip = gta.createBlip(getBusinessData(businessId).exitPosition, blipModelId, 1, getColourByName("businessBlue"));
			getBusinessData(businessId).exitBlip.onAllDimensions = false;
			getBusinessData(businessId).exitBlip.dimension = getBusinessData(businessId).entranceDimension;
			//getBusinessData(businessId).exitBlip.interior = getBusinessData(businessId).exitInterior;
			setEntityData(getBusinessData(businessId).exitBlip, "ag.owner.type", AG_BLIP_BUSINESS_EXIT, false);
			setEntityData(getBusinessData(businessId).exitBlip, "ag.owner.id", businessId, false);
			addToWorld(getBusinessData(businessId).exitBlip);
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
		disconnectFromDatabase(dbConnection);
	}

	deleteBusinessEntrancePickup(businessId);
	deleteBusinessExitPickup(businessId);

	deleteBusinessEntranceBlip(businessId);
	deleteBusinessExitBlip(businessId);

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
		setPlayerDimension(client, client, getServerData().businesses[businessId].entranceDimension);
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

function deleteBusinessEntrancePickup(businessId) {
	if(getBusinessData(businessId).entrancePickup != null) {
		//removeFromWorld(getBusinessData(businessId).entrancePickup);
		deleteGameElement(getBusinessData(businessId).entrancePickup);
		getBusinessData(businessId).entrancePickup = null;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessExitPickup(businessId) {
	if(getBusinessData(businessId).exitPickup != null) {
		//removeFromWorld(getBusinessData(businessId).exitPickup);
		deleteGameElement(getBusinessData(businessId).exitPickup);
		getBusinessData(businessId).exitPickup = null;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessEntranceBlip(businessId) {
	if(getBusinessData(businessId).entranceBlip != null) {
		//removeFromWorld(getBusinessData(businessId).entranceBlip);
		deleteGameElement(getBusinessData(businessId).entranceBlip);
		getBusinessData(businessId).entranceBlip = null;
	}
}

// ---------------------------------------------------------------------------

function deleteBusinessExitBlip(businessId) {
	if(getBusinessData(businessId).exitBlip != null) {
		//removeFromWorld(getBusinessData(businessId).exitBlip);
		deleteGameElement(getBusinessData(businessId).exitBlip);
		getBusinessData(businessId).exitBlip = null;
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

	messageAdminAction(`All businesses have been reloaded by an admin!`);
}

// ---------------------------------------------------------------------------

function setAllBusinessIndexes() {
	for(let i in getServerData().businesses) {
		getServerData().businesses[i].index = i;
	}
}

// ---------------------------------------------------------------------------

function addToBusinessInventory(businessId, itemType, amount, buyPrice) {
	let tempItemData = new serverClasses.itemData(false);
	tempItemData.amount = amount;
	tempItemData.buyPrice = buyPrice;
	tempItemData.itemType = getItemTypeData(itemType).databaseId;
	tempItemData.ownerId = getBusinessData(business).databaseId;
	tempItemData.ownerType = AG_ITEMOWNER_BIZ;
	tempItemData.ownerIndex = businessId;
	tempItemData.itemTypeIndex = itemType;
	saveItemToDatabase(tempItemData);
	getServerData().items.push(tempItemData);

	let index = getServerData().items.length-1;
	getServerData().items[index].index = index;
}

// ---------------------------------------------------------------------------

function buyFromBusinessCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let businessId = getBusinessFromParams(splitParams[2]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	let itemSlot = toInteger(splitParams[0]) || 0;

	if(typeof getBusinessData(businessId).floorItemCache[itemSlot] == "undefined") {
		messagePlayerError(client, `Item slot ${itemSlot} doesn't exist!`);
		messagePlayerTip(client, `Use /bizitems to see what the business has for sale.`);
		return false;
	}

	if(getBusinessData(businessId).floorItemCache[itemSlot] == -1) {
		messagePlayerError(client, `Item slot ${itemSlot} slot is empty!`);
		messagePlayerTip(client, `Use /bizitems to see what the business has for sale.`);
		return false;
	}

	let amount = 1;
	if(areThereEnoughParams(params, 2, " ")) {
		amount = toInteger(splitParams[1]) || 1;
		if(amount <= 0) {
			messagePlayerError(client, "The amount must be more than 0!");
			return false;
		}
	}

	if(getPlayerCurrentSubAccount(client).cash < getBusinessData(businessId).floorItemCache[itemSlot].buyPrice*amount) {
		messagePlayerError(client, `You don't have enough money! You need [#AAAAAA]${getBusinessData(businessId).floorItemCache[itemSlot].buyPrice*amount-getPlayerCurrentSubAccount(client).cash} [#FFFFFF]more!`);
		return false;
	}

	takePlayerCash(client, getBusinessData(businessId).floorItemCache[itemSlot].buyPrice*amount);

	messagePlayerSuccess(client, `You bought ${amount} [#AAAAAA]${getItemTypeData(getItemData(getBusinessData(businessId).floorItemCache[itemSlot])).name} [#FFFFFF]for $${getBusinessData(businessId).floorItemCache[itemSlot].buyPrice*amount}!`);
}

// ---------------------------------------------------------------------------

function setBusinessItemSellPriceCommand(command, params, client) {
	let splitParams = params.split(" ");
	let businessId = getBusinessFromParams(splitParams[2]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	let itemSlot = toInteger(splitParams[0]) || 0;

	if(typeof getBusinessData(businessId).floorItemCache[itemSlot] == "undefined") {
		messagePlayerError(client, `Item slot ${itemSlot} doesn't exist!`);
		return false;
	}

	if(getBusinessData(businessId).floorItemCache[itemSlot] == -1) {
		messagePlayerError(client, `Item slot ${itemSlot} slot is empty!`);
		return false;
	}

	let newPrice = toInteger(splitParams[1]) || 0;
	if(newPrice < 0) {
		messagePlayerError(client, "The price can't be negative!");
		return false;
	}

	let oldPrice = getBusinessData(businessId).floorItemCache[itemSlot].buyPrice;
	getItemData(getBusinessData(businessId).floorItemCache[itemSlot]).buyPrice = newPrice;

	messagePlayerSuccess(client, `You changed the price of the ${getItemTypeData(getItemData(getBusinessData(businessId).floorItemCache[itemSlot])).name}s in slot ${itemSlot} from $${oldPrice} to $${newPrice}`);
}

// ---------------------------------------------------------------------------

function storeItemInBusinessStorageCommand(command, params, client) {
	let splitParams = params.split(" ");
	let businessId = getBusinessFromParams(splitParams[2]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	let itemSlot = toInteger(splitParams[0]) || 0;

	if(typeof getBusinessData(businessId).floorItemCache[itemSlot] == "undefined") {
		messagePlayerError(client, `Item slot ${itemSlot} doesn't exist!`);
		return false;
	}

	if(getBusinessData(businessId).floorItemCache[itemSlot] == -1) {
		messagePlayerError(client, `Item slot ${itemSlot} slot is empty!`);
		return false;
	}

	let firstSlot = getBusinessStorageFirstFreeItemSlot(businessId);

	if(firstSlot == -1) {
		messagePlayerError(client, `There isn't any room in this business storage`);
		return false;
	}

	getItemData(getBusinessData(businessId).floorItemCache[itemSlot]).ownerType = AG_ITEM_OWNER_BIZSTORAGE;
	getBusinessData(businessId).storageItemCache[firstSlot] = getBusinessData(businessId).floorItemCache[itemSlot];
	getBusinessData(businessId).storageItemCache[itemSlot] = -1;
	messagePlayerSuccess(client, `You moved the ${getItemTypeData(getItemData(getBusinessData(businessId).storageItemCache[firstSlot])).name}s in slot ${itemSlot} to the business storage in slot ${firstSlot}`);
}

// ---------------------------------------------------------------------------

function stockItemOnBusinessFloorCommand(command, params, client) {
	let splitParams = params.split(" ");
	let businessId = getBusinessFromParams(splitParams[2]) || (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "Business not found!");
		return false;
	}

	let itemSlot = toInteger(splitParams[0]) || 0;

	if(typeof getBusinessData(businessId).storageItemCache[itemSlot] == "undefined") {
		messagePlayerError(client, `Item slot ${itemSlot} doesn't exist!`);
		return false;
	}

	if(getBusinessData(businessId).storageItemCache[itemSlot] == -1) {
		messagePlayerError(client, `Item slot ${itemSlot} slot is empty!`);
		return false;
	}

	let firstSlot = getBusinessFloorFirstFreeItemSlot(businessId);

	if(firstSlot == -1) {
		messagePlayerError(client, `There isn't any room in this business storage`);
		return false;
	}

	getItemData(getBusinessData(businessId).storageItemCache[itemSlot]).ownerType = AG_ITEM_OWNER_BIZFLOOR;
	getBusinessData(businessId).floorItemCache[firstSlot] = getBusinessData(businessId).storageItemCache[itemSlot];
	getBusinessData(businessId).storageItemCache[itemSlot] = -1;
	messagePlayerSuccess(client, `You moved the ${getItemTypeData(getItemData(getBusinessData(businessId).storageItemCache[firstSlot])).name}s in slot ${itemSlot} of the business storage to the business floor slot ${firstSlot}`);
}

// ---------------------------------------------------------------------------

function getBusinessStorageFirstFreeItemSlot(businessId) {
	for(let i in getBusinessData(businessId).storageItemCache) {
		if(getBusinessData(businessId).storageItemCache[i] == -1) {
			return i;
		}
	}

	return -1;
}

// ---------------------------------------------------------------------------

function getBusinessFloorFirstFreeItemSlot(businessId) {
	for(let i in getBusinessData(businessId).floorItemCache) {
		if(getBusinessData(businessId).floorItemCache[i] == -1) {
			return i;
		}
	}

	return -1;
}

// ---------------------------------------------------------------------------

function cacheAllBusinessItems() {
	for(let i in getServerData().businesses) {
		for(let j in getServerData().items) {
			if(getItemData(j).ownerType == AG_ITEM_OWNER_BIZFLOOR && getItemData(j).ownerId == getBusinessData(j).databaseId) {
				getBusinessData(j).floorItemCache.push(j);
			} else if(getItemData(j).ownerType == AG_ITEM_OWNER_BIZSTORAGE && getItemData(j).ownerId == getBusinessData(j).databaseId) {
				getBusinessData(j).storageItemCache.push(j);
			}
		}
	}
}

// ---------------------------------------------------------------------------