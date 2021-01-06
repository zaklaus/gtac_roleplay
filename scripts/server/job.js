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
	getServerData().jobs = loadJobsFromDatabase();
	createAllJobPickups();
	createAllJobBlips();
	setAllJobDataIndexes();
	console.log("[Asshat.Job]: Job script initialized successfully!");
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
		dbQuery = queryDatabase(dbConnection, `SELECT * FROM job_main WHERE job_enabled = 1 AND job_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobData = new serverClasses.jobData(dbAssoc);
					tempJobData.locations = loadJobLocationsFromDatabase(tempJobData.databaseId);
					tempJobData.equipment = loadJobEquipmentsFromDatabase(tempJobData.databaseId);
					tempJobData.uniforms = loadJobUniformsFromDatabase(tempJobData.databaseId);
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

function loadAllJobEquipmentFromDatabase() {
	for(let i in getServerData().jobs) {
		getServerData().jobs[i].equipment = loadJobEquipmentsFromDatabase(getServerData().jobs[i].databaseId);
	}
}

// ---------------------------------------------------------------------------

function loadAllJobUniformsFromDatabase() {
	for(let i in getServerData().jobs) {
		getServerData().jobs[i].uniforms = loadJobUniformsFromDatabase(getServerData().jobs[i].databaseId);
	}
}

// ---------------------------------------------------------------------------

function loadAllJobLocationsFromDatabase() {
	for(let i in getServerData().jobs) {
		getServerData().jobs[i].locations = loadJobLocationsFromDatabase(getServerData().jobs[i].databaseId);
	}
}

// ---------------------------------------------------------------------------

function loadJobEquipmentsFromDatabase(jobDatabaseId) {
	console.log(`[Asshat.Job]: Loading job equipments for job ${jobDatabaseId} from database ...`);

	let tempJobEquipments = [];
	let dbConnection = connectToDatabase();
	let dbQuery = null;
	let dbAssoc;

	if(dbConnection) {
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_equip` WHERE `job_equip_enabled` = 1 AND `job_equip_job` = " + toString(jobDatabaseId));
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
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_loc` WHERE `job_loc_enabled` = 1 AND `job_loc_job` = " + toString(jobDatabaseId));
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempJobLocationData = new serverClasses.jobLocationData(dbAssoc);
					tempJobLocations.push(tempJobLocationData);
					console.log(`[Asshat.Job]: Job location '${tempJobLocationData.databaseId}' loaded from database successfully!`);
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
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_uniform` WHERE `job_uniform_enabled` = 1 AND `job_uniform_job` = " + toString(jobDatabaseId));
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
		dbQuery = queryDatabase(dbConnection, "SELECT * FROM `job_equip_wep` WHERE `job_equip_wep_enabled` = 1 AND `job_equip_wep_equip` = " + toString(jobEquipmentDatabaseId));
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
	console.log(`[Asshat.Job] Spawning all job location blips ...`);
	for(let i in getServerData().jobs) {
		for(let j in getServerData().jobs[i].locations) {
			getServerData().jobs[i].locations[j].blip = gta.createBlip((getServerData().jobs[i].blipModel!=0) ? getServerData().jobs[i].blipModel : 0, getServerData().jobs[i].locations[j].position, 2, getColourByName("yellow"));
			addToWorld(getServerData().jobs[i].locations[j].blip);
			console.log(`[Asshat.Job] Job '${getServerData().jobs[i].name}' location blip ${j} spawned!`);
		}
	}
	console.log(`[Asshat.Job] All job location blips spawned!`);
}

// ---------------------------------------------------------------------------

function createAllJobPickups() {
	console.log(`[Asshat.Job] Spawning all job location pickups ...`);
	let pickupCount = 0;
	for(let i in getServerData().jobs) {
		if(getServerData().jobs[i].pickupModel != 0) {
			for(let j in getServerData().jobs[i].locations) {
				pickupCount++;
				getServerData().jobs[i].locations[j].pickup = gta.createPickup(getServerData().jobs[i].pickupModel, getServerData().jobs[i].locations[j].position);
				getServerData().jobs[i].locations[j].pickup.onAllDimensions = false;
				getServerData().jobs[i].locations[j].pickup.setData("ag.owner.type", AG_PICKUP_JOB, false);
				getServerData().jobs[i].locations[j].pickup.setData("ag.owner.id", i, false);
				getServerData().jobs[i].locations[j].pickup.setData("ag.label.type", AG_LABEL_JOB, true);
				getServerData().jobs[i].locations[j].pickup.setData("ag.label.name", getServerData().jobs[i].name, true);
				getServerData().jobs[i].locations[j].pickup.setData("ag.label.jobType", getServerData().jobs[i].databaseId, true);
				//getServerData().jobs[i].locations[j].pickup.interior = getServerData().jobs[i].locations[j].interior;
				getServerData().jobs[i].locations[j].pickup.dimension = getServerData().jobs[i].locations[j].dimension;
				addToWorld(getServerData().jobs[i].locations[j].pickup);

				console.log(`[Asshat.Job] Job '${getServerData().jobs[i].name}' location pickup ${j} spawned!`);
			}
		}
	}
	console.log(`[Asshat.Job] All job location pickups (${pickupCount}) spawned!`);
}

// ---------------------------------------------------------------------------

