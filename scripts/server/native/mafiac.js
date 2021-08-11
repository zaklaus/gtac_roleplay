// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: gtac.js
// DESC: Provides natives for GTA Connected (GTA III, VC, SA, & IV)
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: game-data.js
// DESC: Provides coords, ids, names, and other data for the games
// TYPE: Shared (JavaScript)
// ===========================================================================

let gameData = {
    weaponNames: [
        ["Unknown"],
        { // Mafia 1
			2: "Knuckle Duster",
			3: "Knife",
			4: "Baseball Bat",
			5: "Molotov Cocktail",
			6: "Colt Detective Special",
			7: "S&W Model 27 Magnum",
			8: "S&W Model 10 M&P",
			9: "Colt 1911",
			10: "Thompson 1928",
			11: "Pump-action Shotgun",
			12: "Sawed-off Shotgun",
			13: "US Rifle, M1903 Springfield",
			14: "Mosin-Nagant 1891/30",
			15: "Grenade",
			17: "Bucket",
			20: "Steel Bar",
			25: "Crowbar",
			28: "Wooden Plank",
			29: "Bottle",
			31: "Sword",
			32: "Dogs Head",
		},
    ],
	weatherNames: [
		["Unknown"],
		[ // Mafia 1

		],
	],
	gameNames: [
		"Unknown",
		"Mafia",
		"Mafia 2",
		"Mafia 3",
		"Mafia Definitive Edition",
	],
	vehicleWheelStateNames: [
		"normal",
		"flat",
		"gone"
	],
	vehicleDoorStateNames: [
		"closed",
		"closed",
		"swinging",
		"open"
	],
	vehicleWheelNames: [
		"front left",
		"rear left",
		"front right",
		"rear right"
	],
	vehicleLightNames: [
		"front left",
		"rear left",
		"front right",
		"rear right"
	],
	vehicleNames: [
		[],
		[ // Mafia 1
			"Blue Bolt Ace Tudor", 					// 0
			"Dark Blue Bolt Ace Tudor",
			"Brown Bolt Ace Tudor",
			"Green Bolt Ace Tudor",
			"Red Bolt Ace Tudor",
			"Blue Bolt Ace Touring", 				// 5
			"Dark Blue Bolt Ace Touring",
			"Brown Bolt Ace Touring",
			"Green Bolt Ace Touring",
			"Red Bolt Ace Touring",
			"Blue Bolt Ace Runabout", 				// 10
			"Dark Blue Bolt Ace Runabout",
			"Brown Bolt Ace Runabout",
			"Green Bolt Ace Runabout",
			"Red Bolt Ace Runabout",
			"Blue Bolt Ace Pickup", 				// 15
			"Dark Blue Bolt Ace Pickup",
			"Brown Bolt Ace Pickup",
			"Green Bolt Ace Pickup",
			"Red Bolt Ace Pickup",
			"Blue Bolt Ace Fordor",					// 20
			"Dark Blue Bolt Ace Fordor",
			"Brown Bolt Ace Fordor",
			"Green Bolt Ace Fordor",
			"Red Bolt Ace Fordor",
			"Blue Bolt Ace Coupe",					// 25
			"Dark Blue Bolt Ace Coupe",
			"Brown Bolt Ace Coupe",
			"Green Bolt Ace Coupe",
			"Red Bolt Ace Coupe",
			"Brown Bolt Model B Tudor",				// 30
			"Red Bolt Model B Tudor",
			"Green Bolt Model B Tudor",
			"Dark Blue Bolt Model B Tudor",
			"Brown Bolt Model B Roadster",
			"Red Bolt Model B Roadster",			// 35
			"Green Bolt Model B Roadster",
			"Dark Blue Bolt Model B Roadster",
			"Brown Bolt Model B Pickup",
			"Red Bolt Model B Pickup",
			"Green Bolt Model B Pickup",			// 40
			"Dark Blue Bolt Model B Pickup",
			"Brown Bolt Model B Fordor",
			"Red Bolt Model B Fordor",
			"Green Bolt Model B Fordor",
			"Dark Blue Bolt Model B Fordor",		// 45
			"Brown Bolt Model B Delivery",
			"Red Bolt Model B Delivery",
			"Green Bolt Model B Delivery",
			"Dark Blue Bolt Model B Delivery",
			"Brown Bolt Model B Coupe",				// 50
			"Red Bolt Model B Coupe",
			"Green Bolt Model B Coupe",
			"Dark Blue Bolt Model B Coupe",
			"Brown Bolt Model B Tudor",
			"Red Bolt Model B Tudor",				// 55
			"Green Bolt Model B Tudor",
			"Dark Blue Bolt Model B Tudor",
			"Green Bolt V8 Coupe",
			"Red Bolt V8 Coupe",
			"Blue Bolt V8 Coupe",					// 60
			"Grey Bolt V8 Coupe",
			"Green Bolt V8 Forder",
			"Red Bolt V8 Forder",
			"Blue Bolt V8 Forder",
			"Grey Bolt V8 Forder",					// 65
			"Green Bolt V8 Roadster",
			"Red Bolt V8 Roadster",
			"Blue Bolt V8 Roadster",
			"Grey Bolt V8 Roadster",
			"Green Bolt V8 Touring",				// 70
			"Red Bolt V8 Touring",
			"Blue Bolt V8 Touring",
			"Grey Bolt V8 Touring",
			"Green Bolt V8 Tudor",
			"Red Bolt V8 Tudor",					// 75
			"Blue Bolt V8 Tudor",
			"Grey Bolt V8 Tudor",
			"Brubaker",
			"Silver Bruno Speedster 851",
			"Red Bruno Speedster 851",				// 80
			"Green Bruno Speedster 851",
			"Caesar 8C 2300 Racing",
			"Red Caesar 8C Mostro",
			"Black Caesar 8C Mostro",
			"White Celeste Marque 500",				// 85
			"Brown Celeste Marque 500",
			"Blue Corrozella C-Otto",
			"Green Corrozella C-Otto",
			"Blue Crusader Chromium Forder",
			"Violet Crusader Chromium Forder",		// 90
			"Green Crusader Chromium Forder",
			"Dark Blue Crusader Chromium Forder",
			"Blue Falconer",
			"Red Falconer",
			"Gangster Falconer",					// 95
			"Falconer Yellowcar",
			"Umber Guardian Terraplane Coupe",
			"Beige Guardian Terraplane Coupe",
			"Black Guardian Terraplane Coupe",
			"Umber Guardian Terraplane Fordor",		// 100
			"Beige Guardian Terraplane Fordor",
			"Black Guardian Terraplane Fordor",
			"Umber Guardian Terraplane Tudor",
			"Beige Guardian Terraplane Tudor",
			"Black Guardian Terraplane Tudor",		// 105
			"Lassister Fordor",
			"Lassister Phaeton",
			"Lassister Roadster",
			"Lassister Appolyon",
			"Lassister Charon",						// 110
			"Lassister Police",						// 111
			"Green Shubert Extra Six Forder",
			"White Shubert Extra Six Forder",
			"Blue Shubert Extra Six Forder",
			"Shubert Extra Six Forder Police",		// 115
			"Green Shubert Extra Six Tudor",
			"White Shubert Extra Six Tudor",
			"Blue Shubert Extra Six Tudor",
			"Shubert Extra Six Tudor Police",		// 119
			"Red Shubert Six",						// 120
			"White Shubert Six",
			"Black Shubert Six",
			"Shubert Six Police",					// 123
			"Silver Fletcher",
			"Orange Thor 810 Cabriolet",			// 125
			"Black Thor 810 Cabriolet",
			"Orange Thor 810 Phaeton",
			"Black Thor 810 Phaeton",
			"Orange Thor 810 Sedan",
			"Black Thor 810 Sedan",					// 130
			"Trautenberg Model J",
			"Trautenberg Racer 4WD",
			"Yellow Ulver Airstream Fordor",
			"Green Ulver Airstream Fordor",
			"Yellow Ulver Airstream Tudor",			// 135
			"Green Ulver Airstream Tudor",
			"Blue Wright Coupe",
			"Red Wright Coupe",
			"Green Wright Coupe",
			"Gangster Wright Coupe",				// 140
			"Blue Wright Fordor",
			"Red Wright Fordor",
			"Green Wright Fordor",
			"Bolt Ambulance",
			"Bolt Firetruck",						// 145
			"Bolt Hearse",
			"Bolt Hearse",
			"Bolt Truck Flatbed",
			"Bolt Truck Covered",
			"Bolt Truck(Atlantic Import)",
			"Bolt Truck"							// 150
		],
	],
	vehicleModels: [
		[],
		[	// Mafia 1
			"fordtTud00",
			"fordtTud01",
			"fordtTud02",
			"fordtTud03",
			"fordtTud04",
			"fordtto00",
			"fordtto01",
			"fordtto02",
			"fordtto03",
			"fordtto04",
			"fordtru00",
			"fordtru01",
			"fordtru02",
			"fordtru03",
			"fordtru04",
			"fordtpi00",
			"fordtpi01",
			"fordtpi02",
			"fordtpi03",
			"fordtpi04",
			"fordtFor00",
			"fordtFor01",
			"fordtFor02",
			"fordtFor03",
			"fordtFor04",
			"fordtco00",
			"fordtco01",
			"fordtco02",
			"fordtco03",
			"fordtco04",
			"forAtu00",
			"ForAtu01",
			"ForAtu02",
			"ForAtu03",
			"ForAro00",
			"ForAro01",
			"ForAro02",
			"ForAro03",
			"ForApic00",
			"ForApic01",
			"ForApic02",
			"ForApic03",
			"ForAfo00",
			"ForAfo01",
			"ForAfo02",
			"ForAfo03",
			"ForAde00",
			"ForAde01",
			"ForAde02",
			"ForAde03",
			"ForAcou00",
			"ForAcou01",
			"ForAcou02",
			"ForAcou03",
			"ForAtu00",
			"ForAtu01",
			"ForAtu02",
			"ForAtu03",
			"forVco00",
			"forVco01",
			"forVco02",
			"forVco03",
			"forVfor00",
			"forVfor01",
			"forVfor02",
			"forVfor03",
			"forVro00",
			"forVro01",
			"forVro02",
			"forVro03",
			"forVto00",
			"forVto01",
			"forVto02",
			"forVto03",
			"forVtud00",
			"forVtud01",
			"forVtud02",
			"forVtud03",
			"miller00",
			"speedster00",
			"speedster01",
			"speedster02",
			"alfa00",
			"alfa8C00",
			"alfa8C01",
			"merced500K00",
			"merced500K01",
			"bugatti00",
			"bugatti01",
			"pontFor00",
			"pontFor01",
			"pontTud00",
			"pontTud01",
			"blackha00",
			"blackha01",
			"black00",
			"taxi00",
			"hudcou00",
			"hudcou01",
			"hudcou02",
			"hudfor00",
			"hudfor01",
			"hudfor02",
			"hudtu00",
			"hudtu01",
			"hudtu02",
			"cad_ford00",
			"cad_phaeton00",
			"cad_road00",
			"hartmann00",
			"hearseCa00",
			"polCad00",
			"chemaFor00",
			"chemaFor01",
			"chemaFor02",
			"polimFor00",
			"chematud00",
			"chematud01",
			"chematud02",
			"polimTud00",
			"chev00",
			"chev01",
			"chev02",
			"poli00",
			"arrow00",
			"cordca00",
			"cordca01",
			"cordph00",
			"cordph01",
			"cordse00",
			"cordse01",
			"deuseJco00",
			"duesenberg00",
			"airflFor00",
			"airflFor01",
			"airfltud00",
			"airfltud01",
			"buiCou00",
			"buiCou01",
			"buiCou02",
			"buigang00",
			"buikFor00",
			"buikFor01",
			"buikFor02",
			"Ambulance00",
			"fire00",
			"hearseA00",
			"truckA00",
			"truckB00",
			"TruckBxx00",
			"truckBx00",
			"phantom00",
			"thunderbird00",
			"FordHOT00",
			"Blackdragon00",
			"cord_sedanH00",
			"Flamer00",
			"fordApick00",
			"fordApicktaxi00",
			"fordTH00",
			"FThot00",
			"hotrodp200",
			"hotrodp300",
			"hotrodp400",
			"hotrodp500",
			"chevroletm6H00",
			"TBirdold00",
			"fordAdelH00",
			"hotrodp600",
			"phantomtaxi00",
		]
	],
	skinNames: [
		[],
		[],
	],
	skinModels: [
		[],
		[ // Mafia 1
			"Tommy",
			"TommyBOXER",
			"TommyCOAT",
			"TommyCOATHAT",
			"TommyDELNIK",
			"TommyDELNIKHIGH",
			"TommyFREERIDER",
			"TommyGUN",
			"TommyHAT",
			"TommyHIGH",
			"TommyHIGHBLOOD",
			"TommyHighCOATHAT",
			"TommyHighHAT",
			"TommyNAHAC",
			"TommyOLD",
			"TommyOLDBLOOD",
			"TommyPYTEL",
			"TommyRACER",
			"TommyRACER2",
			"TommyRUKAV",
			"TommySAILOR",
			"TommyTAXIDRIVER",
			"TommyTAXIdriverHIGH",
			"AsisPZ1",
			"Barman01",
			"Bclerk01",
			"Bclerk02",
			"Bguard01",
			"Bguard01M",
			"Bguard02",
			"Bguard03",
			"Bguard03M",
			"Biff",
			"BigDig",
			"BnkO01",
			"BnkO02",
			"BnkO03",
			"BobAut01",
			"Bookmaker01",
			"Bookmaker02",
			"Boxer01",
			"Boxer02",
			"Boxer03",
			"Boxer04",
			"Carlo",
			"China1",
			"Chulig1",
			"Chulig1b",
			"David",
			"Delnik01",
			"Delnik02",
			"Delnik03",
			"Detektiv01",
			"Detektiv02",
			"Detektiv03",
			"Enemy01+",
			"Enemy01",
			"Enemy02+",
			"Enemy02",
			"Enemy03+",
			"Enemy03",
			"Enemy04",
			"Enemy04BLOOD",
			"Enemy04K",
			"Enemy05",
			"Enemy06+",
			"Enemy06",
			"Enemy07+",
			"Enemy07",
			"Enemy08+",
			"Enemy08",
			"Enemy08K",
			"Enemy09+",
			"Enemy09",
			"Enemy09K",
			"Enemy10+",
			"Enemy10",
			"Enemy10K",
			"Enemy11K",
			"Enemy12",
			"Enemy12K",
			"Enemy13C",
			"Enemy91",
			"Enemy92",
			"FMVENemy11K",
			"FREEgang01",
			"FREEgang02",
			"FrankHIGH",
			"Friend1",
			"Friend2",
			"Gangster01",
			"Gangster02",
			"Gangster03",
			"Gangster04",
			"Gangster05",
			"GodzMan1",
			"Guard01",
			"Guard02",
			"Hasic01",
			"HighCivil",
			"HighCivilBLOOD",
			"Homeless01",
			"Hoolig01",
			"Hoolig02",
			"Hoolig03",
			"Hoolig04",
			"Hoolig05",
			"Hoolig06",
			"I04Delnik01+",
			"I04Delnik01",
			"Joe",
			"Kasar",
			"Knez",
			"LifeG01",
			"Lucas",
			"Luigi",
			"Malticka1",
			"MorelloHIGH",
			"MorelloLOW",
			"NormanHIGH",
			"Organizator01",
			"Paulie",
			"PaulieCOATHAT",
			"PaulieCTHIGH",
			"PaulieCorpse",
			"PaulieHIGH",
			"Pepe",
			"PoliceMan01",
			"PoliceMan02",
			"Politik",
			"PortGuard01",
			"PortGuard02",
			"ProdZ1",
			"Prokur",
			"Radni01",
			"Radni02",
			"Ralph",
			"RalphHIGH",
			"ReditelB",
			"ReditelH",
			"RidicNakladaku",
			"SalMan01K",
			"SalMan02K",
			"SalMan03",
			"SalMan03K",
			"SalMan04",
			"SalMan05",
			"SalMan05K",
			"Salieri2",
			"SalieriHIGH",
			"SalieriHIGH2",
			"SalieriLOW",
			"Sam",
			"SamCOATHAT",
			"SamHIGH",
			"SamHIGHblood1",
			"SamHIGHblood2",
			"SamHIGHblood3",
			"SamHIGHblood4",
			"Samblood1",
			"Sergio",
			"SergioBLOOD",
			"SynRad1",
			"SynRad1BLOOD",
			"SynRad1DEAD",
			"Tony",
			"VincenzoHIGH",
			"VincenzoLOW",
			"Vrabec",
			"Vratny1",
			"Vypravci",
			"Vypravci2",
			"WillG1",
			"WillG2",
			"WillMan01",
			"WillMan02",
			"Zavod1",
			"Zavod2",
			"Zavod3",
			"ZavodFMV1",
			"ZavodFMV2",
			"civil02",
			"civil03",
			"civil04",
			"civil05",
			"civil06",
			"civil11",
			"civil11M",
			"civil12",
			"civil13",
			"civil14",
			"civil15",
			"civil16",
			"civil16M",
			"civil17",
			"civil18",
			"civil19",
			"civil19M",
			"civil21",
			"civil21N",
			"civil22",
			"civil31",
			"civil32",
			"civil33",
			"civil34",
			"civil35",
			"civil36",
			"civil36M",
			"civil37",
			"civil38",
			"civil39",
			"civil40",
			"civil41",
			"civil42",
			"civil42M",
			"civil43",
			"civil44",
			"civil51",
			"civil51M",
			"civil52",
			"civil53",
			"civil54",
			"civil54M",
			"civil55",
			"civil55M",
			"civil56",
			"civil56M",
			"civil57",
			"civil57M",
			"civil60",
			"civil61",
			"civil62",
			"civil63",
			"civil70",
			"civil70M",
			"civil71",
			"civil72",
			"frank",
			"ohorelec01",
			"pianist1",
			"pol01",
			"pol02",
			"pol03",
			"pol11",
			"pol12",
			"pol13",
			"polim62",
			"pumpar01",
			"recep",
			"sailor01",
			"sailor01M",
			"sailor02",
			"sailor02M",
			"sailor03",
			"waiter01",
			"waiter01M",
			"waiter02",
			"waiter02M",
			"waiter03",
			"Alice1",
			"Berta",
			"Bitch01",
			"Bitch02",
			"Bitch02Mask",
			"Bitch03M",
			"CarlZen1",
			"Czena01",
			"Czena02",
			"Czena03",
			"Czena04",
			"Czena05",
			"Czena06",
			"Czena07",
			"Czena07M",
			"Czena08",
			"Czena09",
			"Czena09M",
			"Czena10",
			"Czena10M",
			"Czena11",
			"Czena11M",
			"Czena12",
			"Czena13",
			"FMVCzena03",
			"FMVCzena04",
			"March1",
			"Michelle",
			"MichelleLOW",
			"Milenka1",
			"Sarah1",
			"Sarah1Obl",
			"Sarah2",
			"Sarah2HIGH",
			"Sarah2HIGHnaha",
			"Sarah2LOW",
			"Serv01",
			"ZenaRad01",
			"gab",
			"ShadowGirlHIGH",
			"ShadowMan",
			"ShadowManHIGH",
			"ShadowManLOW2",
			"UfoPanak",
			"invisible"
		],
	],
	weaponModels: [
		[],
		[ // Mafia 1
		],
	],
	locations: [
		[],

		[ // Mafia 1

		],
	],
	policeStations: [
		[],
		[ // Mafia 1

		],
	],
	fireStations: [
		[],
		[ // Mafia 1

		],
	],
	hospitals: [
		[],
		[ // Mafia 1

		],
	],
	payAndSprays: [
		[],
		[ // Mafia 1

		],
	],
	ammuNations: [
		[],
		[ // Mafia 1

		],
	],
	animations: [
		[],
		[ // Mafia 1
			//["walk", 0, 0, VRR_ANIMTYPE_ADD, 0.0],
		]
	],
	meleeWeapons: [
		[],
		[2, 3, 4],
	]
};

