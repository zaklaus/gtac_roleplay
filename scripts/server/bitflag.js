// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: bitflags.js
// DESC: Provides bitwise operations, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================

let serverBitFlags = {
	staffFlags: {},
	moderationFlags: {},
	factionFlags: {},
	clanFlags: {},
	accountSettingsFlags: {},
	subAccountSettingsFlags: {},
	accountFlags: {},
};

// ===========================================================================

let serverBitFlagKeys = {
	staffFlagKeys: [
		"none",
		"basicModeration",
		"manageHouses",
		"manageVehicles",
		"manageBusinesses",
		"manageClans",
		"manageServer",
		"manageAdmins",
		"manageJobs",
		"manageItems",
		"manageWorld",
		"manageAntiCheat",
		"developer",
	],
	moderationFlagKeys: [
		"none",
		"muted",
		"frozen",
		"hackerBox",
		"gunBanned",
		"jobBanned",
		"ammuBanned",
		"noSkinCustomization",
		"desyncWeapons",
		"hackerWorld",
		"adminJailed",
		"exemptFromAntiCheat",
		"exemptFromBans",
		"forceTutorial",
		"characterNameNeedsStaffApproval",
		"emailVerified",
		"twoFactorAuthVerified",
	],
	factionFlagKeys: [
		"none",
		"police",
		"medical",
		"fire",
		"government",
		"generic",
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
		"startTurfWar",
		"startPointWar",
		"inviteMember",
		"suspendMember",
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
		"manageNPCs",
		"owner",
	],
	accountSettingsFlagKeys: [
		"none",
		"useWhiteList",
		"useBlackList",
		"twoStepAuth",
		"authAttemptAlert",
		"noGUI",
		"autoLoginIP",
		"noServerLogo",
		"autoSelectLastCharacter",
		"showRealTimeClock",
		"useGUIForItems",
		"useRadialWheelItems", // If this is disabled, use MMORPG-style hotbar IF useGUIForItems is enabled
		"disableKeyBinds",
		"showTimedRandomTips",
		"showActionTips",
	],
	npcTriggerTypeKeys: [
		"farProximity",               // Comes within a far distance of NPC
		"mediumProximity",            // Comes within a medium distance of NPC
		"nearProximity",              // Comes within a close distance of NPC
		"enterLineOfSight",           // Enters the NPC's line of sight
		"exitLineOfSight",            // Leaves the NPC's line of sight
		"pedCollision",               // Bumps into ped on foot
		"vehicleCollision",           // Bumps into ped with a vehicle
		"shootGun",                   // Shoots a gun (target isn't a factor, it's just about only shooting a gun in general)
		"swingMelee",                 // Swings a melee weapon (target doesnt matter, it's just about only swinging a melee weapon in general)
		"hotwireVehicleStart",        // Begin attempt to hotwire a vehicle
		"hotwireVehicleFail",         // Failed to hotwire a vehicle
		"hotwireVehicleSucceed",      // Succeeded at hotwiring a vehicle
		"vehicleAlarmStart",          // Vehicle alarm goes off
		"vehicleAlarmStop",           // Vehicle alarm shuts off (disabled, battery dead, damaged, or just turned off legitly)
		"sirenStart",                 // Any vehicle with a siren that gets activated
		"sirenStop",                  // Any vehicle with a siren that gets deactivated
		"vehicleEnter",               // Enters any vehicle
		"vehicleExit",                // Exits any vehicle
		"propertyEnter",              // Enters any interior
		"propertyExit",               // Exits any interior
		"attackedByMelee",            // Any element is attacked by melee weapon
		"attackedByGun",              // Any element is attacked by gun
		"attackedByFist",             // Any element is attacked by fist
	],
	npcTriggerConditionTypeKeys: [
		"isInLineOfSight",
		"isFarProximity",
		"isMediumProximity",
		"isNearProximity",
		"isEnemyClan",
		"isAllyClan",
		"isSameClan",
		"isNotInClan",
		"isLawEnforcement",
		"isFirefighter",
		"isParamedic",
		"isCriminal",
		"hasWantedLevel",
		"isSelfVehicle",
		"isPlayerVehicle",
		"isOtherVehicle",
		"isClanVehicle",
		"isEmergencyVehicle",
		"isPoliceVehicle",
		"isDriver",
		"isInFrontSeat",
		"isInSeatId",
		"vehicleLocked",
		"vehicleHotwired",
		"isPistol",
		"isShotgun",
		"isAutomatic",
		"isRifle",
		"isAssaultRifle",
		"isSniper",
		"isRPG",
		"isFlameThrower",
		"isTalking",
		"isShouting",
		"isWhispering",
	],
	npcTriggerResponseTypeKeys: [
		"shout",
		"talk",
		"whisper",
		"switchWeapon",
		"shootWeapon",
		"aimWeapon",
		"fleeSprint",
		"fleeWalk",
		"fleeRun",
		"attackMelee",
		"attackFist",
		"walkToward",
		"runToward",
		"sprintToward",
		"crouch",
		"phoneCall",
		"walkieTalkieMessage",
		"switchRadioStation",
		"toggleSiren",
		"fleeTo",
		"driveTo",
		"enterVehicle",
		"exitVehicle",
		"pullOutOfVehicle",
		"enterProperty",
		"searchArea",
	],
}

