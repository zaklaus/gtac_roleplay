// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: economy.js
// DESC: Provides economy/financial utils, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initEconomyScript() {
	logToConsole(LOG_INFO, "[VRR.Economy]: Initializing economy script ...");
	logToConsole(LOG_INFO, "[VRR.Economy]: Economy script initialized successfully!");
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
	let grossIncome = getPlayerData(client).payDayAmount;

	// Public Beta Bonus
	grossIncome = grossIncome + getGlobalConfig().economy.passiveIncomePerPayDay;
	grossIncome = grossIncome*getGlobalConfig().economy.grossIncomeMultiplier;

	incomeTaxAmount = calculateIncomeTax(wealth);

	let netIncome = grossIncome-taxAmount;

	messagePlayerAlert(client, "== Payday! =============================");
	messagePlayerInfo(client, `Paycheck: {ALTCOLOUR}$${grossIncome}`);
	messagePlayerInfo(client, `Taxes: {ALTCOLOUR}$${incomeTaxAmount}`);
	messagePlayerInfo(client, `You receive: {ALTCOLOUR}$${netIncome}`);

	givePlayerCash(client, netIncome);
}

// ===========================================================================

function calculateWealth(client) {
	let vehicles = getAllVehiclesOwnedByPlayer(client);
	let houses = getAllHousesOwnedByPlayer(client);
	let businesses = getAllBusinessesOwnedByPlayer(client);

	let vehicleUpKeep = applyServerInflationMultiplier(vehicles.length*getGlobalConfig().economy.upKeepCosts.upKeepPerVehicle);
	let houseUpKeep = applyServerInflationMultiplier(houses.length*getGlobalConfig().economy.upKeepCosts.upKeepPerHouse);
	let businessUpKeep = applyServerInflationMultiplier(businesses.length*getGlobalConfig().economy.upKeepCosts.upKeepPerBusiness);

	return vehicleUpKeep+houseUpKeep+businessUpKeep;
}

// ===========================================================================

function calculateIncomeTax(amount) {
	return amount*getGlobalConfig().economy.incomeTaxRate;
}

// ===========================================================================

function forcePlayerPayDayCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let targetClient = getPlayerFromParams(params);
	if(!targetClient) {
		messagePlayerError(client, "That player is not connected!");
		return false;
	}

	messageAdmins(`${client.name} gave ${targetClient.name} an instant payday`);
	playerPayDay(targetClient);
}

// ===========================================================================