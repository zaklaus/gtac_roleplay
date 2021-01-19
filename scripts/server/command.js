// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: command.js
// DESC: Provides command data, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverCommands = [];

let builtInCommands = [
    "refresh",
    "restart",
    "stop",
    "start",
    "reconnect",
    "setname",
    "connect",
    "disconnect",
    "say",
    "dumpdoc",
];

// ---------------------------------------------------------------------------

function initCommandScript() {
    logToConsole(LOG_DEBUG, "[Asshat.Command]: Initializing commands script ...");
    serverCommands = loadCommands();
    //addAllCommandHandlers();
    logToConsole(LOG_DEBUG, "[Asshat.Command]: Initialized commands script!");
}

// ---------------------------------------------------------------------------

function loadCommands() {
    return {
        account: [
            commandData("login", loginCommand, "<password>", getStaffFlagValue("none"), false, false, "Login to an account"),
            commandData("register", registerCommand, "<password>", getStaffFlagValue("none"), false, false, "Creates an account"),
            commandData("changepass", changePasswordCommand, "<password>", getStaffFlagValue("none"), true, false, "Change an account password"),
            commandData("iplogin", autoLoginByIPCommand, "", getStaffFlagValue("none"), true, false, "Toggle whether to automatically login if you join with the same IP as your last join"),
            commandData("autolastchar", autoSelectLastCharacterCommand, "", getStaffFlagValue("none"), true, false, "Toggle whether to automatically spawn with the last character you played as"),
            commandData("gui", toggleAccountGUICommand, "", getStaffFlagValue("none"), false, false, "Toggle whether to use GUI. If GUI is disabled on the server, it won't show even if you have GUI enabled."),
            commandData("2fa", toggleAccountTwoFactorAuthCommand, "", getStaffFlagValue("none"), true, false, "Set up and use two-factor authentication."),
            commandData("setemail", setAccountEmailCommand, "<email address>", getStaffFlagValue("none"), true, false, "Sets your email. To reset your password, you must have a valid email set to your account."),
            commandData("setdiscord", setAccountDiscordCommand, "<Name#0000 - discord name and id>", getStaffFlagValue("none"), true, false, "Set up the integration for discord. Allows you to see info and use in-game commands on discord."),
        ],
        ammunation: [],
        ban: [
            commandData("aban", accountBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true, "Bans a player's account."),
            commandData("cban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true, "Bans a player's character."),
            commandData("saban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true, "Bans a player's character (subaccount)."),
            commandData("ipban", ipBanCommand, "<player name/id> <reason>", getStaffFlagValue("manageBans"), true, true, "Bans a player's IP."),
            commandData("subnetban", subNetBanCommand, "<player name/id> <range> <reason>", getStaffFlagValue("manageBans"), true, true, "Bans a player's subnet."),
        ],
        bitFlag: [],
        business: [
            commandData("addbiz", createBusinessCommand, "<name>", getStaffFlagValue("manageBusinesses"), true, false, "Creates a business"),
            commandData("delbiz", deleteBusinessCommand, "[id]", getStaffFlagValue("manageBusinesses"), true, true, "Deletes a business"),
            //commandData("addbizloc", createBusinessLocationCommand, "<type> <business id> <name>", getStaffFlagValue("manageBusinesses"), true, false),
            //commandData("delbizloc", deleteBusinessLocationCommand, "[id]", getStaffFlagValue("manageBusinesses"), true, false),
            commandData("bizreloadall", reloadAllBusinessesCommand, "", getStaffFlagValue("manageBusinesses"), true, false, "Reloads all businesses from the database"),

            commandData("bizlock", lockBusinessCommand, "", getStaffFlagValue("none"), true, true, "Locks a business"),
            commandData("bizfee", setBusinessEntranceFeeCommand, "<amount>", getStaffFlagValue("none"), true, true, "Sets a fee to charge players when they enter the business."),
            commandData("biztill", viewBusinessTillAmountCommand, "", getStaffFlagValue("none"), true, true, "Shows the business's till (cash register) amount"),
            commandData("bizwithdraw", withdrawFromBusinessCommand, "<amount>", getStaffFlagValue("none"), true, true, "Take money out of the business till (cash register)"),
            commandData("bizdeposit", depositIntoBusinessCommand, "<amount>", getStaffFlagValue("none"), true, true, "Put money into the business till (cash register)"),
            commandData("buy", buyFromBusinessCommand, "<slot> [amount]", getStaffFlagValue("none"), true, true, "Buy items from a business"),
            commandData("bizstock", stockItemOnBusinessFloorCommand, "<item name> <amount> <sell price>", getStaffFlagValue("none"), true, true, "Uses storage items to restock the business with."),
            commandData("bizstore", storeItemInBusinessStorageCommand, "<item name> <amount>", getStaffFlagValue("none"), true, true, "Moves items from the business to the business storage"),
            commandData("bizorder", orderItemForBusinessCommand, "<item name> <amount> <sell price>", getStaffFlagValue("none"), true, true, "Orders items to sell from a business"),
            commandData("bizitemprice", setBusinessItemSellPriceCommand, "<item slot> <sell price>", getStaffFlagValue("none"), true, true, "Sets the purchase price of a business item"),
            commandData("bizname", setBusinessNameCommand, "<name>", getStaffFlagValue("none"), true, true, "Changes a business name"),
            commandData("bizowner", setBusinessOwnerCommand, "<player name/id>", getStaffFlagValue("none"), true, true, "Changes the owner of a business"),
            commandData("bizblip", setBusinessBlipCommand, "<type name/model id>", getStaffFlagValue("manageBusinesses"), true, true, "Sets the business blip display"),
            commandData("bizpickup", setBusinessPickupCommand, "<type name/model id>", getStaffFlagValue("manageBusinesses"), true, true, "Sets the business pickup display"),
            commandData("bizinfo", getBusinessInfoCommand, "[id]", getStaffFlagValue("none"), true, true, "Shows business information"),
            commandData("bizentrance", moveBusinessEntranceCommand, "", getStaffFlagValue("manageBusinesses"), true, true, "Shows business information"),
            commandData("bizexit", moveBusinessExitCommand, "", getStaffFlagValue("manageBusinesses"), true, true, "Moves the exit (interior point) of the business"),
            commandData("bizinttype", setBusinessInteriorTypeCommand, "<interior template name/business id>", getStaffFlagValue("manageBusinesses"), true, true, "Changes the business' interior"),
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
            //commandData("setguicolours", setServerGUIColoursCommand, "<red> <green> <blue>", getStaffFlagValue("manageServer"), true, true),
            commandData("newcharspawn", setNewCharacterSpawnPositionCommand, "", getStaffFlagValue("manageServer"), true, true),
            commandData("newcharcash", setNewCharacterMoneyCommand, "<amount>", getStaffFlagValue("manageServer"), true, true),
            commandData("newcharskin", setNewCharacterSkinCommand, "[skin id]", getStaffFlagValue("manageServer"), true, true),
            commandData("jobinfo", getJobInfoCommand, "", getStaffFlagValue("none"), true, true),
            commandData("joblocinfo", getJobLocationInfoCommand, "", getStaffFlagValue("none"), true, true),
        ],
        core: [],
        database: [
            commandData("dbquery", executeDatabaseQueryCommand, "<query>", getStaffFlagValue("developer"), true, true),
            //commandData("dbinfo", getDatabaseInfoCommand, "", getStaffFlagValue("developer"), true, true),
        ],
        developer: [
            commandData("scode", executeServerCodeCommand, "<code>", getStaffFlagValue("developer"), true, true),
            commandData("ccode", executeClientCodeCommand, "<code>", getStaffFlagValue("developer"), true, true),
            commandData("gmx", restartGameModeCommand, "", getStaffFlagValue("developer"), true, true),
            commandData("saveall", saveAllServerDataCommand, "", getStaffFlagValue("developer"), true, true),
            commandData("docmd", simulateCommandForPlayerCommand, "<player name/id> <command> [params]", getStaffFlagValue("developer"), true, true),
            commandData("docmdall", simulateCommandForAllPlayersCommand, "<command> [params]", getStaffFlagValue("developer"), true, true),
            commandData("docmdall", simulateCommandForAllPlayersCommand, "<command> [params]", getStaffFlagValue("developer"), true, true),
            commandData("addloglvl", addServerLogLevelCommand, "<log level name>", getStaffFlagValue("developer"), true, true),
            commandData("delloglvl", removeServerLogLevelCommand, "<log level name>", getStaffFlagValue("developer"), true, true),
        ],
        discord: [],
        help: [
            commandData("help", helpCommand, "", getStaffFlagValue("none"), false, false),
        ],
        house: [
            commandData("addhouse", createHouseCommand, "<description>", getStaffFlagValue("manageHouses"), true, false),
            commandData("delhouse", deleteHouseCommand, "", getStaffFlagValue("manageHouses"), true, false),
            commandData("housereloadall", reloadAllHousesCommand, "", getStaffFlagValue("manageHouses"), true, false),

            commandData("houseinfo", getHouseInfoCommand, "", getStaffFlagValue("none"), true, false),
            commandData("housedesc", setHouseDescriptionCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houselock", lockUnlockHouseCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houseowner", setHouseOwnerCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houseblip", setHouseBlipCommand, "<type name/model id>", getStaffFlagValue("manageHouses"), true, true),
            commandData("housepickup", setHousePickupCommand, "<type name/model id>", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseinfo", getHouseInfoCommand, "[id]", getStaffFlagValue("none"), true, true),
            commandData("houseentrance", moveHouseEntranceCommand, "", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseexit", moveHouseExitCommand, "", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseinttype", setHouseInteriorTypeCommand, "<interior template name/business id>", getStaffFlagValue("manageHouses"), true, true),
        ],
        item: [
            commandData("i", playerSwitchHotBarSlotCommand, "<slot id>", getStaffFlagValue("none"), true, false),
            commandData("addgrounditem", createGroundItemCommand, "<item name/id>", getStaffFlagValue("manageItems"), true, false),
            commandData("delgrounditem", deleteGroundItemCommand, "", getStaffFlagValue("manageItems"), true, false),
            commandData("pickup", pickupItemCommand, "", getStaffFlagValue("none"), true, false),
            commandData("drop", dropItemCommand, "[slot]", getStaffFlagValue("none"), true, false),
            commandData("put", putItemCommand, "[slot]", getStaffFlagValue("none"), true, false),
            commandData("take", takeItemCommand, "[slot]", getStaffFlagValue("none"), true, false),
            commandData("use", useItemCommand, "[slot]", getStaffFlagValue("none"), true, false),
            commandData("inv", listPlayerInventoryCommand, "", getStaffFlagValue("none"), true, false),
            commandData("inventory", listPlayerInventoryCommand, "", getStaffFlagValue("none"), true, false),

            commandData("items", listItemInventoryCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houseitems", listHouseInventoryCommand, "", getStaffFlagValue("none"), true, false),
            commandData("bizstorage", listBusinessStorageInventoryCommand, "", getStaffFlagValue("none"), true, false),
            commandData("bizfloor", listBusinessFloorInventoryCommand, "", getStaffFlagValue("none"), true, false),

            commandData("power", toggleItemEnabledCommand, "", getStaffFlagValue("none"), true, false),
            commandData("freq", setWalkieTalkieFrequencyCommand, "[frequncy number]", getStaffFlagValue("none"), true, false),
            //commandData("call", callWithPhoneCommand, "[number]", getStaffFlagValue("none"), true, false),
            //commandData("speakerphone", togglePhoneSpeakerCommand, "", getStaffFlagValue("none"), true, false),
            commandData("radio", walkieTalkieChatCommand, "", getStaffFlagValue("none"), true, false),
            commandData("r", walkieTalkieChatCommand, "", getStaffFlagValue("none"), true, false),
        ],
        job: [
            commandData("takejob", takeJobCommand, "", getStaffFlagValue("none"), true, false),
            commandData("startwork", startWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("stopwork", stopWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("startjob", startWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("stopjob", stopWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("quitjob", quitJobCommand, "", getStaffFlagValue("none"), true, false),
            commandData("uniform", jobUniformCommand, "[uniform]", getStaffFlagValue("none"), true, false),
            commandData("equip", jobEquipmentCommand, "[equipment]", getStaffFlagValue("none"), true, false),

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
            //commandData("jobloctoggle", toggleJobLocationCommand, "", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobwhitelist", toggleJobWhiteListCommand, "[job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobblacklist", toggleJobBlackListCommand, "[job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobtoggle", toggleJobEnabledCommand, "[job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobaddplayerwl", addPlayerToJobWhiteListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobaddplayerbl", addPlayerToJobBlackListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobdelplayerbl", removePlayerFromJobBlackListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobdelplayerbl", removePlayerFromJobWhiteListCommand, "<player name/id> [job id]", getStaffFlagValue("manageJobs"), true, false),
            commandData("jobreloadall", reloadAllJobsCommand, "", getStaffFlagValue("manageJobs"), true, false),
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
            commandData("cursor", toggleMouseCursorCommand, "", getStaffFlagValue("none"), true, false),
            commandData("mousecam", toggleMouseCameraCommand, "", getStaffFlagValue("none"), true, false),
        ],
        moderation: [
            commandData("kick", kickClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
            commandData("mute", muteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
            commandData("freeze", freezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
            commandData("unmute", unMuteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
            commandData("unfreeze", unFreezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
            commandData("goto", gotoPlayerCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true),
            commandData("gethere", getPlayerCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true),
            commandData("gotopos", gotoPositionCommand, "<x> <y> <z> [int] [vw]", getStaffFlagValue("basicModeration"), true, true),
            commandData("gotoveh", gotoVehicleCommand, "<vehicle id>", getStaffFlagValue("basicModeration"), true, true),
            commandData("gotobiz", gotoBusinessCommand, "<business id/name>", getStaffFlagValue("basicModeration"), true, true),
            commandData("gotohouse", gotoHouseCommand, "<house id/name>", getStaffFlagValue("basicModeration"), true, true),
            commandData("gotojob", gotoJobLocationCommand, "<job id/name> <location id>", getStaffFlagValue("basicModeration"), true, true),
            //commandData("gotoloc", gotoLocationCommand, "<location name>", getStaffFlagValue("basicModeration"), true, true),
            commandData("fr", teleportForwardCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("ba", teleportBackwardCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("lt", teleportLeftCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("rt", teleportRightCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("up", teleportUpCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("dn", teleportDownCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true),
            commandData("int", playerInteriorCommand, "<interior id>", getStaffFlagValue("basicModeration"), true, true),
            commandData("vw", playerVirtualWorldCommand, "<virtual world id>", getStaffFlagValue("basicModeration"), true, true),

            commandData("addstaffflag", addStaffFlagCommand, "<player name/id> [flag name]", getStaffFlagValue("manageAdmins"), true, true),
            commandData("delstaffflag", takeStaffFlagCommand, "<player name/id> [flag name]", getStaffFlagValue("manageAdmins"), true, true),
            commandData("getstaffflags", getStaffFlagsCommand, "<player name/id>", getStaffFlagValue("manageAdmins"), true, true),
            commandData("clearstaffflags", clearStaffFlagsCommand, "<player name/id>", getStaffFlagValue("manageAdmins"), true, true),
            commandData("staffflags", allStaffFlagsCommand, "", getStaffFlagValue("manageAdmins"), true, true),

            commandData("givemoney", givePlayerMoneyCommand, "<player name/id> <amount>", getStaffFlagValue("serverManager"), true, true),
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
            commandData("unlock", vehicleLockCommand, "", getStaffFlagValue("none"), true, false),
            commandData("engine", vehicleEngineCommand, "", getStaffFlagValue("none"), true, false),
            commandData("siren", vehicleSirenCommand, "", getStaffFlagValue("none"), true, false),
            commandData("lights", vehicleLightsCommand, "", getStaffFlagValue("none"), true, false),

            commandData("vehowner", setVehicleOwnerCommand, "<player id/name>", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehclan", setVehicleClanCommand, "<clan id/name>", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehbiz", setVehicleToBusinessCommand, "", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehjob", setVehicleJobCommand, "[job id/name]", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehdelowner", removeVehicleOwnerCommand, "", getStaffFlagValue("manageVehicles"), true, true),
            commandData("vehrank", setVehicleRankCommand, "<rank id/name>", getStaffFlagValue("none"), true, true),

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
    };
}

// ---------------------------------------------------------------------------

function addAllCommandHandlers() {
    for(let i in serverCommands) {
        for(let j in serverCommands[i]) {
            addCommandHandler(serverCommands[i][j].command, processPlayerCommand);
        }
    }
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

function getCommandData(command) {
    return getCommand(command);
}

// ---------------------------------------------------------------------------

function getCommands() {
    return serverCommands;
}

// ---------------------------------------------------------------------------

function commandData(command, handlerFunction, syntaxString = "", requiredStaffFlags = getStaffFlagValue("none"), requireLogin = true, allowOnDiscord = true, usageHelpMessage) {
    return new serverClasses.commandData(command, handlerFunction, syntaxString, requiredStaffFlags, requireLogin, allowOnDiscord, usageHelpMessage);
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
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
    }

    params = toLowerCase(params);

    if(!getCommand(params)) {
        messagePlayerError(client, `The command [#AAAAAA]/${params} [#FFFFFF] does not exist!`);
        return false;
    }

    getCommand(params).enabled = false;
	messagePlayerSuccess(client, `Command [#AAAAAA]/${params} [#FFFFFF]has been disabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function enableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
    }

    params = toLowerCase(params);

    if(!getCommand(params)) {
        messagePlayerError(client, `The command [#AAAAAA]/${params} [#FFFFFF] does not exist!`);
        return false;
    }

    getCommand(params).enabled = true;
	messagePlayerSuccess(client, `Command [#AAAAAA]/${params} [#FFFFFF]has been enabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function disableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    params = toLowerCase(params);

    if(isNull(getServerData().commands[params])) {
        messagePlayerError(client, `Command type [#AAAAAA]${params} [#FFFFFF]does not exist!`);
        return false;
    }

    for(let i in getServerData().commands[params]) {
        getServerData().commands[params][i].enabled = false;
    }

	messagePlayerSuccess(client, `[#FF9900]All [#AAAAAA]${params} [#FFFFFF]commands have been disabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function enableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
    }

    params = toLowerCase(params);

    if(isNull(getServerData().commands[params])) {
        messagePlayerError(client, `Command type [#AAAAAA]${params} [#FFFFFF]does not exist!`);
        return false;
    }

    for(let i in getServerData().commands[params]) {
        getServerData().commands[params][i].enabled = true;
    }

	messagePlayerSuccess(client, `[#FF9900]All [#AAAAAA]${params} [#FFFFFF]commands have been enabled!`);
	return true;
}

// ---------------------------------------------------------------------------

function onPlayerCommand(event, client, command, params) {
    processPlayerCommand(command, params, client)
}
addEventHandler("OnPlayerCommand", onPlayerCommand);

// ---------------------------------------------------------------------------

function processPlayerCommand(command, params, client) {
    if(builtInCommands.indexOf(toLowerCase(command)) != -1) {
        return true;
    }

    let commandData = getCommand(toLowerCase(command));

    let paramsDisplay = params;
    if(areParamsEmpty(params)) {
        paramsDisplay = "";
    }

    if(!doesCommandExist(toLowerCase(command))) {
        console.warn(`[Asshat.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (invalid command): /${command} ${paramsDisplay}`);
        messagePlayerError(client, `The command [#AAAAAA]/${command} [#FFFFFF]does not exist! Use /help for commands and information.`);
        return false;
    }

    if(!commandData.enabled) {
        console.warn(`[Asshat.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (command is disabled): /${command} ${paramsDisplay}`);
        messagePlayerError(client, `The command [#AAAAAA]/${command} [#FFFFFF]is disabled!`);
        return false;
    }

	if(doesCommandRequireLogin(toLowerCase(command))) {
		if(!isPlayerLoggedIn(client)) {
            console.warn(`[Asshat.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (requires login first): /${command} ${paramsDisplay}`);
			messagePlayerError(client, `You must be logged in to use the [#AAAAAA]/${command} [#FFFFFF]command!`);
			return false;
		}
	}

	//if(isClientFromDiscord(client)) {
	//	if(!isCommandAllowedOnDiscord(command)) {
    //        console.warn(`[Asshat.Command] ${getPlayerDisplayForConsole(client)} attempted to use command from discord, but failed (not available on discord): /${command} ${paramsDisplay}`);
	//		messagePlayerError(client, `The [#AAAAAA]/${command} [#FFFFFF] command isn't available on discord!`);
	//		return false;
	//	}
	//}

    if(!client.console) {
        if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(toLowerCase(command)))) {
            console.warn(`[Asshat.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (no permission): /${command} ${paramsDisplay}`);
            messagePlayerError(client, `You do not have permission to use the [#AAAAAA]/${toLowerCase(command)} [#FFFFFF]command!`);
            return false;
        }
    }

    logToConsole(LOG_DEBUG, `[Asshat.Command] ${getPlayerDisplayForConsole(client)} used command: /${command} ${paramsDisplay}`);
    commandData.handlerFunction(toLowerCase(command), params, client);
}

// ---------------------------------------------------------------------------

addCommandHandler("cmd", function(command, params, client) {
    if(!isConsole(client)) {
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
            logToConsole(LOG_DEBUG, serverCommands[i][j].command);
        }
    }
}

// ---------------------------------------------------------------------------

function doesCommandExist(command) {
    if(getCommandData(command)) {
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------