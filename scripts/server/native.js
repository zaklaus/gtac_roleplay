// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: native.js
// DESC: Provides util function to wrap mod-specific stuff
// TYPE: Server (JavaScript)
// ===========================================================================

// Use data for each because args are probably gonna be way different for each mod

// ---------------------------------------------------------------------------

function agSpawnPlayer(client, subAccountData) {
    return spawnPlayer(client, subAccountData.spawnPosition, subAccountData.spawnRotation, subAccountData.skin);
}

// ---------------------------------------------------------------------------

function agCreateVehicle(vehicleData) {
    return createVehicle(vehicleData.model, vehicleData.spawnPosition);
}

// ---------------------------------------------------------------------------

function agSetVehiclePosition(vehicle, position) {
    vehicle.position = position;
}

// ---------------------------------------------------------------------------

function agSetVehicleRotation(vehicle, heading) {
    vehicle.heading = heading;
}

// ---------------------------------------------------------------------------

function getServerGame() {
	return server.game;
}

// ---------------------------------------------------------------------------

function agGetPedPosition(ped) {
    return ped.position;
}

// ---------------------------------------------------------------------------

function agGetPedRotation(ped) {
    return ped.heading;
}

// ---------------------------------------------------------------------------

function agGetPedSkin(ped) {
    return ped.modelIndex;
}

// ---------------------------------------------------------------------------

function agSetPedSkin(ped, skinId) {
    return ped.modelIndex = skinId;
}

// ---------------------------------------------------------------------------

function getPlayerPosition(client) {
    if(client.player != null) {
        return client.player.position;
    }
}

// ---------------------------------------------------------------------------

function setPlayerPosition(client, position) {
    return triggerNetworkEvent("ag.position", client, position);
}

// ---------------------------------------------------------------------------

function getPlayerHeading(client) {
    return client.player.heading;
}

// ---------------------------------------------------------------------------

function setPlayerHeading(client, heading) {
    return triggerNetworkEvent("ag.heading", client, heading);
}

// ---------------------------------------------------------------------------

function getPlayerVehicle(client) {
    return client.player.vehicle;
}

// ---------------------------------------------------------------------------

function getPlayerVirtualWorld(client) {
    return client.player.dimension;
}

// ---------------------------------------------------------------------------

function getPlayerInterior(client) {
    return client.player.interior;
}

// ---------------------------------------------------------------------------

function setPlayerVirtualWorld(client, dimension) {
    client.player.dimension = dimension;
}

// ---------------------------------------------------------------------------

function setPlayerInterior(client, interior) {
    triggerNetworkEvent("ag.interior", client, interior);
}

// ---------------------------------------------------------------------------

function isPlayerInAnyVehicle(client) {
    return (client.player.vehicle != null);
}

// ---------------------------------------------------------------------------

function getPlayerVehicleSeat(client) {
    if(!getPlayerVehicle(client)) {
        return false;
    }
    
    for(let i = 0 ; i <= 8 ; i++) {
        if(getPlayerVehicle(client).getOccupant(i) == client.player) {
            return i;
        }
    }

    return false;
}

// ---------------------------------------------------------------------------

function isPlayerSpawned(client) {
    return (client.player != null);
}

// ---------------------------------------------------------------------------

function getVehiclePosition(vehicle) {
    return vehicle.position;
}

// ---------------------------------------------------------------------------

function getVehicleHeading(vehicle) {
    return vehicle.heading;
}

// ---------------------------------------------------------------------------

function getVehicleSyncer(vehicle) {
    return getClients()[vehicle.syncer];
}

// ---------------------------------------------------------------------------

function getVehicleForNetworkEvent(vehicle) {
    return vehicle;
}

// ---------------------------------------------------------------------------

function deleteGameElement(element) {
    if(element != null) {
        destroyElement(element);
        return true;
    }
    return false;
}

// ---------------------------------------------------------------------------

function isPlayerInFrontVehicleSeat(client) {
    return (getPlayerVehicleSeat(client) == 0 || getPlayerVehicleSeat(client) == 1);
}

// ---------------------------------------------------------------------------

function removePlayerFromVehicle(client) {
    triggerNetworkEvent("ag.removeFromVehicle", client);
    return true;
}

// ---------------------------------------------------------------------------