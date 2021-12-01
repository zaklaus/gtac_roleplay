// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: client.js
// DESC: Provides client communication and cross-endpoint operations
// TYPE: Server (JavaScript)
// ===========================================================================

function initClientScript() {
    logToConsole(LOG_DEBUG, "[VRR.Client]: Initializing client script ...");
    addAllNetworkHandlers();
    logToConsole(LOG_DEBUG, "[VRR.Client]: Client script initialized!");
}

// ===========================================================================

function addAllNetworkHandlers() {
    logToConsole(LOG_DEBUG, "[VRR.Client]: Adding network handlers ...");

    // KeyBind
    addNetworkHandler("vrr.useKeyBind", playerUsedKeyBind);

    // GUI
    addNetworkHandler("vrr.promptAnswerNo", playerPromptAnswerNo);
    addNetworkHandler("vrr.promptAnswerYes", playerPromptAnswerYes);

    // AFK
    addNetworkHandler("vrr.afk", playerChangeAFKState);

    // Event
    addNetworkHandler("vrr.pickup", onPlayerNearPickup);
    addNetworkHandler("vrr.enteredSphere", onPlayerEnteredSphere);
    addNetworkHandler("vrr.exitedSphere", onPlayerExitedSphere);
    addNetworkHandler("vrr.playerDeath", onPlayerDeath);
    addNetworkHandler("vrr.onPlayerEnterVehicle", onPlayerEnteredVehicle);
    addNetworkHandler("vrr.onPlayerExitVehicle", onPlayerExitedVehicle);

    // Job
    addNetworkHandler("vrr.arrivedAtJobRouteStop", playerArrivedAtJobRouteStop);

    // Client
    addNetworkHandler("vrr.clientReady", playerClientReady);
    addNetworkHandler("vrr.guiReady", playerGUIReady);
    addNetworkHandler("vrr.clientStarted", playerClientStarted);
    addNetworkHandler("vrr.clientStopped", playerClientStopped);

    // Account
    addNetworkHandler("vrr.checkLogin", checkLogin);
    addNetworkHandler("vrr.checkRegistration", checkRegistration);

    // Developer
    addNetworkHandler("vrr.runCodeSuccess", clientRunCodeSuccess);
    addNetworkHandler("vrr.runCodeFail", clientRunCodeFail);

    // SubAccount
    addNetworkHandler("vrr.checkNewCharacter", checkNewCharacter);
    addNetworkHandler("vrr.nextCharacter", checkNextCharacter);
    addNetworkHandler("vrr.previousCharacter", checkPreviousCharacter);
    addNetworkHandler("vrr.selectCharacter", selectCharacter);

    // Item
    addNetworkHandler("vrr.itemActionDelayComplete", playerItemActionDelayComplete);

    addNetworkHandler("vrr.weaponDamage", playerDamagedByPlayer);

    addNetworkHandler("vrr.player.position", updatePositionInPlayerData);
    addNetworkHandler("vrr.player.heading", updateHeadingInPlayerData);
    addNetworkHandler("vrr.player.lookat", setPlayerHeadLookPosition);

    addNetworkHandler("vrr.skinSelected", playerFinishedSkinSelection);

    addNetworkHandler("vrr.clientInfo", updateConnectionLogOnClientInfoReceive);
}

// ===========================================================================

function updatePlayerNameTag(client) {
    //logToConsole(LOG_DEBUG, `[VRR.Client] Sending ${getPlayerDisplayForConsole(client)}'s updated nametag to all players`);
	triggerNetworkEvent("vrr.nametag", null, getPlayerName(client), getPlayerNameForNameTag(client), getPlayerColour(client), false, client.ping);
}

// ===========================================================================

function updateAllPlayerNameTags() {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending updated nametags to all players`);
    let clients = getClients();
	for(let i in clients) {
        updatePlayerNameTag(clients[i]);
    }
}

// ===========================================================================

function updatePlayerPing(client) {
    //logToConsole(LOG_DEBUG, `[VRR.Client] Sending ${getPlayerDisplayForConsole(client)}'s ping to all players`);
	triggerNetworkEvent("vrr.ping", null, getPlayerName(client), client.ping);
}

// ===========================================================================

function playerClientReady(client) {
	setEntityData(client, "vrr.isReady", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are downloaded and ready!`);
	if(client.getData("vrr.isStarted") == true) {
		initClient(client);
	}
}

// ===========================================================================

function playerGUIReady(client) {
	setEntityData(client, "vrr.guiReady", true, false);
    logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client GUI is initialized and ready!`);
}

// ===========================================================================

