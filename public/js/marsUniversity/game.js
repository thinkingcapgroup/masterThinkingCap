//making all the score presets
var groupList = ["socialite", "athlete", "researcher", "mediaLover", "reader"];
var majorList = ["business", "engineering", "tech", "fineArts", "libArts"];
var stuEconomic = ["poverty", "low", "midLow", "midHigh", "high"];
var playerCandidate = new CandidateCreate("ph");
var opponentCandidate = new CandidateCreate("Liz");
var fakeCandidateHolder = []
var currentCandidateArrayHolder = []
var graphData = [];


var fakeCandidateYou = new CandidateCreate('FakeCandidate1');
var fakeCandidateOther = new CandidateCreate('FakeCandidate2');
fakeCandidateYou.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
fakeCandidateOther.fame = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
fakeCandidateHolder.push(fakeCandidateYou);
fakeCandidateHolder.push(fakeCandidateOther);


var tableHeaders = ["Favored Issue", "Least Favored Issue", "Favored Candidate", "Least Favored Candidate", "Major", "Class", "Group", "Our Candidate's Fame", "Our Candidate's Trust", "Issue Support: ", "Candidate's Fame: ","Candidate's Trust: "];
var tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
var pastPollChoices = [];
var pastPollResults = [];
var pastPollSizes = [];
var pastGraphData = [];
var pastGraphLabels = [];
var raceArray = ["Android", "Human", "Martian"];
var genderArray = ["Non-Binary", "Female", "Male"];
var bodyTypeArray = ["Thin", "Medium", "Plus", "HoverChair"];
var back = false;
var num = 1;
var textContents;
var saveState;
var c;
var ctx;
var qPollHolder;
var ranking;
var practice = false;
var section = 1;

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
//the score goes tuition, tuition var, athletic, athletic var, research, research var, events, events var, medical, issueScore[4]
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
];

var oppChoice = [];
var chosenCandRanks = [];
var currentEvents = [];
var sample = [];
var events=[];
var questions=[];
var candidates=[];

//playerIssues

//sprites
var spriteHead = new Image();
spriteHead.src = "../img/spritehead.png";
//sample person
function Student(group, ecoClass, major, tuitionScore, athleticScore, researchScore, eventScore, medicalScore)
{
	this.group = group;
	this.ecoClass = ecoClass;
	this.major = major;
	this.athleticScore = athleticScore;
	this.researchScore = researchScore;
	this.tuitionScore = tuitionScore;
	this.eventScore = eventScore;
	this.medicalScore = medicalScore;
}

//setting up some more variables

var turnCounter;
var population;
var sample;
var startHours;
var remainingHoursTotal;
var days;
var remainingHoursDay;

var population = 1000;
var canvasMouse;

//starts the game
function startGame(){

	//whatever other things we have to do when initializing the game here
	var date = Date.now();


	//console.log(saveState);
	var Json;
	var oReq = new XMLHttpRequest();
	oReq.onload = function (e)
	{
		Json = JSON.parse(this.responseText);
		events = Json.events;
		questions = Json.questions;
	};
	oReq.open("get", "json/data.json", true);
	oReq.send();
}

/*GAME INTRO FUNCTIONS8*/
function splashScreen()
{
	clearScreen();
	document.getElementById("gameInfo").innerHTML = "<div id = 'intro' style = 'text-align:center; '><br><h1 >Welcome to Mars University! </h1><br><a onclick = 'startAnimatic()' id='index-link' class = 'btn double remove' >New Game</a><br><br><a onclick = 'loadGame()' id='index-link' class = 'btn double remove'>Continue</a><br><br><a onclick = 'startPractice()' id='index-link' class = 'btn double remove'>Practice</a></div>";
}

function startAnimatic()
{
	document.getElementById("gameInfo").innerHTML = "<p>Welcome to Mars University! <br>Animatic will be going on here during this time. </p> </br> <a onclick = 'startCharacterSelect()' class = 'btn double remove'>Continue After Animatic Finish</a>";
}

function startPractice()
{
	clearScreen();
	practice = true;
	document.getElementById("gameInfo").innerHTML = "<div id = 'practice' style = 'text-align:center; '><br><h1 >Practice</h1><br><a onclick = 'practicePoll()' id='index-link' class = 'btn double remove'>Polling Tutorial</a><br><br><a onclick = 'practiceGame(1)' id='index-link' class = 'btn double remove'>Minigame 1</a><br><br><br><br><a onclick = 'practiceGame(2)' id='index-link' class = 'btn double remove'>Minigame 2</a></div> <br><br><a onclick = 'splashScreen()' id='index-link' class = 'btn double remove'>Return to Start Menu</a>";
}

function helpScreen()
{
	clearScreen();
	document.getElementById("playerInfo").style.display = "none";
	document.getElementById("gameInfo").innerHTML = "<h1> Help</h1> <hr> <button onclick= 'openGlossary()'>Glossary Page</button> <button onclick= 'tutorial("+true+")'>Start the Tutorial</button> <button onclick= 'userAction()'>Return to User Action Area</button>"
}

function openGlossary()
{
	clearScreen();
	document.getElementById("playerInfo").style.display = "none";
	document.getElementById("gameInfo").innerHTML = "<h1> Glossary</h1> <hr> <ul style='list-style-type:none'><li>Data: Specific Information about a group of people or objects.</li> <li>Population: The Data for ALL people or objects. </li> <li>Sample: The Data that is measured, counted, or designated as a category for SELECTED people or objects.</li>  </ul> <button onclick= 'userAction()'>Return to User Action Area</button>"
}

