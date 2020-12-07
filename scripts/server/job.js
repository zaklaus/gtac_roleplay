// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: job.js
// DESC: Provides job functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initJobScript() {
	console.log("[Asshat.Job]: Initializing job script ...");
	loadJobsFromDatabase();
	addJobCommandHandlers();
	createAllJobPickups();
	createAllJobBlips();

	//addEvent("onJobPickupCollected", null, 2);

	console.log("[Asshat.Job]: Job script initialized successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function addJobCommandHandlers() {
	console.log("[Asshat.Job]: Adding job command handlers ...");
	let jobCommands = serverCommands.job;
	for(let i in jobCommands) {
		addCommandHandler(jobCommands[i].command, jobCommands[i].handlerFunction);
	}
	console.log("[Asshat.Job]: Job command handlers added successfully!");
	return true;
}

// ---------------------------------------------------------------------------

function loadJobsFromDatabase() {
	console.log("[Asshat.Job]: Loading jobs from database ...");

	let tempJobs = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_main` WHERE `job_enabled` = 1 AND `job_server` = " + String(serverId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobData = new serverClasses.jobData(dbAssoc);
					tempJobData.equipment = loadJobEquipmentsFromDatabase(tempJobData.databaseId);
					tempJobData.uniforms = loadJobUniformsFromDatabase(tempJobData.databaseId);
					tempJobData.locations = loadJobLocationsFromDatabase(tempJobData.databaseId);
					tempJobs.push(tempJobData);
					console.log(`[Asshat.Job]: Job '${tempJobData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Job]: ${tempJobs.length} jobs loaded from database successfully!`);
	return tempJobs;
}

// ---------------------------------------------------------------------------

function loadJobEquipmentsFromDatabase(jobDatabaseId) {
	console.log(`[Asshat.Job]: Loading job equipments for job ${jobDatabaseId} from database ...`);

	let tempJobEquipments = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_equip` WHERE `job_equip_enabled` = 1 AND `job_equip_job` = " + String(jobDatabaseId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobEquipmentData = new serverClasses.jobEquipmentData(dbAssoc);
					tempJobEquipmentData.weapons = loadJobEquipmentWeaponsFromDatabase(tempJobEquipmentData.databaseId);
					tempJobEquipments.push(tempJobEquipmentData);
					console.log(`[Asshat.Job]: Job equipment '${tempJobEquipmentData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Job]: ${tempJobEquipments.length} job equipments for job ${jobDatabaseId} loaded from database successfully!`);
	return tempJobEquipments;
}

// ---------------------------------------------------------------------------

function loadJobLocationsFromDatabase(jobDatabaseId) {
	console.log(`[Asshat.Job]: Loading job locations for job ${jobDatabaseId} from database ...`);

	let tempJobLocations = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_loc` WHERE `job_loc_enabled` = 1 AND `job_loc_job` = " + String(jobDatabaseId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobLocationData = new serverClasses.jobLocationData(dbAssoc);
					tempJobLocations.push(tempJobLocationData);
					console.log(`[Asshat.Job]: Job location '${tempJobLocationData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Job]: ${tempJobLocations.length} job locations for job ${jobDatabaseId} loaded from database successfully!`);
	return tempJobLocations;
}

// ---------------------------------------------------------------------------

function loadJobUniformsFromDatabase(jobDatabaseId) {
	console.log(`[Asshat.Job]: Loading job uniforms for job ${jobDatabaseId} from database ...`);

	let tempJobUniforms = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_uniform` WHERE `job_uniform_enabled` = 1 AND `job_uniform_job` = " + String(jobDatabaseId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobUniformData = new serverClasses.jobUniformData(dbAssoc);
					tempJobUniforms.push(tempJobUniformData);
					console.log(`[Asshat.Job]: Job uniform '${tempJobUniformData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Job]: ${tempJobUniforms.length} job uniforms for job ${jobDatabaseId} loaded from database successfully!`);
	return tempJobUniforms;
}

// ---------------------------------------------------------------------------

function loadJobEquipmentWeaponsFromDatabase(jobEquipmentDatabaseId) {
	console.log(`[Asshat.Job]: Loading job equipment weapons for job equipment ${jobEquipmentDatabaseId} from database ...`);

	let tempJobEquipmentWeapons = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;
	
	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_equip_wep` WHERE `job_equip_wep_enabled` = 1 AND `job_equip_wep_equip` = " + String(jobEquipmentDatabaseId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobEquipmentWeaponsData = new serverClasses.jobEquipmentWeaponData(dbAssoc);
					tempJobEquipmentWeapons.push(tempJobEquipmentWeaponsData);
					console.log(`[Asshat.Job]: Job equipment weapon '${tempJobEquipmentWeaponsData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	console.log(`[Asshat.Job]: ${tempJobEquipmentWeapons.length} job equipment weapons for equipment ${jobEquipmentDatabaseId} loaded from database successfully!`);
	return tempJobEquipmentWeapons;
}

