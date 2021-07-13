// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: utilities.js
// DESC: Provides util functions and arrays with data
// TYPE: Server (JavaScript)
// ===========================================================================

let disconnectReasons = [
	"Lost Connection",
	"Disconnected",
	"Unsupported Client",
	"Wrong Game",
	"Incorrect Password",
	"Unsupported Executable",
	"Disconnected",
	"Banned",
	"Failed",
	"Invalid Name",
	"Crashed"
];

// ===========================================================================

let weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

// ===========================================================================

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

// ===========================================================================

let cardinalDirections = [
	"North",
	"Northeast",
	"East",
	"Southeast",
	"South",
	"Southwest",
	"West",
	"Northwest",
	"Unknown"
];

// ===========================================================================

function getCardinalDirectionName(cardinalDirectionId) {
	let cardinalDirections = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest", "Unknown" ];
	return cardinalDirections[cardinalDirectionId];
}

// ===========================================================================

function getWeekDayName(weekdayId) {
	let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	return weekdayNames[weekdayId];
}

// ===========================================================================

function getMonthName(monthId) {
	let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[monthId];
}

// ===========================================================================

function getWeaponModelId(weaponId) {
	let weaponModels = [
		[ 0 , 172 , 173 , 178 , 176 , 171 , 180 , 177 , 175 , 181 , 174 , 170 ],
		[],
	];
	return weaponModels[getServerGame()][weaponId];
}

// ===========================================================================

function getIsland(position) {
    if(getServerGame() == GAME_GTA_III) {
		if(position.x > 616) {
			return VRR_ISLAND_PORTLAND;
		} else if(position.x < -283) {
			return VRR_ISLAND_SHORESIDEVALE;
		}
		return VRR_ISLAND_STAUNTON;
	} else {
		return VRR_ISLAND_NONE;
	}

	//return gta.getIslandFromPosition(position);
}

// ===========================================================================

function openAllGarages() {

}

// ===========================================================================

function closeAllGarages() {

}

// ===========================================================================

function replaceEmojiIntoString(message) {
	for(let i in emojiReplaceString) {
		message = message.replace(emojiReplaceString[i][0], emojiReplaceString[i][1]);
	}
	return message;
}

// ===========================================================================

function makeReadableTime(hour, minute) {
	let hourStr = toString(hour);
	let minuteStr = toString(minute);
	let meridianStr = "AM";

	if(hour < 10) {
		hourStr = "0" + toString(hour);
		meridianStr = "AM";
	}

	if(hour > 12) {
		let actualHour = hour-12;
		if(actualHour < 10) {
			hourStr = "0" + toString(hour-12);
		} else {
			hourStr = toString(hour-12);
		}
		meridianStr = "PM";
	}

	if(minute < 10) {
		minuteStr = "0" + toString(minute);
	}

	return hourStr + ":" + minuteStr + " " + meridianStr;
}

// ===========================================================================

function getClosestVehicle(position) {
	let vehicles = getServerData().vehicles;
	let closest = 0;
	for(let i in vehicles) {
		if(getDistance(getVehiclePosition(vehicles[i].vehicle), position) < getDistance(getVehiclePosition(vehicles[closest].vehicle), position)) {
			closest = i;
		}
	}
	return vehicles[closest].vehicle;
}

// ===========================================================================

