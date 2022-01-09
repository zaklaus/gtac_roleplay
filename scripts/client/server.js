// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: server.js
// DESC: Provides server communication and cross-endpoint operations
// TYPE: Client (JavaScript)
// ===========================================================================

function initServerScript() {
    logToConsole(LOG_DEBUG, "[VRR.Server]: Initializing server script ...");
    addAllNetworkHandlers();
    logToConsole(LOG_DEBUG, "[VRR.Server]: Server script initialized!");
}

// ===========================================================================

function addAllNetworkHandlers() {
    logToConsole(LOG_DEBUG, "[VRR.Server]: Adding network handlers ...");

    addNetworkHandler("vrr.smallGameMessage", showSmallGameMessage);
    addNetworkHandler("vrr.working", setLocalPlayerWorkingState);
    addNetworkHandler("vrr.jobType", setLocalPlayerJobType);
    addNetworkHandler("vrr.passenger", enterVehicleAsPassenger);

    addNetworkHandler("vrr.freeze", setLocalPlayerFrozenState);
    addNetworkHandler("vrr.control", setLocalPlayerControlState);
    addNetworkHandler("vrr.fadeCamera", fadeLocalCamera);
    addNetworkHandler("vrr.removeFromVehicle", removeLocalPlayerFromVehicle);
    addNetworkHandler("vrr.clearPeds", clearLocalPlayerOwnedPeds);
    addNetworkHandler("vrr.restoreCamera", restoreLocalCamera);
    addNetworkHandler("vrr.cameraLookAt", setLocalCameraLookAt);
    addNetworkHandler("vrr.logo", setServerLogoRenderState);
    addNetworkHandler("vrr.ambience", setCityAmbienceState);
    addNetworkHandler("vrr.runCode", runClientCode);
    addNetworkHandler("vrr.clearWeapons", clearLocalPlayerWeapons);
    addNetworkHandler("vrr.giveWeapon",  giveLocalPlayerWeapon);
    addNetworkHandler("vrr.position", setLocalPlayerPosition);
    addNetworkHandler("vrr.heading", setLocalPlayerHeading);
    addNetworkHandler("vrr.interior", setLocalPlayerInterior);
    addNetworkHandler("vrr.minuteDuration", setMinuteDuration);
    addNetworkHandler("vrr.showJobRouteStop", showJobRouteStop);
    addNetworkHandler("vrr.snow", setSnowState);
    addNetworkHandler("vrr.health", setLocalPlayerHealth);
    addNetworkHandler("vrr.enterPropertyKey", setEnterPropertyKey);
    addNetworkHandler("vrr.skinSelect", toggleSkinSelect);
    addNetworkHandler("vrr.hotbar", updatePlayerHotBar);
    addNetworkHandler("vrr.pedSpeech", playPedSpeech);
    addNetworkHandler("vrr.clearPedState", clearLocalPedState);
    addNetworkHandler("vrr.drunkEffect", setLocalPlayerDrunkEffect);
    addNetworkHandler("vrr.showItemActionDelay", showItemActionDelay);
    addNetworkHandler("vrr.set2DRendering", setPlayer2DRendering);
    addNetworkHandler("vrr.mouseCursor", toggleMouseCursor);
    addNetworkHandler("vrr.mouseCamera", toggleMouseCamera);
    addNetworkHandler("vrr.mouseCameraForce", setMouseCameraState);
    addNetworkHandler("vrr.weaponDamageEnabled", setPlayerWeaponDamageEnabled);
    addNetworkHandler("vrr.weaponDamageEvent", setPlayerWeaponDamageEvent);
    addNetworkHandler("vrr.spawned", onServerSpawnedPlayer);
    addNetworkHandler("vrr.money", setLocalPlayerCash);
    addNetworkHandler("vrr.armour", setLocalPlayerArmour);
    addNetworkHandler("vrr.wantedLevel", forceLocalPlayerWantedLevel);

    addNetworkHandler("vrr.delKeyBind", unBindAccountKey);
    addNetworkHandler("vrr.addKeyBind", bindAccountKey);
    addNetworkHandler("vrr.clearKeyBinds", clearKeyBinds);

    addNetworkHandler("vrr.nametag", updatePlayerNameTag);
    addNetworkHandler("vrr.ping", updatePlayerPing);

    addNetworkHandler("vrr.m", receiveChatBoxMessageFromServer);
    addNetworkHandler("vrr.chatScrollLines", setChatScrollLines);

    addNetworkHandler("vrr.radioStream", playStreamingRadio);
    addNetworkHandler("vrr.audioFileStream", playAudioFile);
    addNetworkHandler("vrr.stopRadioStream", stopStreamingRadio);
    addNetworkHandler("vrr.radioVolume", setStreamingRadioVolume);

    addNetworkHandler("vrr.veh.lights", setVehicleLights);
    addNetworkHandler("vrr.veh.engine", setVehicleEngine);
    addNetworkHandler("vrr.veh.repair", repairVehicle);

    addNetworkHandler("vrr.pedAnim", makePedPlayAnimation);
    addNetworkHandler("vrr.pedStopAnim", makePedStopAnimation);
    addNetworkHandler("vrr.forcePedAnim", forcePedAnimation);
    addNetworkHandler("vrr.hideAllGUI", hideAllGUI);
    addNetworkHandler("vrr.gameScript", setGameScriptState);
    addNetworkHandler("vrr.clientInfo", serverRequestedClientInfo);
    addNetworkHandler("vrr.interiorLights", updateInteriorLightsState);

    addNetworkHandler("vrr.syncElement", forceSyncElementProperties);
    addNetworkHandler("vrr.elementPosition", setElementPosition);
    addNetworkHandler("vrr.elementCollisions", setElementCollisionsEnabled);

    addNetworkHandler("vrr.vehBuyState", setVehiclePurchaseState);

    addNetworkHandler("vrr.showRegistration", showRegistrationGUI);
    addNetworkHandler("vrr.showNewCharacter", showNewCharacterGUI);
    addNetworkHandler("vrr.showLogin", showLoginGUI);
}

