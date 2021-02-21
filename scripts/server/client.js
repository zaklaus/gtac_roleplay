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
    //addNetworkHandler("ag.onPlayerExitVehicle", onPlayerExitedVehicle);

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
    //logToConsole(LOG_DEBUG, `[Asshat.Client] Sending ${getPlayerDisplayForConsole(client)}'s updated nametag to all players`);
	triggerNetworkEvent("ag.nametag", null, client.name, getPlayerNameForNameTag(client), getPlayerColour(client), false, client.ping);
}

// ---------------------------------------------------------------------------

function updateAllPlayerNameTags() {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending updated nametags to all players`);
    let clients = getClients();
	for(let i in clients) {
        updatePlayerNameTag(clients[i]);
    }
}

// ---------------------------------------------------------------------------

function updatePlayerPing(client) {
    //logToConsole(LOG_DEBUG, `[Asshat.Client] Sending ${getPlayerDisplayForConsole(client)}'s ping to all players`);
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
    logToConsole(LOG_DEBUG, `[Asshat.Client] Showing game message to ${getPlayerDisplayForConsole(client)} (${text}) for ${duration} milliseconds`);
    triggerNetworkEvent("ag.smallGameMessage", client, text, colour, duration);
}

// ---------------------------------------------------------------------------

function enableCityAmbienceForPlayer(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Setting ${getPlayerDisplayForConsole(client)}'s city ambience to ${toUpperCase(getOnOffFromBool(false))}`);
    triggerNetworkEvent("ag.ambience", client, true);
}

// ---------------------------------------------------------------------------

function disableCityAmbienceForPlayer(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Setting ${getPlayerDisplayForConsole(client)}'s city ambience to ${toUpperCase(getOnOffFromBool(false))}`);
    triggerNetworkEvent("ag.ambience", client, false);
}

// ---------------------------------------------------------------------------

function clearPlayerOwnedPeds(client) {
	logToConsole(LOG_DEBUG, `[Asshat.Client] Clearing peds owned by ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("ag.clearPeds", client);
}

// ---------------------------------------------------------------------------

function updatePlayerSpawnedState(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Setting ${getPlayerDisplayForConsole(client)}'s spawned state ${toUpperCase(getOnOffFromBool(state))}`);
    triggerNetworkEvent("ag.spawned", client, state);
}

// ---------------------------------------------------------------------------

function setPlayerControlState(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Setting ${getPlayerDisplayForConsole(client)}'s control state ${toUpperCase(getOnOffFromBool(state))}`);
    triggerNetworkEvent("ag.control", client, state, !state);
}

// ---------------------------------------------------------------------------

function updatePlayerShowLogoState(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Setting ${getPlayerDisplayForConsole(client)}'s logo state ${toUpperCase(getOnOffFromBool(state))}`);
    triggerNetworkEvent("ag.logo", client, state);
}

// ---------------------------------------------------------------------------

function restorePlayerCamera(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Restoring ${getPlayerDisplayForConsole(client)}'s camera`);
    triggerNetworkEvent("ag.restoreCamera", client);
}

// -------------------------------------------------------------------------

function setPlayer2DRendering(client, hudState = false, labelState = false, smallGameMessageState = false, scoreboardState = false, hotBarState = false, itemActionDelayState = false) {
	triggerNetworkEvent("ag.set2DRendering", client, hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState);
}

// ---------------------------------------------------------------------------

function syncPlayerProperties(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending signal to sync ${getPlayerDisplayForConsole(client)}'s player ped properties`);
    triggerNetworkEvent("ag.player.sync", null, client.player);
}

// ---------------------------------------------------------------------------

function updatePlayerSnowState(client) {
    if(doesGameHaveSnow(getServerGame())) {
        logToConsole(LOG_DEBUG, `[Asshat.Client] Setting ${getPlayerDisplayForConsole(client)}'s snow state (Falling: ${toUpperCase(getOnOffFromBool(getServerConfig().fallingSnow))}, Ground: ${toUpperCase(getOnOffFromBool(getServerConfig().groundSnow))})`);
        triggerNetworkEvent("ag.snow", client, getServerConfig().fallingSnow, getServerConfig().groundSnow);
    }
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
            logToConsole(LOG_DEBUG, `[Asshat.Client] Sending removed world object ${i} (${getGameConfig().removedWorldObjects[getServerGame()][i].model}) to ${client.name}`);
            triggerNetworkEvent("ag.removeWorldObject", client, getGameConfig().removedWorldObjects[getServerGame()][i].model, getGameConfig().removedWorldObjects[getServerGame()][i].position, getGameConfig().removedWorldObjects[getServerGame()][i].range);
        }
    }
	return true;
}