function getClosestElementByType(elementType, position) {
	return getElementsByType(elementType).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ===========================================================================

function getClosestJobLocation(position) {
	let closestJobLocation = false;
	for(let i in getServerData().jobs) {
		for(let j in getServerData().jobs[i].locations) {
			if(!closestJobLocation || getServerData().jobs[i].locations[j].position.distance(position) < closestJobLocation.position.distance(position)) {
				closestJobLocation = getServerData().jobs[i].locations[j];
			}
		}
	}
	return closestJobLocation;
}

// ===========================================================================

function getJobIndex(jobData) {
	return getServerData().jobs.indexOf(jobData);
}

// ===========================================================================

function getJobPointsInRange(position, distance) {
	return getServerData().jobs[getServerGame()].filter(x => x.position.distance(position) <= distance);
}

// ===========================================================================

function getWeaponName(weapon) {
	return weaponNames[getServerGame()][weapon];
}

// ===========================================================================

function isParamsInvalid(params) {
	if(params == null) {
		return true;
	}

	if(params == "") {
		return true;
	}

	if(params.length == 0) {
		return true;
	}

	return false;
}

// ===========================================================================

function doesWordStartWithVowel(word) {
	switch(toLowerCase(word.substr(0,1))) {
		case "a":
		case "e":
		case "i":
		case "o":
		case "u":
			return true;

		default:
			return false;
	}

	return false;
}

// ===========================================================================

function replaceEmojiIntoString(message) {
	for(let i in emojiReplaceString) {
		while(message.indexOf(emojiReplaceString[i][0]) != -1) {
			message = message.replace(emojiReplaceString[i][0], emojiReplaceString[i][1]);
		}
	}
	return message;
}

// ===========================================================================

function getClientFromName(clientName) {
	let clients = getClients();
	for(let i in clients) {
		if(toLowerCase(clients[i].name).indexOf(toLowerCase(clientName)) != -1) {
			return clients[i];
		}

		let charName = `${getPlayerCurrentSubAccount(clients[i]).firstName} ${getPlayerCurrentSubAccount(clients[i]).lastName}`;
		if(toLowerCase(charName).indexOf(toLowerCase(clientName)) != -1) {
			return clients[i];
		}
	}

	return false;
}

// ===========================================================================

function getClientFromPlayer(player) {
	let clients = getClients();
	for(let i in clients) {
		if(clients[i].player == player) {
			return clients[i];
		}
	}

	return false;
}

// ===========================================================================

function killDeathRatio(kills, deaths) {
	if(deaths == 0 || kills == 0) {
		return 0.0;
	}
	return Float((iKills*100/iDeaths) * 0.01);
}

// ===========================================================================

function getCardinalDirection(pos1, pos2) {
	let a = pos1.x - pos2.x;
	let b = pos1.y - pos2.y;
	let c = pos1.z - pos2.z;

	let x = Math.abs(a);
	let y = Math.abs(b);
	let z = Math.abs(c);

	let no = 0;
	let ne = 1;
	let ea = 2;
	let se = 3;
	let so = 4;
	let sw = 5;
	let we = 6;
	let nw = 7;
	let na = 8;

	if(b < 0 && a < 0){
		if(x < (y/2)){
			return no;
		} else if(y < (x/2)){
			return ea;
		} else {
			return ne;
		}
	} else if(b < 0 && a >= 0){
		if(x < (y/2)){
			return no;
		} else if(y < (x/2)){
			return we;
		} else {
			return nw;
		}
	} else if(b >= 0 && a >= 0){
		if(x < (y/2)){
			return so;
		} else if(y < (x/2)){
			return we;
		} else {
			return sw;
		}
	} else if(b >= 0 && a < 0){
		if(x < (y/2)){
			return so;
		} else if(y < (x/2)){
			return ea;
		} else {
			return se;
		}
	} else {
		return na;
	}
	return na;
}

// ===========================================================================

function getTimeDifferenceDisplay(timeStamp2, timeStamp1) {
    if(isNaN(timeStamp1) || isNaN(timeStamp2)) {
        return "Unknown";
    }

	let millisecondDiff = timeStamp2 - timeStamp1;

    let days = Math.floor(millisecondDiff / 1000 / 60 / (60 * 24));
    let diffDate = new Date(millisecondDiff);

    return `${days} days, ${diffDate.getHours()} hours, ${diffDate.getMinutes()} minutes`;
}

// ===========================================================================

function getVehiclesInRange(position, range) {
	let vehicles = getVehicles();
	let inRangeVehicles = [];
	for(let i in vehicles) {
		if(getDistance(position, vehicles[i].position) <= range) {
			inRangeVehicles.push(vehicles[i]);
		}
	}
	return inRangeVehicles;
}

// ===========================================================================

function getPlayersInRange(position, range) {
	let clients = getClients();
	let inRangePlayers = [];
	for(let i in clients) {
		if(isPlayerSpawned(clients[i])) {
			if(getDistance(position, getPlayerPosition(clients[i])) <= range) {
				inRangePlayers.push(clients[i]);
			}
		}
	}
	return inRangePlayers;
}

// ===========================================================================

function getCiviliansInRange(position, range) {
	let peds = getPeds();
	let inRangeCivilians = [];
	for(let i in peds) {
		if(peds[i].isType(ELEMENT_PED)) {
			if(getDistance(position, peds[i].position) <= range) {
				inRangeCivilians.push(peds[i]);
			}
		}
	}
	return inRangeCivilians;
}

// ===========================================================================

function getFileData(filePath) {
	let file = openFile(filePath, false);
	if(!file) {
		return false;
	}
	let fileData = file.readBytes(file.length);
	file.close();
	return fileData;
}

// ===========================================================================

function setFileData(filePath, fileData) {
	let file = openFile(filePath, true);
	if(!file) {
		return false;
	}
	file.writeBytes(fileData, fileData.length);
	file.close();
	return true;
}

// ===========================================================================

function is2dPositionOnScreen(pos2d) {
	return pos2d.x >= 0 && pos2d.y >= 0 && pos2d.x <= game.width && pos2d.y <= game.height;
}

// ===========================================================================

function breakText(text, maxLength) {
	let lines = [];
	let j = Math.floor(text.length / maxLength);

	for(let i = 0; i < j; i++) {
		lines.push(text.substr(i*maxLength,maxLength));
	}

	let line = text.substr(j*maxLength, text.length % maxLength);
	if(line.length > 0) {
		lines.push(line);
	}

	return lines;
}

// ===========================================================================

function getSpeedFromVelocity(vel) {
	return Math.sqrt(vel.x*vel.x + vel.y*vel.y + vel.z*vel.z);
}

// ===========================================================================

function isValidSkin(skin, game = GAME_GTA_III) {
	if(game == GAME_GTA_III) {
		return true;
	} else if(game == GAME_GTA_VC) {
		switch(skin) {
			case 111:
				return false;

			default:
				return true;
		}
	}
}

// ===========================================================================

function getPositionArea(position) {
	if(typeof position == "Vec3") {
		position = vec3ToVec2(position);
	}

	let gameAreas = getGameAreas(getServerGame());
	for(let i in gameAreas) {
		if(isPositionInArea(position, gameAreas[i][1])) {
			return i;
		}
	}

	return false;
}

// ===========================================================================

function getAreaName(position) {
	let areaId = getPositionArea(position);
	if(!areaId) {
		return false;
	}

	return getGameAreas()[areaId][0];
}

// ===========================================================================

function getGameAreas(gameId) {
	return gameAreas[gameId];
}

// ===========================================================================

function getPlayerData(client) {
	if(client != null) {
		return getServerData().clients[client.index];
	}
	return false;
}

// ===========================================================================

function createAllPoliceStationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].policeStation != -1) {
		for(let i in getServerData().policeStations[getServerGame()]) {
			getServerData().policeStations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].policeStation, getServerData().policeStations[getServerGame()][i].position);
		}
	}
}

