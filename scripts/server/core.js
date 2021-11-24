// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: core.js
// DESC: Provides core data structures, function, and operations
// TYPE: Server (JavaScript)
// ===========================================================================

let scriptVersion = "1.0";
let serverStartTime = 0;
let logLevel = LOG_ERROR|LOG_WARN|LOG_INFO;

// ===========================================================================

let serverData = {
	vehicles: [],
	clients: new Array(128),
	businesses: [],
	houses: [],
	factions: [],
	commands: {},
	groundItemCache: [],
	groundPlantCache: [],
	items: [],
	itemTypes: [],
	clans: [],
	antiCheat: {
		whiteListedGameScripts: [],
		blackListedGameScripts: [],
	},
	localeStrings: {},
	jobRankNames: [
		[
			"Police Officer I",
			"Detective",
			"Sergeant",
			"Lieutenant",
			"Captain",
			"Chief of Police",
		],
		[
			"Paramedic",
			"Senior Paramedic",
			"Lieutenant",
			"Lieutenant",
			"Captain",
			"Chief of Department",
		],
		[
			"Firefighter",
			"Senior Firefighter",
			"Fire Marshal",
			"Captain",
			"Chief of Department",
		]
	]
};

// ===========================================================================

// Pre-cache allowed skins
let allowedSkins = getAllowedSkins(getGame());

// ===========================================================================

function initServerData() {
	// Pre-allocate translation cache language slots
	//getServerData().translation.cache = new Array(getServerData().translation.languages.length);
	//let translationCacheFrom = new Array(getServerData().translation.languages.length);
	//translationCacheFrom.fill([]);
	//getServerData().translation.cache.fill(translationCacheFrom);
}

// ===========================================================================

function getServerData() {
	return serverData;
}

// ===========================================================================

function getModNatives() {
	return modNatives;
}

// ===========================================================================