// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: npc.js
// DESC: Provides NPC usage and functions
// TYPE: Server (JavaScript)
// ===========================================================================

function initNPCScript() {

}

// ===========================================================================

function getNPCData(ped) {
    return false;
}

// ===========================================================================

function createNPCCommand(client, command, params) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let skinId = getSkinModelIndexFromParams(params);

	if(!skinId) {
		messagePlayerError(client, `Invalid skin`);
		return false;
	}

	let position = getPosInFrontOfPos(getPlayerPosition(client), getPlayerHeading(client), 3);

    let tempNPCData = new NPCData(false);
	tempNPCData.position = position;
	tempNPCData.heading = getPlayerHeading(client);
	tempNPCData.skin = skinId;

	let npcIndex = getServerData().npcs.push(tempNPCData);

	spawnNPC(npcIndex-1);
}

// ===========================================================================