// ===========================================================================

function createAllFireStationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].fireStation != -1) {
		for(let i in getServerData().fireStations[getServerGame()]) {
			getServerData().fireStations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].fireStation, getServerData().fireStations[getServerGame()][i].position);
		}
	}
}

// ===========================================================================

function createAllHospitalBlips() {
	if(getGameConfig().blipSprites[getServerGame()].hospital != -1) {
		for(let i in getServerData().hospitals[getServerGame()]) {
			getServerData().hospitals[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].hospital, getServerData().hospitals[getServerGame()][i].position);
		}
	}
}

// ===========================================================================

function createAllAmmunationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].ammunation != -1) {
		for(let i in getServerData().ammunations[getServerGame()]) {
			getServerData().ammunations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].ammunation, getServerData().ammunations[getServerGame()][i].position);
		}
	}
}

// ===========================================================================

function createAllPayAndSprayBlips() {
	if(getGameConfig().blipSprites[getServerGame()].payAndSpray != -1) {
		for(let i in getServerData().payAndSprays[getServerGame()]) {
			getServerData().payAndSprays[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].payAndSpray, getServerData().payAndSprays[getServerGame()][i].position);
		}
	}
}

// ===========================================================================

function createAllFuelStationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].fuelStation != -1) {
		for(let i in getServerData().fuelStations[getServerGame()]) {
			getServerData().fuelStations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].fuelStation, getServerData().fuelStations[getServerGame()][i].position, 2, getColourByName("burntOrange"));
		}
	}
}

// ===========================================================================

// ===========================================================================

function getPickupOwnerType(pickup) {
	return pickup.getData("ag.ownerType");
}

// ===========================================================================

function getPickupOwnerId(pickup) {
	return pickup.getData("ag.ownerId");
}

// ===========================================================================

function canPlayerUsePoliceJob(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.policeBanned) {
		return false;
	}

	return true;
}

// ===========================================================================

function canClientUseFireJob(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.fireBanned) {
		return false;
	}

	return true;
}

// ===========================================================================

