// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: config.js
// DESC: Provides server configuration
// TYPE: Server (JavaScript)
// ===========================================================================

let serverConfig = {
	colour: {
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
			busDriverGreen: toColour(50,205, 50, 255),
			taxiDriverYellow: toColour(240, 230, 140, 255),
			burntYellow: toColour(0, 180, 180, 255),
			burntOrange: toColour(0, 120, 210, 255),
		}
	},
	accountPasswordHash: "SHA512",
	connectCameraPosition: [
		false,
		new Vec3(-1176.481, -17.694, 95.992),
		false,
		false,
		false,
	],
	connectCameraLookAt: [
		false,
		new Vec3(-1175.726, -17.055, 95.847),
		false,
		false,
		false,
	],
	newCharacter: {
		spawnPosition: new Vec3(1038.40, -666.70, 14.97),
		spawnHeading: 0.0,
		money: 1000,
	},
	npcFarProximity: 100,
	npcMediumProximity: 40,
	npcCloseProximity: 12,
	meActionDistance: 20,
	doActionDistance: 15,
	shoutDistance: 30,
	talkDistance: 10,
	whisperDistance: 2,
	megaphoneDistance: 40,
};

// ----------------------------------------------------------------------------