// ===========================================================================

function getGameData() {
	return gameData;
}

// ===========================================================================

function getAllowedSkinDataBySkinId(skinId) {
	for(let i in allowedSkins[getGame()]) {
		if(allowedSkins[getGame()][i][0] == skinId) {
			return i;
		}
	}

	return 0;
}


// ===========================================================================

function getPlayerPosition(client) {
    if(getServerGame() == GAME_GTA_IV) {
        return getPlayerData(client).syncPosition;
    } else {
        if(client.player != null) {
            return client.player.position;
        }
    }
}

// ===========================================================================

function setPlayerPosition(client, position) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s position to ${position.x}, ${position.y}, ${position.z}`);
    sendPlayerSetPosition(client, position);
}

// ===========================================================================

function getPlayerHeading(client) {
    if(getServerGame() == GAME_GTA_IV) {
        return getPlayerData(client).syncHeading;
    } else {
        if(client.player != null) {
            return client.player.heading;
        }
    }
}

// ===========================================================================

function setPlayerHeading(client, heading) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s heading to ${heading}`);
    sendPlayerSetHeading(client, heading);
}

// ===========================================================================

function getPlayerVehicle(client) {
    if(getServerGame() == GAME_GTA_IV)  {
        return getPlayerData().syncVehicle;
    } else {
        if(client.player.vehicle) {
            return client.player.vehicle;
        }
    }
    return false;
}

