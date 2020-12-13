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
	console.log("[Asshat.Vehicle]: Vehicle script initialized successfully!");
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
	let modelId = getVehicleModelIdFromParams(params);

	if(!modelId) {
		messageClientError(client, "That vehicle type is invalid!");
		return false;
	}

	let frontPos = getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), getServerConfig().spawnCarDistance);
	let vehicleDataSlot = getServerData().vehicles.length;

	let vehicle = gta.createVehicle(modelId, frontPos, getPlayerHeading(client));
	addToWorld(vehicle);
	tempVehicleData = new serverClasses.vehicleData(false, vehicle);

	tempVehicleData.databaseId = -1;

	getServerData().vehicles.push(tempVehicleData);
	getServerData().vehicles[vehicleDataSlot].syncId = vehicleDataSlot;

	messageClientSuccess(client, `You created a temporary ${getVehicleName(tempVehicleData.model)}!`);
}

// ---------------------------------------------------------------------------

function vehicleLockCommand(command, params, client) {
	let vehicleData = getClosestVehicle(getPlayerPosition(client));
	if(!getPlayerVehicle(client) && getVehiclePosition(vehicleData).distance(getPlayerPosition(client)) > getServerConfig().vehicleLockDistance) {
		messageClientError(client, "You need to be in or near a vehicle!");
		return false;
	}

	if(isPlayerInAnyVehicle(client)) {
		vehicle = getPlayerVehicle(client);
		if(!isPlayerInFrontVehicleSeat(client)) {
			messageClientError(client, "You need to be in the front seat!");
			return false;
		}
	} else {
		if(!doesClientHaveVehicleKeys(client, vehicle)) {
			messageClientError(client, "You don't have keys to this vehicle!");
			return false;
		}
	}

	if(getVehicleData(vehicle).locked) {
		vehicle.locked = false;
		getVehicleData(vehicle).locked = false;
	} else {
		vehicle.locked = true;
		getVehicleData(vehicle).locked = true;
	}

	let lockText = (getVehicleData(vehicle).locked) ? "locked" : "unlocked";

	meActionToNearbyPlayers(client, `${lockText} the ${getVehicleName(vehicle)}`);
}

// ---------------------------------------------------------------------------

function vehicleLightsCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = getPlayerVehicle(client);

	if(getPlayerVehicleSeat(client) > 1) {
		messageClientError(client, "You need to be in the front seat!");
		return false;		
	}	

	triggerNetworkEvent("ag.veh.lights", getVehicleSyncer(vehicle), getVehicleForNetworkEvent(vehicle), getVehicleData(vehicle).lights);
	
	getVehicleData(vehicle).lights = !getVehicleData(vehicle).lights;

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicle)}'s lights ${getOnOffFromBool(vehicle)}`);
}

// ---------------------------------------------------------------------------

function vehicleEngineCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(getPlayerVehicleSeat(client) > 0) {
		messageClientError(client, "You need to be the driver!");
		return false;		
	}

	let vehicle = getPlayerVehicle(client);

	if(!doesClientHaveVehicleKeys(client, vehicle)) {
		messageClientError(client, "You don't have keys to this vehicle!");
		return false;
	}

	getVehicleData(vehicle).engine = !getVehicleData(vehicle).engine;

	triggerNetworkEvent("ag.veh.engine", getVehicleSyncer(vehicle), getVehicleForNetworkEvent(vehicle), getVehicleData(vehicle).engine);

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicle)}'s engine ${getOnOffFromBool(getVehicleData(vehicle).engine)}`);
}

// ---------------------------------------------------------------------------

function vehicleSirenCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(getPlayerVehicleSeat(client) > 1) {
		messageClientError(client, "You need to be in the front seat!");
		return false;		
	}

	let vehicle = getPlayerVehicle(client);

	if(!doesClientHaveVehicleKeys(client, vehicle)) {
		messageClientError(client, "You don't have keys to this vehicle!");
		return false;
	}

	getVehicleData(vehicle).siren = !getVehicleData(vehicle).siren;
	vehicle.siren = getVehicleData(vehicle).siren;

	meActionToNearbyPlayers(client, `turns the ${getVehicleName(vehicle)}'s siren ${getOnOffFromBool(getVehicleData(vehicle).siren)}`);
}

// ---------------------------------------------------------------------------