function playerClientStarted(client) {
	setEntityData(client, "vrr.isStarted", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are started and running!`);
	if(client.getData("vrr.isReady") == true) {
		initClient(client);
	}
}

// ===========================================================================

function playerClientStopped(client) {
    logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources have stopped (possibly error?). Kicking them from the server ...`);
	client.disconnect();
}

// ===========================================================================

function showGameMessage(client, text, colour, duration) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Showing game message to ${getPlayerDisplayForConsole(client)} (${text}) for ${duration} milliseconds`);
    triggerNetworkEvent("vrr.smallGameMessage", client, text, colour, duration);
}

// ===========================================================================

function enableCityAmbienceForPlayer(client, clearElements = false) {
    //if(server.getCVar("civilians") == false) {
    //    return false;
    //}

    //logToConsole(LOG_DEBUG, `[VRR.Client] Setting ${getPlayerDisplayForConsole(client)}'s city ambience to ${toUpperCase(getOnOffFromBool(false))}`);
    //triggerNetworkEvent("vrr.ambience", client, true);
}

// ===========================================================================

function disableCityAmbienceForPlayer(client, clearElements = false) {
    //if(server.getCVar("civilians") == true) {
    //    return false;
    //}

    //logToConsole(LOG_DEBUG, `[VRR.Client] Setting ${getPlayerDisplayForConsole(client)}'s city ambience to ${toUpperCase(getOnOffFromBool(false))}`);
    //triggerNetworkEvent("vrr.ambience", client, false, clearElements);
}

// ===========================================================================

function clearPlayerOwnedPeds(client) {
	logToConsole(LOG_DEBUG, `[VRR.Client] Clearing peds owned by ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("vrr.clearPeds", client);
}

// ===========================================================================

function updatePlayerSpawnedState(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Setting ${getPlayerDisplayForConsole(client)}'s spawned state ${toUpperCase(getOnOffFromBool(state))}`);
    getPlayerData(client).spawned = true;
    triggerNetworkEvent("vrr.spawned", client, state);
}

// ===========================================================================

function setPlayerControlState(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Setting ${getPlayerDisplayForConsole(client)}'s control state ${toUpperCase(getOnOffFromBool(state))}`);
    triggerNetworkEvent("vrr.control", client, state, !state);
}

// ===========================================================================

function updatePlayerShowLogoState(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Setting ${getPlayerDisplayForConsole(client)}'s logo state ${toUpperCase(getOnOffFromBool(state))}`);
    triggerNetworkEvent("vrr.logo", client, state);
}

// ===========================================================================

function restorePlayerCamera(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Restoring ${getPlayerDisplayForConsole(client)}'s camera`);
    triggerNetworkEvent("vrr.restoreCamera", client);
}

// ===========================================================================

function setPlayer2DRendering(client, hudState = false, labelState = false, smallGameMessageState = false, scoreboardState = false, hotBarState = false, itemActionDelayState = false) {
	triggerNetworkEvent("vrr.set2DRendering", client, hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState);
}

// ===========================================================================

function syncPlayerProperties(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to sync ${getPlayerDisplayForConsole(client)}'s player ped properties`);
    triggerNetworkEvent("vrr.player.sync", null, client.player);
}

// ===========================================================================

function updatePlayerSnowState(client) {
    if(isSnowSupported(getServerGame())) {
        logToConsole(LOG_DEBUG, `[VRR.Client] Setting ${getPlayerDisplayForConsole(client)}'s snow state (Falling: ${toUpperCase(getOnOffFromBool(getServerConfig().fallingSnow))}, Ground: ${toUpperCase(getOnOffFromBool(getServerConfig().groundSnow))})`);
        triggerNetworkEvent("vrr.snow", client, getServerConfig().fallingSnow, getServerConfig().groundSnow);
    }
}

// ===========================================================================

function sendExcludedModelsForGroundSnowToPlayer(client) {
    if(getGameConfig().excludedGroundSnowModels[getServerGame()].length > 0) {
        for(let i in getGameConfig().excludedGroundSnowModels[getServerGame()]) {
            logToConsole(LOG_DEBUG, `[VRR.Misc] Sending excluded model ${i} for ground snow to ${getPlayerName(client)}`);
            triggerNetworkEvent("vrr.excludeGroundSnow", client, getGameConfig().excludedGroundSnowModels[getServerGame()][i]);
        }
    }
}

// ===========================================================================

