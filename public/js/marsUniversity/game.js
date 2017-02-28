//making all the score presets
var groupList = ["socialite", "athlete", "researcher", "mediaLover", "reader"];
var majorList = ["business", "engineering", "tech", "fineArts", "libArts"];
var stuEconomic = ["poverty", "low", "midLow", "midHigh", "high"];
var playerCandidate = new CandidateCreate("ph");
var opponentCandidate = new CandidateCreate("Liz");
var fakeCandidateHolder = []
var currentCandidateArrayHolder = []
var graphData = [];
var lastMinigame = 0; 


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
var graphType = "Pie";
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
var gameSession = 0; 
var gameOver = false; 
var endReset = false;
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
	document.getElementById("gameInfo").innerHTML = "<div id = 'practice' style = 'text-align:center; '><br><h1 >Practice</h1><br><a onclick = 'practicePoll()' id='index-link' class = 'btn double remove'>Polling Tutorial</a><br><a onclick = 'practiceGame(1)' id='index-link' class = 'btn double remove'>Fun Run</a><br><a onclick = 'practiceGame(2)' id='index-link' class = 'btn double remove'>Photobomb</a><a onclick = 'practiceGame(3)' id='index-link' class = 'btn double remove'>Secret Sticker</a><br><a onclick = 'practiceGame(4)' id='index-link' class = 'btn double remove'>Mean Moves</a><a onclick = 'practiceGame(5)' id='index-link' class = 'btn double remove'>T-Shirt Canon</a></div> <br><a onclick = 'splashScreen()' id='index-link' class = 'btn double remove'>Return to Start Menu</a>"; 


}

function helpScreen()
{
	clearScreen();
	document.getElementById("playerInfo").style.display = "none";
	document.getElementById("gameInfo").innerHTML = "<h1> Help</h1> <hr> <button onclick= 'openGlossary()'>Glossary Page</button> <button onclick= 'tutorial("+true+")'>Start the Tutorial</button> <br><br><button onclick= 'userAction()'>Return to User Action Area</button>"
}

