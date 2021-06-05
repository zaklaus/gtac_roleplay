// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: chatbox.js
// DESC: Provides extra chatbox features
// TYPE: Client (JavaScript)
// ===========================================================================

// ===========================================================================

let chatBoxHistory = [];
let bottomMessageIndex = 0;
let maxChatBoxHistory = 500;

let scrollAmount = 1;
let maxChatBoxLines = 6;

// ===========================================================================

function initChatBoxScript() {
    logToConsole(LOG_DEBUG, "[VRR.ChatBox]: Initializing chatbox script ...");
    bindChatBoxKeys();
    logToConsole(LOG_DEBUG, "[VRR.ChatBox]: Chatbox script initialized!");
}

// ===========================================================================

function bindChatBoxKeys() {
    bindKey(SDLK_PAGEUP, KEYSTATE_DOWN, chatBoxScrollUp);
    bindKey(SDLK_PAGEDOWN, KEYSTATE_DOWN, chatBoxScrollDown);
}

// ===========================================================================

function unBindChatBoxKeys() {
    unbindKey(SDLK_PAGEUP);
    unbindKey(SDLK_PAGEDOWN);
}

// ===========================================================================

function receiveChatBoxMessageFromServer(messageString, colour) {
    message(messageString, colour);
    addToChatBoxHistory(messageString, colour);
    bottomMessageIndex = chatBoxHistory.length-1;
}

// ===========================================================================

function setChatScrollLines(amount) {
    scrollAmount = amount;
}

// ===========================================================================

function addToChatBoxHistory(messageString, colour) {
    chatBoxHistory.push([messageString, colour]);
}

// ===========================================================================

function chatBoxScrollUp() {
    if(bottomMessageIndex > maxChatBoxLines) {
        bottomMessageIndex = bottomMessageIndex-scrollAmount;
        updateChatBox();
    }
}

// ===========================================================================

function chatBoxScrollDown() {
    if(bottomMessageIndex < chatBoxHistory.length-1) {
        bottomMessageIndex = bottomMessageIndex+scrollAmount;
        updateChatBox();
    }
}

// ===========================================================================

function clearChatBox() {
    for(let i = 0 ; i <= maxChatBoxLines ; i++) {
        message("", COLOUR_WHITE);
    }
}

// ===========================================================================

function updateChatBox() {
    clearChatBox();
    for(let i = bottomMessageIndex-maxChatBoxLines ; i <= bottomMessageIndex ; i++) {
        if(typeof chatBoxHistory[i] != "undefined") {
            message(chatBoxHistory[i][0], chatBoxHistory[i][1]);
        } else {
            message("", COLOUR_WHITE);
        }
    }
}

// ===========================================================================