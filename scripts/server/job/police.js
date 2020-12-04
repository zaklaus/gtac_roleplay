// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: police.js
// DESC: Provides police officer job functions and usage
// TYPE: Job (JavaScript)
// ===========================================================================

function policeTazerCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)){ 
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function policeCuffCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function policeArrestCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function policeSearchCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function policeDragCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------

function policeDetainCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }

	if(doesCommandRequireLogin(command)) {
		if(!isClientLoggedIn(client)) {
			messageClientError(client, "You are not logged in!");
			return false;
		}
	}

	if(isClientFromDiscord(client)) {
		if(!isCommandAllowedOnDiscord(command)) {
			messageClientError(client, "That command isn't available on discord!");
			return false;
		}		
	}	

	if(!doesClientHaveStaffPermission(client, getCommandRequiredPermissions(command))) {
		messageClientError(client, "You do not have permission to use this command!");
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------------