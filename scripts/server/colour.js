// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: colour.js
// DESC: Provides colours, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverColours = {
	byType: {
		talkMessage: toColour(200, 200, 200),
		shoutMessage: toColour(255, 255, 200),
		whisperMessage: toColour(130, 130, 130),
		doActionMessage: toColour(153, 50, 204, 255),
		meActionMessage: toColour(153, 50, 204, 255),
		errorMessage: toColour(237, 67, 55, 255),
		syntaxMessage: toColour(200, 200, 200, 255),
		normalMessage: toColour(255, 255, 255, 255),
		alertMessage: toColour(255, 255, 0, 255),
		successMessage: toColour(0, 180, 0, 255),
		clanChatMessage: toColour(0, 190, 0, 255),
	},
	byName: {
		white: toColour(255, 255, 255, 255),
		black: toColour(0, 0, 0, 255),
		red: toColour(255, 0, 0, 255),
		yellow: toColour(255, 255, 0, 255),
		royalBlue: toColour(0, 0, 255, 255),
		teal: toColour(0, 255, 255, 255),
		orange: toColour(255, 128, 0, 255),
		lightGrey: toColour(200, 200, 200, 255),
		mediumGrey: toColour(150, 150, 150, 255),
		darkGrey: toColour(64, 64, 64, 255),
		policeBlue: toColour(70, 130, 180, 255),
		medicPink: toColour(219, 112, 147, 255),
		firefighterRed: toColour(205, 92, 92, 255),
		busDriverGreen: toColour(50, 205, 50, 255),
		taxiDriverYellow: toColour(240, 230, 140, 255),
		burntYellow: toColour(210, 210, 0, 255),
		burntOrange: toColour(210, 120, 0, 255),
		bankGreen: toColour(0, 150, 0, 255),
		softGreen: toColour(144, 255, 96, 255),
	}
};

// ----------------------------------------------------------------------------

function getServerColours() {
	return serverColours;
}

// ----------------------------------------------------------------------------

function getColourByType(typeName) {
	return getServerColours().byType[typeName];
}

// ----------------------------------------------------------------------------

function getColourByName(colourName) {
	return getServerColours().byName[colourName];
}

// ---------------------------------------------------------------------------