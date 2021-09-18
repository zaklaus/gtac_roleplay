// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: vehicle.js
// DESC: Provides vehicle functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initVehicleScript() {
	logToConsole(LOG_INFO, "[VRR.Vehicle]: Initializing vehicle script ...");
	getServerData().vehicles = loadVehiclesFromDatabase();
	spawnAllVehicles();
	setAllVehicleIndexes();
	logToConsole(LOG_INFO, "[VRR.Vehicle]: Vehicle script initialized successfully!");
	return true;
}

// ===========================================================================

function loadVehiclesFromDatabase() {
	logToConsole(LOG_INFO, "[VRR.Vehicle]: Loading vehicles from database ...");
	let dbConnection = connectToDatabase();
	let tempVehicles = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM veh_main WHERE veh_server = ${getServerId()} AND veh_deleted = 0`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempVehicleData = new VehicleData(dbAssoc);
				tempVehicles.push(tempVehicleData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.Vehicle]: ${tempVehicles.length} vehicles loaded from database successfully!`);
	return tempVehicles;
}

// ===========================================================================

function saveAllVehiclesToDatabase() {
	logToConsole(LOG_INFO, "[VRR.Vehicle]: Saving all vehicles to database ...");
	let vehicles = getServerData().vehicles;
	for(let i in vehicles) {
		if(vehicles[i].needsSaved) {
			saveVehicleToDatabase(i);
		}
	}
	logToConsole(LOG_INFO, "[VRR.Vehicle]: Saved all vehicles to database!");

	return true;
}

// ===========================================================================

function saveVehicleToDatabase(vehicleDataId) {
	if(getVehicleData(vehicleDataId) == null) {
		// Invalid vehicle data
		return false;
	}

	let tempVehicleData = getServerData().vehicles[vehicleDataId];

	if(tempVehicleData.databaseId == -1) {
		// Temp vehicle, no need to save
		return false;
	}

	if(!tempVehicleData.needsSaved) {
		// Vehicle hasn't changed. No need to save.
		return false;
	}

	logToConsole(LOG_VERBOSE, `[VRR.Vehicle]: Saving vehicle ${tempVehicleData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		if(!tempVehicleData.spawnLocked) {
			if(doesGameHaveServerElements()) {
				tempVehicleData.spawnPosition = tempVehicleData.vehicle.position;
				tempVehicleData.spawnRotation = tempVehicleData.vehicle.heading;
			} else {
				tempVehicleData.spawnPosition = tempVehicleData.syncPosition;
				tempVehicleData.spawnRotation = tempVehicleData.syncHeading;
			}
		}

		let colour1RGBA = rgbaArrayFromToColour(tempVehicleData.colour1RGBA);
		let colour2RGBA = rgbaArrayFromToColour(tempVehicleData.colour2RGBA);
		let colour3RGBA = rgbaArrayFromToColour(tempVehicleData.colour3RGBA);
		let colour4RGBA = rgbaArrayFromToColour(tempVehicleData.colour4RGBA);

		let data = [
			["veh_server", getServerId()],
			["veh_model", tempVehicleData.model],
			["veh_owner_type", tempVehicleData.ownerType],
			["veh_owner_id", tempVehicleData.ownerId],
			["veh_locked", boolToInt(tempVehicleData.locked)],
			["veh_spawn_lock", boolToInt(tempVehicleData.spawnLocked)],
			["veh_buy_price", boolToInt(tempVehicleData.buyPrice)],
			["veh_rent_price", boolToInt(tempVehicleData.rentPrice)],
			["veh_pos_x", tempVehicleData.spawnPosition.x],
			["veh_pos_y", tempVehicleData.spawnPosition.y],
			["veh_pos_z", tempVehicleData.spawnPosition.z],
			["veh_rot_z", tempVehicleData.spawnRotation],
			["veh_col1", tempVehicleData.colour1],
			["veh_col2", tempVehicleData.colour2],
			["veh_col3", tempVehicleData.colour3],
			["veh_col4", tempVehicleData.colour4],
			["veh_col1_isrgb", tempVehicleData.colour1IsRGBA],
			["veh_col2_isrgb", tempVehicleData.colour2IsRGBA],
			["veh_col3_isrgb", tempVehicleData.colour3IsRGBA],
			["veh_col4_isrgb", tempVehicleData.colour4IsRGBA],
			["veh_col1_r", colour1RGBA[0]],
			["veh_col1_g", colour1RGBA[1]],
			["veh_col1_b", colour1RGBA[2]],
			["veh_col1_a", colour1RGBA[3]],
			["veh_col2_r", colour2RGBA[0]],
			["veh_col2_g", colour2RGBA[1]],
			["veh_col2_b", colour2RGBA[2]],
			["veh_col2_a", colour2RGBA[3]],
			["veh_col3_r", colour3RGBA[0]],
			["veh_col3_g", colour3RGBA[1]],
			["veh_col3_b", colour3RGBA[2]],
			["veh_col3_a", colour3RGBA[3]],
			["veh_col4_r", colour4RGBA[0]],
			["veh_col4_g", colour4RGBA[1]],
			["veh_col4_b", colour4RGBA[2]],
			["veh_col4_a", colour4RGBA[3]],
			["veh_extra1", tempVehicleData.extras[0]],
			["veh_extra2", tempVehicleData.extras[1]],
			["veh_extra3", tempVehicleData.extras[2]],
			["veh_extra4", tempVehicleData.extras[3]],
			["veh_extra5", tempVehicleData.extras[4]],
			["veh_extra6", tempVehicleData.extras[5]],
			["veh_extra7", tempVehicleData.extras[6]],
			["veh_extra8", tempVehicleData.extras[7]],
			["veh_extra9", tempVehicleData.extras[8]],
			["veh_extra10", tempVehicleData.extras[9]],
			["veh_extra11", tempVehicleData.extras[10]],
			["veh_extra12", tempVehicleData.extras[11]],
			["veh_extra13", tempVehicleData.extras[12]],
			["veh_engine", intToBool(tempVehicleData.engine)],
			["veh_lights", intToBool(tempVehicleData.lights)],
			["veh_health", toInteger(tempVehicleData.health)],
			["veh_damage_engine", toInteger(tempVehicleData.engineDamage)],
			["veh_damage_visual", toInteger(tempVehicleData.visualDamage)],
			["veh_dirt_level", toInteger(tempVehicleData.dirtLevel)],
		];

		let dbQuery = null;
		if(tempVehicleData.databaseId == 0) {
			let queryString = createDatabaseInsertQuery("veh_main", data);
			dbQuery = queryDatabase(dbConnection, queryString);
			getServerData().vehicles[vehicleDataId].databaseId = getDatabaseInsertId(dbConnection);
			getServerData().vehicles[vehicleDataId].needsSaved = false;
		} else {
			let queryString = createDatabaseUpdateQuery("veh_main", data, `veh_id=${tempVehicleData.databaseId}`);
			dbQuery = queryDatabase(dbConnection, queryString);
			getServerData().vehicles[vehicleDataId].needsSaved = false;
		}

		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
		return true;
	}
	logToConsole(LOG_VERBOSE, `[VRR.Vehicle]: Saved vehicle ${vehicleDataId} to database!`);

	return false;
}

// ===========================================================================

function spawnAllVehicles() {
	for(let i in getServerData().vehicles) {
		let vehicle = spawnVehicle(getServerData().vehicles[i]);
		getServerData().vehicles[i].vehicle = vehicle;
		setEntityData(vehicle, "vrr.dataSlot", i, false);
	}
}

// ===========================================================================

function getVehicleData(vehicle) {
	if(isVehicleObject(vehicle)) {
		let dataIndex = getEntityData(vehicle, "vrr.dataSlot");
		if(typeof getServerData().vehicles[dataIndex] != "undefined") {
			return getServerData().vehicles[dataIndex];
		}
	} else {

	}

	return false;
}

// ===========================================================================

function createVehicleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let modelId = getVehicleModelIdFromParams(params);

	if(!modelId) {
		messagePlayerError(client, "That vehicle type is invalid!");
		return false;
	}

	let frontPos = getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), getGlobalConfig().spawnCarDistance);
	let vehicle = createPermanentVehicle(modelId, frontPos, getPlayerHeading(client), getPlayerInterior(client), getPlayerDimension(client));

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}created a ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)}!`);
}

