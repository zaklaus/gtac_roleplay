// ===========================================================================
// Asshat-Gaming Roleplay
// Copyright (c) 2020 by Asshat Gaming (www.asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: gui.js
// DESC: Provides GUI functionality and styles
// TYPE: Client (JavaScript)
// ===========================================================================

var app = {};

let robotoFont = "Tahoma";

let primaryColour = [
	null,
	[51, 153, 255],
	[144, 255, 96],
	[255, 188, 218],
	[252, 145, 58],
	[252, 145, 58],
	[180, 180, 180],
	[180, 180, 180],
];

let windowAlpha = 120;
let windowTitleAlpha = 200;
let buttonAlpha = 200;

let login = {
	window: null,
	logoImage: null,
	passwordLabel: null,
	passwordInput: null,
	loginButton: null,
	notRegisteredLabel: null,
	registerButton: null,
};

let register = {
	window: null,
	logoImage: null,
	messageLabel: null,
	passwordInput: null,
	confirmPasswordInput: null,
	emailInput: null,
	registerButton: null,
	alreadyRegisteredLabel: null,
	loginButton: null,
};

let newCharacter = {
	window: null,
	firstNameInput: null,
	lastNameInput: null,
	skinDropDown: null,
	spawnAreaDropDown: null,
	createButton: null,
	skinImage: null,
};

let errorDialog = {
	window: null,
	messageLabel: null,
	okayButton: null,
};

let infoDialog = {
	window: null,
	messageLabel: null,
	okayButton: null,
};

let yesNoDialog = {
	window: null,
	messageLabel: null,
	yesButton: null,
	noButton: null,
};

let characterSelect = {
	window: null,
	skinImage: null,
	nameText: null,
	dateOfBirthText: null,
	placeOfOriginText: null,
	previousCharacterButton: null,
	nextCharacterButton: null,
	selectCharacterButton: null,
	newCharacterButton: null,
};

