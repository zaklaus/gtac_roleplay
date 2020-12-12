// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: vehicle.js
// DESC: Provides vehicle functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================


function initVehicleScript() {
	console.log("[Asshat.Vehicle]: Initializing vehicle script ...");
	getServerData().vehicles = loadVehiclesFromDatabase();
	spawnAllVehicles();
	addVehicleCommandHandlers();
	console.log("[Asshat.Vehicle]: Vehicle script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addVehicleCommandHandlers() {
	console.log("[Asshat.Vehicle]: Adding vehicle command handlers ...");
	let vehicleCommands = serverCommands.vehicle;
	for(let i in vehicleCommands) {
		addCommandHandler(vehicleCommands[i].command, vehicleCommands[i].handlerFunction);
	}
	console.log("[Asshat.Vehicle]: Vehicle command handlers added successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadVehiclesFromDatabase() {
	console.log("[Asshat.Vehicle]: Loading vehicles from database ...");
	let dbConnection = connectToDatabase();
	let tempVehicles = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM veh_main WHERE veh_server = ${serverId} AND veh_deleted = 0`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempVehicleData = new serverClasses.vehicleData(dbAssoc);
				tempVehicles.push(tempVehicleData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	
	console.log("[Asshat.Vehicle]: " + tempVehicles.length + " vehicles loaded from database successfully!");
	return tempVehicles;
}

// ---------------------------------------------------------------------------

function saveAllVehiclesToDatabase() {
	console.log("[Asshat.Vehicle]: Saving all vehicles to database ...");
	let vehicles = getServerData().vehicles;
	for(let i in vehicles) {
		saveVehicleToDatabase(vehicles[i]);
	}
	console.log("[Asshat.Vehicle]: Saved all vehicles to database!");

	return true;
}

// ---------------------------------------------------------------------------

function saveVehicleToDatabase(vehicleData) {
	if(vehicleData.databaseId == -1) {
		// Temp vehicle, no need to save
		return false;
	}

	console.log(`[Asshat.Vehicle]: Saving vehicle ${vehicleData.vehicle.id} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		if(!vehicleData.spawnLocked) {
			if(!isGTAIV()) {
				vehicleData.spawnPosition = vehicleData.vehicle.position;
				vehicleData.spawnRotation = vehicleData.vehicle.heading;
			} else {
				vehicleData.spawnPosition = vehicleData.syncPosition;
				vehicleData.spawnRotation = vehicleData.syncHeading;    
			}
		}

		// If vehicle hasn't been added to database, ID will be 0
		if(vehicleData.databaseId == 0) {
			let dbQueryString = `INSERT INTO veh_main (veh_model, veh_pos_x, veh_pos_y, veh_pos_z, veh_rot_z, veh_owner_type, veh_owner_id, veh_col1, veh_col2, veh_col3, veh_col4, veh_server, veh_spawn_lock, veh_buy_price, veh_rent_price) VALUES (${vehicleData.model}, ${vehicleData.spawnPosition.x}, ${vehicleData.spawnPosition.y}, ${vehicleData.spawnPosition.z}, ${vehicleData.spawnRotation}, ${vehicleData.ownerType}, ${vehicleData.ownerId}, ${vehicleData.colour1}, ${vehicleData.colour2}, ${vehicleData.colour3}, ${vehicleData.colour4}, ${serverId}, ${boolToInt(vehicleData.spawnLocked)}, ${vehicleData.buyPrice}, ${vehicleData.rentPrice})`;
			queryDatabase(dbConnection, dbQueryString);
			getVehicleData(vehicleData.vehicle).databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE veh_main SET veh_model=${vehicleData.model}, veh_pos_x=${vehicleData.spawnPosition.x}, veh_pos_y=${vehicleData.spawnPosition.y}, veh_pos_z=${vehicleData.spawnPosition.z}, veh_rot_z=${vehicleData.spawnRotation}, veh_owner_type=${vehicleData.ownerType}, veh_owner_id=${vehicleData.ownerId}, veh_col1=${vehicleData.colour1}, veh_col2=${vehicleData.colour2}, veh_col3=${vehicleData.colour3}, veh_col4=${vehicleData.colour4} WHERE veh_id=${vehicleData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Vehicle]: Saved vehicle ${vehicleData.vehicle.id} to database!`);

	return false;
}

// ---------------------------------------------------------------------------

function spawnAllVehicles() {
	let vehicles = getServerData().vehicles;
	for(let i in vehicles) {
		if(isGTAIV()) {
			if(!vehicles[i].syncedBy) {
				let closestClient = getClosestPlayer(vehicles[i].spawnPosition);
				triggerNetworkEvent("ag.vehicle", closestClient, i, vehicles[i].modelIndex, vehicles[i].spawnPosition, vehicles[i].spawnRotation, vehicles[i].colour1, vehicles[i].colour2, vehicles[i].locked, vehicles[i].lights);
				vehicles[i].syncedBy = closestClient;
			}
		} else {
			let vehicle = spawnVehicle(vehicles[i]);
			vehicles[i].vehicle = vehicle;
			setEntityData(vehicle, "ag.dataSlot", i, false);
		}
	}
}

// ---------------------------------------------------------------------------

function getVehicleData(vehicle) {
	let dataIndex = getEntityData(vehicle, "ag.dataSlot");
	if(typeof getServerData().vehicles[dataIndex] != "undefined") {
		return getServerData().vehicles[dataIndex];
	}
	return false;
}

// ---------------------------------------------------------------------------

function createVehicleCommand(command, params, client) {
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

	let modelId = getVehicleModelIdFromParams(params);

	if(!modelId) {
		messageClientError(client, "That vehicle type is invalid!");
		return false;
	}

	let frontPos = getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), getServerConfig().spawnCarDistance);
	let vehicleDataSlot = getServerData().vehicles.length;

	let tempVehicleData = false;
	if(!isGTAIV()) {
		let vehicle = gta.createVehicle(modelId, frontPos, getPlayerHeading(client));
		addToWorld(vehicle);
		tempVehicleData = new serverClasses.vehicleData(false, vehicle);
		tempVehicleData.syncId = vehicleDataSlot;
		setEntityData(vehicle, "ag.dataSlot", vehicleDataSlot, true);
		setEntityData(vehicle, "ag.syncId", vehicleDataSlot, true);
	} else {
		triggerNetworkEvent("ag.vehicle", getClosestPlayer(frontPos), vehicleDataSlot, modelId, frontPos, getPlayerHeading(client), 133, 133, 0, false);
		tempVehicleData = new serverClasses.vehicleData(false, vehicle);
	} 

	getServerData().vehicles.push(tempVehicleData);
	getServerData().vehicles[vehicleDataSlot].syncId = vehicleDataSlot;

	messageClientSuccess(client, `You created a ${getVehicleName(tempVehicleData.model)}!`);
}

// ---------------------------------------------------------------------------

function createTemporaryVehicleCommand(command, params, client) {
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

	let modelId = getVehicleModelIdFromParams(params);

	if(!modelId) {
		messageClientError(client, "That vehicle type is invalid!");
		return false;
	}

	let frontPos = getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), getServerConfig().spawnCarDistance);
	let vehicleDataSlot = getServerData().vehicles.length;

	let tempVehicleData = false;
	if(!isGTAIV()) {
		let vehicle = gta.createVehicle(modelId, frontPos, getPlayerHeading(client));
		addToWorld(vehicle);
		tempVehicleData = new serverClasses.vehicleData(false, vehicle);
	} else {
		triggerNetworkEvent("ag.vehicle", getClosestPlayer(frontPos), vehicleDataSlot, modelId, frontPos, getPlayerHeading(client), 133, 133, 0, false);
		tempVehicleData = new serverClasses.vehicleData(false, vehicle);
	}

	tempVehicleData.databaseId = -1;

	getServerData().vehicles.push(tempVehicleData);
	getServerData().vehicles[vehicleDataSlot].syncId = vehicleDataSlot;

	messageClientSuccess(client, `You created a temporary ${getVehicleName(tempVehicleData.model)}!`);
}

// ---------------------------------------------------------------------------

function vehicleLockCommand(command, params, client) {
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

	let vehicleData = getClosestVehicle(getPlayerPosition(client));
	if(!getPlayerVehicle(client) && getVehiclePosition(vehicleData).distance(getPlayerPosition(client)) > getServerConfig().vehicleLockDistance) {
		messageClientError(client, "You need to be in or near a vehicle!");
		return false;
	}

	if(getPlayerVehicle(client)) {
		vehicleData = getPlayerVehicle(client);
	} else {
		if(!doesClientHaveVehicleKeys(client, vehicleData)) {
			messageClientError(client, "You don't have keys to this vehicle!");
			return false;
		}
	}

	if(vehicleData.locked) {
		vehicle.locked = false;
		vehicleData.locked = false;
	} else {
		vehicle.locked = true;
		vehicleData.locked = true;
	}

	let lockText = (vehicleData.locked) ? "locked" : "unlocked";

	meActionToNearbyPlayers(client, lockText + " the " + getVehicleName(vehicleData.model));
}

// ---------------------------------------------------------------------------

function vehicleLightsCommand(command, params, client) {
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

	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicleData = getPlayerVehicle(client);

	if(getPlayerVehicleSeat(client) > 1) {
		messageClientError(client, "You need to be in the front seat!");
		return false;		
	}	

	triggerNetworkEvent("ag.veh.lights", getVehicleSyncer(vehicleData), vehicleData.syncId, lights);
	
	vehicleData.lights = !vehicleData.lights;

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicleData.model)}'s lights ${getOnOffFromBool(vehicleData.lights)}`);
}

// ---------------------------------------------------------------------------

function vehicleEngineCommand(command, params, client) {
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

	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(getPlayerVehicleSeat(client) > 0) {
		messageClientError(client, "You need to be the driver!");
		return false;		
	}

	let vehicleData = getPlayerVehicle(client);

	if(!doesClientHaveVehicleKeys(client, vehicleData)) {
		messageClientError(client, "You don't have keys to this vehicle!");
		return false;
	}

	vehicleData.engine = !vehicleData.engine;

	triggerNetworkEvent("ag.veh.engine", getVehicleSyncer(vehicleData), vehicleData.syncId, engine);

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicleData.model)}'s engine ${getOnOffFromBool(vehicleData.engine)}`);
}

