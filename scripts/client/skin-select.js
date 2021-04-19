// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: skin-select.js
// DESC: Provides skin-selector functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

let skinSelectMessageFontTop = null;
let skinSelectMessageFontBottom = null;
let skinSelectMessageTextTop = "Skin Name";
let skinSelectMessageTextBottom = "Choose a skin using LEFT and RIGHT arrows. Use ENTER to finish or BACKSPACE to cancel.";
let skinSelectMessageColourTop = COLOUR_YELLOW;
let skinSelectMessageColourBottom = COLOUR_WHITE;

let usingSkinSelector = false;
let usingNewCharacterSkinSelector = false;
let skinSelectorIndex = 0;

let newCharacterSkinSelectPedPosition = [
	[],
	[139.54, -903.00, 26.16],
	[-379.16, -535.27, 17.28],
	[2495.03, -1685.66, 13.51],
	[904.27, -498.00, 14.522],
];

let newCharacterSkinSelectPedHeading = [
	[],
	[15.0],
	[0.0],
	[0.01],
	[3.127],
];

// ===========================================================================

function initSkinSelectScript() {
	logToConsole(LOG_DEBUG, "[Asshat.SkinSelect]: Initializing skin selector script ...");
	skinSelectMessageFontTop = loadSkinSelectMessageFontTop();
	skinSelectMessageFontBottom = loadSkinSelectMessageFontBottom();
	logToConsole(LOG_DEBUG, "[Asshat.SkinSelect]: Skin selector script initialized!");
}

// ===========================================================================

function loadSkinSelectMessageFontTop() {
	return lucasFont.createDefaultFont(20.0, "Roboto");
}

// ===========================================================================

function loadSkinSelectMessageFontBottom() {
	return lucasFont.createDefaultFont(12.0, "Roboto", "Light");
}

// ===========================================================================

function processSkinSelectKeyPress(keyCode) {
	if(usingSkinSelector) {
        if(keyCode == SDLK_RIGHT) {
            if(allowedSkins.length-1 == skinSelectorIndex) {
                skinSelectorIndex = 0;
            } else {
                skinSelectorIndex++;
            }
            localPlayer.skin = allowedSkins[skinSelectorIndex][0];
            skinSelectMessageTextTop = allowedSkins[skinSelectorIndex][1];
        } else if(keyCode == SDLK_LEFT) {
            if(skinSelectorIndex <= 0) {
                skinSelectorIndex = allowedSkins.length-1;
            } else {
                skinSelectorIndex--;
            }
            localPlayer.skin = allowedSkins[skinSelectorIndex][0];
            skinSelectMessageTextTop = allowedSkins[skinSelectorIndex][1];
        } else if(keyCode == SDLK_RETURN) {
            triggerNetworkEvent("ag.skinSelected", skinSelectorIndex);
        } else if(keyCode == SDLK_BACKSPACE) {
            triggerNetworkEvent("ag.skinSelected", -1);
        }
    }
}

// ===========================================================================

function processSkinSelectRendering() {
	if(usingSkinSelector) {
        if(skinSelectMessageFontTop != null && skinSelectMessageFontBottom != null) {
            skinSelectMessageFontTop.render(skinSelectMessageTextTop, [0, gta.height-100], gta.width, 0.5, 0.0, skinSelectMessageFontTop.size, skinSelectMessageColourTop, true, true, false, true);
            skinSelectMessageFontBottom.render(skinSelectMessageTextBottom, [0, gta.height-65], gta.width, 0.5, 0.0, skinSelectMessageFontBottom.size, skinSelectMessageColourBottom, true, true, false, true);
        }

        localPlayer.position = skinSelectPosition;
        localPlayer.heading = skinSelectHeading;
        localPlayer.clearObjective();
    }
}

// ===========================================================================

function toggleSkinSelect(state) {
    if(state) {
        skinSelectorIndex = getAllowedSkinDataBySkinId(localPlayer.skin);
        if(localPlayer.skin != allowedSkins[skinSelectorIndex][0]) {
            localPlayer.skin = allowedSkins[skinSelectorIndex][0];
        }
        usingSkinSelector = true;
        let frontCameraPosition = getPosInFrontOfPos(localPlayer.position, localPlayer.heading, 5);
        gta.setCameraLookAt(frontCameraPosition, localPlayer.position, true);
        gui.showCursor(true, false);
        localPlayer.invincible = true;
        localPlayer.setProofs(true, true, true, true, true);
        localPlayer.collisionsEnabled = false;
        skinSelectPosition = localPlayer.position;
        skinSelectHeading = localPlayer.heading;
    } else {
        usingSkinSelector = false;
        //gta.restoreCamera(true);
        //gui.showCursor(false, true);
        localPlayer.invincible = false;
        localPlayer.setProofs(false, false, false, false, false);
        localPlayer.collisionsEnabled = true;
    }
}

// ===========================================================================