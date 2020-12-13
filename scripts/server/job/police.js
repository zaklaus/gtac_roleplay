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


	return true;
}

// ---------------------------------------------------------------------------

function policeCuffCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }


	return true;
}

// ---------------------------------------------------------------------------

function policeArrestCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }


	return true;
}

// ---------------------------------------------------------------------------

function policeSearchCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }


	return true;
}

// ---------------------------------------------------------------------------

function policeDragCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }


	return true;
}

// ---------------------------------------------------------------------------

function policeDetainCommand(command, params, client) {
    if(!canClientUseJobs(client) || !!canClientUsePoliceJob(client)) { 
        return false;
    }


	return true;
}

// ---------------------------------------------------------------------------