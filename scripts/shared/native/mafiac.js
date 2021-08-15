// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: mafiac.js
// DESC: Provides util funcs for Mafia Connected
// TYPE: Shared (JavaScript)
// ===========================================================================

function getMultiplayerMod() {
	return VRR_MPMOD_MAFIAC;
}

// ===========================================================================

function getGame() {
	if(isServerScript()) {
		return server.game;
	} else {
		return mafia.game;
	}
}

// ===========================================================================

function doesGameHaveSnow(gameId) {
	return false;
}

// ===========================================================================

let allowedSkins = [
	[],
	[ 	// Mafia 1
        ["Tommy", "Tommy", ""],
        ["TommyBOXER", "TommyBOXER", ""],
        ["TommyCOAT", "TommyCOAT", ""],
        ["TommyCOATHAT", "TommyCOATHAT", ""],
        ["TommyDELNIK", "TommyDELNIK", ""],
        ["TommyDELNIKHIGH", "TommyDELNIKHIGH", ""],
        ["TommyFREERIDER", "TommyFREERIDER", ""],
        ["TommyGUN", "TommyGUN", ""],
        ["TommyHAT", "TommyHAT", ""],
        ["TommyHIGH", "TommyHIGH", ""],
        //["TommyHIGHBLOOD", "TommyHIGHBLOOD", ""],
        ["TommyHighCOATHAT", "TommyHighCOATHAT", ""],
        ["TommyHighHAT", "TommyHighHAT", ""],
        ["TommyNAHAC", "TommyNAHAC", ""],
        ["TommyOLD", "TommyOLD", ""],
        //["TommyOLDBLOOD", "TommyOLDBLOOD", ""],
        ["TommyPYTEL", "TommyPYTEL", ""],
        ["TommyRACER", "TommyRACER", ""],
        ["TommyRACER2", "TommyRACER2", ""],
        ["TommyRUKAV", "TommyRUKAV", ""],
        ["TommySAILOR", "TommySAILOR", ""],
        ["TommyTAXIDRIVER", "TommyTAXIDRIVER", ""],
        ["TommyTAXIdriverHIGH", "TommyTAXIdriverHIGH", ""],
        ["AsisPZ1", "AsisPZ1", ""],
        ["Barman01", "Barman01", ""],
        ["Bclerk01", "Bclerk01", ""],
        ["Bclerk02", "Bclerk02", ""],
        ["Bguard01", "Bguard01", ""],
        ["Bguard01M", "Bguard01M", ""],
        ["Bguard02", "Bguard02", ""],
        ["Bguard03", "Bguard03", ""],
        ["Bguard03M", "Bguard03M", ""],
        ["Biff", "Biff", ""],
        ["BigDig", "BigDig", ""],
        ["BnkO01", "BnkO01", ""],
        ["BnkO02", "BnkO02", ""],
        ["BnkO03", "BnkO03", ""],
        ["BobAut01", "BobAut01", ""],
        ["Bookmaker01", "Bookmaker01", ""],
        ["Bookmaker02", "Bookmaker02", ""],
        ["Boxer01", "Boxer01", ""],
        ["Boxer02", "Boxer02", ""],
        ["Boxer03", "Boxer03", ""],
        ["Boxer04", "Boxer04", ""],
        ["Carlo", "Carlo", ""],
        ["China1", "China1", ""],
        ["Chulig1", "Chulig1", ""],
        ["Chulig1b", "Chulig1b", ""],
        ["David", "David", ""],
        ["Delnik01", "Delnik01", ""],
        ["Delnik02", "Delnik02", ""],
        ["Delnik03", "Delnik03", ""],
        ["Detektiv01", "Detektiv01", ""],
        ["Detektiv02", "Detektiv02", ""],
        ["Detektiv03", "Detektiv03", ""],
        ["Enemy01+", "Enemy01+", ""],
        ["Enemy01", "Enemy01", ""],
        ["Enemy02+", "Enemy02+", ""],
        ["Enemy02", "Enemy02", ""],
        ["Enemy03+", "Enemy03+", ""],
        ["Enemy03", "Enemy03", ""],
        ["Enemy04", "Enemy04", ""],
        //["Enemy04BLOOD", "Enemy04BLOOD", ""],
        ["Enemy04K", "Enemy04K", ""],
        ["Enemy05", "Enemy05", ""],
        ["Enemy06+", "Enemy06+", ""],
        ["Enemy06", "Enemy06", ""],
        ["Enemy07+", "Enemy07+", ""],
        ["Enemy07", "Enemy07", ""],
        ["Enemy08+", "Enemy08+", ""],
        ["Enemy08", "Enemy08", ""],
        ["Enemy08K", "Enemy08K", ""],
        ["Enemy09+", "Enemy09+", ""],
        ["Enemy09", "Enemy09", ""],
        ["Enemy09K", "Enemy09K", ""],
        ["Enemy10+", "Enemy10+", ""],
        ["Enemy10", "Enemy10", ""],
        ["Enemy10K", "Enemy10K", ""],
        ["Enemy11K", "Enemy11K", ""],
        ["Enemy12", "Enemy12", ""],
        ["Enemy12K", "Enemy12K", ""],
        ["Enemy13C", "Enemy13C", ""],
        ["Enemy91", "Enemy91", ""],
        ["Enemy92", "Enemy92", ""],
        ["FMVENemy11K", "FMVENemy11K", ""],
        ["FREEgang01", "FREEgang01", ""],
        ["FREEgang02", "FREEgang02", ""],
        ["FrankHIGH", "FrankHIGH", ""],
        ["Friend1", "Friend1", ""],
        ["Friend2", "Friend2", ""],
        ["Gangster01", "Gangster01", ""],
        ["Gangster02", "Gangster02", ""],
        ["Gangster03", "Gangster03", ""],
        ["Gangster04", "Gangster04", ""],
        ["Gangster05", "Gangster05", ""],
        ["GodzMan1", "GodzMan1", ""],
        ["Guard01", "Guard01", ""],
        ["Guard02", "Guard02", ""],
        ["Hasic01", "Hasic01", ""],
        ["HighCivil", "HighCivil", ""],
        //["HighCivilBLOOD", "HighCivilBLOOD", ""],
        ["Homeless01", "Homeless01", ""],
        ["Hoolig01", "Hoolig01", ""],
        ["Hoolig02", "Hoolig02", ""],
        ["Hoolig03", "Hoolig03", ""],
        ["Hoolig04", "Hoolig04", ""],
        ["Hoolig05", "Hoolig05", ""],
        ["Hoolig06", "Hoolig06", ""],
        ["I04Delnik01+", "I04Delnik01+", ""],
        ["I04Delnik01", "I04Delnik01", ""],
        ["Joe", "Joe", ""],
        ["Kasar", "Kasar", ""],
        ["Knez", "Knez", ""],
        ["LifeG01", "LifeG01", ""],
        ["Lucas", "Lucas", ""],
        ["Luigi", "Luigi", ""],
        ["Malticka1", "Malticka1", ""],
        ["MorelloHIGH", "MorelloHIGH", ""],
        ["MorelloLOW", "MorelloLOW", ""],
        ["NormanHIGH", "NormanHIGH", ""],
        ["Organizator01", "Organizator01", ""],
        ["Paulie", "Paulie", ""],
        ["PaulieCOATHAT", "PaulieCOATHAT", ""],
        ["PaulieCTHIGH", "PaulieCTHIGH", ""],
        //["PaulieCorpse", "PaulieCorpse", ""],
        ["PaulieHIGH", "PaulieHIGH", ""],
        ["Pepe", "Pepe", ""],
        //["PoliceMan01", "PoliceMan01", ""],
        //["PoliceMan02", "PoliceMan02", ""],
        ["Politik", "Politik", ""],
        //["PortGuard01", "PortGuard01", ""],
        //["PortGuard02", "PortGuard02", ""],
        ["ProdZ1", "ProdZ1", ""],
        ["Prokur", "Prokur", ""],
        ["Radni01", "Radni01", ""],
        ["Radni02", "Radni02", ""],
        ["Ralph", "Ralph", ""],
        ["RalphHIGH", "RalphHIGH", ""],
        ["ReditelB", "ReditelB", ""],
        ["ReditelH", "ReditelH", ""],
        ["RidicNakladaku", "RidicNakladaku", ""],
        ["SalMan01K", "SalMan01K", ""],
        ["SalMan02K", "SalMan02K", ""],
        ["SalMan03", "SalMan03", ""],
        ["SalMan03K", "SalMan03K", ""],
        ["SalMan04", "SalMan04", ""],
        ["SalMan05", "SalMan05", ""],
        ["SalMan05K", "SalMan05K", ""],
        ["Salieri2", "Salieri2", ""],
        ["SalieriHIGH", "SalieriHIGH", ""],
        ["SalieriHIGH2", "SalieriHIGH2", ""],
        ["SalieriLOW", "SalieriLOW", ""],
        ["Sam", "Sam", ""],
        ["SamCOATHAT", "SamCOATHAT", ""],
        ["SamHIGH", "SamHIGH", ""],
        //["SamHIGHblood1", "SamHIGHblood1", ""],
        //["SamHIGHblood2", "SamHIGHblood2", ""],
        //["SamHIGHblood3", "SamHIGHblood3", ""],
        //["SamHIGHblood4", "SamHIGHblood4", ""],
        //["Samblood1", "Samblood1", ""],
        ["Sergio", "Sergio", ""],
        //["SergioBLOOD", "SergioBLOOD", ""],
        ["SynRad1", "SynRad1", ""],
        //["SynRad1BLOOD", "SynRad1BLOOD", ""],
        //["SynRad1DEAD", "SynRad1DEAD", ""],
        ["Tony", "Tony", ""],
        ["VincenzoHIGH", "VincenzoHIGH", ""],
        ["VincenzoLOW", "VincenzoLOW", ""],
        ["Vrabec", "Vrabec", ""],
        ["Vratny1", "Vratny1", ""],
        ["Vypravci", "Vypravci", ""],
        ["Vypravci2", "Vypravci2", ""],
        ["WillG1", "WillG1", ""],
        ["WillG2", "WillG2", ""],
        ["WillMan01", "WillMan01", ""],
        ["WillMan02", "WillMan02", ""],
        ["Zavod1", "Zavod1", ""],
        ["Zavod2", "Zavod2", ""],
        ["Zavod3", "Zavod3", ""],
        ["ZavodFMV1", "ZavodFMV1", ""],
        ["ZavodFMV2", "ZavodFMV2", ""],
        ["civil02", "civil02", ""],
        ["civil03", "civil03", ""],
        ["civil04", "civil04", ""],
        ["civil05", "civil05", ""],
        ["civil06", "civil06", ""],
        ["civil11", "civil11", ""],
        ["civil11M", "civil11M", ""],
        ["civil12", "civil12", ""],
        ["civil13", "civil13", ""],
        ["civil14", "civil14", ""],
        ["civil15", "civil15", ""],
        ["civil16", "civil16", ""],
        ["civil16M", "civil16M", ""],
        ["civil17", "civil17", ""],
        ["civil18", "civil18", ""],
        ["civil19", "civil19", ""],
        ["civil19M", "civil19M", ""],
        ["civil21", "civil21", ""],
        ["civil21N", "civil21N", ""],
        ["civil22", "civil22", ""],
        ["civil31", "civil31", ""],
        ["civil32", "civil32", ""],
        ["civil33", "civil33", ""],
        ["civil34", "civil34", ""],
        ["civil35", "civil35", ""],
        ["civil36", "civil36", ""],
        ["civil36M", "civil36M", ""],
        ["civil37", "civil37", ""],
        ["civil38", "civil38", ""],
        ["civil39", "civil39", ""],
        ["civil40", "civil40", ""],
        ["civil41", "civil41", ""],
        ["civil42", "civil42", ""],
        ["civil42M", "civil42M", ""],
        ["civil43", "civil43", ""],
        ["civil44", "civil44", ""],
        ["civil51", "civil51", ""],
        ["civil51M", "civil51M", ""],
        ["civil52", "civil52", ""],
        ["civil53", "civil53", ""],
        ["civil54", "civil54", ""],
        ["civil54M", "civil54M", ""],
        ["civil55", "civil55", ""],
        ["civil55M", "civil55M", ""],
        ["civil56", "civil56", ""],
        ["civil56M", "civil56M", ""],
        ["civil57", "civil57", ""],
        ["civil57M", "civil57M", ""],
        ["civil60", "civil60", ""],
        ["civil61", "civil61", ""],
        ["civil62", "civil62", ""],
        ["civil63", "civil63", ""],
        ["civil70", "civil70", ""],
        ["civil70M", "civil70M", ""],
        ["civil71", "civil71", ""],
        ["civil72", "civil72", ""],
        ["frank", "frank", ""],
        ["ohorelec01", "ohorelec01", ""],
        ["pianist1", "pianist1", ""],
        ["pol01", "pol01", ""],
        ["pol02", "pol02", ""],
        ["pol03", "pol03", ""],
        ["pol11", "pol11", ""],
        ["pol12", "pol12", ""],
        ["pol13", "pol13", ""],
        ["polim62", "polim62", ""],
        ["pumpar01", "pumpar01", ""],
        ["recep", "recep", ""],
        //["sailor01", "sailor01", ""],
        //["sailor01M", "sailor01M", ""],
        //["sailor02", "sailor02", ""],
        //["sailor02M", "sailor02M", ""],
        //["sailor03", "sailor03", ""],
        ["waiter01", "waiter01", ""],
        ["waiter01M", "waiter01M", ""],
        ["waiter02", "waiter02", ""],
        ["waiter02M", "waiter02M", ""],
        ["waiter03", "waiter03", ""],
        ["Alice1", "Alice1", ""],
        ["Berta", "Berta", ""],
        ["Bitch01", "Bitch01", ""],
        ["Bitch02", "Bitch02", ""],
        ["Bitch02Mask", "Bitch02Mask", ""],
        ["Bitch03M", "Bitch03M", ""],
        ["CarlZen1", "CarlZen1", ""],
        ["Czena01", "Czena01", ""],
        ["Czena02", "Czena02", ""],
        ["Czena03", "Czena03", ""],
        ["Czena04", "Czena04", ""],
        ["Czena05", "Czena05", ""],
        ["Czena06", "Czena06", ""],
        ["Czena07", "Czena07", ""],
        ["Czena07M", "Czena07M", ""],
        ["Czena08", "Czena08", ""],
        ["Czena09", "Czena09", ""],
        ["Czena09M", "Czena09M", ""],
        ["Czena10", "Czena10", ""],
        ["Czena10M", "Czena10M", ""],
        ["Czena11", "Czena11", ""],
        ["Czena11M", "Czena11M", ""],
        ["Czena12", "Czena12", ""],
        ["Czena13", "Czena13", ""],
        ["FMVCzena03", "FMVCzena03", ""],
        ["FMVCzena04", "FMVCzena04", ""],
        ["March1", "March1", ""],
        ["Michelle", "Michelle", ""],
        ["MichelleLOW", "MichelleLOW", ""],
        ["Milenka1", "Milenka1", ""],
        ["Sarah1", "Sarah1", ""],
        ["Sarah1Obl", "Sarah1Obl", ""],
        ["Sarah2", "Sarah2", ""],
        ["Sarah2HIGH", "Sarah2HIGH", ""],
        ["Sarah2HIGHnaha", "Sarah2HIGHnaha", ""],
        ["Sarah2LOW", "Sarah2LOW", ""],
        ["Serv01", "Serv01", ""],
    ]
];

// ===========================================================================

function isTimeSupported() {
	return false;
}

// ===========================================================================

function isSnowSupported() {
	return false;
}

// ===========================================================================

function isWeatherSupported() {
	return false;
}

// ===========================================================================

function isRemovingWorldObjectsSupported() {
    return false;
}

// ===========================================================================

function arePickupsSupported() {
    return false;
}

// ===========================================================================

function areBlipsSupported() {
    return false;
}

// ===========================================================================

function isFadeCameraSupported() {
	return false;
}

// ===========================================================================

function isCustomCameraSupported() {
	return false;
}

// ===========================================================================

function areWorldLabelsSupported() {
    return false;
}

// ===========================================================================