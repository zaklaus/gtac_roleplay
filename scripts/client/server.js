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

    addNetworkHandler("vrr.excludeGroundSnow", excludeModelFromGroundSnow);
    addNetworkHandler("vrr.removeWorldObject", removeWorldObject);

    addNetworkHandler("vrr.delKeyBind", unBindAccountKey);
    addNetworkHandler("vrr.addKeyBind", bindAccountKey);
    addNetworkHandler("vrr.clearKeyBinds", clearKeyBinds);

    addNetworkHandler("vrr.nametag", updatePlayerNameTag);
    addNetworkHandler("vrr.ping", updatePlayerPing);

    addNetworkHandler("vrr.m", receiveChatBoxMessageFromServer);
    addNetworkHandler("vrr.chatScrollLines", setChatScrollLines);

    addNetworkHandler("vrr.radioStream", playStreamingRadio);
    addNetworkHandler("vrr.stopRadioStream", stopStreamingRadio);
    addNetworkHandler("vrr.radioVolume", setStreamingRadioVolume);

    addNetworkHandler("vrr.veh.lights", setVehicleLights);
    addNetworkHandler("vrr.veh.engine", setVehicleEngine);
    addNetworkHandler("vrr.veh.repair", repairVehicle);

    addNetworkHandler("vrr.pedAnim", makePedPlayAnimation);
    addNetworkHandler("vrr.pedStopAnim", makePedStopAnimation);
    addNetworkHandler("vrr.hideAllGUI", hideAllGUI);
    addNetworkHandler("vrr.gameScript", setGameScriptState);
    addNetworkHandler("vrr.clientInfo", serverRequestedClientInfo);
    addNetworkHandler("vrr.interiorLights", updateInteriorLightsState);

    addNetworkHandler("vrr.syncElement", forceSyncElementProperties);
    addNetworkHandler("vrr.elementPosition", setElementPosition);
    addNetworkHandler("vrr.elementCollisions", setElementCollisionsEnabled);
}

// ===========================================================================

function sendResourceReadySignalToServer() {
    triggerNetworkEvent("vrr.clientReady");
}

// ===========================================================================

function sendResourceStartedSignalToServer() {
    triggerNetworkEvent("vrr.clientStarted");
}

// ===========================================================================

function sendResourceStoppedSignalToServer() {
    if(isConnected) {
        triggerNetworkEvent("vrr.clientStopped");
    }
}

// ===========================================================================

function setPlayer2DRendering(hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState) {
    logToConsole(LOG_DEBUG, `[VRR.Main] Updating render states (HUD: ${hudState}, Labels: ${labelState}, Bottom Text: ${smallGameMessageState}, Scoreboard: ${scoreboardState}, HotBar: ${hotBarState}, Item Action Delay: ${itemActionDelayState})`);
    renderHUD = hudState;
    setHUDEnabled(hudState);

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
    triggerNetworkEvent("vrr.useKeyBind", key);
}

// ===========================================================================

function tellServerPlayerArrivedAtJobRouteStop() {
    triggerNetworkEvent("vrr.arrivedAtJobRouteStop");
}

// ===========================================================================

function tellServerItemActionDelayComplete() {
    triggerNetworkEvent("vrr.itemActionDelayComplete");
}

// ===========================================================================

function sendServerClientInfo() {
    triggerNetworkEvent("vrr.clientInfo", `${CLIENT_VERSION_MAJOR}.${CLIENT_VERSION_MINOR}.${CLIENT_VERSION_PATCH}.${CLIENT_VERSION_BUILD}`, game.width, game.height);
}

// ===========================================================================

function sendServerNewAFKStatus(state) {
    triggerNetworkEvent("vrr.afk", state);
}

// ===========================================================================

function playStreamingRadio(url, loop, volume, element = false) {
    //gta.forceRadioChannel(-1);
    if(url == "") {
        if(streamingRadio != null) {
            streamingRadio.stop();
        }
        return true;
    }

    if(streamingRadio != null) {
        streamingRadio.stop();
    }

    // if(element != -1) {
    //    streamingRadioElement = getElementFromId(element);
    //}

    streamingRadioVolume = volume;

    streamingRadio = audio.createSoundFromURL(url, loop);
    streamingRadio.volume = volume/100;
    streamingRadio.play();
}