function sendRemovedWorldObjectsToPlayer(client) {
    if(getGameConfig().removedWorldObjects[getServerGame()].length > 0) {
        for(let i in getGameConfig().removedWorldObjects[getServerGame()]) {
            logToConsole(LOG_DEBUG, `[VRR.Client] Sending removed world object ${i} (${getGameConfig().removedWorldObjects[getServerGame()][i][0]}) to ${getPlayerName(client)}`);
            triggerNetworkEvent("vrr.removeWorldObject", client, getGameConfig().removedWorldObjects[getServerGame()][i][0], getGameConfig().removedWorldObjects[getServerGame()][i][1], getGameConfig().removedWorldObjects[getServerGame()][i][2]);
        }
    }
	return true;
}

// ===========================================================================

function updatePlayerHotBar(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending updated hotbar data to ${getPlayerDisplayForConsole(client)}`);
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
    triggerNetworkEvent("vrr.hotbar", client, getPlayerData(client).activeHotBarSlot, tempHotBarItems);
}

// ===========================================================================

function setPlayerWeaponDamageEnabled(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending weapon damage state for ${getPlayerDisplayForConsole(client)} to all players`);
    triggerNetworkEvent("vrr.weaponDamageEnabled", null, getPlayerName(client), state);
}

// ===========================================================================

function setPlayerWeaponDamageEvent(client, eventType) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending weapon damage event (${eventType}) for ${getPlayerDisplayForConsole(client)} to all players`);
    triggerNetworkEvent("vrr.weaponDamageEvent", null, getPlayerName(client), eventType);
    getPlayerData(client).weaponDamageEvent = eventType;
}

// ===========================================================================

function sendJobRouteStopToPlayer(client, position, colour) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending job route stop data to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.showJobRouteStop", client, position, colour);
}

// ===========================================================================

function showPlayerLoginSuccessGUI(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending login success GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.loginSuccess", client);
}

// ===========================================================================

function showPlayerLoginFailedGUI(client, errorMessage) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending login failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.loginFailed", client, errorMessage);
}

// ===========================================================================

function showPlayerRegistrationSuccessGUI(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending registration success GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.registrationSuccess", client);
}

// ===========================================================================

function showPlayerRegistrationFailedGUI(client, errorMessage) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending registration failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.registrationFailed", client, errorMessage);
}

// ===========================================================================

function sendPlayerGUIColours(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending GUI colours to ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("vrr.guiColour", client, getServerConfig().guiColourPrimary[0], getServerConfig().guiColourPrimary[1], getServerConfig().guiColourPrimary[2], getServerConfig().guiColourSecondary[0], getServerConfig().guiColourSecondary[1], getServerConfig().guiColourSecondary[2], getServerConfig().guiTextColourPrimary[0], getServerConfig().guiTextColourPrimary[1], getServerConfig().guiTextColourPrimary[2]);
}

// ===========================================================================

function sendPlayerGUIInit(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending GUI init signal to ${getPlayerDisplayForConsole(client)}`);
	triggerNetworkEvent("vrr.guiInit", client);
}

// ===========================================================================

function showPlayerLoginGUI(client, errorMessage = "") {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending show login GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.showLogin", client);
}

// ===========================================================================

function showPlayerRegistrationGUI(client, errorMessage = "") {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending show registration GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.showRegistration", client);
}

// ===========================================================================

function showPlayerNewCharacterGUI(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending show new character GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.showNewCharacter", client);
}

// ===========================================================================

function showPlayerCharacterSelectGUI(client, firstName, lastName, cash, clan, lastPlayed, skin) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending character select GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.showCharacterSelect", client, firstName, lastName, cash, clan, lastPlayed, skin);
}

// ===========================================================================

function updatePlayerCharacterSelectGUI(client, firstName, lastName, cash, clan, lastPlayed, skin) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending update character select GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.switchCharacterSelect", client, firstName, lastName, cash, clan, lastPlayed, skin);
}

// ===========================================================================

function showPlayerCharacterSelectSuccessGUI(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending character select success GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.characterSelectSuccess", client);
}

// ===========================================================================

function showPlayerCharacterSelectFailedGUI(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending character select failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.characterSelectFailed", client);
}

// ===========================================================================

function showPlayerPromptGUI(client, promptMessage, promptTitle) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending show prompt GUI signal to ${getPlayerDisplayForConsole(client)} (Title: ${promptTitle}, Message: ${promptMessage})`);
    triggerNetworkEvent("vrr.showPrompt", client, promptMessage, promptTitle);
}

// ===========================================================================

function showPlayerInfoGUI(client, infoMessage, infoTitle) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending show info GUI signal to ${getPlayerDisplayForConsole(client)} (Title: ${infoTitle}, Message: ${infoMessage})`);
    triggerNetworkEvent("vrr.showInfo", client, infoMessage, infoTitle);
}

