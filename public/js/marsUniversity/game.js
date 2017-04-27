//making all the score presets
var groupList = ["socialite", "athlete", "gamer", "reader"];
var majorList = ["business", "law", "tech", "arts"];
var playerCandidate = new CandidateCreate("ph");
var opponentCandidate = new CandidateCreate("Karma");
var fakeCandidateHolder = []
var currentCandidateArrayHolder = []
var graphData = [];
var lastMinigame = 0; 
var isPoll = false;


var fakeCandidateYou = new CandidateCreate('FakeCandidate1');
var fakeCandidateOther = new CandidateCreate('FakeCandidate2');
fakeCandidateYou.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
fakeCandidateOther.fame = [1,1,1,1,1,1,1,1];
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

var dayCycleImage = ['day0','day1','day2','day3','day4','day5','day6','day7','day8','day9']


//scores go Socialite/Athlete/MediaLover/Researcher/Reader
//the score goes tuition, tuition var, athletic, athletic var, research, research var, events, events var, medical, issueScore[4]
var positions =
[
	"Lowering Tuition",
	"Increase Budget",
	"More School Functions",
	"Improve Medical Services"
];

var positionsLower = [
	"tuition",
	"budget",
	"functions",
	"medical"
];

var groupIssues = [
	[2,2,2,1,0,3,1,1,-1,2],
	[0,2,3,1,0,3,1,1,-1,2],
	[1,1,-1,2,1,2,3,1,-2,3],
	[-1,1,-1,1,2,2,3,1,0,4],
	[0,3,-2,2,0,2,1,3,3,1]
];

//goes Business/Engineering/Technology/Finearts/Liberalarts
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

//setting up some more variables

var turnCounter;
var population;
var sample;
var startHours;
var remainingHoursTotal;
var days;
var totalDays;
var remainingHoursDay;

var population = 1000;
var canvasMouse;
var images = new Array(30);
//starts the game
function startGame(){

	//whatever other things we have to do when initiaKarmaing the game here
	var date = Date.now();


	//Gets the questions and events from the Json
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
    
    preload(events);
}

function preload(actions) {
	for (i = 1; i < actions.length; i++) {
		images[i] = new Image()
		images[i].src = actions[i].path;
	}
}

/*GAME INTRO FUNCTIONS8*/
function splashScreen()
{
    //Shows the title screen
	clearScreen();
	document.getElementById("gameInfo").innerHTML = "<div id = 'intro' style = 'text-align:center; '><br><h1 >Welcome to Mars University! </h1><br><a onclick = 'startAnimatic()' id='index-link' class = 'btn double remove' >New Game</a><br><br><a onclick = 'loadGame()' id='index-link' class = 'btn double remove'>Continue</a><br><br><a onclick = 'startPractice()' id='index-link' class = 'btn double remove'>Practice</a></div>";
}

function startAnimatic()
{
    //Shows the animatic
	document.getElementById("gameInfo").innerHTML = "<p>Welcome to Mars University! <br></p> ";
    document.getElementById("gameInfo").innerHTML += "<center><video id = 'animatic' width='880' height='500' preload='auto' autoplay controls><source src='media/video/MascotAnimaticNEW.mov' type='video/mp4' ></video><button onclick = 'startCharacterSelect()'>Skip</button><center>";
    //document.getElementById("gameInfo").innerHTML += "</br> <a onclick = 'startCharacterSelect()' class = 'btn double remove'>Continue After Animatic Finish</a>";
    
    //Starts the character select after the animatic finishes
    document.getElementById('animatic').addEventListener('ended',myHandler,false);

    function myHandler(e) {
        startCharacterSelect();
    }

  
}

function startPractice()
{
    // Shows the practice screen menu
	clearScreen();
	practice = true;
	document.getElementById("gameInfo").innerHTML = "<div id = 'practice' style = 'text-align:center; '><br><h1 >Practice</h1><br><a onclick = 'practicePoll()' id='index-link' class = 'btn double remove'>Polling Tutorial</a><br><a onclick = 'practiceGame(1)' id='index-link' class = 'btn double remove'>Fun Run</a><br><a onclick = 'practiceGame(2)' id='index-link' class = 'btn double remove'>Photobomb</a><a onclick = 'practiceGame(3)' id='index-link' class = 'btn double remove'>Secret Sticker</a><br><a onclick = 'practiceGame(4)' id='index-link' class = 'btn double remove'>Mean Moves</a><a onclick = 'practiceGame(5)' id='index-link' class = 'btn double remove'>T-Shirt Canon</a></div> <br><a onclick = 'splashScreen()' id='index-link' class = 'btn double remove'>Return to Start Menu</a>"; 


}

