// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
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
	vehicleModelIDStart: [
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

function getWeaponModelID(weaponId) {
	let weaponModels = [
		[ 0 , 172 , 173 , 178 , 176 , 171 , 180 , 177 , 175 , 181 , 174 , 170 ],
		[],
	];
	return weaponModels[server.game][weaponId];
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
	return serverData.jobs[server.game].reduce((i, j) => ((i.position.distance(position) <= j.position.distance(position)) ? i : j));
}

// ---------------------------------------------------------------------------

function getClosestJobPointId(position) {
	let closestJob = 0;
	for(let i in serverData.jobs[server.game]) {
		if(serverData.jobs[server.game][i].position.distance(position) < serverData.jobs[server.game][closestJob].position.distance(position)) {
			closestJob = i;
		}
	}
	return closestJob;
}

// ---------------------------------------------------------------------------

function getJobIndex(jobData) {
	return serverData.jobs[server.game].indexOf(jobData);
}

// ---------------------------------------------------------------------------

function getVehiclesInRange(position, distance) {
	return getElementsByType(ELEMENT_VEHICLE).filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getClientsInRange(position, distance) {
	return getClients().filter(x => x.player.position.distance(position) <= distance);
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
	return serverData.jobs[server.game].filter(x => x.position.distance(position) <= distance);
}

// ---------------------------------------------------------------------------

function getWeaponName(weapon) {
	return weaponNames[game.game][weapon];
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

function isValidVehicleModel(modelID) {
	if(game.game == GAME_GTA_III) {
		if(modelID < 90 || modelID > 150) {
			return false;
		}
		
		return true;
	}
	
	if(game.game == GAME_GTA_VC) {
		if(modelID < 130 || modelID > 236) {
			return false;
		}
		
		return true;
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getVehicleModelIDFromParams(params, gameID = game.game) {
	if(isNaN(params)) {
		let modelID = getVehicleModelIDFromName(params);
		
		if(!modelID) {
			return gameData.vehicleModelIDStart[gameID];
		}
		
		if(isValidVehicleModel(Number(modelID))) {
			return Number(modelID);
		}
		
		return gameData.vehicleModelIDStart[gameID];		
	} else {
		if(isValidVehicleModel(Number(params))) {
			return Number(params);
		}
		
		return gameData.vehicleModelIDStart[gameID];
	}
	
	return false;
}

// ---------------------------------------------------------------------------

function getVehicleModelIDFromName(params, gameID = game.game) {
	for(let i in gameData.vehicleNames[gameID]) {
		if(gameData.vehicleNames[gameID][i].toLowerCase().indexOf(params.toLowerCase()) != -1) {
			return Number(i)+Number(gameData.vehicleModelIDStart[gameID]);
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

function getVehicleNameFromModelID(modelID, gameID = game.game) {
	let modelIndex = modelID-gameData.vehicleModelIDStart[gameID];
	return gameData.vehicleNames[gameID][modelIndex];
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

function getSyncerFromID(syncerID) {
	let clients = getClients();
	return clients[syncerID];
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
	if(!isServer) {
		let peds = getPeds();
		for(let i in peds) {
			if(peds[i].name.toLowerCase().indexOf(params.toLowerCase()) != -1) {
				return peds[i];
			}
		}
	} else {
		let clients = getClients();
		if(isNaN(params)) {
			for(let i in clients) {
				if(clients[i].name.toLowerCase().indexOf(params.toLowerCase()) != -1) {
					return clients[i].player;
				}			
			}
		} else {
			let playerID = Number(params) || 0;
			if(typeof clients[playerID] != "undefined") {
				return clients[playerID].player;
			}			
		}
	}
	
	return false;
}


// ---------------------------------------------------------------------------

function getClientFromParams(params) {
	if(typeof server == "undefined") {
		let clients = getClients();
		for(let i in clients) {
			if(clients[i].name.toLowerCase().indexOf(params.toLowerCase()) != -1) {
				return clients[i];
			}
		}
	} else {
		let clients = getClients();
		if(isNaN(params)) {
			for(let i in clients) {
				if(clients[i].name.toLowerCase().indexOf(params.toLowerCase()) != -1) {
					return clients[i];
				}			
			}
		} else {
			let clientID = Number(params) || 0;
			if(typeof clients[clientID] != "undefined") {
				return clients[clientID];
			}			
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

function getArrayOfElementID(elements) {
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
	return serverData.clients[client.index];
}

// ---------------------------------------------------------------------------

function getClientCurrentSubAccount(client) {
	let subAccountId = getClientData(client).currentSubAccount;
	return getClientData(client).subAccounts[subAccountId];
}

// ---------------------------------------------------------------------------

function getClientSubAccountName(client) {
	return getClientCurrentSubAccount(client).firstName + " " + getClientCurrentSubAccount(client).lastName;
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
	if(serverConfig.blipSprites[server.game].policeStation != -1) {
		for(let i in serverData.policeStations[server.game]) {
			serverData.policeStations[server.game][i].blip = createBlip(serverConfig.blipSprites[server.game].policeStation, serverData.policeStations[server.game][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllFireStationBlips() {
	if(serverConfig.blipSprites[server.game].fireStation != -1) {
		for(let i in serverData.fireStations[server.game]) {
			serverData.fireStations[server.game][i].blip = createBlip(serverConfig.blipSprites[server.game].fireStation, serverData.fireStations[server.game][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllHospitalBlips() {
	if(serverConfig.blipSprites[server.game].hospital != -1) {
		for(let i in serverData.hospitals[server.game]) {
			serverData.hospitals[server.game][i].blip = createBlip(serverConfig.blipSprites[server.game].hospital, serverData.hospitals[server.game][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllAmmunationBlips() {
	if(serverConfig.blipSprites[server.game].ammunation != -1) {
		for(let i in serverData.ammunations[server.game]) {
			serverData.ammunations[server.game][i].blip = createBlip(serverConfig.blipSprites[server.game].ammunation, serverData.ammunations[server.game][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllPayAndSprayBlips() {
	if(serverConfig.blipSprites[server.game].payAndSpray != -1) {
		for(let i in serverData.payAndSprays[server.game]) {
			
			serverData.payAndSprays[server.game][i].blip = createBlip(serverConfig.blipSprites[server.game].payAndSpray, serverData.payAndSprays[server.game][i].position);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllFuelStationBlips() {
	if(serverConfig.blipSprites[server.game].fuelStation != -1) {
		for(let i in serverData.fuelStations[server.game]) {
			serverData.fuelStations[server.game][i].blip = createBlip(serverConfig.blipSprites[server.game].fuelStation, serverData.fuelStations[server.game][i].position, 2, serverConfig.colour.byName.burntOrange);
		}
	}
}

// ---------------------------------------------------------------------------

function sendAllPoliceStationBlips(client) {
	if(serverConfig.blipSprites[server.game].policeStation != -1) {
		let tempBlips = [];
		for(let i in serverData.policeStations[server.game]) {
			tempBlips.push([
				serverConfig.blipSprites[server.game].policeStation, 
				serverData.policeStations[server.game][i].position.x, 
				serverData.policeStations[server.game][i].position.y, 
				serverData.policeStations[server.game][i].position.z, 
				3, 
				serverConfig.colour.byName.policeBlue,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllFireStationBlips(client) {
	if(serverConfig.blipSprites[server.game].fireStation != -1) {
		let tempBlips = [];
		for(let i in serverData.fireStations[server.game]) {
			tempBlips.push([
				serverConfig.blipSprites[server.game].fireStation, 
				serverData.fireStations[server.game][i].position.x, 
				serverData.fireStations[server.game][i].position.y, 
				serverData.fireStations[server.game][i].position.z, 
				3, 
				serverConfig.colour.byName.firefighterRed,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllHospitalBlips(client) {
	if(serverConfig.blipSprites[server.game].hospital != -1) {
		let tempBlips = [];
		for(let i in serverData.hospitals[server.game]) {
			tempBlips.push([
				serverConfig.blipSprites[server.game].hospital, 
				serverData.hospitals[server.game][i].position.x, 
				serverData.hospitals[server.game][i].position.y, 
				serverData.hospitals[server.game][i].position.z, 
				3, 
				serverConfig.colour.byName.medicPink,
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllAmmunationBlips(client) {
	if(serverConfig.blipSprites[server.game].ammunation != -1) {
		let tempBlips = [];
		for(let i in serverData.ammunations[server.game]) {
			tempBlips.push([
				serverConfig.blipSprites[server.game].ammunation, 
				serverData.ammunations[server.game][i].position.x, 
				serverData.ammunations[server.game][i].position.y, 
				serverData.ammunations[server.game][i].position.z, 
				3, 
				0
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllPayAndSprayBlips(client) {
	if(serverConfig.blipSprites[server.game].payAndSpray != -1) {
		let tempBlips = [];
		for(let i in serverData.payAndSprays[server.game]) {
			tempBlips.push([
				serverConfig.blipSprites[server.game].payAndSpray, 
				serverData.payAndSprays[server.game][i].position.x, 
				serverData.payAndSprays[server.game][i].position.y, 
				serverData.payAndSprays[server.game][i].position.z, 
				3, 
				0
			]);
		}
		triggerNetworkEvent("ag.blips", client, tempBlips);
	}
}

// ---------------------------------------------------------------------------

function sendAllFuelStationBlips(client) {
	if(serverConfig.blipSprites[server.game].fuelStation != -1) {
		for(let i in serverData.fuelStations[server.game]) {
			tempBlips.push([
				serverConfig.blipSprites[server.game].fuelStation, 
				serverData.fuelStations[server.game][i].position.x, 
				serverData.fuelStations[server.game][i].position.y, 
				serverData.fuelStations[server.game][i].position.z, 
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

function saveAllServerDataToDatabase() {
	saveAllClientsToDatabase();
	saveAllVehiclesToDatabase();;
	saveAllHousesToDatabase();
	saveAllBusinessesToDatabase();
	saveAllClansToDatabase();
}

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