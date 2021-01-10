// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: client.js
// DESC: Provides client communication and cross-endpoint operations
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

addNetworkHandler("ag.promptAnswerNo", function(client) {
    if(!getEntityData(client, "ag.prompt")) {
        return false;
    }

    switch(getEntityData(client, "ag.prompt")) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            triggerNetworkEvent("ag.showError", client, "You don't have a character to play. Goodbye!", "No Characters");
            setTimeout(function() { client.disconnect(); }, 5000);
            break;

        default:
            break;
    }

    client.removeData("ag.prompt");
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.promptAnswerYes", function(client) {
    if(!getEntityData(client, "ag.prompt")) {
        return false;
    }

    switch(getEntityData(client, "ag.prompt")) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            triggerNetworkEvent("ag.showNewCharacter", client);
            break;

        default:
            break;
    }

    client.removeData("ag.prompt");
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.onPlayerEnterSphere", function(client, sphere) {
    //let ownerType = getEntityData(sphere, "ag.ownerType");
    //let ownerId = getEntityData(sphere, "ag.ownerId");
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.afk", function(client, afkState) {
    if(afkState) {
        setEntityData(client, "ag.afk", true, true);
    } else {
        client.removeData("ag.afk");
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.player.death", function(client, position) {
    processPlayerDeath(client, position);
});

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

addNetworkHandler("ag.arrivedAtBusStop", function(client) {
    logToConsole(LOG_DEBUG, client);
    arrivedAtBusStop(client);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clientReady", function(client) {
	setEntityData(client, "ag.isReady", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are downloaded and ready!`);
	if(client.getData("ag.isStarted") == true) {
		initClient(client);
	}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.guiReady", function(client) {
	setEntityData(client, "ag.guiReady", true, false);
    logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client GUI is initialized and ready!`);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clientStarted", function(client) {
	setEntityData(client, "ag.isStarted", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are started and running!`);
	if(client.getData("ag.isReady") == true) {
		initClient(client);
	}
});

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
    triggerNetworkEvent("ag.jobType", client, getPlayerCurrentSubAccount(client).job);
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

function setPlayer2DRendering(client, hudState = false, labelState = false, smallGameMessageState = false, scoreboardState = false, hotBarState = false) {
	triggerNetworkEvent("ag.set2DRendering", client, hudState, labelState, smallGameMessageState, scoreboardState, hotBarState);
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
    if(getGameConfig().excludedGroundSnowModels[getServerGame()]) {
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