function trendReportMenu()
{
	clearScreen();
	document.getElementById("playerInfo").style.display = "none";
	document.getElementById("gameInfo").innerHTML = "<div id= 'reportButtons' > <h1> Trend Reports</h1> <hr><br><div><h2> General</h2><button onclick= 'trendReporter(`issFav`)'>Favored Issue Report</button><button onclick= 'trendReporter(`issOpp`)'>Opposed Issue Report</button><button onclick= 'trendReporter(`candFav`)'>Favored Candidate Report</button><button onclick= 'trendReporter(`candOpp`)'>Opposed Candidate Report</button></div><br><div><h2> Support For Issues</h2><button onclick= 'trendReporter(`issuetuition`)'>Lowering Tuition Report</button><button onclick= 'trendReporter(`issueathletic`)'>Increse Athletic Budget Report</button><button onclick= 'trendReporter(`issueresearch`)'>Increase Research Budget Report</button><button onclick= 'trendReporter(`issueevents`)'>More School Events Report</button><button onclick= 'trendReporter(`issuemedical`)'>Improve Medical Services</button></div><br><div id = 'candReportsFame'><h2>Candidate Stats - Fame</h2></div><br><div id = 'candReportsTrust'><h2>Candidate Stats - Trust</h2></div>"
    document.getElementById("candReportsFame").innerHTML += "<button onclick= 'trendReporter(`fame`)'>Fame - " + candidates[0].name +"</button>"
    for(var k = 1;k<candidates.length;k++)
	{
        var method = "candFame" + candidates[k].name;
		document.getElementById("candReportsFame").innerHTML += "<button onclick= 'trendReporter(`"+method+"`)'>Fame - " + candidates[k].name +"</button>";
	}
    document.getElementById("candReportsTrust").innerHTML += "<button onclick= 'trendReporter(`playTrust`)'>Trust - " + candidates[0].name +"</button>"
	for(var k = 1;k<candidates.length;k++)
	{
        var method = "candTrust" + candidates[k].name;
        document.getElementById("candReportsTrust").innerHTML += "<button onclick= 'trendReporter(`"+method+"`)'>Trust - " + candidates[k].name +"</button>";
	}
     document.getElementById("gameInfo").innerHTML += "</div><br> <div id = 'trendArea' style = 'display:none'> <svg id='visualisation' width='800' height='450'><path id='segments-line' /><path id='gap-line' /><text font-family='sans-serif' font-size='20px'>Blah</text></svg> </div>";
     
     document.getElementById("gameInfo").innerHTML += "<button id ='buttonViewer' style = 'display:none'>Choose Another Trend Report</button>";
     document.getElementById("gameInfo").innerHTML += "<button onclick= 'userAction()'>Return to User Action Area</button>";
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
 	getSession(gameOver);
	resetGame();
	//character creator here
	//for right now we'll do a drop down option
	document.getElementById("gameInfo").innerHTML = "<h1>Character Creation</h1>";
	document.getElementById("gameInfo").innerHTML += "<canvas id='myCanvas' width='500px' height = '555px'></canvas><br>";
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
    document.getElementById("holo").src = "../../img/openscreenlarge.png";
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
    document.getElementById("map").innerHTML += "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
    var mapbackground = new Image();
    mapbackground.src = '../../img/map/mapMU600pxW.png';
    
    var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
    ctx.fillStyle = '#FFFFFF'
    console.log(gameSession)
    
    
    
	document.getElementById("playerInfo").innerHTML += "<h3> Day: " + days +" </br> Remaining Hours Today: " + remainingHoursDay + "</h3><hr>";	
    if(remainingHoursDay >=3)
    {
        document.getElementById("Buttons").innerHTML += "<button type='button' onclick='map("+0+",false,false)'> Take A Poll </button>";
    }
    else
    {
        document.getElementById("Buttons").innerHTML += "<button type='button' > Cannot Take a Poll </button>";
    }
	document.getElementById("Buttons").innerHTML += "<button type='button' onclick='statement()'> Make a Statement - 1 Hour</button>";
	document.getElementById("Buttons").innerHTML += "<button type='button' onclick='helpScreen()'> Help Screen</button>";
	document.getElementById("Buttons").innerHTML += "<button type='button' onclick='trendReportMenu()'> View Trend Reports</button>";
	document.getElementById("Buttons").innerHTML += "<button type='button' class='logEventEnd' onclick='gameCycleEnd()'> Skip to the End </button>";
	for(var i=0; i<pastPollResults.length;i++)
	{
		var num = i+1;
		document.getElementById("Buttons").innerHTML += "<button type='button' onclick='reportViewer("+i+")' >View Poll "+ num +" Result </button>";
    }
	document.getElementById("gameInfo").innerHTML += "<h3 style = 'float: right'> Rival\'s Last Move: " + candidates[1].lastMove + "</h3>";
	//document.getElementById("choices").innerHTML += "<br>";
    
   
	

    
	c.addEventListener('mousemove', function(evt) {canvasMouse = getMousePos(c, evt);}, false);
	c.onmousedown = doMousedownMain;
	c.onmousemove = doMouseOver;
    
    ctx.drawImage(mapbackground, 0,0,600,414);
	mapbackground.onload = drawMap();
    
	currentEvents = [];
    document.getElementById("QuadChoice").innerHTML += "<h2>Quad</h2>";
    document.getElementById("CafeChoice").innerHTML += "<h2>Cafe</h2>";
    document.getElementById("LabChoice").innerHTML += "<h2>Labs</h2>";
    document.getElementById("GymChoice").innerHTML += "<h2>Gym</h2>";
    document.getElementById("LibraryChoice").innerHTML += "<h2>Library</h2>";
    document.getElementById("MediaChoice").innerHTML += "<h2>Media Room</h2>";
	////Adds events to button list randomly from those available and Prevents Duplicates and events with more time than is available
	for(var i = 1;i<events.length;i++)
	{
		currentEvents.push(events[i]);
		var eventDescription = events[i].name + " - " + events[i].timeRequired;
		var arrayPos = events[i].id -1;
       switch(events[i].loc)
        {
            case "Quad":
                document.getElementById("QuadChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
            case "Cafe":
                document.getElementById("CafeChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
            case "Labs":
                document.getElementById("LabChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
           break;
            case "Gym":
                document.getElementById("GymChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
            case "Library":
               document.getElementById("LibraryChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
          case "Media Room":
               document.getElementById("MediaChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
        }
      
	}
	document.getElementById("eventInput").innerHTML += "<button id = 'eventSelect' onclick='action()'>Perform Action</button>";
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
    endReset = true; 
    gameOver = true;
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
   

        var mapbackground = new Image();
        mapbackground.src = '../../img/map/mapMU600pxW.png';
    
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
    document.getElementById("event").innerHTML += "<div id = 'mapArea'><canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative;'></canvas></div><div id = 'questionArea'></div>";
    var c=document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.addEventListener('mousemove', function(evt) {canvasMouse = getMousePos(c, evt);}, false);
    c.onmousedown = doMousedown;
    c.onmousemove = doMouseOver;
    
    ctx.drawImage(mapbackground, 0,0,600,414);
    mapbackground.onload = drawMap();
	document.getElementById("questionArea").innerHTML +="<h4>Population & Sample</h4><br>";
	var buttonLabels = ["Quad", "Coffee Shop", "Gym", "Lab", "Media Room", "Library"];
	document.getElementById("questionArea").innerHTML += "<label>Location: </label><select id = 'location'></select><br>";
	for(x =0; x< buttonLabels.length; x++){
		document.getElementById("location").options.add(new Option(buttonLabels[x],x));
	}
	document.getElementById("questionArea").innerHTML += "<label>Sample Size: </label><select id = 'sample' class = 'sampleOptions totalTimeTracker'><br></select><br><label>Rooms: </label><select id = 'rooms' class = 'sampleOptions'></select><br><label>Time Spent: </label><select id = 'timeSpent' class = 'sampleOptions'></select><hr>";
	back = false;
	if(state != 0 || remainingHoursDay>= 3 )
	{

		document.getElementById("sample").options.add(new Option("Sample 20 Students", 20));
		if(remainingHoursDay> 5 )
			document.getElementById("sample").options.add(new Option("Sample 40 Students", 40));
		//if(remainingHoursDay> 7 )
		//	document.getElementById("sample").options.add(new Option("Sample 60 Students", 60));
		//if(remainingHoursDay> 9 )
		//	document.getElementById("sample").options.add(new Option("Sample 80 Students", 80));

			document.getElementById("rooms").options.add(new Option("1 Room", 20));
		if(remainingHoursDay> 5 )
			document.getElementById("rooms").options.add(new Option("2 Rooms", 40));
		//if(remainingHoursDay> 7 )
		//	document.getElementById("rooms").options.add(new Option("3 Rooms", 60));
		//if(remainingHoursDay> 9 )
		//	document.getElementById("rooms").options.add(new Option("4 Rooms", 80));

			document.getElementById("timeSpent").options.add(new Option("1 Hour", 20));
		if(remainingHoursDay> 5 )
				document.getElementById("timeSpent").options.add(new Option("2 Hours", 40));
		//if(remainingHoursDay> 7 )
		//		document.getElementById("timeSpent").options.add(new Option("4 Hours", 60));
		//if(remainingHoursDay> 9 )
		//		document.getElementById("timeSpent").options.add(new Option("8 Hours", 80));


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
				//console.log(state,isFirst, isFree);
				document.getElementById("questionArea").innerHTML += "<br> <button type='button' onclick='userAction()' > Choose Not to Take the Poll  </button>";
			}
	}

	document.getElementById("questionArea").style.display = "block";
	document.getElementById("next").style.display = "block";

	document.getElementById("moreQuestionButton").addEventListener("click", function(){
			addMoreQuestions();
	});
}
function drawMap()
{
	//map icons
	var libraryIcon = new Image();
	libraryIcon.src = '../img/map/libraryicon.png';
	var quadIcon = new Image();
	quadIcon.src = '../img/map/icon.png';
	var gymIcon = new Image();
	gymIcon.src = '../img/map/gymicon.png';
	var cafeIcon = new Image();
	cafeIcon.src = '../img/map/cafeicon.png';
	var labIcon = new Image();
	labIcon.src = '../img/map/labicon.png';
	var mediaIcon = new Image();
	mediaIcon.src =  '../img/map/mediaicon.png';

	//peopleicons
	var tuitionIcon = new Image();
	tuitionIcon.src = '../img/icons/tuitionsquare.png';
	var sportsIcon = new Image();
	sportsIcon.src = '../img/icons/sportscircle.png';
	var researchIcon = new Image();
	researchIcon.src = '../img/icons/researchsquare.png';
	var socialIcon = new Image();
	socialIcon.src = '../img/icons/socialsquare.png';
	var medicalIcon = new Image();
	medicalIcon.src = '../img/icons/medicalsquare.png';
    
    var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
    
    
	ctx.strokeStyle = '#00FFFF';
	ctx.fillStyle = 'rgba(0,255,255,0.5)';
	ctx.lineWidth = 3;
	
	//stroke areas for gym
	ctx.beginPath();
        ctx.moveTo(360,15);
        ctx.lineTo(585,15);
        ctx.lineTo(585,235);
        ctx.lineTo(485,235);
        ctx.lineTo(485,120);
        ctx.lineTo(360,120);
	ctx.closePath();
	ctx.stroke();
    
	//stroke labs
	ctx.beginPath();
	ctx.moveTo(150,15);
	ctx.lineTo(255,15);
	ctx.lineTo(255,135);
	ctx.lineTo(226,135);
	ctx.lineTo(226,165);
	ctx.lineTo(180,165);
	ctx.lineTo(180,135);
	ctx.lineTo(150,135);
	ctx.closePath();
	ctx.stroke();
    
	
	//quad
	ctx.strokeRect(135,190,170,56);
    
	//library
	ctx.strokeRect(400,275,188,124);
    
	//cafe
	ctx.strokeRect(5,40,113,216);
    
	//media
	ctx.strokeRect(90,275,117,122);
	
	//draw icon
	ctx.drawImage(quadIcon, 160,160,113,75)
	ctx.drawImage(libraryIcon, 435,270,113,75)
	ctx.drawImage(gymIcon, 475,50,113,75)
	ctx.drawImage(cafeIcon, 10,125,113,75)
	ctx.drawImage(mediaIcon, 90,280,113,75)
	ctx.drawImage(labIcon, 145,30,113,75)
}
 function doMousedown(c, e)
	{
		var mouse = canvasMouse;
		//check if the area is clickable
			//quad 		ctx.strokeRect(208,235,243,60);
			if((mouse.x >= 135 && mouse.x <= 300)&&(mouse.y >= 190 && mouse.y <= 250)){
                document.getElementById("location").value = 0;
			}
			
			//gym1
			if((mouse.x >= 360 && mouse.x <= 585)&&(mouse.y >= 15 && mouse.y <= 120)){
                document.getElementById("location").value = 2;
			}
			//gym2
			if((mouse.x >= 480 && mouse.x <=590 )&&(mouse.y >= 115 && mouse.y <= 235)){
                document.getElementById("location").value = 2;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 90 && mouse.x <= 205)&&(mouse.y >= 275 && mouse.y <= 395)){
                document.getElementById("location").value = 4;
			}
		
			//labs1
			if((mouse.x >= 150 && mouse.x <= 255)&&(mouse.y >= 15 && mouse.y <= 135)){
                document.getElementById("location").value = 3;
			}
			//labs2
			else if((mouse.x >= 180 && mouse.x <= 230)&&(mouse.y >= 225 && mouse.y <= 395)){
                document.getElementById("location").value = 3;
			}

			//coffee shop 
			if((mouse.x >= 5 && mouse.x <= 115)&&(mouse.y >= 40 && mouse.y <= 250)){
                document.getElementById("location").value = 1;
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 400 && mouse.x <= 590)&&(mouse.y >= 275 && mouse.y <= 400)){
                document.getElementById("location").value = 5;
			}
    }
 function doMousedownMain(c, e)
	{
		var mouse = canvasMouse;
		//check if the area is clickable
			//quad 		ctx.strokeRect(208,235,243,60);
			if((mouse.x >= 135 && mouse.x <= 300)&&(mouse.y >= 190 && mouse.y <= 250)){
                document.getElementById("QuadChoice").style = 'display:block';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:none';
			}
			
			//gym1
			if((mouse.x >= 360 && mouse.x <= 585)&&(mouse.y >= 15 && mouse.y <= 120)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:block';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:none';
			}
			//gym2
			if((mouse.x >= 480 && mouse.x <=590 )&&(mouse.y >= 115 && mouse.y <= 235)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:block';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:none';
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 90 && mouse.x <= 205)&&(mouse.y >= 275 && mouse.y <= 395)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:block';
			}
		
			//labs1
			if((mouse.x >= 150 && mouse.x <= 255)&&(mouse.y >= 15 && mouse.y <= 135)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:block';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:none';
			}
			//labs2
			else if((mouse.x >= 180 && mouse.x <= 230)&&(mouse.y >= 225 && mouse.y <= 395)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:block';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:none';
			}

			//coffee shop 
			if((mouse.x >= 5 && mouse.x <= 115)&&(mouse.y >= 40 && mouse.y <= 250)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CafeChoice").style = 'display:block';
                document.getElementById("MediaChoice").style = 'display:none';
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 400 && mouse.x <= 590)&&(mouse.y >= 275 && mouse.y <= 400)){
                document.getElementById("QuadChoice").style = 'display:none';
                document.getElementById("LibraryChoice").style = 'display:block';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CafeChoice").style = 'display:none';
                document.getElementById("MediaChoice").style = 'display:none';
			}
    }

	function doMouseOver(c, e){
	var c=document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
		var mouse = canvasMouse;
        //console.log(mouse);
		ctx.fillStyle = 'rgba(0,255,255,0.5)';
        var mapbackground = new Image();
        mapbackground.src = '../../img/map/map.png';
        ctx.drawImage(mapbackground, 0,0,450,250);
		//check if the area is clickable
			//quad 		ctx.strokeRect(208,235,243,60);
			if((mouse.x >= 135 && mouse.x <= 300)&&(mouse.y >= 190 && mouse.y <= 250)){
                strokeAreas();
                ctx.fillRect(135,190,170,56);
			}
			
			//gym1
			else if((mouse.x >= 360 && mouse.x <= 585)&&(mouse.y >= 15 && mouse.y <= 120)){
                
                strokeAreas();
                ctx.beginPath();
                ctx.moveTo(360,15);
                ctx.lineTo(585,15);
                ctx.lineTo(585,235);
                ctx.lineTo(485,235);
                ctx.lineTo(485,120);
                ctx.lineTo(360,120);
				ctx.closePath();
                ctx.fill();
			}
			//gym2
			else if((mouse.x >= 480 && mouse.x <= 590)&&(mouse.y >= 115 && mouse.y <= 235)){
                strokeAreas();
                ctx.beginPath();
                ctx.moveTo(360,15);
                ctx.lineTo(585,15);
                ctx.lineTo(585,235);
                ctx.lineTo(485,235);
                ctx.lineTo(485,120);
                ctx.lineTo(360,120);
				ctx.closePath();
                ctx.fill();
			}
			//media 		ctx.strokeRect(135,333,175,145);
			else if((mouse.x >= 90 && mouse.x <= 205)&&(mouse.y >= 275 && mouse.y <= 395)){
                
               strokeAreas();
                ctx.fillRect(90,275,117,122);
			}
		
			//labs1
			else if((mouse.x >= 145 && mouse.x <= 255)&&(mouse.y >= 15 && mouse.y <= 135)){
                
                strokeAreas();
					ctx.beginPath();
                    ctx.moveTo(150,15);
                    ctx.lineTo(255,15);
                    ctx.lineTo(255,135);
                    ctx.lineTo(226,135);
                    ctx.lineTo(226,165);
                    ctx.lineTo(180,165);
                    ctx.lineTo(180,135);
                    ctx.lineTo(150,135);
					ctx.closePath();
                    ctx.fill();
			}
			//labs2
			else if((mouse.x >= 180 && mouse.x <= 230)&&(mouse.y >= 135 && mouse.y <= 165)){
                
                strokeAreas();   
					ctx.beginPath();
                    ctx.moveTo(145,15);
                    ctx.lineTo(255,15);
                    ctx.lineTo(255,135);
                    ctx.lineTo(226,135);
                    ctx.lineTo(226,165);
                    ctx.lineTo(180,165);
                    ctx.lineTo(180,135);
                    ctx.lineTo(145,135);
					ctx.closePath();
                    ctx.fill();
			}

			//coffee shop 
			else if((mouse.x >= 5 && mouse.x <= 115)&&(mouse.y >= 40 && mouse.y <= 250)){
                
                strokeAreas();
                
                ctx.fillRect(5,40,113,216);
			}
			//library 	ctx.strokeRect(600,330,280,155);
			else if((mouse.x >= 400 && mouse.x <= 590)&&(mouse.y >= 255 && mouse.y <= 400)){
                
               strokeAreas();
                
                ctx.fillRect(400,275,188,124);
			}
            else
            {
                strokeAreas();
            }
    
            //map icons
            var libraryIcon = new Image();
            libraryIcon.src = '../img/map/libraryicon.png';
            var quadIcon = new Image();
            quadIcon.src = '../img/map/icon.png';
            var gymIcon = new Image();
            gymIcon.src = '../img/map/gymicon.png';
            var cafeIcon = new Image();
            cafeIcon.src = '../img/map/cafeicon.png';
            var labIcon = new Image();
            labIcon.src = '../img/map/labicon.png';
            var mediaIcon = new Image();
            mediaIcon.src =  '../img/map/mediaicon.png';
            
            //draw icon
            ctx.drawImage(quadIcon, 160,160,113,75)
            ctx.drawImage(libraryIcon, 435,270,113,75)
            ctx.drawImage(gymIcon, 475,50,113,75)
            ctx.drawImage(cafeIcon, 10,125,113,75)
            ctx.drawImage(mediaIcon, 90,280,113,75)
            ctx.drawImage(labIcon, 145,30,113,75)
	}
    function strokeAreas()
    {
        
        var c=document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
		var mouse = canvasMouse;
		ctx.fillStyle = 'rgba(0,255,255,0.5)';
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 3;
        var mapbackground = new Image();
        mapbackground.src = '../../img/map/mapMU600pxW.png';
        ctx.drawImage(mapbackground, 0,0,600,414);
        
        //stroke areas for gym
        ctx.beginPath();
        ctx.moveTo(360,15);
        ctx.lineTo(585,15);
        ctx.lineTo(585,235);
        ctx.lineTo(485,235);
        ctx.lineTo(485,120);
        ctx.lineTo(360,120);
        ctx.closePath();
        ctx.stroke();
        
        //stroke labs
        ctx.beginPath();
        ctx.moveTo(150,15);
        ctx.lineTo(255,15);
        ctx.lineTo(255,135);
        ctx.lineTo(226,135);
        ctx.lineTo(226,165);
        ctx.lineTo(180,165);
        ctx.lineTo(180,135);
        ctx.lineTo(150,135);
        ctx.closePath();
        ctx.stroke();
        
        
        //quad
        ctx.strokeRect(135,190,170,56);
        
        //library
        ctx.strokeRect(400,275,188,124);
        
        //cafe
        ctx.strokeRect(5,40,113,216);
        
        //media
        ctx.strokeRect(90,275,117,122);
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
	lastMinigame = id;
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";

	document.getElementById("event").innerHTML += "<div id = 'centerCanvas'><canvas id='myCanvas' width='880px' height = '500px' style = 'margin: 0 auto;'></canvas></div><br>";
	var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");


	c.addEventListener('mousemove', function(evt) {canvasMouse = getMousePos(c, evt);}, false);
	console.log(id);
	switch(id)
	{
		case 1:
		runningGame.main.init(c,ctx);
		break;
		case 2:
		runningGame2.main.init(c,ctx);
		break;
		case 3:
		secretSticker.main.init(c,ctx);
		break;
		case 4:
		runningGame4.main.init(c,ctx);
		break;
		case 5:
		tshirtCannon.main.init(c,ctx);
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
		case 3:
		secretSticker.main.init(c,ctx);
		break;
		case 4:
		runningGame4.main.init(c,ctx);
		break;
		case 5:
		tshirtCannon.main.init(c,ctx);
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
	prevChoices.innerHTML = "<div id = 'Buttons' style = 'display:block;'><div id = 'Header' style = 'display:block;'> </div></div><div id = 'QuadChoice' style = 'display:block;'></div><div id = 'LabChoice' style = 'display:none;'></div><div id = 'GymChoice' style = 'display:none;'></div><div id = 'MediaChoice' style = 'display:none;'></div><div id = 'CafeChoice' style = 'display:none;'> </div><div id = 'LibraryChoice' style = 'display:none;'></div><div id = 'map' style = 'display:block;'></div><div id = 'eventInput' style = 'display:block;'></div>";
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
  	if(gameOver)
    {
        gameSession++; 
        gameOver = false;
    }
    
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
    if(pollChoices.length < 3)
    {
        document.getElementById("holo").src = "../../img/holopadSize1.png";
    }
    else if(pollChoices.length >= 3 && pollChoices.length< 5)
    {
        document.getElementById("holo").src = "../../img/holopadSize2.png";
    }
    else{document.getElementById("holo").src = "../../img/holopadSize3.png";}
    
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
								if(parseFloat(tableArray2[8][h]).toFixed(2) >= 0.66)
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
								if(parseFloat(tableArray2[counter][h]).toFixed(2) >= 0.66)
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
	document.getElementById("gameInfo").innerHTML += "<div id = 'barChartDiv' style = 'display:block'></div>";
	document.getElementById("gameInfo").innerHTML += "<div id = 'pieChartDiv' style = 'display:none'></div>";
	document.getElementById("next").innerHTML += "<button id = 'dataButton' onclick = 'changeData(1)'>Show Data Table</button>";
	document.getElementById("next").innerHTML += "<button id = 'barButton' onclick = 'changeData(2)' style = 'display:none'>Show Bar Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'pieButton' onclick = 'changeData(3)'>Show Pie Graphs</button><br>";
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
	//graph dat table

	for (var i=0;i<graphQuestions.length;i++)
	{
	document.getElementById("barChartDiv").innerHTML += "<div id = 'q"+i+"text'><br></div><div class = 'barChart"+i+" chart'></div>";
    document.getElementById("pieChartDiv").innerHTML += "<div id = 'bq"+i+"text'><br></div><div class = 'pieChart"+i+"'></div>";
		if(i==2){
			document.getElementById("barChartDiv").innerHTML += "<hr>";
			document.getElementById("pieChartDiv").innerHTML += "<hr>";
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
				document.getElementById("bq"+i+"text").innerHTML = questions[0].question;
			break;
			case "issOpp":
				document.getElementById("q"+i+"text").innerHTML = questions[1].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[1].question;
			break;
			case "candFav":
				document.getElementById("q"+i+"text").innerHTML = questions[2].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[2].question;
			break;
			case "candOpp":
				document.getElementById("q"+i+"text").innerHTML = questions[3].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[3].question;
			break;
			case "major":
				document.getElementById("q"+i+"text").innerHTML = questions[4].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[4].question;
			break;
			case "class":
				document.getElementById("q"+i+"text").innerHTML = questions[5].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[5].question;
			break;
			case "group":
				document.getElementById("q"+i+"text").innerHTML = questions[6].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[6].question;
			break;
			case "fame":
				document.getElementById("q"+i+"text").innerHTML = questions[7].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[7].question;
			break;
			case "playTrust":
				document.getElementById("q"+i+"text").innerHTML = questions[8].question;
				document.getElementById("bq"+i+"text").innerHTML = questions[8].question;
			break;
			case "issuetuition":
				name = 	"Lowering Tuition";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issueathletic":
				name = 	"Increase Athletic Budget";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issueresearch":
				name = 	"Increase Research Budget";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issueevents":
				name = 	"More School Events";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			case "issuemedical":
				name = 	"Improve Medical Services";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = questions[9].question + " " + name;
			break;

			default:
			for(var k = 1;k<candidates.length;k++)
			{
				if(graphQuestions[i] == "candFame" + candidates[k].name)
				{
					name = candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = questions[10].question + " " + name;
					document.getElementById("bq"+i+"text").innerHTML = questions[10].question + " " + name;
				}
			}

			for(var k = 1;k<candidates.length;k++)
			{
				if(graphQuestions[i] == "candTrust" + candidates[k].name)
				{
					name = candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = questions[11].question + " " + name;
					document.getElementById("bq"+i+"text").innerHTML = questions[11].question + " " + name;
				}
			}
		}
		////console.log("Question "+graphQuestions[i] + " has a length of: " + graphData[i].length);
		////console.log(graphData[questionNum]);
        
        for (var j = 0; j < graphData[i].length; j++)
        {
			////console.log(graphData[questionNum], " AT ", questions[qID].question)					
			data2[j]=graphData[i][j];
		}
		var dataCounter = 0;
		x = d3.scaleLinear()
		.domain([0, d3.max(data2)])
		.range([0, 420]);

		d3.select(".barChart" + i)
		.selectAll("div")
		.data(data2)
		.enter().append("div")
		.style("width", function(d) { return x(d) + "px"; })
		.text(function(d) 
        {
			var zid = graphLabels[i][dataCounter] + "-" + d;
			////console.log(zid);
			dataCounter++;

			return zid; 
        });
        
        var dataset = 
        [
        ];
        for (var k = 0; k < graphData[i].length; k++)
        {			
            dataset.push ({label: graphLabels[i][k], count: graphData[i][k]})
		}
        console.log(dataset)
        var width = 120;
        var height = 120;
        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory20b);
        
        var vis = d3.select(".pieChart" + i)
        .append("svg:svg") 
        .data([dataset])
        .attr("width", width + 200) 
        .attr("height", height) 
        .append("svg:g") 
        .attr("transform", "translate(" + radius + "," + radius + ")") 
        
        var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
        
        var pie = d3.pie()
        .value(function(d) { return d.count; })
        //.sort(null);
        
        var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");
        
        arcs.append("svg:path")
        .attr("fill", function(d, i) { console.log("Arc - " + color(i)); return color(i); } )
        .attr("d", arc);
        
        arcs.append("svg:text")
        
        arcs.append("svg:text")
        .attr("dy", ".25em")
        //.attr("text-anchor", "middle")
        .attr("x", function(d, i) 
        {return width/2 + 30;})
        .attr("y", function(d, i) { return -50 + i*15; } )
        .style("fill", function(d, i) {  console.log(d);console.log("Text - " + color(i)); return color(i); } )
        .style("font", "bold 12px Arial")
        .text(function(d) { return d.data.label + "-" +d.data.count; });
        
        function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
        } 
	}
	document.getElementById('table').style.display = 'none';
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
		document.getElementById('event').innerHTML += "<button onclick = 'map("+1+",false,false)'>Back to Start</button>" ;
	}

}

