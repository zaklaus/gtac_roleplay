// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: accent.js
// DESC: Provides accent functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function getPlayerAccentText(client) {
    return getPlayerCurrentSubAccount(client).accent;
}

// ===========================================================================

function setPlayerAccentText(client, text) {
    getPlayerCurrentSubAccount(client).accent = text;
}

// ===========================================================================

function doesPlayerHaveAccent(client) {
    return (getPlayerCurrentSubAccount(client).accent != "");
}

// ===========================================================================

function getPlayerAccentInlineOutput(client) {
    let outputText = "";
    if(doesPlayerHaveAccent(client)) {
        outputText = `[${getPlayerAccentText(client)}] `;
    }

    return outputText;
}

// ===========================================================================

function setAccentCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let accentId = getAccentFromParams(params);

	if(!accentId) {
		messagePlayerError(client, getLocaleString(client, "AccentNotFound"));
		return false;
	}

	let accentString = getGlobalConfig().accents[accentId];

	getPlayerCurrentSubAccount(client).accent = accentString;

	messagePlayerSuccess(client, getLocaleString(client, "AccentSet", accentString));
}

// ===========================================================================

function listAccentsCommand(command, params, client) {
	let accentList = getGlobalConfig().accents;

	let chunkedList = splitArrayIntoChunks(accentList, 8);

	messagePlayerInfo(client, `{clanOrange}== {jobYellow}Accents {clanOrange}==================================`);

	for(let i in chunkedList) {
		messagePlayerInfo(client, chunkedList[i].join(", "));
	}
}

// ===========================================================================

function getAccentFromParams(params) {
	if(isNaN(params)) {
		for(let i in getGlobalConfig().accents) {
			if(toLowerCase(getGlobalConfig().accents[i]).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	} else {
		if(typeof getGlobalConfig().accents[params] != "undefined") {
			return toInteger(params);
		}
	}

	return false;
}

// ===========================================================================