// ---------------------------------------------------------------------------

function createAllJobBlips() {
	for(let i in serverData.jobs) {
		for(let j in serverData.jobs[i].locations) {
			serverData.jobs[i].locations[j].blip = createBlip(0, serverData.jobs[i].locations[j], 2, serverConfig.colour.byName.yellow);

			console.log(`[Asshat.Job] Job '${serverData.jobs[i].name}' location blip ${j} spawned!`);
		}
	}
	console.log(`[Asshat.Job] All job location blips spawned!`);
}

// ---------------------------------------------------------------------------

function createAllJobPickups() {
	for(let i in serverData.jobs) {
		if(serverData.jobs[i].pickupModel != 0) {
			for(let j in serverData.jobs[i].locations) {
				serverData.jobs[i].locations[j].pickup = createPickup(serverData.jobs[i].pickupModel, serverData.jobs[i].locations[j].position);
				serverData.jobs[i].locations[j].pickup.setData("ag.ownerType", AG_PICKUP_JOB, true);
				serverData.jobs[i].locations[j].pickup.setData("ag.ownerId", i, true);			

				console.log(`[Asshat.Job] Job '${serverData.jobs[i].name}' location pickup ${j} spawned!`);
			}
		}
	}
	console.log(`[Asshat.Job] All job location pickups spawned!`);
}

// ---------------------------------------------------------------------------

function showJobInformationToPlayer(client, jobType) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	if(jobType == getClientCurrentSubAccount(client).job) {
		messageClientInfo("Welcome back to your job. Use /startwork to begin.");
		return false;
	}

	switch(jobType) {
		case AG_JOB_POLICE:
			if(!canClientUsePoliceJob(client)) { 
				return false;
			}

			messageClientInfo(client, "== Job Help =================================");
			messageClientInfo(client, "- Police Officers are enforcers of the law."); 
			messageClientInfo(client, "- Use /startwork at a police station to work as a Police Officer.");
			messageClientInfo(client, "- Use /laws to see a list of laws.");
			messageClientInfo(client, "- Commands are: /cuff, /drag, /detain, /arrest, /search /tazer /radio");
			messageClientInfo(client, "- When finished, use /stopwork to stop working.");       
			break;

		case AG_JOB_MEDICAL:
			messageClientInfo(client, "== Job Help =================================");
			messageClientInfo(client, "- Paramedics help people by healing them.");
			messageClientInfo(client, "- Use /startwork at the hospital to work as a Paramedic.");
			messageClientInfo(client, "- People can enter your ambulance to get healed.");
			messageClientInfo(client,  "- The pay depends on the player's health before healing them.");
			messageClientInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_FIRE:
			if(!canClientUseFireJob(client)){ 
				return false;
			}            
			messageClientInfo(client, "== Job Help ================================="); 
			messageClientInfo(client, "- Firefighters put out vehicle and building fires.");
			messageClientInfo(client, "- Use /startwork at the fire station to work as a Firefighter.");
			messageClientInfo(client, "- Get in a firetruck and you will be told where to go.");
			messageClientInfo(client, "- Use the firetruck hose to put out fires");
			messageClientInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_BUS:
			messageClientInfo(client, "== Job Help =================================");
			messageClientInfo(client, "- Bus Drivers transport people around the city on a route");
			messageClientInfo(client, "- Use /startwork at the bus depot to work as a Bus Driver.");
			messageClientInfo(client, "- Passengers can get on/off at any stop on your route");
			messageClientInfo(client, "- Stay on your assigned route. You will be paid when finished.");
			messageClientInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_TAXI:
			messageClientInfo(client, "== Job Help =================================");
			messageClientInfo(client, "- Taxi Drivers transport people around the city");
			messageClientInfo(client, "- Use /startwork at the taxi depot to work as a Taxi Driver.");
			messageClientInfo(client, "- Use /fare to set a fare. Fares start when a player gets in.");
			messageClientInfo(client, "- The meter will run until the player exits the vehicle.");
			messageClientInfo(client, "- You will automatically receive the fare money");
			messageClientInfo(client, "- When finished, use /stopwork to stop working.");   
			break;

		case AG_JOB_GARBAGE:
			messageClientInfo(client, "== Job Help =================================");
			messageClientInfo(client, "- Garbage Collectors pick up the trash around the city.");
			messageClientInfo(client, "- Use /startwork at the garbage depot to work as a Garbage Collector.");
			messageClientInfo(client, "- Drive up to a garbage can or dumpster, and right click to grab a bag.");
			messageClientInfo(client, "- Walk up to the back of your truck and right click again to throw the bag in.");
			messageClientInfo(client, "- Your truck can hold 25 trashbags. Each bag is worth $25");
			messageClientInfo(client, "- Drive to the garbage depot again to deliver trash");
			messageClientInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_WEAPON:
			break;

		case AG_JOB_DRUG:
			break;

		default:
			break;
	}
}

