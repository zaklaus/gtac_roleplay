// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: timers.js
// DESC: Provides timer functions and features
// TYPE: Server (JavaScript)
// ===========================================================================

let serverTimers = {};

// ---------------------------------------------------------------------------

function updateTimeRule() {
	server.setRule("Time", makeReadableTime(gta.time.hour, gta.time.minute));
}

// ---------------------------------------------------------------------------

function saveAllServerDataToDatabase() {
	logToConsole(LOG_DEBUG, "[Asshat.Utilities]: Saving all server data to database ...");
	saveAllClansToDatabase();
	saveAllHousesToDatabase();
	saveAllBusinessesToDatabase();
	saveServerConfigToDatabase(getServerConfig());
	saveAllVehiclesToDatabase();
	saveAllClientsToDatabase();
	logToConsole(LOG_DEBUG, "[Asshat.Utilities]: Saved all server data to database!");
}

// ---------------------------------------------------------------------------

function initTimers() {
	if(!isDevelopmentServer()) {
		serverTimers.saveDataIntervalTimer = setInterval(saveAllServerDataToDatabase, 600000);
		serverTimers.updateTimeRuleTimer = setInterval(updateTimeRule, 1000);
		serverTimers.updatePingsTimer = setInterval(updatePings, 5000);
		serverTimers.vehicleRentTimer = setInterval(vehicleRentCheck, 60000);
		serverTimers.garbageCollectorTimer = setInterval(collectAllGarbage, 60000);
	}
}

// ---------------------------------------------------------------------------

function vehicleRentCheck() {
	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i] != null) {
			if(getServerData().vehicles[i].rentPrice > 0) {
				if(getServerData().vehicles[i].rentedBy) {
					let rentedBy = getServerData().vehicles[i].rentedBy;
					if(getPlayerData(rentedBy).cash < getServerData().vehicles[i].rentPrice) {
						messagePlayerAlert(rentedBy, `You do not have enough money to continue renting this vehicle!`);
						stopRentingVehicle(rentedBy);
					} else {
						getPlayerData(rentedBy).cash -= getServerData().vehicles[i].rentPrice;
					}
				}
			}
		}
	}
}

// ---------------------------------------------------------------------------

function updatePings() {
	let clients = getClients();
	for(let i in clients) {
		if(!clients[i].console) {
			updatePlayerPing(clients[i]);
		}
	}
}

// ---------------------------------------------------------------------------