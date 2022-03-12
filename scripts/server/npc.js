// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: npc.js
// DESC: Provides NPC usage and functions
// TYPE: Server (JavaScript)
// ===========================================================================

// NPC Trigger Condition Match Types
const VRR_NPC_COND_MATCH_NONE = 0;               // None (invalid)
const VRR_NPC_COND_MATCH_EQ = 1;                 // Must be equal to
const VRR_NPC_COND_MATCH_GT = 2;                 // Must be greater than
const VRR_NPC_COND_MATCH_LT = 3;                 // Must be less than
const VRR_NPC_COND_MATCH_GTEQ = 4;               // Must be greater than or equal to
const VRR_NPC_COND_MATCH_LTEQ = 5;               // Must be less than or equal to
const VRR_NPC_COND_MATCH_CONTAINS = 6;           // Must contain string (case insensitive)
const VRR_NPC_COND_MATCH_CONTAINS_CASE = 7;      // Must contain string (case sensitive)
const VRR_NPC_COND_MATCH_EXACT = 8;              // Must match string exactly (case insensitive)
const VRR_NPC_COND_MATCH_EXACT_CASE = 9;         // Must match string exactly (case insensitive)

// ===========================================================================

class NPCData {
	constructor(dbAssoc = false) {
		this.databaseId = 0;
		this.serverId = 0;
		this.firstName = "John";
		this.lastName = "Doe";
		this.middleName = "Q";
		this.skin = 0;
		this.cash = 0;
		this.spawnPosition = toVector3(0.0, 0.0, 0.0);
		this.spawnHeading = 0.0;
		this.clan = 0;
		this.isWorking = false;
		this.jobUniform = this.skin;
		this.lastJobVehicle = null;
		this.job = 0;
		this.weapons = [];
		this.interior = 0;
		this.dimension = 0;
		this.pedScale = toVector3(1.0, 1.0, 1.0);
		this.walkStyle = 0;
		this.fightStyle = 0;
		this.health = 100;
		this.armour = 100;
		this.currentAction = VRR_NPCACTION_NONE;
		this.triggers = [];

		this.bodyParts = {
			hair: [0,0],
			head: [0,0],
			upper: [0,0],
			lower: [0,0],
		};

		this.bodyProps = {
			hair: [0,0],
			eyes: [0,0],
			head: [0,0],
			leftHand: [0,0],
			rightHand: [0,0],
			leftWrist: [0,0],
			rightWrist: [0,0],
			hip: [0,0],
			leftFoot: [0,0],
			rightFoot: [0,0],
		};

		if(dbAssoc) {
			this.databaseId = toInteger(dbAssoc["npc_id"]);
			this.serverId = toInteger(dbAssoc["npc_server"]);
			this.firstName = dbAssoc["npc_name_first"];
			this.lastName = dbAssoc["npc_name_last"];
			this.middleName = dbAssoc["npc_name_middle"] || "";
			this.skin = toInteger(dbAssoc["npc_skin"]);
			this.cash = toInteger(dbAssoc["npc_cash"]);
			this.spawnPosition = toVector3(toFloat(dbAssoc["npc_pos_x"]), toFloat(dbAssoc["npc_pos_y"]), toFloat(dbAssoc["npc_pos_z"]));
			this.spawnHeading = toFloat(dbAssoc["npc_angle"]);
			this.lastLogin = toInteger(dbAssoc["npc_when_lastlogin"]);
			this.clan = toInteger(dbAssoc["npc_clan"]);
			this.clanFlags = toInteger(dbAssoc["npc_clan_flags"]);
			this.clanRank = toInteger(dbAssoc["npc_clan_rank"]);
			this.clanTitle = toInteger(dbAssoc["npc_clan_title"]);
			this.job = toInteger(dbAssoc["npc_job"]);
			this.interior = toInteger(dbAssoc["npc_int"]);
			this.dimension = toInteger(dbAssoc["npc_vw"]);
			this.pedScale = toVector3(toFloat(dbAssoc["npc_scale_x"]), toFloat(dbAssoc["npc_scale_y"]), toFloat(dbAssoc["npc_scale_z"]));
			this.walkStyle = toInteger(dbAssoc["npc_walkstyle"]);
			this.fightStyle = toInteger(dbAssoc["npc_fightstyle"]);
			this.health = toInteger(dbAssoc["npc_health"]);
			this.armour = toInteger(dbAssoc["npc_armour"]);

			this.bodyParts = {
				hair: [toInteger(dbAssoc["npc_hd_part_hair_model"]) || 0, toInteger(dbAssoc["npc_hd_part_hair_texture"]) || 0],
				head: [toInteger(dbAssoc["npc_hd_part_head_model"]) || 0, toInteger(dbAssoc["npc_hd_part_head_texture"]) || 0],
				upper: [toInteger(dbAssoc["npc_hd_part_upper_model"]) || 0, toInteger(dbAssoc["npc_hd_part_upper_texture"]) || 0],
				lower: [toInteger(dbAssoc["npc_hd_part_lower_model"]) || 0, toInteger(dbAssoc["npc_hd_part_lower_texture"]) || 0],
			};

			this.bodyProps = {
				hair: [toInteger(dbAssoc["npc_hd_prop_hair_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_hair_texture"]) || 0],
				eyes: [toInteger(dbAssoc["npc_hd_prop_eyes_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_eyes_texture"]) || 0],
				head: [toInteger(dbAssoc["npc_hd_prop_head_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_head_texture"]) || 0],
				leftHand: [toInteger(dbAssoc["npc_hd_prop_lefthand_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_lefthand_texture"]) || 0],
				rightHand: [toInteger(dbAssoc["npc_hd_prop_righthand_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_righthand_texture"]) || 0],
				leftWrist: [toInteger(dbAssoc["npc_hd_prop_leftwrist_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_leftwrist_texture"]) || 0],
				rightWrist: [toInteger(dbAssoc["npc_hd_prop_rightwrist_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_rightwrist_texture"]) || 0],
				hip: [toInteger(dbAssoc["npc_hd_prop_hip_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_hip_texture"]) || 0],
				leftFoot: [toInteger(dbAssoc["npc_hd_prop_leftfoot_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_leftfoot_texture"]) || 0],
				rightFoot: [toInteger(dbAssoc["npc_hd_prop_rightfoot_model"]) || 0, toInteger(dbAssoc["npc_hd_prop_rightfoot_texture"]) || 0],
			};
		}
	}
};

