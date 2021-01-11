// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: walkie-talkie.js
// DESC: Provides features and usage for the walkie-talkie item type
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function getPlayerActiveWalkieTalkieFrequency(client) {
	let walkieTalkieSlot = getPlayerFirstItemSlotByUseType(client);

	if(walkieTalkieSlot != -1) {
		if(getItemData(getPlayerData(client).hotBarItems[walkieTalkieSlot])) {
			if(getItemData(getPlayerData(client).hotBarItems[walkieTalkieSlot]).enabled) {
				return getItemData(getPlayerData(client).hotBarItems[walkieTalkieSlot]).value;
			}
		}
    }

    return false;
}

// ---------------------------------------------------------------------------

function walkieTalkieTransmit(radioFrequency, messageText, transmittingPlayer) {
    walkieTalkieOutgoingToNearbyPlayers(transmittingPlayer, messageText);

	let clients = getPlayingClients();
	for(let i in clients) {
        if(!samePlayer(transmittingPlayer, clients[i])) {
            if(getPlayerActiveWalkieTalkieFrequency(clients[i]) == radioFrequency) {
                walkieTalkieIncomingToNearbyPlayers(clients[i], messageText);
            }
        }
	}
}

// ---------------------------------------------------------------------------

function walkieTalkieOutgoingToNearbyPlayers(client, messageText) {
	let clients = getPlayersInRange(getPlayerPosition(client), getGlobalConfig().talkDistance);
	for(let i in clients) {
		messagePlayerNormal(`[#CCCCCC]${getCharacterFullName(client)} [#AAAAAA](to radio): [#FFFFFF]${messageText}`);
	}
}

// ---------------------------------------------------------------------------

function walkieTalkieIncomingToNearbyPlayers(client, messageText) {
	let clients = getPlayersInRange(getPlayerPosition(client), getGlobalConfig().walkieTalkieSpeakerDistance);
	for(let i in clients) {
		messagePlayerNormal(`[#CCCCCC]${getCharacterFullName(client)} [#AAAAAA](from radio): [#FFFFFF]${messageText}`);
	}
}

// ---------------------------------------------------------------------------

function setWalkieTalkieFrequencyCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(isNaN(params)) {
		messagePlayerError(client, `The frequency channel must be a number!`);
		return false;
	}

	params = toInteger(params);

	if(params < 100 || params > 500) {
		messagePlayerError(client, `The frequency channel must be between 100 and 500!`);
		return false;
	}

	if(!getPlayerActiveItem(client)) {
		messagePlayerError(client, `You aren't holding a walkie talkie!`);
		return false;
	}

	if(!getItemData(getPlayerActiveItem(client))) {
		messagePlayerError(client, `You aren't holding a walkie talkie!`);
		return false;
	}

	if(getItemData(getPlayerActiveItem(client)).enabled) {
		if(doesPlayerHaveKeyBindForCommand(client, "use")) {
			messagePlayerError(client, `Your walkie talkie is turned off. Press ${sdl.getKeyName(getPlayerKeyBindForCommand(client, "use").key)} to turn it on`);
		} else {
			messagePlayerError(client, `Your walkie talkie is turned off. Type [#AAAAAA]/use [#FFFFFF]to turn it on`);
		}
		return false;
	}

	getItemData(getPlayerActiveItem(client)).value = params*100;
	messagePlayerSuccess(client, `You set the frequency of you walkie talkie in slot ${getPlayerData(client).activeHotbarSlot} to ${getItemValueDisplay(getPlayerActiveItem(client))}`)
}

// ---------------------------------------------------------------------------