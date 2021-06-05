// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: logo.js
// DESC: Provides logo rendering functions
// TYPE: Client (JavaScript)
// ===========================================================================

let logoImage = null;
let logoPos = toVector2(gta.width-132, gta.height-132);
let logoSize = toVector2(128, 128);

// ===========================================================================

function initLogoScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Logo]: Initializing logo script ...");
    logoImage = loadLogoImage();
	logToConsole(LOG_DEBUG, "[Asshat.Logo]: Logo script initialized!");
}

// ===========================================================================

function loadLogoImage() {
    let logoStream = openFile(mainLogoPath);
    let tempLogoImage = null;
    if(logoStream != null) {
        tempLogoImage = drawing.loadPNG(logoStream);
        logoStream.close();
    }

    return tempLogoImage;
}

// ===========================================================================

function processLogoRendering() {
    if(renderLogo) {
        if(logoImage != null) {
            graphics.drawRectangle(logoImage, logoPos, logoSize);
        }
    }
}

// ===========================================================================

function setServerLogoRenderState(state) {
    logToConsole(LOG_DEBUG, `[Asshat.Main] Server logo ${(state) ? "enabled" : "disabled"}`);
    renderLogo = state;
}

// ===========================================================================