function canClientUseAmmunations(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.ammuBanned) {
		return false;
	}

	return true;
}

// ===========================================================================

function canClientUseGuns(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.gunBanned) {
		return false;
	}

	return true;
}

// ===========================================================================

function intToBool(intVal) {
	return (intVal == 1) ? true : false;
}

// ===========================================================================

function boolToInt(boolVal) {
	return (boolVal) ? 1 : 0;
}

// ===========================================================================

function sendAllBlips(client) {
	sendAllPoliceStationBlips(client);
	sendAllFireStationBlips(client);
	sendAllHospitalBlips(client);
	sendAllPayAndSprayBlips(client);
	sendAllAmmunationBlips(client);
	sendAllFuelStationBlips(client);
	sendAllJobBlips(client);
}

// ===========================================================================

function initAllClients() {
	getClients().forEach(function(client) {
		initClient(client);
	});
}

// ===========================================================================

function getYesNoFromBool(boolVal) {
	return (boolVal) ? "Yes" : "No";
}

// ===========================================================================

function getOnOffFromBool(boolVal) {
	return (boolVal) ? "On" : "Off";
}

// ===========================================================================

function getEnabledDisabledFromBool(boolVal) {
	return (boolVal) ? "Enabled" : "Disabled";
}

// ===========================================================================

function getLockedUnlockedFromBool(boolVal) {
	return (boolVal) ? "Locked" : "Unlocked";
}

// ===========================================================================

function updateServerRules() {
	server.setRule("Time", makeReadableTime(getServerConfig().hour, getServerConfig().minute));
	server.setRule("Weather", getGameData().weatherNames[getServerGame()][getServerConfig().weather]);
	server.setRule("Snowing", getYesNoFromBool(getServerConfig().fallingSnow));
}

// ===========================================================================

