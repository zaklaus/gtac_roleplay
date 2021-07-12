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

    let animationSlot = getAnimationFromParams(params);

	if(!animationSlot) {
		messagePlayerError(client, "That animation doesn't exist!");
		return false;
	}

    getPlayerData(client).currentAnimation = animationSlot;
    getPlayerData(client).animationStart = getCurrentUnixTimestamp();
	//setEntityData(getPlayerData(client).ped, "ag.animation", animationSlot, true);
    makePedPlayAnimation(getPlayerData(client).ped, animationSlot);
}

// ===========================================================================

function getAnimationData(animationSlot, gameId = getServerGame()) {
    return getGameData().animations[gameId][animationSlot];
}

// ===========================================================================