// ===========================================================================

function createTemporaryVehicleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let modelId = getVehicleModelIdFromParams(params);

	if(!modelId) {
		messagePlayerError(client, "That vehicle type is invalid!");
		return false;
	}

	let frontPos = getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), getGlobalConfig().spawnCarDistance);
	let vehicle = createTemporaryVehicle(modelId, frontPos, getPlayerHeading(client), getPlayerInterior(client), getPlayerDimension(client));

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}created a temporary ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)}`);
}

// ===========================================================================

function vehicleLockCommand(command, params, client) {
	let vehicle = getClosestVehicle(getPlayerPosition(client));

	if(!getPlayerVehicle(client) && getDistance(getVehiclePosition(vehicle), getPlayerPosition(client)) > getGlobalConfig().vehicleLockDistance) {
		messagePlayerError(client, "You need to be in or near a vehicle!");
		return false;
	}

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(isPlayerInAnyVehicle(client)) {
		vehicle = getPlayerVehicle(client);
		if(!isPlayerInFrontVehicleSeat(client)) {
			messagePlayerError(client, "You need to be in the front seat!");
			return false;
		}
	} else {
		if(!doesPlayerHaveVehicleKeys(client, vehicle)) {
			messagePlayerError(client, "You don't have keys to this vehicle!");
			return false;
		}
	}

	getVehicleData(vehicle).locked = !getVehicleData(vehicle).locked;
	vehicle.locked = getVehicleData(vehicle).locked;

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `${toLowerCase(getLockedUnlockedFromBool(getVehicleData(vehicle).locked))} the ${getVehicleName(vehicle)}`);
}

// ===========================================================================

function vehicleTrunkCommand(command, params, client) {
	let vehicle = getClosestVehicle(getPlayerPosition(client));

	let behindPosition = getPosBehindPos(getVehiclePosition(vehicle), getVehicleHeading(vehicle), getGlobalConfig().vehicleTrunkDistance);
	if(!getPlayerVehicle(client) && getDistance(behindPosition, getPlayerPosition(client)) > getGlobalConfig().vehicleTrunkDistance) {
		messagePlayerError(client, "You need to be in or near a vehicle!");
		return false;
	}

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(!doesPlayerHaveVehicleKeys(client, vehicle)) {
		messagePlayerError(client, "You don't have keys to this vehicle!");
		return false;
	}

	getVehicleData(vehicle).trunk = !getVehicleData(vehicle).trunk;

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `${toLowerCase(getOpenedClosedFromBool(getVehicleData(vehicle).trunk))} the ${getVehicleName(vehicle)}'s trunk.`);
}

