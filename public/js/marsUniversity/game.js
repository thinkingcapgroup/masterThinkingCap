//making all the score presets
var groupList = ["socialite", "athlete", "researcher", "mediaLover", "reader"];
var majorList = ["business", "engineering", "tech", "fineArts", "libArts"];
var stuEconomic = ["poverty", "low", "midLow", "midHigh", "high"];
var playerCandidate = new CandidateCreate("ph","ph", "ph", "ph")
var opponentCandidate = new CandidateCreate("Liz", "Lizard", "Non-Binary", "Average");
var tableHeaders = ["Favored Issue", "Least Favored Issue", "Favored Candidate", "Least Favored Candidate", "Major", "Class", "Group", "Our Candidate's Fame", "Our Candidate's Trust", "Issue Support: ", "Candidate's Fame: ","Candidate's Trust: "];
var tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
var pastPollChoices = [];
var pastPollResults = [];
var pastPollSizes = [];
var raceArray = ["Android", "Human", "Martian"];
var genderArray = ["Non-Binary", "Female", "Male"];
var bodyTypeArray = ["Thin", "Medium", "Plus", "HoverChair"];
var back = false;
var textContents;

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
var currentEvents = [];
var sample = [];
var events=[];
var questions=[];
var candidates=[];

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

//setting up some more variables

var turnCounter;
var population;
var sample;
var startHours;
var remainingHours;

var population = 1000;


//starts the game
function startGame(){

	//whatever other things we have to do when initializing the game here
	var date = Date.now();
	console.log("Game initialized and loaded @ T:" + date);
	//console.log("Game initialized and loaded!");

	var Json;
	var oReq = new XMLHttpRequest();
	oReq.onload = function (e)
	{
		Json = JSON.parse(this.responseText);
		events = Json.events;
		questions = Json.questions;
	};
	oReq.open("get", "json/events.json", true);
	oReq.send();
}

/*GAME INTRO FUNCTIONS8*/
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
	document.getElementById("gameInfo").innerHTML += "<p>You're candidate, <b>"+ playerCandidate.name +"</b> is going up again Liz the Chameleon. They're going for Student Council President just like your playerCandidate. Whenever any student wishes to campaign, the current student government will give the candidate some information about the student body.</p>"
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
	startHours = 200; 
	remainingHours = startHours;
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
	candidates.push(playerCandidate);

	for ( var i =0;i<5; i++)
	{
		if(i!=f)
		{
			oppChoice.push(i);
		}
	}

	//Decides the opponents focus which cannot be the same as the player
		var oppFocus = Math.floor(Math.random(0,4));
		opponentCandidate.focus = positions[oppChoice[oppFocus]];
		opponentCandidate.focusnum = oppChoice[oppFocus];
		opponentCandidate.fame = [2,2,2,2,2,2,2.2,1,1,1,1,1,1,1,1];
		opponentCandidate.consMod = 0;
		//console.log(oppFocus);
		switch(oppChoice[oppFocus])
		{
			case 0:
			opponentCandidate.issueScore[0]=1;
			break;
			case 1:
			opponentCandidate.issueScore[1]=1;
			break;
			case 2:
			opponentCandidate.issueScore[2]=1;
			break;
			case 3:
			opponentCandidate.issueScore[3]=1;
			break;
			case 4:
			opponentCandidate.issueScore[4]=1;
			break;
		}
	candidates.push(opponentCandidate);

	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + playerCandidate.focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours: " + remainingHours + "</h3>";
	userAction();
};

function userAction()
{
	//Clear previous screen
	clearScreen();
	var prevHours = document.getElementById("playerInfo");
	var nextArea = document.getElementById("next");
	prevHours.innerHTML = "";
	nextArea.innerHTML = "";

	saveGameState();

	//Build User Action Area buttons
	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + candidates[0].focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours: " + remainingHours + "</h3>";
	document.getElementById("choices").innerHTML += "<button type='button' class = 'saveData'  onclick='poll()'> Take A Poll </button>";
	document.getElementById("choices").innerHTML += "<button type='button'  onclick='gameCycleEnd()'> Skip to the End </button>";
	document.getElementById("choices").innerHTML += "<br>";
	for(var i=0; i<pastPollResults.length;i++)
	{
		var num = i+1;
		document.getElementById("choices").innerHTML += "<button type='button' onclick='reportViewer("+i+")' >View Poll "+ num +" Result </button>";
	}
	document.getElementById("choices").innerHTML += "<br>";
	document.getElementById("gameInfo").innerHTML += "<h4> Opponent\'s Last Move:" + opponentCandidate.lastMove + "</h4>";
	document.getElementById("choices").innerHTML += "<br>";

	if(!back)
	{
		currentEvents = [];
	
		//Adds events to button list randomly from those available and Prevents Duplicates and events with more time than is available
		for(var i = 0;i<5;i++)
		{
			var addEvent = true;
			var random = Math.floor(Math.random() * events.length);
			var currentEvent = events[random];
			for(var j = 0;j<currentEvents.length;j++)
			{
	
				if(currentEvent.name == currentEvents[j].name || currentEvent.timeRequired > remainingHours)
				{
					addEvent = false;
				}
	
			}
	
			if(addEvent)
			{
				currentEvents.push(currentEvent);
				var eventDescription = currentEvent.name + " - " + currentEvent.timeRequired;
				var arrayPos = currentEvent.id -1;
				document.getElementById("choices").innerHTML += "<button class = 'saveData' onclick='action( "+ arrayPos+" )'>" + eventDescription + " hours </button>";
			}
			else
			{
				i--;
			}
		}
	}
	else 
	{
		for(var j = 0;j<currentEvents.length;j++)
			{
				var eventDescription = currentEvents[j].name + " - " + currentEvents[j].timeRequired;
				var arrayPos = currentEvents[j].id -1;
				document.getElementById("choices").innerHTML += "<button onclick='action( "+ arrayPos+" )'>" + eventDescription + " hours </button>";
			}
	}
	back = false; 
	
	//Show changes to screen
	document.getElementById("choices").style.display = "block";
};