function showJobInformationToPlayer(client, jobType) {
	if(!canPlayerUseJobs(client)){
		return false;
	}

	if(jobType == getPlayerCurrentSubAccount(client).job) {
		messagePlayerInfo("Welcome back to your job. Use /startwork to begin.");
		return false;
	}

	switch(jobType) {
		case AG_JOB_POLICE:
			if(!canPlayerUsePoliceJob(client)) {
				return false;
			}

			messagePlayerInfo(client, "== Job Help =================================");
			messagePlayerInfo(client, "- Police Officers are enforcers of the law.");
			messagePlayerInfo(client, "- Use /startwork at a police station to work as a Police Officer.");
			messagePlayerInfo(client, "- Use /laws to see a list of laws.");
			messagePlayerInfo(client, "- Commands are: /cuff, /drag, /detain, /arrest, /search /tazer /radio");
			messagePlayerInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_MEDICAL:
			messagePlayerInfo(client, "== Job Help =================================");
			messagePlayerInfo(client, "- Paramedics help people by healing them.");
			messagePlayerInfo(client, "- Use /startwork at the hospital to work as a Paramedic.");
			messagePlayerInfo(client, "- People can enter your ambulance to get healed.");
			messagePlayerInfo(client,  "- The pay depends on the player's health before healing them.");
			messagePlayerInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_FIRE:
			if(!canClientUseFireJob(client)){
				return false;
			}
			messagePlayerInfo(client, "== Job Help =================================");
			messagePlayerInfo(client, "- Firefighters put out vehicle and building fires.");
			messagePlayerInfo(client, "- Use /startwork at the fire station to work as a Firefighter.");
			messagePlayerInfo(client, "- Get in a firetruck and you will be told where to go.");
			messagePlayerInfo(client, "- Use the firetruck hose to put out fires");
			messagePlayerInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_BUS:
			messagePlayerInfo(client, "== Job Help =================================");
			messagePlayerInfo(client, "- Bus Drivers transport people around the city on a route");
			messagePlayerInfo(client, "- Use /startwork at the bus depot to work as a Bus Driver.");
			messagePlayerInfo(client, "- Passengers can get on/off at any stop on your route");
			messagePlayerInfo(client, "- Stay on your assigned route. You will be paid when finished.");
			messagePlayerInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_TAXI:
			messagePlayerInfo(client, "== Job Help =================================");
			messagePlayerInfo(client, "- Taxi Drivers transport people around the city");
			messagePlayerInfo(client, "- Use /startwork at the taxi depot to work as a Taxi Driver.");
			messagePlayerInfo(client, "- Use /fare to set a fare. Fares start when a player gets in.");
			messagePlayerInfo(client, "- The meter will run until the player exits the vehicle.");
			messagePlayerInfo(client, "- You will automatically receive the fare money");
			messagePlayerInfo(client, "- When finished, use /stopwork to stop working.");
			break;

		case AG_JOB_GARBAGE:
			messagePlayerInfo(client, "== Job Help =================================");
			messagePlayerInfo(client, "- Garbage Collectors pick up the trash around the city.");
			messagePlayerInfo(client, "- Use /startwork at the garbage depot to work as a Garbage Collector.");
			messagePlayerInfo(client, "- Drive up to a garbage can or dumpster, and right click to grab a bag.");
			messagePlayerInfo(client, "- Walk up to the back of your truck and right click again to throw the bag in.");
			messagePlayerInfo(client, "- Your truck can hold 25 trashbags. Each bag is worth $25");
			messagePlayerInfo(client, "- Drive to the garbage depot again to deliver trash");
			messagePlayerInfo(client, "- When finished, use /stopwork to stop working.");
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
	if(!canPlayerUseJobs(client)) {
		messagePlayerError(client, "You are not allowed to use any jobs!");
		return false;
	}

	let closestJobLocation = getClosestJobLocation(getPlayerPosition(client));
	let jobData = getJobData(closestJobLocation.job);

	if(closestJobLocation.position.distance(getPlayerPosition(client)) > getGlobalConfig().takeJobDistance) {
		messagePlayerError(client, "There are no job points close enough!");
		return false;
	}

	if(getPlayerCurrentSubAccount(client).job > AG_JOB_NONE) {
		messagePlayerError(client, "You already have a job! Use /quitjob to quit your job.");
		return false;
	}

	if(!canPlayerUseJob(client, closestJobLocation.job)) {
		messagePlayerError(client, "You can't use this job!");
		return false;
	}

	takeJob(client, closestJobLocation.job);
	messagePlayerSuccess(client, "You now have the " + toString(jobData.name) + " job");
	return true;
}

// ---------------------------------------------------------------------------

function startWorkingCommand(command, params, client) {
	if(!canPlayerUseJobs(client)){
		return false;
	}

	let closestJobLocation = getClosestJobLocation(getPlayerPosition(client));
	let jobData = getJobData(closestJobLocation.job);

	if(closestJobLocation.position.distance(getPlayerPosition(client)) > getGlobalConfig().startWorkingDistance) {
		messagePlayerError(client, "There are no job points close enough!");
		return false;
	}

	if(getPlayerCurrentSubAccount(client).job == AG_JOB_NONE) {
		messagePlayerError(client, "You don't have a job!");
		messagePlayerInfo(client, "You can get a job by going the yellow points on the map.");
		return false;
	}

	if(getPlayerCurrentSubAccount(client).job != closestJobLocation.job) {
		messagePlayerError(client, "This is not your job!");
		messagePlayerInfo(client, `If you want this job, use /quitjob to quit your current job.`);
		return false;
	}

	messagePlayerSuccess(client, `You are now working as a ${jobData.name}`);
	startWorking(client);
	//showStartedWorkingTip(client);
	return true;
}

// ---------------------------------------------------------------------------

function stopWorkingCommand(command, params, client) {
	if(!canPlayerUseJobs(client)) {
		return false;
	}

	if(!isPlayerWorking(client)) {
		messagePlayerError(client, "You are not working!");
		return false;
	}

	//if(getPlayerCurrentSubAccount(client).job != closestJob.jobType) {
	//    messagePlayerError(client, "This is not your job!");
	//    messagePlayerInfo(client, "Use /quitjob if you want to quit your current job and take this one.");
	//    break;
	//}

	messagePlayerSuccess(client, "You have stopped working!");
	stopWorking(client);
	//showApproachCurrentJobTip(client);
	return true;
}

// ---------------------------------------------------------------------------

function startWorking(client) {
	if(!canPlayerUseJobs(client)){
		return false;
	}

	getPlayerCurrentSubAccount(client).isWorking = true;

	let jobId = getPlayerCurrentSubAccount(client).job;
	switch(getJobType(jobId)) {
		case AG_JOB_POLICE:
			messagePlayerInfo(client, "Use /uniform and /equip to get your equipment.");
			break;

		case AG_JOB_MEDICAL:
			messagePlayerInfo(client, "Use /uniform and /equip to get your equipment.");
			break;

		case AG_JOB_FIRE:
			messagePlayerInfo(client, "Use /uniform and /equip to get your equipment.");
			break;

		case AG_JOB_BUS:
			messagePlayerInfo(client, "Get in a bus to get started.");
			break;

		case AG_JOB_TAXI:
			messagePlayerInfo(client, "Get in a taxi to get started.");
			break;

		case AG_JOB_GARBAGE:
			messagePlayerInfo(client, "Get in a trash truck to get started.");
			break;

		case AG_JOB_WEAPON:
			break;

		case AG_JOB_DRUG:
			break;

		default:
			break;
	}

	updatePlayerNameTag(client);
	triggerNetworkEvent("ag.working", client, true);
	//showStartedWorkingTip(client);
}

// ---------------------------------------------------------------------------

function getJobInfoCommand(command, params, client) {
	let closestJobLocation = getClosestJobLocation(getPlayerPosition(client));

	messagePlayerInfo(client, `[#FFFF00][Job Info] [#FFFFFF]Name: [#AAAAAA]${getJobData(closestJobLocation.job).name}, [#FFFFFF]Enabled: [#AAAAAA]${getYesNoFromBool(intToBool(getJobData(closestJobLocation.job).enabled))}, [#FFFFFF]Whitelisted: [#AAAAAA]${getYesNoFromBool(intToBool(getJobData(closestJobLocation.job).whiteListEnabled))}, [#FFFFFF]Blacklisted: [#AAAAAA]${getYesNoFromBool(intToBool(getJobData(closestJobLocation.job).blackListEnabled))}, [#FFFFFF]ID: [#AAAAAA]${getJobData(closestJobLocation.job).id}/${closestJobLocation.job}`);
}

// ---------------------------------------------------------------------------

function getJobLocationInfoCommand(command, params, client) {
	let closestJobLocation = getClosestJobLocation(getPlayerPosition(client));

	//if(!getJobData(getJobIdFromDatabaseId(closestJobLocation.job))) {
	//	messagePlayerError(client, "Job not found!");
	//	return false;
	//}

	messagePlayerInfo(client, `[#FFFF00][Job Location Info] [#FFFFFF]Job: [#AAAAAA]${getJobData(closestJobLocation.job).name} (${getJobData(closestJobLocation.job).id}/${closestJobLocation.job}), [#FFFFFF]Enabled: [#AAAAAA]${getYesNoFromBool(closestJobLocation.enabled)}, [#FFFFFF]Database ID: [#AAAAAA]${closestJobLocation.databaseId}`);
}

// ---------------------------------------------------------------------------

function givePlayerJobEquipment(client, equipmentId) {
	if(!canPlayerUseJobs(client)) {
		return false;
	}

	let jobId = getPlayerCurrentSubAccount(client).job;
	let equipments = getJobData(jobId).equipment;

	for(let i in equipments[equipmentId].weapons) {
		triggerNetworkEvent("ag.giveWeapon", client, equipments[equipmentId].weapons[i].weaponId, equipments[equipmentId].weapons[i].ammo, false);
	}
}

// ---------------------------------------------------------------------------

function stopWorking(client) {
	if(!canPlayerUseJobs(client)){
		return false;
	}

	if(!isPlayerWorking(client)) {
		return false;
	}

	getPlayerCurrentSubAccount(client).isWorking = false;

	triggerNetworkEvent("ag.skin", client, getPlayerCurrentSubAccount(client).skin);

	let jobVehicle = getPlayerCurrentSubAccount(client).lastJobVehicle;
	if(jobVehicle) {
		if(client.player.vehicle) {
			removePlayerFromVehicle(client);
			//client.player.removeFromVehicle();
		}

		let vehicleData = getVehicleData(jobVehicle);
		jobVehicle.fix();
		jobVehicle.position = vehicleData.spawnPosition;
		jobVehicle.heading = vehicleData.spawnRotation;
		jobVehicle.locked = true;
		setEntityData(jobVehicle, "ag.lights", false, true);
		setEntityData(jobVehicle, "ag.engine", false, true);
		setEntityData(jobVehicle, "ag.siren", false, true);

		getPlayerCurrentSubAccount(client).lastJobVehicle = false;
	}

	triggerNetworkEvent("ag.clearWeapons", client);

	let jobId = getPlayerCurrentSubAccount(client).job;
	switch(getJobType(jobId)) {
		case AG_JOB_POLICE:
			messagePlayerInfo(client, "Your uniform, equipment, and police car have been returned to the police station");
			break;

		case AG_JOB_MEDICAL:
			messagePlayerInfo(client, "Your uniform and ambulance have been returned to the hospital");
			break;

		case AG_JOB_FIRE:
			messagePlayerInfo(client, "Your uniform and fire truck have been returned to the fire station");
			break;

		case AG_JOB_BUS:
			messagePlayerInfo(client, "Your bus has been returned to the bus depot");
			break;

		case AG_JOB_TAXI:
			messagePlayerInfo(client, "Your taxi has been returned to the taxi depot");
			break;

		case AG_JOB_GARBAGE:
			messagePlayerInfo(client, "Your trash truck has been returned to the city landfill");
			break;

		case AG_JOB_WEAPON:
			break;

		case AG_JOB_DRUG:
			break;

		default:
			break;
	}

	updatePlayerNameTag(client);
	triggerNetworkEvent("ag.working", client, false);
}

// ---------------------------------------------------------------------------

function jobUniformCommand(command, params, client) {
	let jobId = getPlayerCurrentSubAccount(client).job;
	let uniforms = getJobData(jobId).uniforms;

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		messagePlayerNormal(client, `0: No uniform (sets you back to your main skin)`);

		for(let i in uniforms) {
			messagePlayerNormal(client, `${toInteger(i)+1}: ${uniforms[i].name} (Requires rank ${uniforms[i].requiredRank})`);
		}
		return false;
	}

	let uniformId = toInteger(params) || 1;
	if(uniformId == 0) {
		triggerNetworkEvent("ag.pedSkin", client, getPlayerCurrentSubAccount(client).skin);
		messagePlayerSuccess(client, "You changed your uniform to (none)");
		return true;
	}

	if(uniformId < 1 || uniformId > uniforms.length) {
		messagePlayerError(client, "That uniform ID is invalid!");
		return false;
	}

	messagePlayerSuccess(client, `You put on the [#AAAAAA]${uniforms[uniformId-1].name} [#FFFFFF]uniform`);
	setPlayerSkin(client, uniforms[uniformId-1].skin);
}

