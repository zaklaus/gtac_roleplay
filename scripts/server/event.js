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

function playerEnteredVehicle(client, vehicle) {
    console.log(`Vehicle: ${vehicle}`);

    if(!vehicle || vehicle == null) {
        return false;
    }
    console.log(`Vehicle not null`);

    if(!getVehicleData(vehicle)) {
        return false;
    }

    console.log(`Vehicle data found`);

    if(getPlayerVehicleSeat(client) == AG_VEHSEAT_DRIVER) {
        if(getVehicleData(vehicle).buyPrice > 0) {
            messageClientAlert(client, `This ${getVehicleName(vehicle)} is for sale! Cost $${getVehicleData(vehicle).buyPrice}`);
            messageClientTip(client, `Use /vehbuy if you want to buy it.`);
        } else if(getVehicleData(vehicle).rentPrice > 0) {
            messageClientAlert(client, `This ${getVehicleName(vehicle)} is for rent! Cost: $${getVehicleData(vehicle).rentPrice} per minute`);
            messageClientTip(client, `Use /vehrent if you want to rent it.`);
        }

        if(!getVehicleData(vehicle).engine) {
            messageClientTip(client, `This ${getVehicleName(vehicle)}'s engine is off. Use /engine to start it`);
            if(doesPlayerHaveKeyBindForCommand(client, "engine")) {
                messageClientTip(client, `You can also press ${getPlayerKeyBindForCommand(client, "engine")} to start and stop the engine.`);
            }
            triggerNetworkEvent("ag.control", client, false, false);
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
}

// ---------------------------------------------------------------------------

function playerExitedVehicle(client, vehicle) {
    //let vehicle = getElementFromId(vehicleId);


}

// ---------------------------------------------------------------------------