// ---------------------------------------------------------------------------

function vehicleSirenCommand(command, params, client) {
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

	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(getPlayerVehicleSeat(client) > 1) {
		messageClientError(client, "You need to be in the front seat!");
		return false;		
	}

	let vehicleData = getPlayerVehicle(client);

	if(!doesClientHaveVehicleKeys(client, vehicleData)) {
		messageClientError(client, "You don't have keys to this vehicle!");
		return false;
	}

	vehicleData.siren = !vehicleData.siren;

	meActionToNearbyPlayers(client, `turns the ${getVehicleName(vehicleData.model)}'s siren ${getOnOffFromBool(siren)}`);
}

// ---------------------------------------------------------------------------

function setVehicleColourCommand(command, params, client) {
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

	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}	

	let vehicle = getPlayerVehicle(client);

	if(!isVehicleAtPayAndSpray(vehicle)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You need to be at a pay-n-spray!");
			return false;
		}
	}

	if(getClientCurrentSubAccount(client).cash < getServerConfig().resprayVehicleCost) {
		messageClientError(client, `You don't have enough money to respray the vehicle (need $${getServerConfig().resprayVehicleCost-getClientCurrentSubAccount(client).cash} more!)`);
		return false;
	}

	let splitParams = params.split(" ");
	let colour1 = toInteger(splitParams[0]) || 0;
	let colour2 = toInteger(splitParams[1]) || 0;

	
	getClientCurrentSubAccount(client).cash -= getServerConfig().resprayVehicleCost;
	if(server.game == GAME_GTA_IV) {
		triggerNetworkEvent("ag.veh.colour", getVehicleData(vehicle).syncedBy, getVehicleData(vehicle).syncId, colour1, colour2)
	} else {
		vehicle.colour1 = colour1;
		vehicle.colour2 = colour2;
		getVehicleData(vehicle).colour1 = colour1;
		getVehicleData(vehicle).colour2 = colour1;
	}
	
	meActionToNearbyPlayers(client, `resprays the ${getVehicleName(vehicle)}'s colours`);
}

