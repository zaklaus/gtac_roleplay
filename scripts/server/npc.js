// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: npc.js
// DESC: Provides NPC usage and functions
// TYPE: Server (JavaScript)
// ===========================================================================

const triggerSource = {
    player,
    npc,
    vehicle,
    business,
    house,
};

// ---------------------------------------------------------------------------

const NPC = {
    Trigger: {
        farProximity,               // Comes within a far distance of NPC
        mediumProximity,            // Comes within a medium distance of NPC
        nearProximity,              // Comes within a close distance of NPC
        enterLineOfSight,           // Enters the NPC's line of sight
        exitLineOfSight,            // Leaves the NPC's line of sight
        pedCollision,               // Bumps into ped on foot
        vehicleCollision,           // Bumps into ped with a vehicle
        shootGun,                   // Shoots a gun (target isn't a factor, it's just about only shooting a gun in general)
        swingMelee,                 // Swings a melee weapon (target doesnt matter, it's just about only swinging a melee weapon in general)
        hotwireVehicleStart,        // Begin attempt to hotwire a vehicle
        hotwireVehicleFail,         // Failed to hotwire a vehicle
        hotwireVehicleSucceed,      // Succeeded at hotwiring a vehicle
        vehicleAlarmStart,          // Vehicle alarm goes off
        vehicleAlarmStop,           // Vehicle alarm shuts off (disabled, battery dead, damaged, or just turned off legitly)
        sirenStart,                 // Any vehicle with a siren that gets activated
        sirenStop,                  // Any vehicle with a siren that gets deactivated
        vehicleEnter,               // Enters any vehicle
        vehicleExit,                // Exits any vehicle
        propertyEnter,              // Enters any interior
        propertyExit,               // Exits any interior
        attackedByMelee,            // Any element is attacked by melee weapon
        attackedByGun,              // Any element is attacked by gun
        attackedByFist,             // Any element is attacked by fist
    },
    Condition: {
        isInLineOfSight,
        isFarProximity,
        isMediumProximity,
        isNearProximity,
        isEnemyClan,
        isAllyClan,
        isSameClan,
        isNotInClan,
        isLawEnforcement,
        isFirefighter,
        isParamedic,
        isCriminal,
        hasWantedLevel,
        isSelfVehicle,
        isPlayerVehicle,
        isOtherVehicle,
        isClanVehicle,
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
        isTalking,
        isShouting,
        isWhispering,
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
        walkToward,
        runToward,
        sprintToward,
        crouch,
        phoneCall,
        walkieTalkieMessage,
        switchRadioStation,
        toggleSiren,
        fleeTo,
        driveTo,
        enterVehicle,
        exitVehicle,
        pullOutOfVehicle,
        enterProperty,
    }
};

// ---------------------------------------------------------------------------

function npcTrigger(triggerName, triggerSource) {

}

// ---------------------------------------------------------------------------