// ===========================================================================

function getPlayerDimension(client) {
    return client.player.dimension;
}

// ===========================================================================

function getPlayerInterior(client) {
    return getPlayerCurrentSubAccount(client).interior || 0;
}

// ===========================================================================

function setPlayerDimension(client, dimension) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s dimension to ${dimension}`);
    client.player.dimension = dimension;
}

// ===========================================================================

function setPlayerInterior(client, interior) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s interior to ${interior}`);
    sendPlayerSetInterior(client, interior);
    getPlayerCurrentSubAccount(client).interior = interior;
}

// ===========================================================================

function isPlayerInAnyVehicle(client) {
    if(getServerGame() == GAME_GTA_IV)  {
        return (getPlayerData().syncVehicle != null);
    } else {
        return (client.player.vehicle != null);
    }
}

// ===========================================================================

function getPlayerVehicleSeat(client) {
    if(!isPlayerInAnyVehicle(client)) {
        return false;
    }

    for(let i = 0 ; i <= 8 ; i++) {
        if(getPlayerVehicle(client).getOccupant(i) == client.player) {
            return i;
        }
    }

    return false;
}

// ===========================================================================

function isPlayerSpawned(client) {
    return getPlayerData(client).spawned;
}

// ===========================================================================

function getVehiclePosition(vehicle) {
    return vehicle.position;
}

