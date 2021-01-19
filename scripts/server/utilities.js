// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------

let policeStations = [
	[],
	[ // GTA III
		[1143.875, -675.1875, 14.97], 	// Portland
		[340.25, -1123.375, 25.98],		// Staunton Island
		[-1253.0, -138.1875, 58.75],	// Shoreside Vale
	],

	[ // GTA Vice City
		[399.77, -468.90, 11.73],		// Washington Beach
		[508.96, 512.07, 12.10],		// Vice Point
		[-657.43, 762.31, 11.59],		// Downtown
		[-885.08, -470.44, 13.11],		// Little Havana
	],
];

// ---------------------------------------------------------------------------

let fireStations = [
	[],
	[ // GTA III
		[1103.70, -52.45, 7.49], 		// Portland
		[-78.48, -436.80, 16.17], 		// Staunton Island
		[-1202.10, -14.67, 53.20],		// Shoreside Vale
	],

	[ // GTA Vice City
		[-695.15, 912.58, 11.08],		// Downtown
	],
];

// ---------------------------------------------------------------------------

let hospitals = [
	[],
	[ // GTA III

	],

	[ // GTA Vice City
		[-822.57, 1152.82, 12.41],		// Downtown (Shuman Health Care Center)
		[-885.08, -470.44, 13.11],		// Little Havana (West Haven Community Health Care Center)
		[-133.19, -980.76, 10.46], 		// Ocean Beach (Ocean View Hospital)
	],
]

// ---------------------------------------------------------------------------

let payAndSprays = [
	[],
	[ // GTA III
		[925.4, -360.3, 10.83], 		// Portland
		[-1142.4, 35.01, 58.61],		// Shoreside Vale
	],

	[ // GTA Vice City
		[-869.95, -119.06, 10.63],		// Little Haiti
		[-910.82, -1265.96, 11.79],		// Viceport
	],
];

// ---------------------------------------------------------------------------

let ammuNations = [
	[],
	[ // GTA III
		[1068.3, -400.9, 15.24], 		// Portland
		[348.2, -717.9, 26.43], 		// Staunton Island
	],

	[ // GTA Vice City
		[-676.32, 1204.98, 11.10],		// Downtown
	],
];

// ---------------------------------------------------------------------------

