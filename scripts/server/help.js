// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: help.js
// DESC: Provides update info, help commands, and documentation
// TYPE: Server (JavaScript)
// ===========================================================================

function initHelpScript() {
	logToConsole(LOG_INFO, `[VRR.Help]: Initializing help script ...`);
	logToConsole(LOG_INFO, `[VRR.Help]: Help script initialized successfully!`);
}

// ===========================================================================

let randomTips = [
    `${getInlineChatColourByName("white")}Look for yellow dots on your map for job locations.`,
    `${getInlineChatColourByName("white")}You can set custom key binds. Use ${getInlineChatColourByName("lightGrey")}/help keys ${getInlineChatColourByName("white")} for details.`,
    `${getInlineChatColourByName("white")}Use /notips if you don't want to see tips and extra information`,
    `${getInlineChatColourByName("white")}You can edit your keybinds using ${getInlineChatColourByName("lightGrey")}/keybinds`,
    `${getInlineChatColourByName("white")}Press I to see your inventory, and use number keys to select an item`,
    `${getInlineChatColourByName("white")}Use /buy at a business to purchase items.`,
    `${getInlineChatColourByName("white")}Found a bug? Report it with ${getInlineChatColourByName("lightGrey")}/bug`,
    `${getInlineChatColourByName("white")}Have an idea or suggestion for the server? Let the devs know using ${getInlineChatColourByName("lightGrey")}/idea`,
    `${getInlineChatColourByName("white")}Want to buy a business? Use /bizbuy at one for sale`,
    `${getInlineChatColourByName("white")}Want to buy a house? Use /housebuy at one for sale`,
    `${getInlineChatColourByName("white")}Want to buy a vehicle? Visit a dealership and enter one for info on how to buy it!`,
    `${getInlineChatColourByName("white")}Visit the forum at ${getInlineChatColourByName("lightGrey")}asshatgaming.com`,
    `${getInlineChatColourByName("white")}Chat with us on discord: ${getInlineChatColourByName("lightGrey")}discord.asshatgaming.com`,
    //`${getInlineChatColourByName("white")}Tax is based on your total wealth. This includes money, vehicles, businesses and more.`,
    //`${getInlineChatColourByName("white")}Don't go broke because of a hospital bill! Get insured today by visiting an insurance agency!`,
    //`${getInlineChatColourByName("white")}Don't go broke because your car was destroyed. Visit an insurance agency today!`,
    //`${getInlineChatColourByName("white")}You can find most locations by using ${getInlineChatColourByName("lightGrey")}/gps`,
    //`${getInlineChatColourByName("white")}Want to advertise your business? Visit the news station and place an /ad today!`,
    //`${getInlineChatColourByName("white")}You can change your quick item display. Choices are GTAV-style pie menu or Minecraft-style hotbar`,
    //`${getInlineChatColourByName("white")}Hold [#0066FF]E ${getInlineChatColourByName("white")}to hail a nearby taxi if you need a ride.`,
    //`${getInlineChatColourByName("white")}Press [#0066FF]G ${getInlineChatColourByName("white")}to enter a vehicle as passenger.`,
    //`${getInlineChatColourByName("white")}Banks can provide loans. Use ${getInlineChatColourByName("lightGrey")}/help loans ${getInlineChatColourByName("white")} for more details.`,
    //`${getInlineChatColourByName("white")}Want to make a clan? Use ${getInlineChatColourByName("lightGrey")}/help clans ${getInlineChatColourByName("white")} for details.`,
    //`${getInlineChatColourByName("white")}Weapons can be legally purchased at ammunation, if you have a weapon license.`,
];

// ===========================================================================

