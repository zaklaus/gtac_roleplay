// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: tutorial.js
// DESC: Provides tutorial functions and features
// TYPE: Server (JavaScript)
// ===========================================================================

let tutorialSpawn = [
    false,
    [new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0],
    [new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0],
    [new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0],
    [new Vec3(0.0, 0.0, 0.0), 0.0],
    [new Vec3(0.0, 0.0, 0.0), 0.0, 0, 0],
];

let tutorialVehicle = [
    false,
    [111, new Vec3(0.0, 0.0, 0.0)],
    [175, new Vec3(0.0, 0.0, 0.0), 0.0],
    [445, new Vec3(0.0, 0.0, 0.0), 0.0],
    [445, new Vec3(0.0, 0.0, 0.0), 0.0],
    [0, new Vec3(0.0, 0.0, 0.0), 0.0],
];

let tutorialItem = [
    false,
    [new Vec3(0.0, 0.0, 0.0)],
    [new Vec3(0.0, 0.0, 0.0), 0.0],
    [new Vec3(0.0, 0.0, 0.0), 0.0],
    [new Vec3(0.0, 0.0, 0.0), 0.0],
    [new Vec3(0.0, 0.0, 0.0), 0.0],
];

// ---------------------------------------------------------------------------

function startTutorial(client) {
    getPlayerData(client).tutorialItem = createGroundItem(tutorialItem[0], tutorialItem[1], tutorialItem[3]);
    getPlayerData(client).tutorialVehicle = createGroundItem(tutorialItem[0], tutorialItem[1], tutorialItem[3]);
}

// ---------------------------------------------------------------------------

function hasPlayerFinishedTutorial(client) {

}

// ---------------------------------------------------------------------------

function isPlayerInTutorial(client) {

}

// ---------------------------------------------------------------------------