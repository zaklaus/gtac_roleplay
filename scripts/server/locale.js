// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: locale.js
// DESC: Provides locale structures, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let localeStrings = {};

// ===========================================================================

function initLocaleScript() {
    localeStrings = loadAllLocaleStrings();
}

// ===========================================================================

function getLocaleString(client, stringName, ...args) {
    let tempString = getRawLocaleString(stringName, getPlayerLocaleName(client));

    tempString = replaceColoursInLocaleString(tempString);

    for(let i in args) {
        tempString = tempString.replace(`{${i}}`, args[i]);
    }
}

// ===========================================================================

function getRawLocaleString(stringName, localeName) {
    return localeStrings[localeName][stringName];
}

// ===========================================================================

function getPlayerLocaleName(client) {
    if(client == null) {
        return getLocaleNameFromParams(`English`);
    }

    return getPlayerData(client).accountData.locale;
}

// ===========================================================================

function loadAllLocaleStrings() {
    let locales = getGlobalConfig().locales;
    for(let i in locales) {
        let localeData = locales[i];
        let localeFile = JSON.parse(loadTextFile(`locale/${localeData[1]}.json`));
        localeStrings[localeData[1]] = localeFile;
    }
}

// ===========================================================================