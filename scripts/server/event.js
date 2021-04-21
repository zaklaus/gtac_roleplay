// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: event.js
// DESC: Provides handlers for built in GTAC and Asshat-Gaming created events
// TYPE: Server (JavaScript)
// ===========================================================================

function initEventScript() {
    logToConsole(LOG_INFO, "[Asshat.Event]: Initializing event script ...");
    addAllEventHandlers();
    logToConsole(LOG_INFO, "[Asshat.Event]: Event script initialized!");
}

// ===========================================================================

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

// ===========================================================================

function onPlayerConnect(event, ipAddress, port) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] Client connecting (IP: ${ipAddress})`);
    if(isIpAddressBanned(ipAddress)) {
        messagePlayerError(client, "You are banned from this server!");
        return false;
    }
}

// ===========================================================================

function onPlayerJoin(event, client) {
    fadeCamera(client, true, 1.0);
}

// ===========================================================================

function onPlayerJoined(event, client) {

}

// ===========================================================================

function onPlayerQuit(event, client, quitReasonId) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)} disconnected (${disconnectReasons[quitReasonId]}[${quitReasonId}])`);

    savePlayerToDatabase(client);
    resetClientStuff(client);

    getServerData().clients[client.index] = null;
    messagePlayerNormal(null, `👋 ${client.name} has left the server (${disconnectReasons[quitReasonId]})`, getColourByName("softYellow"));
}

// ===========================================================================

function onPlayerChat(event, client, messageText) {
    event.preventDefault();
    if(!isNull(getPlayerData(client))) {
        if(!getPlayerData(client).loggedIn) {
            messagePlayerError(client, "You need to login before you can chat!");
            return false;
        }

        if(isPlayerMuted(client)) {
            messagePlayerError(client, "You are muted and can't chat!");
            return false;
        }
    }

    messageText = messageText.substring(0, 128);

    messagePlayerNormal(null, `${getCharacterFullName(client)}: [#FFFFFF]${messageText}`, getPlayerColour(client));
}

// ===========================================================================

function onProcess(event, deltaTime) {
    checkVehicleBuying();
    //checkPlayerSpawning();
    //checkPlayerPedState();
    //checkVehicleBurning();
}

// ===========================================================================

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

// ===========================================================================

function onPedExitingVehicle(event, ped, vehicle) {
    if(!getVehicleData(vehicle)) {
        return false;
    }

    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        getPlayerData(client).pedState = AG_PEDSTATE_EXITINGVEHICLE;
    }
}

// ===========================================================================

function onResourceStart(event, resource) {
    logToConsole(LOG_WARN, `[Asshat.Event] ${resource.name} started!`);

    if(resource != thisResource) {
        messageAdmins(`[#FFFFFF]Resource [#AAAAAA]${resource.name} [#FFFFFF]started!`);
    }
}

// ===========================================================================

function onResourceStop(event, resource) {
    logToConsole(LOG_WARN, `[Asshat.Event] ${resource.name} stopped!`);

    if(resource != thisResource) {
        messageAdmins(`[#FFFFFF]Resource [#AAAAAA]${resource.name} [#FFFFFF]stopped!`);
    }

    if(resource == thisResource) {
        //saveAllServerDataToDatabase();
    }
}

// ===========================================================================

function onPlayerEnteredSphere(client, sphere) {

}

// ===========================================================================

function onPlayerExitedSphere(client, sphere) {

}

// ===========================================================================

async function onPlayerEnteredVehicle(client, clientVehicle, seat) {
    if(client == null) {
        return false;
    }

    if(client.player == null) {
        return false;
    }

    await waitUntil(() => client != null && client.player != null && client.player.vehicle != null);
    //setTimeout(function() {
        //if(client.player.vehicle == null) {
        //    onPlayerEnteredVehicle(client, clientVehicle, seat);
        //}

        let vehicle = client.player.vehicle;

        if(vehicle.syncer != client.index) {
            if(getPlayerVehicleSeat(client) == AG_VEHSEAT_DRIVER) {
                vehicle.setSyncer(client, true);
            }
        }

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

        if(getVehicleData(vehicle).streamingRadioStation != -1) {
            if(getPlayerData(client).streamingRadioStation != getVehicleData(vehicle).streamingRadioStation) {
                playRadioStreamForPlayer(client, radioStations[getVehicleData(vehicle).streamingRadioStation].url);
                setPlayerStreamingRadioVolume(client, getPlayerData(client).streamingRadioVolume);
            }
        }
    //}, client.ping+500);
}

