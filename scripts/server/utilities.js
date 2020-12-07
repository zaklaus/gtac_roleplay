// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: utilities.js
// DESC: Provides util functions and arrays with data
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

let gameData = {
	weaponNames: [
		[],
		["Fist", "Bat", "Pistol", "Uzi", "Shotgun", "AK47", "M16", "Sniper Rifle", "Rocket Launcher", "Flamethrower", "Molotov", "Grenade"],
		["Fist", "Brass Knuckles", "Screwdriver", "Golf Club", "Nitestick", "Knife", "Baseball Bat", "Hammer", "Meat Cleaver", "Machete", "Katana", "Chainsaw", "Grenade", "Remote Grenade", "Teargas", "Molotov Cocktail", "Missile", "Colt .45", "Python", "Shotgun", "Spaz Shotgun", "Stubby Shotgun", "Tec-9", "Uzi", "Ingram", "MP5", "M4", "Ruger", "Sniper Rifle", "Laser Sniper", "RPG", "Flame Thrower", "M60", "Minigun"],
		["Fist", "Brass Knuckles", "Golf Club", "Nightstick", "Knife", "Baseball Bat", "Shovel", "Pool Cue", "Katana", "Chainsaw", "Purple Dildo", "Dildo", "Vibrator", "Silver Vibrator", "Flowers", "Cane", "Grenade", "Teargas", "Molotov Cocktail", "Unknown", "Unknown", "Unknown", "9mm", "Silenced 9mm", "Desert Eagle", "Shotgun", "Sawnoff Shotgun", "Combat Shotgun", "Uzi", "MP5", "AK-47", "M4", "Tec-9", "Country Rifle", "Sniper Rifle", "RPG", "HS Rocket", "Flamethrower", "Minigun", "Satchel Charge", "Detonator", "Spraycan", "Fire Extinguisher", "Camera", "Night Vision Goggles", "Thermal Goggles", "Parachute", "Cellphone", "Jetpack", "Skateboard"]	
	],
	gameAnnounceColours: [
		COLOUR_BLACK,					// Invalid
		COLOUR_WHITE,					// GTA III
		COLOUR_AQUA,					// GTA Vice City
		COLOUR_ORANGE,					// GTA San Andreas
		COLOUR_ORANGE,					// GTA Underground
		//COLOUR_SILVER,				// GTA IV
		//COLOUR_SILVER					// GTA IV (EFLC)		
	],
	weatherNames: [
		["Unknown"],
		[ // GTA III
			"Clear",
			"Overcast",
			"Thunderstorm",
			"Fog",
			"Clear",
			"Rainy",
			"Dark/Cloudy",
			"Light/Cloudy",
			"Overcast/Cloudy",
			"Grey/Cloudy"
		],
		[ // GTA Vice City
			"Clear",
			"Overcast",
			"Thunderstorm",
			"Fog",
			"Clear",
			"Rainy",
			"Dark/Cloudy",
			"Light/Cloudy",
			"Overcast/Cloudy",
			"Grey/Cloudy"
		],
		[ // GTA San Andreas
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Thunderstorm",
			"Cloudy/Foggy",
			"Clear Blue Skies",
			"Heatwave",
			"Dull/Colorless",
			"Dull/Colorless",
			"Dull/Colorless",
			"Dull/Colorless",
			"Dull/Rainy",
			"Heatwave",
			"Heatwave",
			"Sandstorm",
			"Greenish/Foggy"
		],
		[ // GTA Underground
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Blue Skies",
			"Thunderstorm",
			"Cloudy/Foggy",
			"Clear Blue Skies",
			"Heatwave",
			"Dull/Colorless",
			"Dull/Colorless",
			"Dull/Colorless",
			"Dull/Colorless",
			"Dull/Rainy",
			"Heatwave",
			"Heatwave",
			"Sandstorm",
			"Greenish/Foggy"
		],
		[ // GTA IV
			"Extra Sunny",
			"Sunny",
			"Sunny/Windy",
			"Cloudy",
			"Rain",
			"Light Rain",
			"Foggy",
			"Thunderstorm",
			"Extra Sunny",
			"Sunny/Windy",
		],		
	],
	gameNames: [
		"Unknown", 
		"GTA III", 
		"GTA Vice City", 
		"GTA San Andreas", 
		"GTA Underground",
		"GTA IV",
		"GTA IV: Episodes from Liberty City",
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
	vehicleRadioStationNames: [
		[],
		[  // GTA III
			"Head Radio",
			"Double Cleff FM",
			"Jah Radio",
			"Rise FM", 
			"Lips 106",
			"Flashback FM",
			"Chatterbox 109",
			"MP3 Player"
		],
		[ // GTA Vice City
			"Wildstyle",
			"Flash FM",
			"K CHAT",
			"Fever 105", 
			"VROCK",
			"VCPR",
			"Espantoso",
			"Emotion 98.3",
			"Wave 103",
			"MP3 Player"
		],
		[ // GTA San Andreas
			"KROSE",
			"KDST",
			"Bounce FM",
			"SFUR", 
			"Radio Los Santos",
			"Radio X",
			"CSR Radio",
			"KJAH West",
			"Master Sounds",
			"WCTR",
			"User Track Player"
		]
	],
	vehicleModelIdStart: [
		0, 
		90, 	// GTA III
		130, 	// GTA Vice City
		400, 	// GTA San Andreas
		400		// GTA Underground
	],
	vehicleNames: [
		[],
		[ // GTA III
			"Landstalker",
			"Idaho",
			"Stinger",
			"Linerunner",
			"Perennial",
			"Sentinel",
			"Patriot",
			"Fire Truck",
			"Trashmaster",
			"Stretch",
			"Manana",
			"Infernus",
			"Blista",
			"Pony",
			"Mule",
			"Cheetah",
			"Ambulance",
			"FBI Car",
			"Moonbeam",
			"Esperanto",
			"Taxi",
			"Kuruma",
			"Bobcat",
			"Mr. Whoopee",
			"BF Injection",
			"Manana (Corpse)",
			"Police Car",
			"Enforcer",
			"Securicar",
			"Banshee",
			"Predator",
			"Bus",
			"Rhino",
			"Barracks OL",
			"Train",
			"Police Helicopter",
			"Dodo",
			"Coach",
			"Cabbie",
			"Stallion",
			"Rumpo",
			"RC Bandit",
			"Bellyup",
			"Mr. Wongs",
			"Mafia Sentinel",
			"Yardie Lobo",
			"Yakuza Stinger",
			"Diablo Stallion",
			"Cartel Cruiser",
			"Hoods Rumpo XL",
			"Air Train",
			"Dead Dodo",
			"Speeder",
			"Reefer",
			"Panlantic",
			"Flatbed",
			"Yankee",
			"Escape",
			"Borgnine Taxi",
			"Toyz Van",
			"Ghost"	
		],
		[ // GTA Vice City
			"Landstalker",
			"Idaho",
			"Stinger",
			"Linerunner",
			"Perennial",
			"Sentinel",
			"Rio",
			"Firetruck",
			"Trashmaster",
			"Stretch",
			"Manana",
			"Infernus",
			"Voodoo",
			"Pony",
			"Mule",
			"Cheetah",
			"Ambulance",
			"FBI Washington",
			"Moonbeam",
			"Esperanto",
			"Taxi",
			"Washington",
			"Bobcat",
			"Mr.Whoopee",
			"BF-Injection",
			"Hunter",
			"Police",
			"Enforcer",
			"Securicar",
			"Banshee",
			"Predator",
			"Bus",
			"Rhino",
			"Barracks OL",
			"Cuban Hermes",
			"Helicopter",
			"Angel",
			"Coach",
			"Cabbie",
			"Stallion",
			"Rumpo",
			"RC Bandit",
			"Romero's Hearse",
			"Packer",
			"Sentinel XS",
			"Admiral",
			"Squalo",
			"Sea Sparrow",
			"Pizza Boy",
			"Gang Burrito",
			"Airtrain",
			"Deaddodo",
			"Speeder",
			"Reefer",
			"Tropic",
			"Flatbed",
			"Yankee",
			"Caddy",
			"Zebra Cab",
			"Top Fun",
			"Skimmer",
			"PCJ-600",
			"Faggio",
			"Freeway",
			"Rcbaron",
			"RC Raider",
			"Glendale",
			"Oceanic",
			"Sanchez",
			"Sparrow",
			"Patriot",
			"Love Fist",
			"Coast Guard",
			"Dinghy",
			"Hermes",
			"Sabre",
			"Sabre Turbo",
			"Phoenix",
			"Walton",
			"Regina",
			"Comet",
			"Deluxo",
			"Burrito",
			"Spand Express",
			"Marquis",
			"Baggage Handler",
			"Kaufman Cab",
			"Maverick",
			"VCN Maverick",
			"Rancher",
			"FBI Rancher",
			"Virgo",
			"Greenwood",
			"Cuban Jetmax",
			"Hotring Racer 1",
			"Sandking",
			"Blista Compact",
			"Police Maverick",
			"Boxville",
			"Benson",
			"Mesa Grande",
			"RC Goblin",
			"Hotring Racer 2",
			"Hotring Racer 3",
			"Bloodring Banger 1",
			"Bloodring Banger 2",
			"VCPD Cheetah"		
		],
		[ // GTA San Andreas
			"Landstalker",
			"Bravura",
			"Buffalo",
			"Linerunner",
			"Pereniel",
			"Sentinel",
			"Dumper",
			"Firetruck",
			"Trashmaster",
			"Stretch",
			"Manana",
			"Infernus",
			"Voodoo",
			"Pony",
			"Mule",
			"Cheetah",
			"Ambulance",
			"Leviathan",
			"Moonbeam",
			"Esperanto",
			"Taxi",
			"Washington",
			"Bobcat",
			"Mr Whoopee",
			"BF Injection",
			"Hunter",
			"Premier",
			"Enforcer",
			"Securicar",
			"Banshee",
			"Predator",
			"Bus",
			"Rhino",
			"Barracks",
			"Hotknife",
			"Trailer",
			"Previon",
			"Coach",
			"Cabbie",
			"Stallion",
			"Rumpo",
			"RC Bandit",
			"Romero",
			"Packer",
			"Monster",
			"Admiral",
			"Squalo",
			"Seasparrow",
			"Pizzaboy",
			"Tram",
			"Trailer",
			"Turismo",
			"Speeder",
			"Reefer",
			"Tropic",
			"Flatbed",
			"Yankee",
			"Caddy",
			"Solair",
			"Berkley's RC Van",
			"Skimmer",
			"PCJ-600",
			"Faggio",
			"Freeway",
			"RC Baron",
			"RC Raider",
			"Glendale",
			"Oceanic",
			"Sanchez",
			"Sparrow",
			"Patriot",
			"Quad",
			"Coastguard",
			"Dinghy",
			"Hermes",
			"Sabre",
			"Rustler",
			"ZR-350",
			"Walton",
			"Regina",
			"Comet",
			"BMX",
			"Burrito",
			"Camper",
			"Marquis",
			"Baggage",
			"Dozer",
			"Maverick",
			"News Maverick",
			"Rancher",
			"FBI Rancher",
			"Virgo",
			"Greenwood",
			"Jetmax",
			"Hotring-Racer A",
			"Sandking",
			"Blista",
			"Police Maverick",
			"Boxville",
			"Benson",
			"Mesa",
			"RC Goblin",
			"Hotring-Racer B",
			"Hotring-Racer C",
			"Bloodring-Banger",
			"Rancher",
			"Super-GT",
			"Elegant",
			"Journey",
			"Bike",
			"Mountain Bike",
			"Beagle",
			"Cropdust",
			"Stunt",
			"Tanker",
			"RoadTrain",
			"Nebula",
			"Majestic",
			"Buccaneer",
			"Shamal",
			"Hydra",
			"FCR-900",
			"NRG-500",
			"HPV1000",
			"Cement Truck",
			"Tow Truck",
			"Fortune",
			"Cadrona",
			"FBI Truck",
			"Willard",
			"Forklift",
			"Tractor",
			"Combine",
			"Feltzer",
			"Remington",
			"Slamvan",
			"Blade",
			"Freight",
			"Streak",
			"Vortex",
			"Vincent",
			"Bullet",
			"Clover",
			"Sadler",
			"Firetruck",
			"Hustler",
			"Intruder",
			"Primo",
			"Cargobob",
			"Tampa",
			"Sunrise",
			"Merit",
			"Utility",
			"Nevada",
			"Yosemite",
			"Windsor",
			"Monster Truck A",
			"Monster Truck B",
			"Uranus",
			"Jester",
			"Sultan",
			"Stratum",
			"Elegy",
			"Raindance",
			"RC Tiger",
			"Flash",
			"Tahoma",
			"Savanna",
			"Bandito",
			"Freight",
			"Trailer",
			"Kart",
			"Mower",
			"Duneride",
			"Sweeper",
			"Broadway",
			"Tornado",
			"AT-400",
			"DFT-30",
			"Huntley",
			"Stafford",
			"BF-400",
			"Newsvan",
			"Tug",
			"Trailer",
			"Emperor",
			"Wayfarer",
			"Euros",
			"Hotdog",
			"Club",
			"Trailer",
			"Trailer",
			"Andromada",
			"Dodo",
			"RC Cam",
			"Launch",
			"Police Car",
			"Police Car",
			"Police Car",
			"Police Ranger",
			"Picador",
			"S.W.A.T. Van",
			"Alpha",
			"Phoenix",
			"Broken Glendale",
			"Broken Sadler",
			"Luggage Trailer",
			"Luggage Trailer",
			"Stair Trailer",
			"Boxville",
			"Farm Plow",
			"Utility Trailer"
		],
	],
	vehicleColourHex: [
		[],
		[ // GTA III
			"#050505",
			"#F5F5F5",
			"#2A77A1",
			"#B3363A",
			"#263739",
			"#86446E",
			"#F3ED47",
			"#4C75B7",
			"#667292",
			"#5E7072",
			"#352224",
			"#5A2124",
			"#662B2B",
			"#63322E",
			"#842827",
			"#8A3A42",
			"#682731",
			"#8B3C44",
			"#9E2F2B",
			"#A33A2F",
			"#D25633",
			"#925635",
			"#F4723A",
			"#D35733",
			"#E25A59",
			"#772A25",
			"#E17743",
			"#C44636",
			"#E17844",
			"#C35938",
			"#464840",
			"#747761",
			"#757763",
			"#918A3D",
			"#948C66",
			"#998D79",
			"#D8A534",
			"#C9BD7D",
			"#C9C591",
			"#D4C84E",
			"#1A332E",
			"#062505",
			"#1D373F",
			"#3C4A3B",
			"#2D5037",
			"#3A6C60",
			"#3A623C",
			"#7CA282",
			"#4C524E",
			"#56775B",
			"#101450",
			"#485E84",
			"#1C2745",
			"#1F3468",
			"#2B4878",
			"#475C83",
			"#447C92",
			"#3D67AB",
			"#4B7D82",
			"#80B0B7",
			"#3D2333",
			"#1C2948",
			"#343941",
			"#40454C",
			"#4A2D2B",
			"#563E33",
			"#41464C",
			"#672731",
			"#835A75",
			"#868587",
			"#171717",
			"#2E2E2E",
			"#454545",
			"#5C5C5C",
			"#737373",
			"#8A8A8A",
			"#A1A1A1",
			"#B8B8B8",
			"#CFCFCF",
			"#E6E6E6",
			"#AAAFAA",
			"#6A736B",
			"#AAAFAA",
			"#BBBEB5",
			"#BBBEB5",
			"#6A6F70",
			"#60635F",
			"#6A736B",
			"#AAAFAA",
			"#BBBEB5",
			"#21292B",
			"#343842",
			"#414648",
			"#4E5960",
			"#41454C"
		],
		[ // GTA Vice City
			"#050505",
			"#F5F5F5",
			"#2A77A1",
			"#B3363A",
			"#263739",
			"#86446E",
			"#F3ED47",
			"#4C75B7",
			"#667292",
			"#5E7072",
			"#352224",
			"#5A2124",
			"#662B2B",
			"#63322E",
			"#842827",
			"#8A3A42",
			"#682731",
			"#8B3C44",
			"#9E2F2B",
			"#A33A2F",
			"#D25633",
			"#925635",
			"#F4723A",
			"#D35733",
			"#E25A59",
			"#772A25",
			"#E17743",
			"#C44636",
			"#E17844",
			"#C35938",
			"#464840",
			"#747761",
			"#757763",
			"#918A3D",
			"#948C66",
			"#998D79",
			"#D8A534",
			"#C9BD7D",
			"#C9C591",
			"#D4C84E",
			"#1A332E",
			"#062505",
			"#1D373F",
			"#3C4A3B",
			"#2D5037",
			"#3A6C60",
			"#3A623C",
			"#7CA282",
			"#4C524E",
			"#56775B",
			"#101450",
			"#485E84",
			"#1C2745",
			"#1F3468",
			"#2B4878",
			"#475C83",
			"#447C92",
			"#3D67AB",
			"#4B7D82",
			"#80B0B7",
			"#3D2333",
			"#1C2948",
			"#343941",
			"#40454C",
			"#4A2D2B",
			"#563E33",
			"#41464C",
			"#672731",
			"#835A75",
			"#868587",
			"#171717",
			"#2E2E2E",
			"#454545",
			"#5C5C5C",
			"#737373",
			"#8A8A8A",
			"#A1A1A1",
			"#B8B8B8",
			"#CFCFCF",
			"#E6E6E6",
			"#AAAFAA",
			"#6A736B",
			"#AAAFAA",
			"#BBBEB5",
			"#BBBEB5",
			"#6A6F70",
			"#60635F",
			"#6A736B",
			"#AAAFAA",
			"#BBBEB5",
			"#21292B",
			"#343842",
			"#414648",
			"#4E5960",
			"#41454C"
		],
		[ // GTA San Andreas
			"#000000",
			"#F5F5F5",
			"#2A77A1",
			"#840410",
			"#263739",
			"#86446E",
			"#D78E10",
			"#4C75B7",
			"#BDBEC6",
			"#5E7072",
			"#46597A",
			"#656A79",
			"#5D7E8D",
			"#58595A",
			"#D6DAD6",
			"#9CA1A3",
			"#335F3F",
			"#730E1A",
			"#7B0A2A",
			"#9F9D94",
			"#3B4E78",
			"#732E3E",
			"#691E3B",
			"#96918C",
			"#515459",
			"#3F3E45",
			"#A5A9A7",
			"#635C5A",
			"#3D4A68",
			"#979592",
			"#421F21",
			"#5F272B",
			"#8494AB",
			"#767B7C",
			"#646464",
			"#5A5752",
			"#252527",
			"#2D3A35",
			"#93A396",
			"#6D7A88",
			"#221918",
			"#6F675F",
			"#7C1C2A",
			"#5F0A15",
			"#193826",
			"#5D1B20",
			"#9D9872",
			"#7A7560",
			"#989586",
			"#ADB0B0",
			"#848988",
			"#304F45",
			"#4D6268",
			"#162248",
			"#272F4B",
			"#7D6256",
			"#9EA4AB",
			"#9C8D71",
			"#6D1822",
			"#4E6881",
			"#9C9C98",
			"#917347",
			"#661C26",
			"#949D9F",
			"#A4A7A5",
			"#8E8C46",
			"#341A1E",
			"#6A7A8C",
			"#AAAD8E",
			"#AB988F",
			"#851F2E",
			"#6F8297",
			"#585853",
			"#9AA790",
			"#601A23",
			"#20202C",
			"#A4A096",
			"#AA9D84",
			"#78222B",
			"#0E316D",
			"#722A3F",
			"#7B715E",
			"#741D28",
			"#1E2E32",
			"#4D322F",
			"#7C1B44",
			"#2E5B20",
			"#395A83",
			"#6D2837",
			"#A7A28F",
			"#AFB1B1",
			"#364155",
			"#6D6C6E",
			"#0F6A89",
			"#204B6B",
			"#2B3E57",
			"#9B9F9D",
			"#6C8495",
			"#4D8495",
			"#AE9B7F",
			"#406C8F",
			"#1F253B",
			"#AB9276",
			"#134573",
			"#96816C",
			"#64686A",
			"#105082",
			"#A19983",
			"#385694",
			"#525661",
			"#7F6956",
			"#8C929A",
			"#596E87",
			"#473532",
			"#44624F",
			"#730A27",
			"#223457",
			"#640D1B",
			"#A3ADC6",
			"#695853",
			"#9B8B80",
			"#620B1C",
			"#5B5D5E",
			"#624428",
			"#731827",
			"#1B376D",
			"#EC6AAE",
			"#000000"
		],	
		[ // GTA Underground
			"#000000",
			"#F5F5F5",
			"#2A77A1",
			"#840410",
			"#263739",
			"#86446E",
			"#D78E10",
			"#4C75B7",
			"#BDBEC6",
			"#5E7072",
			"#46597A",
			"#656A79",
			"#5D7E8D",
			"#58595A",
			"#D6DAD6",
			"#9CA1A3",
			"#335F3F",
			"#730E1A",
			"#7B0A2A",
			"#9F9D94",
			"#3B4E78",
			"#732E3E",
			"#691E3B",
			"#96918C",
			"#515459",
			"#3F3E45",
			"#A5A9A7",
			"#635C5A",
			"#3D4A68",
			"#979592",
			"#421F21",
			"#5F272B",
			"#8494AB",
			"#767B7C",
			"#646464",
			"#5A5752",
			"#252527",
			"#2D3A35",
			"#93A396",
			"#6D7A88",
			"#221918",
			"#6F675F",
			"#7C1C2A",
			"#5F0A15",
			"#193826",
			"#5D1B20",
			"#9D9872",
			"#7A7560",
			"#989586",
			"#ADB0B0",
			"#848988",
			"#304F45",
			"#4D6268",
			"#162248",
			"#272F4B",
			"#7D6256",
			"#9EA4AB",
			"#9C8D71",
			"#6D1822",
			"#4E6881",
			"#9C9C98",
			"#917347",
			"#661C26",
			"#949D9F",
			"#A4A7A5",
			"#8E8C46",
			"#341A1E",
			"#6A7A8C",
			"#AAAD8E",
			"#AB988F",
			"#851F2E",
			"#6F8297",
			"#585853",
			"#9AA790",
			"#601A23",
			"#20202C",
			"#A4A096",
			"#AA9D84",
			"#78222B",
			"#0E316D",
			"#722A3F",
			"#7B715E",
			"#741D28",
			"#1E2E32",
			"#4D322F",
			"#7C1B44",
			"#2E5B20",
			"#395A83",
			"#6D2837",
			"#A7A28F",
			"#AFB1B1",
			"#364155",
			"#6D6C6E",
			"#0F6A89",
			"#204B6B",
			"#2B3E57",
			"#9B9F9D",
			"#6C8495",
			"#4D8495",
			"#AE9B7F",
			"#406C8F",
			"#1F253B",
			"#AB9276",
			"#134573",
			"#96816C",
			"#64686A",
			"#105082",
			"#A19983",
			"#385694",
			"#525661",
			"#7F6956",
			"#8C929A",
			"#596E87",
			"#473532",
			"#44624F",
			"#730A27",
			"#223457",
			"#640D1B",
			"#A3ADC6",
			"#695853",
			"#9B8B80",
			"#620B1C",
			"#5B5D5E",
			"#624428",
			"#731827",
			"#1B376D",
			"#EC6AAE",
			"#000000"
		],
	],
	skinNames: [
		[],
		[ // GTA III
			"Claude",
			"Police Officer",
			"SWAT Officer",
			"FBI Agent",
			"Army Soldier",
			"Paramedic",
			"Firefighter",
			"Wise Guy",
			"Taxi Driver",
			"Pimp",
			"Mafia Member",
			"Mafia Member",
			"Triad Member",
			"Triad Member",
			"Diablo Member",
			"Diablo Member",
			"Yakuza Member",
			"Yakuza Member",
			"Yardie Member",
			"Yardie Member",
			"Cartel Soldier",
			"Cartel Soldier",
			"Red Jacks Thug",
			"Purple Nines Thug",
			"Street Criminal",
			"Street Criminal",
			"INVALID",
			"INVALID",
			"INVALID",
			"INVALID",
			"Male Client",
			"Random Guy",
			"Vacationist",
			"Dj",
			"Young Woman",
			"Young Woman",
			"Business Woman",
			"Elder Woman",
			"Elder Woman",
			"Prostitute",
			"Prostitute",
			"Random Guy",
			"Diseased Man",
			"Deseased Woman",
			"Young Woman",
			"Old Man",
			"Random Guy",
			"Old Woman",
			"Old Woman",
			"Old Man",
			"Random Guy",
			"Old Woman",
			"Young Woman",
			"Docks Worker",
			"Docks Worker",
			"Male Street Bum",
			"Female Street Bum",
			"Delivery Guy",
			"Delivery Guy",
			"Business Man",
			"Marty Chonks",
			"Cia Agent",
			"Female Client",
			"Young Woman",
			"Business Woman",
			"Business Man",
			"Female Client",
			"Male Steward",
			"Female Steward",
			"Male Cocks Fan",
			"Male Cocks Fan",
			"Female Cocks Fan",
			"Male Paramedics Assistant",
			"Female Paramedics Assistant",
			"Construction Worker",
			"Construction Worker",
			"Zip Customer",
			"Party Woman",
			"Party Woman",
			"Male College Student",
			"Female College Student",
			"Old Man",
			"Female Jogger",
			"Asuka Kasen",
			"Spank Suicide Bomber",
			"Salvatore's Butler",
			"Catalina",
			"Lee Chong",
			"Colombian Cartel Member",
			"Colombian Cartel Member",
			"Colombian Cartel Member",
			"Colombian Cartel Member",
			"Police Officer",
			"Curly Bob",
			"Phil Cassidy",
			"Detective",
			"8-Ball",
			"8-Ball",
			"Salvatore Leone",
			"Mafia Member",
			"Joey Leone",
			"Joey Leone",
			"Bar Owner",
			"Kenji Kasen",
			"Mike Forelli",
			"Donald Love",
			"Donald Love",
			"Luigi Goterelli",
			"Maria Latore",
			"Mickey Hamfists",
			"Miguel",
			"Misty",
			"Old Oriental Gentleman",
			"Old Oriental Gentleman",
			"Old Oriental Gentleman",
			"Ray Machowski",
			"Mafia Member",
			"Ammu-Nation Clerk",
			"Tanner",
			"Toni Cipriani",
			"Darkel",
			"Chuff Security Officer",
			"Claude"
		],
		[ // GTA Vice City
			"Tommy Vercetti",
			"Police Officer",
			"SWAT Officer",
			"FBI Agent",
			"Army Soldier",
			"Paramedic",
			"Fireman",
			"Golfer",
			"INVALID",
			"Random Lady",
			"Bum",
			"Greaser",
			"Random Guy",
			"Random Guy",
			"Random Lady",
			"Random Guy",
			"Random Guy",
			"Beach Girl",
			"Fat Beach Lady",
			"Beach Guy",
			"Fat Beach Guy",
			"Random Lady",
			"Random Lady",
			"Random Lady",
			"Prostitute",
			"Bum",
			"Bum",
			"Random Guy",
			"Taxi Driver",
			"Haitian",
			"Criminal",
			"Random Lady",
			"Random Lady",
			"Random Guy",
			"Random Guy",
			"Random Lady",
			"Random Lady",
			"Random Guy",
			"Beach Lady",
			"Beach Guy",
			"Beach Lady",
			"Beach Guy",
			"Random Guy",
			"Prostitute",
			"Bum",
			"Bum",
			"Random Guy",
			"Random Guy",
			"Punk",
			"Prostitute",
			"Random Old Lady",
			"Punk",
			"Random Guy",
			"Random Lady",
			"Random Lady",
			"Random Guy",
			"Random Guy",
			"Beach Lady",
			"Beach Guy",
			"Beach Lady",
			"Beach Guy",
			"Construction Worker",
			"Golfer",
			"Golfer",
			"Golfer",
			"Beach Lady",
			"Beach Guy",
			"Random Lady",
			"Random Guy",
			"Random Guy",
			"Prostitute",
			"Bum Lady",
			"Random Guy",
			"Random Guy",
			"Taxi Driver",
			"Random Woman",
			"Skater Guy",
			"Beach Lady",
			"Skater Guy",
			"Young Woman Shopper",
			"Old Women Shopper",
			"Tourist",
			"Tourist",
			"Cuban",
			"Cuban",
			"Haitian",
			"Haitian",
			"Shark",
			"Shark",
			"Diaz Guy",
			"Diaz Guy",
			"Security Guard",
			"Security Guard",
			"Biker",
			"Biker",
			"Vercetti Guy",
			"Vercetti Guy",
			"Undercover Cop",
			"Undercover Cop",
			"Undercover Cop",
			"Undercover Cop ",
			"Undercover Cop",
			"Undercover Cop",
			"Random Guy",
			"Bodyguard",
			"Prostitute",
			"Prostitute",
			"Love Fist Guy",
			"Ken Rosenburg",
			"Candy Suxx",
			"Hilary",
			"Love Fist",
			"Phil",
			"Rockstar Guy",
			"Sonny",
			"Lance",
			"Mercades",
			"Love Fist",
			"Alex Scrub",
			"Lance Vance",
			"Lance Vance",
			"Cpt. Cortez",
			"Love Fist",
			"Columbian",
			"Hilary",
			"Mercades",
			"Cam",
			"Cam",
			"Phil",
			"Phil",
			"Bodyguard",
			"Pizza Worker",
			"Taxi Driver",
			"Taxi Driver",
			"Sailor",
			"Sailor",
			"Sailor",
			"Chef",
			"Criminal",
			"French Guy",
			"Worker",
			"Hatian",
			"Waitress",
			"Forelli Member",
			"Forelli Member",
			"Forelli Member",
			"Columbian",
			"Random Guy",
			"Beach Guy",
			"Random Guy",
			"Random Guy",
			"Random Guy",
			"Drag Queen",
			"Diaz Traitor",
			"Random Guy",
			"Random Guy",
			"Stripper",
			"Stripper",
			"Stripper",
			"Store Clerk"
		],
		[ // GTA San Andreas
			"Carl 'CJ' Johnson",
			"The Truth",
			"Maccer",
			"Andre",
			"Barry 'Big Bear' Thorne",
			"Emmet",
			"Taxi Driver/Train Driver",
			"Janitor",
			"Normal Ped",
			"Old Woman",
			"Casino Croupier",
			"Rich Woman",
			"Street Girl",
			"Normal Ped",
			"Mr.Whittaker (Rs Haul Owner)",
			"Airport Ground Worker",
			"Businessman",
			"Beach Visitor",
			"DJ",
			"Rich Guy (Madd Dogg's Manager)",
			"Normal Ped",
			"Normal Ped",
			"Bmxer",
			"Madd Dogg Bodyguard",
			"Madd Dogg Bodyguard",
			"Backpacker",
			"Construction Worker",
			"Drug Dealer",
			"Drug Dealer",
			"Drug Dealer",
			"Farm-Town Inhabitant",
			"Farm-Town Inhabitant",
			"Farm-Town Inhabitant",
			"Farm-Town Inhabitant",
			"Gardener",
			"Golfer",
			"Golfer",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Jethro",
			"Normal Ped",
			"Normal Ped",
			"Beach Visitor",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Snakehead (Da Nang)",
			"Mechanic",
			"Mountain Biker",
			"Mountain Biker",
			"Unknown",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Oriental Ped",
			"Oriental Ped",
			"Normal Ped",
			"Normal Ped",
			"Pilot",
			"Colonel Fuhrberger",
			"Prostitute",
			"Prostitute",
			"Kendl Johnson",
			"Pool Player",
			"Pool Player",
			"Priest/Preacher",
			"Normal Ped",
			"Scientist",
			"Security Guard",
			"Hippy",
			"Hippy",
			"Prostitute",
			"Stewardess",
			"Homeless",
			"Homeless",
			"Homeless",
			"Boxer",
			"Boxer",
			"Black Elvis",
			"White Elvis",
			"Blue Elvis",
			"Prostitute",
			"Ryder With Robbery Mask",
			"Stripper",
			"Normal Ped",
			"Normal Ped",
			"Jogger",
			"Rich Woman",
			"Rollerskater",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Jogger",
			"Lifeguard",
			"Normal Ped",
			"Rollerskater",
			"Biker",
			"Normal Ped",
			"Balla",
			"Balla",
			"Balla",
			"Grove Street Families",
			"Grove Street Families",
			"Grove Street Families",
			"Los Santos Vagos",
			"Los Santos Vagos",
			"Los Santos Vagos",
			"The Russian Mafia",
			"The Russian Mafia",
			"The Russian Mafia",
			"Varios Los Aztecas",
			"Varios Los Aztecas",
			"Varios Los Aztecas",
			"Triad",
			"Triad",
			"Johhny Sindacco",
			"Triad Boss",
			"Da Nang Boy",
			"Da Nang Boy",
			"Da Nang Boy",
			"The Mafia",
			"The Mafia",
			"The Mafia",
			"The Mafia",
			"Farm Inhabitant",
			"Farm Inhabitant",
			"Farm Inhabitant",
			"Farm Inhabitant",
			"Farm Inhabitant",
			"Farm Inhabitant",
			"Homeless",
			"Homeless",
			"Normal Ped",
			"Homeless",
			"Beach Visitor",
			"Beach Visitor",
			"Beach Visitor",
			"Businesswoman",
			"Taxi Driver",
			"Crack Maker",
			"Crack Maker",
			"Crack Maker",
			"Crack Maker",
			"Businessman",
			"Businesswoman",
			"Big Smoke Armored",
			"Businesswoman",
			"Normal Ped",
			"Prostitute",
			"Construction Worker",
			"Beach Visitor",
			"Well Stacked Pizza Worker",
			"Barber",
			"Hillbilly",
			"Farmer",
			"Hillbilly",
			"Hillbilly",
			"Farmer",
			"Hillbilly",
			"Black Bouncer",
			"White Bouncer",
			"White Mib Agent",
			"Black Mib Agent",
			"Cluckin' Bell Worker",
			"Hotdog/Chilli Dog Vendor",
			"Normal Ped",
			"Normal Ped",
			"Blackjack Dealer",
			"Casino Croupier",
			"San Fierro Rifa",
			"San Fierro Rifa",
			"San Fierro Rifa",
			"Barber",
			"Barber",
			"Whore",
			"Ammunation Salesman",
			"Tattoo Artist",
			"Punk",
			"Cab Driver",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Businessman",
			"Normal Ped",
			"Valet",
			"Barbara Schternvart",
			"Helena Wankstein",
			"Michelle Cannes",
			"Katie Zhan",
			"Millie Perkins",
			"Denise Robinson",
			"Farm-Town Inhabitant",
			"Hillbilly",
			"Farm-Town Inhabitant",
			"Farm-Town Inhabitant",
			"Hillbilly",
			"Farmer",
			"Farmer",
			"Karate Teacher",
			"Karate Teacher",
			"Burger Shot Cashier",
			"Cab Driver",
			"Prostitute",
			"Su Xi Mu (Suzie)",
			"Oriental Noodle Stand Vendor",
			"Oriental Boating School Instructor",
			"Clothes Shop Staff",
			"Homeless",
			"Weird Old Man",
			"Waitress (Maria Latore)",
			"Normal Ped",
			"Normal Ped",
			"Clothes Shop Staff",
			"Normal Ped",
			"Rich Woman",
			"Cab Driver",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Oriental Businessman",
			"Oriental Ped",
			"Oriental Ped",
			"Homeless",
			"Normal Ped",
			"Normal Ped",
			"Normal Ped",
			"Cab Driver",
			"Normal Ped",
			"Normal Ped",
			"Prostitute",
			"Prostitute",
			"Homeless",
			"The D.A",
			"Afro-American",
			"Mexican",
			"Prostitute",
			"Stripper",
			"Prostitute",
			"Stripper",
			"Biker",
			"Biker",
			"Pimp",
			"Normal Ped",
			"Lifeguard",
			"Naked Valet",
			"Bus Driver",
			"Biker Drug Dealer",
			"Chauffeur (Limo Driver)",
			"Stripper",
			"Stripper",
			"Heckler",
			"Heckler",
			"Construction Worker",
			"Cab Driver",
			"Cab Driver",
			"Normal Ped",
			"Clown (Ice-Cream Van Driver)",
			"Officer Frank Tenpenny",
			"Officer Eddie Pulaski",
			"Officer Jimmy Hernandez",
			"Dwaine/Dwayne",
			"Melvin 'Big Smoke' Harris (Mission)",
			"Sean 'Sweet' Johnson",
			"Lance 'Ryder' Wilson",
			"Mafia Boss",
			"T-Bone Mendez",
			"Paramedic",
			"Paramedic",
			"Paramedic",
			"Firefighter",
			"Firefighter",
			"Firefighter",
			"Los Santos Police Officer",
			"San Fierro Police Officer",
			"Las Venturas Police Officer",
			"County Sheriff",
			"Motorbike Cop",
			"S.W.A.T.",
			"Federal Agent",
			"Army Soldier",
			"Desert Sheriff",
			"Zero",
			"Ken Rosenberg",
			"Kent Paul",
			"Cesar Vialpando",
			"Jeffery 'Og Loc' Martin/Cross",
			"Wu Zi Mu (Woozie)",
			"Michael Toreno",
			"Jizzy B.",
			"Madd Dogg",
			"Catalina",
			"Claude Speed"
		],
	],
	weaponModels: [
		[],
		[ // GTA III
			0, 				// Fist
			172,			// Baseball Bat
			173,			// Colt 45
			178,			// Uzi
			176,			// Shotgun
			171,			// AK-47
			180,			// M16
			177,			// Sniper Rifle
			175,			// Rocket Launcher
			181,			// Flamethrower
			174,			// Molotov Cocktail
			170				// Grenade
		],
		[ // GTA Vice City
			0,
			259,
			260,
			261,
			262,
			263,
			264,
			265,
			266,
			267,
			268,
			269,
			270,
			291,
			271,
			272,
			273,
			274,
			275,
			277,
			278,
			279,
			281,
			282,
			283,
			284,
			280,
			276,
			285,
			286,
			287,
			288,
			289,
			290,
			-1,
			-1,
			292
		],
		[ // GTA San Andreas
			
		],
	],
	locations: [
		[],
		
		[ // GTA III
			// Police Stations
			["Portland Police Station", [1143.875, -675.1875, 14.97], 0.0],
			["Staunton Island Police Station", [340.25, -1123.375, 25.98], 0.0],
			["Shoreside Vale Police Station", [-1253.0, -138.1875, 58.75], 0.0],
			
			// Hospitals
			["Portland Hospital", [1144.25, -596.875, 14.97], 0.0],
			["Staunton Island Hospital", [183.5, -17.75, 16.21], 0.0],
			["Shoreside Vale Hospital", [-1259.5, -44.5, 58.89], 0.0],
			
			// Fire Stations
			["Portland Fire Station", [1103.70, -52.45, 7.49], 0.0],
			["Staunton Island Fire Station", [-78.48, -436.80, 16.17], 0.0],
			["Shoreside Vale Fire Station", [-1202.10, -14.67, 53.20], 0.0],		
			
			// Pay and Sprays
			["Portland Pay and Spray", [925.4, -360.3, 10.83], 0.0],		
			["Staunton Island Pay and Spray", [381.8, -493.8, 25.95], 0.0],		
			["Shoreside Vale Pay and Spray", [-1142.4, 35.01, 58.61], 0.0],	

			// Ammunations
			["Portland Ammunation", [1068.3, -400.9, 15.24], 0.0],		
			["Staunton Island Ammunation", [348.2, -717.9, 26.43], 0.0],	
			
			// Train Stations
			["Bedford Point Train Station", [178.52, -1551.40, 26.162], -3.105],
			["Francis International Airport Train Station", [-633.42, -760.06, 18.919], 1.586],
			["Rockford Train Station", [225.66, -69.07, 20.998], -3.115],
			["Saint Marks Train Station", [1306.69, -512.38, 40.078], -2.458],
			["Hepburn Heights Train Station", [1029.07, -164.18, 4.972], 0.005],
			["Chinatown Train Station", [775.27, -622.28, 14.747], 0.006],		
			
			// Safehouses
			["Portland Safehouse", [885.52, -308.47, 8.615], -1.532],

			// Other
			["St Mathias College", [201.59, -281.42, 15.779], -0.005],
			["Newport Parking Garage", [294.22, -547.87, 25.780], 3.119],
			["City Hall", [96.60, -951.61, 26.168], 3.138],
			["Belleville Park East", [109.15, -695.76, 26.168], 1.594],
			["Belleville Park Bathroom", [38.69, -724.96, 22.756], -3.104],
			["Belleville Park West", [0.40, -773.05, 26.056], -1.476],
			["Stadium Entrance", [-18.65, -231.80, 29.861], 0.002],
			["Kenji's Casino", [454.10, -1421.26, 26.124], -0.769],
			["Saint Marks Bistro", [1345.48, -457.41, 49.549], 1.537],
			["Leone Mansion", [1417.94, -194.18, 49.905], -1.570],
			["Ciprianis Ristorante", [1202.50, -320.78, 24.973], -1.553],
			["Luigi's Club", [904.82, -425.37, 14.929], 1.602],
			["Portland Fuel Station", [1157.34, -75.45, 7.065], -0.027],
			["Easy Credit Autos", [1217.81, -113.87, 14.973], -3.051],
			["Head Radio Headquarters", [986.40, -46.40, 7.473], -1.615],
			["Borgnine Taxi Headquarters", [929.36, -48.59, 7.473], -2.935],
			["Fuzz Ball", [1000.03, -877.82, 14.547], -3.136],
			["Portland Docks Entrance", [1360.55, -818.08, 14.415], -1.574],
			["Punk Noodle Diner", [1040.10, -653.10, 14.973], 1.551],
			["Greasy Joe's Diner", [864.45, -999.86, 4.646], -0.020],		
		],
		
		[ // GTA VC
			// Police Stations
			["Washington Beach Police Station", [399.77, -468.90, 11.73], 0.0],
			["Vice Point Police Station", [508.96, 512.07, 12.10], 0.0],
			["Downtown Police Station", [-657.43, 762.31, 11.59], 0.0],
			["Little Havana Police Station", [-885.08, -470.44, 13.11], 0.0],
			
			// Hospitals	
			["Downtown Hospital", [-822.57, 1152.82, 12.41], 0.0],
			["Little Havana Medical Center", [-885.08, -470.44, 13.11], 0.0],
			["Ocean Beach Hospital", [-133.19, -980.76, 10.46], 0.0],
		],	
		
		[ // GTA SA
			// Coming Soon!
		],	
		
		[ // GTA UG
			// Coming Soon!
		],	
		
		[ // GTA IV
			// Police Stations
			["Broker Police Station", [894.99, -357.39, 18.185], 2.923],
			["South Bohan Police Station", [435.40, 1592.29, 17.353], 3.087],
			["Northern Gardens Police Station", [974.93, 1870.45, 23.073], -1.621],	
			["South Slopes Police Station", [1233.25, -89.13, 28.034], 1.568],
			["Middle Part East Police Station", [50.12, 679.88, 15.316], 1.569],
			["East Holland Police Station", [85.21, 1189.82, 14.755], 3.127],	
			["Francis International Airport Police Station", [2170.87, 448.87, 6.085], 1.501],
			["Chinatown Police Station", [213.12, -211.70, 10.752], 0.200],
			["Acter Police Station", [-1714.95, 276.31, 22.134], 1.127],
			["Port Tudor Police Station", [-1220.73, -231.53, 3.024], 2.210],
			["Leftwood Police Station", [-927.66, 1263.63, 24.587], -0.913],	
			
			// Fire Stations
			["Broker Fire Station", [953.13, 95.90, 35.004], 1.595],
			["Northwood Fire Station", [-271.02, 1542.15, 20.420], -1.160],
			["Northern Gardens Fire Station", [1120.47, 1712.36, 10.534], -0.682],
			["Francis International Airport Fire Station", [2364.87, 166.83, 5.813], 0.156],
			["Chinatown Fire Station", [295.40, -336.88, 4.963], 2.887],
			["Berchem Fire Station", [-1574.90, 546.54, 25.449], -0.509],
			["Tudor Fire Station", [-2144.97, 164.15, 12.051], -2.149],
			
			// Safehouses
			["Hove Beach Safehouse Parking", [904.27, -498.00, 14.522], 3.127],
			["South Bohan Safehouse", [589.42, 1402.15, 10.364], 0.007],
			
			// Hospitals
			["Schottler Medical Center", [1199.59, 196.78, 33.554], 1.633],
			["Northern Gardens Medical Center", [980.71, 1831.61, 23.898], -0.049],
			["Leftwood Hospital", [-1317.27, 1277.20, 22.370], 2.246],
			["Acter Medical Center", [-1538.43, 344.58, 20.943], -0.156],	
			
			// Fuel Stations
			["Hove Beach Fuel Station", [1128.51, -359.55, 18.441], -0.052],
			["Lancaster Fuel Station", [108.37, 1135.13, 13.975], 0.007],
			["The Meat Quarter Fuel Station", [-434.30, -19.47, 9.864], 1.469],	
			["Cerveza Heights Fuel Station", [1123.50, 328.84, 29.245], -0.154],
			["Tudor Fuel Station", [-1389.91, 29.19, 6.875], 0.982],	
			
			// Restaurants
			["Star Junction Burger Shot", [-174.00, 276.96, 14.818], -0.029],
			["South Bohan Burger Shot", [441.95, 1516.64, 16.289], -2.682],
			["Industrial Burger Shot", [1096.93, 1598.33, 16.721], -2.289],
			
			// Night Clubs/Strip Clubs/Bars
			["Perestroika Club", [957.58, -292.58, 19.644], -0.009],
			["Triangle Club", [1210.90, 1718.18, 16.667], 1.819],
			
			// TW@ Cafes
			["Outlook Internet Cafe", [977.42, -169.11, 24.013], 1.844],
			["Berchem Internet Cafe", [-1584.46, 466.05, 25.398], -2.441],
			
			// Pay-n-Sprays
			["Hove Beach Pay-n-Spray", [1058.57, -282.58, 20.760], -3.135],
			["Leftwood Pay-n-Spray", [-1148.69, 1171.52, 16.457], -0.059],
			
			// Clothes Shops
			["Hove Beach Russian Clothes Shop", [896.31, -442.59, 15.888], 1.500],
			
			// Car Wash
			["Willis Car Wash", [1831.02, 360.20, 22.061], -1.515],
			["Tudor Car Wash", [-1371.68, 35.13, 7.028], 1.029],
			
			// Gun Shops
			["Downtown Broker Gun Shop", [1054.11, 86.84, 33.408], -1.574],
			["Chinatown Gun Shop", [65.43, -342.36, 14.767], -1.589],
			["Port Tudor Gun Shop", [-1338.77, 307.61, 13.378], -1.530],	
			
			// Train Stations
			["Hove Beach Train Station", [1000.41, -544.82, 14.854], -1.576],
			["Schottler Train Station", [1303.93, -37.75, 28.377], 3.065],
			["Cerveza Heights Train Station", [1386.87, 374.13, 23.063], 3.111],
			["Lynch Street Train Station", [1594.73, 364.80, 25.226], -0.965],
			["East Park Train Station", [-35.78, 634.79, 14.663], -0.050],
			["West Park Train Station", [-377.13, 677.05, 14.679], -0.069],
			["North Park Train Station", [-135.08, 1153.95, 14.773], -1.567],
			["Vespucci Circus Train Station", [-85.11, 1427.04, 20.421], 1.501],
			["Frankfort Low Train Station", [-331.94, 1427.05, 12.617], 1.541],
			["Frankfort High Train Station", [-343.79, 1433.12, 12.283], 0.113],
			["Vauxite Train Station", [-483.38, 1333.91, 17.481], 1.509],
			["Quartz Street West Train Station", [-545.54, 926.22, 9.945], -1.524],
			["Manganese West Train Station", [-461.60, 530.56, 9.857], 3.091],
			["Frankfort Ave Train Station", [-377.52, 371.91, 14.762], -3.125],
			["Suffolk Train Station", [-252.77, -171.83, 14.447], 1.594],
			["Feldspar Train Station", [-350.62, -335.35, 4.909], -2.287],
			["City Hall Train Station", [-115.31, -501.22, 14.755], -1.365],
			["Castle Gardens Train Station", [82.95, -757.81, 4.965], -1.006],
			["Emerald Train Station", [116.57, -318.15, 14.768], 1.499],
			["Easton Train Station", [-35.76, -18.50, 14.769], 3.137],
			["Manganese East Train Station", [131.46, 522.74, 14.661], 0.005],
			["Quartz Street East Train Station", [134.35, 910.15, 14.717], -0.112],
			["San Quentin Ave Train Station", [373.12, 1625.93, 16.347], -2.249],
			["Windmill Street Train Station", [749.97, 1447.44, 14.252], -0.120],
			["Francis International Airport Train Station", [2297.57, 474.62, 6.086], 0.066],
			
			// Misc
			["Hove Beach Laundromat", [1011.74, -325.33, 20.339], -1.402],
			["The Exchange Docks", [-354.68, -661.62, 4.791], 2.066],
			["Firefly Island Bowling", [1198.99, -681.49, 16.445], -0.017],
			["Broker Bus Depot", [1004.15, 279.19, 31.512], -2.193],
			["The Lost MC Clubhouse", [-1713.29, 358.25, 25.449], 2.566],
			["Alderney State Correctional Facility", [-1155.21, -374.34, 2.885], -1.680],
			["Chinatown Bank of Liberty", [-34.92, -466.80, 14.75], -1.52],
			["Suffolk Church", [-274.30, -281.63, 14.36], 1.56],
			
			// More will be added soon!
		], 
		
		[ // GTA EFLC
			// Police Stations
			["Broker Police Station", [894.99, -357.39, 18.185], 2.923],
			["South Bohan Police Station", [435.40, 1592.29, 17.353], 3.087],
			["Northern Gardens Police Station", [974.93, 1870.45, 23.073], -1.621],	
			["South Slopes Police Station", [1233.25, -89.13, 28.034], 1.568],
			["Middle Part East Police Station", [50.12, 679.88, 15.316], 1.569],
			["East Holland Police Station", [85.21, 1189.82, 14.755], 3.127],	
			["Francis International Airport Police Station", [2170.87, 448.87, 6.085], 1.501],
			["Chinatown Police Station", [213.12, -211.70, 10.752], 0.200],
			["Acter Police Station", [-1714.95, 276.31, 22.134], 1.127],
			["Port Tudor Police Station", [-1220.73, -231.53, 3.024], 2.210],
			["Leftwood Police Station", [-927.66, 1263.63, 24.587], -0.913],	
			
			// Fire Stations
			["Broker Fire Station", [953.13, 95.90, 35.004], 1.595],
			["Northwood Fire Station", [-271.02, 1542.15, 20.420], -1.160],
			["Northern Gardens Fire Station", [1120.47, 1712.36, 10.534], -0.682],
			["Francis International Airport FIre Station", [2364.87, 166.83, 5.813], 0.156],
			["Chinatown Fire Station", [295.40, -336.88, 4.963], 2.887],
			["Berchem Fire Station", [-1574.90, 546.54, 25.449], -0.509],
			["Tudor Fire Station", [-2144.97, 164.15, 12.051], -2.149],
			
			// Safehouses
			["Hove Beach Safehouse Parking", [904.27, -498.00, 14.522], 3.127],
			["South Bohan Safehouse", [589.42, 1402.15, 10.364], 0.007],
			
			// Hospitals
			["Schottler Medical Center", [1199.59, 196.78, 33.554], 1.633],
			["Northern Gardens Medical Center", [980.71, 1831.61, 23.898], -0.049],
			["Leftwood Hospital", [-1317.27, 1277.20, 22.370], 2.246],
			["Acter Medical Center", [-1538.43, 344.58, 20.943], -0.156],	
			
			// Fuel Stations
			["Hove Beach Fuel Station", [1128.51, -359.55, 18.441], -0.052],
			["Lancaster Fuel Station", [108.37, 1135.13, 13.975], 0.007],
			["The Meat Quarter Fuel Station", [-434.30, -19.47, 9.864], 1.469],	
			["Cerveza Heights Fuel Station", [1123.50, 328.84, 29.245], -0.154],
			["Tudor Fuel Station", [-1389.91, 29.19, 6.875], 0.982],	
			
			// Restaurants
			["Star Junction Burger Shot", [-174.00, 276.96, 14.818], -0.029],
			["South Bohan Burger Shot", [441.95, 1516.64, 16.289], -2.682],
			["Industrial Burger Shot", [1096.93, 1598.33, 16.721], -2.289],
			
			// Night Clubs/Strip Clubs/Bars
			["Perestroika Club", [957.58, -292.58, 19.644], -0.009],
			["Triangle Club", [1210.90, 1718.18, 16.667], 1.819],
			
			// TW@ Cafes
			["Outlook Internet Cafe", [977.42, -169.11, 24.013], 1.844],
			["Berchem Internet Cafe", [-1584.46, 466.05, 25.398], -2.441],
			
			// Pay-n-Sprays
			["Hove Beach Pay-n-Spray", [1058.57, -282.58, 20.760], -3.135],
			["Leftwood Pay-n-Spray", [-1148.69, 1171.52, 16.457], -0.059],
			
			// Clothes Shops
			["Hove Beach Russian Clothes Shop", [896.31, -442.59, 15.888], 1.500],
			
			// Car Wash
			["Willis Car Wash", [1831.02, 360.20, 22.061], -1.515],
			["Tudor Car Wash", [-1371.68, 35.13, 7.028], 1.029],
			
			// Gun Shops
			["Downtown Broker Gun Shop", [1054.11, 86.84, 33.408], -1.574],
			["Chinatown Gun Shop", [65.43, -342.36, 14.767], -1.589],
			["Port Tudor Gun Shop", [-1338.77, 307.61, 13.378], -1.530],	
			
			// Train Stations
			["Hove Beach Train Station", [1000.41, -544.82, 14.854], -1.576],
			["Schottler Train Station", [1303.93, -37.75, 28.377], 3.065],
			["Cerveza Heights Train Station", [1386.87, 374.13, 23.063], 3.111],
			["Lynch Street Train Station", [1594.73, 364.80, 25.226], -0.965],
			["East Park Train Station", [-35.78, 634.79, 14.663], -0.050],
			["West Park Train Station", [-377.13, 677.05, 14.679], -0.069],
			["North Park Train Station", [-135.08, 1153.95, 14.773], -1.567],
			["Vespucci Circus Train Station", [-85.11, 1427.04, 20.421], 1.501],
			["Frankfort Low Train Station", [-331.94, 1427.05, 12.617], 1.541],
			["Frankfort High Train Station", [-343.79, 1433.12, 12.283], 0.113],
			["Vauxite Train Station", [-483.38, 1333.91, 17.481], 1.509],
			["Quartz Street West Train Station", [-545.54, 926.22, 9.945], -1.524],
			["Manganese West Train Station", [-461.60, 530.56, 9.857], 3.091],
			["Frankfort Ave Train Station", [-377.52, 371.91, 14.762], -3.125],
			["Suffolk Train Station", [-252.77, -171.83, 14.447], 1.594],
			["Feldspar Train Station", [-350.62, -335.35, 4.909], -2.287],
			["City Hall Train Station", [-115.31, -501.22, 14.755], -1.365],
			["Castle Gardens Train Station", [82.95, -757.81, 4.965], -1.006],
			["Emerald Train Station", [116.57, -318.15, 14.768], 1.499],
			["Easton Train Station", [-35.76, -18.50, 14.769], 3.137],
			["Manganese East Train Station", [131.46, 522.74, 14.661], 0.005],
			["Quartz Street East Train Station", [134.35, 910.15, 14.717], -0.112],
			["San Quentin Ave Train Station", [373.12, 1625.93, 16.347], -2.249],
			["Windmill Street Train Station", [749.97, 1447.44, 14.252], -0.120],
			["Francis International Airport Train Station", [2297.57, 474.62, 6.086], 0.066],
			
			// Misc
			["Hove Beach Laundromat", [1011.74, -325.33, 20.339], -1.402],
			["The Exchange Docks", [-354.68, -661.62, 4.791], 2.066],
			["Firefly Island Bowling", [1198.99, -681.49, 16.445], -0.017],
			["Broker Bus Depot", [1004.15, 279.19, 31.512], -2.193],
			["The Lost MC Clubhouse", [-1713.29, 358.25, 25.449], 2.566],
			["Alderney State Correctional Facility", [-1155.21, -374.34, 2.885], -1.680],
			["Chinatown Bank of Liberty", [-34.92, -466.80, 14.75], -1.52],
			["Suffolk Church", [-274.30, -281.63, 14.36], 1.56],
			
			// More will be added soon!
		], 	
	],
	gtaivSkinModels: [
		//["Nico Bellic", 1862763509],
		["Male Multiplayer", -2020305438],
		["Female Multiplayer", -641875910],
		["MODEL_SUPERLOD", -1370810922],
		["Anna", 1853617247],
		["Anthony", -1646893330],
		["Badman", 1495769888],
		["Bernie Crane", 1500493064],
		["Bledar", 1731510984],
		["Brian", 422305098],
		["Brucie", -1729980128],
		["Bulgarin", 237511807],
		["Charise", 88667657],
		["Charlie Undercover", -1328445565],
		["Clarence", 1343144208],
		["Dardan", 1468450703],
		["Darko", 386513184],
		["Derric", 1169442297],
		["Dmitri", 237497537],
		["Dwayne", -617264103],
		["Eddie", -1600585231],
		["Faustin", 57218969],
		["Francis", 1710545037],
		["French Tom", 1424670436],
		["Gordon", 2129490787],
		["Gracie", -357652594],
		["Hossan", 980768434],
		["Ilyena", -835225126],
		["Issac", -479595866],
		["Ivan", 1166762483],
		["Jay", 364686627],
		["Jason", 170756246],
		["Jeff", 390357829],
		["Jimmy", -366421228],
		["Johnny Klebitz", -911507684],
		["Kate", -773750838],
		["Kenny", 995576506],
		["Lil Jacob", 1487004273],
		["Lil Jacob 2", -1275031987],
		["Luca", -681942840],
		["Luis", -492470690],
		["Mallorie", -1040287406],
		["Mam", -322700377],
		["Manny", 1445589009],
		["Marnie", 411185872],
		["Mel", -807339118],
		["Michael", 735211577],
		["Michelle", -1080659212],
		["Mickey", -636669566],
		["Packie", 1690783035],
		["Pathos", -165448092],
		["Petrovic", -1947682830],
		["Phil Bell", -1826458934],
		["Playboy X", 1794146792],
		["Ray Boccino", 954215094],
		["Ricky", -587324132],
		["Roman", -1992728631],
		["Roman 2", 558221221],
		["Sarah", -17823883],
		["Tuna", 1384833284],
		["Vinny Spaz", -1014976873],
		["Vlad", 896408642],
		["Black Street Thug 1", -301223260],
		["Black Street Thug 2", -1143910864],
		["Black Street OG 1", 869501081],
		["Black Street OG 1", 632613980],
		["Albanian Thug 1", -503930010],
		["Albanian Thug 2", -235584669],
		["Albanian Thug 3", 207714363],
		["Albanian Thug 4", 514268366],
		["Biker 1", 43005364],
		["Biker 2", 1346668127],
		["Biker 3", -1677255197],
		["Biker 4", -1461281345],
		["Biker 5", 1574850459],
		["Biker 6", -1953289472],
		["Irish Man 1", 280474699],
		["Irish Man 2", -19263344],
		["Irish Man 3", 1844702918],
		["Jamaican OG 1", 1609755055],
		["Jamaican OG 2", -330497431],
		["Jamaican OG 3", 1117105909],
		["Jamaican Thug 1", -1500397869],
		["Jamaican Thug 2", -881358690],
		["Asian Man 1", 1540383669],
		["Asian Man 2", 764249904],
		["Hispanic Man 1", 492147228],
		["Hispanic Man 2", -1926041127],
		["Hispanic Man 3", 1168388225],
		["Hispanic Man 4", -1746774780],
		["Fat Italian Mafia Boss", -302362397],
		["Italian Mafia Boss", -1616890832],
		["Italian Mafia Associate", 64730935],
		["Fat Italian Mafia Associate", 510389335],
		["Russian Thug 1", -1836006237],
		["Russian Thug 2", -2088164056],
		["Russian Thug 3", 1976502708],
		["Russian Thug 4", 1543404628],
		["Russian Thug 5", 1865532596],
		["Russian Thug 6", 431692232],
		["Russian Thug 7", 1724587620],
		["Russian Thug 8", -1180674815],
		["Triad Boss 1", 871281791],
		["Triad Boss 2", 683712035],
		["Triad Member 3", -1084007777],
		["Triad Member 4", -164935626],
		["Female Maid", -751071255],
		["Female Binco Worker", -109247258],
		["Female Bank Teller", 1366257926],
		["Female Doctor", 346338575],
		["Female Gym Worker", 1350216795],
		["Female Burger Shot Worker", 924926104],
		["Female Cluckin Bell Worker", -346378101],
		["Female Rockstar Cafe Worker", -2104311883],
		["Female TW@ Cafe Worker", 212900845],
		["Female Well Stacked Pizza Worker", -290070895],
		["Hooker", 552542187],
		["Hooker 2", 996267216],
		["Nurse", -1193778389],
		["Stripper 1", 1113677074],
		["Stripper 2", 1353709999],
		["Waitress", 24233425],
		["Alcoholic Man", -1761003415],
		["Armoured Truck Driver", 1075583233],
		["Bus Driver", 134077503],
		["Generic Asian Man", 757349871],
		["Black Crackhead", -1827421800],
		["Doctor (Scrubs)", 219393781],
		["Doctor", -1186940778],
		["Doctor (Blood Covered Coat)", 375732086],
		["Cook", 2105015949],
		["Italian Mob Enforcer", -200234085],
		["Factory Worker", 800131009],
		["FIB Agent", -999506922],
		["Fat Delivery Driver", -1993909080],
		["Fire Chief", 610888851],
		["Mercenary Soldier", 486302863],
		["Helicopter Pilot", -778316080],
		["Hotel Doorman", 624314380],
		["Korean Cook", -1784833142],
		["Lawyer 1", -1852976689],
		["Lawyer 2", -1134712978],
		["Loony Black Man", 379171768],
		["Pilot", -1945168882],
		["Generic Man", 807236245],
		["Postal Worker", -284362863],
		["Saxophone Player", -1188246269],
		["Security Guard", -1870989171],
		["Stadium Food Vendor", 420915580],
		["Stadium Food Cook", 1878085135],
		["Street Food Vendor", 142730876],
		["Street Sweeper Driver", -690681764],
		["Taxi Driver", 8772846],
		["Telephone Company Worker", 1186270890],
		["Tennis Player", -379234846],
		["Train Conductor", 1159759556],
		["Homeless Black Man", -142386662],
		["Trucker", -46564867],
		["Janitor", -1284047560],
		["Hotel Doorman 2", 22944263],
		["Mob Boss", 1178487645],
		["Airport Worker", -1464712858],
		["Bartender", -2139064254],
		["Biker Bouncer", -1780698891],
		["High End Club Bouncer", -409283472],
		["Bowling Alley Worker", -799229885],
		["Bowling Alley Worker 2", -434183225],
		["Chinese Food Vendor", 768442188],
		["Club Security", 676448572],
		["Construction Worker", -722019798],
		["Construction Worker 2", -1015957728],
		["Construction Worker 3", -714220780],
		["Police Officer", -183203150],
		["Traffic Officer", -1518937979],
		["Fat Police Officer", -370395528],
		["Courier", -1371133859],
		["Cowboy 1", -573788283],
		["Drug Dealer 1", -1283406538],
		["Drug Dealer 2", 1448755353],
		["Male Burger Shot Worker", 989485],
		["Male Cluckin Bell Worker", -1011530423],
		["Male Rockstar Cafe Worker", 1979561477],
		["Male TW@ Cafe Worker", -786449781],
		["Male Well Stacked Pizza Worker", 206941425],
		["Firefighter", -610224615],
		["Garbage Collector", 1136499716],
		["Goon", 897868981],
		["Male Gym Worker", -1902758612],
		["Mechanic 2", -356904519],
		["Male Modo Worker", -1056268969],
		["Helicopter Pilot", 1201610759],
		["Perseus", -151000142],
		["Generic Male 1", 501136335],
		["Generic Male 2", 186619473],
		["Generic Male 3", -111611196],
		["Paramedic", -1175077216],
		["Prisoner", -1676937780],
		["Prisoner 2", 215190023],
		["Roman's Taxi Service Driver", 1552970117],
		["Male Runner", -1481923910],
		["Male Shop Assistant 1", 357919731],
		["State Trooper", -89302119],
		["SWAT", -1004762946],
		["Sword Swallower", -64233032],
		["Thief", -1292254815],
		["Valet", 271284208],
		["Vendor", -186113957],
		["French Tom", -2015686009],
		["Jim Fitz", 1977784957],
		["East European Woman", -203833294],
		["East European Woman 2", 189853472],
		["Woman", -349043578],
		["Jersey Woman", -114937692],
		["Oriental Woman", -1697333660],
		["Rich Woman", 100706569],
		["Business Woman 1", 155063868],
		["Business Woman 2", 394310337],
		["Chinatown Woman", 1375728805],
		["Business Woman 3", -284229525],
		["East European Woman 3", 677687516],
		["Fat Black Woman", -1188238883],
		["Jersey Woman 1", -2075220936],
		["Jersey Woman 2", -1356924456],
		["Fat Hispanic Woman 1", 812112483],
		["Fat Hispanic Woman 2", -129242580],
		["White Manhattan Woman", 852423121],
		["Black Manhattan Woman", 76551508],
		["Old Asian Woman", -2118501976],
		["Old Rich Woman", 1616769823],
		["Business Woman 4", 453889158],
		["Asian Woman in Dress", 824245375],
		["Fat Black Bronx Woman", -1362442041],
		["Random White Woman", -1788328884],
		["Random Hispanic Woman", -1523915823],
		["Random Eastern European Woman", -949987237],
		["Random Black Woman", -1926577323],
		["Black Harlem Woman 1", 168065679],
		["Fat Jersey Woman 1", 441464],
		["Fat Hispanic Woman 3", 54114008],
		["Hispanic Woman 1", -292713088],
		["Hispanic Woman 2", 1743814728],
		["Manhattan Woman 1", 1670568326],
		["Manhattan Woman 2", 1354281938],
		["Manhattan Woman 1", 1056837725],
		["Asian Woman 1", -1193633577],
		["Black Woman 2", 713691120],
		["Rich White Woman 1", -1780385799],
		["Asian Woman", -952185135],
		["Female Shopper 1", 1586287288],
		["Female Shopper 2", 1848013291],
		["Female Shopper 3", -1702036227],
		["Female Socialite 1", 1182843182],
		["Street Woman 1", -900623157],
		["Street Woman 2", 286007875],
		["Street Woman 3", 1473654742],
		["Street Woman 4", -1850743775],
		["Street Woman 5", 1290755317],
		["Street Woman 6", 1872110126],
		["Tourist Woman 1", 1754440500],
		["MODEL_F_Y_VILLBO_01", 761763258],
		["Business Man 1", -636579119],
		["Business Man 2", -1754526315],
		["Street Criminal 1", -1516474414],
		["Street Criminal 2", -1821258883],
		["Obese Mafia Thug", 1952671026],
		["Gay Man 1", -1991603022],
		["Homeless Bum 1", -1080673049],
		["Loony White Man 1", 495499562],
		["MODEL_M_M_MIDTOWN_01", -1984134881],
		["Business Man 2", 1063816580],
		["Eastern European Man 1", 208763854],
		["Fat Black Man 2", -1020237172],
		["MODEL_M_M_PINDUS_02", 1782277836],
		["Fat Italian Man 1", -1402442039],
		["Italian Man 2", -1628417063],
		["Hispanic Man 1", 1158569407],
		["Hispanic Man 2", 1969438324],
		["Hispanic Man 3", 1621955848],
		["Tourist Man 1", -657489059],
		["Black Business Man 1", -1307068958],
		["Asian Man 3", 734334931],
		["MODEL_M_M_PRICH_01", 1865082075],
		["MODEL_M_O_EASTEURO_01", -432593815],
		["Hasidic Jewish Man 1", -1639359785],
		["Old Man 1", 1656087115],
		["MODEL_M_O_PEASTEURO_02", 2034185905],
		["MODEL_M_O_PHARBRON_01", 1316404726],
		["MODEL_M_O_PJERSEY_01", 980990533],
		["MODEL_M_O_STREET_01", -1298691925],
		["Old Business Man", 243672348],
		["MODEL_M_Y_BOHO_01", 2085884255],
		["MODEL_M_Y_BOHOGUY_01", 221246143],
		["MODEL_M_Y_BRONX_01", 52357603],
		["Black Business Man 2", 1530937394],
		["Black Business Man 3", 690281432],
		["Asian Man 4", -1149743642],
		["Chopshop Mechanic 1", -314369597],
		["Chopshop Mechanic 2", -552829610],
		["MODEL_M_Y_DODGY_01", -1097188138],
		["MODEL_M_Y_DORK_02", -1775659292],
		["MODEL_M_Y_DOWNTOWN_01", 1207402441],
		["MODEL_M_Y_DOWNTOWN_02", 1500619449],
		["MODEL_M_Y_DOWNTOWN_03", 594261682],
		["MODEL_M_Y_GAYYOUNG", -747824291],
		["MODEL_M_Y_GENSTREET_11", -677160979],
		["MODEL_M_Y_GENSTREET_16", -1678614360],
		["MODEL_M_Y_GENSTREET_20", 989044076],
		["MODEL_M_Y_GENSTREET_34", 1180218190],
		["MODEL_M_Y_HARDMAN_01", -1420592428],
		["MODEL_M_Y_HARLEM_01", -1222963415],
		["MODEL_M_Y_HARLEM_02", -1746153269],
		["MODEL_M_Y_HARLEM_04", 2104499156],
		["Hasidic Jewish Man 2", -1874580889],
		["MODEL_M_Y_LEASTSIDE_01", -1055386282],
		["MODEL_M_Y_PBRONX_01", 575808580],
		["MODEL_M_Y_PCOOL_01", -71980543],
		["MODEL_M_Y_PCOOL_02", -195159218],
		["MODEL_M_Y_PEASTEURO_01", 697247370],
		["MODEL_M_Y_PHARBRON_01", 670406267],
		["MODEL_M_Y_PHARLEM_01", 26615298],
		["MODEL_M_Y_PJERSEY_01", 1542927558],
		["MODEL_M_Y_PLATIN_01", -1806886352],
		["MODEL_M_Y_PLATIN_02", -1022920796],
		["MODEL_M_Y_PLATIN_03", -1326394505],
		["MODEL_M_Y_PMANHAT_01", 607901190],
		["MODEL_M_Y_PMANHAT_02", 1968470106],
		["MODEL_M_Y_PORIENT_01", -344136289],
		["MODEL_M_Y_PQUEENS_01", 560413584],
		["MODEL_M_Y_PRICH_01", 1352017873],
		["MODEL_M_Y_PVILLBO_01", 223726252],
		["MODEL_M_Y_PVILLBO_02", -1252681043],
		["MODEL_M_Y_PVILLBO_03", -1562020391],
		["MODEL_M_Y_QUEENSBRIDGE", 1223224881],
		["MODEL_M_Y_SHADY_02", -1220737489],
		["MODEL_M_Y_SKATEBIKE_01", 1755322862],
		["MODEL_M_Y_SOHO_01", 386690478],
		["MODEL_M_Y_STREET_01", 62496225],
		["MODEL_M_Y_STREET_03", 523785438],
		["MODEL_M_Y_STREET_04", 813889395],
		["MODEL_M_Y_STREETBLK_02", -1552214124],
		["MODEL_M_Y_STREETBLK_03", -650575089],
		["Street Punk 1", -740078918],
		["Street Punk 2", -1927496394],
		["Street Punk 3", 1374242512],
		["Tough Guy", -1139941790],
		["Male Tourist", 809067472],
	],
};

// ---------------------------------------------------------------------------

let policeStations = [
	[],
	[ // GTA III
		[1143.875, -675.1875, 14.97], 	// Portland
		[340.25, -1123.375, 25.98],		// Staunton Island
		[-1253.0, -138.1875, 58.75],	// Shoreside Vale
	],
	
	[ // GTA Vice City
		[399.77, -468.90, 11.73],		// Washington Beach
		[508.96, 512.07, 12.10],		// Vice Point
		[-657.43, 762.31, 11.59],		// Downtown	
		[-885.08, -470.44, 13.11],		// Little Havana
	],
];

// ---------------------------------------------------------------------------

let fireStations = [
	[],
	[ // GTA III
		[1103.70, -52.45, 7.49], 		// Portland
		[-78.48, -436.80, 16.17], 		// Staunton Island
		[-1202.10, -14.67, 53.20],		// Shoreside Vale
	],
	
	[ // GTA Vice City
		[-695.15, 912.58, 11.08],		// Downtown
	],
];

let hospitals = [
	[],
	[ // GTA III
		
	],
	
	[ // GTA Vice City
		[-822.57, 1152.82, 12.41],		// Downtown (Shuman Health Care Center)
		[-885.08, -470.44, 13.11],		// Little Havana (West Haven Community Health Care Center)
		[-133.19, -980.76, 10.46], 		// Ocean Beach (Ocean View Hospital)
	],
]

// ---------------------------------------------------------------------------

let payAndSprays = [
	[],
	[ // GTA III
		[925.4, -360.3, 10.83], 		// Portland
		[-1142.4, 35.01, 58.61],		// Shoreside Vale
	],
	
	[ // GTA Vice City
		[-869.95, -119.06, 10.63],		// Little Haiti
		[-910.82, -1265.96, 11.79],		// Viceport
	],
];

// ---------------------------------------------------------------------------

let ammuNations = [
	[],
	[ // GTA III
		[1068.3, -400.9, 15.24], 		// Portland
		[348.2, -717.9, 26.43], 		// Staunton Island
	],
	
	[ // GTA Vice City
		[-676.32, 1204.98, 11.10],		// Downtown
	],
];

// ---------------------------------------------------------------------------

let hiddenPackages = [
	[
		[1105.25, -1020, 25.0625], 
		[877.562, -788, 27.5625],  
		[1254, -611.188, 22.75],   
		[1045.75, -967.062, 16],   
		[942.062, -793.375, 14.875],
		[934, -718.875, 14.75],    
		[898.062, -414.688, 26.5], 
		[846.875, -442.5, 23.1875],
		[927.062, -404.375, 29.0625],
		[864.25, -171.5, 3.5],     
		[1538.25, -174.375, 19.1875],
		[1213.06, -127.062, 15.0625],
		[753.562, 137, 3.5],       
		[1162, -101.75, 12],       
		[1155.56, -191.5, 14.375], 
		[1285.5, -247.5, 42.375],  
		[1007.19, -219.562, 6.6875],
		[1138.19, -250, 24.25],    
		[1023.56, -423.688, 14.875],
		[1237.5, -854.062, 20.5625],
		[1478.25, -1150.69, 12],   
		[1018.88, -56.75, 21],
		[1465.69, -166.5, 55.5],
		[1120.19, -926.188, 16],
		[1206.5, -821.5, 15],
		[940.188, -199.875, 5],
		[979.25, -1143.06, 13.0625],
		[1195.5, -908.75, 14.875],
		[1470.38, -811.375, 22.375],
		[1320.5, -365.5, 15.1875],
		[932.562, -477.25, -10.75],
		[1305.88, -380.875, 39.5],
		[938.188, -1258.25, 3.5],
		[36.75, -530.188, 26],
		[414.375, -279.25, 23.5625],
		[203.5, -1252.56, 59.25],
		[77.6875, -352.25, 16.0625],
		[120.875, 243.688, 11.375],
		[49.375, 36.25, 16.6875],
		[68.0625, -773.25, 22.75],
		[-4, -1129.06, 26],
		[-134.688, -1386.88, 26.1875],
		[-23.5, -1472.38, 19.6875],
		[112.062, -1227.56, 26],
		[218.25, -1237.75, 20.375],
		[308, -1533.38, 23.5625],
		[468.562, -1457.19, 44.25],
		[355.062, -1085.69, 25.875],
		[312.375, -483.75, 29],
		[322.25, -447.062, 23.375],
		[586.688, -795, 1.5625],
		[504.25, -1027.75, 1.6875],
		[174.062, -1259.5, 32.0625],
		[248.75, -958.25, 26],
		[54.75, -566.5, 26.0625],
		[-77, -1490.06, 26],
		[556, -231.375, 22.75],
		[-38.1875, -1434.25, 31.75],
		[194.75, -0.5, 19.75],
		[223.062, -272.188, 16.0625],
		[-18.0625, -222.25, 29.75],
		[-69.25, -469.188, 16.0625],
		[-270.688, -631.562, 72.25],
		[-59.1875, -579.75, 15.875],
		[392.75, -1135.56, 15.875],
		[145, -1584, 30.6875],
		[428.062, -340.375, 16.1875],
		[351.062, -980.5, 33.0625],
		[-221.75, -1487.56, 5.75],
		[-1193.06, -75.75, 47.375],
		[-1090.5, 131.688, 58.6875],
		[-1015.5, -13, 49.0625],
		[-821.75, -184.875, 33.75],
		[-849.062, -209.375, 41.75],
		[-736.375, 304.688, 54.0625],
		[-678.062, 308.562, 59.75],
		[-609.188, 286.688, 65.0625],
		[-329.562, 320.062, 60.6875],
		[-1221.06, 562.75, 68.5625],
		[-1131.88, 605.375, 68.5625],
		[-1098.38, 471.25, 35.5],
		[-1208.06, 325.188, 3.375],
		[-1216.19, 347.875, 30.375],
		[-1211.88, -166.875, 58.6875],
		[-1195.19, -7.6875, 59.75],
		[-206.875, 328.75, 3.375],
		[-753.188, 142, 10.0625],
		[-697.875, -182.062, 9.1875],
		[-748.375, -807, -13.5625],
		[-489.875, -44.875, 3.75],
		[-632.875, 67.5625, 18.75],
		[-546.75, 10.6875, 3.875],
		[-1032.56, -573.375, 10.875],
		[-542, -1046.56, 3.375],
		[-1556.38, -905.75, 14.5],
		[-1327, -624.688, 11.0625],
		[-737.375, -745.375, 9.6875],
		[-1278.69, -776, 11.0625],
		[-1494.69, -1097.25, 3.375],
		[-837.75, -469.188, 10.75],
	],
	[],
	[]
];

// ---------------------------------------------------------------------------

let weekDays = [
	"Sunday", 
	"Monday", 
	"Tuesday", 
	"Wednesday", 
	"Thursday", 
	"Friday", 
	"Saturday"
];

// ---------------------------------------------------------------------------

let months = [
	"January", 
	"February", 
	"March", 
	"April", 
	"May", 
	"June", 
	"July", 
	"August", 
	"September", 
	"October", 
	"November", 
	"December"
];

// ---------------------------------------------------------------------------

let cardinalDirections = [
	"North",
	"Northeast", 
	"East", 
	"Southeast", 
	"South", 
	"Southwest", 
	"West", 
	"Northwest", 
	"Unknown"
];

// ---------------------------------------------------------------------------

function areParamsEmpty(params) {
	if(!params || params == "" || params.length == 0 || typeof params == "undefined") {
		return true;
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getParamsCount(params, delimiter) {
	return params.split(delimiter).length;
}

// ---------------------------------------------------------------------------

function getParams(params, delimiter, index) {
	return params.split(delimiter)[index];
}

// ---------------------------------------------------------------------------

function getCardinalDirectionName(cardinalDirectionId) {
	let cardinalDirections = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest", "Unknown" ];
	return cardinalDirections[cardinalDirectionId];
}

// ---------------------------------------------------------------------------

function getWeekDayName(weekdayId) {
	let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	return weekdayNames[weekdayId];
}

// ---------------------------------------------------------------------------

function getMonthName(monthId) {
	let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[monthId];
}

// ---------------------------------------------------------------------------

function getWeaponModelId(weaponId) {
	let weaponModels = [
		[ 0 , 172 , 173 , 178 , 176 , 171 , 180 , 177 , 175 , 181 , 174 , 170 ],
		[],
	];
	return weaponModels[getServerGame()][weaponId];
}

// ---------------------------------------------------------------------------

function getIsland(position) {
    if(thisGame == GAME_GTA_III) {
		if(position.x > 616) {        
			return 1;
		} else if(position.x < -283) {
			return 3;
		}
		return 2;
	} else {
		return 0;
	}
}

// ---------------------------------------------------------------------------

function openAllGarages() {

}

// ---------------------------------------------------------------------------

function closeAllGarages() {

}

// ---------------------------------------------------------------------------

function replaceEmojiInString(message) {
	for(let i in emojiReplaceString) {
		message = message.replace(emojiReplaceString[i][0], emojiReplaceString[i][1]);
	}
	return message;
}

// ---------------------------------------------------------------------------

function makeReadableTime(hour, minute) {
	let hourStr = String(hour);
	let minuteStr = String(minute);
	let meridianStr = "AM";
	
	if(hour < 10) {
		hourStr = "0" + String(hour);
		meridianStr = "AM";
	}
	
	if(hour > 12) {
		let actualHour = hour-12;
		if(actualHour < 10) {
			hourStr = "0" + String(hour-12);
		} else {
			hourStr = String(hour-12);
		}
		meridianStr = "PM";
	}
	
	if(minute < 10) {
		minuteStr = "0" + String(minute);
	}
	
	return hourStr + ":" + minuteStr + " " + meridianStr;
}

// ---------------------------------------------------------------------------

function getPosToRightOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos((-angle+1.57)+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin((-angle+1.57)+(Math.PI/2)))*distance));
	
	let rightPos = new Vec3(x, y, pos.z);
	
	return rightPos;
}

