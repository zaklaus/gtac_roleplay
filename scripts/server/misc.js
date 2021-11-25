// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: misc.js
// DESC: Provides any uncategorized functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================

function initMiscScript() {
	logToConsole(LOG_INFO, "[VRR.Misc]: Initializing misc script ...");
	logToConsole(LOG_INFO, "[VRR.Misc]: Misc script initialized successfully!");
	return true;
}

// ===========================================================================

function getPositionCommand(command, params, client) {
	let position = getPlayerPosition(client);

	messagePlayerNormal(client, `Your position is: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s position is: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
	return true;
}

// ===========================================================================

function toggleMouseCursorCommand(command, params, client) {
	sendPlayerMouseCursorToggle(client);
	return true;
}

// ===========================================================================

function toggleMouseCameraCommand(command, params, client) {
	sendPlayerMouseCameraToggle(client);
	return true;
}

// ===========================================================================

function setNewCharacterSpawnPositionCommand(command, params, client) {
	let position = client.player.position;
	getServerConfig().newCharacter.spawnPosition = position;
	getServerConfig().newCharacter.spawnHeading = client.player.heading;
	getServerConfig().needsSaved = true;

    messagePlayerNormal(client, `The new character spawn position has been set to ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`)
	return true;
}

// ===========================================================================

function setNewCharacterMoneyCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let amount = toInteger(splitParams[0]) || 1000;

	getServerConfig().newCharacter.cash = amount;
	getServerConfig().needsSaved = true;

    messagePlayerNormal(client, `The new character money has been set to $${amount}`);
	return true;
}

// ===========================================================================

function setNewCharacterSkinCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let skinId = getSkinModelIndexFromParams(params);

	getServerConfig().newCharacter.skin = skinId;
	getServerConfig().needsSaved = true;

    messagePlayerNormal(client, `The new character skin has been set to ${getSkinNameFromModel(skinId)} (Index ${skinId})`);
	return true;
}

// ===========================================================================

function submitIdeaCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	submitIdea(client, params);

    messagePlayerNormal(client, `Your suggestion/idea has been sent to the developers!`);
	return true;
}

// ===========================================================================

function submitBugReportCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	submitBugReport(client, params);

    messagePlayerNormal(client, `Your bug report has been sent to the developers!`);
	return true;
}

// ===========================================================================

function enterExitPropertyCommand(command, params, client) {
	//let closestBusinessEntrance = getClosestBusinessEntrance(getPlayerPosition(client), getPlayerDimension(client));
	//let closestBusinessExit = getClosestBusinessExit(getPlayerPosition(client), getPlayerDimension(client));
	//let closestHouseEntrance = getClosestHouseEntrance(getPlayerPosition(client), getPlayerDimension(client));
	//let closestHouseExit = getClosestHouseExit(getPlayerPosition(client), getPlayerDimension(client));

	let closestProperty = null;
	let isEntrance = false;
	let isBusiness = false;

	//if(getDistance(getPlayerPosition(client), getBusinessData(closestBusinessEntrance).entrancePosition) <= getDistance(getPlayerPosition(client), getHouseData(closestHouseEntrance).entrancePosition)) {
	//	closestEntrance = getBusinessData(closestBusinessEntrance);
	//} else {
	//	closestEntrance = getHouseData(closestHouseEntrance);
	//}

	//if(getDistance(getPlayerPosition(client), getBusinessData(closestBusinessExit).exitPosition) <= getDistance(getPlayerPosition(client), getHouseData(closestHouseExit).exitPosition)) {
	//	closestExit = getBusinessData(closestBusinessExit);
	//} else {
	//	closestExit = getHouseData(closestHouseExit);
	//}

	//if(getDistance(getPlayerPosition(client), closestEntrance.entrancePosition) <= getDistance(getPlayerPosition(client), closestExit.exitPosition)) {
	//	closestProperty = closestEntrance;
	//	isEntrance = true;
	//} else {
	//	closestProperty = closestExit;
	//	isEntrance = false;
	//}

	if(!getPlayerData(client).currentPickup) {
		return false;
	}

	let ownerType = getEntityData(getPlayerData(client).currentPickup, "vrr.owner.type");
	let ownerId = getEntityData(getPlayerData(client).currentPickup, "vrr.owner.id");

	switch(ownerType) {
		case VRR_PICKUP_BUSINESS_ENTRANCE:
			isBusiness = true;
			isEntrance = true;
			closestProperty = getServerData().businesses[ownerId];
			break;

		case VRR_PICKUP_BUSINESS_EXIT:
			isBusiness = true;
			isEntrance = false;
			closestProperty = getServerData().businesses[ownerId];
			break;

		case VRR_PICKUP_HOUSE_ENTRANCE:
			isBusiness = false;
			isEntrance = true;
			closestProperty = getServerData().houses[ownerId];
			break;

		case VRR_PICKUP_HOUSE_EXIT:
			isBusiness = false;
			isEntrance = false;
			closestProperty = getServerData().houses[ownerId];
			break;

		default:
			return false;
	}

	if(closestProperty == null) {
		return false;
	}

	logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)}'s closest door is ${(isBusiness) ? closestProperty.name : closestProperty.description} ${(isEntrance) ? "entrance" : "exit"}`);

	if(isEntrance) {
		if(getDistance(closestProperty.entrancePosition, getPlayerPosition(client)) <= getGlobalConfig().enterPropertyDistance) {
			if(closestProperty.locked) {
				meActionToNearbyPlayers(client, `tries to open the ${(isBusiness) ? "business" : "house"} door but fails because it's locked`);
				return false;
			}

			if(!closestProperty.hasInterior) {
				messagePlayerAlert(client, `This ${(isBusiness) ? "business" : "house"} does not have an interior, but you can still use commands at the door icon.`);
				return false;
			}

			clearPlayerStateToEnterExitProperty(client);
			getPlayerData(client).pedState = VRR_PEDSTATE_ENTERINGPROPERTY;
			meActionToNearbyPlayers(client, `opens the door and enters the ${(isBusiness) ? "business" : "house"}`);

			if(isFadeCameraSupported()) {
				fadeCamera(client, false, 1.0);
			}

			setTimeout(function() {
				setPlayerPosition(client, closestProperty.exitPosition);
				setPlayerHeading(client, closestProperty.exitRotation);
				setPlayerDimension(client, closestProperty.exitDimension);
				setPlayerInterior(client, closestProperty.exitInterior);
				setTimeout(function() {
					if(isFadeCameraSupported()) {
						fadeCamera(client, true, 1.0);
					}
					updateInteriorLightsForPlayer(client, closestProperty.interiorLights);
				}, 1000);
				//updateAllInteriorVehiclesForPlayer(client, closestProperty.exitInterior, closestProperty.exitDimension);
			}, 1100);
			if(closestProperty.streamingRadioStation != -1) {
				if(getRadioStationData(closestProperty.streamingRadioStation)) {
					playRadioStreamForPlayer(client, getRadioStationData(closestProperty.streamingRadioStation).url);
					getPlayerData(client).streamingRadioStation = closestProperty.streamingRadioStation;
				}
			}
			return true;
		}
	} else {
		if(getDistance(closestProperty.exitPosition, getPlayerPosition(client)) <= getGlobalConfig().exitPropertyDistance) {
			if(closestProperty.locked) {
				meActionToNearbyPlayers(client, `tries to open the ${(isBusiness) ? "business" : "house"} door but fails because it's locked`);
				return false;
			}
			getPlayerData(client).pedState = VRR_PEDSTATE_EXITINGPROPERTY;
			clearPlayerStateToEnterExitProperty(client)
			meActionToNearbyPlayers(client, `opens the door and exits the ${(isBusiness) ? "business" : "house"}`);

			if(isFadeCameraSupported()) {
				fadeCamera(client, false, 1.0);
			}

			disableCityAmbienceForPlayer(client, true);
			setTimeout(function() {
				setPlayerPosition(client, closestProperty.entrancePosition);
				setPlayerHeading(client, closestProperty.entranceRotation);
				setPlayerDimension(client, closestProperty.entranceDimension);
				setPlayerInterior(client, closestProperty.entranceInterior);
				setTimeout(function() {
					if(isFadeCameraSupported()) {
						fadeCamera(client, true, 1.0);
					}
					updateInteriorLightsForPlayer(client, true);
				}, 1000);
			}, 1100);
			stopRadioStreamForPlayer(client);
			getPlayerData(client).streamingRadioStation = -1;
			//logToConsole(LOG_DEBUG, `[VRR.Misc] ${getPlayerDisplayForConsole(client)} exited business ${inBusiness.name}[${inBusiness.index}/${inBusiness.databaseId}]`);
			return true;
		}
	}

	return true;
}