// ===========================================================================

function showPlayerErrorGUI(client, errorMessage, errorTitle) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending show error GUI signal to ${getPlayerDisplayForConsole(client)} (Title: ${errorTitle}, Message: ${errorMessage})`);
    triggerNetworkEvent("vrr.showInfo", client, errorMessage, errorTitle);
}

// ===========================================================================

function sendRunCodeToClient(client, code, returnTo) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending runcode to ${getPlayerDisplayForConsole(client)} (returnTo: ${getPlayerDisplayForConsole(getClientFromIndex(returnTo))}, Code: ${code})`);
    triggerNetworkEvent("vrr.runCode", client, code, returnTo);
}

// ===========================================================================

function sendPlayerWorkingState(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending working state (${toUpperCase(getYesNoFromBool(state))}) to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.working", client, state);
}

// ===========================================================================

function sendPlayerJobType(client, jobType) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending job type (${jobType}) to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.jobType", client, jobType);
}

// ===========================================================================

function sendPlayerStopJobRoute(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to abort job route to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.stopJobRoute", client);
}

// ===========================================================================

function sendPlayerMouseCameraToggle(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to toggle mouse camera ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.mouseCamera", client);
}

// ===========================================================================

function setPlayerMouseCameraState(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to toggle mouse camera ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.mouseCameraForce", client, state);
}

// ===========================================================================

function sendPlayerMouseCursorToggle(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to toggle mouse cursor ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.mouseCursor", client);
}

// ===========================================================================

function sendAddAccountKeyBindToClient(client, key, keyState) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending added keybind to ${getPlayerDisplayForConsole(client)} (Key: ${toUpperCase(getKeyNameFromId(key))}, State: ${(keyState) ? "down" : "up"})`);
    triggerNetworkEvent("vrr.addKeyBind", client, toInteger(key), (keyState) ? KEYSTATE_DOWN : KEYSTATE_UP);
}

// ===========================================================================

function sendClearKeyBindsToClient(client, key, keyState) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending added keybind to ${getPlayerDisplayForConsole(client)} (Key: ${toUpperCase(getKeyNameFromId(key))}, State: ${(keyState) ? "down" : "up"})`);
    triggerNetworkEvent("vrr.clearKeyBinds", client);
}

// ===========================================================================

function sendRemoveAccountKeyBindToClient(client, key) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending deleted keybind to ${getPlayerDisplayForConsole(client)} (Key: ${toUpperCase(getKeyNameFromId(key))})`);
    triggerNetworkEvent("vrr.delKeyBind", client, toInteger(key));
}

// ===========================================================================

function sendPlayerSetPosition(client, position) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending set position signal to ${getPlayerDisplayForConsole(client)} (Position: ${position.x}, ${position.y}, ${position.z})`);
    triggerNetworkEvent("vrr.position", client, position);
}

// ===========================================================================

function sendPlayerSetHeading(client, heading) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending set heading signal to ${getPlayerDisplayForConsole(client)} (Heading: ${heading})`);
    triggerNetworkEvent("vrr.heading", client, heading);
}

// ===========================================================================

function sendPlayerSetInterior(client, interior) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending set interior signal to ${getPlayerDisplayForConsole(client)} (Interior: ${interior})`);
    triggerNetworkEvent("vrr.interior", client, interior);
}

// ===========================================================================

function sendPlayerFrozenState(client, state) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending set frozen signal to ${getPlayerDisplayForConsole(client)} (State: ${toUpperCase(getYesNoFromBool(state))})`);
    triggerNetworkEvent("vrr.frozen", client, state);
}

// ===========================================================================

function givePlayerWeapon(client, weaponId, ammo, active) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to ${getPlayerDisplayForConsole(client)} to give weapon (Weapon: ${weaponId}, Ammo: ${ammo})`);
    triggerNetworkEvent("vrr.giveWeapon", client, weaponId, ammo, active);
}

// ===========================================================================

