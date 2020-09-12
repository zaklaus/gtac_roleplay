// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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