// ---------------------------------------------------------------------------

function vehicleRepairCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);	

	if(!isAtPayAndSpray(vehicleData.syncPosition)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You need to be at a pay-n-spray!");
			return false;
		}
	}

	if(getClientCurrentSubAccount(client).cash < getServerConfig().repairVehicleCost) {
		messageClientError(client, `You don't have enough money to repair the vehicle (need $${getServerConfig().resprayVehicleCost-getClientCurrentSubAccount(client).cash} more!)`);
		return false;
	}

	
	getClientCurrentSubAccount(client).cash -= getServerConfig().repairVehicleCost;
	repairVehicle(vehicleData);
	
	meActionToNearbyPlayers(client, `repairs the ${getVehicleName(vehicleData.model)}!`);
}

// ---------------------------------------------------------------------------

function buyVehicleCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);	

	if(!isAtPayAndSpray(vehicleData.syncPosition)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You need to be at a pay-n-spray!");
			return false;
		}
	}

	if(getClientCurrentSubAccount(client).cash < vehicleData.buyPrice) {
		messageClientError(client, `You don't have enough money to buy this vehicle (need $${vehicleData.buyPrice-getClientCurrentSubAccount(client).cash} more!)`);
		return false;
	}
	
	
	getClientCurrentSubAccount(client).cash -= vehicleData.buyPrice;
	setVehicleOwner(AG_VEHOWNER_PLAYER, getClientCurrentSubAccount(client).databaseId);
	
	meActionToNearbyPlayers(client, `buys the ${getVehicleName(vehicleData.model)} and receives a set of vehicle keys!`);
}

