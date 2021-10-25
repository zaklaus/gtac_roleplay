// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: main.js
// DESC: Main client script (will be reorganized into individual files later)
// TYPE: Client (JavaScript)
// ===========================================================================

let inSphere = false;
let inVehicle = false;
let inVehicleSeat = false;
let isWalking = false;
let isSpawned = false;

let garbageCollectorInterval = null;

let parkedVehiclePosition = false;
let parkedVehicleHeading = false;

let renderHUD = true;
let renderLabels = true;
let renderLogo = true;
let renderSmallGameMessage = true;
let renderScoreBoard = true;
let renderHotBar = true;
let renderItemActionDelay = true;
let renderInteriorLights = true;

let logLevel = LOG_DEBUG;

let weaponDamageEnabled = {};
let weaponDamageEvent = {};

let forceWeapon = 0;
let forceWeaponAmmo = 0;
let forceWeaponClipAmmo = 0;

let drunkEffectAmount = 0;
let drunkEffectDurationTimer = null;

let controlsEnabled = true;

let streamingRadio = null;
let streamingRadioVolume = 50;
let streamingRadioElement = false;

let enterPropertyKey = null;

let inAnimation = false;
let forcedAnimation = null;

let calledDeathEvent = false;

let interiorLightsEnabled = true;
let interiorLightsColour = toColour(0, 0, 0, 150);

let mouseCameraEnabled = false;

let currentPickup = false;

// ===========================================================================