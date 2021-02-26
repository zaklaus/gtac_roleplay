// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: email.js
// DESC: Provides email handling, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initEmailScript() {
	logToConsole(LOG_DEBUG, "[Asshat.Email]: Initializing email script ...");

	let emailConfigFile = loadTextFile("config/email.json");
	emailConfig = JSON.parse(emailConfigFile);

	logToConsole(LOG_DEBUG, "[Asshat.Email]: Email script initialized successfully!");
}

// -------------------------------------------------------------------------

function sendEmail(toEmail, toName, subject, body) {
    module.smtp.send(
        emailConfig.host,
        emailConfig.port,
        emailConfig.useTLS,
        emailConfig.username,
        emailConfig.password,
        toEmail,
        toName,
        subject,
        body,
        emailConfig.from,
        emailConfig.fromName);
}

// -------------------------------------------------------------------------