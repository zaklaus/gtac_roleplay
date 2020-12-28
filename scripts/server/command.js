// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: command.js
// DESC: Provides command data, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverCommands = {};

// ---------------------------------------------------------------------------

function initCommandScript() {
    console.log("[Asshat.Command]: Initializing commands script ...");
    serverCommands = loadCommandData();
    console.log("[Asshat.Command]: Initialized commands script!");
}

// ---------------------------------------------------------------------------

function loadCommandData() {
    let tempCommands = {
        account: [
            commandData("login", loginCommand, "<password>", getStaffFlagValue("none"), false, false),
            commandData("register", registerCommand, "<password>", getStaffFlagValue("none"), false, false),
            commandData("changepass", changePasswordCommand, "<password>", getStaffFlagValue("none"), true, false),
            commandData("iplogin", autoLoginByIPCommand, "", getStaffFlagValue("none"), true, false),
            commandData("autolastchar", autoSelectLastCharacterCommand, "", getStaffFlagValue("none"), true, false),
            commandData("gui", toggleAccountGUICommand, "", getStaffFlagValue("none"), false, false),
            commandData("2fa", toggleAccountTwoFactorAuthCommand, "", getStaffFlagValue("none"), true, false),
            commandData("setemail", setAccountEmailCommand, "<email address>", getStaffFlagValue("none"), true, false),
            commandData("setdiscord", setAccountDiscordCommand, "<Name#0000 - discord name and id>", getStaffFlagValue("none"), true, false),
        ],
        ammunation: [],
        ban: [
            commandData("aban", accountBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true),
            commandData("saban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true),
            commandData("ipban", ipBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true), 
        ],
        bitFlag: [],
        business: [
            commandData("addbiz", createBusinessCommand, "<name>", getStaffFlagValue("manageBusinesses"), true, false),
            commandData("delbiz", deleteBusinessCommand, "[id]", getStaffFlagValue("manageBusinesses"), true, true),
            commandData("addbizloc", createBusinessLocationCommand, "<type> <business id> <name>", getStaffFlagValue("manageBusinesses"), true, false),
            commandData("delbizloc", deleteBusinessLocationCommand, "[id]", getStaffFlagValue("manageBusinesses"), true, false),

            commandData("bizlock", lockBusinessCommand, "", getStaffFlagValue("none"), true, true),
            commandData("bizfee", setBusinessEntranceFeeCommand, "<amount>", getStaffFlagValue("none"), true, true),
            commandData("biztill", viewBusinessTillAmountCommand, "", getStaffFlagValue("none"), true, true),
            commandData("bizwithdraw", withdrawFromBusinessCommand, "<amount>", getStaffFlagValue("none"), true, true),
            commandData("bizdeposit", depositIntoBusinessCommand, "<amount>", getStaffFlagValue("none"), true, true),
            commandData("bizname", setBusinessNameCommand, "<name>", getStaffFlagValue("none"), true, true),
            commandData("bizowner", setBusinessOwnerCommand, "<player name/id>", getStaffFlagValue("none"), true, true),
            commandData("bizblip", setBusinessBlipCommand, "<type name/model id>", getStaffFlagValue("manageBusinesses"), true, true),
            commandData("bizpickup", setBusinessPickupCommand, "<type name/model id>", getStaffFlagValue("manageBusinesses"), true, true),
            commandData("bizinfo", getBusinessInfoCommand, "[id]", getStaffFlagValue("none"), true, true),
            commandData("bizentrance", moveBusinessEntranceCommand, "", getStaffFlagValue("manageBusinesses"), true, true),
            commandData("bizexit", moveBusinessEntranceCommand, "", getStaffFlagValue("manageBusinesses"), true, true),
        ],
        chat: [
            commandData("me", meActionCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("do", doActionCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("s", shoutCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("shout", shoutCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("talk", talkCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("local", talkCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("l", talkCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("w", whisperCommand, "<message>", getStaffFlagValue("none"), true, false),
            commandData("whisper", whisperCommand, "<message>", getStaffFlagValue("none"), true, false), 
            commandData("clanchat", clanChatCommand, "<message>", getStaffFlagValue("none"), true, false), 
            commandData("clan", clanChatCommand, "<message>", getStaffFlagValue("none"), true, false), 
            commandData("c", clanChatCommand, "<message>", getStaffFlagValue("none"), true, false), 
            commandData("adminchat", adminChatCommand, "<message>", getStaffFlagValue("basicModeration"), true, true),
            commandData("a", adminChatCommand, "<message>", getStaffFlagValue("basicModeration"), true, true),
            commandData("achat", adminChatCommand, "<message>", getStaffFlagValue("basicModeration"), true, true),
        ],
        clan: [
            commandData("addclan", createClanCommand, "<name>", getStaffFlagValue("manageClans"), true, true),  
            commandData("delclan", deleteClanCommand, "<clan id>", getStaffFlagValue("manageClans"), true, true),  

            commandData("clanowner", setClanOwnerCommand, "<clan id> <player name/id>", getStaffFlagValue("none"), true, true),  
            commandData("clantag", setClanTagCommand, "<tag>", getStaffFlagValue("none"), true, true),
            commandData("clanranktag", setClanRankTagCommand, "<rank id> <tag>", getStaffFlagValue("none"), true, true),
            commandData("clanmembertag", setClanMemberTagCommand, "<player name/id> <tag>", getStaffFlagValue("none"), true, true),
            commandData("clanranktitle", setClanRankTitleCommand, "<rank id> <title>", getStaffFlagValue("none"), true, true),
            commandData("clanmembertitle", setClanMemberTitleCommand, "<player name/id> <title>", getStaffFlagValue("none"), true, true),
            commandData("addrankflag", addClanRankFlagCommand, "<rank name/id> <flag name>", getStaffFlagValue("none"), true, true),
            commandData("delrankflag", removeClanRankFlagCommand, "<rank name/id> <flag name>", getStaffFlagValue("none"), true, true),
            commandData("addmemberflag", addClanMemberFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("none"), true, true),            
            commandData("delmemberflag", removeClanMemberFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("none"), true, true),  
        ],
        class: [],
        client: [],
        colour: [],
        command: [
            commandData("cmdenabletype", enableAllCommandsByType, "<type>", getStaffFlagValue("developer"), true, true),
            commandData("cmddisabletype", disableAllCommandsByType, "<type>", getStaffFlagValue("developer"), true, true),
            commandData("cmdenable", enableCommand, "<command>", getStaffFlagValue("developer"), true, true),
            commandData("cmddisable", disableCommand, "<command>", getStaffFlagValue("developer"), true, true),
        ],
        config: [
            commandData("settime", setTimeCommand, "<hour> [minute]", getStaffFlagValue("manageServer"), true, true),
            commandData("setweather", setWeatherCommand, "<weather id/name>", getStaffFlagValue("manageServer"), true, true),
            commandData("setsnow", setSnowingCommand, "<falling snow> <ground snow>", getStaffFlagValue("manageServer"), true, true),
            commandData("setlogo", toggleServerLogoCommand, "<0/1 state>", getStaffFlagValue("manageServer"), true, true),   
            commandData("setgui", toggleServerGUICommand, "<0/1 state>", getStaffFlagValue("manageServer"), true, true),   
            commandData("newcharspawn", setNewCharacterSpawnPositionCommand, "", getStaffFlagValue("manageServer"), true, true),
            commandData("newcharcash", setNewCharacterMoneyCommand, "<amount>", getStaffFlagValue("manageServer"), true, true),
            commandData("newcharskin", setNewCharacterSkinCommand, "[skin id]", getStaffFlagValue("manageServer"), true, true),                     
        ],
        core: [],
        database: [],
        developer: [
            commandData("scode", executeServerCodeCommand, "<code>", getStaffFlagValue("developer"), true, true), 
            commandData("ccode", executeClientCodeCommand, "<code>", getStaffFlagValue("developer"), true, true),
            commandData("gmx", restartGameModeCommand, "", getStaffFlagValue("developer"), true, true),
            commandData("saveall", saveAllServerDataCommand, "", getStaffFlagValue("developer"), true, true),
            commandData("docmd", simulatePlayerCommand, "<player name/id> <command> [params]", getStaffFlagValue("developer"), true, true),
        ],
        discord: [],
        faction: [],
        help: [
            commandData("help", helpCommand, "", getStaffFlagValue("none"), false, false),
        ],
        house: [
            commandData("addhouse", createHouseCommand, "<description>", getStaffFlagValue("manageHouses"), true, false),
            commandData("delhouse", deleteHouseCommand, "", getStaffFlagValue("manageHouses"), true, false),
            commandData("houseinfo", getHouseInfoCommand, "", getStaffFlagValue("none"), true, false),
            commandData("housedesc", setHouseDescriptionCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houselock", lockUnlockHouseCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houseowner", setHouseOwnerCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houseblip", setHouseBlipCommand, "<type name/model id>", getStaffFlagValue("manageHouses"), true, true),
            commandData("housepickup", setHousePickupCommand, "<type name/model id>", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseinfo", getHouseInfoCommand, "[id]", getStaffFlagValue("none"), true, true),
            commandData("houseentrance", moveHouseEntranceCommand, "", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseexit", moveHouseEntranceCommand, "", getStaffFlagValue("manageHouses"), true, true),            
        ],
        item: [],
        job: [
            commandData("takejob", takeJobCommand, "", getStaffFlagValue("none"), true, false),
            commandData("startwork", startWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("stopwork", stopWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("quitjob", quitJobCommand, "", getStaffFlagValue("none"), true, false),
            commandData("uniform", jobUniformCommand, "[uniform]", getStaffFlagValue("none"), true, false),
            commandData("equip", jobEquipmentCommand, "[equipment]", getStaffFlagValue("none"), true, false),
            commandData("reloadjobs", reloadAllJobsCommand, "", getStaffFlagValue("developer"), true, false),

            commandData("radio", jobRadioCommand, "", getStaffFlagValue("none"), true, false),
            commandData("r", jobRadioCommand, "", getStaffFlagValue("none"), true, false),
            commandData("department", jobDepartmentRadioCommand, "", getStaffFlagValue("none"), true, false),
            commandData("d", jobDepartmentRadioCommand, "", getStaffFlagValue("none"), true, false),

            // Taxi
            commandData("fare", taxiSetFareCommand, "", getStaffFlagValue("none"), true, false),

            // Police
            commandData("tazer", policeTazerCommand, "", getStaffFlagValue("none"), true, false),
            commandData("cuff", policeCuffCommand, "", getStaffFlagValue("none"), true, false),
            commandData("detain", policeDetainCommand, "", getStaffFlagValue("none"), true, false),
            commandData("drag", policeDragCommand, "", getStaffFlagValue("none"), true, false),
            commandData("search", policeSearchCommand, "", getStaffFlagValue("none"), true, false),
            
            // Bus/Garbage
            commandData("startroute", jobStartRouteCommand, "", getStaffFlagValue("none"), true, false),
            commandData("stoproute", jobStopRouteCommand, "", getStaffFlagValue("none"), true, false),

            // Admin Job Stuff
            commandData("addjobloc", createJobLocationCommand, "<job name/id>", getStaffFlagValue("manageJobs"), true, false),
            commandData("deljobloc", deleteJobLocationCommand, "", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobloctoggle", deleteJobLocationCommand, "", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobwhitelist", toggleJobWhiteListCommand, "[job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobblacklist", toggleJobBlackListCommand, "[job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobtoggle", toggleJobEnabledCommand, "[job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobaddplayerwl", addPlayerToJobWhiteListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobaddplayerbl", addPlayerToJobBlackListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobdelplayerbl", removePlayerFromJobBlackListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobdelplayerbl", removePlayerFromJobWhiteListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
        ],
        keybind: [
            commandData("bindkey", addKeyBindCommand, "<key id/name> <command> [params]", getStaffFlagValue("none"), true, false),
            commandData("unbindkey", removeKeyBindCommand, "<key id/name>", getStaffFlagValue("none"), true, false),
            //commandData("keybinds", showKeyBindCommands, "", getStaffFlagValue("none"), true, false),
        ],
        locale: [],
        messaging: [],
        misc: [
            commandData("pos", getPositionCommand, "", getStaffFlagValue("basicModeration"), true, false),
            commandData("idea", submitIdeaCommand, "<message>", getStaffFlagValue("none"), true, true),
            commandData("bug", submitBugReportCommand, "<message>", getStaffFlagValue("none"), true, true),
            commandData("enter", enterExitPropertyCommand, "", getStaffFlagValue("none"), true, true),
            commandData("exit", enterExitPropertyCommand, "", getStaffFlagValue("none"), true, false),
        ],
        moderation: [
            commandData("kick", kickClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("mute", muteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("freeze", freezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("unmute", unMuteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
            commandData("unfreeze", unFreezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),			
            commandData("goto", gotoPlayerCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true),	
            commandData("gethere", getPlayerCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true),	
            commandData("fr", teleportForwardCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("ba", teleportBackwardCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),	
            commandData("lt", teleportLeftCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),	
            commandData("rt", teleportRightCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),	
            commandData("up", teleportUpCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),	
            commandData("dn", teleportDownCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),	
            
            commandData("addstaffflag", addStaffFlagCommand, "<player name/id> [flag name]", getStaffFlagValue("manageAdmins"), true, true),
            commandData("delstaffflag", takeStaffFlagCommand, "<player name/id> [flag name]", getStaffFlagValue("manageAdmins"), true, true),
            commandData("getstaffflags", getStaffFlagsCommand, "<player name/id>", getStaffFlagValue("manageAdmins"), true, true),
            commandData("clearstaffflags", clearStaffFlagsCommand, "<player name/id>", getStaffFlagValue("manageAdmins"), true, true),
            commandData("staffflags", allStaffFlagsCommand, "", getStaffFlagValue("manageAdmins"), true, true),

            commandData("givemoney", givePlayerMoneyCommand, "<player name/id> <amount>", getStaffFlagValue("giveMoney"), true, true),
        ],
        security: [],
        startup: [],
        subAccount: [
            commandData("switchchar", switchCharacterCommand, "", getStaffFlagValue("none"), true, false),
            commandData("newchar", newCharacterCommand, "<first name> <last name>", getStaffFlagValue("none"), true, false),
            commandData("usechar", useCharacterCommand, "<character id>", getStaffFlagValue("none"), true, false),            
        ],
        translate: [],
        utilities: [],
        vehicle: [
            commandData("addveh", createVehicleCommand, "<model id/name>", getStaffFlagValue("manageVehicles"), true, false),	
            commandData("tempveh", createTemporaryVehicleCommand, "<model id/name>", getStaffFlagValue("manageVehicles"), true, false),
            commandData("delveh", deleteVehicleCommand, "", getStaffFlagValue("manageVehicles"), true, false),
            
            commandData("lock", vehicleLockCommand, "", getStaffFlagValue("none"), true, false),	
            commandData("engine", vehicleEngineCommand, "", getStaffFlagValue("none"), true, false),	
            commandData("siren", vehicleSirenCommand, "", getStaffFlagValue("none"), true, false),	
            commandData("lights", vehicleLightsCommand, "", getStaffFlagValue("none"), true, false),	

            commandData("vehowner", setVehicleOwnerCommand, "<player id/name>", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehclan", setVehicleClanCommand, "<clan id/name>", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehdealer", setVehicleToDealershipCommand, "", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehjob", setVehicleJobCommand, "[job id/name]", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehdelowner", removeVehicleOwnerCommand, "", getStaffFlagValue("manageVehicles"), true, true),

            commandData("vehinfo", getVehicleInfoCommand, "", getStaffFlagValue("none"), true, true),
            commandData("vehpark", toggleVehicleSpawnLockCommand, "", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehrespawnall", respawnAllVehiclesCommand, "", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehreloadall", reloadAllVehiclesCommand, "", getStaffFlagValue("manageVehicles"), true, true),

            commandData("vehrent", rentVehicleCommand, "", getStaffFlagValue("none"), true, true),
            commandData("vehrentprice", setVehicleRentPriceCommand, "", getStaffFlagValue("none"), true, true),
            commandData("vehbuyprice", setVehicleBuyPriceCommand, "", getStaffFlagValue("none"), true, true),
            commandData("stoprent", stopRentingVehicleCommand, "", getStaffFlagValue("none"), true, true),
            commandData("vehbuy", buyVehicleCommand, "", getStaffFlagValue("none"), true, true),
            commandData("vehcolour", setVehicleColourCommand, "<colour1> <colour2>", getStaffFlagValue("none"), true, true),
            commandData("vehrepair", vehicleRepairCommand, "", getStaffFlagValue("none"), true, true),
            commandData("passenger", enterVehicleAsPassengerCommand, "", getStaffFlagValue("none"), true, true),
        ],
    }
    return tempCommands;
}

// ---------------------------------------------------------------------------

function getCommand(command) {
    let commandGroups = getCommands()
    for(let i in commandGroups) {
        let commandGroup = commandGroups[i];
        for(let j in commandGroup) {
            if(toLowerCase(commandGroup[j].command) == toLowerCase(command)) {
                return commandGroup[j];
            }
        }
    }

    return false;
}

// ---------------------------------------------------------------------------

function getCommands() {
    return serverCommands;
}

// ---------------------------------------------------------------------------

function commandData(command, handlerFunction, syntaxString = "", requiredStaffFlags = getStaffFlagValue("none"), requireLogin = true, allowOnDiscord = true) {
    return new serverClasses.commandData(command, handlerFunction, syntaxString, requiredStaffFlags, requireLogin, allowOnDiscord);
}

// ---------------------------------------------------------------------------

function doesCommandRequireLogin(command) {
    return getCommand(command).requireLogin;
}

// ---------------------------------------------------------------------------

function getCommandRequiredPermissions(command) {
    return getCommand(command).requiredStaffFlags;
}

// ---------------------------------------------------------------------------

function getCommandSyntaxText(command) {
    return `/${command} ${getCommand(command).syntaxString}`;
}

// ---------------------------------------------------------------------------

function isCommandAllowedOnDiscord(command) {
    return getCommand(command).allowOnDiscord;
}

// ---------------------------------------------------------------------------

function disableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
    }
    
    params = toLowerCase(params);

    if(!getCommand(params)) {
        messageClientError(client, `The command [#AAAAAA]/${params} [#FFFFFF] does not exist!`);
        return false;
    }    

    getCommand(params).enabled = false;
	messageClientSuccess(client, `Command [#AAAAAA]/${params} [#FFFFFF]has been disabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function enableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
    }
    
    params = toLowerCase(params);

    if(!getCommand(params)) {
        messageClientError(client, `The command [#AAAAAA]/${params} [#FFFFFF] does not exist!`);
        return false;
    }    

    getCommand(params).enabled = true;
	messageClientSuccess(client, `Command [#AAAAAA]/${params} [#FFFFFF]has been enabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function disableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    params = toLowerCase(params);
    
    if(isNull(getServerData().commands[params])) {
        messageClientError(client, `Command type [#AAAAAA]${params} [#FFFFFF]does not exist!`);
        return false;
    }    

    for(let i in getServerData().commands[params]) {
        getServerData().commands[params][i].enabled = false;
    }

	messageClientSuccess(client, `[#FF9900]All [#AAAAAA]${params} [#FFFFFF]commands have been disabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function enableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
    }
        
    params = toLowerCase(params);
    
    if(isNull(getServerData().commands[params])) {
        messageClientError(client, `Command type [#AAAAAA]${params} [#FFFFFF]does not exist!`);
        return false;
    }

    for(let i in getServerData().commands[params]) {
        getServerData().commands[params][i].enabled = true;
    }

	messageClientSuccess(client, `[#FF9900]All [#AAAAAA]${params} [#FFFFFF]commands have been enabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function onPlayerCommand(event, client, command, params) {
    let commandData = getCommand(command);

    let paramsDisplay = params;
    if(areParamsEmpty(params)) {
        paramsDisplay = ""
    }

    if(!commandData) {
        console.warn(`[Asshat.Command] ${getClientDisplayForConsole(client)} attempted to use command, but failed (invalid command): /${command} ${paramsDisplay}`);
        messageClientError(client, `The command [#AAAAAA]/${command} [#FFFFFF]does not exist! Use /help for commands and information.`);
        return false;
    }

    if(!commandData.enabled) {
        console.warn(`[Asshat.Command] ${getClientDisplayForConsole(client)} attempted to use command, but failed (command is disabled): /${command} ${paramsDisplay}`);
        messageClientError(client, `The command [#AAAAAA]/${command} [#FFFFFF]is disabled!`);
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
            console.warn(`[Asshat.Command] ${getClientDisplayForConsole(client)} attempted to use command, but failed (requires login first): /${command} ${paramsDisplay}`);
			messageClientError(client, `You must be logged in to use the [#AAAAAA]/${command} [#FFFFFF]command!`);
			return false;
		}
	}

	//if(isClientFromDiscord(client)) {
	//	if(!isCommandAllowedOnDiscord(command)) {
    //        console.warn(`[Asshat.Command] ${getClientDisplayForConsole(client)} attempted to use command from discord, but failed (not available on discord): /${command} ${paramsDisplay}`);
	//		messageClientError(client, `The [#AAAAAA]/${command} [#FFFFFF] command isn't available on discord!`);
	//		return false;
	//	}		
	//}

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
        console.warn(`[Asshat.Command] ${getClientDisplayForConsole(client)} attempted to use command, but failed (no permission): /${command} ${paramsDisplay}`);
		messageClientError(client, `You do not have permission to use the [#AAAAAA]/${command} [#FFFFFF]command!`);
		return false;
    }
    
    console.log(`[Asshat.Command] ${getClientDisplayForConsole(client)} used command: /${command} ${paramsDisplay}`);
    commandData.handlerFunction(command, params, client);
}
addEventHandler("OnPlayerCommand", onPlayerCommand);

// ---------------------------------------------------------------------------

addCommandHandler("cmd", function(command, params, client) {
    if(!client.console) {
        return false;
    }

    let splitParams = params.split(" ");
    let newCommand = splitParams[0];
    let newParams = splitParams.slice(1).join(" ");

    getCommand(newCommand).handlerFunction(newCommand, newParams, client);
});

// ---------------------------------------------------------------------------

function listAllCommands() {
    for(let i in serverCommands) {
        for(let j in serverCommands[i]) {
            console.log(serverCommands[i][j].command);
        }
    }
}

// ---------------------------------------------------------------------------