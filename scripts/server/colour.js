// ===========================================================================
// Asshat Gaming RP
// http://asshatgaming.com
// © 2020 Asshat Gaming 
// ---------------------------------------------------------------------------
// FILE: colour.js
// DESC: Provides colours, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

// ----------------------------------------------------------------------------

function getColourByType(typeName) {
	return serverConfig.colour.byType[typeName];
}

// ----------------------------------------------------------------------------

function getColourByName(colourName) {
	return serverConfig.colour.byName[colourName];
}

// ---------------------------------------------------------------------------

function rgbToHex(red, green, blue) {
    return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

// ---------------------------------------------------------------------------

function componentToHex(component) {
    let hex = component.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// ---------------------------------------------------------------------------

function hexToRGB(hex) {
	let red = parseInt((cutHex(hex)).substring(0,2),16);
	let green = parseInt((cutHex(hex)).substring(2,4),16);
	let blue = parseInt((cutHex(hex)).substring(4,6),16);

	return {r: red, g: green, b: blue};
}

// ---------------------------------------------------------------------------

function cutHex(hex) {
	return (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;
}

// ---------------------------------------------------------------------------