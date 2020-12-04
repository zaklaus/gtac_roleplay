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

addNetworkHandler("ag.onPlayerEnterSphere", function(client, sphere) {
    switch(sphere.getData("ag.type")) {
        case AG_SPHERE_HOUSE:
            client.player.setData("ag.atHouse", sphere.getData("ag.id"), false);
            break;

        case AG_SPHERE_BUSINESS:
            client.player.setData("ag.atBusiness", sphere.getData("ag.id"), false);
            break;            
        
        default:
            break;
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.onPlayerExitSphere", function(client, sphere) {
    client.player.removeData("ag.atHouse");
    client.player.removeData("ag.atBusiness");
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.promptAnswerNo", function(client) {
    if(!client.getData("ag.prompt")) {
        return false;
    }

    switch(client.getData("ag.prompt")) {
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
    if(!client.getData("ag.prompt")) {
        return false;
    }

    switch(client.getData("ag.prompt")) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            triggerNetworkEvent("ag.showNewCharacter", client);
            break;
        S   
        default:
            break;
    }

    client.removeData("ag.prompt");
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.onPlayerEnterSphere", function(client, sphere) {
    let ownerType = sphere.getData("ag.ownerType");
    let ownerId = sphere.getData("ag.ownerId");

    switch(ownerType) {
        case AG_PICKUP_JOB:
            let jobData = getJobData(ownerId);
            showJobInformationToPlayer(client, jobData.jobType);
            break;

        default:
            break;
    }
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.afk", function(client, afkState) {
    if(afkState) {
        client.setData("ag.afk", true, true);
    } else {
        client.removeData("ag.afk");
    }
});

// ---------------------------------------------------------------------------

// Not implemented yet
addNetworkHandler("ag.heldKey", function(client, key) {
    switch(key) {
        case serverConfig.keybinds.actionKey: 
            processHoldActionKey(client);
            break;

        case serverConfig.keybinds.vehicleLightsKey: 
            processHoldVehicleLightsKey(client);
            break;

        case serverConfig.keybinds.vehicleLockKey: 
            processHoldVehicleLockKey(client);
            break;

        case serverConfig.keybinds.vehicleEngineKey: 
            processHoldVehicleEngineKey(client);
            break;             
    }
});

// ---------------------------------------------------------------------------