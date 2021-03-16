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

// -------------------------------------------------------------------------

function bindAccountKey(key, keyState) {
    if(keyState == AG_KEYSTATE_UP) {
        bindKey(toInteger(key), KEYSTATE_UP, function(event) {
            if(hasKeyBindDelayElapsed()) {
                lastKeyBindUse = sdl.ticks;
                triggerNetworkEvent("ag.useKeyBind", key);
            }
        });
    } else if(keyState == AG_KEYSTATE_DOWN) {
        bindKey(toInteger(key), KEYSTATE_DOWN, function(event) {
            if(hasKeyBindDelayElapsed()) {
                lastKeyBindUse = sdl.ticks;
                triggerNetworkEvent("ag.useKeyBind", key);
            }
        });
    } else if(keyState == AG_KEYSTATE_HOLDSHORT || keyState == AG_KEYSTATE_HOLDLONG) {
        bindKey(toInteger(key), KEYSTATE_DOWN, function(event) {
            if(hasKeyBindDelayElapsed()) {
                lastKeyBindUse = sdl.ticks;
                keyBindHoldStart = sdl.ticks;
            }
        });
        bindKey(toInteger(key), KEYSTATE_UP, function(event) {
            if(hasKeyBindHoldElapsed(keyState)) {
                keyBindHoldStart = 0;
                triggerNetworkEvent("ag.useKeyBind", key);
            }
        });
    }
}
addNetworkHandler("ag.addKeyBind", bindAccountKey);

// -------------------------------------------------------------------------

function unBindAccountKey(key) {
    unbindKey(key);
    return true;
}
addNetworkHandler("ag.delKeyBind", unBindAccountKey);

// -------------------------------------------------------------------------

function hasKeyBindDelayElapsed() {
    if(sdl.ticks-lastKeyBindUse >= keyBindDelayTime) {
        return true;
    }

    return false;
}

// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------