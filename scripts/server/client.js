// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: client.js
// DESC: Provides client communication and cross-endpoint operations
// TYPE: Server (JavaScript)
// ===========================================================================

function initClientScript() {
    logToConsole(LOG_DEBUG, "[Asshat.Client]: Initializing client script ...");
    addAllNetworkHandlers();
    logToConsole(LOG_DEBUG, "[Asshat.Clan]: Initializing client script ...");
}

// ---------------------------------------------------------------------------

function addAllNetworkHandlers() {
    logToConsole(LOG_DEBUG, "[Asshat.Client]: Adding network handlers ...");

    // KeyBind
    addNetworkHandler("ag.useKeyBind", playerUsedKeyBind);

    // GUI
    addNetworkHandler("ag.promptAnswerNo", playerPromptAnswerNo);
    addNetworkHandler("ag.promptAnswerYes", playerPromptAnswerYes);

    // AFK
    addNetworkHandler("ag.afk", playerChangeAFKState);

    // Event
    addNetworkHandler("ag.enteredSphere", onPlayerEnteredSphere);
    addNetworkHandler("ag.exitedSphere", onPlayerExitedSphere);
    addNetworkHandler("ag.playerDeath", onPlayerDeath);
    addNetworkHandler("ag.onPlayerEnterVehicle", onPlayerEnteredVehicle);
    addNetworkHandler("ag.onPlayerExitVehicle", onPlayerExitedVehicle);

    // Job
    addNetworkHandler("ag.arrivedAtJobRouteStop", playerArrivedAtJobRouteStop);

    // Client
    addNetworkHandler("ag.clientReady", playerClientReady);
    addNetworkHandler("ag.guiReady", playerGUIReady);
    addNetworkHandler("ag.clientStarted", playerClientStarted);

    // Account
    addNetworkHandler("ag.checkLogin", checkLogin);
    addNetworkHandler("ag.checkRegistration", checkRegistration);

    // Developer
    addNetworkHandler("ag.runCodeSuccess", clientRunCodeSuccess);
    addNetworkHandler("ag.runCodeFail", clientRunCodeFail);

    // SubAccount
    addNetworkHandler("ag.checkNewCharacter", checkNewCharacter);
    addNetworkHandler("ag.nextCharacter", checkNextCharacter);
    addNetworkHandler("ag.previousCharacter", checkPreviousCharacter);
    addNetworkHandler("ag.selectCharacter", selectCharacter);

    // Item
    addNetworkHandler("ag.itemActionDelayComplete", playerItemActionDelayComplete);

    addNetworkHandler("ag.weaponDamage", playerDamagedByPlayer);
}

// ---------------------------------------------------------------------------

function updatePlayerNameTag(client) {
	triggerNetworkEvent("ag.nametag", null, client.name, getPlayerNameForNameTag(client), getPlayerColour(client), false, client.ping);
}

// ---------------------------------------------------------------------------

function updateAllPlayerNameTags() {
    let clients = getClients();
	for(let i in clients) {
        updatePlayerNameTag(clients[i]);
    }
}

// ---------------------------------------------------------------------------

function updatePlayerPing(client) {
	triggerNetworkEvent("ag.ping", null, client.name, client.ping);
}

// ---------------------------------------------------------------------------

function playerClientReady(client) {
	setEntityData(client, "ag.isReady", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are downloaded and ready!`);
	if(client.getData("ag.isStarted") == true) {
		initClient(client);
	}
}

// ---------------------------------------------------------------------------

function playerGUIReady(client) {
	setEntityData(client, "ag.guiReady", true, false);
    logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client GUI is initialized and ready!`);
}

// ---------------------------------------------------------------------------