let hiddenPackages = [
	[
		[1105.25, -1020, 25.0625],
		[877.562, -788, 27.5625],
		[1254, -611.188, 22.75],
		[1045.75, -967.062, 16],
		[942.062, -793.375, 14.875],
		[934, -718.875, 14.75],
		[898.062, -414.688, 26.5],
		[846.875, -442.5, 23.1875],
		[927.062, -404.375, 29.0625],
		[864.25, -171.5, 3.5],
		[1538.25, -174.375, 19.1875],
		[1213.06, -127.062, 15.0625],
		[753.562, 137, 3.5],
		[1162, -101.75, 12],
		[1155.56, -191.5, 14.375],
		[1285.5, -247.5, 42.375],
		[1007.19, -219.562, 6.6875],
		[1138.19, -250, 24.25],
		[1023.56, -423.688, 14.875],
		[1237.5, -854.062, 20.5625],
		[1478.25, -1150.69, 12],
		[1018.88, -56.75, 21],
		[1465.69, -166.5, 55.5],
		[1120.19, -926.188, 16],
		[1206.5, -821.5, 15],
		[940.188, -199.875, 5],
		[979.25, -1143.06, 13.0625],
		[1195.5, -908.75, 14.875],
		[1470.38, -811.375, 22.375],
		[1320.5, -365.5, 15.1875],
		[932.562, -477.25, -10.75],
		[1305.88, -380.875, 39.5],
		[938.188, -1258.25, 3.5],
		[36.75, -530.188, 26],
		[414.375, -279.25, 23.5625],
		[203.5, -1252.56, 59.25],
		[77.6875, -352.25, 16.0625],
		[120.875, 243.688, 11.375],
		[49.375, 36.25, 16.6875],
		[68.0625, -773.25, 22.75],
		[-4, -1129.06, 26],
		[-134.688, -1386.88, 26.1875],
		[-23.5, -1472.38, 19.6875],
		[112.062, -1227.56, 26],
		[218.25, -1237.75, 20.375],
		[308, -1533.38, 23.5625],
		[468.562, -1457.19, 44.25],
		[355.062, -1085.69, 25.875],
		[312.375, -483.75, 29],
		[322.25, -447.062, 23.375],
		[586.688, -795, 1.5625],
		[504.25, -1027.75, 1.6875],
		[174.062, -1259.5, 32.0625],
		[248.75, -958.25, 26],
		[54.75, -566.5, 26.0625],
		[-77, -1490.06, 26],
		[556, -231.375, 22.75],
		[-38.1875, -1434.25, 31.75],
		[194.75, -0.5, 19.75],
		[223.062, -272.188, 16.0625],
		[-18.0625, -222.25, 29.75],
		[-69.25, -469.188, 16.0625],
		[-270.688, -631.562, 72.25],
		[-59.1875, -579.75, 15.875],
		[392.75, -1135.56, 15.875],
		[145, -1584, 30.6875],
		[428.062, -340.375, 16.1875],
		[351.062, -980.5, 33.0625],
		[-221.75, -1487.56, 5.75],
		[-1193.06, -75.75, 47.375],
		[-1090.5, 131.688, 58.6875],
		[-1015.5, -13, 49.0625],
		[-821.75, -184.875, 33.75],
		[-849.062, -209.375, 41.75],
		[-736.375, 304.688, 54.0625],
		[-678.062, 308.562, 59.75],
		[-609.188, 286.688, 65.0625],
		[-329.562, 320.062, 60.6875],
		[-1221.06, 562.75, 68.5625],
		[-1131.88, 605.375, 68.5625],
		[-1098.38, 471.25, 35.5],
		[-1208.06, 325.188, 3.375],
		[-1216.19, 347.875, 30.375],
		[-1211.88, -166.875, 58.6875],
		[-1195.19, -7.6875, 59.75],
		[-206.875, 328.75, 3.375],
		[-753.188, 142, 10.0625],
		[-697.875, -182.062, 9.1875],
		[-748.375, -807, -13.5625],
		[-489.875, -44.875, 3.75],
		[-632.875, 67.5625, 18.75],
		[-546.75, 10.6875, 3.875],
		[-1032.56, -573.375, 10.875],
		[-542, -1046.56, 3.375],
		[-1556.38, -905.75, 14.5],
		[-1327, -624.688, 11.0625],
		[-737.375, -745.375, 9.6875],
		[-1278.69, -776, 11.0625],
		[-1494.69, -1097.25, 3.375],
		[-837.75, -469.188, 10.75],
	],
	[],
	[]
];

// ---------------------------------------------------------------------------

let weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function areParamsEmpty(params) {
	if(!params || params == "" || params.length == 0 || typeof params == "undefined") {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function getParamsCount(params, delimiter = " ") {
	return params.split(delimiter).length;
}

// ---------------------------------------------------------------------------

function areThereEnoughParams(params, requiredAmount, delimiter = " ") {
	return (params.split(delimiter).length >= requiredAmount);
}

// ---------------------------------------------------------------------------

function getParams(params, delimiter, index) {
	return params.split(delimiter)[index];
}

// ---------------------------------------------------------------------------

function getCardinalDirectionName(cardinalDirectionId) {
	let cardinalDirections = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest", "Unknown" ];
	return cardinalDirections[cardinalDirectionId];
}

// ---------------------------------------------------------------------------

function getWeekDayName(weekdayId) {
	let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	return weekdayNames[weekdayId];
}

// ---------------------------------------------------------------------------

function getMonthName(monthId) {
	let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[monthId];
}

// ---------------------------------------------------------------------------

function getWeaponModelId(weaponId) {
	let weaponModels = [
		[ 0 , 172 , 173 , 178 , 176 , 171 , 180 , 177 , 175 , 181 , 174 , 170 ],
		[],
	];
	return weaponModels[getServerGame()][weaponId];
}

// ---------------------------------------------------------------------------

function getIsland(position) {
    if(getServerGame() == GAME_GTA_III) {
		if(position.x > 616) {
			return AG_ISLAND_PORTLAND;
		} else if(position.x < -283) {
			return AG_ISLAND_SHORESIDEVALE;
		}
		return AG_ISLAND_STAUNTON;
	} else {
		return AG_ISLAND_NONE;
	}

	//return gta.getIslandFromPosition(position);
}

// ---------------------------------------------------------------------------

function openAllGarages() {

}

// ---------------------------------------------------------------------------

function closeAllGarages() {

}

// ---------------------------------------------------------------------------

function replaceEmojiIntoString(message) {
	for(let i in emojiReplaceString) {
		message = message.replace(emojiReplaceString[i][0], emojiReplaceString[i][1]);
	}
	return message;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getPosToRightOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos((-angle+1.57)+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin((-angle+1.57)+(Math.PI/2)))*distance));

	let rightPos = toVector3(x, y, pos.z);

	return rightPos;
}

// ---------------------------------------------------------------------------

function getPosToLeftOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos((angle+1.57)+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin((angle+1.57)+(Math.PI/2)))*distance));

	let leftPos = toVector3(x, y, pos.z);

	return leftPos;
}

// ---------------------------------------------------------------------------

function getPosInFrontOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle+(Math.PI/2)))*distance));
	let z = pos.z;

	return toVector3(x, y, z);
}

// ---------------------------------------------------------------------------

function getPosBehindPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle-(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle-(Math.PI/2)))*distance));
	let z = pos.z;

	return toVector3(x,y,z);
}

// ---------------------------------------------------------------------------

function getPosAbovePos(pos, distance) {
	return toVector3(pos.x, pos.y, pos.z+distance);
}

// ---------------------------------------------------------------------------

function getPosBelowPos(pos, distance) {
	return toVector3(pos.x, pos.y, pos.z-distance);
}

// ---------------------------------------------------------------------------

function getHeadingFromPosToPos(pos1, pos2) {
	let x = pos2.x-pos1.x;
	let y = pos2.y-pos1.y;
	let rad = Math.atan2(y, x);
	let deg = radToDeg(rad);
	deg -= 90;
	deg = deg % 360;
	return degToRad(deg);
}

// ---------------------------------------------------------------------------

function degToRad(deg) {
	return deg * Math.PI / 180;
}

// ---------------------------------------------------------------------------

