//making all the score presets
var groupList = ["socialite", "athlete", "researcher", "mediaLover", "reader"];
var majorList = ["business", "engineering", "tech", "fineArts", "libArts"];
var stuEconomic = ["poverty", "low", "midLow", "midHigh", "high"];
var playerCandidate = new CandidateCreate("ph","ph", "ph", "ph")
var opponentCandidate = new CandidateCreate("Liz", "Lizard", "Non-Binary", "Average");
var raceArray = ["Android", "Human", "Martian"];
var genderArray = ["Non-Binary", "Female", "Male"];
var bodyTypeArray = ["Thin", "Medium", "Plus", "HoverChair"];

//sprite stuff
var heads = new Image();
heads.src = "../img/spritehead.png";
var thinBody = new Image();
thinBody.src = "../img/thinSpritesheet.png";
var medBody = new Image();
medBody.src = "../img/medSpritesheet.png";
var lgBody = new Image();
lgBody.src = "../img/plusSpritesheet.png";
var chairBody = new Image();
chairBody.src = "../img/chairSpritesheet.png";
var imgArrayBody = [thinBody, medBody, lgBody, chairBody];
var imgArrayBodyWidth = [164,190,264,215];
var imgArrayBodyHeight = [343,327,304,334];
var imgArrayHeadHeight = [171,173,173];

//scores go Socialite/Athlete/MediaLover/Researcher/Reader
//the score goes tuition, tuition var, athletic, athletic var, research, research var, events, events var, medical, medicalvar
var positions = 
[
	"Lowering Tuition",
	"Increase Athletic Budget",
	"Increase Research Budget",
	"More School Events",
	"Improve Medical Services"	
];

var positionsLower = [
	"tuition",
	"athletic",
	"research",
	"events",
	"medical"	
];

var groupIssues = [
	[2,2,2,1,0,3,1,1,-1,2],
	[0,2,3,1,0,3,1,1,-1,2],
	[1,1,-1,2,1,2,3,1,-2,3],
	[-1,1,-1,1,2,2,3,1,0,4],
	[0,3,-2,2,0,2,1,3,3,1]
];
//goes Poverty/Low/MediumLow/MediumHigh/High
var classIssues = 
[
	[2,2,0,1,2,1,-2,2,3,1],
	[0,2,-1,1,1,3,1,2,2,1],
	[3,1,1,3,2,2,-1,1,1,1],
	[-2,1,2,1,-1,3,1,2,2,1],
	[-1,1,-2,3,2,-1,3,1,0,4]
];
//goes Business/Engineering/Technology/FineArts/LiberalArts
var majorIssues = 
[
	[-2,1,3,1,1,1,0,3,2,1],
	[-1,2,1,1,1,3,-2,1,3,1],
	[3,1,-1,1,3,1,0,4,0,2],
	[2,2,0,3,-2,2,2,2,2,1],
	[0,3,0,4,-3,1,3,1,-2,1]
]

// Creates an array of events you can perform 
var events = 
[
	{
		name: "Posters", 
		timeRequired: 4, 
		scoreIncrease: 1, 
		type: "smallEvent",
		desc: "Short blurb followed by prompt to choose options",
		actionChoice:0,
		options: 
		[
			{
				optionName: "Option3", 
				extraTime: 1,
				bonusScore: 1,
				groupPos: "Read",
				groupNeg: "Ath"
			},
			
			{
				optionName: "Option2", 
				extraTime: 2,
				bonusScore: 2,
				groupPos: "Read",
				groupNeg: "Ath"
			},
			
			{
				optionName: "Option3", 
				extraTime: 3,
				bonusScore: 3,
				groupPos: "Read",
				groupNeg: "Ath"
			}
		]
	},
	
	{
		name: "News Letter", 
		timeRequired: 8, 
		scoreIncrease: 2, 
		type: "smallEvent",
		desc: "Short blurb followed by prompt to choose options",
		actionChoice:1,
		options: 
		[
			{
				optionName: "Option1", 
				extraTime: 1,
				bonusScore: 1
			},
			
			{
				optionName: "Option2", 
				extraTime: 2,
				bonusScore: 2
			}
		]
	},
	
	{
		name: "Booth", 
		timeRequired: 16, 
		scoreIncrease: 4, 
		type: "smallEvent", 
		desc: "Short blurb followed by prompt to choose options",
		actionChoice:2,
		options: 
		[
			{
				optionName: "Option1", 
				extraTime: 1,
				bonusScore: 1
			}
		]
		
	}
]
var currentEvents = [];