function getWeatherFromParams(params) {
	if(isNaN(params)) {
		for(let i in getGameData().weatherNames[getServerGame()]) {
			if(toLowerCase(getGameData().weatherNames[getServerGame()][i]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getGameData().weatherNames[getServerGame()][params] != "undefined") {
			return toInteger(params);
		}
	}
	return 0;
}

// ===========================================================================

function getAnimationFromParams(params) {
	if(isNaN(params)) {
		for(let i in getGameData().animations[getServerGame()]) {
			if(toLowerCase(getGameData().animations[getServerGame()][i][0]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getGameData().animations[getServerGame()][params] != "undefined") {
			return toInteger(params);
		}
	}
	return 0;
}

// ===========================================================================

function getClanFromParams(params) {
	if(isNaN(params)) {
		for(let i in getServerData().clans) {
			if(toLowerCase(getServerData().clans[i].name).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getServerData().clans[params] != "undefined") {
			return toInteger(params);
		}
	}
}

// ===========================================================================

function getClanRankFromParams(clanId, params) {
	if(isNaN(params)) {
		for(let i in getClanData(clanId).ranks) {
			if(toLowerCase(getClanData(clanId).ranks[i].name).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getClanData(clanId).ranks[params] != "undefined") {
			return toInteger(params);
		}
	}
}

// ===========================================================================

function getJobFromParams(params) {
	if(isNaN(params)) {
		for(let i in getServerData().jobs) {
			if(toLowerCase(getServerData().jobs[i].name).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getServerData().jobs[params] != "undefined") {
			return params;
		}
	}

	return false;
}

// ===========================================================================

function getBusinessFromParams(params) {
	if(isNaN(params)) {
		for(let i in getServerData().businesses) {
			if(toLowerCase(getServerData().businesses[i].name).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getServerData().businesses[params] != "undefined") {
			return toInteger(params);
		}
	}
	return false;
}

// ===========================================================================

function getGameLocationFromParams(params) {
	if(isNaN(params)) {
		for(let i in getGameData().locations) {
			if(toLowerCase(getGameData().locations[getServerGame()][i][0]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getGameData().locations[getServerGame()][params] != "undefined") {
			return toInteger(params);
		}
	}
	return false;
}

// ===========================================================================

function getHouseFromParams(params) {
	if(isNaN(params)) {
		for(let i in getServerData().houses) {
			if(toLowerCase(getServerData().houses[i].description).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getServerData().houses[params] != "undefined") {
			return toInteger(params);
		}
	}
	return false;
}

// ===========================================================================

function getItemTypeFromParams(params) {
	if(isNaN(params)) {
		for(let i in getServerData().itemTypes) {
			if(toLowerCase(getServerData().itemTypes[i].name).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getServerData().itemTypes[params] != "undefined") {
			return toInteger(params);
		}
	}
	return false;
}


// ===========================================================================

function clearChatBox(client) {
	//gta.messages.clear();
	for(let i = 0; i <= 20; i++) {
		messageClient(" ", client, COLOUR_WHITE);
	}
}

// ===========================================================================

function getSkinIdFromParams(params, gameId = getServerGame()) {
	if(isNaN(params)) {
		return getSkinIdFromName(params, gameId);
	} else {
		params = toInteger(params);
		if(gameId == GAME_GTA_IV || gameId == GAME_GTA_IV_EFLC) {
			return getGameData().gtaivSkinModels[params][1];
		} else {
			return params;
		}
	}

	return false;
}

// ===========================================================================

function getSkinNameFromId(modelId, gameId = getServerGame()) {
	if(gameId >= GAME_GTA_IV) {
		for(let i in getGameData().gtaivSkinModels) {
			if(getGameData().gtaivSkinModels[i][1] == modelId) {
				return getGameData().gtaivSkinModels[i][0];
			}
		}
	} else {
		let modelIndex = modelId;
		return getGameData().skinNames[gameId][modelIndex];
	}
}

// ===========================================================================

function getSkinIdFromName(params, gameId = getServerGame()) {
	if(gameId == GAME_GTA_IV || gameId == GAME_GTA_IV_EFLC) {
		for(let i in gtaivSkinModels) {
			if(toLowerCase(getGameData().gtaivSkinModels[i][0]).indexOf(toLowerCase(params)) != -1) {
				return getGameData().gtaivSkinModels[i][1];
			}
		}
	} else {
		for(let i in getGameData().skinNames[gameId]) {
			if(toLowerCase(getGameData().skinNames[gameId][i]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	}

	return false;
}

// ===========================================================================

function getClosestHospital(position) {
	let closest = 0;
	for(let i in getServerData().hospitals[getServerGame()]) {
		if(getDistance(getServerData().hospitals[getServerGame()][i].position, position) < getDistance(getServerData().hospitals[getServerGame()][closest].position, position)) {
			closest = i;
		}
	}

	return getServerData().hospitals[getServerGame()][closest];
}

// ===========================================================================

function getClosestPoliceStation(position) {
	let closest = 0;
	for(let i in getServerData().policeStations[getServerGame()]) {
		if(getServerData().policeStations[getServerGame()][i].position.distance(position) < getServerData().policeStations[getServerGame()][closest].position) {
			closest = i;
		}
	}

	return getServerData().policeStations[getServerGame()][closest];
}

// ===========================================================================

function getPlayerDisplayForConsole(client) {
	if(isNull(client)) {
		return "(Unknown client)";
	}
	return `${getPlayerName(client)}[${client.index}]`;
}

// ===========================================================================

function getPlayerNameForNameTag(client) {
	if(isPlayerSpawned(client)) {
		return `${getPlayerCurrentSubAccount(client).firstName} ${getPlayerCurrentSubAccount(client).lastName}`;
	}
	return getPlayerName(client);
}

// ===========================================================================

function isPlayerSpawned(client) {
	return getPlayerData(client).spawned;
}

// ===========================================================================

function getLockedUnlockedTextFromBool(boolVal) {
	return (boolVal) ? "locked" : "unlocked";
}

// ===========================================================================

function getLockedUnlockedEmojiFromBool(boolVal) {
	return (boolVal) ? "🔒" : "🔓";
}

// ===========================================================================

function getPlayerIsland(client) {
	return getIsland(getPlayerPosition(client));
}

// ===========================================================================

function isAtPayAndSpray(position) {
	for(let i in getGameData().payAndSprays[getServerGame()]) {
		if(getDistance(position, getGameData().payAndSprays[getServerGame()][i]) <= getGlobalConfig().payAndSprayDistance) {
			return true;
		}
	}

	return false;
}

// ===========================================================================

async function waitUntil(condition) {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return
            }

            clearInterval(interval);
            resolve();
        }, 1);
    });
}

// ===========================================================================

function resetClientStuff(client) {
	logToConsole(LOG_DEBUG, `[VRR.Utilities] Resetting client data for ${getPlayerDisplayForConsole(client)}`);

	if(!getPlayerData(client)) {
		return false;
	}

	if(isPlayerOnJobRoute(client)) {
		stopJobRoute(client, false, false);
	}

	if(getPlayerData(client).rentingVehicle) {
		stopRentingVehicle(client);
	}

	deleteJobItems(client);

	getPlayerData(client).lastVehicle = null;
}

// ===========================================================================

function getPlayerFromCharacterId(subAccountId) {
	let clients = getClients();
	for(let i in clients) {
		for(let j in getPlayerData(clients[i]).subAccounts) {
			if(getPlayerData(clients[i]).subAccounts[j].databaseId == subAccountId) {
				return clients[i];
			}
		}
	}

	return false;
}

// ===========================================================================

function doesWordStartWithVowel(word) {
	switch(word.substr(0,1).toLowerCase()) {
		case "a":
		case "e":
		case "i":
		case "o":
		case "u":
			return true;

		default:
			return false;
	}

	return false;
}

// ===========================================================================

function getProperDeterminerForName(word) {
	switch(word.substr(0,1).toLowerCase()) {
		case "a":
		case "e":
		case "i":
		case "o":
			return "an";

		default:
			return "a";
	}
}

// ===========================================================================

function getPluralForm(name) {
	return name;
}

// ===========================================================================

function removeColoursFromString(str) {
	let matchRegex = /#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})\b/gi;
	let matchedHexes = str.match(matchRegex);
	for(let i in matchHex) {
		str.replace(matchedHexes, `{${i}}`);
	}

	return [str, matchedHexes];
}

// ===========================================================================

function checkPlayerPedStates() {
	let clients = getClients();
	for(let i in clients) {
		if(getPlayerData(clients[i])) {
			if(getPlayerData(clients[i]).pedState) {
				if(isPlayerInAnyVehicle(clients[i])) {
					if(getPlayerData(clients[i]).pedState == VRR_PEDSTATE_EXITINGVEHICLE) {
						getPlayerData(clients[i]).pedState == VRR_PEDSTATE_READY;
					}
				}
			}
		}
	}
}

// ===========================================================================

function showConnectCameraToPlayer(client) {
	fadeCamera(client, true, 1);
	setPlayerCameraLookAt(client, getServerConfig().connectCameraPosition, getServerConfig().connectCameraLookAt);
}

// ===========================================================================

function showCharacterSelectCameraToPlayer(client) {
	setPlayerCameraLookAt(client, getServerConfig().characterSelectCameraPosition, getServerConfig().characterSelectCameraPosition);
}

// ===========================================================================

function generateRandomString(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// ===========================================================================

// ===========================================================================

function getVehicleModelIdFromParams(params) {
	if(isNaN(params)) {
		let modelId = getVehicleModelIdFromName(params);

		if(!modelId) {
			return false;
		}

		if(isValidVehicleModel(toInteger(modelId))) {
			return toInteger(modelId);
		}

		return false;
	} else {
		if(isValidVehicleModel(toInteger(params))) {
			return toInteger(params);
		}

		return false;
	}

	return false;
}

// ===========================================================================

function getVehicleModelIdFromName(params) {
	if(isGTAIV()) {
		for(let i in getGameData().gtaivVehicleModels) {
			if(toLowerCase(getGameData().gtaivVehicleModels[i][0]).indexOf(toLowerCase(params)) != -1) {
				return getGameData().gtaivVehicleModels[i][1];
			}
		}
	} else {
		let vehicleNames = getGameData().vehicleNames[getServerGame()];
		for(let i in vehicleNames) {
			if(toLowerCase(vehicleNames[i]).indexOf(toLowerCase(params)) != -1) {
				return toInteger(i)+toInteger(getGameData().vehicleModelIdStart[getServerGame()]);
			}
		}
	}

	return false;
}

// ===========================================================================

function getVehicleNameFromModelId(modelId) {
	if(isGTAIV()) {
		for(let i in getGameData().gtaivVehicleModels) {
			if(getGameData().gtaivVehicleModels[i][1] == modelId) {
				return getGameData().gtaivVehicleModels[i][0];
			}
		}
	} else {
		let modelIndex = modelId-getGameData().vehicleModelIdStart[getServerGame()];
		return getGameData().vehicleNames[getServerGame()][modelIndex];
	}
}

// ===========================================================================

function isValidVehicleModel(modelId) {
	if(getGame() == GAME_GTA_III) {
		if(modelId < 90 || modelId > 150) {
			return false;
		}

		return true;
	}

	if(getGame() == GAME_GTA_VC) {
		if(modelId < 130 || modelId > 236) {
			return false;
		}

		return true;
	}

	if(getGame() == GAME_GTA_SA) {
		return true;
	}

	if(getGame() == GAME_GTA_IV) {
		return true;
	}

	return false;
}

// ===========================================================================

function getVehiclesInRange(position, distance) {
	return getElementsByType(ELEMENT_VEHICLE).filter(x => x.player && x.position.distance(position) <= distance);
}

// ===========================================================================

function getClientsInRange(position, distance) {
	return getPlayersInRange(position, distance);
}

// ===========================================================================

function getCiviliansInRange(position, distance) {
	return getElementsByType(ELEMENT_PED).filter(x => x.position.distance(position) <= distance);
}

// ===========================================================================

function getElementsByTypeInRange(elementType, position, distance) {
	return getElementsByType(elementType).filter(x => x.position.distance(position) <= distance);
}

// ===========================================================================

function getClosestCivilian(position) {
	return getElementsByType(ELEMENT_PED).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ===========================================================================

function getClosestPlayer(position, exemptClient) {
	let clients = getClients();
	let closest = 0;
	for(let i in clients) {
		if(exemptClient != clients[i]) {
			if(getDistance(getPlayerPosition(clients[i]), position) < getDistance(getPlayerPosition(clients[closest]), position)) {
				closest = i;
			}
		}
	}
	return clients[closest];
}

// ===========================================================================

function isPlayerMuted(client) {
	return getPlayerData(client).muted;
}

// ===========================================================================

function getCurrentUnixTimestamp() {
	return new Date().getTime()/1000;
}

// ===========================================================================

function msToTime(duration) {
	let milliseconds = Math.floor(toInteger((duration % 1000) / 100));
	let seconds = Math.floor(toInteger((duration / 1000) % 60));
	let minutes = Math.floor(toInteger((duration / (1000 * 60)) % 60));
	let hours = Math.floor(toInteger((duration / (1000 * 60 * 60)) % 24));
	let days = Math.floor(toInteger((duration / (1000 * 60 * 60 * 24)) % 365));

	//hours = (hours < 10) ? "0" + hours : hours;
	//minutes = (minutes < 10) ? "0" + minutes : minutes;
	//seconds = (seconds < 10) ? "0" + seconds : seconds;

	if (days !== 0) {
		return `${days} days, ${hours} hours, ${minutes} minutes`;
	} else {
		return `${hours} hours, ${minutes} minutes`;
	}
}

// ===========================================================================

function isSamePlayer(client1, client2) {
	return (client1 == client2);
}

// ===========================================================================

function getClientFromIndex(index) {
	let clients = getClients();
	for(let i in clients) {
		if(clients[i].index == index) {
			return clients[i];
		}
	}
}

// ===========================================================================

function getConsoleClient() {
	let clients = getClients();
	for(let i in clients) {
		if(isConsole(clients[i])) {
			return clients[i];
		}
	}
}

// ===========================================================================

function getPlayerFromParams(params) {
	let clients = getClients();
	if(isNaN(params)) {
		for(let i in clients) {
			if(!clients[i].console) {
				if(toLowerCase(clients[i].name).indexOf(toLowerCase(params)) != -1) {
					return clients[i];
				}

				if(toLowerCase(getCharacterFullName(clients[i])).indexOf(toLowerCase(params)) != -1) {
					return clients[i];
				}
			}
		}
	} else {
		if(typeof clients[toInteger(params)] != "undefined") {
			return clients[toInteger(params)];
		}
	}

	return false;
}

// ===========================================================================

function getPosToRightOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos((-angle+1.57)+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin((-angle+1.57)+(Math.PI/2)))*distance));

	let rightPos = toVector3(x, y, pos.z);

	return rightPos;
}

// ===========================================================================

function getPosToLeftOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos((angle+1.57)+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin((angle+1.57)+(Math.PI/2)))*distance));

	let leftPos = toVector3(x, y, pos.z);

	return leftPos;
}

// ===========================================================================

function getPosInFrontOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle+(Math.PI/2)))*distance));
	let z = pos.z;

	return toVector3(x, y, z);
}

// ===========================================================================

function getPosBehindPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle-(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle-(Math.PI/2)))*distance));
	let z = pos.z;

	return toVector3(x,y,z);
}

