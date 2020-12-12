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

function getServerGame() {
    return server.game;
}

// ---------------------------------------------------------------------------

function getPlayerPosition(client) {
    //return (isGTAIV()) ? getEntityData(client, "ag.position") : client.player.position;
    return getEntityData(client, "ag.position");
}

// ---------------------------------------------------------------------------

function getPlayerHeading(client) {
    //return (isGTAIV()) ? getEntityData(client, "ag.heading") : client.player.heading;
    return getEntityData(client, "ag.heading");
}

// ---------------------------------------------------------------------------

function getPlayerVehicle(client) {
    //return (isGTAIV()) ? getVehicleDataFromSyncId(getEntityData(client, "ag.vehicle")) : getVehicleData(client.player.vehicle);
    let playerVehicle = getEntityData(client, "ag.vehicle");
    let vehicleData = getVehicleDataFromSyncId(playerVehicle);
    console.log(`playerVehicle: ${playerVehicle}, vehicleData: ${vehicleData}`);
    return vehicleData;
}

// ---------------------------------------------------------------------------

function isPlayerInAnyVehicle(client) {
    return doesEntityDataExist(client, "ag.vehicle");
}

// ---------------------------------------------------------------------------

function getPlayerVehicleSeat(client) {
    return getEntityData(client, "ag.vehicleSeat");
}

// ---------------------------------------------------------------------------

function isPlayerSpawned(client) {
    return getEntityData(client, "ag.spawned");
}

// ---------------------------------------------------------------------------

function getVehiclePosition(vehicleData) {
    //return (isGTAIV()) ? vehicleData.syncPosition : vehicleData.vehicle.position;
    return vehicleData.syncPosition;
}

// ---------------------------------------------------------------------------

function getVehicleHeading(vehicleData) {
    //return (isGTAIV()) ? vehicleData.syncHeading : vehicleData.vehicle.heading;
    return vehicleData.syncHeading;
}

// ---------------------------------------------------------------------------

function getVehicleSyncer(vehicleData) {
    if(isGTAIV()) {
        return vehicleData.syncedBy;
    } else {
        vehicleData.vehicle.syncer;
    }
}

// ---------------------------------------------------------------------------

function getVehicleForNetworkEvent(vehicleData) {
    if(isGTAIV()) {
        return vehicleData.syncId;
    } else {
        vehicleData.vehicle.syncer;
    }
}

// ---------------------------------------------------------------------------