// ---------------------------------------------------------------------------

function takeJobCommand(command, params, client) {
	if(!canClientUseJobs(client)) {
		messageClientError(client, "You are not allowed to use jobs!"); 
		return false;
	}

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	let closestJobLocation = getClosestJobLocation(client.player.position);
	let jobData = getJobData(closestJobLocation.job);

	if(closestJobLocation.position.distance(client.player.position) > serverConfig.takeJobDistance) {
		messageClientError(client, "There are no job points close enough!");
		return false;       
	}

	if(getClientCurrentSubAccount(client).job != AG_JOB_NONE) {
		messageClientError(client, "You already have a job! Use /quitjob to quit your job.");
		return false;      
	}
	
	takeJob(client, closestJobLocation.job);
	messageClientSuccess(client, "You now have the " + String(jobData.name) + " job");
	return true;
}

// ---------------------------------------------------------------------------

function startWorkingCommand(command, params, client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	let closestJobLocation = getClosestJobLocation(client.player.position);
	let jobData = getJobData(closestJobLocation.job);

	if(closestJobLocation.position.distance(client.player.position) > serverConfig.startWorkingDistance) {
		messageClientError(client, "There are no job points close enough!");
		return false;       
	}    

	if(getJobType(getClientCurrentSubAccount(client).job) == AG_JOB_NONE) {
		messageClientError(client, "You don't have a job!");
		messageClientInfo(client, "You can get a job by going the yellow points on the map.");
		return false;
	}

	if(getClientCurrentSubAccount(client).job != closestJobLocation.job) {
		messageClientError(client, "This is not your job!");
		messageClientInfo(client, `If you want this job, use /quitjob to quit your current job.`);
		return false;
	}

	
	messageClientSuccess(client, "You are now working as a " + String(jobData.name));
	startWorking(client);
	//showStartedWorkingTip(client);
	return true;
}

// ---------------------------------------------------------------------------

function stopWorkingCommand(command, params, client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	let closestJobLocation = getClosestJobLocation(client.player.position);

	if(closestJobLocation.position.distance(client.player.position) > serverConfig.stopWorkingDistance) {
		messageClientError(client, "There are no job locations close enough!");
		return false;       
	}

	//if(getClientCurrentSubAccount(client).job != closestJob.jobType) {
	//    messageClientError(client, "This is not your job!");
	//    messageClientInfo(client, "Use /quitjob if you want to quit your current job and take this one.");
	//    break;
	//}

	messageClientSuccess(client, "You have stopped working!");
	stopWorking(client);
	//showApproachCurrentJobTip(client);
	return true;
}

// ---------------------------------------------------------------------------

function startWorking(client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	getClientCurrentSubAccount(client).isWorking = true;

	let jobId = getClientCurrentSubAccount(client).job;
	switch(getJobType(jobId)) {
		case AG_JOB_POLICE:
			messageClientInfo(client, "Use /uniform and /equip to get your equipment.");
			break;

		case AG_JOB_MEDICAL:
			messageClientInfo(client, "Use /uniform and /equip to get your equipment.");
			break;

		case AG_JOB_FIRE:
			messageClientInfo(client, "Use /uniform and /equip to get your equipment.");
			break;

		case AG_JOB_BUS:
			messageClientInfo(client, "Get in a bus to get started.");
			break;

		case AG_JOB_TAXI:
			messageClientInfo(client, "Get in a taxi to get started.");
			break;

		case AG_JOB_GARBAGE:
			messageClientInfo(client, "Get in a trash truck to get started.");
			break;

		case AG_JOB_WEAPON:
			break;

		case AG_JOB_DRUG:
			break;

		default:
			break;
	}

	//showStartedWorkingTip(client);
}

// ---------------------------------------------------------------------------

function givePlayerJobEquipment(client, equipmentId) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	let jobId = getClientCurrentSubAccount(client).job;
	for(let i in serverData.jobs[jobId].equipments[equipmentId].weapons) {
		triggerNetworkEvent("ag.giveWeapon", client, serverData.jobs[jobId].equipments[equipmentId].weapons[i].weapon, serverData.jobs[jobId].equipments[equipmentId].weapons[i].ammo, false);
	}
}

