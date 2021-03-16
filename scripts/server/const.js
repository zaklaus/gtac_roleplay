// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: const.js
// DESC: Provides constants
// TYPE: Server (JavaScript)
// ===========================================================================

// Prompts (used for client GUI prompt responses)
const AG_PROMPT_NONE = 0;
const AG_PROMPT_CREATEFIRSTCHAR = 1;
const AG_PROMPT_BIZORDER = 2;

// Job Types
const AG_JOB_NONE = 0;
const AG_JOB_POLICE = 1;
const AG_JOB_MEDICAL = 2;
const AG_JOB_FIRE = 3;
const AG_JOB_BUS = 4;
const AG_JOB_TAXI = 5;
const AG_JOB_GARBAGE = 6;
const AG_JOB_WEAPON = 7;
const AG_JOB_DRUG = 8;

// Pickup Types
const AG_PICKUP_NONE = 0;
const AG_PICKUP_JOB = 1;
const AG_PICKUP_BUSINESS_ENTRANCE = 2;
const AG_PICKUP_BUSINESS_EXIT = 3;
const AG_PICKUP_HOUSE_ENTRANCE = 4;
const AG_PICKUP_HOUSE_EXIT = 5;
const AG_PICKUP_EXIT = 5;

// Vehicle Owner Types
const AG_VEHOWNER_NONE = 0;                     // Not owned
const AG_VEHOWNER_PLAYER = 1;                   // Owned by a player (character/subaccount)
const AG_VEHOWNER_JOB = 2;                      // Owned by a job
const AG_VEHOWNER_CLAN = 3;                     // Owned by a clan
const AG_VEHOWNER_FACTION = 4;                  // Owned by a faction (not used at the moment)
const AG_VEHOWNER_PUBLIC = 5;                   // Public vehicle. Anybody can drive it.
const AG_VEHOWNER_BIZ = 6;                      // Owned by a business (also includes dealerships since they're businesses)

// Business Owner Types
const AG_BIZOWNER_NONE = 0;                     // Not owned
const AG_BIZOWNER_PLAYER = 1;                   // Owned by a player (character/subaccount)
const AG_BIZOWNER_JOB = 2;                      // Owned by a job
const AG_BIZOWNER_CLAN = 3;                     // Owned by a clan
const AG_BIZOWNER_FACTION = 4;                  // Owned by a faction (not used at the moment)
const AG_BIZOWNER_PUBLIC = 5;                   // Public Business. Used for goverment/official places like police, fire, city hall, DMV, etc

// House Owner Types
const AG_HOUSEOWNER_NONE = 0;                   // Not owned
const AG_HOUSEOWNER_PLAYER = 1;                 // Owner is a player (character/subaccount)
const AG_HOUSEOWNER_JOB = 2;                    // Owned by a job
const AG_HOUSEOWNER_CLAN = 3;                   // Owned by a clan
const AG_HOUSEOWNER_FACTION = 4;                // Owned by a faction
const AG_HOUSEOWNER_PUBLIC = 5;                 // Is a public house. Technically not owned. This probably won't be used.

// Business Location Types
const AG_BIZLOC_NONE = 0;                       // None
const AG_BIZLOC_FUEL = 1;                       // Fuel pump
const AG_BIZLOC_DRIVETHRU = 2;                  // Drivethrough
const AG_BIZLOC_VENDMACHINE = 3;                // Vending machine

// Account Contact Types
const AG_CONTACT_NONE = 0;
const AG_CONTACT_NEUTRAL = 1;                   // Contact is neutral. Used for general contacts with no special additional features
const AG_CONTACT_FRIEND = 2;                    // Contact is a friend. Shows when they're online.
const AG_CONTACT_BLOCKED = 3;                   // Contact is blocked. Prevents all communication to/from them except for RP