function helpScreen()
{
    //Shows the Help screen 
	clearScreen();
	section = 1;
	document.getElementById("playerInfo").style.display = "none";
	document.getElementById("gameInfo").innerHTML = "<h1> Help</h1> <hr> <!--<button onclick= 'openGlossary()'>Glossary Page</button>--> <button onclick= 'tutorial("+true+")'>Start the Tutorial</button> <br><br><button class = 'logHelpEnd' onclick= 'userAction()'>Return to User Action Area</button>"
}
function pollMenu()
{
    //Shows the Poll Menu
    clearScreen();
    if(remainingHoursDay >=3)
    {
        document.getElementById("gameInfo").innerHTML += "<h2> Poll a Sample of the Population</h2> <button type='button' onclick='map("+0+",false,false)'> Take A Poll </button><br><br>";
        if(pastPollResults.length > 0)
            document.getElementById("gameInfo").innerHTML += "<h2> Previous Poll Results</h2>";
    }
    else
    {
        document.getElementById("gameInfo").innerHTML += "<h2> Poll</h2> <button type='button' > Cannot Take a Poll </button>";
        if(pastPollResults.length > 0)
            document.getElementById("gameInfo").innerHTML += "<h2> Previous Poll Results</h2>";
    }
    
    //Adds buttons for each poll that has been taken already
	for(var i=0; i<pastPollResults.length;i++)
	{
		var num = i+1;
		document.getElementById("gameInfo").innerHTML += "<button type='button' onclick='reportViewer("+i+")' >View Poll "+ num +" Result </button>";
    }
     document.getElementById("gameInfo").innerHTML += "<br><br><button onclick= 'userAction()'>Return to User Action Area</button>";
}
function trendReportMenu()
{
    //Sets up the trend report menu
	clearScreen();
	var currentTrendReports = [];
	document.getElementById("playerInfo").style.display = "none";
	document.getElementById("gameInfo").innerHTML = "<div id= 'reportButtons' > <h1> Trend Reports</h1> <hr><br><div><h2> General</h2><button onclick= 'trendReporter(`issFav`)' class = 'trendButton' id = 'issFav' disabled>Favored Issue Report</button><button onclick= 'trendReporter(`issOpp`)' class = 'trendButton' id = 'issOpp' disabled>Opposed Issue Report</button><button onclick= 'trendReporter(`candFav`)' class = 'trendButton' id = 'candFav' disabled>Favored Candidate Report</button><button onclick= 'trendReporter(`candOpp`)' class = 'trendButton' id = 'candOpp' disabled>Opposed Candidate Report</button></div><br><div><h2> Support For Issues</h2><button onclick= 'trendReporter(`issuetuition`)' class = 'trendButton' id = 'issuetuition' disabled>Lowering Tuition Report</button><button onclick= 'trendReporter(`issuebudget`)' class = 'trendButton' id = 'issuebudget' disabled>Increse Budget Report</button><button onclick= 'trendReporter(`issuefunctions`)' class = 'trendButton' id = 'issuefunctions' disabled>More School Functions Report</button><button onclick= 'trendReporter(`issuemedical`)' class = 'trendButton' id = 'issuemedical'  disabled>Improve Medical Services</button></div><br><div id = 'candReportsFame'><h2>Candidate Stats - Fame</h2></div><br><div id = 'candReportsTrust'><h2>Candidate Stats - Trust</h2></div>"
    document.getElementById("candReportsFame").innerHTML += "<button onclick= 'trendReporter(`fame`)' class = 'trendButton' id = 'fame' disabled>Fame - " + candidates[0].name +"</button>"
    
    //Disables the buttons that cooresponds to polls that havent been taken yet.
    for(var k = 1;k<candidates.length;k++)
	{
        var method = "candFame" + candidates[k].name;
		document.getElementById("candReportsFame").innerHTML += "<button onclick= 'trendReporter(`"+method+"`)' class = 'trendButton' id = '"+method+"' disabled>Fame - " + candidates[k].name +"</button>";
	}
    document.getElementById("candReportsTrust").innerHTML += "<button onclick= 'trendReporter(`playTrust`)' class = 'trendButton' id = 'playTrust' disabled>Trust - " + candidates[0].name +"</button>"
	for(var k = 1;k<candidates.length;k++)
	{
        var method = "candTrust" + candidates[k].name;
        document.getElementById("candReportsTrust").innerHTML += "<button onclick= 'trendReporter(`"+method+"`)' class = 'trendButton' id = '"+method+"' disabled>Trust - " + candidates[k].name +"</button>";
	}


     document.getElementById("gameInfo").innerHTML += "</div><br> <div id = 'trendArea' style = 'display:none'> <svg id='visualisation' width='800' height='450'><path id='segments-line' /><path id='gap-line' /><text font-family='sans-serif' font-size='20px'>Blah</text></svg> </div>";
      document.getElementById("gameInfo").innerHTML += "<hr>"
      for(var x =0; x < pastPollChoices.length; x++){
      	for(var y = 0; y < pastPollChoices[x].length; y++){
      		if(currentTrendReports.includes(pastPollChoices[x][y])){

      		}
      		else{
      			currentTrendReports.push(pastPollChoices[x][y])
      		}
      	}
      }
    var thing;
    var buttonHolder = document.getElementsByClassName('trendButton')

    for(var x = 0; x < buttonHolder.length; x++){
    	var idName = buttonHolder[x].getAttribute('id');   
    
    	for(var y =0; y < currentTrendReports.length; y++){
    	
    		if(currentTrendReports[y] == idName){    	
    			document.getElementById(idName).disabled = false;
    		}
    	}
    }
   	 document.getElementById("gameInfo").innerHTML += "<br>"
     document.getElementById("gameInfo").innerHTML += "<button id ='buttonViewer' style = 'display:none'>Choose Another Trend Report</button>";
     document.getElementById("gameInfo").innerHTML += "<button onclick= 'userAction()'>Return to User Action Area</button>";
}

function openGlossary()
{
    //Shows the glossary
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

//Creates the player candidate
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
	document.getElementById("gameInfo").innerHTML += "<p>You are competing against Karma the Chameleon and 4 other candidates for the potion of Student Council President. Karma is new student just like you, they call her the Chameleon, because she copies the people she is running against.... and also because, she is a Chameleon. The current student government will give you, a candidate, some information about the student body.</p>"
	document.getElementById("gameInfo").innerHTML += "<p>Do you wish to start the tutorial?</p>"
	document.getElementById("gameInfo").innerHTML += "<button onclick='tutorial("+false+")'>Yes</button><button onclick='actualSessionStart("+false+")'>No</button>";

}

//Sets the variables for game length and opposing candidates
function actualSessionStart(isFromTut){
	var tutHolder = isFromTut
	clearScreen();
	candidates = [];	
	population = 1000;
	sample = [];
    //10 Days
	//startHours = 120; 
    //7 Days
	startHours = 84; 
    
	remainingHoursTotal = startHours;
    totalDays = 7;
	days = 1; 
	remainingHoursDay = 12; 
	
	//Decides the opponents focus which cannot be the same as the player
	opponentCandidate.fame = [1,1,1,1,1,1,1,1];
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
	var issueCand2 = new CandidateCreate("Zrap Bannigan");
	issueCand2.focus = positions[1];
	issueCand2.focusnum = 1;
	chooseRank(issueCand2,chosenCandRanks,true);
	candidates.push(issueCand2);
	var issueCand3 = new CandidateCreate("Clamps");
	issueCand3.focus = positions[2];
	issueCand3.focusnum = 2;
	chooseRank(issueCand3,chosenCandRanks,true);
	candidates.push(issueCand3);
	var issueCand4 = new CandidateCreate("Martian Scientist");
	issueCand4.focus = positions[3];
	issueCand4.focusnum = 3;
	chooseRank(issueCand4,chosenCandRanks,true);
	candidates.push(issueCand4);	
	//map(0,true,true);
    bufferZone();
}
    function bufferZone()
    {
        clearScreen();
        document.getElementById("gameInfo").innerHTML += "<h1>First Poll</h1> <br><p>Ready to start your Campaign at Mars U? It's time to get that initial data from the Student Government. Let them know what questions you woukld like to know the answers to.</p>";
        document.getElementById("gameInfo").innerHTML += "<button onclick='map("+0+","+true+","+true+")'>Take Your First Poll</button>";
    }
//takes the player into a poll with fake candidates to test out polling
function practicePoll()
{
	

	candidates = [];
	
	population = 1000;
	sample = [];
	startHours = 84; 
	remainingHoursTotal = startHours;
	days = 1; 
	remainingHoursDay = 12; 
	
	//Decides the opponents focus which cannot be the same as the player
	opponentCandidate.fame = [1,1,1,1,1,1,1,1];
	opponentCandidate.consMod = 0;
	////console.log(oppFocus);
	chooseIssue(opponentCandidate,[],1,false);
	candidates.push(opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new CandidateCreate("Zrap Bannigan");
	var oppRank = Math.floor(Math.random()*4);
	issueCand1.focus = positions[oppRank];
	issueCand1.focusnum = oppRank;
	chooseRank(issueCand1,chosenCandRanks,true);
	candidates.push(issueCand1);

	
	map(2,false,false);
}

//Sets up the buttons for the intital statement the player makes in the game.
function firstStatement()
{
	clearScreen();
    document.getElementById("holo").src = "../../img/openscreenlarge.png";
	document.getElementById("gameInfo").innerHTML = "<p>First let's have your candidate pick their focus </p><br.<br>"
	for (var x=0; x < positions.length; x++){

	document.getElementById("gameInfo").innerHTML += "<button onclick = 'gameCycleStart("+x+")'>"+ positions[x]+"</button>"
	}
}

//Prompts the player to choose a difficulty setting for the game
function chooseDiff()
{
	clearScreen();
    document.getElementById("holo").src = "../../img/openscreenlarge.png";
	document.getElementById("gameInfo").innerHTML = "<p>Choose Your Dificulty.</p><br.<br>";
    document.getElementById("gameInfo").innerHTML += "<button onclick = setDiff("+9+")> Easy</button>";
    document.getElementById("gameInfo").innerHTML += "<button onclick = setDiff("+7+")> Normal</button>";
    document.getElementById("gameInfo").innerHTML += "<button onclick = setDiff("+5+")> Hard</button>";
}

//Sets the number of days and time remaining according to the players difficulty choice.
function setDiff(days)
{
	startHours = days*12; 
    remainingHoursTotal = startHours;
    totalDays = days;
    firstStatement();
}

/*GAME CYCLE FUNCTIONS8*/
function gameCycleStart(f)
{

	turnCounter = 1
	playerCandidate.focus = positions[f];
	playerCandidate.focusnum = f;
    
    //Increases issue score based on the players choice for their initial statement
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
	}
	candidates.splice(0,0,playerCandidate);
	
    //Displays the day barr based on the difficulty setting
	if(totalDays == 5)
		    document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/dayfive/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        else if(totalDays == 7)
            document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/dayseven/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        else if(totalDays == 9)
            document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/daynine/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        
	document.getElementById("playerInfo").innerHTML += "<h3> Day: " + days +"/" + totalDays + " </br> Remaining Hours Today: " + remainingHoursDay + "</h3><hr>";		
	userAction();
};

