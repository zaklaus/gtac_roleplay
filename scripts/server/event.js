// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: event.js
// DESC: Provides handlers for built in GTAC and Asshat-Gaming created events
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function initEventScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Event]: Initializing event script ...");
    addNetworkHandler("ag.onPlayerEnterVehicle", playerEnteredVehicle);
    addNetworkHandler("ag.onPlayerExitVehicle", playerExitedVehicle);
    logToConsole(LOG_DEBUG, "[Asshat.Event]: Event script initialized!");
}

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerConnect", function(event, ipAddress, port) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] Client connecting (IP: ${ipAddress})`);
    if(isIpAddressBanned(ipAddress)) {
        messagePlayerError(client, "You are banned from this server!");
        return false;
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerJoin", function(event, client) {
    fadeCamera(client, true, 1.0);
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerJoined", function(event, client) {
    //message(`👋 ${client.name} has joined the server`, getColourByName("softYellow"));
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerQuit", function(event, client, quitReasonId) {
    logToConsole(LOG_DEBUG, `[Asshat.Event] ${getPlayerDisplayForConsole(client)} disconnected (${disconnectReasons[quitReasonId]}[${quitReasonId}])`);

    //savePlayerToDatabase(client);
    resetClientStuff(client);

    getServerData().clients[client.index] = null;
    message(`👋 ${client.name} has left the server (${disconnectReasons[quitReasonId]})`, getColourByName("softYellow"));
});

// ---------------------------------------------------------------------------

addEventHandler("onPlayerChat", function(event, client, messageText) {
    event.preventDefault();
    if(!getPlayerData(client).loggedIn) {
        messagePlayerError(client, "You need to login before you can chat!");
        return false;
    }

    messageText = messageText.substring(0, 128);

    message(`${getCharacterFullName(client)}: [#FFFFFF]${messageText}`, getPlayerColour(client));
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedExitVehicle", function(event, ped, vehicle) {
    //if(!vehicle || vehicle.owner != -1) {
    //    return false;
    //}

    //if(!getVehicleData(vehicle)) {
    //    return false;
    //}
});

addEventHandler("OnProcess", function(event, deltaTime) {
    let clients = getClients();
    for(let i in clients) {
        if(getPlayerData(clients[i])) {
            if(getPlayerData(clients[i]).buyingVehicle) {
                if(getPlayerVehicle(clients[i]) == getPlayerData(clients[i]).buyingVehicle) {
                    if(getDistance(getVehiclePosition(getPlayerData(clients[i]).buyingVehicle), getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnPosition) > getGlobalConfig().buyVehicleDriveAwayDistance) {
                        if(getPlayerCurrentSubAccount(clients[i]).cash < getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice) {
                            messagePlayerError(client, "You don't have enough money to buy this vehicle!");
                            respawnVehicle(getPlayerData(clients[i]).buyingVehicle);
                            getPlayerData(clients[i]).buyingVehicle = false;
                            return false;
                        }

                        createNewDealershipVehicle(getVehicleData(getPlayerData(clients[i]).buyingVehicle).model, getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnPosition, getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnRotation, getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice, getVehicleData(getPlayerData(clients[i]).buyingVehicle).ownerId);
                        getPlayerCurrentSubAccount(clients[i]).cash -= getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice;
                        updatePlayerCash(clients[i]);
                        getVehicleData(getPlayerData(clients[i]).buyingVehicle).ownerId = getPlayerCurrentSubAccount(clients[i]).databaseId;
                        getVehicleData(getPlayerData(clients[i]).buyingVehicle).ownerType = AG_VEHOWNER_PLAYER;
                        getVehicleData(getPlayerData(clients[i]).buyingVehicle).buyPrice = 0;
                        getVehicleData(getPlayerData(clients[i]).buyingVehicle).rentPrice = 0;
                        getVehicleData(getPlayerData(clients[i]).buyingVehicle).spawnLocked = false;
                        getPlayerData(clients[i]).buyingVehicle = false;
                        messagePlayerSuccess(clients[i], "This vehicle is now yours! It will save wherever you leave it.");
                    }
                } else {
                    messagePlayerError(client, "You canceled the vehicle purchase by exiting the vehicle!");
                    respawnVehicle(getPlayerData(clients[i]).buyingVehicle);
                    getPlayerData(clients[i]).buyingVehicle = false;
                }
            }
        }
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedEnterVehicle", function(event, ped, vehicle, seat) {
    //if(!vehicle || vehicle.owner != -1) {
    //    return false;
    //}

    if(!getVehicleData(vehicle)) {
        return false;
    }

    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);

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
});

// ---------------------------------------------------------------------------

async function playerEnteredVehicle(client) {
    if(client.player == null) {
        return false;
    }

    await waitUntil(() => client.player.vehicle != null);
    let vehicle = client.player.vehicle;

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

function playerExitedVehicle(client) {
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

function processPlayerDeath(client, position) {
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

function processPedSpawn(ped) {
    if(ped.type == ELEMENT_PLAYER) {
        setTimeout(processPlayerSpawn, 500, ped);
    }
}

// ---------------------------------------------------------------------------

function processPlayerSpawn(ped) {
    if(getClientFromPlayerElement(ped) == null) {
        setTimeout(processPlayerSpawn, 500, ped);
        return false;
    }

    let client = getClientFromPlayerElement(ped);

    if(!getPlayerData(client)) {
        client.disconnect();
        return false;
    }

    if(!isPlayerSwitchingCharacter(client)) {
        return false;
    }

    messagePlayerAlert(client, `You are now playing as: [#0099FF]${getCharacterFullName(client)}`, getColourByName("white"));
    messagePlayerNormal(client, "This server is in early development and may restart at any time for updates.", getColourByName("orange"));
    messagePlayerNormal(client, "Please report any bugs using /bug and suggestions using /idea", getColourByName("yellow"));
    restorePlayerCamera(client, false, 1.0);
    updatePlayerSpawnedState(client, true);
    setPlayerInterior(client, getPlayerCurrentSubAccount(client).interior);
    setPlayerVirtualWorld(client, getPlayerCurrentSubAccount(client).dimension);
    updateAllPlayerNameTags();
    getPlayerData(client).switchingCharacter = false;
    updatePlayerCash(client);
    updatePlayerJobType(client);
}

// ---------------------------------------------------------------------------

addEventHandler("OnPedSpawn", function(event, ped) {
    processPedSpawn(ped);
});

// ---------------------------------------------------------------------------

addEventHandler("OnResourceStart", function(event, resource) {
    console.warn(`[Asshat.Event] ${resource.name} started!`);

    if(resource != thisResource) {
        messageAdmins(`[#FFFFFF]Resource [#AAAAAA]${resource.name} [#FFFFFF]started!`);
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnResourceStop", function(event, resource) {
    console.warn(`[Asshat.Event] ${resource.name} stopped!`);

    if(resource != thisResource) {
        messageAdmins(`[#FFFFFF]Resource [#AAAAAA]${resource.name} [#FFFFFF]stopped!`);
    }

    if(resource == thisResource) {
        //saveAllServerDataToDatabase();
    }
});

// ---------------------------------------------------------------------------