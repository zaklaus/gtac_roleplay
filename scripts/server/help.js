// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: help.js
// DESC: Provides update info, help commands, and documentation
// TYPE: Server (JavaScript)
// ===========================================================================

function helpCommand(command, params, client) {
	if(getCommand(command).requireLogin) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You must be logged in to use this command!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
    }

	if(areParamsEmpty(params)) {
        showMainHelpMessage(client);
	}
}

// == Account Help =============================
// == Vehicle Help =============================
// == Job Help =================================
// == Chat Help ================================
// == Server Rules =============================
// == Website ==================================
// == Animations ===============================
// == Pay And Spray ============================
// == Ammunation ===============================
// == Vehicle Tuneup ===========================
// == Bindable Keys ============================

// ----------------------------------------------------------------------------

function showMainHelpMessage(client) {
    messageClientInfo(client, "== Help =================================");
    messageClientInfo(client, "[#FFFFFF]Help Categories: [#A9A9A9]Account, Command, Vehicle, Job, Chat, Rules, Website, Anim");
    messageClientInfo(client, "[#A9A9A9]Ammunation, Skins, Mechanic, Dealership, Discord, Colours, Keys");
}

// ----------------------------------------------------------------------------

function showAccountHelpMessage(client) {
    messageClientInfo(client, "== Account Help =============================");
    messageClientInfo(client, "- Do not share your password with anybody else.");
    messageClientInfo(client, "- Use /settings to change your account settings.");
    messageClientInfo(client, "- Use /iplogin to automatically log you in with your IP");
    messageClientInfo(client, "- Use /changepass to change your password.");
}

// ----------------------------------------------------------------------------

function showAccountHelpMessage(client) {
    messageClientInfo(client, "== Account Help =============================");
    messageClientInfo(client, "- Do not share your password with anybody else.");
    messageClientInfo(client, "- Use /settings to change your account settings.");
    messageClientInfo(client, "- Use /iplogin to automatically log you in with your IP");
    messageClientInfo(client, "- Use /changepass to change your password.");
}

// ----------------------------------------------------------------------------

function showVehicleHelpMessage(client) {
    messageClientInfo(client, "== Vehicle Help =============================");
    messageClientInfo(client, "- Visit dealerships to buy new vehicles.");
    messageClientInfo(client, "- Some commands: /lock /engine /lights /trunk");
    messageClientInfo(client, "- Your personal vehicles will respawn wherever you leave them!");
    messageClientInfo(client, "- Visit a mechanic garage to repair, colour, and tune up your car!");
}

// ----------------------------------------------------------------------------

function showAccountHelpMessage(client) {
    messageClientInfo(client, "== Vehicle Help =============================");
    messageClientInfo(client, "- Visit dealerships to buy new vehicles.");
    messageClientInfo(client, "- Use /lock to unlock your car.");
    messageClientInfo(client, "- The /lights command can turn on and off your headlights.");
    messageClientInfo(client, "- To turn an engine on or off, use /engine");
    messageClientInfo(client, "- Your personal vehicles will respawn wherever you leave them!");
    messageClientInfo(client, "- Visit a mechanic garage to repair, colour, and tune up your car!");
}

// ----------------------------------------------------------------------------

function showEnteredDriverSeatHelpTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.enteredDriverSeat) {
        //messageClientInfo(client, `Press ${serverConfig.keybindText.vehicleEngineKey} for engine, ${serverConfig.keybindText.vehicleLightsKey} for lights, and ${serverConfig.keybindText.vehicleLockKey} for door locks`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.enteredDriverSeat;
    }  
}

// ----------------------------------------------------------------------------

function showApproachJobWhileUnemployedTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.approachJobWhileUnemployed) {
        //messageClientInfo(client, `Approach the icon and press ${serverConfig.keybindText.actionKey} to see info about this job.`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.approachJobWhileUnemployed;
    }  
}

// ----------------------------------------------------------------------------

function showTakeNearbyJobTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.takeJobWhileUnemployed) {
        //messageClientInfo(client, `Use /takejob to take this job.`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.takeJobWhileUnemployed;
    }  
}

// ----------------------------------------------------------------------------

function showApproachCurrentJobTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.approachCurrentJob) {
        //messageClientInfo(client, `Press ${serverConfig.keybindText.actionKey} to start working, or hold ${serverConfig.keybindText.actionKey} to quit your job.`);
        //messageClientInfo(client, `Use /startwork to start working, or /quitjob to quit your job.`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.approachCurrentJob;
    }
}

// ----------------------------------------------------------------------------

function showStartedWorkingTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.startedWorking) {
        messageClientInfo(client, `Press ${serverConfig.keybindText.actionKey} to change uniform, or hold ${serverConfig.keybindText.actionKey} to stop working.`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.startedWorking;
    }
}

// ----------------------------------------------------------------------------

function showApproachOwnedVehicleTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.approachOwnedVehicle) {
        messageClientInfo(client, `Press ${serverConfig.keybindText.actionKey} to see vehicle info, or press ${serverConfig.keybindText.vehicleLockKey} to lock and unlock the vehicle.`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.approachOwnedVehicle;
    }
}

// ----------------------------------------------------------------------------

function showApproachAnyVehicleTip(client) {
    if(getClientData(client).accountData.shownTips & !shownTipsFlags.approachAnyVehicle) {
        messageClientInfo(client, `Press ${serverConfig.keybindText.actionKey} to see vehicle info.`);
        getClientData(client).accountData.shownTips = getClientData(client).accountData.shownTips | shownTipsFlags.approachAnyVehicle;
    }
}

// ----------------------------------------------------------------------------