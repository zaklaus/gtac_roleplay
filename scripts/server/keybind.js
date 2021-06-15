// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: keybind.js
// DESC: Provides keybind handlers and functions
// TYPE: Server (JavaScript)
// ===========================================================================

let bindableKeys = {
    SDLK_BACKSPACE: "backspace",
    SDLK_TAB: "tab",
    SDLK_RETURN: "return",
    SDLK_ESCAPE: "escape",
    SDLK_SPACE: "space",
    SDLK_EXCLAIM: "exclamation",
    SDLK_QUOTEDBL: "doublequote",
    SDLK_HASH: "hashtag",
    SDLK_DOLLAR: "dollar",
    SDLK_PERCENT: "percent",
    SDLK_AMPERSAND: "ampersand",
    SDLK_QUOTE: "quote",
    SDLK_LEFTPAREN: "leftparenthesis",
    SDLK_RIGHTPAREN: "rightparenthesis",
    SDLK_ASTERISK: "asterisk",
    SDLK_PLUS: "plus",
    SDLK_COMMA: "comma",
    SDLK_MINUS: "minus",
    SDLK_PERIOD: "period",
    SDLK_SLASH: "slash",
    SDLK_0: "0",
    SDLK_1: "1",
    SDLK_2: "2",
    SDLK_3: "3",
    SDLK_4: "4",
    SDLK_5: "5",
    SDLK_6: "6",
    SDLK_7: "7",
    SDLK_8: "8",
    SDLK_9: "9",
    SDLK_COLON: "colon",
    SDLK_SEMICOLON: "semicolon",
    SDLK_LESS: "less",
    SDLK_EQUALS: "equals",
    SDLK_GREATER: "greater",
    SDLK_QUESTION: "questionmark",
    SDLK_AT: "at",
    SDLK_LEFTBRACKET: "leftbracket",
    SDLK_BACKSLASH: "backslash",
    SDLK_RIGHTBRACKET: "rightbracket",
    SDLK_UNDERSCORE: "underscore",
    SDLK_a: "a",
    SDLK_b: "b",
    SDLK_c: "c",
    SDLK_d: "d",
    SDLK_e: "e",
    SDLK_f: "f",
    SDLK_g: "g",
    SDLK_h: "h",
    SDLK_i: "i",
    SDLK_j: "j",
    SDLK_k: "k",
    SDLK_l: "l",
    SDLK_m: "m",
    SDLK_n: "n",
    SDLK_o: "o",
    SDLK_p: "p",
    SDLK_q: "q",
    SDLK_r: "r",
    SDLK_s: "s",
    SDLK_t: "t",
    SDLK_u: "u",
    SDLK_v: "v",
    SDLK_w: "w",
    SDLK_x: "x",
    SDLK_y: "y",
    SDLK_z: "z",
    SDLK_DELETE: "delete",
    SDLK_CAPSLOCK: "capslock",
    SDLK_F1: "f12",
    SDLK_F2: "f2",
    SDLK_F3: "f3",
    SDLK_F4: "f4",
    SDLK_F5: "f5",
    SDLK_F6: "f6",
    SDLK_F7: "f7",
    SDLK_F8: "f8",
    SDLK_F9: "f9",
    SDLK_F10: "f10",
    SDLK_F11: "f11",
    SDLK_F12: "f12",
    SDLK_PRINTSCREEN: "printscreen",
    SDLK_SCROLLLOCK: "scrolllock",
    SDLK_PAUSE: "pause",
    SDLK_INSERT: "insert",
    SDLK_HOME: "home",
    SDLK_PAGEUP: "pageup",
    SDLK_END: "end",
    SDLK_PAGEDOWN: "pagedown",
    SDLK_RIGHT: "right",
    SDLK_LEFT: "left",
    SDLK_DOWN: "down",
    SDLK_UP: "up",
    SDLK_KP_DIVIDE: "numdivide",
    SDLK_KP_MULTIPLY: "nummultiply",
    SDLK_KP_MINUS: "numminus",
    SDLK_KP_PLUS: "numplus",
    SDLK_KP_ENTER: "numenter",
    SDLK_KP_1: "num1",
    SDLK_KP_2: "num2",
    SDLK_KP_3: "num3",
    SDLK_KP_4: "num4",
    SDLK_KP_5: "num5",
    SDLK_KP_6: "num6",
    SDLK_KP_7: "num7",
    SDLK_KP_8: "num8",
    SDLK_KP_9: "num9",
    SDLK_KP_0: "num0",
    SDLK_KP_PERIOD: "numperiod",
    SDLK_LCTRL: "leftctrl",
    SDLK_LSHIFT: "leftshift",
    SDLK_LALT: "leftalt",
    SDLK_RCTRL: "rightctrl",
    SDLK_RSHIFT: "rightshift",
    SDLK_RALT: "rightalt",
};

// ===========================================================================

function initKeyBindScript() {
	logToConsole(LOG_INFO, "[VRR.KeyBind]: Initializing key bind script ...");
    getGlobalConfig().keyBind = loadKeyBindConfiguration();
	logToConsole(LOG_INFO, "[VRR.KeyBind]: Key bind script initialized!");
}

// ===========================================================================