// Job Work Types (Currently Unused)
const AG_JOBWORKTYPE_NONE = 0;
const AG_JOBWORKTYPE_ROUTE = 1;                 // Jobs that use routes. Bus, trash collector, mail, etc
const AG_JOBWORKTYPE_SELL = 2;                  // Jobs that sell items to other players and NPCs. Drugs, guns, etc
const AG_JOBWORKTYPE_SERVICE = 3;               // Services to other players and NPCs. Taxi ride, mechanic fix, etc

// Vehicle Seats
const AG_VEHSEAT_DRIVER = 0;
const AG_VEHSEAT_FRONTPASSENGER = 1;
const AG_VEHSEAT_REARLEFTPASSENGER = 2;
const AG_VEHSEAT_REARRIGHTPASSENGER = 3;

// Ban Types
const AG_BANTYPE_NONE = 0;
const AG_BANTYPE_ACCOUNT = 1;
const AG_BANTYPE_SUBACCOUNT = 2;
const AG_BANTYPE_IPADDRESS = 3;
const AG_BANTYPE_SUBNET = 4;

// Blip Owner Types
const AG_BLIP_NONE = 0;
const AG_BLIP_JOB = 1;
const AG_BLIP_BUSINESS_ENTRANCE = 2;
const AG_BLIP_BUSINESS_EXIT = 3;
const AG_BLIP_HOUSE_ENTRANCE = 4;
const AG_BLIP_HOUSE_EXIT = 5;
const AG_BLIP_EXIT = 6;

// Insurance Account Owner Types
const AG_INS_ACCT_OWNER_NONE = 0;               // None
const AG_INS_ACCT_OWNER_PLAYER = 1;             // Player owns insurance company
const AG_INS_ACCT_OWNER_BIZ = 2;                // Business owns insurance company
const AG_INS_ACCT_OWNER_CLAN = 3;               // Clan owns insurance company

// Insurance Account Entity Types
const AG_INS_ACCT_ENTITY_NONE = 0;              // None
const AG_INS_ACCT_ENTITY_PLAYER_HEALTH = 1;     // Health Insurance
const AG_INS_ACCT_ENTITY_PLAYER_LIFE = 2;       // Life Insurance
const AG_INS_ACCT_ENTITY_VEH = 3;               // Vehicle Insurance
const AG_INS_ACCT_ENTITY_BIZ = 4;               // Business Insurance
const AG_INS_ACCT_ENTITY_HOUSE = 5;             // House Insurance

// Insurance Account History Types
const AG_INS_ACCT_HISTORY_NONE = 0;             // None
const AG_INS_ACCT_HISTORY_PLAYER_MEDICAL = 1;   // Medical insurance was used (player disease/injury)
const AG_INS_ACCT_HISTORY_PLAYER_DEATH = 2;     // Life insurance was used (player death)
const AG_INS_ACCT_HISTORY_VEH_DAMAGE = 3;       // Vehicle was damaged, but not destroyed
const AG_INS_ACCT_HISTORY_VEH_WRECKED = 4;      // Vehicle was completely destroyed
const AG_INS_ACCT_HISTORY_VEH_THEFT = 5;        // Vehicle was stolen
const AG_INS_ACCT_HISTORY_BIZ_DAMAGE = 6;       // Business was damaged (broken items/window/door)
const AG_INS_ACCT_HISTORY_BIZ_THEFT = 7;        // Business was stolen from
const AG_INS_ACCT_HISTORY_HOUSE_DAMAGE = 8;     // House was damaged
const AG_INS_ACCT_HISTORY_HOUSE_THEFT = 9;      // House was stolen from