// ===========================================================================

function getVehicleHeading(vehicle) {
    return vehicle.heading;
}

// ===========================================================================

function getVehicleSyncer(vehicle) {
    return getElementSyncer(vehicle);
}

// ===========================================================================

function getVehicleForNetworkEvent(vehicle) {
    return vehicle;
}

// ===========================================================================

function deleteGameElement(element) {
    logToConsole(LOG_DEBUG, `Destroying game element ${element.id} (Type: ${element.type})`);
    if(element != null) {
        destroyElement(element);
        return true;
    }
    return false;
}

// ===========================================================================

function isPlayerInFrontVehicleSeat(client) {
    return (getPlayerVehicleSeat(client) == 0 || getPlayerVehicleSeat(client) == 1);
}

// ===========================================================================

function removePlayerFromVehicle(client) {
    logToConsole(LOG_DEBUG, `Removing ${getPlayerDisplayForConsole(client)} from their vehicle`);
    sendPlayerRemoveFromVehicle(client);
    return true;
}

// ===========================================================================

function setPlayerSkin(client, skin) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s skin to ${skin} (${getSkinNameFromId(skin)})`);
    client.player.modelIndex = skin;
}

// ===========================================================================

function getPlayerSkin(client) {
    return client.player.modelIndex;
}

// ===========================================================================

function setPlayerHealth(client, health) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to ${health}`);
    sendPlayerSetHealth(client, health);
}