// ---------------------------------------------------------------------------

function updatePlayerHotBar(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending updated hotbar data to ${getPlayerDisplayForConsole(client)}`);
    let tempHotBarItems = [];
    for(let i in getPlayerData(client).hotBarItems) {
        let itemImage = "";
        let itemValue = 0;
        let itemExists = false;
        if(getPlayerData(client).hotBarItems[i] != -1) {
            if(getItemData(getPlayerData(client).hotBarItems[i])) {
                let itemData = getItemData(getPlayerData(client).hotBarItems[i]);
                let itemTypeData = getItemTypeData(itemData.itemTypeIndex);
                itemExists = true;
                itemImage = itemTypeData.hotbarImage;
                itemValue = itemData.value;
            }
        }
        tempHotBarItems.push([i, itemExists, itemImage, itemValue]);
    }
    triggerNetworkEvent("ag.hotbar", client, getPlayerData(client).activeHotBarSlot, tempHotBarItems);
}

// ---------------------------------------------------------------------------

function setPlayerWeaponDamageEnabled(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending weapon damage state for ${getPlayerDisplayForConsole(client)} to all players`);
    triggerNetworkEvent("ag.weaponDamageEnabled", null, client.name, state);
}

// ---------------------------------------------------------------------------

function setPlayerWeaponDamageEvent(client, eventType) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending weapon damage event (${eventType}) for ${getPlayerDisplayForConsole(client)} to all players`);
    triggerNetworkEvent("ag.weaponDamageEvent", null, client.name, eventType);
    getPlayerData(client).weaponDamageEvent = eventType;
}

// ---------------------------------------------------------------------------

function sendJobRouteStopToPlayer(client, position, colour) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending job route stop data to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.showJobRouteStop", client, position, colour);
}

// ---------------------------------------------------------------------------

function showPlayerLoginSuccessGUI(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending login success GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.loginSuccess", client);
}

// ---------------------------------------------------------------------------

function showPlayerLoginFailedGUI(client, errorMessage) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending login failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.loginFailed", client, errorMessage);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationSuccessGUI(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending registration success GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.registrationSuccess", client);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationFailedGUI(client, errorMessage) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending registration failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.registrationFailed", client, errorMessage);
}

// ---------------------------------------------------------------------------

function sendPlayerGUIColours(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending GUI colours to ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("ag.guiColour", client, getServerConfig().guiColour[0], getServerConfig().guiColour[1], getServerConfig().guiColour[2]);
}

// ---------------------------------------------------------------------------

function sendPlayerGUIInit(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending GUI init signal to ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("ag.guiInit", client);
}

// ---------------------------------------------------------------------------

function showPlayerLoginGUI(client, errorMessage = "") {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending show login GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.showLogin", client);
}

// ---------------------------------------------------------------------------

function showPlayerRegistrationGUI(client, errorMessage = "") {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending show registration GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.showRegistration", client);
}

// ---------------------------------------------------------------------------

function showPlayerNewCharacterGUI(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending show new character GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.showNewCharacter", client);
}

// ---------------------------------------------------------------------------

function showPlayerCharacterSelectGUI(client, firstName, lastName, placeOfOrigin, dateOfBirth, skin) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending character select GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.showCharacterSelect", client, firstName, lastName, placeOfOrigin, dateOfBirth, skin);
}

// ---------------------------------------------------------------------------

function updatePlayerCharacterSelectGUI(client, firstName, lastName, placeOfOrigin, dateOfBirth, skin) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending update character select GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.switchCharacterSelect", client, firstName, lastName, placeOfOrigin, dateOfBirth, skin);
}

// ---------------------------------------------------------------------------

function showPlayerCharacterSelectSuccessGUI(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending character select success GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.characterSelectSuccess", client);
}

// ---------------------------------------------------------------------------

function showPlayerCharacterSelectFailedGUI(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending character select failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.characterSelectFailed", client);
}

// ---------------------------------------------------------------------------

function showPlayerPromptGUI(client, promptMessage, promptTitle) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending show prompt GUI signal to ${getPlayerDisplayForConsole(client)} (Title: ${promptTitle}, Message: ${promptMessage})`);
    triggerNetworkEvent("ag.showPrompt", client, promptMessage, promptTitle);
}

// ---------------------------------------------------------------------------