// ===========================================================================

function onPlayerExitedVehicle(client, vehicle) {
    getPlayerData(client).pedState = AG_PEDSTATE_READY;

    //let vehicle = getPlayerData(client).lastVehicle;

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

    playRadioStreamForPlayer(client, "");
}

// ===========================================================================

function onPlayerDeath(client, position) {
    logToConsole(LOG_INFO, `${getPlayerDisplayForConsole(client)} died.`);
    getPlayerData(client).pedState = AG_PEDSTATE_DEAD;
	updatePlayerSpawnedState(client, false);
    setPlayerControlState(client, false);
	setTimeout(function() {
		fadeCamera(client, false, 1.0);
		setTimeout(function() {
			client.despawnPlayer();
			if(getPlayerCurrentSubAccount(client).inJail) {
                let closestJail = getClosestJail(position);
                getPlayerCurrentSubAccount(client).interior = closestJail.interior;
                getPlayerCurrentSubAccount(client).dimension = closestJail.dimension;
                if(getServerGame() == GAME_GTA_IV) {
                    spawnPlayer(client, closestJail.position, closestJail.heading, getPlayerCurrentSubAccount(client).skin);
                } else {
                    spawnPlayer(client, closestJail.position, closestJail.heading, getPlayerCurrentSubAccount(client).skin);
                }

                fadeCamera(client, true, 1.0);
                updatePlayerSpawnedState(client, true);
			} else {
                let closestHospital = getClosestHospital(position);
                getPlayerCurrentSubAccount(client).interior = closestHospital.interior;
                getPlayerCurrentSubAccount(client).dimension = closestHospital.dimension;
                if(getServerGame() == GAME_GTA_IV) {
                    spawnPlayer(client, closestHospital.position, closestHospital.heading, getPlayerCurrentSubAccount(client).skin);
                } else {
                    spawnPlayer(client, closestHospital.position, closestHospital.heading, getPlayerCurrentSubAccount(client).skin);
                }

                fadeCamera(client, true, 1.0);
                updatePlayerSpawnedState(client, true);
			}
		}, 2000);
	}, 1000);
}

// ===========================================================================

function onPedSpawn(ped) {
    //if(ped.type == ELEMENT_PLAYER) {
    //    setTimeout(onPlayerSpawn, 500, ped);
    //}
}

// ===========================================================================