function changeData(dataButton)
{
	if(dataButton == 1){
		document.getElementById('table').style.display = 'block';
		document.getElementById('filterArea').style.display = 'block';
		document.getElementById('pieChartDiv').style.display = 'none';
		document.getElementById('barChartDiv').style.display = 'none';
		document.getElementById('pieButton').style.display = 'inline';
		document.getElementById('barButton').style.display = 'inline';
		document.getElementById('dataButton').style.display = 'none';
	}
	else if (dataButton == 2)
    {
		document.getElementById('table').style.display = 'none';
		document.getElementById('filterArea').style.display = 'none';
		document.getElementById('pieChartDiv').style.display = 'none';
		document.getElementById('barChartDiv').style.display = 'block';
		document.getElementById('pieButton').style.display = 'inline';
		document.getElementById('barButton').style.display = 'none';
		document.getElementById('dataButton').style.display = 'inline';
	}
	else if (dataButton == 3)
    {
		document.getElementById('table').style.display = 'none';
		document.getElementById('filterArea').style.display = 'none';
		document.getElementById('pieChartDiv').style.display = 'block';
		document.getElementById('barChartDiv').style.display = 'none';
		document.getElementById('pieButton').style.display = 'none';
		document.getElementById('barButton').style.display = 'inline';
		document.getElementById('dataButton').style.display = 'inline';
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
    
	//Save GameSession
	textContents+=gameSession;
	textContents+="~";
    
	//Save GameOver
	textContents+=gameOver.toString();
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
    
	//Game Session Number
	gameSession = parseInt(saveArray[9]);
    console.log(saveArray)
    
	//Game Over Boolean
	if(saveArray[10] == "true")
    {
        gameOver = true;
    }
    else
    {
        gameOver = false;
    }
	
	back=true;
	saveState = "";
	hourChecker();

}

function getSession(gameOver)
{
	//Takes the Whole data and splits it into sections
	var saveArray = saveState.split("~");
	if(!gameOver){
    	console.log(saveArray[9] == "NaN")
    	if(saveArray[9] !=[] && saveArray[9] != "NaN")
    	{
        	gameSession = parseInt(saveArray[9]) + 1;
        	gameOver = false;
        	endReset = false;
    	}
    	else
    	{
        	gameSession = 0;
        	gameOver = false;
        	endReset = false;
    	}
	}
    
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
	var scoreToLog = scores.score;

	if(!tutorial)
	{
		remainingHoursTotal-=1;
		remainingHoursDay-=1;
		var pos = chosenEvent.groupPos.split(',');
		//console.log(pos);
		var posText =  "<h4>You completed the minigame with a score of "+scores.score+" <br>Which will increase your fame with these groups: ";
		for (var i =0; i< pos.length;i++){
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
     	$.post('/game/loggerMinigame', {minigameID: lastMinigame, score: scoreToLog});
			document.getElementById("next").innerHTML += "<button onclick = 'hourChecker()'> Return to the User Action Area </button>";
	}
	else
	{
		var posText =  "<h4>You completed the minigame with a score of "+ (scores.score) + ".</h4>"; 
		document.getElementById("event").innerHTML = posText;
		document.getElementById("next").innerHTML += "<button onclick = 'startPractice()'> Return to the Practice Screen </button>";
	}
	document.getElementById("next").style.display = "block";
}

function trendReporter(category)
{
    
    document.getElementById('buttonViewer').style = 'display:block';
    document.getElementById('visualisation').innerHTML = "";
    
    var data0 = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var data5 = [];
    var data6 = [];
    var answers = [];
    var tempGraphData = [];
    
    //for(var i =0; i< pastPollChoices.length;i++)
    //{
    //        data0.push(
    //        {
    //            count: null,
    //            poll: i
    //        });
    //}
    for(var i =0; i< pastPollChoices.length;i++)
    {
        tempGraphData = [];
        pastGraphData[i].forEach(function(e)
        {
            tempGraphData.push(e);
        });
        //console.log(tempGraphData);
        tempGraphData.splice(0,3);
        for(var j =0; j< pastPollChoices[i].length; j++)
        {
            if(category == pastPollChoices[i][j])
            {
                questions.forEach( function(element)
                {
                    if(element.value == category)
                    {
                        answers = element.labels.split(", ")
                        if(element.value == "candFav" ||element.value == "candOpp")
                        {
                            answers = [];
                            candidates.forEach(function(element2)
                            {
                            answers.push(element2.name);
                            });
                        }
                    }
                    else if(element.value == category.substring(0,5))
                    {
                        answers = element.labels.split(", ")
                    }
                });
                
                //console.log(tempGraphData);
                for (var k =0; k< tempGraphData[j].length; k++)
                {
                    switch(k)
                    {
                        case 0:
                        data0.push(
                        {
                            count: tempGraphData[j][k],
                            poll: i,
                            key: answers[k]
                        });
                        //data0.splice(i,1,
                        //{
                        //    count: pastGraphData[i][j][k],
                        //    poll: i
                        //});
                        break;
                        case 1:
                        data1.push(
                        {
                            count: pastGraphData[i][j][k],
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 2:
                        data2.push(
                        {
                            count: pastGraphData[i][j][k],
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 3:
                        data3.push(
                        {
                            count: pastGraphData[i][j][k],
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 4:
                        data4.push(
                        {
                            count: pastGraphData[i][j][k],
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 5:
                        data5.push(
                        {
                            count: pastGraphData[i][j][k],
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 6:
                        data6.push(
                        {
                            count: pastGraphData[i][j][k],
                            poll: i,
                            key: answers[k]
                        });
                        break;
                    }
                }
            }
        
        }
    }
    var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width2 = 800 - margin.left - margin.right,
    height2 = 450 - margin.top - margin.bottom;
    
    var legendSpace = width2/7;
    
    var vis = d3.select("#visualisation"),
    WIDTH = 800,
    HEIGHT = 350,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
    xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 15]),
    yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 50]),
    
    xAxis = d3.axisBottom()
    .scale(xScale),
    yAxis = d3.axisLeft()
    .scale(yScale)
                    
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);
        
    var lineGen = d3.line()
        .x(function(d) {
            return xScale(d.poll);
        })
        .y(function(d) {
            return yScale(d.count);
        })
        .defined(function (d) { return d[1] !== null; });
        //.defined(function (d) { return d.count == null; });
        
    var line = d3.line()
        .x(function(d) {
            return xScale(d.poll);
        })
        .y(function(d) {
            return yScale(d.count);
        })
        //.defined(function (d) { return d[1] !== null; });
        .defined(function (d) { return d.count == null; });
        
        if(data0 !=[])
        {
            vis.append('svg:path')
                .attr('d', lineGen(data0))
                .attr('stroke', 'green')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
                
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 30) // spacing
            .attr("y", height2 + 30)
            .attr("class", "legend")    // style the legend
            .style("fill", 'green')
            .text(data0[0].key);
            
            //var filteredData0 = data0.filter(lineGen.defined());
            //vis.append('svg:path')
            //    .attr('d', line(filteredData0))
            //    .attr('stroke', 'black')
            //    .style("stroke-dasharray", ("3, 3"))
            //    .attr('stroke-width', 2)
            //    .attr('fill', 'none');
        }
        if(data1 != [])
        {
            vis.append('svg:path')
                .attr('d', lineGen(data1))
                .attr('stroke', 'violet')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
                
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 30) // spacing
            .attr("y", height2 + 60)
            .attr("class", "legend")    // style the legend
            .style("fill", 'violet')
            .text(data1[0].key);
        }
        if(data2 != [])
        {
            vis.append('svg:path')
                .attr('d', lineGen(data2))
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 30) // spacing
            .attr("y", height2 + 90)
            .attr("class", "legend")    // style the legend
            .style("fill", 'blue')
            .text(data2[0].key);
        }
        if(data3 != [])
        {
            vis.append('svg:path')
                .attr('d', lineGen(data3))
                .attr('stroke', 'red')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 180) // spacing
            .attr("y", height2 + 30)
            .attr("class", "legend")    // style the legend
            .style("fill", 'red')
            .text(data3[0].key);
        }
        if(data4 != [])
        {
            vis.append('svg:path')
                .attr('d', lineGen(data4))
                .attr('stroke', 'orange')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 180) // spacing
            .attr("y", height2 + 60)
            .attr("class", "legend")    // style the legend
            .style("fill", 'orange')
            .text(data4[0].key);
        }
        //console.log(data5)
        if(data5.length != 0)
        {
            vis.append('svg:path')
                .attr('d', lineGen(data5))
                .attr('stroke', 'purple')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 180) // spacing
            .attr("y", height2 + 90)
            .attr("class", "legend")    // style the legend
            .style("fill", 'purple')
            .text(data5[0].key);
        }
        if(data6.length != 0)
        {
            vis.append('svg:path')
                .attr('d', lineGen(data6))
                .attr('stroke', 'yellow')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            // Add the Legend
            vis.append("svg:text")
            .attr("x", 330) // spacing
            .attr("y", height2 + 30)
            .attr("class", "legend")    // style the legend
            .style("fill", 'yellow')
            .text(data6[0].key);
        }
        
    
    document.getElementById('buttonViewer').onclick = function() 
    {
        document.getElementById('buttonViewer').style = 'display:none';
        document.getElementById('reportButtons').style = 'display:block';
        document.getElementById('trendArea').style = 'display:none';
    };
    document.getElementById('trendArea').style = 'display:block';
    document.getElementById('reportButtons').style = 'display:none';
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
var secretSticker = {};
var runningGame4 = {};
var tshirtCannon = {};

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
		tier1: 2,
		tier2: 4,
		tier3: 6,
		tier4: 8
	},
	buildingHover: [false,false,false,false,false,false],


	//area numbers (0-Map, 1-6 map locations clockwise, 7 victory screen?)	
	stop: false,

	init: function(c,ctx){
		ctx.restore;
		ctx.save;
		runningGame2.main.stop = false;

		//map icons
		libraryIcon = new Image();
		libraryIcon.src = '../img/map/libraryicon.png';
		quadIcon = new Image();
		quadIcon.src = '../img/map/icon.png';
		gymIcon = new Image();
		gymIcon.src = '../img/map/gymicon.png';
		cafeIcon = new Image();
		cafeIcon.src = '../img/map/cafeicon.png';
		labIcon = new Image();
		labIcon.src = '../img/map/labicon.png';
		mediaIcon = new Image();
		mediaIcon.src =  '../img/map/mediaicon.png';

		//peopleicons
		tuitionIcon = new Image();
		tuitionIcon.src = '../img/icons/tuitionsquare.png';
		sportsIcon = new Image();
		sportsIcon.src = '../img/icons/sportscircle.png';
		researchIcon = new Image();
		researchIcon.src = '../img/icons/researchsquare.png';
		socialIcon = new Image();
		socialIcon.src = '../img/icons/socialsquare.png';
		medicalIcon = new Image();
		medicalIcon.src = '../img/icons/medicalsquare.png';




		//get people assets
		hoverPeace1 = new Image();
		hoverPeace1.src = "../img/minigame2/hover1peace.png";
		hoverPeace2 = new Image();
		hoverPeace2.src = '../img/minigame2/hover2peace.png';
		hoverStrong = new Image();
		hoverStrong.src = '../img/minigame2/hoverstrong.png';
		thinPeace1 = new Image();
		thinPeace1.src = '../img/minigame2/thinpeace1.png'
		thinPeace2 = new Image();
		thinPeace2.src = '../img/minigame2/thinpeace2.png'
		thinStrong = new Image();
		thinStrong.src = '../img/minigame2/thinstrong.png'
		medPeace1 = new Image();
		medPeace1.src = '../img/minigame2/medpeace.png';
		medPeace2 = new Image();
		medPeace2.src = '../img/minigame2/medpeace2.png';
		medStrong = new Image();
		medStrong.src = '../img/minigame2/medstrong.png';
		plusPeace1 = new Image();
		plusPeace1.src = '../img/minigame2/pluspeace1.png';
		plusPeace2 = new Image();
		plusPeace2.src = '../img/minigame2/pluspeace2.png';
		plusStrong = new Image();
		plusStrong.src = '../img/minigame2/plusstrong.png';

		imgBArray = [[thinPeace1, thinPeace2, thinStrong], [medPeace1, medPeace2, medStrong], [plusPeace1, plusPeace2, plusStrong], [hoverPeace1, hoverPeace2, hoverStrong]]

		mapbackground = new Image();
		mapbackground.src = '../img/map/map.png';




		//now init
		runningGame2.main.gameStop = false;
		runningGame2.main.player.picturenum = 0;
		runningGame2.main.scores.score = 0;	
		runningGame2.main.areaNumber = -1;	
		c.onmousedown = runningGame2.main.doMousedown;
		c.onmousemove = runningGame2.main.doMouseOver;
		ctx.font="14px Georgia";
		runningGame2.main.requiredDemograph1 = Math.floor(Math.random() * 6) + 2;
		runningGame2.main.requiredDemograph1 = Math.floor(Math.random() * 3) + 2;
		runningGame2.main.demograph1num = Math.floor(Math.random() * 5);
		runningGame2.main.demograph2num = Math.floor(Math.random() * 5);
		runningGame2.main.takenDemograph1=0;
		runningGame2.main.takenDemograph2=0;
	
		mapbackground.onload = function(){
			runningGame2.main.update(c,ctx);
		}
	},

	update: function (c,ctx)
	{
		
		if(!runningGame2.main.stop)
		{
			requestAnimationFrame(function(){runningGame2.main.update(c,ctx)});
     		requestAnimationFrame(function(){runningGame2.main.draw(c,ctx)});
	
			//double check player photos = the amount they need
				//end game
			if(runningGame2.main.player.picturenum > 2){
				//console.log('hi', runningGame2.main.scores.score, practice);
				runningGame2.main.stopGame();
			}

			else{
			//generate information for the map area
			if(runningGame2.main.areaNumber > 0 && runningGame2.main.areaNumber < 9 && !(runningGame2.main.picturetaken)){
			 			var hold = 0;	
			 	if(!runningGame2.main.inArea){
			 	createSample((Math.floor(Math.random() * 3) + 5), runningGame2.main.areaNumber)
				runningGame2.main.studentCircles = [];
	
				sample.forEach(function(element) {
					var studentCircleHolder = {
						isDemographic: false,
						interest: Math.floor(Math.random() * 5),
						typenum: Math.floor(Math.random() * 4),
						posenum: Math.floor(Math.random() * 3),
						headnum: Math.floor(Math.random() * 3),
						x:  Math.floor(Math.random() * 99) + (110 * hold),
   					y:  Math.floor(Math.random() * 250) + 50
					}
					hold++;
   				if(studentCircleHolder.interest == runningGame2.main.demograph1num){
   						studentCircleHolder.isDemographic = true;   					
   					}
   					
   						runningGame2.main.studentCircles.push(studentCircleHolder)
   					
				});
				runningGame2.main.inArea = true;
				}
				
			}
			else if(runningGame2.main.picturetaken){
			
				runningGame2.main.picturetaken = false;
				runningGame2.main.inArea = false;
				runningGame2.main.areaNumber = 0;
			}
		}			
		}
		
	},

	stopGame: function ()
	{
		runningGame2.main.stop=true;
		gameResults(runningGame2.main.scores, practice);
	},

	draw: function(c,ctx)
	{
		//draw the background for the area

		if(!runningGame2.main.inArea && runningGame2.main.areaNumber>=0)
		{
			ctx.drawImage(mapbackground, 0,0,900,500);
		}
		else{
				ctx.fillStyle = '#FFFFFF';
				ctx.fillRect(0,0,900, 500)
			
		}
		//draw anything specific ontop of the background layer depending on what area you are
		if(runningGame2.main.areaNumber >= 0){
			if(runningGame2.main.areaNumber == 0){
					//quad
					ctx.strokeStyle = '#00FFFF';
					ctx.fillStyle = 'rgba(0,255,255,0.5)';
					ctx.lineWidth = 3;
			
					//stroke areas for gym
					ctx.beginPath();
					ctx.moveTo(530,20);
					ctx.lineTo(530,150);
					ctx.lineTo(725,150);
					ctx.lineTo(725,300);
					ctx.lineTo(880,300);
					ctx.lineTo(880,20);
					ctx.closePath();
					ctx.stroke();
					if(runningGame2.main.buildingHover[1]){
						ctx.fill();
					}
					//stroke labs
					ctx.beginPath();
					ctx.moveTo(225,20);
					ctx.lineTo(225,170);
					ctx.lineTo(275,170);
					ctx.lineTo(275,200);
					ctx.lineTo(340,200);
					ctx.lineTo(340,170);
					ctx.lineTo(383,170);
					ctx.lineTo(383,20);
					ctx.closePath();
					ctx.stroke();
					if(runningGame2.main.buildingHover[3]){
						ctx.fill();
					}
		
					//quad
					ctx.strokeRect(208,235,243,60);
					if(runningGame2.main.buildingHover[0]){
						ctx.fillRect(208,235,243,60);
					}
					//library
					ctx.strokeRect(600,330,280,155);
					if(runningGame2.main.buildingHover[5]){
						ctx.fillRect(600,330,280,155);
					}
					//cafe
					ctx.strokeRect(13,43,165,260);
					if(runningGame2.main.buildingHover[4]){
						ctx.fillRect(13,43,165,260);
					}
					//media
					ctx.strokeRect(135,333,175,145);
					if(runningGame2.main.buildingHover[2]){
						ctx.fillRect(135,333,175,145);
					}
					//labs
		
					//draw icon
					ctx.drawImage(quadIcon, 255,190,150,100)
					ctx.drawImage(libraryIcon, 665,325,150,100)
					ctx.drawImage(gymIcon, 725,50,150,100)
					ctx.drawImage(cafeIcon, 20,110,150,100)
					ctx.drawImage(mediaIcon, 150,335,150,100)
					ctx.drawImage(labIcon, 230,25,150,100)
				}
				if(runningGame2.main.areaNumber>0){
					
					//draw the students
		
					runningGame2.main.drawStudents(c,ctx,runningGame2.main.studentCircles)
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
					var scoreText = runningGame2.main.takenDemograph1 + '/'+ runningGame2.main.requiredDemograph1 + " " + positions[runningGame2.main.demograph1num];
					var photosLeftText = runningGame2.main.player.picturenum + '/3 Photos Left'
					ctx.fillText(scoreText, 700,10);
					ctx.fillText(photosLeftText, 100,10);
		}
		else if (runningGame2.main.areaNumber == -1){
			ctx.fillStyle = '#000000'
			ctx.fillText('INSTRUCTION PAGE', 100,100)
			ctx.fillRect(400,440,100,100);
		}
	},

	drawStudents: function(c,ctx, students){
		hoverArray = [[224,477],[287,467],[257,466]];
		thinArray = [[184,518], [217,531], [259,469]];
		medArray = [[266,493], [224,495], [285, 492]]
		plusArray = [[277,463], [311,475], [322,463]]
		sizeArray = [thinArray, medArray, plusArray, hoverArray]
		widthArray = [ [[60,150],[70,160],[70,120]], [[80,140],[80,140],[80,140]],[[100,140],[100,140],[100,140]],[[80,140],[80,140],[80,140]]]		
		
		//icons
		iconArray = [tuitionIcon, sportsIcon, researchIcon, socialIcon, medicalIcon];

		students.forEach(function(e){
			//draw student	
			ctx.drawImage(imgBArray[e.typenum][e.posenum], sizeArray[e.typenum][e.posenum][0] * e.headnum, 0,sizeArray[e.typenum][e.posenum][0],sizeArray[e.typenum][e.posenum][1],e.x,e.y,widthArray[e.typenum][e.posenum][0],widthArray[e.typenum][e.posenum][1]);
			//draw head
			ctx.drawImage(iconArray[e.interest], e.x + 25, e.y-30, 40,40)
		})
	

	},

	doMousedown: function(c, e)
	{ 
		//console.log(canvasMouse);
		var mouse = canvasMouse;
		var update = false

		//check if the area is clickable
		if(runningGame2.main.areaNumber == 0){
			//quad 		ctx.strokeRect(208,235,243,60);
			if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
				runningGame2.main.areaNumber = 1;
				update = true;
			}
			
			//gym1
			if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
				runningGame2.main.areaNumber = 2;
				update = true;
			}
			//gym2
			if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
				runningGame2.main.areaNumber = 2;
				update = true;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
				runningGame2.main.areaNumber = 3;
				update = true;
			}
		
			//labs1
			if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
				runningGame2.main.areaNumber = 4;
				update = true;
			}
			//labs2
			else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
				runningGame2.main.areaNumber = 4;
				update = true;
			}
		

			//coffee shop 
			if((mouse.x >= 13 && mouse.x <= 178)&&(mouse.y >= 43 && mouse.y <= 303)){
				runningGame2.main.areaNumber = 5;
				update = true;
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
				runningGame2.main.areaNumber = 6;
				update = true;
			}
		}
		else if(runningGame2.main.areaNumber > 0 && runningGame2.main.areaNumber < 9 ){
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
		
					if (element.isDemographic){						
						runningGame2.main.takenDemograph1++;
						runningGame2.main.scores.score++;				
					}
				
					
				});
			}
		}
		else if(runningGame2.main.areaNumber == -1){
			runningGame2.main.areaNumber++;
		}

	
		
		//if not a clickable area do nothing
	},

	doMouseOver: function(c, e){
		var mouse = canvasMouse;
				//check if the area is clickable
		if(runningGame2.main.areaNumber == 0){
			runningGame2.main.buildingHover = [false,false,false,false,false,false];
			if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
				runningGame2.main.buildingHover[0] = true;
			}
			if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
				runningGame2.main.buildingHover[1] = true;
			}
			//gym2
			else if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
				runningGame2.main.buildingHover[1] = true;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
				runningGame2.main.buildingHover[2] = true;
			}
		
			//labs1
			if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
				runningGame2.main.buildingHover[3] = true;
			}
			//labs2
			else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
				runningGame2.main.buildingHover[3] = true;
			}
			//coffee shop 
			if((mouse.x >= 13 && mouse.x <= 178)&&(mouse.y >= 43 && mouse.y <= 303)){
				runningGame2.main.buildingHover[4] = true;
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
				runningGame2.main.buildingHover[5] = true;
			}
		}
	},
}

	/*Secret Sticker*/
