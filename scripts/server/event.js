// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: event.js
// DESC: Provides handlers for built in GTAC and Asshat-Gaming created events
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function initEventScript() {
    logToConsole(LOG_DEBUG, "[Asshat.Event]: Initializing event script ...");
    addAllEventHandlers();
    logToConsole(LOG_DEBUG, "[Asshat.Event]: Event script initialized!");
}

// ---------------------------------------------------------------------------

function addAllEventHandlers() {
    addEventHandler("onResourceStart", onResourceStart);
    addEventHandler("onResourceStop", onResourceStop);

    addEventHandler("onProcess", onProcess);

    addEventHandler("onPlayerConnect", onPlayerConnect);
    addEventHandler("onPlayerJoin", onPlayerJoin);
    addEventHandler("onPlayerJoined", onPlayerJoined);
    addEventHandler("onPlayerChat", onPlayerChat);
    addEventHandler("onPlayerQuit", onPlayerQuit);

    addEventHandler("onPedSpawn", onPedSpawn);
    addEventHandler("onPedEnterVehicle", onPedEnteringVehicle);
    addEventHandler("onPedExitVehicle", onPedExitingVehicle);
}

// ---------------------------------------------------------------------------

function onPlayerConnect(event, ipAddress, port) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] Client connecting (IP: ${ipAddress})`);
    if(isIpAddressBanned(ipAddress)) {
        messagePlayerError(client, "You are banned from this server!");
        return false;
    }
}

// ---------------------------------------------------------------------------

function onPlayerJoin(event, client) {
    fadeCamera(client, true, 1.0);
}

// ---------------------------------------------------------------------------

function onPlayerJoined(event, client) {

}

// ---------------------------------------------------------------------------

function onPlayerQuit(event, client, quitReasonId) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)} disconnected (${disconnectReasons[quitReasonId]}[${quitReasonId}])`);

    //savePlayerToDatabase(client);
    resetClientStuff(client);

    getServerData().clients[client.index] = null;
    messagePlayerNormal(null, `👋 ${client.name} has left the server (${disconnectReasons[quitReasonId]})`, getColourByName("softYellow"));
}

// ---------------------------------------------------------------------------

function onPlayerChat(event, client, messageText) {
    event.preventDefault();
    if(!getPlayerData(client).loggedIn) {
        messagePlayerError(client, "You need to login before you can chat!");
        return false;
    }

    messageText = messageText.substring(0, 128);

    messagePlayerNormal(null, `${getCharacterFullName(client)}: [#FFFFFF]${messageText}`, getPlayerColour(client));
}

// ---------------------------------------------------------------------------

function onProcess(event, deltaTime) {
    checkVehicleBuying();
}

// ---------------------------------------------------------------------------

function onPedEnteringVehicle(event, ped, vehicle, seat) {
    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        getPlayerData(client).pedState = AG_PEDSTATE_ENTERINGVEHICLE;

        if(!getVehicleData(vehicle)) {
            return false;
        }

        if(seat == 0) {
            vehicle.engine = getVehicleData(vehicle).engine;
        }

        if(getVehicleData(vehicle).locked) {
            if(doesClientHaveVehicleKeys(client, vehicle)) {
                messagePlayerNormal(client, `🔒 This ${getVehicleName(vehicle)} is locked. Use /lock to unlock it`);
                if(doesPlayerHaveKeyBindForCommand(client, "lock")) {
                    messagePlayerTip(client, `You can also press [#AAAAAA]${sdl.getKeyName(getPlayerKeyBindForCommand(client, "lock").key)} [#FFFFFF]to lock and unlock vehicles.`);
                }
            } else {
                messagePlayerNormal(client, `🔒 This ${getVehicleName(vehicle)} is locked and you don't have the keys to unlock it`);
            }
        }
    }
}

// ---------------------------------------------------------------------------

function onPedExitingVehicle(event, ped, vehicle) {
    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        getPlayerData(client).pedState = AG_PEDSTATE_EXITINGVEHICLE;
    }
}

// ---------------------------------------------------------------------------

function onResourceStart(event, resource) {
    logToConsole(LOG_WARN, `[Asshat.Event] ${resource.name} started!`);

    if(resource != thisResource) {
        messageAdmins(`[#FFFFFF]Resource [#AAAAAA]${resource.name} [#FFFFFF]started!`);
    }
}

