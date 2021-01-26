// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: item.js
// DESC: Provides item functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initItemScript() {
	getServerData().itemTypes = loadItemTypesFromDatabase();
	getServerData().items = loadItemsFromDatabase();

	setItemDataIndexes();

	createAllGroundItemObjects();
	return true;
}

// ---------------------------------------------------------------------------

function loadItemsFromDatabase() {
	let tempItems = [];
	let dbConnection = connectToDatabase();
	let dbFetchAssoc;
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM item_main WHERE item_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbFetchAssoc = fetchQueryAssoc(dbQuery)) {
					let tempItemData = new serverClasses.itemData(dbFetchAssoc);
					tempItems.push(tempItemData);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}
	return tempItems;
}

// ---------------------------------------------------------------------------

function loadItemTypesFromDatabase() {
	let tempItemTypes = [];
	let dbConnection = connectToDatabase();
	let dbFetchAssoc;
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM item_type WHERE item_type_enabled = 1 AND item_type_server = ${getServerId()}`);
		if(dbQuery) {
			if(getQueryNumRows(dbQuery) > 0) {
				while(dbFetchAssoc = fetchQueryAssoc(dbQuery)) {
					let tempItemTypeData = new serverClasses.itemTypeData(dbFetchAssoc);
					tempItemTypes.push(tempItemTypeData);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	return tempItemTypes;
}

// ---------------------------------------------------------------------------

function createItem(itemTypeId, value, ownerType, ownerId, amount=1) {
	let tempItemData = new serverClasses.itemData(false);
	tempItemData.itemType = getItemTypeData(itemTypeId).databaseId;
	tempItemData.ownerType = ownerType;
	tempItemData.ownerId = ownerId;
	tempItemData.amount = amount;
	tempItemData.value = value;
	tempItemData.needsSaved = true;
	let slot = getServerData().items.push(tempItemData);
	let index = slot-1;
	getServerData().items[slot-1].index = index;
	getServerData().items[slot-1].itemTypeIndex = itemTypeId;
	return index;
}

// ---------------------------------------------------------------------------

function createGroundItem(itemTypeId, value, position, dimension = 0) {
	let itemIndex = createItem(itemTypeId, value, AG_ITEM_OWNER_GROUND, 0);
	getItemData(itemIndex).position = position;
	getItemData(itemIndex).dimension = dimension;
	createGroundItemObject(itemIndex);
	return itemIndex;
}

// ---------------------------------------------------------------------------

function createGroundItemObject(itemId) {
	if(!getItemData(itemId)) {
		return false;
	}

	if(getItemData(itemId).object != null) {
		deleteGroundItemObject(itemId);
	}

	getItemData(itemId).object = gta.createObject(getItemTypeData(getItemData(itemId).itemTypeIndex).dropModel, applyOffsetToVector3(getItemData(itemId).position, getItemTypeData(getItemData(itemId).itemTypeIndex).dropPosition));
	getItemData(itemId).object.setRotation(getItemTypeData(getItemData(itemId).itemTypeIndex).dropRotation);
	getItemData(itemId).object.dimension = getItemData(itemId).dimension;
	setEntityData(getItemData(itemId).object, "ag.scale", getItemTypeData(getItemData(itemId).itemTypeIndex).dropScale, true);
	addToWorld(getItemData(itemId).object);

	getServerData().groundItemCache.push(itemId);
}

// ---------------------------------------------------------------------------

function deleteGroundItemObject(itemId) {
	if(getServerData().groundItemCache.indexOf(itemId) != -1) {
		getServerData().groundItemCache.splice(getServerData().groundItemCache.indexOf(itemId), 1);
	}

	if(getItemData(itemId).object != null) {
		destroyElement(getItemData(itemId).object);
		getItemData(itemId).object = null;
	}
}

// ---------------------------------------------------------------------------

function createGroundItemCommand(command, params, client) {
	let splitParams = params.split(" ");
	let itemType = getItemTypeFromParams(splitParams.slice(0, -1).join(" "));
	let value = splitParams.slice(-1) || 1;

	if(!getItemTypeData(itemType)) {
		messagePlayerError(client, `Item '${params}' not found`);
		return false;
	}

	//if(value <= 0) {
	//	messagePlayerError(client, `The value must be more than 0!`);
	//	return false;
	//}

	let itemId = createGroundItem(itemType, toInteger(value), getPlayerPosition(client), getPlayerDimension(client));
	messagePlayerSuccess(client, `You created a ${getItemTypeData(itemType).name} on the ground at your position`);
}

// ---------------------------------------------------------------------------

function useItemCommand(command, params, client) {
	let hotBarSlot = getPlayerData(client).activeHotBarSlot;
	if(!areParamsEmpty(params)) {
		hotBarSlot = toInteger(params);
		hotBarSlot = hotBarSlot-1;
	}

	if(hotBarSlot == -1) {
		return false;
	}

	if(getPlayerData(client).hotBarItems[hotBarSlot] == -1) {
		return false;
	}

	let itemId = getPlayerData(client).hotBarItems[hotBarSlot];

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to use is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Use Item: Getting item data for item ${itemId} in player hotbar slot ${hotBarSlot} (cache ${getPlayerData(client).hotBarItems[hotBarSlot]}) returned false.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).itemTypeIndex)) {
		messagePlayerError(client, `The item you're trying to use is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Drop Item: Getting item type ${getItemData(itemId).itemType} data for item ${itemId}/${getItemData(itemId).databaseId} in player hotbar slot ${hotBarSlot} (cache ${getPlayerData(client).hotBarItems[hotBarSlot]}) returned false.`);
		return false;
	}

	if(getItemTypeData(getItemData(itemId).itemTypeIndex).useType == AG_ITEM_USETYPE_NONE || getItemTypeData(getItemData(itemId).itemTypeIndex).useType == AG_ITEM_USETYPE_WEAPON) {
		return false;
	}

	getPlayerData(client).itemActionState = AG_ITEM_ACTION_USE;
	getPlayerData(client).itemActionItem = hotBarSlot;
	showPlayerItemUseDelay(client, hotBarSlot);

	clearPlayerItemActionStateAfterDelay(client, getGlobalConfig().itemActionStateReset);
}

// ---------------------------------------------------------------------------

function deleteGroundItemCommand(command, params, client) {
	let itemId = getClosestItemOnGround(getPlayerPosition(client));

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to delete is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Delete Ground Item: Getting item data for item ${itemId} on ground returned false.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).itemTypeIndex)) {
		messagePlayerError(client, `The item you're trying to delete is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Delete Ground Item: Getting item type ${getItemData(itemId).itemType} data for item ${itemId}/${getItemData(itemId).databaseId} on ground returned false.`);
		return false;
	}

	let tempName = getItemData(itemId).name;
	deleteItem(itemId);
	messagePlayerSuccess(client, `You deleted the ${tempName} item near you`);
}

