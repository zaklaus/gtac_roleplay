// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: gtac.js
// DESC: Provides natives for GTA and Mafia Connected mods
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================

function getPlayerPosition(client) {
    if(!areServerElementsSupported()) {
        return getPlayerData(client).syncPosition;
    } else {
        if(client.player != null) {
            return client.player.position;
        }
    }
}

// ===========================================================================

function setPlayerPosition(client, position) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s position to ${position.x}, ${position.y}, ${position.z}`);
    sendPlayerSetPosition(client, position);
}

// ===========================================================================

function getPlayerHeading(client) {
    if(!areServerElementsSupported()) {
        return getPlayerData(client).syncHeading;
    } else {
        if(client.player != null) {
            return client.player.heading;
        }
    }
}

// ===========================================================================

function setPlayerHeading(client, heading) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s heading to ${heading}`);
    sendPlayerSetHeading(client, heading);
}

// ===========================================================================

function getPlayerVehicle(client) {
    if(!areServerElementsSupported())  {
        return getPlayerData().syncVehicle;
    } else {
        if(client.player.vehicle) {
            return client.player.vehicle;
        }
    }
    return false;
}

// ===========================================================================

function getPlayerDimension(client) {
    if(!areServerElementsSupported()) {
        return getPlayerData(client).syncDimension;
    } else {
        if(client.player != null) {
            return client.player.dimension;
        }
    }
}

// ===========================================================================

function getPlayerInterior(client) {
    return getPlayerCurrentSubAccount(client).interior || 0;
}

// ===========================================================================

function setPlayerDimension(client, dimension) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s dimension to ${dimension}`);
    if(!areServerElementsSupported()) {
        getPlayerData(client).syncDimension = dimension;
    } else {
        if(client.player != null) {
            client.player.dimension = dimension;
        }
    }
}

// ===========================================================================

function setPlayerInterior(client, interior) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s interior to ${interior}`);
    sendPlayerSetInterior(client, interior);
	if(isPlayerLoggedIn(client) && isPlayerSpawned(client)) {
		getPlayerCurrentSubAccount(client).interior = interior;
	}
}

// ===========================================================================

function isPlayerInAnyVehicle(client) {
    if(!areServerElementsSupported())  {
        return (getPlayerData().syncVehicle != null);
    } else {
        return (client.player.vehicle != null);
    }
}

// ===========================================================================

function getPlayerVehicleSeat(client) {
    if(!isPlayerInAnyVehicle(client)) {
        return false;
    }

	if(!areServerElementsSupported()) {
		return getPlayerData().syncVehicleSeat;
	} else {
		for(let i = 0 ; i <= 8 ; i++) {
			if(getPlayerVehicle(client).getOccupant(i) == client.player) {
				return i;
			}
		}
	}

    return false;
}

// ===========================================================================

function isPlayerSpawned(client) {
    return getPlayerData(client).spawned;
}

// ===========================================================================

function getVehiclePosition(vehicle) {
    return vehicle.position;
}

// ===========================================================================

function getVehicleHeading(vehicle) {
    return vehicle.heading;
}

// ===========================================================================

function setVehicleHeading(vehicle, heading) {
    return vehicle.heading = heading;
}

// ===========================================================================

function getVehicleSyncer(vehicle) {
    return getElementSyncer(vehicle);
}

// ===========================================================================

function getVehicleForNetworkEvent(vehicle) {
    return vehicle;
}

// ===========================================================================

function deleteGameElement(element) {
    try {
        if(element != null) {
            destroyElement(element);
            return true;
        }
    } catch(error) {
        return false;
    }
}

// ===========================================================================

function isPlayerInFrontVehicleSeat(client) {
    return (getPlayerVehicleSeat(client) == 0 || getPlayerVehicleSeat(client) == 1);
}

// ===========================================================================

function removePlayerFromVehicle(client) {
    logToConsole(LOG_DEBUG, `Removing ${getPlayerDisplayForConsole(client)} from their vehicle`);
    sendPlayerRemoveFromVehicle(client);
    return true;
}

// ===========================================================================

function setPlayerSkin(client, skinIndex) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s skin to ${getGameData().skins[getGame()][skinIndex][0]} (Index: ${skinIndex}, Name: ${getGameData().skins[getGame()][skinIndex][1]})`);
    client.player.modelIndex = getGameData().skins[getGame()][skinIndex][0];
}

// ===========================================================================

function getPlayerSkin(client) {
    return getSkinIndexFromModel(client.player.modelIndex);
}

// ===========================================================================

function setPlayerHealth(client, health) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to ${health}`);
    sendPlayerSetHealth(client, health);
}

