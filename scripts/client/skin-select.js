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
let skinSelectorIndex = 0;

let skinSelectPosition = null;
let skinSelectHeading = null;

// ===========================================================================

function initSkinSelectScript() {
	logToConsole(LOG_DEBUG, "[VRR.SkinSelect]: Initializing skin selector script ...");
	skinSelectMessageFontTop = loadSkinSelectMessageFontTop();
	skinSelectMessageFontBottom = loadSkinSelectMessageFontBottom();
	logToConsole(LOG_DEBUG, "[VRR.SkinSelect]: Skin selector script initialized!");
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
        if(keyCode == SDLK_RIGHT || keyCode == SDLK_s) {
            if(skinSelectorIndex >= allowedSkins[getGame()].length-1) {
                skinSelectorIndex = 0;
            } else {
                skinSelectorIndex++;
            }
            skinSelectMessageTextTop = allowedSkins[getGame()][skinSelectorIndex][1];
            localPlayer.skin = allowedSkins[getGame()][skinSelectorIndex][0];
        } else if(keyCode == SDLK_LEFT || keyCode == SDLK_a) {
            if(skinSelectorIndex <= 0) {
                skinSelectorIndex = allowedSkins[getGame()].length-1;
            } else {
                skinSelectorIndex--;
            }
            skinSelectMessageTextTop = allowedSkins[getGame()][skinSelectorIndex][1];
            localPlayer.skin = allowedSkins[getGame()][skinSelectorIndex][0];
        } else if(keyCode == SDLK_RETURN) {
            triggerNetworkEvent("vrr.skinSelected", skinSelectorIndex);
        } else if(keyCode == SDLK_BACKSPACE) {
            triggerNetworkEvent("vrr.skinSelected", -1);
        }
    }
}

// ===========================================================================

function processSkinSelectRendering() {
	if(usingSkinSelector) {
        if(skinSelectMessageFontTop != null && skinSelectMessageFontBottom != null) {
            //if(gta.game != GAME_GTA_VC) {
                skinSelectMessageFontTop.render(skinSelectMessageTextTop, [0, game.height-100], game.width, 0.5, 0.0, skinSelectMessageFontTop.size, skinSelectMessageColourTop, true, true, false, true);
                skinSelectMessageFontBottom.render(skinSelectMessageTextBottom, [0, game.height-65], game.width, 0.5, 0.0, skinSelectMessageFontBottom.size, skinSelectMessageColourBottom, true, true, false, true);
            //}
        }

        localPlayer.position = skinSelectPosition;
        localPlayer.heading = skinSelectHeading;
        if(getMultiplayerMod() == VRR_MPMOD_GTAC) {
            if(gta.game == GAME_GTA_III || gta.game == GAME_GTA_VC) {
                localPlayer.clearObjective();
            }
        }
    }
}

// ===========================================================================

function toggleSkinSelect(state) {
    if(state) {
        skinSelectorIndex = 0;
        usingSkinSelector = true;

        let tempPosition = localPlayer.position;
        tempPosition.z += 0.5;
        let frontCameraPosition = getPosInFrontOfPos(tempPosition, localPlayer.heading, 3);

        if(isCustomCameraSupported()) {
            game.setCameraLookAt(frontCameraPosition, localPlayer.position, true);
        }

        localPlayer.skin = allowedSkins[getGame()][skinSelectorIndex][0];
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