// ===========================================================================

function getPlayerInfoCommand(command, params, client) {
	let targetClient = client;

	if(!areParamsEmpty(params)) {
		if(doesPlayerHaveStaffPermission(client, getStaffFlagValue("BasicModeration"))) {
			targetClient = getPlayerFromParams(params);

			if(!getPlayerData(targetClient)) {
				messagePlayerError(client, "Player not found!");
				return false;
			}
		}
	}

	messagePlayerNormal(client, `{clanOrange}== {jobYellow}Player Info {clanOrange}==============================`);

	let clan = (getPlayerCurrentSubAccount(targetClient).clan != 0) ? `{ALTCOLOUR}${getClanData(getClanIdFromDatabaseId(getPlayerCurrentSubAccount(targetClient).clan)).name}[${getPlayerCurrentSubAccount(targetClient).clan}] (Rank: ${getClanRankData(getPlayerCurrentSubAccount(targetClient).clan, getPlayerCurrentSubAccount(targetClient).clanRank).name}[Level: ${getClanRankData(getPlayerCurrentSubAccount(targetClient).clan, getPlayerCurrentSubAccount(targetClient).clanRank).level}, DBID: ${getClanRankData(getPlayerCurrentSubAccount(targetClient).clan, getPlayerCurrentSubAccount(targetClient).clanRank).databaseId}` : `(None)`;
	let job = (getPlayerCurrentSubAccount(targetClient).job != 0) ? `{ALTCOLOUR}${getJobData(getJobIdFromDatabaseId(getPlayerCurrentSubAccount(targetClient).job)).name}[${getPlayerCurrentSubAccount(targetClient).job}] (Rank: ${getPlayerCurrentSubAccount(targetClient).jobRank})` : `(None)`;

	let stats = [
		`{MAINCOLOUR}Account: {ALTCOLOUR}${getPlayerData(targetClient).accountData.name}[${getPlayerData(targetClient).accountData.databaseId}]`,
		`{MAINCOLOUR}Character: {ALTCOLOUR}${getCharacterFullName(targetClient)}[${getPlayerCurrentSubAccount(targetClient).databaseId}]`,
		`{MAINCOLOUR}Connected: {ALTCOLOUR}${getTimeDifferenceDisplay(Math.ceil(sdl.tick/1000), getPlayerData(targetClient).connectTime)} ago`,
		`{MAINCOLOUR}Registered: ${getPlayerData(targetClient).accountData}`,
		`{MAINCOLOUR}Game Version: {ALTCOLOUR}${targetClient.gameVersion}`,
		`{MAINCOLOUR}Client Version: {ALTCOLOUR}${getPlayerData(targetClient).clientVersion}`,
		`{MAINCOLOUR}Skin: {ALTCOLOUR}${getSkinNameFromModel(getPlayerCurrentSubAccount(targetClient).skin)}[${getPlayerCurrentSubAccount(targetClient).skin}]`,
		`{MAINCOLOUR}Clan: {ALTCOLOUR}${clan}`,
		`{MAINCOLOUR}Job: {ALTCOLOUR}${job}`,

	]

	let chunkedList = splitArrayIntoChunks(stats, 6);
	for(let i in chunkedList) {
		messagePlayerInfo(client, chunkedList[i].join(", "));
	}
}