function setVehicleColourCommand(command, params, client) {
	if(!getPlayerVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}	

	let vehicle = getPlayerVehicle(client);

	if(!isAtPayAndSpray(getVehiclePosition(vehicle))) {
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
	vehicle.colour1 = colour1;
	vehicle.colour2 = colour2;
	getVehicleData(vehicle).colour1 = colour1;
	getVehicleData(vehicle).colour2 = colour1;
	
	meActionToNearbyPlayers(client, `resprays the ${getVehicleName(vehicle)}'s colours`);
}

// ---------------------------------------------------------------------------

function vehicleRepairCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);	

	if(!isAtPayAndSpray(getVehiclePosition(vehicle))) {
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
	repairVehicle(vehicle);
	
	meActionToNearbyPlayers(client, `repairs the ${getVehicleName(vehicle)}!`);
}

// ---------------------------------------------------------------------------

function buyVehicleCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);	

	if(getVehicleData(vehicle).buyPrice <= 0) {
		messageClientError(client, `This ${getVehicleName(vehicle)} is not for sale!`);
		return false;		
	}

	if(getClientCurrentSubAccount(client).cash < vehicleData.buyPrice) {
		messageClientError(client, `You don't have enough money to buy this vehicle (need $${getVehicleData(vehicle).buyPrice-getClientCurrentSubAccount(client).cash} more!)`);
		return false;
	}
	
	getClientCurrentSubAccount(client).cash -= getVehicleData(vehicle).buyPrice;
	setVehicleOwner(AG_VEHOWNER_PLAYER, getClientCurrentSubAccount(client).databaseId);
	
	meActionToNearbyPlayers(client, `buys the ${getVehicleName(vehicle)} and receives a set of vehicle keys!`);
}

// ---------------------------------------------------------------------------

function rentVehicleCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);	

	if(getVehicleData(vehicle).rentPrice <= 0) {
		messageClientError(client, `This ${getVehicleName(vehicle)} is not for rent!`);
		return false;		
	}	

	getVehicleData(vehicle).rentedBy = client;
	getClientCurrentSubAccount(client).rentingVehicle = vehicle;
	getVehicleData(vehicle).rentStart = new Date().getTime();
	
	meActionToNearbyPlayers(client, `rents the ${getVehicleName(vehicle)} and receives a set of vehicle keys!`);
	messageClientAlert(client, `You will be charged ${getVehicleData(vehicle).rentPrice} per minute to use this vehicle. To stop renting this vehicle, use /vehrent again.`);
}

// ---------------------------------------------------------------------------

function stopRentingVehicleCommand(command, params, client) {
	//getClientCurrentSubAccount(client).cash -= getVehicleData(vehicle).rentPrice;
	let vehicle = getClientCurrentSubAccount(client).rentingVehicle;
	stopRentingVehicle(client);
	
	messageClientAlert(client, `You are no longer renting the ${getVehicleName(vehicle)}`);
}

// ---------------------------------------------------------------------------

function doesClientHaveVehicleKeys(client, vehicle) {
	let vehicleData = getVehicleData(vehicle);

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

function doesClientOwnVehicle(client, vehicle) {
	let vehicleData = getVehicleData(vehicle);

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
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);	

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

	getVehicleData(vehicle).ownerType = AG_VEHOWNER_JOB;
	getVehicleData(vehicle).ownerId = jobId;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicle)}'s owner to the ${getJobData(jobId).name} job! (ID ${jobId})`);
}

// ---------------------------------------------------------------------------

function setVehicleClanCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);
	let clan = getClanFromParams(params);

	if(!clan) {
		messageClientError(client, "That clan is invalid or doesn't exist!");
		return false;
	}

	getVehicleData(vehicle).ownerType = AG_VEHOWNER_CLAN;
	getVehicleData(vehicle).ownerId = clan.databaseId;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicle)}'s owner to the ${clan.name} clan!`);
}

// ---------------------------------------------------------------------------

function setVehicleOwnerCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);
	let targetClient = getClientFromParams(params);

	if(!targetClient) {
		messageClientError(client, "That player is invalid or isn't connected!");
		return false;
	}

	getVehicleData(vehicle).ownerType = AG_VEHOWNER_PLAYER;
	getVehicleData(vehicle).ownerId = getClientCurrentSubAccount(client).databaseId;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicle)}'s owner to ${getClientSubAccountName(client)}!`);
}

// ---------------------------------------------------------------------------

function setVehicleRentPriceCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);

	if(!doesClientOwnVehicle(client, vehicle)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You can't set the rent price for this vehicle!");
		}
	}

	let amount = toInteger(params) || 0;

	getVehicleData(vehicle).rentPrice = amount;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicle)}'s rent price to $${amount}!`);
}

