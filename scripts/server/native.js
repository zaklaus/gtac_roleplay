// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: native.js
// DESC: Provides util function to wrap mod-specific stuff
// TYPE: Server (JavaScript)
// ===========================================================================

// Use data for each because args are probably gonna be way different for each mod

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
    sendPlayerSetPosition(client, position);
}

// ---------------------------------------------------------------------------

function getPlayerHeading(client) {
    return client.player.heading;
}

// ---------------------------------------------------------------------------

function setPlayerHeading(client, heading) {
    sendPlayerSetHeading(client, heading);
}

// ---------------------------------------------------------------------------

function getPlayerVehicle(client) {
    return client.player.vehicle;
}

// ---------------------------------------------------------------------------

function getPlayerDimension(client) {
    return client.player.dimension;
}

// ---------------------------------------------------------------------------

function getPlayerInterior(client) {
    if(getPlayerData(client)) {
        if(getPlayerCurrentSubAccount(client)) {
            return getPlayerCurrentSubAccount(client).interior;
        }
    }
}

// ---------------------------------------------------------------------------

function setPlayerDimension(client, dimension) {
    client.player.dimension = dimension;
}

// ---------------------------------------------------------------------------

function setPlayerInterior(client, interior) {
    sendPlayerSetInterior(client, interior);
    getPlayerCurrentSubAccount(client).interior = interior;
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
    return getElementSyncer(vehicle);
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
    sendPlayerRemoveFromVehicle(client);
    return true;
}

// ---------------------------------------------------------------------------

function setPlayerSkin(client, skin) {
    client.player.modelIndex = skin;
}

// ---------------------------------------------------------------------------

function disconnectPlayer(client) {
    return false;
}

// ---------------------------------------------------------------------------

function getElementSyncer(element) {
    return getClients()[element.syncer];
}

// ---------------------------------------------------------------------------

function getPlayerWeaponAmmo(client) {
    client.player.weaponAmmunition + client.player.weaponClipAmmunition;
}

// ---------------------------------------------------------------------------

function setPlayerVelocity(client, velocity) {
    client.player.velocity = velocity;
}

// ---------------------------------------------------------------------------

function getPlayerVelocity(client, velocity) {
    return client.player.velocity;
}

// ---------------------------------------------------------------------------

function getElementDimension(element) {
    return element.dimension;
}

// ---------------------------------------------------------------------------

function setElementDimension(element, dimension) {
    return element.dimension = dimension;
}

// ---------------------------------------------------------------------------

function givePlayerHealth(client, amount) {
    if(getPlayerHealth(client)+amount > 100) {
        setPlayerHealth(client, 100);
    } else {
        setPlayerHealth(client, getPlayerHealth(client)+amount);
    }
}

// ---------------------------------------------------------------------------