// ---------------------------------------------------------------------------

function stopWorking(client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	getClientCurrentSubAccount(client).isWorking = false;

	triggerNetworkEvent("ag.skin", client, getClientCurrentSubAccount(client).skin);

	let jobVehicle = getClientCurrentSubAccount(client).lastJobVehicle;
	if(jobVehicle) {
		if(client.player.vehicle) {
			triggerNetworkEvent("ag.removeFromVehicle", client);
			//client.player.removeFromVehicle();
		}

		let vehicleData = getVehicleData(jobVehicle);
		jobVehicle.fix();
		jobVehicle.position = vehicleData.spawnPosition;
		jobVehicle.heading = vehicleData.spawnRotation;
		jobVehicle.locked = true;
		jobVehicle.setData("ag.lights", false, true);
		jobVehicle.setData("ag.engine", false, true);
		jobVehicle.setData("ag.siren", false, true);

		getClientCurrentSubAccount(client).lastJobVehicle = false;
	}
	
	triggerNetworkEvent("ag.clearWeapons", client);    

	let jobId = getClientCurrentSubAccount(client).job;
	switch(getJobType(jobId)) {
		case AG_JOB_POLICE:
			messageClientInfo(client, "Your uniform, equipment, and police car have been returned to the police station");
			break;

		case AG_JOB_MEDICAL:
			messageClientInfo(client, "Your uniform and ambulance have been returned to the hospital");
			break;

		case AG_JOB_FIRE:
			messageClientInfo(client, "Your uniform and fire truck have been returned to the fire station");
			break;

		case AG_JOB_BUS:
			messageClientInfo(client, "Your bus has been returned to the bus depot");
			break;

		case AG_JOB_TAXI:
			messageClientInfo(client, "Your taxi has been returned to the taxi depot");
			break;

		case AG_JOB_GARBAGE:
			messageClientInfo(client, "Your trash truck has been returned to the city landfill");
			break;

		case AG_JOB_WEAPON:
			break;

		case AG_JOB_DRUG:
			break;

		default:
			break;
	}
}

// ---------------------------------------------------------------------------

function jobUniformCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	let jobId = getClientCurrentSubAccount(client).job

	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		messageClientNormal(`0: No uniform (sets you back to your main skin)`);
		for(let i in serverData.jobs[jobId].uniforms) {
			messageClientNormal(`${i+1}: ${serverData.jobs[jobId].uniforms.name} (Requires rank ${serverData.jobs[jobId].uniforms.minRank})`);
		}
		return false;
	}

	if(uniformId == 0) {
		getClientCurrentSubAccount(client).jobUniform = false;
		triggerNetworkEvent("ag.skin", client, getClientCurrentSubAccount(client).skin);
		messageClientSuccess(client, "You changed your uniform to (none)");
		return;
	}

	let uniformId = Number(params) || 1;
	if(uniformId < 1 || uniformId > serverData.jobs[jobId].uniforms.length-1) {
		messageClientError(client, "That uniform ID is invalid!");
		return false;
	}

	triggerNetworkEvent("ag.skin", client, serverData.jobs[jobId].uniforms[uniformId].skin);
}

// ---------------------------------------------------------------------------

function jobEquipmentCommand(command, params, client) {
	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	let equipmentId = Number(params) || 1;
	
	let jobId = getClientCurrentSubAccount(client).job;
	
	givePlayerJobEquipment(client, equipmentId);
}

// ---------------------------------------------------------------------------

function quitJobCommand(command, params, client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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
	
	quitJob(client);
	messageClientSuccess(client, "You are now unemployed!");
	return true;
}

// ---------------------------------------------------------------------------

function jobRadioCommand(command, params, client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	return true;
}

// ---------------------------------------------------------------------------

function jobDepartmentRadioCommand(command, params, client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
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

	return true;
}

// ---------------------------------------------------------------------------

function getJobType(jobId) {
	return getJobData(jobId).type;
}

// ---------------------------------------------------------------------------

function getJobData(jobId) {
	for(let i in serverData.jobs) {
		if(serverData.jobs[i].databaseId == jobId) {
			return serverData.jobs[i];
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function quitJob(client) {
	stopWorking(client);
	getClientCurrentSubAccount(client).job = AG_JOB_NONE;
}

// ---------------------------------------------------------------------------

function takeJob(client, jobId) {
	getClientCurrentSubAccount(client).job = jobId;
}

// ---------------------------------------------------------------------------