function action(choice)
{
	//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";
	chosenEvent = events[choice];
	back = false;
	
	if(remainingHours >= chosenEvent.timeRequired)
	{
		chosenEvent = events[choice];
	
		if(chosenEvent.type=="minigame")
		{
			//Call the function of the minigamegame from the DB
		}
		else if(chosenEvent.type=="smallEvent")
		{
			//Creates the screen for the event
			var eventHours = parseInt(chosenEvent.timeRequired);
			document.getElementById("event").innerHTML += "<h4>" + chosenEvent.text + " </h4>";
	
			for(var i =0; i<chosenEvent.options.length; i++)
			{
				if( (eventHours + parseInt(chosenEvent.options[i].extraTime)) <= remainingHours)
				{
					document.getElementById("event").innerHTML += "<input type='radio' id = " + chosenEvent.options[i].optionID + ">" + chosenEvent.options[i].optionName + " - " + chosenEvent.options[i].extraTime +" Additional Hours <br>";
				}
			}
			document.getElementById("event").innerHTML += "<br> <button type='button' onclick='submitAction(" + choice + "," + eventHours + ")' > Perform Event </button>";
		}
		else if(chosenEvent.type=="largeEvent")
		{
	
		}
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
	for(var j =0; j<chosenEvent.options.length; j++)
	{
		if( (parseFloat(chosenEvent.timeRequired) + parseFloat(chosenEvent.options[j].extraTime)) <= remainingHours)
		{
			if(document.getElementById(chosenEvent.options[j].optionID).checked == true)
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
		}
	}
	remainingHours-= eventHours;

	//Changes the player's score
	scoreChanger(chosenEvent.scoreInc, totalPosEffects, totalNegEffects);

	//Checks to see if the game has reached it's end
	if(remainingHours<1)
	{
		gameCycleEnd();
	}
	else
	{
		userAction();
	}
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

	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + candidates[0].focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours: " + remainingHours + "</h3>";
	votePercentage(1000);
	var winner;
	var winvotes = 0;
	for(var i = 0; i<candidates.length;i++)
	{
		if(candidates[i].votes > winvotes)
		{
			winner = candidates[i].name;
		}
	}
	document.getElementById("gameInfo").innerHTML += "<p> Winner: "+ winner +"</p> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};


/*Special Action Pages*/

//Allows the user to give a poll ith questions they choose to a sample of the population
function poll()
{
	//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";
	
	if(remainingHours> 2 )
	{
		document.getElementById("event").innerHTML += "<h4> Select the amount of people you want to poll. The time will increase by 1 hour for every 10 people.  </h4>";
		document.getElementById("event").innerHTML += " <select id = 'sample'> </select> ";
		
		document.getElementById("sample").options.add(new Option("Sample 10 Students", 10));
		if(remainingHours> 3 )
			document.getElementById("sample").options.add(new Option("Sample 20 Students", 20));
		if(remainingHours> 4 )
			document.getElementById("sample").options.add(new Option("Sample 30 Students", 30));
		if(remainingHours> 5 )
			document.getElementById("sample").options.add(new Option("Sample 40 Students", 40));
		if(remainingHours> 6 )
			document.getElementById("sample").options.add(new Option("Sample 50 Students", 50));
		if(remainingHours> 7 )
			document.getElementById("sample").options.add(new Option("Sample 60 Students", 60));
		if(remainingHours> 8 )
			document.getElementById("sample").options.add(new Option("Sample 70 Students", 70));
		if(remainingHours> 9 )
			document.getElementById("sample").options.add(new Option("Sample 80 Students", 80));
		if(remainingHours> 10 )
			document.getElementById("sample").options.add(new Option("Sample 90 Students", 90));
			
		document.getElementById("event").innerHTML += "<h4> Select the questions you want to ask on the poll. Every set of one or two questions you add will equal an hour. </h4> <br>";
		//Populates the questions based on the JSON File
		for(var i = 0; i<5 ;i++)
		{
			var none = "";
			document.getElementById("event").innerHTML += " <select id =\"poll"+i+ "\"> </select> ";
			document.getElementById("poll"+i+"").options.add(new Option("None", none));
				for(var j = 0; j<questions.length; j++)
				{
					if(questions[j].id == 9)
					{
						for(var k = 0;k<positions.length;k++)
						{
							var questionText = questions[j].question + positions[k];
							var questionVal = questions[j].value + "" + positionsLower[k];
							document.getElementById("poll"+i+"").options.add(new Option(questionText, questionVal));
						}
					}
					else if(questions[j].id == 10)
					{
						for(var l = 1;l<candidates.length;l++)
						{
							var questionText = questions[j].question +  candidates[l].name;
							var questionVal = questions[j].value + candidates[l].name;
							document.getElementById("poll"+i+"").options.add(new Option(questionText, questionVal));
						}
					}
					else if(questions[j].id == 11)
					{
						for(var l = 1;l<candidates.length;l++)
						{
							var questionText = questions[j].question +  candidates[l].name;
							var questionVal = questions[j].value + candidates[l].name;
							document.getElementById("poll"+i+"").options.add(new Option(questionText, questionVal));
						}
					}
					else
					{document.getElementById("poll"+i+"").options.add(new Option(questions[j].question, questions[j].value));}
				}
			document.getElementById("event").innerHTML += "<br><br>";
		}
	}
	else
	{
		document.getElementById("event").innerHTML += "<h4> You do not have enough time remaining to take a poll.</h4>";
	}
	
	
	//Displays the screen for this event
	document.getElementById("next").innerHTML += "<button onclick = 'pollResults()'> Submit Poll </button>";
	document.getElementById("event").innerHTML += "<br> <button type='button' onclick='backtoUA()' > Choose a Different Action </button>";
	document.getElementById("event").style.display = "block";
	document.getElementById("next").style.display = "block";
};

//Displays the result of a poll immediately after it end and then saves the report for later viewing
function pollResults()
{
	document.getElementById("event").style.display = "none";
	var duplicate = false;
	var pollChoices = [];
	for(var i = 0; i<5 ;i++)
	{
		var selectedQuestion = document.getElementById("poll"+i+"");
		if(selectedQuestion.options[selectedQuestion.selectedIndex].value != "")
		{
			pollChoices.push(selectedQuestion.options[selectedQuestion.selectedIndex].value);
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
		document.getElementById("gameInfo").innerHTML += "<p> You need at least 2 questions on your poll. \nPlease select questions to ask. </p> <button onclick = 'poll()'> Reselect Poll Questions </button>";
	}
	else if(duplicate)
	{
		//console.log(pollChoices);
		//console.log(duplicate);
		document.getElementById("gameInfo").innerHTML += "<p> You have at least two of the same questions on your poll. \nPlease select the questions again. </p> <button onclick = 'poll()'> Reselect Poll Questions </button>";
	}
	else if(!pollTimeCheck(sampleSize, pollChoices))
	{
		document.getElementById("gameInfo").innerHTML += "<p> You dont have enough time to ask that many questions. \nPlease reselect an appropriate number of questions.</p>  <button onclick = 'poll()'> Reselect Poll Questions </button>";
	}
	else
	{
		pollCalc(pollChoices, sampleSize);
		document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the User Action Area </button>";
	}

};




/* Helper Functions*/

//Takes in an Arrays of Groups to affect with the score increase, and parses through each adding the specified increase in score
function scoreChanger(scoreInc, groupPos, groupNeg)
{
	//console.log(candidates[0].fame);
	//console.log(candidates[0].issueScore);
	//console.log(scoreInc);
	for(var i=0;i<groupPos.length;i++)
	{

		switch (groupPos[i])
		{
			case "Soc":
				candidates[0].fame[0]+=parseFloat(scoreInc);
				if(candidates[0].fame[0] > 2)
				{
					candidates[0].fame[0] = 2;
				}
				if(candidates[0].fame[0] < .1)
				{
					candidates[0].fame[0] = .1;
				}
				break;

			case "Ath":
				candidates[0].fame[1]+=parseFloat(scoreInc);
				if(candidates[0].fame[1] > 2)
				{
					candidates[0].fame[1] = 2;
				}
				if(candidates[0].fame[1] < .1)
				{
					candidates[0].fame[1] = .1;
				}
				break;

			case "Res":
				candidates[0].fame[2]+=parseFloat(scoreInc);
				if(candidates[0].fame[2] > 2)
				{
					candidates[0].fame[2] = 2;
				}
				if(candidates[0].fame[2] < .1)
				{
					candidates[0].fame[2] = .1;
				}
				break;

			case "Medis":
				candidates[0].fame[3]+=parseFloat(scoreInc);
				if(candidates[0].fame[3] > 2)
				{
					candidates[0].fame[3] = 2;
				}
				if(candidates[0].fame[3] < .1)
				{
					candidates[0].fame[3] = .1;
				}
				break;

			case "Read":
				candidates[0].fame[4]+=parseFloat(scoreInc);
				if(candidates[0].fame[4] > 2)
				{
					candidates[0].fame[4] = 2;
				}
				if(candidates[0].fame[4] < .1)
				{
					candidates[0].fame[4] = .1;
				}
				break;

			case "Bus":
				candidates[0].fame[5]+=parseFloat(scoreInc);
				if(candidates[0].fame[5] > 2)
				{
					candidates[0].fame[5] = 2;
				}
				if(candidates[0].fame[5] < .1)
				{
					candidates[0].fame[5] = .1;
				}
				break;

			case "Eng":
				candidates[0].fame[6]+=parseFloat(scoreInc);
				if(candidates[0].fame[6] > 2)
				{
					candidates[0].fame[6] = 2;
				}
				if(candidates[0].fame[6] < .1)
				{
					candidates[0].fame[6] = .1;
				}
				break;

			case "Tech":
				candidates[0].fame[7]+=parseFloat(scoreInc);
				if(candidates[0].fame[7] > 2)
				{
					candidates[0].fame[7] = 2;
				}
				if(candidates[0].fame[7] < .1)
				{
					candidates[0].fame[7] = .1;
				}
				break;

			case "Fine Arts":
				candidates[0].fame[8]+=parseFloat(scoreInc);
				if(candidates[0].fame[8] > 2)
				{
					candidates[0].fame[8] = 2;
				}
				if(candidates[0].fame[8] < .1)
				{
					candidates[0].fame[8] = .1;
				}
				break;

			case "Lib Arts":
				candidates[0].fame[9]+=parseFloat(scoreInc);
				if(candidates[0].fame[9] > 2)
				{
					candidates[0].fame[9] = 2;
				}
				if(candidates[0].fame[9] < .1)
				{
					candidates[0].fame[9] = .1;
				}
				break;

			case "Poor":
				candidates[0].fame[10]+=parseFloat(scoreInc);
				if(candidates[0].fame[10] > 2)
				{
					candidates[0].fame[10] = 2;
				}
				if(candidates[0].fame[10] < .1)
				{
					candidates[0].fame[10] = .1;
				}
				break;

			case "Low":
				candidates[0].fame[11]+=parseFloat(scoreInc);
				if(candidates[0].fame[11] > 2)
				{
					candidates[0].fame[11] = 2;
				}
				if(candidates[0].fame[11] < .1)
				{
					candidates[0].fame[11] = .1;
				}
				break;

			case "Lower Mid":
				candidates[0].fame[12]+=parseFloat(scoreInc);
				if(candidates[0].fame[12] > 2)
				{
					candidates[0].fame[12] = 2;
				}
				if(candidates[0].fame[12] < .1)
				{
					candidates[0].fame[12] = .1;
				}
				break;

			case "Upper Mid":
				candidates[0].fame[13]+=parseFloat(scoreInc);
				if(candidates[0].fame[13] > 2)
				{
					candidates[0].fame[13] = 2;
				}
				if(candidates[0].fame[13] < .1)
				{
					candidates[0].fame[13] = .1;
				}
				break;

			case "High":
				candidates[0].fame[14]+=parseFloat(scoreInc);
				if(candidates[0].fame[14] > 2)
				{
					candidates[0].fame[14] = 2;
				}
				if(candidates[0].fame[14] < .1)
				{
					candidates[0].fame[14] = .1;
				}
				break;

			case "Focus":
				switch(candidates[0].focusnum)
				{
					case 0:
						candidates[0].issueScore[0]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[0] > 4)
						{
							candidates[0].issueScore[0] = 4;
						}
						if(candidates[0].issueScore[0] < -4)
						{
							candidates[0].issueScore[0] = -4;
						}
						break;

					case 1:
						candidates[0].issueScore[1]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[1] > 4)
						{
							candidates[0].issueScore[1] = 4;
						}
						if(candidates[0].issueScore[1] < -4)
						{
							candidates[0].issueScore[1] = -4;
						}
						break;

					case 2:
						candidates[0].issueScore[2]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[2] > 4)
						{
							candidates[0].issueScore[2] = 4;
						}
						if(candidates[0].issueScore[2] < -4)
						{
							candidates[0].issueScore[2] = -4;
						}
						break;

					case 3:
						candidates[0].issueScore[3]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[3] > 4)
						{
							candidates[0].issueScore[3] = 4;
						}
						if(candidates[0].issueScore[3] < -4)
						{
							candidates[0].issueScore[3] = -4;
						}
						break;
					case 4:
						candidates[0].issueScore[4]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[4] > 4)
						{
							candidates[0].issueScore[4] = 4;
						}
						if(candidates[0].issueScore[4] < -4)
						{
							candidates[0].issueScore[4] = -4;
						}
						break;
				}

				break;

			case "tuition":
				candidates[0].issueScore[0]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[0] > 4)
						{
							candidates[0].issueScore[0] = 4;
						}
						if(candidates[0].issueScore[0] < -4)
						{
							candidates[0].issueScore[0] = -4;
						}
				break;

			case "athletic":
				candidates[0].issueScore[1]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[1] > 4)
						{
							candidates[0].issueScore[1] = 4;
						}
						if(candidates[0].issueScore[1] < -4)
						{
							candidates[0].issueScore[1] = -4;
						}
				break;

			case "research":
				candidates[0].issueScore[2]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[2] > 4)
						{
							candidates[0].issueScore[2] = 4;
						}
						if(candidates[0].issueScore[2] < -4)
						{
							candidates[0].issueScore[2] = -4;
						}
				break;

			case "events":
				candidates[0].issueScore[3]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[3] > 4)
						{
							candidates[0].issueScore[3] = 4;
						}
						if(candidates[0].issueScore[3] < -4)
						{
							candidates[0].issueScore[3] = -4;
						}
				break;

			case "medical":
				candidates[0].issueScore[4]+=parseFloat(scoreInc);
						if(candidates[0].issueScore[4] > 4)
						{
							candidates[0].issueScore[4] = 4;
						}
						if(candidates[0].issueScore[4] < -4)
						{
							candidates[0].issueScore[4] = -4;
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
				candidates[0].fame[0]-=parseFloat(scoreInc);
				if(candidates[0].fame[0] > 2)
				{
					candidates[0].fame[0] = 2;
				}
				if(candidates[0].fame[0] < .1)
				{
					candidates[0].fame[0] = .1;
				}
				break;

			case "Ath":
				candidates[0].fame[1]-=parseFloat(scoreInc);
				if(candidates[0].fame[1] > 2)
				{
					candidates[0].fame[1] = 2;
				}
				if(candidates[0].fame[1] < .1)
				{
					candidates[0].fame[1] = .1;
				}
				break;

			case "Res":
				candidates[0].fame[2]-=parseFloat(scoreInc);
				if(candidates[0].fame[2] > 2)
				{
					candidates[0].fame[2] = 2;
				}
				if(candidates[0].fame[2] < .1)
				{
					candidates[0].fame[2] = .1;
				}
				break;

			case "Medis":
				candidates[0].fame[3]-=parseFloat(scoreInc);
				if(candidates[0].fame[3] > 2)
				{
					candidates[0].fame[3] = 2;
				}
				if(candidates[0].fame[3] < .1)
				{
					candidates[0].fame[3] = .1;
				}
				break;

			case "Read":
				candidates[0].fame[4]-=parseFloat(scoreInc);
				if(candidates[0].fame[4] > 2)
				{
					candidates[0].fame[4] = 2;
				}
				if(candidates[0].fame[4] < .1)
				{
					candidates[0].fame[4] = .1;
				}
				break;

			case "Bus":
				candidates[0].fame[5]-=parseFloat(scoreInc);
				if(candidates[0].fame[5] > 2)
				{
					candidates[0].fame[5] = 2;
				}
				if(candidates[0].fame[5] < .1)
				{
					candidates[0].fame[5] = .1;
				}
				break;

			case "Eng":
				candidates[0].fame[6]-=parseFloat(scoreInc);
				if(candidates[0].fame[6] > 2)
				{
					candidates[0].fame[6] = 2;
				}
				if(candidates[0].fame[6] < .1)
				{
					candidates[0].fame[6] = .1;
				}
				break;

			case "Tech":
				candidates[0].fame[7]-=parseFloat(scoreInc);
				if(candidates[0].fame[7] > 2)
				{
					candidates[0].fame[7] = 2;
				}
				if(candidates[0].fame[7] < .1)
				{
					candidates[0].fame[7] = .1;
				}
				break;

			case "Fine Arts":
				candidates[0].fame[8]-=parseFloat(scoreInc);
				if(candidates[0].fame[8] > 2)
				{
					candidates[0].fame[8] = 2;
				}
				if(candidates[0].fame[8] < .1)
				{
					candidates[0].fame[8] = .1;
				}
				break;

			case "Lib Arts":
				candidates[0].fame[9]-=parseFloat(scoreInc);
				if(candidates[0].fame[9] > 2)
				{
					candidates[0].fame[9] = 2;
				}
				if(candidates[0].fame[9] < .1)
				{
					candidates[0].fame[9] = .1;
				}
				break;

			case "Poor":
				candidates[0].fame[10]-=parseFloat(scoreInc);
				if(candidates[0].fame[10] > 2)
				{
					candidates[0].fame[10] = 2;
				}
				if(candidates[0].fame[10] < .1)
				{
					candidates[0].fame[10] = .1;
				}
				break;

			case "Low":
				candidates[0].fame[11]-=parseFloat(scoreInc);
				if(candidates[0].fame[11] > 2)
				{
					candidates[0].fame[11] = 2;
				}
				if(candidates[0].fame[11] < .1)
				{
					candidates[0].fame[11] = .1;
				}
				break;

			case "Lower Mid":
				candidates[0].fame[12]-=parseFloat(scoreInc);
				if(candidates[0].fame[12] > 2)
				{
					candidates[0].fame[12] = 2;
				}
				if(candidates[0].fame[12] < .1)
				{
					candidates[0].fame[12] = .1;
				}
				break;

			case "Upper Mid":
				candidates[0].fame[13]-=parseFloat(scoreInc);
				if(candidates[0].fame[13] > 2)
				{
					candidates[0].fame[13] = 2;
				}
				if(candidates[0].fame[13] < .1)
				{
					candidates[0].fame[13] = .1;
				}
				break;

			case "High":
				candidates[0].fame[14]-=parseFloat(scoreInc);
				if(candidates[0].fame[14] > 2)
				{
					candidates[0].fame[14] = 2;
				}
				if(candidates[0].fame[14] < .1)
				{
					candidates[0].fame[14] = .1;
				}
				break;

			case "Focus":
				switch(candidates[0].focusnum)
				{
					case 0:
						candidates[0].issueScore[0]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[0] > 4)
						{
							candidates[0].issueScore[0] = 4;
						}
						if(candidates[0].issueScore[0] < -4)
						{
							candidates[0].issueScore[0] = -4;
						}
						break;

					case 1:
						candidates[0].issueScore[1]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[1] > 4)
						{
							candidates[0].issueScore[1] = 4;
						}
						if(candidates[0].issueScore[1] < -4)
						{
							candidates[0].issueScore[1] = -4;
						}
						break;

					case 2:
						candidates[0].issueScore[2]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[2] > 4)
						{
							candidates[0].issueScore[2] = 4;
						}
						if(candidates[0].issueScore[2] < -4)
						{
							candidates[0].issueScore[2] = -4;
						}
						break;

					case 3:
						candidates[0].issueScore[3]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[3] > 4)
						{
							candidates[0].issueScore[3] = 4;
						}
						if(candidates[0].issueScore[3] < -4)
						{
							candidates[0].issueScore[3] = -4;
						}
						break;
					case 4:
						candidates[0].issueScore[4]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[4] > 4)
						{
							candidates[0].issueScore[4] = 4;
						}
						if(candidates[0].issueScore[4] < -4)
						{
							candidates[0].issueScore[4] = -4;
						}
						break;
				}

				break;

			case "tuition":
				candidates[0].issueScore[0]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[0] > 4)
						{
							candidates[0].issueScore[0] = 4;
						}
						if(candidates[0].issueScore[0] < -4)
						{
							candidates[0].issueScore[0] = -4;
						}
				break;

			case "athletic":
				candidates[0].issueScore[1]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[1] > 4)
						{
							candidates[0].issueScore[1] = 4;
						}
						if(candidates[0].issueScore[1] < -4)
						{
							candidates[0].issueScore[1] = -4;
						}
				break;

			case "research":
				candidates[0].issueScore[2]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[2] > 4)
						{
							candidates[0].issueScore[2] = 4;
						}
						if(candidates[0].issueScore[2] < -4)
						{
							candidates[0].issueScore[2] = -4;
						}
				break;

			case "events":
				candidates[0].issueScore[3]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[3] > 4)
						{
							candidates[0].issueScore[3] = 4;
						}
						if(candidates[0].issueScore[3] < -4)
						{
							candidates[0].issueScore[3] = -4;
						}
				break;

			case "medical":
				candidates[0].issueScore[4]-=parseFloat(scoreInc);
						if(candidates[0].issueScore[4] > 4)
						{
							candidates[0].issueScore[4] = 4;
						}
						if(candidates[0].issueScore[4] < -4)
						{
							candidates[0].issueScore[4] = -4;
						}
				break;

			case "Fame":

				break;

			case "Opp Focus":

				break;

			case "Opp Fame":

				break;

		}
	//console.log(candidates[0].fame);
	//console.log(candidates[0].issueScore);
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
function CandidateCreate(name,race,gender,bodyType){
	this.name = name;
	this.race = race;
	this.gender = gender;
	this.bodyType = bodyType;
	this.fame= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.issueScore= [0,0,0,0,0];
	this.consMod= .5;
	this.focus= "";
	this.focusnum= 0;
	this.winChance= 0;
	this.votes= 0;
	this.correctAnswers= 0;
	this.wrongAnswers= 0;
	this.lastMove= "None";
	this.raceNum = 1;
	this.genderNum = 1;
	this.bodyTypeNum = 1;
	this.headNum = 1;
};

