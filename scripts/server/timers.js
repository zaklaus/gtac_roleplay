// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: timers.js
// DESC: Provides timer functions and features
// TYPE: Server (JavaScript)
// ===========================================================================

let serverTimers = {};

// ===========================================================================

function updateTimeRule() {
	server.setRule("Time", makeReadableTime(gta.time.hour, gta.time.minute));
}

// ===========================================================================

function saveAllServerDataToDatabase() {
	logToConsole(LOG_DEBUG, "[VRR.Utilities]: Saving all server data to database ...");
	saveAllClientsToDatabase();
	saveAllClansToDatabase();
	saveAllHousesToDatabase();
	saveAllBusinessesToDatabase();
	saveServerConfigToDatabase(getServerConfig());
	saveAllVehiclesToDatabase();
	saveAllItemsToDatabase();
	logToConsole(LOG_DEBUG, "[VRR.Utilities]: Saved all server data to database!");
}

// ===========================================================================

function initTimers() {
	//if(!isDevelopmentServer()) {
		serverTimers.saveDataIntervalTimer = setInterval(saveAllServerDataToDatabase, 600000);
		serverTimers.updateTimeRuleTimer = setInterval(updateTimeRule, 1000);
		serverTimers.updatePingsTimer = setInterval(updatePings, 5000);
		serverTimers.vehicleRentTimer = setInterval(vehicleRentCheck, 60000);
		serverTimers.garbageCollectorTimer = setInterval(collectAllGarbage, 60000);
		serverTimers.payDayTimer = setInterval(checkPayDays, 30000);
	//}
}

// ===========================================================================

function vehicleRentCheck() {
	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i] != null) {
			if(getServerData().vehicles[i].rentPrice > 0) {
				if(getServerData().vehicles[i].rentedBy) {
					let rentedBy = getServerData().vehicles[i].rentedBy;
					if(getPlayerCurrentSubAccount(rentedBy).cash < getServerData().vehicles[i].rentPrice) {
						messagePlayerAlert(rentedBy, `You do not have enough money to continue renting this vehicle!`);
						stopRentingVehicle(rentedBy);
					} else {
						takePlayerCash(rentedBy, getServerData().vehicles[i].rentPrice);
					}
				}
			}
		}
	}
}

// ===========================================================================

function updatePings() {
	let clients = getClients();
	for(let i in clients) {
		if(!clients[i].console) {
			updatePlayerPing(clients[i]);
		}
	}
}

// ===========================================================================

function checkPayDays() {
	let clients = getClients();
	for(let i in clients) {
		if(isPlayerLoggedIn(clients[i]) && isPlayerSpawned(clients[i])) {
			if(sdl.ticks-getPlayerData(clients[i]).payDayTickStart >= getGlobalConfig().payDayTickCount) {
				getPlayerData(clients[i]).payDayStart = sdl.ticks;
				playerPayDay(clients[i]);
			}
		}
	}
}

// ===========================================================================