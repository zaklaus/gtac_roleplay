// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: v.js
// DESC: Provides shared utilities
// TYPE: Shared (JavaScript)
// ===========================================================================

let bindableKeys = {
    8: "backspace",
    9: "tab",
    13: "return",
    27: "escape",
    32: "space",
    33: "exclamation",
    34: "doublequote",
    35: "hashtag",
    36: "dollar",
    37: "percent",
    38: "ampersand",
    39: "quote",
    40: "leftparenthesis",
    41: "rightparenthesis",
    42: "asterisk",
    43: "plus",
    44: "comma",
    45: "minus",
    46: "period",
    47: "slash",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    58: "colon",
    59: "semicolon",
    60: "less",
    61: "equals",
    62: "greater",
    63: "questionmark",
    64: "at",
    91: "leftbracket",
    92: "backslash",
    93: "rightbracket",
    95: "underscore",
    97: "a",
    98: "b",
    99: "c",
    100: "d",
    101: "e",
    102: "f",
    103: "g",
    104: "h",
    105: "i",
    106: "j",
    107: "k",
    108: "l",
    109: "m",
    110: "n",
    111: "o",
    112: "p",
    113: "q",
    114: "r",
    115: "s",
    116: "t",
    117: "u",
    118: "v",
    119: "w",
    120: "x",
    121: "y",
    122: "z",
    127: "delete",
    1073741881: "capslock",
    1073741882: "f12",
    1073741883: "f2",
    1073741884: "f3",
    1073741885: "f4",
    1073741886: "f5",
    1073741887: "f6",
    1073741888: "f7",
    1073741889: "f8",
    1073741890: "f9",
    1073741891: "f10",
    1073741892: "f11",
    1073741893: "f12",
    1073741894: "printscreen",
    1073741895: "scrolllock",
    1073741896: "pause",
    1073741897: "insert",
    1073741898: "home",
    1073741899: "pageup",
    1073741901: "end",
    1073741902: "pagedown",
    1073741903: "right",
    1073741904: "left",
    1073741905: "down",
    1073741906: "up",
    1073741908: "numdivide",
    1073741909: "nummultiply",
    1073741910: "numminus",
    1073741911: "numplus",
    1073741912: "numenter",
    1073741913: "num1",
    1073741914: "num2",
    1073741915: "num3",
    1073741916: "num4",
    1073741917: "num5",
    1073741918: "num6",
    1073741919: "num7",
    1073741920: "num8",
    1073741921: "num9",
    1073741922: "num0",
    1073741923: "numperiod",
    1073742048: "leftctrl",
    1073742049: "leftshift",
    1073742050: "leftalt",
    1073742052: "rightctrl",
    1073742053: "rightshift",
    1073742054: "rightalt",
};

// ===========================================================================

function makeLargeNumberReadable(num) {
	return new Number(num).toLocaleString("en-US");
}

// ===========================================================================

function getKeyIdFromParams(params) {
    let tempParams = toLowerCase(toString(params));

    //let sdlName = sdl.getKeyFromName(tempParams);
    //if(sdlName != null) {
    //    return sdlName;
    //}

    for(let i in bindableKeys) {
        if(toLowerCase(bindableKeys[i]) == toLowerCase(tempParams)) {
            return i;
        }
    }
}

// ===========================================================================

function getKeyNameFromId(params) {
    return bindableKeys[toInteger(params)];
}

// ===========================================================================

function and(var1, var2) {
	return (var1 && var2);
}

// ===========================================================================

function or(var1, var2) {
	return (var1 || var2);
}

// ===========================================================================

function not(var1) {
	return !var1;
}

// ===========================================================================

function bitAnd(var1, var2) {
	return var1 & var2;
}

// ===========================================================================

function bitOr(var1, var2) {
	return var1 | var2;
}

// ===========================================================================

function bitXor(var1, var2) {
	return var1 ^ var2;
}

// ===========================================================================

function bitNot(var1) {
	return ~var1;
}

// ===========================================================================