function playerClientStarted(client) {
	setEntityData(client, "ag.isStarted", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are started and running!`);
	if(client.getData("ag.isReady") == true) {
		initClient(client);
	}
}

// ---------------------------------------------------------------------------

function showGameMessage(client, text, colour, duration) {
    triggerNetworkEvent("ag.smallGameMessage", client, text, colour, duration);
}

// ---------------------------------------------------------------------------

function enableCityAmbienceForPlayer(client) {
    triggerNetworkEvent("ag.ambience", client, true);
}

// ---------------------------------------------------------------------------

function disableCityAmbienceForPlayer(client) {
    triggerNetworkEvent("ag.ambience", client, false);
}

// ---------------------------------------------------------------------------

function clearPlayerOwnedPeds(client) {
	logToConsole(LOG_DEBUG, `[Asshat.Utilities] Clearing peds owned by ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("ag.clearPeds", client);
}

// ---------------------------------------------------------------------------

function updatePlayerJobType(client) {
    triggerNetworkEvent("ag.jobType", client, getJobIndexFromDatabaseId(getPlayerCurrentSubAccount(client).job));
}

// ---------------------------------------------------------------------------

function updatePlayerSpawnedState(client, state) {
    triggerNetworkEvent("ag.spawned", client, state);
}

// ---------------------------------------------------------------------------

function setPlayerControlState(client, state) {
    triggerNetworkEvent("ag.control", client, state);
}

// ---------------------------------------------------------------------------

function updatePlayerShowLogoState(client, state) {
    triggerNetworkEvent("ag.logo", client, state);
}

// ---------------------------------------------------------------------------

function restorePlayerCamera(client) {
    triggerNetworkEvent("ag.restoreCamera", client);
}

// -------------------------------------------------------------------------

function setPlayer2DRendering(client, hudState = false, labelState = false, smallGameMessageState = false, scoreboardState = false, hotBarState = false, itemActionDelayState = false) {
	triggerNetworkEvent("ag.set2DRendering", client, hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState);
}

// ---------------------------------------------------------------------------

function syncPlayerProperties(client) {
    triggerNetworkEvent("ag.player.sync", null, client.player);
}

// ---------------------------------------------------------------------------

function updatePlayerSnowState(client) {
    triggerNetworkEvent("ag.snow", client, getServerConfig().fallingSnow, getServerConfig().groundSnow);
}

// ---------------------------------------------------------------------------

function sendExcludedModelsForGroundSnowToPlayer(client) {
    if(getGameConfig().excludedGroundSnowModels[getServerGame()].length > 0) {
        for(let i in getGameConfig().excludedGroundSnowModels[getServerGame()]) {
            logToConsole(LOG_DEBUG, `[Asshat.Misc] Sending excluded model ${i} for ground snow to ${client.name}`);
            triggerNetworkEvent("ag.excludeGroundSnow", client, getGameConfig().excludedGroundSnowModels[getServerGame()][i]);
        }
    }
}

// ---------------------------------------------------------------------------

function sendRemovedWorldObjectsToPlayer(client) {
    if(getGameConfig().removedWorldObjects[getServerGame()].length > 0) {
        for(let i in getGameConfig().removedWorldObjects[getServerGame()]) {
            logToConsole(LOG_DEBUG, `[Asshat.Misc] Sending removed world object ${i} (${getGameConfig().removedWorldObjects[getServerGame()][i].model}) to ${client.name}`);
            triggerNetworkEvent("ag.removeWorldObject", client, getGameConfig().removedWorldObjects[getServerGame()][i].model, getGameConfig().removedWorldObjects[getServerGame()][i].position, getGameConfig().removedWorldObjects[getServerGame()][i].range);
        }
    }
	return true;
}

// ---------------------------------------------------------------------------

function updatePlayerHotBar(client) {
    let tempHotBarItems = [];
    for(let i in getPlayerData(client).hotBarItems) {
        let itemImage = "";
        let itemValue = 0;
        let itemExists = false;
        if(getPlayerData(client).hotBarItems[i] != -1) {
            let itemData = getItemData(getPlayerData(client).hotBarItems[i]);
            let itemTypeData = getItemTypeData(itemData.itemTypeIndex);
            itemExists = true;
            itemImage = itemTypeData.hotbarImage;
            itemValue = itemData.value;
        }
        tempHotBarItems.push([i, itemExists, itemImage, itemValue]);
    }
    triggerNetworkEvent("ag.hotbar", client, getPlayerData(client).activeHotBarSlot, tempHotBarItems);
}

// ---------------------------------------------------------------------------

function setPlayerWeaponDamageEnabled(client, state) {
    triggerNetworkEvent("ag.weaponDamageEnabled", null, client.name, state);
}

// ---------------------------------------------------------------------------

function setPlayerWeaponDamageEvent(client, eventType) {
    triggerNetworkEvent("ag.weaponDamageEvent", null, client.name, eventType);
}

// ---------------------------------------------------------------------------

function sendJobRouteStopToPlayer(client, position, colour) {
    triggerNetworkEvent("ag.showJobRouteStop", client, position, colour);
}

// ---------------------------------------------------------------------------

function showPlayerLoginSuccessGUI(client) {
    triggerNetworkEvent("ag.loginSuccess", client);
}

// ---------------------------------------------------------------------------

function showPlayerLoginFailedGUI(client, errorMessage) {
    triggerNetworkEvent("ag.loginFailed", client, errorMessage);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationSuccessGUI(client) {
    triggerNetworkEvent("ag.registrationSuccess", client);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationFailedGUI(client, errorMessage) {
    triggerNetworkEvent("ag.registrationFailed", client, errorMessage);
}

// ---------------------------------------------------------------------------

function sendPlayerGUIColours(client) {
	triggerNetworkEvent("ag.guiColour", client, getServerConfig().guiColour[0], getServerConfig().guiColour[1], getServerConfig().guiColour[2]);
}

// ---------------------------------------------------------------------------

function sendPlayerGUIInit(client) {
	triggerNetworkEvent("ag.guiInit", client);
}

// ---------------------------------------------------------------------------

function showPlayerLoginGUI(client, errorMessage = "") {
    triggerNetworkEvent("ag.showLogin", client);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationGUI(client, errorMessage = "") {
    triggerNetworkEvent("ag.showRegistration", client);
}

// ---------------------------------------------------------------------------

function showPlayerNewCharacterGUI(client) {
    triggerNetworkEvent("ag.showNewCharacter", client);
}

// ---------------------------------------------------------------------------

function showPlayerCharacterSelectGUI(client, firstName, lastName, placeOfOrigin, dateOfBirth, skin) {
    triggerNetworkEvent("ag.showCharacterSelect", client, firstName, lastName, placeOfOrigin, dateOfBirth, skin);
}

// ---------------------------------------------------------------------------

function updatePlayerCharacterSelectGUI(client, firstName, lastName, placeOfOrigin, dateOfBirth, skin) {
    triggerNetworkEvent("ag.showCharacterSelect", client, firstName, lastName, placeOfOrigin, dateOfBirth, skin);
}

// ---------------------------------------------------------------------------

function showPlayerCharacterSelectSuccessGUI(client) {
    triggerNetworkEvent("ag.characterSelectSuccess", client);
}

// ---------------------------------------------------------------------------

function showPlayerPromptGUI(client, promptMessage, promptTitle) {
    triggerNetworkEvent("ag.showPrompt", client, promptMessage, promptTitle);
}

// ---------------------------------------------------------------------------

function sendRunCodeToClient(client, code, returnTo) {
    triggerNetworkEvent("ag.runCode", client, code, returnTo);
}

// ---------------------------------------------------------------------------

function sendPlayerWorkingState(client, state) {
    triggerNetworkEvent("ag.working", client, state);
}

// ---------------------------------------------------------------------------

function sendPlayerJobType(client, jobType) {
    triggerNetworkEvent("ag.jobType", client, jobType);
}

// ---------------------------------------------------------------------------

function sendPlayerStopJobRoute(client) {
    triggerNetworkEvent("ag.stopJobRoute", client);
}

// ---------------------------------------------------------------------------

function sendPlayerMouseCameraToggle(client) {
    triggerNetworkEvent("ag.mouseCamera", client);
}

// ---------------------------------------------------------------------------

function sendPlayerMouseCursorToggle(client) {
    triggerNetworkEvent("ag.mouseCursor", client);
}

// ---------------------------------------------------------------------------

function sendAddAccountKeyBindToClient(client, key, keyState) {
    triggerNetworkEvent("ag.addKeyBind", client, toInteger(key), (keyState) ? KEYSTATE_DOWN : KEYSTATE_UP);
}

// ---------------------------------------------------------------------------

function sendRemoveAccountKeyBindToClient(client, key, keyState) {
    triggerNetworkEvent("ag.delKeyBind", client, toInteger(key));
}

// ---------------------------------------------------------------------------

function sendPlayerSetPosition(client, position) {
    triggerNetworkEvent("ag.position", client, position);
}

// ---------------------------------------------------------------------------

function sendPlayerSetHeading(client, heading) {
    triggerNetworkEvent("ag.heading", client, heading);
}

// ---------------------------------------------------------------------------

function sendPlayerSetInterior(client, interior) {
    triggerNetworkEvent("ag.interior", client, interior);
}

// ---------------------------------------------------------------------------

function sendPlayerFrozenState(client, state) {
    triggerNetworkEvent("ag.frozen", client, state);
}

// ---------------------------------------------------------------------------

function givePlayerWeapon(client, weaponId, ammo, active) {
    triggerNetworkEvent("ag.giveWeapon", client, weaponId, ammo, active);
}

// ---------------------------------------------------------------------------

function clearPlayerWeapons(client) {
    triggerNetworkEvent("ag.clearWeapons", client);
}

// ---------------------------------------------------------------------------

function showPlayerNewCharacterFailedGUI(client, errorMessage) {
    triggerNetworkEvent("ag.newCharacterFailed", client, errorMessage);
}

// ---------------------------------------------------------------------------

function sendPlayerRemoveFromVehicle(client) {
    triggerNetworkEvent("ag.removeFromVehicle", client);
}

// ---------------------------------------------------------------------------

function sendChatBoxMessageToPlayer(client, message, colour) {
    triggerNetworkEvent("ag.m", client, message, colour)
}

// ---------------------------------------------------------------------------

function showPlayerItemTakeDelay(client, itemId) {
    triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(itemId).itemTypeIndex).takeDelay);
}

// ---------------------------------------------------------------------------

function showPlayerItemUseDelay(client, itemSlot) {
    triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).useDelay);
}

// ---------------------------------------------------------------------------

function showPlayerItemDropDelay(client, itemSlot) {
    triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).dropDelay);
}

// ---------------------------------------------------------------------------

function showPlayerItemPickupDelay(client, itemId) {
    triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(itemId).itemTypeIndex).pickupDelay);
}

// ---------------------------------------------------------------------------

function showPlayerItemPutDelay(client, itemSlot) {
    triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).putDelay);
}

// ---------------------------------------------------------------------------

function showPlayerItemSwitchDelay(client, itemSlot) {
    if(itemSlot != -1) {
        if(getPlayerData(client).hotBarItems[itemSlot] != -1) {
            triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).switchDelay);
        } else {
            playerSwitchItem(client, itemSlot);
        }
    } else {
        playerSwitchItem(client, itemSlot);
    }
}

// ---------------------------------------------------------------------------

function sendPlayerDrunkEffect(client, amount, duration) {
    triggerNetworkEvent("ag.drunkEffect", client, amount, duration);
}

// ---------------------------------------------------------------------------

function sendPlayerClearPedState(client) {
    triggerNetworkEvent("ag.clearPedState", client);
}

// ---------------------------------------------------------------------------