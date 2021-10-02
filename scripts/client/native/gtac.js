// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: gtac.js
// DESC: Provides natives for GTA Connected
// TYPE: Client (JavaScript)
// ===========================================================================

function setUpInitialGame() {
    if(gta.game == GAME_GTA_III) {
        gta.SET_PLAYER_NEVER_GETS_TIRED(gta.GET_PLAYER_ID(), 0);
        gta.setGameStat(STAT_PROGRESSMADE, 9999);
        gta.setGameStat(STAT_TOTALPROGRESSINGAME, 9999);
    }

    if(gta.game == GAME_GTA_VC) {
        gta.SET_PLAYER_NEVER_GETS_TIRED(gta.GET_PLAYER_ID(), 0);
        gta.setGameStat(STAT_PROGRESSMADE, 0);
        gta.setGameStat(STAT_TOTALPROGRESSINGAME, 0);

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

        gta.LOAD_ALL_MODELS_NOW();
        
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

       //closeAllGarages();

       if(getGame() == GAME_GTA_SA) {
        gta.setDefaultInteriors(false);
    }

    gta.onMission = true;
}

// ===========================================================================

function processGameSpecifics() {
    if(gta.game != GAME_GTA_IV) {
        gta.clearMessages();
    }

    destroyAutoCreatedPickups();
}

// ===========================================================================