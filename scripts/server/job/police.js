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
    if(!canPlayerUseJobs(client)) { 
        messageClientError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUsePoliceJob(client)) { 
        messageClientError(client, "You are not allowed to use the police job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messageClientError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_POLICE)) {
        messageClientError(client, "You don't have a police job.");
        return false;
    }

	return true;
}

// ---------------------------------------------------------------------------

function policeCuffCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) { 
        messageClientError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUsePoliceJob(client)) { 
        messageClientError(client, "You are not allowed to use the police job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messageClientError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_POLICE)) {
        messageClientError(client, "You don't have a police job.");
        return false;
    }   

	return true;
}

// ---------------------------------------------------------------------------

function policeArrestCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) { 
        messageClientError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUsePoliceJob(client)) { 
        messageClientError(client, "You are not allowed to use the police job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messageClientError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_POLICE)) {
        messageClientError(client, "You don't have a police job.");
        return false;
    } 

	return true;
}

// ---------------------------------------------------------------------------

function policeSearchCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) { 
        messageClientError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUsePoliceJob(client)) { 
        messageClientError(client, "You are not allowed to use the police job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messageClientError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_POLICE)) {
        messageClientError(client, "You don't have a police job.");
        return false;
    }   

	return true;
}

// ---------------------------------------------------------------------------

function policeDragCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) { 
        messageClientError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUsePoliceJob(client)) { 
        messageClientError(client, "You are not allowed to use the police job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messageClientError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_POLICE)) {
        messageClientError(client, "You don't have a police job.");
        return false;
    }      

	return true;
}

// ---------------------------------------------------------------------------

function policeDetainCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) { 
        messageClientError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUsePoliceJob(client)) { 
        messageClientError(client, "You are not allowed to use the police job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messageClientError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_POLICE)) {
        messageClientError(client, "You don't have a police job.");
        return false;
    } 

	return true;
}

// ---------------------------------------------------------------------------