//Creates the area in which users decide what to do
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
    
    document.getElementById("playerInfo").innerHTML += "<div id = 'topPlayerArea'></div>"
  
    if(totalDays == 5)
		    document.getElementById("topPlayerArea").innerHTML += "<div style = 'float:right; padding-top:-100px'><h3 style = 'margin-top:8px'>Days Remaining</h3><img  src = '../../img/dayfive/"+dayCycleImage[days-1] +".png' width = '300px'/></div>"
        else if(totalDays == 7)
            document.getElementById("topPlayerArea").innerHTML += "<div style = 'float:right; padding-top:-100px'><h3>Days Remaining</h3><img src = '../../img/dayseven/"+dayCycleImage[days-1] +".png' width = '300px'/></div>"
        else if(totalDays == 9)
            document.getElementById("topPlayerArea").innerHTML += "<div style = 'float:right; padding-top:-100px'><h3 style = 'margin-top:8px'>Days Remaining</h3><img src = '../../img/daynine/"+dayCycleImage[days-1] +".png' width = '300px'/></div>"
	   document.getElementById("topPlayerArea").innerHTML += "<h3 style = 'margin-top:30px'>  Remaining Hours Today:   " + remainingHoursDay + "</h3>";		
    
	 document.getElementById("playerInfo").innerHTML +="<hr style = 'clear: right;'>"
	document.getElementById("Buttons").innerHTML += "<img height = '50' src = '../img/menu/takeapollicon.png'  onclick='pollMenu()' title = 'Polls'>                    </img>";
	document.getElementById("Buttons").innerHTML += "<img height = '50' src = '../img/menu/makeastatementiconNEW.png'  onclick='statement()' title = 'Statements'>                         </img>";
	document.getElementById("Buttons").innerHTML += "<img height = '50' src = '../img/menu/trendreport.png'  onclick='trendReportMenu()' title = 'Trend Reports'>                    </img>";
	document.getElementById("Buttons").innerHTML += "<img height = '50' src = '../img/menu/helpicon.png'  class = 'logHelp' onclick='helpScreen()' title = 'Help'></img>";
	//document.getElementById("Buttons").innerHTML += "<button  class='logEventEnd' onclick='gameCycleEnd()'> Skip to the End </button><br>";
	document.getElementById("gameInfo").innerHTML += "<h3 style = 'float: right'> Rival\'s Last Move: " + candidates[1].lastMove + "</h3>";
	//document.getElementById("choices").innerHTML += "<br>";
    
   
	

    
	c.addEventListener('mousemove', function(evt) {canvasMouse = getMousePos(c, evt);}, false);
	c.onmousedown = doMousedownMain;
	c.onmousemove = doMouseOver;
    
  
	mapbackground.onload = drawMap(false);
    
	currentEvents = [];
    document.getElementById("CommonsChoice").innerHTML += "<h2>Commons</h2>";
    document.getElementById("LabChoice").innerHTML += "<h2>Labs</h2>";
    document.getElementById("GymChoice").innerHTML += "<h2>Gym</h2>";
    document.getElementById("LibraryChoice").innerHTML += "<h2>Library</h2>";
	//Adds events to the cooresponding section based on their effect
	for(var i = 1;i<events.length;i++)
	{
		currentEvents.push(events[i]);
		var eventDescription = events[i].name + " - " + events[i].timeRequired;
		var arrayPos = events[i].id -1;
       switch(events[i].loc)
        {
            case "Com":
                document.getElementById("CommonsChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
            case "Lab":
                document.getElementById("LabChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
           break;
            case "Gym":
                document.getElementById("GymChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
            break;
            case "Lib":
               document.getElementById("LibraryChoice").innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
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
            
            document.getElementById("event").innerHTML += "<center><img src = '' id = 'eventbg' height = '350'   > </img></center>";
            document.getElementById("eventbg").src = chosenEvent.path;
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
					case "Arts":
						posText += "Arts Major";
					break;
					case "Bus":
						posText += "Business Major";
					break;
					case "Law":
						posText += "Law Major";
					break;
					case "Tech":
						posText += "Technology Major";
					break;

					case "Gam":
						posText += "Gamer Group";
					break;
					case "Soc":
						posText += "Socialite Group";
					break;
					case "Read":
						posText += "Reader Group";
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
					case "Arts":
						posText += "Arts Major";
					break;
					case "Bus":
						posText += "Business Major";
					break;
					case "Law":
						posText += "Law Major";
					break;
					case "Tech":
						posText += "Technology Major";
					break;

					case "Gam":
						posText += "Gamer Group";
					break;
					case "Soc":
						posText += "Socialite Group";
					break;
					case "Read":
						posText += "Reader Group";
					break;
					case "Ath":
						posText += "Athlete Group";
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
                                case "Arts":
                                    posText += "Arts Major";
                                break;
                                case "Bus":
                                    posText += "Business Major";
                                break;
                                case "Law":
                                    posText += "Law Major";
                                break;
                                case "Tech":
                                    posText += "Technology Major";
                                break;
            
                                case "Gam":
                                    posText += "Gamer Group";
                                break;
                                case "Soc":
                                    posText += "Socialite Group";
                                break;
                                case "Read":
                                    posText += "Reader Group";
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
                                case "Arts":
                                    posText += "Arts Major";
                                break;
                                case "Bus":
                                    posText += "Business Major";
                                break;
                                case "Law":
                                    posText += "Law Major";
                                break;
                                case "Tech":
                                    posText += "Technology Major";
                                break;
            
                                case "Gam":
                                    posText += "Gamer Group";
                                break;
                                case "Soc":
                                    posText += "Socialite Group";
                                break;
                                case "Read":
                                    posText += "Reader Group";
                                break;
                                case "Ath":
                                    posText += "Athlete Group";
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
					document.getElementById("event").innerHTML += "<input type='radio' name = 'option' id = " + chosenEvent.options[i].optionID + ">" + chosenEvent.options[i].optionName + " - " + chosenEvent.options[i].extraTime +" Additional Hours" +totalText+"<br> ";
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

	    if(totalDays == 5)
		    document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/dayfive/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        else if(totalDays == 7)
            document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/dayseven/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        else if(totalDays == 9)
            document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/daynine/"+dayCycleImage[days-1] +".png' width = '300px'/>"
	
	document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: right; margin-top:8px'>  Remaining Hours Today:   " + remainingHoursDay + "</h3><hr>";	votePercentage(1000,5);
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
	console.log(section +' tutorial')
	switch(section)
	{
		case 1:
		
		document.getElementById("gameInfo").innerHTML += "<h3>How To Play</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px;'>Hi, my name is Gui’De. I will help you find your way around Mars University. You’re a new student, and we need your help now. It’s time for the student president election and all the candidates won't do a good job. Are you interested in becoming president of the Student Council?</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"
		document.getElementById("gameInfo").innerHTML += "<br><button onclick='nextSection("+help+");' style='float: right;'>How to Win</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<button float = 'left' class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 2:
		document.getElementById("gameInfo").innerHTML += "<h3>How to Win</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>You can win by doing three things: <br>-Statements<br>-Polling<br>-StudentEvents</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>How To Play</button> <button onclick='nextSection("+help+");' style='float: right; text-decoration: underline;'>Statements</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 3:
		var term = 1;
		document.getElementById("gameInfo").innerHTML += "<h3>Statements</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'><img src = '../img/menu/makeastatementiconNEW.png'><br>Statements are where you focus on the issues at school. You can make a positive or negative statement on the issue. Make sure to stay on topic.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>How to Win</button> <button onclick='nextSection("+help+");' style='float: right;'>Issues</button>";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 4:
		document.getElementById("gameInfo").innerHTML += "<h3>Issues</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Here are the issues: <br><img src = '../img/issues.png' /></p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Statements</button> <button onclick='nextSection("+help+");' style='float: right;'>Student Events</button>";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 5:
		document.getElementById("gameInfo").innerHTML += "<h3>Student Events</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Student Events is how you get to know the population. Becoming more famous among groups to help get you elected.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Issues</button> <button onclick='nextSection("+help+");' style='float: right;'>Population - Majors</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 6:
		document.getElementById("gameInfo").innerHTML += "<h3>Population - Majors</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Here are the majors: <br><img src = '../img/majors.png' /></p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Student Events</button> <button onclick='nextSection("+help+");' style='float: right;'>Population - Social Events</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 7:
		document.getElementById("gameInfo").innerHTML += "<h3>Population - Social Events</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>Here are the social groups: <br><img src = '../img/interests.png' /></p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Population - Majors</button> <button onclick='nextSection("+help+");' style='float: right;'>Polling</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 8:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'><img src = '../img/menu/takeapollicon.png'><br>The last thing is Polling. You can see how the population feels about the candidates.You take polls in different areas which will have different biases. You can ask questions about issues, student groups, or the candidates. </p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Population - Social Events</button> <button onclick='nextSection("+help+");' style='float: right;'>Polling Reports</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 9:
		document.getElementById("gameInfo").innerHTML += "<h3>Polling Reports</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>You can go back and look at the previous polls in the poll area at any time. </p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Polling</button> <button onclick='nextSection("+help+");' style='float: right;'>Trend Reports</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		case 10:
		document.getElementById("gameInfo").innerHTML += "<h3>Trend Reports</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'><img src = '../img/menu/trendreport.png'><br>If you ask the same question more than once, it will appear on the trend report. A place where you can see the summary of all the graphs for that question.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Polling Reports</button> <button onclick='nextSection("+help+");' style='float: right;'>Practice Area</button> ";
		if(help)
			document.getElementById("gameInfo").innerHTML += "<br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
		break;
		
		case 11:
		document.getElementById("gameInfo").innerHTML += "<h3>Practice Area</h3><hr>";
		document.getElementById("gameInfo").innerHTML += "<div id = 'tutorialBubble'></div>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/speechbubble.png'/><p style='position:absolute;top:0; left:0; margin:10px; width:250px'>And that’s it. I said polls were important, so I've created a practice polling area where you can create polls and look at polling results. Try it out, but remember, the data is not real and does not represent the actual students. You can start your election at any time, and you can return here or go to one of the help pages I've created when you have questions.</p>"
		document.getElementById("tutorialBubble").innerHTML += "<img src = '../img/mascotstill.png' style = 'position:absolute; left:400'/>"	
		if(!help)
			document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Time</button> <button onclick='bufferZone()' style='float: right;'>Try Polling</button> ";
		else
			document.getElementById("gameInfo").innerHTML += "<button onclick='lastSection("+help+");' style='float: left;'>Time</button> <button onclick='map("+3+", false, false)' style='float: right;'>Try Polling</button> <br> <br> <button class = 'logHelpEndTutorial' onclick= 'userAction()'>Return to User Action Area</button>";
			
		break;
	}
}

//Displays the next tutorial section
function nextSection(help)
{
	section++; 
	tutorial(help);
}

//Displays the last tutorial section
function lastSection(help)
{
	section--; 
	tutorial(help);
}

//ELaborates on a highlighted term when clicked
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
	else if(isFree == false && isFirst == false && state !=2 )
    {
        if(totalDays == 5)
		    document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/dayfive/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        else if(totalDays == 7)
            document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/dayseven/"+dayCycleImage[days-1] +".png' width = '300px'/>"
        else if(totalDays == 9)
            document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: left; margin-top:8px'>Days Remaining</h3><img src = '../../img/daynine/"+dayCycleImage[days-1] +".png' width = '300px'/>"
            
	document.getElementById("playerInfo").innerHTML += "<h3 style = 'float: right; margin-top:8px'>  Remaining Hours Today:   " + remainingHoursDay + "</h3><hr>";	}
	if(state == 1||state == 2){
		currentCandidateArrayHolder = candidates;
		candidates = fakeCandidateHolder;
	}
    //Calculates poll time
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
    
    //Waits for the map to load before drawing on the canvas
    mapbackground.onload = drawMap(true);
	document.getElementById("questionArea").innerHTML +="<h4>Population & Sample</h4><br>";
	var buttonLabels = ["Quad", "Gym", "Lab", "Commons", "Library"];
	document.getElementById("questionArea").innerHTML += "<label>Location: </label><select id = 'location'></select><br>";
	for(x =0; x< buttonLabels.length; x++){
		document.getElementById("location").options.add(new Option(buttonLabels[x],x));
	}
	document.getElementById("questionArea").innerHTML += "<label>Sample Size: </label><select id = 'sample' class = 'sampleOptions totalTimeTracker'><br></select><br><label>Time Spent: </label><select id = 'timeSpent' class = 'sampleOptions'></select><hr>";
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

		//	document.getElementById("rooms").options.add(new Option("1 Room", 20));
		//if(remainingHoursDay> 5 )
		//	document.getElementById("rooms").options.add(new Option("2 Rooms", 40));
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
		document.getElementById("questionArea").innerHTML += "<br> <hr><button onclick = 'chooseDiff()'> Make your Initial Statement on an Issue </button>";
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

//Draws lines on the map around the buildings
function drawMap(poll)
{
	isPoll = poll
	//map icons
	var libraryIcon = new Image();
	libraryIcon.src = '../img/map/libraryicon.png';
	var quadIcon = new Image();
	quadIcon.src = '../img/map/icon.png';
	var gymIcon = new Image();
	gymIcon.src = '../img/map/gymicon.png';
	var commonsicon = new Image();
	commonsicon.src = '../img/map/commonsIcon.png';
	var labIcon = new Image();
	labIcon.src = '../img/map/labicon.png';

    var mapbackground = new Image();
    mapbackground.src = '../../img/map/mapMU600pxW.png';

	//peopleicons
	var tuitionIcon = new Image();
	tuitionIcon.src = '../img/icons/tuitionsquare.png';
	var sportsIcon = new Image();
	sportsIcon.src = '../img/icons/sportssquare.png';
	var researchIcon = new Image();
	researchIcon.src = '../img/icons/researchsquare.png';
	var socialIcon = new Image();
	socialIcon.src = '../img/icons/socialsquare.png';
	var medicalIcon = new Image();
	medicalIcon.src = '../img/icons/medicalsquare.png';
    
    var c=document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
    

	mapbackground.onload = function(){
			  ctx.drawImage(mapbackground, 0,0,600,414);
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
	if(isPoll)
		ctx.strokeRect(135,190,170,56);
    
	//library
	ctx.strokeRect(400,275,188,124);
    

    
	//media
	ctx.strokeRect(90,275,117,122);
	
	//draw icon

	    ctx.drawImage(libraryIcon, 435,270,113,75)
        ctx.drawImage(gymIcon, 475,50,113,75)
        ctx.drawImage(commonsicon, 90,285,113,75)
        ctx.drawImage(labIcon, 145,30,113,75)
            if(isPoll){

			ctx.drawImage(quadIcon, 160,160,113,75) 
			}
   
		}


}

//Sets the clickable zones on the map for polling
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
                document.getElementById("location").value = 1;
			}
			//gym2
			if((mouse.x >= 480 && mouse.x <=590 )&&(mouse.y >= 115 && mouse.y <= 235)){
                document.getElementById("location").value = 1;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 90 && mouse.x <= 205)&&(mouse.y >= 275 && mouse.y <= 395)){
                document.getElementById("location").value = 3;
			}
		
			//labs1
			if((mouse.x >= 150 && mouse.x <= 255)&&(mouse.y >= 15 && mouse.y <= 135)){
                document.getElementById("location").value = 2;
			}
			//labs2
			else if((mouse.x >= 180 && mouse.x <= 230)&&(mouse.y >= 225 && mouse.y <= 395)){
                document.getElementById("location").value = 2;
			}

			//coffee shop 
			
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 400 && mouse.x <= 590)&&(mouse.y >= 275 && mouse.y <= 400)){
                document.getElementById("location").value = 4;
			}
    }
    