// ===========================================================================

class NPCTriggerData {
	constructor(dbAssoc = false) {
		this.databaseId = 0;
		this.npcId = 0;
		this.index = 0;
		this.npc = 0;
		this.npcIndex = -1;
		this.triggerType = 0;
		this.conditions = [];
		this.responses = [];

		if(dbAssoc) {
			this.databaseId = toInteger(dbAssoc["npc_trig_id"]);
			this.npc = toInteger(dbAssoc["npc_trig_npc"]);
			this.triggerType = toInteger(dbAssoc["npc_trig_type"]);
		}
	}
};

// ===========================================================================

class NPCTriggerConditionData {
	constructor(dbAssoc = false) {
		this.databaseId = 0;
		this.triggerId = 0;
		this.index = 0;
		this.triggerIndex = 0;
		this.conditionType = 0;
		this.conditionValue = false;
		this.matchType = false;

		if(dbAssoc) {
			this.databaseId = toInteger(dbAssoc["npc_trig_cond_id"]);
			this.npc = toInteger(dbAssoc["npc_trig_cond_trig"]);
			this.conditionType = toInteger(dbAssoc["npc_trig_cond_type"]);
			this.conditionValue = toInteger(dbAssoc["npc_trig_cond_val"]);
			this.matchType = toInteger(dbAssoc["npc_trig_cond_val"]);
		}
	}
};

// ===========================================================================

class NPCTriggerResponseData {
	constructor(dbAssoc = false) {
		this.databaseId = 0;
		this.triggerId = 0;
		this.index = 0;
		this.triggerIndex = 0;
		this.responseType = 0;
		this.responseValue = false;

		if(dbAssoc) {
			this.databaseId = toInteger(dbAssoc["npc_trig_resp_id"]);
			this.npc = toInteger(dbAssoc["npc_trig_resp_trig"]);
			this.responseType = toInteger(dbAssoc["npc_trig_resp_type"]);
			this.responseValue = toInteger(dbAssoc["npc_trig_resp_val"]);
		}
	}
};

// ===========================================================================

function initNPCScript() {
	getServerData().npcs = loadNPCsFromDatabase();
	setAllNPCDataIndexes();

	spawnAllNPCs();
}

// ===========================================================================

/**
 * @param {Ped} ped - The data index of the NPC
 * @return {NPCData} The NPC's data (class instancee)
 */
function getNPCData(ped) {
	if(ped.getData("vrr.dataIndex")) {
		return ped.getData("vrr.dataIndex");
	}
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

function loadNPCsFromDatabase() {
	logToConsole(LOG_INFO, `[VRR.NPC]: Loading NPCs from database ...`);
	let dbConnection = connectToDatabase();
	let tempNPCs = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM npc_main WHERE npc_server = ${getServerId()} AND npc_enabled = 1`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempNPCData = new NPCData(dbAssoc);
				tempNPCData.triggers = loadNPCTriggersFromDatabase();
				tempNPCs.push(tempNPCData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.NPC]: ${tempNPCs.length} NPCs loaded from database successfully!`);
	return tempNPCs;
}

