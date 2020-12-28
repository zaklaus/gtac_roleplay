// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: class.js
// DESC: Provides classes
// TYPE: Server (JavaScript)
// ===========================================================================

let serverClasses = initClassTable();

// ---------------------------------------------------------------------------

function initClassScript() {
}

// ---------------------------------------------------------------------------

function initClassTable() {
	let tempClasses = {
		serverConfigData: class {
			constructor(dbAssoc) {
				this.databaseId = 0;
				this.name = "";
				this.password = "";

				this.newCharacter = {
					spawnPosition: false,
					spawnHeading: 0.0,
					money: 0,
					bank: 0,
					skin: 0,
				};

				this.connectCameraPosition = false;
				this.connectCameraLookAt = false;
				this.hour = 0;
				this.minute = 0
				this.weather = 0
				this.fallingSnow = false;
				this.groundSnow = false;
				this.useGUI = true;
				this.guiColour = [200, 200, 200];
				this.showLogo = true;

				this.antiCheat = {
					enabled: false,
					checkGameScripts: false,
					gameScriptWhiteList: [],
					gameScriptBlackList: [],
				};

				this.discordBotToken = "";
				this.discordEnabled = false;

				if(dbAssoc) {
					this.databaseId = dbAssoc["svr_id"];
					this.name = dbAssoc["svr_name"];
					this.password = dbAssoc["svr_password"];
					this.newCharacter = {
						spawnPosition: toVector3(dbAssoc["svr_newchar_pos_x"], dbAssoc["svr_newchar_pos_y"], dbAssoc["svr_newchar_pos_z"]),
						spawnHeading: dbAssoc["svr_newchar_rot_z"],
						money: dbAssoc["svr_newchar_money"],
						bank: dbAssoc["svr_newchar_bank"],
						skin: dbAssoc["svr_newchar_skin"],
					},
	
					this.connectCameraPosition = toVector3(dbAssoc["svr_connectcam_pos_x"], dbAssoc["svr_connectcam_pos_y"], dbAssoc["svr_connectcam_pos_z"]);
					this.connectCameraLookAt = toVector3(dbAssoc["svr_connectcam_lookat_x"], dbAssoc["svr_connectcam_lookat_y"], dbAssoc["svr_connectcam_lookat_z"]);
					this.hour = toInteger(dbAssoc["svr_start_time_hour"]);
					this.minute = toInteger(dbAssoc["svr_start_time_min"]);
					this.weather = toInteger(dbAssoc["svr_start_weather"]);
					this.fallingSnow = intToBool(dbAssoc["svr_start_snow_falling"]);
					this.groundSnow = intToBool(dbAssoc["svr_start_snow_ground"]);
					this.useGUI = intToBool(dbAssoc["svr_gui"]);
					this.guiColour = [toInteger(dbAssoc["svr_gui_col1_r"]), toInteger(dbAssoc["svr_gui_col1_g"]), toInteger(dbAssoc["svr_gui_col1_b"])];
					this.showLogo = intToBool(dbAssoc["svr_logo"]);
	
					this.antiCheat = {
						enabled: intToBool(dbAssoc["svr_ac_enabled"]),
						checkGameScripts: intToBool(dbAssoc["svr_ac_check_scripts"]),
						gameScriptWhiteList: [],
						gameScriptBlackList: [],
					};

					this.discordBotToken = "";
					this.discordEnabled = false;
				}
			}
		},
		clientData: class {
			constructor(client, accountData, subAccounts) {
				this.accountData = accountData;
				this.subAccounts = subAccounts; // Characters
				this.client = client;
				this.currentSubAccount = -1;
				this.loggedIn = false;

				this.busRoute = null;
				this.busRouteStop = null;
				this.busRouteIsland = null;

				this.garbageRoute = null;
				this.garbageRouteStop = null;
				this.garbageRouteIsland = null;
				
				this.spawned = false;

				this.rentingVehicle = false;
				this.buyingVehicle = false;

				this.lastVehicle = false;

				this.returnToJobVehicleTick = 0;
				this.returnToJobVehicleTimer = null;
			}
		},
		accountData: class {
			constructor(accountAssoc) {
				if(!accountAssoc) {
					return;
				}
				
				this.databaseId = accountAssoc["acct_id"];
				this.name = accountAssoc["acct_name"];
				this.password = accountAssoc["acct_pass"];
				this.registerDate = accountAssoc["acct_when_made"];
				this.flags = {
					moderation: accountAssoc["acct_mod_flags"],
					settings: accountAssoc["acct_settings"],
					admin: accountAssoc["acct_staff_flags"],
				};
				this.staffTitle = accountAssoc["acct_staff_title"];
				this.ircAccount = accountAssoc["acct_irc"] || "None";
				this.discordAccount = accountAssoc["acct_discord"];
				this.settings = accountAssoc["acct_settings"];
				this.emailAddress = accountAssoc["acct_email"];
				this.ipAddress = accountAssoc["ip"];
				
				this.notes = [];
				this.messages = [];
				this.keyBinds = [];
				this.contacts = [];
				this.subAccounts = [];
				this.loggedIn = false;				
			}
		},
		accountContactData: class {
			constructor(accountContactAssoc) {
				if(!accountContactAssoc) {
					return;
				}
				
				this.databaseId = accountContactAssoc["acct_contact_id"];
				this.accountId = accountContactAssoc["acct_contact_acct"];
				this.contactAccountId = accountContactAssoc["acct_contact_contact"];
				this.type = accountContactAssoc["acct_contact_type"];
				this.whenAdded = accountContactAssoc["acct_contact_when_added"];
			}
		},
		accountMessageData: class {
			constructor(accountMessageAssoc) {
				if(!accountMessageAssoc) {
					return;
				}
				
				this.databaseId = accountMessageAssoc["acct_msg_id"];
				this.account = accountMessageAssoc["acct_msg_acct"];
				this.whoSent = accountMessageAssoc["acct_msg_who_sent"];
				this.whenSent = accountMessageAssoc["acct_msg_when_sent"];
				this.whenRead = accountMessageAssoc["acct_msg_when_read"];
				this.deleted = intToBool(accountMessageAssoc["acct_msg_deleted"]);
				this.whenDeleted = accountMessageAssoc["acct_msg_when_deleted"];
				this.folder = accountMessageAssoc["acct_msg_folder"];
				this.message = accountMessageAssoc["acct_msg_message"];
			}
		},		
		accountStaffNoteData: class {
			constructor(accountStaffNoteAssoc) {
				if(!accountStaffNoteAssoc) {
					return;
				}
				
				this.databaseId = accountStaffNoteAssoc["acct_note_id"];
				this.account = accountStaffNoteAssoc["acct_note_acct"];
				this.whoAdded = accountStaffNoteAssoc["acct_note_who_added"];
				this.whenAdded = accountStaffNoteAssoc["acct_note_when_added"];
				this.deleted = intToBool(accountMessageAssoc["acct_note_deleted"]);
				this.whenDeleted = accountMessageAssoc["acct_note_when_deleted"];
				this.server = accountMessageAssoc["acct_note_server"];
				this.note = accountMessageAssoc["acct_note_message"];
			}
		},			
		subAccountData: class {
			constructor(subAccountAssoc) {
				if(!subAccountAssoc) {
					return;
				}
				
				this.databaseId = subAccountAssoc["sacct_id"];
				this.server = subAccountAssoc["sacct_server"];
				this.firstName = subAccountAssoc["sacct_name_first"];
				this.lastName = subAccountAssoc["sacct_name_last"];
				this.account = subAccountAssoc["sacct_acct"];
				this.skin = subAccountAssoc["sacct_skin"];
				this.cash = subAccountAssoc["sacct_cash"];
				this.placeOfOrigin = subAccountAssoc["sacct_origin"];
				this.dateOfBirth = subAccountAssoc["sacct_when_born"];
				this.spawnPosition = toVector3(subAccountAssoc["sacct_pos_x"], subAccountAssoc["sacct_pos_y"], subAccountAssoc["sacct_pos_z"]);
				this.spawnHeading = toFloat(subAccountAssoc["sacct_angle"]);
				this.lastLogin = toInteger(subAccountAssoc["sacct_last_login"]);

				this.clan = toInteger(subAccountAssoc["sacct_clan"]);
				this.clanFlags = toInteger(subAccountAssoc["sacct_clan_flags"]);
				this.clanRank = toInteger(subAccountAssoc["sacct_clan_rank"]);
				this.clanTitle = toInteger(subAccountAssoc["sacct_clan_title"]);

				this.isWorking = false;
				this.jobUniform = this.skin;
				this.lastJobVehicle = null;
				this.job = subAccountAssoc["sacct_job"];

				this.weapons = [];
				this.inJail = false;
				
				this.interior = 0;
				this.dimension = 0;
			}
		},		
		businessData: class {
			constructor(businessAssoc) {
				this.databaseId = 0;
				this.name = "";
				this.ownerType = AG_BIZOWNER_NONE;
				this.ownerId = 0
				this.locked = false

				this.entrancePosition = false;
				this.entranceRotation = 0.0;
				this.entranceInterior = 0;
				this.entranceDimension = 0;
				this.entrancePickupModel = -1;
				this.entranceBlipModel = -1;
				this.entrancePickup = null;
				this.entranceBlip = null;
				
				this.exitPosition = false;
				this.exitRotation = 0.0;
				this.exitInterior = 0;
				this.exitDimension = 0;
				this.exitPickupModel = -1;
				this.exitBlipModel = -1;
				this.exitPickup = null;
				this.exitBlip = null;

				this.entranceFee = 0;
				this.till = 0

				if(businessAssoc != false) {
					this.databaseId = toInteger(businessAssoc["biz_id"]);
					this.name = toString(businessAssoc["biz_name"]);
					this.ownerType = toInteger(businessAssoc["biz_owner_type"]);
					this.ownerId = toInteger(businessAssoc["biz_owner_id"]);
					this.locked = intToBool(toInteger(businessAssoc["biz_locked"]));
	
					this.entrancePosition = toVector3(toFloat(businessAssoc["biz_entrance_pos_x"]), toFloat(businessAssoc["biz_entrance_pos_y"]), toFloat(businessAssoc["biz_entrance_pos_z"]));
					this.entranceRotation = toInteger(businessAssoc["biz_entrance_rot_z"]);
					this.entranceInterior = toInteger(businessAssoc["biz_entrance_int"]);
					this.entranceDimension = toInteger(businessAssoc["biz_entrance_vw"]);
					this.entrancePickupModel = toInteger(businessAssoc["biz_entrance_pickup"]);
					this.entranceBlipModel = toInteger(businessAssoc["biz_entrance_blip"]);	
					this.entrancePickup = null;
					this.entrancePickup = null;
					
					this.exitPosition = toVector3(businessAssoc["biz_exit_pos_x"], businessAssoc["biz_exit_pos_y"], businessAssoc["biz_exit_pos_z"]);
					this.exitRotation = toInteger(businessAssoc["biz_exit_rot_z"]);
					this.exitInterior = toInteger(businessAssoc["biz_exit_int"]);
					this.exitDimension = toInteger(businessAssoc["biz_exit_vw"]);
					this.exitPickupModel = toInteger(businessAssoc["biz_exit_pickup"]);
					this.exitBlipModel = toInteger(businessAssoc["biz_exit_blip"]);
					this.exitPickup = null;
					this.exitBlip = null;
	
					this.entranceFee = toInteger(businessAssoc["biz_entrance_fee"]);
					this.till = toInteger(businessAssoc["biz_till"]);
				}
			}
		},
		businessLocationData: class {
			constructor(businessLocationAssoc) {
				if(!businessLocationAssoc) {
					return;
				}

				this.databaseId = toInteger(businessLocationAssoc("biz_loc_id"));
				this.name = toString(businessLocationAssoc("biz_loc_name"));
				this.type = toInteger(businessLocationAssoc("biz_loc_type"));
				this.business = toInteger(businessLocationAssoc("biz_loc_biz"));
				this.enabled = intToBool(toInteger(businessLocationAssoc("biz_loc_enabled")));

				this.position = toVector3(toFloat(businessLocationAssoc("biz_loc_pos_x")), toFloat(businessLocationAssoc("biz_loc_pos_y")), toFloat(businessLocationAssoc("biz_loc_pos_z")));
				this.interior = toInteger(businessLocationAssoc["biz_loc_int"]);
				this.dimension = toInteger(businessLocationAssoc["biz_loc_vw"]);
			}
		},
		houseData: class {
			constructor(houseAssoc) {
				this.databaseId = 0
				this.description = "";
				this.ownerType = AG_HOUSEOWNER_NONE;
				this.ownerId = 0
				this.locked = false;
	
				this.entrancePosition = false;
				this.entranceRotation = 0.0;
				this.entranceInterior = 0;
				this.entranceDimension = 0;
				this.entrancePickupModel = -1;
				this.entranceBlipModel = -1;
				this.entrancePickup = null;
				this.entranceBlip = null;
				
				this.exitPosition = false;
				this.exitRotation = 0.0;
				this.exitInterior = 0;
				this.exitDimension = -1;
				this.exitPickupModel = -1;
				this.exitBlipModel = -1;
				this.exitPickup = null;
				this.exitBlip = null;

				if(houseAssoc != false) {
					this.databaseId = toInteger(houseAssoc["house_id"]);
					this.description = toString(houseAssoc["house_description"]);
					this.ownerType = toInteger(houseAssoc["house_owner_type"]);
					this.ownerId = toInteger(houseAssoc["house_owner_id"]);
					this.locked = intToBool(toInteger(houseAssoc["house_locked"]));
		
					this.entrancePosition = toVector3(toFloat(houseAssoc["house_entrance_pos_x"]), toFloat(houseAssoc["house_entrance_pos_y"]), toFloat(houseAssoc["house_entrance_pos_z"]));
					this.entranceRotation = toFloat(houseAssoc["house_entrance_rot_z"]);
					this.entranceInterior = toInteger(houseAssoc["house_entrance_int"]);
					this.entranceDimension = toInteger(houseAssoc["house_entrance_vw"]);
					this.entrancePickupModel = toInteger(houseAssoc["house_entrance_pickup"]);
					this.entranceBlipModel = toInteger(houseAssoc["house_entrance_blip"]);	
					this.entrancePickup = null;
					this.entranceBlip = null;
					
					this.exitPosition = toVector3(toFloat(houseAssoc["house_exit_pos_x"]), toFloat(houseAssoc["house_exit_pos_y"]), toFloat(houseAssoc["house_exit_pos_z"]));
					this.exitRotation = toFloat(houseAssoc["house_exit_rot_z"]);
					this.exitInterior = toInteger(houseAssoc["house_exit_int"]);
					this.exitDimension = toInteger(houseAssoc["house_exit_vw"]);
					this.exitPickupModel = toInteger(houseAssoc["house_exit_pickup"]);
					this.exitBlipModel = toInteger(houseAssoc["house_exit_blip"]);
					this.exitPickup = null;
					this.exitBlip = null;
				}
			}
		},
		familyData: class {

		},
		factionData: class {

		},
		vehicleData: class {
			constructor(vehicleAssoc = false, vehicle = false) {
				// General Info
				this.databaseId = 0;
				this.server = getServerId();
				this.model = (vehicle != false) ? vehicle.modelIndex : 0;
				this.vehicle = vehicle;
				
				// Ownership
				this.ownerType = AG_VEHOWNER_NONE;
				this.ownerId = 0;
				this.buyPrice = 0;
				this.rentPrice = 0;
				this.rentedBy = false;
				this.rentStart = 0;				
				
				// Position and Rotation
				this.spawnPosition = (vehicle) ? vehicle.position : toVector3(0.0, 0.0, 0.0);
				this.spawnRotation = (vehicle) ? vehicle.heading : 0.0;
				this.spawnLocked = false;
				
				// Colour Info
				this.colour1IsRGBA = 0;
				this.colour2IsRGBA = 0;
				this.colour3IsRGBA = 0;
				this.colour4IsRGBA = 0;		
				this.colour1RGBA = toColour(255, 255, 255, 255);
				this.colour2RGBA = toColour(255, 255, 255, 255);
				this.colour3RGBA = toColour(255, 255, 255, 255);
				this.colour4RGBA = toColour(255, 255, 255, 255);		
				this.colour1 = (vehicle) ? vehicle.colour1 : 1;
				this.colour2 = (vehicle) ? vehicle.colour2 : 1;
				this.colour3 = (vehicle) ? vehicle.colour3 : 1; 
				this.colour4 = (vehicle) ? vehicle.colour4 : 1;

				// Vehicle Attributes
				this.locked = false;
				this.engine = false;
				this.lights = false;
				this.health = 1000;
				this.engineDamage = 0;
				this.visualDamage = 0;
				this.dirtLevel = 0;
				
				if(vehicleAssoc) {
					// General Info
					this.databaseId = toInteger(vehicleAssoc["veh_id"]);
					this.server = toInteger(vehicleAssoc["veh_server"]);
					this.model = toInteger(vehicleAssoc["veh_model"]);
					
					// Ownership
					this.ownerType = toInteger(vehicleAssoc["veh_owner_type"]);
					this.ownerId = toInteger(vehicleAssoc["veh_owner_id"]);
					this.buyPrice = toInteger(vehicleAssoc["veh_buy_price"]);
					this.rentPrice = toInteger(vehicleAssoc["veh_buy_price"]);
					
					// Position and Rotation
					this.spawnPosition = toVector3(vehicleAssoc["veh_pos_x"], vehicleAssoc["veh_pos_y"], vehicleAssoc["veh_pos_z"]);
					this.spawnRotation = toInteger(vehicleAssoc["veh_rot_z"]);
					this.spawnLocked = intToBool(toInteger(vehicleAssoc["veh_spawn_lock"]));
					
					// Colour Info
					this.colour1IsRGBA = intToBool(toInteger(vehicleAssoc["veh_col1_isrgba"]));
					this.colour2IsRGBA = intToBool(toInteger(vehicleAssoc["veh_col2_isrgba"]));
					this.colour3IsRGBA = intToBool(toInteger(vehicleAssoc["veh_col3_isrgba"]));
					this.colour4IsRGBA = intToBool(toInteger(vehicleAssoc["veh_col4_isrgba"]));		
					this.colour1RGBA = toColour(toInteger(vehicleAssoc["veh_col1_r"]), toInteger(vehicleAssoc["veh_col1_g"]), toInteger(vehicleAssoc["veh_col1_b"]), toInteger(vehicleAssoc["veh_col1_a"]));
					this.colour2RGBA = toColour(toInteger(vehicleAssoc["veh_col2_r"]), toInteger(vehicleAssoc["veh_col2_g"]), toInteger(vehicleAssoc["veh_col2_b"]), toInteger(vehicleAssoc["veh_col2_a"]));
					this.colour3RGBA = toColour(toInteger(vehicleAssoc["veh_col3_r"]), toInteger(vehicleAssoc["veh_col3_g"]), toInteger(vehicleAssoc["veh_col3_b"]), toInteger(vehicleAssoc["veh_col3_a"]));
					this.colour4RGBA = toColour(toInteger(vehicleAssoc["veh_col4_r"]), toInteger(vehicleAssoc["veh_col4_g"]), toInteger(vehicleAssoc["veh_col4_b"]), toInteger(vehicleAssoc["veh_col4_a"]));		
					this.colour1 = toInteger(vehicleAssoc["veh_col1"]);
					this.colour2 = toInteger(vehicleAssoc["veh_col2"]);
					this.colour3 = toInteger(vehicleAssoc["veh_col3"]);
					this.colour4 = toInteger(vehicleAssoc["veh_col4"]);	

					// Vehicle Attributes
					this.locked = intToBool(toInteger(vehicleAssoc["veh_locked"]));
					this.engine = intToBool(toInteger(vehicleAssoc["veh_engine"]));
					this.lights = intToBool(toInteger(vehicleAssoc["veh_lights"]));
					this.health = toInteger(vehicleAssoc["veh_damage_normal"]);
					this.engineDamage = toInteger(vehicleAssoc["veh_damage_engine"]);
					this.visualDamage = toInteger(vehicleAssoc["veh_damage_visual"]);
					this.dirtLevel = toInteger(vehicleAssoc["veh_dirt_level"]);

					// Other/Misc
					this.insuranceAccount = toInteger(0);
					this.fuel = toInteger(0);
					this.flags = toInteger(0);
				}
			}
		},
		commandData: class {
			enable() {
				this.enabled = true;
			}

			disable() {
				this.enabled = false;
			}

			toggleEnabled() {
				this.enabled = !this.enabled;
			}

			constructor(command, handlerFunction, syntaxString, requiredStaffFlags, requireLogin, allowOnDiscord) {
				this.command = command;
				this.handlerFunction = handlerFunction;
				this.syntaxString = syntaxString;
				this.requiredStaffFlags = requiredStaffFlags;
				this.enabled = true;
				this.requireLogin = requireLogin;
				this.allowOnDiscord = allowOnDiscord
			}
		},
		crimeData: class {
			constructor(suspectId, crimeType, reporterId = 0) {
				this.crimeType = crimeType;
				this.suspectId = suspectId;
				this.reporterId = reporterId;
				this.whenCommitted = new Date().getTime();
				this.whenReported = new Date().getTime();
				this.databaseId = 0;
			}
		},
		jobData: class {
			constructor(jobAssoc) {
				this.databaseId = 0;
				this.type = AG_JOB_NONE;
				this.name = "Unnamed";
				this.enabled = true;
				this.blipModel = -1
				this.pickupModel = -1
				this.colour = toColour(0, 0, 0, 255);
				this.whiteListEnabled = false;
				this.blackListEnabled = false;

				this.equipment = [];
				this.uniforms = [];
				this.locations = [];
				this.whiteList = [];
				this.blackList = [];

				if(jobAssoc) {
					this.databaseId = jobAssoc["job_id"];
					this.type = jobAssoc["job_type"];
					this.name = jobAssoc["job_name"];
					this.enabled = jobAssoc["job_enabled"];
					this.blipModel = jobAssoc["job_blip"];
					this.pickupModel = jobAssoc["job_pickup"];
					this.colour = toColour(jobAssoc["job_colour_r"], jobAssoc["job_colour_g"], jobAssoc["job_colour_b"], 255);
					this.whiteListEnabled = jobAssoc["job_whitelist"];
					this.blackListEnabled = jobAssoc["job_blacklist"];
	
					this.equipment = [];
					this.uniforms = [];
					this.locations = [];
					this.whiteList = [];
					this.blackList = [];
				}
			}
		},
		jobEquipmentData: class {
			constructor(jobEquipmentAssoc) {
				this.databaseId = 0;
				this.job = 0;
				this.name = "Unnamed";
				this.requiredRank = 0;
				this.enabled = false;

				if(jobEquipmentAssoc) {
					this.databaseId = jobEquipmentAssoc["job_equip_id"];
					this.job = jobEquipmentAssoc["job_equip_job"];
					this.name = jobEquipmentAssoc["job_equip_name"];
					this.requiredRank = jobEquipmentAssoc["job_equip_minrank"];
					this.enabled = jobEquipmentAssoc["job_equip_enabled"];
				}
			}
		},
		jobEquipmentWeaponData: class {
			constructor(jobEquipmentWeaponAssoc) {
				this.databaseId = 0;
				this.equipmentId = 0;
				this.weaponId = 0;
				this.ammo = 0;
				this.enabled = false;

				if(!jobEquipmentWeaponAssoc) {
					this.databaseId = jobEquipmentWeaponAssoc["job_equip_wep_id"];
					this.equipmentId = jobEquipmentWeaponAssoc["job_equip_wep_equip"];
					this.weaponId = jobEquipmentWeaponAssoc["job_equip_wep_wep"];
					this.ammo = jobEquipmentWeaponAssoc["job_equip_wep_ammo"];
					this.enabled = jobEquipmentWeaponAssoc["job_equip_wep_enabled"];
				}
			}
		},
		jobUniformData: class {
			constructor(jobUniformAssoc) {
				this.databaseId = 0;
				this.job = 0;
				this.name = "Unnamed";
				this.requiredRank = 0
				this.skin = -1;
				this.enabled = false;

				if(!jobUniformAssoc) {
					this.databaseId = jobUniformAssoc["job_uniform_id"];
					this.job = jobUniformAssoc["job_uniform_job"];
					this.name = jobUniformAssoc["job_uniform_name"];
					this.requiredRank = jobUniformAssoc["job_uniform_minrank"];
					this.skin = jobUniformAssoc["job_uniform_skin"];
					this.enabled = jobUniformAssoc["job_uniform_skin"];	
				}			
			}
		},
		jobLocationData: class {
			constructor(jobLocationAssoc) {
				this.databaseId = 0;
				this.job = 0;
				this.position = toVector3(0.0, 0.0, 0.0);
				//this.blipModel = jobAssoc["job_blip"];
				//this.pickupModel = jobAssoc["job_pickup"];
				this.blip = false;
				this.pickup = false;
				this.enabled = false;

				if(!jobLocationAssoc) {
					this.databaseId = jobLocationAssoc["job_loc_id"];
					this.job = jobLocationAssoc["job_loc_job"];
					this.position = toVector3(jobLocationAssoc["job_loc_pos_x"], jobLocationAssoc["job_loc_pos_y"], jobLocationAssoc["job_loc_pos_z"]);
					//this.blipModel = jobAssoc["job_blip"];
					//this.pickupModel = jobAssoc["job_pickup"];
					this.blip = false;
					this.pickup = false;
					this.enabled = jobLocationAssoc["job_loc_enabled"];
				}
			}
		},
		jobWhiteListData: class {
			constructor(jobWhiteListAssoc) {
				this.databaseId = 0;
				this.job = 0;
				this.subAccount = 0
				this.enabled = false;

				if(!jobWhiteListAssoc) {
					this.databaseId = jobWhiteListAssoc["job_wl_id"];
					this.job = jobWhiteListAssoc["job_wl_job"];
					this.subAccount = jobWhiteListAssoc["job_wl_sacct"]
					this.enabled = jobWhiteListAssoc["job_wl_enabled"];
				}
			}
		},
		jobBlackListData: class {
			constructor(jobBlackListAssoc) {
				this.databaseId = 0;
				this.job = 0;
				this.subAccount = 0
				this.enabled = false;

				if(!jobBlackListAssoc) {
					this.databaseId = jobBlackListAssoc["job_bl_id"];
					this.job = jobBlackListAssoc["job_bl_job"];
					this.subAccount = jobBlackListAssoc["job_bl_sacct"]
					this.enabled = jobBlackListAssoc["job_bl_enabled"];
				}
			}
		},				
		keyBindData: class {
			constructor(keyBindAssoc, key = 0, commandString = "") {
				this.databaseId = 0;
				this.key = key;
				this.account = 0;
				this.commandString = commandString;
				this.whenAdded = 0;
				this.enabled = true;
				this.keyState = false;

				if(keyBindAssoc) {
					this.databaseId = keyBindAssoc["acct_hotkey_id"];
					this.key = toInteger(keyBindAssoc["acct_hotkey_key"]);
					this.account = toInteger(keyBindAssoc["acct_hotkey_acct"]);
					this.commandString = keyBindAssoc["acct_hotkey_cmdstr"];
					this.whenAdded = keyBindAssoc["acct_hotkey_when_added"];
					this.enabled = intToBool(keyBindAssoc["acct_hotkey_enabled"]);
					this.keyState = intToBool(keyBindAssoc["acct_hotkey_down"]);
				}
			}
		},
		blackListedGameScriptData: class {
			constructor(dbAssoc) {
				if(!dbAssoc) {
					return;
				}
				this.databaseId = dbAssoc["ac_script_bl_id"];
				this.enabled = intToBool(dbAssoc["ac_script_bl_enabled"]);
				this.server = dbAssoc["ac_script_bl_server"];
				this.scriptName = dbAssoc["ac_script_bl_name"];
			}
		},
		whiteListedGameScriptData: class {
			constructor(dbAssoc) {
				if(!dbAssoc) {
					return;
				}
				
				this.databaseId = dbAssoc["ac_script_wl_id"];
				this.enabled = intToBool(dbAssoc["ac_script_wl_enabled"]);
				this.server = dbAssoc["ac_script_wl_server"];
				this.scriptName = dbAssoc["ac_script_wl_name"];
			}
		},
		removedWorldObjectData: class {
			constructor(model, position, range) {
				this.model = model;
				this.position = position;
				this.range = range;
			}
		},
	}
	
	return tempClasses;
}

// ---------------------------------------------------------------------------

function getClasses() {
	return serverClasses;	
}

// ---------------------------------------------------------------------------

function getClass(className) {
	return serverClasses[className];	
}

// ---------------------------------------------------------------------------