function startCharacterSelect(){
	var prevHours = document.getElementById("playerInfo");
	prevHours.innerHTML = "";
	resetGame();
	//character creator here
	//for right now we'll do a drop down option
	document.getElementById("gameInfo").innerHTML = "<h1>Character Creation</h1>";
	document.getElementById("gameInfo").innerHTML += "<canvas id='myCanvas' width='500px' height = '600px'></canvas><br>";
	document.getElementById("gameInfo").innerHTML += "<button class = 'live'id ='headbutton'>Heads</button>";
	document.getElementById("gameInfo").innerHTML += "<button class = 'live'id ='racebutton'>Race</button>";
	document.getElementById("gameInfo").innerHTML += "<button id ='clothingbutton'>Gender</button>";
	document.getElementById("gameInfo").innerHTML += "<button id ='bodybutton'>BodyType</button><br>";
	document.getElementById("gameInfo").innerHTML += "<label>Candidate Name: </label><input id='charName' type='text' value = 'Val'/><br>";
	document.getElementById("gameInfo").innerHTML += "<button id='candidateCre'>Create Candidate</button><br>";

	var c=document.getElementById("myCanvas");
	//creates a sprite for the headsheets
	var headSheet = new Sprite({context: c.getContext("2d"), width: 155, height: 171, image: heads});
	var bodySheet = new Sprite({context: c.getContext("2d"), width: 164, height: 343, image: thinBody});

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
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d")
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
function Sprite(options){
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
	document.getElementById("gameInfo").innerHTML += "<p>You're candidate, <b>"+ playerCandidate.name +"</b> is going up again Liz the Chameleon. They're going for Student Council President just like your playerCandidate. Whenever any student wishes to campaign, the current student government will give the candidate some information about the student body.</p>"
	document.getElementById("gameInfo").innerHTML += "<p>Do you wish to start the tutorial?</p>"
	document.getElementById("gameInfo").innerHTML += "<button onclick='tutorial("+false+")'>Yes</button><button onclick='actualSessionStart(false)'>No</button>";

}


function actualSessionStart(isFromTut){
	var tutHolder = isFromTut
	clearScreen();
	

	candidates = [];
	
	population = 1000;
	sample = [];
	startHours = 120; 
	remainingHoursTotal = startHours;
	days = 1; 
	remainingHoursDay = 12; 
	
	//Decides the opponents focus which cannot be the same as the player
	opponentCandidate.fame = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	opponentCandidate.consMod = 0;
	////console.log(oppFocus);
	chooseIssue(opponentCandidate,[],1,false);
	candidates.push(opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new CandidateCreate("Martian Dog");
	issueCand1.focus = positions[0];
	issueCand1.focusnum = 0;
	chooseRank(issueCand1,chosenCandRanks,true);
	candidates.push(issueCand1);

	var issueCand2  = new CandidateCreate("Clamps");
	issueCand2.focus = positions[4];
	issueCand2.focusnum = 4;
	chooseRank(issueCand2,chosenCandRanks,true);
	candidates.push(issueCand2);

	var issueCand3  = new CandidateCreate("Zrap Bannigan");
	issueCand3.focus = positions[1];
	issueCand3.focusnum = 1;
	chooseRank(issueCand3,chosenCandRanks,true);
	candidates.push(issueCand3);

	var issueCand4  = new CandidateCreate("Cowboy");
	issueCand4.focus = positions[3];
	issueCand4.focusnum = 3;
	chooseRank(issueCand4,chosenCandRanks,true);
	candidates.push(issueCand4);

	var issueCand5  = new CandidateCreate("Martian Scientist");
	issueCand5.focus = positions[2];
	issueCand5.focusnum = 2;
	chooseRank(issueCand5,chosenCandRanks,true);
	candidates.push(issueCand5);
	
	map(0,true,true);
}

function practicePoll()
{
	

	candidates = [];
	
	population = 1000;
	sample = [];
	startHours = 120; 
	remainingHoursTotal = startHours;
	days = 1; 
	remainingHoursDay = 12; 
	
	//Decides the opponents focus which cannot be the same as the player
	opponentCandidate.fame = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	opponentCandidate.consMod = 0;
	////console.log(oppFocus);
	chooseIssue(opponentCandidate,[],1,false);
	candidates.push(opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new CandidateCreate("Martian Dog");
	issueCand1.focus = positions[0];
	issueCand1.focusnum = 0;
	chooseRank(issueCand1,chosenCandRanks,true);
	candidates.push(issueCand1);

	var issueCand2  = new CandidateCreate("Clamps");
	issueCand2.focus = positions[1];
	issueCand2.focusnum = 1;
	chooseRank(issueCand2,chosenCandRanks,true);
	candidates.push(issueCand2);

	var issueCand3  = new CandidateCreate("Zrap Bannigan");
	issueCand3.focus = positions[2];
	issueCand3.focusnum = 2;
	chooseRank(issueCand3,chosenCandRanks,true);
	candidates.push(issueCand3);

	var issueCand4  = new CandidateCreate("Cowboy");
	issueCand4.focus = positions[3];
	issueCand4.focusnum = 3;
	chooseRank(issueCand4,chosenCandRanks,true);
	candidates.push(issueCand4);

	var issueCand5  = new CandidateCreate("Martian Scientist");
	issueCand5.focus = positions[4];
	issueCand5.focusnum = 4;
	chooseRank(issueCand5,chosenCandRanks,true);
	candidates.push(issueCand5);
	
	map(2,false,false);
}

function firstStatement()
{
	clearScreen();
	document.getElementById("gameInfo").innerHTML = "<p>First let's have your candidate pick their focus </p><br.<br>"
	for (var x=0; x < 5; x++){

	document.getElementById("gameInfo").innerHTML += "<button onclick = 'gameCycleStart("+x+")'>"+ positions[x]+"</button>"
	}
}

/*GAME CYCLE FUNCTIONS8*/
function gameCycleStart(f)
{

	turnCounter = 1
	playerCandidate.focus = positions[f];
	playerCandidate.focusnum = f;
	switch(f)
	{
		case 0:
		playerCandidate.issueScore[0]++;
		break;
		case 1:
		playerCandidate.issueScore[1]++;
		break;
		case 2:
		playerCandidate.issueScore[2]++;
		break;
		case 3:
		playerCandidate.issueScore[3]++;
		break;
		case 4:
		playerCandidate.issueScore[4]++;
		break;
	}
	candidates.splice(0,0,playerCandidate);
	

	document.getElementById("playerInfo").innerHTML += "<h3> Day: " + days +" </br> Remaining Hours Today: " + remainingHoursDay + "</h3><hr>";	
	userAction();
};

function userAction()
{
	//Clear previous screen
	clearScreen();
	document.getElementById("playerInfo").style.display = "block";
	var prevHours = document.getElementById("playerInfo");
	var nextArea = document.getElementById("next");
	prevHours.innerHTML = "";
	nextArea.innerHTML = "";

	if(!back){
		saveGameState();
	}

	//Build User Action Area buttons
	document.getElementById("playerInfo").innerHTML += "<h3> Day: " + days +" </br> Remaining Hours Today: " + remainingHoursDay + "</h3><hr>";	
	document.getElementById("choices").innerHTML += "<button type='button' onclick='map("+0+",false,false)'> Take A Poll </button>";
	document.getElementById("choices").innerHTML += "<button type='button' onclick='statement()'> Make a Statement - 1 Hour</button>";
	document.getElementById("choices").innerHTML += "<button type='button' onclick='helpScreen()'> Help Screen</button>";
	document.getElementById("choices").innerHTML += "<button type='button' class='logEventEnd' onclick='gameCycleEnd()'> Skip to the End </button>";
	document.getElementById("choices").innerHTML += "<br>";
	for(var i=0; i<pastPollResults.length;i++)
	{
		var num = i+1;
		document.getElementById("choices").innerHTML += "<button type='button' onclick='reportViewer("+i+")' >View Poll "+ num +" Result </button>";
	}
	document.getElementById("gameInfo").innerHTML += "<h3 style = 'float: right'> Rival\'s Last Move: " + candidates[1].lastMove + "</h3>";
	document.getElementById("choices").innerHTML += "<br>";

	currentEvents = [];

	//Adds events to button list randomly from those available and Prevents Duplicates and events with more time than is available
	for(var i = 1;i<events.length;i++)
	{
		currentEvents.push(events[i]);
		var eventDescription = events[i].name + " - " + events[i].timeRequired;
		var arrayPos = events[i].id -1;
		document.getElementById("choices").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
	}
	document.getElementById("choices").innerHTML += "<button onclick='action()'>Perform Action</button>";
	document.getElementById("actionRadio1").checked = true;

	//Show changes to screen
	document.getElementById("choices").style.display = "block";
};

function action()
{
	//Clear previous screen
	var choice = $('input[name="actionRadio"]:checked').val();
	clearScreen();

	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";
	chosenEvent = events[choice];
	//console.log(chosenEvent);
	back = false;

	//document.getElementById("choices").innerHTML += "<button type='button' onclick='userAction()' >View Poll "+ num +" Result </button>";
	if(remainingHoursDay >= chosenEvent.timeRequired)
	{
		chosenEvent = events[choice];

		if(chosenEvent.type=="smallEvent")
		{
			//Creates the screen for the event
			var eventHours = parseInt(chosenEvent.timeRequired);
			document.getElementById("event").innerHTML += "<h4>" + chosenEvent.text + " </h4>";
			if(chosenEvent.groupPos != [])
			{
				var effects = chosenEvent.groupPos.split(',');
				var posText =  "<h4> These Groups will be affected positively: ";
				for (var i =0; i< effects.length;i++)
				{
				switch(effects[i])
				{
					case "Poor":
						posText += "Poor Economic Status";
					break;

					case "Low":
						posText += "Lower Economic Status";
					break;
					case "Low Mid":
						posText += "Low Middle Economic Status";
					break;
					case "Upper Mid":
						posText += "Upper Middle Economic Status";
					break;
					case "High":
						posText += "Upper Economic Status";
					break;

					case "Fine Arts":
						posText += "Fine Arts Major";
					break;

					case "Bus":
						posText += "Business Major";
					break;
					case "Eng":
						posText += "Engineering Major";
					break;
					case "Lib Arts":
						posText += "Liberal Arts Major";
					break;
					case "Tech":
						posText += "Technology Major";
					break;

					case "Media":
						posText += "Media Lover Group";
					break;

					case "Soc":
						posText += "Socialite Group";

					break;
					case "Read":
						posText += "Reader Group";

					break;
					case "Res":
						posText += "Researcher Group";

					break;
					case "Ath":
						posText += "Athlete Group";

					break;
				}
				if(i != effects.length-1)
				{
					posText += ", ";
				}
				else{
					posText += " ";
				}
			}
				document.getElementById("event").innerHTML += posText+ " </h4>";
			}
			if(chosenEvent.groupNeg != [])
			{
				var negEffects = chosenEvent.groupNeg.split(',');
				var negText =  "<h4> These Groups will be affected negatively: ";
				for (var i =0; i< negEffects.length;i++)
				{
				switch(negEffects[i])
				{
					case "Poor":
						negText += "Poor Economic Status";
					break;

					case "Low":
						negText += "Lower Economic Status";
					break;
					case "Low Mid":
						negText += "Low Middle Economic Status";
					break;
					case "Upper Mid":
						negText += "Upper Middle Economic Status";
					break;
					case "High":
						negText += "Upper Economic Status";
					break;

					case "Fine Arts":
						negText += "Fine Arts Major";
					break;

					case "Bus":
						negText += "Business Major";
					break;
					case "Eng":
						negText += "Engineering Major";
					break;
					case "Lib Arts":
						negText += "Liberal Arts Major";
					break;
					case "Tech":
						negText += "Technology Major";
					break;

					case "Media":
						negText += "Media Lover Group";
					break;

					case "Soc":
						negText += "Socialite Group";

					break;
					case "Read":
						negText += "Reader Group";

					break;
					case "Res":
						negText += "Researcher Group";

					break;
					case "Ath":
						negText += "Athlete Group";

					break;
				}
				if(i != negEffects.length-1)
				{
					negText += ", ";
				}
				else{
					negText += " ";
				}
			}
				document.getElementById("event").innerHTML += negText+ " </h4>";
			}


			for(var i =0; i<chosenEvent.options.length; i++)
			{
				var totalText = "";
				if( (eventHours + parseInt(chosenEvent.options[i].extraTime)) <= remainingHoursDay)
				{
					var posText ="";
					var negText = "";
					if(chosenEvent.options[i].posEffects != [])
					{
						var effects = chosenEvent.options[i].posEffects.split(',');
						posText =  " -  Positive Effects: ";
						for (var j =0; j< effects.length;j++)
						{
							switch(effects[j])
							{
								case "Poor":
									posText += "Poor Economic Status";
								break;

								case "Low":
									posText += "Lower Economic Status";
								break;
								case "Low Mid":
									posText += "Low Middle Economic Status";
								break;
								case "Upper Mid":
									posText += "Upper Middle Economic Status";
								break;
								case "High":
									posText += "Upper Economic Status";
								break;

								case "Fine Arts":
									posText += "Fine Arts Major";
								break;

								case "Bus":
									posText += "Business Major";
								break;
								case "Eng":
									posText += "Engineering Major";
								break;
								case "Lib Arts":
									posText += "Liberal Arts Major";
								break;
								case "Tech":
									posText += "Technology Major";
								break;

								case "Media":
									posText += "Media Lover Group";
								break;

								case "Soc":
									posText += "Socialite Group";

								break;
								case "Read":
									posText += "Reader Group";

								break;
								case "Res":
									posText += "Researcher Group";

								break;
								case "Ath":
									posText += "Athlete Group";

								break;
							}
							if(j != effects.length-1)
							{
								posText += ", ";
							}
							else{
								posText += " ";
							}
						}
					}
					totalText += posText;
					if(chosenEvent.options[i].negEffects != [])
					{
						var negEffects = chosenEvent.options[i].negEffects.split(',');
						negText =  " -  Negative Effects: ";
						for (var j =0; j< negEffects.length;j++)
						{
							switch(negEffects[j])
							{
								case "Poor":
									negText += "Poor Economic Status";
								break;

								case "Low":
									negText += "Lower Economic Status";
								break;
								case "Low Mid":
									negText += "Low Middle Economic Status";
								break;
								case "Upper Mid":
									negText += "Upper Middle Economic Status";
								break;
								case "High":
									negText += "Upper Economic Status";
								break;

								case "Fine Arts":
									negText += "Fine Arts Major";
								break;

								case "Bus":
									negText += "Business Major";
								break;
								case "Eng":
									negText += "Engineering Major";
								break;
								case "Lib Arts":
									negText += "Liberal Arts Major";
								break;
								case "Tech":
									negText += "Technology Major";
								break;

								case "Media":
									negText += "Media Lover Group";
								break;

								case "Soc":
									negText += "Socialite Group";

								break;
								case "Read":
									negText += "Reader Group";

								break;
								case "Res":
									negText += "Researcher Group";

								break;
								case "Ath":
									negText += "Athlete Group";

								break;
							}
							if(j != negEffects.length-1)
							{
								negText += ", ";
							}
							else{
								negText += " ";
							}
						}
					}
					totalText += negText;
					document.getElementById("event").innerHTML += "<input type='radio' name = 'option' id = " + chosenEvent.options[i].optionID + ">" + chosenEvent.options[i].optionName + " - " + chosenEvent.options[i].extraTime +" Additional Hours" +totalText+"<br>";
				}
			}

		}
	document.getElementById("event").innerHTML += "<br> <button type='button' class='logEvent' id='"+choice+"' onclick='submitAction(" + choice + "," + eventHours + ")' > Perform Event </button><br>";
	}
	else
	{
		document.getElementById("event").innerHTML += "<h4> You dont have the enough time left to do the selected action. \n Return to the User Action area to select another action or end the game.</h4>";
	}


	document.getElementById("event").innerHTML += "<br> <button type='button' onclick='backtoUA()' > Choose a Different Action </button>";
	//Show changes to screen
	document.getElementById("event").style.display = "block";
};

//Subtracts from the remaining hours,
function submitAction(id, eventHours)
{

	//Subtracts hours from the remaining hours in the game
	chosenEvent = events[id];
	var totalPosEffects = [];
	totalPosEffects = chosenEvent.groupPos.split(",");
	var totalNegEffects = [];
	totalNegEffects = chosenEvent.groupNeg.split(",");

	if(chosenEvent.options.length > 0)
	{
		var playGame = false;
		var radio = document.getElementsByName("option");
		var check;
		var loaderNum;
		for (i = 0; i < radio.length; i++) 
		{
				if(radio[i].checked == true)
					check = radio[i].id;
		}

		for(var j =0; j<chosenEvent.options.length; j++)
		{
			if( check == chosenEvent.options[j].optionID)
			{
				if(chosenEvent.options[j].type == "boost")
				{
					eventHours+= parseFloat(chosenEvent.options[j].extraTime);
					//Add Positive/Negative Effects to event based on JSOn
					var optionPosEffects = chosenEvent.options[j].posEffects.split(",");
					var optionNegEffects = chosenEvent.options[j].negEffects.split(",");
					for(var i =0;i<optionPosEffects.length;i++)
					{totalPosEffects.push(optionPosEffects[i]);}

					for(var k =0;k<optionNegEffects.length;k++)
					{totalNegEffects.push(optionNegEffects[k]);}
				}
				else if (chosenEvent.options[j].type == "game")
				{
					playGame = true;
					loaderNum =chosenEvent.options[j].loader;
				}
			}
		}
		
		if(playGame)
		{
			remainingHoursTotal-= eventHours;
			remainingHoursDay-= eventHours;
			scoreChanger(candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
			minigamePlayer(parseInt(loaderNum));
		}
		else
			actionResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
	}
		else
			actionResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
}

function actionResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects)
{
	//console.log(remainingHoursTotal)
	remainingHoursTotal-= eventHours;
	remainingHoursDay-= eventHours;

	candidates[1].lastMove = chosenEvent.name;

	//Changes the player's score
	scoreChanger(candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);

	//Checks to see if the game has reached it's end
	hourChecker();
};

//Ends the game
function gameCycleEnd()
{
	//Clear previous screen
	clearScreen();

	var prevHours = document.getElementById("playerInfo");
	var nextArea = document.getElementById("next");
	prevHours.innerHTML = "";
	nextArea.innerHTML = "";


	document.getElementById("playerInfo").innerHTML += "<h3> Day: " + days +" </br> Remaining Hours Today: " + remainingHoursDay + "</h3><hr>";	votePercentage(1000,5);
	var winner;
	var winvotes = 0;
	ranking = candidates.slice();
	ranking.sort(function(a, b){return b.votes-a.votes})
	document.getElementById("gameInfo").innerHTML = "<h1> Rankings: </h1>";
	for(var i = 0; i<ranking.length;i++)
	{
		document.getElementById("gameInfo").innerHTML += "<h1>" + (i+1) + ". " + ranking[i].name + " Votes: " + ranking[i].votes + "</h1><br>";
	}
	document.getElementById("gameInfo").innerHTML += "<h1> Winner: "+ ranking[0].name +"</h1> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};


/*Special Action Pages*/
function tutorial (help)
{
	document.getElementById("gameInfo").innerHTML ="";
	var tutBUttonClicked = false; 
	switch(section)
	{
		case 1:
		
		document.getElementById("gameInfo").innerHTML += "<h3>Groups and Fame</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px;'>Hi, my name is Gui'De, I will help you find your way around MarsU.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"
		document.getElementById("gameInfo").innerHTML += "<br><button onclick='nextSection("+help+");' style='float: right;'>Events and Minigames</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<button float = 'left' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 2:
		document.getElementById("gameInfo").innerHTML += "<h3>Events and Minigames</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'> Though you may be new to the university, MarsU needs you. There is a student government election and all of the candidates are horrible. You need to find a better candidate and help them to win the election.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Groups and Fame</button> <button onclick='nextSection("+help+");' style='float: right; text-decoration: underline;'>Statements</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 3:
		var term = 1;
		document.getElementById("gameInfo").innerHTML += "<h3>Statements</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'> First, you need to know about the students. We have a diverse <span onclick = 'explainTerm("+term+","+help+")' >population</span> here at MarsU including three species: humans, martians, and androids.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Events and Minigames</button> <button onclick='nextSection("+help+");' style='float: right;'>Consistency</button>";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 4:
		document.getElementById("gameInfo").innerHTML += "<h3>Consistency</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Here they are, aren't they cute?</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Statements</button> <button onclick='nextSection("+help+");' style='float: right;'>Polling</button>";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 5:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden'; height:500px></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Unsurprising, they come in different shapes and sizes, and have a wide variety of interests.They may each have a variety of interests, but we can describe them based on their primary interest, their major, and how much money they or their parents have.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 6:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden'; height:500px></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>We don't have a lot of prejudice here at MarsU, but knowing what people like can help you to learn more about them and help them come to know and like your candidate.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 7:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Here are the groups by category. Click an icon for more information. (Show icons with headers).</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 8:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>To win the election, your candidate will need to gain enough fame with some of the groups, particularly the ones that share your the opinions of your platform.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 9:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Your candidate should spend as much time as possible with students, but you have only a few days left, so use your time wisely.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 10:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'> You control your candidate's calendar, so you can have your candidate take actions to increase fame and encourage others to agree with your platform.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 11:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>One of the actions you can take is worth taking some time to explain in detail. You can take a poll to see how the students feel about issues and candidates at the moment. This can, and hopefully will, change over time, but previous polls will remain available to you and can help you determine which actions to take next.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 12:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>When you take a poll you will need to identify which population of students you would like to poll, what questions you wish to ask, and how many students you would like to survey.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 13:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>The results will give you the opinions of your sample.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 14:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Don't worry, the students here at MarsU always tell the truth on polls, but your sample may not be a perfect representation of the population.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 15:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'> Finally, your candidate must make an initial statement showing your platform position. You may have your candidate make additional statements, which can change opinions on an issue.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 16:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Positive statements will increase student opinion on an issue. Negative statements will decrease student opinion. It is a small change, but can make a big difference.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 17:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Realize, students are paying attention to your statements and if you more than a little inconsistent they will stop trusting you.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 18:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>I said polls were important, so I've created a practice polling area where you can create polls and look at polling results.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Consistency</button> <button onclick='nextSection("+help+");' style='float: right;'>Days and Time</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 19:
		document.getElementById("gameInfo").innerHTML += "<h3>Days and Time</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble' style = 'position: relative; border: 2px solid black; overflow:hidden; height:500px'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Try it out, but remember, the data is not real and does not represent the actual students. For that you will need to take a real poll. You can start your election at any time, and you can return here or go to one of the help pages I've created when you have questions.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		if(!help)
			document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Polling</button> <button onclick='map("+1+", false, false)' style='float: right;'>Try Polling</button> ";
		else
			document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Polling</button> <button onclick='map("+3+", false, false)' style='float: right;'>Try Polling</button> <br> <br> <button onclick= 'userAction()'>Return to User Action Area</button>";
			
		break;
	}
}

function nextSection(help)
{
	section++; 
	tutorial(help);
}

function lastSection(help)
{
	section--; 
	tutorial(help);
}

function explainTerm(term, help){
	document.getElementById("gameInfo").innerHTML ="";
	document.getElementById("gameInfo").innerHTML += "<h3>Term ID: "+term+"</h3><hr>";
	document.getElementById("gameInfo").innerHTML += "<p>Term explination here....</p>"
	document.getElementById("gameInfo").innerHTML += "<button onclick = 'tutorial("+help+")'>Back</button>"

}

function map(state, isFirst, isFree){
	clearScreen();

	var prevHours = document.getElementById("playerInfo");
	prevHours.innerHTML = "";
	if( isFree == false && isFirst == false && state ==1){

	}
	else if(isFree == false && isFirst == false && state !=2 ){
		document.getElementById("playerInfo").innerHTML += "<h3> Day: " + days +" </br> Remaining Hours Today: " + remainingHoursDay + "</h3><hr>";
	
	}
	

	if(state == 1||state == 2){
		currentCandidateArrayHolder = candidates;
		candidates = fakeCandidateHolder;
	}

	var timeForPoll = returnTotalPollTime(20,0);
	qPollHolder = 2;
	document.getElementById("event").style = "display:block";
	document.getElementById("event").innerHTML += "<h4>Select an area where you wish to poll.</h4>";
	document.getElementById("event").innerHTML += "<div id = 'mapArea'></div><div id = 'questionArea'></div>";
	document.getElementById("questionArea").innerHTML +="<h4>Population & Sample</h4><br>";
	var buttonLabels = ["Quad", "Coffee Shop", "Gym", "Lab", "Media Room", "Library"];
	document.getElementById("questionArea").innerHTML += "<label>Location: </label><select id = 'location'></select><br>";
	for(x =0; x< buttonLabels.length; x++){
		document.getElementById("location").options.add(new Option(buttonLabels[x],x));
	}
	document.getElementById("questionArea").innerHTML += "<label>Sample Size: </label><select id = 'sample' class = 'sampleOptions totalTimeTracker'><br></select><br><label>Rooms: </label><select id = 'rooms' class = 'sampleOptions'></select><br><label>Time Spent: </label><select id = 'timeSpent' class = 'sampleOptions'></select><hr>";
	back = false;
	if(state != 0 || remainingHoursDay> 3 )
	{

		document.getElementById("sample").options.add(new Option("Sample 20 Students", 20));
		if(remainingHoursDay> 5 )
			document.getElementById("sample").options.add(new Option("Sample 40 Students", 40));
		if(remainingHoursDay> 7 )
			document.getElementById("sample").options.add(new Option("Sample 60 Students", 60));
		if(remainingHoursDay> 9 )
			document.getElementById("sample").options.add(new Option("Sample 80 Students", 80));

			document.getElementById("rooms").options.add(new Option("1 Room", 20));
		if(remainingHoursDay> 5 )
			document.getElementById("rooms").options.add(new Option("2 Rooms", 40));
		if(remainingHoursDay> 7 )
			document.getElementById("rooms").options.add(new Option("3 Rooms", 60));
		if(remainingHoursDay> 9 )
			document.getElementById("rooms").options.add(new Option("4 Rooms", 80));

			document.getElementById("timeSpent").options.add(new Option("1 Hour", 20));
		if(remainingHoursDay> 5 )
				document.getElementById("timeSpent").options.add(new Option("2 Hours", 40));
		if(remainingHoursDay> 7 )
				document.getElementById("timeSpent").options.add(new Option("4 Hours", 60));
		if(remainingHoursDay> 9 )
				document.getElementById("timeSpent").options.add(new Option("8 Hours", 80));


		document.getElementById("questions").innerHTML += "<h4> Poll Questions Every set of one or two questions you add will equal an hour. </h4> <br>";
		//Populates the questions based on the JSON File
		for(var i = 0; i<6 ;i++)
		{
			var none = "";
			document.getElementById("questionArea").innerHTML += " <select class = 'pollQ totalTimeTracker' id =\"poll"+i+ "\"> </select> ";
			document.getElementById("questionArea").innerHTML += " <select class = 'subPollQ' style = 'display:none' id =\"subpoll"+i+ "\"> </select> ";
			document.getElementById("poll"+i+"").options.add(new Option("None", none));
			for(var j = 0; j<questions.length; j++)
			{
				if(!isFirst || state ==2)
				{
					if (j < 4 || j > 8)
					{
						document.getElementById("poll"+i+"").options.add(new Option(questions[j].question, questions[j].value));
					
					}
				}
				else
				{
					if (j < 4 || j > 9)
					{
						document.getElementById("poll"+i+"").options.add(new Option(questions[j].question, questions[j].value));
					
					}
				}
			}
		}
	}
	else
	{
		document.getElementById("event").innerHTML += "<h4> You do not have enough time remaining to take a poll.</h4>";
	}
	if(!isFree)
	{
		document.getElementById("questionArea").innerHTML += "<br> <p id = 'timeParagraph'>Total Time: "+ timeForPoll +" Hours</p><br>";
	}
	else
	{
		document.getElementById("questionArea").innerHTML += "<br> <p id = 'timeParagraph' style = 'display:none'></p><br>";
		addMoreQuestions();
		addMoreQuestions();
	}
	//Displays the screen for this event
	document.getElementById("questionArea").innerHTML += "<button class = 'logEventPoll' onclick = 'pollResults("+state+"," +isFirst+", " +isFree+")'> Submit Poll </button><button id = 'moreQuestionButton'> Add More Questions </button>";
	
	if(state == 1){
		document.getElementById("questionArea").innerHTML += "<br> <hr><button type='button' onclick='actualSessionStart(true)'> Start the Game </button>";
	}
	else if (state == 2){
		document.getElementById("questionArea").innerHTML += "<br> <hr><button type='button' onclick='startPractice()'> Back to Practice Area </button>";
	}
	else if(state == 3)
	{
		document.getElementById("questionArea").innerHTML += "<br> <hr><button type='button' onclick='userAction()'> Return to Game </button>";
	}
	else if(isFirst == true){
		document.getElementById("questionArea").innerHTML += "<br> <hr><button onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";
	}
	else{
		if(!isFree)
			document.getElementById("questionArea").innerHTML += "<br> <button type='button' onclick='backtoUA()' > Choose a Different Action </button>";
		else if(state != 1)
			{
				console.log(state,isFirst, isFree);
				document.getElementById("questionArea").innerHTML += "<br> <button type='button' onclick='userAction()' > Choose Not to Take the Poll  </button>";
			}
	}

	document.getElementById("questionArea").style.display = "block";
	document.getElementById("next").style.display = "block";

	document.getElementById("moreQuestionButton").addEventListener("click", function(){
			addMoreQuestions();
	});
}

//makes the statement screen
function statement(){
	back = false;
	clearScreen();
		document.getElementById("event").style.display = "block";
		document.getElementById("event").innerHTML += "<h4>People want to know how you feel on certain issues. Time to make a statement!</h4>";
		document.getElementById("event").innerHTML += " <select id = 'statements'> </select> ";
		document.getElementById("event").innerHTML += " <select id = 'posneg'> </select> ";

		for(var x = 0; x < positions.length; x++){
			document.getElementById("statements").options.add(new Option(positions[x], x))
		}

		document.getElementById("posneg").options.add(new Option('Positive', 0))
		document.getElementById("posneg").options.add(new Option('Negative', 1))
		document.getElementById("event").innerHTML += "<br> <button type='button' onclick='statementCalc()' > Make Statement </button>";
		document.getElementById("next").innerHTML += "<br> <button type='button' onclick='backtoUA()' > Choose a Different Action </button>";
		document.getElementById("next").style = "display:block";

}

//Minigame
function minigamePlayer(id){
		//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";

	document.getElementById("event").innerHTML += "<div id = 'centerCanvas'><canvas id='myCanvas' width='880px' height = '500px' style = 'margin: 0 auto;'></canvas></div><br>";
	var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");


	c.addEventListener('mousemove', function(evt) {canvasMouse = getMousePos(c, evt);}, false);
	switch(id)
	{
		case 1:
		runningGame.main.init(c,ctx);
		break;
		case 2:
		runningGame2.main.init(c,ctx);
		break;
	}	
}

function practiceGame(id){
		//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";
	
	currentCandidateArrayHolder = candidates;
	candidates = fakeCandidateHolder;
	document.getElementById("event").style = "display:block";
	document.getElementById("event").innerHTML += "<canvas id='myCanvas' width='900px' height = '500px'></canvas><br>";
	var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");


	c.addEventListener('mousemove', function(evt) {canvasMouse = getMousePos(c, evt);}, false);
	switch(id)
	{
		case 1:
		runningGame.main.init(c,ctx);
		break;
		case 2:
		runningGame2.main.init(c,ctx);
		break;
	}	
}


//calculated the effectiveness of your statement & consistancy modifier
function statementCalc()
{
	if(remainingHoursDay > 0)
	{
		var currentStatement = document.getElementById("statements").value;
		var currentPosNeg = document.getElementById("posneg").value;
		//if positive statement
		if(currentPosNeg == 0){
			candidates[0].issueScore[currentStatement] += 0.2;
			if(currentStatement == 0){
				candidates[0].tuitPos += 1;
			}
			else if(currentStatement == 1){
				candidates[0].athPos += 1;
			}
			else if(currentStatement == 2){
				candidates[0].resPos += 1;
			}
			else if(currentStatement == 4){
				candidates[0].medPos += 1;
			}
			else if(currentStatement == 3){
				candidates[0].eventPos += 1;
			}
		}
		//if negative statement
		else{
		
				candidates[0].issueScore[currentStatement] -= 0.2;
				if(currentStatement == 0){
					candidates[0].tuitNeg += 1;
				}
				else if(currentStatement == 1){
					candidates[0].athNeg += 1;
				}
				else if(currentStatement == 2){
					candidates[0].resNeg += 1;
				}
				else if(currentStatement == 4){
					candidates[0].medNeg += 1;
				}
			else if(currentStatement == 3){
				candidates[0].eventNeg += 1;
				}
	
		}
		//calculate the candidate's constitution mod
	
		var tuitCond,
				athCond,
				resCond,
				medCond,
				eventCond;
	
	
		//check if the issues have anything even in them
		if(candidates[0].tuitPos>0 || candidates[0].tuitNeg > 0){
			tuitCond = (Math.min(candidates[0].tuitPos, candidates[0].tuitNeg))/(candidates[0].tuitPos+candidates[0].tuitNeg);
		}
		else{
			tuitCond = 0;
		}
	
		if(candidates[0].athPos>0 || candidates[0].athNeg>0){
			athCond = (Math.min(candidates[0].athPos, candidates[0].athNeg))/(candidates[0].athPos+candidates[0].athNeg);
		}
		else{
			athCond = 0;
		}
	
		if(candidates[0].resPos>0 || candidates[0].resNeg>0){
			resCond = (Math.min(candidates[0].resPos, candidates[0].resNeg))/(candidates[0].resPos+candidates[0].resNeg);
		}
	
		else{
			resCond = 0;
		}
	
		if(candidates[0].medPos>0 || candidates[0].medNeg>0){
			medCond = (Math.min(candidates[0].medPos, candidates[0].medNeg))/(candidates[0].medPos+candidates[0].medNeg);
		}
		else{
			medCond = 0;
		}
	
		if(candidates[0].eventPos>0 || candidates[0].eventNeg>0){
			eventCond = (Math.min(candidates[0].eventPos, candidates[0].eventNeg))/(candidates[0].eventPos+candidates[0].eventNeg);
		}
		else{
			eventCond = 0;
		}
	
		var condHolder = (tuitCond + athCond + resCond + medCond + eventCond)/5;
		candidates[0].consMod = condHolder;
		//decrease 1 hour and continue back to user action
		remainingHoursTotal--;
		remainingHoursDay--;
		statementCalcOtherCandidate(1);
	}
	hourChecker();
}

//other candidate (AKA KARMA)
function statementCalcOtherCandidate(x){
	var currentStatement = document.getElementById("statements").value;
	var currentPosNeg = document.getElementById("posneg").value;

	if(currentPosNeg == 1){
		candidates[x].issueScore[currentStatement] += 0.75;
		if(currentStatement == 0){
			candidates[x].tuitPos += 1;
		}
		else if(currentStatement == 1){
			candidates[x].athPos += 1;
		}
		else if(currentStatement == 2){
			candidates[x].resPos += 1;
		}
		else if(currentStatement == 3){
			candidates[x].medPos += 1;
		}
		else if(currentStatement == 4){
			candidates[x].eventPos += 1;
		}
	}
	else{
		if(currentPosNeg == 1){
			candidates[x].issueScore[currentStatement] -= 0.75;
			if(currentStatement == 0){
				candidates[x].tuitNeg += 1;
			}
			else if(currentStatement == 1){
				candidates[x].athNeg += 1;
			}
			else if(currentStatement == 2){
				candidates[x].resNeg += 1;
			}
			else if(currentStatement == 3){
				candidates[x].medNeg += 1;
			}
		else if(currentStatement == 4){
			candidates[x].eventNeg += 1;
			}
		}
	}
	candidates[x].lastMove = "Statement";
}

//Displays the result of a poll immediately after it end and then saves the report for later viewing
function pollResults(state, isFirst, isFree)
{


	var bias = document.getElementById('location').value;
	document.getElementById("event").style.display = "none";
	var duplicate = false;
	var pollChoices = [];
	for(var i = 0; i<6 ;i++)
	{
		var selectedQuestion = document.getElementById("poll"+i+"");
		if(selectedQuestion.options[selectedQuestion.selectedIndex].value != "")
		{
			var pollVal = selectedQuestion.options[selectedQuestion.selectedIndex].value;


			if(pollVal == 'issue'||pollVal == 'candFame'||pollVal == 'candTrust'){
				//grab the sub question
				var selectedSubQuestion = document.getElementById('subpoll' + i + '');
				var subValue = selectedSubQuestion.value;
				pollVal = pollVal + subValue;
			}
			pollChoices.push(pollVal);	
		}
	}


	for (var i=0; i< pollChoices.length;i++)
	{
		if(pollChoices[i] == "candFamePlayer"){
			pollChoices[i] = "fame";
		}
		else if (pollChoices[i] == "candTrustPlayer"){
			pollChoices[i] = "playTrust";
		}
	}

	//Checks for duplicate questions
	for (var i=0; i< pollChoices.length;i++)
	{
		for (var j=0; j< pollChoices.length;j++)
		{
			if(i!=j)
			{
				var val1 = pollChoices[i];
				var val2 = pollChoices[j];

				if(val1 == val2)
				{
					duplicate = true;
				}
			}
		}
	}


	var sample = document.getElementById("sample");
	var sampleSize = parseFloat(sample.options[sample.selectedIndex].value);

	//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";

	if(pollChoices.length < 2)
	{
		document.getElementById("gameInfo").innerHTML += "<p> You need at least 2 questions on your poll. \nPlease select questions to ask. </p> <button onclick = 'map("+state+"," +isFirst+","+isFree+ ")'> Reselect Poll Questions </button>";
	}
	else if(duplicate)
	{
		document.getElementById("gameInfo").innerHTML += "<p> You have at least two of the same questions on your poll. \nPlease select the questions again. </p> <button onclick = 'map("+state+"," +isFirst+","+isFree+ ")'> Reselect Poll Questions </button>";
	}
	else if(!pollTimeCheck(sampleSize, pollChoices) && state == 0)
	{
		document.getElementById("gameInfo").innerHTML += "<p> You dont have enough time to ask that many questions. \nPlease reselect an appropriate number of questions.</p>  <button onclick = 'map("+state+"," +isFirst+","+isFree+ ")'> Reselect Poll Questions </button>";
	}
	else if(state == 1){
		pollCalc(pollChoices, sampleSize, bias, state, isFree, isFirst);
		document.getElementById("next").innerHTML += "<button onclick = 'map("+1+",false,false)'> Return to Tutorial Poll</button>";
		
	}
	else if(state == 2)
	{
		pollCalc(pollChoices, sampleSize, bias, state, isFree, isFirst);
		document.getElementById("next").innerHTML += "<button onclick = 'startPractice()'> Return to Practice Area</button>";
	}
	else 
	{
		pollCalc(pollChoices, sampleSize, bias, state, isFree, isFirst);
	
		if(!isFirst)
			document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the User Action Area </button>";
		else
			document.getElementById("next").innerHTML += "<button onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";

	}

};




/* Helper Functions*/

function addMoreQuestions(){
	if(qPollHolder< 6){
		qh2 = qPollHolder + 1;
		document.getElementById('poll' + qPollHolder + '').style = "display:block";
		document.getElementById('poll' + qh2 + '').style = "display:block";
		qPollHolder = qPollHolder + 2;
	}
}

//Takes in an Arrays of Groups to affect with the score increase, and parses through each adding the specified increase in score
function scoreChanger(candidate, scoreInc, groupPos, groupNeg)
{
	////console.log(candidate.fame);
	////console.log(candidate.issueScore);
	////console.log(scoreInc);
	for(var i=0;i<groupPos.length;i++)
	{

		switch (groupPos[i])
		{
			case "Soc":
				candidate.fame[0]+=parseFloat(scoreInc);
				if(candidate.fame[0] > 2)
				{
					candidate.fame[0] = 2;
				}
				if(candidate.fame[0] < .1)
				{
					candidate.fame[0] = .1;
				}
				break;

			case "Ath":
				candidate.fame[1]+=parseFloat(scoreInc);
				if(candidate.fame[1] > 2)
				{
					candidate.fame[1] = 2;
				}
				if(candidate.fame[1] < .1)
				{
					candidate.fame[1] = .1;
				}
				break;

			case "Res":
				candidate.fame[2]+=parseFloat(scoreInc);
				if(candidate.fame[2] > 2)
				{
					candidate.fame[2] = 2;
				}
				if(candidate.fame[2] < .1)
				{
					candidate.fame[2] = .1;
				}
				break;

			case "Media":
				candidate.fame[3]+=parseFloat(scoreInc);
				if(candidate.fame[3] > 2)
				{
					candidate.fame[3] = 2;
				}
				if(candidate.fame[3] < .1)
				{
					candidate.fame[3] = .1;
				}
				break;

			case "Read":
				candidate.fame[4]+=parseFloat(scoreInc);
				if(candidate.fame[4] > 2)
				{
					candidate.fame[4] = 2;
				}
				if(candidate.fame[4] < .1)
				{
					candidate.fame[4] = .1;
				}
				break;

			case "Bus":
				candidate.fame[5]+=parseFloat(scoreInc);
				if(candidate.fame[5] > 2)
				{
					candidate.fame[5] = 2;
				}
				if(candidate.fame[5] < .1)
				{
					candidate.fame[5] = .1;
				}
				break;

			case "Eng":
				candidate.fame[6]+=parseFloat(scoreInc);
				if(candidate.fame[6] > 2)
				{
					candidate.fame[6] = 2;
				}
				if(candidate.fame[6] < .1)
				{
					candidate.fame[6] = .1;
				}
				break;

			case "Tech":
				candidate.fame[7]+=parseFloat(scoreInc);
				if(candidate.fame[7] > 2)
				{
					candidate.fame[7] = 2;
				}
				if(candidate.fame[7] < .1)
				{
					candidate.fame[7] = .1;
				}
				break;

			case "Fine Arts":
				candidate.fame[8]+=parseFloat(scoreInc);
				if(candidate.fame[8] > 2)
				{
					candidate.fame[8] = 2;
				}
				if(candidate.fame[8] < .1)
				{
					candidate.fame[8] = .1;
				}
				break;

			case "Lib Arts":
				candidate.fame[9]+=parseFloat(scoreInc);
				if(candidate.fame[9] > 2)
				{
					candidate.fame[9] = 2;
				}
				if(candidate.fame[9] < .1)
				{
					candidate.fame[9] = .1;
				}
				break;

			case "Poor":
				candidate.fame[10]+=parseFloat(scoreInc);
				if(candidate.fame[10] > 2)
				{
					candidate.fame[10] = 2;
				}
				if(candidate.fame[10] < .1)
				{
					candidate.fame[10] = .1;
				}
				break;

			case "Low":
				candidate.fame[11]+=parseFloat(scoreInc);
				if(candidate.fame[11] > 2)
				{
					candidate.fame[11] = 2;
				}
				if(candidate.fame[11] < .1)
				{
					candidate.fame[11] = .1;
				}
				break;

			case "Low Mid":
				candidate.fame[12]+=parseFloat(scoreInc);
				if(candidate.fame[12] > 2)
				{
					candidate.fame[12] = 2;
				}
				if(candidate.fame[12] < .1)
				{
					candidate.fame[12] = .1;
				}
				break;

			case "Upper Mid":
				candidate.fame[13]+=parseFloat(scoreInc);
				if(candidate.fame[13] > 2)
				{
					candidate.fame[13] = 2;
				}
				if(candidate.fame[13] < .1)
				{
					candidate.fame[13] = .1;
				}
				break;

			case "High":
				candidate.fame[14]+=parseFloat(scoreInc);
				if(candidate.fame[14] > 2)
				{
					candidate.fame[14] = 2;
				}
				if(candidate.fame[14] < .1)
				{
					candidate.fame[14] = .1;
				}
				break;

			case "tuition":
				candidate.issueScore[0]+=parseFloat(scoreInc);
						if(candidate.issueScore[0] > 4)
						{
							candidate.issueScore[0] = 4;
						}
						if(candidate.issueScore[0] < -4)
						{
							candidate.issueScore[0] = -4;
						}
				break;

			case "athletic":
				candidate.issueScore[1]+=parseFloat(scoreInc);
						if(candidate.issueScore[1] > 4)
						{
							candidate.issueScore[1] = 4;
						}
						if(candidate.issueScore[1] < -4)
						{
							candidate.issueScore[1] = -4;
						}
				break;

			case "research":
				candidate.issueScore[2]+=parseFloat(scoreInc);
						if(candidate.issueScore[2] > 4)
						{
							candidate.issueScore[2] = 4;
						}
						if(candidate.issueScore[2] < -4)
						{
							candidate.issueScore[2] = -4;
						}
				break;

			case "events":
				candidate.issueScore[3]+=parseFloat(scoreInc);
						if(candidate.issueScore[3] > 4)
						{
							candidate.issueScore[3] = 4;
						}
						if(candidate.issueScore[3] < -4)
						{
							candidate.issueScore[3] = -4;
						}
				break;

			case "medical":
				candidate.issueScore[4]+=parseFloat(scoreInc);
						if(candidate.issueScore[4] > 4)
						{
							candidate.issueScore[4] = 4;
						}
						if(candidate.issueScore[4] < -4)
						{
							candidate.issueScore[4] = -4;
						}
				break;

			case "Fame":

				break;

			case "Opp Focus":

				break;

			case "Opp Fame":

				break;

		}
	}

	for(var j=0;j<groupNeg.length;j++)
	{
		switch (groupNeg[i])
		{
			case "Soc":
				candidate.fame[0]-=parseFloat(scoreInc);
				if(candidate.fame[0] > 2)
				{
					candidate.fame[0] = 2;
				}
				if(candidate.fame[0] < .1)
				{
					candidate.fame[0] = .1;
				}
				break;

			case "Ath":
				candidate.fame[1]-=parseFloat(scoreInc);
				if(candidate.fame[1] > 2)
				{
					candidate.fame[1] = 2;
				}
				if(candidate.fame[1] < .1)
				{
					candidate.fame[1] = .1;
				}
				break;

			case "Res":
				candidate.fame[2]-=parseFloat(scoreInc);
				if(candidate.fame[2] > 2)
				{
					candidate.fame[2] = 2;
				}
				if(candidate.fame[2] < .1)
				{
					candidate.fame[2] = .1;
				}
				break;

			case "Media":
				candidate.fame[3]-=parseFloat(scoreInc);
				if(candidate.fame[3] > 2)
				{
					candidate.fame[3] = 2;
				}
				if(candidate.fame[3] < .1)
				{
					candidate.fame[3] = .1;
				}
				break;

			case "Read":
				candidate.fame[4]-=parseFloat(scoreInc);
				if(candidate.fame[4] > 2)
				{
					candidate.fame[4] = 2;
				}
				if(candidate.fame[4] < .1)
				{
					candidate.fame[4] = .1;
				}
				break;

			case "Bus":
				candidate.fame[5]-=parseFloat(scoreInc);
				if(candidate.fame[5] > 2)
				{
					candidate.fame[5] = 2;
				}
				if(candidate.fame[5] < .1)
				{
					candidate.fame[5] = .1;
				}
				break;

			case "Eng":
				candidate.fame[6]-=parseFloat(scoreInc);
				if(candidate.fame[6] > 2)
				{
					candidate.fame[6] = 2;
				}
				if(candidate.fame[6] < .1)
				{
					candidate.fame[6] = .1;
				}
				break;

			case "Tech":
				candidate.fame[7]-=parseFloat(scoreInc);
				if(candidate.fame[7] > 2)
				{
					candidate.fame[7] = 2;
				}
				if(candidate.fame[7] < .1)
				{
					candidate.fame[7] = .1;
				}
				break;

			case "Fine Arts":
				candidate.fame[8]-=parseFloat(scoreInc);
				if(candidate.fame[8] > 2)
				{
					candidate.fame[8] = 2;
				}
				if(candidate.fame[8] < .1)
				{
					candidate.fame[8] = .1;
				}
				break;

			case "Lib Arts":
				candidate.fame[9]-=parseFloat(scoreInc);
				if(candidate.fame[9] > 2)
				{
					candidate.fame[9] = 2;
				}
				if(candidate.fame[9] < .1)
				{
					candidate.fame[9] = .1;
				}
				break;

			case "Poor":
				candidate.fame[10]-=parseFloat(scoreInc);
				if(candidate.fame[10] > 2)
				{
					candidate.fame[10] = 2;
				}
				if(candidate.fame[10] < .1)
				{
					candidate.fame[10] = .1;
				}
				break;

			case "Low":
				candidate.fame[11]-=parseFloat(scoreInc);
				if(candidate.fame[11] > 2)
				{
					candidate.fame[11] = 2;
				}
				if(candidate.fame[11] < .1)
				{
					candidate.fame[11] = .1;
				}
				break;

			case "Low Mid":
				candidate.fame[12]-=parseFloat(scoreInc);
				if(candidate.fame[12] > 2)
				{
					candidate.fame[12] = 2;
				}
				if(candidate.fame[12] < .1)
				{
					candidate.fame[12] = .1;
				}
				break;

			case "Upper Mid":
				candidate.fame[13]-=parseFloat(scoreInc);
				if(candidate.fame[13] > 2)
				{
					candidate.fame[13] = 2;
				}
				if(candidate.fame[13] < .1)
				{
					candidate.fame[13] = .1;
				}
				break;

			case "High":
				candidate.fame[14]-=parseFloat(scoreInc);
				if(candidate.fame[14] > 2)
				{
					candidate.fame[14] = 2;
				}
				if(candidate.fame[14] < .1)
				{
					candidate.fame[14] = .1;
				}
				break;

			case "tuition":
				candidate.issueScore[0]-=parseFloat(scoreInc);
						if(candidate.issueScore[0] > 4)
						{
							candidate.issueScore[0] = 4;
						}
						if(candidate.issueScore[0] < -4)
						{
							candidate.issueScore[0] = -4;
						}
				break;

			case "athletic":
				candidate.issueScore[1]-=parseFloat(scoreInc);
						if(candidate.issueScore[1] > 4)
						{
							candidate.issueScore[1] = 4;
						}
						if(candidate.issueScore[1] < -4)
						{
							candidate.issueScore[1] = -4;
						}
				break;

			case "research":
				candidate.issueScore[2]-=parseFloat(scoreInc);
						if(candidate.issueScore[2] > 4)
						{
							candidate.issueScore[2] = 4;
						}
						if(candidate.issueScore[2] < -4)
						{
							candidate.issueScore[2] = -4;
						}
				break;

			case "events":
				candidate.issueScore[3]-=parseFloat(scoreInc);
						if(candidate.issueScore[3] > 4)
						{
							candidate.issueScore[3] = 4;
						}
						if(candidate.issueScore[3] < -4)
						{
							candidate.issueScore[3] = -4;
						}
				break;

			case "medical":
				candidate.issueScore[4]-=parseFloat(scoreInc);
						if(candidate.issueScore[4] > 4)
						{
							candidate.issueScore[4] = 4;
						}
						if(candidate.issueScore[4] < -4)
						{
							candidate.issueScore[4] = -4;
						}
				break;

			case "Fame":

				break;

			case "Opp Focus":

				break;

			case "Opp Fame":

				break;

		}
	////console.log(candidates[0].fame);
	////console.log(candidates[0].issueScore);
	}
}

//sample person
function Student(group, ecoClass, major, tuitionScore, athleticScore, researchScore, eventScore, medicalScore)
{
	this.group = group;
	this.ecoClass = ecoClass;
	this.major = major;
	this.athleticScore = athleticScore;
	this.researchScore = researchScore;
	this.tuitionScore = tuitionScore ;
	this.eventScore = eventScore;
	this.medicalScore = medicalScore ;
	this.studentCaring = Math.random(.1,1.0).toFixed(2);

	this.results =
	{
		winPer: 0,
		win: "",
		losPer: 0,
		los:""
	};
}

//used for making Player Candidate & Opponent Candidate
function CandidateCreate(name){
	this.name = name;
	this.fame= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.issueScore= [0,0,0,0,0];
	this.consMod= 0;
	this.focus= "";
	this.focusnum= 0;
	this.winChance= 0;
	this.votes= 0;
	this.lastMove= "Unknown";
	this.raceNum = 1;
	this.genderNum = 1;
	this.bodyTypeNum = 1;
	this.headNum = 1;
	this.correctAnswers = 0;
	this.wrongAnswers = 0;
	//statement choices

	this.tuitPos= 0;
	this.tuitNeg= 0;
	this.athPos= 0;
	this.athNeg= 0;
	this.resPos= 0;
	this.resNeg= 0;
	this.medPos= 0;
	this.medNeg= 0;
	this.eventPos= 0;
	this.eventNeg= 0;
};

function createSample(x, bias)
{
	sample = [];
	for (var count= 0; count < x; count++){
		var scoreHolder = getScores(x, bias);
		var holderStudent = new Student(groupList[scoreHolder[0]],  stuEconomic[scoreHolder[1]], majorList[scoreHolder[2]], scoreHolder[3], scoreHolder[4], scoreHolder[5], scoreHolder[6], scoreHolder[7])
		sample.push(holderStudent);
	}
}

function getScores(x, bias){

	var groupRandom;

	if(bias < 5){
		var coinFlip = Math.floor(Math.random() * 3)
		if(coinFlip == 1){
					groupRandom = bias;

				}

		else{
					groupRandom = Math.floor(Math.random()* 5);

					while(groupRandom == bias){
						groupRandom = Math.floor(Math.random()* 5);
					}
		}
	}
	else{
		groupRandom = Math.floor(Math.random()* 5);
	}
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

	 tuit = tuit/3;
     ath = ath/3;
     res =  res/3;
     event = event/3;
     med = med/3;

     tuit = tuit.toFixed(2);
     ath = ath.toFixed(2);
     res =  res.toFixed(2);
     event = event.toFixed(2);
     med = med.toFixed(2);


	var returnArray = [groupRandom, majorRandom, ecoClassRandom, tuit, ath,res,event,med];
	return returnArray;
}

function votePercentage(sampleSize, bias)
{
	////console.log(candidates);
	createSample(sampleSize, bias);
	var finalWinner = "";
	for(var i=0;i<candidates.length; i++)
		{
			candidates[i].votes = 0;
		}
	for(var i =0; i<sample.length; i++)
	{
		var winPercentage=0;
		var winner ="";
		var lowPercentage=0;
		var loser ="";
		for(var j=0;j<candidates.length; j++)
		{

			////console.log(sample[i]);
			var fame = 0;
			fame = fameCalc(candidates[j], sample[i]);
			////console.log(candidates[j].name +" Fame: "+ fame);
			if(j != 1)
			{
				var issues = parseFloat(sample[i].tuitionScore) * parseFloat(candidates[j].issueScore[0])
				issues += parseFloat(sample[i].athleticScore) * parseFloat(candidates[j].issueScore[1])
				issues += parseFloat(sample[i].researchScore)* parseFloat(candidates[j].issueScore[2])
				issues += parseFloat(sample[i].eventScore)  * parseFloat(candidates[j].issueScore[3])
				issues += parseFloat(sample[i].medicalScore) * parseFloat(candidates[j].issueScore[4]);
				issues = issues/5;
			}
			else
			{
				var issues = parseFloat(sample[i].tuitionScore) * parseFloat(candidates[j].issueScore[0])
				issues += parseFloat(sample[i].athleticScore) * parseFloat(candidates[j].issueScore[1])
				issues += parseFloat(sample[i].researchScore)* parseFloat(candidates[j].issueScore[2])
				issues += parseFloat(sample[i].eventScore)  * parseFloat(candidates[j].issueScore[3])
				issues += parseFloat(sample[i].medicalScore) * parseFloat(candidates[j].issueScore[4]);
				issues = issues/5;
			}
			////console.log(candidates[j].name +" Issue Score: "+ issues);
			
			if(candidates[j].name != "Liz")
			{
				var candWinPer = 10*Math.pow(fame*issues,2) - candidates[j].consMod;
			}
			else
			{
				var candWinPer = 10*0.5*issues;
			}
			
			
			
			////console.log(candidates[j].name +" Win Percentage: "+ candWinPer);
			////console.log("");


			if(candWinPer > winPercentage|| winPercentage ==0)
			{
				winPercentage = candWinPer;
				winner = candidates[j].name;
			}

			if(candWinPer < lowPercentage || lowPercentage ==0)
			{
				lowPercentage = candWinPer;
				loser = candidates[j].name;
			}

		}
		////console.log("Student #" +i);
		////console.log("Winner: " + winner + " Vote Percentage: "+ winPercentage);
		////console.log("Loser: " + loser + " Vote Percentage: "+ lowPercentage);
		////console.log("");
		sample[i].results.winPer = winPercentage;
		sample[i].results.losPer = lowPercentage;
		sample[i].results.win = winner;
		sample[i].results.los = loser;
		for(var k=0;k<candidates.length; k++)
		{
			if(candidates[k].name == winner)
			{
				candidates[k].votes++;
			}
		}
	}
}

//Calculates the fame of the player's candidate based on a students group
function fameCalc(cand, student)
{
	var fame = 0;
	switch(student.group)
	{
		case groupList[0]:

		fame+= cand.fame[0];
		break;
    
		case groupList[1]:
		
		fame+= cand.fame[1];
		break;
    
		case groupList[2]:
	
		fame+= cand.fame[2];
		break;
    
		case groupList[3]:
	
		fame+= cand.fame[3];
		break;
    
		case groupList[4]:
	
		fame+= cand.fame[4];
		break;
	}
	switch(student.major)
	{
		case majorList[0]:

		fame+= cand.fame[5];
		break;

		case majorList[1]:
	
		fame+= cand.fame[6];
		break;

		case majorList[2]:

		fame+= cand.fame[7];
		break;

		case majorList[3]:

		fame+= cand.fame[8];
		break;

		case majorList[4]:

		fame+= cand.fame[9];
		break;
	}
	switch(student.ecoClass)
	{
		case stuEconomic[0]:

		fame+= cand.fame[10];
		break;

		case stuEconomic[1]:

		fame+= cand.fame[11];
		break;

		case stuEconomic[2]:
		
		fame+= cand.fame[12];
		break;

		case stuEconomic[3]:

		fame+= cand.fame[13];
		break;

		case stuEconomic[4]:
	
		fame+= cand.fame[14];
		break;
	}
	return fame/6;
}

function clearScreen()
{

	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	var prevTable = document.getElementById("table");
	document.getElementById('next').innerHTML = "";

	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	prevTable.innerHTML = "<table id = 'tab' class='sortable'><thead id='tableHead'></thead><tbody id='pollTable'></tbody></table>";
}

function resetGame()
{
	tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
	pastPollChoices = [];
	pastPollResults = [];
	pastPollSizes = [];
	oppChoice = [];
	currentEvents = [];
	sample = [];
	candidates=[];
	chosenCandRanks = [];
	currentEvents = [];
	candidates=[];
	var playerCandidate = new CandidateCreate("ph");
	var opponentCandidate = new CandidateCreate("Liz");
}

//Allows you to view previous polls at any time.
function reportViewer(id)
{
	clearScreen();
	document.getElementById("next").style.display = "block";

	//pollChoices, tableArray2, sSize, graphData, graphLabels, review, state, isFree, isFirst
	tableBuilder(pastPollChoices[id],pastPollResults[id],pastPollSizes[id],pastGraphData[id],pastGraphLabels[id], 1, 0, false, false);
	document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the User Action Area </button>";
}

//Calculates the results of each poll question from each student in the sample and stores them in an array
function pollCalc(pollChoices, sampleSize, bias, state, isFree, isFirst)
{	

	graphData = [];
	graphData.push(questions[4].graph.split(','));
	graphData.push(questions[5].graph.split(','));
	graphData.push(questions[6].graph.split(','));

	var pollLabelArray = [];
	pollLabelArray.push(questions[4].labels.split(','));
	pollLabelArray.push(questions[5].labels.split(','));
	pollLabelArray.push(questions[6].labels.split(','));
	for(var i =0; i<pollChoices.length;i++)
	{
		switch(pollChoices[i])
		{
			case "candFav":
			var array =[];
			var array2 =[];
			for(var j =0; j < candidates.length;j++ )
			{
				array.push(0);
				array2.push(candidates[j].name);
			}
			graphData.push(array);
			pollLabelArray.push(array2);
			break;
			case "candOpp":
			var array =[];
			var array2 =[];
			for(var j =0; j < candidates.length;j++ )
			{
				array.push(0);
				array2.push(candidates[j].name);
			}
			graphData.push(array);
			pollLabelArray.push(array2);
			break;
			default:
				for(var j =0; j < questions.length; j++)
				{
					if(pollChoices[i] == questions[j].value)
					{
						graphData.push(questions[j].graph.split(','));
						pollLabelArray.push(questions[j].labels.split(','));
					}
					else
					{
						if(questions[j].value == "issue")
						{
							for(var k =0; k< positionsLower.length; k++)
							{
								if(pollChoices[i] == "issue" + positionsLower[k])
								{
									graphData.push(questions[j].graph.split(','));
									pollLabelArray.push(questions[j].labels.split(','));
								}
							}
						}
						if(questions[j].value == "candFame")
						{
							for(var k =0; k< candidates.length; k++)
							{
								if(pollChoices[i] == "candFame" + candidates[k].name)
								{
									graphData.push(questions[j].graph.split(','));
									pollLabelArray.push(questions[j].labels.split(','));
								}
							}
						}
						if(questions[j].value == "candTrust")
						{
							for(var k =0; k< candidates.length; k++)
							{
								if(pollChoices[i] == "candTrust" + candidates[k].name)
								{
									graphData.push(questions[j].graph.split(','));
									pollLabelArray.push(questions[j].labels.split(','));
								}
							}
						}
					}
				}
			break;
		}

	}
	votePercentage(sampleSize, bias);
	//Gets the results of each question
	for(var j=0;j<sample.length;j++)
		{
		tableArrays[4].push(sample[j].major);
		var majorHolder = sample[j].major;
		if(majorHolder == "business"){
			graphData[0][0]++;
		}
		else if(majorHolder == "engineering"){
			graphData[0][1]++;
		}
		else if(majorHolder == "tech"){
			graphData[0][2]++;
		}
		else if(majorHolder == "libArts"){
			graphData[0][3]++;
		}
		else if(majorHolder == "fineArts"){
			graphData[0][4]++;
		}

		tableArrays[5].push(sample[j].ecoClass);
		var ecoHolder = sample[j].ecoClass;
		if(ecoHolder == "poverty"){
			graphData[1][0]++;
		}
		else if(ecoHolder == "low"){
			graphData[1][1]++;
		}
		else if(ecoHolder == "midLow"){
			graphData[1][2]++;
		}
		else if(ecoHolder == "midHigh"){
			graphData[1][3]++;
		}
		else if(ecoHolder == "high"){
			graphData[1][4]++;
		}

		tableArrays[6].push(sample[j].group);

		var groupHolder = sample[j].group;
		if(groupHolder == "socialite"){
			graphData[2][0]++;
		}
		else if(groupHolder == "athlete"){
			graphData[2][1]++;
		}
		else if(groupHolder == "researcher"){
			graphData[2][2]++;
		}
		else if(groupHolder == "mediaLover"){
			graphData[2][3]++;
		}
		else if(groupHolder == "reader"){
			graphData[2][4]++;
		}

		for(var i = 0; i < pollChoices.length ;i++)
		{
			switch(pollChoices[i])
			{
				case "issFav":
					var fav =0;
					var favName = "";
					if(fav < sample[j].athleticScore ||fav==0)
					{
						fav = sample[j].athleticScore;
						var favName = "Athletics";
					}
					if(fav < sample[j].researchScore ||fav==0)
					{
						fav = sample[j].researchScore;
						var favName = "Research";
					}
					if(fav < sample[j].tuitionScore ||fav==0)
					{
						fav = sample[j].tuitionScore;
						var favName = "Tuition";
					}
					if(fav < sample[j].eventScore ||fav==0)
					{
						fav = sample[j].eventScore;
						var favName = "Events";
					}
					if(fav < sample[j].medicalScore ||fav==0)
					{
						fav = sample[j].medicalScore;
						var favName = "Medical";
					}
				tableArrays[0].push(favName);
				//find if fave
				if(favName == "Tuition"){
					graphData[i+3][0]++;
				}
				else if(favName == "Athletics"){
					graphData[i+3][1]++;
				}
				else if(favName == "Research"){
					graphData[i+3][2]++;
				}
				else if(favName == "Events"){
					graphData[i+3][3]++;
				}
				else if(favName == "Medical"){
					graphData[i+3][4]++;
				}

				break;

				case "issOpp":
					var opp =0;
					var oppName = "";
					if(opp > sample[j].athleticScore ||opp==0)
					{
						opp = sample[j].athleticScore;
						var oppName = "Athletics";
					}
					if(opp > sample[j].researchScore ||opp==0)
					{
						opp = sample[j].researchScore;
						var oppName = "Research";
					}
					if(opp > sample[j].tuitionScore ||opp==0)
					{
						opp = sample[j].tuitionScore;
						var oppName = "Tuition";
					}
					if(opp > sample[j].eventScore ||opp==0)
					{
						opp = sample[j].eventScore;
						var oppName = "Events";
					}
					if(opp > sample[j].medicalScore ||opp==0)
					{
						opp = sample[j].medicalScore;
						var oppName = "Medical";
					}
				tableArrays[1].push(oppName);

				if(oppName == "Tuition"){
					graphData[i+3][0]++;
				}
				else if(oppName == "Athletics"){
					graphData[i+3][1]++;
				}
				else if(oppName == "Research"){
					graphData[i+3][2]++;
				}
				else if(oppName == "Events"){
					graphData[i+3][3]++;
				}
				else if(oppName == "Medical"){
					graphData[i+3][4]++;
				}


				break;

				case "candFav":
					tableArrays[2].push(sample[j].results.win + " Score: " +sample[j].results.winPer.toFixed(2));
					for(var k =0; k< candidates.length;k++)
					{
						if(sample[j].results.win == candidates[k].name){
							graphData[i+3][k]++;
						}
					}
				break;

				case "candOpp":
					////console.log(sample[j].results);
					tableArrays[3].push(sample[j].results.los + " Score: " +sample[j].results.losPer.toFixed(2));
					for(var k =0; k< candidates.length;k++)
					{
						if(sample[j].results.los == candidates[k].name){
							graphData[i+3][k]++;
						}
					}
				break;



				case "fame":
					var playFame = fameCalc(candidates[0],sample[j]).toFixed(3);
					tableArrays[7].push(playFame);
					if(playFame > 0.69){
						graphData[i+3][0]++;
					}
					else if(playFame > 0.36){
						graphData[i+3][1]++;
					}
					else{
						graphData[i+3][2]++;
					}
				break;

				case "playTrust":
					tableArrays[8].push(candidates[0].consMod);
					var playConst = candidates[0].consMod;
					if(playConst > 0.69){
						graphData[i+3][0]++;
					}
					else if(playConst > 0.36){
						graphData[i+3][1]++;
					}
					else{
						graphData[i+3][2]++;
					}
				break;

			}
			for(var k = 0;k<positions.length;k++)
			{
				if(pollChoices[i] == "issue" + positionsLower[k])
				{
					switch(pollChoices[i])
					{
						case "issuetuition":
							tableArrays[9].push(parseFloat(sample[j].tuitionScore).toFixed(2));
							if(sample[j].tuitionScore >=2){
								graphData[i+3][0]++;
							}
							else if(sample[j].tuitionScore >=-1){
								graphData[i+3][1]++;
							}
							else{
								graphData[i+3][2]++;
							}
						break;

						case "issueathletic":
							tableArrays[10].push(parseFloat(sample[j].athleticScore).toFixed(2));
							if(sample[j].athleticScore >=2){
								graphData[i+3][0]++;
							}
							else if(sample[j].athleticScore >=-1){
								graphData[i+3][1]++;
							}
							else{
								graphData[i+3][2]++;
							}
						break;

						case "issueresearch":
							tableArrays[11].push(parseFloat(sample[j].researchScore).toFixed(2));
							if(sample[j].researchScore >=2){
								graphData[i+3][0]++;
							}
							else if(sample[j].researchScore >=-1){
								graphData[i+3][1]++;
							}
							else{
								graphData[i+3][2]++;
							}

						break;

						case "issueevents":
							tableArrays[12].push(parseFloat(sample[j].eventScore).toFixed(2));
							if(sample[j].eventScore >=2){
								graphData[i+3][0]++;
							}
							else if(sample[j].eventScore >=-1){
								graphData[i+3][1]++;
							}
							else{
								graphData[i+3][2]++;
							}
						break;

						case "issuemedical":
							tableArrays[13].push(parseFloat(sample[j].medicalScore).toFixed(2));
							if(sample[j].medicalScore >=2){
								graphData[i+3][0]++;
							}
							else if(sample[j].medicalScore >=-1){
								graphData[i+3][1]++;
							}
							else{
								graphData[i+3][2]++;
							}
						break;
					}
				}
			}

			var candCounter = 14;
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candFame" + candidates[k].name)
				{
					var calcHolder = fameCalc(candidates[k], sample[j]);
					
					tableArrays[candCounter].push(calcHolder);				

					if(calcHolder> 0.66){
						graphData[i+3][0]++;
					}
					else if(calcHolder > 0.33){
						graphData[i+3][1]++;
					}
					else{
						graphData[i+3][2]++;
					}


				}


				candCounter++;
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candTrust" + candidates[k].name)
				{

					tableArrays[candCounter].push(candidates[k].consMod);

					if(candidates[k].consMod> 0.66){
						graphData[i+3][2]++;
					}
					else if(candidates[k].consMod > 0.33){
						graphData[i+3][1]++;
					}
					else{
						graphData[i+3][0]++;
					}
				}

				candCounter++;

			}

		}
	}

	var reviewFlag = false;
	if(state == 1){
		reviewFlag = true;
	}

	////console.log(tableArrays);
	tableBuilder(pollChoices, tableArrays, sampleSize, graphData, pollLabelArray, reviewFlag, state, isFree, isFirst);
}

//Builds a table by looping through the Array created by pollCalc and putting each value into a cell.
function tableBuilder(pollChoices, tableArray2, sSize, graphData, graphLabels, review, state, isFree, isFirst)
{

	//console.log(tableArray2);
	var rowCounter = 0;
	var cellCounter = 0;
	var graphQuestions = [];
	var h = 0;

	var table = document.getElementById("pollTable");
	var tableHead = document.getElementById("tableHead");
	var headRow = tableHead.insertRow(0);

	//Makes the table headers based on the chose questions
	for(var h = 0; h < pollChoices.length; h++)
	{
		if(pollChoices[h] != null)
		{
			if(h==0)
			{
				graphQuestions.push("major");
				graphQuestions.push("class");
				graphQuestions.push("group");
			}
			switch(pollChoices[h])
			{
				case "issFav":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[0];
					graphQuestions.push("issFav");
				break;

				case "issOpp":
						var cell = headRow.insertCell(h);
						cell.innerHTML = tableHeaders[1];
						graphQuestions.push("issOpp");
				break;

				case "candFav":
						var cell = headRow.insertCell(h);
						cell.innerHTML = tableHeaders[2];
						graphQuestions.push("candFav");
				break;

				case "candOpp":
						var cell = headRow.insertCell(h);
						cell.innerHTML = tableHeaders[3];
						graphQuestions.push("candOpp");
				break;

				case "fame":
						var cell = headRow.insertCell(h);
						cell.innerHTML = tableHeaders[7];
						graphQuestions.push("fame");
				break;

				case "playTrust":
						var cell = headRow.insertCell(h);
						cell.innerHTML = tableHeaders[8];
						graphQuestions.push("playTrust");
				break;
			}


			for(var k = 0;k<positions.length;k++)
			{

				if(pollChoices[h] == "issue" + positionsLower[k])
				{

					switch(pollChoices[h])
					{
						case "issuetuition":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[0];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuetuition");

						break;

						case "issueathletic":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[1];
							cell.innerHTML = posInfo;
							graphQuestions.push("issueathletic");
						break;

						case "issueresearch":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[2];
							cell.innerHTML = posInfo;
							graphQuestions.push("issueresearch");
						break;

						case "issueevents":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[3];
							cell.innerHTML = posInfo;
							graphQuestions.push("issueevents");
						break;

						case "issuemedical":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[4];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuemedical");
						break;
					}
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[h] == "candFame" + candidates[k].name)
				{
						var cell = headRow.insertCell(h);
						var candInfo = tableHeaders[10] + candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candFame" + candidates[k].name);
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[h] == "candTrust" + candidates[k].name)
				{
					////console.log(h);
						var cell = headRow.insertCell(h);
						var candInfo = tableHeaders[11] + candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candTrust" + candidates[k].name);
				}
			}
			if(h==pollChoices.length-1)
			{
				var cell = headRow.insertCell(0);
				cell.innerHTML = tableHeaders[4];

				var cell = headRow.insertCell(1);
				cell.innerHTML = tableHeaders[5];

				var cell = headRow.insertCell(2);
				cell.innerHTML = tableHeaders[6];
			}
		}
	}

	for(var h = 0; h<sSize; h++)
	{
		row = table.insertRow(h);


		for(var i = 0; i < pollChoices.length+1;i++)
		{
			if(pollChoices[i] != null)
			{
				switch(pollChoices[i])
				{
					case "issFav":
							var cell = row.insertCell(i);
							cell.innerHTML = tableArray2[0][h];
					break;

					case "issOpp":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[1][h];
					break;

					case "candFav":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[2][h];
					break;

					case "candOpp":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[3][h];
					break;

					case "fame":
								var cell = row.insertCell(i);
								cell.innerHTML = parseFloat(tableArray2[7][h]).toFixed(2);
								if(parseFloat(tableArray2[7][h]).toFixed(2) <= 0.33)
									{
										cell.innerHTML = "Candidate Unknown Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[7][h]).toFixed(2)>0.33 && parseFloat(tableArray2[7][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Aware of Candidate Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Candidate Known: " + parseFloat(tableArray2[7][h]).toFixed(2);
									}
					break;

					case "playTrust":
								var cell = row.insertCell(i);
								if(parseFloat(tableArray2[8][h]).toFixed(2) <= 0.33)
									{
										cell.innerHTML = "Very Trustworthy Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[8][h]).toFixed(2)>0.33 && parseFloat(tableArray2[8][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Sort Of Trustworthy Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Not Trustworthy Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
					break;
				}
				for(var k = 0;k<positions.length;k++)
				{
					if(pollChoices[i] == "issue" + positionsLower[k])
					{
						switch(pollChoices[i])
						{
							case "issuetuition":
									var cell = row.insertCell(i);
									if(tableArray2[9][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked Score: " + parseFloat(tableArray2[9][h]);
									}
									else if(tableArray2[9][h]>-2 && tableArray2[9][h]<2)
									{
										cell.innerHTML = "Issue Neutral Score: " + parseFloat(tableArray2[9][h]);
									}
									else
									{
										cell.innerHTML = "Issue Liked Score: " + parseFloat(tableArray2[9][h]);
									}
							break;

							case "issueathletic":
									var cell = row.insertCell(i);
									if(tableArray2[10][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked Score: " + parseFloat(tableArray2[10][h]);
									}
									else if(tableArray2[10][h]>-2 && tableArray2[10][h]<2)
									{
										cell.innerHTML = "Issue Neutral Score: " + parseFloat(tableArray2[10][h]);
									}
									else
									{
										cell.innerHTML = "Issue Liked Score: " + parseFloat(tableArray2[10][h]);
									}
							break;

							case "issueresearch":
								cell = row.insertCell(i);
								if(tableArray2[11][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked Score: " + parseFloat(tableArray2[11][h]);
									}
									else if(tableArray2[11][h]>-2 && tableArray2[11][h]<2)
									{
										cell.innerHTML = "Issue Neutral Score: " + parseFloat(tableArray2[11][h]);
									}
									else
									{
										cell.innerHTML = "Issue Liked Score: " +parseFloat( tableArray2[11][h]);
									}
							break;

							case "issueevents":
									var cell = row.insertCell(i);
									if(tableArray2[12][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked Score: " + parseFloat(tableArray2[12][h]);
									}
									else if(tableArray2[12][h]>-2 && tableArray2[12][h]<2)
									{
										cell.innerHTML = "Issue Neutral Score: " + parseFloat(tableArray2[12][h]);
									}
									else
									{
										cell.innerHTML = "Issue Liked Score: " + parseFloat(tableArray2[12][h]);
									}
							break;

							case "issuemedical":
									var cell = row.insertCell(i);
									if(tableArray2[13][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked Score: " + parseFloat(tableArray2[13][h]);
									}
									else if(tableArray2[13][h]>-2 && tableArray2[13][h]<2)
									{
										cell.innerHTML = "Issue Neutral Score: " + parseFloat(tableArray2[13][h]);
									}
									else
									{
										cell.innerHTML = "Issue Liked Score: " + parseFloat(tableArray2[13][h]);
									}
							break;
						}
					}
				}


				canCounter = 14;

				for(var k = 1;k<candidates.length;k++)
				{
					if(pollChoices[i] == "candFame" + candidates[k].name)
					{
								var cell = row.insertCell(i);
								var counter = canCounter;
									if(parseFloat(tableArray2[counter][h]).toFixed(2) <= 0.33)
									{
										cell.innerHTML = "Candidate Unknown Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.33 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Aware of Candidate Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Candidate Known: " + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
					}
						canCounter++;
				}
				for(var k = 1;k<candidates.length;k++)
				{
					if(pollChoices[i] == "candTrust" + candidates[k].name)
					{
								var cell = row.insertCell(i);
								var counter = canCounter;
								if(parseFloat(tableArray2[counter][h]).toFixed(2) <= 0.33)
								{
									cell.innerHTML = "Very Trustworthy Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.33 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.66)
								{
									cell.innerHTML = "Sort Of Trustworthy Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else
								{
									cell.innerHTML = "Not Trustworthy Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
								}		
					}

					canCounter++;

				}
			}
		}

		var cell = row.insertCell(0);
		cell.innerHTML = tableArray2[4][h];

		var cell = row.insertCell(1);
		cell.innerHTML = tableArray2[5][h];

		var cell = row.insertCell(2);
		cell.innerHTML = tableArray2[6][h];
	}
	sorttable.makeSortable(document.getElementById('tab'));
	document.getElementById("next").innerHTML += "<div id = 'filterArea'></div>"
	document.getElementById("next").innerHTML += "<br><button value = 'true' id = 'rawDataButton' onclick = 'changeData()'>Show Raw Data</button><br>";
	for (var x = 0; x < groupList.length; x++){
		document.getElementById('filterArea').innerHTML += "<input type = 'checkbox' class = 'filterChecklist' rel = '"+ groupList[x] +"'> "+ groupList[x] +" ";
	}
	document.getElementById('filterArea').innerHTML +='<br>'
	for (var x = 0; x < groupList.length; x++){
		document.getElementById('filterArea').innerHTML += "<input type = 'checkbox' class = 'filterChecklist' rel = '"+ stuEconomic[x] +"'> "+ stuEconomic[x] +" ";
	}
	document.getElementById('filterArea').innerHTML +='<br>'
	for (var x = 0; x < groupList.length; x++){
		document.getElementById('filterArea').innerHTML += "<input type = 'checkbox' class = 'filterChecklist' rel = '"+ majorList[x] +"'> "+ majorList[x] +" ";
	}
	document.getElementById('filterArea').innerHTML +='<br>'
	document.getElementById('filterArea').style.display = "none";

	var counter = 0;
	document.getElementById("gameInfo").innerHTML += "<div id = 'chartDiv' style = 'display:block'></div>"
	//graph dat table

	for (var i=0;i<graphQuestions.length;i++)
	{
	document.getElementById("chartDiv").innerHTML += "<div id = 'q"+i+"text'><br></div><div class = 'chart"+i+" chart'></div>";
		if(i==2){
			document.getElementById("chartDiv").innerHTML += "<hr>";
		}
		else if( i == 5){

		}
	}
	
	////console.log(graphQuestions);
	for(var u =0; u < graphQuestions.length; u++){		
		document.getElementById("q"+u+"text").innerHTML = "";
	}


	for(var i = 0; i < graphQuestions.length; i++){

		var counter = 0;
		var data = [];
		var data2 = [];
		var x = 0;
		var qID = "";

		switch(graphQuestions[i])
		{
			case "issFav":
				document.getElementById("q"+i+"text").innerHTML = questions[0].question;
			break;
			case "issOpp":
				document.getElementById("q"+i+"text").innerHTML = questions[1].question;
			break;
			case "candFav":
				document.getElementById("q"+i+"text").innerHTML = questions[2].question;
			break;
			case "candOpp":
				document.getElementById("q"+i+"text").innerHTML = questions[3].question;
			break;
			case "major":
				document.getElementById("q"+i+"text").innerHTML = questions[4].question;
			break;
			case "class":
				document.getElementById("q"+i+"text").innerHTML = questions[5].question;
			break;
			case "group":
				document.getElementById("q"+i+"text").innerHTML = questions[6].question;
			break;
			case "fame":
				document.getElementById("q"+i+"text").innerHTML = questions[7].question;
			break;
			case "playTrust":
				document.getElementById("q"+i+"text").innerHTML = questions[8].question;
			break;
			case "issuetuition":
				name = 	"Lowering Tuition";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issueathletic":
				name = 	"Increase Athletic Budget";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issueresearch":
				name = 	"Increase Research Budget";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issueevents":
				name = 	"More School Events";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issuemedical":
				name = 	"Improve Medical Services";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			default:
			for(var k = 1;k<candidates.length;k++)
			{
				if(graphQuestions[i] == "candFame" + candidates[k].name)
				{
					name = candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = questions[10].question + " " + name;
				}
			}

			for(var k = 1;k<candidates.length;k++)
			{
				if(graphQuestions[i] == "candTrust" + candidates[k].name)
				{
					name = candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = questions[11].question + " " + name;
				}
			}
		}
		////console.log("Question "+graphQuestions[i] + " has a length of: " + graphData[i].length);
		////console.log(graphData[questionNum]);
    
		for (var j = 0; j < graphData[i].length; j++){
				////console.log(graphData[questionNum], " AT ", questions[qID].question)					
				data2[j]=graphData[i][j];
			}


			var dataCounter = 0;
			x = d3.scaleLinear()
		    .domain([0, d3.max(data2)])
		    .range([0, 420]);

			d3.select(".chart" + i)
		  	.selectAll("div")
		    .data(data2)
		  	.enter().append("div")
		    .style("width", function(d) { return x(d) + "px"; })
		    .text(function(d) {
		    	var zid = graphLabels[i][dataCounter] + "-" + d;
		  		////console.log(zid);
		  		dataCounter++;

		    	return zid; })
		    ;

	}
	document.getElementById('table').style.display = 'none'
	if (state == 1){
		review = true;

	}
	if(!review)
	{
		pastPollResults.push(tableArray2);
		pastPollSizes.push(sSize);
		pastPollChoices.push(pollChoices);
		pastGraphData.push(graphData);
		pastGraphLabels.push(graphLabels);
		tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
		if(!isFree)
			pollTime(sSize, pollChoices);
	}
		
	if(state == 1){
		document.getElementById('event').innerHTML += "<button onclick = 'map("+1+",false,false)'>Back to Start</button>" 
	}

}

function changeData(){

	var isRawData = document.getElementById('rawDataButton').value;

	if(isRawData == 'true'){
		document.getElementById('rawDataButton').value = false;
		document.getElementById('table').style.display = 'block'
		document.getElementById('filterArea').style.display = 'block'
		document.getElementById('chartDiv').style.display = 'none'
		document.getElementById('rawDataButton').innerHTML = 'Show Graphs'
	}
	else{
		document.getElementById('rawDataButton').value = true;
		document.getElementById('table').style.display = 'none'
		document.getElementById('filterArea').style.display = 'none'
		document.getElementById('chartDiv').style.display = 'block'
		document.getElementById('rawDataButton').innerHTML = 'Show Raw Data'
	}


}

//Subtracts time required to take a poll based on both sample size and the number of questions
function pollTime(sSize, pollQuestions)
{
	if(pollQuestions.length%2 == 0)
	{
		timeRequired = sSize/10 + (pollQuestions.length*.5);
	}
	else
	{
		timeRequired = sSize/10 + (pollQuestions.length*0.5) +0.5;
	}
	remainingHoursTotal -= timeRequired;
	remainingHoursDay -= timeRequired;
}

function returnTotalPollTime(sSize, pollQuestions){
	if(pollQuestions% 2 == 0)
	{
		timeRequired = sSize/10 + (pollQuestions*.5);
	}
	else
	{
		timeRequired = sSize/10 + (pollQuestions*0.5) +0.5;
	}
	return timeRequired;
}

function pollTimeCheck(sSize, pollQuestions)
{
	if(pollQuestions.length%2 == 0)
	{
		timeRequired = sSize/10 + (pollQuestions.length*.5);
	}
	else
	{
		timeRequired = sSize/10 + (pollQuestions.length*0.5) +0.5;
	}
	return (timeRequired < remainingHoursDay);
}

function backtoUA()
{
	back = true;

	userAction();
}

function saveGameState()
{
	textContents="";
   //Save contents of pastPollChoices into the text file
	for(var i=0; i<pastPollChoices.length;i++)
	{
		for(var j=0; j<pastPollChoices[i].length;j++)
		{
				textContents+= pastPollChoices[i][j];
				if(j!=pastPollChoices[i].length-1)
				textContents+="*";
		}
		if(i!=pastPollChoices.length-1)
			textContents+="_";
	}
	textContents+="~";
    //Save contents of pastPollResults into the text file
	for(var i=0; i<pastPollResults.length;i++)
	{
		for(var j=0; j<pastPollResults[i].length;j++)
		{
			textContents+= pastPollResults[i][j];
				if(j!=pastPollResults[i].length-1)
				textContents+="*";
		}
		if(i!=pastPollResults.length-1)
			textContents+="_";
	}
	textContents+="~";

	// Save contents of pastPollSizes   into the text file
	for(var i=0; i<pastPollSizes.length;i++)
	{
		textContents+=pastPollSizes[i];
			if(i!=pastPollSizes.length-1)
				textContents+="*";
	}
	textContents+="~";
	//Save candidates array
	for(var i=0; i<candidates.length;i++)
	{
		textContents+=candidates[i].name;
			textContents+="*";
		textContents+=candidates[i].fame;
			textContents+="*";
		textContents+=candidates[i].issueScore;
			textContents+="*";
		textContents+=candidates[i].consMod;
			textContents+="*";
		textContents+=candidates[i].focus;
			textContents+="*";
		textContents+=candidates[i].focusnum;
			textContents+="*";
		textContents+=candidates[i].winChance;
			textContents+="*";
		textContents+=candidates[i].votes;
			textContents+="*";
		textContents+=candidates[i].correctAnswers;
			textContents+="*";
		textContents+=candidates[i].wrongAnswers;
			textContents+="*";
		textContents+=candidates[i].lastMove;
			textContents+="*";
		textContents+=candidates[i].raceNum;
			textContents+="*";
		textContents+=candidates[i].genderNum;
			textContents+="*";
		textContents+=candidates[i].bodyTypeNum;
			textContents+="*";
		textContents+=candidates[i].headNum;
			textContents+="*";
		textContents+=candidates[i].tuitPos;
			textContents+="*";
		textContents+=candidates[i].tuitNeg;
			textContents+="*";
		textContents+=candidates[i].athPos;
			textContents+="*";
		textContents+=candidates[i].athNeg;
			textContents+="*";
		textContents+=candidates[i].resPos;
			textContents+="*";
		textContents+=candidates[i].resNeg;
			textContents+="*";
		textContents+=candidates[i].medPos;
			textContents+="*";
		textContents+=candidates[i].medNeg;
			textContents+="*";
		textContents+=candidates[i].eventPos;
			textContents+="*";
		textContents+=candidates[i].eventNeg;

			if(i!=candidates.length-1)
				textContents+="_";
	}
	textContents+="~";

	//Save remainingHoursTotal
	textContents+=remainingHoursTotal;
	textContents+="~";

	//save graph data
	for (var z =0; z < pastGraphData.length; z++){
		if(z !=0){
			textContents+="_";
		}
		for(var a = 0; a < pastGraphData[z].length;a++){
			textContents+=pastGraphData[z][a];
			if(a != pastGraphData[z].length -1){
				textContents+="*";
			}
		}
	}
	textContents+="~";

	//Save contents of pastGraphLabels into the text file
	for(var i=0; i<pastGraphLabels.length;i++)
	{
		for(var j=0; j<pastGraphLabels[i].length;j++)
		{
			textContents+= pastGraphLabels[i][j];
				if(j!=pastGraphLabels[i].length-1)
				textContents+="*";
		}
		if(i!=pastGraphLabels.length-1)
			textContents+="_";
	}
	////console.log(pastGraphLabels);
	textContents+="~";
	
	//Save remainingHoursDay
	textContents+=remainingHoursDay;
	textContents+="~";
	
	//Save days
	textContents+=days;
	textContents+="~";
	
	//post all that information
	$.post('/game/saver', {saveData: textContents});
}

function loadGame()
{
	//Takes the Whole data and splits it into sections
	var saveArray = saveState.split("~");
	////console.log(saveArray);
	
	//Past Poll Choices Section
	if(saveArray[0] != [])
	{
		var ppcOuterArray = saveArray[0].split("_");
		for(var i =0; i < ppcOuterArray.length; i++)
		{
			pastPollChoices.push(ppcOuterArray[i].split("*"));
		}
	}

	// Past Poll Results Section
	if(saveArray[1] != [])
	{
		var pprOuterArray = saveArray[1].split("_");
		for(var i =0; i < pprOuterArray.length; i++)
		{
			var pprResults =[];
			var tempResults = pprOuterArray[i].split("*");
			for(var j = 0; j< tempResults.length; j++)
			{
				if(tempResults[j] != "")
				{
					var currentResults = tempResults[j].split(",");
					pprResults.push(currentResults);
				}
				else
				{
					pprResults.push([]);
				}
			}
			pastPollResults.push(pprResults);
		}
	}

	//Past Poll Sizes Section
	if(saveArray[2] != [])
	{
		var ppsArray = saveArray[2].split("_");
		pastPollSizes = ppsArray[0].split("*");
	}

	//Candidates Section
	var candArray = saveArray[3].split("_");
	var candAtts=[];
	for( var i= 0; i < candArray.length; i++)
	{
		candAtts.push(candArray[i].split("*"));
	}
	for( var i= 0; i < candAtts.length; i++)
	{
		var cand = new CandidateCreate(candAtts[i][0]);
		var tempfame = candAtts[i][1].split(",");
		cand.fame =[];
		for(var j =0; j< tempfame.length; j++)
		{
			cand.fame.push(parseFloat(tempfame[j]));
		}
		cand.issueScore = candAtts[i][2].split(",");		
		var tempissue = candAtts[i][2].split(",");
		cand.issueScore =[];
		for(var j =0; j< tempissue.length; j++)
		{
			cand.issueScore.push(parseFloat(tempissue[j]));
		}
		cand.consMod = parseFloat(candAtts[i][3]);
		cand.focus = candAtts[i][4];
		cand.focusnum = parseInt(candAtts[i][5]);
		cand.winChance = parseInt(candAtts[i][6]);
		cand.votes = parseInt(candAtts[i][7]);
		cand.correctAnswers = parseInt(candAtts[i][8]);
		cand.wrongAnswers = parseInt(candAtts[i][9]);
		cand.lastMove = candAtts[i][10];
		cand.raceNum = parseInt(candAtts[i][11]);
		cand.genderNum = parseInt(candAtts[i][12]);
		cand.bodyTypeNum = parseInt(candAtts[i][13]);
		cand.headNum = parseInt(candAtts[i][14]);
		cand.tuitPos = parseInt(candAtts[i][15]);
		cand.tuitNeg = parseInt(candAtts[i][16]);
		cand.athPos = parseInt(candAtts[i][17]);
		cand.athNeg = parseInt(candAtts[i][18]);
		cand.resPos = parseInt(candAtts[i][19]);
		cand.resNeg = parseInt(candAtts[i][20]);
		cand.medPos = parseInt(candAtts[i][21]);
		cand.medNeg = parseInt(candAtts[i][22]);
		cand.eventPos = parseInt(candAtts[i][23]);
		cand.eventNeg = parseInt(candAtts[i][24]);



		candidates.push(cand);
	}

	//console.log(candAtts);

	//Remaining Hours Section
	remainingHoursTotal = parseInt(saveArray[4]);

	//past graph saveData

	var graph = [];
	var graphgraph
	var multiGraphData = saveArray[5].split("_");
	////console.log(multiGraphData);
	for(var z = 0; z < multiGraphData.length; z++){
		var questionData = multiGraphData[z].split("*");
		////console.log(questionData);
		for(var y = 0; y < questionData.length; y++){
			var holderHolder = questionData[y].split(",")
			var holdArray = [];
			for(var x = 0; x < holderHolder.length; x++){
				holdArray[x] = parseFloat(holderHolder[x]);
			}
		graph.push(holdArray);
		}
		////console.log(graph);
	pastGraphData.push(graph);	
	graph = [];
	}

	// Past Graph Labels Section
	if(saveArray[6] != [])
	{
		var pglOuterArray = saveArray[6].split("_");
		for(var i =0; i < pglOuterArray.length; i++)
		{
			var pglResults =[];
			var tempResults = pglOuterArray[i].split("*");
			for(var j = 0; j< tempResults.length; j++)
			{
				if(tempResults[j] != "")
				{
					var currentResults = tempResults[j].split(",");
					pglResults.push(currentResults);
				}
				else
				{
					pglResults.push([]);
				}
			}
			pastGraphLabels.push(pglResults);
			////console.log(pglResults);
		}
	}

	//Remaining Hours in the Day Section
	remainingHoursDay = parseInt(saveArray[7]);
	
	//Current Day Section
	days = parseInt(saveArray[8]);
	
	back=true;
	saveState = "";
	hourChecker();

}
/* Back Button Prevention code */

function chooseIssue(candidate, chosenIssues, issueVal, issueCand)
{
	var counter;
	oppChoice=[0,1,2,3,4];

	for(var i =0; i <chosenIssues.length;i++)
	{
		oppChoice.splice(oppChoice.indexOf(chosenIssues[i]),1);
	}


	//Decides the opponents focus which cannot be the same as the player
	var oppFocus = Math.floor(Math.random()*(5-chosenIssues.length));
	candidate.focus = positions[oppChoice[oppFocus]];
	candidate.focusnum = oppChoice[oppFocus];
	switch(oppChoice[oppFocus])
	{
		case 0:
		candidate.issueScore[0]=issueVal;
		break;
		case 1:
		candidate.issueScore[1]=issueVal;
		break;
		case 2:
		candidate.issueScore[2]=issueVal;
		break;
		case 3:
		candidate.issueScore[3]=issueVal;
		break;
		case 4:
		candidate.issueScore[4]=issueVal;
		break;
	}

	if(issueCand)
	{
		chosenCandRanks.push(oppChoice[oppFocus]);
	}
}

function chooseRank(candidate, chosenRanks, issueCand)
{
	var counter;
	oppChoice=[0,1,2,3,4];
	
	for(var i =0; i <chosenRanks.length;i++)
	{
		oppChoice.splice(oppChoice.indexOf(chosenRanks[i]),1);
	}
	
	
	//Decides the opponents focus which cannot be the same as the player
	var oppRank = Math.floor(Math.random()*(5-chosenRanks.length));
	switch(oppChoice[oppRank])
	{
		case 0:
			candidate.fame = [1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6];
			candidate.consMod = 0.25;
			candidate.issueScore[candidate.focusnum] = 3;
		break;
		case 1:
			candidate.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
			candidate.consMod = 0.35;
			candidate.issueScore[candidate.focusnum] = 2;
		break;
		case 2:
			candidate.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
			candidate.consMod = 0.45;
			candidate.issueScore[candidate.focusnum] = 1.75;
		break;
		case 3:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.55;
			candidate.issueScore[candidate.focusnum] = 1.5;
		break;
		case 4:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.65;
			candidate.issueScore[candidate.focusnum] = 1.25;
		break;
	}
	
	if(issueCand)
	{
		chosenRanks.push(oppChoice[oppRank]);
	}
}


function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
	x: evt.clientX - rect.left,
	y: evt.clientY - rect.top
	};
}


function gameResults(scores, tutorial)
{
	clearScreen();	
	if(!tutorial)
	{
		remainingHoursTotal-=1;
		remainingHoursDay-=1;
		var pos = chosenEvent.groupPos.split(',');
		console.log(pos);
		var posText =  "<h4>You completed the minigame with a score of "+scores.score+" <br>Which will increase your fame with these groups: ";
		for (var i =0; i< pos.length;i++)
		{
			switch(pos[i])
			{
				case "Poor":
					posText += "Poor Economic Status";
				break;
		
				case "Low":
					posText += "Lower Economic Status";
				break;
				case "Low Mid":
					posText += "Low Middle Economic Status";
				break;
				case "Upper Mid":
					posText += "Upper Middle Economic Status";
				break;
				case "High":
					posText += "Upper Economic Status";
				break;
		
				case "Fine Arts":
					posText += "Fine Arts Major";
				break;
		
				case "Bus":
					posText += "Business Major";
				break;
				case "Eng":
					posText += "Engineering Major";
				break;
				case "Lib Arts":
					posText += "Liberal Arts Major";
				break;
				case "Tech":
					posText += "Technology Major";
				break;
		
				case "Media":
					posText += "Media Lover Group";
				break;
		
				case "Soc":
					posText += "Socialite Group";
		
				break;
				case "Read":
					posText += "Reader Group";
		
				break;
				case "Res":
					posText += "Researcher Group";
		
				break;
				case "Ath":
					posText += "Athlete Group";
		
				break;
			}
			if(i != pos.length-1)
			{
				posText += ", ";
			}
			else{
				posText += " ";
			}
		}
		if(scores.score <= scores.tier1)
		{
			posText += " " + "<br> By a score of "+0.1+"</h1>";
			document.getElementById("event").innerHTML = posText;
			scoreChanger(candidates[0], 0.1,pos,[]);
		}
		else if(scores.score <= scores.tier2 && scores.score >scores.tier1)
		{
			posText += " " + "<br> By a score of "+0.2+"</h1>";
			document.getElementById("event").innerHTML = posText;
			scoreChanger(candidates[0], 0.2,pos,[]);
		}
		else if(scores.score <= scores.tier3 && scores.score >scores.tier2)
		{
			posText += " " + "<br> By a score of "+0.3+"</h1>";
			document.getElementById("event").innerHTML = posText;
			scoreChanger(candidates[0], 0.3,pos,[]);
		}
		else if(scores.score > scores.tier3)
		{
			if( scores.score> scores.tier4)
				scores.score = scores.tier4;
			var x = .3 + (.01*(scores.score-scores.tier3));
			x = x.toFixed(2);
			posText += " " + "<br> By a score of "+x+"</h1>";
			document.getElementById("event").innerHTML = posText;
			scoreChanger(candidates[0], x,pos,[]);
		}
		else{
			document.getElementById("event").innerHTML = posText;
			scoreChanger(candidates[0], (scores * .1),pos,[]);
		}
		
			saveGameState();
			document.getElementById("next").innerHTML += "<button onclick = 'hourChecker()'> Return to the User Action Area </button>";
	}
	else
	{
		var posText =  "<h4>You completed the minigame with a score of "+ (scores.score); 
		document.getElementById("event").innerHTML = posText;
		document.getElementById("next").innerHTML += "<button onclick = 'startPractice()'> Return to the Practice Screen </button>";
	}
	document.getElementById("next").style.display = "block";
}


function hourChecker()
{

	if (days < 10)
	{

		if(remainingHoursDay < 1)
		{
			days++;
			remainingHoursDay = 12;
			map(0, false, true);
		}
		else
		{
			saveGameState();
			userAction();
		}
	}
	else
	{

		if(remainingHoursTotal<1)
		{
			gameCycleEnd();
		}
		else
		{
			saveGameState();
			userAction();
		}
	}
}

window.onload = startGame();

/* Console Disabling Code */

//Disable Console Logging
//window.//console.log = function(){
//    console.error('The ability to view the console is disabled for security purposes.');
//    window.//console.log = function() {
//        return false;
//    }
//}

//Disable Console Funntions
Object.defineProperty(window, "console", {
    value: console,
    writable: false,
    configurable: false
});

var i = 0;
function showWarningAndThrow() {
    if (!i) {
        setTimeout(function () {
            //console.log("%cWarning message", "font: 2em sans-serif; color: yellow; background-color: red;");
        }, 1);
        i = 1;
    }
    throw "Console is disabled";
}

var l, n = {
        set: function (o) {
            l = o;
        },
        get: function () {
            showWarningAndThrow();
            return l;
        }
    };
Object.defineProperty(console, "_commandLineAPI", n);
Object.defineProperty(console, "__commandLineAPI", n);

var runningGame ={};
var runningGame2 = {};

/* Minigame Code*/
runningGame.main = 
{
	player:
	{
		width : 50,
		height : 50,
		x : 475,
		y:400
	},
	lanes:[],
	enemies:[],
	coins:[],
	speed:50,
	time: 60,
	playTime: this.time*1000,
	scores:
	{
		score: 0,
		tier1: 5,
		tier2: 10,
		tier3: 15,
		tier4: 20
	},
	stop: false,
	


	init: function (c,ctx)
	{
		ctx.restore;
		ctx.save;
		bodyPixelLocation = [];
		frameIndex = 0;
		ticker = 0;
		if(typeof playerCandidate !== 'undefined'){
			headNumber = playerCandidate.headNum
			raceNumber = playerCandidate.raceNum
			genderNumber = playerCandidate.genderNum
			bodyTypeNumber = playerCandidate.bodyTypeNum
		}
		else{
			headNumber = 0;
			raceNumber = 0;
			genderNumber = 0
			bodyTypeNumber = 0
		}

		bodyPixelArray = [[169,123], [185,137],[218,175],[180,194]]
		backgroundImage= new Image();
		backgroundImage.src ="../img/minigame1/cafebg.png";
		playerAvatar = new Image();
		playerAvatar.src = "../img/minigame1/headspritesheettop.png";
		enemyAvatar = new Image();
		enemyAvatar.src = "../img/minigame1/spriteFlip/flipheadtopsprite.png";
		thinBodyCycle = new Image();
		thinBodyCycle.src = "../img/minigame1/thinwalkcyclesheet.png";
		medBodyCycle = new Image();
		medBodyCycle.src = "../img/minigame1/medwalkcycletop.png";
		largeBodyCycle = new Image();
		largeBodyCycle.src = "../img/minigame1/largewalkcycletop.png";
		chairBodyCycle = new Image();
		chairBodyCycle.src = "../img/minigame1/chairwalkcycletop.png";
		//enemies
		enemythinBodyCycle = new Image();
		enemythinBodyCycle.src = "../img/minigame1/spriteFlip/flipthinkwalkcyclesheet.png";
		enemymedBodyCycle = new Image();
		enemymedBodyCycle.src = "../img/minigame1/spriteFlip/flipmedwalkcyclesheet.png";
		enemylargeBodyCycle = new Image();
		enemylargeBodyCycle.src = "../img/minigame1/spriteFlip/fliplargewalkcyclesheet.png";
		enemychairBodyCycle = new Image();
		enemychairBodyCycle.src = "../img/minigame1/spriteFlip/flipchairwalkcyclesheet.png";
		animationAssets = new Image();
		animationAssets.src = "../img/minigame1/assetscafe.png";
		walkCycleArray = [thinBodyCycle, medBodyCycle, largeBodyCycle, chairBodyCycle];
		enemyWalkCycleArray = [enemythinBodyCycle, enemymedBodyCycle, enemylargeBodyCycle, enemychairBodyCycle];
		//lets add all the images

		runningGame.main.player=
		{
			width : 50,
			height : 50,
			x : 475,
			y:375
		};
		runningGame.main.lanes=[];
		runningGame.main.enemies=[];
		runningGame.main.coins=[];
		runningGame.main.removeEns=[];
		runningGame.main.removeCoins=[];
		runningGame.main.mouse={};
		runningGame.main.speed=50;
		runningGame.main.time= 60;
		runningGame.main.playTime= runningGame.main.time*1000;
		runningGame.main.scores=
		{
			score: 0,
			tier1: 5,
			tier2: 10,
			tier3: 15
		};
		runningGame.main.stop= false;
		
		runningGame.main.lanes.push(
		{
			top : 0,
			bottom : 500,
			left:0,
			right:332
		});
		runningGame.main.lanes.push(
		{
			top : 0,
			bottom : 500,
			left:334,
			right:665
		});
		runningGame.main.lanes.push(
		{
			top : 0,
			bottom : 500,
			left:667,
			right:999
		});
		ctx.strokeRect(0, 0, 1000, 500);

		ctx.moveTo(333, 0)
		ctx.lineTo(333,500);
		ctx.stroke();

		ctx.moveTo(666, 0);
		ctx.lineTo(666,500);
		ctx.stroke();

		ctx.font = "20px Arial";
		ctx.strokeText("Minutes Remaining: " +runningGame.main.time+"",790,20);

		ctx.font = "20px Arial";
		ctx.strokeText("Score " +runningGame.main.scores.score+"",0,20);

		c.onmousedown = runningGame.main.doMousedown;
		for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/15)
		{setTimeout(runningGame.main.enemyGenerator, i);}
		for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/20)
		{setTimeout(runningGame.main.coinGenerator, i);}
		for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/6)
		{setTimeout(runningGame.main.increaseSpeed, i);}
		for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/runningGame.main.time)
		{setTimeout(runningGame.main.timer, i);}
		setTimeout(runningGame.main.stopGame, runningGame.main.playTime);
		runningGame.main.update(c,ctx);
	},

	update: function (c,ctx)
	{
		if(!runningGame.main.stop)
		{
			requestAnimationFrame(function(){runningGame.main.update(c,ctx)});
			requestAnimationFrame(function(){runningGame.main.draw(c,ctx)});
			
			
			runningGame.main.collisionManager();
			for(var i=0;i<runningGame.main.enemies.length;i++)
			{
				runningGame.main.enemies[i].move();
			}
			for(var i=0;i<runningGame.main.coins.length;i++)
			{
				runningGame.main.coins[i].move();
			}
			if(frameIndex >= 8){
				frameIndex = 0;
			}
			ticker++;
		}
	},

	draw: function(c,ctx)
	{
		ctx.drawImage(backgroundImage,-30,0,930,500);
		
		
		ctx.font = "20px Arial";
		ctx.strokeText("Time Remaining: " +runningGame.main.time+"",700,20);
		
		ctx.font = "20px Arial";
		ctx.strokeText("Score " +runningGame.main.scores.score+"",0,20);
		var actualFrame;
		//player	
		//body
		if(bodyTypeNumber ==3){
			actualFrame =0;
		}
		else{
			actualFrame = frameIndex
		}
		ctx.drawImage(walkCycleArray[bodyTypeNumber], (actualFrame * bodyPixelArray[bodyTypeNumber][0]) ,(genderNumber * bodyPixelArray[bodyTypeNumber][1]),bodyPixelArray[bodyTypeNumber][0],bodyPixelArray[bodyTypeNumber][1],runningGame.main.player.x-2,runningGame.main.player.y-5,runningGame.main.player.width,runningGame.main.player.height);
		//head
		ctx.drawImage(playerAvatar, headNumber * 154, raceNumber*162 ,154,162,runningGame.main.player.x-1,runningGame.main.player.y,runningGame.main.player.width,runningGame.main.player.height);
		


		//enemies
			for(var i=0;i<runningGame.main.enemies.length;i++)
			{
			if(runningGame.main.enemies[i].body ==3){
					actualFrame =0;
				}
			else{
				actualFrame = frameIndex
			}
				ctx.drawImage(enemyWalkCycleArray[runningGame.main.enemies[i].body], (actualFrame * bodyPixelArray[runningGame.main.enemies[i].body][0]) ,(runningGame.main.enemies[i].gender * bodyPixelArray[runningGame.main.enemies[i].body][1]),bodyPixelArray[runningGame.main.enemies[i].body][0],bodyPixelArray[runningGame.main.enemies[i].body][1],runningGame.main.enemies[i].x,runningGame.main.enemies[i].y+5,runningGame.main.enemies[i].width,runningGame.main.enemies[i].height);
				ctx.drawImage(animationAssets,8,210,118,75,runningGame.main.enemies[i].x+5,runningGame.main.enemies[i].y+35,40,20)
				ctx.drawImage(animationAssets,32,149,49,49,runningGame.main.enemies[i].x+15,runningGame.main.enemies[i].y+35,20,20)
				ctx.drawImage(enemyAvatar,runningGame.main.enemies[i].face * 154, runningGame.main.enemies[i].race * 162 ,150,160,runningGame.main.enemies[i].x,runningGame.main.enemies[i].y,runningGame.main.enemies[i].width,runningGame.main.enemies[i].height);
				if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.enemies[i])){
					ctx.drawImage(animationAssets,248,169,241,157,runningGame.main.enemies[i].x-50,runningGame.main.enemies[i].y-20,157,107);
				}
				
			}
		//coins
			for(var i=0;i<runningGame.main.coins.length;i++)
			{
				if(runningGame.main.coins[i].body ==3){
					actualFrame =0;
				}
				else{
					actualFrame = frameIndex
				}
				ctx.drawImage(enemyWalkCycleArray[runningGame.main.coins[i].body],(actualFrame * bodyPixelArray[runningGame.main.coins[i].body][0]) ,(runningGame.main.coins[i].gender * bodyPixelArray[runningGame.main.coins[i].body][1]),bodyPixelArray[runningGame.main.coins[i].body][0],bodyPixelArray[runningGame.main.coins[i].body][1] ,runningGame.main.coins[i].x+2,runningGame.main.coins[i].y+5,runningGame.main.coins[i].width,runningGame.main.coins[i].height); 
       			ctx.drawImage(enemyAvatar,runningGame.main.coins[i].face * 154, runningGame.main.coins[i].race * 162 ,150,160,runningGame.main.coins[i].x,runningGame.main.coins[i].y,runningGame.main.coins[i].width,runningGame.main.coins[i].height);
				if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.coins[i])){
					ctx.drawImage(animationAssets,241,0,177,148,runningGame.main.coins[i].x-55,runningGame.main.coins[i].y-25,157,107);
				}
			}
			if(ticker > 5){
				frameIndex++;
				ticker = 0;
			}
		

	},
	
	doMousedown: function(c, e)
	{ 
	//console.log(canvasMouse);
		var mouse = canvasMouse;
		runningGame.main.laneChanger(mouse);
	},

	laneChanger: function (mouse)
	{
		//console.log(runningGame.main.lanes);
		//console.log(mouse);
		
		for(var i=0; i < runningGame.main.lanes.length; i++)
		{
			if(mouse.x >= runningGame.main.lanes[i].left && mouse.x <= runningGame.main.lanes[i].right && mouse.y >= runningGame.main.lanes[i].top && mouse.y <= runningGame.main.lanes[i].top + runningGame.main.lanes[i].bottom )
			{
				runningGame.main.player.x = ((runningGame.main.lanes[i].left+runningGame.main.lanes[i].right)/2 - 25);
				if(i==0)
				{
					//console.log("1");
				}
				else if(i==1)
				{
					//console.log("2");
				}
				else if(i==2)
				{
					//console.log("3");
				}
			}
		}
	},

	enemyGenerator: function ()
	{
		var add = true;
		var lane = Math.floor(Math.random()* 3);
		var tempRect = 
		{
			touched:false,
			width : 50,
			height : 50,
			y: 75,
			x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
			move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
		};
		for(var i =0; i< runningGame.main.enemies.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.enemies[i],tempRect))
				add = false;
		}
		for(var i =0; i< runningGame.main.coins.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.coins[i],tempRect))
				add = false;
		}
		if(add)
		{
			runningGame.main.enemies.push(
			{
				touched:false,
				width : 50,
				height : 50,
				y: 75,
				race: Math.floor((Math.random() * 3)),
				gender: Math.floor((Math.random() * 3)), 
				face: Math.floor((Math.random() * 6)), 
				body: Math.floor((Math.random() * 4)),  
				x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
				move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
				id: runningGame.main.enemies.length
			});
		}

		//console.log(runningGame.main.enemies);
	},

	coinGenerator: function ()
	{
		//var lane = Math.floor(Math.random()* 3);
		//runningGame.main.coins.push(
		//{
		//	width : 50,
		//	height : 50,
		//	y: 100,
		//	x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
		//	move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
		//	id: runningGame.main.coins.length
		//});
		
		
		var add = true;
		var lane = Math.floor(Math.random()* 3);
		var tempRect = 
		{
			width : 50,
			height : 50,
			y: 100,
			x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
			move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
		};
		for(var i =0; i< runningGame.main.enemies.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.enemies[i],tempRect))
				add = false;
		}
		for(var i =0; i< runningGame.main.coins.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.coins[i],tempRect))
				add = false;
		}
		if(add)
		{
			runningGame.main.coins.push(
			{
				touched:false,
				width : 50,
				height : 50,
				y: 75,
				race: Math.floor((Math.random() * 3)),
				gender: Math.floor((Math.random() * 3)), 
				face: Math.floor((Math.random() * 6)), 
				body: Math.floor((Math.random() * 4)),  
				x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
				move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
				id: runningGame.main.coins.length
			});
		}

	},

	collisionDetector: function (rect1, rect2)
	{
		if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) 
			return true;
		else
			return false;
	},

	collisionManager: function ()
	{
		for(var i=0;i<runningGame.main.enemies.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.enemies[i]))
			{
				if(runningGame.main.enemies[i].touched == false)
				{
					runningGame.main.enemies[i].touched = true;
					runningGame.main.scores.score--;
					if(runningGame.main.scores.score<0)
							runningGame.main.scores.score=0;
				}
				//draw the collision

			}
			else if(runningGame.main.enemies[i].y >1000)
			{
				runningGame.main.removeEns.push(runningGame.main.enemies[i].id);
			}
		}
		for(var i=0;i<runningGame.main.coins.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.coins[i]))
			{
				if(runningGame.main.coins[i].touched == false)
				{
					runningGame.main.coins[i].touched = true;
					runningGame.main.scores.score++;
					if(runningGame.main.scores.score>20)
							runningGame.main.scores.score=20;
				}
			}
			else if(runningGame.main.coins[i].y >1000)
			{
				runningGame.main.removeCoins.push(runningGame.main.coins[i].id);
			}
		}
	},

	stopGame: function ()
	{
		runningGame.main.stop=true;
		gameResults(runningGame.main.scores, practice);
	},

	calculateDeltaTime: function()
	{
		var now,fps;
		now = (+new Date);
		fps = 1000 / (now - this.lastTime);
		fps = Math.max(12, Math.min(60, fps));
		this.lastTime = now;
		return 1/fps;
	},

	increaseSpeed: function()
	{
		runningGame.main.speed += 25;
	},

	timer: function()
	{
		runningGame.main.time--;
	}
}