// ===========================================================================

function loadNPCTriggersFromDatabase(npcDatabaseId) {
	logToConsole(LOG_INFO, `[VRR.NPC]: Loading NPC triggers for NPC ${npcDatabaseId} from database ...`);
	let dbConnection = connectToDatabase();
	let tempNPCTriggers = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM npc_trig WHERE npc_trig_npc = ${npcDatabaseId} AND npc_trig_enabled = 1`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempNPCTriggerData = new NPCTriggerData(dbAssoc);
				tempNPCTriggerData.conditions = loadNPCTriggerConditionsFromDatabase(tempNPCTriggerData.databaseId);
				tempNPCTriggerData.responses = loadNPCTriggerResponsesFromDatabase(tempNPCTriggerData.databaseId);
				tempNPCTriggers.push(tempNPCTriggerData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.NPC]: ${tempNPCTriggers.length} NPC triggers loaded for NPC ${npcDatabaseId} from database successfully!`);
	return tempNPCTriggers;
}

// ===========================================================================

function loadNPCTriggerConditionsFromDatabase(npcTriggerDatabaseId) {
	logToConsole(LOG_INFO, `[VRR.NPC]: Loading NPC trigger conditions for trigger ${npcTriggerDatabaseId} from database ...`);
	let dbConnection = connectToDatabase();
	let tempNPCTriggerConditions = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM npc_cond WHERE npc_cond_trig = ${npcTriggerDatabaseId} AND npc_cond_enabled = 1`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempNPCTriggerConditionData = new NPCTriggerConditionData(dbAssoc);
				tempNPCTriggerConditions.push(tempNPCTriggerConditionData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.NPC]: ${tempNPCTriggerConditions.length} conditions loaded for trigger ${npcTriggerDatabaseId} from database successfully!`);
	return tempNPCTriggerConditions;
}

// ===========================================================================

function loadNPCTriggerResponsesFromDatabase(npcTriggerDatabaseId) {
	logToConsole(LOG_INFO, `[VRR.NPC]: Loading NPC trigger responses for trigger ${npcTriggerDatabaseId} from database ...`);
	let dbConnection = connectToDatabase();
	let tempNPCTriggerResponses = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM npc_resp WHERE npc_resp_trig = ${npcTriggerDatabaseId} AND npc_resp_enabled = 1`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempNPCTriggerResponseData = new NPCTriggerResponseData(dbAssoc);
				tempNPCTriggerResponses.push(tempNPCTriggerResponseData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.NPC]: ${tempNPCTriggerResponses.length} responses loaded for trigger ${npcTriggerDatabaseId} from database successfully!`);
	return tempNPCTriggerResponses;
}

// ===========================================================================

function saveAllNPCsToDatabase() {
	for(let i in getServerData().npcs) {
		saveNPCToDatabase(i);
	}
}

// ===========================================================================