function clearPlayerWeapons(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending signal to ${getPlayerDisplayForConsole(client)} to clear weapons`);
    triggerNetworkEvent("vrr.clearWeapons", client);
}

// ===========================================================================

function showPlayerNewCharacterFailedGUI(client, errorMessage) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending new character failed GUI signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.newCharacterFailed", client, errorMessage);
}

// ===========================================================================

function sendPlayerRemoveFromVehicle(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Sending remove from vehicle signal to ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.removeFromVehicle", client);
}

// ===========================================================================

function sendChatBoxMessageToPlayer(client, message, colour) {
    triggerNetworkEvent("vrr.m", client, message, colour)
    //messageClient(message, client, colour);
}

// ===========================================================================

function showPlayerItemTakeDelay(client, itemId) {
    if(getItemData(itemId)) {
        let delay = getItemTypeData(getItemData(itemId).itemTypeIndex).pickupDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item TAKE delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("vrr.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item TAKE delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerItemActionDelayComplete(client);
        }
    }
}

// ===========================================================================

function showPlayerItemUseDelay(client, itemSlot) {
    if(getItemData(getPlayerData(client).hotBarItems[itemSlot])) {
        let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).useDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item USE delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("vrr.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item USE delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerItemActionDelayComplete(client);
        }
    }
}

// ===========================================================================

function showPlayerItemDropDelay(client, itemSlot) {
    if(getItemData(getPlayerData(client).hotBarItems[itemSlot])) {
        let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).dropDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item DROP delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("vrr.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item DROP delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerItemActionDelayComplete(client);
        }
    }
}

// ===========================================================================

function showPlayerItemPickupDelay(client, itemId) {
    if(getItemData(itemId)) {
        let delay = getItemTypeData(getItemData(itemId).itemTypeIndex).pickupDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item PICKUP delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("vrr.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item PICKUP delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerItemActionDelayComplete(client);
        }
    }
}

// ===========================================================================

function showPlayerItemPutDelay(client, itemSlot) {
    if(getItemData(getPlayerData(client).hotBarItems[itemSlot])) {
        let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).putDelay;
        if(delay > 0) {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item PUT delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
            triggerNetworkEvent("vrr.showItemActionDelay", client, delay);
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item PUT delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerItemActionDelayComplete(client);
        }
    }
}

// ===========================================================================

function showPlayerItemSwitchDelay(client, itemSlot) {
    if(itemSlot != -1) {
        if(getPlayerData(client).hotBarItems[itemSlot] != -1) {
            let delay = getItemTypeData(getItemData(getPlayerData(client).hotBarItems[itemSlot]).itemTypeIndex).switchDelay;
            if(delay > 0) {
                logToConsole(LOG_DEBUG, `[VRR.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (${delay} milliseconds)`);
                triggerNetworkEvent("vrr.showItemActionDelay", client, delay);
            } else{
                logToConsole(LOG_DEBUG, `[VRR.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (instant)`);
                playerItemActionDelayComplete(client);
            }
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (instant)`);
            playerItemActionDelayComplete(client);
        }
    } else {
        logToConsole(LOG_DEBUG, `[VRR.Client] Showing item switch delay to ${getPlayerDisplayForConsole(client)} (instant)`);
        playerSwitchItem(client, itemSlot);
    }
}

// ===========================================================================

function sendPlayerDrunkEffect(client, amount, duration) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Setting drunk effect for ${getPlayerDisplayForConsole(client)} to ${amount} for ${duration} milliseconds`);
    triggerNetworkEvent("vrr.drunkEffect", client, amount, duration);
}

// ===========================================================================

function sendPlayerClearPedState(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Clearing ped state for ${getPlayerDisplayForConsole(client)}`);
    triggerNetworkEvent("vrr.clearPedState", client);
}

// ===========================================================================

function playerDamagedByPlayer(client, damagerEntityName, weaponId, pedPiece, healthLoss) {
    let damagerEntity = getPlayerFromParams(damagerEntityName);

    if(isNull(damagerEntity)) {
        logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)}'s damager entity from ID is null`);
        return false;
    }

    logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)} was damaged by ${damagerEntity}`);

    if(isNull(damagerEntity)) {
        logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)}'s damager client is INVALID`);
        return false;
    }

    if(!getPlayerData(damagerEntity) || !getPlayerData(client)) {
        logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)}'s damager's client data is INVALID`);
        return false;
    }

    logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)}'s damager is ${getPlayerDisplayForConsole(damagerEntity)}`);

    switch(getPlayerData(damagerEntity).weaponDamageEvent) {
        case VRR_WEAPON_DAMAGE_EVENT_TAZER:
            logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)}'s damager ${getPlayerDisplayForConsole(damagerEntity)} is using a tazer`);
            if(!isPlayerTazed(client) && !isPlayerHandCuffed(client) && !isPlayerInAnyVehicle(client)) {
                logToConsole(LOG_DEBUG, `[VRR.Client] ${getPlayerDisplayForConsole(client)} was not previously tazed, binded, or in a vehicle. Taze successful`);
                meActionToNearbyPlayers(damagerEntity, `electrifies ${getCharacterFullName(client)} with their tazer`);
                tazePlayer(client);
            }
            break;

        default:
            break;
    }
}

