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
dd	console.log("[Asshat.Vehicle]: Initializing vehicle script ...");
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
			let dbQueryString = "INSERT INTO `veh_main` (`veh_model`, `veh_pos_x`, `veh_pos_y`, `veh_pos_z`, veh_owner_type`, `veh_owner_id`) VALUES (" + vehicleData.model + ", " + vehicleData.spawnPosition.x + ", " + vehicleData.spawnPosition.y + ", " + vehicleData.spawnPosition.z + ", " + vehicleData.spawnRotation.z + ", " + vehicleData.ownerType + ", " + vehicleData.ownerId + ");";
			let dbQuery = dbConnection.query(dbQueryString);
			getVehicleData(vehicleData.vehicle).databaseId = dbConnection.insertId;
		} else {
			let dbQueryString = "UPDATE `veh_main` SET `veh_model` = " + vehicleData.modelId + ", `veh_pos_x` = " + vehicleData.spawnPosition.x + ", `veh_pos_y` = " + vehicleData.spawnPosition.y + ", " + vehicleData.spawnPosition.z + ", `veh_pos_z` = " + vehicleData.spawnRotation.z + ", `veh_owner_type`" + vehicleData.ownerType + ", `veh_owner_id` = " + vehicleData.ownerId;
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
		console.log(serverData.vehicles[i].spawnRotation);
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

	let closestVehicle = getClosestVehicle();
	if((!client.player.vehicle && doesClientHaveVehicleKeys(client, closestVehicle) && closestVehicle.position.distance(client.player.position) <= 5) || client.player.vehicle) {
		if(getVehicleData(closestVehicle).locked) {
			closestVehicle.locked = false;
			getVehicleData(closestVehicles).locked = false;
		} else {
			closestVehicle.locked = true;
			getVehicleData(closestVehicles).locked = true;
		}
	}

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}
}

// ---------------------------------------------------------------------------