// ---------------------------------------------------------------------------

function rentVehicleCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);	

	vehicleData.rentedBy = client;
	getClientCurrentSubAccount(client).rentingVehicle = vehicleData;
	vehicleData.rentStart = new Date().getTime();
	
	meActionToNearbyPlayers(client, `rents the ${getVehicleName(vehicleData.model)} and receives a set of vehicle keys!`);
	messageClientAlert(client, `You will be charged ${vehicleData.rentPrice} per minute to use this vehicle. To stop renting this vehicle, use /vehrent again.`);
}

// ---------------------------------------------------------------------------

function stopRentingVehicleCommand(command, params, client) {
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

	//getClientCurrentSubAccount(client).cash -= getVehicleData(vehicle).rentPrice;
	let vehicleData = getClientCurrentSubAccount(client).rentingVehicle;
	stopRentingVehicle(client);
	
	messageClientAlert(client, `You are no longer renting the ${getVehicleName(vehicleData.model)}`);
}

// ---------------------------------------------------------------------------

function doesClientHaveVehicleKeys(client, vehicleData) {
	if(doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
		return true;
	}

	if(vehicleData.ownerType == AG_VEHOWNER_PUBLIC) {
		return true;
	}	

	if(vehicleData.ownerType == AG_VEHOWNER_PLAYER) {
		if(vehicleData.ownerId == getClientData(client).accountData.databaseId) {
			return true;
		}
	}

	if(vehicleData.ownerType == AG_VEHOWNER_CLAN) {
		if(vehicleData.ownerId == getClientCurrentSubAccount(client).clan) {
			if(vehicleData.clanRank <= getClientCurrentSubAccount(client).clanRank) {
				return true;
			}
		}
	}

	if(vehicleData.ownerType == AG_VEHOWNER_FACTION) {
		if(vehicleData.ownerId == getClientCurrentSubAccount(client).faction) {
			if(vehicleData.factionRank <= getClientCurrentSubAccount(client).factionRank) {
				return true;
			}
		}
	}

	if(vehicleData.ownerType == AG_VEHOWNER_JOB) {
		if(getJobType(vehicleData.ownerId) == getJobType(getClientCurrentSubAccount(client).job)) {
			return true;
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function doesClientOwnVehicle(client, vehicleData) {
	if(doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
		return true;
	}

	if(vehicleData.ownerType == AG_VEHOWNER_PLAYER) {
		if(vehicleData.ownerId == getClientData(client).accountData.databaseId) {
			return true;
		}
	}

	if(vehicleData.ownerType == AG_VEHOWNER_CLAN) {
		if(vehicleData.ownerId == getClientCurrentSubAccount(client).clan) {
			if(doesClientHaveClanPermission(client, "manageVehicles") || doesClientHaveClanPermission(client, "owner")) {
				return true;
			}
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function getVehicleName(modelId) {
	return getVehicleNameFromModelId(modelId) || "Unknown";
}

// ---------------------------------------------------------------------------

function setVehicleJobCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);	

	let closestJobLocation = getClosestJobLocation(getVehiclePosition(vehicleData));
	let jobId = closestJobLocation.job;

	if(!areParamsEmpty(params)) {
		jobId = getJobIdFromParams(params);
	}

	//if(!jobId) {
	//	messageClientError(client, "That job is invalid!");
	//	messageClientInfo(client, "Please specify a job ID or leave it out to get the closest job.");
	//	return false;
	//}

	vehicleData.ownerType = AG_VEHOWNER_JOB;
	vehicleData.ownerId = jobId;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicleData.model)}'s owner to the ${getJobData(jobId).name} job! (ID ${jobId})`);
}

// ---------------------------------------------------------------------------

function setVehicleClanCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);
	let clan = getClanFromParams(params);

	if(!clan) {
		messageClientError(client, "That clan is invalid or doesn't exist!");
		return false;
	}

	vehicleData.ownerType = AG_VEHOWNER_CLAN;
	vehicleData.ownerId = clan.databaseId;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicleData.model)}'s owner to the ${clan.name} clan!`);
}

