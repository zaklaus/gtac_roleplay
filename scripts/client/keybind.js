// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: keybind.js
// DESC: Provides keybind features
// TYPE: Client (JavaScript)
// ===========================================================================

let lastKeyBindUse = 0;
let keyBindDelayTime = 2500;

// -------------------------------------------------------------------------

function bindAccountKey(key, keyState) {
    bindKey(toInteger(key), keyState, function(event) {
        if(hasKeyBindDelayElapsed()) {
            lastKeyBindUse = sdl.ticks;
            triggerNetworkEvent("ag.useKeyBind", key);
        }
    });
    return false;
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