// ===========================================================================

function setPlayerCameraLookAt(client, cameraPosition, lookAtPosition) {
	triggerNetworkEvent("vrr.cameraLookAt", client, cameraPosition, lookAtPosition);
}

// ===========================================================================

function sendTimeMinuteDurationToPlayer(client, minuteDuration) {
	triggerNetworkEvent("vrr.minuteDuration", client, minuteDuration);
}

// ===========================================================================

function updatePositionInPlayerData(client, position) {
    getPlayerData(client).syncPosition = position;
}

// ===========================================================================

function updateHeadingInPlayerData(client, heading) {
    getPlayerData(client).syncHeading = heading;
}

// ===========================================================================

function forcePlayerIntoSkinSelect(client) {
    if(getGameConfig().skinChangePosition[getServerGame()].length > 0) {
        getPlayerData(client).returnToPosition = getPlayerPosition(client);
        getPlayerData(client).returnToHeading = getPlayerHeading(client);
        getPlayerData(client).returnToInterior = getPlayerInterior(client);
        getPlayerData(client).returnToDimension = getPlayerDimension(client);
        getPlayerData(client).returnToType = VRR_RETURNTO_TYPE_SKINSELECT;

        setPlayerPosition(client, getGameConfig().skinChangePosition[getServerGame()][0]);
        setPlayerHeading(client, getGameConfig().skinChangePosition[getServerGame()][1]);
        setPlayerInterior(client, getGameConfig().skinChangePosition[getServerGame()][2]);
        setPlayerDimension(client, client.index+500);
    }

    triggerNetworkEvent("vrr.skinSelect", client, true);
}

// ===========================================================================

function updatePlayerCash(client) {
	triggerNetworkEvent("vrr.money", client, getPlayerCurrentSubAccount(client).cash);
}

// ===========================================================================

function sendAllPoliceStationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].policeStation != -1) {
		let tempBlips = [];
		for(let i in getServerData().policeStations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].policeStation,
				getServerData().policeStations[getServerGame()][i].position.x,
				getServerData().policeStations[getServerGame()][i].position.y,
				getServerData().policeStations[getServerGame()][i].position.z,
				3,
				getColourByName("policeBlue"),
			]);
		}
		triggerNetworkEvent("vrr.blips", client, tempBlips);
	}
}

// ===========================================================================

function sendAllFireStationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].fireStation != -1) {
		let tempBlips = [];
		for(let i in getServerData().fireStations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].fireStation,
				getServerData().fireStations[getServerGame()][i].position.x,
				getServerData().fireStations[getServerGame()][i].position.y,
				getServerData().fireStations[getServerGame()][i].position.z,
				3,
				getColourByName("firefighterRed"),
			]);
		}
		triggerNetworkEvent("vrr.blips", client, tempBlips);
	}
}

// ===========================================================================

function sendAllHospitalBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].hospital != -1) {
		let tempBlips = [];
		for(let i in getServerData().hospitals[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].hospital,
				getServerData().hospitals[getServerGame()][i].position.x,
				getServerData().hospitals[getServerGame()][i].position.y,
				getServerData().hospitals[getServerGame()][i].position.z,
				3,
				getColourByName("medicPink"),
			]);
		}
		triggerNetworkEvent("vrr.blips", client, tempBlips);
	}
}

// ===========================================================================

function sendAllAmmunationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].ammunation != -1) {
		let tempBlips = [];
		for(let i in getServerData().ammunations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].ammunation,
				getServerData().ammunations[getServerGame()][i].position.x,
				getServerData().ammunations[getServerGame()][i].position.y,
				getServerData().ammunations[getServerGame()][i].position.z,
				3,
				0
			]);
		}
		triggerNetworkEvent("vrr.blips", client, tempBlips);
	}
}

// ===========================================================================

function sendAllPayAndSprayBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].payAndSpray != -1) {
		let tempBlips = [];
		for(let i in getServerData().payAndSprays[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].payAndSpray,
				getServerData().payAndSprays[getServerGame()][i].position.x,
				getServerData().payAndSprays[getServerGame()][i].position.y,
				getServerData().payAndSprays[getServerGame()][i].position.z,
				3,
				0
			]);
		}
		triggerNetworkEvent("vrr.blips", client, tempBlips);
	}
}

// ===========================================================================