// ---------------------------------------------------------------------------

function setVehicleOwnerCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);
	let targetClient = getClientFromParams(params);

	if(!targetClient) {
		messageClientError(client, "That player is invalid or isn't connected!");
		return false;
	}

	vehicleData.ownerType = AG_VEHOWNER_PLAYER;
	vehicleData.ownerId = getClientCurrentSubAccount(client).databaseId;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicleData.model)}'s owner to ${getClientSubAccountName(client)}!`);
}

// ---------------------------------------------------------------------------

function setVehicleRentPriceCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);

	if(!doesClientOwnVehicle(client, vehicleData)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You can't set the rent price for this vehicle!");
		}
	}

	let amount = toInteger(params) || 0;

	vehicleData.rentPrice = amount;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicleData.model)}'s rent price to $${amount}!`);
}

// ---------------------------------------------------------------------------

function setVehicleBuyPriceCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);

	if(!doesClientOwnVehicle(client, vehicleData)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You can't set the buy price for this vehicle!");
		}
	}

	let amount = toInteger(params) || 0;

	vehicleData.buyPrice = amount;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicleData.model)}'s buy price to $${amount}!`);
}

// ---------------------------------------------------------------------------

function removeVehicleOwnerCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);
	let targetClient = getClientFromParams(params);

	if(!targetClient) {
		messageClientError(client, "That player is invalid or isn't connected!");
		return false;
	}

	vehicleData.ownerType = AG_VEHOWNER_NONE;
	vehicleData.ownerId = 0;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicleData.model)}'s owner to nobody!`);
	messageClientInfo(client, `Nobody will be able to use this vehicle until it receives a new owner (either bought or set by admin).`);
}

// ---------------------------------------------------------------------------

function getVehicleInfoCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);

	let ownerName = "Nobody";
	let ownerType = "None";
	switch(vehicleData.ownerType) {
		case AG_VEHOWNER_CLAN:
			ownerName = getClanData(vehicleData.ownerId).name;
			ownerType = "clan";
			break;

		case AG_VEHOWNER_JOB:
			ownerName = getJobData(vehicleData.ownerId).name;
			ownerType = "job";
			break;

		case AG_VEHOWNER_PLAYER:
			let accountData = loadAccountFromId(vehicleData.ownerId);
			ownerName = `${accountData.name} [${accountData.databaseId}]`;
			ownerType = "player";
			break;
			
		default:
			break;
	}

	messageClientInfo(client, `[#0099FF][Vehicle Info] [#FFFFFF]ID: [#CCCCCC]${vehicle.id}, [#FFFFFF]DatabaseID: [#CCCCCC]${vehicleData.databaseId}, [#FFFFFF]Owner: [#CCCCCC]${ownerName}[ID ${vehicleData.ownerId}] (${ownerType}), [#FFFFFF]Type: [#CCCCCC]${getVehicleName(vehicle)}[${vehicle.modelIndex}], [#FFFFFF]BuyPrice: [#CCCCCC]${vehicleData.buyPrice}, [#FFFFFF]RentPrice: [#CCCCCC]${vehicleData.rentPrice}`);
}