function onPlayerSpawn(client) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] Checking for ${getPlayerDisplayForConsole(client)}'s player ped`);
    if(client.player == null) {
        logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s player element not set yet. Rechecking ...`);
        setTimeout(onPlayerSpawn, 500, client);
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s player ped is valid. Continuing spawn processing ...`);

    logToConsole(LOG_DEBUG, `[Asshat.Event] Checking ${getPlayerDisplayForConsole(client)}'s player data`);
    if(!getPlayerData(client)) {
        logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s player data is invalid. Kicking them from server.`);
        client.disconnect();
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s player data is valid. Continuing spawn processing ...`);

    if(getServerGame() == GAME_GTA_IV) {
        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting ${getPlayerDisplayForConsole(client)}'s ped body parts and props`);
        setEntityData(client.player, "ag.bodyParts", getPlayerCurrentSubAccount(client).bodyParts, true);
        setEntityData(client.player, "ag.bodyProps", getPlayerCurrentSubAccount(client).bodyProps, true);
    }

    logToConsole(LOG_DEBUG, `[Asshat.Event] Setting ${getPlayerDisplayForConsole(client)}'s ped scale (${getPlayerCurrentSubAccount(client).pedScale})`);
    setEntityData(client.player, "ag.scale", getPlayerCurrentSubAccount(client).pedScale, true);

    if(isPlayerSwitchingCharacter(client) || isPlayerCreatingCharacter(client)) {
        logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)}'s ped is being used for character selection/creation. No further spawn processing needed'`);
        return false;
    }

    //logToConsole(LOG_DEBUG, `[Asshat.Event] Setting player skin for ${getPlayerDisplayForConsole(client)} to ${getPlayerCurrentSubAccount(client).skin}`);
    //setPlayerSkin(client, getPlayerCurrentSubAccount(client).skin);

    //if(getPlayerData(client).pedState != AG_PEDSTATE_READY) {
        restorePlayerCamera(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Storing ${getPlayerDisplayForConsole(client)} ped in client data `);
        getPlayerData(client).ped = client.player;

        logToConsole(LOG_DEBUG, `[Asshat.Event] Sending ${getPlayerDisplayForConsole(client)} the 'now playing as' message`);
        messagePlayerAlert(client, `You are now playing as: [#0099FF]${getCharacterFullName(client)}`, getColourByName("white"));
        messagePlayerNormal(client, "This server is in early development and may restart at any time for updates.", getColourByName("orange"));
        messagePlayerNormal(client, "Please report any bugs using /bug and suggestions using /idea", getColourByName("yellow"));

        logToConsole(LOG_DEBUG, `[Asshat.Event] Updating spawned state for ${getPlayerDisplayForConsole(client)} to true`);
        updatePlayerSpawnedState(client, true);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting player interior for ${getPlayerDisplayForConsole(client)} to ${getPlayerCurrentSubAccount(client).interior}`);
        setPlayerInterior(client, getPlayerCurrentSubAccount(client).interior);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting player dimension for ${getPlayerDisplayForConsole(client)} to ${getPlayerCurrentSubAccount(client).dimension}`);
        setPlayerDimension(client, getPlayerCurrentSubAccount(client).dimension);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting player health for ${getPlayerDisplayForConsole(client)} to ${getPlayerCurrentSubAccount(client).health}`);
        setPlayerHealth(client, getPlayerCurrentSubAccount(client).health);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting player armour for ${getPlayerDisplayForConsole(client)} to ${getPlayerCurrentSubAccount(client).armour}`);
        setPlayerArmour(client, getPlayerCurrentSubAccount(client).armour);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Updating all player name tags`);
        updateAllPlayerNameTags();

        logToConsole(LOG_DEBUG, `[Asshat.Event] Syncing ${getPlayerDisplayForConsole(client)}'s cash ${getPlayerCurrentSubAccount(client).cash}`);
        updatePlayerCash(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Sending ${getPlayerDisplayForConsole(client)}'s job type to their client (${getJobIndexFromDatabaseId(getPlayerCurrentSubAccount(client))})`);
        sendPlayerJobType(client, getPlayerCurrentSubAccount(client).job);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Enabling all rendering states for ${getPlayerDisplayForConsole(client)}`);
        setPlayer2DRendering(client, true, true, true, true, true, true);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Sending snow states to ${getPlayerDisplayForConsole(client)}`);
        updatePlayerSnowState(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Sending ground snow excluded models to ${getPlayerDisplayForConsole(client)}`);
        sendExcludedModelsForGroundSnowToPlayer(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Sending removed world objects to ${getPlayerDisplayForConsole(client)}`);
        sendRemovedWorldObjectsToPlayer(client);

        if(getServerGame() == GAME_GTA_SA) {
            logToConsole(LOG_DEBUG, `[Asshat.Event] Setting player walk and fightstyle for ${getPlayerDisplayForConsole(client)}`);
            setEntityData(client.player, "ag.walkStyle", getPlayerCurrentSubAccount(client).walkStyle, true);
            setEntityData(client.player, "ag.fightStyle", getPlayerCurrentSubAccount(client).fightStyle, true);
        }

        logToConsole(LOG_DEBUG, `[Asshat.Event] Updating logo state for ${getPlayerDisplayForConsole(client)}`);
        if(getServerConfig().showLogo && doesPlayerHaveLogoEnabled(client)) {
            updatePlayerShowLogoState(client, true);
        }

        logToConsole(LOG_DEBUG, `[Asshat.Event] Caching ${getPlayerDisplayForConsole(client)}'s hotbar items`);
        cachePlayerHotBarItems(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Syncing ${getPlayerDisplayForConsole(client)}'s hotbar`);
        updatePlayerHotBar(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Sending custom keybinds to ${getPlayerDisplayForConsole(client)}`);
        sendAccountKeyBindsToClient(client);

        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting ${getPlayerDisplayForConsole(client)}'s switchchar state to false`);
        getPlayerData(client).switchingCharacter = false;

        logToConsole(LOG_DEBUG, `[Asshat.Event] Setting ${getPlayerDisplayForConsole(client)}'s ped state to ready`);
        getPlayerData(client).pedState = AG_PEDSTATE_READY;

        //setTimeout(function() {
        //    syncPlayerProperties(client);
        //}, 1000);
    //}
}

// ===========================================================================
