// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: connected.js
// DESC: Provides wrapped natives for GTA Connected and Mafia Connected mods
// TYPE: Server (JavaScript)
// ===========================================================================

function sendNetworkEventToPlayer(networkEvent, client, ...args) {
    triggerNetworkEvent.apply(null, networkEvent, client, args);
}

// ===========================================================================

function getPlayerPosition() {
    return localPlayer.position;
}

// ===========================================================================

function setPlayerPosition(position) {
    localPlayer.position = position;
}

// ===========================================================================

function getElementPosition(element) {
    return element.position;
}

// ===========================================================================

function setElementPosition(element, position) {
    if(!element.isSyncer) {
        return false;
    }

    element.position = position;
}

// ===========================================================================

function deleteGameElement(element, position) {
    if(!element.isOwner) {
        return false;
    }

    destroyGameElement(element);
}

// ===========================================================================

function createGameVehicle(modelIndex, position, heading) {
    return game.createVehicle(getGameData().vehicles[getGame()][modelIndex][0], position, heading);
}

// ===========================================================================

function addNetworkEventHandler(eventName, handlerFunction) {
    addNetworkHandler(eventName, handlerFunction);
}

// ===========================================================================

function sendNetworkEventToServer(eventName, ...args) {
    triggerNetworkEvent.apply(null, eventName, args);
}

// ===========================================================================