// ---------------------------------------------------------------------------

function pickupItemCommand(command, params, client) {
	let itemId = getClosestItemOnGround(getPlayerPosition(client));

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to pick up is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Pickup Item: Getting item data for item ${itemId} on ground returned false.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).itemTypeIndex)) {
		messagePlayerError(client, `The item you're trying to pick up is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Pickup Item: Getting item type ${getItemData(itemId).itemType} data for item ${itemId}/${getItemData(itemId).databaseId} on ground returned false.`);
		return false;
	}

	if(getDistance(getPlayerPosition(client), getItemData(itemId).position) > getGlobalConfig().droppedItemPickupRange) {
		messagePlayerError(client, `You're too far away!`);
		return false;
	}

	let firstSlot = getPlayerFirstEmptyHotBarSlot(client);
	if(firstSlot == -1) {
		messagePlayerError(client, `You don't have any space to carry this (full inventory)!`);
		return false;
	}

	if(getPlayerData(client).itemActionState != AG_ITEM_ACTION_NONE) {
		return false;
	}

	getPlayerData(client).itemActionState = AG_ITEM_ACTION_PICKUP;
	getPlayerData(client).itemActionItem = itemId;
	showPlayerItemPickupDelay(client, itemId);

	clearPlayerItemActionStateAfterDelay(client, getGlobalConfig().itemActionStateReset);
}

// ---------------------------------------------------------------------------

function dropItemCommand(command, params, client) {
	let hotBarSlot = getPlayerData(client).activeHotBarSlot;

	if(!areParamsEmpty(params)) {
		hotBarSlot = toInteger(params);
	}

	if(hotBarSlot == -1) {
		return false;
	}

	if(getPlayerData(client).hotBarItems[hotBarSlot] == -1) {
		messagePlayerError(client, `Please equip an item or provide a slot ID to drop an item`);
		return false;
	}

	let itemId = getPlayerData(client).hotBarItems[hotBarSlot];

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to drop is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Drop Item: Getting item data for item ${itemId} in player hotbar slot ${hotBarSlot} (cache ${getPlayerData(client).hotBarItems[hotBarSlot]}) returned false.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).itemTypeIndex)) {
		messagePlayerError(client, `The item you're trying to drop is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Drop Item: Getting item type ${getItemData(itemId).itemType} data for item ${itemId}/${getItemData(itemId).databaseId} in player hotbar slot ${hotBarSlot} (cache ${getPlayerData(client).hotBarItems[hotBarSlot]}) returned false.`);
		return false;
	}

	if(getPlayerData(client).itemActionState != AG_ITEM_ACTION_NONE) {
		return false;
	}

	getPlayerData(client).itemActionItem = hotBarSlot;
	getPlayerData(client).itemActionState = AG_ITEM_ACTION_DROP;
	showPlayerItemDropDelay(client, itemId);

	clearPlayerItemActionStateAfterDelay(client, getGlobalConfig().itemActionStateReset);
}

// ---------------------------------------------------------------------------

function putItemCommand(command, params, client) {
	let hotBarSlot = toInteger(params);

	let itemId = getPlayerData(client).hotBarItems[hotBarSlot];

	if(!getItemData(itemId)) {
		messagePlayerError(client, `The item you're trying to store is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Put Item: Getting item data for item ${itemId} in player hotbar slot ${hotBarSlot} (cache ${getPlayerData(client).hotBarItems[hotBarSlot]}) returned false.`);
		return false;
	}

	if(!getItemTypeData(getItemData(itemId).itemTypeIndex)) {
		messagePlayerError(client, `The item you're trying to store is bugged. A bug report has been sent to the server developers.`);
		submitBugReport(client, `(AUTOMATED REPORT) Put Item: Getting item type ${getItemData(itemId).itemType} data for item ${itemId}/${getItemData(itemId).databaseId} in player hotbar slot ${hotBarSlot} (cache ${getPlayerData(client).hotBarItems[hotBarSlot]}) returned false.`);
		return false;
	}

	if(getPlayerData(client).itemActionState != AG_ITEM_ACTION_NONE) {
		return false;
	}

	getPlayerData(client).itemActionItem = hotBarSlot;
	getPlayerData(client).itemActionState = AG_ITEM_ACTION_PUT;
	showPlayerItemPutDelay(client, hotBarSlot);

	clearPlayerItemActionStateAfterDelay(client, getGlobalConfig().itemActionStateReset);
}

// ---------------------------------------------------------------------------

function takeItemCommand(command, params, client) {
	let firstSlot = getPlayerFirstEmptyHotBarSlot(client);
	if(firstSlot == -1) {
		messagePlayerError(client, `You don't have any space to hold another item (full inventory)!`);
		return false;
	}

	let itemSlot = toInteger(params) || 0;

	let	bestOwner = getBestItemToTake(client, itemSlot);
	let itemId = bestOwner[2];

	if(bestOwner[1] == AG_ITEM_OWNER_NONE) {
		messagePlayerError(client, `You aren't near anything to take items from!`);
		return false;
	}

	if(getPlayerData(client).itemActionState != AG_ITEM_ACTION_NONE) {
		return false;
	}

	getPlayerData(client).itemActionItem = itemId;
	getPlayerData(client).itemActionState = AG_ITEM_ACTION_TAKE;
	showPlayerItemTakeDelay(client, itemId);

	clearPlayerItemActionStateAfterDelay(client, getGlobalConfig().itemActionStateReset);
}

// ---------------------------------------------------------------------------

