// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
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
	logToConsole(LOG_DEBUG, "[Asshat.KeyBind]: Initializing key bind script ...");
	logToConsole(LOG_DEBUG, "[Asshat.KeyBind]: Key bind script initialized!");
}

// ===========================================================================

function bindAccountKey(key, keyState) {
    logToConsole(LOG_DEBUG, `[Asshat.KeyBind]: Binded key ${sdl.getKeyName(key)} (${key})`);
    bindKey(toInteger(key), keyState, function(event) {
        if(hasKeyBindDelayElapsed()) {
            if(canLocalPlayerUseKeyBinds()) {
                logToConsole(LOG_DEBUG, `[Asshat.KeyBind]: Using keybind for key ${sdl.getKeyName(key)} (${key})`);
                lastKeyBindUse = sdl.ticks;
                tellServerPlayerUsedKeyBind(key);
            } else {
                logToConsole(LOG_ERROR, `[Asshat.KeyBind]: Failed to use keybind for key ${sdl.getKeyName(key)} (${key}) - Not allowed to use keybinds!`);
            }
        } else {
            logToConsole(LOG_ERROR, `[Asshat.KeyBind]: Failed to use keybind for key ${sdl.getKeyName(key)} (${key}) - Not enough time has passed since last keybind use!`);
        }
    });
}

// ===========================================================================

function unBindAccountKey(key) {
    logToConsole(LOG_DEBUG, `[Asshat.KeyBind]: Unbinded key ${sdl.getKeyName(key)} (${key})`);
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