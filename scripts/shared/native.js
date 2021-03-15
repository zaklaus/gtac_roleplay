// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: native.js
// DESC: Provides util funcs for native wrapping
// TYPE: Shared (JavaScript)
// ===========================================================================

"use strict";
setErrorMode(RESOURCEERRORMODE_STRICT);

// ---------------------------------------------------------------------------

function and(var1, var2) {
	return (var1 && var2);
}

// ---------------------------------------------------------------------------

function or(var1, var2) {
	return (var1 || var2);
}

// ---------------------------------------------------------------------------

function not(var1) {
	return !var1;
}

// ---------------------------------------------------------------------------

function bitAnd(var1, var2) {
	return var1 & var2;
}

// ---------------------------------------------------------------------------

function bitOr(var1, var2) {
	return var1 | var2;
}

// ---------------------------------------------------------------------------

function bitXor(var1, var2) {
	return var1 ^ var2;
}

// ---------------------------------------------------------------------------

function bitNot(var1) {
	return ~var1;
}

// ---------------------------------------------------------------------------

function bitLeftShift(var1, var2) {
	return var1 << var2;
}

// ---------------------------------------------------------------------------

function bitRightShift(var1, var2) {
	return var1 >> var2;
}

// ---------------------------------------------------------------------------

function greaterThan(var1, var2) {
	return var1 > var2;
}

// ---------------------------------------------------------------------------

function lessThan(var1, var2) {
	return (var1 < var2);
}

// ---------------------------------------------------------------------------

function greaterThanOrEqualTo(var1, var2) {
	return (var1 >= var2);
}

// ---------------------------------------------------------------------------

function lessThanOrEqualTo(var1, var2) {
	return (var1 <= var2);
}

// ---------------------------------------------------------------------------

function equals(var1, var2) {
	return (var1 == var2);
}

// ---------------------------------------------------------------------------

function modulo(var1, var2) {
	return var1 % var2;
}

// ---------------------------------------------------------------------------

function add(...args) {
	return args.reduce((acc, a) => {
		return acc + a;
	}, 0);
}

// ---------------------------------------------------------------------------

function subtract(...args) {
	return args.reduce((acc, a) => {
		return acc - a;
	}, 0);
}

// ---------------------------------------------------------------------------

function multiply(...args) {
	return args.reduce((acc, a) => {
		return acc * a;
	}, 0);
}

// ---------------------------------------------------------------------------

function divide(...args) {
	return args.reduce((acc, a) => {
		return acc / a;
	}, 0);
}

// ---------------------------------------------------------------------------

function toArray(...args) {
	return args;
}

// ---------------------------------------------------------------------------

function toInteger(val) {
	return Number(val);
}

// ---------------------------------------------------------------------------

function toFloat(val, fixed = 2) {
	return parseFloat((val).toFixed(fixed));
}

// ---------------------------------------------------------------------------

function toString(val) {
	return String(val);
}

// ---------------------------------------------------------------------------

function toVector3(x, y, z) {
	return new Vec3(x, y, z);
}

// ---------------------------------------------------------------------------

function toVector2(x, y) {
	return new Vec2(x, y);
}

// ---------------------------------------------------------------------------

function toUpperCase(val) {
	return String(val).toUpperCase();
}

// ---------------------------------------------------------------------------

function toLowerCase(val) {
	return String(val).toLowerCase();
}

// ---------------------------------------------------------------------------

function isNull(val) {
	if(val == null) {
		return true;
	}

	if(typeof val === "undefined") {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function getEntityData(entity, dataName) {
	if(entity != null) {
		if(entity.getData != null) {
			return entity.getData(dataName);
		}
	}
    return null;
}

// ---------------------------------------------------------------------------

function setEntityData(entity, dataName, dataValue, syncToClients = true) {
	if(entity != null) {
		if(!isNull(server)) {
			return entity.setData(dataName, dataValue, syncToClients);
		} else {
			return entity.setData(dataName, dataValue);
		}
	}
}

// ---------------------------------------------------------------------------

function removeEntityData(entity, dataName) {
	if(entity != null) {
		return entity.removeData(dataName);
	}
    return null;
}

// ---------------------------------------------------------------------------

function doesEntityDataExist(entity, dataName) {
	if(entity != null) {
		return (entity.getData(dataName) != null);
	}
	return null;
}

// ---------------------------------------------------------------------------

function getDistance(vec1, vec2) {
	if(isNull(vec1) || isNull(vec2)) {
		return false;
	}
    return vec1.distance(vec2);
}

// ---------------------------------------------------------------------------

function isConsole(client) {
	if(client == null) {
		return false;
	}

	return client.console;
}

// ---------------------------------------------------------------------------

function logToConsole(tempLogLevel, text) {
	if((logLevel & tempLogLevel) || logLevel == LOG_ALL) {
		if(tempLogLevel == LOG_ERROR) {
			console.error(text);
			return true;
		} else if(tempLogLevel == LOG_WARN) {
			console.warn(text);
			return true;
		} else {
			console.log(text);
			return true;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function isSamePlayer(client1, client2) {
	return (client1 == client2);
}

// ---------------------------------------------------------------------------

function getClientFromIndex(index) {
	let clients = getClients();
	for(let i in clients) {
		if(clients[i].index == index) {
			return clients[i];
		}
	}
}

// ---------------------------------------------------------------------------

function getConsoleClient() {
	let clients = getClients();
	for(let i in clients) {
		if(isConsole(clients[i])) {
			return clients[i];
		}
	}
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