//sprites
var spriteHead = new Image();
spriteHead.src = "../img/spritehead.png";
//sample person
function Student(group, ecoClass, major, tuitionScore, athleticScore, researchScore, eventScore, medicalScore)
{
	this.group = group;
	this.ecoClass = ecoClass;
	this.major = major;
	this.athleticScore = athleticScore + player.athleticVar;
	this.researchScore = researchScore + player.researchVar;
	this.tuitionScore = tuitionScore + player.tuitionVar;
	this.eventScore = eventScore + player.eventsVar;
	this.medicalScore = medicalScore + player.medicalVar;
}

//used for making Player Candidate & Opponent Candidate
function CandidateCreate(name,race,gender,bodyType){
	this.name = name;
	this.race = race;
	this.gender = gender;
	this.bodyType = bodyType;
	this.raceNum = 1;
	this.genderNum = 1;
	this.bodyTypeNum = 1;
	this.headNum = 1;
};
//setting up some more variables
var playerScore = [];
var player = {	
	wrongAnswers:0,
}
var candidate;
var opponent;
var turnCounter;
var population;
var sample;
var startHours; 
var remainingHours;

// player variables
var playerScore = [];
var population = 1000;
var sample = [];

//creates the sample
function createSample(x)
{
	for (var count= 0; count < x; count++){
		var scoreHolder = getScores();
		var holderStudent = new Student(groupList[scoreHolder[0]], majorList[scoreHolder[1]], stuEconomic[scoreHolder[2]], scoreHolder[3], scoreHolder[4], scoreHolder[5], scoreHolder[6], scoreHolder[7])
		sample.push(holderStudent);
	}
}

