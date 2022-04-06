// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: locale.js
// DESC: Provides locale functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

function getLocaleString(stringName, ...args) {
	let tempString = getServerData().localeStrings[stringName];

	for(let i = 1; i <= args.length; i++) {
		tempString = tempString.replace(`{${i}}`, args[i-1]);
	}

	return tempString;
}

// ===========================================================================

function receiveLocaleStringFromServer(stringName, stringValue) {
	getServerData().localeStrings[stringName] = stringValue;
}

// ===========================================================================