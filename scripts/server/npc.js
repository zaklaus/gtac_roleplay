// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: npc.js
// DESC: Provides NPC usage and functions
// TYPE: Server (JavaScript)
// ===========================================================================

const NPC = {
    Trigger: {
        farProximity,
        mediumProximity,
        nearProximity,
        enterLineOfSight,
        exitLineOfSight,
        pedCollision,
        vehicleCollision,
        shootGun,
        swingMelee,
        stealOccupiedVehicle,
        stealUnoccupiedVehicle,
        hotwireVehicleStart,
        hotwireVehicleFail,
        hotwireVehicleSucceed,
        vehicleAlarmStart,
        varAlarmStop,
        sirenStart,
        sirenStop,
        vehicleEnter,
        vehicleExit,
        interiorEnter,
        interiorExit,
        attackedByMelee,
        attackedByGun
    },
    Condition: {
        isInLineOfSight,
        isFarProximity,
        isMediumProximity,
        isNearProximity,
        isEnemyFaction,
        isAllyFaction,
        isSameFaction,
        isSameClan,
        isLawEnforcement,
        isCriminal,
        hasWantedLevel,
        isSelfVehicle,
        isOtherVehicle,
        isEmergencyVehicle,
        isPoliceVehicle,
        isDriver,
        isInFrontSeat,
        isInSeatId,
        vehicleLocked,
        vehicleHotwired,
        isPistol,
        isShotgun,
        isAutomatic,
        isRifle,
        isAssaultRifle,
        isSniper,
        isRPG,
        isFlameThrower,
    },
    Response: {
        shout,
        talk,
        whisper,
        switchWeapon,
        shootWeapon,
        aimWeapon,
        fleeSprint,
        fleeWalk,
        fleeRun,
        attackMelee,
        attackFist,
        runToward,
        crouch,
        phoneCall,
        walkieTalkieMessage,
        switchRadioStation,
        toggleSiren,
        fleeTo,
        driveTo,
        enterVehicle,
    }
};

function beginNPCInteraction() {
    
}