let skinNames = [
	[],
	[ // GTA III
		[0, "Claude", "Skin000.png"],
		[1, "Police Officer", "Skin001.png"],
		[2, "SWAT Officer", "Skin002.png"],
		[3, "FBI Agent", "Skin003.png"],
		[4, "Army Soldier", "Skin004.png"],
		[5, "Paramedic", "Skin005.png"],
		[6, "Firefighter", "Skin006.png"],
		[7, "Wise Guy", "Skin007.png"],
		[8, "Taxi Driver", "Skin008.png"],
		[9, "Pimp", "Skin009.png"],
		[10, "Mafia Member", "Skin010.png"],
		[11, "Mafia Member", "Skin011.png"],
		[12, "Triad Member", "Skin012.png"],
		[13, "Triad Member", "Skin013.png"],
		[14, "Diablo Member", "Skin014.png"],
		[15, "Diablo Member", "Skin015.png"],
		[16, "Yakuza Member", "Skin016.png"],
		[17, "Yakuza Member", "Skin017.png"],
		[18, "Yardie Member", "Skin018.png"],
		[19, "Yardie Member", "Skin019.png"],
		[20, "Cartel Soldier", "Skin020.png"],
		[21, "Cartel Soldier", "Skin021.png"],
		[22, "Red Jacks Thug", "Skin022.png"],
		[23, "Purple Nines Thug", "Skin023.png"],
		[24, "Street Criminal", "Skin024.png"],
		[25, "Street Criminal", "Skin025.png"],
		[30, "Male Client", "Skin030.png"],
		[31, "Random Guy", "Skin031.png"],
		[32, "Vacationist", "Skin032.png"],
		[33, "Dj", "Skin033.png"],
		[34, "Young Woman", "Skin034.png"],
		[35, "Young Woman", "Skin035.png"],
		[36, "Business Woman", "Skin036.png"],
		[37, "Elder Woman", "Skin037.png"],
		[38, "Elder Woman", "Skin038.png"],
		[39, "Prostitute", "Skin039.png"],
		[40, "Prostitute", "Skin040.png"],
		[41, "Random Guy", "Skin041.png"],
		[42, "Diseased Man", "Skin042.png"],
		[43, "Deseased Woman", "Skin043.png"],
		[44, "Young Woman", "Skin044.png"],
		[45, "Old Man", "Skin045.png"],
		[46, "Random Guy", "Skin046.png"],
		[47, "Old Woman", "Skin047.png"],
		[48, "Old Woman", "Skin048.png"],
		[49, "Old Man", "Skin049.png"],
		[50, "Random Guy", "Skin050.png"],
		[51, "Old Woman", "Skin051.png"],
		[52, "Young Woman", "Skin052.png"],
		[53, "Docks Worker", "Skin053.png"],
		[54, "Docks Worker", "Skin054.png"],
		[55, "Male Street Bum", "Skin055.png"],
		[56, "Female Street Bum", "Skin056.png"],
		[57, "Delivery Guy", "Skin057.png"],
		[58, "Delivery Guy", "Skin058.png"],
		[59, "Business Man", "Skin059.png"],
		[60, "Marty Chonks", "Skin060.png"],
		[61, "Cia Agent", "Skin061.png"],
		[62, "Female Client", "Skin062.png"],
		[63, "Young Woman", "Skin063.png"],
		[64, "Business Woman", "Skin064.png"],
		[65, "Business Man", "Skin065.png"],
		[66, "Female Client", "Skin066.png"],
		[67, "Male Steward", "Skin067.png"],
		[68, "Female Steward", "Skin068.png"],
		[69, "Male Cocks Fan", "Skin069.png"],
		[70, "Male Cocks Fan", "Skin070.png"],
		[71, "Female Cocks Fan", "Skin071.png"],
		[72, "Male Paramedics Assistant", "Skin072.png"],
		[73, "Female Paramedics Assistant", "Skin073.png"],
		[74, "Construction Worker", "Skin074.png"],
		[75, "Construction Worker", "Skin075.png"],
		[76, "Zip Customer", "Skin076.png"],
		[77, "Party Woman", "Skin077.png"],
		[78, "Party Woman", "Skin078.png"],
		[80, "Female College Student", "Skin080.png"],
		[81, "Old Man", "Skin081.png"],
		[82, "Female Jogger", "Skin082.png"],
		[83, "Asuka Kasen", "Skin083.png"],
		[84, "Spank Suicide Bomber", "Skin084.png"],
		[85, "Salvatore's Butler", "Skin085.png"],
		[86, "Catalina", "Skin086.png"],
		[87, "Lee Chong", "Skin087.png"],
		[88, "Colombian Cartel Member", "Skin088.png"],
		[89, "Colombian Cartel Member", "Skin089.png"],
		[90, "Colombian Cartel Member", "Skin090.png"],
		[91, "Colombian Cartel Member", "Skin091.png"],
		[92, "Police Officer", "Skin092.png"],
		[93, "Curly Bob", "Skin093.png"],
		[94, "Phil Cassidy", "Skin094.png"],
		[95, "Detective", "Skin095.png"],
		[96, "8-Ball", "Skin096.png"],
		[97, "8-Ball", "Skin097.png"],
		[98, "Salvatore Leone", "Skin098.png"],
		[99, "Mafia Member", "Skin099.png"],
		[100, "Joey Leone", "Skin100.png"],
		[101, "Joey Leone", "Skin101.png"],
		[102, "Bar Owner", "Skin102.png"],
		[103, "Kenji Kasen", "Skin103.png"],
		[104, "Mike Forelli", "Skin104.png"],
		[105, "Donald Love", "Skin105.png"],
		[106, "Donald Love", "Skin106.png"],
		[107, "Luigi Goterelli", "Skin107.png"],
		[108, "Maria Latore", "Skin108.png"],
		[109, "Mickey Hamfists", "Skin109.png"],
		[110, "Miguel", "Skin110.png"],
		[111, "Misty", "Skin111.png"],
		[112, "Old Oriental Gentleman", "Skin112.png"],
		[113, "Old Oriental Gentleman", "Skin113.png"],
		[114, "Old Oriental Gentleman", "Skin114.png"],
		[115, "Ray Machowski", "Skin115.png"],
		[116, "Mafia Member", "Skin116.png"],
		[118, "Tanner", "Skin118.png"],
		[119, "Toni Cipriani", "Skin119.png"],
		[120, "Darkel", "Skin120.png"],
		[121, "Chuff Security Officer", "Skin121.png"]
	],
];