//Sets the clickable zones on the map forthe user action area
 function doMousedownMain(c, e)
	{
		var mouse = canvasMouse;
		//check if the area is clickable
			//gym1
			if((mouse.x >= 360 && mouse.x <= 585)&&(mouse.y >= 15 && mouse.y <= 120)){
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:block';
                document.getElementById("CommonsChoice").style = 'display:none';
			}
			//gym2
			if((mouse.x >= 480 && mouse.x <=590 )&&(mouse.y >= 115 && mouse.y <= 235)){
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:block';
                document.getElementById("CommonsChoice").style = 'display:none';
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 90 && mouse.x <= 205)&&(mouse.y >= 275 && mouse.y <= 395)){
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CommonsChoice").style = 'display:block';
			}
		
			//labs1
			if((mouse.x >= 150 && mouse.x <= 255)&&(mouse.y >= 15 && mouse.y <= 135)){
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:block';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CommonsChoice").style = 'display:none';
			}
			//labs2
			else if((mouse.x >= 180 && mouse.x <= 230)&&(mouse.y >= 225 && mouse.y <= 395)){
                document.getElementById("LibraryChoice").style = 'display:none';
                document.getElementById("LabChoice").style = 'display:block';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CommonsChoice").style = 'display:none';
			}

			//coffee shop 
			
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 400 && mouse.x <= 590)&&(mouse.y >= 275 && mouse.y <= 400)){
                document.getElementById("LibraryChoice").style = 'display:block';
                document.getElementById("LabChoice").style = 'display:none';
                document.getElementById("GymChoice").style = 'display:none';
                document.getElementById("CommonsChoice").style = 'display:none';
			}
    }
