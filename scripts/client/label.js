// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: labels.js
// DESC: Provides functionality for world labels (3D labels)
// TYPE: Client (JavaScript)
// ===========================================================================

let businessLabels = [];
let houseLabels = [];
let jobLabels = [];

let propertyLabelNameFont = null;
let propertyLabelLockedFont = null;
let propertyLabelHeight = 1.0;

let jobNameLabelFont = null;
let jobHelpLabelFont = null;

let unlockedColour = toColour(50, 205, 50, 255);
let lockedColour = toColour(205, 92, 92, 255);
let jobHelpColour = toColour(234, 198, 126, 255);

let renderLabelDistance = 7.5;

let propertyLabelLockedOffset = 16;
let propertyLabelNameOffset = 18;

// ===========================================================================

function initLabelScript() {
	logToConsole(LOG_DEBUG, "[VRR.Label]: Initializing label script ...");
	propertyLabelNameFont = initLabelPropertyNameFont();
	propertyLabelLockedFont = initLabelPropertyLockedFont();
	jobNameLabelFont = initLabelJobNameFont();
	jobHelpLabelFont = initLabelJobHelpFont();
	logToConsole(LOG_DEBUG, "[VRR.Label]: Label script initialized!");
}

// ===========================================================================

function initLabelPropertyNameFont() {
    return lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
}

// ===========================================================================

function initLabelPropertyLockedFont() {
    return lucasFont.createDefaultFont(12.0, "Roboto", "Light");
}

// ===========================================================================

function initLabelJobNameFont() {
    return lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
}

// ===========================================================================

function initLabelJobHelpFont() {
    return lucasFont.createDefaultFont(10.0, "Roboto", "Light");
}

// ===========================================================================

function renderPropertyEntranceLabel(name, position, locked, isBusiness, price, bizLabelInfoType) {
    if(localPlayer == null) {
        return false;
    }

	if(propertyLabelNameFont == null) {
		return false;
    }

	if(propertyLabelLockedFont == null) {
		return false;
    }

    let tempPosition = position;
    tempPosition.z = tempPosition.z + propertyLabelHeight;
    let screenPosition = getScreenFromWorldPosition(tempPosition);

    if(screenPosition.x < 0 || screenPosition.x > game.width) {
        return false;
    }

    let text = "";
    if(price > 0) {
        text = `For sale: $${price}`;
        let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
        propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, toColour(200, 200, 200, 255), false, true, false, true);

        screenPosition.y -= propertyLabelLockedOffset;
    }

    text = (locked) ? "LOCKED" : "UNLOCKED";
    if(isBusiness) {
        text = (locked) ? "CLOSED" : "OPEN";
        if(!locked && bizLabelInfoType != VRR_BIZLABEL_INFO_NONE) {
            let bizInfoText = "";
            switch(bizLabelInfoType) {
                case VRR_BIZLABEL_INFO_ENTER:
                    if(enterPropertyKey) {
                        bizInfoText = `Press ${toUpperCase(getKeyNameFromId(enterPropertyKey))} to enter`;
                    } else {
                        bizInfoText = `Use /enter to enter here`;
                    }
                    break;

                case VRR_BIZLABEL_INFO_BUY:
                    bizInfoText = `Use /buy to purchase items`;
                    break;

                case VRR_BIZLABEL_INFO_ENTERVEH:
                    bizInfoText = "Enter a vehicle to purchase it";
                    break;

                case VRR_BIZLABEL_INFO_NONE:
                default:
                    bizInfoText = "";
                    break;
            }
            if(getDistance(localPlayer.position, position) <= renderLabelDistance-2) {
                let size = propertyLabelLockedFont.measure(bizInfoText, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
                propertyLabelLockedFont.render(bizInfoText, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, toColour(234, 198, 126, 255), false, true, false, true);
                screenPosition.y -= propertyLabelLockedOffset;
            }
        }
    }

    let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
    propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, (locked) ? lockedColour : unlockedColour, false, true, false, true);

    screenPosition.y -= propertyLabelNameOffset;

    text = name || " ";
    size = propertyLabelNameFont.measure(text, game.width, 0.0, 0.0, propertyLabelNameFont.size, true, true);
    propertyLabelNameFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelNameFont.size, (isBusiness) ? toColour(0, 153, 255, 255) : toColour(17, 204, 17, 255), false, true, false, true);
}