// Islands
const AG_ISLAND_NONE = 0;                       // None
const AG_ISLAND_PORTLAND = 0;                   // Portland Island
const AG_ISLAND_STAUNTON = 1;                   // Staunton Island
const AG_ISLAND_SHORESIDEVALE = 2;              // Shoreside Vale
const AG_ISLAND_VICEWEST = 0;                   // Western Island of VC
const AG_ISLAND_VICEEAST = 1;                   // Eastern Island of VC
const AG_ISLAND_LOSSANTOS = 0;                  // Los Santos
const AG_ISLAND_LASVENTURAS = 1;                // Las Venturas
const AG_ISLAND_SANFIERRO = 2;                  // San Fierro
const AG_ISLAND_REDCOUNTYNORTH = 4;             // Red County North (spans all the way from Palamino/shore on the east east to border of Flint Co on the west)
const AG_ISLAND_BONECOUNTYNORTH = 5;            // Bone County North (usually called Tierra Robada)
const AG_ISLAND_BONECOUNTYSOUTH = 6;            // Bone County South

// Item Owners
const AG_ITEM_OWNER_NONE = 0;                   // None
const AG_ITEM_OWNER_PLAYER = 1;                 // Item is in a player's inventory
const AG_ITEM_OWNER_VEHTRUNK = 2;               // Item is in a vehicle's trunk
const AG_ITEM_OWNER_VEHDASH = 3;                // Item is in a vehicle's glove compartment
const AG_ITEM_OWNER_BIZFLOOR = 4;               // Item is in the public area of a business (on the floor = ready to buy)
const AG_ITEM_OWNER_BIZSTORAGE = 5;             // Item is in a business's storage area (stock room)
const AG_ITEM_OWNER_HOUSE = 6;                  // Item is in a house
const AG_ITEM_OWNER_SAFE = 7;                   // Item is in a safe (safes can be anywhere)
const AG_ITEM_OWNER_ITEM = 8;                   // Item is in another item (trashbag, briefcase, wallet, suitcase, crate/box, barrel, etc)
const AG_ITEM_OWNER_GROUND = 9;                 // Item is on the ground
const AG_ITEM_OWNER_JOBLOCKER = 10;             // Item is in player's job locker
const AG_ITEM_OWNER_LOCKER = 10;                // Item is in player's locker

