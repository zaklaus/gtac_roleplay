// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: economy.js
// DESC: Provides economy/financial utils, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initEconomyScript() {
	logToConsole(LOG_INFO, "[Asshat.Economy]: Initializing economy script ...");
	logToConsole(LOG_INFO, "[Asshat.Economy]: Economy script initialized successfully!");
}

// ===========================================================================

function getTimeDisplayUntilPlayerPayDay(client) {
	return getTimeDifferenceDisplay(sdl.ticks-getPlayerData(client).payDayTickStart);
}

// ===========================================================================

function applyServerInflationMultiplier(value) {
	return toInteger(Math.round(value*getServerConfig().inflationMultiplier))
}

// ===========================================================================

function playerPayDay(client) {
	let wealth = calculateWealth(client);
	let taxAmount = calculateTax(wealth);
	let grossIncome = getPlayerData(client).payDayAmount;

	// Public Beta Bonus
	taxAmount = 0;
	grossIncome = grossIncome*2;
	grossIncome = grossIncome + 2000;

	let netIncome = grossIncome-taxAmount;

	messagePlayerAlert(client, "== Payday! =============================");
	messagePlayerInfo(client, `Your paycheck: [#AAAAAA]$${grossIncome}`);
	messagePlayerInfo(client, `Taxes: [#AAAAAA]$${taxAmount}`);
	messagePlayerInfo(client, `You receive: [#AAAAAA]$${netIncome}`);

	givePlayerCash(client, netIncome);
}

// ===========================================================================

function calculateWealth(client) {
	// To-do
	return 0;
}

// ===========================================================================

function calculateTax(client) {
	// To-do
	return 0;
}

// ===========================================================================