// -------------------------------------------------------------------------

function renderPropertyExitLabel(position) {
    if(localPlayer == null) {
        return false;
    }

	if(propertyLabelNameFont == null) {
		return false;
    }

	if(propertyLabelLockedFont == null) {
		return false;
	}

    let tempPosition = position;
    tempPosition.z = tempPosition.z + propertyLabelHeight;
    let screenPosition = getScreenFromWorldPosition(tempPosition);

    if(screenPosition.x < 0 || screenPosition.x > game.width) {
        return false;
    }

    let text = "EXIT";
    let size = propertyLabelNameFont.measure(text, game.width, 0.0, 0.0, propertyLabelNameFont.size, true, true);
    propertyLabelNameFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelNameFont.size, COLOUR_WHITE, false, true, false, true);
}

// -------------------------------------------------------------------------

function renderJobLabel(name, position, jobType) {
    if(localPlayer == null) {
        return false;
    }

	if(jobNameLabelFont == null) {
		return false;
    }

	if(jobHelpLabelFont == null) {
		return false;
	}

    let tempPosition = position;
    tempPosition.z = tempPosition.z + propertyLabelHeight;
    let screenPosition = getScreenFromWorldPosition(tempPosition);

    if(screenPosition.x < 0 || screenPosition.x > game.width) {
        return false;
    }

    let text = "";
    if(jobType == localPlayerJobType) {
        if(localPlayerWorking) {
            text = "Use /uniform and /equip for job stuff, or /stopwork to go off duty";
        } else {
            text = "Use /startwork to go on duty";
        }
    } else {
        if(localPlayerJobType == 0) {
            text = "Use /takejob to work here";
        } else {
            text = "You already have a job. Use /quitjob if you want this one";
        }
    }

    let size = jobHelpLabelFont.measure(text, game.width, 0.0, 0.0, jobHelpLabelFont.size, true, true);
    jobHelpLabelFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, jobHelpLabelFont.size, COLOUR_YELLOW, false, true, false, true);

    screenPosition.y -= 18;

    text = name + " Job";
    size = jobNameLabelFont.measure(text, game.width, 0.0, 0.0, jobNameLabelFont.size, true, true);
    jobNameLabelFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, jobNameLabelFont.size, COLOUR_WHITE, false, true, false, true);
}

// -------------------------------------------------------------------------

function processLabelRendering() {
    if(renderLabels && areWorldLabelsSupported()) {
        if(localPlayer != null) {
            let pickups = getElementsByType(ELEMENT_PICKUP);
            for(let i in pickups) {
                if(pickups[i].getData("vrr.label.type") != null) {
                    if(getDistance(localPlayer.position, pickups[i].position) <= renderLabelDistance) {
                        let price = 0;
                        let bizLabelInfoType = VRR_BIZLABEL_INFO_NONE;
                        if(pickups[i].getData("vrr.label.price") != null) {
                            price = makeLargeNumberReadable(pickups[i].getData("vrr.label.price"));
                        }

                        if(pickups[i].getData("vrr.label.help") != null) {
                            bizLabelInfoType = pickups[i].getData("vrr.label.help");
                        }

                        switch(pickups[i].getData("vrr.label.type")) {
                            case VRR_LABEL_BUSINESS:
                                renderPropertyEntranceLabel(pickups[i].getData("vrr.label.name"), pickups[i].position, pickups[i].getData("vrr.label.locked"), true, price, bizLabelInfoType);
                                break;

                            case VRR_LABEL_HOUSE:
                                renderPropertyEntranceLabel(pickups[i].getData("vrr.label.name"), pickups[i].position, pickups[i].getData("vrr.label.locked"), false, price, bizLabelInfoType);
                                break;

                            case VRR_LABEL_JOB:
                                renderJobLabel(pickups[i].getData("vrr.label.name"), pickups[i].position, pickups[i].getData("vrr.label.jobType"));
                                break;

                            case VRR_LABEL_EXIT:
                                renderPropertyExitLabel(pickups[i].position);
                                break;
                        }
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------------------