// ===========================================================================

function getPosAbovePos(pos, distance) {
	return toVector3(pos.x, pos.y, pos.z+distance);
}

// ===========================================================================

function getPosBelowPos(pos, distance) {
	return toVector3(pos.x, pos.y, pos.z-distance);
}

// ===========================================================================

function applyOffsetToPos(position, position2) {
	return toVector3(position.x+position2.x, position.y+position2.y, position.z+position2.z);
}

// ===========================================================================

function getRandom(min, max) {
	return Math.floor(Math.random() * (toInteger(max) - toInteger(min) + 1)) + toInteger(min)
}

// ===========================================================================

function getArrayOfElementId(elements) {
	let tempArray = [];
	for(let i in elements) {
		tempArray.push(elements[i].id);
	}

	return tempArray;
}

// ===========================================================================

function getSyncerFromId(syncerId) {
	let clients = getClients();
	return clients[syncerId];
}

// ===========================================================================

function arrayBufferToString(arrayBuffer) {
	return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
}

// ===========================================================================

function vec3ToVec2(pos) {
	return toVector2(pos[0], pos[1]);
}

// ===========================================================================

function vec2ToVec3(pos, z) {
	return toVector3(pos[0], pos[1], z);
}

// ===========================================================================

function degToRad(deg) {
	return deg * Math.PI / 180;
}

