// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: translate.js
// DESC: Provides translation functions
// TYPE: Server (JavaScript)
// ===========================================================================

// ---------------------------------------------------------------------------

function translateMessage(messageText, fromLanguageId, toLanguageId) {
	let translatedText = "";
	
	let thisTranslationURL = formatTranslationURL(messageText, fromLanguageId, toLanguageId);
	httpGet(
		thisTranslationURL,
		"",
		function(data) {
			data = toString(data).substr(0, toString(data).lastIndexOf("}")+1);
			let translationData = JSON.parse(data);
			//this.translatedText = translationData.responseData.translatedText;
			addTranslationToCache(messageText, translationData.responseData.translatedText, fromLanguageId, toLanguageId);
			return translationData.responseData.translatedText;
		},
		function(data) {
		}
	);
	
	return this.translatedText;
}

// ---------------------------------------------------------------------------

function addTranslationToCache(originalText, translatedText, fromLanguageId, toLanguageId) {
	getServerData().translation.cache[fromLanguageId][toLanguageId].push([originalText, translatedText]);
	return true;
}

// ---------------------------------------------------------------------------

function formatTranslationURL(originalText, fromLanguageId, toLanguageId) {
	return getServerData().translation.translationBaseURL.format(encodeURI(originalText), getLanguageShortCode(fromLanguageId), getLanguageShortCode(toLanguageId));
}

// ---------------------------------------------------------------------------

function getLanguageShortCode(languageId) {
	return getServerData().translation.languages[languageId][1];
}

// ---------------------------------------------------------------------------

function getLanguageFullName(languageId) {
	return getServerData().translation.languages[languageId][0];
}

// ---------------------------------------------------------------------------

function getLanguageIdFromFullName(languageName) {
	let languages = getServerData().translation.languages;
	for(let i in languages) {
		if(languages[i][0] == languageName) {
			return i;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------

function getLanguageIdFromShortCode(languageShortCode) {
	let languages = getServerData().translation.languages;
	for(let i in languages) {
		if(languages[i][1] == languageShortCode) {
			return i;
		}
	}
	return false;
}

// ---------------------------------------------------------------------------