// Item Use Types
const AG_ITEM_USETYPE_NONE = 0;                 // Has no effect
const AG_ITEM_USETYPE_WEAPON = 1;               // Equips weapon
const AG_ITEM_USETYPE_AMMO_CLIP = 2;            // Magazine for weapon. If in inventory, R will load it into gun
const AG_ITEM_USETYPE_PHONE = 3;                // Pulls out phone
const AG_ITEM_USETYPE_GPS = 4;                  // Not sure how I want this to work yet
const AG_ITEM_USETYPE_MAP = 5;                  // Shows minimap on HUD
const AG_ITEM_USETYPE_SKIN = 6;                 // Changes skin (item skin is replaced with previous skin before changing)
const AG_ITEM_USETYPE_CLOTHESUPPER = 7;         // Changes upper clothing (GTA IV shirts)
const AG_ITEM_USETYPE_CLOTHESLOWER = 8;         // Changes lower clothing (GTA IV pants)
const AG_ITEM_USETYPE_STORAGE = 9;              // Shows stored items. Backpack, crate, briefcase, wallet, etc
const AG_ITEM_USETYPE_VEHKEY = 10;              // Locks/unlocks a vehicle and allows starting engine without hotwire
const AG_ITEM_USETYPE_BIZKEY = 11;              // Locks/unlocks a business
const AG_ITEM_USETYPE_HOUSEKEY = 12;            // Locks/unlocks a house
const AG_ITEM_USETYPE_SEED = 13;                // Plants a seed
const AG_ITEM_USETYPE_WEED = 14;                // Light drug effect (short term relief of addiction symptoms?)
const AG_ITEM_USETYPE_COKE = 15;                // Medium drug effect (medium term relief of addiction symptoms?)
const AG_ITEM_USETYPE_METH = 16;                // Heavy drug effect (extended term relief of addiction symptoms?)
const AG_ITEM_USETYPE_CIGAR = 17;               // Just for appearance. Makes people look cool I guess
const AG_ITEM_USETYPE_WATER = 18;               // Replenishes small amount of health
const AG_ITEM_USETYPE_FOOD = 19;                // Eat food. Replenishes a small amount of health
const AG_ITEM_USETYPE_BEER = 20;                // Subtle drunk effect. Replenishes small amount of health.
const AG_ITEM_USETYPE_WINE = 21;                // Moderate drunk effect. Replenishes moderate amount of health.
const AG_ITEM_USETYPE_LIQUOR = 22;              // Heavy drunk effect. Replenishes large amount of health.
const AG_ITEM_USETYPE_COFFEE = 23;              // Replenishes moderate amount of health.
const AG_ITEM_USETYPE_AMMO_ROUND = 23;          // Bullet. Loads into magazine. Not used at the moment
const AG_ITEM_USETYPE_HANDCUFF = 24;            //
const AG_ITEM_USETYPE_ROPE = 25;                //
const AG_ITEM_USETYPE_BLINDFOLD = 26;           //
const AG_ITEM_USETYPE_TAZER = 27;               //
const AG_ITEM_USETYPE_ARMOUR = 28;              //
const AG_ITEM_USETYPE_HEALTH = 29;              //
const AG_ITEM_USETYPE_AED = 30;                 //
const AG_ITEM_USETYPE_WALKIETALKIE = 31;        //
const AG_ITEM_USETYPE_BOOMBOX = 32;             //
const AG_ITEM_USETYPE_EARBUDS = 33;             //
const AG_ITEM_USETYPE_BADGE = 34;               //
const AG_ITEM_USETYPE_DRINK = 35;               //
const AG_ITEM_USETYPE_EXTINGUISHER = 36;        //
const AG_ITEM_USETYPE_SPRAYPAINT = 37;          //
const AG_ITEM_USETYPE_PEPPERSPRAY = 38;         //
const AG_ITEM_USETYPE_FLASHLIGHT = 39;          //
const AG_ITEM_USETYPE_AIRPLANETICKET = 40;      //

// Item Drop Types
const AG_ITEM_DROPTYPE_NONE = 0;                // Can't be dropped
const AG_ITEM_DROPTYPE_OBJECT = 1;              // Drops as an object on the ground
const AG_ITEM_DROPTYPE_PICKUP = 2;              // Drops as a pickup
const AG_ITEM_DROPTYPE_OBJECTLIGHT = 3;         // Object that produces an area light effect (lamp, flashlight, etc)
const AG_ITEM_DROPTYPE_DESTROY = 4;             // Will destroy the item on drop (keys mostly but for any tiny object)
const AG_ITEM_DROPTYPE_OBJECTSTACK = 5;         // Stackable objects (crates and such). Will sit on top of closest other stackable

// Forensic Types
const AG_FORENSICS_NONE = 0;
const AG_FORENSICS_BULLET = 1;                  // Bullet. The actual tip that hits a target. Has rifling and ballistics information of the weapon.
const AG_FORENSICS_BLOOD = 2;                   // Blood. Automatically applied to ground and bullets that hit when somebody is shot
const AG_FORENSICS_BODY = 3;                    // Body. A dead body lol
const AG_FORENSICS_HAIR = 4;                    // Hair. Automatically applied to
const AG_FORENSICS_SWEAT = 5;                   // Sweat. Automatically applied to clothing when worn
const AG_FORENSICS_SALIVA = 6;                  // Saliva. Automatically applied to drinks when drank
const AG_FORENSICS_BULLETCASINGS = 7;           // Bullet casings. Automatically dropped when fired from a weapon except when used in a vehicle (driveby)