// ===========================================================================

function getPlayerHealth(client) {
    return client.player.health;
}

// ===========================================================================

function setPlayerArmour(client, armour) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to ${armour}`);
    sendPlayerSetArmour(client, armour);
}

// ===========================================================================

function getPlayerArmour(client) {
    return client.player.armour;
}

// ===========================================================================

function setPlayerCash(client, amount) {
    if(typeof amount != "number") {
        return false;
    }

	getPlayerCurrentSubAccount(client).cash = toInteger(amount);
	updatePlayerCash(client);
}

// ===========================================================================

function givePlayerCash(client, amount) {
    if(typeof amount != "number") {
        return false;
    }

	getPlayerCurrentSubAccount(client).cash = getPlayerCurrentSubAccount(client).cash + toInteger(amount);
	updatePlayerCash(client);
}

// ===========================================================================

function takePlayerCash(client, amount) {
    if(typeof amount != "number") {
        return false;
    }

	getPlayerCurrentSubAccount(client).cash = getPlayerCurrentSubAccount(client).cash - toInteger(amount);
	updatePlayerCash(client);
}

// ===========================================================================

function disconnectPlayer(client) {
    logToConsole(LOG_DEBUG, `Disconnecting (kicking) ${getPlayerDisplayForConsole(client)}`);
    client.disconnect();
    return false;
}

// ===========================================================================

function getElementSyncer(element) {
    return getClients()[element.syncer];
}

// ===========================================================================

function getPlayerWeaponAmmo(client) {
    return client.player.weaponAmmunition;
}

// ===========================================================================

function setPlayerVelocity(client, velocity) {
    logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s velocity to ${velocity.x}, ${velocity.y}, ${velocity.z}`);
    client.player.velocity = velocity;
}