// ===========================================================================

function radToDeg(rad) {
	return rad * 180 / Math.PI;
}

// ===========================================================================

function getHeadingFromPosToPos(pos1, pos2) {
	let x = pos2.x-pos1.x;
	let y = pos2.y-pos1.y;
	let rad = Math.atan2(y, x);
	let deg = radToDeg(rad);
	deg -= 90;
	deg = deg % 360;
	return degToRad(deg);
}

// ===========================================================================

function getAngleInCircleFromCenter(center, total, current) {
	let gap = 360 / total;
	let deg = Math.floor(gap*current);

	if(deg <= 0) {
		deg = 1;
	} else {
		if(deg >= 360) {
			deg = 359;
		}
	}

	return degToRad(deg);
}

// ===========================================================================

function areParamsEmpty(params) {
	if(!params || params == "" || params.length == 0 || typeof params == "undefined") {
		return true;
	}

	return false;
}

// ===========================================================================

function getParamsCount(params, delimiter = " ") {
	return params.split(delimiter).length;
}

// ===========================================================================

function areThereEnoughParams(params, requiredAmount, delimiter = " ") {
	return (params.split(delimiter).length >= requiredAmount);
}

// ===========================================================================

function getParams(params, delimiter, index) {
	return params.split(delimiter)[index];
}

