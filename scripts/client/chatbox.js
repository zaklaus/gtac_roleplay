// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: chatbox.js
// DESC: Provides extra chatbox features
// TYPE: Client (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

let chatBoxHistory = [];
let bottomMessageIndex = 0;
let maxChatBoxHistory = 500;

let scrollAmount = 1;
let maxChatBoxLines = 6;

// ---------------------------------------------------------------------------

bindKey(SDLK_PAGEUP, KEYSTATE_DOWN, chatBoxScrollUp);
bindKey(SDLK_PAGEDOWN, KEYSTATE_DOWN, chatBoxScrollDown);

// ---------------------------------------------------------------------------

addNetworkHandler("ag.m", function(messageString, colour) {
    message(messageString, colour);
    addToChatBoxHistory(messageString, colour);
    bottomMessageIndex = chatBoxHistory.length-1;
});

// ---------------------------------------------------------------------------

function addToChatBoxHistory(messageString, colour) {
    chatBoxHistory.push([messageString, colour]);
}

// ---------------------------------------------------------------------------

function chatBoxScrollUp() {
    if(bottomMessageIndex > maxChatBoxLines) {
        bottomMessageIndex = bottomMessageIndex-scrollAmount;
        updateChatBox();
    }
}

// ---------------------------------------------------------------------------

function chatBoxScrollDown() {
    if(bottomMessageIndex < chatBoxHistory.length-1) {
        bottomMessageIndex = bottomMessageIndex+scrollAmount;
        updateChatBox();
    }
}

// ---------------------------------------------------------------------------

function clearChatBox() {
    for(let i = 0 ; i <= maxChatBoxLines ; i++) {
        message("", COLOUR_WHITE);
    }
}

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------