function createSample(x)
{
	sample = [];
	for (var count= 0; count < x; count++){
		var scoreHolder = getScores();
		var holderStudent = new Student(groupList[scoreHolder[0]],  stuEconomic[scoreHolder[1]], majorList[scoreHolder[2]], scoreHolder[3], scoreHolder[4], scoreHolder[5], scoreHolder[6], scoreHolder[7])
		sample.push(holderStudent);
	}
}

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

function votePercentage(sampleSize)
{
	//console.log(candidates);
	createSample(sampleSize);
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

			//console.log(sample[i]);
			var fame = 0;
			fame = fameCalc(candidates[j], sample[i]);
			//console.log(candidates[j].name +" Fame: "+ fame);

			var issues = parseFloat(sample[i].tuitionScore) + parseFloat(candidates[j].issueScore[0]) + parseFloat(sample[i].athleticScore) + parseFloat(candidates[j].issueScore[1]) + parseFloat(sample[i].researchScore)+ parseFloat(candidates[j].issueScore[2])+ parseFloat(sample[i].eventScore)  + parseFloat(candidates[j].issueScore[3])+ parseFloat(sample[i].medicalScore) + parseFloat(candidates[j].issueScore[4]);
			//console.log(candidates[j].name +" Issue Score: "+ issues);

			var candWinPer = fame + (issues*sample[i].studentCaring) + candidates[j].consMod;
			//console.log(candidates[j].name +" Win Percentage: "+ candWinPer);
			//console.log("");


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
		//console.log("Student #" +i);
		//console.log("Winner: " + winner + " Vote Percentage: "+ winPercentage);
		//console.log("Loser: " + loser + " Vote Percentage: "+ lowPercentage);
		//console.log("");
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
	switch(student.ecoClass)
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
	switch(student.major)
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
	return fame/3;
}