// ===========================================================================

function stopStreamingRadio() {
    streamingRadio.stop();
    streamingRadio = null;
}

// ===========================================================================

function setStreamingRadioVolume(volume) {
    if(streamingRadio != null) {
        streamingRadioVolume = volume;
        streamingRadio.volume = volume/100;
    }
}

// ===========================================================================

function anchorBoat(vehicleId) {

}

// ===========================================================================

function setEnterPropertyKey(key) {
    enterPropertyKey = key;
}

// ===========================================================================

function makePedPlayAnimation(pedId, animGroup, animId, animType, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition) {
    if(getGame() < VRR_GAME_GTA_IV) {
        if(animType == VRR_ANIMTYPE_ADD) {
            if(getGame() == GAME_GTA_VC || getGame() == GAME_GTA_SA) {
                getElementFromId(pedId).clearAnimations();
            } else {
                getElementFromId(pedId).clearObjective();
            }
            getElementFromId(pedId).addAnimation(animGroup, animId);

            if(getElementFromId(pedId) == localPlayer) {
                inAnimation = true;
                setLocalPlayerControlState(false, false);
                localPlayer.collisionsEnabled = false;
            }
        } else if(animType == VRR_ANIMTYPE_BLEND) {
            getElementFromId(pedId).position = getElementFromId(pedId).position;
            getElementFromId(pedId).blendAnimation(animGroup, animId, animSpeed);
        } else if(animType == VRR_ANIMTYPE_MOVEADD) {
            getElementFromId(pedId).position = getElementFromId(pedId).position;
            getElementFromId(pedId).blendAnimation(animGroup, animId, animSpeed);
        }
    } else {
        natives.requestAnims(animGroup);
        natives.taskPlayAnimNonInterruptable(getElementFromId(pedId), animId, animGroup, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition, -1);
    }
}

// ===========================================================================

function forcePedAnimation(pedId, animGroup, animId, animType, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition) {
    if(getGame() < VRR_GAME_GTA_IV) {
        forcedAnimation = [animGroup, animId];
        setLocalPlayerControlState(false, false);
        getElementFromId(pedId).position = getElementFromId(pedId).position;
        getElementFromId(pedId).addAnimation(animGroup, animId);
    }
}

// ===========================================================================

function hideAllGUI() {
    closeAllWindows();
    setChatWindowEnabled(true);
}

// ===========================================================================

function setGameScriptState(scriptName, state) {
    if(state == VRR_GAMESCRIPT_FORCE) {
        logToConsole(`[VRR.Server] Starting game script '${scriptName}'`);
        gta.startNewScript(scriptName);
    } else if(state == VRR_GAMESCRIPT_DENY) {
        logToConsole(`[VRR.Server] Terminating game script '${scriptName}'`);
        gta.terminateScript(scriptName);
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
    syncElementProperties(getElementFromId(elementId));
}

// ===========================================================================

function setElementPosition(elementId, position) {
    getElementFromId(elementId).position = position;
}

// ===========================================================================

function setElementCollisionsEnabled(elementId, state) {
    getElementFromId(elementId).collisionsEnabled = state;
}

// ===========================================================================

function makePedStopAnimation(pedId) {
    if(getGame() == GAME_GTA_VC || getGame() == GAME_GTA_SA) {
        getElementFromId(pedId).clearAnimations();
    } else {
        getElementFromId(pedId).clearObjective();
    }

    if(getElementFromId(pedId) == localPlayer) {
        localPlayer.collisionsEnabled = true;
        setLocalPlayerControlState(true, false);
    }
}

// ===========================================================================

function setLocalPlayerPedPartsAndProps(parts, props) {
    for(let i in parts) {
        localPlayer.changeBodyPart(parts[0], parts[1], parts[2]);
        localPlayer.changeBodyProp(props[0], props[1]);
    }
}

// ===========================================================================