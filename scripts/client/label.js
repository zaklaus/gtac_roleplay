// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: labels.js
// DESC: Provides functionality for world labels (3D labels)
// TYPE: Client (JavaScript)
// ===========================================================================

"use strict";

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

function init3DLabelScript() {
	logToConsole(LOG_DEBUG, "[Asshat.3DLabel]: Initializing 3D label script ...");
	propertyLabelNameFont = init3DLabelPropertyNameFont();
	propertyLabelLockedFont = init3DLabelPropertyLockedFont();
	jobNameLabelFont = init3DLabelJobNameFont();
	jobHelpLabelFont = init3DLabelJobHelpFont();
	logToConsole(LOG_DEBUG, "[Asshat.3DLabel]: 3D label script initialized!");
}

// ===========================================================================

function init3DLabelPropertyNameFont() {
    return lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
}

// ===========================================================================

function init3DLabelPropertyLockedFont() {
    return lucasFont.createDefaultFont(12.0, "Roboto", "Light");
}

// ===========================================================================

function init3DLabelJobNameFont() {
    return lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
}

// ===========================================================================

function init3DLabelJobHelpFont() {
    return lucasFont.createDefaultFont(10.0, "Roboto", "Light");
}

// ===========================================================================

function renderPropertyEntranceLabel(name, position, locked, isBusiness, price) {
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

    if(screenPosition.x < 0 || screenPosition.x > gta.width) {
        return false;
    }

    let text = "";
    if(price > 0) {
        text = `For sale: $${price}`;
        let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
        propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, toColour(0, 150, 0, 255), false, true, false, true);

        screenPosition.y -= propertyLabelLockedOffset;
    }

    text = (locked) ? "LOCKED" : "UNLOCKED";
    if(isBusiness) {
        text = (locked) ? "CLOSED" : "OPEN";
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

    if(screenPosition.x < 0 || screenPosition.x > gta.width) {
        return false;
    }

    let text = "EXIT";
    size = propertyLabelNameFont.measure(text, game.width, 0.0, 0.0, propertyLabelNameFont.size, true, true);
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

    if(screenPosition.x < 0 || screenPosition.x > gta.width) {
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
    if(renderLabels && gta.game != GAME_GTA_IV) {
        if(localPlayer != null) {
            let pickups = getElementsByType(ELEMENT_PICKUP);
            for(let i in pickups) {
                if(pickups[i].getData("ag.label.type") != null) {
                    if(getDistance(localPlayer.position, pickups[i].position) <= renderLabelDistance) {
                        let price = 0;
                        if(pickups[i].getData("ag.label.price") != null) {
                            price = pickups[i].getData("ag.label.price");
                        }

                        switch(pickups[i].getData("ag.label.type")) {
                            case AG_LABEL_BUSINESS:
                                renderPropertyEntranceLabel(pickups[i].getData("ag.label.name"), pickups[i].position, pickups[i].getData("ag.label.locked"), true, price);
                                break;

                            case AG_LABEL_HOUSE:
                                renderPropertyEntranceLabel(pickups[i].getData("ag.label.name"), pickups[i].position, pickups[i].getData("ag.label.locked"), false, price);
                                break;

                            case AG_LABEL_JOB:
                                renderJobLabel(pickups[i].getData("ag.label.name"), pickups[i].position, pickups[i].getData("ag.label.jobType"));
                                break;

                            case AG_LABEL_EXIT:
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