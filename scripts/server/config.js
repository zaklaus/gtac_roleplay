// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: config.js
// DESC: Provides server configuration
// TYPE: Server (JavaScript)
// ===========================================================================

let serverConfig = {
	useGUI: true,
	name: "Asshat Gaming Roleplay",
	password: "LockedForStartup*128",
	hour: 0,
	minute: 0,
	weather: 1,
	fallingSnow: 0,
	groundSnow: 0,
	showLogo: true,	
	colour: {
		byType: {
			talkMessage: toColour(200, 200, 200),
			shoutMessage: toColour(255, 255, 200),
			whisperMessage: toColour(130, 130, 130),
			doActionMessage: toColour(153, 50, 204, 255),
			meActionMessage: toColour(153, 50, 204, 255),
			errorMessage: toColour(237, 67, 55, 255),
			syntaxMessage: toColour(200, 200, 200, 255),
			normalMessage: toColour(255, 255, 255, 255),
			alertMessage: toColour(255, 255, 0, 255),
			successMessage: toColour(0, 180, 0, 255),
			clanChatMessage: toColour(0, 190, 0, 255),
		},
		byName: {
			white: toColour(255, 255, 255, 255),
			black: toColour(0, 0, 0, 255),
			red: toColour(255, 0, 0, 255),
			yellow: toColour(255, 255, 0, 255),
			royalBlue: toColour(0, 0, 255, 255),
			teal: toColour(0, 255, 255, 255),
			orange: toColour(255, 128, 0, 255),
			lightGrey: toColour(200, 200, 200, 255),
			mediumGrey: toColour(150, 150, 150, 255),
			darkGrey: toColour(64, 64, 64, 255),
			policeBlue: toColour(70, 130, 180, 255),
			medicPink: toColour(219, 112, 147, 255),
			firefighterRed: toColour(205, 92, 92, 255),
			busDriverGreen: toColour(50, 205, 50, 255),
			taxiDriverYellow: toColour(240, 230, 140, 255),
			burntYellow: toColour(210, 210, 0, 255),
			burntOrange: toColour(210, 120, 0, 255),
			bankGreen: toColour(0, 150, 0, 255),
			softGreen: toColour(144, 255, 96, 255),
		}
	},
	accountPasswordHash: "SHA512",
	connectCameraPosition: false,
	connectCameraLookAt: false,
	newCharacter: {
		spawnPosition: false,
		spawnHeading: 0.0,
		money: 0,
	},
	npcFarProximity: 100,
	npcMediumProximity: 40,
	npcCloseProximity: 12,
	meActionDistance: 20,
	doActionDistance: 15,
	shoutDistance: 30,
	talkDistance: 10,
	whisperDistance: 2,
	megaphoneDistance: 40,
	vehicleLockDistance: 5,
	startWorkingDistance: 5,
	takeJobDistance: 5,
	stopWorkingDistance: 10,
	spawnCarDistance: 5,
	blipSprites: [
		false,
		{	// GTA III
			policeStation: 8,
			fireStation: 9,
			hospital: 12, 
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			bank: 0,
			fuelStation: -1,
		},
		{	// GTA VC
			policeStation: 0,
			fireStation: 0,
			hospital: 0, 
			ammunation: 16,
			payAndSpray: 27,
			vehicleDealership: 7,
			bank: 0,
			fuelStation: -1,
		},
		{	// GTA SA
			policeStation: 30,
			fireStation: 20,
			hospital: 22, 
			ammunation: 6,
			payAndSpray: 63,
			vehicleDealership: 55,
			bank: 52,
			fuelStation: 0,
		},
		{	// GTA UG
			policeStation: 8,
			fireStation: 9,
			hospital: 12, 
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			bank: 52,
			fuelStation: 0,
		},
		{	// GTA IV
			policeStation: 8,
			fireStation: 9,
			hospital: 12, 
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			bank: 52,
			fuelStation: 0,
		},						
	],

	// Not implemented yet
	keybindText: {
		actionKey: "E",
		vehicleEngineKey: "O",
		vehicleLightsKey: "K",
		vehicleLocksKey: "L",
	},
	keybinds: {
		actionKey: SDLK_e,
		vehicleEngineKey: SDLK_e,
		vehicleLightsKey: SDLK_k,
		vehicleLocksKey: SDLK_l,		
	},
	discordBotToken: "",
	discordEnabled: false,
};

// ----------------------------------------------------------------------------

function loadServerConfig() {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_game = ${server.game} AND svr_port = ${server.port} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);

				serverId = dbAssoc["svr_id"];
				serverConfig.name = dbAssoc["svr_name"];
				serverConfig.password = dbAssoc["svr_password"];
				serverConfig.newCharacter.spawnPosition = new Vec3(dbAssoc["svr_newchar_pos_x"], dbAssoc["svr_newchar_pos_y"], dbAssoc["svr_newchar_pos_z"]);
				serverConfig.newCharacter.spawnHeading = dbAssoc["svr_newchar_rot_z"];
				serverConfig.newCharacter.money = dbAssoc["svr_newchar_money"];
				serverConfig.newCharacter.bank = dbAssoc["svr_newchar_bank"];
				serverConfig.newCharacter.skin = dbAssoc["svr_newchar_skin"];

				serverConfig.connectCameraPosition = new Vec3(dbAssoc["svr_connectcam_pos_x"], dbAssoc["svr_connectcam_pos_y"], dbAssoc["svr_connectcam_pos_z"]);
				serverConfig.connectCameraLookAt = new Vec3(dbAssoc["svr_connectcam_lookat_x"], dbAssoc["svr_connectcam_lookat_y"], dbAssoc["svr_connectcam_lookat_z"]);
				serverConfig.hour = dbAssoc["svr_start_time_hour"];
				serverConfig.minute = dbAssoc["svr_start_time_min"];
				serverConfig.weather = dbAssoc["svr_start_weather"];
				serverConfig.fallingSnow = intToBool(dbAssoc["svr_start_snow_falling"]);
				serverConfig.groundSnow = intToBool(dbAssoc["svr_start_snow_ground"]);
				serverConfig.useGUI = intToBool(dbAssoc["svr_gui"]);

				applyConfigToServer();

				freeDatabaseQuery(dbQuery);
			}
		}
		disconnectFromDatabase(dbConnection);
	}	
}

// ----------------------------------------------------------------------------

function applyConfigToServer() {
	server.name = serverConfig.name;
	server.password = serverConfig.password;
	gta.time.hour = serverConfig.hour;
	gta.time.minute = serverConfig.minute;
	gta.forceWeather(serverConfig.weather);

	updateServerRules();
}

// ----------------------------------------------------------------------------