function showPlayerInfoGUI(client, infoMessage, infoTitle) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending show info GUI signal to ${getPlayerDisplayForConsole(client)} (Title: ${infoTitle}, Message: ${infoMessage})`);
    triggerNetworkEvent("ag.showInfo", client, infoMessage, infoTitle);
}

// ---------------------------------------------------------------------------

function showPlayerErrorGUI(client, errorMessage, errorTitle) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending show error GUI signal to ${getPlayerDisplayForConsole(client)} (Title: ${errorTitle}, Message: ${errorMessage})`);
    triggerNetworkEvent("ag.showInfo", client, errorMessage, errorTitle);
}

// ---------------------------------------------------------------------------

function sendRunCodeToClient(client, code, returnTo) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending runcode to ${getPlayerDisplayForConsole(client)} (returnTo: ${getPlayerDisplayForConsole(getClientFromIndex(returnTo))}, Code: ${code})`);
    triggerNetworkEvent("ag.runCode", client, code, returnTo);
}

// ---------------------------------------------------------------------------

function sendPlayerWorkingState(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending working state (${toUpperCase(getYesNoFromBool(state))}) to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.working", client, state);
}

// ---------------------------------------------------------------------------

function sendPlayerJobType(client, jobType) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending job type (${jobType}) to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.jobType", client, jobType);
}

// ---------------------------------------------------------------------------

function sendPlayerStopJobRoute(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending signal to abort job route to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.stopJobRoute", client);
}

// ---------------------------------------------------------------------------

function sendPlayerMouseCameraToggle(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending signal to toggle mouse camera ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.mouseCamera", client);
}

// ---------------------------------------------------------------------------

function sendPlayerMouseCursorToggle(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending signal to toggle mouse cursor ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.mouseCursor", client);
}

// ---------------------------------------------------------------------------

function sendAddAccountKeyBindToClient(client, key, keyState) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending added keybind to ${getPlayerDisplayForConsole(client)} (Key: ${sdl.getKeyName(key)}, State: ${(keyState) ? "down" : "up"})`);
    triggerNetworkEvent("ag.addKeyBind", client, toInteger(key), (keyState) ? KEYSTATE_DOWN : KEYSTATE_UP);
}

// ---------------------------------------------------------------------------

function sendRemoveAccountKeyBindToClient(client, key) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending deleted keybind to ${getPlayerDisplayForConsole(client)} (Key: ${sdl.getKeyName(key)})`);
    triggerNetworkEvent("ag.delKeyBind", client, toInteger(key));
}

// ---------------------------------------------------------------------------

function sendPlayerSetPosition(client, position) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending set position signal to ${getPlayerDisplayForConsole(client)} (Position: ${position.x}, ${position.y}, ${position.z})`);
    triggerNetworkEvent("ag.position", client, position);
}

// ---------------------------------------------------------------------------

function sendPlayerSetHeading(client, heading) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending set heading signal to ${getPlayerDisplayForConsole(client)} (Heading: ${heading})`);
    triggerNetworkEvent("ag.heading", client, heading);
}

// ---------------------------------------------------------------------------

function sendPlayerSetInterior(client, interior) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending set interior signal to ${getPlayerDisplayForConsole(client)} (Interior: ${interior})`);
    triggerNetworkEvent("ag.interior", client, interior);
}

// ---------------------------------------------------------------------------

function sendPlayerFrozenState(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending set frozen signal to ${getPlayerDisplayForConsole(client)} (State: ${toUpperCase(getYesNoFromBool(state))})`);
    triggerNetworkEvent("ag.frozen", client, state);
}

// ---------------------------------------------------------------------------

function givePlayerWeapon(client, weaponId, ammo, active) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending signal to ${getPlayerDisplayForConsole(client)} to give weapon (Weapon: ${weaponId}, Ammo: ${ammo})`);
    triggerNetworkEvent("ag.giveWeapon", client, weaponId, ammo, active);
}

// ---------------------------------------------------------------------------

