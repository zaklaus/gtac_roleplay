// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: afk.js
// DESC: Provides AFK detection
// TYPE: Client (JavaScript)
// ===========================================================================

let lastKeyBindUse = 0;
let keyBindDelayTime = 2000;

// ----------------------------------------------------------------------------

function bindAccountKey(key, keyState) {
    bindKey(toInteger(key), keyState, function(event) {
        if(hasKeyBindDelayElapsed()) {
            triggerNetworkEvent("ag.keybind.trig", key);
            lastKeyBindUse = sdl.ticks;
        }
    });
    return false;
}
addNetworkHandler("ag.keybinds.add", bindAccountKey);

// ----------------------------------------------------------------------------

function unBindAccountKey(key) {
    unbindKey(key);
    return true;
}
addNetworkHandler("ag.keybinds.del", unBindAccountKey);

// ----------------------------------------------------------------------------

function hasKeyBindDelayElapsed() {
    if(sdl.ticks-lastKeyBindUse >= keyBindDelayTime) {
        return true;
    }

    return false;
}

// ----------------------------------------------------------------------------