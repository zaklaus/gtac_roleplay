// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: animation.js
// DESC: Provides animation functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initAnimationScript() {
	logToConsole(LOG_DEBUG, "[VRR.Animation]: Initializing animation script ...");
	logToConsole(LOG_DEBUG, "[VRR.Animation]: Animation script initialized!");
}

// ===========================================================================

function playPlayerAnimationCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let animationSlot = getAnimationFromParams(splitParams[0]);
    let animationPositionOffset = getAnimationFromParams(splitParams[1]) || 1;

	if(!animationSlot) {
		messagePlayerError(client, getLocaleString("AnimationNotFound"));
		messagePlayerInfo(client, getLocaleString("AnimationHelpTip"));
		return false;
	}

	if(toInteger(animationPositionOffset) < 0 || toInteger(animationPositionOffset) > 3) {
		messagePlayerError(client, getLocaleString("AnimationInvalidDistance"));
		return false;
	}

    getPlayerData(client).currentAnimation = animationSlot;
	getPlayerData(client).currentAnimationPositionOffset = animationSlot;
	getPlayerData(client).currentAnimationPositionReturnTo = getPlayerPosition(client);
    getPlayerData(client).animationStart = getCurrentUnixTimestamp();
	//setEntityData(getPlayerData(client).ped, "vrr.animation", animationSlot, true);
	messagePlayerTip(client, ``);
    makePedPlayAnimation(getPlayerData(client).ped, animationSlot, animationPositionOffset);

	if(getAnimationData(animationSlot)[9] != VRR_ANIMMOVE_NONE) {
		if(getGame() < VRR_GAME_GTA_SA) {
			setPlayerMouseCameraState(client, true);
		}
	}
}

// ===========================================================================

function stopPlayerAnimationCommand(command, params, client) {
	setPlayerPosition(client, getPlayerData(client).currentAnimationPositionReturnTo);
	makePedStopAnimation(getPlayerData(client).ped);
	setPlayerMouseCameraState(client, false);
}

// ===========================================================================

function showAnimationListCommand(command, params, client) {
	let animList = getGameData().animations[getServerGame()].map(function(x) { return x[0]; });

	let chunkedList = splitArrayIntoChunks(animList, 10);

	messagePlayerInfo(client, `{clanOrange}== {jobYellow}Animation List {clanOrange}===========================`);

	for(let i in chunkedList) {
		messagePlayerInfo(client, chunkedList[i].join(", "));
	}
}

// ===========================================================================

function getAnimationData(animationSlot, gameId = getServerGame()) {
    return getGameData().animations[gameId][animationSlot];
}

// ===========================================================================