// ---------------------------------------------------------------------------

function onResourceStop(event, resource) {
    logToConsole(LOG_WARN, `[Asshat.Event] ${resource.name} stopped!`);

    if(resource != thisResource) {
        messageAdmins(`[#FFFFFF]Resource [#AAAAAA]${resource.name} [#FFFFFF]stopped!`);
    }

    if(resource == thisResource) {
        //saveAllServerDataToDatabase();
    }
}

// ---------------------------------------------------------------------------

function onPlayerEnteredSphere(client, sphere) {

}

// ---------------------------------------------------------------------------

function onPlayerExitedSphere(client, sphere) {

}

// ---------------------------------------------------------------------------

async function onPlayerEnteredVehicle(client) {
    if(client.player == null) {
        return false;
    }

    await waitUntil(() => client.player.vehicle != null);
    let vehicle = client.player.vehicle;

    if(vehicle.owner != -1) {
        return false;
    }

    if(!getVehicleData(vehicle)) {
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)} entered a ${getVehicleName(vehicle)} (ID: ${vehicle.getData("ag.dataSlot")}, Database ID: ${getVehicleData(vehicle).databaseId})`);

    getPlayerData(client).lastVehicle = vehicle;

    if(getPlayerVehicleSeat(client) == AG_VEHSEAT_DRIVER) {
        vehicle.engine = getVehicleData(vehicle).engine;

        if(getVehicleData(vehicle).buyPrice > 0) {
            messagePlayerAlert(client, `This ${getVehicleName(vehicle)} is for sale! Cost: [#AAAAAA]$${getVehicleData(vehicle).buyPrice}`);
            messagePlayerTip(client, `Use /vehbuy if you want to buy it.`);
        } else if(getVehicleData(vehicle).rentPrice > 0) {
            messagePlayerAlert(client, `This ${getVehicleName(vehicle)} is for rent! Cost: [#AAAAAA]$${getVehicleData(vehicle).rentPrice} per minute`);
            messagePlayerTip(client, `Use /vehrent if you want to rent it.`);
        } else {
            if(!getVehicleData(vehicle).engine) {
                if(doesClientHaveVehicleKeys(client, vehicle)) {
                    messagePlayerAlert(client, `This ${getVehicleName(vehicle)}'s engine is off. Use /engine to start it`);
                    if(doesPlayerHaveKeyBindForCommand(client, "engine")) {
                        messagePlayerTip(client, `You can also press [#AAAAAA]${sdl.getKeyName(getPlayerKeyBindForCommand(client, "engine").key)} [#FFFFFF]to start and stop the engine.`);
                    }
                } else {
                    messagePlayerAlert(client, `This ${getVehicleName(vehicle)}'s engine is off and you don't have the keys to start it`);
                }
                //setPlayerControlState(client, false);
            }
        }

        let currentSubAccount = getPlayerCurrentSubAccount(client);

        if(isPlayerWorking(client)) {
            if(getVehicleData(vehicle).ownerType == AG_VEHOWNER_JOB) {
                if(getVehicleData(vehicle).ownerId == getPlayerCurrentSubAccount(client).job) {
                    getPlayerCurrentSubAccount(client).lastJobVehicle = vehicle;
                }
            }
        }

        if(isPlayerWorking(client)) {
            if(isPlayerOnJobRoute(client)) {
                if(vehicle == getPlayerJobRouteVehicle(client)) {
                    stopReturnToJobVehicleCountdown(client);
                }
            }
        }
    }
}

// ---------------------------------------------------------------------------