// ===========================================================================

function getPlayerHealth(client) {
    return client.player.health;
}

// ===========================================================================

function setPlayerArmour(client, armour) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to ${armour}`);
    sendPlayerSetArmour(client, armour);
}

// ===========================================================================

function getPlayerArmour(client) {
    return client.player.armour;
}

// ===========================================================================

function setPlayerCash(client, amount) {
	if(client == null) {
		return false;
	}

    if(isNaN(amount)) {
        return false;
    }

	getPlayerCurrentSubAccount(client).cash = toInteger(amount);
	updatePlayerCash(client);
}

// ===========================================================================

function givePlayerCash(client, amount) {
	if(client == null) {
		return false;
	}

    if(isNaN(amount)) {
        return false;
    }

	getPlayerCurrentSubAccount(client).cash = getPlayerCurrentSubAccount(client).cash + toInteger(amount);
	updatePlayerCash(client);
}

// ===========================================================================

function takePlayerCash(client, amount) {
	if(client == null) {
		return false;
	}

    if(isNaN(amount)) {
        return false;
    }

	getPlayerCurrentSubAccount(client).cash = getPlayerCurrentSubAccount(client).cash - toInteger(amount);
	updatePlayerCash(client);
}

// ===========================================================================

function disconnectPlayer(client) {
    logToConsole(LOG_DEBUG, `Disconnecting (kicking) ${getPlayerDisplayForConsole(client)}`);
    client.disconnect();
    return false;
}

// ===========================================================================

function getElementSyncer(element) {
    return getClients()[element.syncer];
}

// ===========================================================================

function getPlayerWeaponAmmo(client) {
    return client.player.weaponAmmunition;
}

// ===========================================================================

function setPlayerVelocity(client, velocity) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s velocity to ${velocity.x}, ${velocity.y}, ${velocity.z}`);
    if(typeof client.player.velocity != "undefined") {
        client.player.velocity = velocity;
    }
}

// ===========================================================================

function getPlayerVelocity(client, velocity) {
    if(typeof client.player.velocity != "undefined") {
        return client.player.velocity;
    }
    return toVector3(0.0, 0.0, 0.0);
}

// ===========================================================================

function getElementDimension(element) {
    if(typeof element.dimension != "undefined") {
        return element.dimension;
    }
    return 0;
}

// ===========================================================================

function setElementDimension(element, dimension) {
    if(typeof element.dimension != "undefined") {
        element.dimension = dimension;
        return true;
    }
    return false;
}

// ===========================================================================

function setElementRotation(element, rotation) {
    return element.setRotation(rotation);
}

// ===========================================================================

function givePlayerHealth(client, amount) {
    if(getPlayerHealth(client)+amount > 100) {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to 100`);
        setPlayerHealth(client, 100);
    } else {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to ${getPlayerHealth(client)+amount}`);
        setPlayerHealth(client, getPlayerHealth(client)+amount);
    }
}

// ===========================================================================

function givePlayerArmour(client, amount) {
    if(getPlayerArmour(client)+amount > 100) {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to 100`);
        setPlayerArmour(client, 100);
    } else {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to ${getPlayerArmour(client)+amount}`);
        setPlayerArmour(client, getPlayerArmour(client)+amount);
    }
}

// ===========================================================================

function getServerGame() {
    return getGame();
}

// ===========================================================================

function consolePrint(text) {
    console.log(text);
}

// ===========================================================================

function getPlayerName(client) {
    return client.name;
}

// ===========================================================================

function getServerName() {
    return server.name;
}

// ===========================================================================

function createGamePickup(modelIndex, position, type) {
    if(!isGameFeatureSupported("pickups")) {
        return false;
    }
    return game.createPickup(modelIndex, position, type);
}

// ===========================================================================

function createGameBlip(position, type = 0, colour = toColour(255, 255, 255, 255)) {
    if(!isGameFeatureSupported("blips")) {
        return false;
    }
    return game.createBlip(type, position, 1, colour);
}

// ===========================================================================

function createGameObject(modelIndex, position) {
    if(!isGameFeatureSupported("objects")) {
        return false;
    }
    return game.createObject(getGameData().objects[getGame()][modelIndex][0], position);
}

// ===========================================================================

