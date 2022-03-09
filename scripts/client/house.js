// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: house.js
// DESC: Provides house functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

class HouseData {
    constructor(houseId, entrancePosition, blipModel, pickupModel, hasInterior) {
        this.index = -1;
        this.houseId = houseId;
        this.entrancePosition = entrancePosition;
        this.blipModel = blipModel;
        this.pickupModel = pickupModel;
        this.hasInterior = hasInterior;
        this.blipId = -1;
    }
}

// ===========================================================================

function receiveHouseFromServer(houseId, entrancePosition, blipModel, pickupModel, hasInterior) {
    if(getGame() == VRR_GAME_GTA_IV) {
        if(getHouseData(houseId) != false) {
            if(blipModel == -1) {
                natives.removeBlipAndClearIndex(getHouseData(houseId).blipId);
                getHouseData(houseId).blipId = -1;
                //houses.splice(getHouseData(houseId).index, 1);
                //setAllHouseDataIndexes();
            } else {
                if(getHouseData(houseId).blipId != -1) {
                    natives.setBlipCoordinates(getHouseData(houseId).blipId, getHouseData(houseId).entrancePosition);
                    natives.changeBlipSprite(getHouseData(houseId).blipId, getHouseData(houseId).blipModel);
                    //natives.changeBlipNameFromAscii(getHouseData(houseId).blipId, `${name.substr(0, 24)}${(name.length > 24) ? " ...": ""}`);
                } else {
                    let blipId = natives.addBlipForCoord(entrancePosition);
                    if(blipId) {
                        getHouseData(houseId).blipId = blipId;
                        natives.changeBlipSprite(blipId, blipModel);
                        natives.setBlipMarkerLongDistance(blipId, false);      
                    }                  
                }
            }
        } else {
            let tempHouseData = new HouseData(houseId, entrancePosition, blipModel, pickupModel, hasInterior, hasItems);
            if(blipModel != -1) {
                let blipId = natives.addBlipForCoord(entrancePosition);
                if(blipId) {
                    tempHouseData.blipId = blipId;
                    natives.changeBlipSprite(blipId, blipModel);
                    natives.setBlipMarkerLongDistance(blipId, false);
                    //natives.changeBlipNameFromAscii(blipId, `${name.substr(0, 24)}${(name.length > 24) ? " ...": ""}`);
                }
            }
            houses.push(tempHouseData);
            setAllHouseDataIndexes();
        }
    }
}

// ===========================================================================

/**
 * @param {number} houseId - The ID of the house (initially provided by server)
 * @return {HouseData} The house's data (class instance)
 */
function getHouseData(houseId) {
    let tempHouseData = houses.find((h) => h.houseId == houseId);
    return (typeof tempHouseData != "undefined") ? tempHouseData : false;
}

// ===========================================================================

function setAllHouseDataIndexes() {
    for(let i in houses) {
        houses[i].index = i;
    }
}

// ===========================================================================