function sendAllFuelStationBlips(client) {
	if(getGameConfig().blipSprites[getServerGame()].fuelStation != -1) {
		let tempBlips = [];
		for(let i in getServerData().fuelStations[getServerGame()]) {
			tempBlips.push([
				getGameConfig().blipSprites[getServerGame()].fuelStation,
				getServerData().fuelStations[getServerGame()][i].position.x,
				getServerData().fuelStations[getServerGame()][i].position.y,
				getServerData().fuelStations[getServerGame()][i].position.z,
				3,
				getColourByName("burntOrange"),
			]);
		}
		triggerNetworkEvent("vrr.blips", client, tempBlips);
	}
}

// ===========================================================================

function sendPlayerSetHealth(client, health) {
    triggerNetworkEvent("vrr.health", client, health);
}


// ===========================================================================

function sendPlayerSetArmour(client, armour) {
    triggerNetworkEvent("vrr.armour", client, armour);
}

// ===========================================================================

function playerFinishedSkinSelection(client, allowedSkinIndex) {
    triggerNetworkEvent("vrr.skinSelect", client, false);
    if(allowedSkinIndex == -1) {
        messagePlayerAlert(client, "You canceled the skin change.");
        restorePlayerCamera(client);

        if(getPlayerData(client).returnToPosition != null && getPlayerData(client).returnToType == VRR_RETURNTO_TYPE_SKINSELECT) {
            setPlayerPosition(client, getPlayerData(client).returnToPosition);
            setPlayerHeading(client, getPlayerData(client).returnToHeading);
            setPlayerInterior(client, getPlayerData(client).returnToInterior);
            setPlayerDimension(client, getPlayerData(client).returnToDimension);

            getPlayerData(client).returnToPosition = null;
            getPlayerData(client).returnToHeading = null;
            getPlayerData(client).returnToInterior = null;
            getPlayerData(client).returnToDimension = null;
        }
        return false;
    } else {
        getPlayerCurrentSubAccount(client).skin = getSkinIndexFromModel(allowedSkins[allowedSkinIndex][0]);
        if(isPlayerWorking(client)) {
            messagePlayerAlert(client, "Your new skin has been saved but won't be shown until you stop working.");
            setPlayerSkin(client, getJobData(getPlayerCurrentSubAccount(client).job).uniforms[getPlayerData(client).jobUniform].skinId);
        } else {
            setPlayerSkin(client, getPlayerCurrentSubAccount(client).skin);
        }

        if(getPlayerData(client).returnToPosition != null && getPlayerData(client).returnToType == VRR_RETURNTO_TYPE_SKINSELECT) {
            setPlayerPosition(client, getPlayerData(client).returnToPosition);
            setPlayerHeading(client, getPlayerData(client).returnToHeading);
            setPlayerInterior(client, getPlayerData(client).returnToInterior);
            setPlayerDimension(client, getPlayerData(client).returnToDimension);

            getPlayerData(client).returnToPosition = null;
            getPlayerData(client).returnToHeading = null;
            getPlayerData(client).returnToInterior = null;
            getPlayerData(client).returnToDimension = null;
        }

        restorePlayerCamera(client);

        deleteItem(getPlayerData(client).itemActionItem);
        switchPlayerActiveHotBarSlot(client, -1);
        cachePlayerHotBarItems(client);

        meActionToNearbyPlayers(client, `changes their skin to ${allowedSkins[allowedSkinIndex][1]}`);
    }
}

// ===========================================================================

function sendPlayerChatScrollLines(client, amount) {
    triggerNetworkEvent("vrr.chatScrollLines", client, amount);
}

// ===========================================================================

function playRadioStreamForPlayer(client, streamURL, loop = true, volume = 0, element = false) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Forcing ${getPlayerDisplayForConsole(client)} to stream ${streamURL}`);
    triggerNetworkEvent("vrr.radioStream", client, streamURL, loop, volume, element);
}

// ===========================================================================

function playAudioFileForPlayer(client, audioName, loop = true, volume = 0, element = false) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Forcing ${getPlayerDisplayForConsole(client)} to play audio ${audioName}`);
    triggerNetworkEvent("vrr.audioFileStream", client, audioName, loop, volume);
}

// ===========================================================================

function stopRadioStreamForPlayer(client) {
    logToConsole(LOG_DEBUG, `[VRR.Client] Forcing ${getPlayerDisplayForConsole(client)} to stop their radio stream`);
    triggerNetworkEvent("vrr.stopRadioStream", client);
}

// ===========================================================================