// ---------------------------------------------------------------------------

function getPosToLeftOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos((angle+1.57)+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin((angle+1.57)+(Math.PI/2)))*distance));
	
	let leftPos = new Vec3(x, y, pos.z);
	
	return leftPos;
}

// ---------------------------------------------------------------------------

function getPosInFrontOfPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle+(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle+(Math.PI/2)))*distance));
	let z = pos.z;
	
	return new Vec3(x, y, z);
}

// ---------------------------------------------------------------------------

function getPosBehindPos(pos, angle, distance) {
	let x = (pos.x+((Math.cos(angle-(Math.PI/2)))*distance));
	let y = (pos.y+((Math.sin(angle-(Math.PI/2)))*distance));
	let z = pos.z;
	
	return new Vec3(x,y,z);
}

// ---------------------------------------------------------------------------

function getPosAbovePos(pos, distance) {
	let z = pos.z+distance;
	
	return new Vec3(pos.x, pos.y, z);
}

// ---------------------------------------------------------------------------

function getPosBelowPos(pos, distance) {
	let z = pos.z-distance;
	
	return new Vec3(pos.x, pos.y, z);
}

// ---------------------------------------------------------------------------

function getHeadingFromPosToPos(pos1, pos2) {
	
	let x = pos2.x-pos1.x;
	let y = pos2.y-pos1.y;
	let rad = Math.atan2(y, x);
	let deg = radToDeg(rad);
	deg -= 90;
	deg = deg % 360;
	return degToRad(deg);
}

