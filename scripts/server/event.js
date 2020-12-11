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

addEventHandler("OnPlayerConnect", function(event, ipAddress, port) {
    console.log(`[Asshat.Event] Client connecting (IP: ${ipAddress}, Port: ${port})`);
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerJoined", function(event, client) {
    setTimeout(function() {
        initClient(client);
    }, 500);
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerQuit", function(event, client, quitReasonId) {
    //console.log(`[Asshat.Event] Client disconnected (Name: ${client.name}, Reason: ${gameData.quitReasons[quitReasonId]})`);
    saveClientToDatabase(client);

    getServerData().clients[client.index] = null;
    //message(`${client.name} has left the server (${gameData.quitReasons[quitReasonId]})`);
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

addEventHandler("OnPedWasted", function(event, wastedPed, killerPed, weaponId, pedPiece) {
    if(!wastedPed) {
        return false;
    }

    //if(wastedPed.isType(ELEMENT_PLAYER)) {
    //    processPlayerDeath(wastedPed);
    //}
});

// ---------------------------------------------------------------------------

bindEventHandler("OnResourceStop", thisResource, function(event, resource) {
    //console.log("[Asshat.Event]: Resource stopping. Saving all data to database ...");
    //saveAllClientsToDatabase();
    //console.log("[Asshat.Event]: All data saved to database successfully!");
});

// ---------------------------------------------------------------------------

bindEventHandler("OnResourceStart", thisResource, function(event, resource) {
    //initAllClients();    
});

// ---------------------------------------------------------------------------

addEventHandler("onPedEnterVehicle", function(event, ped, vehicle, seat) {
    ped.setData("ag.vehSeat", seat, false);

    if(!vehicle || vehicle.owner != -1) {
        return false;
    }

    let vehicleData = getVehicleData(vehicle);
    if(vehicleData == null) {
        return false;
    }

    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        clientEnteredVehicle(client);
    }
});

// ---------------------------------------------------------------------------

addEventHandler("onProcess", function(event, deltaTime) {
    //if(!isGTAIV()) {
    //    let clients = getClients();
    //    for(let i in clients) {
    //        if(!clients[i].console) {
    //            if(clients[i].getData("ag.isPlaying")) {
    //                if(clients[i].player.health <= 0) {
    //                    console.log(clients[i].name + " died");
    //                    processPlayerDeath(clients[i]);
    //                }
    //            }
    //        }
    //    }        
    //}
});

// ---------------------------------------------------------------------------

addEventHandler("onPlayerChat", function(event, client, messageText) {
    event.preventDefault();
    if(!getClientData(client).loggedIn) {
        messageClientError(client, "You need to login before you can chat!");
        return false;
    }

    message(`${getClientSubAccountName(client)}: [#FFFFFF]${messageText}`, getClientChatColour(client));
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedExitVehicle", function(event, ped, vehicle) {
    if(!vehicle || vehicle.owner != -1) {
        return false;
    }

    if(!getVehicleData(vehicle)) {
        return false;
    }
});

// ---------------------------------------------------------------------------

function clientEnteredVehicle(client, vehicleData) {
    let currentSubAccount = getClientCurrentSubAccount(client);

    if(currentSubAccount.isWorking) {
        if(vehicleData.ownerType == AG_VEHOWNER_JOB) {
            if(vehicleData.ownerId == getJobType(currentSubAccount.job)) {
                if(seat == 0) {
                    getClientCurrentSubAccount(client).lastJobVehicle = vehicleData.syncId;
                }
            }
        }
    }

    if(vehicleData.buyPrice > 0) {
        messageClientInfo(client, `This vehicle is for sale! Cost $${vehicleData.buyPrice}`);
        messageClientInfo(client, `Use /vehbuy if you want to buy this vehicle.`);
    } else {
        if(vehicleData.rentPrice > 0) {
            messageClientInfo(client, `This vehicle is for rent! Cost: $${vehicleData.rentPrice} per minute`);
            messageClientInfo(client, `Use /vehrent if you want to rent this vehicle.`);
        }
    }
}

// ---------------------------------------------------------------------------