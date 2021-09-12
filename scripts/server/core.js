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
let logLevel = LOG_DEBUG;

// ===========================================================================

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
};

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