let placesOfOrigin = [
	"Liberty City",
	"Vice City",
	"Los Santos",
	"San Fierro",
	"Las Venturas",
	"San Andreas",
	"Blaine County",
	"Red County",
	"Bone County",
	"Other",	
];

let characterData = [];
let currentCharacter = 0;

app.init = function()
{	
	//let fontStream = openFile("RoleplayApp/Fonts/Roboto-Regular.ttf");
	//if(fontStream != null) {
	//	robotoFont = lucasFont.createFont(fontStream, 10.0);
	//	fontStream.close();
	//}

	login.window = mexui.window(game.width/2-150, game.height/2-115, 300, 280, 'LOGIN', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		}
	});
	login.window.titleBarIconSize = new Vec2(0,0);
	login.window.titleBarHeight = 0;
	
	login.logoImage = login.window.image(100, 20, 100, 100, "files/images/main-logo.png");
	
	login.messageLabel = login.window.text(20, 135, 260, 20, 'Please enter your password!', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		}
	});

	login.passwordInput = login.window.textInput(20, 170, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			backgroundColour: toColour(200, 200, 200, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,			
		}		
	});
	login.passwordInput.masked = true;
	login.passwordInput.placeholder = "Password";
	
	login.loginButton = login.window.button(20, 205, 260, 30, 'LOGIN', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, checkLogin);	
	
	login.notRegisteredLabel = login.window.text(20, 240, 175, 20, "Don't have an account?", {
		main: {
			textSize: 10.0,
			textAlign: 1.0,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		}
	});

	login.registerButton = login.window.button(205, 242, 75, 15, 'REGISTER', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 9.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, showRegistration);
	
	// ---------------------------------------------------------------------------------
	
	newCharacter.window = mexui.window(game.width/2-215, game.height/2-83, 430, 166, 'New Character', {
		main: {			
			backgroundColour: toColour(0, 0, 0, 120),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});

	newCharacter.firstNameInput = newCharacter.window.textInput(10, 40, 200, 25, '', {
		main: {
			hover: {
				backgroundColour: toColour(0, 0, 0, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,			
			},				
			backgroundColour: toColour(0, 0, 0, 200),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			backgroundColour: toColour(200, 200, 200, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 200),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,			
		}		
	});	
	newCharacter.firstNameInput.placeholder = "First Name";
	
	newCharacter.lastNameInput = newCharacter.window.textInput(10, 70, 200, 25, '', {
		main: {
			hover: {
				backgroundColour: toColour(0, 0, 0, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,			
			},			
			backgroundColour: toColour(0, 0, 0, 200),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			backgroundColour: toColour(200, 200, 200, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 200),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,			
		}		
	});	
	newCharacter.lastNameInput.placeholder = "Last Name";

	newCharacter.dateOfBirth = newCharacter.window.date(10, 130, 200, 25, 'Date of Birth', {
		main: {
			hover: {
				backgroundColour: toColour(0, 0, 0, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,			
			},			
			backgroundColour: toColour(0, 0, 0, 200),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		}
	});	

	newCharacter.placeOfOrigin = newCharacter.window.dropDown(10, 100, 200, 25, 'Place of Origin', {
		main: {
			hover: {
				backgroundColour: toColour(0, 0, 0, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,			
			},					
			backgroundColour: toColour(0, 0, 0, 200),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		item: {
			hover: {
				backgroundColour: toColour(32, 32, 32, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,	
				width: 200,				
			},			
			backgroundColour: toColour(0, 0, 0, 200),
			textColour:	toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,	
			width: 200,
		},
	});	

	for(let i in placesOfOrigin) {
		newCharacter.placeOfOrigin.item(placesOfOrigin[i]);
	}
	
	newCharacter.placeOfOrigin.axis.y.scrollBar.styles.innerBar.backgroundColour = toColour(255, 128, 0, 200);
	newCharacter.placeOfOrigin.setScrollBarsManual(true);

	newCharacter.skinImage = newCharacter.window.image(265, 30, 110, 70, "files/images/skins/gta3/Skin000.png");
	
	newCharacter.skinDropDown = newCharacter.window.dropDown(220, 100, 200, 25, 'Choose Skin', {
		main: {
			hover: {
				backgroundColour: toColour(0, 0, 0, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,			
			},				
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
			width: 200,	
		},
		item: {
			backgroundColour: toColour(0, 0, 0, 200),
			textColour:	toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,	
			width: 200,
		},
		item: {
			hover: {
				backgroundColour: toColour(32, 32, 32, 200),
				textColour:	toColour(200, 200, 200, 255),
				textSize: 10.0,
				textFont: robotoFont,	
				width: 200,				
			},
			backgroundColour: toColour(0, 0, 0, 200),
			textColour:	toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,	
			width: 200,
		},
	}, function() {
		let skinImagePath = skinNames[gta.game][this.selectedEntryIndex][2];
		if(newCharacter.skinImage != null) {
			newCharacter.skinImage.remove();
		}
		newCharacter.skinImage = newCharacter.window.image(265, 30, 110, 70, "files/images/skins/gta3/" + skinImagePath.toString());
	});
	newCharacter.skinDropDown.axis.y.scrollBar.styles.innerBar.backgroundColour = toColour(255, 128, 0, 200);
	newCharacter.skinDropDown.setScrollBarsManual(true);
		
	for(let i in skinNames[gta.game]) {
		if(skinNames[gta.game][i] != "INVALID") {
			newCharacter.skinDropDown.item(skinNames[gta.game][i][1]);
		}
	}

	newCharacter.createButton = newCharacter.window.button(220, 130, 200, 25, 'CREATE', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, checkNewCharacter);		
	
	// ---------------------------------------------------------------------------------
	
	register.window = mexui.window(game.width/2-130, game.height/2-140, 300, 260, 'Register', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		}
	});	
	register.window.titleBarIconSize = new Vec2(0,0);
	register.window.titleBarHeight = 0;	
	
	register.window.image(115, 10, 65, 65, "files/images/main-logo.png");
	
	register.messageLabel = register.window.text(20, 75, 260, 20, 'Create an account', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		}
	});

	register.passwordInput = register.window.textInput(20, 100, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			backgroundColour: toColour(200, 200, 200, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,			
		}
	});
	//register.passwordInput.masked = true;
	register.passwordInput.placeholder = "Password";
	
	register.confirmPasswordInput = register.window.textInput(20, 130, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			backgroundColour: toColour(200, 200, 200, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,			
		}		
	});
	//register.confirmPasswordInput.masked = true;
	register.confirmPasswordInput.placeholder = "Confirm password";	
	
	register.emailInput = register.window.textInput(20, 160, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			backgroundColour: toColour(200, 200, 200, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,			
		}
	});
	register.emailInput.placeholder = "Email";	
	
	register.registerButton = register.window.button(20, 195, 260, 30, 'CREATE ACCOUNT', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], 120),
			textColour: toColour(255, 255, 255, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, checkRegistration);
	
	register.alreadyRegisteredLabel = register.window.text(20, 230, 175, 22, "Already have an account?", {
		main: {
			textSize: 9.0,
			textAlign: 1.0,
			textColour: toColour(255, 255, 255, 255),
			textFont: robotoFont,
		}
	});	

	register.loginButton = register.window.button(205, 232, 75, 15, 'LOGIN', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], 120),
			textColour: toColour(255, 255, 255, 255),
			textSize: 9.0,
			textAlign: 0.5,
			textFont: robotoFont,
		},
	}, showLogin);
	
	// ---------------------------------------------------------------------------------
	
	errorDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 140, 'ERROR', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});
	
	errorDialog.messageLabel = errorDialog.window.text(15, 50, 370, 20, 'Error Message', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 255),
			textFont: robotoFont,
		}
	});
	
	errorDialog.okayButton = errorDialog.window.button(20, 95, 360, 30, 'OK', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, closeErrorDialog);
	
	// ---------------------------------------------------------------------------------
	
	yesNoDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 140, 'Question', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});
	
	yesNoDialog.messageLabel = yesNoDialog.window.text(15, 50, 370, 20, 'Would you like to answer this question?', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 255),
			textFont: robotoFont,
		}
	});
	
	yesNoDialog.yesButton = yesNoDialog.window.button(20, 95, 175, 30, 'YES', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, yesNoDialogAnswerYes);

	yesNoDialog.noButton = yesNoDialog.window.button(205, 95, 175, 30, 'NO', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, yesNoDialogAnswerNo);
	
	// ---------------------------------------------------------------------------------
	
	infoDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 140, 'Information', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});
	
	infoDialog.messageLabel = infoDialog.window.text(15, 50, 370, 20, 'Information Message', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		}
	});
	
	infoDialog.okayButton = infoDialog.window.button(20, 95, 360, 30, 'OK', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, closeInfoDialog);	
	
	// ---------------------------------------------------------------------------------	
	
	characterSelect.window = mexui.window(game.width/2-215, game.height/2-83, 430, 166, 'Select Character', {
		main: {			
			backgroundColour: toColour(0, 0, 0, 120),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], windowTitleAlpha),
		},	
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});

	characterSelect.nameText = characterSelect.window.text(10, 40, 200, 25, 'Lastname, Firstname', {
		main: {
			textSize: 14.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		}
	});

	characterSelect.dateOfBirthText = characterSelect.window.text(10, 70, 200, 25, 'Born: ', {
		main: {
			textSize: 9.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		}
	});

	characterSelect.placeOfOrigin = characterSelect.window.text(10, 90, 200, 25, 'From: ', {
		main: {
			textSize: 9.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		}
	});

	characterSelect.selectCharacterButton = characterSelect.window.button(90, 130, 250, 25, 'SELECT', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, selectThisCharacter);

	characterSelect.newCharacterButton = characterSelect.window.button(140, 180, 150, 25, 'NEW CHARACTER', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, showNewCharacter);	

	characterSelect.previousCharacterButton = characterSelect.window.button(10, 130, 75, 25, '< PREV', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, selectPreviousCharacter);

	characterSelect.nextCharacterButton = characterSelect.window.button(345, 130, 75, 25, 'NEXT >', {
		main: {
			backgroundColour: toColour(primaryColour[gta.game][0], primaryColour[gta.game][1], primaryColour[gta.game][2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
	}, selectNextCharacter);
	
	characterSelect.skinImage = characterSelect.window.image(265, 30, 130, 85, "files/images/skins/gta3/Skin000.png");
	
	// ---------------------------------------------------------------------------

	closeAllWindows();
	
};

// ---------------------------------------------------------------------------

let checkLogin = function() {
	triggerNetworkEvent("ag.checkLogin", login.passwordInput.lines[0]);
}

// ---------------------------------------------------------------------------

let loginFailed = function(errorMessage) {
	//if(loginAttemptsRemaining >= 1) {
		login.messageLabel.text = errorMessage;
		login.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
		login.passwordInput.text = "";
	//} else {
	//	closeAllWindows();
	//}
}

// ---------------------------------------------------------------------------

let loginSuccess = function() {
	closeAllWindows();
}

// ---------------------------------------------------------------------------

let checkRegistration = function() {
	triggerNetworkEvent("ag.checkRegistration", register.passwordInput.lines[0], register.confirmPasswordInput.lines[0], register.emailInput.lines[0]);
}

// ---------------------------------------------------------------------------

let checkNewCharacter = function() {
	if(newCharacter.skinDropDown.selectedEntryIndex == -1) {
		return false;
	}

	if(newCharacter.firstNameInput.lines[0].length < 2) {
		return false;
	}
	
	if(newCharacter.lastNameInput.lines[0].length < 2) {
		return false;
	} 

	if(newCharacter.placeOfOrigin.selectedEntryIndex == -1) {
		return false;
	}

	triggerNetworkEvent("ag.checkNewCharacter", 
		newCharacter.firstNameInput.lines[0], 
		newCharacter.lastNameInput.lines[0], 
		String(String(newCharacter.dateOfBirth.day) + "/" + String(newCharacter.dateOfBirth.month) + "/" + String(newCharacter.dateOfBirth.year)),
		placesOfOrigin[newCharacter.placeOfOrigin.selectedEntryIndex],
		skinNames[gta.game][newCharacter.skinDropDown.selectedEntryIndex][0],
	);
}

// ---------------------------------------------------------------------------

let registrationFailed = function(errorMessage) {
	register.messageLabel.text = errorMessage;
	register.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	register.passwordInput.text = "";
	register.confirmPasswordInput.text = "";
	register.emailInput.text = "";
}

// ---------------------------------------------------------------------------

let registrationSuccess = function() {
	closeAllWindows();
}

// ---------------------------------------------------------------------------

let characterSelectSuccess = function() {
	closeAllWindows();
}

// ---------------------------------------------------------------------------

let closeErrorDialog = function() {
	errorDialog.window.shown = false;
	mexui.setInput(false);
}

// ---------------------------------------------------------------------------

let closeInfoDialog = function() {
	infoDialog.window.shown = false;
	mexui.setInput(false);
}

// ---------------------------------------------------------------------------

let closeAllWindows = function() {
	infoDialog.window.shown = false;
	errorDialog.window.shown = false;
	yesNoDialog.window.shown = false;
	errorDialog.window.shown = false;
	register.window.shown = false;
	login.window.shown = false;
	newCharacter.window.shown = false;
	characterSelect.window.shown = false;
	mexui.setInput(false);
}

// ---------------------------------------------------------------------------

let yesNoDialogAnswerNo = function() {
	triggerNetworkEvent("ag.promptAnswerNo");
}

// ---------------------------------------------------------------------------

let yesNoDialogAnswerYes = function() {
	triggerNetworkEvent("ag.promptAnswerYes");
}

// ---------------------------------------------------------------------------

let showRegistration = function() {
	closeAllWindows();
	mexui.setInput(true);
	register.window.shown = true;
}

// ---------------------------------------------------------------------------

let showLogin = function() {
	closeAllWindows();
	mexui.setInput(true);
	login.window.shown = true;
}

// ---------------------------------------------------------------------------

let showCharacterSelect = function(firstName, lastName, placeOfOrigin, dateOfBirth, skinId) {
	closeAllWindows();
	mexui.setInput(true);

	characterSelect.nameText.text = lastName + ", " + firstName;
	characterSelect.dateOfBirthText.text = "Born: " + String(dateOfBirth);
	characterSelect.placeOfOrigin.text = "From: " + String(placeOfOrigin);

	if(characterSelect.skinImage != null) {
		characterSelect.skinImage.remove();
	}

	console.log(skinId);
	let skinImagePath = "Skin000.png";
	for(let i in skinNames[gta.game]) {
		if(skinNames[gta.game][i][0] == skinId) {
			skinImagePath = skinNames[gta.game][i][2];
		}
	}
	
	characterSelect.skinImage = characterSelect.window.image(265, 30, 130, 85, "files/images/skins/gta3/" + String(skinImagePath));

	characterSelect.window.shown = true;
}

// ---------------------------------------------------------------------------

let showError = function(errorMessage, errorTitle) {
	closeAllWindows();
	mexui.setInput(true);
	errorDialog.messageLabel.text = errorMessage;
	errorDialog.window.shown = true;
}

// ---------------------------------------------------------------------------

let showYesNo = function(promptMessage, promptTitle) {
	closeAllWindows();
	mexui.setInput(true);
	yesNoDialog.messageLabel.text = promptMessage;
	yesNoDialog.window.shown = true;
}

// ---------------------------------------------------------------------------

let showInfo = function(infoMessage, infoTitle) {
	closeAllWindows();
	mexui.setInput(true);
	infoDialog.messageLabel.text = infoMessage;
	infoDialog.window.shown = true;
}

// ---------------------------------------------------------------------------

let showNewCharacter = function() {
	closeAllWindows();
	mexui.setInput(true);
	newCharacter.window.shown = true;
}

// ---------------------------------------------------------------------------

let selectNextCharacter = function() {
	triggerNetworkEvent("ag.nextCharacter");
}

// ---------------------------------------------------------------------------

let selectPreviousCharacter = function() {
	triggerNetworkEvent("ag.previousCharacter");
}

// ---------------------------------------------------------------------------

let selectThisCharacter = function() {
	triggerNetworkEvent("ag.selectCharacter");
}

// ---------------------------------------------------------------------------

let switchCharacterSelect = function(firstName, lastName, placeOfOrigin, dateOfBirth, skinId) {
	characterSelect.window.shown = false;
	characterSelect.nameText.text = lastName + ", " + firstName;
	characterSelect.dateOfBirthText.text = "Born: " + String(dateOfBirth);
	characterSelect.placeOfOrigin.text = "From: " + String(placeOfOrigin);
	

	if(characterSelect.skinImage != null) {
		characterSelect.skinImage.remove();
	}

	console.log(skinId);

	let skinImagePath = "Skin000.png";
	for(let i in skinNames[gta.game]) {
		if(skinNames[gta.game][i][0] == skinId) {
			skinImagePath = skinNames[gta.game][i][2];
		}
	}

	characterSelect.skinImage = characterSelect.window.image(265, 30, 130, 85, "files/images/skins/gta3/" + String(skinImagePath));
	characterSelect.window.shown = true;
}

// ---------------------------------------------------------------------------

bindEventHandler("OnResourceReady", thisResource, function(event, resource) {
	app.init();	
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showLogin", function() {
	showLogin();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showRegistration", function() {
	showRegistration();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showNewCharacter", function() {
	showNewCharacter();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showCharacterSelect", function(firstName, lastName, placeOfOrigin, dateOfBirth, skinId) {
	showCharacterSelect(firstName, lastName, placeOfOrigin, dateOfBirth, skinId);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.switchCharacterSelect", function(firstName, lastName, placeOfOrigin, dateOfBirth, skinId) {
	switchCharacterSelect(firstName, lastName, placeOfOrigin, dateOfBirth, skinId);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showError", function(errorMessage, errorTitle) {
	showError(errorMessage, errorTitle);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showPrompt", function(promptMessage, promptTitle) {
	showYesNo(promptMessage, promptTitle);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.showInfo", function(infoMessage) {
	showInfo(infoMessage);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.loginSuccess", function() {
	loginSuccess();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.characterSelectSuccess", function() {
	characterSelectSuccess();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.loginFailed", function(remainingAttempts) {
	loginFailed(remainingAttempts);
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.registrationSuccess", function() {
	registrationSuccess();
});

// ---------------------------------------------------------------------------

addNetworkHandler("ag.registrationFailed", function(errorMessage) {
	registrationFailed(errorMessage);
});

// ---------------------------------------------------------------------------