// ---------------------------------------------------------------------------

function degToRad(deg) {
	return deg * Math.PI / 180;
}

// ---------------------------------------------------------------------------

function radToDeg(rad) {
	return rad * 180 / Math.PI;
}

// ---------------------------------------------------------------------------

function getAngleInCircleFromCenter(center, total, current) {
	let gap = 360 / total;
	let deg = Math.floor(gap*current);
	
	if(deg <= 0) {
		deg = 1;
	} else {
		if(deg >= 360) {
			deg = 359;
		}
	}
	
	return degToRad(deg);
}

// ---------------------------------------------------------------------------

function getClosestVehicle(position) {
	return getElementsByType(ELEMENT_VEHICLE).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestCivilian(position) {
	return getElementsByType(ELEMENT_CIVILIAN).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestClient(position) {
	return getClients().reduce((i, j) => ((i.player.position.distance(position) <= j.player.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestElementByType(elementType, position) {
	return getElementsByType(elementType).reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestJobPoint(position) {
	return serverData.jobs[getServerGame()].reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestJobLocationId(position) {
	let closestJob = 0;
	for(let i in serverData.jobs) {
		for(let j in serverData.jobs[i].locations) {
			if(serverData.jobs[i].locations[j].position.distance(position) < serverData.jobs[closestJob].position.distance(position)) {
				closestJob = i;
			}
		}
	}
	return closestJob;
}

// ---------------------------------------------------------------------------

function getJobIndex(jobData) {
	return serverData.jobs.indexOf(jobData);
}

// ---------------------------------------------------------------------------

function getVehiclesInRange(position, distance) {
	return getElementsByType(ELEMENT_VEHICLE).filter(x => x.player && x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getClientsInRange(position, distance) {
	//return getClients().filter(x => x.player && x.player.position.distance(position) <= distance);

	return getElementsByTypeInRange(ELEMENT_PLAYER, position, distance);
}

// ---------------------------------------------------------------------------

function getCiviliansInRange(position, distance) {
	return getElementsByType(ELEMENT_CIVILIAN).filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getElementsByTypeInRange(elementType, position, distance) {
	return getElementsByType(elementType).filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getJobPointsInRange(position, distance) {
	return serverData.jobs[getServerGame()].filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getWeaponName(weapon) {
	return weaponNames[getServerGame()][weapon];
}

// ---------------------------------------------------------------------------

function vec3ToVec2(pos) {
	return new Vec2(pos[0], pos[1]);
}

// ---------------------------------------------------------------------------

function vec3ToVec3(pos, z) {
	return new Vec3(pos[0], pos[1], z);
}

// ---------------------------------------------------------------------------

function isParamsInvalid(params) {
	if(params == null) {
		return true;
	}
	
	if(params == "") {
		return true;
	}
	
	if(params.length == 0) {
		return true;	
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function isValidVehicleModel(modelId) {
	if(getServerGame() == GAME_GTA_III) {
		if(modelId < 90 || modelId > 150) {
			return false;
		}
		
		return true;
	}
	
	if(getServerGame() == GAME_GTA_VC) {
		if(modelId < 130 || modelId > 236) {
			return false;
		}
		
		return true;
	}

	if(getServerGame() == GAME_GTA_SA) {
		return true;
	}
	
	if(getServerGame() == GAME_GTA_IV) {
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function getVehicleModelIdFromParams(params) {
	if(isNaN(params)) {
		let modelId = getVehicleModelIdFromName(params);
		
		if(!modelId) {
			return false;
		}
		
		if(isValidVehicleModel(Number(modelId))) {
			return Number(modelId);
		}
		
		return false;		
	} else {
		if(isValidVehicleModel(Number(params))) {
			return Number(params);
		}
		
		return false;
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getVehicleModelIdFromName(params) {
	for(let i in gameData.vehicleNames[getServerGame()]) {
		if(gameData.vehicleNames[getServerGame()][i].toLowerCase().indexOf(params.toLowerCase()) != -1) {
			return Number(i)+Number(gameData.vehicleModelIdStart[getServerGame()]);
		}
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function doesWordStartWithVowel(word) {
	switch(word.substr(0,1).toLowerCase()) {
		case "a":
		case "e":
		case "i":
		case "o":
		case "u":
			return true;
		
		default:
			return false;
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getVehicleNameFromModelId(modelId) {
	let modelIndex = modelId-gameData.vehicleModelIdStart[getServerGame()];
	return gameData.vehicleNames[getServerGame()][modelIndex];
}

// ---------------------------------------------------------------------------

function replaceEmojiInString(message) {
	for(let i in emojiReplaceString) {
		while(message.indexOf(emojiReplaceString[i][0]) != -1) {
			message = message.replace(emojiReplaceString[i][0], emojiReplaceString[i][1]);
		}
	}
	return message;
}

// ---------------------------------------------------------------------------

function getSyncerFromId(syncerId) {
	let clients = getClients();
	return clients[syncerId];
}

// ---------------------------------------------------------------------------

function getClientFromName(clientName) {
	let clients = getClients();
	for(let i in clients) {
		if(clients[i].name.toLowerCase().indexOf(clientName.toLowerCase()) != -1) {
			return clients[i];
		}
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getClientFromPlayer(player) {
	let clients = getClients();
	for(let i in clients) {
		if(clients[i].player == player) {
			return clients[i];
		}
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getPlayerFromParams(params, isServer) {
	let clients = getClients();
	if(isNaN(params)) {
		for(let i in clients) {
			if(clients[i].name.toLowerCase().indexOf(params.toLowerCase()) != -1) {
				return clients[i].player;
			}			
		}
	} else {
		let playerId = Number(params) || 0;
		if(typeof clients[playerId] != "undefined") {
			return clients[playerId].player;
		}			
	}
	
	return false;
}


// ---------------------------------------------------------------------------

function getClientFromParams(checkParams) {
	console.log(checkParams);
	let clients = getClients();
	if(isNaN(checkParams)) {
		console.log(`Checking string name`);
		checkParams = checkParams.toLowerCase();
		for(let i in clients) {
			let clientName = clients[i].name.toLowerCase();
			console.log(`Checking ${clientName}`);
			if(clientName.indexOf(checkParams) != -1) {
				console.log(`Found ${clients[i].name}`);
				return clients[i];
			}
		}
	} else {
		console.log(`Checking int ID`);
		let clientId = Number(checkParams) || 0;
		if(typeof clients[clientId] != "undefined") {
			console.log(`Found ${clients[i].name}`);
			return clients[clientId];
		}			
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getFirstEmptyEffectSlot(isServer = false) {
	if(isServer) {
		for(let i in effects) {
			if(!effects[i].exists) {
				return i;
			}
		}
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function packData(...args) {
	for(let i in args) {
		switch(args[i].constructor.name) {
			case "Vec3":
				let x = args[i].x.toFixed(2);
				let y = args[i].y.toFixed(2);
				let z = args[i].z.toFixed(2);
				x = x * 100;
				y = z * 100;
				z = z * 100;
				let result = combine(x, y, z);
				break;
		}
	}
}

// ---------------------------------------------------------------------------

function combine(a, b, c) {
	return Number((a << 20) | (b << 10) | c);
}

// ---------------------------------------------------------------------------

function createBitwiseTable(tableKeys) {
	let bitVal = 0;
	let bitTable = {};
	let incVal = 1;
	
	for(let i in tableKeys) {
		let key = tableKeys[i];
		bitTable[key] = bitVal;
		bitVal = 1 << incVal;
		incVal++;
	}
	return bitTable;
}

// ---------------------------------------------------------------------------

function hasBitFlag(checkThis, checkFor) {
	if(checkThis & checkFor) {
		return true;
	}
	return false;
}

// ---------------------------------------------------------------------------

function killDeathRatio(kills, deaths) {
	if(deaths == 0 || kills == 0) {
		return 0.0;
	}
	return Float((iKills*100/iDeaths) * 0.01);
}

// ---------------------------------------------------------------------------

function getCardinalDirection(pos1, pos2) {
	let a = pos1.x - pos2.x;
	let b = pos1.y - pos2.y;
	let c = pos1.z - pos2.z;
	
	let x = Math.abs(a);
	let y = Math.abs(b);
	let z = Math.abs(c);
	
	let no = 0;
	let ne = 1;
	let ea = 2;
	let se = 3;
	let so = 4;
	let sw = 5;
	let we = 6;
	let nw = 7;
	let na = 8;
	
	if(b < 0 && a < 0){
		if(x < (y/2)){
			return no;
		} else if(y < (x/2)){
			return ea;
		} else {
			return ne;
		}
	} else if(b < 0 && a >= 0){
		if(x < (y/2)){
			return no;
		} else if(y < (x/2)){
			return we;
		} else {
			return nw;
		}
	} else if(b >= 0 && a >= 0){
		if(x < (y/2)){
			return so;
		} else if(y < (x/2)){
			return we;
		} else {
			return sw;
		}
	} else if(b >= 0 && a < 0){
		if(x < (y/2)){
			return so;
		} else if(y < (x/2)){
			return ea;
		} else {
			return se;
		}
	} else {
		return na;
	}
	return na;
}

// ---------------------------------------------------------------------------

function getTimeDifferenceDisplay(unixTimeOne, unixTimeTwo) {
    let timeDifference = unixTimeOne-unixTimeTwo;
    let hours = floor(timeDifference/3600);
    let minutes = floor(timeDifference/60);
    let hourString = "";
	let minuteString = "";
	
    if(hours == 1) {
        hourString = "1 hour";
    } else {
        hourString = String(hours) + " hours";
    }
    
    if(minutes == 1) {
        minuteString = "1 minute";
    } else {
        minuteString = String(minutes) + " minute";
    }
    
    return hourString + " and " + minuteString;
}

// ---------------------------------------------------------------------------

function getVehiclesInRange(position, range) {
	let vehicles = getVehicles();
	let inRangeVehicles = [];
	for(let i in vehicles) {
		if(getDistance(position, vehicles[i].position) <= range) {
			inRangeVehicles.push(vehicles[i]);
		}
	}
	return inRangeVehicles;
}

// ---------------------------------------------------------------------------

function getPlayersInRange(position, range) {
	let peds = getPeds();
	let inRangePlayers = [];
	for(let i in peds) {
		if(peds[i].isType(ELEMENT_PLAYER)) {
			if(getDistance(position, peds[i].position) <= range) {
				inRangePlayers.push(peds[i]);
			}
		}
	}
	return inRangePlayers;
}

// ---------------------------------------------------------------------------

function getCiviliansInRange(position, range) {
	let peds = getPeds();
	let inRangeCivilians = [];
	for(let i in peds) {
		if(peds[i].isType(ELEMENT_CIVILIANS)) {
			if(getDistance(position, peds[i].position) <= range) {
				inRangeCivilians.push(peds[i]);
			}
		}
	}
	return inRangeCivilians;
}

// ---------------------------------------------------------------------------

function getFileData(filePath) {
	let file = openFile(filePath, false);
	if(!file) {
		return false;
	}
	let fileData = file.readBytes(file.length);
	file.close();
	return fileData;
}

// ---------------------------------------------------------------------------

function setFileData(filePath, fileData)
{
	let file = openFile(filePath, true);
	if(!file) {
		return false;
	}
	file.writeBytes(fileData, fileData.length);
	file.close();
	return true;
}

// ---------------------------------------------------------------------------

function is2dPositionOnScreen(pos2d) {
	return pos2d.x >= 0 && pos2d.y >= 0 && pos2d.x <= game.width && pos2d.y <= game.height;
}

// ---------------------------------------------------------------------------

function getRandomRGB() {
	return toColour.apply(null, [
		getRandom(0, 255),
		getRandom(0, 255),
		getRandom(0, 255),
		255
	]);
}

// ---------------------------------------------------------------------------

function breakText(text, maxLength) {
	let lines = [];
	let j = Math.floor(text.length / maxLength);
	
	for(let i = 0; i < j; i++) {
		lines.push(text.substr(i*maxLength,maxLength));
	}
	
	let line = text.substr(j*maxLength, text.length % maxLength);
	if(line.length > 0) {
		lines.push(line);
	}
	
	return lines;
}

// ---------------------------------------------------------------------------

function getSpeedFromVelocity(vel) {
	return Math.sqrt(vel.x*vel.x + vel.y*vel.y + vel.z*vel.z);
}

// ---------------------------------------------------------------------------

function getRandom(min, max) {
	return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min)
}

// ---------------------------------------------------------------------------

function getArrayOfElementId(elements) {
	let tempArray = [];
	for(let i in elements) {
		tempArray.push(elements[i].id);
	}
	
	return tempArray;
}

// ---------------------------------------------------------------------------

function Enum(constantsList) {
    let tempTable = {};
	for(let i in constantsList) {
        tempTable[constantsList[i]] = i;
    }
	return tempTable;
}

// ---------------------------------------------------------------------------

function isValidSkin(skin, game = GAME_GTA_III) {
	if(game == GAME_GTA_III) {
		return true;
	} else if(game == GAME_GTA_VC) {
		switch(skin) {
			case 111:
				return false;
			
			default:
				return true;
		}
	}
}

// ---------------------------------------------------------------------------

function getClientVirtualWorld(client) {
	if(isClientSpawned(client)) {
		return getClientPlayer(client).dimension;
	}

	return 0;
}

// ---------------------------------------------------------------------------

function getClientInterior(client) {
	if(isClientSpawned(client)) {
		return getClientPlayer(client).interior;
	}

	return 0;
}

// ---------------------------------------------------------------------------

function getPositionArea(position) {
	if(typeof position == "Vec3") {
		position = vec3ToVec2(position);
	}

	let gameAreas = getGameAreas(getServerGame());
	for(let i in gameAreas) {
		if(isPositionInArea(position, gameAreas[i][1])) {
			return i;
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function getAreaName(position) {
	let areaId = getPositionArea(position);
	if(!areaId) {
		return false;
	}

	return getGameAreas()[areaId][0];
}

// ---------------------------------------------------------------------------

function getGameAreas(gameId) {
	return gameAreas[gameId];
}

// ---------------------------------------------------------------------------

function getClientData(client) {
	console.log(serverData.clients[client.index]);
	return serverData.clients[client.index];
}

// ---------------------------------------------------------------------------

function getClientCurrentSubAccount(client) {
	let subAccountId = getClientData(client).currentSubAccount;
	return getClientData(client).subAccounts[subAccountId];
}

// ---------------------------------------------------------------------------

function getClientSubAccountName(client) {
	let subAccountData = getClientCurrentSubAccount(client);
	return `${subAccountData.firstName} ${subAccountData.lastName}`;
}

// ---------------------------------------------------------------------------

function createAllLocationBlips() {
    createAllPoliceStationBlips();
    createAllFireStationBlips();
    createAllHospitalBlips();
    createAllPayAndSprayBlips();
    createAllFuelStationBlips();
    createAllAmmunationBlips();
}

// ---------------------------------------------------------------------------

function createAllPoliceStationBlips() {
	if(serverConfig.blipSprites[getServerGame()].policeStation != -1) {
		for(let i in serverData.policeStations[getServerGame()]) {
			serverData.policeStations[getServerGame()][i].blip = createBlip(serverConfig.blipSprites[getServerGame()].policeStation, serverData.policeStations[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllFireStationBlips() {
	if(serverConfig.blipSprites[getServerGame()].fireStation != -1) {
		for(let i in serverData.fireStations[getServerGame()]) {
			serverData.fireStations[getServerGame()][i].blip = createBlip(serverConfig.blipSprites[getServerGame()].fireStation, serverData.fireStations[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllHospitalBlips() {
	if(serverConfig.blipSprites[getServerGame()].hospital != -1) {
		for(let i in serverData.hospitals[getServerGame()]) {
			serverData.hospitals[getServerGame()][i].blip = createBlip(serverConfig.blipSprites[getServerGame()].hospital, serverData.hospitals[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllAmmunationBlips() {
	if(serverConfig.blipSprites[getServerGame()].ammunation != -1) {
		for(let i in serverData.ammunations[getServerGame()]) {
			serverData.ammunations[getServerGame()][i].blip = createBlip(serverConfig.blipSprites[getServerGame()].ammunation, serverData.ammunations[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllPayAndSprayBlips() {
	if(serverConfig.blipSprites[getServerGame()].payAndSpray != -1) {
		for(let i in serverData.payAndSprays[getServerGame()]) {
			
			serverData.payAndSprays[getServerGame()][i].blip = createBlip(serverConfig.blipSprites[getServerGame()].payAndSpray, serverData.payAndSprays[getServerGame()][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllFuelStationBlips() {
	if(serverConfig.blipSprites[getServerGame()].fuelStation != -1) {
		for(let i in serverData.fuelStations[getServerGame()]) {
			serverData.fuelStations[getServerGame()][i].blip = createBlip(serverConfig.blipSprites[getServerGame()].fuelStation, serverData.fuelStations[getServerGame()][i].position, 2, serverConfig.colour.byName.burntOrange);
		}
	}
}

// ---------------------------------------------------------------------------

function sendAllPoliceStationBlips(client) {
	if(serverConfig.blipSprites[getServerGame()].policeStation != -1) {
		let tempBlips = [];
		for(let i in serverData.policeStations[getServerGame()]) {
			tempBlips.push([
				serverConfig.blipSprites[getServerGame()].policeStation, 
				serverData.policeStations[getServerGame()][i].position.x, 
				serverData.policeStations[getServerGame()][i].position.y, 
				serverData.policeStations[getServerGame()][i].position.z, 
				3, 
				serverConfig.colour.byName.policeBlue,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllFireStationBlips(client) {
	if(serverConfig.blipSprites[getServerGame()].fireStation != -1) {
		let tempBlips = [];
		for(let i in serverData.fireStations[getServerGame()]) {
			tempBlips.push([
				serverConfig.blipSprites[getServerGame()].fireStation, 
				serverData.fireStations[getServerGame()][i].position.x, 
				serverData.fireStations[getServerGame()][i].position.y, 
				serverData.fireStations[getServerGame()][i].position.z, 
				3, 
				serverConfig.colour.byName.firefighterRed,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllHospitalBlips(client) {
	if(serverConfig.blipSprites[getServerGame()].hospital != -1) {
		let tempBlips = [];
		for(let i in serverData.hospitals[getServerGame()]) {
			tempBlips.push([
				serverConfig.blipSprites[getServerGame()].hospital, 
				serverData.hospitals[getServerGame()][i].position.x, 
				serverData.hospitals[getServerGame()][i].position.y, 
				serverData.hospitals[getServerGame()][i].position.z, 
				3, 
				serverConfig.colour.byName.medicPink,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllAmmunationBlips(client) {
	if(serverConfig.blipSprites[getServerGame()].ammunation != -1) {
		let tempBlips = [];
		for(let i in serverData.ammunations[getServerGame()]) {
			tempBlips.push([
				serverConfig.blipSprites[getServerGame()].ammunation, 
				serverData.ammunations[getServerGame()][i].position.x, 
				serverData.ammunations[getServerGame()][i].position.y, 
				serverData.ammunations[getServerGame()][i].position.z, 
				3, 
				0
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllPayAndSprayBlips(client) {
	if(serverConfig.blipSprites[getServerGame()].payAndSpray != -1) {
		let tempBlips = [];
		for(let i in serverData.payAndSprays[getServerGame()]) {
			tempBlips.push([
				serverConfig.blipSprites[getServerGame()].payAndSpray, 
				serverData.payAndSprays[getServerGame()][i].position.x, 
				serverData.payAndSprays[getServerGame()][i].position.y, 
				serverData.payAndSprays[getServerGame()][i].position.z, 
				3, 
				0
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllFuelStationBlips(client) {
	if(serverConfig.blipSprites[getServerGame()].fuelStation != -1) {
		let tempBlips = [];
		for(let i in serverData.fuelStations[getServerGame()]) {
			tempBlips.push([
				serverConfig.blipSprites[getServerGame()].fuelStation, 
				serverData.fuelStations[getServerGame()][i].position.x, 
				serverData.fuelStations[getServerGame()][i].position.y, 
				serverData.fuelStations[getServerGame()][i].position.z, 
				3, 
				serverConfig.colour.byName.burntOrange,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function getPickupOwnerType(pickup) {
	return pickup.getData("ag.ownerType");
}

// ---------------------------------------------------------------------------

function getPickupOwnerId(pickup) {
	return pickup.getData("ag.ownerId");
}

// ---------------------------------------------------------------------------

function canClientUseJobs(client) {
	if(getClientData(client).accountData.flags.moderation & serverData.moderationFlags.jobBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUsePoliceJob(client) {
	if(getClientData(client).accountData.flags.moderation & serverData.moderationFlags.policeBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUseFireJob(client) {
	if(getClientData(client).accountData.flags.moderation & serverData.moderationFlags.fireBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUseAmmunations(client) {
	if(getClientData(client).accountData.flags.moderation & serverData.moderationFlags.ammuBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function canClientUseGuns(client) {
	if(getClientData(client).accountData.flags.moderation & serverData.moderationFlags.gunBanned) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------



// ---------------------------------------------------------------------------

function intToBool(intVal) {
	return !!intVal;
}

// ---------------------------------------------------------------------------

function boolToInt(boolVal) {
	return (boolVal) ? 1 : 0;
}

// ---------------------------------------------------------------------------

function sendAllBlips(client) {
	sendAllPoliceStationBlips(client);
	sendAllFireStationBlips(client);
	sendAllHospitalBlips(client);
	sendAllPayAndSprayBlips(client);
	sendAllAmmunationBlips(client);
	sendAllFuelStationBlips(client);
	sendAllJobBlips(client);
}

// ---------------------------------------------------------------------------

function processHoldActionKey(client) {
	let closestJobId = getClosestJobPointId(client.player.position);
	let closestVehicle = getClosestVehicle(client.player.position);
	let closestHouse = getClosestHouse(client.player.position);
	let closestBusiness = getClosestBusiness(client.player.position);
	let jobData = getJobData(closestJobId);


	if(getClientCurrentSubAccount(client).job == AG_JOB_NONE) {
		if(jobData.position.distance(client.player.position) <= serverConfig.takeJobDistance) {
			takeJob(client, closestJobId);
			messageClientSuccess(client, "You now have the " + String(jobData.name) + " job");
		}
	} else {
		if(jobData.jobType == getClientCurrentSubAccount(client).job) {
			if(jobData.position.distance(client.player.position) <= serverConfig.startWorkDistance) {
				startWorking(client);
				messageClientSuccess(client, "You are now working as a " + String(jobData.name));
				showStartedWorkingTip(client);
				return true;
			}
		} else {
			messageClientError(client, "This is not your job!");
			messageClientInfo(client, `Use /quitjob to quit your current job.`);
		}
	}
}

// ---------------------------------------------------------------------------

function processPressActionKey(client) {
	// Check job stuff
	let closestJob = getClosestJob(client.player.position);
	
	if(getClientCurrentSubAccount(client).job == AG_JOB_NONE) {
		if(closestJob.position.distance(client.player.position) <= serverConfig.takeJobDistance) {
			
		}
	}
}

// ---------------------------------------------------------------------------

function processHoldVehicleLightsKey(client) {

}

// ---------------------------------------------------------------------------

function processHoldVehicleLockKey(client) {

}

// ---------------------------------------------------------------------------

function processHoldVehicleEngineKey(client) {
	
}

// ---------------------------------------------------------------------------

function getClientChatColour(client) {
	let tempJob = getClientCurrentSubAccount(client).job;
	if(tempJob != -1) {
		if(getClientData(client).isWorking) {
			return getJobData(tempJob).jobColour;
		}
	}
	return getColourByName("white");
}

// ---------------------------------------------------------------------------

function showConnectCameraToPlayer(client) {
	triggerNetworkEvent("ag.connectCamera", client, serverConfig.connectCameraPosition, serverConfig.connectCameraLookAt);
	//triggerNetworkEvent("ag.showCharacterSelect", client, tempSubAccount.firstName, tempSubAccount.lastName, tempSubAccount.placeOfOrigin, tempSubAccount.dateOfBirth, tempSubAccount.skin);	
}

// ---------------------------------------------------------------------------

function initAllClients() {
	getClients().forEach(function(client) {
		initClient(client);
	});
}

// ---------------------------------------------------------------------------

function getYesNoFromBool(boolVal) {
	return (boolVal) ? "Yes" : "No";
}

// ---------------------------------------------------------------------------

function getOnOffFromBool(boolVal) {
	return (boolVal) ? "On" : "Off";
}

// ---------------------------------------------------------------------------

function getEnabledDisabledFromBool(boolVal) {
	return (boolVal) ? "Enabled" : "Disabled";
}

// ---------------------------------------------------------------------------

function updateServerRules() {
	server.setRule("Time", makeReadableTime(serverConfig.hour, serverConfig.minute));
	server.setRule("Weather", gameData.weatherNames[server.game][serverConfig.weather]);
	server.setRule("Snowing", getYesNoFromBool(serverConfig.fallingSnow));
}

// ---------------------------------------------------------------------------

function getWeatherFromParams(params) {
	if(isNaN(params)) {
		for(let i in weatherNames[server.game]) {
			if(weatherNames[server.game][i].toLowerCase().indexOf(params.toLowerCase()) != -1) {
				return i;
			}
		}
		return false;
	} else {
		if(typeof weatherNames[server.game][i] != "undefined") {
			return i;
		}
		return false;
	}
	return false;
}

// ---------------------------------------------------------------------------

function updatePlayerCash(client) {
	triggerNetworkEvent("ag.money", getClientCurrentSubAccount(client).cash);
}

// ---------------------------------------------------------------------------

function clearChatBox(client) {
	//gta.messages.clear();
	for(let i = 0; i <= 20; i++) {
		messageClient(" ", client, COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

function getSkinIdFromParams(params, gameId = server.game) {
	if(isNaN(params)) {
		return getSkinIdFromName(params, gameId);
	} else {
		params = Number(params);
		if(gameId == GAME_GTA_IV || gameId == GAME_GTA_IV_EFLC) {
			return gameData.gtaivSkinModels[params][1];
		} else {
			return params;
		}
	}

	return false;
}

// ---------------------------------------------------------------------------

function getSkinNameFromId(modelId, gameId = server.game) {
	if(gameId >= GAME_GTA_IV) {
		for(let i in gameData.gtaivSkinModels) {
			if(gameData.gtaivSkinModels[i][1] == modelId) {
				return gameData.gtaivSkinModels[i][0];
			}
		}
	} else {
		let modelIndex = modelId;
		return gameData.skinNames[gameId][modelIndex];
	}
}

// ---------------------------------------------------------------------------

function getSkinIdFromName(params, gameId = server.game) {
	if(gameId == GAME_GTA_IV || gameId == GAME_GTA_IV_EFLC) {
		for(let i in gtaivSkinModels) {
			if(gameData.gtaivSkinModels[i][0].toLowerCase().indexOf(params.toLowerCase()) != -1) {
				return gameData.gtaivSkinModels[i][1];You 
			}
		}
	} else {
		for(let i in gameData.skinNames[gameId]) {
			if(gameData.skinNames[gameId][i].toLowerCase().indexOf(params.toLowerCase()) != -1) {
				return i;
			}
		}
	}

	return false;
}

// ---------------------------------------------------------------------------