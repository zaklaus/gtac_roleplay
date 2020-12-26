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
	console.log("[Asshat.Event]: Initializing event script ...");    
    addNetworkHandler("ag.onPlayerEnterVehicle", playerEnteredVehicle);
    addNetworkHandler("ag.onPlayerExitVehicle", playerExitedVehicle);
    console.log("[Asshat.Event]: Event script initialized!");
}

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerConnect", function(event, ipAddress, port) {
    console.log(`[Asshat.Event] Client connecting (IP: ${ipAddress})`);
    if(isIpAddressBanned(ipAddress)) {
        messageClientError(client, "You are banned from this server!");
        return false;
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerJoined", function(event, client) {
    message(`👋 ${client.name} has joined the server`, getColourByName("softYellow"));
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerQuit", function(event, client, quitReasonId) {
    console.log(`[Asshat.Event] ${getClientDisplayForConsole(client)} disconnected (${gameData.quitReasons[quitReasonId]}[${quitReasonId}])`);
    savePlayerToDatabase(client);

    getServerData().clients[client.index] = null;
    message(`👋 ${client.name} has left the server (${gameData.quitReasons[quitReasonId]})`, getColourByName("softYellow"));
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedSpawn", function(event, ped) {
    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        //triggerNetworkEvent("ag.locations", client, getServerData().policeStations[getServerGame()], getServerData().fireStations[getServerGame()], getServerData().hospitals[getServerGame()], getServerData().payAndSprays[getServerGame()], getServerData().ammunations[getServerGame()], getServerData().jobs[getServerGame()]);
        ped.setData("ag.name", getClientSubAccountName(client), true);
    }
});

// ---------------------------------------------------------------------------

addEventHandler("onPlayerChat", function(event, client, messageText) {
    event.preventDefault();
    if(!getPlayerData(client).loggedIn) {
        messageClientError(client, "You need to login before you can chat!");
        return false;
    }

    message(`${getClientSubAccountName(client)}: [#FFFFFF]${messageText}`, getPlayerColour(client));
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

// ---------------------------------------------------------------------------

addEventHandler("OnPedEnterVehicle", function(event, ped, vehicle, seat) {
    //if(!vehicle || vehicle.owner != -1) {
    //    return false;
    //}

    //if(!getVehicleData(vehicle)) {
    //    return false;
    //}

    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);

        if(!getVehicleData(vehicle).engine) {
            if(doesClientHaveVehicleKeys(client, vehicle)) {
                messageClientNormal(client, `🔒 This ${getVehicleName(vehicle)} is locked. Use /lock to unlock it`);
                if(doesPlayerHaveKeyBindForCommand(client, "lock")) {
                    messageClientTip(client, `You can also press [#AAAAAA]${sdl.getKeyName(getPlayerKeyBindForCommand(client, "lock").key)} [#FFFFFF]to lock and unlock vehicles.`);
                }
            } else {
                messageClientNormal(client, `🔒 This ${getVehicleName(vehicle)} is locked and you don't have the keys to unlock it`);
            }
        } 
    } 
});

// ---------------------------------------------------------------------------

function playerEnteredVehicle(client, vehicleId) {
    setTimeout(function() {
        let vehicle = client.player.vehicle;
        //console.log(`Vehicle: ${vehicle}`);

        //if(!vehicle || vehicle == null) {
        //    return false;
        //}

        //if(!getVehicleData(vehicle)) {
        //    return false;
        //}

        if(getPlayerVehicleSeat(client) == AG_VEHSEAT_DRIVER) {
            if(getVehicleData(vehicle).buyPrice > 0) {
                messageClientAlert(client, `This ${getVehicleName(vehicle)} is for sale! Cost: [#AAAAAA]$${getVehicleData(vehicle).buyPrice}`);
                messageClientTip(client, `Use /vehbuy if you want to buy it.`);
            } else if(getVehicleData(vehicle).rentPrice > 0) {
                messageClientAlert(client, `This ${getVehicleName(vehicle)} is for rent! Cost: [#AAAAAA]$${getVehicleData(vehicle).rentPrice} per minute`);
                messageClientTip(client, `Use /vehrent if you want to rent it.`);
            } else {
                if(!getVehicleData(vehicle).engine) {
                    if(doesClientHaveVehicleKeys(client, vehicle)) {
                        messageClientAlert(client, `This ${getVehicleName(vehicle)}'s engine is off. Use /engine to start it`);
                        if(doesPlayerHaveKeyBindForCommand(client, "engine")) {
                            messageClientTip(client, `You can also press [#AAAAAA]${sdl.getKeyName(getPlayerKeyBindForCommand(client, "engine").key)} [#FFFFFF]to start and stop the engine.`);
                        }
                    } else {
                        messageClientAlert(client, `This ${getVehicleName(vehicle)}'s engine is off and you don't have the keys to start it`);
                    }

                    triggerNetworkEvent("ag.control", client, false, false);
                }
            }

            let currentSubAccount = getClientCurrentSubAccount(client);
        
            if(isPlayerWorking(client)) {
                if(getVehicleData(vehicle).ownerType == AG_VEHOWNER_JOB) {
                    if(getVehicleData(vehicle).ownerId == getClientCurrentSubAccount(client).job) {
                        //if(seat == 0) {
                            getClientCurrentSubAccount(client).lastJobVehicle = vehicle;
                        //}
                    }
                }
            }        
        }
    }, 1000);
}

// ---------------------------------------------------------------------------

function playerExitedVehicle(client, vehicle) {
    //let vehicle = getElementFromId(vehicleId);
}

// ---------------------------------------------------------------------------

function processPlayerDeath(client) {
	removeEntityData(client.player, "ag.spawned", true);
	
	let closestHospital = getClosestHospital(getPlayerPosition(client));
	triggerNetworkEvent("ag.control", client, false);
	setTimeout(function() {
		triggerNetworkEvent("ag.fadeCamera", client, false, 1.0);
		setTimeout(function() {
			client.despawnPlayer();
			if(getClientCurrentSubAccount(client).inJail) {
				let closestJail = getClosestJail(getPlayerPosition(client));
				spawnPlayer(client, closestJail.position, closestJail.heading, getClientCurrentSubAccount(client).skin);
			} else {
				spawnPlayer(client, closestHospital.position, closestHospital.heading, getClientCurrentSubAccount(client).skin);
			}
			setTimeout(function() {
				setEntityData(client.player, "ag.spawned", true, true);
				triggerNetworkEvent("ag.fadeCamera", client, true, 1.0);
				triggerNetworkEvent("ag.control", client, true);
			}, 1000);
		}, 2000);		
	}, 1000);
}