// ---------------------------------------------------------------------------

function setVehicleBuyPriceCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);

	if(!doesClientOwnVehicle(client, vehicle)) {
		if(!doesClientHaveStaffPermission(client, getStaffFlagValue("manageVehicles"))) {
			messageClientError(client, "You can't set the buy price for this vehicle!");
		}
	}

	let amount = toInteger(params) || 0;

	getVehicleData(vehicle).buyPrice = amount;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicle)}'s buy price to $${amount}!`);
}

// ---------------------------------------------------------------------------

function removeVehicleOwnerCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);
	let targetClient = getClientFromParams(params);

	if(!targetClient) {
		messageClientError(client, "That player is invalid or isn't connected!");
		return false;
	}

	getVehicleData(vehicle).ownerType = AG_VEHOWNER_NONE;
	getVehicleData(vehicle).ownerId = 0;

	messageClientSuccess(client, `You set the ${getVehicleName(vehicle)}'s owner to nobody!`);
	messageClientInfo(client, `Nobody will be able to use this vehicle until it receives a new owner (either bought or set by admin).`);
}

// ---------------------------------------------------------------------------

function getVehicleInfoCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);
	let vehicleData = getVehicleData(vehicle);

	let ownerName = "Nobody";
	let ownerType = "None";
	ownerType = toLowerCase(getVehicleOwnerTypeText(vehicleData.ownerType));
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

function toggleVehicleSpawnLockCommand(command, params, client) {
	if(!isPlayerInAnyVehicle(client)) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}
	
	let vehicle = getPlayerVehicle(client);

	let spawnLocked = getVehicleData(vehicle).spawnLocked;
	getVehicleData(vehicle).spawnLocked = !spawnLocked;
	if(spawnLocked) {
		getVehicleData(vehicle).spawnPosition = getVehiclePosition(vehicle);
		getVehicleData(vehicle).spawnRotation = getVehicleHeading(vehicle);
		getVehicleData(vehicle).spawnLocked = spawnLocked;
	}

	messageClientInfo(client, `This ${getVehicleName(vehicle)} will now spawn ${(spawnLocked) ? "here" : "wherever a player leaves it."}`);
}

// ---------------------------------------------------------------------------

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
}

// ---------------------------------------------------------------------------

function respawnAllVehiclesCommand(command, params, client) {
	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i].vehicle) {
			deleteGameElement(getServerData().vehicles[i].vehicle);
			getServerData().vehicles[i].vehicle = null;
		}
	}

	spawnAllVehicles();

	messageAdminAction(`All server vehicles have been respawned by an admin!`);
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
			destroyElement(vehicle);
			let vehicle = spawnVehicle(vehicles[i]);
			vehicles[i].vehicle = vehicle;
			setEntityData(vehicle, "ag.dataSlot", i, false);
		}
	}
}

// ---------------------------------------------------------------------------

function spawnVehicle(vehicleData) {
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

	vehicleData.vehicle = vehicle;

	return vehicle;
}

// ---------------------------------------------------------------------------

function isVehicleAtPayAndSpray(vehicle) {
	for(let i in getServerData().payAndSprays[getServerGame()]) {
		if(getDistance(getVehiclePosition(vehicle), getServerData().payAndSprays[getServerGame()][i].position) <= getServerConfig().payAndSprayDistance) {
			return true;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function repairVehicle(vehicleData) {
	vehicleData.vehicle.fix();
}

// ---------------------------------------------------------------------------

function setVehicleColours(vehicle, colour1, colour2) {
	vehicle.colour1 = colour1;
	vehicle.colour2 = colour2;
}

// ---------------------------------------------------------------------------

function setVehicleLights(vehicle, lights) {
	vehicle.lights = lights;
}

// ---------------------------------------------------------------------------

function setVehicleEngine(vehicle, engine) {
	vehicle.engine = engine;
}

// ---------------------------------------------------------------------------

function setVehicleLocked(vehicle, locked) {
	vehicle.locked = locked;
}

// ----------------------------------------------------------------------------

function getVehicleOwnerTypeText(ownerType) {
	switch(ownerType) {
		case AG_VEHOWNER_CLAN:
			return "clan";

		case AG_VEHOWNER_JOB:
			return "job";

		case AG_VEHOWNER_PLAYER:
			return "player";
			
		default:
			return "unknown";
	}
}

// ----------------------------------------------------------------------------