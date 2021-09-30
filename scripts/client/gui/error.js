// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: error.js
// DESC: Provides error box GUI
// TYPE: Client (JavaScript)
// ===========================================================================

let errorDialog = {
	window: null,
	messageLabel: null,
	okayButton: null,
};

// ===========================================================================

function initErrorDialogGUI() {
    logToConsole(LOG_DEBUG, `[VRR.GUI] Creating error GUI ...`);
    errorDialog.window = mexui.window(game.width/2-200, game.height/2-70, 500, 140, 'ERROR', {
        main: {
            backgroundColour: toColour(windowColour[0], windowColour[1], windowColour[2], windowColour[3]),
            transitionTime: 500,
        },
        title: {
            textSize: 11.0,
            textColour: toColour(0, 0, 0, 255),
            backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
        },
        icon: {
            textSize: 0.0,
            textColour: toColour(0, 0, 0, 0),
            backgroundColour: toColour(0, 0, 0, 0),
        },
    });

    errorDialog.messageLabel = errorDialog.window.text(15, 50, 470, 75, 'Error Message', {
        main: {
            textSize: 10.0,
            textAlign: 0.5,
            textColour: toColour(255, 255, 255, 255),
            textFont: robotoFont,
        },
        focused: {
            borderColour: toColour(0, 0, 0, 0),
        },
    });

    errorDialog.okayButton = errorDialog.window.button(20, 95, 360, 30, 'OK', {
        main: {
            backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
            textColour: toColour(0, 0, 0, 255),
            textSize: 10.0,
            textFont: robotoFont,
            textAlign: 0.5,
        },
        focused: {
            borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
        },
    }, closeErrorDialog);
    logToConsole(LOG_DEBUG, `[VRR.GUI] Created error GUI ...`);
}

// ===========================================================================

function showErrorGUI(errorMessage, errorTitle) {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing error window. Error: ${errorTitle} - ${errorMessage}`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	errorDialog.messageLabel.text = errorMessage;
	errorDialog.window.shown = true;
}

// ===========================================================================

function closeErrorDialog() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Closing error dialog`);
	errorDialog.window.shown = false;
	mexui.setInput(false);
}

// ===========================================================================