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
    addNetworkHandler("vrr.mouseCursor", setMouseCursorState);
    addNetworkHandler("vrr.mouseCamera", setMouseCameraState);
    addNetworkHandler("vrr.weaponDamageEnabled", setPlayerWeaponDamageEnabled);
    addNetworkHandler("vrr.weaponDamageEvent", setPlayerWeaponDamageEvent);
    addNetworkHandler("vrr.spawned", onServerSpawnedPlayer);
    addNetworkHandler("vrr.money", setLocalPlayerCash);

    addNetworkHandler("vrr.excludeGroundSnow", excludeModelFromGroundSnow);
    addNetworkHandler("vrr.removeWorldObject", removeWorldObject);

    addNetworkHandler("vrr.delKeyBind", unBindAccountKey);
    addNetworkHandler("vrr.addKeyBind", bindAccountKey);

    addNetworkHandler("vrr.nametag", updatePlayerNameTag);
    addNetworkHandler("vrr.ping", updatePlayerPing);

    addNetworkHandler("vrr.m", receiveChatBoxMessageFromServer);
    addNetworkHandler("vrr.chatScrollLines", setChatScrollLines);

    addNetworkHandler("vrr.radioStream", playStreamingRadio);
    addNetworkHandler("vrr.radioVolume", setStreamingRadioVolume);

    addNetworkHandler("vrr.veh.lights", toggleVehicleLights);
    addNetworkHandler("vrr.veh.engine", toggleVehicleEngine);

    addNetworkHandler("vrr.veh.sync", syncVehicleProperties);
    addNetworkHandler("vrr.civ.sync", syncCivilianProperties);
    addNetworkHandler("vrr.plr.sync", syncPlayerProperties);
    addNetworkHandler("vrr.obj.sync", syncObjectProperties);

    addNetworkHandler("vrr.veh.repair", repairVehicle);

    addNetworkHandler("vrr.pedAnim", makePedPlayAnimation);

    addNetworkHandler("vrr.hideAllGUI", hideAllGUI);
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
        if(gta.game == GAME_GTA_III) {
            gta.SET_PLAYER_NEVER_GETS_TIRED(gta.GET_PLAYER_ID(), 0);
            gta.setGameStat(STAT_PROGRESSMADE, 9999);
            gta.setGameStat(STAT_TOTALPROGRESSINGAME, 9999);
        }

        if(gta.game == GAME_GTA_VC) {
            gta.SET_PLAYER_NEVER_GETS_TIRED(gta.GET_PLAYER_ID(), 0);
            gta.setGameStat(STAT_PROGRESSMADE, 9999);
            gta.setGameStat(STAT_TOTALPROGRESSINGAME, 9999);

            gta.REQUEST_ANIMATION("bikev");
            gta.REQUEST_ANIMATION("bikeh");
            gta.REQUEST_ANIMATION("biked");
            gta.REQUEST_ANIMATION("knife");
            gta.REQUEST_ANIMATION("python");
            gta.REQUEST_ANIMATION("shotgun");
            gta.REQUEST_ANIMATION("buddy");
            gta.REQUEST_ANIMATION("tec");
            gta.REQUEST_ANIMATION("uzi");
            gta.REQUEST_ANIMATION("rifle");
            gta.REQUEST_ANIMATION("m60");
            gta.REQUEST_ANIMATION("sniper");
            gta.REQUEST_ANIMATION("grenade");
            gta.REQUEST_ANIMATION("flame");
            gta.REQUEST_ANIMATION("medic");
            gta.REQUEST_ANIMATION("sunbathe");
            //gta.REQUEST_ANIMATION("playidles");
            gta.REQUEST_ANIMATION("riot");
            gta.REQUEST_ANIMATION("strip");
            gta.REQUEST_ANIMATION("lance");
            gta.REQUEST_ANIMATION("skate");
        }

        if(gta.game == GAME_GTA_SA) {
            gta.setGameStat(STAT_WEAPONTYPE_PISTOL_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_PISTOL_SILENCED_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_DESERT_EAGLE_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_SHOTGUN_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_SAWNOFF_SHOTGUN_SKILL, 1);
            gta.setGameStat(STAT_WEAPONTYPE_SPAS12_SHOTGUN_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_MICRO_UZI_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_MP5_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_AK47_SKILL, 400);
            gta.setGameStat(STAT_WEAPONTYPE_M4_SKILL, 400);
            gta.setGameStat(STAT_DRIVING_SKILL, 9999);
            gta.setGameStat(STAT_FAT, 0);
            gta.setGameStat(STAT_ENERGY, 9999);
            gta.setGameStat(STAT_CYCLE_SKILL, 9999);
            gta.setGameStat(STAT_BIKE_SKILL, 9999);
            gta.setGameStat(STAT_GAMBLING, 9999);
            gta.setGameStat(STAT_PROGRESS_MADE, 9999);
            gta.setGameStat(STAT_RESPECT, 0);
            gta.setGameStat(STAT_RESPECT_TOTAL, 0);
            gta.setGameStat(STAT_SEX_APPEAL, 0);
            gta.setGameStat(STAT_STAMINA, 9999);
            gta.setGameStat(STAT_TOTAL_PROGRESS, 100);
            gta.setGameStat(STAT_UNDERWATER_STAMINA, 9999);
            gta.setGameStat(STAT_BODY_MUSCLE, 0);
        }

        if(getGame() == VRR_GAME_GTA_IV) {
            natives.allowEmergencyServices(false);
			natives.setCreateRandomCops(false);
			natives.setMaxWantedLevel(0);
			natives.setWantedMultiplier(0.0);
			natives.allowPlayerToCarryNonMissionObjects(natives.getPlayerId(), true);

			natives.setPlayerTeam(natives.getPlayerId(), 0);
			natives.usePlayerColourInsteadOfTeamColour(true);
            natives.requestAnims("DANCING");
            natives.loadAllObjectsNow();
        }
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
    triggerNetworkEvent("vrr.clientInfo", `${CLIENT_VERSION_MAJOR}.${CLIENT_VERSION_MINOR}.${CLIENT_VERSION_PATCH}.${CLIENT_VERSION_BUILD}`, gta.width, gta.height);
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
            getElementFromId(pedId).addAnimation(animGroup, animId);
        } else if(animType == VRR_ANIMTYPE_BLEND) {
            getElementFromId(pedId).blendAnimation(animGroup, animId, animSpeed);
        }
    } else {
        natives.requestAnims(animGroup);
        natives.taskPlayAnimNonInterruptable(getElementFromId(pedId), animId, animGroup, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition, -1);
    }
}

// ===========================================================================

function hideAllGUI() {
    closeAllWindows();
    setChatWindowEnabled(true);
}

// ===========================================================================