// ===========================================================================

function playerChangeAFKState(client, afkState) {
    if(afkState) {
        setEntityData(client, "vrr.afk", true, true);
    } else {
        client.removeData("vrr.afk");
    }
}

// ===========================================================================

function checkPlayerSpawning() {
	let clients = getClients();
	for(let i in clients) {
		if(!isConsole(clients[i])) {
			if(getPlayerData(clients[i])) {
				if(getPlayerData(clients[i]).loggedIn) {
					if(!getPlayerData(clients[i]).ped) {
						if(clients[i].player != null) {
							//getPlayerData(clients[i]).ped = clients[i].player;
							onPlayerSpawn(clients[i].player);
						}
					}
				}
			}
		}
	}
}

// ===========================================================================

function showPlayerPrompt(client, promptType, promptMessage, promptTitle) {
	if(promptType == VRR_PROMPT_NONE) {
		return false;
	}

	getPlayerData(client).promptType = promptType;

	if(canPlayerUseGUI(client)) {
		showPlayerPromptGUI(client, promptMessage, promptTitle);
	} else {
		messagePlayerNormal(client, `❓ ${promptMessage}`);
		messagePlayerInfo(client, `{MAINCOLOUR}Use {ALTCOLOUR}/yes or {ALTCOLOUR}/no`);
	}
}

// ===========================================================================

function updateServerGameTime() {
	if(isTimeSupported()) {
		game.time.hour = getServerConfig().hour;
		game.time.minute = getServerConfig().minute;
	}
}

// ===========================================================================

function listOnlineAdminsCommand(command, params, client) {
	//== Admins ===================================
	messagePlayerNormal(client, `{clanOrange}== {jobYellow}Admins {clanOrange}===================================`);

	let admins = [];
	let clients = getClients();
	for(let i in clients) {
		if(getPlayerData(clients[i]) != false) {
			if(getPlayerData(clients[i]).accountData.flags.admin != 0) {
				admins.push(`{ALTCOLOUR}[${getPlayerData(clients[i]).accountData.staffTitle}] {MAINCOLOUR}${getCharacterFullName(clients[i])}`);
			}
		}
	}

	let chunkedList = splitArrayIntoChunks(admins, 3);
	for(let i in chunkedList) {
		messagePlayerInfo(client, chunkedList[i].join(", "));
	}
}

// ===========================================================================