//Fills the zone over the building that the mouse if hovering over
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
						
			//gym1
			if((mouse.x >= 360 && mouse.x <= 585)&&(mouse.y >= 15 && mouse.y <= 120)){
                
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
       
            var gymIcon = new Image();
            gymIcon.src = '../img/map/gymicon.png';
            var commonsicon = new Image();
            commonsicon.src = '../img/map/commonsIcon.png';
            var labIcon = new Image();
            labIcon.src = '../img/map/labicon.png';
            quadIcon = new Image();
			quadIcon.src = '../img/map/icon.png';
     		
            
            //draw icon

            ctx.drawImage(libraryIcon, 435,270,113,75)
            ctx.drawImage(gymIcon, 475,50,113,75)
            ctx.drawImage(commonsicon, 90,285,113,75)
            if(isPoll){
            	   if((mouse.x >= 135 && mouse.x <= 300)&&(mouse.y >= 190 && mouse.y <= 250)){ 
             
                ctx.fillRect(135,190,170,56); 
      } 
            	ctx.strokeRect(135,190,170,56);
			ctx.drawImage(quadIcon, 160,160,113,75) 
			}
            ctx.drawImage(labIcon, 145,30,113,75)
          
	}
    

    //Draws lines on the map around the buildings
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
        
 
        
        //library
        ctx.strokeRect(400,275,188,124);

        
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
				candidates[0].budPos += 1;
			}
			else if(currentStatement == 3){
				candidates[0].medPos += 1;
			}
			else if(currentStatement == 2){
				candidates[0].funcPos += 1;
			}
		}
		//if negative statement
		else{
		
				candidates[0].issueScore[currentStatement] -= 0.2;
				if(currentStatement == 0){
					candidates[0].tuitNeg += 1;
				}
				else if(currentStatement == 1){
					candidates[0].budNeg += 1;
				}
				else if(currentStatement == 3){
					candidates[0].medNeg += 1;
				}
			else if(currentStatement == 2){
				candidates[0].funcNeg += 1;
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
	
		if(candidates[0].budPos>0 || candidates[0].budNeg>0){
			athCond = (Math.min(candidates[0].budPos, candidates[0].budNeg))/(candidates[0].budPos+candidates[0].budNeg);
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
	
		if(candidates[0].funcPos>0 || candidates[0].funcNeg>0){
			eventCond = (Math.min(candidates[0].funcPos, candidates[0].funcNeg))/(candidates[0].funcPos+candidates[0].funcNeg);
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

//repeats the statement at a lowered effect for Karma
function statementCalcOtherCandidate(x){
	var currentStatement = document.getElementById("statements").value;
	var currentPosNeg = document.getElementById("posneg").value;

	if(currentPosNeg == 0){
		candidates[x].issueScore[currentStatement] += 0.75;
		if(currentStatement == 0){
			candidates[x].tuitPos += 1;
		}
		else if(currentStatement == 1){
			candidates[x].budPos += 1;
		}
		else if(currentStatement == 3){
			candidates[x].medPos += 1;
		}
		else if(currentStatement == 2){
			candidates[x].funcPos += 1;
		}
	}
	else{
		if(currentPosNeg == 1){
			//candidates[x].issueScore[currentStatement] -= 0.75;
			if(currentStatement == 0){
				candidates[x].tuitNeg += 1;
			}
			else if(currentStatement == 1){
				candidates[x].budNeg += 1;
			}
			else if(currentStatement == 3){
				candidates[x].medNeg += 1;
			}
            else if(currentStatement == 2){
			candidates[x].funcNeg += 1;
			}
		}
	}
	candidates[x].lastMove = "Statement";
}

//Displays the result of a poll immediately after it end and then saves the report for later viewing
function pollResults(state, isFirst, isFree)
{

	var bias = document.getElementById('location').value;
	
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

	if(duplicate)
    {
		document.getElementById("questionArea") += "<p> Duplicate Question Detected </p>"
	}
    else
    {
		document.getElementById("event").style.display = "none";
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
                document.getElementById("next").innerHTML += "<button onclick = 'chooseDiff()'> Make your Initial Statement on an Issue </button>";
    
        }
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

			case "Gam":
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

			case "Read":
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

			case "Bus":
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

			case "Law":
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

			case "Tech":
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

			case "Arts":
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

			case "budget":
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

			case "functions":
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

			case "medical":
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

			case "Gam":
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

			case "Read":
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

			case "Bus":
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

			case "Law":
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

			case "Tech":
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

			case "Arts":
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

			case "budget":
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

			case "functions":
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

			case "medical":
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

			case "Fame":

				break;

			case "Opp Focus":

				break;

			case "Opp Fame":

				break;

		}
	////console.log(candidates[0].issueScore);
	}
}

//sample person
function Student(group, major, tuitionScore, budgetScore, functionScore, medicalScore)
{
	this.group = group;
	this.major = major;
	this.budgetScore = budgetScore;
	this.tuitionScore = tuitionScore ;
	this.functionScore = functionScore;
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
	this.fame= [0,0,0,0,0,0,0,0];
	this.issueScore= [0,0,0,0];
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
	this.budPos= 0;
	this.budNeg= 0;
	this.medPos= 0;
	this.medNeg= 0;
	this.funcPos= 0;
	this.funcNeg= 0;
};

//Creates a smaple full of randomly generated students
function createSample(x, bias)
{
	sample = [];
	for (var count= 0; count < x; count++){
		var scoreHolder = getScores(x, bias);
		var holderStudent = new Student(groupList[scoreHolder[0]], majorList[scoreHolder[1]], scoreHolder[2], scoreHolder[3], scoreHolder[4], scoreHolder[5])
		sample.push(holderStudent);
	}
}

//Randomly generates the stats for a student
function getScores(x, bias){

	var groupRandom;

	if(bias > 0){
		var coinFlip = Math.floor(Math.random())
		if(coinFlip == 1){
					groupRandom = bias;

				}

		else{
					groupRandom = Math.floor(Math.random()* 4);

					while(groupRandom == bias){
						groupRandom = Math.floor(Math.random()* 4);
					}
		}
	}
	else{
		groupRandom = Math.floor(Math.random()* 4);
	}
	var majorRandom = Math.floor(Math.random()* 4);
	var ath =0;
	var res = 0;
	var tuit = 0;
	var med = 0;
	var event = 0;
	//SCORE calculated by (group issue + variable) + (major issue + variable)  + (class issue + variable)
	tuit = (((groupIssues[groupRandom][0]) + (Math.floor(Math.random() * (groupIssues[groupRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][0]) + (Math.floor(Math.random() * (groupIssues[majorRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	bud =  (((groupIssues[groupRandom][2]) + (Math.floor(Math.random() * (groupIssues[groupRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][2]) + (Math.floor(Math.random() * (groupIssues[majorRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	event =  (((groupIssues[groupRandom][6]) + (Math.floor(Math.random() * (groupIssues[groupRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][6]) + (Math.floor(Math.random() * (groupIssues[majorRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) ;
	med =  (((groupIssues[groupRandom][8]) + (Math.floor(Math.random() * (groupIssues[groupRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((majorIssues[majorRandom][8]) + (Math.floor(Math.random() * (groupIssues[majorRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1));

	 tuit = tuit/2;
     bud = bud/2;
     event = event/2;
     med = med/2;

     tuit = tuit.toFixed(2);
     bud = bud.toFixed(2);
     event = event.toFixed(2);
     med = med.toFixed(2);


	var returnArray = [groupRandom, majorRandom, tuit, bud, event, med];
	return returnArray;
}

//Calculates the candidate who would recieve the vote for each student 
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
				issues += parseFloat(sample[i].budgetScore) * parseFloat(candidates[j].issueScore[1])
				issues += parseFloat(sample[i].functionScore)* parseFloat(candidates[j].issueScore[2])
				issues += parseFloat(sample[i].medicalScore)  * parseFloat(candidates[j].issueScore[3])
				issues = issues/4;
			}
			else
			{
				var issues = parseFloat(sample[i].tuitionScore) * parseFloat(candidates[j].issueScore[0])
				issues += parseFloat(sample[i].budgetScore) * parseFloat(candidates[j].issueScore[1])
				issues += parseFloat(sample[i].functionScore)* parseFloat(candidates[j].issueScore[2])
				issues += parseFloat(sample[i].medicalScore)  * parseFloat(candidates[j].issueScore[3])
				issues = issues/4;
			}
			////console.log(candidates[j].name +" Issue Score: "+ issues);
			//console.log(candidates[j].name + " Issues:"  + issues)
			if(candidates[j].name != "Karma")
			{
				var candWinPer = 10*Math.pow(fame*issues,2) - candidates[j].consMod;
			}
			else
			{
                if(totalDays>5)
                {
                    var candWinPer = 10*0.4*issues;
                }
                else
                {
                    var candWinPer = 10*0.35*issues;
                }
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
    
	}
	switch(student.major)
	{
		case majorList[0]:

		fame+= cand.fame[4];
		break;

		case majorList[1]:
	
		fame+= cand.fame[5];
		break;

		case majorList[2]:

		fame+= cand.fame[6];
		break;

		case majorList[3]:

		fame+= cand.fame[7];
		break;

	}
	return fame/4;
}

//Clears the previous screen
function clearScreen()
{

	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	var prevTable = document.getElementById("table");
	document.getElementById('next').innerHTML = "";

	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "<div id = 'Buttons' style = 'display:block;'><div id = 'Header' style = 'display:block;'> </div></div><div id = 'LabChoice' style = 'display:none;'></div><div id = 'GymChoice' style = 'display:none;'></div><div id = 'CommonsChoice' style = 'display:block;'> </div><div id = 'LibraryChoice' style = 'display:none;'></div><div id = 'map' style = 'display:block;'></div><div id = 'eventInput' style = 'display:block;'></div>";
	prevEvent.innerHTML = "";
	prevTable.innerHTML = "<table id = 'tab' class='sortable'><thead id='tableHead'></thead><tbody id='pollTable'></tbody></table>";
}

//Resets the game to the characters select screen.
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
	var opponentCandidate = new CandidateCreate("Karma");
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
	//graphData.push(questions[5].graph.split(','));
	graphData.push(questions[6].graph.split(','));

	var pollLabelArray = [];
	pollLabelArray.push(questions[4].labels.split(','));
	//pollLabelArray.push(questions[5].labels.split(','));
	pollLabelArray.push(questions[6].labels.split(','));
    //Goes through each question selected, exapnds the size of graphData by one and pushes the label into the pollLabelArray
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
	//Gets the results of each question and pushes them into the proper sectionof table arrays
	for(var j=0;j<sample.length;j++)
	{
		tableArrays[4].push(sample[j].major);
		var majorHolder = sample[j].major;
		if(majorHolder == "business"){
			graphData[0][0]++;
		}
		else if(majorHolder == "law"){
			graphData[0][1]++;
		}
		else if(majorHolder == "tech"){
			graphData[0][2]++;
		}
		else if(majorHolder == "arts"){
			graphData[0][3]++;
		}

		tableArrays[6].push(sample[j].group);
		var groupHolder = sample[j].group;
		if(groupHolder == "socialite"){
			graphData[1][0]++;
		}
		else if(groupHolder == "athlete"){
			graphData[1][1]++;
		}
		else if(groupHolder == "gamer"){
			graphData[1][2]++;
		}
		else if(groupHolder == "reader"){
			graphData[1][3]++;
		}
    
        for(var i = 0; i < pollChoices.length ;i++)
        {
            //console.log(i)
            switch(pollChoices[i])
            {
                case "issFav":
                    var fav =0;
                    var favName = "";
                    if(fav < sample[j].budgetScore ||fav==0)
                    {
                        fav = sample[j].budgetScore;
                        var favName = "Budget";
                    }
                    if(fav < sample[j].tuitionScore ||fav==0)
                    {
                        fav = sample[j].tuitionScore;
                        var favName = "Tuition";
                    }
                    if(fav < sample[j].functionScore ||fav==0)
                    {
                        fav = sample[j].functionScore;
                        var favName = "Functions";
                    }
                    if(fav < sample[j].medicalScore ||fav==0)
                    {
                        fav = sample[j].medicalScore;
                        var favName = "Medical";
                    }
                tableArrays[0].push(favName);
                //find if fave
                if(favName == "Tuition"){
                    graphData[i+2][0]++;
                }
                else if(favName == "Budget"){
                    graphData[i+2][1]++;
                }
                else if(favName == "Functions"){
                    graphData[i+2][2]++;
                }
                else if(favName == "Medical"){
                    graphData[i+2][3]++;
                }
    
                break;
    
                case "issOpp":
                    var opp =0;
                    var oppName = "";
                    if(opp > sample[j].budgetScore ||opp==0)
                    {
                        opp = sample[j].budgetScore;
                        var oppName = "Budget";
                    }
                    if(opp > sample[j].tuitionScore ||opp==0)
                    {
                        opp = sample[j].tuitionScore;
                        var oppName = "Tuition";
                    }
                    if(opp > sample[j].functionScore ||opp==0)
                    {
                        opp = sample[j].functionScore;
                        var oppName = "Functions";
                    }
                    if(opp > sample[j].medicalScore ||opp==0)
                    {
                        opp = sample[j].medicalScore;
                        var oppName = "Medical";
                    }
                tableArrays[1].push(oppName);
                //find if oppe
                if(oppName == "Tuition"){
                    graphData[i+2][0]++;
                }
                else if(oppName == "Budget"){
                    graphData[i+2][1]++;
                }
                else if(oppName == "Functions"){
                    graphData[i+2][2]++;
                }
                else if(oppName == "Medical"){
                    graphData[i+2][3]++;
                }
    
                break;
    
                case "candFav":
                    tableArrays[2].push(sample[j].results.win + " Score: " +sample[j].results.winPer.toFixed(2));
                    for(var k =0; k< candidates.length;k++)
                    {
                        if(sample[j].results.win == candidates[k].name){
                            graphData[i+2][k]++;
                        }
                    }
                break;
    
                case "candOpp":
                    ////console.log(sample[j].results);
                    tableArrays[3].push(sample[j].results.los + " Score: " +sample[j].results.losPer.toFixed(2));
                    for(var k =0; k< candidates.length;k++)
                    {
                        if(sample[j].results.los == candidates[k].name){
                            graphData[i+2][k]++;
                        }
                    }
                break;
    
    
    
                case "fame":
                    var playFame = fameCalc(candidates[0],sample[j]).toFixed(3);
                    tableArrays[7].push(playFame);
                    if(playFame > 0.69){
                        graphData[i+2][0]++;
                    }
                    else if(playFame > 0.36){
                        graphData[i+2][1]++;
                    }
                    else{
                        graphData[i+2][2]++;
                    }
                break;
    
                case "playTrust":
                    tableArrays[8].push(candidates[0].consMod);
                    var playConst = candidates[0].consMod;
                    if(playConst > 0.69){
                        graphData[i+2][2]++;
                    }
                    else if(playConst > 0.36){
                        graphData[i+2][1]++;
                    }
                    else{
                        graphData[i+2][0]++;
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
                                graphData[i+2][0]++;
                            }
                            else if(sample[j].tuitionScore >=-1){
                                graphData[i+2][1]++;
                            }
                            else{
                                graphData[i+2][2]++;
                            }
                        break;
    
                        case "issuebudget":
                            tableArrays[10].push(parseFloat(sample[j].budgetScore).toFixed(2));
                            if(sample[j].budgetScore>=2){
                                graphData[i+2][0]++;
                            }
                            else if(sample[j].budgetScore >=-1){
                                graphData[i+2][1]++;
                            }
                            else{
                                graphData[i+2][2]++;
                            }
                        break;
    
                        case "issuefunctions":
                            tableArrays[12].push(parseFloat(sample[j].functionScore).toFixed(2));
                            if(sample[j].functionScore >=2){
                                graphData[i+2][0]++;
                            }
                            else if(sample[j].functionScore >=-1){
                                graphData[i+2][1]++;
                            }
                            else{
                                graphData[i+2][2]++;
                            }
                        break;
    
                        case "issuemedical":
                            tableArrays[13].push(parseFloat(sample[j].medicalScore).toFixed(2));
                            if(sample[j].medicalScore >=2){
                                graphData[i+2][0]++;
                            }
                            else if(sample[j].medicalScore >=-1){
                                graphData[i+2][1]++;
                            }
                            else{
                                graphData[i+2][2]++;
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
                        graphData[i+2][0]++;
                    }
                    else if(calcHolder > 0.33){
                        graphData[i+2][1]++;
                    }
                    else{
                        graphData[i+2][2]++;
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
                        graphData[i+2][2]++;
                    }
                    else if(candidates[k].consMod > 0.33){
                        graphData[i+2][1]++;
                    }
                    else{
                        graphData[i+2][0]++;
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
        document.getElementById("holo").src = "../../img/holoPadSize2.png";
    }
    else{document.getElementById("holo").src = "../../img/HolopadSize3.png";}
    
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
				//graphQuestions.push("class");
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

						case "issuebudget":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[1];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuebudget");
						break;

						case "issuefunctions":
							var cell = headRow.insertCell(h);
							var posInfo = tableHeaders[9] + positions[3];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuefunctions");
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

				//var cell = headRow.insertCell(1);
				//cell.innerHTML = tableHeaders[5];

				var cell = headRow.insertCell(1);
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
										cell.innerHTML = "Not Trustworthy Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[8][h]).toFixed(2)>0.33 && parseFloat(tableArray2[8][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Sort Of Trustworthy Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Very Trustworthy Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
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

							case "issuebudget":
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


							case "issuefunctions":
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
									cell.innerHTML = "Not Trustworthy Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.33 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.66)
								{
									cell.innerHTML = "Sort Of Trustworthy Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else
								{
									cell.innerHTML = "Very Trustworthy Score: " + parseFloat(tableArray2[counter][h]).toFixed(2);
								}		
					}

					canCounter++;

				}
			}
		}

		var cell = row.insertCell(0);
		cell.innerHTML = tableArray2[4][h];

		//var cell = row.insertCell(1);
		//cell.innerHTML = tableArray2[5][h];

		var cell = row.insertCell(1);
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
		if(i==1){
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

			case "issuebudget":
				name = 	"Increase Budget";
				document.getElementById("q"+i+"text").innerHTML = questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = questions[9].question + " " + name;
			break;


			case "issuefunctions":
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

        //Creates the bar graphs based on the questions
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
        
        var dataset =  [];
        for (var k = 0; k < graphData[i].length; k++)
        {			
            dataset.push ({label: graphLabels[i][k], count: graphData[i][k]})
		}
        //console.log(dataset)
        
        //Creates the pie charts based on the questions
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
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);
        
        arcs.append("svg:text")
        
        arcs.append("svg:text")
        .attr("dy", ".25em")
        //.attr("text-anchor", "middle")
        .attr("x", function(d, i) 
        {return width/2 + 30;})
        .attr("y", function(d, i) { return -50 + i*15; } )
        .style("fill", function(d, i) { return color(i); } )
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

//Changes the way that data is represented on the poll results screen
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
	return (timeRequired <= remainingHoursDay);
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
		textContents+=candidates[i].budPos;
			textContents+="*";
		textContents+=candidates[i].budNeg;
			textContents+="*";
		textContents+=candidates[i].resPos;
			textContents+="*";
		textContents+=candidates[i].resNeg;
			textContents+="*";
		textContents+=candidates[i].medPos;
			textContents+="*";
		textContents+=candidates[i].medNeg;
			textContents+="*";
		textContents+=candidates[i].funcPos;
			textContents+="*";
		textContents+=candidates[i].funcNeg;

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
    
	//Saves Total Number of Days
	textContents+=totalDays;
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
		cand.budPos = parseInt(candAtts[i][17]);
		cand.budNeg = parseInt(candAtts[i][18]);
		cand.resPos = parseInt(candAtts[i][19]);
		cand.resNeg = parseInt(candAtts[i][20]);
		cand.medPos = parseInt(candAtts[i][21]);
		cand.medNeg = parseInt(candAtts[i][22]);
		cand.funcPos = parseInt(candAtts[i][23]);
		cand.funcNeg = parseInt(candAtts[i][24]);



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

    
	//Game Over Boolean
	if(saveArray[10] == "true")
    {
        gameOver = true;
    }
    else
    {
        gameOver = false;
    }
	
	//Total Number of Days
	totalDays = parseInt(saveArray[11]);
    
	back=true;
	saveState = "";
    preload(events);
	hourChecker();

}

//Updates the Game Session
function getSession(gameOver)
{
	//Takes the Whole data and splits it into sections
	var saveArray = saveState.split("~");
	console.log(saveArray[9])
	console.log(saveArray[9] !=[] && saveArray[9] != "NaN" && saveArray[9] != undefined && saveArray[9] != "")

	if(!gameOver){
    	//console.log(saveArray[9] == "NaN")
    	if(saveArray[9] !=[] && saveArray[9] != "NaN" && saveArray[9] != undefined && saveArray[9] != "")
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

//Chooses what issue each candidate represents
function chooseIssue(candidate, chosenIssues, issueVal, issueCand)
{
	var counter;
	oppChoice=[0,1,2,3];

	for(var i =0; i <chosenIssues.length;i++)
	{
		oppChoice.splice(oppChoice.indexOf(chosenIssues[i]),1);
	}


	//Decides the opponents focus which cannot be the same as the player
	var oppFocus = Math.floor(Math.random()*(4-chosenIssues.length));
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
	}

	if(issueCand)
	{
		chosenCandRanks.push(oppChoice[oppFocus]);
	}
}

//Chooses how well the candidate ranks
function chooseRank(candidate, chosenRanks, issueCand)
{
	var counter;
	oppChoice=[0,1,2,3];
	
	for(var i =0; i <chosenRanks.length;i++)
	{
		oppChoice.splice(oppChoice.indexOf(chosenRanks[i]),1);
	}
	
	
	//Decides the opponents focus which cannot be the same as the player
	var oppRank = Math.floor(Math.random()*(4-chosenRanks.length));
	switch(oppChoice[oppRank])
	{
		case 0:
			candidate.fame = [1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6];
			candidate.consMod = 0.25;
			candidate.issueScore[candidate.focusnum] = 3;
		break;
		case 1:
			candidate.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
			candidate.consMod = 0.30;
			candidate.issueScore[candidate.focusnum] = 2.75;
		break;
		case 2:
			candidate.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
			candidate.consMod = 0.35;
			candidate.issueScore[candidate.focusnum] = 2.5;
		break;
		case 3:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.45;
			candidate.issueScore[candidate.focusnum] = 2.5;
		break;
		case 4:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.50;
			candidate.issueScore[candidate.focusnum] = 2.25;
		break;
	}
	
	if(issueCand)
	{
		chosenRanks.push(oppChoice[oppRank]);
	}
}

//Gets the posiiton of the mouse relative to the canvas
function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
	x: evt.clientX - rect.left,
	y: evt.clientY - rect.top
	};
}

//Shows the results of a minigame after it's completed
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
		
				case "Arts":
					posText += "Arts Major";
				break;
		
				case "Bus":
					posText += "Business Major";
				break;
				case "Law":
					posText += "Law Major";
				break;
				case "Tech":
					posText += "Technology Major";
				break;
		
				case "Soc":
					posText += "Socialite Group";
		
				break;
				case "Read":
					posText += "Reader Group";
		
				break;
				case "Gam":
					posText += "Gamer Group";
		
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
     	$.post('/game/loggerMinigame', {minigameID: lastMinigame, score: scoreToLog, module: '1', session: gameSession });
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

//Creates a trend report based on past polls
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
        //removes the first 2 answers from each pastGraph data
        tempGraphData.splice(0,2);
        
        //GOes through each question choesn by the player
        for(var j =0; j< pastPollChoices[i].length; j++)
        {
            //Sets the labels using the past poll data
            if(category == pastPollChoices[i][j])
            {
                questions.forEach( function(element)
                {
                    if(element.value == category)
                    {
                        answers = element.labels.split(",")
                        if(element.value == "candFav" ||element.value == "candOpp")
                        {
                            answers = [];
                            candidates.forEach(function(element2)
                            {
                            	answers.push(element2.name);
                            	//console.log(answers);
                            });
                        }
                    }
                    else if(element.value == category.substring(0,5))
                    {
                        answers = element.labels.split(",")
                    }
                });
                var tempGraphTotal = 0;

                for(var x =0; x < tempGraphData[j].length; x++){
                	tempGraphTotal = tempGraphTotal + tempGraphData[j][x]
                }

                
                
                //For each answer to the current question pushes the count of people who had this answer into a cooresponding array
                for (var k =0; k< tempGraphData[j].length; k++)
                {

                    switch(k)
                    {
                        case 0:
                        data0.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
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
                            count: (tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                     
                        break;
                        case 2:
                        data2.push(
                        {
                            count: (tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                       
                        break;
                        case 3:
                        data3.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                     
                        break;
                        case 4:
                        data4.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 5:
                        data5.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 6:
                        data6.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                    }
                }
            }
        
        }
    }
    
    //Creates the trend report using the data from the questions
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
    yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 100]),
    
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
        if(data1.length > 0)
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
        if(data2.length > 0)
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
        if(data3.length > 0)
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
        if(data4.length > 0)
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
        if(data5.length > 0)
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
        if(data6.length > 0)
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

//Checks whether or not the time is up in a day and if so advances it.
function hourChecker()
{

	if (days < totalDays)
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
