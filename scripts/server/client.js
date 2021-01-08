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
	client.setData("ag.isReady", true, false);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client resources are downloaded and ready!`);
	if(client.getData("ag.isStarted") == true) {
		initClient(client);
	}
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.guiReady", function(client) {
	client.setData("ag.guiReady", true, false);
    logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s client GUI is initialized and ready!`);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.clientStarted", function(client) {
	client.setData("ag.isStarted", true, false);
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

// ---------------------------------------------------------------------------