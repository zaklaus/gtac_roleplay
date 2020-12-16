// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: keybind.js
// DESC: Provides keybind handlers and functions
// TYPE: Server (JavaScript)
// ===========================================================================

function initKeyBindScript() {
	console.log("[Asshat.KeyBind]: Initializing key bind script ...");
	console.log("[Asshat.KeyBind]: Key bind script initialized!");
}

// ---------------------------------------------------------------------------

function doesPlayerHaveKeyBindForCommand(client, command) {
    let accountKeyBinds = getClientData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].command == command) {
            return true;
        }
    }
    return false;
}

// ---------------------------------------------------------------------------

function getPlayerKeyBindForCommand(client, command) {
    let accountKeyBinds = getClientData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].command == command) {
            return accountKeyBinds[i];
        }
    }
    return false;
}

// ---------------------------------------------------------------------------

function doesPlayerHaveKeyBindForKey(client, key) {
    let accountKeyBinds = getClientData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].key == key) {
            return true;
        }
    }
    return false;
}

// ---------------------------------------------------------------------------

function getPlayerKeyBindForKey(client, key) {
    let accountKeyBinds = getClientData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].key == key) {
            return accountKeyBinds[i];
        }
    }
    return false;
}

// ---------------------------------------------------------------------------

function playerUsedKeyBind(client, key) {
    if(doesPlayerHaveKeyBindForKey(client, key)) {
        let keyBindData = getPlayerKeyBindForKey(client, key);
        if(keyBindData.enabled) {
            getCommand(keyBindData.command).handlerFunction(keyBindData.command, keyBindData.params, client);
        }
    }
}

// ---------------------------------------------------------------------------