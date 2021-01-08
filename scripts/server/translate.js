// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: translate.js
// DESC: Provides translation functions
// TYPE: Server (JavaScript)
// ===========================================================================

let translationBaseURL = `http://api.mymemory.translated.net/get?de=example@example.com&q={0}&langpair={1}|{2}`;

let translationLanguages = [
	["Abkhazian", "AB"],
	["Afar", "AA"],
	["Afrikaans", "AF"],
	["Albanian", "SQ"],
	["Amharic", "AM"],
	["Arabic", "AR"],
	["Armenian", "HY"],
	["Assamese", "AS"],
	["Aymara", "AY"],
	["Azerbaijani", "AZ"],
	["Bashkir", "BA"],
	["Basque", "EU"],
	["Bengali, Bangla", "BN"],
	["Bhutani", "DZ"],
	["Bihari", "BH"],
	["Bislama", "BI"],
	["Breton", "BR"],
	["Bulgarian", "BG"],
	["Burmese", "MY"],
	["Byelorussian", "BE"],
	["Cambodian", "KM"],
	["Catalan", "CA"],
	["Chinese", "ZH"],
	["Corsican", "CO"],
	["Croatian", "HR"],
	["Czech", "CS"],
	["Danish", "DA"],
	["Dutch", "NL"],
	["English", "EN"],
	["Esperanto", "EO"],
	["Estonian", "ET"],
	["Faeroese", "FO"],
	["Fiji", "FJ"],
	["Finnish", "FI"],
	["French", "FR"],
	["Frisian", "FY"],
	["Gaelic (Scots Gaelic)", "GD"],
	["Galician", "GL"],
	["Georgian", "KA"],
	["German", "DE"],
	["Greek", "EL"],
	["Greenlandic", "KL"],
	["Guarani", "GN"],
	["Gujarati", "GU"],
	["Hausa", "HA"],
	["Hebrew", "IW"],
	["Hindi", "HI"],
	["Hungarian", "HU"],
	["Icelandic", "IS"],
	["Indonesian", "IN"],
	["Interlingua", "IA"],
	["Interlingue", "IE"],
	["Inupiak", "IK"],
	["Irish", "GA"],
	["Italian", "IT"],
	["Japanese", "JA"],
	["Javanese", "JW"],
	["Kannada", "KN"],
	["Kashmiri", "KS"],
	["Kazakh", "KK"],
	["Kinyarwanda", "RW"],
	["Kirghiz", "KY"],
	["Kirundi", "RN"],
	["Korean", "KO"],
	["Kurdish", "KU"],
	["Laothian", "LO"],
	["Latin", "LA"],
	["Latvian, Lettish", "LV"],
	["Lingala", "LN"],
	["Lithuanian", "LT"],
	["Macedonian", "MK"],
	["Malagasy", "MG"],
	["Malay", "MS"],
	["Malayalam", "ML"],
	["Maltese", "MT"],
	["Maori", "MI"],
	["Marathi", "MR"],
	["Moldavian", "MO"],
	["Mongolian", "MN"],
	["Nauru", "NA"],
	["Nepali", "NE"],
	["Norwegian", "NO"],
	["Occitan", "OC"],
	["Oriya", "OR"],
	["Oromo, Afan", "OM"],
	["Pashto, Pushto", "PS"],
	["Persian", "FA"],
	["Polish", "PL"],
	["Portuguese", "PT"],
	["Punjabi", "PA"],
	["Quechua", "QU"],
	["Rhaeto-Romance", "RM"],
	["Romanian", "RO"],
	["Russian", "RU"],
	["Samoan", "SM"],
	["Sangro", "SG"],
	["Sanskrit", "SA"],
	["Serbian", "SR"],
	["Serbo-Croatian", "SH"],
	["Sesotho", "ST"],
	["Setswana", "TN"],
	["Shona", "SN"],
	["Sindhi", "SD"],
	["Singhalese", "SI"],
	["Siswati", "SS"],
	["Slovak", "SK"],
	["Slovenian", "SL"],
	["Somali", "SO"],
	["Spanish", "ES"],
	["Sudanese", "SU"],
	["Swahili", "SW"],
	["Swedish", "SV"],
	["Tagalog", "TL"],
	["Tajik", "TG"],
	["Tamil", "TA"],
	["Tatar", "TT"],
	["Tegulu", "TE"],
	["Thai", "TH"],
	["Tibetan", "BO"],
	["Tigrinya", "TI"],
	["Tonga", "TO"],
	["Tsonga", "TS"],
	["Turkish", "TR"],
	["Turkmen", "TK"],
	["Twi", "TW"],
	["Ukrainian", "UK"],
	["Urdu", "UR"],
	["Uzbek", "UZ"],
	["Vietnamese", "VI"],
	["Volapuk", "VO"],
	["Welsh", "CY"],
	["Wolof", "WO"],
	["Xhosa", "XH"],
	["Yiddish", "JI"],
	["Yoruba", "YO"],
	["Zulu", "ZU"]
],

translationCache = [];

// ---------------------------------------------------------------------------

async function translateMessage(messageText, translateFrom = defaultLanguageId, translateTo = defaultLanguageId) {
	if(translateFrom == translateTo) {
		return messageText;
	}

	return new Promise(resolve => {
		for(let i in translationCache[translateFrom][translateTo]) {
			if(translationCache[translateFrom][translateTo][0] == messageText) {
				logToConsole(LOG_DEBUG, `[Translate]: Using existing translation for ${translationLanguages[translateFrom][0]} to ${translationLanguages[translateTo][0]} - (${messageText}), (${translationCache[translateFrom][translateTo][1]})`);
				resolve(translationCache[translateFrom][translateTo][1]);
			}
		}

		let thisTranslationURL = translateURL.format(encodeURI(messageText), translationLanguages[translateFrom][1], translationLanguages[translateTo][1], scriptConfig.translatorEmailAddress);
		httpGet(
			thisTranslationURL,
			"",
			function(data) {
				data = String(data).substr(0, String(data).lastIndexOf("}")+1);
				let translationData = JSON.parse(data);
				translationCache[translateFrom][translateTo].push([messageText, translationData.responseData.translatedText]);
				resolve(translationData.responseData.translatedText);
			},
			function(data) {
			}
		);
	});
}

// ---------------------------------------------------------------------------

function addTranslationToCache(originalText, translatedText, fromLanguageId, toLanguageId) {
	translationCache[fromLanguageId][toLanguageId].push([originalText, translatedText]);
	return true;
}

// ---------------------------------------------------------------------------

function formatTranslationURL(originalText, fromLanguageId, toLanguageId) {
	return getServerData().translation.translationBaseURL.format(encodeURI(originalText), getLanguageShortCode(fromLanguageId), getLanguageShortCode(toLanguageId));
}

// ---------------------------------------------------------------------------

function getLanguageShortCode(languageId) {
	return translationLanguages[languageId][1];
}

// ---------------------------------------------------------------------------

function getLanguageFullName(languageId) {
	return translationLanguages[languageId][0];
}

// ---------------------------------------------------------------------------

function getLanguageIdFromFullName(languageName) {
	let languages = translationLanguages;
	for(let i in languages) {
		if(languages[i][0] == languageName) {
			return i;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function getLanguageIdFromShortCode(languageShortCode) {
	let languages = translationLanguages;
	for(let i in languages) {
		if(languages[i][1] == languageShortCode) {
			return i;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------