function clearPlayerWeapons(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending signal to ${getPlayerDisplayForConsole(client)} to clear weapons`);
    triggerNetworkEvent("ag.clearWeapons", client);
}

// ---------------------------------------------------------------------------

function showPlayerNewCharacterFailedGUI(client, errorMessage) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending new character failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.newCharacterFailed", client, errorMessage);
}

// ---------------------------------------------------------------------------

function sendPlayerRemoveFromVehicle(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Sending remove from vehicle signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.removeFromVehicle", client);
}

// ---------------------------------------------------------------------------

function sendChatBoxMessageToPlayer(client, message, colour) {
    triggerNetworkEvent("ag.m", client, message, colour)
}

// ---------------------------------------------------------------------------

function showPlayerItemTakeDelay(client, itemId) {
    if(getItemData(itemId)) {
        let delay = getItemTypeData(getItemData(itemId).itemTypeIndex).pickupDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item TAKE delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("ag.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item TAKE delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerTakeItem(client, itemId);
        }
    }
}

// ---------------------------------------------------------------------------

function showPlayerItemUseDelay(client, itemSlot) {
    if(getItemData(getPlayerData(client).hotBarItems[itemSlot])) {
        let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).useDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item USE delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("ag.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item USE delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerUseItem(client, itemSlot);
        }
    }
}

// ---------------------------------------------------------------------------

function showPlayerItemDropDelay(client, itemSlot) {
    if(getItemData(getPlayerData(client).hotBarItems[itemSlot])) {
        let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).dropDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item DROP delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("ag.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item DROP delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerDropItem(client, itemSlot);
        }
    }
}

// ---------------------------------------------------------------------------

function showPlayerItemPickupDelay(client, itemId) {
    if(getItemData(itemId)) {
        let delay = getItemTypeData(getItemData(itemId).itemTypeIndex).pickupDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item PICKUP delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("ag.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item PICKUP delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerPickupItem(client, itemId);
        }
    }
}

// ---------------------------------------------------------------------------

function showPlayerItemPutDelay(client, itemSlot) {
    if(getItemData(getPlayerData(client).hotBarItems[itemSlot])) {
        let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).putDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item PUT delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("ag.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item PUT delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerPutItem(client, itemSlot);
        }
    }
}

// ---------------------------------------------------------------------------

function showPlayerItemSwitchDelay(client, itemSlot) {
    if(itemSlot != -1) {
        if(getPlayerData(client).hotBarItems[itemSlot] != -1) {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (${getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).switchDelay} milliseconds)`);
            triggerNetworkEvent("ag.showItemActionDelay", client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).switchDelay);
        } else {
            logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerSwitchItem(client, itemSlot);
        }
    } else {
        logToConsole(LOG_DEBUG, `[Asshat.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (instant)`);
        playerSwitchItem(client, itemSlot);
    }
}

// ---------------------------------------------------------------------------

function sendPlayerDrunkEffect(client, amount, duration) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Setting drunk effect for ${getPlayerDisplayForConsole(client)} to ${amount} for ${duration} milliseconds`);
    triggerNetworkEvent("ag.drunkEffect", client, amount, duration);
}

// ---------------------------------------------------------------------------

function sendPlayerClearPedState(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Client] Clearing ped state for ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("ag.clearPedState", client);
}

// ---------------------------------------------------------------------------

function playerDamagedByPlayer(client, damagerEntityName, weaponId, pedPiece, healthLoss) {
    let damagerEntity = getClientByName(damagerEntityName);

    if(isNull(damagerEntity)) {
        logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)}'s damager entity from ID is null`);
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)} was damaged by ${damagerEntity}`);

    if(isNull(damagerEntity)) {
        logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)}'s damager client is INVALID`);
        return false;
    }

    if(!getPlayerData(damagerEntity) || !getPlayerData(client)) {
        logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)}'s damager's client data is INVALID`);
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)}'s damager is ${getPlayerDisplayForConsole(damagerEntity)}`);

    switch(getPlayerData(damagerEntity).weaponDamageEvent) {
        case AG_WEAPON_DAMAGE_EVENT_TAZER:
            logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)}'s damager ${getPlayerDisplayForConsole(damagerEntity)} is using a tazer`);
            if(!isPlayerTazed(client) && !isPlayerHandCuffed(client) && !isPlayerInAnyVehicle(client)) {
                logToConsole(LOG_DEBUG, `[Asshat.Client] ${getPlayerDisplayForConsole(client)} was not previously tazed, binded, or in a vehicle. Taze successful`);
                meActionToNearbyPlayers(damagerEntity, `electrifies ${getCharacterFullName(client)} with their tazer`);
                tazePlayer(client);
            }
            break;

        default:
            break;
    }
}

// ---------------------------------------------------------------------------

function setPlayerCameraLookAt(client, cameraPosition, lookAtPosition) {
	triggerNetworkEvent("ag.cameraLookAt", client, cameraPosition, lookAtPosition);
}

// ---------------------------------------------------------------------------

function setTimeMinuteDuration(client, minuteDuration) {
	triggerNetworkEvent("ag.minuteDuration", client, minuteDuration);
}

// ---------------------------------------------------------------------------