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

function getPlayerPosition(client) {
    if(getServerGame() == GAME_GTA_IV) {
        return getPlayerData(client).syncPosition;
    } else {
        if(client.player != null) {
            return client.player.position;
        }
    }
}

// ---------------------------------------------------------------------------

function setPlayerPosition(client, position) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s position to ${position.x}, ${position.y}, ${position.z}`);
    sendPlayerSetPosition(client, position);
}

// ---------------------------------------------------------------------------

function getPlayerHeading(client) {
    if(getServerGame() == GAME_GTA_IV) {
        return getPlayerData(client).syncHeading;
    } else {
        if(client.player != null) {
            return client.player.heading;
        }
    }
}

// ---------------------------------------------------------------------------

function setPlayerHeading(client, heading) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s heading to ${heading}`);
    sendPlayerSetHeading(client, heading);
}

// ---------------------------------------------------------------------------

function getPlayerVehicle(client) {
    if(getServerGame() == GAME_GTA_IV)  {
        return getPlayerData().syncVehicle;
    } else {
        if(client.player.vehicle) {
            return client.player.vehicle;
        }
    }
    return false;
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
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s dimension to ${dimension}`);
    client.player.dimension = dimension;
}

// ---------------------------------------------------------------------------

function setPlayerInterior(client, interior) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s interior to ${interior}`);
    sendPlayerSetInterior(client, interior);
    getPlayerCurrentSubAccount(client).interior = interior;
}

// ---------------------------------------------------------------------------

function isPlayerInAnyVehicle(client) {
    if(getServerGame() == GAME_GTA_IV)  {
        return (getPlayerData().syncVehicle != null);
    } else {
        return (client.player.vehicle != null);
    }
}

// ---------------------------------------------------------------------------

function getPlayerVehicleSeat(client) {
    if(!isPlayerInAnyVehicle(client)) {
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
    logToConsole(LOG_DEBUG, `Destroying game element ${element.id} (Type: ${element.type})`);
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
    logToConsole(LOG_DEBUG, `Removing ${getPlayerDisplayForConsole(client)} from their vehicle`);
    sendPlayerRemoveFromVehicle(client);
    return true;
}

// ---------------------------------------------------------------------------

function setPlayerSkin(client, skin) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s skin to ${skin} (${getSkinNameFromId(skin)})`);
    client.player.modelIndex = skin;
}

// ---------------------------------------------------------------------------

function getPlayerSkin(client) {
    return client.player.modelIndex;
}

// ---------------------------------------------------------------------------

function disconnectPlayer(client) {
    logToConsole(LOG_DEBUG, `Disconnecting (kicking) ${getPlayerDisplayForConsole(client)}`);
    client.disconnect();
    return false;
}

// ---------------------------------------------------------------------------

function getElementSyncer(element) {
    return getClients()[element.syncer];
}

// ---------------------------------------------------------------------------

function getPlayerWeaponAmmo(client) {
    return client.player.weaponAmmunition;
}

// ---------------------------------------------------------------------------

function setPlayerVelocity(client, velocity) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s velocity to ${velocity.x}, ${velocity.y}, ${velocity.z}`);
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
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to 100`);
        setPlayerHealth(client, 100);
    } else {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to ${getPlayerHealth(client)+amount}`);
        setPlayerHealth(client, getPlayerHealth(client)+amount);
    }
}

// ---------------------------------------------------------------------------

function givePlayerArmour(client, amount) {
    if(getPlayerArmour(client)+amount > 100) {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to 100`);
        setPlayerArmour(client, 100);
    } else {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to ${getPlayerArmour(client)+amount}`);
        setPlayerArmour(client, getPlayerArmour(client)+amount);
    }
}

// ---------------------------------------------------------------------------