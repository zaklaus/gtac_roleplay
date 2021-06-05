// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: job.js
// DESC: Provides job functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

let localPlayerJobType = 0;
let localPlayerWorking = false;
let jobRouteStopBlip = null;
let jobRouteStopSphere = null;

// ===========================================================================

function initJobScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Job]: Initializing job script ...");
	logToConsole(LOG_DEBUG, "[Asshat.Job]: Job script initialized!");
}

// ===========================================================================

function setLocalPlayerJobType(tempJobType) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Set local player job type to ${tempJobType}`);
    localPlayerJobType = tempJobType;
}

// ===========================================================================

function setLocalPlayerWorkingState(tempWorking) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Setting working state to ${tempWorking}`);
    localPlayerWorking = tempWorking;
}

// ===========================================================================

function showJobRouteStop() {
    logToConsole(LOG_DEBUG, `[Asshat.Job] Showing route stop`);
    if(gta.game == GAME_GTA_SA) {
        jobRouteStopSphere = gta.createPickup(1318, position, 1);
    } else {
        jobRouteStopSphere = gta.createSphere(position, 3);
        jobRouteStopSphere.colour = colour;
    }

    jobRouteStopBlip = gta.createBlip(position, 0, 2, colour);
}

// ===========================================================================

function showJobRouteStop(position, colour) {
    logToConsole(LOG_DEBUG, `[Asshat.Job] Showing route stop`);
    if(gta.game == GAME_GTA_SA) {
        jobRouteStopSphere = gta.createPickup(1318, position, 1);
    } else {
        jobRouteStopSphere = gta.createSphere(position, 3);
        jobRouteStopSphere.colour = colour;
    }

    jobRouteStopBlip = gta.createBlip(position, 0, 2, colour);
}

// ===========================================================================

function enteredJobRouteSphere() {
    logToConsole(LOG_DEBUG, `[Asshat.Job] Entered job route sphere`);
    tellServerPlayerArrivedAtJobRouteStop();
    destroyElement(jobRouteStopSphere);
    destroyElement(jobRouteStopBlip);
    jobRouteStopSphere = null;
    jobRouteStopBlip = null;
}

// ===========================================================================