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
            lastKeyBindUse = sdl.ticks;
            tellServerPlayerUsedKeyBind(key);
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

function hasKeyBindHoldElapsed(keyState) {
    let holdDuration = AG_KEYSTATE_HOLDSHORT
    if(keyState == AG_KEYSTATE_HOLDLONG) {
        holdDuration = keyBindLongHoldDuration;
    }

    if(sdl.ticks-keyBindHoldStart >= holdDuration) {
        return true;
    }

    return false;
}

// ===========================================================================