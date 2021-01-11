// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: accent.js
// DESC: Provides accent functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let accents = [
    "English",
	"French",
	"Russian",
	"Scottish",
	"Irish",
	"Spanish",
	"Southern American",
	"Italian",
	"Australian",
	"Jamaican",
	"Israeli",
	"Dutch",
	"Brazilian",
	"Portuguese",
	"German",
	"Canadian",
	"Chinese",
	"Japanese",
	"Turkish",
	"Korean",
	"Estonian",
	"Sicilian",
];

// ---------------------------------------------------------------------------

function getPlayerAccentText(client) {
    return getPlayerCurrentSubAccount(client).accent;
}

// ---------------------------------------------------------------------------