// ===========================================================================

function vehicleLightsCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(getPlayerVehicleSeat(client) > 1) {
		messagePlayerError(client, "You need to be in the front seat!");
		return false;
	}

	getVehicleData(vehicle).lights = !getVehicleData(vehicle).lights;
	setEntityData(vehicle, "vrr.lights", getVehicleData(vehicle).lights);
	setVehicleLightsState(vehicle, getVehicleData(vehicle).lights);

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicle)}'s lights ${toLowerCase(getOnOffFromBool(getVehicleData(vehicle).lights))}`);
}

// ===========================================================================

function deleteVehicleCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and can't be deleted.");
		return false;
	}

	let dataIndex = getEntityData(vehicle, "vrr.dataSlot");
	let vehicleName = getVehicleName(vehicle);

	quickDatabaseQuery(`DELETE FROM veh_main WHERE veh_id = ${getVehicleData(vehicle).databaseId}`);

	getServerData().vehicles.splice(dataIndex, 1);
	destroyElement(vehicle);

	messagePlayerSuccess(client, `The ${vehicleName} has been deleted!`);
}

// ===========================================================================

function vehicleEngineCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	if(getPlayerVehicleSeat(client) > 0) {
		messagePlayerError(client, "You need to be the driver!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!doesPlayerHaveVehicleKeys(client, vehicle)) {
		messagePlayerError(client, "You don't have keys to this vehicle!");
		return false;
	}

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used on it.");
		return false;
	}

	getVehicleData(vehicle).engine = !getVehicleData(vehicle).engine;
	vehicle.engine = getVehicleData(vehicle).engine;

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicle)}'s engine ${toLowerCase(getOnOffFromBool(getVehicleData(vehicle).engine))}`);
}

// ===========================================================================

function vehicleSirenCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(getPlayerVehicleSeat(client) > 1) {
		messagePlayerError(client, "You need to be in the front seat!");
		return false;
	}

	if(!doesPlayerHaveVehicleKeys(client, vehicle)) {
		messagePlayerError(client, "You don't have keys to this vehicle!");
		return false;
	}

	getVehicleData(vehicle).siren = !getVehicleData(vehicle).siren;
	vehicle.siren = getVehicleData(vehicle).siren;

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `turns the ${getVehicleName(vehicle)}'s siren ${toLowerCase(getOnOffFromBool(getVehicleData(vehicle).siren))}`);
}

// ===========================================================================

function vehicleColourCommand(command, params, client) {
	if(areParamsEmpty(params) && areThereEnoughParams(params, 2)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(!getPlayerVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(!isAtPayAndSpray(getVehiclePosition(vehicle))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messagePlayerError(client, "You need to be at a pay-n-spray!");
			return false;
		}
	}

	if(getPlayerCurrentSubAccount(client).cash < getGlobalConfig().resprayVehicleCost) {
		messagePlayerError(client, `You don't have enough money to respray the vehicle (need $${getGlobalConfig().resprayVehicleCost-getPlayerCurrentSubAccount(client).cash} more!)`);
		return false;
	}

	let splitParams = params.split(" ");
	let colour1 = toInteger(splitParams[0]) || 0;
	let colour2 = toInteger(splitParams[1]) || 0;

	takePlayerCash(client, getGlobalConfig().resprayVehicleCost);
	updatePlayerCash(client);
	vehicle.colour1 = colour1;
	vehicle.colour2 = colour2;
	getVehicleData(vehicle).colour1 = colour1;
	getVehicleData(vehicle).colour2 = colour2;

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `resprays the ${getVehicleName(vehicle)}'s colours`);
}

// ===========================================================================

function vehicleRepairCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(!isAtPayAndSpray(getVehiclePosition(vehicle))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messagePlayerError(client, "You need to be at a pay-n-spray!");
			return false;
		}
	}

	if(getPlayerCurrentSubAccount(client).cash < getGlobalConfig().repairVehicleCost) {
		messagePlayerError(client, `You don't have enough money to repair the vehicle (need $${getGlobalConfig().resprayVehicleCost-getPlayerCurrentSubAccount(client).cash} more!)`);
		return false;
	}

	takePlayerCash(client, getGlobalConfig().repairVehicleCost);
	repairVehicle(vehicle);

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `repairs the ${getVehicleName(vehicle)}`);
}

// ===========================================================================

function vehicleLiveryCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(!isAtPayAndSpray(getVehiclePosition(vehicle))) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messagePlayerError(client, "You need to be at a pay-n-spray!");
			return false;
		}
	}

	if(getPlayerCurrentSubAccount(client).cash < getGlobalConfig().repairVehicleCost) {
		messagePlayerError(client, `You don't have enough money to change the vehicle's livery (need $${getGlobalConfig().resprayVehicleCost-getPlayerCurrentSubAccount(client).cash} more!)`);
		return false;
	}

	let splitParams = params.split(" ");
	let livery = toInteger(params) || 3;

	takePlayerCash(client, getGlobalConfig().resprayVehicleCost);
	updatePlayerCash(client);
	getVehicleData(vehicle).livery = livery;
	getVehicleData(vehicle).needsSaved = true;

	setEntityData(vehicle, "vrr.livery", livery, true);
	setTimeout(function() {
		forcePlayerToSyncElementProperties(null, vehicle);
	}, 1000);

	meActionToNearbyPlayers(client, `sets the ${getVehicleName(vehicle)}'s livery/paintjob'`);
}

// ===========================================================================

function buyVehicleCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(getVehicleData(vehicle).buyPrice <= 0) {
		messagePlayerError(client, `This ${getVehicleName(vehicle)} is not for sale!`);
		return false;
	}

	if(getPlayerCurrentSubAccount(client).cash < getVehicleData(vehicle).buyPrice) {
		messagePlayerError(client, `You don't have enough money to buy this vehicle (need $${getVehicleData(vehicle).buyPrice-getPlayerCurrentSubAccount(client).cash} more!)`);
		return false;
	}

	getPlayerData(client).buyingVehicle = vehicle;

	//getPlayerCurrentSubAccount(client).cash -= getVehicleData(vehicle).buyPrice;
	//getVehicleData(vehicle).buyPrice = 0;
	//getVehicleData(vehicle).rentPrice = 0;
	getVehicleData(vehicle).engine = true;
	vehicle.engine = true;

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `receives a set of keys to test drive the ${getVehicleName(vehicle)} and starts the engine`);
	messagePlayerInfo(client, `Drive the vehicle away from the dealership to buy it, or get out to cancel.`);
}

// ===========================================================================

function rentVehicleCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(getVehicleData(vehicle).rentPrice <= 0) {
		messagePlayerError(client, `This ${getVehicleName(vehicle)} is not for rent!`);
		return false;
	}

	if(getPlayerData(client).rentingVehicle) {
		messagePlayerAlert(client, `You are no longer renting the ${getVehicleName(vehicle)}`);
		stopRentingVehicle(client);
		return false;
	}

	if(getVehicleData(vehicle).rentedBy != false) {
		if(getVehicleData(vehicle).rentedBy != client) {
			messagePlayerAlert(client, `Someone else is already renting this vehicle!`);
			return false;
		} else {
			messagePlayerAlert(client, `You are already renting this vehicle!`);
			return false;
		}
	}

	getVehicleData(vehicle).rentedBy = client;
	getPlayerData(client).rentingVehicle = vehicle;
	getVehicleData(vehicle).rentStart = getCurrentUnixTimestamp();

	getVehicleData(vehicle).needsSaved = true;

	meActionToNearbyPlayers(client, `rents the ${getVehicleName(vehicle)} and receives a set of vehicle keys!`);
	messagePlayerAlert(client, `You will be charged $${getVehicleData(vehicle).rentPrice} per minute to use this vehicle. To stop renting this vehicle, use /vehrent again.`);

	if(!getVehicleData(vehicle).engine) {
		if(!doesPlayerHaveKeyBindsDisabled(client) && doesPlayerHaveKeyBindForCommand(client, "engine")) {
			messagePlayerTip(client, `The ${getVehicleName(vehicle)}'s engine is off. Press ${getInlineChatColourByName("lightGrey")}${toUpperCase(getKeyNameFromId(getPlayerKeyBindForCommand(client, "engine").key))} ${getInlineChatColourByName("white")}to start it.`);
		} else {
			messagePlayerAlert(client, `The ${getVehicleName(vehicle)}'s engine is off. Use /engine to start it`);
		}
	}
}

// ===========================================================================

function enterVehicleAsPassengerCommand(command, params, client) {
	triggerNetworkEvent("vrr.passenger", client);
}

// ===========================================================================

