// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: animation.js
// DESC: Provides animation functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

function makePedPlayAnimation(pedId, animGroup, animId, animType, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition) {
    if(getGame() < VRR_GAME_GTA_IV) {
        if(animType == VRR_ANIMTYPE_ADD) {
            if(getGame() == GAME_GTA_VC || getGame() == GAME_GTA_SA) {
                getElementFromId(pedId).clearAnimations();
            } else {
                getElementFromId(pedId).clearObjective();
            }
            getElementFromId(pedId).addAnimation(animGroup, animId);

            if(getElementFromId(pedId) == localPlayer) {
                inAnimation = true;
                setLocalPlayerControlState(false, false);
                localPlayer.collisionsEnabled = false;
            }
        } else if(animType == VRR_ANIMTYPE_BLEND) {
            getElementFromId(pedId).position = getElementFromId(pedId).position;
            getElementFromId(pedId).blendAnimation(animGroup, animId, animSpeed);
        } else if(animType == VRR_ANIMTYPE_MOVEADD) {
            getElementFromId(pedId).position = getElementFromId(pedId).position;
            getElementFromId(pedId).blendAnimation(animGroup, animId, animSpeed);
        }
    } else {
        natives.requestAnims(animGroup);
        natives.taskPlayAnimNonInterruptable(getElementFromId(pedId), animId, animGroup, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition, -1);
    }
}

// ===========================================================================

function forcePedAnimation(pedId, animGroup, animId, animType, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition) {
    if(getGame() < VRR_GAME_GTA_IV) {
        forcedAnimation = [animGroup, animId];
        setLocalPlayerControlState(false, false);
        getElementFromId(pedId).position = getElementFromId(pedId).position;
        getElementFromId(pedId).addAnimation(animGroup, animId);
    }
}

// ===========================================================================