function helpCommand(command, params, client) {
	if(areParamsEmpty(params)) {
        showMainHelpMessage(client);
        return false;
    }

    let splitParams = params.split(" ");

    switch(toLowerCase(splitParams[0])) {
        case "account":
            showAccountHelpMessage(client);
            break;

        case "vehicle":
            showVehicleHelpMessage(client);
            break;

        case "dealership":
            showVehicleDealershipHelpMessage(client);
            break;

        case "business":
            showBusinessHelpMessage(client);
            break;

        case "job":
            showJobHelpMessage(client);
            break;

        case "chat":
            showChatHelpMessage(client);
            break;

        case "rules":
            showRulesHelpMessage(client);
            break;

        case "website":
            showWebsiteHelpMessage(client);
            break;

        case "discord":
            showDiscordHelpMessage(client);
            break;

        case "anim":
        case "animation":
            showAnimationHelpMessage(client);
            break;

        case "ammunation":
        case "ammu":
            showAmmunationHelpMessage(client);
            break;

        case "skin":
        case "skins":
        case "clothes":
            showClothesHelpMessage(client);
            break;

        case "key":
        case "keys":
        case "keybinds":
        case "bindkey":
        case "bindkeys":
            showBindKeysHelpMessage(client);
            break;

        case "command":
        case "cmd":
            if(areThereEnoughParams(params, 2, " ")) {
                showCommandHelpMessage(client, splitParams[2]);
            } else {
                showCommandHelpMessage(client, false);
            }
            break;

        default:
            showMainHelpMessage(client);
            break;
    }
}

// == Account Help =============================
// == Vehicle Help =============================
// == Vehicle Dealerships ======================
// == Job Help =================================
// == Chat Help ================================
// == Server Rules =============================
// == Website ==================================
// == Discord ==================================
// == Animations ===============================
// == Pay And Spray ============================
// == Ammunation ===============================
// == Vehicle Tuneup ===========================
// == Bindable Keys ============================
// == Clothes ==================================
// == Business =================================
// == Command Info =============================

// ===========================================================================

function showMainHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Help ${getInlineChatColourByType("clanOrange")}=================================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Use /help <category> for commands and info. Example: ${getInlineChatColourByName("lightGrey")}/help vehicle`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Help Categories: [#A9A9A9]account, command, vehicle, job, chat, rules, website, anim`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• [#A9A9A9]ammunation, skins, mechanic, dealership, discord, colours, keys`);
}

// ===========================================================================

function showAccountHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Account Help ${getInlineChatColourByType("clanOrange")}=============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Do not share your password with anybody else.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Use ${getInlineChatColourByName("lightGrey")}/changepass${getInlineChatColourByName("white")} to change your password.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Some settings you can use: ${getInlineChatColourByName("lightGrey")}/gui, /logo, /iplogin, /autolastchar, /2fa, /loginalert`);
}

// ===========================================================================

function showVehicleHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Vehicle Help ${getInlineChatColourByType("clanOrange")}=============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Visit dealerships to buy new vehicles (Use ${getInlineChatColourByName("lightGrey")}/help dealership ${getInlineChatColourByName("white")}for more info.)`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Some commands: ${getInlineChatColourByName("lightGrey")}/lock, /engine, /lights, /trunk, /rentveh, /buyveh, /rentprice, /buyprice`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Your personal vehicles will save wherever you or somebody else leaves them!`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Visit a mechanic garage to repair, colour, and tune up your car! ${getInlineChatColourByName("lightGrey")}/help mechanic ${getInlineChatColourByName("white")} for info`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Don't forget to register and insure your vehicle! Use ${getInlineChatColourByName("lightGrey")}/gps ${getInlineChatColourByName("white")}to find a DMV for this.`);
}

// ===========================================================================

function showVehicleDealershipHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Vehicle Dealerships ${getInlineChatColourByType("clanOrange")}======================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Visit a vehicle dealer to buy new vehicles. Use ${getInlineChatColourByName("lightGrey")}/gps ${getInlineChatColourByName("white")}to find one.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}At the dealer, simply enter a car you want to buy, and the price will be shown to you`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}If you want to buy the vehicle and have enough money, use ${getInlineChatColourByName("lightGrey")}/buyveh ${getInlineChatColourByName("white")}and you will be given keys`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}A new car for sale will appear when you drive away from the dealer.`);
}

// ===========================================================================

function showJobHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Job Help ${getInlineChatColourByType("clanOrange")}=================================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Visit job locations get a job and earn money. Look for yellow spots on the map`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}At a job location, use ${getInlineChatColourByName("lightGrey")}/takejob ${getInlineChatColourByName("white")}to get the job. Use ${getInlineChatColourByName("lightGrey")}/quitjob ${getInlineChatColourByName("white")}to quit your job`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Use ${getInlineChatColourByName("lightGrey")}/startwork ${getInlineChatColourByName("white")}to begin working. You can also get a job ${getInlineChatColourByName("lightGrey")}/uniform and ${getInlineChatColourByName("lightGrey")}/equipment`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Most job vehicles are locked. Use ${getInlineChatColourByName("lightGrey")}/lock ${getInlineChatColourByName("white")}near one to enter it.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}When entering a job vehicle, information on how to do the job will be shown to you.`);
}

// ===========================================================================

function showChatHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Chat Help ${getInlineChatColourByType("clanOrange")}================================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}There are two main types of chat: out-of-character (OOC) and in-character (IC)`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Mixing these two types is not proper roleplay. See ${getInlineChatColourByName("lightGrey")}/rules ${getInlineChatColourByName("white")}for info.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Some chat commands: ${getInlineChatColourByName("lightGrey")}/dm /whisper /talk /shout /me.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Some have shorter names available (${getInlineChatColourByName("lightGrey")}/t ${getInlineChatColourByName("white")}for talk, ${getInlineChatColourByName("lightGrey")}/s ${getInlineChatColourByName("white")}for shout, etc)`);
}

// ===========================================================================

function showRulesHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Server Rules ${getInlineChatColourByType("clanOrange")}=============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Unrealistic actions (powergaming) are not allowed. You aren't superman.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}No terrorist or terrorism roleplay is allowed.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Always follow instructions given by moderators and admins.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Do not mix the chats (metagaming). You can't use info in IC that was received OOC`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Keep English in main chats. If you aren't good at English, use ${getInlineChatColourByName("lightGrey")}/help language`);
}

// ===========================================================================

function showWebsiteHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Website ${getInlineChatColourByType("clanOrange")}=============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}The website is ${getInlineChatColourByName("lightGrey")}https://asshatgaming.com`);
}

// ===========================================================================

function showDiscordHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Discord ${getInlineChatColourByType("clanOrange")}=============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Join our discord! ${getInlineChatColourByName("lightGrey")}https://discord.gg/4TQ3TGB529`);
}

// ===========================================================================

function showAnimationHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Animations ${getInlineChatColourByType("clanOrange")}===============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Animations are not yet available.`);
}

// ===========================================================================

function showAmmunationHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Ammunation ${getInlineChatColourByType("clanOrange")}===============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Visit an ammunation to buy weapons. Use ${getInlineChatColourByName("lightGrey")}/gps ${getInlineChatColourByName("white")}to find one.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Buying a weapon requires a weapon license.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Weapon licenses are managed by the police department. Apply there to get one.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Weapons can also be purchased illegally from weapon dealers and clans.`);
}

// ===========================================================================

function showClothesHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Clothes ${getInlineChatColourByType("clanOrange")}==================================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}To change your skin, use ${getInlineChatColourByName("lightGrey")}/gps ${getInlineChatColourByName("white")}to find a clothing store`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}At a clothing store, use ${getInlineChatColourByName("lightGrey")}/buyclothes ${getInlineChatColourByName("white")}to choose a skin`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Some skins are restricted to jobs, clans, or for other reasons.`);
}

// ===========================================================================

function showBindKeysHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Bindable Keys ${getInlineChatColourByType("clanOrange")}============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}You can set your own keys binds. Use ${getInlineChatColourByName("lightGrey")}/keybinds ${getInlineChatColourByName("white")}to add, remove, or change your keys.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Default keys are: [#0066FF]K ${getInlineChatColourByName("white")}for vehicle engine, [#0066FF]I ${getInlineChatColourByName("white")}for lights, and [#0066FF]L ${getInlineChatColourByName("white")}for lock/unlock`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}[#0066FF]I ${getInlineChatColourByName("white")}to see your items and [#0066FF]1-9 ${getInlineChatColourByName("white")}to equip an item or [#0066FF]0 (zero) ${getInlineChatColourByName("white")}to equip none.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}[#0066FF]U ${getInlineChatColourByName("white")}to use or [#0066FF]O ${getInlineChatColourByName("white")}to drop your current item, and [#0066FF]P ${getInlineChatColourByName("white")}to pickup an item from the ground.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Your keybinds will automatically be usable on all servers`);
}

