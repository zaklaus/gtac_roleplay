// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: business.js
// DESC: Provides business functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

class BusinessData {
    constructor(businessId, name, entrancePosition, blipModel, pickupModel, hasInterior, hasItems) {
        this.index = -1;
        this.businessId = businessId;
        this.name = name;
        this.entrancePosition = entrancePosition;
        this.blipModel = blipModel;
        this.pickupModel = pickupModel;
        this.hasInterior = hasInterior;
        this.hasItems = hasItems;
        this.blipId = -1;
    }
}

// ===========================================================================

function receiveBusinessFromServer(businessId, name, entrancePosition, blipModel, pickupModel, hasInterior, hasItems) {
    logToConsole(LOG_DEBUG, `[VRR.Business] Received business ${businessId} (${name}) from server`);
    if(getGame() == VRR_GAME_GTA_IV) {
        if(getBusinessData(businessId) != false) {
            logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId} already exists. Checking blip ...`);
            if(blipModel == -1) {
                logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId}'s blip has been removed by the server`);
                natives.removeBlipAndClearIndex(getBusinessData(businessId).blipId);
                getBusinessData(businessId).blipId = -1;
                //businesses.splice(getBusinessData(businessId).index, 1);
                //setAllBusinessDataIndexes();
            } else {
                logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId}'s blip has been changed by the server`);
                if(getBusinessData(businessId).blipId != -1) {
                    logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId}'s blip has been modified by the server`);
                    natives.setBlipCoordinates(getBusinessData(businessId).blipId, getBusinessData(businessId).entrancePosition);
                    natives.changeBlipSprite(getBusinessData(businessId).blipId, getBusinessData(businessId).blipModel);
                    natives.changeBlipNameFromAscii(getBusinessData(businessId).blipId, `${name.substr(0, 24)}${(name.length > 24) ? " ...": ""}`);
                } else {
                    logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId}'s blip has been added by the server`);
                    let blipId = natives.addBlipForCoord(entrancePosition);
                    if(blipId) {
                        getBusinessData(businessId).blipId = blipId;
                        natives.changeBlipSprite(blipId, blipModel);
                        natives.setBlipMarkerLongDistance(blipId, false);      
                    }
                }
            }
        } else {
            logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId} doesn't exist. Adding ...`);
            let tempBusinessData = new BusinessData(businessId, name, entrancePosition, blipModel, pickupModel, hasInterior, hasItems);
            if(blipModel != -1) {
                logToConsole(LOG_DEBUG, `[VRR.Business] Business ${businessId}'s blip has been added by the server`);
                let blipId = natives.addBlipForCoord(entrancePosition);
                if(blipId) {
                    tempBusinessData.blipId = blipId;
                    natives.changeBlipSprite(blipId, blipModel);
                    natives.setBlipMarkerLongDistance(blipId, false);
                    natives.changeBlipNameFromAscii(blipId, `${name.substr(0, 24)}${(name.length > 24) ? " ...": ""}`);
                }
            }
            businesses.push(tempBusinessData);
            setAllBusinessDataIndexes();
        }
    }
}

// ===========================================================================

/**
 * @param {number} businessId - The ID of the business (initially provided by server)
 * @return {BusinessData} The business's data (class instance)
 */
function getBusinessData(businessId) {
    let tempBusinessData = businesses.find((b) => b.businessId == businessId);
    return (typeof tempBusinessData != "undefined") ? tempBusinessData : false;
}

// ===========================================================================

function setAllBusinessDataIndexes() {
    for(let i in businesses) {
        businesses[i].index = i;
    }
}

// ===========================================================================