function radToDeg(rad) {
	return rad * 180 / Math.PI;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getClosestCivilian(position) {
	return getElementsByType(ELEMENT_CIVILIAN).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestPlayer(position) {
	let clients = getClients();
	let closest = 0;
	for(let i in clients) {
		if(getDistance(getPlayerPosition(clients[i]), position) > 0.0) {
			if(getDistance(getPlayerPosition(clients[i]), position) < getDistance(getPlayerPosition(clients[closest]), position)) {
				closest = i;
			}
		}
	}
	return clients[closest];
}

// ---------------------------------------------------------------------------

function getClosestElementByType(elementType, position) {
	return getElementsByType(elementType).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getJobIndex(jobData) {
	return getServerData().jobs.indexOf(jobData);
}

// ---------------------------------------------------------------------------

function getVehiclesInRange(position, distance) {
	return getElementsByType(ELEMENT_VEHICLE).filter(x => x.player && x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getClientsInRange(position, distance) {
	return getPlayersInRange(position, distance);
}

// ---------------------------------------------------------------------------

function getCiviliansInRange(position, distance) {
	return getElementsByType(ELEMENT_CIVILIAN).filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getElementsByTypeInRange(elementType, position, distance) {
	return getElementsByType(elementType).filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getJobPointsInRange(position, distance) {
	return getServerData().jobs[getServerGame()].filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getWeaponName(weapon) {
	return weaponNames[getServerGame()][weapon];
}

// ---------------------------------------------------------------------------

function vec3ToVec2(pos) {
	return toVector2(pos[0], pos[1]);
}

// ---------------------------------------------------------------------------

function vec3ToVec3(pos, z) {
	return toVector3(pos[0], pos[1], z);
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function isValidVehicleModel(modelId) {
	if(getServerGame() == GAME_GTA_III) {
		if(modelId < 90 || modelId > 150) {
			return false;
		}

		return true;
	}

	if(getServerGame() == GAME_GTA_VC) {
		if(modelId < 130 || modelId > 236) {
			return false;
		}

		return true;
	}

	if(getServerGame() == GAME_GTA_SA) {
		return true;
	}

	if(getServerGame() == GAME_GTA_IV) {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function replaceEmojiIntoString(message) {
	for(let i in emojiReplaceString) {
		while(message.indexOf(emojiReplaceString[i][0]) != -1) {
			message = message.replace(emojiReplaceString[i][0], emojiReplaceString[i][1]);
		}
	}
	return message;
}

// ---------------------------------------------------------------------------

function getSyncerFromId(syncerId) {
	let clients = getClients();
	return clients[syncerId];
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getClientFromPlayer(player) {
	let clients = getClients();
	for(let i in clients) {
		if(clients[i].player == player) {
			return clients[i];
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getFirstEmptyEffectSlot(isServer = false) {
	if(isServer) {
		for(let i in effects) {
			if(!effects[i].exists) {
				return i;
			}
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function packData(...args) {
	for(let i in args) {
		switch(args[i].constructor.name) {
			case "Vec3":
				let x = args[i].x.toFixed(2);
				let y = args[i].y.toFixed(2);
				let z = args[i].z.toFixed(2);
				x = x * 100;
				y = z * 100;
				z = z * 100;
				let result = combine(x, y, z);
				break;
		}
	}
}

// ---------------------------------------------------------------------------

function combine(a, b, c) {
	return toInteger((a << 20) | (b << 10) | c);
}

// ---------------------------------------------------------------------------

function createBitwiseTable(tableKeys) {
	let bitVal = 0;
	let bitTable = {};
	let incVal = 1;

	for(let i in tableKeys) {
		let key = tableKeys[i];
		bitTable[key] = bitVal;
		bitVal = 1 << incVal;
		incVal++;
	}
	return bitTable;
}

// ---------------------------------------------------------------------------

function hasBitFlag(checkThis, checkFor) {
	if(checkThis & checkFor) {
		return true;
	}
	return false;
}

// ---------------------------------------------------------------------------

function killDeathRatio(kills, deaths) {
	if(deaths == 0 || kills == 0) {
		return 0.0;
	}
	return Float((iKills*100/iDeaths) * 0.01);
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getTimeDifferenceDisplay(unixTimeOne, unixTimeTwo) {
    let timeDifference = unixTimeOne-unixTimeTwo;
    let hours = floor(timeDifference/3600);
    let minutes = floor(timeDifference/60);
    let hourString = "";
	let minuteString = "";

    if(hours == 1) {
        hourString = "1 hour";
    } else {
        hourString = toString(hours) + " hours";
    }

    if(minutes == 1) {
        minuteString = "1 minute";
    } else {
        minuteString = toString(minutes) + " minute";
    }

    return hourString + " and " + minuteString;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getCiviliansInRange(position, range) {
	let peds = getPeds();
	let inRangeCivilians = [];
	for(let i in peds) {
		if(peds[i].isType(ELEMENT_CIVILIANS)) {
			if(getDistance(position, peds[i].position) <= range) {
				inRangeCivilians.push(peds[i]);
			}
		}
	}
	return inRangeCivilians;
}

// ---------------------------------------------------------------------------

function getFileData(filePath) {
	let file = openFile(filePath, false);
	if(!file) {
		return false;
	}
	let fileData = file.readBytes(file.length);
	file.close();
	return fileData;
}

// ---------------------------------------------------------------------------

function setFileData(filePath, fileData)
{
	let file = openFile(filePath, true);
	if(!file) {
		return false;
	}
	file.writeBytes(fileData, fileData.length);
	file.close();
	return true;
}

// ---------------------------------------------------------------------------

function is2dPositionOnScreen(pos2d) {
	return pos2d.x >= 0 && pos2d.y >= 0 && pos2d.x <= game.width && pos2d.y <= game.height;
}

// ---------------------------------------------------------------------------

function getRandomRGB() {
	return toColour.apply(null, [
		getRandom(0, 255),
		getRandom(0, 255),
		getRandom(0, 255),
		255
	]);
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getSpeedFromVelocity(vel) {
	return Math.sqrt(vel.x*vel.x + vel.y*vel.y + vel.z*vel.z);
}

// ---------------------------------------------------------------------------

function getRandom(min, max) {
	return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min)
}

// ---------------------------------------------------------------------------

function getArrayOfElementId(elements) {
	let tempArray = [];
	for(let i in elements) {
		tempArray.push(elements[i].id);
	}

	return tempArray;
}

// ---------------------------------------------------------------------------

function Enum(constantsList) {
    let tempTable = {};
	for(let i in constantsList) {
        tempTable[constantsList[i]] = i;
    }
	return tempTable;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getClientVirtualWorld(client) {
	if(isClientSpawned(client)) {
		return getClientPlayer(client).dimension;
	}

	return 0;
}

// ---------------------------------------------------------------------------

function getClientInterior(client) {
	if(isClientSpawned(client)) {
		return getClientPlayer(client).interior;
	}

	return 0;
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getAreaName(position) {
	let areaId = getPositionArea(position);
	if(!areaId) {
		return false;
	}

	return getGameAreas()[areaId][0];
}

// ---------------------------------------------------------------------------

function getGameAreas(gameId) {
	return gameAreas[gameId];
}

// ---------------------------------------------------------------------------

function getPlayerData(client) {
	if(client != null) {
		return getServerData().clients[client.index];
	}
	return false;
}

// ---------------------------------------------------------------------------

function getPlayerCurrentSubAccount(client) {
	if(!getPlayerData(client)) {
		return false;
	}

	let subAccountId = getPlayerData(client).currentSubAccount;
	if(subAccountId == -1) {
		return false;
	}

	return getPlayerData(client).subAccounts[subAccountId];
}

// ---------------------------------------------------------------------------

function getClientSubAccountName(client) {
	let subAccountData = getPlayerCurrentSubAccount(client);
	return `${subAccountData.firstName} ${subAccountData.lastName}`;
}

// ---------------------------------------------------------------------------

function createAllLocationBlips() {
    createAllPoliceStationBlips();
    createAllFireStationBlips();
    createAllHospitalBlips();
    createAllPayAndSprayBlips();
    createAllFuelStationBlips();
    createAllAmmunationBlips();
}

// ---------------------------------------------------------------------------

function createAllPoliceStationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].policeStation != -1) {
		for(let i in getServerData().policeStations[getServerGame()]) {
			getServerData().policeStations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].policeStation, getServerData().policeStations[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllFireStationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].fireStation != -1) {
		for(let i in getServerData().fireStations[getServerGame()]) {
			getServerData().fireStations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].fireStation, getServerData().fireStations[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllHospitalBlips() {
	if(getGameConfig().blipSprites[getServerGame()].hospital != -1) {
		for(let i in getServerData().hospitals[getServerGame()]) {
			getServerData().hospitals[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].hospital, getServerData().hospitals[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllAmmunationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].ammunation != -1) {
		for(let i in getServerData().ammunations[getServerGame()]) {
			getServerData().ammunations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].ammunation, getServerData().ammunations[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllPayAndSprayBlips() {
	if(getGameConfig().blipSprites[getServerGame()].payAndSpray != -1) {
		for(let i in getServerData().payAndSprays[getServerGame()]) {
			getServerData().payAndSprays[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].payAndSpray, getServerData().payAndSprays[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllFuelStationBlips() {
	if(getGameConfig().blipSprites[getServerGame()].fuelStation != -1) {
		for(let i in getServerData().fuelStations[getServerGame()]) {
			getServerData().fuelStations[getServerGame()][i].blip = createBlip(getGameConfig().blipSprites[getServerGame()].fuelStation, getServerData().fuelStations[getServerGame()][i].position, 2, getColourByName("burntOrange"));
		}
	}
}

// ---------------------------------------------------------------------------

function sendAllPoliceStationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].policeStation != -1) {
		let tempBlips = [];
		for(let i in getServerData().policeStations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].policeStation,
				getServerData().policeStations[getServerGame()][i].position.x,
				getServerData().policeStations[getServerGame()][i].position.y,
				getServerData().policeStations[getServerGame()][i].position.z,
				3,
				getColourByName("policeBlue"),
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllFireStationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].fireStation != -1) {
		let tempBlips = [];
		for(let i in getServerData().fireStations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].fireStation,
				getServerData().fireStations[getServerGame()][i].position.x,
				getServerData().fireStations[getServerGame()][i].position.y,
				getServerData().fireStations[getServerGame()][i].position.z,
				3,
				getColourByName("firefighterRed"),
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllHospitalBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].hospital != -1) {
		let tempBlips = [];
		for(let i in getServerData().hospitals[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].hospital,
				getServerData().hospitals[getServerGame()][i].position.x,
				getServerData().hospitals[getServerGame()][i].position.y,
				getServerData().hospitals[getServerGame()][i].position.z,
				3,
				getColourByName("medicPink"),
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllAmmunationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].ammunation != -1) {
		let tempBlips = [];
		for(let i in getServerData().ammunations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].ammunation,
				getServerData().ammunations[getServerGame()][i].position.x,
				getServerData().ammunations[getServerGame()][i].position.y,
				getServerData().ammunations[getServerGame()][i].position.z,
				3,
				0
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllPayAndSprayBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].payAndSpray != -1) {
		let tempBlips = [];
		for(let i in getServerData().payAndSprays[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].payAndSpray,
				getServerData().payAndSprays[getServerGame()][i].position.x,
				getServerData().payAndSprays[getServerGame()][i].position.y,
				getServerData().payAndSprays[getServerGame()][i].position.z,
				3,
				0
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllFuelStationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].fuelStation != -1) {
		let tempBlips = [];
		for(let i in getServerData().fuelStations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].fuelStation,
				getServerData().fuelStations[getServerGame()][i].position.x,
				getServerData().fuelStations[getServerGame()][i].position.y,
				getServerData().fuelStations[getServerGame()][i].position.z,
				3,
				getColourByName("burntOrange"),
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function getPickupOwnerType(pickup) {
	return pickup.getData("ag.ownerType");
}

// ---------------------------------------------------------------------------

function getPickupOwnerId(pickup) {
	return pickup.getData("ag.ownerId");
}

// ---------------------------------------------------------------------------

function canPlayerUsePoliceJob(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.policeBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUseFireJob(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.fireBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUseAmmunations(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.ammuBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUseGuns(client) {
	if(getPlayerData(client).accountData.flags.moderation & getServerBitFlags().moderationFlags.gunBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function intToBool(intVal) {
	return (intVal == 1) ? true : false;
}

// ---------------------------------------------------------------------------

function boolToInt(boolVal) {
	return (boolVal) ? 1 : 0;
}

// ---------------------------------------------------------------------------

function sendAllBlips(client) {
	sendAllPoliceStationBlips(client);
	sendAllFireStationBlips(client);
	sendAllHospitalBlips(client);
	sendAllPayAndSprayBlips(client);
	sendAllAmmunationBlips(client);
	sendAllFuelStationBlips(client);
	sendAllJobBlips(client);
}

// ---------------------------------------------------------------------------

function processHoldActionKey(client) {
	let closestJobId = getClosestJobPointId(client.player.position);
	let closestVehicle = getClosestVehicle(client.player.position);
	let closestHouse = getClosestHouse(client.player.position);
	let closestBusiness = getClosestBusiness(client.player.position);
	let jobData = getJobData(closestJobId);

	if(getPlayerCurrentSubAccount(client).job == AG_JOB_NONE) {
		if(jobData.position.distance(client.player.position) <= getGlobalConfig().takeJobDistance) {
			takeJob(client, closestJobId);
			messagePlayerSuccess(client, "You now have the " + toString(jobData.name) + " job");
		}
	} else {
		if(jobData.jobType == getPlayerCurrentSubAccount(client).job) {
			if(jobData.position.distance(client.player.position) <= getGlobalConfig().startWorkDistance) {
				startWorking(client);
				messagePlayerSuccess(client, "You are now working as a " + toString(jobData.name));
				showStartedWorkingTip(client);
				return true;
			}
		} else {
			messagePlayerError(client, "This is not your job!");
			messagePlayerInfo(client, `Use /quitjob to quit your current job.`);
		}
	}
}

// ---------------------------------------------------------------------------

function processPressActionKey(client) {
	// Check job stuff
	let closestJob = getClosestJob(client.player.position);

	if(getPlayerCurrentSubAccount(client).job == AG_JOB_NONE) {
		if(closestJob.position.distance(client.player.position) <= getGlobalConfig().takeJobDistance) {

		}
	}
}

// ---------------------------------------------------------------------------

function processHoldVehicleLightsKey(client) {

}

// ---------------------------------------------------------------------------

function processHoldVehicleLockKey(client) {

}

// ---------------------------------------------------------------------------

function processHoldVehicleEngineKey(client) {

}

// ---------------------------------------------------------------------------

function getClientChatColour(client) {
	let tempJob = getPlayerCurrentSubAccount(client).job;
	if(tempJob != -1) {
		if(getPlayerData(client).isWorking) {
			return getJobData(tempJob).jobColour;
		}
	}
	return getColourByName("white");
}

// ---------------------------------------------------------------------------

function showConnectCameraToPlayer(client) {
	triggerNetworkEvent("ag.connectCamera", client, getServerConfig().connectCameraPosition, getServerConfig().connectCameraLookAt);
	//triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);
}

// ---------------------------------------------------------------------------

function initAllClients() {
	getClients().forEach(function(client) {
		initClient(client);
	});
}

// ---------------------------------------------------------------------------

function getYesNoFromBool(boolVal) {
	return (boolVal) ? "Yes" : "No";
}

// ---------------------------------------------------------------------------

function getOnOffFromBool(boolVal) {
	return (boolVal) ? "On" : "Off";
}

// ---------------------------------------------------------------------------

function getEnabledDisabledFromBool(boolVal) {
	return (boolVal) ? "Enabled" : "Disabled";
}

// ---------------------------------------------------------------------------

function getLockedUnlockedFromBool(boolVal) {
	return (boolVal) ? "Locked" : "Unlocked";
}

// ---------------------------------------------------------------------------

function updateServerRules() {
	server.setRule("Time", makeReadableTime(getServerConfig().hour, getServerConfig().minute));
	server.setRule("Weather", getGameData().weatherNames[getServerGame()][getServerConfig().weather]);
	server.setRule("Snowing", getYesNoFromBool(getServerConfig().fallingSnow));
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function updatePlayerCash(client) {
	triggerNetworkEvent("ag.money", client, getPlayerCurrentSubAccount(client).cash);
}

// ---------------------------------------------------------------------------

function setPlayerCash(client, amount) {
	getPlayerCurrentSubAccount(client).cash = amount;
	updatePlayerCash(client);
}

// ---------------------------------------------------------------------------

function givePlayerCash(client, amount) {
	getPlayerCurrentSubAccount(client).cash += amount;
	updatePlayerCash(client);
}

// ---------------------------------------------------------------------------

function takePlayerCash(client, amount) {
	getPlayerCurrentSubAccount(client).cash -= amount;
	updatePlayerCash(client);
}

// ---------------------------------------------------------------------------

function clearChatBox(client) {
	//gta.messages.clear();
	for(let i = 0; i <= 20; i++) {
		messageClient(" ", client, COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

function getClosestHospital(position) {
	let closest = 0;
	for(let i in getServerData().hospitals[getServerGame()]) {
		if(getDistance(getServerData().hospitals[getServerGame()][i].position, position) < getDistance(getServerData().hospitals[getServerGame()][closest].position, position)) {
			closest = i;
		}
	}

	return getServerData().hospitals[getServerGame()][closest];
}

// ---------------------------------------------------------------------------

function getClosestPoliceStation(position) {
	let closest = 0;
	for(let i in getServerData().policeStations[getServerGame()]) {
		if(getServerData().policeStations[getServerGame()][i].position.distance(position) < getServerData().policeStations[getServerGame()][closest].position) {
			closest = i;
		}
	}

	return getServerData().policeStations[getServerGame()][closest];
}

// -------------------------------------------------------------------------

function isGTAIV() {
	return (getServerGame() == GAME_GTA_IV);
}

// -------------------------------------------------------------------------

function arrayBufferToString(arrayBuffer) {
	return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
}

// -------------------------------------------------------------------------

function getPlayerDisplayForConsole(client) {
	return `${client.name}[${client.index}]`;
}

// -------------------------------------------------------------------------

function getPlayerNameForNameTag(client) {
	if(isPlayerSpawned(client)) {
		return `${getPlayerCurrentSubAccount(client).firstName} ${getPlayerCurrentSubAccount(client).lastName}`;
	}
	return client.name;
}

// -------------------------------------------------------------------------

function isPlayerSpawned(client) {
	if(client.console) {
		return false;
	}

	return (client.player != null);
}

// -------------------------------------------------------------------------

function getLockedUnlockedTextFromBool(boolVal) {
	return (boolVal) ? "locked" : "unlocked";
}

// -------------------------------------------------------------------------

function getLockedUnlockedEmojiFromBool(boolVal) {
	return (boolVal) ? "🔒" : "🔓";
}

// -------------------------------------------------------------------------

function getPlayerIsland(client) {
	return getIsland(getPlayerPosition(client));
}

// -------------------------------------------------------------------------

function isAtPayAndSpray(position) {
	for(let i in payAndSprays[getServerGame()]) {
		if(getDistance(position, payAndSprays[getServerGame()][i]) <= getGlobalConfig().payAndSprayDistance) {
			return true;
		}
	}

	return false;
}

// -------------------------------------------------------------------------

async function waitUntil(condition) {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return
            }

            clearInterval(interval);
            resolve();
        }, 1)
    });
}

// -------------------------------------------------------------------------

function resetClientStuff(client) {
	logToConsole(LOG_DEBUG, `[Asshat.Utilities] Resetting client data for ${getPlayerDisplayForConsole(client)}`);

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

// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------

function applyOffsetToVector3(position, position2) {
	return toVector3(position.x+position2.x, position.y+position2.y, position.z+position2.z);
}

// -------------------------------------------------------------------------
