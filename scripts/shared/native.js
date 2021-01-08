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
		return entity.getData(dataName);
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
    return vec1.distance(vec2);
}

// ---------------------------------------------------------------------------

function isConsole(client) {
	return client.console;
}

// ---------------------------------------------------------------------------

function logToConsole(tempLogLevel, text) {
	if(logLevel & tempLogLevel) {
		if(tempLogLevel == LOG_ERROR) {
			console.error(text);
		} else if(tempLogLevel == LOG_WARN) {
			console.warn(text);
		} else {
			console.log(text);
		}

		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------