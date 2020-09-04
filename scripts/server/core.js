// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2019 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: core.js
// DESC: Provides core data structures, function, and operations
// TYPE: Server (JavaScript)
// ===========================================================================

let serverId = server.game;

// ----------------------------------------------------------------------------

let serverData = {
	saveDataIntervalTimer: false,
	staffFlagKeys: [
		"none", 
		"basicModeration", 
		"manageHouses", 
		"manageVehicles", 
		"manageBusinesses", 
		"manageFactions", 
		"manageClans", 
		"manageServer", 
		"developer"
	],
	moderationFlagKeys: [
		"none", 
		"muted", 
		"frozen", 
		"hackerBox",
		"jobBanned",
		"ammuBanned",
		"policeBanned",
		"fireBanned",
		"gunBanned",
	],
	factionFlagKeys: [
		"none", 
		"police", 
		"medical", 
		"fire", 
		"government"
	],
	clanFlagKeys: [
		"none", 
		"illegal", 
		"legal", 
		"mafia", 
		"streetGang", 
		"weapons", 
		"drugs", 
		"humanTrafficking", 
		"vigilante", 
		"hitContracts"
	],
	clanPermissionFlagKeys: [
		"none", 
		"inviteMember", 
		"removeMember", 
		"memberRank", 
		"memberFlags", 
		"memberTag", 
		"memberTitle", 
		"rankFlags", 
		"rankTag", 
		"rankTitle",
		"clanTag",
		"clanName", 
		"owner"
	],
	accountSettingsFlagKeys: [
		"None", 
		"useWhiteList", 
		"useBlackList", 
		"twoStepAuth", 
		"authAttemptAlert"
	],
	subAccountSettingsFlagKeys: [],	
	staffFlags: {},
	moderationFlags: {},
	factionFlags: {},
	clanFlags: {},
	accountSettingsFlags: {},
	subAccountSettingsFlags: {},
	vehicles: [],
	clients: new Array(128),
	businesses: [],
	houses: [],
	families: [],
	factions: [],
	translation: {
		translationBaseURL: "http://api.mymemory.translated.net/get?de=example@example.com&q={0}&langpair={1}|{2}",
		languages: [
			["Abkhazian", "AB"], 
			["Afar", "AA"], 
			["Afrikaans", "AF"], 
			["Albanian", "SQ"], 
			["Amharic", "AM"], 
			["Arabic", "AR"], 
			["Armenian", "HY"], 
			["Assamese", "AS"], 
			["Aymara", "AY"],
			["Azerbaijani", "AZ"], 
			["Bashkir", "BA"], 
			["Basque", "EU"], 
			["Bengali, Bangla", "BN"], 
			["Bhutani", "DZ"], 
			["Bihari", "BH"], 
			["Bislama", "BI"], 
			["Breton", "BR"], 
			["Bulgarian", "BG"],
			["Burmese", "MY"], 
			["Byelorussian", "BE"],
			["Cambodian", "KM"], 
			["Catalan", "CA"], 
			["Chinese", "ZH"],
			["Corsican", "CO"],
			["Croatian", "HR"],
			["Czech", "CS"],
			["Danish", "DA"],
			["Dutch", "NL"],
			["English", "EN"],
			["Esperanto", "EO"],
			["Estonian", "ET"],
			["Faeroese", "FO"],
			["Fiji", "FJ"],
			["Finnish", "FI"],
			["French", "FR"],
			["Frisian", "FY"],
			["Gaelic (Scots Gaelic)", "GD"],
			["Galician", "GL"],
			["Georgian", "KA"],
			["German", "DE"],
			["Greek", "EL"],
			["Greenlandic", "KL"],
			["Guarani", "GN"],
			["Gujarati", "GU"],
			["Hausa", "HA"],
			["Hebrew", "IW"],
			["Hindi", "HI"],
			["Hungarian", "HU"],
			["Icelandic", "IS"],
			["Indonesian", "IN"],
			["Interlingua", "IA"],
			["Interlingue", "IE"],
			["Inupiak", "IK"],
			["Irish", "GA"],
			["Italian", "IT"],
			["Japanese", "JA"],
			["Javanese", "JW"],
			["Kannada", "KN"],
			["Kashmiri", "KS"],
			["Kazakh", "KK"],
			["Kinyarwanda", "RW"],
			["Kirghiz", "KY"],
			["Kirundi", "RN"],
			["Korean", "KO"],
			["Kurdish", "KU"],
			["Laothian", "LO"],
			["Latin", "LA"],
			["Latvian, Lettish", "LV"],
			["Lingala", "LN"],
			["Lithuanian", "LT"],
			["Macedonian", "MK"],
			["Malagasy", "MG"],
			["Malay", "MS"],
			["Malayalam", "ML"],
			["Maltese", "MT"],
			["Maori", "MI"],
			["Marathi", "MR"],
			["Moldavian", "MO"],
			["Mongolian", "MN"],
			["Nauru", "NA"],
			["Nepali", "NE"],
			["Norwegian", "NO"],
			["Occitan", "OC"],
			["Oriya", "OR"],
			["Oromo, Afan", "OM"],
			["Pashto, Pushto", "PS"],
			["Persian", "FA"],
			["Polish", "PL"],
			["Portuguese", "PT"],
			["Punjabi", "PA"],
			["Quechua", "QU"],
			["Rhaeto-Romance", "RM"],
			["Romanian", "RO"],
			["Russian", "RU"],
			["Samoan", "SM"],
			["Sangro", "SG"],
			["Sanskrit", "SA"],
			["Serbian", "SR"],
			["Serbo-Croatian", "SH"],
			["Sesotho", "ST"],
			["Setswana", "TN"],
			["Shona", "SN"],
			["Sindhi", "SD"],
			["Singhalese", "SI"],
			["Siswati", "SS"],
			["Slovak", "SK"],
			["Slovenian", "SL"],
			["Somali", "SO"],
			["Spanish", "ES"],
			["Sudanese", "SU"],
			["Swahili", "SW"],
			["Swedish", "SV"],
			["Tagalog", "TL"],
			["Tajik", "TG"],
			["Tamil", "TA"],
			["Tatar", "TT"],
			["Tegulu", "TE"],
			["Thai", "TH"],
			["Tibetan", "BO"],
			["Tigrinya", "TI"],
			["Tonga", "TO"],
			["Tsonga", "TS"],
			["Turkish", "TR"],
			["Turkmen", "TK"],
			["Twi", "TW"],
			["Ukrainian", "UK"],
			["Urdu", "UR"],
			["Uzbek", "UZ"],
			["Vietnamese", "VI"],
			["Volapuk", "VO"],
			["Welsh", "CY"],
			["Wolof", "WO"],
			["Xhosa", "XH"],
			["Yiddish", "JI"],
			["Yoruba", "YO"],
			["Zulu", "ZU"]
		],
		cache: null,
	},
	commands: {},
	policeStations: [
		false,
		[	// GTA 3
			{ 
				position: new Vec3(1143.875, -675.1875, 14.97),
				heading: 1.5,
				blip: false,
				name: "Portland",
			}, 
			{ 
				position: new Vec3(340.25, -1123.375, 25.98),
				heading: 3.14,
				blip: false,
				name: "Staunton Island",
			},
			{ 
				position: new Vec3(-1253.0, -138.1875, 58.75),
				heading: 1.5,
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]		
	],
	fireStations: [
		false,
		[	// GTA 3
			{ 
				position: new Vec3(1103.70, -52.45, 7.49),
				heading: 1.5,
				blip: false,
				name: "Portland",
			}, 
			{ 
				position: new Vec3(-78.48, -436.80, 16.17),
				heading: 3.14,
				blip: false,
				name: "Staunton Island",
			},
			{ 
				position: new Vec3(-1202.10, -14.67, 53.20),
				heading: 1.5,
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]					
	],
	hospitals: [
		false,
		[	// GTA 3
			{ 
				position: new Vec3(1144.25, -596.875, 14.97),
				heading: 1.5,
				blip: false,
				name: "Portland",
			}, 
			{ 
				position: new Vec3(183.5, -17.75, 16.21),
				heading: 3.14,
				blip: false,
				name: "Staunton Island",
			},
			{ 
				position: new Vec3(-1259.5, -44.5, 58.89),
				heading: 1.5,
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]				
	],
	payAndSprays: [
		false,
		[	// GTA 3
			{ 
				position: new Vec3(925.4, -360.3, 10.83),
				blip: false,
				name: "Portland",
			}, 
			{ 
				position: new Vec3(381.8, -493.8, 25.95),
				blip: false,
				name: "Staunton Island",
			},
			{ 
				position: new Vec3(-1142.4, 35.01, 58.61),
				blip: false,
				name: "Shoreside Vale",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	
	ammunations: [
		false,
		[	// GTA 3
			{ 
				position: new Vec3(1068.3, -400.9, 15.24),
				blip: false,
				name: "Portland",
			}, 
			{ 
				position: new Vec3(348.2, -717.9, 26.43),
				blip: false,
				name: "Staunton Island",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	fuelStations: [
		false,
		[	// GTA 3
			
			{ 
				position: new Vec3(1161.9, -76.73, 7.27),
				blip: false,
				name: "Portland",
			},
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	jobs: [
		false,
		[	// GTA 3	
			{   
				name: "Police Officer", 
				position: new Vec3(1143.87, -675.18, 14.97), 
				pickup: false, 
				pickupModel: 1383, 
				blip: false, 
				jobType: AG_JOB_POLICE, 
				jobSkin: 1, 
				jobColour: serverConfig.colour.byName.policeBlue, 
				enabled: true 
			}, 
			{   
				name: "Paramedic", 
				position: new Vec3(1144.25, -596.87, 14.97), 
				pickup: false, 
				pickupModel: 1362, 
				blip: false, 
				jobType: AG_JOB_MEDICAL, 
				jobSkin: 5, 
				jobColour: serverConfig.colour.byName.medicPink, 
				enabled: true 
			}, 
			{   
				name: "Firefighter", 
				position: new Vec3(1103.70, -52.45, 7.49), 
				pickup: false, 
				pickupModel: 1364, 
				blip: false, 
				jobType: AG_JOB_FIRE, 
				jobSkin: 6, 
				jobColour: serverConfig.colour.byName.firefighterRed, 
				enabled: true 
			}, 
			{   
				name: "Trash Collector",
				position: new Vec3(1121.8, 27.8, 1.99),
				pickup: false, 
				pickupModel: 1351, 
				blip: false, 
				jobType: AG_JOB_GARBAGE, 
				jobSkin: 53, 
				jobColour: 2, 
				enabled: true 
			}, 
			{   
				name: "Trash Collector",
				position: new Vec3(-66.83, -932.2, 16.47),
				pickup: false, 
				pickupModel: 1351, 
				blip: false, 
				jobType: AG_JOB_GARBAGE, 
				jobSkin: 53, 
				jobColour: 2, 
				enabled: true 
			}, 
			{   
				name: "Taxi Driver",
				position: new Vec3(1229.2, -740.1, 15.17),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_TAXI, 
				jobSkin: 8, 
				jobColour: 3, 
				enabled: true 
			}, 
			{   
				name: "Bus Driver",
				position: new Vec3(1310.20, -1016.30, 14.88), 
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_BUS, 
				jobSkin: 121, 
				jobColour: 3, 
				enabled: true 
			},   
			{   
				name: "Police Officer",
				position: new Vec3(340.25, -1123.37, 25.98),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_POLICE, 
				jobSkin: 1, 
				jobColour: serverConfig.colour.byName.policeBlue, 
				enabled: true 
			}, 
			{   
				name: "Police Officer",
				position: new Vec3(-1253.0, -138.18, 58.75),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_POLICE, 
				jobSkin: 1, 
				jobColour: serverConfig.colour.byName.policeBlue, 
				enabled: true 
			}, 
			{   
				name: "Paramedic",
				position: new Vec3(183.5, -17.75, 16.21),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_MEDICAL, 
				jobSkin: 5, 
				jobColour: serverConfig.colour.byName.medicPink, 
				enabled: true  
			}, 
			{   
				name: "Paramedic",
				position: new Vec3(-1259.5, -44.5, 58.89),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_MEDICAL, 
				jobSkin: 5, 
				jobColour: serverConfig.colour.byName.medicPink, 
				enabled: true  
			} ,
			{   
				name: "Firefighter",
				position: new Vec3(-78.48, -436.80, 16.17), 
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_FIRE, 
				jobSkin: 6, 
				jobColour: serverConfig.colour.byName.firefighterRed, 
				enabled: true  
			}, 
			{   
				name: "Firefighter",
				position: new Vec3(-1202.10, -14.67, 53.20),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_FIRE, 
				jobSkin: 6, 
				jobColour: serverConfig.colour.byName.firefighterRed, 
				enabled: true  
			},        
			{   
				name: "Taxi Driver",
				position: new Vec3(1229.2, -740.1, 15.17),
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_TAXI, 
				jobSkin: 8, 
				jobColour: 3, 
				enabled: true 
			},         
			{   
				name: "Bus Driver",
				position: new Vec3(-57.1661, -334.266, 16.9324), 
				pickup: false, 
				pickupModel: 1361, 
				blip: false, 
				jobType: AG_JOB_BUS, 
				jobSkin: 121, 
				jobColour: 3, 
				enabled: true 
			},   
		],
		[	// GTA VC

		],
		[	// GTA SA

		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]

        //{   name: "Postal Worker"         , position: Vector ( )                                       , pickup: false, pickupModel: 1361, blip: false, jobType: 7 }, 
        //{   name: "Delivery Worker"       , position: Vector ( )                                       , pickup: false, pickupModel: 1361, blip: false, jobType: 8 }, 
        //{   name: "Mechanic"              , position: Vector ( )                                       , pickup: false, pickupModel: 1361, blip: false, jobType: 9 }, 		
	],
	policeJobSkins: [
		false,
		[	// GTA III
			1, 92,
		],
		[	// GTA VC
			1,
		],
		[	// GTA SA
			280, 281, 282, 283, 284, 285, 28, 288, 
		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	medicalJobSkins: [
		false,
		[	// GTA III
			5, 72, 73
		],
		[	// GTA VC
			5,
		],
		[	// GTA SA
			274, 275, 276
		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	fireJobSkins: [
		false,
		[	// GTA III
			6
		],
		[	// GTA VC
			6,
		],
		[	// GTA SA
			277, 278, 279
		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],	
	taxiJobSkins: [
		false,
		[	// GTA III
			8,
		],
		[	// GTA VC
			8,
		],
		[	// GTA SA
			7, 142
		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	busJobSkins: [
		false,
		[	// GTA III
			8,
		],
		[	// GTA VC
			8,
		],
		[	// GTA SA
			7, 142
		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],
	garbageJobSkins: [
		false,
		[	// GTA III
			53, 54,
		],
		[	// GTA VC
			53, 54,
		],
		[	// GTA SA
			16,
		],
		[	// GTA UG
			
		],
		[	// GTA IV

		]
	],	
};

// ----------------------------------------------------------------------------

function initServerData() {
	// Pre-allocate translation cache language slots
	global.serverData.translation.cache = new Array(global.serverData.translation.languages.length);
	let translationCacheFrom = new Array(global.serverData.translation.languages.length);
	translationCacheFrom.fill([]);
	global.serverData.translation.cache.fill(translationCacheFrom);
}

// ----------------------------------------------------------------------------

function getServerId() {
	return serverId;
}

// ----------------------------------------------------------------------------