function setPlayerStreamingRadioVolume(client, volumeLevel, elementId = false) {
    getPlayerData(client).accountData.streamingRadioVolume = volumeLevel;
    getPlayerData(client).streamingRadioElement = elementId;
    triggerNetworkEvent("vrr.radioVolume", client, volumeLevel, elementId);
}

// ===========================================================================

function setVehicleLightsState(vehicle, state) {
	setEntityData(vehicle, "vrr.lights", getVehicleData(vehicle).lights);
    triggerNetworkEvent("vrr.veh.lights", null, vehicle.id, state);
}

// ===========================================================================

function sendPlayerEnterPropertyKey(client, key) {
    triggerNetworkEvent("vrr.enterPropertyKey", client, key);
}

// ===========================================================================

function makePedPlayAnimation(ped, animationSlot, positionOffset) {
    let animationData = getAnimationData(animationSlot);
    let freezePlayer = false;
    //if(animationData[9] != VRR_ANIMMOVE_NONE) {
        switch(animationData[9]) {
            case VRR_ANIMMOVE_FORWARD:
                setElementCollisionsEnabled(ped, false);
                setElementPosition(ped, getPosInFrontOfPos(getElementPosition(ped), fixAngle(getElementHeading(ped)), positionOffset));
                freezePlayer = true;
                break;

            case VRR_ANIMMOVE_BACK:
                setElementCollisionsEnabled(ped, false);
                setElementPosition(ped, getPosBehindPos(getElementPosition(ped), fixAngle(getElementHeading(ped)), positionOffset));
                freezePlayer = true;
                break;

            case VRR_ANIMMOVE_LEFT:
                setElementCollisionsEnabled(ped, false);
                setElementPosition(ped, getPosToLeftOfPos(getElementPosition(ped), fixAngle(getElementHeading(ped)), positionOffset));
                freezePlayer = true;
                break;

            case VRR_ANIMMOVE_RIGHT:
                setElementCollisionsEnabled(ped, false);
                setElementPosition(ped, getPosToRightOfPos(getElementPosition(ped), fixAngle(getElementHeading(ped)), positionOffset));
                freezePlayer = true;
                break;
        }
    //}
    triggerNetworkEvent("vrr.pedAnim", null, ped.id, animationData[1], animationData[2], animationData[3], animationData[4], animationData[5], positionOffset, freezePlayer);
}

// ===========================================================================

function makePedStopAnimation(ped) {
    triggerNetworkEvent("vrr.pedStopAnim", null, ped.id);
}

// ===========================================================================

function forcePedAnimation(ped, animationSlot) {
    let animationData = getAnimationData(animationSlot);

    triggerNetworkEvent("vrr.forcePedAnim", null, ped.id, animationData[1], animationData[2], animationData[3], animationData[4]);
}

// ===========================================================================

function hideAllPlayerGUI(client) {
    triggerNetworkEvent("vrr.hideAllGUI", client);
}

// ===========================================================================

function setPlayerHeadLookPosition(client, position) {
    if(client.player != null) {
        setEntityData(client.player, "vrr.headLook", position, true);
    }
}

// ===========================================================================

function sendPlayerGameScriptState(client, scriptName, state) {
    triggerNetworkEvent("vrr.gameScript", client, scriptName, state);
}

// ===========================================================================

function requestClientInfo(client) {
    triggerNetworkEvent("vrr.clientInfo", client);
}

// ===========================================================================

function updateInteriorLightsForPlayer(client, state) {
    triggerNetworkEvent("vrr.interiorLights", client, state);
}

// ===========================================================================

function forcePlayerToSyncElementProperties(client, element) {
    triggerNetworkEvent("vrr.syncElement", client, element.id);
}

// ===========================================================================

function sendPlayerPedPartsAndProps(client) {
    triggerNetworkEvent("vrr.ped")
}

// ===========================================================================

function setPlayerVanillaRadioStation(client, radioStationId) {
    triggerNetworkEvent("vrr.vanillaRadio", client, radioStationId);
    return true;
}

// ===========================================================================

function onPlayerNearPickup(client, pickupId) {
    getPlayerData(client).currentPickup = getElementFromId(pickupId);
}

// ===========================================================================

function updateAllInteriorVehiclesForPlayer(client, interior, dimension) {
    for(let i in getServerData().vehicles) {
        if(getServerData().vehicles[i].vehicle != false) {
            if(getServerData().vehicles[i].interior == interior && getServerData().vehicles[i].dimension == dimension) {
                forcePlayerToSyncElementProperties(client, getServerData().vehicles[i].vehicle);
            }
        }
    }
}

// ===========================================================================