secretSticker.main = 
    {
        player:
        {
            picturenum:0,
            pictures:[],
    
        },
        requiredDemograph1: 0,
        takenDemograph1:0,
        demograph1num:0,
        areaNumber: 9,
        inArea:false,
        postersLeft: 5,
        drag: false,
        placeStudents: false,
        scores: {
            score:0,
            tier1: 1,
            tier2: 3,
            tier3: 5,
            tier4: 7
        },
        areas:
        [ 
            {
                
            },
            
            //quad
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //gym
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //media
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //labs
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //coffee shop
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //library
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            }
        ],
        buildingHover: [false,false,false,false,false,false],
        //area numbers (0-Map, 1-6 map locations clockwise, 7 victory screen?)
        init: function(c,ctx)
        {
            ctx.restore;
            ctx.save;
            secretSticker.main.gameStop = false;
            
            //map icons
            libraryIcon = new Image();
            libraryIcon.src = '../img/map/libraryicon.png';
            quadIcon = new Image();
            quadIcon.src = '../img/map/icon.png';
            gymIcon = new Image();
            gymIcon.src = '../img/map/gymicon.png';
            cafeIcon = new Image();
            cafeIcon.src = '../img/map/cafeicon.png';
            labIcon = new Image();
            labIcon.src = '../img/map/labicon.png';
            mediaIcon = new Image();
            mediaIcon.src =  '../img/map/mediaicon.png';
    
            //peopleicons
            tuitionIcon = new Image();
            tuitionIcon.src = '../img/icons/tuitionsquare.png';
            sportsIcon = new Image();
            sportsIcon.src = '../img/icons/sportscircle.png';
            researchIcon = new Image();
            researchIcon.src = '../img/icons/researchsquare.png';
            socialIcon = new Image();
            socialIcon.src = '../img/icons/socialsquare.png';
            medicalIcon = new Image();
            medicalIcon.src = '../img/icons/medicalsquare.png';
            
            mapbackground = new Image();
            mapbackground.src = '../img/map/map.png';
            
            secretSticker.main.player.picturenum = 0;
            secretSticker.main.scores.score = 0;	
            secretSticker.main.areaNumber = 9;	
            c.onmousedown = secretSticker.main.doMousedown;
            c.onmousemove = secretSticker.main.doMouseOver;
            c.onmouseup = secretSticker.main.doMouseUp
            ctx.font="14px Georgia";
            secretSticker.main.requiredDemograph1 = Math.floor(Math.random() * 6) + 2;
            secretSticker.main.requiredDemograph1 = Math.floor(Math.random() * 3) + 2;
            secretSticker.main.demograph1num = Math.floor(Math.random() * 5);
            secretSticker.main.takenDemograph1=0;
            secretSticker.main.postersLeft=5;
            secretSticker.main.areas =
            [ 
                {
                    
                },
                
                //quad
                {
                    students: [],
                    studentPositions: [],
                    posterHung: 0,
                    position1: false, 
                    position2: false, 
                    position3: false 
                },
                //gym
                {
                    students: [],
                    studentPositions: [],
                    posterHung: 0,
                    position1: false, 
                    position2: false, 
                    position3: false 
                },
                //media
                {
                    students: [],
                    studentPositions: [],
                    posterHung: 0,
                    position1: false, 
                    position2: false, 
                    position3: false 
                },
                //labs
                {
                    students: [],
                    studentPositions: [],
                    posterHung: 0,
                    position1: false, 
                    position2: false, 
                    position3: false 
                },
                //coffee shop
                {
                    students: [],
                    studentPositions: [],
                    posterHung: 0,
                    position1: false, 
                    position2: false, 
                    position3: false 
                },
                //library
                {
                    students: [],
                    studentPositions: [],
                    posterHung: 0,
                    position1: false, 
                    position2: false, 
                    position3: false 
                }
            ];
            mapbackground.onload = function()
            {
                secretSticker.main.update(c,ctx);
            }
        },
    
        update: function (c,ctx)
        {
            
            if(secretSticker.main.postersLeft > 0)
            {
                requestAnimationFrame(function(){secretSticker.main.update(c,ctx)});
                requestAnimationFrame(function(){secretSticker.main.draw(c,ctx)});
            }
            else if(secretSticker.main.areaNumber != 0)
            {
                requestAnimationFrame(function(){secretSticker.main.update(c,ctx)});
                requestAnimationFrame(function(){secretSticker.main.draw(c,ctx)});
            }
            else
            {
                if(secretSticker.main.takenDemograph1 >= secretSticker.main.demograph1num)
                    secretSticker.main.score++;
                gameResults(secretSticker.main.scores, practice);
            }
        },

        draw: function(c,ctx)
        {
            var mouse = canvasMouse;
            var poster = new Image();
            poster.src = '../../img/minigame3/VotePosterProp.png';
            var sticker = new Image();
            sticker.src = '../../img/minigame3/Stickerasset.png';
            //BackGrounds
            var LibWall = new Image();
            LibWall.src = '../../img/minigame3/Librarywallbg.png';
            var QuadWall = new Image();
            QuadWall.src = '../../img/minigame3/posterwallbg.png';
            var GymWall = new Image();
            GymWall.src = '../../img/minigame3/WallforGymBG.png';
            var MediaWall = new Image();
            MediaWall.src = '../../img/minigame3/WallforMediaRoomBG.png';
            
            //draw the background for the area
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0,0,c.width,c.height);
            //draw anything specific ontop of the background layer depending on what area you are
            //draw the background for the area

            if(!secretSticker.main.inArea && secretSticker.main.areaNumber>=0 &&secretSticker.main.areaNumber<9)
            {
                ctx.drawImage(mapbackground, 0,0,900,500);
            }
            else{
                switch(secretSticker.main.areaNumber)
                {
                    case 1:
                    ctx.drawImage(QuadWall, 0,0,900,500);
                    break;
                    case 2:
                    ctx.drawImage(GymWall, 0,0,900,500);
                    break;
                    case 3:
                    ctx.drawImage(MediaWall, 0,0,900,500);
                    break;
                    case 4:
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0,0,900, 500)
                    //ctx.drawImage(mapbackground, 0,0,900,500);
                    break;
                    case 5:
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0,0,900, 500)
                    //ctx.drawImage(mapbackground, 0,0,900,500);
                    break;
                    case 6:
                    ctx.drawImage(LibWall, 0,0,900,500);
                    break;
                    default:
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0,0,900, 500)
                    break;
                }
                
            }
            //draw anything specific ontop of the background layer depending on what area you are
            if(secretSticker.main.areaNumber == 0)
            {
                //quad
                ctx.strokeStyle = '#00FFFF';
                ctx.fillStyle = 'rgba(0,255,255,0.5)';
                ctx.lineWidth = 3;
            
                //stroke areas for gym
                ctx.beginPath();
                ctx.moveTo(530,20);
                ctx.lineTo(530,150);
                ctx.lineTo(725,150);
                ctx.lineTo(725,300);
                ctx.lineTo(880,300);
                ctx.lineTo(880,20);
                ctx.closePath();
                ctx.stroke();
                if(secretSticker.main.buildingHover[1]){
                    ctx.fill();
                }
                //stroke labs
                ctx.beginPath();
                ctx.moveTo(225,20);
                ctx.lineTo(225,170);
                ctx.lineTo(275,170);
                ctx.lineTo(275,200);
                ctx.lineTo(340,200);
                ctx.lineTo(340,170);
                ctx.lineTo(383,170);
                ctx.lineTo(383,20);
                ctx.closePath();
                ctx.stroke();
                if(secretSticker.main.buildingHover[3]){
                    ctx.fill();
                }
            
                //quad
                ctx.strokeRect(208,235,243,60);
                if(secretSticker.main.buildingHover[0]){
                    ctx.fillRect(208,235,243,60);
                }
                //library
                ctx.strokeRect(600,330,280,155);
                if(secretSticker.main.buildingHover[5]){
                    ctx.fillRect(600,330,280,155);
                }
                //cafe
                ctx.strokeRect(13,43,165,260);
                if(secretSticker.main.buildingHover[4]){
                    ctx.fillRect(13,43,165,260);
                }
                //media
                ctx.strokeRect(135,333,175,145);
                if(secretSticker.main.buildingHover[2]){
                    ctx.fillRect(135,333,175,145);
                }
                //labs
            
                //draw icon
                ctx.drawImage(quadIcon, 255,190,150,100)
                ctx.drawImage(libraryIcon, 665,325,150,100)
                ctx.drawImage(gymIcon, 725,50,150,100)
                ctx.drawImage(cafeIcon, 20,110,150,100)
                ctx.drawImage(mediaIcon, 150,335,150,100)
                ctx.drawImage(labIcon, 230,25,150,100)
		}
           
           if(secretSticker.main.areaNumber >0 && secretSticker.main.areaNumber <9  ){
               
               if(secretSticker.main.placeStudents)
               {
                  secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions =[]; 
                   secretSticker.main.areas[secretSticker.main.areaNumber].students.forEach(function(element) 
                   {
                       secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions.push
                       (
                           {
                               x: Math.floor(Math.random() * 600) + 100,
                               y: Math.floor(Math.random() * 250) +150,
                               stickered: false
                           }
                       );
                   });
                  secretSticker.main.placeStudents = false;
               }
               
               //draw the students
               for(var i =0; i<secretSticker.main.areas[secretSticker.main.areaNumber].students.length;i++)
               {
                   var x = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].x;
                   var y = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].y;
                   ctx.fillStyle = secretSticker.main.areas[secretSticker.main.areaNumber].students[i].color;
                   ctx.beginPath();
                   ctx.arc(x,y,30,0,2*Math.PI);
                   ctx.fill();
                   ctx.stroke();
                   
                   if(secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].stickered)
                   {
                       //ctx.fillStyle = '#0000ff';
                       //ctx.beginPath();
                       //ctx.arc(x,y,20,0,2*Math.PI);
                       //ctx.fill();
                       //ctx.stroke();
                        ctx.drawImage(sticker,x-25, y-25,50,50);
                   }
               };
              
               
               
    
               //draw the ux/ui of the game
               ctx.fillStyle = '#EEEEEE'
               ctx.fillRect(0,440,c.width,100);
               ctx.fillStyle = '#AAAAAA'
               ctx.fillRect(0,440,100,50);
               ctx.fillStyle = '#000000'
               ctx.fillText("Back",0,460);
               
               ctx.fillStyle = '#AAAAAA'
               ctx.fillRect(0,250,25,25);
               ctx.fillStyle = '#000000'
               ctx.fillText("<",10,265);
               
               ctx.fillStyle = '#AAAAAA'
               ctx.fillRect(875,250,25,25);
               ctx.fillStyle = '#000000'
               ctx.fillText(">",885,265);
               
               //ctx.fillStyle = '#0000FF';
               //ctx.beginPath();
               //ctx.arc(c.width/2,c.height-30,20,0,2*Math.PI);
               //ctx.fill();
               //ctx.stroke();
               
               
               ctx.drawImage(sticker,c.width/2-30,c.height-50,50,50);
               if(secretSticker.main.drag)
               {
                   //ctx.fillStyle = '#0000FF';
                   //ctx.beginPath();
                   //ctx.arc(mouse.x, mouse.y,20,0,2*Math.PI);
                   //ctx.fill();
                   //ctx.stroke();
                   ctx.drawImage(sticker,mouse.x-25, mouse.y-25,50,50);
               }
    
    
               if (!secretSticker.main.areas[secretSticker.main.areaNumber].position1)
               {
                   ctx.fillStyle = '#000000 '
                   ctx.fillRect(200,30,50,70);
               }
               else
               {
                   ctx.fillStyle = '#00ff00'
                   ctx.drawImage(poster,200,30,75,125);
               }
               
               if (!secretSticker.main.areas[secretSticker.main.areaNumber].position2)
               {
                   ctx.fillStyle = '#000000 '
                   ctx.fillRect(440,30,50,70);
               }
               else
               {
                   ctx.fillStyle = '#00ff00'
                   ctx.drawImage(poster,440,30,75,125);
               }
               
               if (!secretSticker.main.areas[secretSticker.main.areaNumber].position3)
               {
                   ctx.fillStyle = '#000000 '
                   ctx.fillRect(680,30,50,70);
               }
               else
               {
                   ctx.fillStyle = '#00ff00'
                   ctx.drawImage(poster,680,30,75,125);
               }
           }
    
           if(secretSticker.main.areaNumber == 9)
           {
               
               ctx.fillStyle = '#000000'
               ctx.fillText("Your goal is to attract the demographic shown in the top right and place a sticker on them.",100,80);
               ctx.fillText("You have 5 posters and you have to target the correct sample of the population.",100,100);
               ctx.fillText("Place posters in an area to attract people to them.",100,120);
               ctx.fillText("The more posters you place the more people you attract.",100,140);
               ctx.fillText("Once they're around drag a sticker onto them to score.",100,160);
               ctx.fillText("If you return to the quad with no posters, you pack it in for the day. ",100,180);
               ctx.fillStyle = '#AAAAAA'
               ctx.fillRect(400,400,100,50);
               ctx.fillStyle = '#000000'
               ctx.fillText("Start",440,430);
           }
                
                //draw the score
                ctx.fillStyle = '#000000'
                var scoreText = secretSticker.main.takenDemograph1 + '/'+ secretSticker.main.requiredDemograph1 + " " + majorList[secretSticker.main.demograph1num] + " Students";
                var photosLeftText = secretSticker.main.postersLeft + '/5 Posters Left'
                ctx.fillText(scoreText, 700,10);
                ctx.fillText(photosLeftText, 100,10);
            
        },
    
        doMousedown: function(c, e)
        { 
            //console.log(canvasMouse);
            var mouse = canvasMouse;
    
            //check if the area is clickable
		if(secretSticker.main.areaNumber == 0){
			//quad 		ctx.strokeRect(208,235,243,60);
			if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
				secretSticker.main.areaNumber = 1;
                secretSticker.main.inArea = true;
			}
			
			//gym1
			if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
				secretSticker.main.areaNumber = 2;
                secretSticker.main.inArea = true;
			}
			//gym2
			if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
				secretSticker.main.areaNumber = 2;
                secretSticker.main.inArea = true;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
				secretSticker.main.areaNumber = 3;
                secretSticker.main.inArea = true;
			}
		
			//labs1
			if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
				secretSticker.main.areaNumber = 4;
                secretSticker.main.inArea = true;
			}
			//labs2
			else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
				secretSticker.main.areaNumber = 4;
                secretSticker.main.inArea = true;
			}
		

			//coffee shop 
			if((mouse.x >= 13 && mouse.x <= 178)&&(mouse.y >= 43 && mouse.y <= 303)){
				secretSticker.main.areaNumber = 5;
				secretSticker.main.inArea = true;
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
				secretSticker.main.areaNumber = 6;
				secretSticker.main.inArea = true;
			}
		}
            if(secretSticker.main.areaNumber > 0 && secretSticker.main.areaNumber < 9 )
            {
                if((mouse.x >= 0 && mouse.x <= 100)&&(mouse.y >= 440 && mouse.y <= 490))
                {
                    secretSticker.main.areaNumber = 0;
                    secretSticker.main.inArea = false;
                }
                
                if(!secretSticker.main.areas[secretSticker.main.areaNumber].position1 && secretSticker.main.postersLeft>0)
                {
                    if((mouse.x >= 200 && mouse.x <= 250)&&(mouse.y >= 30 && mouse.y <= 100))
                    {
                        secretSticker.main.areas[secretSticker.main.areaNumber].position1 = true;
                        secretSticker.main.postersLeft--;
                        secretSticker.main.areas[secretSticker.main.areaNumber].posterHung++;
                        secretSticker.main.populateArea(secretSticker.main.areas[secretSticker.main.areaNumber].posterHung);
                        secretSticker.main.placeStudents = true;

                    }
                }
                if(!secretSticker.main.areas[secretSticker.main.areaNumber].position2 && secretSticker.main.postersLeft>0)
                {
                    if((mouse.x >= 440 && mouse.x <= 490)&&(mouse.y >= 30 && mouse.y <= 100))
                    {
                        secretSticker.main.areas[secretSticker.main.areaNumber].position2 = true;
                        secretSticker.main.postersLeft--;
                        secretSticker.main.areas[secretSticker.main.areaNumber].posterHung++;
                        secretSticker.main.populateArea(secretSticker.main.areas[secretSticker.main.areaNumber].posterHung);
                        secretSticker.main.placeStudents = true;

                    }
                }
                if(!secretSticker.main.areas[secretSticker.main.areaNumber].position3 && secretSticker.main.postersLeft>0)
                {
                    if((mouse.x >= 680 && mouse.x <= 730)&&(mouse.y >= 30 && mouse.y <= 100))
                    {
                        secretSticker.main.areas[secretSticker.main.areaNumber].position3 = true;
                        secretSticker.main.postersLeft--;
                        secretSticker.main.areas[secretSticker.main.areaNumber].posterHung++;
                        secretSticker.main.populateArea(secretSticker.main.areas[secretSticker.main.areaNumber].posterHung);
                        secretSticker.main.placeStudents = true;

                    }
                }
                var dx = mouse.x - 440;
                var dy = mouse.y - 470;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 30) 
                {
                    secretSticker.main.drag = true;
                    console.log("click")
                }
                
                
                if((mouse.x >= 0&& mouse.x <= 25)&&(mouse.y >= 250 && mouse.y <= 275))
                {
                    if(secretSticker.main.areaNumber >1)
                    secretSticker.main.areaNumber--;
                    else
                    secretSticker.main.areaNumber = 6;
                }
                if((mouse.x >= 875&& mouse.x <= 900)&&(mouse.y >= 250 && mouse.y <= 275 ))
                {
                    if(secretSticker.main.areaNumber <6)
                    secretSticker.main.areaNumber++;
                    else
                    secretSticker.main.areaNumber = 1;
                }
            }
               if(secretSticker.main.areaNumber == 9)
            {
                if((mouse.x >= 400 && mouse.x <= 500)&&(mouse.y >= 400 && mouse.y <= 450))
                {
                    secretSticker.main.areaNumber = 0;
                }
            }
        },
        
        doMouseOver: function(c, e)
        {
            var mouse = canvasMouse;
			//check if the area is clickable
            if(secretSticker.main.areaNumber == 0){
                secretSticker.main.buildingHover = [false,false,false,false,false,false];
                if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
                    secretSticker.main.buildingHover[0] = true;
                }
                if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
                    secretSticker.main.buildingHover[1] = true;
                }
                //gym2
                else if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
                    secretSticker.main.buildingHover[1] = true;
                }
                //media 		ctx.strokeRect(135,333,175,145);
                if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
                    secretSticker.main.buildingHover[2] = true;
                }
            
                //labs1
                if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
                    secretSticker.main.buildingHover[3] = true;
                }
                //labs2
                else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
                    secretSticker.main.buildingHover[3] = true;
                }
                //coffee shop 
                if((mouse.x >= 13 && mouse.x <= 178)&&(mouse.y >= 43 && mouse.y <= 303)){
                    secretSticker.main.buildingHover[4] = true;
                }
                //library 	ctx.strokeRect(600,330,280,155);
                if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
                    secretSticker.main.buildingHover[5] = true;
                }
            }
        },
        doMouseUp: function()
        {
            var mouse = canvasMouse;
            if(secretSticker.main.areaNumber != 0)
            {
                secretSticker.main.drag = false;
                
                for(var i =0; i<secretSticker.main.areas[secretSticker.main.areaNumber].students.length; i++)
                {
                    var distance = Math.sqrt(((secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].x - mouse.x) * (secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].x - mouse.x)) + ((secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].y - mouse.y) * (secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].y - mouse.y)));
                    if (distance < 50)
                    {
                        if(!secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions.stickered)
                        {
                            if (secretSticker.main.areas[secretSticker.main.areaNumber].students[i].color == '#00FF00')
                            {						
                                secretSticker.main.takenDemograph1++;
                                secretSticker.main.scores.score++;				
                            }
                            secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].stickered = true;
                        }
                    }
                };
            }
        },
        
        populateArea: function(posterNum)
        {
            console.log(posterNum)
            var posterCount = posterNum*3;
            console.log(posterCount)
             createSample(posterCount, secretSticker.main.areaNumber);
                    secretSticker.main.areas[secretSticker.main.areaNumber].students = [];
                    sample.forEach(function(element) {
                        var studentCircleHolder = {color:"#FF0000"}
                        if(majorList.indexOf(element.major) == secretSticker.main.demograph1num){
                            studentCircleHolder.color = "#00FF00";
                        }
                            secretSticker.main.areas[secretSticker.main.areaNumber].students.push(studentCircleHolder)
                    });
        }
        
    }



