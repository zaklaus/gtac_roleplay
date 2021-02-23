// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: config.js
// DESC: Provides server configuration
// TYPE: Server (JavaScript)
// ===========================================================================

let serverConfig = {};
let databaseConfig = {};

let globalConfig = {
	accountPasswordHash: "SHA512",
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
	payAndSprayDistance: 5,
	defaultKeybinds: [
		new serverClasses.keyBindData(false, toInteger(SDLK_k), "engine"),
		new serverClasses.keyBindData(false, toInteger(SDLK_l), "lights"),
		new serverClasses.keyBindData(false, toInteger(SDLK_j), "lock"),
		new serverClasses.keyBindData(false, toInteger(SDLK_f), "enter"),
		new serverClasses.keyBindData(false, toInteger(SDLK_g), "passenger"),
		new serverClasses.keyBindData(false, toInteger(SDLK_m), "cursor"),
		new serverClasses.keyBindData(false, toInteger(SDLK_o), "drop"),
		new serverClasses.keyBindData(false, toInteger(SDLK_p), "pickup"),
		new serverClasses.keyBindData(false, toInteger(SDLK_u), "use"),
		new serverClasses.keyBindData(false, toInteger(SDLK_i), "inv"),
		new serverClasses.keyBindData(false, toInteger(SDLK_0), "i 0"),
		new serverClasses.keyBindData(false, toInteger(SDLK_1), "i 1"),
		new serverClasses.keyBindData(false, toInteger(SDLK_2), "i 2"),
		new serverClasses.keyBindData(false, toInteger(SDLK_3), "i 3"),
		new serverClasses.keyBindData(false, toInteger(SDLK_4), "i 4"),
		new serverClasses.keyBindData(false, toInteger(SDLK_5), "i 5"),
		new serverClasses.keyBindData(false, toInteger(SDLK_6), "i 6"),
		new serverClasses.keyBindData(false, toInteger(SDLK_7), "i 7"),
		new serverClasses.keyBindData(false, toInteger(SDLK_8), "i 8"),
		new serverClasses.keyBindData(false, toInteger(SDLK_9), "i 9"),
	],
	exitPropertyDistance: 3.0,
	enterPropertyDistance: 3.0,
	businessDimensionStart: 5000,
	houseDimensionStart: 100,
	buyVehicleDriveAwayDistance: 25.0,
	returnToJobVehicleTime: 30,
	walkieTalkieSpeakerDistance: 15,
	walkieTalkieTalkDistance: 15,
	phoneSpeakerDistance: 15,
	phoneTalkDistance: 15,
	tazerEffectDuration: 15000,
	weaponEquippableTypes: [
		AG_ITEM_USETYPE_WEAPON,
		AG_ITEM_USETYPE_TAZER,
		AG_ITEM_USETYPE_EXTINGUISHER,
		AG_ITEM_USETYPE_SPRAYPAINT,
		AG_ITEM_USETYPE_PEPPERSPRAY,
	],
	itemActionStateReset: 5000,
};

