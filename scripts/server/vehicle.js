// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: vehicle.js
// DESC: Provides vehicle functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================


function initVehicleScript() {
	console.log("[Asshat.Vehicle]: Initializing vehicle script ...");
	serverData.vehicles = loadVehiclesFromDatabase();
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
		let dbQueryString = `SELECT * FROM veh_main WHERE veh_server = ${serverId}`;
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
	let vehicles = serverData.vehicles;
	for(let i in vehicles) {
		saveVehicleToDatabase(vehicles[i]);
	}
	console.log("[Asshat.Vehicle]: Saved all vehicles to database!");

	return true;
}

// ---------------------------------------------------------------------------

function saveVehicleToDatabase(vehicleData) {
	console.log(`[Asshat.Vehicle]: Saving vehicles ${vehicleData.vehicle.id} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		// If vehicle hasn't been added to database, ID will be 0
		if(vehicleData.databaseId == 0) {
			//let dbQueryColourFields = "`veh_col1_id`, `veh_col2_id`, `veh_col3_id1, `veh_col4_id`";
			//if(vehicleData.colourType == AH_VEH_COLOURTYPE_RGBA) {
			//	dbQueryColourFields = "`veh_col1_rgba`, `veh_col2_rgba`, `veh_col3_rgba`, `veh_col4_rgba`";
			//	dbQueryColourValues = vehicleData.colour1Red, `veh_col1_g`, `veh_col1_b`, `veh_col1_a`, `veh_col2_r`, `veh_col2_g`, `veh_col2_b`, `veh_col2_a`, `veh_col3_r`, `veh_col3_g`, `veh_col3_b`, `veh_col3_a`, `veh_col4_r`, `veh_col4_g`, `veh_col4_b`, `veh_col4_a`,";
			//}
			let dbQueryString = `INSERT INTO veh_main (veh_model, veh_pos_x, veh_pos_y, veh_pos_z, veh_rot_z, veh_owner_type, veh_owner_id) VALUES (${vehicleData.model}, ${vehicleData.spawnPosition.x}, ${vehicleData.spawnPosition.y}, ${vehicleData.spawnPosition.z}, ${vehicleData.spawnRotation}, ${vehicleData.ownerType}, ${vehicleData.ownerId})`;
			queryDatabase(dbConnection, dbQueryString);
			//if(getDatabaseError(dbConnection)) {
			//	console.warn(`[Asshat.Vehicle]: There was a problem saving vehicle ${vehicleData.vehicle.id} to the database (INSERT). Error: ${getDatabaseError(dbConnection)}`);
			//	return false;
			//}
			getVehicleData(vehicleData.vehicle).databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE veh_main SET veh_model=${vehicleData.model}, veh_pos_x=${vehicleData.spawnPosition.x}, veh_pos_y=${vehicleData.spawnPosition.y}, veh_pos_z=${vehicleData.spawnPosition.z}, veh_rot_z=${vehicleData.spawnRotation}, veh_owner_type=${vehicleData.ownerType}, veh_owner_id=${vehicleData.ownerId} WHERE veh_id=${vehicleData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
			//if(getDatabaseError(dbConnection)) {
			//	console.warn(`[Asshat.Vehicle]: There was a problem saving vehicle ${vehicleData.vehicle.id} to the database (UPDATE). Error: ${getDatabaseError(dbConnection)}`);
			//	return false;
			//}
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Vehicle]: Saved vehicle ${vehicleData.vehicle.id} to database!`);

	return false;
}

// ---------------------------------------------------------------------------

function spawnAllVehicles() {
	for(let i in serverData.vehicles) {
		let vehicle = gta.createVehicle(serverData.vehicles[i].model, serverData.vehicles[i].spawnPosition, serverData.vehicles[i].spawnRotation);
		addToWorld(vehicle);

		if(serverData.vehicles[i].colour1IsRGBA && serverData.vehicles[i].colour2IsRGBA) {
			vehicle.setRGBColours(serverData.vehicles[i].colour1RGBA, serverData.vehicles[i].colour2RGBA);
		} else {
			vehicle.colour1 = serverData.vehicles[i].colour1;
			vehicle.colour2 = serverData.vehicles[i].colour2;
			vehicle.colour3 = serverData.vehicles[i].colour3;
			vehicle.colour4 = serverData.vehicles[i].colour4;
		}

		vehicle.engine = intToBool(serverData.vehicles[i].engine);
		//vehicle.lights = intToBool(serverData.vehicles[i].lights);
		//vehicle.health = serverData.vehicles[i].health;
		
		//vehicle.position = serverData.vehicles[i].spawnPosition;
		vehicle.heading = serverData.vehicles[i].spawnRotation;

		vehicle.locked = intToBool(serverData.vehicles[i].locked);	
		vehicle.setData("ag.siren", intToBool(serverData.vehicles[i].siren), true);
		vehicle.setData("ag.engine", intToBool(serverData.vehicles[i].engine), true);
		vehicle.setData("ag.lights", intToBool(serverData.vehicles[i].lights), true);

		serverData.vehicles[i].vehicle = vehicle;
		vehicle.setData("ag.dataSlot", i, false);
	}
}

// ---------------------------------------------------------------------------

function getVehicleData(vehicle) {
	let dataIndex = vehicle.getData("ag.dataSlot");
	return serverData.vehicles[dataIndex];
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

	let frontPos = getPosInFrontOfPos(client.player.position, client.player.heading, serverConfig.spawnCarDistance);

	let vehicle = createVehicle(modelId, frontPos, client.player.heading);
	vehicle.heading = client.player.heading;

	let tempVehicleData = new serverClasses.vehicleData(false, vehicle);
	let vehiclesLength = serverData.vehicles.push(tempVehicleData);
	vehicle.setData("ag.dataSlot", vehiclesLength-1, false);

	messageClientSuccess(client, `You created a ${getVehicleName(vehicle)}!`);
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

	let vehicle = getClosestVehicle(client.player.position);
	if(!client.player.vehicle && vehicle.position.distance(client.player.position) > serverConfig.vehicleLockDistance) {
		messageClientError(client, "You need to be in or near a vehicle!");
		return false;
	}

	if(client.player.vehicle) {
		vehicle = client.player.vehicle;
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

	let lockText = (vehicle.locked) ? "locked" : "unlocked";

	meActionToNearbyPlayers(client, lockText + " the " + getVehicleName(vehicle));
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(client.player.getData("ag.vehSeat") > 1) {
		messageClientError(client, "You need to be in the front seat!");
		return false;		
	}	

	let vehicle = client.player.vehicle;

	if(getVehicleData(vehicle).lights) {
		vehicle.setData("ag.lights", false, true);
		triggerNetworkEvent("ag.veh.sync", null, vehicle);
		getVehicleData(vehicle).lights = false;
	} else {
		vehicle.setData("ag.lights", true, true);
		triggerNetworkEvent("ag.veh.sync", null, vehicle);
		getVehicleData(vehicle).lights = true;
	}

	let lightsText = (getVehicleData(vehicle).lights) ? "on" : "off";
	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicle)}'s lights ${lightsText}`);
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(client.player.getData("ag.vehSeat") > 0) {
		messageClientError(client, "You need to be the driver!");
		return false;		
	}

	let vehicle = client.player.vehicle;

	if(!doesClientHaveVehicleKeys(client, vehicle)) {
		messageClientError(client, "You don't have keys to this vehicle!");
		return false;
	}

	if(getVehicleData(vehicle).engine) {
		vehicle.setData("ag.engine", false, true);
		triggerNetworkEvent("ag.veh.sync", null, vehicle);
		getVehicleData(vehicle).engine = false;
	} else {
		vehicle.setData("ag.engine", true, true);
		triggerNetworkEvent("ag.veh.sync", null, vehicle);
		getVehicleData(vehicle).engine = true;
	}
	let engineText = (getVehicleData(vehicle).engine) ? "on" : "off";

	meActionToNearbyPlayers(client, `turned the ${getVehicleName(vehicle)}'s engine ${engineText}`);
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	if(client.player.getData("ag.vehSeat") > 1) {
		messageClientError(client, "You need to be in the front seat!");
		return false;		
	}

	let vehicle = client.player.vehicle;

	if(getVehicleData(vehicle).siren) {
		vehicle.setData("ag.siren", false, true);
		triggerNetworkEvent("ag.veh.sync", null, vehicle);
		getVehicleData(vehicle).siren = false;
	} else {
		vehicle.setData("ag.siren", true, true);
		triggerNetworkEvent("ag.veh.sync", null, vehicle);
		getVehicleData(vehicle).siren = true;
	}
	let sirenText = (getVehicleData(vehicle).siren) ? "on" : "off";

	meActionToNearbyPlayers(client, `turns the ${getVehicleName(vehicle)}'s siren ${sirenText}`);
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

function getVehicleName(vehicle) {
	let vehicleName = getVehicleNameFromModelId(vehicle.modelIndex);
	return vehicleName;
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;
	let jobId = getClosestJobPointId(vehicle.position);
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;
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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;
	let vehicleData = getVehicleData(vehicle);

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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;
	getVehicleData(vehicle).spawnPosition = vehicle.position;
	getVehicleData(vehicle).spawnRotation = vehicle.heading;	

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

	if(!client.player.vehicle) {
		messageClientError(client, "You need to be in a vehicle!");
		return false;		
	}

	let vehicle = client.player.vehicle;

	if(!getVehicleData(vehicle).spawnLocked) {
		getVehicleData(vehicle).spawnPosition = vehicle.position;
		getVehicleData(vehicle).spawnRotation = vehicle.heading;
	}

	getVehicleData(vehicle).spawnLocked = !getVehicleData(vehicle).spawnLocked

	messageClientInfo(client, `This vehicle will now spawn ${(getVehicleData(vehicle).spawnLocked) ? "here" : "wherever a player leaves it."}`);
}

// ---------------------------------------------------------------------------