function playerUseItem(client, hotBarSlot) {
	let closestPlayer;
	let tempUseValue;

	let itemIndex = getPlayerData(client).hotBarItems[hotBarSlot];

	switch(getItemTypeData(getItemData(itemIndex).itemTypeIndex).useType) {
		case AG_ITEM_USETYPE_SKIN:
			let oldSkin = getPlayerSkin(client);
			if(isPlayerWorking(client)) {
				oldSkin = getPlayerCurrentSubAccount(client).skin;
			}

			let newSkin = getItemData(itemIndex).value;
			if(isPlayerWorking(client)) {
				newSkin = getPlayerCurrentSubAccount(client).skin;
			}
			setPlayerSkin(client, newSkin);
			getItemData(itemIndex).value = oldSkin;
			meActionToNearbyPlayers(client, `puts on ${getProperDeterminerForName(getSkinNameFromId(newSkin))} ${getSkinNameFromId(newSkin)} ${toLowerCase(getItemName(itemIndex))}`);
			break;

		case AG_ITEM_USETYPE_WEAPON:
			messagePlayerError(client, `The ${getItemName(itemIndex)} is a weapon. To use it, switch to it from your items. The use key has no effect.`);
			break;

		case AG_ITEM_USETYPE_PHONE:
			showPlayerPhoneGUI(client);
			break;

		case AG_ITEM_USETYPE_STORAGE:
			showItemInventoryToPlayer(client, itemIndex);
			break;

		case AG_ITEM_USETYPE_FOOD:
			tempUseValue = (getItemTypeData(getItemData(itemIndex).itemTypeIndex).useValue > getItemData(itemIndex).value) ? getItemTypeData(getItemData(itemIndex).itemTypeIndex).useValue : getItemData(itemIndex).value;
			givePlayerHealth(client, tempUseValue);
			if(getItemData(itemIndex).value-tempUseValue <= 0) {
				getPlayerData(client).hotBarItems[getPlayerData(client).hotBarItems.indexOf(itemIndex)] = -1;
				deleteItem(itemIndex);
			} else {
				getItemData(itemIndex).value = getItemData(itemIndex).value-tempUseValue;
			}
			meActionToNearbyPlayers(client, `takes a bite of their ${getItemName(itemIndex)}`);
			break;

		case AG_ITEM_USETYPE_DRINK:
			tempUseValue = (getItemTypeData(getItemData(itemIndex).itemTypeIndex).useValue > getItemData(itemIndex).value) ? getItemTypeData(getItemData(itemIndex).itemTypeIndex).useValue : getItemData(itemIndex).value;
			givePlayerHealth(client, tempUseValue);
			getItemData(itemIndex).value = getItemData(itemIndex).value - tempUseValue;
			if(getItemData(itemIndex).value-tempUseValue <= 0) {
				getPlayerData(client).hotBarItems[getPlayerData(client).hotBarItems.indexOf(itemIndex)] = -1;
				deleteItem(itemIndex);
			} else {
				getItemData(itemIndex).value = getItemData(itemIndex).value-tempUseValue;
				meActionToNearbyPlayers(client, `takes a drink of their ${getItemName(itemIndex)}`);
			}
			break;

		case AG_ITEM_USETYPE_ROPE:
			closestPlayer = getClosestPlayer(getPlayerPosition(client), client);

			if(!getPlayerData(closestPlayer)) {
				messagePlayerError(client, "There isn't anyone close enough to tie up!");
				return false;
			}

			if(getDistance(getPlayerPosition(closestPlayer), getPlayerPosition(client)) > getGlobalConfig().handcuffPlayerDistance) {
				messagePlayerError(client, "There isn't anyone close enough to tie up!");
				return false;
			}

			if(!isPlayerSurrendered(closestPlayer)) {
				messagePlayerError(client, `${getCharacterFullName(closestPlayer)} can't be tied! They either need to have their hands up, be knocked out, or tazed`);
				return false;
			}

			if(isPlayerHandCuffed(closestPlayer)) {
				ropeUnTiePlayer(closestPlayer);
				meActionToNearbyPlayers(client, `unties the rope from ${getCharacterFullName(closestPlayer)}'s hands and feet`);
			} else {
				if(!isPlayerSurrendered(closestPlayer)) {
					messagePlayerError(client, `${getCharacterFullName(closestPlayer)} can't be tied up! They either need to have their hands up, be knocked out, or tazed`);
					return false;
				}

				ropeTiePlayer(closestPlayer);
				meActionToNearbyPlayers(client, `takes their rope and ties ${getCharacterFullName(closestPlayer)}'s hands and feet together.`);
			}
			break;

		case AG_ITEM_USETYPE_HANDCUFF:
			closestPlayer = getClosestPlayer(getPlayerPosition(client), client);

			if(!getPlayerData(closestPlayer)) {
				messagePlayerError(client, "There isn't anyone close enough to handcuff!");
				return false;
			}

			if(getDistance(getPlayerPosition(closestPlayer), getPlayerPosition(client)) > getGlobalConfig().handcuffPlayerDistance) {
				messagePlayerError(client, "There isn't anyone close enough to handcuff!");
				return false;
			}

			if(isPlayerHandCuffed(closestPlayer)) {
				unHandCuffPlayer(closestPlayer);
				meActionToNearbyPlayers(client, `takes their key and removes the handcuffs from ${getCharacterFullName(closestPlayer)}`);
			} else {
				if(!isPlayerSurrendered(closestPlayer)) {
					messagePlayerError(client, `${getCharacterFullName(closestPlayer)} can't be cuffed! They either need to have their hands up, be knocked out, or tazed`);
					return false;
				}

				handCuffPlayer(closestPlayer);
				meActionToNearbyPlayers(client, `takes their cuffs and places them on ${getCharacterFullName(closestPlayer)}`);
			}
			break;

		case AG_ITEM_USETYPE_NONE:
			messagePlayerError(client, `The ${getItemName(itemIndex)} doesn't do anything when you try to use it.`);
			break;

		case AG_ITEM_USETYPE_WALKIETALKIE:
			getItemData(itemIndex).enabled = !getItemData(itemIndex).enabled;
			messagePlayerAlert(client, `You turned ${getBoolRedGreenInlineColour(getItemData(itemIndex).enabled)}${toUpperCase(getOnOffFromBool(getItemData(itemIndex).enabled))} [#FFFFFF]your walkie talkie in slot ${getPlayerData(client).activeHotBarSlot+1} [#AAAAAA](${getItemValueDisplayForItem(itemIndex)})`);
			break;

		case AG_ITEM_USETYPE_PHONE:
			getItemData(itemIndex).enabled = !getItemData(itemIndex).enabled;
			if(getItemData(itemIndex).enabled) {
				messagePlayerAlert(client, `You turned on your phone in slot ${getPlayerData(client).activeHotBarSlot+1} (${getItemValueDisplayForItem(itemIndex)})`);
			} else {
				messagePlayerAlert(client, `You turned OFF your phone in slot ${getPlayerData(client).activeHotBarSlot+1}`);
			}
			break;

		default:
			messagePlayerError(client, `The ${getItemName(itemIndex)} doesn't do anything when you try to use it.`);
			break;
	}

	getItemData(itemIndex).needsSaved = true;
	updatePlayerHotBar(client);
}

// ---------------------------------------------------------------------------

function playerDropItem(client, hotBarSlot) {
	let itemId = getPlayerData(client).hotBarItems[hotBarSlot];
	if(itemId != -1) {
		meActionToNearbyPlayers(client, `drops ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} on the ground`);

		resyncWeaponItemAmmo(client);

		getPlayerData(client).hotBarItems[hotBarSlot] = -1;
		updatePlayerHotBar(client);

		getItemData(itemId).ownerType = AG_ITEM_OWNER_GROUND;
		getItemData(itemId).ownerId = 0;
		getItemData(itemId).position = getPlayerPosition(client);
		getItemData(itemId).dimension = getPlayerDimension(client);
		createGroundItemObject(itemId);
		getItemData(itemId).needsSaved = true;
	}
}