//
//
//
//running game 4 - Mean Moves
runningGame4.main = {

	player:
	{
		headnum: 0,
		gendernum:0,
		bodynum:0,
		racenum:0,

	},
	//all the images
	scores: {
		score:0,
		tier1: 3,
		tier2: 7,
		tier3: 10,
		tier4: 15,
	},
	colors: ['darkred','red','#004c00', '#00cc00','#00004c', 'blue','darkorange', 'yellow'],
	clickColor:[0,0,0,0],
	rngOrder: [0,0,0],
	leftStudent: {},
	rightStudent: {},
	instruction: true,
	round:0,
	peopleDancingNow: false,
	studentDancingNow: 0,
	playerDancingFrame: 0,
	moveTurn:0,
	groups: [0,0,0],
	gameGroups: [0,0,0],
	whichStatGroup: 0,
	inDanceMode: false,
	danceOrder: [],
	prompt: 0,
	clickpause: false,
	lastClick: 0,
	colorCounter: 0,
	delayCounter: 0,
	isPlayerDancingNow: false,
	playerDanceCounter: 0,
	moveCounter: 0,
	areWeDelay: true,
	finalBlink: false,
	animationTicker: 0,
	ticker: 0,
	showMeYourMove: false,
	incorrectDance: false,
	endGame: false,
	resultText: "",
	getReady: true,
	groupPrompt: ["Click on the Smallest Group", "Click on the Medium Sized Group", "Click on the Largest Group"],
	
//bodyTypeArray [body][gender][movetype][movefram][x/y]
	thinHeadPos: [
								//body types
								[
									[
										[422,184],[416,184],[416,184]
									],
									[
										[417,184],[415,197],[415,197]
									],
									[
										[423,184],[423,190],[430,190]
									],
									[
										[426,185],[417,190],[410,190]
									]
								],
								[
									[
										[417,184],[414,184],[412,184]
									],
									[
										[422,184],[417,190],[414,190]
									],
									[
										[420,184],[417,190],[439,190]
									],
									[
										[423,184],[417,190],[409,191]
									]
								],
								[
									[
										[413,183],[413,183],[417,183]
									],
									[
										[413,184],[418,196],[418,196]
									],
									[
										[416,184],[420,196],[440,196]
									],
									[
										[415,184],[416,196],[410,196]
									]
								]
							],
		medHeadPos: [
								[
									[
										[415,189],[414,189],[415,189]
									],
									[
										[415,189],[413,202],[415,197]
									],
									[
										[415,189],[413,189],[415,189]
									],
									[
										[415,190],[415,190],[415,190]
									]
								],
								[
									[
										[410,190],[411,190],[416,190]
									],
									[
										[412,190],[414,201],[415,201]
									],
									[
										[406,191],[420,191],[430,191]
									],
									[
										[408,191],[408,191],[404,191]
									]
								],
								[
									[
										[412,190],[412,190],[414,193]
									],
									[
										[411,190],[411,209],[414,209]
									],
									[
										[414,193],[416,193],[433,193]
									],
									[
										[411,192],[413,193],[403,195]
									]
								]
							],
		plusHeadPos: [
								[
									[
										[416,198],[416,198],[416,198]
									],
									[
										[413,196],[411,204],[411,204]
									],
									[
										[416,198],[418,196],[430,200]
									],
									[
										[416,198],[415,202],[408,202]
									]
								],
								[
									[
										[416,198],[416,198],[414,198]
									],
									[
										[418,198],[415,201],[415,201]
									],
									[
										[421,198],[421,198],[430,200]
									],
									[
										[412,198],[410,200],[407,200]
									]
								],
								[
									[
										[414,195],[412,195],[414,195]
									],
									[
										[414,195],[412,200],[416,200]
									],
									[
										[416,195],[418,198],[426,198]
									],
									[
										[417,196],[410,200],[403,200]
									]
								]
							],
		chairHeadPos: [
								[
									[
										[421,200],[421,200],[416,196]
									],
									[
										[422,195],[420,199],[417,190]
									],
									[
										[423,197],[420,194],[420,187]
									],
									[
										[417,198],[414,195],[410,188]
									]
								],
								[
									[
										[426,205],[416,201],[423,195]
									],
									[
										[423,205],[415,201],[419,195]
									],
									[
										[426,206],[420,202],[420,192]
									],
									[
										[424,204],[414,200],[422,193]
									]
								],
								[
									[
										[422,205],[418,202],[417,193]
									],
									[
										[422,202],[418,199],[420,190]
									],
									[
										[428,207],[424,204],[429,191]
									],
									[
										[416,204],[416,201],[413,193]
									]
								]
							],


	init: function(c,ctx){
		//images

		arrayOfHeadCoords =  [runningGame4.main.thinHeadPos, runningGame4.main.medHeadPos, runningGame4.main.plusHeadPos, runningGame4.main.chairHeadPos];
		runningGame4.main.resultText = 'Get Ready';
		runningGame4.main.getReady = false;
		backgroundDanceFloor = new Image();
		backgroundDanceFloor.src = '../img/minigame4/dancebg.png';
		backgroundAerialDanceFloor = new Image();
		backgroundAerialDanceFloor.src = '../img/minigame4/arieldance.png';

		if(practice){
				runningGame4.main.player.headnum = 0;
				runningGame4.main.player.facenum = 0;
				runningGame4.main.player.gendernum = 0;
				runningGame4.main.player.bodynum = 0;
		}
			else{
				runningGame4.main.player.headnum = playerCandidate.headNum;
				runningGame4.main.player.facenum = playerCandidate.faceNum;
				runningGame4.main.player.gendernum = playerCandidate.genderNum;
				runningGame4.main.player.bodynum = playerCandidate.bodyTypeNum;
			}

		//groups
		smallGroup = new Image();
		smallGroup.src = '../img/minigame4/group2.png';
		medGroup = new Image();
		medGroup.src = '../img/minigame4/group4.png';
		largeGroup = new Image();
		largeGroup.src = '../img/minigame4/group6.png';

		stageRed = new Image();
		stageRed.src = '../img/minigame4/stagelightbeamred.png'
		stageBlue = new Image();
		stageBlue.src = '../img/minigame4/stagelightbeamblue.png'
		stageGreen = new Image();
		stageGreen.src = '../img/minigame4/stagelightbeamgreen.png'
		stageLampRed = new Image();
		stageLampRed.src = '../img/minigame4/stagelightred.png';
		stageLampBlue = new Image();
		stageLampBlue.src = '../img/minigame4/stagelightblue.png';
		stageLampGreen = new Image();
		stageLampGreen.src = '../img/minigame4/stagelightgreen.png';

		//arrows
		rightArrow = new Image();
		rightArrow.src = '../img/minigame4/rightarrowgreyed.png';
		rightArrowGlow = new Image();
		rightArrowGlow.src = '../img/minigame4/rightArrowGREEN.png';
		leftArrow = new Image();
		leftArrow.src = '../img/minigame4/leftarrowgreyed.png';
		leftArrowGlow = new Image();
		leftArrowGlow.src = '../img/minigame4/leftarrowGREEN.png';
		upArrow = new Image();
		upArrow.src = '../img/minigame4/uparrowgreyed.png';
		upArrowGlow = new Image();
		upArrowGlow.src = '../img/minigame4/uparrowGREEN.png';
		downArrow = new Image();
		downArrow.src = '../img/minigame4/downarrowgreyed.png';
		downArrowGlow = new Image();
		downArrowGlow.src = '../img/minigame4/downarrowGREEN.png';

		//people
		headSheet = new Image();
		headSheet.src = '../img/spriteheadlong.png';
		//thin sheets
		thinFemale = new Image();
		thinFemale.src = '../img/minigame4/thinfemaledancesheet.png';
		thinMale = new Image();
		thinMale.src = '../img/minigame4/thinmaledancesheet.png';
		thinNB = new Image();
		thinNB.src = '../img/minigame4/thinnbdancesheet.png'
		//med sheets
		medFemale = new Image();
		medFemale.src = '../img/minigame4/medfemaledance.png';
		medMale = new Image();
		medMale.src = '../img/minigame4/medmaledance.png';
		medNB = new Image();
		medNB.src = '../img/minigame4/mednbdance.png';
		//plus sheet
		plusFemale = new Image();
		plusFemale.src = '../img/minigame4/plusfemaledance.png';
		plusMale = new Image();
		plusMale.src = '../img/minigame4/plusmaledance.png';
		plusNB = new Image();
		plusNB.src = '../img/minigame4/plusnbdance.png';
		//chair
		chairFemale = new Image();
		chairFemale.src = '../img/minigame4/chairfemaledance.png';
		chairMale = new Image();
		chairMale.src = '../img/minigame4/chairmaledance.png';
		chairNB = new Image();
		chairNB.src = '../img/minigame4/chairnbdance.png';

		danceSheetArray = [[thinNB, thinFemale, thinMale],[medNB,medFemale,medMale], [plusNB, plusFemale, plusMale], [chairNB, chairFemale, chairMale]]

		ctx.restore;
		ctx.save;
		runningGame4.main.rightStudent.race = Math.floor(Math.random() * 3);
		runningGame4.main.rightStudent.head = Math.floor(Math.random() * 6);
		runningGame4.main.rightStudent.body = Math.floor(Math.random() * 3);
		runningGame4.main.rightStudent.gender = Math.floor(Math.random() * 3);
		runningGame4.main.leftStudent.race = Math.floor(Math.random() * 3);
		runningGame4.main.leftStudent.head = Math.floor(Math.random() * 6);
		runningGame4.main.leftStudent.body = Math.floor(Math.random() * 3);
		runningGame4.main.leftStudent.gender = Math.floor(Math.random() * 3);
		runningGame4.main.instruction = true;
		runningGame4.main.endGame = false;
		runningGame4.main.ticker = 0;
		runningGame4.main.animationTicker = 0;
		c.onmousedown = runningGame4.main.doMousedown;
		runningGame4.main.round = 0;
		runningGame4.main.groups= [0,0,0];
		runningGame4.main.gameGroups= [0,0,0];
		runningGame4.main.clickColor=[0,0,0,0];
		runningGame4.main.rngOrder= [0,0,0];
		runningGame4.main.inDanceMode = false;
		runningGame4.main.showMeYourMove = false;
		//make the first round of students
		sample = 0;
		createSample(20,0);

		arrayGlowArrows = [[upArrowGlow,370,410,65,80],[downArrowGlow,451,410,65,80],[leftArrowGlow,270,420,80,65],[rightArrowGlow,526,420,80,65]]
		prompt = Math.floor(Math.random() * 3)
		//focus on a target on one of the 3 statistics (major, economic group, main interest)
		whichStatGroup = Math.floor(Math.random() * 3);
		runningGame4.main.setUpGroup();
		runningGame4.main.update(c,ctx);
	
	},

	update: function(c,ctx)
	{
		//requestionAnimation
		if(runningGame4.main.endGame ==  false){
			requestAnimationFrame(function(){runningGame4.main.draw(c,ctx)});
			requestAnimationFrame(function(){runningGame4.main.update(c,ctx)});		
			runningGame4.main.endOfRound();
		}
		else{
			console.log('END GAME')
			
			gameResults(runningGame4.main.scores, practice)
		}
	},

	draw: function(c,ctx)
	{
		//draw background
	
		ctx.drawImage(backgroundAerialDanceFloor,0,0,c.width, c.height)
	
		
		//if not in dance mode
		if(!runningGame4.main.inDanceMode){
			if(runningGame4.main.instruction){
					ctx.fillStyle = '#FF0000';
					ctx.fillRect(300,300,100,50)
			}
			else{
	
			//draw the lights

			ctx.font = "20px Serif";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(runningGame4.main.groupPrompt[prompt], 335, 40);
		

		//draw groups
			ctx.drawImage(smallGroup,600,330,130,90);
			ctx.drawImage(medGroup,130,280,160,120);
			ctx.drawImage(largeGroup,390,90,255,180);

		//		

		//draw the player

		//draw the ui
			}
		}
	else if(runningGame4.main.inDanceMode){		
			
			//background
			ctx.drawImage(backgroundDanceFloor,0,-40,c.width, c.height+40)
			ctx.filter = 'blur(3px)';


			
			ctx.filter = 'none';
			ctx.drawImage(stageLampGreen,70,20,140,120)
			ctx.drawImage(stageLampRed,370,20,140,120)
			ctx.drawImage(stageLampBlue,670,20,140,120)




			//the correct 
			//((width*3) * runningGame4.main.danceOrder[runningGame4.main.colorCounter]) + (width* runningGame4.main.studentDancingNow)
			//nb f m
			widthArray = [[280,289,280], [325,289,289],[352,352,352],[289,289,289]]
			//bodyTypeArray [body][gender][movetype][movefram][x/y]
			if(runningGame4.main.player.bodynum ==3){
					ctx.drawImage(danceSheetArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],((widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]*3) * runningGame4.main.lastClick) + (widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]* runningGame4.main.playerDancingFrame),0,widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],468,390,200,110,200);
			  		ctx.drawImage(headSheet,154 * ((6 * runningGame4.main.player.racenum) + runningGame4.main.player.headnum),0,153,172,413,193,59,67)
			}
				else{
					ctx.drawImage(headSheet,154 * ((6 * runningGame4.main.player.racenum) + runningGame4.main.player.headnum),0,153,172,arrayOfHeadCoords[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum][runningGame4.main.lastClick][runningGame4.main.playerDancingFrame][0],arrayOfHeadCoords[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum][runningGame4.main.lastClick][runningGame4.main.playerDancingFrame][1],59,67)
					ctx.drawImage(danceSheetArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],((widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]*3) * runningGame4.main.lastClick) + (widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]* runningGame4.main.playerDancingFrame),0,widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],468,390,200,110,200);
			  	
				}
			//player
			
			//if chair                                //xy cords
			stu1 = [[[118,208],[114,208],[112,210]],[[114,208],[112,220],[110,220]],[[119,207],[120,213],[126,213]],[[118,207],[113,220],[107,215]]]
			stu2 = [[[714,209],[712,209],[708,207]],[[719,208],[714,214],[712,214]],[[718,208],[714,214],[736,214]],[[722,207],[714,214],[703,214]]]

			ctx.drawImage(headSheet,154.6 * 0,0,154.6,172,stu1[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][0],stu1[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][1],59.6,62)
			ctx.drawImage(headSheet,154.6 * 0,0,154.6,172,stu2[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][0],stu2[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][1],59.6,62)

			//other students dont care
			ctx.drawImage(thinNB,((280*3) * runningGame4.main.danceOrder[runningGame4.main.colorCounter]) + (280* runningGame4.main.studentDancingNow),0,280,486,85,220,110,200);		
			ctx.drawImage(thinMale,((280*3) * runningGame4.main.danceOrder[runningGame4.main.colorCounter]) + (280* runningGame4.main.studentDancingNow),0,280,486,680,220,120,200)

			//thin body nonbinary


		

			//we
			//we are stopping clicking
			if(runningGame4.main.clickpause && runningGame4.main.showMeYourMove){
				if(runningGame4.main.moveCounter == 200){
					runningGame4.main.showMeYourMove = false;
					runningGame4.main.getReady = false;
					runningGame4.main.incorrectDance = false;
					runningGame4.main.moveCounter = 0;
				}
				
				else{
					runningGame4.main.moveCounter++;

						if(runningGame4.main.isPlayerDancingNow){

						if(runningGame4.main.playerDanceCounter == 100){
								runningGame4.main.isPlayerDancingNow = false;
								runningGame4.main.playerDanceCounter = 0;
							}
						else if(runningGame4.main.playerDanceCounter == 0  ||runningGame4.main.playerDanceCounter == 40){
							runningGame4.main.playerDancingFrame = 0;
						}
						else if (runningGame4.main.playerDanceCounter  == 5 ||runningGame4.main.playerDanceCounter  ==35){
							runningGame4.main.playerDancingFrame = 1;
						}
						else if (runningGame4.main.playerDanceCounter  == 10){
							runningGame4.main.playerDancingFrame = 2;
						}
						runningGame4.main.playerDanceCounter++;
					}
			
				}

				

			}
			else if(runningGame4.main.clickpause && !runningGame4.main.showMeYourMove){
					
					//pause between colors
					if(runningGame4.main.areWeDelay){
						ctx.filter = 'blur(3px)';
						ctx.drawImage(stageGreen,72.5,90,140,320)
						ctx.drawImage(stageBlue,672.5,90,140,320)
						ctx.filter = 'none';
						if(runningGame4.main.delayCounter == 10){
							runningGame4.main.areWeDelay = false;
							runningGame4.main.delayCounter = 0;
						}
						else{
			
							runningGame4.main.delayCounter++;
						}
					}
					else{
						ctx.filter = 'blur(3px)';
						ctx.drawImage(stageGreen,72.5,90,140,320)
						ctx.drawImage(stageBlue,672.5,90,140,320)
						ctx.filter = 'none';
					//doing Simon Says part
					if(runningGame4.main.ticker == 50){

						runningGame4.main.clickColor = [0,0,0,0]
						runningGame4.main.ticker = 0;
						runningGame4.main.colorCounter++;
						runningGame4.main.areWeDelay = true;
			
					}
					else{
						runningGame4.main.ticker++; 
						//ticker animation frames
						if(runningGame4.main.ticker == 0  ||runningGame4.main.ticker == 40){
							runningGame4.main.studentDancingNow = 0;
						}
						else if (runningGame4.main.ticker == 5 ||runningGame4.main.ticker ==35){
							runningGame4.main.studentDancingNow = 1;
						}
						else if (runningGame4.main.ticker == 10){
							runningGame4.main.studentDancingNow = 2;
						}

						
						runningGame4.main.clickColor[runningGame4.main.danceOrder[runningGame4.main.colorCounter]] = 1;


					}

					if(runningGame4.main.colorCounter > 3){
						runningGame4.main.clickpause = false;
						runningGame4.main.colorCounter = 0;
					}
				}				
			}
			//are actually in gamemode
			else{
				ctx.filter = 'blur(3px)';
					ctx.drawImage(stageRed,372.5,90,140,320)
					ctx.filter = 'none';
					//see if button is still lit up
					if(runningGame4.main.ticker == 10){
						if(!runningGame4.main.finalBlink){
						runningGame4.main.clickColor = [0,0,0,0]
					}
						  runningGame4.main.ticker = 0;
					if(runningGame4.main.moveTurn == 4){
							runningGame4.main.finalBlink = true;
							runningGame4.main.showMeYourMove = true;
						}
					}
					else{
						runningGame4.main.ticker++; 	
						runningGame4.main.showMeYourMove = false;	
					}
					//if player is dancing
				if(runningGame4.main.isPlayerDancingNow){

						if(runningGame4.main.playerDanceCounter == 100){
								runningGame4.main.isPlayerDancingNow = false;
								runningGame4.main.playerDanceCounter = 0;
							}
						else if(runningGame4.main.playerDanceCounter == 0  ||runningGame4.main.playerDanceCounter == 40){
							runningGame4.main.playerDancingFrame = 0;
						}
						else if (runningGame4.main.playerDanceCounter  == 5 ||runningGame4.main.playerDanceCounter  ==35){
							runningGame4.main.playerDancingFrame = 1;
						}
						else if (runningGame4.main.playerDanceCounter  == 10){
							runningGame4.main.playerDancingFrame = 2;
						}
						runningGame4.main.playerDanceCounter++;
					}
	
				
			}

			//arrows
			ctx.drawImage(leftArrow,270,420,80,65);
			ctx.drawImage(upArrow,370,410,65,80);
			ctx.drawImage(downArrow,451,410,65,80);
			ctx.drawImage(rightArrow,526,420,80,65);

			for(var s = 0; s < 4; s++){
				if(runningGame4.main.clickColor[s] == 1){
					ctx.drawImage(arrayGlowArrows[s][0],arrayGlowArrows[s][1],arrayGlowArrows[s][2],arrayGlowArrows[s][3],arrayGlowArrows[s][4])
				}
			}

			//the move
			if(runningGame4.main.showMeYourMove)
			{
				ctx.fillStyle = '#e2cf63';
				ctx.fillRect(100,400, 200,80);
				ctx.fillStyle = '#000000'
			
				if(runningGame4.main.getReady){
					runningGame4.main.resultText = 'Get Ready'
				}
				else{
					if(runningGame4.main.incorrectDance){
						runningGame4.main.resultText = 'Wrong'
					}
					else{
						
						runningGame4.main.resultText = 'Correct'
					}
				}
				ctx.fillText(runningGame4.main.resultText, 120, 420);
			}
		}

	},


	doMousedown: function(c, e)
	{ 
		var mouse = canvasMouse;
		runningGame4.main.clickPicker(mouse);
	},

	danceGen: function(){
		runningGame4.main.danceOrder[0] = Math.floor(Math.random() * 4);
		runningGame4.main.danceOrder[1] = Math.floor(Math.random() * 4);
		runningGame4.main.danceOrder[2] = Math.floor(Math.random() * 4);
		runningGame4.main.danceOrder[3] = Math.floor(Math.random() * 4);
		console.log(runningGame4.main.danceOrder);
	},

	danceAnimationTicker: function(){
		runningGame4.main.animationTicker++;
		if(runningGame4.main.animationTicker > 10){
			runningGame4.main.animationTicker = 0;
		}
		else{
			if(runningGame4.main.animationTicker <=2){
			
			}
			else if(runningGame4.main.animationTicker <=4){
			
			}
			else{
				
			}
		}
	},

	danceMoveCheck: function(clicked){
		if(runningGame4.main.danceOrder[runningGame4.main.moveTurn] == clicked){
			//increase the score
				runningGame4.main.scores.score++;
			//continue on
		}
		else{
			//do not increase score
			runningGame4.main.incorrectDance = true;
			//
		
		}
		runningGame4.main.moveTurn++;
	},

	setUpGroup: function()
	{
		var match = true;
		

		runningGame4
		//make the labels
		for(var x =0; x < 3; x++){
			runningGame4.main.groups[x] = x;
			runningGame4.main.gameGroups[x] = Math.floor(Math.random() * 5);
		}



	//you now have the # of students in main.groups & the groupID num in gameGroups
	},

	endOfRound: function(){
		//if we've gone through 3 rounds
			if(runningGame4.main.moveTurn > 3 && runningGame4.main.round <= 2 && runningGame4.main.finalBlink){
			runningGame4.main.round++;
			//reset round
			runningGame4.main.moveTurn = 0;
			runningGame4.main.danceGen();
			runningGame4.main.clickpause = true;
	
			runningGame4.main.clickColor = [0,0,0,0];
			runningGame4.main.finalBlink = false;

		}
		//if we've gone through 3 moves
		if(runningGame4.main.round > 2 && !runningGame4.main.showMeYourMove){
			//end teh game
			runningGame4.main.endGame = true;
		}
	},

	clickPicker: function(mouse){
		//if not in dance mode
		if(!runningGame4.main.inDanceMode && !runningGame4.main.instruction)
		{
			/*ctx.drawImage(smallGroup,600,330,130,90);
			ctx.drawImage(medGroup,130,280,160,120);
			ctx.drawImage(largeGroup,390,90,255,180);
*/
			if(mouse.x >= 600 && mouse.x <=730){
				if(mouse.y>= 330 && mouse.y <=420){
					runningGame4.main.promptChecker(prompt, 0)
				}
			}
			else if(mouse.x >= 130 && mouse.x <=290){
				if(mouse.y>= 280 && mouse.y <=400){
					runningGame4.main.promptChecker(prompt, 1)
				}
			}
			else if(mouse.x >= 390 && mouse.x <=635){
				if(mouse.y>= 90 && mouse.y <=270){
					runningGame4.main.promptChecker(prompt, 2)
				}
			}

			if(runningGame4.main.inDanceMode)
					{
						runningGame4.main.clickpause = true;
						runningGame4.main.showMeYourMove = true;
						if(!runningGame4.main.incorrectDance){
							runningGame4.main.scores.score++;
						}

						runningGame4.main.danceGen();
					}			
			
		}
		if(!runningGame4.main.inDanceMode && runningGame4.main.instruction){
			if(mouse.y >= 300 && mouse.y <=350){
					if(mouse.x >= 300 && mouse.x <= 380){
						
						runningGame4.main.instruction = false;
					}
				}
		}


		//if in dance mode

		/*
			colors: ['darkred','red','darkgreen', 'green','darkblue', 'blue','darkorange', 'yellow'],
	*/
		if(runningGame4.main.inDanceMode && !runningGame4.main.clickpause){
			
			runningGame4.main.ticker = 0;
			//check the y
		
			//up and down
			if(mouse.y >= 410 && mouse.y <=490){
				//up
				if(mouse.x >= 370 && mouse.x <= 435){
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.clickColor[0] = 1
					runningGame4.main.lastClick = 0;
					runningGame4.main.danceMoveCheck(0);
				}
				if(mouse.x >= 451 && mouse.x <= 516){
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.clickColor[1] = 1
					runningGame4.main.lastClick = 1;
					runningGame4.main.danceMoveCheck(1);
				}
			}
			if(mouse.y >= 410 && mouse.y <=475){
				//
				if(mouse.x >= 270 && mouse.x <= 350){
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.clickColor[2] = 1
					runningGame4.main.lastClick = 2;
					runningGame4.main.danceMoveCheck(2);	
				}
				if(mouse.x >= 526 && mouse.x <= 606){
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.clickColor[3] = 1
					runningGame4.main.lastClick = 3;
					runningGame4.main.danceMoveCheck(3);
				}
			}


		}
	},

	promptChecker: function(prompt,x){
		var groupPop = runningGame4.main.groups[x]
		console.log(groupPop)
		switch(prompt){
			case 0:			
				var minArray = Math.min.apply(groupPop, runningGame4.main.groups);		
				if(groupPop == minArray){			
					runningGame4.main.inDanceMode = true;
				}
				else{
					runningGame4.main.inDanceMode = false
				
				}
			break;
			case 1:
				var minArray = Math.min.apply(groupPop, runningGame4.main.groups);
				var maxArray = Math.max.apply(groupPop, runningGame4.main.groups);			
				if(groupPop != minArray && groupPop != maxArray){
		
						runningGame4.main.inDanceMode = true;
				}
				else{
						runningGame4.main.inDanceMode = false;
						
				}
			break;
			case 2:
				var maxArray = Math.max.apply(groupPop, runningGame4.main.groups);		
				if(groupPop == maxArray){
			
						runningGame4.main.inDanceMode = true;
				}
				else{
					runningGame4.main.inDanceMode = false
				}
			break;
		}


	},

}