// ---------------------------------------------------------------------------

function jobEquipmentCommand(command, params, client) {
	let jobId = getPlayerCurrentSubAccount(client).job;
	let equipments = getJobData(jobId).equipment;

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		messagePlayerNormal(client, `0: No equipment`);
		for(let i in equipments) {
			messagePlayerNormal(client, `${toInteger(i)+1}: ${equipments[i].name} (Requires rank ${equipments[i].requiredRank})`);
		}
		return false;
	}

	let equipmentId = toInteger(params) || 1;

	if(equipmentId == 0) {
		messagePlayerSuccess(client, "You put your equipment away");
		return true;
	}

	if(equipmentId < 1 || equipmentId > equipments.length) {
		messagePlayerError(client, "That equipment ID is invalid!");
		return false;
	}

	givePlayerJobEquipment(client, equipmentId-1);
	messagePlayerSuccess(client, `You have been given the ${equipments[equipmentId-1].name} equipment`);
}

// ---------------------------------------------------------------------------

function quitJobCommand(command, params, client) {
	if(!canPlayerUseJobs(client)){
		return false;
	}

	quitJob(client);
	messagePlayerSuccess(client, "You are now unemployed!");
	return true;
}

// ---------------------------------------------------------------------------

function jobRadioCommand(command, params, client) {
	if(!canPlayerUseJobs(client)){
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function jobDepartmentRadioCommand(command, params, client) {
	if(!canPlayerUseJobs(client)){
		return false;
	}


	return true;
}

// ---------------------------------------------------------------------------

function getJobType(jobId) {
	return getJobData(jobId).type;
}

// ---------------------------------------------------------------------------

function doesPlayerHaveJobType(client, jobType) {
	return (getJobType(getPlayerCurrentSubAccount(client).job) == jobType) ? true : false;
}

// ---------------------------------------------------------------------------

function getJobData(jobId) {
	//for(let i in getServerData().jobs) {
	//	if(getServerData().jobs[i].databaseId == jobId) {
	//		return getServerData().jobs[i];
	//	}
	//}

	if(typeof getServerData().jobs[jobId] != "undefined") {
		return getServerData().jobs[jobId];
	}

	return false;
}

// ---------------------------------------------------------------------------

function quitJob(client) {
	stopWorking(client);
	getPlayerCurrentSubAccount(client).job = AG_JOB_NONE;
	triggerNetworkEvent("ag.jobType", client, AG_JOB_NONE);
}

// ---------------------------------------------------------------------------

function takeJob(client, jobId) {
	getPlayerCurrentSubAccount(client).job = jobId;
	triggerNetworkEvent("ag.jobType", client, jobId);
}

// ---------------------------------------------------------------------------

function reloadAllJobsCommand(command, params, client) {
	forceAllPlayersToStopWorking();

	getServerData().jobs = null;
	getServerData().jobs = loadJobsFromDatabase();

	for(let i in getServerData().jobs) {
		for(let j in getServerData().jobs[i].locations) {
			deleteJobLocationPickup(i, j);
			deleteJobLocationBlip(i, j);
			createJobLocationPickup(i, j);
			createJobLocationBlip(i, j);
		}
	}

	messageAdminAction(`All server jobs have been reloaded by an admin!`);
}

// ---------------------------------------------------------------------------

function createJobLocationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let jobId = getJobFromParams(params);

	if(!getJobData(jobId)) {
		messagePlayerError(client, "That job was not found!");
		return false;
	}

	createJobLocation(jobId, getPlayerPosition(client), getPlayerInterior(client), getPlayerVirtualWorld(client));
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]created a location for the [#AAAAAA]${getJobData(jobId).name} [#FFFFFF]job`);
	return true;
}

// ---------------------------------------------------------------------------

function deleteJobLocationCommand(command, params, client) {
	let closestJobLocation = getClosestJobLocation(getPlayerPosition(client));

	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]deleted location [#AAAAAA]${closestJobLocation.databaseId} [#FFFFFF]for the [#AAAAAA]${getJobData(closestJobLocation.jobIndex).name} [#FFFFFF]job`);

	quickDatabaseQuery(`DELETE FROM job_loc WHERE job_loc_id = ${closestJobLocation.databaseId}`);

	let tempIndex = closestJobLocation.index;
	let tempJob = closestJobLocation.job;
	deleteJobLocation(closestJobLocation);
	getJobData(tempJob).locations.splice(tempIndex, 1);
}

// ---------------------------------------------------------------------------

function toggleJobLocationEnabledCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let closestJobLocation = getClosestJobLocation(getPlayerPosition(client));

	closestJobLocation.enabled = !closestJobLocation.enabled;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]${getEnabledDisabledFromBool(closestJobLocation.enabled)} location [#AAAAAA]${closestJobLocation.databaseId} [#FFFFFF]for the [#AAAAAA]${getJobData(closestJobLocation.jobIndex).name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function toggleJobEnabledCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let jobId = getJobFromParams(params) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	getJobData(jobId).enabled = !getJobData(jobId).enabled;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]${getEnabledDisabledFromBool(getJobData(jobId).enabled)} [#FFFFFF]the [#AAAAAA]${getJobData(jobId).name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function toggleJobWhiteListCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let jobId = getJobFromParams(params) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	getJobData(jobId).whiteListEnabled = !getJobData(jobId).whiteListEnabled;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]${getEnabledDisabledFromBool(getJobData(jobId).whiteListEnabled)} [#FFFFFF]the whitelist for the [#AAAAAA]${getJobData(jobId).name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function toggleJobBlackListCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let jobId = getJobFromParams(params) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	getJobData(jobId).blackListEnabled = !getJobData(jobId).blackListEnabled;
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]${getEnabledDisabledFromBool(getJobData(jobId).blackListEnabled)} [#FFFFFF]the blacklist for the [#AAAAAA]${getJobData(jobId).name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function addPlayerToJobBlackListCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);
	let jobId = getJobFromParams(splitParams[1]) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	if(!targetClient) {
		messagePlayerError(client, `That player was not found!`);
		return false;
	}

	if(!getJobData(jobId)) {
		messagePlayerError(client, `That job was not found!`);
		return false;
	}

	if(isPlayerOnJobBlackList(targetClient, jobId)) {
		messagePlayerError(client, `That player is already blacklisted from that job!`);
		return false;
	}

	addPlayerToJobBlackList(targetClient, jobId);
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]added ${getCharacterFullName(targetClient)} [#FFFFFF]to the blacklist for the [#AAAAAA]${jobData.name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function removePlayerFromJobBlackListCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);
	let jobId = getJobFromParams(splitParams[1]) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	if(!targetClient) {
		messagePlayerError(client, `That player was not found!`);
		return false;
	}

	if(!getJobData(jobId)) {
		messagePlayerError(client, `That job was not found!`);
		return false;
	}

	if(!isPlayerOnJobBlackList(targetClient, jobId)) {
		messagePlayerError(client, `That player is not blacklisted from that job!`);
		return false;
	}

	removePlayerFromJobBlackList(targetClient, jobId);
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]removed ${getCharacterFullName(targetClient)} [#FFFFFF]from the blacklist for the [#AAAAAA]${jobData.name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function addPlayerToJobWhiteListCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);
	let jobId = getJobFromParams(splitParams[1]) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	if(!targetClient) {
		messagePlayerError(client, `That player was not found!`);
		return false;
	}

	if(!getJobData(jobId)) {
		messagePlayerError(client, `That job was not found!`);
		return false;
	}

	if(isPlayerOnJobWhiteList(targetClient, jobId)) {
		messagePlayerError(client, `That player is already whitelisted from that job!`);
		return false;
	}

	addPlayerToJobWhiteList(targetClient, jobId);
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]added ${getCharacterFullName(targetClient)} [#FFFFFF]to the whitelist for the [#AAAAAA]${jobData.name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function removePlayerFromJobWhiteListCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);
	let jobId = getJobFromParams(splitParams[1]) || getClosestJobLocation(getPlayerPosition(client)).jobIndex;

	if(!targetClient) {
		messagePlayerError(client, `That player was not found!`);
		return false;
	}

	if(!getJobData(jobId)) {
		messagePlayerError(client, `That job was not found!`);
		return false;
	}

	if(!isPlayerOnJobWhiteList(targetClient, jobId)) {
		messagePlayerError(client, `That player is not whitelisted from that job!`);
		return false;
	}

	removePlayerFromJobWhiteList(targetClient, jobId);
	messageAdmins(`[#AAAAAA]${client.name} [#FFFFFF]removed ${getCharacterFullName(targetClient)} [#FFFFFF]from the whitelist for the [#AAAAAA]${jobData.name} [#FFFFFF]job`);
}