let gameConfig = {
	blipSprites: [
		false,
		{	// GTA III
			policeStation: 8,
			fireStation: 9,
			hospital: 12,
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			restaurant: -1,
			fastFood: -1,
			bank: 0,
			fuelStation: -1,
			business: -1,
			house: -1,
		},
		{	// GTA VC
			policeStation: 0,
			fireStation: 0,
			hospital: 0,
			ammunation: 16,
			payAndSpray: 27,
			vehicleDealership: 7,
			restaurant: -1,
			fastFood: -1,
			bank: 0,
			fuelStation: -1,
			business: -1,
			house: -1,
		},
		{	// GTA SA
			policeStation: 30,
			fireStation: 20,
			hospital: 22,
			ammunation: 6,
			payAndSpray: 63,
			vehicleDealership: 55,
			airplaneDealership: 5,
			boatDealership: 9,
			restaurant: 50,
			fastFood: -1,
			clothes: 45,
			pizza: 29,
			chicken: 14,
			burger: 10,
			bank: 52,
			fuelStation: 0,
			business: -1,
			house: 31,
		},
		{	// GTA UG
			policeStation: 8,
			fireStation: 9,
			hospital: 12,
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			restaurant: -1,
			fastFood: -1,
			bank: 52,
			fuelStation: 0,
			business: -1,
			house: -1,
		},
		{	// GTA IV
			policeStation: 8,
			fireStation: 9,
			hospital: 12,
			ammunation: 20,
			payAndSpray: 18,
			vehicleDealership: 6,
			restaurant: -1,
			fastFood: -1,
			bank: 52,
			fuelStation: 0,
			business: -1,
			house: -1,
		},
	],
	pickupModels: [
		{},

		{ // GTA 3
			policeStation: 1361,
			fireStation: 1361,
			hospital: 1361,
			ammunation: 1361,
			payAndSpray: 1361,
			vehicleDealership: 1361,
			restaurant: 1361,
			fastFood: 1361,
			bank: 1323,
			fuelStation: 1361,
			business: 1361,
			house: 1361,
			clothes: 1361,
			misc: 1361,
			exit: 1361
		},

		{ // GTA Vice City
			policeStation: 375,
			fireStation: 406,
			hospital: 366,
			ammunation: 406,
			payAndSpray: 406,
			vehicleDealership: 406,
			restaurant: 406,
			fastFood: 406,
			bank: 408,
			fuelStation: 406,
			business: 406,
			house: 407,
			clothes: 409,
			misc: 406,
			exit: 406,
		},

		{ // GTA San Andreas
			policeStation: 1247,
			fireStation: 1318,
			hospital: 1240,
			ammunation: 1239,
			payAndSpray: 1239,
			vehicleDealership: 1239,
			restaurant: 1239,
			fastFood: 1239,
			bank: 1274,
			fuelStation: 1239,
			business: 1272,
			house: 1273,
			clothes: 1275,
			misc: 1239,
			exit: 1247,
		}
	],
	pickupTypes: [
		{},

		{ // GTA 3
			business: 0,
			house: 0,
			bank: 0,
			clothes: 0,
			info: 0,
			job: 0,
		},

		{ // GTA Vice City
			business: 0,
			house: 0,
			bank: 0,
			clothes: 0,
			info: 0,
			job: 0,
		},

		{ // GTA San Andreas
			business: 1,
			house: 1,
			bank: 1,
			clothes: 1,
			info: 1,
			job: 1,
		}
	],

	// THIS IS SCREEN HEIGHT, NOT ACTUAL DOOR POSITION IN THE WORLD
	propertyLabelHeight: [
		false,
		85,
		85,
		85,
		85,
		85,
		85,
	],

	removedWorldObjects: [
		false,

		[ // GTA III
			new serverClasses.removedWorldObjectData("fraightback04", toVector3(1229.88, -84.8012, 13.4004), 50.0), // Truck trailer in Easy Credit Autos dealership parking lot
			new serverClasses.removedWorldObjectData("fraightback03", toVector3(1239.49, -68.0529, 11.6914), 50.0), // Truck trailer in Easy Credit Autos dealership parking lot
		],

		[ // GTA VC

		],

		[ // GTA SA

		],

		[ // GTA UG

		],

		[ // GTA IV

		],
	],

	excludedGroundSnowModels: [
		false,

		[ // GTA III

		],

		[ // GTA VC

		],

		[ // GTA SA
			// Twin tunnels from Rodeo, Los Santos to/from Flint County
			13682, // TCElawcuntunb
			13680, // TCElawcuntunb
			13676, // TCElawcuntun1a_law2
			13677, // TCElawcuntun1a_law2

			// Los Santos
			6387, // century03_LAw2 (L.A. Century Plaza underground parking)
			17633, // lae2_ground08
			4818, // TRNTRK8_LAS
			4884, // lastranentun1_LAS
			4885, // lastranentun4_LAS

			// Train Tunnel under Los Santos
			6248, // RailTunn01_LAw
			6249, // RailTunn02_LAw
			6250, // RailTunn03_LAw
			6251, // RailTunn04_LAw
			6252, // RailTunn05_LAw
			5772, // RailTunn01_LAwN (Market Station lower level)
			5773, // TrainStat01_LAwN (Market Station upper/ground level)
			6502, // RailTunn04_LAw2
			6290, // RailTunn02_LAw2
			6501, // RailTunn03_LAw2
			6292, // RailTunn01_LAw2N

			6966, // vegasNbank1 (L.V. north building underground parking, upper level)
			7245, // vegasNbank1ug (L.V. north building underground parking, lower level)
			7011, // courthse_vgn01 (L.V. courthouse parking structure)
			8390, // multicarpark01_lvS (Large parking structure next to pyramid)

			// Train tunnel next to Las Venturas
			6982, // vgsNtraintunnel01
			6983, // vgsNtraintunnel02
			6984, // vgsNtraintunnel03
			6981, // vgsNtraintunnel04
		],

		[ // GTA UG

		],

		[ // GTA IV

		],
	],

	interiorTemplates: [
		false,

		{ // GTA 3

		},

		{ // GTA VC
			mall: new serverClasses.interiorTemplateData(toVector3(379.62, 1007.00, 19.22), 4),
			malibu: new serverClasses.interiorTemplateData(toVector3(489.83, -76.49, 11.48), 17),
			vcpd: new serverClasses.interiorTemplateData(toVector3(396.38, -472.96, 12.34), 12),
			apartment: new serverClasses.interiorTemplateData(toVector3(26.67, -1328.89, 13.00), 11),
			hotel: new serverClasses.interiorTemplateData(toVector3(228.53, -1277.12, 12.07), 1),
			bikerBar: new serverClasses.interiorTemplateData(toVector3(-597.41, 651.84, 11.30), 11),
			mansion: new serverClasses.interiorTemplateData(toVector3(-379.14, -551.65, 19.32), 2),
			gunRange: new serverClasses.interiorTemplateData(toVector3(-667.79, 1217.51, 11.10), 10),
			bank: new serverClasses.interiorTemplateData(toVector3(-894.52, -341.16, 13.45), 3),
			stripClub: new serverClasses.interiorTemplateData(toVector3(97.53, -1472.06, 10.43), 5),
			rosenberg: new serverClasses.interiorTemplateData(toVector3(120.82, -827.98, 10.62), 6),
			arena: new serverClasses.interiorTemplateData(toVector3(-1080.49, 1331.16, 13.91), 15),
			ghettoShack: new serverClasses.interiorTemplateData(toVector3(-962.72, 146.11, 9.395), 12),
		},

		{ // GTA SA
			lspd: new serverClasses.interiorTemplateData(toVector3(247.113, 62.929, 1003.64), 2),
			lvpd: new serverClasses.interiorTemplateData(toVector3(288.82, 167.39, 1007.17), 3),
			sfpd: new serverClasses.interiorTemplateData(toVector3(246.40, 110.84, 1003.22), 10),
			reeceBarberShop: new serverClasses.interiorTemplateData(toVector3(411.62, -21.43, 1001.80), 2),
			fourDragons: new serverClasses.interiorTemplateData(toVector3(2016.26, 1017.77, 996.87), 10),
			caligula: new serverClasses.interiorTemplateData(toVector3(2233.8, 1712.23, 1011.76), 1),
			genericCasino: new serverClasses.interiorTemplateData(toVector3(1118.88, -10.27, 1002.08), 12),
			cluckinBell: new serverClasses.interiorTemplateData(toVector3(365.71, -9.88, 1001.85), 9),
			pizzaStack: new serverClasses.interiorTemplateData(toVector3(372.35, -131.65, 1001.49), 5),
			burgerShot: new serverClasses.interiorTemplateData(toVector3(363.41, -74.57, 1001.50), 10),
			tattooParlor: new serverClasses.interiorTemplateData(toVector3(-203.07, -24.16, 1002.27), 16),
			bank: new serverClasses.interiorTemplateData(toVector3(2305.14, -16.274, 26.74), 1),
			gas1: new serverClasses.interiorTemplateData(toVector3(-25.88, -185.86, 1003.54), 17),
			gas2: new serverClasses.interiorTemplateData(toVector3(6.09, -29.27, 1003.54), 10),
			gas3: new serverClasses.interiorTemplateData(toVector3(-30.94, -89.60, 1003.54), 18),
			gas4: new serverClasses.interiorTemplateData(toVector3(-25.13, -139.06, 1003.54), 16),
			gas5: new serverClasses.interiorTemplateData(toVector3(	-27.31, -29.27, 1003.54), 4),
			gas6: new serverClasses.interiorTemplateData(toVector3(-26.69, -55.71, 1003.54), 6),
			shamal: new serverClasses.interiorTemplateData(toVector3(2.38, 33.10, 1199.84), 1),
			andromeda: new serverClasses.interiorTemplateData(toVector3(315.85, 1024.49, 1949.79), 9),
			airportTickets: new serverClasses.interiorTemplateData(toVector3(-1827.14, 7.20, 1061.14), 14),
			airportBaggage: new serverClasses.interiorTemplateData(toVector3(-1855.56, 41.26, 1061.14), 14),
			ammu1: new serverClasses.interiorTemplateData(toVector3(286.14, -40.64, 1001.56), 1),
			ammu2: new serverClasses.interiorTemplateData(toVector3(286.80, -82.54, 1001.53), 4),
			ammu3: new serverClasses.interiorTemplateData(toVector3(296.91, -108.07, 1001.56), 6),
			ammu4: new serverClasses.interiorTemplateData(toVector3(314.82, -141.43, 999.66), 7),
			ammu5: new serverClasses.interiorTemplateData(toVector3(316.52, -167.70, 999.66), 6),
			ammuBooth: new serverClasses.interiorTemplateData(toVector3(302.29, -143.13, 1004.06), 7),
			ammuRange: new serverClasses.interiorTemplateData(toVector3(280.79, -135.20, 1004.06), 7),
			house1: new serverClasses.interiorTemplateData(toVector3(235.51, 1189.17, 1080.34), 3),
			house2: new serverClasses.interiorTemplateData(toVector3(225.76, 1240.00, 1082.15), 2),
			house3: new serverClasses.interiorTemplateData(toVector3(223.04, 1289.26, 1082.20), 1),
			house4: new serverClasses.interiorTemplateData(toVector3(225.63, 1022.48, 1084.07), 7),
			house5: new serverClasses.interiorTemplateData(toVector3(295.14, 1474.47, 1080.52), 15),
			house6: new serverClasses.interiorTemplateData(toVector3(328.49, 1480.59, 1084.45), 15),
			house7: new serverClasses.interiorTemplateData(toVector3(385.80, 1471.77, 1080.21), 15),
			atrium: new serverClasses.interiorTemplateData(toVector3(1726.18, -1641.00, 20.23), 18),
			crackPalace: new serverClasses.interiorTemplateData(toVector3(2,567.52, -1294.59, 1063.25), 2),
			bloodbowlStadium: new serverClasses.interiorTemplateData(toVector3(-1394.20, 987.62, 1023.96), 15),
			burningDesireHouse: new serverClasses.interiorTemplateData(toVector3(2338.32, -1180.61, 1027.98), 5),
			furhbergerHouse: new serverClasses.interiorTemplateData(toVector3(2807.63, -1170.15, 1025.57), 8),
			dillimoreGas: new serverClasses.interiorTemplateData(toVector3(664.19, -570.73, 16.34), 0),
			donutShop: new serverClasses.interiorTemplateData(toVector3(376.99, -191.21, 1000.63), 17),
			airport: new serverClasses.interiorTemplateData(toVector3(-1830.81, 16.83, 1061.14), 14),
			jeffersonMotel: new serverClasses.interiorTemplateData(toVector3(2220.26, -1,148.01, 1025.80), 15),
			kickstartStadium: new serverClasses.interiorTemplateData(toVector3(-1410.72, 1,591.16, 1052.53), 14),
			libertyCity: new serverClasses.interiorTemplateData(toVector3(-750.80, 491.00, 1371.70), 1),
			lsxBaggageReclaim: new serverClasses.interiorTemplateData(toVector3(-1870.80, 59.81, 1056.25), 14),
			jizzy: new serverClasses.interiorTemplateData(toVector3(-2637.69, 1404.24, 906.46), 3),
			rcBattlefield: new serverClasses.interiorTemplateData(toVector3(-1079.99, 1061.58, 1343.04), 10),
			ryderHouse: new serverClasses.interiorTemplateData(toVector3(2451.77, -1699.80, 1013.51), 2),
			sfGarage: new serverClasses.interiorTemplateData(toVector3(-2042.42, 178.59, 28.84), 1),
			sweetHouse: new serverClasses.interiorTemplateData(toVector3(2535.83, -1,674.32, 1015.50), 1),
			katieHouse: new serverClasses.interiorTemplateData(toVector3(267.22, 304.71, 999.14), 2),
			helenaHouse: new serverClasses.interiorTemplateData(toVector3(292.44, 308.77, 999.14), 3),
			welcomePump: new serverClasses.interiorTemplateData(toVector3(681.66, -453.32, -25.61), 1),
			woozieApartment: new serverClasses.interiorTemplateData(toVector3(-2158.72, 641.29, 1052.38), 1),
			eightTrackStadium: new serverClasses.interiorTemplateData(toVector3(-1395.96, -208.20, 1051.17), 7),
			dirtBikeStadium: new serverClasses.interiorTemplateData(toVector3(-1424.93, -664.59, 1059.86), 4),
			crackDen: new serverClasses.interiorTemplateData(toVector3(318.57, 1115.21, 1082.98), 5),
			motelRoom: new serverClasses.interiorTemplateData(toVector3(2251.85, -1138.16, 1050.63), 9),
			hashburyHouse: new serverClasses.interiorTemplateData(toVector3(2260.76, -1210.45, 1049.02), 10),
			cjHouse: new serverClasses.interiorTemplateData(toVector3(2496.65, -1696.55, 1014.74), 3),
			maddDoggMansion: new serverClasses.interiorTemplateData(toVector3(1299.14, -794.77, 1084.00), 5),
			motelRoom2: new serverClasses.interiorTemplateData(toVector3(2262.83, -1137.71, 1050.63), 10),
			safeHouse1: new serverClasses.interiorTemplateData(toVector3(2365.42, -1131.85, 1050.88), 8),
			safeHouse2: new serverClasses.interiorTemplateData(toVector3(2324.33, -1144.79, 1050.71), 12),
			zeroStore: new serverClasses.interiorTemplateData(toVector3(-2240.00, 131.00, 1035.40), 6),
			brothel1: new serverClasses.interiorTemplateData(toVector3(940.65, -18.48, 1000.93), 3),
			brothel2: new serverClasses.interiorTemplateData(toVector3(967.53, -53.02, 1001.12), 3),
			brothel3: new serverClasses.interiorTemplateData(toVector3(744.27, 1437.25, 1102.70), 6),
			prolapsStore: new serverClasses.interiorTemplateData(toVector3(207.35, -138.00, 1003.31), 3),
			victimStore: new serverClasses.interiorTemplateData(toVector3(221.33, -6.61, 1005.19), 5),
			suburbanStore: new serverClasses.interiorTemplateData(toVector3(203.81, -46.53, 1001.80), 1),
			sexShop: new serverClasses.interiorTemplateData(toVector3(-106.72, -19.64, 1000.71), 3),
			bincoStore: new serverClasses.interiorTemplateData(toVector3(207.54, -109.00, 1005.13), 15),
			wardrobe: new serverClasses.interiorTemplateData(toVector3(255.71, -41.13, 1002.02), 14),
		},

		{ // GTA UG

		},

		{ // GTA IV

		},
	],
	/*
	animations: [
		false,
		{
			itemDrop: new serverClasses.animationData(),
			itemPickup: new serverClasses.animationData(),
			itemUse: new serverClasses.animationData(),
			itemThrow: new serverClasses.animationData(),
			itemPut: new serverClasses.animationData(),
			itemTake: new serverClasses.animationData(),
			itemGiveTake: new serverClasses.animationData(),
			sit: new serverClasses.animationData(),
			stand: new serverClasses.animationData(),
			sitToStand: new serverClasses.animationData(),
			standToSit: new serverClasses.animationData(),
			standIdle: new serverClasses.animationData(),
			talk: new serverClasses.animationData(),
			wave: new serverClasses.animationData(),
			greet: new serverClasses.animationData(),
			handCuff: new serverClasses.animationData(),
			handsUp: new serverClasses.animationData(),
		},
		{
			itemDrop: new serverClasses.animationData(),
			itemPickup: new serverClasses.animationData(),
			itemUse: new serverClasses.animationData(),
			itemThrow: new serverClasses.animationData(),
			itemPut: new serverClasses.animationData(),
			itemTake: new serverClasses.animationData(),
			itemGiveTake: new serverClasses.animationData(),
			sit: new serverClasses.animationData(),
			stand: new serverClasses.animationData(),
			sitToStand: new serverClasses.animationData(),
			standToSit: new serverClasses.animationData(),
			standIdle: new serverClasses.animationData(),
			talk: new serverClasses.animationData(),
			wave: new serverClasses.animationData(),
			greet: new serverClasses.animationData(),
			handCuff: new serverClasses.animationData(),
			handsUp: new serverClasses.animationData(),
		},
		{
			itemDrop: new serverClasses.animationData(),
			itemPickup: new serverClasses.animationData(),
			itemUse: new serverClasses.animationData(),
			itemThrow: new serverClasses.animationData(),
			itemPut: new serverClasses.animationData(),
			itemTake: new serverClasses.animationData(),
			itemGiveTake: new serverClasses.animationData(),
			sit: new serverClasses.animationData(),
			stand: new serverClasses.animationData(),
			sitToStand: new serverClasses.animationData(),
			standToSit: new serverClasses.animationData(),
			standIdle: new serverClasses.animationData(),
			talk: new serverClasses.animationData(),
			wave: new serverClasses.animationData(),
			greet: new serverClasses.animationData(),
			handCuff: new serverClasses.animationData(),
			handsUp: new serverClasses.animationData(),
		},
		false,
		{
			itemDrop: new serverClasses.animationData(),
			itemPickup: new serverClasses.animationData(),
			itemUse: new serverClasses.animationData(),
			itemThrow: new serverClasses.animationData(),
			itemPut: new serverClasses.animationData(),
			itemTake: new serverClasses.animationData(),
			itemGiveTake: new serverClasses.animationData(),
			sit: new serverClasses.animationData(),
			stand: new serverClasses.animationData(),
			sitToStand: new serverClasses.animationData(),
			standToSit: new serverClasses.animationData(),
			standIdle: new serverClasses.animationData(),
			talk: new serverClasses.animationData(),
			wave: new serverClasses.animationData(),
			greet: new serverClasses.animationData(),
			handCuff: new serverClasses.animationData(),
			handsUp: new serverClasses.animationData(),
		}
	],
	tutorial: {
		spawnPosition: [
			false,
			new serverClasses.tutorialVehicleData(new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0),
			new serverClasses.tutorialVehicleData(new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0),
			new serverClasses.tutorialSpawnData(new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0),
			false,
			new serverClasses.tutorialVehicleData(new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0),
		],
		vehicle: [
			false,
			new serverClasses.tutorialVehicleData(111, new Vec3(0.0, 0.0, 0.0)),
			new serverClasses.tutorialVehicleData(175, new Vec3(0.0, 0.0, 0.0), 0.0),
			new serverClasses.tutorialVehicleData(445, new Vec3(0.0, 0.0, 0.0), 0.0),
			false,
			new serverClasses.tutorialVehicleData(0, new Vec3(0.0, 0.0, 0.0), 0.0),
		],
		item: [
			false,
			new serverClasses.tutorialItemData(new Vec3(0.0, 0.0, 0.0)),
			new serverClasses.tutorialItemData(new Vec3(0.0, 0.0, 0.0), 0.0),
			new serverClasses.tutorialItemData(new Vec3(0.0, 0.0, 0.0), 0.0),
			false,
			new serverClasses.tutorialItemData(new Vec3(0.0, 0.0, 0.0), 0.0),
		],
	}
	*/

};

