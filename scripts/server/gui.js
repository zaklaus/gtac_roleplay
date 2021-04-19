// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: gui.js
// DESC: Provides GUI functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initGUIScript() {
	logToConsole(LOG_INFO, "[Asshat.GUI]: Initializing GUI script ...");
	logToConsole(LOG_INFO, "[Asshat.GUI]: GUI script initialized successfully!");
}

// ===========================================================================

function playerPromptAnswerNo(client) {
    if(getPlayerData(client).promptType == AG_PROMPT_NONE) {
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.GUI] ${getPlayerDisplayForConsole(client)} answered NO to their prompt (${getPlayerData(client).promptType})`);

    switch(getPlayerData(client).promptType) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)} chose not to create a first character. Kicking them from the server ...`);
            showPlayerErrorGUI(client, "You don't have a character to play. Goodbye!", "No Characters");
            setTimeout(function() { client.disconnect(); }, 5000);
            break;

            case AG_PROMPT_BIZORDER:
                if(getPlayerData(client).businessOrderAmount > 0) {
                    if(canPlayerUseGUI(client)) {
                        showPlayerErrorGUI(client, "You canceled the order.", "Business Order Canceled");
                    } else {
                        logToConsole(LOG_DEBUG, `${getPlayerDisplayForConsole(client)} canceled the order of ${getPlayerData(client).businessOrderAmount} ${getPlayerData(client).businessOrderItem} at ${getPlayerData(client).businessOrderCost/getPlayerData(client).businessOrderAmount} each for business ${getBusinessData(getPlayerData(client).businessOrderBusiness)}`);
                        messagePlayerError(client, "You canceled the order!");
                    }
                } else {
                    showPlayerErrorGUI(client, "You aren't ordering anything for a business!", "Business Order Canceled");
                }
                break;

        default:
            break;
    }

    getPlayerData(client).promptType = AG_PROMPT_NONE;
}

// ===========================================================================

function playerPromptAnswerYes(client) {
    if(getPlayerData(client).promptType == AG_PROMPT_NONE) {
        return false;
    }

    logToConsole(LOG_DEBUG, `[Asshat.GUI] ${getPlayerDisplayForConsole(client)} answered YES to their prompt (${getPlayerData(client).promptType})`);

    switch(getPlayerData(client).promptType) {
        case AG_PROMPT_CREATEFIRSTCHAR:
            getPlayerData(client).creatingCharacter = true;
            spawnPlayer(client, getServerConfig().characterSelectPedPosition, getServerConfig().characterSelectPedHeading, getGameData().allowedSkins[getServerGame()][0][0], getServerConfig().characterSelectInterior, getServerConfig().characterSelectDimension);
            showCharacterSelectCameraToPlayer(client);
            setTimeout(function() {
                forcePlayerIntoSkinSelect(client);
            }, 750);
            break;

        case AG_PROMPT_BIZORDER:
            if(getPlayerData(client).businessOrderAmount > 0) {
                if(getBusinessData(getPlayerData(client).businessOrderBusiness).till < getPlayerData(client).businessOrderCost) {
                    logToConsole(LOG_DEBUG, `[Asshat.GUI] ${getPlayerDisplayForConsole(client)} failed to order ${getPlayerData(client).businessOrderAmount} ${getPlayerData(client).businessOrderItem} at ${getPlayerData(client).businessOrderCost/getPlayerData(client).businessOrderAmount} each for business ${getBusinessData(getPlayerData(client).businessOrderBusiness)} (Reason: Not enough money in business till)`);
                    showPlayerErrorGUI(client, "This business doesn't have enough money! Deposit some using /bizdeposit", "Business Order Canceled");
                    getPlayerData(client).businessOrderAmount = 0;
                    getPlayerData(client).businessOrderBusiness = false;
                    getPlayerData(client).businessOrderItem = -1;
                    getPlayerData(client).businessOrderValue = -1;
                } else {
                    logToConsole(LOG_DEBUG, `[Asshat.GUI] ${getPlayerDisplayForConsole(client)} successfully ordered ${getPlayerData(client).businessOrderAmount} ${getPlayerData(client).businessOrderItem} at ${getPlayerData(client).businessOrderCost/getPlayerData(client).businessOrderAmount} each for business ${getBusinessData(getPlayerData(client).businessOrderBusiness)}`);
                    showPlayerInfoGUI(client, `You ordered ${getPlayerData(client).businessOrderAmount} ${getItemTypeData(getPlayerData(client).businessOrderItem).name} (${getItemValueDisplay(getPlayerData(client).businessOrderItem, getPlayerData(client).businessOrderValue)}) for ${getPlayerData(client).businessOrderCost}!`, "Business Order Successful");
                    getPlayerData(client).businessOrderAmount = 0;
                    getPlayerData(client).businessOrderBusiness = false;
                    getPlayerData(client).businessOrderItem = -1;
                    getPlayerData(client).businessOrderValue = -1;
                }
            } else {
                showPlayerErrorGUI(client, `You aren't ordering anything for a business!`, `Business Order Canceled`);
            }
            break;

        default:
            break;
    }

    getPlayerData(client).promptType = AG_PROMPT_NONE;
}

// ===========================================================================

function canPlayerUseGUI(client) {
    return (getServerConfig().useGUI && doesPlayerHaveGUIEnabled(client));
}

// ===========================================================================

function playerPromptAnswerYesCommand(command, params, client) {
    playerPromptAnswerYes(client);
}

// ===========================================================================

function playerPromptAnswerNoCommand(command, params, client) {
    playerPromptAnswerNo(client);
}

// ===========================================================================