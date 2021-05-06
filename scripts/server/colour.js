// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: colour.js
// DESC: Provides colours, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverColours = {
	byType: {
		talkMessage: toColour(200, 200, 200),
		shoutMessage: toColour(255, 255, 200),
		whisperMessage: toColour(130, 130, 130),
		doActionMessage: toColour(177, 156, 217, 255),
		meActionMessage: toColour(177, 156, 217, 255),
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
		softRed: toColour(205, 60, 60, 255),
		softGreen: toColour(50, 205, 50, 255),
		lightPurple: toColour(150, 0, 150, 255),
		lightGrey: toColour(200, 200, 200, 255),
		mediumGrey: toColour(150, 150, 150, 255),
		darkGrey: toColour(64, 64, 64, 255),
		policeBlue: toColour(50, 80, 200, 255),
		medicPink: toColour(219, 112, 147, 255),
		firefighterRed: toColour(205, 60, 60, 255),
		busDriverGreen: toColour(50, 160, 50, 255),
		taxiDriverYellow: toColour(240, 230, 100, 255),
		deliveryPurple: toColour(177, 156, 217, 255),
		civilianWhite: toColour(200, 200, 200, 255),
		burntYellow: toColour(210, 210, 0, 255),
		burntOrange: toColour(210, 120, 0, 255),
		bankGreen: toColour(0, 150, 0, 255),
		softYellow: toColour(234, 198, 126, 255),
		businessBlue: toColour(0, 153, 255, 255),
		houseGreen: toColour(17, 204, 17, 255),
		clanOrange: toColour(255, 153, 0, 255),
	},
};

// ===========================================================================

function getServerColours() {
	return serverColours;
}

// ===========================================================================

function getColourByType(typeName) {
	return getServerColours().byType[typeName];
}

// ===========================================================================

function getColourByName(colourName) {
	return getServerColours().byName[colourName];
}

// ===========================================================================

function getHexColourByName(colourName) {
	let rgbaColour = getServerColours().byName[colourName];
	let rgbaArray = rgbaArrayFromToColour(rgbaColour);
	return rgbToHex(rgbaArray[0], rgbaArray[1], rgbaArray[2]);
}

// ===========================================================================

function getPlayerColour(client) {
	if(getPlayerData(client) != false) {
		if(!isPlayerLoggedIn(client)) {
			return getColourByName("darkGrey");
		} else {
			if(isPlayerWorking(client)) {
				return getJobData(getJobIndexFromDatabaseId(getPlayerCurrentSubAccount(client).job)).colour;
			}
		}
	}

	return getColourByName("civilianWhite");
}

// ===========================================================================

function getBoolRedGreenInlineColour(boolVal) {
	return (!boolVal) ? "[#CD3C3C]" : "[#32CD32]";
}

// ===========================================================================

function hexToRgb(h) {
	return [
		'0x'+h[1]+h[2]|0,
		'0x'+h[3]+h[4]|0,
		'0x'+h[5]+h[6]|0
	];
}

// ===========================================================================

function rgbToHex(r, g, b) {
	return "#"+((1<<24)+(r<<16)+(g<<8)+ b).toString(16).slice(1);
}

// ===========================================================================

function getClientChatColour(client) {
	let tempJob = getPlayerCurrentSubAccount(client).job;
	if(tempJob != -1) {
		if(getPlayerData(client).isWorking) {
			return getJobData(tempJob).jobColour;
		}
	}
	return getColourByName("white");
}

// ===========================================================================

function getRandomRGB() {
	return toColour.apply(null, [
		getRandom(0, 255),
		getRandom(0, 255),
		getRandom(0, 255),
		255
	]);
}

// ===========================================================================