// -------------------------------------------------------------------------

function initConfigScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Config]: Initializing config script ...");
	serverConfig = loadServerConfigFromGameAndPort(server.game, server.port);
	applyConfigToServer(serverConfig);
	logToConsole(LOG_DEBUG, "[Asshat.Config]: Config script initialized!");
}

// ---------------------------------------------------------------------------

function loadServerConfigFromGameAndPort(gameId, port) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_game = ${gameId} AND svr_port = ${port} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempServerConfigData = new serverClasses.serverConfigData(dbAssoc);
				freeDatabaseQuery(dbQuery);
				return tempServerConfigData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	return false;
}

// ---------------------------------------------------------------------------

function loadServerConfigFromId(tempServerId) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM svr_main WHERE svr_id = ${tempServerId} LIMIT 1;`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery);
				let tempServerConfigData = serverClasses.serverConfigData(dbAssoc);
				freeDatabaseQuery(dbQuery);
				return tempServerConfigData;
			}
		}
		disconnectFromDatabase(dbConnection);
	}
	return false;
}

// -------------------------------------------------------------------------

function applyConfigToServer(tempServerConfig) {
	server.name = tempServerConfig.name;
	server.password = tempServerConfig.password;
	gta.time.hour = tempServerConfig.hour;
	gta.time.minute = tempServerConfig.minute;
	gta.forceWeather(tempServerConfig.weather);

	updateServerRules();
}

// -------------------------------------------------------------------------

function saveServerConfigToDatabase(serverConfigData) {
	logToConsole(LOG_DEBUG, `[Asshat.Config]: Saving server ${serverConfigData.databaseId} configuration to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeServerName = escapeDatabaseString(dbConnection, serverConfigData.name);
		let safePassword = escapeDatabaseString(dbConnection, serverConfigData.password);

		let dbQueryString = `UPDATE svr_main SET svr_logo=${boolToInt(serverConfigData.showLogo)}, svr_gui=${boolToInt(getServerConfig().useGUI)}, svr_password='${safePassword}', svr_name='${safeServerName}', svr_start_time_hour=${serverConfigData.hour}, svr_start_time_min=${serverConfigData.minute}, svr_start_weather=${serverConfigData.weather}, svr_start_snow_falling=${boolToInt(serverConfigData.fallingSnow)}, svr_start_snow_ground=${boolToInt(serverConfigData.groundSnow)}, svr_newchar_pos_x=${serverConfigData.newCharacter.spawnPosition.x}, svr_newchar_pos_y=${serverConfigData.newCharacter.spawnPosition.y}, svr_newchar_pos_z=${serverConfigData.newCharacter.spawnPosition.z}, svr_newchar_rot_z=${serverConfigData.newCharacter.spawnHeading}, svr_newchar_money=${serverConfigData.newCharacter.money}, svr_newchar_skin=${serverConfigData.newCharacter.skin}, svr_gui_col1_r=${serverConfigData.guiColour[0]}, svr_gui_col1_g=${serverConfigData.guiColour[1]}, svr_gui_col1_b=${serverConfigData.guiColour[2]} WHERE svr_id = ${serverConfigData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		disconnectFromDatabase(dbConnection);
	}
	logToConsole(LOG_DEBUG, `[Asshat.Config]: Server ${serverConfigData.databaseId} configuration saved to database!`);
}

// -------------------------------------------------------------------------

function getServerConfig() {
	return serverConfig;
}

// -------------------------------------------------------------------------

function getGameConfig() {
	return gameConfig;
}

// -------------------------------------------------------------------------

function getGlobalConfig() {
	return globalConfig;
}

// -------------------------------------------------------------------------

function getServerId() {
	return getServerConfig().databaseId;
}

// -------------------------------------------------------------------------

function setTimeCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let hour = toInteger(splitParams[0]) || 0;
	let minute = toInteger(splitParams[1]) || 0;

	if(hour > 23 || hour < 0) {
		messagePlayerError(client, "The hour must be between 0 and 23!");
		return false;
    }

	if(minute > 59 || minute < 0) {
		messagePlayerError(client, "The minute must be between 0 and 59!");
		return false;
    }

    gta.time.hour = hour;
    gta.time.minute = minute;

	messageAdminAction(`${client.name} set the time to ${makeReadableTime(hour, minute)}`);
	return true;
}


// -------------------------------------------------------------------------

function setMinuteDurationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let minuteDuration = toInteger(params) || 60000;
	getServerConfig().minuteDuration = minuteDuration;
	setTimeMinuteDuration(null, minuteDuration);

	messageAdminAction(`${client.name} set the minute duration to ${minuteDuration}ms`);
	return true;
}

// ---------------------------------------------------------------------------

function setWeatherCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
	let weatherId = getWeatherFromParams(splitParams[0]);

	if(!weatherId) {
		messagePlayerError(client, `That weather ID or name is invalid!`);
		return false;
    }

    gta.forceWeather(toInteger(weatherId));
	getServerConfig().weather = weatherId;

    messageAdminAction(`${client.name} set the weather to [#AAAAAA]${getGameData().weatherNames[getServerGame()][toInteger(weatherId)]}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function setSnowingCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split();
    let fallingSnow = intToBool(toInteger(splitParams[0]) || 0) || !getServerConfig().fallingSnow;
	let groundSnow = intToBool(toInteger(splitParams[1]) || 0) || !getServerConfig().groundSnow;

	getServerConfig().fallingSnow = fallingSnow;
	getServerConfig().groundSnow = groundSnow;

	updatePlayerSnowState(null);

    messageAdminAction(`${client.name} turned falling snow ${getBoolRedGreenInlineColour(fallingSnow)}${getOnOffFromBool(fallingSnow)} [#FFFFFF]and ground snow ${getBoolRedGreenInlineColour(groundSnow)}${getOnOffFromBool(groundSnow)}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function toggleServerLogoCommand(command, params, client) {
	getServerConfig().useLogo = !getServerConfig().useLogo;

	updatePlayerShowLogoState(null, getServerConfig().useLogo);

    messageAdminAction(`${client.name} turned the server logo image ${getBoolRedGreenInlineColour(getServerConfig().useLogo)}${toUpperCase(getOnOffFromBool(getServerConfig().useLogo))}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function toggleAntiCheatScriptWhitelist(command, params, client) {
	getServerConfig().antiCheat.gameScriptWhiteListEnabled = !getServerConfig().antiCheat.gameScriptWhiteListEnabled;

	updatePlayerShowLogoState(null, getServerConfig().antiCheat.gameScriptWhiteListEnabled);

    messageAdminAction(`${client.name} turned anticheat game script whitelist ${getBoolRedGreenInlineColour(getServerConfig().antiCheat.gameScriptWhiteListEnabled)}${toUpperCase(getOnOffFromBool(getServerConfig().antiCheat.gameScriptWhiteListEnabled))}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function toggleAntiCheatScriptBlacklist(command, params, client) {
	getServerConfig().antiCheat.gameScriptBlackListEnabled = !getServerConfig().antiCheat.gameScriptBlackListEnabled;

	updatePlayerShowLogoState(null, getServerConfig().antiCheat.gameScriptBlackListEnabled);

    messageAdminAction(`${client.name} turned anticheat game script blacklist ${getBoolRedGreenInlineColour(getServerConfig().antiCheat.gameScriptBlackListEnabled)}${toUpperCase(getOnOffFromBool(getServerConfig().antiCheat.gameScriptBlackListEnabled))}`);
    updateServerRules();
	return true;
}

// ---------------------------------------------------------------------------

function toggleServerGUICommand(command, params, client) {
    getServerConfig().useGUI = !getServerConfig().useGUI;

    messageAdminAction(`${client.name} turned GUI ${toLowerCase(getOnOffFromBool(getServerConfig().useGUI))} for this server`);
    updateServerRules();
	return true;
}

// -------------------------------------------------------------------------