// ---------------------------------------------------------------------------

function playerPutItem(client, hotBarSlot) {
	let itemId = getPlayerData(client).hotBarItems[hotBarSlot];

	let	bestNewOwner = getBestNewOwnerToPutItem(client);

	switch(bestNewOwner[0]) {
		case AG_ITEM_OWNER_HOUSE:
			meActionToNearbyPlayers(client, `places ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} in the house`);
			break;

		case AG_ITEM_OWNER_BIZFLOOR:
			meActionToNearbyPlayers(client, `places ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} for sale in the business`);
			break;

		case AG_ITEM_OWNER_BIZSTORAGE:
			meActionToNearbyPlayers(client, `places ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} in the business storage room`);
			break;

		case AG_ITEM_OWNER_VEHTRUNK:
			meActionToNearbyPlayers(client, `places ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} in the ${getVehicleName(bestNewOwner[1])}'s trunk`);
			break;
	}

	resyncWeaponItemAmmo(client);

	getItemData(itemId).ownerType = ownerType;
	getItemData(itemId).ownerId = ownerId;
	getItemData(itemId).position = toVector(0.0, 0.0, 0.0);
	getItemData(itemId).dimension = 0;
	getItemData(itemId).needsSaved = true;

	getPlayerData(client).hotBarItems[hotBarSlot] = -1;
	updatePlayerHotBar(client);
}

// ---------------------------------------------------------------------------

function playerPickupItem(client, itemId) {
	meActionToNearbyPlayers(client, `picks up ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} from the ground`);

	let firstSlot = getPlayerFirstEmptyHotBarSlot(client);
	if(firstSlot != -1) {
		getItemData(itemId).ownerType = AG_ITEM_OWNER_PLAYER;
		getItemData(itemId).ownerId = getPlayerCurrentSubAccount(client).databaseId;
		getItemData(itemId).position = toVector3(0.0, 0.0, 0.0);
		getItemData(itemId).dimension = 0;
		deleteGroundItemObject(itemId);

		getPlayerData(client).hotBarItems[firstSlot] = itemId;
		updatePlayerHotBar(client);
	}
}

// ---------------------------------------------------------------------------

function playerTakeItem(client, itemId) {
	switch(bestOwner[1]) {
		case AG_ITEM_OWNER_HOUSE:
			meActionToNearbyPlayers(client, `takes ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} from the house`);
			break;

		case AG_ITEM_OWNER_BIZFLOOR:
			meActionToNearbyPlayers(client, `takes ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} from the business`);
			break;

		case AG_ITEM_OWNER_BIZSTORAGE:
			meActionToNearbyPlayers(client, `takes ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} from the business storage room`);
			break;

		case AG_ITEM_OWNER_VEHTRUNK:
			meActionToNearbyPlayers(client, `takes ${getProperDeterminerForName(getItemName(itemId))} ${getItemName(itemId)} from the trunk`);
			break;
	}

	let firstSlot = getPlayerFirstEmptyHotBarSlot(client);
	if(firstSlot != -1) {
		getItemData(itemId).ownerType = AG_ITEM_OWNER_PLAYER;
		getItemData(itemId).ownerId = getPlayerCurrentSubAccount(client).databaseId;

		getPlayerData(client).hotBarItems[firstSlot] = itemId;
		updatePlayerHotBar(client);
	}
}

// ---------------------------------------------------------------------------

function playerSwitchItem(client, newHotBarSlot) {
	if(newHotBarSlot < -1 || newHotBarSlot > 9) {
		return false;
	}

	let currentHotBarSlot = getPlayerData(client).activeHotBarSlot;
	logToConsole(LOG_DEBUG, `[Asshat.Item] ${getPlayerDisplayForConsole(client)} switched from hotbar slot ${currentHotBarSlot} to ${newHotBarSlot}`);

	let currentHotBarItem = -1;
	if(currentHotBarSlot != -1) {
		currentHotBarItem = getPlayerData(client).hotBarItems[currentHotBarSlot];
	}

	let newHotBarItem = -1;
	if(newHotBarSlot != -1) {
		newHotBarItem = getPlayerData(client).hotBarItems[newHotBarSlot];
	}

	resyncWeaponItemAmmo(client);

	if(currentHotBarItem != -1) {
		if(getItemData(currentHotBarItem)) {
			if(getGlobalConfig().weaponEquippableTypes.indexOf(getItemTypeData(getItemData(currentHotBarItem).itemTypeIndex).useType) != -1) {
				clearPlayerWeapons(client);
			}
		}
	}



	if(newHotBarItem != -1) {
		if(getItemData(newHotBarItem)) {
			if(getItemTypeData(getItemData(newHotBarItem).itemTypeIndex).useType == AG_ITEM_USETYPE_WEAPON) {
				if(getItemData(newHotBarItem).value > 0) {
					givePlayerWeapon(client, toInteger(getItemTypeData(getItemData(newHotBarItem).itemTypeIndex).useId), toInteger(getItemData(newHotBarItem).value), true, true);
					setPlayerWeaponDamageEnabled(client, true);
					setPlayerWeaponDamageEvent(client, AG_WEAPON_DAMAGE_EVENT_NONE);
				} else {
					messagePlayerError(client, `The ${getItemName(newHotBarItem)} in slot ${newHotBarSlot} has no ammo, and can't be equipped!`);
					return false;
				}
			} else if(getItemTypeData(getItemData(newHotBarItem).itemTypeIndex).useType == AG_ITEM_USETYPE_TAZER) {
				if(getItemData(newHotBarItem).value > 0) {
					givePlayerWeapon(client, toInteger(getItemTypeData(getItemData(newHotBarItem).itemTypeIndex).useId), toInteger(getItemData(newHotBarItem).value), true, true);
					setPlayerWeaponDamageEnabled(client, false);
					setPlayerWeaponDamageEvent(client, AG_WEAPON_DAMAGE_EVENT_TAZER);
				} else {
					messagePlayerError(client, `The ${getItemName(newHotBarItem)} in slot ${newHotBarSlot} has no ammo, and can't be equipped!`);
					return false;
				}
			}
		}
	}

	if(currentHotBarItem != -1 && newHotBarItem != -1) {
		// Player switches from item to item
		meActionToNearbyPlayers(client, `puts away ${getProperDeterminerForName(getItemName(currentHotBarItem))} ${getItemName(currentHotBarItem)} and pulls out ${getProperDeterminerForName(getItemName(newHotBarItem))} ${getItemName(newHotBarItem)}`);
	} else if(currentHotBarItem != -1 && newHotBarItem == -1) {
		// Player switches from item to none
		meActionToNearbyPlayers(client, `puts away ${getProperDeterminerForName(getItemName(currentHotBarItem))} ${getItemName(currentHotBarItem)}`);
	} else if(currentHotBarItem == -1 && newHotBarItem != -1) {
		// Player switches from none to item
		meActionToNearbyPlayers(client, `pulls out ${getProperDeterminerForName(getItemName(newHotBarItem))} ${getItemName(newHotBarItem)}`);
	} else {
		return false;
	}

	getPlayerData(client).activeHotBarSlot = newHotBarSlot;
	updatePlayerHotBar(client);
}

