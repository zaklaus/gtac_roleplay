// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: command.js
// DESC: Provides command data, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverCommands = {};

function initCommandScript() {
    serverCommands = loadCommandData();
}

// ---------------------------------------------------------------------------

function loadCommandData() {
    let tempCommands = {
        account: [
            commandData("login", loginCommand, "<password>", getStaffFlagValue("none"), false, false),
            commandData("register", registerCommand, "<password>", getStaffFlagValue("none"), false, false),
            commandData("changepass", changePasswordCommand, "<password>", getStaffFlagValue("none"), true, false),
            //commandData("setpass", changePasswordCommand, "<password>", getStaffFlagValue("none"), true, false),
            commandData("switchchar", switchCharacterCommand, "", getStaffFlagValue("none"), true, false),
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
            
            commandData("clanrankper", setClanRankFlagsCommand, "<rank id>", getStaffFlagValue("none"), true, true),
            commandData("clanmemberper", setClanMemberFlagsCommand, "<player name/id>", getStaffFlagValue("none"), true, true),            
        ],
        class: [],
        client: [],
        colour: [],
        command: [],
        config: [],
        core: [],
        database: [],
        developer: [
            commandData("scode", executeServerCodeCommand, "<code>", getStaffFlagValue("developer"), true, true), 
            commandData("ccode", executeClientCodeCommand, "<code>", getStaffFlagValue("developer"), true, true),
            commandData("gmx", restartGameModeCommand, "", getStaffFlagValue("developer"), true, true)
        ],
        discord: [],
        faction: [],
        help: [],
        house: [],
        item: [],
        job: [
            commandData("takejob", takeJobCommand, "", getStaffFlagValue("none"), true, false),
            commandData("startwork", startWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("stopwork", stopWorkingCommand, "", getStaffFlagValue("none"), true, false),
            commandData("quitjob", quitJobCommand, "", getStaffFlagValue("none"), true, false),
            commandData("uniform", jobUniformCommand, "", getStaffFlagValue("none"), true, false),

            commandData("radio", jobRadioCommand, "", getStaffFlagValue("none"), true, false),
            commandData("r", jobRadioCommand, "", getStaffFlagValue("none"), true, false),
            commandData("d", jobDepartmentRadioCommand, "", getStaffFlagValue("none"), true, false),

            // Taxi
            commandData("fare", takeJobCommand, "", getStaffFlagValue("none"), true, false),

            // Police
            commandData("tazer", policeTazerCommand, "", getStaffFlagValue("none"), true, false),
            commandData("cuff", policeCuffCommand, "", getStaffFlagValue("none"), true, false),
            commandData("detain", policeDetainCommand, "", getStaffFlagValue("none"), true, false),
            commandData("drag", policeDragCommand, "", getStaffFlagValue("none"), true, false),
            commandData("search", policeSearchCommand, "", getStaffFlagValue("none"), true, false),            
        ],
        locale: [],
        messaging: [],
        misc: [],
        moderation: [
            commandData("kick", kickClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("mute", muteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("freeze", freezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("unmute", unMuteClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),
			commandData("unfreeze", unFreezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("basicModeration"), true, true),			
        ],
        security: [],
        startup: [],
        translate: [],
        utilities: [],
        vehicle: [],
    }
    return tempCommands;
}

// ---------------------------------------------------------------------------

function getCommand(command) {
    let commandGroups = getCommands()
    for(let i in commandGroups) {
        let commandGroup = commandGroups[i];
        for(let j in commandGroup)
        if(commandGroup[j].command.toLowerCase() == command.toLowerCase()) {
            return commandGroup[j];
        }
    }
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

function isCommandAllowedOnDiscord(command) {
    return getCommand(command).allowOnDiscord;
}

// ---------------------------------------------------------------------------