function clearScreen()
{

	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	var prevTable = document.getElementById("table");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	prevTable.innerHTML = "<table id = 'tab' class='sortable'><thead id='tableHead'></thead><tbody id='pollTable'></tbody></table>";
}

function resetGame()
{
	tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
	pastPollChoices = [];
	pastPollResults = [];
	pastPollSizes = [];
	oppChoice = [];
	currentEvents = [];
	sample = [];
	candidates=[];
	playerCandidate = new CandidateCreate("ph","ph", "ph", "ph")
	opponentCandidate = new CandidateCreate("Liz", "Lizard", "Non-Binary", "Average");
}

//Allows you to view previous polls at any time.
function reportViewer(id)
{
	clearScreen();
	document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the User Action Area </button>";
	tableBuilder(pastPollChoices[id],pastPollResults[id],pastPollSizes[id],true);
}

//Calculates the results of each poll question from each student in the sample and stores them in an array
function pollCalc(pollChoices, sampleSize)
{
	votePercentage(sampleSize);
	//Gets the results of each question
	for(var j=0;j<sample.length;j++)
		{
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
				break;

				case "candFav":
					tableArrays[2].push(sample[j].results.win + " Score: " +sample[j].results.winPer.toFixed(2));
				break;

				case "candOpp":
					tableArrays[3].push(sample[j].results.los + " Score: " +sample[j].results.losPer.toFixed(2));
				break;

				case "major":
					tableArrays[4].push(sample[j].major);
				break;

				case "class":
					tableArrays[5].push(sample[j].ecoClass);
				break;

				case "group":
					tableArrays[6].push(sample[j].group);
				break;

				case "fame":
					tableArrays[7].push((fameCalc(candidates[0],sample[j])).toFixed(2));
				break;

				case "playTrust":
					tableArrays[8].push(candidates[0].consMod);
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
						break;

						case "issueathletic":
							tableArrays[10].push(parseFloat(sample[j].athleticScore).toFixed(2));
						break;

						case "issueresearch":
							tableArrays[11].push(parseFloat(sample[j].researchScore).toFixed(2));
						break;

						case "issueevents":
							tableArrays[12].push(parseFloat(sample[j].eventScore).toFixed(2));
						break;

						case "issuemedical":
							tableArrays[13].push(parseFloat(sample[j].medicalScore).toFixed(2));
						break;
					}
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candFame" + candidates[k].name)
				{
					var counter = 13 +k;
					tableArrays[counter].push(fameCalc(candidates[k],sample[j]));
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candTrust" + candidates[k].name)
				{
					var counter = 18 +k;
					tableArrays[counter].push(candidates[k].consMod);
				}
			}
		}
	}
	//console.log(tableArrays);
	tableBuilder(pollChoices, tableArrays, sampleSize,false);
}

