// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: labels.js
// DESC: Provides functionality for world labels (3D labels)
// TYPE: Client (JavaScript)
// ===========================================================================

"use strict";

let businessLabels = [];
let houseLabels = [];

let propertyLabelNameFont = null;
let propertyLabelLockedFont = null;

let unlockedColour = toColour(50, 205, 50, 255);
let lockedColour = toColour(205, 92, 92, 255);

// ----------------------------------------------------------------------------

bindEventHandler("onResourceReady", thisResource, function(event, resource) {
    propertyLabelNameFont = lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
    propertyLabelLockedFont = lucasFont.createDefaultFont(12.0, "Roboto", "Light");
});

// ----------------------------------------------------------------------------

class businessLabelData {
    constructor(labelId, position, height, name, locked, hidden) {
        this.labelId = labelId;
        this.position = position;
        this.height = height;
        this.name = name;
        this.locked = locked;
        this.hidden = hidden;
    }
}

// ----------------------------------------------------------------------------

class houseLabelData {
    constructor(labelId, position, height, name, locked, hidden) {
        this.labelId = labelId;
        this.position = position;
        this.height = height;
        this.name = name;
        this.locked = locked;
        this.hidden = hidden;
    }
}

// ----------------------------------------------------------------------------

addEventHandler("OnDrawnHUD", function(event) {
	for(let i in businessLabels) {
		renderPropertyLabel(businessLabels[i], true);
    }
    
	for(let i in houseLabels) {
		renderPropertyLabel(houseLabels[i], true);
    } 
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.bizlabel.name", function(labelId, name) {
    getBusinessLabelData(labelId).name = name;
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.bizlabel.del", function(labelId) {
    for(let i in businessLabels) {
        if(businessLabels[i].labelId == labelId) {
            businessLabels.splice(i, 1);
        }
    }
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.bizlabel.locked", function(labelId, state) {
    getBusinessLabelData(labelId).locked = state;
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.bizlabel.add", function(labelId, position, height, name, locked, hidden) {
    businessLabels.push(new businessLabelData(labelId, position, height, name, locked, hidden));
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.bizlabel.all", function(tempBusinessLabels) {
    for(let i in tempBusinessLabels) {
        businessLabels.push(new businessLabelData(tempBusinessLabels[i][0], tempBusinessLabels[i][1], tempBusinessLabels[i][2], tempBusinessLabels[i][3], tempBusinessLabels[i][4], tempBusinessLabels[i][5]));
    }
    
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.houselabel.add", function(labelId, position, height, name, locked, hidden) {
    houseLabels.push(new houseLabelData(labelId, position, height, name, locked, hidden));
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.houselabel.all", function(tempHouseLabels) {
    for(let i in tempHouseLabels) {
        houseLabels.push(new houseLabelData(tempHouseLabels[i][0], tempHouseLabels[i][1], tempHouseLabels[i][2], tempHouseLabels[i][3], tempHouseLabels[i][4], tempHouseLabels[i][5]));
    }
    
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.houselabel.name", function(labelId, name) {
    getHouseLabelData(labelId).name = name;
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.houselabel.del", function(labelId) {
    for(let i in houseLabels) {
        if(houseLabels[i].labelId == labelId) {
            houseLabels.splice(i, 1);
        }
    }
    return true;
});

// ----------------------------------------------------------------------------

addNetworkHandler("ag.houselabel.locked", function(labelId, state) {
    getHouseLabelData(labelId).locked = state;
    return true;
});

// ----------------------------------------------------------------------------

function getBusinessLabelData(labelId) {
    for(let i in businessLabels) {
        if(businessLabels[i].labelId == labelId) {
            return businessLabels[i];
        }
    }
}

// ----------------------------------------------------------------------------

function getHouseLabelData(labelId) {
    for(let i in houseLabels) {
        if(houseLabels[i].labelId == labelId) {
            return houseLabels[i];
        }
    }
}

// ----------------------------------------------------------------------------

function renderPropertyLabel(labelData, isBusiness) {
    if(labelData.hidden) {
        return false;
    }

    if(localPlayer == null) {
        return false;
    }

	if(propertyLabelNameFont == null) {
		return false;
    }
    
	if(propertyLabelLockedFont == null) {
		return false;
	}
    
    if(localPlayer.position.distance(labelData.position) > 7.5) {
        return false;
    }

    let tempPosition = labelData.position;
    let screenPosition = getScreenFromWorldPosition(tempPosition);

    screenPosition.y -= labelData.height;

    let text = (labelData.locked) ? "LOCKED" : "UNLOCKED";
    if(isBusiness) {
        text = (labelData.locked) ? "CLOSED" : "OPEN";
    }
    let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
    propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, (labelData.locked) ? lockedColour : unlockedColour, false, true, false, true);       

    screenPosition.y -= 18;

    text = labelData.name;
    size = propertyLabelNameFont.measure(text, game.width, 0.0, 0.0, propertyLabelNameFont.size, true, true);
    propertyLabelNameFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelNameFont.size, COLOUR_WHITE, false, true, false, true);       
}

// ----------------------------------------------------------------------------