function saveNPCToDatabase(npc) {
	if(getNPCData(vehicleDataId) == null) {
		// Invalid vehicle data
		return false;
	}

	let tempVehicleData = getServerData().vehicles[vehicleDataId];

	if(tempVehicleData.databaseId == -1) {
		// Temp vehicle, no need to save
		return false;
	}

	if(!tempVehicleData.needsSaved) {
		// Vehicle hasn't changed. No need to save.
		return false;
	}

	logToConsole(LOG_VERBOSE, `[VRR.Vehicle]: Saving vehicle ${tempVehicleData.databaseId} to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		if(tempVehicleData.vehicle != false) {
			if(!tempVehicleData.spawnLocked) {
				if(areServerElementsSupported()) {
					tempVehicleData.spawnPosition = tempVehicleData.vehicle.position;
					tempVehicleData.spawnRotation = tempVehicleData.vehicle.heading;
				} else {
					tempVehicleData.spawnPosition = tempVehicleData.syncPosition;
					tempVehicleData.spawnRotation = tempVehicleData.syncHeading;
				}
			}
		}

		let data = [
			["veh_server", getServerId()],
			["veh_model", toInteger(tempVehicleData.model)],
			["veh_owner_type", toInteger(tempVehicleData.ownerType)],
			["veh_owner_id", toInteger(tempVehicleData.ownerId)],
			["veh_locked", boolToInt(tempVehicleData.locked)],
			["veh_spawn_lock", boolToInt(tempVehicleData.spawnLocked)],
			["veh_buy_price", toInteger(tempVehicleData.buyPrice)],
			["veh_rent_price", toInteger(tempVehicleData.rentPrice)],
			["veh_pos_x", toFloat(tempVehicleData.spawnPosition.x)],
			["veh_pos_y", toFloat(tempVehicleData.spawnPosition.y)],
			["veh_pos_z", toFloat(tempVehicleData.spawnPosition.z)],
			["veh_rot_z", toFloat(tempVehicleData.spawnRotation)],
			["veh_col1", toInteger(tempVehicleData.colour1)],
			["veh_col2", toInteger(tempVehicleData.colour2)],
			["veh_col3", toInteger(tempVehicleData.colour3)],
			["veh_col4", toInteger(tempVehicleData.colour4)],
			["veh_col1_isrgb", boolToInt(tempVehicleData.colour1IsRGBA)],
			["veh_col2_isrgb", boolToInt(tempVehicleData.colour2IsRGBA)],
			["veh_col3_isrgb", boolToInt(tempVehicleData.colour3IsRGBA)],
			["veh_col4_isrgb", boolToInt(tempVehicleData.colour4IsRGBA)],
			["veh_extra1", tempVehicleData.extras[0]],
			["veh_extra2", tempVehicleData.extras[1]],
			["veh_extra3", tempVehicleData.extras[2]],
			["veh_extra4", tempVehicleData.extras[3]],
			["veh_extra5", tempVehicleData.extras[4]],
			["veh_extra6", tempVehicleData.extras[5]],
			["veh_extra7", tempVehicleData.extras[6]],
			["veh_extra8", tempVehicleData.extras[7]],
			["veh_extra9", tempVehicleData.extras[8]],
			["veh_extra10", tempVehicleData.extras[9]],
			["veh_extra11", tempVehicleData.extras[10]],
			["veh_extra12", tempVehicleData.extras[11]],
			["veh_extra13", tempVehicleData.extras[12]],
			["veh_engine", intToBool(tempVehicleData.engine)],
			["veh_lights", intToBool(tempVehicleData.lights)],
			["veh_health", toInteger(tempVehicleData.health)],
			["veh_damage_engine", toInteger(tempVehicleData.engineDamage)],
			["veh_damage_visual", toInteger(tempVehicleData.visualDamage)],
			["veh_dirt_level", toInteger(tempVehicleData.dirtLevel)],
			["veh_int", toInteger(tempVehicleData.interior)],
			["veh_vw", toInteger(tempVehicleData.dimension)],
			["veh_livery", toInteger(tempVehicleData.livery)],
		];

		let dbQuery = null;
		if(tempVehicleData.databaseId == 0) {
			let queryString = createDatabaseInsertQuery("veh_main", data);
			dbQuery = queryDatabase(dbConnection, queryString);
			getServerData().vehicles[vehicleDataId].databaseId = getDatabaseInsertId(dbConnection);
			getServerData().vehicles[vehicleDataId].needsSaved = false;
		} else {
			let queryString = createDatabaseUpdateQuery("veh_main", data, `veh_id=${tempVehicleData.databaseId}`);
			dbQuery = queryDatabase(dbConnection, queryString);
			getServerData().vehicles[vehicleDataId].needsSaved = false;
		}

		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
		return true;
	}
	logToConsole(LOG_VERBOSE, `[VRR.Vehicle]: Saved vehicle ${vehicleDataId} to database!`);

	return false;
}

// ===========================================================================

function setAllNPCDataIndexes() {
	for(let i in getServerData().npcs) {
		getServerData().npcs[i].index = i;

		for(let j in getServerData().npcs[i].triggers) {
			getServerData().npcs[i].triggers[j].index = j;
			getServerData().npcs[i].triggers[j].npcIndex = i;

			for(let k in getServerData().npcs[i].triggers[j].conditions) {
				getServerData().npcs[i].triggers[j].conditions[k].index = k;
				getServerData().npcs[i].triggers[j].conditions[m].triggerIndex = j;
			}

			for(let m in getServerData().npcs[i].triggers[j].responses) {
				getServerData().npcs[i].triggers[j].responses[m].index = m;
				getServerData().npcs[i].triggers[j].responses[m].triggerIndex = j;
			}
		}
	}
}

// ===========================================================================

function spawnNPC(npcIndex) {
	let civilian = createGameCivilian(getNPCData(npcIndex).model, getNPCData(npcIndex).spawnPosition, getNPCData(npcIndex).spawnRotation);
	if(civilian) {
		civilian.setData("vrr.dataIndex", npcIndex);
		getNPCData(npcIndex).ped = civilian;
	}
}

// ===========================================================================

function spawnAllNPCs() {
	for(let i in getServerData().npcs) {
		spawnNPC(npcIndex);
	}
}

// ===========================================================================