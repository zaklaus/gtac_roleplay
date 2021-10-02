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
		messagePlayerError(client, "That animation doesn't exist!");
		messagePlayerInfo(client, "Use /animlist to see a list of valid animations");
		return false;
	}

	if(toInteger(animationPositionOffset) < 0 || toInteger(animationPositionOffset) > 3) {
		messagePlayerError(client, "The offset must be between 0 and 3!")
		return false;
	}

    getPlayerData(client).currentAnimation = animationSlot;
	getPlayerData(client).currentAnimationPositionOffset = animationSlot;
	getPlayerData(client).currentAnimationPositionReturnTo = getPlayerPosition(client);
    getPlayerData(client).animationStart = getCurrentUnixTimestamp();
	//setEntityData(getPlayerData(client).ped, "vrr.animation", animationSlot, true);
	messagePlayerTip(client, `${getInlineChatColourByName("white")}Use ${getInlineChatColourByName("lightGrey")}/stopanim ${getInlineChatColourByName("white")}to stop your animation`);
    makePedPlayAnimation(getPlayerData(client).ped, animationSlot, animationPositionOffset);

	if(getAnimationData(animationSlot)[9] != VRR_ANIMMOVE_NONE) {
		if(getGame() < GAME_GTA_SA) {
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

	messagePlayerInfo(client, `${getInlineChatColourByType("clanOrange")}== ${getInlineChatColourByType("jobYellow")}Animation List ${getInlineChatColourByType("clanOrange")}===========================`);

	for(let i in chunkedList) {
		messagePlayerInfo(client, chunkedList[i].join(", "));
	}
}

// ===========================================================================

function getAnimationData(animationSlot, gameId = getServerGame()) {
    return getGameData().animations[gameId][animationSlot];
}

// ===========================================================================