function onPlayerExitedVehicle(client) {
    getPlayerData(client).pedState = AG_PEDSTATE_READY;

    let vehicle = getPlayerData(client).lastVehicle;

    if(!getVehicleData(vehicle)) {
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)} exited a ${getVehicleName(vehicle)} (ID: ${vehicle.getData("ag.dataSlot")}, Database ID: ${getVehicleData(vehicle).databaseId})`);

    if(isPlayerWorking(client)) {
        if(isPlayerOnJobRoute(client)) {
            if(vehicle == getPlayerJobRouteVehicle(client)) {
                startReturnToJobVehicleCountdown(client);
            }
        }
    }
}

// ---------------------------------------------------------------------------

function onPlayerDeath(client, position) {
    getPlayerData(client).pedState = AG_PEDSTATE_DEAD;
	updatePlayerSpawnedState(client, false);
    setPlayerControlState(client, false);
	setTimeout(function() {
		fadePlayerCamera(client, false, 1.0);
		setTimeout(function() {
			client.despawnPlayer();
			if(getPlayerCurrentSubAccount(client).inJail) {
                let closestJail = getClosestJail(position);
                getPlayerCurrentSubAccount(client).interior = closestJail.interior;
                getPlayerCurrentSubAccount(client).dimension = closestJail.dimension;
				spawnPlayer(client, closestJail.position, closestJail.heading, getPlayerCurrentSubAccount(client).skin);
			} else {
                let closestHospital = getClosestHospital(position);
                getPlayerCurrentSubAccount(client).interior = closestHospital.interior;
                getPlayerCurrentSubAccount(client).dimension = closestHospital.dimension;
				spawnPlayer(client, closestHospital.position, closestHospital.heading, getPlayerCurrentSubAccount(client).skin);
			}
		}, 2000);
	}, 1000);
}

// ---------------------------------------------------------------------------

function onPedSpawn(ped) {
    if(ped.type == ELEMENT_PLAYER) {
        setTimeout(onPlayerSpawn, 500, ped);
    }
}

// ---------------------------------------------------------------------------

function onPlayerSpawn(ped) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] Checking for ${getPlayerDisplayForConsole(client)}'s client element`);
    if(getClientFromPlayerElement(ped) == null) {
        logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s client element not set yet. Rechecking ...`);
        setTimeout(onPlayerSpawn, 500, ped);
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s client element is valid.`);

    let client = getClientFromPlayerElement(ped);

    logToConsole(LOG_DEBUG, `[Asshat.Event] Checking ${getPlayerDisplayForConsole(client)}'s player data`);
    if(!getPlayerData(client)) {
        logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s player data is invalid. Kicking them from server.`);
        client.disconnect();
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s player data is valid.`);
    logToConsole(LOG_DEBUG, `[Asshat.Event] Processing ${getPlayerDisplayForConsole(client)}'s spawn (Player Element ID: ${client.player.id})`);
    restorePlayerCamera(client);
    //logToConsole(LOG_DEBUG, `Checking switchchar for ${getPlayerDisplayForConsole(client)}`);
    //if(!isPlayerSwitchingCharacter(client)) {
    //    return false;
    //}

    logToConsole(LOG_DEBUG, `Storing ${getPlayerDisplayForConsole(client)} ped in client data `);
    getPlayerData(client).ped = ped;

    logToConsole(LOG_DEBUG, `Sending ${getPlayerDisplayForConsole(client)} the 'now playing as' message`);
    messagePlayerAlert(client, `You are now playing as: [#0099FF]${getCharacterFullName(client)}`, getColourByName("white"));
    messagePlayerNormal(client, "This server is in early development and may restart at any time for updates.", getColourByName("orange"));
    messagePlayerNormal(client, "Please report any bugs using /bug and suggestions using /idea", getColourByName("yellow"));
    updatePlayerSpawnedState(client, true);
    setPlayerInterior(client, getPlayerCurrentSubAccount(client).interior);
    setPlayerDimension(client, getPlayerCurrentSubAccount(client).dimension);
    updateAllPlayerNameTags();
    updatePlayerCash(client);
    sendPlayerJobType(client, getJobIndexFromDatabaseId(getPlayerCurrentSubAccount(client)));
    setPlayer2DRendering(client, true, true, true, true, true, true);
    updatePlayerSnowState(client);
    sendExcludedModelsForGroundSnowToPlayer(client);
    sendRemovedWorldObjectsToPlayer(client);

    //setEntityData(client.player, "ag.scale", getPlayerCurrentSubAccount(client).pedScale, true);

    //setTimeout(function() {
    //    syncPlayerProperties(client);
    //}, 1000);

    if(getServerConfig().showLogo && doesPlayerHaveLogoEnabled(client)) {
        updatePlayerShowLogoState(client, true);
    }

    cachePlayerHotBarItems(client);
    updatePlayerHotBar(client);

    getPlayerData(client).switchingCharacter = false;
    getPlayerData(client).pedState = AG_PEDSTATE_READY;
}

// ---------------------------------------------------------------------------