// ---------------------------------------------------------------------------

function playerSwitchHotBarSlotCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let hotBarSlot = toInteger(params);

	if(hotBarSlot < 0 || hotBarSlot > 9) {
		messagePlayerError(client, "Use slot number between 1 and 9, or 0 for none!");
		return false;
	}

	if(hotBarSlot == 0) {
		hotBarSlot = -1;
	} else {
		hotBarSlot = hotBarSlot-1;
	}

	if(getPlayerData(client).activeHotBarSlot == hotBarSlot) {
		return false;
	}

	if(getPlayerData(client).itemActionState != AG_ITEM_ACTION_NONE) {
		return false;
	}

	getPlayerData(client).itemActionItem = hotBarSlot;
	getPlayerData(client).itemActionState = AG_ITEM_ACTION_SWITCH;
	showPlayerItemSwitchDelay(client, hotBarSlot);

	clearPlayerItemActionStateAfterDelay(client, getGlobalConfig().itemActionStateReset);
}

// ---------------------------------------------------------------------------

function getClosestItemOnGround(position) {
	let items = getServerData().groundItemCache;
	let closest = 0;
	for(let i in items) {
		if(getDistance(getItemData(items[i]).position, position) <= getDistance(getItemData(items[closest]).position, position)) {
			closest = i;
		}
	}

	return items[closest];
}

// ---------------------------------------------------------------------------

function setItemDataIndexes() {
	for(let i in getServerData().items) {
		getServerData().items[i].index = i;
		getServerData().items[i].itemTypeIndex = getItemTypeIndexFromDatabaseId(getServerData().items[i].itemType);

		if(getServerData().items[i].ownerType == AG_ITEM_OWNER_GROUND) {
			getServerData().groundItemCache.push(i);
		}
	}
}

// ---------------------------------------------------------------------------

function createAllGroundItemObjects() {
	for(let i in getServerData().groundItemCache) {
		createGroundItemObject(i);
	}
}

// ---------------------------------------------------------------------------

function showItemInventoryToPlayer(client, itemIndex) {

}

// ---------------------------------------------------------------------------

function syncPlayerInventoryWeapons(client) {

}

// ---------------------------------------------------------------------------

function getPlayerFirstEmptyHotBarSlot(client) {
	for(let i in getPlayerData(client).hotBarItems) {
		if(getPlayerData(client).hotBarItems[i] == -1) {
			return i;
		}
	}

	return -1;
}

// ---------------------------------------------------------------------------

function cachePlayerHotBarItems(client) {
	for(let i in getServerData().items) {
		if(getItemData(i).ownerType == AG_ITEM_OWNER_PLAYER) {
			if(getItemData(i).ownerId == getPlayerCurrentSubAccount(client).databaseId) {
				let firstSlot = getPlayerFirstEmptyHotBarSlot(client);
				if(firstSlot != -1) {
					getPlayerData(client).hotBarItems[firstSlot] = i;
				}
			}
		}
	}
}

// ---------------------------------------------------------------------------

function deleteItem(itemId) {
	switch(getItemData(itemId).ownerType) {
		case AG_ITEM_OWNER_GROUND:
			deleteGroundItemObject(itemId);
			getServerData().groundItemCache.splice(getServerData().groundItemCache.indexOf(itemId), 1);
			break;

		case AG_ITEM_OWNER_PLAYER:
			if(getPlayerFromCharacterId(getItemData(itemId).ownerId)) {
				getPlayerData(getPlayerFromCharacterId(getItemData(itemId).ownerId)).hotBarItems[getPlayerData(getPlayerFromCharacterId(getItemData(itemId).ownerId)).hotBarItems.indexOf(itemId)] = -1;
				updatePlayerHotBar(getPlayerFromCharacterId(getItemData(itemId).ownerId));
			}
			break;

		case AG_ITEM_OWNER_JOBLOCKER:
			if(getPlayerFromCharacterId(getItemData(itemId).ownerId)) {
				getPlayerData(getPlayerFromCharacterId(getItemData(itemId).ownerId)).jobLockerCache.splice(getPlayerData(getPlayerFromCharacterId(getItemData(itemId).ownerId)).jobLockerCache.indexOf(itemId), 1);
			}
			break;

		case AG_ITEM_OWNER_LOCKER:
			if(getPlayerFromCharacterId(getItemData(itemId).ownerId)) {
				getPlayerData(getPlayerFromCharacterId(getItemData(itemId).ownerId)).lockerCache.splice(getPlayerData(getPlayerFromCharacterId(getItemData(itemId).ownerId)).lockerCache.indexOf(itemId), 1);
			}
			break;

		case AG_ITEM_OWNER_VEHTRUNK:
			if(getVehicleDataIndex(getItemData(itemId).ownerId)) {
				getVehicleDataIndex(getItemData(itemId).ownerId).trunkItemCache.splice(getVehicleDataIndex(getItemData(itemId).ownerId).trunkItemCache.indexOf(itemId), 1);
			}
			break;

		case AG_ITEM_OWNER_BIZFLOOR:
			if(getBusinessDataIndex(getItemData(itemId).ownerId)) {
				getBusinessDataIndex(getItemData(itemId).ownerId).floorItemCache.splice(getBusinessDataIndex(getItemData(itemId).ownerId).floorItemCache.indexOf(itemId), 1);
			}
			break;

		case AG_ITEM_OWNER_BIZSTORAGE:
			if(getBusinessDataIndex(getItemData(itemId).ownerId)) {
				getBusinessDataIndex(getItemData(itemId).ownerId).storageItemCache.splice(getBusinessDataIndex(getItemData(itemId).ownerId).storageItemCache.indexOf(itemId), 1);
			}
			break;

		case AG_ITEM_OWNER_HOUSE:
			if(getHouseDataIndex(getItemData(itemId).ownerId)) {
				getHouseDataIndex(getItemData(itemId).ownerId).itemCache.splice(getHouseDataIndex(getItemData(itemId).ownerId).itemCache.indexOf(itemId), 1);
			}
			break;

	}

	quickDatabaseQuery(`DELETE FROM item_main WHERE item_id = ${getItemData(itemId).databaseId}`);
	getServerData().items.splice(itemId, 1);
}

