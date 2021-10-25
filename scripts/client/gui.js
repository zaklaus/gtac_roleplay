// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: gui.js
// DESC: Provides GUI functionality and styles (using MexUI)
// TYPE: Client (JavaScript)
// ===========================================================================

var app = {};

let robotoFont = "Roboto";

let mainLogoPath = (typeof gta == "undefined") ? "files/images/mafiac-logo.png" : "files/images/gtac-logo.png";

let primaryColour = [200, 200, 200];
let secondaryColour = [16, 16, 16];
let primaryTextColour = [0, 0, 0];
let focusedColour = [200, 200, 200];
let invalidValueColour = [200, 200, 200];

let focusedColourOffset = 50;

let windowAlpha = 200;
let windowTitleAlpha = 180;
let buttonAlpha = 180;
let textInputAlpha = 180;

let guiReady = false;

// ===========================================================================

let placesOfOrigin = [
	"Liberty City",
	"Vice City",
	"Los Santos",
	"San Fierro",
	"Las Venturas",
	"San Andreas",
	"Blaine County",
	"Red County",
	"Bone County",
	"Other",
];

// ===========================================================================

let characterData = [];
let currentCharacter = 0;

let inCharacterSelectScreen = false;
let creatingCharacter = false;

// ===========================================================================

function initGUIScript() {
	logToConsole(LOG_DEBUG, "[VRR.GUI]: Initializing GUI script ...");
	logToConsole(LOG_DEBUG, "[VRR.GUI]: GUI script initialized!");
}

// ===========================================================================

function initGUI() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Initializing GUI ...`);

	initLoginGUI();
	initRegisterGUI();
	initNewCharacterGUI();
	initCharacterSelectGUI();
	initInfoDialogGUI();
	initErrorDialogGUI();
	initYesNoDialogGUI();
	initResetPasswordGUI();
	initChangePasswordGUI();
	initTwoFactorAuthenticationGUI();
	initListGUI();

	closeAllWindows();
	guiReady = true;

	logToConsole(LOG_DEBUG, `[VRR.GUI] All GUI created successfully!`);
};

// ===========================================================================

let closeAllWindows = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Closing all GUI windows`);
	infoDialog.window.shown = false;
	yesNoDialog.window.shown = false;
	errorDialog.window.shown = false;
	register.window.shown = false;
	login.window.shown = false;
	newCharacter.window.shown = false;
	characterSelect.window.shown = false;
	twoFactorAuth.window.shown = false;
	listDialog.window.shown = false;
	resetPassword.window.shown = false;
	passwordChange.window.shown = false;
	mexui.setInput(false);
}

// ===========================================================================

let isAnyGUIActive = function() {
	if(!guiReady) {
		if(infoDialog.window.shown) {
			return true;
		}

		if(yesNoDialog.window.shown) {
			return true;
		}

		if(errorDialog.window.shown) {
			return true;
		}

		if(register.window.shown) {
			return true;
		}

		if(login.window.shown) {
			return true;
		}

		if(newCharacter.window.shown) {
			return true;
		}

		if(characterSelect.window.shown) {
			return true;
		}

		if(twoFactorAuth.window.shown) {
			return true;
		}

		if(listDialog.window.shown) {
			return true;
		}
	}

	return false;
}

// ===========================================================================

addNetworkHandler("vrr.showCharacterSelect", function(firstName, lastName, cash, clan, lastPlayed, skinId) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show character selection window`);
	showCharacterSelectGUI(firstName, lastName, cash, clan, lastPlayed, skinId);
});

// ===========================================================================

addNetworkHandler("vrr.switchCharacterSelect", function(firstName, lastName, cash, clan, lastPlayed, skinId) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to update character selection window with new info`);
	switchCharacterSelectGUI(firstName, lastName, cash, clan, lastPlayed, skinId);
});

// ===========================================================================

addNetworkHandler("vrr.showError", function(errorMessage, errorTitle) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show error window`);
	showError(errorMessage, errorTitle);
});

// ===========================================================================

addNetworkHandler("vrr.showPrompt", function(promptMessage, promptTitle) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show prompt window`);
	showYesNoPromptGUI(promptMessage, promptTitle);
});

// ===========================================================================

addNetworkHandler("vrr.showInfo", function(infoMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show info dialog`);
	showInfo(infoMessage);
});

// ===========================================================================

addNetworkHandler("vrr.loginSuccess", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of successful login from server`);
	loginSuccess();
});

// ===========================================================================

addNetworkHandler("vrr.characterSelectSuccess", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of successful character selection from server`);
	characterSelectSuccess();
	setChatWindowEnabled(true);
});

// ===========================================================================

addNetworkHandler("vrr.loginFailed", function(remainingAttempts) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of failed login from server`);
	loginFailed(remainingAttempts);
});

// ===========================================================================

addNetworkHandler("vrr.registrationSuccess", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of successful registration from server`);
	registrationSuccess();
});

// ===========================================================================

addNetworkHandler("vrr.registrationFailed", function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of failed registration from server`);
	registrationFailed(errorMessage);
});

// ===========================================================================

addNetworkHandler("vrr.newCharacterFailed", function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of failed registration from server`);
	newCharacterFailed(errorMessage);
});

// ===========================================================================

addNetworkHandler("vrr.guiColour", function(red1, green1, blue1, red2, green2, blue2, red3, green3, blue3) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received new GUI colours from server: ${red1}, ${green1}, ${blue1} / ${red2}, ${green2}, ${blue2} / ${red3}, ${green3}, ${blue3}`);
	primaryColour = [red1, green1, blue1];
	secondaryColour = [red2, green2, blue2];
	primaryTextColour = [red3, green3, blue3];
	focusedColour = [red1+focusedColourOffset, green1+focusedColourOffset, blue1+focusedColourOffset];

	initGUI();
	triggerNetworkEvent("vrr.guiReady", true);
});

// ===========================================================================

addNetworkHandler("vrr.guiInit", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Initializing MexUI app`);
	//initGUI();
	triggerNetworkEvent("vrr.guiReady", true);
});

// ===========================================================================

function hideAllGUI() {
    closeAllWindows();
    setChatWindowEnabled(true);
}

// ===========================================================================