// ===========================================================================

function getPlayerVelocity(client, velocity) {
    return client.player.velocity;
}

// ===========================================================================

function getElementDimension(element) {
    return element.dimension;
}

// ===========================================================================

function setElementDimension(element, dimension) {
    return element.dimension = dimension;
}

// ===========================================================================

function setElementRotation(element, rotation) {
    return element.setRotation(rotation);
}

// ===========================================================================

function givePlayerHealth(client, amount) {
    if(getPlayerHealth(client)+amount > 100) {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to 100`);
        setPlayerHealth(client, 100);
    } else {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s health to ${getPlayerHealth(client)+amount}`);
        setPlayerHealth(client, getPlayerHealth(client)+amount);
    }
}

// ===========================================================================

function givePlayerArmour(client, amount) {
    if(getPlayerArmour(client)+amount > 100) {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to 100`);
        setPlayerArmour(client, 100);
    } else {
        logToConsole(LOG_DEBUG, `Setting ${getPlayerDisplayForConsole(client)}'s armour to ${getPlayerArmour(client)+amount}`);
        setPlayerArmour(client, getPlayerArmour(client)+amount);
    }
}

// ===========================================================================

function getServerGame() {
    return getGame();
}

// ===========================================================================

function consolePrint(text) {
    console.log(text);
}

