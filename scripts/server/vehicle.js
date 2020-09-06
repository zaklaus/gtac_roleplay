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
		let dbQuery = dbConnection.query(dbQueryString);
		if(dbQuery) {
			while(dbAssoc = dbQuery.fetchAssoc()) {
				let tempVehicleData = new serverClasses.vehicleData(dbAssoc);
				tempVehicles.push(tempVehicleData);
			}
			dbQuery.free();
		}
		disconnectFromDatabase(dbConnection);
	}
	
	console.log("[Asshat.Vehicle]: " + tempVehicles.length + " vehicles loaded from database successfully!");
	return tempVehicles;
}

// ---------------------------------------------------------------------------

function saveAllVehiclesToDatabase() {
	let vehicles = serverData.vehicles;
	for(let i in vehicles) {
		saveVehicleToDatabase(vehicles[i]);
	}

	return true;
}

// ---------------------------------------------------------------------------

function saveVehicleToDatabase(vehicleData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		// If vehicle hasn't been added to database, ID will be 0
		if(vehicleData.databaseId == 0) {
			//let dbQueryColourFields = "`veh_col1_id`, `veh_col2_id`, `veh_col3_id1, `veh_col4_id`";
			//if(vehicleData.colourType == AH_VEH_COLOURTYPE_RGBA) {
			//	dbQueryColourFields = "`veh_col1_rgba`, `veh_col2_rgba`, `veh_col3_rgba`, `veh_col4_rgba`";
			//	dbQueryColourValues = vehicleData.colour1Red, `veh_col1_g`, `veh_col1_b`, `veh_col1_a`, `veh_col2_r`, `veh_col2_g`, `veh_col2_b`, `veh_col2_a`, `veh_col3_r`, `veh_col3_g`, `veh_col3_b`, `veh_col3_a`, `veh_col4_r`, `veh_col4_g`, `veh_col4_b`, `veh_col4_a`,";
			//}
			let dbQueryString = `INSERT INTO veh_main (veh_model, veh_pos_x, veh_pos_y, veh_pos_z, veh_owner_type, veh_owner_id) VALUES (${vehicleData.model}, ${vehicleData.spawnPosition.x}, ${vehicleData.spawnPosition.y}, ${vehicleData.spawnPosition.z}, ${vehicleData.spawnRotation.z}, ${vehicleData.ownerType}, ${vehicleData.ownerId})`;
			let dbQuery = dbConnection.query(dbQueryString);
			getVehicleData(vehicleData.vehicle).databaseId = dbConnection.insertId;
		} else {
			let dbQueryString = `UPDATE veh_main SET veh_model=${vehicleData.model}, veh_pos_x=${vehicleData.spawnPosition.x}, veh_pos_y=${vehicleData.spawnPosition.y}, veh_pos_z=${vehicleData.spawnPosition.z}, veh_rot_z=${vehicleData.spawnRotation}, veh_owner_type=${vehicleData.ownerType}, veh_owner_id=${vehicleData.ownerId} WHERE veh_id=${vehicleData.databaseId}`;
			let dbQuery = dbConnection.query(dbQueryString);		
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}

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

	meActionToNearbyPlayers(client, "turned the " + String(getVehicleName(vehicle)) + "'s engine " + engineText);
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

	meActionToNearbyPlayers(client, "turns the " + String(getVehicleName(vehicle)) + "'s siren " + sirenText);
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
	return getVehicleNameFromModelID(vehicle.modelIndex, server.game);
}

// ---------------------------------------------------------------------------