function stopRentingVehicleCommand(command, params, client) {
	if(!getPlayerData(client).rentingVehicle) {
		messagePlayerError(client, "You aren't renting a vehicle!");
		return false;
	}

	let vehicle = getPlayerData(client).rentingVehicle;
	messagePlayerAlert(client, `You are no longer renting the ${getVehicleName(vehicle)}`);
	stopRentingVehicle(client);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function doesPlayerHaveVehicleKeys(client, vehicle) {
	let vehicleData = getVehicleData(vehicle);

	if(doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
		return true;
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_PUBLIC) {
		return true;
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_PLAYER) {
		if(vehicleData.ownerId == getPlayerCurrentSubAccount(client).databaseId) {
			return true;
		}
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_CLAN) {
		if(vehicleData.ownerId == getPlayerCurrentSubAccount(client).clan) {
			if(vehicleData.clanRank <= getPlayerCurrentSubAccount(client).clanRank) {
				return true;
			}
		}
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_FACTION) {
		if(vehicleData.ownerId == getPlayerCurrentSubAccount(client).faction) {
			if(vehicleData.factionRank <= getPlayerCurrentSubAccount(client).factionRank) {
				return true;
			}
		}
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_JOB) {
		if(vehicleData.ownerId == getJobType(getPlayerCurrentSubAccount(client).job)) {
			return true;
		}
	}

	if(vehicleData.rentedBy == client) {
		return true;
	}

	return false;
}

// ===========================================================================

function doesClientOwnVehicle(client, vehicle) {
	let vehicleData = getVehicleData(vehicle);

	if(doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
		return true;
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_PLAYER) {
		if(vehicleData.ownerId == getPlayerData(client).accountData.databaseId) {
			return true;
		}
	}

	if(vehicleData.ownerType == VRR_VEHOWNER_CLAN) {
		if(vehicleData.ownerId == getPlayerCurrentSubAccount(client).clan) {
			if(doesPlayerHaveClanPermission(client, "manageVehicles") || doesPlayerHaveClanPermission(client, "owner")) {
				return true;
			}
		}
	}

	return false;
}

// ===========================================================================

function getVehicleName(vehicle) {
	return getVehicleNameFromModelId(vehicle.modelIndex) || "Unknown";
}

// ===========================================================================

function setVehicleJobCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	let closestJobLocation = getClosestJobLocation(getVehiclePosition(vehicle));
	let jobId = closestJobLocation.job;

	if(!areParamsEmpty(params)) {
		jobId = getJobFromParams(params);
	}

	//if(!jobId) {
	//	messagePlayerError(client, "That job is invalid!");
	//	messagePlayerInfo(client, "Please specify a job ID or leave it out to get the closest job.");
	//	return false;
	//}

	getVehicleData(vehicle).ownerType = VRR_VEHOWNER_JOB;
	getVehicleData(vehicle).ownerId = getJobData(jobId).databaseId;

	getVehicleData(vehicle).needsSaved = true;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}owner to the ${getInlineChatColourByType("jobYellow")}${getJobData(jobId).name} ${getInlineChatColourByName("white")}job! (Job ID ${jobId})`);
}

// ===========================================================================

function setVehicleRankCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	let rankId = params;

	if(getVehicleData(vehicle).ownerType == VRR_VEHOWNER_CLAN) {
		rankId = getClanRankFromParams(getVehicleData(vehicle).ownerId, params);
		if(!getClanRankData(getVehicleData(vehicle).ownerId, rankId)) {
			messagePlayerError(client, "Clan rank not found!");
			return false;
		}
		getVehicleData(vehicle).rank = getClanRankData(getVehicleData(vehicle).ownerId, rankId).databaseId;
		messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}rank to ${getInlineChatColourByName("lightGrey")}${getClanRankData(getVehicleData(vehicle).ownerId, rankId).name} ${getInlineChatColourByName("white")}of the ${getInlineChatColourByType("clanOrange")}${getClanData(getVehicleData(vehicle).ownerId).name} [#FFFFFFclan!`);
	} else if(getVehicleData(vehicle).ownerType == VRR_VEHOWNER_JOB) {
		getVehicleData(vehicle).rank = rankId;
		messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}rank to ${getInlineChatColourByName("lightGrey")}${rankId} ${getInlineChatColourByName("white")}of the ${getInlineChatColourByType("jobYellow")}${getJobData(getJobIdFromDatabaseId(getVehicleData(vehicle).ownerId)).name} ${getInlineChatColourByName("white")}job!`);
	}

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function setVehicleClanCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);
	let clanId = getClanFromParams(params);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "That clan is invalid or doesn't exist!");
		return false;
	}

	getVehicleData(vehicle).ownerType = VRR_VEHOWNER_CLAN;
	getVehicleData(vehicle).ownerId = getClanData(clanId).databaseId;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}owner to the ${getInlineChatColourByType("clanOrange")}${getClanData(clanId).name} ${getInlineChatColourByName("white")}clan`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function setVehicleToBusinessCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);
	let businessId = toInteger(isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	getVehicleData(vehicle).ownerType = VRR_VEHOWNER_BIZ;
	getVehicleData(vehicle).ownerId = getBusinessData(businessId).databaseId;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}owner to the ${getInlineChatColourByType("businessBlue")}${getBusinessData(businessId).name} ${getInlineChatColourByName("white")}business`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function setVehicleOwnerCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);
	let targetClient = getPlayerFromParams(params);

	if(!targetClient) {
		messagePlayerError(client, "That player is invalid or isn't connected!");
		return false;
	}

	getVehicleData(vehicle).ownerType = VRR_VEHOWNER_PLAYER;
	getVehicleData(vehicle).ownerId = getPlayerCurrentSubAccount(targetClient).databaseId;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}owner to ${getInlineChatColourByName("lightGrey")}${getClientSubAccountName(targetClient)}`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function setVehiclePublicCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	getVehicleData(vehicle).ownerType = VRR_VEHOWNER_PUBLIC;
	getVehicleData(vehicle).ownerId = 0;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}a public vehicle!`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function setVehicleRentPriceCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!doesClientOwnVehicle(client, vehicle)) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messagePlayerError(client, "You can't set the rent price for this vehicle!");
		}
	}

	let amount = toInteger(params) || 0;

	getVehicleData(vehicle).rentPrice = amount;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}rent price to ${getInlineChatColourByName("lightGrey")}$${amount}`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function setVehicleBuyPriceCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!doesClientOwnVehicle(client, vehicle)) {
		if(!doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messagePlayerError(client, "You can't set the buy price for this vehicle!");
		}
	}

	let amount = toInteger(params) || 0;

	getVehicleData(vehicle).buyPrice = amount;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)}'s ${getInlineChatColourByName("white")}buy price to ${getInlineChatColourByName("lightGrey")}$${amount}`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function removeVehicleOwnerCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);
	let targetClient = getPlayerFromParams(params);

	if(!targetClient) {
		messagePlayerError(client, "That player is invalid or isn't connected!");
		return false;
	}

	getVehicleData(vehicle).ownerType = VRR_VEHOWNER_NONE;
	getVehicleData(vehicle).ownerId = 0;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}owner to nobody!`);
	messagePlayerInfo(client, `Nobody will be able to use this vehicle until it receives a new owner (either bought or set by admin).`);
}

// ===========================================================================

function getVehicleInfoCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and doesn't have any info");
		return false;
	}

	let vehicleData = getVehicleData(vehicle);

	let ownerName = "Nobody";
	let ownerType = "None";
	ownerType = toLowerCase(getVehicleOwnerTypeText(vehicleData.ownerType));
	switch(vehicleData.ownerType) {
		case VRR_VEHOWNER_CLAN:
			ownerName = getClanData(vehicleData.ownerId).name;
			ownerType = "clan";
			break;

		case VRR_VEHOWNER_JOB:
			ownerName = getJobData(getJobIdFromDatabaseId(vehicleData.ownerId)).name;
			ownerType = "job";
			break;

		case VRR_VEHOWNER_PLAYER:
			let subAccountData = loadSubAccountFromId(vehicleData.ownerId);
			ownerName = `${subAccountData.firstName} ${subAccountData.lastName} [${subAccountData.databaseId}]`;
			ownerType = "player";
			break;

		case VRR_VEHOWNER_BIZ:
			ownerName = getBusinessData(vehicleData.ownerId).name;
			ownerType = "business";
			break;

		default:
			break;
	}

	messagePlayerNormal(client, `🚗 ${getInlineChatColourByType("vehiclePurple")}[Vehicle Info] ${getInlineChatColourByName("white")}ID: ${getInlineChatColourByName("lightGrey")}${getElementId(vehicle)}, ${getInlineChatColourByName("white")}DatabaseID: ${getInlineChatColourByName("lightGrey")}${vehicleData.databaseId}, ${getInlineChatColourByName("white")}Owner: ${getInlineChatColourByName("lightGrey")}${ownerName}[ID ${vehicleData.ownerId}] (${ownerType}), ${getInlineChatColourByName("white")}Type: ${getInlineChatColourByName("lightGrey")}${getVehicleName(vehicle)}[${vehicle.modelIndex}], ${getInlineChatColourByName("white")}BuyPrice: ${getInlineChatColourByName("lightGrey")}${vehicleData.buyPrice}, ${getInlineChatColourByName("white")}RentPrice: ${getInlineChatColourByName("lightGrey")}${vehicleData.rentPrice}`);
}

// ===========================================================================

function getLastVehicleInfoCommand(command, params, client) {
	//if(!isPlayerInAnyVehicle(client)) {
	//	messagePlayerError(client, "You need to be in a vehicle!");
	//	return false;
	//}

	let vehicle = getPlayerLastVehicle(client);

	if(!getVehicleData(vehicle)) {
		messagePlayerError(client, "This is a random traffic vehicle and doesn't have any info");
		return false;
	}

	let vehicleData = getVehicleData(vehicle);

	let ownerName = "Nobody";
	let ownerType = "None";
	ownerType = toLowerCase(getVehicleOwnerTypeText(vehicleData.ownerType));
	switch(vehicleData.ownerType) {
		case VRR_VEHOWNER_CLAN:
			ownerName = getClanData(vehicleData.ownerId).name;
			ownerType = "clan";
			break;

		case VRR_VEHOWNER_JOB:
			ownerName = getJobData(vehicleData.ownerId).name;
			ownerType = "job";
			break;

		case VRR_VEHOWNER_PLAYER:
			let subAccountData = loadSubAccountFromId(vehicleData.ownerId);
			ownerName = `${subAccountData.firstName} ${subAccountData.lastName} [${subAccountData.databaseId}]`;
			ownerType = "player";
			break;

		case VRR_VEHOWNER_BIZ:
			ownerName = getBusinessData(vehicleData.ownerId).name;
			ownerType = "business";
			break;

		default:
			break;
	}

	messagePlayerNormal(client, `🚗 ${getInlineChatColourByType("vehiclePurple")}[Vehicle Info] ${getInlineChatColourByName("white")}ID: ${getInlineChatColourByName("lightGrey")}${vehicle.id}, ${getInlineChatColourByName("white")}DatabaseID: ${getInlineChatColourByName("lightGrey")}${vehicleData.databaseId}, ${getInlineChatColourByName("white")}Owner: ${getInlineChatColourByName("lightGrey")}${ownerName}[ID ${vehicleData.ownerId}] (${ownerType}), ${getInlineChatColourByName("white")}Type: ${getInlineChatColourByName("lightGrey")}${getVehicleName(vehicle)}[${vehicle.modelIndex}], ${getInlineChatColourByName("white")}BuyPrice: ${getInlineChatColourByName("lightGrey")}${vehicleData.buyPrice}, ${getInlineChatColourByName("white")}RentPrice: ${getInlineChatColourByName("lightGrey")}${vehicleData.rentPrice}`);
}

// ===========================================================================

function toggleVehicleSpawnLockCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle!");
		return false;
	}

	let vehicle = getPlayerVehicle(client);

	getVehicleData(vehicle).spawnLocked = !getVehicleData(vehicle).spawnLocked;
	if(getVehicleData(vehicle).spawnLocked) {
		getVehicleData(vehicle).spawnPosition = getVehiclePosition(vehicle);
		getVehicleData(vehicle).spawnRotation = getVehicleHeading(vehicle);
	}

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set their ${getInlineChatColourByType("vehiclePurple")}${getVehicleName(vehicle)} ${getInlineChatColourByName("white")}to spawn ${getInlineChatColourByName("lightGrey")}${(getVehicleData(vehicle).spawnLocked) ? "at it's current location" : "wherever a player leaves it."}`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function reloadAllVehiclesCommand(command, params, client) {
	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i].vehicle) {
			deleteGameElement(getServerData().vehicles[i].vehicle);
		}
	}

	getServerData().vehicles = null;
	getServerData().vehicles = loadVehiclesFromDatabase();
	spawnAllVehicles();

	messageAdminAction(`All server vehicles have been reloaded by an admin!`);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function respawnAllVehiclesCommand(command, params, client) {
	for(let i in getServerData().vehicles) {
		respawnVehicle(getServerData().vehicles[i]);
	}

	//spawnAllVehicles();

	messageAdminAction(`All server vehicles have been respawned by an admin!`);
}

