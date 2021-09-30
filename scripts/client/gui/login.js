// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: login.js
// DESC: Provides login GUI
// TYPE: Client (JavaScript)
// ===========================================================================

let login = {
	window: null,
	logoImage: null,
	messageLabel: null,
	passwordLabel: null,
	passwordInput: null,
	loginButton: null,
};

// ===========================================================================

function initLoginGUI() {
    logToConsole(LOG_DEBUG, `[VRR.GUI] Creating login GUI ...`);
	login.window = mexui.window(game.width/2-150, game.height/2-129, 300, 258, 'LOGIN', {
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
	login.window.titleBarIconSize = toVector2(0,0);
	login.window.titleBarHeight = 0;

	login.logoImage = login.window.image(100, 20, 100, 100, mainLogoPath, {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	login.messageLabel = login.window.text(20, 135, 260, 20, 'Please enter your password!', {
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

	login.passwordInput = login.window.textInput(20, 170, 260, 25, '', {
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
	login.passwordInput.masked = true;
	login.passwordInput.placeholder = "Password";

	login.loginButton = login.window.button(20, 205, 260, 30, 'LOGIN', {
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
	}, checkLogin);

	logToConsole(LOG_DEBUG, `[VRR.GUI] Created login GUI`);
}

// ===========================================================================

function showLoginGUI() {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing login window`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	login.window.shown = true;
}

// ===========================================================================

function checkLogin() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Checking login with server ...`);
	triggerNetworkEvent("vrr.checkLogin", login.passwordInput.lines[0]);
}

// ===========================================================================

function loginFailed(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports login failed`);
	login.messageLabel.text = errorMessage;
	login.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	login.passwordInput.text = "";
}

// ===========================================================================

function loginSuccess() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports login was successful`);
	closeAllWindows();
}

// ===========================================================================