// ---------------------------------------------------------------------------

function getBestNewOwnerToPutItem(client) {
	let closestDistance = 100.0;
	let position = getPlayerPosition(client);

	let possibleHouse = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client));
	if(getHouseData(possibleHouse)) {
		return [AG_ITEM_OWNER_HOUSE, possibleHouse];
	}

	let possibleBusiness = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));
	if(getBusinessData(possibleBusiness)) {
		return [AG_ITEM_OWNER_BIZSTORAGE, possibleBusiness];
	}

	let possibleVehicle = getClosestVehicle(position);
	if(getDistance(getVehicleTrunkPosition(possibleVehicle), position) <= closestDistance) {
		return [AG_ITEM_OWNER_VEHTRUNK, possibleVehicle];
	}

	return [AG_ITEM_OWNER_NONE, 0];
}

// ---------------------------------------------------------------------------

function getBestItemToTake(client, slot) {
	let closestDistance = 100.0;
	let position = getPlayerPosition(client);
	let itemId = -1;
	let ownerType = AG_ITEM_OWNER_NONE;
	let ownerId = 0;

	let possibleHouse = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client));
	if(getHouseData(possibleHouse)) {
		if(typeof getHouseData(possibleHouse).itemCache[slot] != "undefined") {
			itemId = getHouseData(possibleHouse).itemCache[slot];
			ownerType = AG_ITEM_OWNER_HOUSE;
			ownerId = possibleHouse;
		}
	}

	let possibleBusiness = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));
	if(getBusinessData(possibleBusiness)) {
		if(typeof getBusinessData(possibleBusiness).floorItemCache[slot] != "undefined") {
			itemId = getBusinessData(possibleBusiness).floorItemCache[slot];
			ownerType = AG_ITEM_OWNER_BIZFLOOR;
			ownerId = possibleBusiness;
		}
	}

	let possibleVehicle = getClosestVehicle(position);
	if(getVehicleData(possibleVehicle)) {
		if(getDistance(getVehicleTrunkPosition(possibleVehicle), position) <= closestDistance) {
			if(typeof getVehicleData(possibleVehicle).trunkItemCache[slot] != "undefined") {
				itemId = getVehicleData(possibleVehicle).trunkItemCache[slot];
				ownerType = AG_ITEM_OWNER_VEHTRUNK;
				ownerId = possibleVehicle;
			}
		}
	}

	return [ownerType, ownerId, itemId];
}

// ---------------------------------------------------------------------------