// ---------------------------------------------------------------------------

function forceAllPlayersToStopWorking() {
	getClients().forEach(function(client) {
		if(!client.console) {
			stopWorking(client);
		}
	});
}

// ---------------------------------------------------------------------------

function jobStartRouteCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) {
		messagePlayerError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!isPlayerWorking(client)) {
		messagePlayerError(client, "You aren't working yet! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_BUS) && !doesPlayerHaveJobType(client, AG_JOB_GARBAGE)) {
		messagePlayerError(client, "Your job doesn't use a route!");
        return false;
	}

	if(!isPlayerInJobVehicle(client)) {
		messagePlayerError(client, "You need to be in a vehicle that belongs to your job!");
        return false;
	}

	startJobRoute(client);

	return true;
}

// ---------------------------------------------------------------------------

function jobStopRouteCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) {
		messagePlayerError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!isPlayerWorking(client)) {
		messagePlayerError(client, "You aren't working yet! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_BUS) && !doesPlayerHaveJobType(client, AG_JOB_GARBAGE)) {
		messagePlayerError(client, "Your job doesn't use a route!");
        return false;
	}

	if(!isPlayerOnJobRoute(client)) {
		messagePlayerError(client, "You aren't on a job route!");
        return false;
	}

	stopJobRoute(client);
	return true;
}

