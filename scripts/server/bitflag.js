// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: bitflags.js
// DESC: Provides bitwise operations, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initBitFlagScript() {
	serverData.staffFlags = createBitFlagTable(serverData.staffFlagKeys);
	serverData.moderationFlags = createBitFlagTable(serverData.moderationFlagKeys);
	serverData.accountSettingsFlags = createBitFlagTable(serverData.accountSettingsFlagKeys);
	//serverData.subAccountSettingsFlags = createBitFlagTable(serverData.subAccountSettingsFlagKeys);
	serverData.clanFlags = createBitFlagTable(serverData.clanFlagKeys);
	serverData.clanPermissionFlags = createBitFlagTable(serverData.clanPermissionFlagKeys);
	serverData.factionFlags = createBitFlagTable(serverData.factionFlagKeys);
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

function doesClientHaveStaffPermission(client, requiredFlags) {
	if(requiredFlags == getStaffFlagValue("none")) {
		return true;
	}

	let staffFlags = 0;
	if(isClientFromDiscord(client)) {
		staffFlags = serverData.clients[client.index].accountData.staffFlags;
	} else {
		staffFlags = getDiscordUserData(client).accountData.staffFlags;
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

	return serverData.staffFlags[flagName];
}

// ---------------------------------------------------------------------------