//get all the base scores for the students
function getScores(){
	var groupRandom = Math.floor(Math.random()* 5);
	var majorRandom = Math.floor(Math.random()* 5);
	var ecoClassRandom = Math.floor(Math.random()* 5);
	var ath =0;
	var res = 0;
	var tuit = 0;
	var med = 0;
	var event = 0;
	//SCORE calculated by (group issue + variable) + (major issue + variable)  + (class issue + variable) 
	tuit = (((groupIssues[groupRandom][0]) + (Math.floor(Math.random() * (groupIssues[groupRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][0]) + (Math.floor(Math.random() * (groupIssues[majorRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((classIssues[ecoClassRandom][0]) + (Math.floor(Math.random() * (classIssues[ecoClassRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	ath =  (((groupIssues[groupRandom][2]) + (Math.floor(Math.random() * (groupIssues[groupRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][2]) + (Math.floor(Math.random() * (groupIssues[majorRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((classIssues[ecoClassRandom][2]) + (Math.floor(Math.random() * (classIssues[ecoClassRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	res =  (((groupIssues[groupRandom][4]) + (Math.floor(Math.random() * (groupIssues[groupRandom][5]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][4]) + (Math.floor(Math.random() * (groupIssues[majorRandom][5]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((classIssues[ecoClassRandom][4]) + (Math.floor(Math.random() * (classIssues[ecoClassRandom][5]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	event =  (((groupIssues[groupRandom][6]) + (Math.floor(Math.random() * (groupIssues[groupRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][6]) + (Math.floor(Math.random() * (groupIssues[majorRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((classIssues[ecoClassRandom][6]) + (Math.floor(Math.random() * (classIssues[ecoClassRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	med =  (((groupIssues[groupRandom][8]) + (Math.floor(Math.random() * (groupIssues[groupRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][8]) + (Math.floor(Math.random() * (groupIssues[majorRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((classIssues[ecoClassRandom][8]) + (Math.floor(Math.random() * (classIssues[ecoClassRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	
	if (tuit > 4){
		tuit = 4;
	}
	else if(tuit < -4){
		tuit = -4;
	}

	if (ath > 4){
		ath = 4;
	}
	else if(ath < -4){
		ath= -4;
	}

	if (res > 4){
		res= 4;
	}
	else if(res < -4){
		res = -4;
	}

	if (event > 4){
		event = 4;
	}
	else if(event < -4){
		event = -4;
	}
	if (med> 4){
		med = 4;
	}
	else if(med < -4){
		med = -4;
	}
	var returnArray = [groupRandom, majorRandom, ecoClassRandom, tuit, ath,res,event,med];
	return returnArray;
}

//starts the game
function startGame(){
	hours = 60;
	playerScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	//whatever other things we have to do when initializing the game here
	var date = Date.now();
	console.log("Game initialized and loaded @ T:" + date);	
}
/*GAME INTRO FUNCTIONS8*/
function startCharacterSelect(){
	

	//character creator here
	//for right now we'll do a drop down option
	document.getElementById("gameInfo").innerHTML = "<h1>Character Creation</h1>";
	document.getElementById("gameInfo").innerHTML += "<canvas id='myCanvas' width='500px' height = '600px'></canvas><br>";
	document.getElementById("gameInfo").innerHTML += "<button class = 'live'id ='headbutton'>Heads</button>";
	document.getElementById("gameInfo").innerHTML += "<button class = 'live'id ='racebutton'>Race</button>";
	document.getElementById("gameInfo").innerHTML += "<button id ='clothingbutton'>Gender</button>";
	document.getElementById("gameInfo").innerHTML += "<button id ='bodybutton'>BodyType</button><br>";
	document.getElementById("gameInfo").innerHTML += "<label>Candidate Name: </label><input id='charName' type='text' /><br>";
	document.getElementById("gameInfo").innerHTML += "<button id='candidateCre'>Create Candidate</button><br>";
	
	var c=document.getElementById("myCanvas");
	//creates a sprite for the headsheets
	var headSheet = new sprite({context: c.getContext("2d"), width: 155, height: 171, image: heads});
	var bodySheet = new sprite({context: c.getContext("2d"), width: 164, height: 343, image: thinBody});

	//sets up all the buttons for changing the canvas
	document.getElementById("headbutton").addEventListener("click", function(){
			right(headSheet)
			drawOnCanvas(headSheet, bodySheet);
	});
	document.getElementById("racebutton").addEventListener("click", function(){
			race(headSheet);
			drawOnCanvas(headSheet, bodySheet);
	});
	document.getElementById("clothingbutton").addEventListener("click", function(){
			clothingChange(bodySheet);
			drawOnCanvas(headSheet, bodySheet);
	});
	document.getElementById("bodybutton").addEventListener("click", function(){
			bodyChange(headSheet, bodySheet);
	});
	document.getElementById("candidateCre").addEventListener("click", function(){
				startOtherCandidates(headSheet, bodySheet);
	});

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);

}

function drawOnCanvas(headsheet,bodysheet){
	//clear the canvas
	var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d")
	//clears everything
	ctx.clearRect(0,0,c.width,c.height);
	//makes the background black
	ctx.fillRect(0,0,c.width, c.height);
	//draw the body
	drawBody(bodysheet);
	//draws the head
	drawHeads(headsheet,bodysheet)
};

//draws the head
function drawHeads(heads,body){
	//fixes the head coordinates
	var x = fixHeadCord(heads,body);
	heads.render(x[0],x[1]);	
}
function drawBody(body){
	body.renderBody(150,200);
}

function fixHeadCord(heads, body){
	
	//head coords
	var xCord = 156;
	var yCord = 40;
	//array that holds all th
	var coordChange = [
	
	[
		[
		//thin body NB
			[
				[[3,1]],
				[[2,-1]],
				[[-7,0]],
				[[-7,0]],
				[[2,2]],
				[[2,2]]
			],
			[
				[[3,-1]],
				[[5,-2]],
				[[-2,-2]],
				[[-2,-2]],
				[[1,0]],
				[[2,1]]
			],
			[
				[[5,-1]],
				[[7,-1]],
				[[-8,0]],
				[[-8,0]],
				[[2,-2]],
				[[2,-2]]
			]
		],
		[//thin body female
			[
				[[3,1]],
				[[2,-1]],
				[[-7,0]],
				[[-7,0]],
				[[2,2]],
				[[2,2]]
			],
			[
				[[3,-1]],
				[[5,-2]],
				[[-4,-3]],
				[[-4,-3]],
				[[-1,0]],
				[[-1,1]]
			],
			[
				[[4,-1]],
				[[5,-1]],
				[[-10,0]],
				[[-8,0]],
				[[0,-2]],
				[[0,-2]]
			]
		],//thin body male
		[
			[
				[[10,1]],
				[[10,-1]],
				[[-1,0]],
				[[-1,0]],
				[[8,2]],
				[[9,2]]
			],
			[
				[[8,-1]],
				[[10,-2]],
				[[4,-2]],
				[[4,-2]],
				[[5,0]],
				[[7,1]]
			],
			[
				[[10,-1]],
				[[12,-2]],
				[[-2,-2]],
				[[0,-2]],
				[[8,-1]],
				[[8,-1]]
			]
		]
	],
	[
		[
			[
				[[17,0]],
				[[15,0]],
				[[10,0]],
				[[10,0]],
				[[17,2]],
				[[17,2]]
			],
			[
				[[17,0]],
				[[17,-1]],
				[[10,-2]],
				[[10,0]],
				[[15,2]],
				[[16,2]]
			],
			[
				[[18,0]],
				[[18,0]],
				[[7,0]],
				[[10,0]],
				[[15,-1]],
				[[15,-1]]
			]
		],
		[
			[
				[[17,0]],
				[[15,0]],
				[[8,0]],
				[[8,0]],
				[[15,2]],
				[[15,2]]
			],
			[
				[[17,0]],
				[[17,-2]],
				[[10,-3]],
				[[10,-2]],
				[[13,0]],
				[[14,0]]
			],
			[
				[[18,-2]],
				[[18,-2]],
				[[3,0]],
				[[8,0]],
				[[12,-3]],
				[[12,-3]]
			]
		],
		[
			[
				[[19,0]],
				[[17,0]],
				[[8,0]],
				[[8,0]],
				[[17,2]],
				[[17,2]]
			],
			[
				[[18,0]],
				[[18,-4]],
				[[12,-4]],
				[[10,-3]],
				[[13,0]],
				[[16,0]]
			],
			[
				[[19,-2]],
				[[19,-2]],
				[[4,-1]],
				[[9,-1]],
				[[14,-3]],
				[[14,-3]]
			]
		]
	],
	[
		[
			[
				[[46,3]],
				[[44,3]],
				[[38,3]],
				[[38,3]],
				[[44,5]],
				[[44,5]]
			],
			[
				[[46,3]],
				[[46,1]],
				[[38,1]],
				[[38,3]],
				[[44,3]],
				[[45,4]]
			],
			[
				[[46,3]],
				[[44,3]],
				[[35,3]],
				[[38,3]],
				[[44,2]],
				[[44,2]]
			]
		],
		[
			[
				[[46,5]],
				[[44,4]],
				[[36,3]],
				[[38,5]],
				[[44,5]],
				[[44,5]]
			],
			[
				[[46,3]],
				[[46,1]],
				[[38,1]],
				[[38,3]],
				[[44,4]],
				[[45,5]]
			],
			[
				[[46,3]],
				[[44,3]],
				[[32,3]],
				[[38,3]],
				[[44,2]],
				[[44,2]]
			]
		],
		[
			[
				[[52,0]],
				[[50,0]],
				[[43,0]],
				[[43,0]],
				[[50,3]],
				[[52,3]]
			],
			[
				[[52,0]],
				[[54,-3]],
				[[46,-1]],
				[[46,-1]],
				[[50,0]],
				[[52,0]]
			],
			[
				[[52,-2]],
				[[54,-3]],
				[[42,-1]],
				[[44,-1]],
				[[50,-2]],
				[[50,-2]]
			]
		]
	],
	[
		[
			[
				[[53,30]],
				[[53,30]],
				[[45,30]],
				[[45,30]],
				[[53,32]],
				[[53,32]]
			],
			[
				[[53,29]],
				[[54,27]],
				[[45,27]],
				[[45,29]],
				[[50,31]],
				[[53,31]]
			],
			[
				[[53,29]],
				[[54,27]],
				[[40,27]],
				[[45,29]],
				[[50,29]],
				[[50,29]]
			]
		],
		[
			[
				[[58,40]],
				[[55,40]],
				[[48,40]],
				[[48,40]],
				[[56,42]],
				[[56,42]]
			],
			[
				[[58,40]],
				[[58,40]],
				[[49,38]],
				[[49,38]],
				[[53,42]],
				[[53,42]]
			],
			[
				[[57,36]],
				[[58,36]],
				[[45,40]],
				[[50,41]],
				[[55,37]],
				[[55,37]],
			]
		],
		[
			[
				[[65,37]],
				[[64,37]],
				[[58,37]],
				[[58,37]],
				[[65,39]],
				[[65,39]],
			],
			[
				[[65,37]],
				[[65,35]],
				[[55,34]],
				[[57,34]],
				[[63,37]],
				[[63,39]],
			],
			[
				[[65,35]],
				[[67,35]],
				[[51,36]],
				[[55,35]],
				[[61,35]],
				[[61,36]],
			]
		]
	]

	];
	var txc = coordChange[body.bodyArrayHolder][body.frameIndexClothing][heads.frameIndexRace][heads.frameIndex][0];
	//the adjustments for that specific head/race/gender/bodytype
	xCord += txc[0];
	yCord += txc[1];

	var ret = [xCord, yCord];
	return ret;
}
//changes gender
function clothingChange(bodySheet){
	bodySheet.updateClothing();
}
//changes head
function right(heads){
	heads.update();
}
//changes race
function race(heads){
	heads.raceUpdate();
}
//changes the body type
function bodyChange(headsheet, body){
	body.bodyArrayHolder++;
	var z = body.bodyArrayHolder;
	if(z > 3){
		body.bodyArrayHolder = 0;
		z=0;
	}
	headsheet.bodyArrayHolder = z;
	
	body.image = imgArrayBody[z];
	body.width = imgArrayBodyWidth[z];
	body.height = imgArrayBodyHeight[z];
	drawOnCanvas(headsheet,body)
}

//sprite function
function sprite(options){
	var that = {};
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.frameIndex = 0,
	that.frameIndexRace = 0,
	that.frameIndexClothing = 0,
	that.bodyArrayHolder = 0,
	that.isMale = 0,
   

	that.render = function (x,y) {        

        // Draw the animation
        that.context.drawImage(
           that.image,
           that.width * that.frameIndex,
           that.height* that.frameIndexRace ,
           that.width,
           that.height,
           x,
           y,
           that.width,
           that.height);
    };

    that.renderBody = function (x,y) {        

        // Draw the animation
        that.context.drawImage(
           that.image,
           (0 + (imgArrayBodyWidth[that.bodyArrayHolder] * that.frameIndexClothing) + that.isMale),
           0,
           that.width,
           that.height,
           x,
           y,
           that.width + that.isMale,
           that.height);
    };

    that.update = function(){
    	that.frameIndex += 1;
    	if (that.frameIndex > 5){
    		that.frameIndex = 0;
    	}
   
    };

     that.updateClothing = function(){
    	that.frameIndexClothing += 1;
    	if (that.frameIndexClothing > 2){
    		that.frameIndexClothing = 0;
    	}
    	
    };


    that.raceUpdate = function(){
    	that.frameIndexRace += 1;
    	if (that.frameIndexRace > 2){
    		that.frameIndexRace = 0;
    	}
    	that.height = imgArrayHeadHeight[that.frameIndexRace];
    };

	return that;
}


function startOtherCandidates(heads,body){
	playerCandidate.name = document.getElementById("charName").value;
	playerCandidate.raceNum = heads.frameIndexRace;
	playerCandidate.genderNum = body.frameIndexClothing;
	playerCandidate.bodyTypeNum = body.bodyArrayHolder;
	playerCandidate.headNum = heads.frameIndex
	playerCandidate.race = raceArray[heads.frameIndexRace];
	playerCandidate.gender = genderArray[body.frameIndexClothing];
	playerCandidate.bodyType = bodyTypeArray[body.bodyArrayHolder];

	document.getElementById("gameInfo").innerHTML = "<h1>What's Happening</h1>"
	document.getElementById("gameInfo").innerHTML += "<p>You're candidate, <b>"+ playerCandidate.name +"</b> is going up again Liz the Chameleon. They're going for Student Council President just like your candidate. Whenever any student wishes to campaign, the current student government will give the candidate some information about the student body.</p>"
	document.getElementById("gameInfo").innerHTML += "<p>Do you wish to start the tutorial on how to read poll information?</p>"
	document.getElementById("gameInfo").innerHTML += "<button onclick='startTutorial()'>Yes</button><button onclick='actualSessionStart()'>No</button>";

}

function startTutorial(){
	document.getElementById("gameInfo").innerHTML = "<h1>Tutorial</h1>"
	document.getElementById("gameInfo").innerHTML += "Tutorial Here<br>"
	document.getElementById("gameInfo").innerHTML += "<button onclick='actualSessionStart()'>Start the Game</button>"
}

function actualSessionStart(){
		document.getElementById("gameInfo").innerHTML = "<p>First let's have your candidate pick their focus </p><br.<br>"
	for (var x=0; x < 5; x++){

	document.getElementById("gameInfo").innerHTML += "<button onclick = 'gameCycleStart("+x+")'>"+ positions[x]+"</button>"
	}
}

/*GAME CYCLE FUNCTIONS8*/
function gameCycleStart(f)
{
	population = 1000;
	sample = [];
	startHours = 336; 
	remainingHours = startHours;
	turnCounter = 1
	playerScore=0;
	candidate =
	{
		focus: "",
		focusnum: 0,
		tuitionVar: 0,
		athleticVar: 0,
		researchVar: 0,
		eventsVar: 0,
		medicalVar: 0,
		winChance: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	};
	
	opponent =
	{
		focus: "",
		focusnum: 0,
		tuitionVar: 0,
		athleticVar: 0,
		researchVar: 0,
		eventsVar: 0,
		medicalVar: 0,
		winChance: 0,
		lastMove: "None"
	};
	
	candidate.focus = positions[f];
	candidate.focusnum = f;
	
	while(opponent.focus != "")
	{
		var oppFocus = Math.random(0,4);
			if(oppFocus != f)
			{
				opponent.focus = positions[f];
				opponent.focusnum = f;
			}
	}
	
	userAction();
};

function userAction()
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	currentEvents = []
	
	//Build User Action Area buttons
	document.getElementById("choices").innerHTML += "<button type='button' class = 'live' onclick='reportViewer()' >View Result Reports</button>"
	document.getElementById("choices").innerHTML += "<button type='button'  onclick='poll()'> Poll for My Influence </button>"
	document.getElementById("gameInfo").innerHTML += "<p> Opponent\'s Last Move:" + opponent.lastMove + "</p>"
	document.getElementById("choices").innerHTML += "<button type='button'  onclick='poll()'>Poll For Opponent\'s Influence </button>"
	
	//Adds events to button list randomly from those available Prevents Duplicates	
	for(var i = 0;i<2;i++)
	{
		var addEvent = true;
		var random = Math.floor(Math.random() * 3);
		var currentEvent = events[random];
		for(var j = 0;j<currentEvents.length;j++)
		{
			if(currentEvent.name == currentEvents[j].name)
			{
				addEvent = false;
			}
			
		}
		
		if(addEvent)
		{
			currentEvents.push(currentEvent);
			var eventDescription =currentEvent.name + " - " + currentEvent.timeRequired;
			document.getElementById("choices").innerHTML += "<button onclick='action( "+ currentEvent.actionChoice+" )'>" + eventDescription + " hours </button>"
			//document.getElementById("choices").innerHTML += "<button onclick='action("+ currentEvent.type +","+currentEvent.id+","+currentEvent.groupPos+"," + currentEvent.groupNeg +")'>" + eventDescription + " hours </button>"
		}
		else
		{
			i--;
		}
	}
	
	//Show changes to screen
	document.getElementById("choices").style.display = "block";
};

function event(type, id, groupPos, groupNeg)
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	chosenEvent = events[id];
	
	switch (type) 
	{
    case "minigame":
		
        break;
		
    case "smallEvent":
        var eventHours = chosenEvent.timeRequired;
		var eventDisplay = document.createElement("p");
		var paratext = document.createTextNode(chosenEvent.desc);
		eventDisplay.appendChild(paratext);
		document.getElementById("event").appendChild(eventDisplay);
		
		for(var i =0; i<chosenEvent.options.length; i++)
		{
			document.getElementById("event").innerHTML += "<p>" + chosenEvent.options[i].optionName + ": </p>";
			document.getElementById("event").innerHTML += "<input type='checkbox' id = " + chosenEvent.options[i].optionName+" >";
		}
		document.getElementById("event").innerHTML += "<br> <button type='button' onclick='submitAction(" + type + "," + id + "," + groupPos + "," + groupNeg + ")' > Perform Event </button>";

		break;
		
    case "largeEvent":
	
        break;
	} 

	//Show changes to screen
	document.getElementById("event").style.display = "block";
};
function action(choice) 
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	chosenEvent = events[choice];
	
	if(chosenEvent.type=="minigame")
	{
		//Call the function of the minigamegame from the DB
	}
	else if(chosenEvent.type=="smallEvent")
	{
		var eventHours = chosenEvent.timeRequired;
		var eventDisplay = document.createElement("p");
		var paratext = document.createTextNode(chosenEvent.desc);
		eventDisplay.appendChild(paratext);
		document.getElementById("event").appendChild(eventDisplay);
		
		for(var i =0; i<chosenEvent.options.length; i++)
		{
			document.getElementById("event").innerHTML += "<p>" + chosenEvent.options[i].optionName + ": </p>";
			document.getElementById("event").innerHTML += "<input type='checkbox' id = " + chosenEvent.options[i].optionName+" >"
		}
		document.getElementById("event").innerHTML += "<br> <button type='button' onclick='submitAction(" + choice + "," + eventHours + ")' > Perform Event </button>"
	}
	else if(chosenEvent.type=="largeEvent")
	{
			
	}
	

	//Show changes to screen
	document.getElementById("event").style.display = "block";
};

function submitAction(choice, eventHours)//(type, id, groupPos, groupNeg)
{
	chosenEvent = events[choice];
	for(var j =0; j<chosenEvent.options.length-1; j++)
	{
		if(document.getElementById(chosenEvent.options[j].optionName).checked == true)
		{
			eventHours+= chosenEvent.options[j].extraTime;
		}
	}
	remainingHours-= eventHours;
	playerScore++;
	//scoreChanger(scoreInc, groupPos, groupNeg)
	if(remainingHours<4)
	{
		gameCycleEnd();
	}
	else
	{
		userAction();
	}
};

function scoreChanger(scoreInc, groupPos, groupNeg)
{
	switch (groupPos) 
	{
		case "Res":
			playerScore[5]+scoreInc;
			break;
			
		case "Soc":
			playerScore[6]+scoreInc;
			break;
			
		case "Read":
			playerScore[7]+scoreInc;
			break;
		case "Ath":
			playerScore[8]+scoreInc;
			break;
			
		case "Medis":
			playerScore[9]+scoreInc;
			break;
			
		case "Bus":
			playerScore[10]+scoreInc;
			break;
			
		case "Fine Arts":
			playerScore[11]+scoreInc;
			break;
			
		case "Lib Arts":
			playerScore[12]+scoreInc;
			break;
			
		case "Eng":
			playerScore[13]+scoreInc;
			break;
			
		case "Tech":
			playerScore[14]+scoreInc;
			break;
			
		case "Poor":
			playerScore[15]+scoreInc;
			break;
			
		case "Low":
			playerScore[16]+scoreInc;
			break;
			
		case "Lower Mid":
			playerScore[17]+scoreInc;
			break;
			
		case "Upper Mid":
			playerScore[18]+scoreInc;
			break;
			
		case "High":
			playerScore[19]+scoreInc;
			break;
		
		case "Focus":
			break;
			
		case "Fame":
		
			break;
			
		case "Opp Focus":
		
			break;
			
		case "Opp Fame":
			
			break;
	
	}
	
	switch (groupNeg) 
	{
		case "Res":
			playerScore[0]+scoreInc;
			break;
			
		case "Soc":
			playerScore[1]+scoreInc;
			break;
			
		case "Read":
			playerScore[2]+scoreInc;
			break;
		case "Ath":
			playerScore[3]+scoreInc;
			break;
			
		case "Medis":
			playerScore[4]+scoreInc;
			break;
			
		case "Bus":
			playerScore[5]+scoreInc;
			break;
			
		case "Fine Arts":
			playerScore[6]+scoreInc;
			break;
			
		case "Lib Arts":
			playerScore[7]+scoreInc;
			break;
			
		case "Eng":
			playerScore[8]+scoreInc;
			break;
			
		case "Tech":
			playerScore[9]+scoreInc;
			break;
			
		case "Poor":
			playerScore[10]+scoreInc;
			break;
			
		case "Low":
			playerScore[11]+scoreInc;
			break;
			
		case "Lower Mid":
			playerScore[12]+scoreInc;
			break;
			
		case "Upper Mid":
			playerScore[13]+scoreInc;
			break;
			
		case "High":
			playerScore[14]+scoreInc;
			break;
		
		case "Focus":
			
			break;
			
		case "Fame":
		
			break;
			
		case "Opp Focus":
		
			break;
			
		case "Opp Fame":
			
			break;
	
	}
}

function reportViewer()
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	document.getElementById("gameInfo").innerHTML += "<p> Report Here </p> <button onclick = 'userAction()'> Return to User Action Area </button>";
};
function poll()
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	document.getElementById("gameInfo").innerHTML += "<p> Poll Question Selector Here </p> <button onclick = 'pollResults()'> Poll the Sample </button>";
};
function pollResults()
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	document.getElementById("gameInfo").innerHTML += "<p> Poll Results Here </p> <button onclick = 'userAction()'> Return to User Action Area </button>";
};

function gameCycleEnd()
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	document.getElementById("gameInfo").innerHTML += "<p> You Win/Lose </p> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};

/* OLD GAME CYCLE FUNCTIONS*/
function gameQuestions(){

	var stats = samplePositions();
	
	a1 = document.getElementById('q1').value;
	a2 = document.getElementById('q2').value;
	a3 = document.getElementById('q3').value;
	a4 = document.getElementById('q4').value;
	correctflag = 0;
	sampleLength = sample.length;
	like = stats[0];
	neutral = stats[1];
	dislike = stats[2];

	//how many are for you
	correctAnswer1 = ((like/sampleLength) * 100).toFixed(2);
	correctAnswer2 = ((neutral/sampleLength) * 100).toFixed(2);
	correctAnswer3 = ((dislike/sampleLength) * 100).toFixed(2);
	correctAnswer4 = ((sampleLength/1000) * 100).toFixed(2);

	var textNode;
	if(a1 == correctAnswer1){
		textNode = "You got Question 1 Correct!" ; 
		correctflag++;
	}
	else{

		textNode = "You got Question 1 Incorrect! "; 
	}
	if(a2 == correctAnswer2){
		textNode += "You got Question 2 Correct! "; 
		correctflag++;
	}
	else{

		textNode += " You got Question 2 Incorrect! "; 
	}
	if(a3 == correctAnswer3){
		textNode += "You got Question 3 Correct! "; 
		correctflag++;
	}
	else{

		textNode += "You got Question 3 Incorrect! "; 
	}
	if(a4 == correctAnswer4){
		textNode += "You got Question 4 Correct! "; 
		correctflag++;
	}
	else{

		textNode += "You got Question 4 Incorrect! "; 
	}
	gameCycleEnd(textNode);
};


function gameCycleEndOld(text){
	var gameDiv = document.getElementById("gameInfo");
	while(gameDiv.firstChild){
		gameDiv.removeChild(gameDiv.firstChild);
	}
	document.getElementById("questions").style.display = "none";
	
	var para = document.createElement("p");
	var paratext = document.createTextNode(text);
	para.appendChild(paratext);
	document.getElementById("gameInfo").appendChild(para);
	
	var result = "With the data you've been given, you realize that you can raise the general public's opinion on your position."
	
	para = document.createElement("p");
	paratext = document.createTextNode(result);
	para.appendChild(paratext);
	document.getElementById("gameInfo").appendChild(para);
	document.getElementById("choices").style.display = "block";
};

function gameCycleStartOld(f){
	player.focus = positions[f];
	player.focusnum = f;
	var gameDiv = document.getElementById("gameInfo");
	while(gameDiv.firstChild){
		gameDiv.removeChild(gameDiv.firstChild);
	}
	var h2 = document.createElement("h3");
	var intro = "You've chosen " + positions[f] + " as your main position you will fight for."
	var introduction = document.createTextNode(intro);
	h2.appendChild(introduction);
	document.getElementById("gameInfo").appendChild(h2);
	//make a sample
	createSample(Math.floor(Math.random() *100) + 35);
	//ask the sample a question
	var para = document.createElement("p");
	var text = "We have asked the sample you've taken of "+ sample.length+ " out of 1000 students.  We asked them how they feel about " + player.focus; + "and they have answered..."
	var paratext = document.createTextNode(text);
	para.appendChild(paratext);
	document.getElementById("gameInfo").appendChild(para);

	//lets find out how they feel about your position
	var r = samplePositions(player.focusnum);
	var para2 = document.createElement("p");
	var text = r[0] + " agree on your position, " + r[1] + " are neutral on your position, and " + r[2] + " are against your position."; 
	var para2text = document.createTextNode(text);
	para2.appendChild(para2text);
	document.getElementById("gameInfo").appendChild(para2);
	document.getElementById("questions").style.display = "block"; 
	
	var textNode;
	for(var z = 0; z < sample.length; z++){
		textNode += sample[z];
		textNode += "<br>";
	}
	
	var button = document.getElementById("answerButton");
	button.onclick = gameQuestions;
};

function changePlayerStats(num){
	
	
	if(num ==.3){
		var textNode = "You created posters and were able to raise people's standing for " + player.focus + ".";
		
	}
	else if(num == .4){
		var textNode = "You created a newsletter and were able to raise people's standing for " + player.focus + ".";
	}
	else if(num == .6){
		var textNode = "You spent time setting up a table in the Student Union and were able to raise people's standing for " + player.focus + ".";
	}
	
	switch(player.focusnum){
		case 0:
			player.tuitionVar += num;
			break;
		case 1:
			player.athleticVar += num;
			break;
		
		case 2:
			player.researchVar += num;
			break;
		
		case 3:
			player.eventsVar += num;
			break;
		
		case 4:
			player.medicalVar += num;
			break;
		
	}
	console.log(player);
	
	var gameDiv = document.getElementById("gameInfo");
	while(gameDiv.firstChild){
		gameDiv.removeChild(gameDiv.firstChild);
	}
	document.getElementById("choices").style.display = "none";

	var para = document.createElement("p");
	var paratext = document.createTextNode(textNode);
	para.appendChild(paratext);
	gameDiv.appendChild(para);

};


function samplePositions(){
	var like = 0
	var neutral = 0;
	var dislike = 0;
	playerPosition = player.focusnum;


	if(playerPosition = 0){
		for(var x = 0; x < sample.length; x++){
			if(sample[x].tuitionScore >=2){
				like++;
			}
			else if(sample[x].tuitionScore > -2 && sample[x].tuitionScore < 2){
				neutral++;
			}
			else if(sample[x].tuitionScore <=-2){
				dislike++;
			}
		}
	}
	else if(playerPosition = 1){
	for(var x = 0; x < sample.length; x++){
			if(sample[x].athleticScore >=2){
				like++;
			}
			else if(sample[x].athleticScore > -2 && sample[x].athleticScore < 2){
				neutral++;
			}
			else if(sample[x].athleticScore <=-2){
				dislike++;
			}
		}
	}
	else if(playerPosition = 2){
		for(var x = 0; x < sample.length; x++){
			if(sample[x].researchScore >=2){
				like++;
			}
			else if(sample[x].researchScore > -2 && sample[x].researchScore < 2){
				neutral++;
			}
			else if(sample[x].researchScore <=-2){
				dislike++;
			}
		}
	}
	else if(playerPosition = 3){
		for(var x = 0; x < sample.length; x++){
			if(sample[x].eventScore >=2){
				like++;
			}
			else if(sample[x].eventScore > -2 && sample[x].eventScore < 2){
				neutral++;
			}
			else if(sample[x].eventScore <=-2){
				dislike++;
			}
		}
	}
	else if(playerPosition = 4){
		for(var x = 0; x < sample.length; x++){
			if(sample[x].medicalScore >=2){
				like++;
			}
			else if(sample[x].medicalScore > -2 && sample[x].medicalScore < 2){
				neutral++;
			}
			else if(sample[x].medicalScore <=-2){
				dislike++;
			}
		}
	}

	var results = [like, neutral, dislike]
	return results;

};

window.onload = startGame();

//Uncomment this to disable the console.
//window.console.log = function(){
//    console.error('The ability to view the console is disabled for security purposes.');
//    window.console.log = function() {
//        return false;
//    }
//}



