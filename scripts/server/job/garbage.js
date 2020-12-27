// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: garbage.js
// DESC: Provides garbage collector job functions and usage
// TYPE: Job (JavaScript)
// ===========================================================================

let garbageRoutes = [
    false,
    [ // GTA 3
        [ // PORTLAND ISLAND (0)
            { // ROUTE 0
                name: "Portland #1", 
                island: 0, 
                positions: [
                    toVector3(1169.8, -45.54, 10.4),
                    toVector3(928, -59.1, 8.61),
                    toVector3(935.4, -262.45, 5.52),
                    toVector3(935.4, -262.45, 5.52),
                    toVector3(1042.5, -375.9, 15.4),
                    toVector3(987, -450.5, 15.39),
                    toVector3(871.3, -277.07, 5.4),
                    toVector3(1119.4, -766.7, 15.4),
                    toVector3(1082.3, -990.8, 15.4),
                    toVector3(1166.9, -1046.8, 15.41),
                    toVector3(1310.1, -980.4, 15.46),
                    toVector3(1129.5, -645.3, 15.4),
                    toVector3(1128.9, -446.1, 20.41),
                    toVector3(1226.5, -52.41, 10.42)      ,
                ],
            }, 
        ],
        [ // STAUNTON ISLAND (1)
            { // ROUTE 0
                name: "Staunton #1", 
                island: 1, 
                positions: [
                    toVector3(49.85, -1539.9, 26.6), 
                    toVector3(49.71, -1458.1, 26.6), 
                    toVector3(170.78, -1403.8, 26.59), 
                    toVector3(183.48, -1485.9, 26.6), 
                    toVector3(320.43, -1452.4, 26.6), 
                    toVector3(310.13, -1311.8, 26.6), 
                    toVector3(134.76, -1097.7, 26.6), 
                    toVector3(55.63, -1058.6, 26.6), 
                    toVector3(-0.02, -790.9, 26.64),
                ],
            },
        ]
    ],

    // GTA VC
    [

    ],

    // GTA SA
    [

    ],

    false,

    // GTA IV
    [

    ], 
];

// ---------------------------------------------------------------------------

function getRandomGarbageRoute(island) {
    if(garbageRoutes[getServerGame()][island].length == 1) {
        return 0;
    }
    return getRandom(0, garbageRoutes[getServerGame()][island].length-1);
}

// ---------------------------------------------------------------------------

function getNextStopOnGarbageRoute(island, garbageRoute, garbageRouteStop) {
    if(!isLastStopOnGarbageRoute(island, garbageRoute, garbageRouteStop)) {
        return garbageRouteStop+1;
    } else {
        return garbageRoutes[getServerGame()][island][garbageRoute].positions.length-1;
    }  
}

// ---------------------------------------------------------------------------

function isLastStopOnGarbageRoute(island, garbageRoute, garbageRouteStop) {
    if(garbageRouteStop == garbageRoutes[getServerGame()][island][garbageRoute].positions.length-1) {
        return true;
    }
    return false;
}

// ---------------------------------------------------------------------------

function freezeGarbageForStop(client) {
    getVehicleData(getPlayerVehicle(client)).engine = false;
	getPlayerVehicle(client).engine = false;
}

// ---------------------------------------------------------------------------

function unFreezeGarbageForStop(client) {
    getVehicleData(getPlayerVehicle(client)).engine = true;
	getPlayerVehicle(client).engine = true;
}

// ---------------------------------------------------------------------------

function showNextGarbageStop(client) {
    getPlayerData(client).garbageRouteStop = getNextStopOnGarbageRoute(getPlayerData(client).garbageRouteStop, getPlayerData(client).garbageRoute, getPlayerData(client).garbageRouteStop);
    showCurrentGarbageStop(client);
}

// ---------------------------------------------------------------------------

function showCurrentGarbageStop(client) {
    triggerNetworkEvent("ag.showGarbageStop", client, getGarbageRouteStopPosition(getPlayerIsland(client), getPlayerData(client).garbageRoute, getPlayerData(client).garbageRouteStop), getColourByName("garbageDriverGreen"));
}

// ---------------------------------------------------------------------------

function arrivedAtGarbageStop(client) {
    if(isLastStopOnGarbageRoute(getPlayerData(client).garbageRouteIsland, getPlayerData(client).garbageRoute, getPlayerData(client).garbageRouteStop)) {
        respawnVehicle(getPlayerData(client).garbageRouteVehicle);
        messageClientNormal(client, `You finished the ${getGarbageRouteData(getPlayerData(client).garbageRouteIsland, getPlayerData(client).garbageRoute).name} garbage route! Your trashmaster has been returned to the garbage depot.`, getColourByName("yellow"));
		getPlayerData(client).garbageRouteVehicle = false;
		getPlayerData(client).garbageRoute = 0;
		getPlayerData(client).garbageRouteStop = 0;
		getPlayerData(client).garbageRouteIsland = 0;
        return false;
    }

    showGameMessage(client, "⌛ Please wait a moment while the garbage is loaded into your truck.", getColourByName("mediumGrey"), 3500);
    freezeGarbageForStop(client);
    getPlayerData(client).garbageRouteStop = getNextStopOnGarbageRoute(getPlayerData(client).garbageRouteIsland, getPlayerData(client).garbageRoute, getPlayerData(client).garbageRouteStop);
    setTimeout(function() {
        unFreezeGarbageForStop(client);
        showCurrentGarbageStop(client);
        showGameMessage(client, "Proceed to the next stop (grey checkpoint)", getColourByName("mediumGrey"), 3500);
    }, 5000);
}

// ---------------------------------------------------------------------------

function getGarbageRouteStopPosition(island, garbageRoute, garbageRouteStop) {
    return garbageRoutes[getServerGame()][island][garbageRoute].positions[garbageRouteStop];
}

// ---------------------------------------------------------------------------

function getGarbageRouteData(island, garbageRoute) {
    return garbageRoutes[getServerGame()][island][garbageRoute];
}

// ---------------------------------------------------------------------------