// ---------------------------------------------------------------------------

function parkVehicleCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);
	
	getVehicleData(vehicle).spawnPosition = getVehiclePosition(vehicleData);
	getVehicleData(vehicle).spawnRotation = getVehicleHeading(vehicleData);

	messageClientInfo(client, `This vehicle will now spawn here.`);
}

// ---------------------------------------------------------------------------

function toggleVehicleSpawnLockCommand(command, params, client) {
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

	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicleData = getPlayerVehicle(client);

	let spawnLocked = vehicleData.spawnLocked;
	vehicleData.spawnLocked = !spawnLocked;
	if(spawnLocked) {
		vehicleData.spawnPosition = getVehiclePosition(vehicleData);
		vehicleData.spawnRotation = getVehicleHeading(vehicleData);
	}	

	messageClientInfo(client, `This vehicle will now spawn ${(spawnLocked) ? "here" : "wherever a player leaves it."}`);
}

// ---------------------------------------------------------------------------

function reloadAllVehiclesCommand(command, params, client) {
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

	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i].vehicle) {
			destroyElement(getServerData().vehicles[i].vehicle);
		}
	}

	getServerData().vehicles = null;
	getServerData().vehicles = loadVehiclesFromDatabase();
	spawnAllVehicles();

	messageAdminAction(`All server vehicles have been reloaded by an admin!`);
}

// ---------------------------------------------------------------------------

function respawnAllVehiclesCommand(command, params, client) {
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

	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i].vehicle) {
			destroyElement(getServerData().vehicles[i].vehicle);
			getServerData().vehicles[i].vehicle = null;
		}
	}

	spawnAllVehicles();

	messageAdminAction(`All server vehicles have been respawned by an admin!`);
}

// ---------------------------------------------------------------------------

function sendAllVehiclesToClient(client) {
	/*
	let tempVehicles = [];
	for(let i in getServerData().vehicles) {
		let thisVehicle = getServerData().vehicles[i];

		tempVehicles.push({
			model: thisVehicle.model,
			spawnPosition: thisVehicle.spawnPosition,
			spawnHeading: thisVehicle.spawnHeading,
			colours: [thisVehicle.colour1, thisVehicle.colour2, thisVehicle.colour3, thisVehicle.colour4],
			locked: thisVehicle.locked,
		});
	}
	*/
}

// ---------------------------------------------------------------------------

function getVehicleDataFromIVSyncId(syncId) {
	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i].ivSyncId != -1) {
			if(getServerData().vehicles[i].ivSyncId == syncId) {
				return getServerData().vehicles[i];
			}
		}
	}
}

// ---------------------------------------------------------------------------

function stopRentingVehicle(client) {
	let vehicleData = getClientData(client).rentingVehicle;
	getClientData(client).rentingVehicle = false;
	vehicleData.rentedBy = false;	
	respawnVehicle(vehicleData);
}

// ---------------------------------------------------------------------------

function respawnVehicle(vehicleData) {
	let vehicles = getServerData().vehicles;
	for(let i in vehicles) {
		if(vehicleData == vehicles[i]) {
			if(!isGTAIV()) {
				destroyElement(vehicle);
				let vehicle = spawnVehicle(vehicles[i]);
				vehicles[i].vehicle = vehicle;
				setEntityData(vehicle, "ag.dataSlot", i, false);			
			} else {
				triggerNetworkEvent("ag.vehicle", getClosestPlayer(vehicleData.spawnPosition), i, vehicleData.model, vehicleData.spawnPosition, vehicleData.spawnRotation, vehicleData.colour1, vehicleData.colour2, vehicleData.locked, vehicleData.lights);
			}
		}
	}
}