// ===========================================================================

function getPlayerName(client) {
    return client.name;
}

// ===========================================================================

function getServerName() {
    return server.name;
}

// ===========================================================================

function createGamePickup(model, position, type = 2) {
    return false; //gta.createPickup(model, position, type = 2);
}

// ===========================================================================

function createGameBlip(model, position, type = 1, colour = toColour(255, 255, 255, 255)) {
    return false; //gta.createBlip(model, position, type, colour);
}

// ===========================================================================

function createGameObject(model, position) {
    return false; //gta.createObject(model, position);
}

// ===========================================================================

function setElementOnAllDimensions(element, state) {
    if(!isNull(element) && element != false) {
        element.onAllDimensions = state;
    }
}

// ===========================================================================

function destroyGameElement(element) {
    if(!isNull(element) && element != false) {
        destroyElement(element);
    }
}

// ===========================================================================

function isMeleeWeapon(weaponId, gameId = getServerGame()) {
    return (getGameData().meleeWeapons[gameId].indexOf(weaponId) != -1);
}

// ===========================================================================

function getPlayerLastVehicle(client) {
    return getPlayerData(client).lastVehicle;
}

// ===========================================================================

function isVehicleObject(vehicle) {
    return (vehicle instanceof Vehicle);
}

// ===========================================================================