function bitLeftShift(var1, var2) {
	return var1 << var2;
}

// ===========================================================================

function bitRightShift(var1, var2) {
	return var1 >> var2;
}

// ===========================================================================

function greaterThan(var1, var2) {
	return var1 > var2;
}

// ===========================================================================

function lessThan(var1, var2) {
	return (var1 < var2);
}

// ===========================================================================

function greaterThanOrEqualTo(var1, var2) {
	return (var1 >= var2);
}

// ===========================================================================

function lessThanOrEqualTo(var1, var2) {
	return (var1 <= var2);
}

// ===========================================================================

function equals(var1, var2) {
	return (var1 == var2);
}

// ===========================================================================

function modulo(var1, var2) {
	return var1 % var2;
}

// ===========================================================================

function add(...args) {
	return args.reduce((acc, a) => {
		return acc + a;
	}, 0);
}

// ===========================================================================

function subtract(...args) {
	return args.reduce((acc, a) => {
		return acc - a;
	}, 0);
}

// ===========================================================================

function multiply(...args) {
	return args.reduce((acc, a) => {
		return acc * a;
	}, 0);
}

// ===========================================================================

function divide(...args) {
	return args.reduce((acc, a) => {
		return acc / a;
	}, 0);
}

// ===========================================================================

function toArray(...args) {
	return args;
}

// ===========================================================================

function toInteger(val) {
	return Number(val);
}

// ===========================================================================

function toFloat(val, fixed = 2) {
	return parseFloat(val);
}

// ===========================================================================

function toString(val) {
	return String(val);
}

// ===========================================================================

function toVector3(x, y, z) {
	return new Vec3(toFloat(x), toFloat(y), toFloat(z));
}

// ===========================================================================

function toVector2(x, y) {
	return new Vec2(x, y);
}

// ===========================================================================

function toUpperCase(val) {
	return String(val).toUpperCase();
}

// ===========================================================================

function toLowerCase(val) {
	return String(val).toLowerCase();
}

// ===========================================================================

function isNull(val) {
	if(val == null) {
		return true;
	}

	if(typeof val === "undefined") {
		return true;
	}

	return false;
}

// ===========================================================================

function getEntityData(entity, dataName) {
	if(entity != null) {
		if(entity.getData != null) {
			return entity.getData(dataName);
		}
	}
    return null;
}

// ===========================================================================

function setEntityData(entity, dataName, dataValue, syncToClients = true) {
	if(entity != null) {
		if(typeof server != "undefined") {
			return entity.setData(dataName, dataValue, syncToClients);
		} else {
			return entity.setData(dataName, dataValue);
		}
	}
}

// ===========================================================================

function removeEntityData(entity, dataName) {
	if(entity != null) {
		return entity.removeData(dataName);
	}
    return null;
}

// ===========================================================================

function doesEntityDataExist(entity, dataName) {
	if(entity != null) {
		return (entity.getData(dataName) != null);
	}
	return null;
}

// ===========================================================================

function getDistance(vec1, vec2) {
	if(isNull(vec1) || isNull(vec2)) {
		return false;
	}
    return vec1.distance(vec2);
}

// ===========================================================================

function logToConsole(tempLogLevel, text) {
    if(typeof server != "undefined") {
        text = removeColoursInMessage(text);
    }

	if((logLevel & tempLogLevel) || logLevel == LOG_ALL) {
		if(tempLogLevel == LOG_ERROR) {
			console.error(text);
			return true;
		} else if(tempLogLevel == LOG_WARN) {
			console.warn(text);
			return true;
		} else {
			console.log(text);
			return true;
		}
	}
	return false;
}

// ===========================================================================

function Enum(constantsList) {
    let tempTable = {};
	for(let i in constantsList) {
        tempTable[constantsList[i]] = i;
    }
	return tempTable;
}

// ===========================================================================

function isServerScript() {
	return (typeof server != "undefined");
}

// ===========================================================================

function getPercentage(num, per) {
	return (num/100)*per;
}

// ===========================================================================