// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: native.js
// DESC: Provides util funcs for native wrapping
// TYPE: Shared (JavaScript)
// ===========================================================================

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

function toVector2(x, y, z) {
	return new Vec2(x, y, z);
}

// ---------------------------------------------------------------------------

function toUpperCase(val) {
	return val.toUpperCase();
}

// ---------------------------------------------------------------------------

function toLowerCase(val) {
	return val.toLowerCase();
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
    return entity.getData(dataName);
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
    return entity.removeData(dataName);
}

// ---------------------------------------------------------------------------

function doesEntityDataExist(entity, dataName) {
    return (entity.getData(dataName) != null);
}

// ---------------------------------------------------------------------------