function setElementOnAllDimensions(element, state) {
    if(!isNull(element) && element != false) {
        element.onAllDimensions = state;
    }
}

// ===========================================================================

function destroyGameElement(element) {
    if(!isNull(element) && element != false) {
        destroyElement(element);
    }
}

// ===========================================================================

function isMeleeWeapon(weaponId, gameId = getServerGame()) {
    return (getGameData().meleeWeapons[gameId].indexOf(weaponId) != -1);
}

// ===========================================================================

function getPlayerLastVehicle(client) {
    return getPlayerData(client).lastVehicle;
}

// ===========================================================================

function isVehicleObject(vehicle) {
    return (vehicle.type == ELEMENT_VEHICLE);
}

// ===========================================================================

function repairVehicle(vehicle) {
	vehicle.fix();
}

// ===========================================================================

function setVehicleLights(vehicle, lights) {
	vehicle.lights = lights;
}

// ===========================================================================

function setVehicleEngine(vehicle, engine) {
	vehicle.engine = engine;
}

// ===========================================================================

function setVehicleLocked(vehicle, locked) {
	vehicle.locked = locked;
}

// ===========================================================================

function setVehicleSiren(vehicle, siren) {
	vehicle.siren = siren;
}

// ===========================================================================

function setVehicleColours(vehicle, colour1, colour2) {
	vehicle.colour1 = colour1;
	vehicle.colour2 = colour2;
}

// ===========================================================================

function createGameVehicle(modelIndex, position, heading) {
	return game.createVehicle(getGameData().vehicles[getGame()][modelIndex][0], position, heading);
}

// ===========================================================================

function getIsland(position) {
    if(getServerGame() == VRR_GAME_GTA_III) {
		if(position.x > 616) {
			return VRR_ISLAND_PORTLAND;
		} else if(position.x < -283) {
			return VRR_ISLAND_SHORESIDEVALE;
		}
		return VRR_ISLAND_STAUNTON;
	} else {
		return VRR_ISLAND_NONE;
	}

	//return game.getIslandFromPosition(position);
}

// ===========================================================================

function isValidVehicleModel(model) {
    if(getVehicleModelIndexFromModel(model) != false) {
        return true;
    }

    return false;
}

// ===========================================================================

function setGameTime(hour, minute, minuteDuration = 1000) {
	if(isTimeSupported()) {
		game.time.hour = hour;
		game.time.minute = minute;
		game.time.minuteDuration = minuteDuration;
	}
}

// ===========================================================================

function setPlayerFightStyle(client, fightStyleId) {
	if(!isPlayerSpawned(client)) {
		return false;
	}

	if(!areFightStylesSupported()) {
		return false;
	}

    setEntityData(getPlayerElement(client), "vrr.fightStyle", [getGameData().fightStyles[getServerGame()][fightStyleId][1][0], getGameData().fightStyles[getServerGame()][fightStyleId][1][1]]);
    forcePlayerToSyncElementProperties(null, getPlayerElement(client));
}

// ===========================================================================

function isPlayerAtGym(client) {
	return true;
}

// ===========================================================================

function getPlayerElement(client) {
	return client.player;
}

// ===========================================================================

function setElementPosition(element, position) {
	triggerNetworkEvent("vrr.elementPosition", getClientFromSyncerId(element.syncer), element.id, position);
}

// ===========================================================================

function getElementPosition(element) {
	return element.position;
}

// ===========================================================================

function getElementHeading(element) {
	return element.heading;
}

// ===========================================================================

function setElementInterior(element, interior) {
	setEntityData(element, "vrr.interior", interior, true);
	forcePlayerToSyncElementProperties(null, element);
}

// ===========================================================================

function setElementCollisionsEnabled(element, state) {
	triggerNetworkEvent("vrr.elementCollisions", getClientFromSyncerId(element.syncer), element.id, state);
}

// ===========================================================================

function isTaxiVehicle(vehicle) {
	if(taxiModels[getGame()].indexOf(vehicle.modelIndex) != -1) {
		return true;
	}

	return false;
}

// ===========================================================================

function getVehicleName(vehicle) {
    let model = getElementModel(vehicle);
	return getVehicleNameFromModel(model) || "Unknown";
}

// ===========================================================================

function getElementModel(element) {
    if(typeof element.modelIndex != "undefined") {
        return element.modelIndex;
    }

    if(typeof element.model != "undefined") {
        return element.model;
    }
}

// ===========================================================================