// ===========================================================================

function stopRentingVehicle(client) {
	let vehicle = getPlayerData(client).rentingVehicle;
	getPlayerData(client).rentingVehicle = false;
	getVehicleData(vehicle).rentedBy = false;
	respawnVehicle(vehicle);

	getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function respawnVehicle(vehicle) {
	let vehicles = getServerData().vehicles;
	for(let i in vehicles) {
		if(vehicle == vehicles[i].vehicle) {
			destroyElement(vehicle);
			let newVehicle = spawnVehicle(vehicles[i]);
			vehicles[i].vehicle = newVehicle;
			setEntityData(newVehicle, "vrr.dataSlot", i, false);
		}
	}

	//getVehicleData(vehicle).needsSaved = true;
}

// ===========================================================================

function spawnVehicle(vehicleData) {
	let vehicle = createGameVehicle(vehicleData.model, vehicleData.spawnPosition, vehicleData.spawnRotation);
	addToWorld(vehicle);

	if(doesGameHaveServerElements()) {
		if(vehicleData.colour1IsRGBA && vehicleData.colour2IsRGBA) {
			vehicle.setRGBColours(vehicleData.colour1RGBA, vehicleData.colour2RGBA);
		} else {
			vehicle.colour1 = vehicleData.colour1;
			vehicle.colour2 = vehicleData.colour2;
			vehicle.colour3 = vehicleData.colour3;
			vehicle.colour4 = vehicleData.colour4;
		}

		if(vehicleData.spawnLocked) {
			vehicle.engine = false;
		} else {
			vehicle.engine = intToBool(vehicleData.engine);
		}

		vehicle.locked = intToBool(vehicleData.locked);

		//vehicle.lights = intToBool(vehicleData.lights);
		//vehicle.health = vehicleData.health;

		//vehicle.position = vehicleData.spawnPosition;
		vehicle.heading = vehicleData.spawnRotation;
	}

	vehicleData.vehicle = vehicle;

	setEntityData(vehicle, "vrr.livery", vehicleData.livery);
	setEntityData(vehicle, "vrr.upgrades", vehicleData.extras);
	setEntityData(vehicle, "vrr.interior", vehicleData.interior);

	return vehicle;
}

// ===========================================================================

function isVehicleAtPayAndSpray(vehicle) {
	for(let i in getServerData().payAndSprays[getServerGame()]) {
		if(getDistance(getVehiclePosition(vehicle), getServerData().payAndSprays[getServerGame()][i].position) <= getGlobalConfig().payAndSprayDistance) {
			return true;
		}
	}
	return false;
}

// ===========================================================================

function getVehicleOwnerTypeText(ownerType) {
	switch(ownerType) {
		case VRR_VEHOWNER_CLAN:
			return "clan";

		case VRR_VEHOWNER_JOB:
			return "job";

		case VRR_VEHOWNER_PLAYER:
			return "player";

		case VRR_VEHOWNER_BIZ:
			return "business";

		default:
			return "unknown";
	}
}

// ===========================================================================

function isVehicleOwnedByJob(vehicle, jobId) {
	if(getVehicleData(vehicle).ownerType == VRR_VEHOWNER_JOB) {
		return (getVehicleData(vehicle).ownerId == jobId);
	}
	return false;
}

// ===========================================================================

async function getPlayerNewVehicle(client) {
	while(true) {
		if(isPlayerInAnyVehicle(client)) {
			return getPlayerVehicle(client);
		}
		await null;
	}
}

// ===========================================================================

function createNewDealershipVehicle(model, spawnPosition, spawnRotation, price, dealershipId, interior = 0, dimension = 0) {
	let vehicle = createGameVehicle(model, spawnPosition, spawnRotation);
	if(!vehicle) {
		return false;
	}
	setVehicleHeading(vehicle, spawnRotation);
	setElementInterior(vehicle, interior);
	setElementDimension(vehicle, dimension);
	addToWorld(vehicle);

	let tempVehicleData = new VehicleData(false, vehicle);
	tempVehicleData.buyPrice = price;
	tempVehicleData.spawnLocked = true;
	tempVehicleData.spawnPosition = spawnPosition;
	tempVehicleData.spawnRotation = spawnRotation;
	tempVehicleData.ownerType = VRR_VEHOWNER_BIZ;
	tempVehicleData.ownerId = dealershipId;
	tempVehicleData.needsSaved = true;

	let slot = getServerData().vehicles.push(tempVehicleData);
	setEntityData(vehicle, "vrr.dataSlot", slot-1, false);
}

// ===========================================================================

function createTemporaryVehicle(modelId, position, heading, interior = 0, dimension = 0) {
	let vehicle = createGameVehicle(modelId, position, heading);
	setVehicleHeading(vehicle, heading);
	setElementInterior(vehicle, interior);
	setElementDimension(vehicle, dimension);
	addToWorld(vehicle);

	let tempVehicleData = new VehicleData(false, vehicle);
	tempVehicleData.databaseId = -1;
	let slot = getServerData().vehicles.push(tempVehicleData);
	setEntityData(vehicle, "vrr.dataSlot", slot-1, false);

	return vehicle;
}

// ===========================================================================

function createPermanentVehicle(modelId, position, heading, interior = 0, dimension = 0) {
	let vehicle = createGameVehicle(modelId, position, heading);
	setVehicleHeading(vehicle, heading);
	setElementInterior(vehicle, interior);
	setElementDimension(vehicle, dimension);
	addToWorld(vehicle);

	let tempVehicleData = new VehicleData(false, vehicle);
	let slot = getServerData().vehicles.push(tempVehicleData);
	setEntityData(vehicle, "vrr.dataSlot", slot-1, false);

	return vehicle;
}

// ===========================================================================

function checkVehicleBuying() {
	let clients = getClients();
	for(let i in clients) {
		if(getPlayerData(clients[i])) {
			if(getPlayerData(clients[i]).buyingVehicle) {
				if(getPlayerVehicle(clients[i]) == getPlayerData(clients[i]).buyingVehicle) {
					if(getDistance(getVehiclePosition(getPlayerData(clients[i]).buyingVehicle), getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnPosition) > getGlobalConfig().buyVehicleDriveAwayDistance) {
						if(getPlayerCurrentSubAccount(clients[i]).cash < getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice) {
							messagePlayerError(client, "You don't have enough money to buy this vehicle!");
							respawnVehicle(getPlayerData(clients[i]).buyingVehicle);
							getPlayerData(clients[i]).buyingVehicle = false;
							return false;
						}

						createNewDealershipVehicle(getVehicleData(getPlayerData(clients[i]).buyingVehicle).model, getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnPosition, getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnRotation, getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice, getVehicleData(getPlayerData(clients[i]).buyingVehicle).ownerId);
						takePlayerCash(clients[i], getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice);
						updatePlayerCash(clients[i]);
						getVehicleData(getPlayerData(clients[i]).buyingVehicle).ownerId = getPlayerCurrentSubAccount(clients[i]).databaseId;
						getVehicleData(getPlayerData(clients[i]).buyingVehicle).ownerType = VRR_VEHOWNER_PLAYER;
						getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice = 0;
						getVehicleData(getPlayerData(clients[i]).buyingVehicle).rentPrice = 0;
						getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnLocked = false;
						getPlayerData(clients[i]).buyingVehicle = false;
						messagePlayerSuccess(clients[i], "This vehicle is now yours! It will save wherever you leave it.");
					}
				} else {
					messagePlayerError(client, "You canceled the vehicle purchase by exiting the vehicle!");
					respawnVehicle(getPlayerData(clients[i]).buyingVehicle);
					getPlayerData(clients[i]).buyingVehicle = false;
				}
			}
		}
	}
}

// ===========================================================================

function checkVehicleBurning() {
	let vehicles = getElementsByType(ELEMENT_VEHICLE);
	for(let i in vehicles) {

	}
}

// ===========================================================================

function cacheAllVehicleItems() {
	for(let i in getServerData().vehicles) {
		for(let j in getServerData().items) {
			if(getItemData(j).ownerType == VRR_ITEM_OWNER_VEHTRUNK && getItemData(j).ownerId == getServerData().vehicles[i].databaseId) {
				getServerData().vehicles[i].trunkItemCache.push(j);
			} else if(getItemData(j).ownerType == VRR_ITEM_OWNER_VEHDASH && getItemData(j).ownerId == getServerData().vehicles[i].databaseId) {
				getServerData().vehicles[i].dashItemCache.push(j);
			}
		}
	}
}

// ===========================================================================

function resetVehiclePosition(vehicle) {
	if(!getVehicleData(vehicle).spawnLocked) {
		getVehicleData(vehicle).spawnPosition = getVehiclePosition(vehicle);
		getVehicleData(vehicle).spawnHeading = getVehiclePosition(vehicle);
	}
}

// ===========================================================================

function setAllVehicleIndexes() {
	for(let i in getServerData().vehicles) {
		getServerData().vehicles[i].index = i;
	}
}

// ===========================================================================