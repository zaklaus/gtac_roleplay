// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: event.js
// DESC: Provides handlers for built in GTAC and Asshat-Gaming created events
// TYPE: Server (JavaScript)
// ===========================================================================

addEventHandler("OnPlayerJoined", function(event, client) {
    setTimeout(function() {
        initClient(client);
    }, 500);
});

// ---------------------------------------------------------------------------

addEventHandler("OnPlayerQuit", function(event, client, quitReasonId) {
    saveClientToDatabase(client);

    serverData.clients[client.index] = null;
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedSpawn", function(event, ped) {
    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        //triggerNetworkEvent("ag.locations", client, serverData.policeStations[getServerGame()], serverData.fireStations[getServerGame()], serverData.hospitals[getServerGame()], serverData.payAndSprays[getServerGame()], serverData.ammunations[getServerGame()], serverData.jobs[getServerGame()]);
        ped.setData("ag.name", getClientSubAccountName(client), true);
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedWasted", function(event, wastedPed, killerPed, weaponId, pedPiece) {
    if(ped.isType(ELEMENT_PLAYER)) {
        let closestHospital = getClosestHospital(wastedPed.position);
        let client = getClientFromPedElement(wastedPed);
        client.despawnPlayer();
        if(getClientCurrentSubAccount(client).inJail) {
            let closestJail = getClosestJail(wastedPed.position);
            spawnPlayer(client, closestJail.position, closestJail.heading, getClientCurrentSubAccount(client).skin);
        } else {
            spawnPlayer(client, closestHospital.position, closestHospital.heading, getClientCurrentSubAccount(client).skin);
        }
    }
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
    if(!vehicleData) {
        return false;
    }

    

    if(ped.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(ped);
        let currentSubAccount = getClientCurrentSubAccount(client);

        if(currentSubAccount.isWorking) {
            if(vehicleData.ownerType == AG_VEHOWNER_JOB) {
                if(vehicleData.ownerId == getJobType(currentSubAccount.job)) {
                    if(seat == 0) {
                        getClientCurrentSubAccount(client).lastJobVehicle = vehicle;
                    }
                }
            }
        }

        if(vehicleData.buyPrice > 0) {
            messageClientInfo(client, `This vehicle is for sale! Cost $${vehicleData.buyPrice}`);
            messageClientInfo(client, `Use /buycar if you'd like to buy this vehicle.`);
        } else {
            if(vehicleData.rentPrice > 0) {
                messageClientInfo(client, `This vehicle is for rent! Cost: $${vehicleData.rentPrice} per minute`);
                messageClientInfo(client, `Use /rentcar if you'd like to rent this vehicle.`);
            }
        }
    }
});

// ---------------------------------------------------------------------------

addEventHandler("onEntityProcess", function(event, entity) {
    /*
    if(entity.isType(ELEMENT_PLAYER)) {
        let client = getClientFromPlayerElement(entity);
        if(isNearJobPoint(entity.position) {
            let jobPoint = getNearbyJobPoint(entity);
        }
    }
    */
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