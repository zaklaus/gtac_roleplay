// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: core.js
// DESC: Provides core data structures, function, and operations
// TYPE: Server (JavaScript)
// ===========================================================================

let scriptVersion = "1.0";
let serverStartTime = 0;
let logLevel = LOG_ALL;

// -------------------------------------------------------------------------

let serverData = {
	vehicles: [],
	clients: new Array(128),
	businesses: [],
	houses: [],
	families: [],
	factions: [],
	commands: {},
	groundItemCache: [],
	items: [],
	itemTypes: [],
	clans: [],
	antiCheat: {
		whiteListedGameScripts: [],
		blackListedGameScripts: [],
	},
	policeStations: [
		false,
		[	// GTA 3
			{
				position: toVector3(1143.875, -675.1875, 14.97),
				heading: 1.5,
				blip: false,
				name: "Portland",
			},
			{
				position: toVector3(340.25, -1123.375, 25.98),
				heading: 3.14,
				blip: false,
				name: "Staunton Island",
			},
			{
				position: toVector3(-1253.0, -138.1875, 58.75),
				heading: 1.5,
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC
			{
				position: toVector3(399.77, -468.90, 11.73),
				heading: 0.0,
				blip: false,
				name: "Washington Beach",
			},
			{
				position: toVector3(508.96, 512.07, 12.10),
				heading: 0.0,
				blip: false,
				name: "Vice Point",
			},
			{
				position: toVector3(-657.43, 762.31, 11.59),
				heading: 0.0,
				blip: false,
				name: "Downtown",
			},
			{
				position: toVector3(-885.08, -470.44, 13.11),
				heading: 0.0,
				blip: false,
				name: "Little Havana",
			},
		],
		[	// GTA SA
			{
				position: toVector3(1545.53, -1675.64, 13.561),
				heading: -1.575,
				blip: false,
				name: "Los Santos",
			},

		],
		[	// GTA UG

		],
		[	// GTA IV

			{
				position: toVector3(894.99, -357.39, 18.185),
				heading: 2.923,
				blip: false,
				name: "Broker",
			},
			{
				position: toVector3(435.40, 1592.29, 17.353),
				heading: 3.087,
				blip: false,
				name: "South Bohan",
			},
			{
				position: toVector3(974.93, 1870.45, 23.073),
				heading: -1.621,
				blip: false,
				name: "Northern Gardens",
			},
			{
				position: toVector3(1233.25, -89.13, 28.034),
				heading: 1.568,
				blip: false,
				name: "South Slopes",
			},
			{
				position: toVector3(50.12, 679.88, 15.316),
				heading: 1.569,
				blip: false,
				name: "Middle Park East",
			},
			{
				position: toVector3(85.21, 1189.82, 14.755),
				heading: 3.127,
				blip: false,
				name: "East Holland",
			},
			{
				position: toVector3(2170.87, 448.87, 6.085),
				heading: 1.501,
				blip: false,
				name: "Francis International Airport",
			},
			{
				position: toVector3(213.12, -211.70, 10.752),
				heading: 0.200,
				blip: false,
				name: "Chinatown",
			},
			{
				position: toVector3(-1714.95, 276.31, 22.134),
				heading: 1.127,
				blip: false,
				name: "Acter",
			},
			{
				position: toVector3(-1220.73, -231.53, 3.024),
				heading: 2.210,
				blip: false,
				name: "Port Tudor",
			},
			{
				position: toVector3(-927.66, 1263.63, 24.587),
				heading: -0.913,
				blip: false,
				name: "Leftwood",
			},
		]
	],
	fireStations: [
		false,
		[	// GTA 3
			{
				position: toVector3(1103.70, -52.45, 7.49),
				heading: 1.5,
				blip: false,
				name: "Portland",
			},
			{
				position: toVector3(-78.48, -436.80, 16.17),
				heading: 3.14,
				blip: false,
				name: "Staunton Island",
			},
			{
				position: toVector3(-1202.10, -14.67, 53.20),
				heading: 1.5,
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG

		],
		[	// GTA IV
			{
				position: toVector3(953.13, 95.90, 35.004),
				heading: 1.595,
				blip: false,
				name: "Broker",
			},
			{
				position: toVector3(-271.02, 1542.15, 20.420),
				heading: -1.160,
				blip: false,
				name: "Northwood",
			},
			{
				position: toVector3(1120.47, 1712.36, 10.534),
				heading: -0.682,
				blip: false,
				name: "Northern Gardens",
			},
			{
				position: toVector3(2364.87, 166.83, 5.813),
				heading: 0.156,
				blip: false,
				name: "Francis International Airport",
			},
			{
				position: toVector3(295.40, -336.88, 4.963),
				heading: 2.887,
				blip: false,
				name: "Chinatown",
			},
		]
	],
	hospitals: [
		false,
		[	// GTA 3
			{
				position: toVector3(1144.25, -596.875, 14.97),
				heading: 1.5,
				blip: false,
				name: "Portland",
			},
			{
				position: toVector3(183.5, -17.75, 16.21),
				heading: 3.14,
				blip: false,
				name: "Staunton Island",
			},
			{
				position: toVector3(-1259.5, -44.5, 58.89),
				heading: 1.5,
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC
			{
				position: toVector3(493.14, 709.31, 11.80),
				heading: 1.5,
				blip: false,
				name: "Unknown",
			},
			{
				position: toVector3(-826.06, 1144.41, 12.41),
				heading: 1.5,
				blip: false,
				name: "Unknown",
			},
		],
		[	// GTA SA
			{
				position: toVector3(1172.96, -1323.42, 15.40),
				heading: 1.5,
				blip: false,
				name: "All Saints",
			},
			{
				position: toVector3(2034.04, -1405.07, 17.24),
				heading: 1.5,
				blip: false,
				name: "County General",
			},
		],
		[	// GTA UG

		],
		[	// GTA IV
			{
				position: toVector3(1199.59, 196.78, 33.554),
				heading: 1.633,
				blip: false,
				name: "Schottler",
			},
			{
				position: toVector3(980.71, 1831.61, 23.898),
				heading: -0.049,
				blip: false,
				name: "Northern Gardens",
			},
			{
				position: toVector3(-1317.27, 1277.20, 22.370),
				heading: 2.246,
				blip: false,
				name: "Leftwood",
			},
			{
				position: toVector3(-1538.43, 344.58, 20.943),
				heading: -0.156,
				blip: false,
				name: "Acter",
			},
		]
	],
	payAndSprays: [
		false,
		[	// GTA 3
			{
				position: toVector3(925.4, -360.3, 10.83),
				blip: false,
				name: "Portland",
			},
			{
				position: toVector3(381.8, -493.8, 25.95),
				blip: false,
				name: "Staunton Island",
			},
			{
				position: toVector3(-1142.4, 35.01, 58.61),
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG

		],
		[	// GTA IV

		]
	],

	ammunations: [
		false,
		[	// GTA 3
			{
				position: toVector3(1068.3, -400.9, 15.24),
				blip: false,
				name: "Portland",
			},
			{
				position: toVector3(348.2, -717.9, 26.43),
				blip: false,
				name: "Staunton Island",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG

		],
		[	// GTA IV

		]
	],
	fuelStations: [
		false,
		[	// GTA 3

			{
				position: toVector3(1161.9, -76.73, 7.27),
				blip: false,
				name: "Portland",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG

		],
		[	// GTA IV

		]
	],
};

// -------------------------------------------------------------------------

function initServerData() {
	// Pre-allocate translation cache language slots
	global.getServerData().translation.cache = new Array(global.getServerData().translation.languages.length);
	let translationCacheFrom = new Array(global.getServerData().translation.languages.length);
	translationCacheFrom.fill([]);
	global.getServerData().translation.cache.fill(translationCacheFrom);
}

// -------------------------------------------------------------------------

function getServerData() {
	return serverData;
}

// -------------------------------------------------------------------------

function getModNatives() {
	return modNatives;
}

// -------------------------------------------------------------------------