// Account Authentication Methods
const AG_ACCT_AUTHMETHOD_NONE = 0;              // None
const AG_ACCT_AUTHMETHOD_EMAIL = 1;             // Email
const AG_ACCT_AUTHMETHOD_PHONENUM = 2;          // Phone number
const AG_ACCT_AUTHMETHOD_2FA = 3;               // Two factor authentication app (authy, google authenticator, etc)
const AG_ACCT_AUTHMETHOD_PEBBLE = 4;            // Pebble watch (this one's for Vortrex but anybody with a Pebble can use)
const AG_ACCT_AUTHMETHOD_PHONEAPP = 5;          // The Android/iOS companion app (will initially be a web based thing until I can get the apps created)

// Police Patrol Types
const AG_PATROLTYPE_NONE = 0;                   // None
const AG_PATROLTYPE_FOOT = 1;                   // Foot patrol. Officer takes a vehicle to get to their designated area and then walks a beat. More common in LC games
const AG_PATROLTYPE_VEHICLE = 2;                // Vehicle patrol. More common in VC/LS/SF/LV cities.

// Job Route States
const AG_JOBROUTESTATE_NONE = 0;                // None
const AG_JOBROUTESTATE_INPROGRESS = 1;          // Route is in progress. Player is in between stops but not at the last one.
const AG_JOBROUTESTATE_LASTSTOP = 2;            // Player is heading to the last stop on the route
const AG_JOBROUTESTATE_PAUSED = 3;              // Route is paused for some reason. For police, this could be player accepted callout and once finished, patrol route will resume
const AG_JOBROUTESTATE_ATSTOP = 4;              // For bus/trash stops that freeze player, this is the state when they're at one

// Tutorial States
const AG_TUTORIAL_STATE_NONE = 0;
const AG_TUTORIAL_STATE_FINISHED = 1;
const AG_TUTORIAL_STATE_STARTING = 2;
const AG_TUTORIAL_STATE_PICKUPITEM = 3;
const AG_TUTORIAL_STATE_SWITCHITEM = 4;
const AG_TUTORIAL_STATE_USEITEM = 5;
const AG_TUTORIAL_STATE_PUTITEM = 6;
const AG_TUTORIAL_STATE_TAKEITEM = 7;
const AG_TUTORIAL_STATE_EXITBIZ = 9;
const AG_TUTORIAL_STATE_DROPITEM = 10;

// Item Occupied States
const AG_ITEM_ACTION_NONE = 0;
const AG_ITEM_ACTION_USE = 1;
const AG_ITEM_ACTION_PICKUP = 2;
const AG_ITEM_ACTION_DROP = 3;
const AG_ITEM_ACTION_SWITCH = 4;
const AG_ITEM_ACTION_PUT = 5;
const AG_ITEM_ACTION_TAKE = 6;

// Ped States
const AG_PEDSTATE_NONE = 2;
const AG_PEDSTATE_READY = 1;
const AG_PEDSTATE_DRIVER = 2;
const AG_PEDSTATE_PASSENGER = 3;
const AG_PEDSTATE_DEAD = 4;
const AG_PEDSTATE_ENTERINGPROPERTY = 5;
const AG_PEDSTATE_EXITINGPROPERTY = 6;
const AG_PEDSTATE_ENTERINGVEHICLE = 7;
const AG_PEDSTATE_EXITINGVEHICLE = 8;
const AG_PEDSTATE_BINDED = 9;
const AG_PEDSTATE_TAZED = 10;
const AG_PEDSTATE_INTRUNK = 11;
const AG_PEDSTATE_INITEM = 12;
const AG_PEDSTATE_HANDSUP = 13;

const AG_2FA_STATE_NONE = 0;
const AG_2FA_STATE_CODEINPUT = 1;
const AG_2FA_STATE_SETUP_CODETOAPP = 2;
const AG_2FA_STATE_SETUP_CODEFROMAPP = 3;

const AG_FORGOTPASS_STATE_NONE = 0;
const AG_FORGOTPASS_STATE_CODEINPUT = 1;
const AG_FORGOTPASS_STATE_SETPASS = 2;