// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: job.js
// DESC: Provides job functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initJobScript() {
	console.log("[Asshat.Job]: Initializing job script ...");
	addJobCommandHandlers();
	createAllJobPickups();
	
	//createAllJobBlips();
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

function createAllJobBlips() {
	for(let i in serverData.jobs[getServerGame()]) {
		serverData.jobs[getServerGame()][i].blip = createBlip(0, serverData.jobs[getServerGame()][i].position, 2, serverConfig.colour.byName.yellow);
	}
}

// ---------------------------------------------------------------------------

function sendAllJobBlips(client) {
	//if(getClientData(client).job == AG_JOB_NONE) {
		let tempBlips = [];
		for(let i in serverData.jobs[getServerGame()]) {
			let jobData = serverData.jobs[getServerGame()][i];
			tempBlips.push([0, jobData.position.x, jobData.position.y, jobData.position.z, 2, serverConfig.colour.byName.yellow]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	//}
}

// ---------------------------------------------------------------------------

function sendAllJobSpheres() {
	let tempJobSpheres = [];

	for(let i in serverData.jobs[getServerGame()]) {
		tempJobSpheres.push([
			serverData.jobs[getServerGame()][i].position.x,
			serverData.jobs[getServerGame()][i].position.y,
			serverData.jobs[getServerGame()][i].position.z,
			2,
			AG_SPHERE_JOB,
			i,
		]);
	}
	triggerNetworkEvent("ag.jobSpheres", client, tempJobSpheres);
}

// ---------------------------------------------------------------------------

function createAllJobPickups() {
	for(let i in serverData.jobs[getServerGame()]) {
		serverData.jobs[getServerGame()][i].pickup = createPickup(serverData.jobs[getServerGame()][i].pickupModel, serverData.jobs[getServerGame()][i].position);

		serverData.jobs[getServerGame()][i].pickup.setData("ag.ownerType", AG_PICKUP_JOB, true);
		serverData.jobs[getServerGame()][i].pickup.setData("ag.ownerId", i, true);
	}
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

	let closestJobId = getClosestJobPointId(client.player.position);
	let jobData = getJobData(closestJobId);

	if(jobData.position.distance(client.player.position) > serverConfig.takeJobDistance) {
		messageClientError(client, "There are no job points close enough!");
		return false;       
	}

	if(getClientCurrentSubAccount(client).job != -1) {
		messageClientError(client, "You already have a job! Use /quitjob to quit your job.");
		return false;      
	}
	
	takeJob(client, closestJobId);
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

	let closestJobId = getClosestJobPointId(client.player.position);
	let jobData = getJobData(closestJobId);

	if(jobData.position.distance(client.player.position) > serverConfig.startWorkingDistance) {
		messageClientError(client, "There are no job points close enough!");
		return false;       
	}    

	if(getJobType(getClientCurrentSubAccount(client).job) == AG_JOB_NONE) {
		messageClientError(client, "You don't have a job!");
		messageClientInfo(client, "You can get a job by going the yellow points on the map.");
		return false;
	}    

	if(getJobType(getClientCurrentSubAccount(client).job) != jobData.jobType) {
		messageClientError(client, "This is not your job!");
		messageClientInfo(client, `Use /quitjob to quit your current job.`);
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

	let closestJobId = getClosestJobPointId(client.player.position);
	let jobData = getJobData(closestJobId);

	if(jobData.position.distance(client.player.position) > serverConfig.stopWorkingDistance) {
		messageClientError(client, "There are no job points close enough!");
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
	switch(serverData.jobs[getServerGame()][jobId].jobType) {
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

function stopWorking(client) {
	if(!canClientUseJobs(client)){ 
		return false;
	}

	getClientCurrentSubAccount(client).isWorking = false;

	triggerNetworkEvent("ag.skin", null, client.player, getClientCurrentSubAccount(client).skin);

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
	switch(serverData.jobs[getServerGame()][jobId].jobType) {
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

	let uniformId = Number(params) || 1;
	
	let jobId = getClientCurrentSubAccount(client).job;
	getClientCurrentSubAccount(client).jobUniform = uniformId-1;

	switch(serverData.jobs[getServerGame()][jobId].jobType) {
		case AG_JOB_POLICE:
			triggerNetworkEvent("ag.skin", null, client.player, serverData.policeJobSkins[getServerGame()][uniformId-1]);
			//client.player.modelIndex = serverData.policeJobSkins[getServerGame()][uniformId];
			triggerNetworkEvent("ag.giveWeapon", client, 2, 200, false);
			triggerNetworkEvent("ag.giveWeapon", client, 1, 1, false);  
			break;

		case AG_JOB_MEDICAL:
			triggerNetworkEvent("ag.skin", null, client.player, serverData.medicalJobSkins[getServerGame()][uniformId-1]);
			//client.player.modelIndex = serverData.medicalJobSkins[getServerGame()][uniformId];
			messageClientInfo(client, "Your uniform and ambulance have been returned to the hospital");
			break;

		case AG_JOB_FIRE:
			triggerNetworkEvent("ag.skin", null, client.player, serverData.fireJobSkins[getServerGame()][uniformId-1]);
			//client.player.modelIndex = serverData.fireJobSkins[getServerGame()][uniformId];
			messageClientInfo(client, "Your uniform and fire truck have been returned to the fire station");
			break;

		case AG_JOB_BUS:
			triggerNetworkEvent("ag.skin", null, client.player, serverData.busJobSkins[getServerGame()][uniformId-1]);
			//client.player.modelIndex = serverData.busJobSkins[getServerGame()][uniformId];
			messageClientInfo(client, "Your bus has been returned to the bus depot");
			break;

		case AG_JOB_TAXI:
			triggerNetworkEvent("ag.skin", null, client.player, serverData.taxiJobSkins[getServerGame()][uniformId-1]);
			//client.player.modelIndex = serverData.taxiJobSkins[getServerGame()][uniformId];
			messageClientInfo(client, "Your taxi has been returned to the taxi depot");
			break;

		case AG_JOB_GARBAGE:
			triggerNetworkEvent("ag.skin", null, client.player, serverData.garbageJobSkins[getServerGame()][uniformId-1]);
			//client.player.modelIndex = serverData.garbageJobSkins[getServerGame()][uniformId];
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
	return getJobData(jobId).jobType;
}

// ---------------------------------------------------------------------------

function getJobData(jobId) {
	return serverData.jobs[getServerGame()][jobId];
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