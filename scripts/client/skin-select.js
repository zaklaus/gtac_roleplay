// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
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

let skinSelectPosition = null;
let skinSelectHeading = null;

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
            if(allowedSkins[gta.game].length-1 == skinSelectorIndex) {
                skinSelectorIndex = 0;
            } else {
                skinSelectorIndex++;
            }
            localPlayer.skin = allowedSkins[gta.game][skinSelectorIndex][0];
            skinSelectMessageTextTop = allowedSkins[gta.game][skinSelectorIndex][1];
        } else if(keyCode == SDLK_LEFT) {
            if(skinSelectorIndex <= 0) {
                skinSelectorIndex = allowedSkins[gta.game].length-1;
            } else {
                skinSelectorIndex--;
            }
            localPlayer.skin = allowedSkins[gta.game][skinSelectorIndex][0];
            skinSelectMessageTextTop = allowedSkins[gta.game][skinSelectorIndex][1];
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
            if(gta.game != GAME_GTA_VC) {
                skinSelectMessageFontTop.render(skinSelectMessageTextTop, [0, gta.height-100], gta.width, 0.5, 0.0, skinSelectMessageFontTop.size, skinSelectMessageColourTop, true, true, false, true);
                skinSelectMessageFontBottom.render(skinSelectMessageTextBottom, [0, gta.height-65], gta.width, 0.5, 0.0, skinSelectMessageFontBottom.size, skinSelectMessageColourBottom, true, true, false, true);
            }
        }

        localPlayer.position = skinSelectPosition;
        localPlayer.heading = skinSelectHeading;
        if(gta.game == GAME_GTA_III || gta.game == GAME_GTA_VC) {
            localPlayer.clearObjective();
        }
    }
}

// ===========================================================================

function toggleSkinSelect(state) {
    if(state) {
        skinSelectorIndex = getAllowedSkinIndexBySkinId(localPlayer.skin);
        if(localPlayer.skin != allowedSkins[gta.game][skinSelectorIndex][0]) {
            localPlayer.skin = allowedSkins[gta.game][skinSelectorIndex][0];
        }
        usingSkinSelector = true;
        let tempPosition = localPlayer.position;
        tempPosition.z += 0.5;
        let frontCameraPosition = getPosInFrontOfPos(tempPosition, localPlayer.heading, 3);
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
        gui.showCursor(false, true);
        if(localPlayer) {
            localPlayer.invincible = false;
            localPlayer.setProofs(false, false, false, false, false);
            localPlayer.collisionsEnabled = true;
        }
    }
}

// ===========================================================================