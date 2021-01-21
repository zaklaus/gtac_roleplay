// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
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

function gt(var1, var2) {
	return (var1 > var2);
}

// ---------------------------------------------------------------------------

function lt(var1, var2) {
	return (var1 < var2);
}

// ---------------------------------------------------------------------------

function eq(var1, var2) {
	return (var1 == var2);
}

// ---------------------------------------------------------------------------

function toInteger(val) {
	return Number(val);
}

// ---------------------------------------------------------------------------

function toFloat(val) {
	return parseFloat(val);
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
	return getClients().find(c => c.index == index);
}

// ---------------------------------------------------------------------------