// ===========================================================================

function initBitFlagScript() {
	serverBitFlags.staffFlags = createBitFlagTable(serverBitFlagKeys.staffFlagKeys);
	serverBitFlags.moderationFlags = createBitFlagTable(serverBitFlagKeys.moderationFlagKeys);
	serverBitFlags.accountSettingsFlags = createBitFlagTable(serverBitFlagKeys.accountSettingsFlagKeys);
	//serverBitFlags.subAccountSettingsFlags = createBitFlagTable(getServerData().subAccountSettingsFlagKeys);
	serverBitFlags.clanFlags = createBitFlagTable(serverBitFlagKeys.clanFlagKeys);
	serverBitFlags.clanPermissionFlags = createBitFlagTable(serverBitFlagKeys.clanPermissionFlagKeys);
	serverBitFlags.factionFlags = createBitFlagTable(serverBitFlagKeys.factionFlagKeys);
	serverBitFlags.npcTriggerTypes = createBitFlagTable(serverBitFlagKeys.npcTriggerTypeKeys);
	serverBitFlags.npcTriggerConditionTypes = createBitFlagTable(serverBitFlagKeys.npcTriggerConditionTypeKeys);
	serverBitFlags.npcTriggerResponseTypes = createBitFlagTable(serverBitFlagKeys.npcTriggerResponseTypeKeys);
	return true;
}

// ===========================================================================

function addBitFlagCommandHandlers() {
	return true;
}

// ===========================================================================

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

// ===========================================================================

function hasBitFlag(allFlags, checkForFlag) {
	if(allFlags == 0) {
		return false;
	}

	if(allFlags == -1) {
		return true;
	}

	return (allFlags & checkForFlag);
}

// ===========================================================================

function doesPlayerHaveStaffPermission(client, requiredFlags) {
	if(isConsole(client)) {
		return true;
	}

	if(requiredFlags == getStaffFlagValue("none")) {
		return true;
	}

	let staffFlags = 0;
	if(getPlayerData(client)) {
		staffFlags = getPlayerData(client).accountData.flags.admin;
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

// ===========================================================================

function doesPlayerHaveClanPermission(client, requiredFlags) {
	if(isConsole(client)) {
		return true;
	}

	if(requiredFlags == getClanFlagValue("none")) {
		return true;
	}

	if(doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageClans"))) {
		return true;
	}

	let clanFlags = 0;
	clanFlags = getPlayerCurrentSubAccount(client).clanFlags | getClanRankFlags(getPlayerCurrentSubAccount(client).clanRank);

	// -1 is automatic override (having -1 for staff flags is basically god mode admin level)
    if(clanFlags == getClanFlagValue("all")) {
        return true;
    }

    if(clanFlags & requiredFlags) {
        return true;
    }

    return false;
}

// ===========================================================================

function getStaffFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}

	if(typeof serverBitFlags.staffFlags[flagName] === "undefined") {
		return false;
	}

	return serverBitFlags.staffFlags[flagName];
}

// ===========================================================================

function getClanFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}

	if(typeof getServerBitFlags().clanFlags[flagName] === "undefined") {
		return false;
	}

	return getServerBitFlags().clanFlags[flagName];
}

// ===========================================================================

function getAccountSettingsFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}

	if(typeof serverBitFlags.accountSettingsFlags[flagName] === "undefined") {
		return false;
	}

	return serverBitFlags.accountSettingsFlags[flagName];
}

// ===========================================================================

function getModerationFlagValue(flagName) {
    if(flagName == "all") {
        return -1;
	}

	if(typeof serverBitFlags.moderationFlags[flagName] === "undefined") {
		return false;
	}

	return serverBitFlags.moderationFlags[flagName];
}

// ===========================================================================

function givePlayerStaffFlag(client, flagName) {
	if(!getStaffFlagValue(flagName)) {
		return false;
	}

	getPlayerData(client).accountData.flags.admin = getPlayerData(client).accountData.flags.admin | getStaffFlagValue(flagName);
	return true;
}

// ===========================================================================

function takePlayerStaffFlag(client, flagName) {
	if(!getStaffFlagValue(flagName)) {
		return false;
	}

	getPlayerData(client).accountData.flags.admin = getPlayerData(client).accountData.flags.admin & ~getStaffFlagValue(flagName);
	return true;
}

// ===========================================================================

function addBitFlag(allFlags, flagValue) {
	return allFlags | flagValue;
}

// ===========================================================================

function removeBitFlag(allFlags, flagValue) {
	return allFlags & ~flagValue;
}

// ===========================================================================

function takePlayerStaffFlag(client, flagName) {
	if(!getStaffFlagValue(flagName)) {
		return false;
	}

	getPlayerData(client).accountData.flags.admin = getPlayerData(client).accountData.flags.admin & ~getStaffFlagValue(flagName);
	return true;
}

// ===========================================================================

function clearPlayerStaffFlags(client) {
	getPlayerData(client).accountData.flags.admin = getStaffFlagValue("none");
	return true;
}

// ===========================================================================

function getServerBitFlags() {
	return serverBitFlags;
}

// ===========================================================================

function getServerBitFlagKeys() {
	return serverBitFlagKeys;
}

// ===========================================================================

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

// ===========================================================================