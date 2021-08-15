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
	if(isTimeSupported()) {
		server.setRule("Time", makeReadableTime(gta.time.hour, gta.time.minute));
	}
}

// ===========================================================================

function saveAllServerDataToDatabase() {
	if(getServerConfig().pauseSavingToDatabase) {
		return false;
	}

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
		//serverTimers.updateTimeRuleTimer = setInterval(updateTimeRule, 60000);
		serverTimers.updatePingsTimer = setInterval(updatePings, 5000);
		serverTimers.vehicleRentTimer = setInterval(vehicleRentCheck, 60000);
		serverTimers.garbageCollectorTimer = setInterval(collectAllGarbage, 60000);
		serverTimers.payDayTimer = setInterval(checkPayDays, 1800000);
		serverTimers.randomTipTimer = setInterval(showRandomTipToAllPlayers, 600000);
		serverTimers.gameTime = setInterval(checkServerGameTime, 60000);
	//}
}

// ===========================================================================

function vehicleRentCheck() {
	for(let i in getServerData().vehicles) {
		if(getServerData().vehicles[i] != null) {
			if(getServerData().vehicles[i].rentPrice > 0) {
				if(getServerData().vehicles[i].rentedBy != false) {
					let rentedBy = getServerData().vehicles[i].rentedBy;
					if(getPlayerData(rentedBy) != false) {
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
}

// ===========================================================================

function updatePings() {
	let clients = getClients();
	for(let i in clients) {
		if(!clients[i].console) {
			updatePlayerPing(clients[i]);
			if(isPlayerSpawned(clients[i])) {
				updatePlayerCash(clients[i]);
			}
		}
	}
}

// ===========================================================================

function checkServerGameTime() {
	if(getServerConfig().minute >= 59) {
		getServerConfig().minute = 0;
		if(getServerConfig().hour >= 23) {
			getServerConfig().hour = 0;
		} else {
			getServerConfig().hour = getServerConfig().hour + 1;
		}
	} else {
		getServerConfig().minute = getServerConfig().minute + 1;
	}

	updateTimeRule();
}

// ===========================================================================

function checkPayDays() {
	let clients = getClients();
	for(let i in clients) {
		if(isPlayerLoggedIn(clients[i]) && isPlayerSpawned(clients[i])) {
			//if(sdl.ticks-getPlayerData(clients[i]).payDayTickStart >= getGlobalConfig().payDayTickCount) {
				getPlayerData(clients[i]).payDayStart = sdl.ticks;
				playerPayDay(clients[i]);
			//}
		}
	}
}

// ===========================================================================

function showRandomTipToAllPlayers() {
	let tipId = getRandom(0, randomTips.length-1);

	let clients = getClients();
	for(let i in clients) {
		if(isPlayerLoggedIn(clients[i]) && isPlayerSpawned(clients[i])) {
			messagePlayerTimedRandomTip(clients[i], randomTips[tipId]);
		}
	}
}

// ===========================================================================