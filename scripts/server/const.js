// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: const.js
// DESC: Provides constants
// TYPE: Server (JavaScript)
// ===========================================================================

// Prompts (used for client GUI prompt responses)
const AG_PROMPT_CREATEFIRSTCHAR = 1;

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
const AG_PICKUP_BUSINESS = 2;
const AG_PICKUP_HOUSE = 3;

// Sphere Types
const AG_SPHERE_NONE = 0;
const AG_SPHERE_JOB = 1;
const AG_SPHERE_BUSINESS = 2;
const AG_SPHERE_HOUSE = 3;

// Vehicle Owner Types
const AG_VEHOWNER_NONE = 0;
const AG_VEHOWNER_PLAYER = 1;
const AG_VEHOWNER_JOB = 2;
const AG_VEHOWNER_CLAN = 3;
const AG_VEHOWNER_FACTION = 4;
const AG_VEHOWNER_PUBLIC = 5;
const AG_VEHOWNER_DEALERSHIP = 6;

// Business Owner Types
const AG_BIZOWNER_NONE = 0;
const AG_BIZOWNER_PLAYER = 1;
const AG_BIZOWNER_JOB = 2;
const AG_BIZOWNER_CLAN = 3;
const AG_BIZOWNER_FACTION = 4;
const AG_BIZOWNER_PUBLIC = 5;

// House Owner Types
const AG_HOUSEOWNER_NONE = 0;
const AG_HOUSEOWNER_PLAYER = 1;
const AG_HOUSEOWNER_JOB = 2;
const AG_HOUSEOWNER_CLAN = 3;
const AG_HOUSEOWNER_FACTION = 4;
const AG_HOUSEOWNER_PUBLIC = 5;

// Business Location Types
const AG_BIZLOC_NONE = 0;
const AG_BIZLOC_FUEL = 1;
const AG_BIZLOC_DRIVETHRU = 2;
const AG_BIZLOC_VENDMACHINE = 3;

// Account Contact Types
const AG_CONTACTTYPE_NONE = 0;
const AG_CONTACTTYPE_NEUTRAL = 1;
const AG_CONTACTTYPE_FRIEND = 2;
const AG_CONTACTTYPE_BLOCKED = 3;

// Job Work Types (Currently Unused)
const AG_JOBWORKTYPE_NONE = 0;
const AG_JOBWORKTYPE_ROUTE = 1; // Jobs that use routes. Bus, trash collector, mail, etc
const AG_JOBWORKTYPE_SELL = 2; // Jobs that sell items to other players and NPCs. Drugs, guns, etc
const AG_JOBWORKTYPE_SERVICE = 3; // Services to other players and NPCs. Taxi ride, mechanic fix, etc

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