tshirtCannon.main = {

	currentAmmo: 0,
	gameStop: false,
	areaNum: 0,
	students: [],
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


	init: function(c,ctx){
		ctx.restore;
		ctx.save;	

		tshirtCannon.main.areaNum = 0;
		tshirtCannon.main.currentAmmo = 0;
		tshirtCannon.main.gameStop = false;
		tshirtCannon.main.time = 60;
		tshirtCannon.main.playTime= tshirtCannon.main.time*1000;

		for(var i =0; i< tshirtCannon.main.playTime; i +=tshirtCannon.main.playTime/20){
			setTimeout(tshirtCannon.main.peopleGenerator, i);
		}
		setTimeout(tshirtCannon.main.stop, tshirtCannon.main.playTime);
        
		for(var i =0; i< tshirtCannon.main.playTime; i +=tshirtCannon.main.playTime/tshirtCannon.main.time)
		{setTimeout(tshirtCannon.main.timer, i);}
        
		c.onmousedown = tshirtCannon.main.doMousedown;
		tshirtCannon.main.update(c,ctx);

	},
    stop: function() 
    {
        tshirtCannon.main.gameStop=true;
        gameResults(tshirtCannon.main.scores, practice);
    },
	update: function(c,ctx)
	{
		if(!tshirtCannon.main.gameStop){
		//check if game finished

			requestAnimationFrame(function(){tshirtCannon.main.draw(c,ctx)});
			requestAnimationFrame(function(){tshirtCannon.main.update(c,ctx)});		
			
			//update score

		}
	},

	draw: function(c,ctx){
        
        //BackGrounds
        var GymBG = new Image();
        GymBG.src = '../../img/minigame5/GymTshirtCanonBG.png';
        
		//clear
		ctx.drawImage(GymBG, 0,0,900,500);
		//draw bg

		ctx.fillStyle = "#000000";
		ctx.font = "15px Arial";
		ctx.fillText("Time Remaining: " +tshirtCannon.main.time+"",700,20);
		
		ctx.font = "15px Arial";
		ctx.fillText("Score " +tshirtCannon.main.scores.score+"",0,20);
        
		//draw students moving
		ctx.fillStyle = '#00FFFF'
		for(var i=0;i<tshirtCannon.main.students.length;i++){
			if(tshirtCannon.main.students[i].active){
				ctx.fillRect(tshirtCannon.main.students[i].x,tshirtCannon.main.students[i].y, tshirtCannon.main.students[i].width, tshirtCannon.main.students[i].height)
				tshirtCannon.main.students[i].move();
			}
		}

		//draw tshirts
		var strokeArray = [[80,400],[380,400],[680,400]]

		ctx.fillStyle = "#AAAAAA";
		ctx.fillRect(0,390,c.width,c.height);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(80,400,160,80);
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(380,400,160,80);
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(680,400,160,80);

		//stroke
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 5;
		ctx.strokeRect(strokeArray[tshirtCannon.main.currentAmmo][0],strokeArray[tshirtCannon.main.currentAmmo][1], 160, 80)

	},

	doMousedown: function(c, e)
	{ 
		var mouse = canvasMouse;
		tshirtCannon.main.clickPicker(mouse);
	},

	collisionDetector: function (rect1, rect2)
	{
		if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) 
			return true;
		else
			return false;
	},

	peopleGenerator: function ()
	{
		var add = true;
		var mod;
		var directionMod =  Math.floor(Math.random() * 2);
		var startx;
		var starty =  Math.floor(Math.random() * 300) + 50;
		if(directionMod == 1){
			startx = -99;
			mod = 1
		}
		else{
			startx = 999;
			mod = -1
		}

		var tempRect = 
		{
			touched:false,
			width : 50,
			height : 50,
			y: starty,
			x: startx,
		};

		for(var i =0; i< tshirtCannon.main.students.length;i++)
		{
			if(tshirtCannon.main.collisionDetector(tshirtCannon.main.students[i],tempRect))
				add = false;
		}	
		if(add)
		{
			tshirtCannon.main.students.push(
			{
				touched:false,
				active: true,
				width : 50,
				height : 50,
				y: starty,
				tshirt: Math.floor(Math.random() * 3),
				race: Math.floor((Math.random() * 3)),
				gender: Math.floor((Math.random() * 3)), 
				face: Math.floor((Math.random() * 6)), 
				body: Math.floor((Math.random() * 4)),  
				x: startx,
				move: function(){this.x+= (100 * mod) * tshirtCannon.main.calculateDeltaTime()},
			});		
		}
	},

	peopleManager: function(){
		for(var i=0;i<tshirtCannon.main.students.length;i++)
		{
			if(tshirtCannon.main.students[i].x >1000 || tshirtCannon.main.students[i].x <-100)
			{
				tshirtCannon.main.students[i].active = false;
			}
		}
	},

	clickPicker: function(mouse){

		for(var x =0; x < tshirtCannon.main.students.length; x++){
			if(mouse.x >= tshirtCannon.main.students[x].x && mouse.x <= (tshirtCannon.main.students[x].x+tshirtCannon.main.students[x].width)){
				if(mouse.y >= tshirtCannon.main.students[x].y && mouse.y <= (tshirtCannon.main.students[x].y+tshirtCannon.main.students[x].height)){			
					if(tshirtCannon.main.students[x].tshirt == tshirtCannon.main.currentAmmo && tshirtCannon.main.students[x].touched == false){
						console.log('correct');
                        tshirtCannon.main.scores.score++;
                        tshirtCannon.main.students[x].touched = true; 
					}
					else{
						console.log('no');
					}
				}
			}
		}

		//if tshirt cannon
		if(mouse.y>= 400 && mouse.y <=480){
			if(mouse.x >=80 && mouse.x <=240){
				tshirtCannon.main.currentAmmo = 0;
			}
			else if(mouse.x >=380 && mouse.x <=540){
				tshirtCannon.main.currentAmmo = 1;
			}
			else if(mouse.x >=680 && mouse.x <=840){
				tshirtCannon.main.currentAmmo = 2;
			}
		}
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
	timer: function()
	{
		tshirtCannon.main.time--;
	}

}
