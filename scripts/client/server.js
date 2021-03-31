// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: server.js
// DESC: Provides server communication and cross-endpoint operations
// TYPE: Client (JavaScript)
// ===========================================================================

function initServerScript() {
    logToConsole(LOG_DEBUG, "[Asshat.Server]: Initializing server script ...");
    addAllNetworkHandlers();
    logToConsole(LOG_DEBUG, "[Asshat.Server]: Server script initialized!");
}

// ===========================================================================

function addAllNetworkHandlers() {
    logToConsole(LOG_DEBUG, "[Asshat.Server]: Adding network handlers ...");

    addNetworkHandler("ag.smallGameMessage", showSmallGameMessage);
    addNetworkHandler("ag.working", setLocalPlayerWorkingState);
    addNetworkHandler("ag.jobType", setLocalPlayerJobType);
    addNetworkHandler("ag.passenger", enterVehicleAsPassenger);
    addNetworkHandler("ag.passenger", enterVehicleAsPassenger);

    addNetworkHandler("ag.freeze", setLocalPlayerFrozenState);
    addNetworkHandler("ag.control", setLocalPlayerControlState);
    addNetworkHandler("ag.fadeCamera", fadeLocalCamera);
    addNetworkHandler("ag.removeFromVehicle", removeLocalPlayerFromVehicle);
    addNetworkHandler("ag.clearPeds", clearLocalPlayerOwnedPeds);
    addNetworkHandler("ag.restoreCamera", restoreLocalCamera);
    addNetworkHandler("ag.cameraLookAt", setLocalCameraLookAt);
    addNetworkHandler("ag.logo", setServerLogoRenderState);
    addNetworkHandler("ag.ambience", setCityAmbienceState);
    addNetworkHandler("ag.runCode", runClientCode);
    addNetworkHandler("ag.clearWeapons", clearLocalPlayerWeapons);
    addNetworkHandler("ag.giveWeapon",  giveLocalPlayerWeapon);
    addNetworkHandler("ag.position", setLocalPlayerPosition);
    addNetworkHandler("ag.heading", setLocalPlayerHeading);
    addNetworkHandler("ag.interior", setLocalPlayerInterior);

    addNetworkHandler("ag.showRouteStop", showJobRouteStop);
    addNetworkHandler("ag.snow", setSnowState);
    addNetworkHandler("ag.health", setLocalPlayerHealth);
    addNetworkHandler("ag.skinSelect", toggleSkinSelect);
    addNetworkHandler("ag.hotbar", updatePlayerHotBar);
    addNetworkHandler("ag.pedSpeech", playPedSpeech);
    addNetworkHandler("ag.clearPedState", clearLocalPedState);
    addNetworkHandler("ag.drunkEffect", setLocalPlayerDrunkEffect);
    addNetworkHandler("ag.showItemActionDelay", showItemActionDelay);
    addNetworkHandler("ag.set2DRendering", setPlayer2DRendering);
    addNetworkHandler("ag.mouseCursor", setMouseCursorState);
    addNetworkHandler("ag.mouseCamera", setMouseCameraState);
    addNetworkHandler("ag.weaponDamageEnabled", setPlayerWeaponDamageEnabled);
    addNetworkHandler("ag.weaponDamageEvent", setPlayerWeaponDamageEvent);
    addNetworkHandler("ag.spawned", onServerSpawnedPlayer);
    addNetworkHandler("ag.money", setLocalPlayerCash);

    addNetworkHandler("ag.excludeGroundSnow", excludeModelFromGroundSnow);
    addNetworkHandler("ag.removeWorldObject", removeWorldObject);

    addNetworkHandler("ag.delKeyBind", unBindAccountKey);
    addNetworkHandler("ag.addKeyBind", bindAccountKey);

    addNetworkHandler("ag.nametag", updatePlayerNameTag);
    addNetworkHandler("ag.ping", updatePlayerPing);
}

// ===========================================================================

function sendResourceReadySignalToServer() {
    triggerNetworkEvent("ag.clientReady");
}

// ===========================================================================

function sendResourceStartedSignalToServer() {
    triggerNetworkEvent("ag.clientStarted");
}

// ===========================================================================

function sendResourceStoppedSignalToServer() {
    triggerNetworkEvent("ag.clientStopped");
}

// ===========================================================================

function setPlayer2DRendering(hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Updating render states (HUD: ${hudState}, Labels: ${labelState}, Bottom Text: ${smallGameMessageState}, Scoreboard: ${scoreboardState}, HotBar: ${hotBarState}, Item Action Delay: ${itemActionDelayState})`);
    renderHUD = hudState;
    setHUDEnabled(hudState);

    renderLabels = labelState;
    renderSmallGameMessage = smallGameMessageState;
    renderScoreboard = scoreboardState;
    renderHotBar = hotBarState;
    renderItemActionDelay = itemActionDelayState;
}

// ===========================================================================

function onServerSpawnedPlayer(client, state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting spawned state to ${state}`);
    isSpawned = state;
    if(state) {
        if(gta.game == GTA_GAME_III || gta.game == GTA_GAME_VC) {
            gta.SET_PLAYER_NEVER_GETS_TIRED(gta.GET_PLAYER_ID(), 0);
            gta.setGameStat(STAT_PROGRESSMADE, 9999);
            gta.setGameStat(STAT_TOTALPROGRESSINGAME, 9999);
        }

        if(gta.game == GTA_GAME_SA) {
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
    }
}

// ===========================================================================

function tellServerPlayerUsedKeyBind(key) {
    triggerNetworkEvent("ag.useKeyBind", key);
}

// ===========================================================================

function tellServerPlayerArrivedAtJobRouteStop() {
    triggerNetworkEvent("ag.arrivedAtBusStop");
}

// ===========================================================================

function tellServerItemActionDelayComplete() {
    triggerNetworkEvent("ag.itemActionDelayComplete");
}

// ===========================================================================

function sendServerNewAFKStatus(state) {
    triggerNetworkEvent("ag.afk", state);
}

// ===========================================================================