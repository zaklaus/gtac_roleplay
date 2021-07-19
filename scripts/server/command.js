// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: command.js
// DESC: Provides command data, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverCommands = [];

// ===========================================================================

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

// ===========================================================================

function initCommandScript() {
    logToConsole(LOG_INFO, "[VRR.Command]: Initializing commands script ...");
    serverCommands = loadCommands();
    //addAllCommandHandlers();
    logToConsole(LOG_INFO, "[VRR.Command]: Initialized commands script!");
}

// ===========================================================================

function loadCommands() {
    let tempCommands = {
        account: [
            commandData("login", loginCommand, "<password>", getStaffFlagValue("none"), false, false, "Login to an account"),
            commandData("register", registerCommand, "<password>", getStaffFlagValue("none"), false, false, "Creates an account"),
            commandData("changepass", changePasswordCommand, "<password>", getStaffFlagValue("none"), true, false, "Change an account password"),
            commandData("iplogin", autoLoginByIPCommand, "", getStaffFlagValue("none"), true, false, "Toggle whether to automatically login if you join with the same IP as your last join"),
            commandData("autolastchar", autoSelectLastCharacterCommand, "", getStaffFlagValue("none"), true, false, "Toggle whether to automatically spawn with the last character you played as"),
            commandData("gui", toggleAccountGUICommand, "", getStaffFlagValue("none"), false, false, "Toggle whether to use GUI. If GUI is disabled on the server, it won't show even if you have GUI enabled."),
            commandData("2fa", toggleAccountTwoFactorAuthCommand, "", getStaffFlagValue("none"), true, false, "Set up and use two-factor authentication."),
            commandData("setemail", setAccountEmailCommand, "<email address>", getStaffFlagValue("none"), true, false, "Sets your email. To reset your password, you must have a valid email set and verified."),
            commandData("verifyemail", verifyAccountEmailCommand, "<verification code>", getStaffFlagValue("none"), true, false, "Confirms/verifies your email."),
            commandData("setdiscord", setAccountDiscordCommand, "<Name#0000 - discord name and id>", getStaffFlagValue("none"), true, false, "Set up the integration for discord. Allows you to see info and use in-game commands on discord."),
        ],
        ammunation: [],
        animation: [
            commandData("anim", playPlayerAnimationCommand, "<animation name>", getStaffFlagValue("none"), true, true, "Makes your player ped use an animation"),
            commandData("an", playPlayerAnimationCommand, "<animation name>", getStaffFlagValue("none"), true, true, "Makes your player ped use an animation"),
            commandData("anims", showAnimationListCommand, "", getStaffFlagValue("none"), true, true, "Shows a list of animations"),
            commandData("animlist", showAnimationListCommand, "", getStaffFlagValue("none"), true, true, "Shows a list of animations"),
        ],
        antiCheat: [
            //commandData("addacscriptwl", addAntiCheatWhiteListedScriptCommand, "<script name>", getStaffFlagValue("developer"), true, true),
            //commandData("delacscriptwl", removeAntiCheatWhiteListedScriptCommand, "<script name>", getStaffFlagValue("developer"), true, true),
            //commandData("addacscriptbl", addAntiCheatBlackListedScriptCommand, "<script name>", getStaffFlagValue("developer"), true, true),
            //commandData("delacscriptbl", removeAntiCheatBlackListedScriptCommand, "<script name>", getStaffFlagValue("developer"), true, true),
            //commandData("setacscriptbl", toggleAntiCheatScriptBlackListCommand, "<0/1 state>", getStaffFlagValue("developer"), true, true),
            //commandData("setacscriptwl", toggleAntiCheatScriptWhiteListCommand, "<0/1 state>", getStaffFlagValue("developer"), true, true),
            //commandData("setac", toggleGlobalAntiCheatCommand, "<0/1 state>", getStaffFlagValue("developer"), true, true),
            //commandData("ac", getGlobalAntiCheatStatusCommand, "<0/1 state>", getStaffFlagValue("developer"), true, true),
        ],
        ban: [
            commandData("aban", accountBanCommand, "<player name/id> <reason>", getStaffFlagValue("basicModeration"), true, true, "Bans a player's account."),
            commandData("cban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("basicModeration"), true, true, "Bans a player's character."),
            commandData("saban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("basicModeration"), true, true, "Bans a player's character (subaccount)."),
            commandData("ipban", ipBanCommand, "<player name/id> <reason>", getStaffFlagValue("basicModeration"), true, true, "Bans a player's IP."),
            commandData("subnetban", subNetBanCommand, "<player name/id> <range> <reason>", getStaffFlagValue("basicModeration"), true, true, "Bans a player's subnet."),
        ],
        bitFlag: [],
        business: [
            commandData("addbiz", createBusinessCommand, "<name>", getStaffFlagValue("manageBusinesses"), true, false, "Creates a business"),
            commandData("delbiz", deleteBusinessCommand, "[id]", getStaffFlagValue("manageBusinesses"), true, true, "Deletes a business"),
            //commandData("addbizloc", createBusinessLocationCommand, "<type> <business id> <name>", getStaffFlagValue("manageBusinesses"), true, false),
            //commandData("delbizloc", deleteBusinessLocationCommand, "[id]", getStaffFlagValue("manageBusinesses"), true, false),
            commandData("bizreloadall", reloadAllBusinessesCommand, "", getStaffFlagValue("manageBusinesses"), true, false, "Reloads all businesses from the database"),

            commandData("bizlock", lockBusinessCommand, "", getStaffFlagValue("none"), true, true, "Locks a business"),
            commandData("bizbuy", buyBusinessCommand, "", getStaffFlagValue("none"), true, true, "Purchases a business"),
            commandData("bizfee", setBusinessEntranceFeeCommand, "<amount>", getStaffFlagValue("none"), true, true, "Sets a fee to charge players when they enter the business."),
            commandData("biztill", viewBusinessTillAmountCommand, "", getStaffFlagValue("none"), true, true, "Shows the business's till (cash register) amount"),
            commandData("bizbalance", viewBusinessTillAmountCommand, "", getStaffFlagValue("none"), true, true, "Shows the business's till (cash register) amount"),
            commandData("bizwithdraw", withdrawFromBusinessCommand, "<amount>", getStaffFlagValue("none"), true, true, "Take money out of the business till (cash register)"),
            commandData("bizdeposit", depositIntoBusinessCommand, "<amount>", getStaffFlagValue("none"), true, true, "Put money into the business till (cash register)"),
            commandData("buy", buyFromBusinessCommand, "<slot> [amount]", getStaffFlagValue("none"), true, true, "Buy items from a business"),
            commandData("bizstock", stockItemOnBusinessFloorCommand, "<item name> <amount> <sell price>", getStaffFlagValue("none"), true, true, "Uses storage items to restock the business with."),
            commandData("bizstore", storeItemInBusinessStorageCommand, "<item name> <amount>", getStaffFlagValue("none"), true, true, "Moves items from the business to the business storage"),
            commandData("bizorder", orderItemForBusinessCommand, "<item name> <amount> <sell price>", getStaffFlagValue("none"), true, true, "Orders items to sell from a business"),
            commandData("bizitemprice", setBusinessItemSellPriceCommand, "<item slot> <sell price>", getStaffFlagValue("none"), true, true, "Sets the purchase price of a business item"),
            commandData("bizname", setBusinessNameCommand, "<name>", getStaffFlagValue("none"), true, true, "Changes a business name"),
            commandData("bizowner", setBusinessOwnerCommand, "<player name/id>", getStaffFlagValue("none"), true, true, "Changes the owner of a business"),
            commandData("bizbuyprice", setBusinessBuyPriceCommand, "<amount>", getStaffFlagValue("none"), true, true, "Changes the owner of a business"),
            commandData("bizblip", setBusinessBlipCommand, "<type name/model id>", getStaffFlagValue("manageBusinesses"), true, true, "Sets the business blip display"),
            commandData("bizpickup", setBusinessPickupCommand, "<type name/model id>", getStaffFlagValue("manageBusinesses"), true, true, "Sets the business pickup display"),
            commandData("bizinfo", getBusinessInfoCommand, "[id]", getStaffFlagValue("none"), true, true, "Shows business information"),
            commandData("bizentrance", moveBusinessEntranceCommand, "", getStaffFlagValue("manageBusinesses"), true, true, "Shows business information"),
            commandData("bizexit", moveBusinessExitCommand, "", getStaffFlagValue("manageBusinesses"), true, true, "Moves the exit (interior point) of the business"),
            commandData("bizinttype", setBusinessInteriorTypeCommand, "<interior template name/business id>", getStaffFlagValue("manageBusinesses"), true, true, "Changes the business' interior"),
            commandData("bizdefaultitems", giveDefaultItemsToBusinessCommand, "<item template>", getStaffFlagValue("manageItems"), true, true, "Gives the business the default items based on template name"),
            commandData("bizdelflooritems", deleteBusinessFloorItemsCommand, "", getStaffFlagValue("manageItems"), true, true, "Destroys all items on the business floor (for-sale items)"),
            commandData("bizdelstorageitems", deleteBusinessStorageItemsCommand, "", getStaffFlagValue("manageItems"), true, true, "Destroys all items in the business's storage"),
        ],
        chat: [
            commandData("me", meActionCommand, "<message>", getStaffFlagValue("none"), true, false, "Shows a custom action message in chat"),
            commandData("do", doActionCommand, "<message>", getStaffFlagValue("none"), true, false, "Shows a custom action description in chat"),
            commandData("s", shoutCommand, "<message>", getStaffFlagValue("none"), true, false, "Shout a message to others in the area"),
            commandData("shout", shoutCommand, "<message>", getStaffFlagValue("none"), true, false, "Shout a message to others in the area"),
            commandData("talk", talkCommand, "<message>", getStaffFlagValue("none"), true, false, "Say a message to others nearby"),
            commandData("local", talkCommand, "<message>", getStaffFlagValue("none"), true, false, "Say a message to others nearby"),
            commandData("l", talkCommand, "<message>", getStaffFlagValue("none"), true, false, "Say a message to others nearby"),
            commandData("w", whisperCommand, "<message>", getStaffFlagValue("none"), true, false, "Whisper a message to players very close to you"),
            commandData("whisper", whisperCommand, "<message>", getStaffFlagValue("none"), true, false, "Whisper a message to players very close to you"),
            commandData("clanchat", clanChatCommand, "<message>", getStaffFlagValue("none"), true, false, "Sends an OOC chat message to members in your clan"),
            commandData("clan", clanChatCommand, "<message>", getStaffFlagValue("none"), true, false, "Sends an OOC chat message to members in your clan"),
            commandData("c", clanChatCommand, "<message>", getStaffFlagValue("none"), true, false, "Sends an OOC chat message to members in your clan"),
            commandData("adminchat", adminChatCommand, "<message>", getStaffFlagValue("basicModeration"), true, true, "Sends an OOC chat message to other admins"),
            commandData("a", adminChatCommand, "<message>", getStaffFlagValue("basicModeration"), true, true, "Sends an OOC chat message to other admins"),
            commandData("achat", adminChatCommand, "<message>", getStaffFlagValue("basicModeration"), true, true, "Sends an OOC chat message to other admins"),
        ],
        clan: [
            commandData("addclan", createClanCommand, "<name>", getStaffFlagValue("manageClans"), true, true, "Creates an new empty, unowned clan."),
            commandData("delclan", deleteClanCommand, "<clan id>", getStaffFlagValue("manageClans"), true, true, "Deletes a clan by ID or name"),

            commandData("clanowner", setClanOwnerCommand, "<clan id> <player name/id>", getStaffFlagValue("none"), true, true, "Gives ownership of the clan to a player"),
            commandData("clantag", setClanTagCommand, "<tag>", getStaffFlagValue("none"), true, true, "Sets a clan's main tag"),
            commandData("clanranktag", setClanRankTagCommand, "<rank id> <tag>", getStaffFlagValue("none"), true, true, "Sets a clan rank's custom tag"),
            commandData("clanmembertag", setClanMemberTagCommand, "<player name/id> <tag>", getStaffFlagValue("none"), true, true, "Sets a clan members's custom tag"),
            commandData("clanranktitle", setClanRankTitleCommand, "<rank id> <title>", getStaffFlagValue("none"), true, true, "Sets a clan rank's title"),
            commandData("clanmembertitle", setClanMemberTitleCommand, "<player name/id> <title>", getStaffFlagValue("none"), true, true, "Sets a clan members's custom title"),
            commandData("addclanrankflag", addClanRankFlagCommand, "<rank name/id> <flag name>", getStaffFlagValue("none"), true, true, "Gives a clan rank a clan permission."),
            commandData("delclanrankflag", removeClanRankFlagCommand, "<rank name/id> <flag name>", getStaffFlagValue("none"), true, true, "Takes a clan permission from a clan rank"),
            commandData("addclanmemberflag", addClanMemberFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("none"), true, true, "Gives a clan member a clan permission"),
            commandData("delclanmemberflag", removeClanMemberFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("none"), true, true, "Takes a clan permission from a clan member"),
        ],
        class: [],
        client: [],
        colour: [],
        command: [
            commandData("cmdenabletype", enableAllCommandsByType, "<type>", getStaffFlagValue("developer"), true, true, "Enables all commands by type."),
            commandData("cmddisabletype", disableAllCommandsByType, "<type>", getStaffFlagValue("developer"), true, true, "Disables all commands by type."),
            commandData("cmdenable", enableCommand, "<command>", getStaffFlagValue("developer"), true, true, "Enable a specific command"),
            commandData("cmddisable", disableCommand, "<command>", getStaffFlagValue("developer"), true, true, "Disables a specific command"),
        ],
        config: [
            commandData("settime", setTimeCommand, "<hour> [minute]", getStaffFlagValue("manageServer"), true, true, "Sets the time. Hours are required, minute is optional and will default to 0"),
            commandData("setminuteduration", setMinuteDurationCommand, "<time in ms>", getStaffFlagValue("manageServer"), true, true, "Sets how long a minute lasts in milliseconds. 60000 is real time."),
            commandData("setweather", setWeatherCommand, "<weather id/name>", getStaffFlagValue("manageServer"), true, true, "Change the weather to specified type."),
            commandData("setsnow", setSnowingCommand, "<falling snow> <ground snow>", getStaffFlagValue("manageServer"), true, true, "Toggles winter/snow"),
            commandData("setlogo", toggleServerLogoCommand, "<0/1 state>", getStaffFlagValue("manageServer"), true, true, "Toggles the corner server logo display on/off"),
            commandData("setgui", toggleServerGUICommand, "<0/1 state>", getStaffFlagValue("manageServer"), true, true, "Toggles server GUI on/off"),
            //commandData("setguicolours", setServerGUIColoursCommand, "<red> <green> <blue>", getStaffFlagValue("manageServer"), true, true),
            commandData("newcharspawn", setNewCharacterSpawnPositionCommand, "", getStaffFlagValue("manageServer"), true, true, "Sets the starting spawn position for new characters"),
            commandData("newcharcash", setNewCharacterMoneyCommand, "<amount>", getStaffFlagValue("manageServer"), true, true, "Sets the starting money for new characters"),
            commandData("newcharskin", setNewCharacterSkinCommand, "[skin id]", getStaffFlagValue("manageServer"), true, true, "Sets the default skin for new characters"),
            commandData("jobinfo", getJobInfoCommand, "", getStaffFlagValue("none"), true, true, "Get info for nearest or specified job"),
            commandData("joblocinfo", getJobLocationInfoCommand, "", getStaffFlagValue("none"), true, true, "Get info for nearest or specified job location"),
            commandData("reloadcfg", reloadServerConfigurationCommand, "", getStaffFlagValue("manageServer"), true, true, "Loads and applies the server configuration"),
            commandData("reloademailcfg", reloadEmailConfigurationCommand, "", getStaffFlagValue("developer"), true, true, "Loads and applies the email configuration"),
            commandData("reloaddbcfg", reloadDatabaseConfigurationCommand, "", getStaffFlagValue("developer"), true, true, "Loads and applies the database configuration"),
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
            commandData("addloglvl", addServerLogLevelCommand, "<log level name>", getStaffFlagValue("developer"), true, true),
            commandData("delloglvl", removeServerLogLevelCommand, "<log level name>", getStaffFlagValue("developer"), true, true),
            //commandData("loglvl", getServerLogLevelCommand, "<log level name>", getStaffFlagValue("developer"), true, true),
        ],
        discord: [],
        email: [
            commandData("testemail", testEmailCommand, "<email address>", getStaffFlagValue("developer"), true, true),
        ],
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
            //commandData("housebuyprice", setHouseBuyPriceCommand, "", getStaffFlagValue("none"), true, false),
            //commandData("houserentprice", setHouseRentPriceCommand, "", getStaffFlagValue("none"), true, false),
            commandData("houseblip", setHouseBlipCommand, "<type name/model id>", getStaffFlagValue("manageHouses"), true, true),
            commandData("housepickup", setHousePickupCommand, "<type name/model id>", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseentrance", moveHouseEntranceCommand, "", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseexit", moveHouseExitCommand, "", getStaffFlagValue("manageHouses"), true, true),
            commandData("houseinttype", setHouseInteriorTypeCommand, "<interior template name/business id>", getStaffFlagValue("manageHouses"), true, true),
        ],
        item: [
            commandData("i", playerSwitchHotBarSlotCommand, "<slot id>", getStaffFlagValue("none"), true, false, "Switches to the item in the specified slot of your inventory."),
            commandData("addgrounditem", createGroundItemCommand, "<item name/id>", getStaffFlagValue("manageItems"), true, false, "Spawns a new item on the ground at your position."),
            commandData("delgrounditem", deleteGroundItemCommand, "", getStaffFlagValue("manageItems"), true, false, "Destroys the nearest item on the ground."),
            commandData("pickup", pickupItemCommand, "", getStaffFlagValue("none"), true, false, "Picks up the nearest item."),
            commandData("drop", dropItemCommand, "[slot]", getStaffFlagValue("none"), true, false, "Drops your currently equipped item or the item in the specified slot"),
            commandData("put", putItemCommand, "[slot]", getStaffFlagValue("none"), true, false, "Puts an item from your inventory into the nearest item place (vehicle trunk/dash, house, business, etc)"),
            commandData("take", takeItemCommand, "[slot]", getStaffFlagValue("none"), true, false, "Takes an item from the nearest item place (vehicle trunk, dash, house, business, etc)"),
            commandData("use", useItemCommand, "", getStaffFlagValue("none"), true, false, "Uses the currently equipped item"),
            commandData("inv", listPlayerInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items in your inventory"),
            commandData("inventory", listPlayerInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items in your inventory"),

            commandData("items", listItemInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items in your inventory"),
            commandData("houseitems", listHouseInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items in the house's storage"),
            commandData("bizstorage", listBusinessStorageInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items in the business's extra storage (not buyable)"),
            commandData("bizfloor", listBusinessFloorInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items that can be bought from the business"),
            commandData("buylist", listBusinessFloorInventoryCommand, "", getStaffFlagValue("none"), true, false, "Shows the items that can be bought from the business"),

            commandData("power", toggleItemEnabledCommand, "", getStaffFlagValue("none"), true, false),
            commandData("freq", setWalkieTalkieFrequencyCommand, "[frequncy number]", getStaffFlagValue("none"), true, false),
            //commandData("call", callWithPhoneCommand, "[number]", getStaffFlagValue("none"), true, false),
            //commandData("speakerphone", togglePhoneSpeakerCommand, "", getStaffFlagValue("none"), true, false),
            commandData("radio", walkieTalkieChatCommand, "", getStaffFlagValue("none"), true, false),
            commandData("r", walkieTalkieChatCommand, "", getStaffFlagValue("none"), true, false),

            commandData("additemtype", createItemTypeCommand, "<name>", getStaffFlagValue("manageItems"), true, false),
            commandData("itemusetype", setItemTypeUseTypeCommand, "<item type> <use type>", getStaffFlagValue("manageItems"), true, false),
            commandData("itemuseval", setItemTypeUseValueCommand, "<item type> <use value>", getStaffFlagValue("manageItems"), true, false),
            commandData("itemorderprice", setItemTypeOrderPriceCommand, "<item type> <price>", getStaffFlagValue("manageItems"), true, false),
            commandData("itemriskmult", setItemTypeRiskMultiplierCommand, "<item type> <risk multiplier>", getStaffFlagValue("manageItems"), true, false),
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
            //commandData("tazer", policeTazerCommand, "", getStaffFlagValue("none"), true, false),
            //commandData("cuff", policeCuffCommand, "", getStaffFlagValue("none"), true, false),
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
            commandData("cursor", toggleMouseCursorCommand, "", getStaffFlagValue("none"), true, false),
            commandData("mousecam", toggleMouseCameraCommand, "", getStaffFlagValue("none"), true, false),
            commandData("yes", playerPromptAnswerYesCommand, "", getStaffFlagValue("none"), true, false),
            commandData("no", playerPromptAnswerNoCommand, "", getStaffFlagValue("none"), true, false),
            commandData("radiostation", playStreamingRadioCommand, "<radio station id>", getStaffFlagValue("none"), true, false),
            commandData("radiovolume", setStreamingRadioVolumeCommand, "<volume level>", getStaffFlagValue("none"), true, false),
        ],
        moderation: [
            commandData("kick", kickClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true, "Kicks a player from the server"),
            commandData("mute", muteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true, "Mutes a player, preventing them from using any chat."),
            commandData("freeze", freezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true, "Freeze a player, preventing them from moving."),
            commandData("unmute", unMuteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true, "Unmutes a player, allowing them to chat again."),
            commandData("unfreeze", unFreezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true, "Unfreezes a player, allowing them to move again."),
            commandData("goto", gotoPlayerCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to a player."),
            commandData("gethere", getPlayerCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true, "Teleports a player to you."),
            commandData("gotopos", gotoPositionCommand, "<x> <y> <z> [int] [vw]", getStaffFlagValue("basicModeration"), true, true, "Teleports you to specific coordinates with optional interior and dimension."),
            commandData("gotoveh", gotoVehicleCommand, "<vehicle id>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to a vehicle by ID."),
            commandData("gotobiz", gotoBusinessCommand, "<business id/name>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to a business by ID or name."),
            commandData("gotohouse", gotoHouseCommand, "<house id/name>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to a house by ID or description."),
            commandData("gotojob", gotoJobLocationCommand, "<job id/name> <location id>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to a job location by name and location ID."),
            commandData("gotoloc", gotoGameLocationCommand, "<location name>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to a game location by name."),
            commandData("fr", teleportForwardCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true, "Teleports you forward a certain distance in meters."),
            commandData("ba", teleportBackwardCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true, "Teleports you backward a certain distance in meters."),
            commandData("lt", teleportLeftCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to the left a certain distance in meters."),
            commandData("rt", teleportRightCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true, "Teleports you to the right a certain distance in meters."),
            commandData("up", teleportUpCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true, "Teleports you upward a certain distance in meters."),
            commandData("dn", teleportDownCommand, "<distance in meters>", getStaffFlagValue("basicModeration"), true, true, "Teleports you downward a certain distance in meters."),
            commandData("int", playerInteriorCommand, "<interior id>", getStaffFlagValue("basicModeration"), true, true, "Gets or sets a player's game interior."),
            commandData("vw", playerVirtualWorldCommand, "<virtual world id>", getStaffFlagValue("basicModeration"), true, true, "Gets or sets a player's virtual world/dimension."),

            commandData("addstaffflag", addStaffFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("manageAdmins"), true, true, "Gives a player a staff flaf (this server only)."),
            commandData("delstaffflag", takeStaffFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("manageAdmins"), true, true, "Takes a player's staff flag by name (this server only)."),
            commandData("getstaffflags", getStaffFlagsCommand, "<player name/id>", getStaffFlagValue("manageAdmins"), true, true, "Shows a list of all staff flags a player has (this server only)."),
            commandData("clearstaffflags", clearStaffFlagsCommand, "<player name/id>", getStaffFlagValue("manageAdmins"), true, true, "Removes all staff flags for a player (this server only)."),
            commandData("staffflags", allStaffFlagsCommand, "", getStaffFlagValue("manageAdmins"), true, true, "Shows a list of all valid staff flag names."),

            commandData("givemoney", givePlayerMoneyCommand, "<player name/id> <amount>", getStaffFlagValue("serverManager"), true, true),

            commandData("nonrpname", forceCharacterNameChangeCommand, "<player name/id>", getStaffFlagValue("basicModeration"), true, true, "Forces a player to change their current character's name."),
            commandData("forcename", forceCharacterNameCommand, "<player name/id> <first name> <last name>", getStaffFlagValue("basicModeration"), true, true, "Changes a character's name directly."),
        ],
        security: [],
        startup: [],
        subAccount: [
            commandData("switchchar", switchCharacterCommand, "", getStaffFlagValue("none"), true, false),
            commandData("newchar", newCharacterCommand, "<first name> <last name>", getStaffFlagValue("none"), true, false),
            commandData("usechar", useCharacterCommand, "<character id>", getStaffFlagValue("none"), true, false),
        ],
        translate: [],
        trigger: [
            commandData("addtrig", createTriggerCommand, "<trigger name>", getStaffFlagValue("manageServer"), true, false),
            commandData("deltrig", deleteTriggerCommand, "<trigger id>", getStaffFlagValue("manageServer"), true, false),
            commandData("addtrigcond", addTriggerConditionCommand, "<trigger id> <condition name>", getStaffFlagValue("manageServer"), true, false),
            commandData("deltrigcond", removeTriggerConditionCommand, "<trigger id> <condition id>", getStaffFlagValue("manageServer"), true, false),
            commandData("addtrigresp", addTriggerResponseCommand, "<trigger id> <response name>", getStaffFlagValue("manageServer"), true, false),
            commandData("deltrigresp", removeTriggerResponseCommand, "<trigger id> <response name>", getStaffFlagValue("manageServer"), true, false),
            commandData("triggers", listTriggersCommand, "[search value]", getStaffFlagValue("manageServer"), true, false),
            commandData("trigcond", listTriggerConditionsCommand, "<trigger id>", getStaffFlagValue("manageServer"), true, false),
            commandData("trigresp", listTriggerResponsesCommand, "<trigger id>", getStaffFlagValue("manageServer"), true, false),
            commandData("trigtoggle", toggleTriggerEnabledCommand, "<trigger id> [0/1 state]", getStaffFlagValue("manageServer"), true, false),
        ],
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

    return tempCommands;
}

// ===========================================================================

function addAllCommandHandlers() {
    for(let i in serverCommands) {
        for(let j in serverCommands[i]) {
            addCommandHandler(serverCommands[i][j].command, processPlayerCommand);
        }
    }
}

// ===========================================================================

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

// ===========================================================================

function getCommandData(command) {
    return getCommand(command);
}

// ===========================================================================

function getCommands() {
    return serverCommands;
}

// ===========================================================================

function commandData(command, handlerFunction, syntaxString = "", requiredStaffFlags = getStaffFlagValue("none"), requireLogin = true, allowOnDiscord = true, usageHelpMessage) {
    return new serverClasses.commandData(command, handlerFunction, syntaxString, requiredStaffFlags, requireLogin, allowOnDiscord, usageHelpMessage);
}

// ===========================================================================

function doesCommandRequireLogin(command) {
    return getCommand(command).requireLogin;
}

// ===========================================================================

function getCommandRequiredPermissions(command) {
    return getCommand(command).requiredStaffFlags;
}

// ===========================================================================

function getCommandSyntaxText(command) {
    return `/${command} ${getCommand(command).syntaxString}`;
}

// ===========================================================================

function isCommandAllowedOnDiscord(command) {
    return getCommand(command).allowOnDiscord;
}

// ===========================================================================

function disableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
    }

    params = toLowerCase(params);

    if(!getCommand(params)) {
        messagePlayerError(client, `The command ${getInlineChatColourByName("lightGrey")}/${params} ${getInlineChatColourByName("white")} does not exist!`);
        return false;
    }

    getCommand(params).enabled = false;
	messagePlayerSuccess(client, `Command ${getInlineChatColourByName("lightGrey")}/${params} ${getInlineChatColourByName("white")}has been disabled!`);
	return true;
}

// ===========================================================================

function enableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
    }

    params = toLowerCase(params);

    if(!getCommand(params)) {
        messagePlayerError(client, `The command ${getInlineChatColourByName("lightGrey")}/${params} ${getInlineChatColourByName("white")} does not exist!`);
        return false;
    }

    getCommand(params).enabled = true;
	messagePlayerSuccess(client, `Command ${getInlineChatColourByName("lightGrey")}/${params} ${getInlineChatColourByName("white")}has been enabled!`);
	return true;
}

// ===========================================================================

function disableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    params = toLowerCase(params);

    if(isNull(getServerData().commands[params])) {
        messagePlayerError(client, `Command type ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}does not exist!`);
        return false;
    }

    for(let i in getServerData().commands[params]) {
        getServerData().commands[params][i].enabled = false;
    }

	messagePlayerSuccess(client, `${getInlineChatColourByType("clanOrange")}All ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}commands have been disabled!`);
	return true;
}

// ===========================================================================

function enableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
    }

    params = toLowerCase(params);

    if(isNull(getServerData().commands[params])) {
        messagePlayerError(client, `Command type ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}does not exist!`);
        return false;
    }

    for(let i in getServerData().commands[params]) {
        getServerData().commands[params][i].enabled = true;
    }

	messagePlayerSuccess(client, `${getInlineChatColourByType("clanOrange")}All ${getInlineChatColourByName("lightGrey")}${params} ${getInlineChatColourByName("white")}commands have been enabled!`);
	return true;
}

// ===========================================================================

function onPlayerCommand(event, client, command, params) {
    processPlayerCommand(command, params, client)
}
addEventHandler("OnPlayerCommand", onPlayerCommand);

// ===========================================================================

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
        console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (invalid command): /${command} ${paramsDisplay}`);
        messagePlayerError(client, `The command ${getInlineChatColourByName("lightGrey")}/${command} ${getInlineChatColourByName("white")}does not exist! Use /help for commands and information.`);
        return false;
    }

    if(!commandData.enabled) {
        console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (command is disabled): /${command} ${paramsDisplay}`);
        messagePlayerError(client, `The command ${getInlineChatColourByName("lightGrey")}/${command} ${getInlineChatColourByName("white")}is disabled!`);
        return false;
    }

	if(doesCommandRequireLogin(toLowerCase(command))) {
		if(!isPlayerLoggedIn(client)) {
            console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (requires login first): /${command} ${paramsDisplay}`);
			messagePlayerError(client, `You must be logged in to use the ${getInlineChatColourByName("lightGrey")}/${command} ${getInlineChatColourByName("white")}command!`);
			return false;
		}
	}

	//if(isClientFromDiscord(client)) {
	//	if(!isCommandAllowedOnDiscord(command)) {
    //        console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command from discord, but failed (not available on discord): /${command} ${paramsDisplay}`);
	//		messagePlayerError(client, `The ${getInlineChatColourByName("lightGrey")}/${command} ${getInlineChatColourByName("white")} command isn't available on discord!`);
	//		return false;
	//	}
	//}

    if(!client.console) {
        if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(toLowerCase(command)))) {
            console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (no permission): /${command} ${paramsDisplay}`);
            messagePlayerError(client, `You do not have permission to use the ${getInlineChatColourByName("lightGrey")}/${toLowerCase(command)} ${getInlineChatColourByName("white")}command!`);
            return false;
        }
    }

    logToConsole(LOG_DEBUG, `[VRR.Command] ${getPlayerDisplayForConsole(client)} used command: /${command} ${paramsDisplay}`);
    commandData.handlerFunction(toLowerCase(command), params, client);
}

// ===========================================================================

addCommandHandler("cmd", function(command, params, client) {
    if(!isConsole(client)) {
        return false;
    }

    let splitParams = params.split(" ");
    let newCommand = splitParams[0];
    let newParams = splitParams.slice(1).join(" ");

    getCommand(newCommand).handlerFunction(newCommand, newParams, client);
});

// ===========================================================================

function listAllCommands() {
    for(let i in serverCommands) {
        for(let j in serverCommands[i]) {
            logToConsole(LOG_DEBUG, serverCommands[i][j].command);
        }
    }
}

// ===========================================================================

function doesCommandExist(command) {
    if(getCommandData(command)) {
        return true;
    }

    return false;
}

// ===========================================================================

function cacheAllCommandsAliases() {
    for(let i in serverCommands) {
        for(let j in serverCommands[i]) {
            for(let k in serverCommands) {
                for(let m in serverCommands[k]) {
                    if(serverCommands[i][j].handlerFunction == serverCommands[k][m].handlerFunction) {
                        serverCommands[i][j].aliases.push(serverCommands[k][m]);
                        serverCommands[k][m].aliases.push(serverCommands[i][j]);
                    }
                }
            }
        }
    }
}

// ===========================================================================

function getCommandAliasesNames(command) {
    let commandAliases = [];
    for(let i in command.aliases) {
        commandAliases.push(command.aliases[i].name);
    }

    return commandAliases;
}

// ===========================================================================