// ===========================================================================

function isConsole(client) {
	if(client == null) {
		return false;
	}

	return client.console;
}

// ===========================================================================

function updateConnectionLogOnQuit(client, quitReasonId) {
	quickDatabaseQuery(`UPDATE conn_main SET conn_when_disconnect=UNIX_TIMESTAMP(), conn_how_disconnect=${quitReasonId} WHERE conn_id = ${toInteger(getEntityData(client, "ag.connection"))}`);
}

// ===========================================================================

function updateConnectionLogOnAuth(client, authId) {
	quickDatabaseQuery(`UPDATE conn_main SET conn_auth=${authId} WHERE conn_id = ${toInteger(getEntityData(client, "ag.connection"))}`);
}

// ===========================================================================

function updateConnectionLogOnClientInfoReceive(client, clientVersion, screenWidth, screenHeight) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeClientVersion = escapeDatabaseString(dbConnection, clientVersion);
		let safeScreenWidth = escapeDatabaseString(dbConnection, toString(screenWidth));
		let safeScreenHeight = escapeDatabaseString(dbConnection, toString(screenHeight));
    	quickDatabaseQuery(`UPDATE conn_main SET conn_client_version='${safeClientVersion}', conn_screen_width='${safeScreenWidth}', conn_screen_height='${safeScreenHeight}' WHERE conn_id = ${toInteger(getEntityData(client, "ag.connection"))}`);
	}
}

// ===========================================================================

function generateRandomPhoneNumber() {
	return getRandom(100000, 999999);
}

// ===========================================================================

function doesNameContainInvalidCharacters(name) {
	let disallowedCharacters = getGlobalConfig().subAccountNameAllowedCharacters;
	name = toLowerCase(name);
	for(let i = 0; i < name.length; i++) {
		if(disallowedCharacters.toLowerCase().indexOf(name.charAt(i)) == -1) {
			return true;
		}
	}

	return false;
}

// ===========================================================================

function fixCharacterName(name) {
	return String(name.charAt(0).toUpperCase()) + String(name.slice(1).toLowerCase());
}

// ===========================================================================