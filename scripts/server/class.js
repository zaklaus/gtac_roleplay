// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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
		clientData: class {
			constructor(client, accountData, subAccounts) {
				this.accountData = accountData;
				this.subAccounts = subAccounts; // Characters
				this.client = client;
				this.currentSubAccount = 0;
				this.loggedIn = false;
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
				
				this.subAccounts = [];
				this.loggedIn = false;				
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
				this.accountId = subAccountAssoc["sacct_acct"];
				this.skin = subAccountAssoc["sacct_skin"];
				this.cash = subAccountAssoc["sacct_cash"];
				this.placeOfOrigin = subAccountAssoc["sacct_origin"];
				this.dateOfBirth = subAccountAssoc["sacct_when_born"];
				this.spawnPosition = new Vec3(subAccountAssoc["sacct_pos_x"], subAccountAssoc["sacct_pos_y"], subAccountAssoc["sacct_pos_z"]);
				this.spawnHeading = Number(subAccountAssoc["sacct_angle"]);

				this.isWorking = false;
				this.jobUniform = this.skin;
				this.lastJobVehicle = null;
				this.job = -1;

				this.weapons = [];
			}
		},		
		businessData: class {
			constructor(businessAssoc) {
				if(!businessAssoc) {
					return;
				}

				this.databaseId = businessAssoc("biz_id");
				this.name = businessAssoc("biz_name");
				this.ownerType = businessAssoc("biz_owner_type");
				this.ownerId = businessAssoc("biz_owner_id");
				this.locked = businessAssoc("biz_locked");

				this.entrancePosition = new Vec3(businessAssoc("biz_entrance_pos_x"), businessAssoc("biz_entrance_pos_y"), businessAssoc("biz_entrance_pos_z"));
				this.entranceInterior = Number(businessAssoc["biz_entrance_int"]);
				this.entranceDimension = Number(businessAssoc["biz_entrance_vw"]);
				
				this.exitPosition = new Vec3(businessAssoc("biz_exit_pos_x"), businessAssoc("biz_exit_pos_y"), businessAssoc("biz_exit_pos_z"));
				this.exitInterior = Number(businessAssoc["biz_exit_int"]);
				this.exitDimension = Number(businessAssoc["biz_exit_vw"]);
			}
		},
		houseData: class {

		},
		familyData: class {

		},
		factionData: class {

		},
		vehicleData: class {
			constructor(vehicleAssoc, vehicle = false) {
				// General Info
				this.databaseId = 0;
				this.server = serverId;
				this.model = vehicle.modelIndex;
				this.vehicle = vehicle;
				
				// Ownership
				this.ownerType = AG_VEHOWNER_NONE;
				this.ownerId = 0;
				this.buyPrice = 0;
				this.rentPrice = 0;
				
				// Position and Rotation
				this.spawnPosition = vehicle.position;
				this.spawnRotation = vehicle.heading;
				
				// Colour Info
				this.colour1IsRGBA = 0;
				this.colour2IsRGBA = 0;
				this.colour3IsRGBA = 0;
				this.colour4IsRGBA = 0;		
				this.colour1RGBA = toColour(255, 255, 255, 255);
				this.colour2RGBA = toColour(255, 255, 255, 255);
				this.colour3RGBA = toColour(255, 255, 255, 255);
				this.colour4RGBA = toColour(255, 255, 255, 255);		
				this.colour1 = vehicle.colour1 || 1;
				this.colour2 = vehicle.colour2 || 1;
				this.colour3 = vehicle.colour3 || 1; 
				this.colour4 = vehicle.colour4 || 1;

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
					this.databaseId = vehicleAssoc["veh_id"];
					this.server = vehicleAssoc["veh_server"];
					this.model = vehicleAssoc["veh_model"];
					
					// Ownership
					this.ownerType = vehicleAssoc["veh_owner_type"];
					this.ownerId = vehicleAssoc["veh_owner_id"];
					this.buyPrice = vehicleAssoc["veh_buy_price"];
					this.rentPrice = vehicleAssoc["veh_buy_price"];
					
					// Position and Rotation
					this.spawnPosition = new Vec3(vehicleAssoc["veh_pos_x"], vehicleAssoc["veh_pos_y"], vehicleAssoc["veh_pos_z"]);
					this.spawnRotation = Number(vehicleAssoc["veh_rot_z"]);
					
					// Colour Info
					this.colour1IsRGBA = vehicleAssoc["veh_col1_isrgba"];
					this.colour2IsRGBA = vehicleAssoc["veh_col2_isrgba"];
					this.colour3IsRGBA = vehicleAssoc["veh_col3_isrgba"];
					this.colour4IsRGBA = vehicleAssoc["veh_col4_isrgba"];		
					this.colour1RGBA = toColour(vehicleAssoc["veh_col1_r"], vehicleAssoc["veh_col1_g"], vehicleAssoc["veh_col1_b"], vehicleAssoc["veh_col1_a"]);
					this.colour2RGBA = toColour(vehicleAssoc["veh_col2_r"], vehicleAssoc["veh_col2_g"], vehicleAssoc["veh_col2_b"], vehicleAssoc["veh_col2_a"]);
					this.colour3RGBA = toColour(vehicleAssoc["veh_col3_r"], vehicleAssoc["veh_col3_g"], vehicleAssoc["veh_col3_b"], vehicleAssoc["veh_col3_a"]);
					this.colour4RGBA = toColour(vehicleAssoc["veh_col4_r"], vehicleAssoc["veh_col4_g"], vehicleAssoc["veh_col4_b"], vehicleAssoc["veh_col4_a"]);		
					this.colour1 = vehicleAssoc["veh_col1"];
					this.colour2 = vehicleAssoc["veh_col2"];
					this.colour3 = vehicleAssoc["veh_col3"];
					this.colour4 = vehicleAssoc["veh_col4"];	

					// Vehicle Attributes
					this.locked = vehicleAssoc["veh_locked"];
					this.engine = vehicleAssoc["veh_engine"];
					this.lights = vehicleAssoc["veh_lights"];
					this.health = vehicleAssoc["veh_damage_normal"];
					this.engineDamage = vehicleAssoc["veh_damage_engine"];
					this.visualDamage = vehicleAssoc["veh_damage_visual"];
					this.dirtLevel = vehicleAssoc["veh_dirt_level"];
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
		}
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