function listPlayerInventoryCommand(command, params, client) {
	let itemDisplay = [];
	for(let i in getPlayerData(client).hotBarItems) {
		if(getPlayerData(client).hotBarItems[i] == -1) {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}: [#AAAAAA](Empty)`);
		} else {
			if(getGlobalConfig().weaponEquippableTypes.indexOf(getItemTypeData(getItemData(getPlayerData(client).hotBarItems[i]).itemTypeIndex).useType) != -1) {
				if(getPlayerData(client).hotBarItems[i] == getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem]) {
					if(getPlayerWeaponAmmo(client) <= getItemData(getPlayerData(client).hotBarItems[i]).value) {
						getItemData(getPlayerData(client).hotBarItems[i]).value = getPlayerWeaponAmmo(client);
					} else {
						setPlayerWeaponAmmo(client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[i]).itemTypeIndex).useId, getItemData(getPlayerData(client).hotBarItems[i]).value);
					}
				}
			}

			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}: [#AAAAAA]${getItemTypeData(getItemData(getPlayerData(client).hotBarItems[i]).itemTypeIndex).name}[${getItemValueDisplayForItem(getPlayerData(client).hotBarItems[i])}]`);
		}
	}

	messagePlayerNormal(client, `🎒 [#AAAAAA]== Your Inventory =========================`);
	let perChunk=5;
	let splitItemDisplay = itemDisplay.reduce((all,one,i) => {
		const ch = Math.floor(i/perChunk);
		all[ch] = [].concat((all[ch]||[]),one);
		return all
	}, []);

	for(let i = 0 ; i <= splitItemDisplay.length-1 ; i++) {
		messagePlayerNormal(client, splitItemDisplay[i].join("[#FFFFFF], "), COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

function listBusinessStorageInventoryCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	if(!getBusinessData(businessId).locked) {
		messagePlayerError(client, "This business is closed!");
		return false;
	}

	let itemDisplay = [];
	for(let i in getBusinessData(businessId).storageItemCache[i]) {
		if(getBusinessData(businessId).storageItemCache[i] == -1) {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}[#AAAAAA](Empty)`);
		} else {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}: [#AAAAAA]${getItemTypeData(getItemData(getBusinessData(businessId).storageItemCache[i]).itemTypeIndex).name}[${getItemValueDisplayForItem(getBusinessData(businessId).storageItemCache[i])}]`);
		}
	}

	messagePlayerNormal(client, `🏢 [#0099FF]== Business Storage =======================`);
	let perChunk=5;
	let splitItemDisplay = itemDisplay.reduce((all,one,i) => {
		const ch = Math.floor(i/perChunk);
		all[ch] = [].concat((all[ch]||[]),one);
		return all
	}, []);

	for(let i = 0 ; i <= splitItemDisplay.length-1 ; i++) {
		messagePlayerNormal(client, splitItemDisplay[i].join("[#FFFFFF], "), COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

function listBusinessFloorInventoryCommand(command, params, client) {
	let businessId = (isPlayerInAnyBusiness(client)) ? getPlayerBusiness(client) : getClosestBusinessEntrance(getPlayerPosition(client));

	if(!getBusinessData(businessId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	if(!getBusinessData(businessId).locked) {
		messagePlayerError(client, "This business is closed!");
		return false;
	}

	let itemDisplay = [];
	for(let i in getBusinessData(businessId).floorItemCache[i]) {
		if(getBusinessData(businessId).floorItemCache[i] == -1) {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}[#AAAAAA](Empty)`);
		} else {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}: [#AAAAAA]${getItemTypeData(getItemData(getBusinessData(businessId).floorItemCache[i]).itemTypeIndex).name}[${getItemValueDisplayForItem(getBusinessData(businessId).floorItemCache[i])}]`);
		}
	}

	messagePlayerNormal(client, `🏢 [#0099FF]== Business Items =========================`);
	let perChunk=5;
	let splitItemDisplay = itemDisplay.reduce((all,one,i) => {
		const ch = Math.floor(i/perChunk);
		all[ch] = [].concat((all[ch]||[]),one);
		return all
	}, []);

	for(let i = 0 ; i <= splitItemDisplay.length-1 ; i++) {
		messagePlayerNormal(client, splitItemDisplay[i].join("[#FFFFFF], "), COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

function listHouseInventoryCommand(command, params, client) {
	let houseId = (isPlayerInAnyHouse(client)) ? getPlayerHouse(client) : getClosestHouseEntrance(getPlayerPosition(client));

	if(!getHouseData(houseId)) {
		messagePlayerError(client, "House not found!");
		return false;
	}

	if(!getHouseData(houseId).locked) {
		messagePlayerError(client, "This house is locked!");
		return false;
	}

	let itemDisplay = [];
	for(let i in getHouseData(houseId).itemCache[i]) {
		if(getHouseData(houseId).itemCache[i] == -1) {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}[#AAAAAA](Empty)`);
		} else {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}: [#AAAAAA]${getItemTypeData(getItemData(getHouseData(houseId).itemCache[i]).itemTypeIndex).name}[${getItemValueDisplayForItem(getBusinessData(houseId).itemCache[i])}]`);
		}
	}

	messagePlayerNormal(client, `🏠 [#11CC11]== House Items ============================`);
	let perChunk=5;
	let splitItemDisplay = itemDisplay.reduce((all,one,i) => {
		const ch = Math.floor(i/perChunk);
		all[ch] = [].concat((all[ch]||[]),one);
		return all
	 }, []);

	for(let i = 0 ; i <= splitItemDisplay.length-1 ; i++) {
		messagePlayerNormal(client, splitItemDisplay[i].join("[#FFFFFF], "), COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

function listItemInventoryCommand(command, params, client) {
	let itemId = getClosestItemOnGround(getPlayerPosition(client));

	if(getDistance(getPlayerPosition(client), getItemData(itemId).position) > getGlobalConfig().droppedItemPickupRange) {
		messagePlayerError(client, `You're too far away!`);
		return false;
	}

	if(getItemTypeData(getItemData(getItemData(itemId).itemCache[i]).itemTypeIndex).useType != AG_ITEM_USETYPE_STORAGE) {
		messagePlayerError(client, "This item can't hold anything!");
		return false;
	}

	let itemDisplay = [];
	for(let i in getItemData(itemId).itemCache[i]) {
		if(getItemData(itemId).itemCache[i] == -1) {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}[#AAAAAA](Empty)`);
		} else {
			itemDisplay.push(`[#CCCCCC]${toInteger(i)+1}: [#AAAAAA]${getItemTypeData(getItemData(getItemData(itemId).itemCache[i]).itemTypeIndex).name}[${getItemValueDisplayForItem(getItemData(itemId).itemCache[i])}]`);
		}
	}

	messagePlayerNormal(client, `📦 [#AAAAAA]== Items Inside ===========================`);
	let perChunk=5;
	let splitItemDisplay = itemDisplay.reduce((all,one,i) => {
		const ch = Math.floor(i/perChunk);
		all[ch] = [].concat((all[ch]||[]),one);
		return all
	 }, []);

	for(let i = 0 ; i <= splitItemDisplay.length-1 ; i++) {
		messagePlayerNormal(client, splitItemDisplay[i].join("[#FFFFFF], "), COLOUR_WHITE);
	}
}

// ---------------------------------------------------------------------------

function getItemData(itemId) {
	return getServerData().items[itemId];
}

// ---------------------------------------------------------------------------

function getItemTypeData(itemTypeId) {
	return getServerData().itemTypes[itemTypeId];
}

// ---------------------------------------------------------------------------

function saveAllItemsToDatabase() {
	for(let i in getServerData().items) {
		if(getServerData().items[i].needsSaved) {
			saveItemToDatabase(i);
		}
	}
}

// ---------------------------------------------------------------------------

function saveItemToDatabase(itemId) {
	let tempItemData = getServerData().items[itemId];
	logToConsole(LOG_DEBUG, `[Asshat.Item]: Saving item '${itemId}' to database ...`);
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		if(tempItemData.databaseId == 0) {
			let dbQueryString = `INSERT INTO item_main (item_server, item_type, item_owner_type, item_owner_id, item_value, item_amount, item_pos_x, item_pos_y, item_pos_z, item_int, item_vw) VALUE (${getServerId()}, ${tempItemData.itemType}, ${tempItemData.ownerType}, ${tempItemData.ownerId}, ${tempItemData.value}, ${tempItemData.amount}, ${tempItemData.position.x},${tempItemData.position.y}, ${tempItemData.position.z}, ${tempItemData.interior}, ${tempItemData.dimension})`;
			queryDatabase(dbConnection, dbQueryString);
			getServerData().items[itemId].databaseId = getDatabaseInsertId(dbConnection);
		} else {
			let dbQueryString = `UPDATE item_main SET item_server=${getServerId()}, item_type=${tempItemData.itemType}, item_owner_type=${tempItemData.ownerType}, item_owner_id=${tempItemData.ownerId}, item_value=${tempItemData.value}, item_amount=${tempItemData.amount}, item_pos_x=${tempItemData.position.x}, item_pos_y=${tempItemData.position.y}, item_pos_z=${tempItemData.position.z}, item_int=${tempItemData.interior}, item_vw=${tempItemData.dimension}`;
			queryDatabase(dbConnection, dbQueryString);
		}
		disconnectFromDatabase(dbConnection);
		logToConsole(LOG_DEBUG, `[Asshat.Item]: Saved item '${tempItemData.name}' to database!`);
		return true;
	}

	return false;
}

// ---------------------------------------------------------------------------

function storePlayerItemsInJobLocker(client) {
	for(let i in getPlayerData(client).hotBarItems) {
		if(getPlayerData(client).hotBarItems[i] != -1) {
			getPlayerData(client).jobLockerCache[i] = getPlayerData(client).hotBarItems[i];
			getPlayerData(client).hotBarItems[i] = -1;
		}
	}

	updatePlayerHotBar(client);
}

// ---------------------------------------------------------------------------

function restorePlayerJobLockerItems(client) {
	for(let i in getPlayerData(client).jobEquipmentCache) {
		if(getPlayerData(client).jobEquipmentCache[i] != -1) {
			deleteItem(getPlayerData(client).jobEquipmentCache[i]);
		}
	}

	for(let i in getPlayerData(client).jobLockerCache) {
		if(getPlayerData(client).jobLockerCache[i] != -1) {
			getPlayerData(client).hotBarItems[i] = getPlayerData(client).jobLockerCache[i];
			getPlayerData(client).jobLockerCache[i] = -1;
		}
	}

	updatePlayerHotBar(client);
}

// ---------------------------------------------------------------------------

function getItemTypeIndexFromDatabaseId(databaseId) {
	for(let i in getServerData().itemTypes) {
		if(getServerData().itemTypes[i].databaseId == databaseId) {
			return i;
		}
	}
}

// ---------------------------------------------------------------------------

function playerItemActionDelayComplete(client) {
    switch(getPlayerData(client).itemActionState) {
        case AG_ITEM_ACTION_USE:
            playerUseItem(client, getPlayerData(client).itemActionItem);
            break;

        case AG_ITEM_ACTION_DROP:
            playerDropItem(client, getPlayerData(client).itemActionItem);
            break;

        case AG_ITEM_ACTION_TAKE:
            playerTakeItem(client, getPlayerData(client).itemActionItem);
            break;

        case AG_ITEM_ACTION_PUT:
            playerPutItem(client, getPlayerData(client).itemActionItem);
            break;

        case AG_ITEM_ACTION_PICKUP:
            playerPickupItem(client, getPlayerData(client).itemActionItem);
            break;

        case AG_ITEM_ACTION_SWITCH:
            playerSwitchItem(client, getPlayerData(client).itemActionItem);
            break;
    }

    getPlayerData(client).itemActionState = AG_ITEM_ACTION_NONE;
    getPlayerData(client).itemActionItem = -1;
}

// ---------------------------------------------------------------------------

function getItemValueDisplayForItem(itemId) {
	return getItemValueDisplay(getItemData(itemId).itemTypeIndex, getItemData(itemId).value);
}

// ---------------------------------------------------------------------------

function getItemValueDisplay(itemType, value) {
	if(getItemTypeData(itemType).useType == AG_ITEM_USETYPE_SKIN) {
		return getSkinNameFromId(value);
	} else if(getItemTypeData(itemType).useType == AG_ITEM_USETYPE_FOOD || getItemTypeData(itemType).useType == AG_ITEM_USETYPE_DRINK || getItemTypeData(itemType).useType == AG_ITEM_USETYPE_EXTINGUISHER || getItemTypeData(itemType).useType == AG_ITEM_USETYPE_SPRAYPAINT || getItemTypeData(itemType).useType == AG_ITEM_USETYPE_PEPPERSPRAY) {
		return getPercentage(toString(value), getItemTypeData(itemType).capacity)+"%";
	} else if(getItemTypeData(itemType).useType == AG_ITEM_USETYPE_PHONE) {
		return toString(value);
	} else if(getItemTypeData(itemType).useType == AG_ITEM_USETYPE_WEAPON || getItemTypeData(itemType).useType == AG_ITEM_USETYPE_TAZER) {
		return toString(value)+" rounds";
	} else if(getItemTypeData(itemType).useType == AG_ITEM_USETYPE_WALKIETALKIE) {
		return toString(toString(value).slice(0,-2)+"."+toString(value).slice(-1)+"MHz");
	} else {
		return value;
	}
	return "unknown";
}

// ---------------------------------------------------------------------------

function getPlayerFirstItemSlotByUseType(client, useType) {
	for(let i in getPlayerData(client).hotBarItems) {
		if(getPlayerData(client).hotBarItems[i] != -1) {
			if(getItemData(getPlayerData(client).hotBarItems[i])) {
				if(getItemTypeData(getItemData(getPlayerData(client).hotBarItems[i]).itemTypeIndex).useType == useType) {
					return i;
				}
			}
		}
	}

	return -1;
}

// ---------------------------------------------------------------------------

function toggleItemEnabledCommand(command, params, client) {
	if(!getPlayerActiveItem(client)) {
		messagePlayerError(client, `You aren't holding anything!`);
		return false;
	}

	if(!getItemData(getPlayerActiveItem(client))) {
		messagePlayerError(client, `You aren't holding anything!`);
		return false;
	}

	getItemData(getPlayerActiveItem(client)).enabled = !getItemData(getPlayerActiveItem(client)).enabled;
	messagePlayerNormal(client, `You turned ${getBoolRedGreenInlineColour(getItemData(itemIndex).enabled)}${toUpperCase(getOnOffFromBool(getItemData(itemIndex).enabled))} [#FFFFFF]your ${getItemName(getPlayerActiveItem(client))} in slot ${getPlayerActiveItemSlot(client)} [#AAAAAA](${getItemValueDisplayForItem(getPlayerActiveItem(client))}`)
}

// ---------------------------------------------------------------------------

function getItemName(itemId) {
	if(getItemData(itemId)) {
		return getItemTypeData(getItemData(itemId).itemTypeIndex).name;
	}
}

// ---------------------------------------------------------------------------

function getPlayerActiveItem(client) {
	if(getPlayerData(client).activeHotBarSlot != -1) {
		if(getPlayerData(client).hotBarItems[getPlayerData(client).activeHotBarSlot] != -1) {
			return getPlayerData(client).hotBarItems[getPlayerData(client).activeHotBarSlot];
		}
	}
}

// ---------------------------------------------------------------------------

function getPlayerItemSlot(client, slot) {
	if(slot != -1) {
		if(getPlayerData(client).hotBarItems[slot] != -1) {
			return getPlayerData(client).hotBarItems[slot];
		}
	}
}

// ---------------------------------------------------------------------------

function resyncWeaponItemAmmo(client) {
	if(getPlayerData(client).currentHotBarItem != -1) {
		if(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem] != -1) {
			if(getItemData(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem])) {
				if(getGlobalConfig().weaponEquippableTypes.indexOf(getItemTypeData(getItemData(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem]).itemTypeIndex).useType)) {
					if(getPlayerWeaponAmmo(client) <= getItemData(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem]).value) {
						getItemData(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem]).value = getPlayerWeaponAmmo(client);
					} else {
						setPlayerWeaponAmmo(client, getItemTypeData(getItemData(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem]).itemTypeIndex).useId, getItemData(getPlayerData(client).hotBarItems[getPlayerData(client).currentHotBarItem]).value);
					}
				}
			}
		}
	}
}

// ---------------------------------------------------------------------------

function getOrderPriceForItemType(itemType) {
	return getItemTypeData(itemType).orderPrice*getServerConfig().inflationMultiplier*getItemTypeData(itemType).demandMultiplier*getItemTypeData(itemType).supplyMultiplier*getItemTypeData(itemType).riskMultiplier;
}

// ---------------------------------------------------------------------------

function clearPlayerItemActionState(client) {
	getPlayerData(client).itemActionState = AG_ITEM_ACTION_NONE;
}

// ---------------------------------------------------------------------------

function clearPlayerItemActionStateAfterDelay(client, delay) {
	setTimeout(function() {
		clearPlayerItemActionState(client);
	}, delay);
}

// ---------------------------------------------------------------------------