// ---------------------------------------------------------------------------

function isPlayerInJobVehicle(client) {
	if(getPlayerVehicle(client)) {
		let vehicle = getPlayerVehicle(client);
		if(isVehicleOwnedByJob(vehicle, getPlayerCurrentSubAccount(client).job)) {
			return true;
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function isPlayerWorking(client) {
	if(!getPlayerCurrentSubAccount(client)) {
		return false;
	}
	return getPlayerCurrentSubAccount(client).isWorking;
}

// ---------------------------------------------------------------------------

function startJobRoute(client) {
	if(doesPlayerHaveJobType(client, AG_JOB_BUS)) {
		let busRoute = getRandomBusRoute(getPlayerIsland(client));
		getPlayerData(client).jobRoute = busRoute;
		getPlayerData(client).jobRouteStop = 0;
		getPlayerData(client).jobRouteIsland = getPlayerIsland(client);
		getPlayerData(client).jobRouteVehicle = getPlayerVehicle(client);
		getPlayerVehicle(client).colour1 = getBusRouteData(getPlayerIsland(client), busRoute).busColour;
		getPlayerVehicle(client).colour2 = 1;
		showCurrentBusStop(client);
		messagePlayerNormal(client, `🚌 You are now driving the [#AAAAAA]${getBusRouteData(getPlayerIsland(client), busRoute).name} [#FFFFFF]bus route! Drive to the green checkpoint.`);
	} else if(doesPlayerHaveJobType(client, AG_JOB_GARBAGE)) {
		let garbageRoute = getRandomBusRoute(getPlayerIsland(client));
		getPlayerData(client).jobRoute = garbageRoute;
		getPlayerData(client).jobRouteStop = 0;
		getPlayerData(client).jobRouteIsland = getPlayerIsland(client);
		getPlayerData(client).jobRouteVehicle = getPlayerVehicle(client);
		getPlayerVehicle(client).colour1 = getGarbageRouteData(getPlayerIsland(client), garbageRoute).garbageTruckColour;
		getPlayerVehicle(client).colour2 = 1;
		showCurrentGarbageStop(client);
		messagePlayerNormal(client, `🚌 You are now driving the [#AAAAAA]${getGarbageRouteData(getPlayerIsland(client), garbageRoute).name} [#FFFFFF]garbage route! Drive to the grey checkpoint.`);
	}
}

// ---------------------------------------------------------------------------

function stopJobRoute(client, successful = false) {
	stopReturnToJobVehicleCountdown(client);
	triggerNetworkEvent("ag.stopJobRoute", client);

	if(doesPlayerHaveJobType(client, AG_JOB_BUS)) {
		respawnVehicle(getPlayerData(client).busRouteVehicle);
		messagePlayerAlert(client, `You stopped the ${getBusRouteData(getPlayerData(client).busRouteIsland, getPlayerData(client).busRoute).name} bus route! Your bus has been returned to the bus depot.`, getColourByName("yellow"));
		getPlayerData(client).busRouteVehicle = false;
		getPlayerData(client).busRoute = false;
		getPlayerData(client).busRouteStop = false;
		getPlayerData(client).busRouteIsland = false;
	} else if(doesPlayerHaveJobType(client, AG_JOB_GARBAGE)) {
		respawnVehicle(getPlayerData(client).garbageRouteVehicle);
		messagePlayerAlert(client, `You stopped the ${getBusRouteData(getPlayerData(client).garbageRouteIsland, getPlayerData(client).garbageRoute).name} garbage route! Your trashmaster has been returned to the bus depot.`, getColourByName("yellow"));
		getPlayerData(client).garbageRouteVehicle = false;
		getPlayerData(client).garbageRoute = false;
		getPlayerData(client).garbageRouteStop = false;
		getPlayerData(client).garbageRouteIsland = false;
	}
}

// ---------------------------------------------------------------------------

function isPlayerOnJobRoute(client) {
	if(doesPlayerHaveJobType(client, AG_JOB_BUS)) {
		if(getPlayerData(client).busRoute) {
			return true;
		}
	} else if(doesPlayerHaveJobType(client, AG_JOB_GARBAGE)) {
		if(getPlayerData(client).garbageRoute) {
			return true;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function getPlayerJobRouteVehicle(client) {
	if(!isPlayerOnJobRoute(client)) {
		return false;
	}

	if(doesPlayerHaveJobType(client, AG_JOB_BUS)) {
		return getPlayerData(client).busRouteVehicle;
	} else if(doesPlayerHaveJobType(client, AG_JOB_GARBAGE)) {
		return getPlayerData(client).garbageRouteVehicle;
	}
}

// ---------------------------------------------------------------------------

function startReturnToJobVehicleCountdown(client) {
	getPlayerData(client).returnToJobVehicleTick = getGlobalConfig().returnToJobVehicleTime;
	getPlayerData(client).returnToJobVehicleTimer = setInterval(function() {
		//console.log(getPlayerData(client).returnToJobVehicleTick);
		if(getPlayerData(client).returnToJobVehicleTick > 0) {
			getPlayerData(client).returnToJobVehicleTick = getPlayerData(client).returnToJobVehicleTick - 1;
			//console.warn(`You have ${getPlayerData(client).returnToJobVehicleTick} seconds to return to your job vehicle!`);
			showGameMessage(client, `You have ${getPlayerData(client).returnToJobVehicleTick} seconds to return to your job vehicle!`, getColourByName("softRed"), 1500);
		} else {
			clearInterval(getPlayerData(client).returnToJobVehicleTimer);
			getPlayerData(client).returnToJobVehicleTimer = null;
			getPlayerData(client).returnToJobVehicleTick = 0;
			stopJobRoute(client, false);
		}
	}, 1000);
}

// ---------------------------------------------------------------------------

function stopReturnToJobVehicleCountdown(client) {
	if(getPlayerData(client).returnToJobVehicleTimer != null) {
		clearInterval(getPlayerData(client).returnToJobVehicleTimer);
		getPlayerData(client).returnToJobVehicleTimer = null;
	}

	//getPlayerData(client).returnToJobVehicleTick = 0;
}

// ---------------------------------------------------------------------------

function sendAllJobLabelsToPlayer(client) {
	let tempJobLocations = [];
	for(let k in getServerData().jobs) {
		for(let m in getServerData().jobs[k].locations) {
			tempJobLocations.push({
				id: getServerData().jobs[k].locations[m].databaseId,
				jobType: getServerData().jobs[k].jobType,
				name: getServerData().jobs[k].name,
				position: getServerData().jobs[k].locations[m].position,
			});
		}
	}

	let totalJobLocations = tempJobLocations.length;
	let tempJobLabels = [];
	let jobLocationsPerNetworkEvent = 100;
	let totalNetworkEvents = Math.ceil(totalJobLocations/jobLocationsPerNetworkEvent);
	for(let i = 0 ; i < totalNetworkEvents ; i++) {
		for(let j = 0 ; j < jobLocationsPerNetworkEvent ; j++) {
			let tempJobLocationId = (i*jobLocationsPerNetworkEvent)+j;
			//if(typeof getServerData().jobs[i] != "undefined") {
				let tempJobLabels = [];
				tempJobLabels.push([tempJobLocations[i].id, tempJobLocations[i].position, getGameConfig().propertyLabelHeight[getServerGame()], tempJobLocations[i].name, tempJobLocations[i].jobType, false]);
			//}
		}
		triggerNetworkEvent("ag.joblabel.all", client, tempJobLabels);
		tempJobLabels = [];
	}
}

// ---------------------------------------------------------------------------

function canPlayerUseJob(client, jobId) {
	if(doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageJobs"))) {
		return true;
	}

	if(!getJobData(jobId)) {
		return false;
	}

	if(getJobData(jobId).whiteListEnabled) {
		if(!isPlayerOnJobWhiteList(client, jobId)) {
			return false
		}
	}
}

// ---------------------------------------------------------------------------

function deleteJobLocation(jobLocationData) {
	//removeFromWorld(jobLocationData.pickup);
	destroyElement(jobLocationData.pickup);
}

// ---------------------------------------------------------------------------

function freezeJobVehicleForRouteStop(client) {
    getVehicleData(getPlayerVehicle(client)).engine = false;
	getPlayerVehicle(client).engine = false;
}

// ---------------------------------------------------------------------------

function unFreezeJobVehicleForRouteStop(client) {
    getVehicleData(getPlayerVehicle(client)).engine = true;
	getPlayerVehicle(client).engine = true;
}

// ---------------------------------------------------------------------------

function getJobIdFromDatabaseId(databaseId) {
	for(let i in getServerData().jobs) {
		if(getServerData().jobs[i].databaseId == databaseId) {
			return i;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function setAllJobDataIndexes() {
	for(let i in getServerData().jobs) {
		getServerData().jobs[i].index = i;
		for(let j in getServerData().jobs[i].locations) {
			getServerData().jobs[i].locations[j].index = j;
			getServerData().jobs[i].locations[j].jobIndex = i;
		}

		for(let k in getServerData().jobs[i].uniforms) {
			getServerData().jobs[i].uniforms[k].index = k;
			getServerData().jobs[i].uniforms[k].jobIndex = i;
		}

		for(let m in getServerData().jobs[i].equipment) {
			getServerData().jobs[i].equipment[m].index = m;
			getServerData().jobs[i].equipment[m].jobIndex = i;
			for(let n in getServerData().jobs[i].equipment[m].weapons) {
				getServerData().jobs[i].equipment[m].weapons[n].index = n;
				getServerData().jobs[i].equipment[m].weapons[n].jobIndex = i;
				getServerData().jobs[i].equipment[m].weapons[n].equipmentIndex = m;
			}
		}

		for(let o in getServerData().jobs[i].blackList) {
			getServerData().jobs[i].blackList[o].index = o;
			getServerData().jobs[i].blackList[o].jobIndex = i;
		}

		for(let v in getServerData().jobs[i].whiteList) {
			getServerData().jobs[i].blackList[v].index = v;
			getServerData().jobs[i].blackList[v].jobIndex = i;
		}
	}
}

// ---------------------------------------------------------------------------

function createJobLocation(jobId, position, interior, dimension) {
	let jobLocationData = new serverClasses.jobLocationData(false);
	jobLocationData.position = position;
	jobLocationData.job = getJobData(jobId).databaseId;
	jobLocationData.interior = interior;
	jobLocationData.dimension = dimension;
	jobLocationData.enabled = true;

	getServerData().jobs[jobId].locations.push(jobLocationData);

	createJobLocationPickup(jobId, getServerData().jobs[jobId].locations.length-1);

	saveJobLocationToDatabase(jobLocationData);
}

// ---------------------------------------------------------------------------

function saveJobToDatabase(jobData) {
	if(jobData == null) {
		// Invalid job data
		return false;
	}

	console.log(`[Asshat.Job]: Saving job ${jobData.name} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeName = escapeDatabaseString(dbConnection, jobData.name);
		// If job hasn't been added to database, ID will be 0
		if(jobData.databaseId == 0) {
			let dbQueryString = `INSERT INTO job_main (job_name, job_enabled, job_pickup, job_blip, job_type, job_colour_r, job_colour_g, job_colour_b, job_whitelist, job_blacklist) VALUES ('${safeName}', ${boolToInt(jobData.enabled)}, ${jobData.pickupModel}, ${jobData.blipModel}, ${jobData.type}, ${jobData.colourArray[0]}, ${jobData.colourArray[1]}, ${jobData.colourArray[2]})`;
			queryDatabase(dbConnection, dbQueryString);
			jobData.databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE job_main SET job_name='${safeName}', job_enabled=${boolToInt(jobData.enabled)}, job_pickup=${jobData.pickupModel}, job_blip=${jobData.blipModel}, job_type=${jobData.type}, job_colour_r=${jobData.colourArray[0]}, job_colour_g=${jobData.colourArray[1]}, job_colour_b=${jobData.colourArray[2]} WHERE job_id=${jobData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Job]: Saved job ${jobData.name} to database!`);

	return false;
}

// ---------------------------------------------------------------------------

function saveJobLocationToDatabase(jobLocationData) {
	if(jobLocationData == null) {
		// Invalid job location data
		return false;
	}

	console.log(`[Asshat.Job]: Saving job location ${jobLocationData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		// If job location hasn't been added to database, ID will be 0
		if(jobLocationData.databaseId == 0) {
			let dbQueryString = `INSERT INTO job_loc (job_loc_job, job_loc_enabled, job_loc_pos_x, job_loc_pos_y, job_loc_pos_z, job_loc_int, job_loc_vw) VALUES (${jobLocationData.job}, ${boolToInt(jobLocationData.enabled)}, ${jobLocationData.position.x}, ${jobLocationData.position.y}, ${jobLocationData.position.z}, ${jobLocationData.interior}, ${jobLocationData.dimension})`;
			console.log(dbQueryString);
			queryDatabase(dbConnection, dbQueryString);
			jobLocationData.databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE job_loc SET job_loc_job=${jobLocationData.job}, job_loc_enabled=${boolToInt(jobLocationData.enabled)}, job_loc_pos_x=${jobLocationData.position.x}, job_loc_pos_y=${jobLocationData.position.y}, job_loc_pos_z=${jobLocationData.position.z}, job_loc_int=${jobLocationData.interior}, job_loc_vw=${jobLocationData.dimension} WHERE job_loc_id=${jobLocationData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Job]: Saved job location ${jobLocationData.databaseId} to database`);

	return false;
}

// ---------------------------------------------------------------------------

function saveJobEquipmentToDatabase(jobEquipmentData) {
	if(jobEquipmentData == null) {
		// Invalid job equipment data
		return false;
	}

	console.log(`[Asshat.Job]: Saving job equipment ${jobEquipmentData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeName = escapeDatabaseString(dbConnection, jobEquipmentData.name);
		// If job equipment hasn't been added to database, ID will be 0
		if(jobEquipmentData.databaseId == 0) {
			let dbQueryString = `INSERT INTO job_equip (job_equip_job, job_equip_enabled, job_equip_minrank, job_equip_name) VALUES (${jobEquipmentData.job}, ${boolToInt(jobEquipmentData.enabled)}, ${jobEquipmentData.requiredRank}, '${safeName}')`;
			queryDatabase(dbConnection, dbQueryString);
			jobEquipmentData.databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE job_equip SET job_equip_job=${jobEquipmentData.job}, job_equip_enabled=${boolToInt(jobEquipmentData.enabled)}, job_equip_minrank=${jobEquipmentData.requiredRank}, job_equip_name='${safeName}' WHERE job_equip_id=${jobEquipmentData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Job]: Saved job equipment ${jobEquipmentData.databaseId} to database`);

	return false;
}

// ---------------------------------------------------------------------------

function saveJobEquipmentWeaponToDatabase(jobEquipmentWeaponData) {
	if(jobEquipmentWeaponData == null) {
		// Invalid job equipment weapon data
		return false;
	}

	console.log(`[Asshat.Job]: Saving job equipment weapon ${jobEquipmentWeaponData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		// If job equipment weapon hasn't been added to database, ID will be 0
		if(jobEquipmentWeaponData.databaseId == 0) {
			let dbQueryString = `INSERT INTO job_equip_wep (job_equip_wep_equip, job_equip_wep_enabled, job_equip_wep_wep, job_equip_wep_ammo) VALUES (${jobEquipmentWeaponData.equipmentId}, ${boolToInt(jobEquipmentWeaponData.enabled)}, ${jobEquipmentWeaponData.weaponId}, ${jobEquipmentWeaponData.ammo})`;
			queryDatabase(dbConnection, dbQueryString);
			jobEquipmentWeaponData.databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE job_equip_wep SET job_equip_wep_equip=${jobEquipmentWeaponData.equipmentId}, job_equip_wep_enabled=${boolToInt(jobEquipmentWeaponData.enabled)}, job_equip_wep_wep=${jobEquipmentWeaponData.weaponId}, job_equip_wep_ammo=${jobEquipmentWeaponData.ammo} WHERE job_equip_wep_id=${jobEquipmentWeaponData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Job]: Saved job equipment weapon ${jobEquipmentWeaponData.databaseId} to database`);

	return false;
}

// ---------------------------------------------------------------------------

function saveJobUniformToDatabase(jobUniformData) {
	if(jobUniformData == null) {
		// Invalid job uniform data
		return false;
	}

	console.log(`[Asshat.Job]: Saving job uniform ${jobUniformData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeName = escapeDatabaseString(dbConnection, jobUniformData.name);
		// If job uniform hasn't been added to database, ID will be 0
		if(jobUniformData.databaseId == 0) {
			let dbQueryString = `INSERT INTO job_uniform (job_uniform_job, job_uniform_enabled, job_uniform_minrank, job_uniform_name) VALUES (${jobUniformData.job}, ${boolToInt(jobUniformData.enabled)}, ${jobUniformData.requiredRank}, '${safeName}')`;
			queryDatabase(dbConnection, dbQueryString);
			jobUniformData.databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE job_uniform SET job_uniform_job=${jobUniformData.job}, job_uniform_enabled=${boolToInt(jobUniformData.enabled)}, job_uniform_minrank=${jobUniformData.requiredRank}, job_uniform_name='${safeName}', job_uniform_skin=${jobUniformData.skin} WHERE job_uniform_id=${jobUniformData.databaseId}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		return true;
	}
	console.log(`[Asshat.Job]: Saved job uniform ${jobUniformData.databaseId} to database`);

	return false;
}

// ---------------------------------------------------------------------------

function saveAllJobsToDatabase() {
	for(let i in getServerData().jobs) {
		saveJobToDatabase(getServerData().jobs[i]);

		for(let j in getServerData().jobs[i].locations) {
			saveJobLocationToDatabase(getServerData().jobs[i].locations[j]);
		}

		for(let k in getServerData().jobs[i].uniforms) {
			saveJobUniformToDatabase(getServerData().jobs[i].uniforms[k]);
		}

		for(let m in getServerData().jobs[i].equipment) {
			saveJobEquipmentToDatabase(getServerData().jobs[i].equipment[m]);

			for(let n in getServerData().jobs[i].equipment[m].weapons) {
				saveJobEquipmentWeaponToDatabase(getServerData().jobs[i].equipment[m].weapons[n]);
			}
		}
	}
}

// ---------------------------------------------------------------------------

function deleteJobLocationBlip(jobId, locationId) {
	if(getJobData(jobId).locations[locationId].blip != null) {
		destroyElement(getJobData(jobId).locations[locationId].blip);
		getJobData(jobId).locations[locationId].blip = null;
	}
}

// ---------------------------------------------------------------------------

function deleteJobLocationPickup(jobId, locationId) {
	if(getServerData().jobs[jobId].locations[locationId].pickup != null) {
		destroyElement(getJobData(jobId).locations[locationId].pickup);
		getServerData().jobs[jobId].locations[locationId].pickup = null;
	}
}

// ---------------------------------------------------------------------------

function createJobLocationPickup(jobId, locationId) {
	if(getJobData(jobId).pickupModel != -1) {
		let pickupModelId = getGameConfig().pickupModels[getServerGame()].job;

		if(getJobData(jobId).pickupModel != 0) {
			pickupModelId = getJobData(jobId).pickupModel;
		}

		getJobData(jobId).locations[locationId].blip = gta.createPickup(pickupModelId, getJobData(jobId).locations[locationId].position, getGameConfig().pickupTypes[getServerGame()].job);
		getJobData(jobId).locations[locationId].pickup.onAllDimensions = false;
		getJobData(jobId).locations[locationId].pickup.dimension = getJobData(jobId).locations[locationId].dimension;
		addToWorld(getJobData(jobId).locations[locationId].pickup);
	}
}

// ---------------------------------------------------------------------------

function createJobLocationBlip(jobId, locationId) {
	if(getJobData(jobId).blipModel != -1) {
		let blipModelId = getGameConfig().blipSprites[getServerGame()].job;

		if(getJobData(jobId).blipModel != 0) {
			blipModelId = getJobData(jobId).blipModel;
		}

		getJobData(jobId).locations[locationId].blip = gta.createBlip(getJobData(jobId).locations[locationId].position, blipModelId, getColourByType("job"));
		getJobData(jobId).locations[locationId].blip.onAllDimensions = false;
		getJobData(jobId).locations[locationId].blip.dimension = getJobData(jobId).locations[locationId].dimension;
		addToWorld(getJobData(jobId).locations[locationId].blip);
	}
}

// ---------------------------------------------------------------------------