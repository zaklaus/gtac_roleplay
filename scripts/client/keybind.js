// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: keybind.js
// DESC: Provides keybind features
// TYPE: Client (JavaScript)
// ===========================================================================

let lastKeyBindUse = 0;
let keyBindDelayTime = 500;
let keyBindShortHoldDuration = 500;
let keyBindLongHoldDuration = 1500;

// ===========================================================================

function initKeyBindScript() {
	logToConsole(LOG_DEBUG, "[VRR.KeyBind]: Initializing key bind script ...");
	logToConsole(LOG_DEBUG, "[VRR.KeyBind]: Key bind script initialized!");
}

// ===========================================================================

function bindAccountKey(key, keyState) {
    logToConsole(LOG_DEBUG, `[VRR.KeyBind]: Binded key ${sdl.getKeyName(key)} (${key})`);
    bindKey(toInteger(key), keyState, function(event) {
        if(hasKeyBindDelayElapsed()) {
            if(canLocalPlayerUseKeyBinds()) {
                logToConsole(LOG_DEBUG, `[VRR.KeyBind]: Using keybind for key ${sdl.getKeyName(key)} (${key})`);
                lastKeyBindUse = sdl.ticks;
                tellServerPlayerUsedKeyBind(key);
            } else {
                logToConsole(LOG_ERROR, `[VRR.KeyBind]: Failed to use keybind for key ${sdl.getKeyName(key)} (${key}) - Not allowed to use keybinds!`);
            }
        } else {
            logToConsole(LOG_ERROR, `[VRR.KeyBind]: Failed to use keybind for key ${sdl.getKeyName(key)} (${key}) - Not enough time has passed since last keybind use!`);
        }
    });
}

// ===========================================================================

function unBindAccountKey(key) {
    logToConsole(LOG_DEBUG, `[VRR.KeyBind]: Unbinded key ${sdl.getKeyName(key)} (${key})`);
    unbindKey(key);
    return true;
}

// ===========================================================================

function hasKeyBindDelayElapsed() {
    if(sdl.ticks-lastKeyBindUse >= keyBindDelayTime) {
        return true;
    }

    return false;
}

// ===========================================================================

function canLocalPlayerUseKeyBinds() {
    return true; //(!usingSkinSelector && isSpawned && !itemActionDelayEnabled);
}

// ===========================================================================