// ---------------------------------------------------------------------------

function spawnVehicle(vehicleData) {
	if(isGTAIV()) {
		return false;
	}

	let vehicle = gta.createVehicle(vehicleData.model, vehicleData.spawnPosition, vehicleData.spawnRotation);
	addToWorld(vehicle);

	if(vehicleData.colour1IsRGBA && vehicleData.colour2IsRGBA) {
		vehicle.setRGBColours(vehicleData.colour1RGBA, vehicleData.colour2RGBA);
	} else {
		vehicle.colour1 = vehicleData.colour1;
		vehicle.colour2 = vehicleData.colour2;
		vehicle.colour3 = vehicleData.colour3;
		vehicle.colour4 = vehicleData.colour4;
	}

	vehicle.engine = intToBool(vehicleData.engine);
	//vehicle.lights = intToBool(vehicleData.lights);
	//vehicle.health = vehicleData.health;
	
	//vehicle.position = vehicleData.spawnPosition;
	vehicle.heading = vehicleData.spawnRotation;

	vehicle.locked = intToBool(vehicleData.locked);	
	setEntityData(vehicle, "ag.siren", intToBool(vehicleData.siren), true);
	setEntityData(vehicle, "ag.engine", intToBool(vehicleData.engine), true);
	setEntityData(vehicle, "ag.lights", intToBool(vehicleData.lights), true);

	return vehicle;
}

// ---------------------------------------------------------------------------

function isVehicleAtPayAndSpray(vehicle) {
	for(let i in getServerData().payAndSprays[server.game]) {
		if(vehicle.position.distance(getServerData().payAndSprays[server.game][i].position) <= getServerConfig().payAndSprayDistance) {
			return true;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function repairVehicle(vehicleData) {
	if(isGTAIV()) {
		triggerNetworkEvent("ag.veh.fix", vehicleData.syncedBy, vehicleData.syncId);
	} else {
		vehicleData.vehicle.fix();
	}
}

// ---------------------------------------------------------------------------

function setVehicleColours(vehicleData, colour1, colour2) {
	if(isGTAIV()) {
		triggerNetworkEvent("ag.veh.colour", vehicleData.syncedBy, vehicleData.syncId, colour1, colour2);
	} else {
		vehicleData.vehicle.colour1 = colour1;
		vehicleData.vehicle.colour2 = colour2;
	}
}

// ---------------------------------------------------------------------------

function setVehicleLights(vehicleData, lights) {
	if(isGTAIV()) {
		triggerNetworkEvent("ag.veh.lights", vehicleData.syncedBy, vehicleData.syncId, lights);
	} else {
		triggerNetworkEvent("ag.veh.lights", null, vehicleData.vehicle, lights);
	}
}

// ---------------------------------------------------------------------------

function setVehicleEngine(vehicleData, engine) {
	if(isGTAIV()) {
		triggerNetworkEvent("ag.veh.engine", vehicleData.syncedBy, vehicleData.syncId, engine);
	} else {
		triggerNetworkEvent("ag.veh.engine", null, vehicleData.vehicle, engine);
	}
}

// ---------------------------------------------------------------------------

function setVehicleLocked(vehicleData, locked) {
	if(isGTAIV()) {
		triggerNetworkEvent("ag.veh.locked", vehicleData.syncedBy, vehicleData.syncId, locked);
	} else {
		triggerNetworkEvent("ag.veh.locked", null, vehicleData.vehicle, locked);
	}
}

// ----------------------------------------------------------------------------

function getVehicleDataFromSyncId(syncId) {
	let vehicles = getServerData().vehicles;
	for(let i in vehicles) {
		if(vehicles[i].syncId == syncId) {
			return vehicles[i];
		}
	} 

	return false;
}

// ----------------------------------------------------------------------------

function transferVehicleSyncToAnotherClient(vehicleData) {
	let closestClient = getClosestPlayer(vehicleData.syncPosition);
}