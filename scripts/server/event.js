// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: event.js
// DESC: Provides handlers for built in GTAC and Asshat-Gaming created events
// TYPE: Server (JavaScript)
// ===========================================================================

addEventHandler("OnPlayerJoined", function(event, client) {
    setTimeout(function() {
        triggerNetworkEvent("ag.connectCamera", client, serverConfig.connectCameraPosition[server.game], serverConfig.connectCameraLookAt[server.game]);
        
        client.setData("ag.loginAttemptsRemaining", 3, false);
        
        let tempAccountData = loadAccountFromName(client.name);
        let tempSubAccounts = loadSubAccountsFromAccount(tempAccountData.databaseId);
        
        serverData.clients[client.index] = new serverClasses.clientData(client, tempAccountData, tempSubAccounts);

        sendAllBlips(client);

        if(tempAccountData != false) {
            triggerNetworkEvent("ag.showLogin", client);
            //messageClient("Welcome back to Asshat Gaming RP, " + String(client.name) + "! Please /login to continue.", client, serverConfig.colour.byName["white"]);
        } else {
            triggerNetworkEvent("ag.showRegistration", client);
            //messageClient("Welcome to Asshat Gaming RP, " + String(client.name) + "! Please /register to continue.", client, serverConfig.colour.byName["white"]);
        }
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
        //triggerNetworkEvent("ag.locations", client, serverData.policeStations[server.game], serverData.fireStations[server.game], serverData.hospitals[server.game], serverData.payAndSprays[server.game], serverData.ammunations[server.game], serverData.jobs[server.game]);
        ped.setData("ag.name", getClientSubAccountName(client), true);
    }
});

// ---------------------------------------------------------------------------

addEventHandler("OnPedWasted", function(event, wastedPed, killerPed, weaponId, pedPiece) {
    let closestHospital = getClosestHospital(wastedPed.position);
    let client = getClientFromPedElement(wastedPed);
    spawnPlayer(client, closestHospital.position, closestHospital.heading, getClientCurrentSubAccount(client).skin);
});

// ---------------------------------------------------------------------------

bindEventHandler("OnResourceStop", thisResource, function(event, resource) {
    //console.log("[Asshat.Event]: Resource stopping. Saving all data to database ...");
    //saveAllClientsToDatabase();
    //console.log("[Asshat.Event]: All data saved to database successfully!");
});

// ---------------------------------------------------------------------------

bindEventHandler("OnResourceStart", thisResource, function(event, resource) {
    getClients().forEach(function(client) {
        initClient(client);
    });

    //createAllLocationBlips();

    
});

// ---------------------------------------------------------------------------

addEventHandler("onPedEnterVehicle", function(event, ped, vehicle, seat) {
    ped.setData("ag.vehSeat", seat, false);

    let vehicleData = getVehicleData(vehicle);

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