/*Photo Game*/
runningGame2.main = 
{
	player:
	{
		picturenum:0,
		pictures:[],

	},
	studentCircles: [],
	requiredDemograph1: 0,
	requiredDemograph2: 0,
	takenDemograph1:0,
	takenDemograph2:0,
	demograph1num:0,
	demograph2num:0,
	areaNumber: 0,
	specialExist: false,
	picturetaken: false,
	inArea:false,
	
	scores: {
		score:0,
	}
	,

	//area numbers (0-Map, 1-6 map locations clockwise, 7 victory screen?)

	
	stop: false,

	init: function(c,ctx){
		ctx.restore;
		ctx.save;
		runningGame2.main.gameStop = false;
		runningGame2.main.player.picturenum = 0;
		runningGame2.main.scores.score = 0;	
		runningGame2.main.areaNumber = 0;	
		c.onmousedown = runningGame2.main.doMousedown;
		ctx.font="14px Georgia";
		runningGame2.main.requiredDemograph1 = Math.floor(Math.random() * 6) + 2;
		runningGame2.main.requiredDemograph1 = Math.floor(Math.random() * 3) + 2;
		runningGame2.main.demograph1num = Math.floor(Math.random() * 5);
		runningGame2.main.demograph2num = Math.floor(Math.random() * 5);
		runningGame2.main.takenDemograph1=0;
		runningGame2.main.takenDemograph2=0;
	
		runningGame2.main.draw(c,ctx);
	},

	update: function (c,ctx)
	{
		if(!runningGame.main.stop)
		{
			//double check player photos = the amount they need
				//end game
			if(runningGame2.main.player.picturenum > 2){
				console.log('hi', runningGame2.main.scores.score, practice);
				gameResults(runningGame2.main.scores, practice);
			}

			else{
			//generate information for the map area
			if(runningGame2.main.areaNumber > 0 && !(runningGame2.main.picturetaken)){
			 	
			 	if(!runningGame2.main.inArea){
			 	createSample((Math.floor(Math.random() * 3) + 5), runningGame2.main.areaNumber)
				runningGame2.main.studentCircles = [];
				sample.forEach(function(element) {
					var studentCircleHolder = {color:"#FF0000"}
   					if(majorList.indexOf(element.major) == runningGame2.main.demograph1num){
   						studentCircleHolder.color = "#00FF00";
   					}
   					
   						runningGame2.main.studentCircles.push(studentCircleHolder)
   					
				});
				//spawn special events
				var isSpecial = Math.floor(Math.random() * 100)
				console.log(isSpecial)
				if(isSpecial < 5){
					var special = {color:"#000000"}
					runningGame2.main.studentCircles.push(special)
				}
				runningGame2.main.inArea = true;
				}
				
			}
			else if(runningGame2.main.picturetaken){
			
				runningGame2.main.picturetaken = false;
				runningGame2.main.inArea = false;
				runningGame2.main.areaNumber = 0;
			}

			//draw the next screen
			runningGame2.main.draw(c,ctx);
			}

			
		}
	},

	draw: function(c,ctx)
	{
		//draw the background for the area
		ctx.fillStyle="#FFFFFF";
		ctx.fillRect(0,0,c.width,c.height);
		//draw anything specific ontop of the background layer depending on what area you are
		if(runningGame2.main.areaNumber == 0){
			//quad
			ctx.fillStyle = '#AAAAAA'
			ctx.fillRect(400,250,100,100);
			ctx.fillStyle = '#000000'
			ctx.fillText("Quad",440,305);
			//gym
			ctx.fillStyle = '#FF0000'
			ctx.fillRect(100,50,100,100);
			ctx.fillStyle = '#000000'
			ctx.fillText("Gym",140,105);
			//media
			ctx.fillStyle = '#00FF00'
			ctx.fillRect(400,50,100,100);
			ctx.fillStyle = '#000000'
			ctx.fillText("Media Room",400,105);
			//res
			ctx.fillStyle = '#0000FF'
			ctx.fillRect(700,50,100,100);
			ctx.fillStyle = '#FFFFFF'
			ctx.fillText("Labs",700,105);

			ctx.fillStyle = '#FFFF00'
			ctx.fillRect(225,350,100,100);
			ctx.fillStyle = '#000000'
			ctx.fillText("Coffe Shop",225,350);

			ctx.fillStyle = '#00FFFF'
			ctx.fillRect(575,350,100,100);
			ctx.fillStyle = '#000000'
			ctx.fillText("Gym",575,350);
		}
		if(runningGame2.main.areaNumber >0){
			
			//draw the students
	
				runningGame2.main.studentCircles.forEach(function(element) {
    		
	    			ctx.fillStyle = element.color;
	    			var xpos = Math.floor(Math.random() * 600) + 50;
	    			var ypos = Math.floor(Math.random() * 400) +25;
	    			ctx.beginPath();
	    			ctx.arc(xpos,ypos,40,0,2*Math.PI);
	    			ctx.fill();
	    			ctx.stroke();
				});
			
			

			//draw the ux/ui of the game
			ctx.fillStyle = '#EEEEEE'
			ctx.fillRect(0,440,c.width,100);
			ctx.fillStyle = '#AAAAAA'
			ctx.fillRect(0,440,100,50);
			ctx.fillStyle = '#000000'
			ctx.fillText("Back",0,460);

			ctx.fillStyle = '#000000'
			ctx.fillRect(400,440,100,50);
			ctx.fillStyle = '#FFFFFF'
			ctx.fillText("Take Picture",410,460);

			

		}

			//draw the score
			ctx.fillStyle = '#000000'
			var scoreText = runningGame2.main.takenDemograph1 + '/'+ runningGame2.main.requiredDemograph1 + " " + majorList[runningGame2.main.demograph1num] + " Students";
			var photosLeftText = runningGame2.main.player.picturenum + '/3 Photos Left'
			ctx.fillText(scoreText, 700,10);
			ctx.fillText(photosLeftText, 100,10);
		
	},

	doMousedown: function(c, e)
	{ 
		//console.log(canvasMouse);
		var mouse = canvasMouse;
		var update = false

		//check if the area is clickable
		if(runningGame2.main.areaNumber == 0){
			//quad
			if((mouse.x >= 400 && mouse.x <= 500)&&(mouse.y >= 250 && mouse.y <= 350)){
				runningGame2.main.areaNumber = 1;
				update = true;
			}
			//gym
			if((mouse.x >= 100 && mouse.x <= 200)&&(mouse.y >= 50 && mouse.y <= 150)){
				runningGame2.main.areaNumber = 2;
				update = true;
			}
			//media
			if((mouse.x >= 400 && mouse.x <= 500)&&(mouse.y >= 50 && mouse.y <= 150)){
				runningGame2.main.areaNumber = 3;
				update = true;
			}
			//labs
			if((mouse.x >= 700 && mouse.x <= 800)&&(mouse.y >= 50 && mouse.y <= 150)){
				runningGame2.main.areaNumber = 4;
				update = true;
			}
			//coffee shop
			if((mouse.x >= 250 && mouse.x <= 350)&&(mouse.y >= 350 && mouse.y <= 450)){
				runningGame2.main.areaNumber = 5;
				update = true;
			}
			//library
			if((mouse.x >= 575 && mouse.x <= 675)&&(mouse.y >= 350 && mouse.y <= 450)){
				runningGame2.main.areaNumber = 6;
				update = true;
			}
		}
		if(runningGame2.main.areaNumber > 0){
			if((mouse.x >= 0 && mouse.x <= 100)&&(mouse.y >= 440 && mouse.y <= 490)){
				runningGame2.main.areaNumber = 0;
				runningGame2.main.inArea = false;
				update = true;
			}
			if((mouse.x >= 400 && mouse.x <= 500)&&(mouse.y >= 440 && mouse.y <= 490)){
				runningGame2.main.picturetaken = true;
				update = true;
				runningGame2.main.player.picturenum++;
				runningGame2.main.studentCircles.forEach(function(element) {
		
					if (element.color == "#00FF00"){						
						runningGame2.main.takenDemograph1++;
						runningGame2.main.scores.score++;				
					}
					if (element.color == "#000000"){					
						
						runningGame2.main.scores.score = runningGame2.main.scores.score + 3;				
					}
					
				});
			}
		}

		if(update){
			runningGame2.main.update(this, this.getContext("2d"))
		}
		
		//if not a clickable area do nothing
	},

	
}
