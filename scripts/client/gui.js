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
let focusedColour = [200, 200, 200];
let invalidValueColour = [200, 200, 200];

let focusedColourOffset = 50;

let windowColour = (typeof gta == "undefined") ? [24, 24, 24, 150] : [0, 0, 0, 150];
let windowTitleAlpha = 180;
let buttonAlpha = 180;
let textInputAlpha = 180;

let guiReady = false;

//let mexui = findResourceByName("mexui").exports.getMexUI();

// ===========================================================================

let twoFactorAuth = {
	window: null,
	logoImage: null,
	qrCode: null,
	messageLabel: null,
	codeLabel: null,
	codeInput: null,
	submitButton: null,
};

// ===========================================================================

let listDialog = {
	window: null,
	messageLabel: null,
	listGrid: null,
};

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
	//initResetPasswordGUI();

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating two factor auth GUI ...`);
	twoFactorAuth.window = mexui.window(game.width/2-150, game.height/2-129, 300, 258, 'LOGIN', {
		main: {
			backgroundColour: toColour(windowColour[0], windowColour[1], windowColour[2], windowColour[3]),
			transitionTime: 500,
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});
	twoFactorAuth.window.titleBarIconSize = toVector2(0,0);
	twoFactorAuth.window.titleBarHeight = 0;

	twoFactorAuth.qrCode = twoFactorAuth.window.image(100, 20, 100, 100, mainLogoPath, {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	twoFactorAuth.codeLabel = twoFactorAuth.window.text(20, 135, 260, 20, 'Please enter the code from your authenticator app!', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	twoFactorAuth.codeInput = twoFactorAuth.window.textInput(20, 170, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], textInputAlpha),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			textColour: toColour(200, 200, 200, 150),
			textSize: 10.0,
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	});
	twoFactorAuth.codeInput.placeholder = "Code";

	twoFactorAuth.submitButton = twoFactorAuth.window.button(20, 205, 260, 30, 'SUBMIT', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		},
	}, checkTwoFactorAuth);

	logToConsole(LOG_DEBUG, `[VRR.GUI] Created two factor auth GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating list dialog GUI ...`);
	listDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 500, 'List', {
		main: {
			backgroundColour: toColour(windowColour[0], windowColour[1], windowColour[2], windowColour[3]),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 11.0,
			textColour: toColour(255, 255, 255, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
			hover: {
				backgroundColour: toColour(205, 60, 60, windowTitleAlpha),
			},
		},
	});

	listDialog.messageLabel = infoDialog.window.text(5, 5, 390, 20, 'Select one', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	listDialog.listGrid = listDialog.window.grid(5, 25, 390, 450, {
		main: {
			backgroundColour: 	toColour(windowColour[0], windowColour[1], windowColour[2], windowColour[3]),
		},
		column: {
			lineColour: 		toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		header:	{
			backgroundColour:	toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha-50),
			textColour:			toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		cell: {
			backgroundColour:	toColour(windowColour[0], windowColour[1], windowColour[2], windowColour[3]),
			textColour:			toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		row: {
			lineColour:			toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
			hover: {
				backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 120),
			}
		}
	});
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created list dialog GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] All GUI created successfully!`);
	closeAllWindows();

	guiReady = true;
};

// ===========================================================================

let twoFactorAuthFailed = function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports two-factor authentication failed. Reason: ${errorMessage}`);
	login.messageLabel.text = errorMessage;
	login.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	login.passwordInput.text = "";
}

// ===========================================================================

let twoFactorAuthSuccess = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports two-factor authentication was successful`);
	closeAllWindows();
}

// ===========================================================================

let checkTwoFactorAuth = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Checking two-factor authentication with server ...`);
	triggerNetworkEvent("vrr.checkTwoFactorAuth", twoFactorAuth.codeInput.lines[0]);
}

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
	mexui.setInput(false);
}

// ===========================================================================

let showTwoFactorAuth = function() {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing two-factor authentication window`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	twoFactorAuth.window.shown = true;
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

addNetworkHandler("vrr.guiColour", function(red, green, blue) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received new GUI colours from server`);
	primaryColour = [red, green, blue];
	focusedColour = [red+focusedColourOffset, green+focusedColourOffset, blue+focusedColourOffset];
});

// ===========================================================================

addNetworkHandler("vrr.guiInit", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Initializing MexUI app`);
	initGUI();
	triggerNetworkEvent("vrr.guiReady", true);
});

// ===========================================================================