// ===========================================================================

function showBusinessHelpMessage(client) {
    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Business ${getInlineChatColourByType("clanOrange")}=================================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Use /buy to purchase items or /bizitems to see a list of what's for sale at any business`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Businesses are shown with blue names above the icon at their entrance.`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Business owner commands: ${getInlineChatColourByName("lightGrey")}/bizorder, /biz`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}A new car for sale will appear when you drive away from the dealer.`);
}

// ===========================================================================

function showCommandHelpMessage(client, commandName) {
    if(!commandName) {
        messagePlayerSyntax(client, `${getCommandSyntaxText("help")} <command name>`);
        return false;
    }

    commandName = toLowerCase(commandName);
    commandName = commandName.trim();

    if(commandName.slice(0, 1) == "/") {
        commandName = commandName.slice(1);
    }

    let command = getCommandData(commandName);
    let aliases = getCommandAliasesNames(command);

    messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Command Info ${getInlineChatColourByType("clanOrange")}=============================`);
    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Description: ${command.description}`);

    if(aliases.length > 0) {
        messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Aliases: ${aliases.join(", ")}`);
    } else {
        messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Aliases: (None)`);
    }

    //messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Usable on Discord: ${getYesNoFromBool(command.allowOnDiscord)}`);

    //if(doesPlayerHaveStaffPermission(client, getStaffFlagValue("basicModeration"))) {
    //    messagePlayerNormal(client, `${getInlineChatColourByType("clanOrange")}• ${getInlineChatColourByName("white")}Usable on Discord: ${getYesNoFromBool(command.allowOnDiscord)}`);
    //}
}

// ===========================================================================

function showEnteredDriverSeatHasKeysHelpTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.enteredDriverSeat) {
        messagePlayerInfo(client, `You can press K for engine, I for lights, and L to lock/unlock the car.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.enteredDriverSeat;
    }
}

// ===========================================================================

function showApproachJobWhileUnemployedTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.approachJobWhileUnemployed) {
        messagePlayerTip(client, `Approach the icon and use /jobinfo to see details about this job.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.approachJobWhileUnemployed;
    }
}

// ===========================================================================

function showTakeNearbyJobTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.takeJobWhileUnemployed) {
        messagePlayerTip(client, `You are nearby a job location. Look for the spinning icon.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.takeJobWhileUnemployed;
    }
}

// ===========================================================================

function showApproachCurrentJobTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.approachCurrentJob) {
        //messagePlayerTip(client, `Press ${getServerConfig().keybindText.actionKey} to start working, or hold ${getServerConfig().keybindText.actionKey} to quit your job.`);
        messagePlayerTip(client, `This job location is for your job. You can use /startwork to start working.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.approachCurrentJob;
    }
}

// ===========================================================================

function showApproachOtherJobTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.approachCurrentJob) {
        //messagePlayerTip(client, `Press ${getServerConfig().keybindText.actionKey} to start working, or hold ${getServerConfig().keybindText.actionKey} to quit your job.`);
        messagePlayerTip(client, `This job location belongs to another job. If you want this job, use /quitjob first.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.approachCurrentJob;
    }
}

// ===========================================================================

function showStartedWorkingTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.startedWorking) {
        //messagePlayerTip(client, `Press ${getServerConfig().keybindText.actionKey} to change uniform, or hold ${getServerConfig().keybindText.actionKey} to stop working.`);
        messagePlayerTip(client, `Use /uniform to see job skins and /equip to see available jobs tools and weapons.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.startedWorking;
    }
}

// ===========================================================================

function showApproachOwnedVehicleTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.approachOwnedVehicle) {
        messagePlayerTip(client, `This vehicle is owned by you.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.approachOwnedVehicle;
    }
}

// ===========================================================================

function showApproachClanVehicleTip(client) {
    if(getPlayerData(client).accountData.shownTips & !shownTipsFlags.approachAnyVehicle) {
        messagePlayerTip(client, `Your clan owns this vehicle.`);
        getPlayerData(client).accountData.shownTips = getPlayerData(client).accountData.shownTips | shownTipsFlags.approachAnyVehicle;
    }
}

// ===========================================================================