function setVehicleLights(vehicle, lights) {
    vehicle.lights = lights;
}

// ===========================================================================

function setVehicleEngine(vehicle, engine) {
    vehicle.engine = engine;
}

// ===========================================================================

function setVehicleSiren(vehicle, siren) {
    vehicle.siren = siren;
}

// ===========================================================================

function setVehicleLocked(vehicle, locked) {
    vehicle.locked = locked;
}

// ===========================================================================

function setVehicleColours(vehicle, colour1, colour2) {
	//vehicle.colour1 = colour1;
	//vehicle.colour2 = colour2;
}

// ===========================================================================

function createGameVehicle(modelId, position, heading) {
	mafia.createVehicle(getVehicleModelNameFromId(modelId), position, heading);
}

// ===========================================================================

function getWeaponModelId(weaponId) {
	return 0;
}

// ===========================================================================

function getIsland(position) {
    return 0;
}

// ===========================================================================

function getVehicleModelNameFromId(modelId) {
	return vehicleModels[modelId];
}

// ===========================================================================

function getVehicleModelIdFromName(params) {
	let vehicleNames = getGameData().vehicleNames[getServerGame()];
	for(let i in vehicleNames) {
		if(toLowerCase(vehicleNames[i]).indexOf(toLowerCase(params)) != -1) {
			return vehicleModels[i]
		}
	}

	return false;
}

// ===========================================================================

function getVehicleNameFromModelId(model) {
	for(let i in getGameData().vehicleModels) {
		if(getGameData().vehicleModels[i] == model) {
			return getGameData().vehicleNames[i];
		}
	}
}

// ===========================================================================

function isValidVehicleModel(model) {
	return (vehicleModels.indexOf(model) != -1);
}

// ===========================================================================

function getVehicleModelIdFromParams(params) {
	if(isNaN(params)) {
		let model = getVehicleModelFromName(params);

		if(!model) {
			return false;
		}

		if(isValidVehicleModel(model)) {
			return model;
		}

		return false;
	} else {
		if(typeof vehicleModels[params] != "undefined") {
			return params;
		}

		return false;
	}
}

// ===========================================================================