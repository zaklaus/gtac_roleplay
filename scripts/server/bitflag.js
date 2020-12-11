// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: bitflags.js
// DESC: Provides bitwise operations, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

let serverBitFlags = {
	staffFlags: {},
	moderationFlags: {},
	factionFlags: {},
	clanFlags: {},
	accountSettingsFlags: {},
	subAccountSettingsFlags: {},
};

// ---------------------------------------------------------------------------

let serverBitFlagKeys = {
	staffFlagKeys: [
		"none", 
		"basicModeration", 
		"manageHouses", 
		"manageVehicles", 
		"manageBusinesses", 
		"manageFactions", 
		"manageClans", 
		"manageServer", 
		"manageAdmins",
		"developer"
	],
	moderationFlagKeys: [
		"none", 
		"muted", 
		"frozen", 
		"hackerBox",
		"jobBanned",
		"ammuBanned",
		"policeBanned",
		"fireBanned",
		"gunBanned",
	],
	factionFlagKeys: [
		"none", 
		"police", 
		"medical", 
		"fire", 
		"government"
	],
	clanFlagKeys: [
		"none", 
		"illegal", 
		"legal", 
		"mafia", 
		"streetGang", 
		"weapons", 
		"drugs", 
		"humanTrafficking", 
		"vigilante", 
		"hitContracts"
	],
	clanPermissionFlagKeys: [
		"none", 
		"inviteMember", 
		"removeMember", 
		"memberRank", 
		"memberFlags", 
		"memberTag", 
		"memberTitle", 
		"rankFlags", 
		"rankTag", 
		"rankTitle",
		"clanTag",
		"clanName", 
		"manageVehicles",
		"manageHouses",
		"manageBusinesses",
		"owner"
	],
	accountSettingsFlagKeys: [
		"none", 
		"useWhiteList", 
		"useBlackList", 
		"twoStepAuth", 
		"authAttemptAlert",
		"alertWithGUI",
		"errorWithGUI",
		"askWithGUI",
		"autoLoginIP",
	],
	subAccountSettingsFlagKeys: [],
}

// ---------------------------------------------------------------------------

function initBitFlagScript() {
	getServerData().staffFlags = createBitFlagTable(getServerData().staffFlagKeys);
	getServerData().moderationFlags = createBitFlagTable(getServerData().moderationFlagKeys);
	getServerData().accountSettingsFlags = createBitFlagTable(getServerData().accountSettingsFlagKeys);
	//getServerData().subAccountSettingsFlags = createBitFlagTable(getServerData().subAccountSettingsFlagKeys);
	getServerData().clanFlags = createBitFlagTable(getServerData().clanFlagKeys);
	getServerData().clanPermissionFlags = createBitFlagTable(getServerData().clanPermissionFlagKeys);
	getServerData().factionFlags = createBitFlagTable(getServerData().factionFlagKeys);
	return true;
}

// ---------------------------------------------------------------------------

function addBitFlagCommandHandlers() {
	return true;
}

// ---------------------------------------------------------------------------

function createBitFlagTable(keyNames) {
	let bitVal = 0;
	let bitTable = {};
	let incVal = 1;
	
	for(let i in keyNames) {
		let key = keyNames[i];
		bitTable[key] = bitVal;
		bitVal = 1 << incVal;
		incVal++;
	}
	return bitTable;	
}

// ---------------------------------------------------------------------------

function hasBitFlag(allFlags, checkForFlag) {
	return (allFlags & checkForFlag);
}

// ---------------------------------------------------------------------------

function doesClientHaveStaffPermission(client, requiredFlags) {
	if(client.console) {
		return true;
	}

	if(requiredFlags == getStaffFlagValue("none")) {
		return true;
	}

	let staffFlags = 0;
	if(!isClientFromDiscord(client)) {
		staffFlags = getServerData().clients[client.index].accountData.flags.admin;
	} else {
		staffFlags = getDiscordUserData(client).accountData.flags.admin;
	}

	// -1 is automatic override (having -1 for staff flags is basically god mode admin level)
    if(staffFlags == getStaffFlagValue("all")) {
        return true;
    }

    if(staffFlags & requiredFlags) {
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function getStaffFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}
	
	if(typeof getServerData().staffFlags[flagName] === "undefined") {
		return false;
	}

	return getServerData().staffFlags[flagName];
}

// ---------------------------------------------------------------------------

function getAccountSettingsFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}
	
	if(typeof getServerData().accountSettingsFlags[flagName] === "undefined") {
		return false;
	}

	return getServerData().accountSettingsFlags[flagName];
}

// ---------------------------------------------------------------------------

function getAccountFlagsFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}
	
	if(typeof getServerData().accountFlags[flagName] === "undefined") {
		return false;
	}

	return getServerData().accountFlags[flagName];
}

// ---------------------------------------------------------------------------

function giveClientStaffFlag(client, flagName) {
	if(!getStaffFlagValue(flagName)) {
		return false;
	}

	getClientData(client).accountData.flags.admin = getClientData(client).accountData.flags.admin | getStaffFlagValue(flagName);
	return true;
}

// ---------------------------------------------------------------------------

function takeClientStaffFlag(client, flagName) {
	if(!getStaffFlagValue(flagName)) {
		return false;
	}

	getClientData(client).accountData.flags.admin = getClientData(client).accountData.flags.admin & ~getStaffFlagValue(flagName);
	return true;
}

// ---------------------------------------------------------------------------

function addBitFlag(allFlags, flagValue) {
	return allFlags | flagValue;
}

// ---------------------------------------------------------------------------

function removeBitFlag(allFlags, flagValue) {
	return allFlags & ~flagValue;
}

// ---------------------------------------------------------------------------

function takeClientStaffFlag(client, flagName) {
	if(!getStaffFlagValue(flagName)) {
		return false;
	}

	getClientData(client).accountData.flags.admin = getClientData(client).accountData.flags.admin & ~getStaffFlagValue(flagName);
	return true;
}

// ---------------------------------------------------------------------------

function clearClientStaffFlags(client) {
	getClientData(client).accountData.flags.admin = getStaffFlagValue("none");
	return true;
}

// ---------------------------------------------------------------------------