//Builds a table by looping through the Array created by pollCalc and putting each value into a cell.
function tableBuilder(pollChoices, tableArray2, sSize, review)
{
	//console.log(tableArray2);
	var rowCounter = 0;
	var cellCounter = 0;
	var h = 0;


	var table = document.getElementById("pollTable");
	var tableHead = document.getElementById("tableHead");
	var headRow = tableHead.insertRow(0);
	console.log(tableHeaders);
	//Makes the table headers based on the chose questions
	for(var h = 0; h < pollChoices.length; h++)
	{
		switch(pollChoices[h])
		{
			case "issFav":
				var cell = headRow.insertCell(h);
				cell.innerHTML = tableHeaders[0];
			break;

			case "issOpp":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[1];
			break;

			case "candFav":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[2];
			break;

			case "candOpp":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[3];
			break;

			case "major":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[4];
			break;

			case "class":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[5];
			break;

			case "group":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[6];
			break;

			case "fame":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[7];
			break;

			case "playTrust":
					var cell = headRow.insertCell(h);
					cell.innerHTML = tableHeaders[8];
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
					break;

					case "issueathletic":
						var cell = headRow.insertCell(h);
						var posInfo = tableHeaders[9] + positions[1];
						cell.innerHTML = posInfo;
					break;

					case "issueresearch":
						var cell = headRow.insertCell(h);
						var posInfo = tableHeaders[9] + positions[2];
						cell.innerHTML = posInfo;
					break;

					case "issueevents":
						var cell = headRow.insertCell(h);
						var posInfo = tableHeaders[9] + positions[3];
						cell.innerHTML = posInfo;
					break;

					case "issuemedical":
						var cell = headRow.insertCell(h);
						var posInfo = tableHeaders[9] + positions[4];
						cell.innerHTML = posInfo;
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
			}
		}
		for(var k = 1;k<candidates.length;k++)
		{
			if(pollChoices[h] == "candTrust" + candidates[k].name)
			{
					var cell = headRow.insertCell(h);
					var candInfo = tableHeaders[11] + candidates[k].name;
					cell.innerHTML = candInfo;
			}
		}
	}

	for(var h = 0; h<sSize; h++)
	{
		row = table.insertRow(h);
		for(var i = 0; i < pollChoices.length+1 ;i++)
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

				case "major":
							var cell = row.insertCell(i);
							cell.innerHTML = tableArray2[4][h];
				break;

				case "class":
							var cell = row.insertCell(i);
							cell.innerHTML = tableArray2[5][h];
				break;

				case "group":
							var cell = row.insertCell(i);
							cell.innerHTML = tableArray2[6][h];
				break;

				case "fame":
							var cell = row.insertCell(i);
							cell.innerHTML = parseFloat(tableArray2[7][h]).toFixed(2);
				break;

				case "playTrust":
							var cell = row.insertCell(i);
							cell.innerHTML = parseFloat(tableArray2[8][h]).toFixed(2);
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
								cell.innerHTML = tableArray2[9][h];
						break;

						case "issueathletic":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[10][h];
						break;

						case "issueresearch":
							cell = row.insertCell(i);
							cell.innerHTML = tableArray2[11][h];
						break;

						case "issueevents":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[12][h];
						break;

						case "issuemedical":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[13][h];
						break;
					}
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candFame" + candidates[k].name)
				{
							var cell = row.insertCell(i);
							var counter = 13+k;
							cell.innerHTML = parseFloat(tableArray2[counter][h]).toFixed(2);
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candTrust" + candidates[k].name)
				{
							var cell = row.insertCell(i);
							var counter = 18+k;
							cell.innerHTML = parseFloat(tableArray2[counter][h]).toFixed(2);
				}
			}
		}
	}
	if(!review)
	{
		pastPollResults.push(tableArray2);
		pastPollSizes.push(sSize);
		pastPollChoices.push(pollChoices);
		tableArrays =  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
		pollTime(sSize, pollChoices);
	}
	sorttable.makeSortable(document.getElementById('tab'));
	document.getElementById("table").style.display = "block";
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
	remainingHours -= timeRequired;
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
	return (timeRequired < remainingHours);
}