function addKeyBindCommand(command, params, client) {
    let splitParams = params.split(" ");

    let keyId = getKeyIdFromParams(splitParams[0]);
    let tempCommand = splitParams[1];
    let tempParams = (splitParams.length > 2) ? splitParams.slice(2).join(" ") : "";

    if(!keyId) {
        messagePlayerError(client, "The key ID or name you input is invalid!");
        messagePlayerTip(client, "Use simple key names, letters, or numbers. Don't add spaces.");
        messagePlayerInfo(client, "Examples: ${getInlineChatColourByName("lightGrey")}1, 2, a, b, numplus, num1, f1, f2, pageup, delete, insert, rightshift, leftctrl");
        return false;
    }

    if(!keyId) {
        messagePlayerError(client, "That key name/id is invalid!");
        return false;
    }

    if(areParamsEmpty(tempCommand)) {
        messagePlayerSyntax(client, getCommandSyntaxText(command));
        return false;
    }

    addPlayerKeyBind(keyId, tempCommand, tempParams);
    messagePlayerSuccess(client, `You binded the ${getInlineChatColourByName("lightGrey")}${sdl.getKeyName(keyId)} ${getInlineChatColourByName("white")}key to command: ${getInlineChatColourByName("lightGrey")}/${tempCommand} ${tempParams}`);
}

// ===========================================================================

function removeKeyBindCommand(command, params, client) {
    let splitParams = params.split(" ");

    let keyId = getKeyIdFromParams(splitParams[0]);

    if(!keyId) {
        messagePlayerError(client, "The key ID or name you input is invalid!");
        messagePlayerTip(client, "Use simple key names, letters, or numbers. Don't add spaces.");
        messagePlayerInfo(client, "Examples: ${getInlineChatColourByName("lightGrey")}1, 2, a, b, numplus, num1, f1, f2, pageup, delete, insert, rightshift, leftctrl");
        return false;
    }

    if(!keyId) {
        messagePlayerError(client, "That key name/id is invalid!");
        return false;
    }

    removePlayerKeyBind(client, keyId);
    messagePlayerSuccess(client, `You removed the keybind for the ${getInlineChatColourByName("lightGrey")}${sdl.getKeyName(keyId)} ${getInlineChatColourByName("white")}key`);
}

// ===========================================================================

function addPlayerKeyBind(client, keyId, tempCommand, tempParams) {
    let keyBindData = new serverClasses.keyBindData(keyId, `${tempCommand} ${tempParams}`);
    getPlayerData(client).accountData.keyBinds.push(keyBindData);
    sendAddAccountKeyBindToClient(client, getPlayerKeyBindForKey(client, keyId));
}

// ===========================================================================

function removePlayerKeyBind(client, keyId) {
    quickDatabaseQuery(`DELETE FROM acct_hotkey WHERE acct_hotkey_acct = ${getPlayerData(client).accountData.databaseId} AND acct_hotkey_key = ${keyId}`);
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].key == keyId) {
            accountKeyBinds.splice(i, 1);
        }
    }
    sendRemoveAccountKeyBindToClient(client, keyId);
}

// ===========================================================================

function doesPlayerHaveKeyBindForCommand(client, command) {
    let accountKeyBinds = getPlayerData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(toLowerCase(accountKeyBinds[i].commandString.split(" ")[0]) == toLowerCase(command)) {
            return true;
        }
    }
    return false;
}

// ===========================================================================

function getPlayerKeyBindForCommand(client, command) {
    let accountKeyBinds = getPlayerData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(toLowerCase(accountKeyBinds[i].commandString.split(" ")[0]) == toLowerCase(command)) {
            return accountKeyBinds[i];
        }
    }
    return false;
}

// ===========================================================================

function doesPlayerHaveKeyBindForKey(client, key) {
    let accountKeyBinds = getPlayerData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].key == key) {
            return true;
        }
    }
    return false;
}

// ===========================================================================

function getPlayerKeyBindForKey(client, key) {
    let accountKeyBinds = getPlayerData(client).accountData.keyBinds;
    for(let i in accountKeyBinds) {
        if(accountKeyBinds[i].key == key) {
            return accountKeyBinds[i];
        }
    }
    return false;
}

// ===========================================================================

function playerUsedKeyBind(client, key) {
    if(!isPlayerLoggedIn(client)) {
        return false;
    }

    if(!isPlayerSpawned(client)) {
        return false;
    }

    logToConsole(LOG_DEBUG, `[VRR.KeyBind] ${getPlayerDisplayForConsole(client)} used keybind ${sdl.getKeyName(key)} (${key})`);
    if(doesPlayerHaveKeyBindForKey(client, key)) {
        let keyBindData = getPlayerKeyBindForKey(client, key);
        if(keyBindData.enabled) {
            let splitCommandString = keyBindData.commandString.split(" ");
            let tempCommand = splitCommandString[0];
            let tempParams = "";
            if(splitCommandString.length > 1) {
                tempParams = splitCommandString.slice(1).join(" ");
            }
            getCommand(toLowerCase(tempCommand)).handlerFunction(tempCommand, tempParams, client);
            //triggerEvent("OnPlayerCommand", null, tempCommand, tempParams, client);
        }
    }
}

// ===========================================================================

function sendAccountKeyBindsToClient(client) {
    for(let i in getPlayerData(client).accountData.keyBinds) {
        sendAddAccountKeyBindToClient(client, getPlayerData(client).accountData.keyBinds[i].key, getPlayerData(client).accountData.keyBinds[i].keyState);
    }
}

// ===========================================================================

function getKeyIdFromParams(params) {
    let tempParams = toLowerCase(toString(params));

    let sdlName = sdl.getKeyFromName(tempParams);
    if(sdlName != null) {
        return sdlName;
    }

    for(let i in bindableKeys) {
        if(bindableKeys[i].indexOf(tempParams)) {
            return i;
        }
    }
}

// ===========================================================================

function loadKeyBindConfiguration() {
	let keyBindConfigFile = loadTextFile("config/keybind.json");
	return JSON.parse(keyBindConfigFile);
}

// ===========================================================================