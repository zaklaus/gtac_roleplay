// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: locale.js
// DESC: Provides locale structures, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initLocaleScript() {
    logToConsole(LOG_INFO, "[VRR.Locale]: Initializing locale script ...");
    getServerData().localeStrings = loadAllLocaleStrings();
	logToConsole(LOG_INFO, "[VRR.Locale]: Locale script initialized!");
}

// ===========================================================================

function getLocaleString(client, stringName, ...args) {
    let tempString = getRawLocaleString(stringName, getPlayerData(client).locale);
    if(tempString == "") {
        submitBugReport(client, `(AUTOMATED REPORT) Locale string "${stringName}" is missing for "${getPlayerLocaleName(client)}"`);
    }

    tempString = replaceColoursInMessage(tempString);

    for(let i = 1; i <= args.length; i++) {
        tempString = tempString.replace(`{${i}}`, args[i-1]);
    }

    return tempString;
}

// ===========================================================================

function getGroupedLocaleString(client, stringName, index, ...args) {
    let tempString = getRawGroupedLocaleString(stringName, getPlayerData(client).locale, index);
    tempString = replaceColoursInMessage(tempString);

    for(let i = 1; i <= args.length; i++) {
        tempString = tempString.replace(`{${i}}`, args[i-1]);
    }

    return tempString;
}

// ===========================================================================

function getRawLocaleString(stringName, localeName) {
    return getLocaleStrings()[localeName][stringName];
}

// ===========================================================================

function getRawGroupedLocaleString(stringName, localeName, index) {
    return getLocaleStrings()[localeName][stringName][index];
}

// ===========================================================================

function getPlayerLocaleName(client) {
    let localeId = getPlayerData(client).locale;
    return getLocales()[localeId][0];
}

// ===========================================================================

function loadAllLocaleStrings() {
    let tempLocaleStrings = {};

    let locales = getGlobalConfig().locales;
    for(let i in locales) {
        let localeData = locales[i];
        let localeFile = JSON.parse(loadTextFile(`locale/${localeData[1]}.json`));
        tempLocaleStrings[i] = localeFile;
    }

    return tempLocaleStrings;
}

// ===========================================================================

function getLocaleStrings() {
    return getServerData().localeStrings;
}

// ===========================================================================

function getLocaleFromParams(params) {
	let locales = getLocales();
	if(isNaN(params)) {
		for(let i in locales) {
            if(toLowerCase(locales[i][2]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}

			if(toLowerCase(locales[i][0]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	}

	return -1;
}

// ===========================================================================

function getLocales() {
    return getGlobalConfig().locales;
}

// ===========================================================================

function showLocaleListCommand(command, params, client) {
	let localeList = getLocales().map(function(x) { return x[0]; });
	let chunkedList = splitArrayIntoChunks(localeList, 10);

	messagePlayerInfo(client, getLocaleString(client, "HeaderLocaleList"));
	for(let i in chunkedList) {
		messagePlayerInfo(client, chunkedList[i].join(", "));
	}
}

// ===========================================================================

function setLocaleCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

    let localeId = getLocaleFromParams(params);

    if(!getLocaleData(localeId)) {
        messagePlayerInfo(client, getLocaleString(client, "InvalidLocale"));
        return false;
    }

    getPlayerData(client).accountData.locale = localeId;
    getPlayerData(client).locale = localeId;
    messagePlayerSuccess(client, getLocaleString(client, "LocaleChanged1"), getLocaleString(client, "LocaleNativeName"));
}

// ===========================================================================

function getLocaleData(localeId) {
    if(typeof getLocales()[localeId] != "undefined") {
        return getLocales()[localeId];
    }

    return false;
}

// ===========================================================================