function backtoUA()
{
	back = true;
	userAction();
}

function saveGameState()
{
   //Save contents of pastPollChoices into the text file
	for(var i=0; i<pastPollChoices.length;i++)
	{
		for(var j=0; j<pastPollChoices[i].length;j++)
		{
			textContents+=pastPollChoices[j].toString();
		}
		textContents+="\n";
	}
	textContents+="\n;";
	
    //Save contents of pastPollResults into the text file
	for(var i=0; i<pastPollResults.length;i++)
	{
		for(var j=0; j<pastPollResults[i].length;j++)
		{
			textContents+=pastPollResults[j].toString();
		}
		textContents+="\n";
	}
	textContents+="\n;";
	
	// Save contents of pastPollSizes   into the text file
	for(var i=0; i<pastPollSizes.length;i++)
	{
		textContents+=pastPollSizes[i].toString();
	}
	textContents+="\n;";
	
	//Save currentEvents
	for(var i=0; i<currentEvents.length;i++)
	{
		textContents+=currentEvents[i].toString();
	}
	textContents+="\n;";
	
	//Save candidates array
	for(var i=0; i<candidates.length;i++)
	{
		textContents+=candidates[i].toString();
	}
	textContents+="\n;";
	
	//Save remainingHours
	textContents+=remainingHours;
	
	//$.post('/saver', {saveData: textContents});
}
/* Back Button Prevention code */
function HandleBackFunctionality()
{
	
}

window.onload = startGame();


/* Console Disabling Code */

//Disable Console Logging
//window.console.log = function(){
//    console.error('The ability to view the console is disabled for security purposes.');
//    window.console.log = function() {
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
            console.log("%cWarning message", "font: 2em sans-serif; color: yellow; background-color: red;");
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