// ===========================================================================

function sendResourceReadySignalToServer() {
    sendNetworkEventToServer("vrr.clientReady");
}

// ===========================================================================

function sendResourceStartedSignalToServer() {
    sendNetworkEventToServer("vrr.clientStarted");
}

// ===========================================================================

function sendResourceStoppedSignalToServer() {
    if(isConnected) {
        sendNetworkEventToServer("vrr.clientStopped");
    }
}

// ===========================================================================

function setPlayer2DRendering(hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState) {
    logToConsole(LOG_DEBUG, `[VRR.Main] Updating render states (HUD: ${hudState}, Labels: ${labelState}, Bottom Text: ${smallGameMessageState}, Scoreboard: ${scoreboardState}, HotBar: ${hotBarState}, Item Action Delay: ${itemActionDelayState})`);
    renderHUD = hudState;

    if(typeof setHUDEnabled != "undefined") {
        if(getGame() == VRR_GAME_GTA_IV) {
            natives.displayHud(false);
        } else {
            setHUDEnabled(hudState);
        }
    }

    renderLabels = labelState;
    renderSmallGameMessage = smallGameMessageState;
    renderScoreBoard = scoreboardState;
    renderHotBar = hotBarState;
    renderItemActionDelay = itemActionDelayState;
}

// ===========================================================================

function onServerSpawnedPlayer(state) {
    logToConsole(LOG_DEBUG, `[VRR.Main] Setting spawned state to ${state}`);
    isSpawned = state;
    if(state) {
        setUpInitialGame();
        calledDeathEvent = false;
    }
}

// ===========================================================================

function tellServerPlayerUsedKeyBind(key) {
    sendNetworkEventToServer("vrr.useKeyBind", key);
}

// ===========================================================================

function tellServerPlayerArrivedAtJobRouteStop() {
    sendNetworkEventToServer("vrr.arrivedAtJobRouteStop");
}

// ===========================================================================

function tellServerItemActionDelayComplete() {
    sendNetworkEventToServer("vrr.itemActionDelayComplete");
}

// ===========================================================================

function sendServerClientInfo() {
    let clientVersion = "0.0.0.0";
    if(typeof CLIENT_VERSION_MAJOR != "undefined") {
        clientVersion = `${CLIENT_VERSION_MAJOR}.${CLIENT_VERSION_MINOR}.${CLIENT_VERSION_PATCH}.${CLIENT_VERSION_BUILD}`;
    }
    sendNetworkEventToServer("vrr.clientInfo", clientVersion, game.width, game.height);
}

// ===========================================================================

function sendServerNewAFKStatus(state) {
    sendNetworkEventToServer("vrr.afk", state);
}

// ===========================================================================

function anchorBoat(vehicleId) {

}

// ===========================================================================

function setEnterPropertyKey(key) {
    enterPropertyKey = key;
}

// ===========================================================================

function setGameScriptState(scriptName, state) {
    if(state == VRR_GAMESCRIPT_FORCE) {
        logToConsole(`[VRR.Server] Starting game script '${scriptName}'`);
        game.startNewScript(scriptName);
    } else if(state == VRR_GAMESCRIPT_DENY) {
        logToConsole(`[VRR.Server] Terminating game script '${scriptName}'`);
        game.terminateScript(scriptName);
    }
}

// ===========================================================================

function serverRequestedClientInfo() {
    sendServerClientInfo();
}

// ===========================================================================

function updateInteriorLightsState(state) {
    interiorLightsEnabled = state;
}

// ===========================================================================

function forceSyncElementProperties(elementId) {
    if(getElementFromId(elementId) == null) {
        return false;
    }

    syncElementProperties(getElementFromId(elementId));
}

// ===========================================================================

function setElementPosition(elementId, position) {
    if(getElementFromId(elementId) == null) {
        return false;
    }

    getElementFromId(elementId).position = position;
}

// ===========================================================================

function setElementCollisionsEnabled(elementId, state) {
    if(getElementFromId(elementId) == null) {
        return false;
    }

    getElementFromId(elementId).collisionsEnabled = state;
}

// ===========================================================================

function setLocalPlayerPedPartsAndProps(parts, props) {
    for(let i in parts) {
        localPlayer.changeBodyPart(parts[0], parts[1], parts[2]);
        localPlayer.changeBodyProp(props[0], props[1]);
    }
}

// ===========================================================================

function setLocalPlayerArmour(armour) {
    if(typeof localPlayer.armour != "undefined") {
        localPlayer.armour = armour;
    }
}

// ===========================================================================

function forceLocalPlayerWantedLevel(wantedLevel) {
    forceWantedLevel = toInteger(wantedLevel);
}

// ===========================================================================