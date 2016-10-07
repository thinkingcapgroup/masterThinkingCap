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
	

var currentEvents = [];
var sample = [];
var events=[];
var questions=[];
var candidates=[];

var turnCounter;
var population;
var sample;
var startHours; 
var remainingHours;
var population = 1000;


//Starts the game
function startGame(){
	hours = 60;
	playerCandidate.fame = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	//whatever other things we have to do when initializing the game here
	console.log("Game initialized and loaded!");
	
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
	//character creator here
	//for right now we'll do a drop down option

	document.getElementById("gameInfo").innerHTML = "<h1>Character Creation</h1>";
	document.getElementById("gameInfo").innerHTML += "<label>Candidate Name: </label><input id='charName' type='text' /><br>";
	document.getElementById("gameInfo").innerHTML += "<label>Race: </label><select id='charRace'><option>Human</option><option>Martian</option><option>Android</option></select><br>";
	document.getElementById("gameInfo").innerHTML += "<label>Gender: </label><select id='charGender'><option>Male</option><option>Female</option><option>Non-binary</option></select><br>";
	document.getElementById("gameInfo").innerHTML += "<label>Body Type: </label><select id='charBody'><option>Slim</option><option>Average</option><option>Heavy</option></select><br>";
	document.getElementById("gameInfo").innerHTML += "<button onclick='startOtherCandidates()'>Create Character</button><br>";

}

function startOtherCandidates(){
	playerCandidate.name = document.getElementById("charName").value;
	playerCandidate.race = document.getElementById("charRace").value;
	playerCandidate.gender = document.getElementById("charGender").value;
	playerCandidate.bodyType = document.getElementById("charBody").value;
	candidates.push(playerCandidate);
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
	startHours = 336; 
	remainingHours = startHours;
	turnCounter = 1
	playerCandidate.focus = positions[f];
	playerCandidate.focusnum = f;
	
	//Decides the opponents focus which cannot be the same as the player
	while(opponentCandidate.focus == "")
	{
		var oppFocus = Math.random(0,4);
			if(oppFocus != f)
			{
				opponentCandidate.focus = positions[oppFocus];
				opponentCandidate.focusnum = oppFocus;
			}
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
	currentEvents = [];
	
	//Build User Action Area buttons
	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + playerCandidate.focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours: " + remainingHours + "</h3>";	
	for(var i=0; i<pastPollResults.length;i++)
	{
		var num = i+1;
		document.getElementById("choices").innerHTML += "<button type='button' onclick='reportViewer("+i+")' >View Poll "+ num +" Result </button>";
	}
	document.getElementById("choices").innerHTML += "<button type='button'  onclick='poll()'> Take A Poll </button>";
	document.getElementById("gameInfo").innerHTML += "<h4> Opponent\'s Last Move:" + opponentCandidate.lastMove + "</h4>";
	document.getElementById("choices").innerHTML += "<br>";
	

	
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
			document.getElementById("choices").innerHTML += "<button onclick='action( "+ arrayPos+" )'>" + eventDescription + " hours </button>";
		}
		else
		{
			i--;
		}
	}
	
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
	
	if(chosenEvent.type=="minigame")
	{
		//Call the function of the minigamegame from the DB
	}
	else if(chosenEvent.type=="smallEvent")
	{
		//Creates the screen for the event
		var eventHours = chosenEvent.timeRequired;
		document.getElementById("event").innerHTML += "<h4>" + chosenEvent.text + " </h4>";
		
		for(var i =0; i<chosenEvent.options.length; i++)
		{
			document.getElementById("event").innerHTML += "<h4>" + chosenEvent.options[i].optionName + " - " + chosenEvent.options[i].extraTime +" Additional Hours</h4>";
			document.getElementById("event").innerHTML += "<input type='checkbox' id = " + chosenEvent.options[i].optionID+" >";
		}
		document.getElementById("event").innerHTML += "<br> <button type='button' onclick='submitAction(" + choice + "," + eventHours + ")' > Perform Event </button>";
	}
	else if(chosenEvent.type=="largeEvent")
	{
			
	}
	

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
		if(document.getElementById(chosenEvent.options[j].optionID).checked == true)
		{
			eventHours+= parseInt(chosenEvent.options[j].extraTime);
			console.log(eventHours);
			//Add Positive/Negative Effects to event based on JSOn
			var optionPosEffects = chosenEvent.options[j].posEffects.split(",");
			var optionNegEffects = chosenEvent.options[j].negEffects.split(",");
			for(var i =0;i<optionPosEffects.length;i++)
			{totalPosEffects.push(optionPosEffects[i]);}
			
			for(var k =0;k<optionNegEffects.length;k++)
			{totalNegEffects.push(optionNegEffects[k]);}
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
	
	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + playerCandidate.focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours: " + remainingHours + "</h3>";
	var finalRes = votePercentage(1000);
	document.getElementById("gameInfo").innerHTML += "<p> WInner: "+ finalRes.win +"	</p> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};


/*Special Action Pages*/

//Allows the user to give a poll ith questions they choose to a sample of the population
function poll()
{
	//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";
	
	document.getElementById("event").innerHTML += "<h4> Select the questions you want to ask on the poll </h4>";
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
	//Displays the screen for this event
	document.getElementById("next").innerHTML += "<button onclick = 'pollResults()'> Submit Poll </button>";
	document.getElementById("event").style.display = "block";
	document.getElementById("next").style.display = "block";
};

//Displays the result of a poll immediately after it end and then saves the report for later viewing
function pollResults(subject)
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
				var selectedQuestion1 = document.getElementById("poll"+i+"");
				var val1 = (selectedQuestion1.options[selectedQuestion1.selectedIndex].value);
				var selectedQuestion2 = document.getElementById("poll"+j+"");
				var val2 = (selectedQuestion2.options[selectedQuestion2.selectedIndex].value);
				if(val1 == val2)
				{
					duplicate = true;
				}
			}
		}
	}
	//Clear previous screen
	clearScreen();
	var nextArea = document.getElementById("next");
	nextArea.innerHTML = "";
	
	console.log(pollChoices);
	
	if(duplicate)
	{
		document.getElementById("gameInfo").innerHTML += "<p> You have at least two of the same questions on your poll. \nPlease select the questions again. </p> <button onclick = 'poll("+subject+")'> Reselect Poll Questions </button>";
	}
	else
	{	
		pollCalc(pollChoices, 80);
		document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the User Action Area </button>";
	}
	
};


/* Helper Functions*/

//Takes in an Arrays of Groups to affect with the score increase, and parses through each adding the specified increase in score
function scoreChanger(scoreInc, groupPos, groupNeg)
{
	
	for(var i=0;i<groupPos.length;i++)
	{
		
		switch (groupPos[i]) 
		{
			case "Soc":
				playerCandidate.fame[0]+=parseInt(scoreInc);
				if(playerCandidate.fame[0] > 2)
				{
					playerCandidate.fame[0] = 2;
				}
				if(playerCandidate.fame[0] < .1)
				{
					playerCandidate.fame[0] = .1;
				}
				break;
				
			case "Ath":
				playerCandidate.fame[1]+=parseInt(scoreInc);
				if(playerCandidate.fame[1] > 2)
				{
					playerCandidate.fame[1] = 2;
				}
				if(playerCandidate.fame[1] < .1)
				{
					playerCandidate.fame[1] = .1;
				}
				break;
				
			case "Res":
				playerCandidate.fame[2]+=parseInt(scoreInc);
				if(playerCandidate.fame[2] > 2)
				{
					playerCandidate.fame[2] = 2;
				}
				if(playerCandidate.fame[2] < .1)
				{
					playerCandidate.fame[2] = .1;
				}
				break;
				
			case "Medis":
				playerCandidate.fame[3]+=parseInt(scoreInc);
				if(playerCandidate.fame[3] > 2)
				{
					playerCandidate.fame[3] = 2;
				}
				if(playerCandidate.fame[3] < .1)
				{
					playerCandidate.fame[3] = .1;
				}
				break;
				
			case "Read":
				playerCandidate.fame[4]+=parseInt(scoreInc);
				if(playerCandidate.fame[4] > 2)
				{
					playerCandidate.fame[4] = 2;
				}
				if(playerCandidate.fame[4] < .1)
				{
					playerCandidate.fame[4] = .1;
				}
				break;
				
			case "Bus":
				playerCandidate.fame[5]+=parseInt(scoreInc);
				if(playerCandidate.fame[5] > 2)
				{
					playerCandidate.fame[5] = 2;
				}
				if(playerCandidate.fame[5] < .1)
				{
					playerCandidate.fame[5] = .1;
				}
				break;
				
			case "Eng":
				playerCandidate.fame[6]+=parseInt(scoreInc);
				if(playerCandidate.fame[6] > 2)
				{
					playerCandidate.fame[6] = 2;
				}
				if(playerCandidate.fame[6] < .1)
				{
					playerCandidate.fame[6] = .1;
				}
				break;
				
			case "Tech":
				playerCandidate.fame[7]+=parseInt(scoreInc);
				if(playerCandidate.fame[7] > 2)
				{
					playerCandidate.fame[7] = 2;
				}
				if(playerCandidate.fame[7] < .1)
				{
					playerCandidate.fame[7] = .1;
				}
				break;
				
			case "Fine Arts":
				playerCandidate.fame[8]+=parseInt(scoreInc);
				if(playerCandidate.fame[8] > 2)
				{
					playerCandidate.fame[8] = 2;
				}
				if(playerCandidate.fame[8] < .1)
				{
					playerCandidate.fame[8] = .1;
				}
				break;
				
			case "Lib Arts":
				playerCandidate.fame[9]+=parseInt(scoreInc);
				if(playerCandidate.fame[9] > 2)
				{
					playerCandidate.fame[9] = 2;
				}
				if(playerCandidate.fame[9] < .1)
				{
					playerCandidate.fame[9] = .1;
				}
				break;
				
			case "Poor":
				playerCandidate.fame[10]+=parseInt(scoreInc);
				if(playerCandidate.fame[10] > 2)
				{
					playerCandidate.fame[10] = 2;
				}
				if(playerCandidate.fame[10] < .1)
				{
					playerCandidate.fame[10] = .1;
				}
				break;
				
			case "Low":
				playerCandidate.fame[11]+=parseInt(scoreInc);
				if(playerCandidate.fame[11] > 2)
				{
					playerCandidate.fame[11] = 2;
				}
				if(playerCandidate.fame[11] < .1)
				{
					playerCandidate.fame[11] = .1;
				}
				break;
				
			case "Lower Mid":
				playerCandidate.fame[12]+=parseInt(scoreInc);
				if(playerCandidate.fame[12] > 2)
				{
					playerCandidate.fame[12] = 2;
				}
				if(playerCandidate.fame[12] < .1)
				{
					playerCandidate.fame[12] = .1;
				}
				break;
				
			case "Upper Mid":
				playerCandidate.fame[13]+=parseInt(scoreInc);
				if(playerCandidate.fame[13] > 2)
				{
					playerCandidate.fame[13] = 2;
				}
				if(playerCandidate.fame[13] < .1)
				{
					playerCandidate.fame[13] = .1;
				}
				break;
				
			case "High":
				playerCandidate.fame[14]+=parseInt(scoreInc);
				if(playerCandidate.fame[14] > 2)
				{
					playerCandidate.fame[14] = 2;
				}
				if(playerCandidate.fame[14] < .1)
				{
					playerCandidate.fame[14] = .1;
				}
				break;
			
			case "Focus":
				switch(playerCandidate.focusnum)
				{
					case 0:
						playerCandidate.issueScore[0]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[0] > 4)
						{
							playerCandidate.issueScore[0] = 4;
						}
						if(playerCandidate.issueScore[0] < -4)
						{
							playerCandidate.issueScore[0] = -4;
						}
						break;
						
					case 1:
						playerCandidate.issueScore[1]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[1] > 4)
						{
							playerCandidate.issueScore[1] = 4;
						}
						if(playerCandidate.issueScore[1] < -4)
						{
							playerCandidate.issueScore[1] = -4;
						}
						break;
						
					case 2:
						playerCandidate.issueScore[2]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[2] > 4)
						{
							playerCandidate.issueScore[2] = 4;
						}
						if(playerCandidate.issueScore[2] < -4)
						{
							playerCandidate.issueScore[2] = -4;
						}
						break;
						
					case 3:
						playerCandidate.issueScore[3]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[3] > 4)
						{
							playerCandidate.issueScore[3] = 4;
						}
						if(playerCandidate.issueScore[3] < -4)
						{
							playerCandidate.issueScore[3] = -4;
						}
						break;
					case 4:
						playerCandidate.issueScore[4]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[4] > 4)
						{
							playerCandidate.issueScore[4] = 4;
						}
						if(playerCandidate.issueScore[4] < -4)
						{
							playerCandidate.issueScore[4] = -4;
						}
						break;
				}
				
				break;
				
			case "tuition":
				playerCandidate.issueScore[0]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[0] > 4)
						{
							playerCandidate.issueScore[0] = 4;
						}
						if(playerCandidate.issueScore[0] < -4)
						{
							playerCandidate.issueScore[0] = -4;
						}
				break;
				
			case "athletic":
				playerCandidate.issueScore[1]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[1] > 4)
						{
							playerCandidate.issueScore[1] = 4;
						}
						if(playerCandidate.issueScore[1] < -4)
						{
							playerCandidate.issueScore[1] = -4;
						}
				break;
				
			case "research":
				playerCandidate.issueScore[2]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[2] > 4)
						{
							playerCandidate.issueScore[2] = 4;
						}
						if(playerCandidate.issueScore[2] < -4)
						{
							playerCandidate.issueScore[2] = -4;
						}
				break;
				
			case "events":
				playerCandidate.issueScore[3]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[3] > 4)
						{
							playerCandidate.issueScore[3] = 4;
						}
						if(playerCandidate.issueScore[3] < -4)
						{
							playerCandidate.issueScore[3] = -4;
						}
				break;
				
			case "medical":	
				playerCandidate.issueScore[4]+=parseInt(scoreInc);
						if(playerCandidate.issueScore[4] > 4)
						{
							playerCandidate.issueScore[4] = 4;
						}
						if(playerCandidate.issueScore[4] < -4)
						{
							playerCandidate.issueScore[4] = -4;
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
				playerCandidate.fame[0]-=parseInt(scoreInc);
				if(playerCandidate.fame[0] > 2)
				{
					playerCandidate.fame[0] = 2;
				}
				if(playerCandidate.fame[0] < .1)
				{
					playerCandidate.fame[0] = .1;
				}
				break;
				
			case "Ath":
				playerCandidate.fame[1]-=parseInt(scoreInc);
				if(playerCandidate.fame[1] > 2)
				{
					playerCandidate.fame[1] = 2;
				}
				if(playerCandidate.fame[1] < .1)
				{
					playerCandidate.fame[1] = .1;
				}
				break;
				
			case "Res":
				playerCandidate.fame[2]-=parseInt(scoreInc);
				if(playerCandidate.fame[2] > 2)
				{
					playerCandidate.fame[2] = 2;
				}
				if(playerCandidate.fame[2] < .1)
				{
					playerCandidate.fame[2] = .1;
				}
				break;
				
			case "Medis":
				playerCandidate.fame[3]-=parseInt(scoreInc);
				if(playerCandidate.fame[3] > 2)
				{
					playerCandidate.fame[3] = 2;
				}
				if(playerCandidate.fame[3] < .1)
				{
					playerCandidate.fame[3] = .1;
				}
				break;
				
			case "Read":
				playerCandidate.fame[4]-=parseInt(scoreInc);
				if(playerCandidate.fame[4] > 2)
				{
					playerCandidate.fame[4] = 2;
				}
				if(playerCandidate.fame[4] < .1)
				{
					playerCandidate.fame[4] = .1;
				}
				break;
				
			case "Bus":
				playerCandidate.fame[5]-=parseInt(scoreInc);
				if(playerCandidate.fame[5] > 2)
				{
					playerCandidate.fame[5] = 2;
				}
				if(playerCandidate.fame[5] < .1)
				{
					playerCandidate.fame[5] = .1;
				}
				break;
				
			case "Eng":
				playerCandidate.fame[6]-=parseInt(scoreInc);
				if(playerCandidate.fame[6] > 2)
				{
					playerCandidate.fame[6] = 2;
				}
				if(playerCandidate.fame[6] < .1)
				{
					playerCandidate.fame[6] = .1;
				}
				break;
				
			case "Tech":
				playerCandidate.fame[7]-=parseInt(scoreInc);
				if(playerCandidate.fame[7] > 2)
				{
					playerCandidate.fame[7] = 2;
				}
				if(playerCandidate.fame[7] < .1)
				{
					playerCandidate.fame[7] = .1;
				}
				break;
				
			case "Fine Arts":
				playerCandidate.fame[8]-=parseInt(scoreInc);
				if(playerCandidate.fame[8] > 2)
				{
					playerCandidate.fame[8] = 2;
				}
				if(playerCandidate.fame[8] < .1)
				{
					playerCandidate.fame[8] = .1;
				}
				break;
				
			case "Lib Arts":
				playerCandidate.fame[9]-=parseInt(scoreInc);
				if(playerCandidate.fame[9] > 2)
				{
					playerCandidate.fame[9] = 2;
				}
				if(playerCandidate.fame[9] < .1)
				{
					playerCandidate.fame[9] = .1;
				}
				break;
				
			case "Poor":
				playerCandidate.fame[10]-=parseInt(scoreInc);
				if(playerCandidate.fame[10] > 2)
				{
					playerCandidate.fame[10] = 2;
				}
				if(playerCandidate.fame[10] < .1)
				{
					playerCandidate.fame[10] = .1;
				}
				break;
				
			case "Low":
				playerCandidate.fame[11]-=parseInt(scoreInc);
				if(playerCandidate.fame[11] > 2)
				{
					playerCandidate.fame[11] = 2;
				}
				if(playerCandidate.fame[11] < .1)
				{
					playerCandidate.fame[11] = .1;
				}
				break;
				
			case "Lower Mid":
				playerCandidate.fame[12]-=parseInt(scoreInc);
				if(playerCandidate.fame[12] > 2)
				{
					playerCandidate.fame[12] = 2;
				}
				if(playerCandidate.fame[12] < .1)
				{
					playerCandidate.fame[12] = .1;
				}
				break;
				
			case "Upper Mid":
				playerCandidate.fame[13]-=parseInt(scoreInc);
				if(playerCandidate.fame[13] > 2)
				{
					playerCandidate.fame[13] = 2;
				}
				if(playerCandidate.fame[13] < .1)
				{
					playerCandidate.fame[13] = .1;
				}
				break;
				
			case "High":
				playerCandidate.fame[14]-=parseInt(scoreInc);
				if(playerCandidate.fame[14] > 2)
				{
					playerCandidate.fame[14] = 2;
				}
				if(playerCandidate.fame[14] < .1)
				{
					playerCandidate.fame[14] = .1;
				}
				break;
			
			case "Focus":
				switch(playerCandidate.focusnum)
				{
					case 0:
						playerCandidate.issueScore[0]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[0] > 4)
						{
							playerCandidate.issueScore[0] = 4;
						}
						if(playerCandidate.issueScore[0] < -4)
						{
							playerCandidate.issueScore[0] = -4;
						}
						break;
						
					case 1:
						playerCandidate.issueScore[1]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[1] > 4)
						{
							playerCandidate.issueScore[1] = 4;
						}
						if(playerCandidate.issueScore[1] < -4)
						{
							playerCandidate.issueScore[1] = -4;
						}
						break;
						
					case 2:
						playerCandidate.issueScore[2]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[2] > 4)
						{
							playerCandidate.issueScore[2] = 4;
						}
						if(playerCandidate.issueScore[2] < -4)
						{
							playerCandidate.issueScore[2] = -4;
						}
						break;
						
					case 3:
						playerCandidate.issueScore[3]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[3] > 4)
						{
							playerCandidate.issueScore[3] = 4;
						}
						if(playerCandidate.issueScore[3] < -4)
						{
							playerCandidate.issueScore[3] = -4;
						}
						break;
					case 4:
						playerCandidate.issueScore[4]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[4] > 4)
						{
							playerCandidate.issueScore[4] = 4;
						}
						if(playerCandidate.issueScore[4] < -4)
						{
							playerCandidate.issueScore[4] = -4;
						}
						break;
				}
				
				break;
				
			case "tuition":
				playerCandidate.issueScore[0]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[0] > 4)
						{
							playerCandidate.issueScore[0] = 4;
						}
						if(playerCandidate.issueScore[0] < -4)
						{
							playerCandidate.issueScore[0] = -4;
						}
				break;
				
			case "athletic":
				playerCandidate.issueScore[1]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[1] > 4)
						{
							playerCandidate.issueScore[1] = 4;
						}
						if(playerCandidate.issueScore[1] < -4)
						{
							playerCandidate.issueScore[1] = -4;
						}
				break;
				
			case "research":
				playerCandidate.issueScore[2]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[2] > 4)
						{
							playerCandidate.issueScore[2] = 4;
						}
						if(playerCandidate.issueScore[2] < -4)
						{
							playerCandidate.issueScore[2] = -4;
						}
				break;
				
			case "events":
				playerCandidate.issueScore[3]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[3] > 4)
						{
							playerCandidate.issueScore[3] = 4;
						}
						if(playerCandidate.issueScore[3] < -4)
						{
							playerCandidate.issueScore[3] = -4;
						}
				break;
				
			case "medical":	
				playerCandidate.issueScore[4]-=parseInt(scoreInc);
						if(playerCandidate.issueScore[4] > 4)
						{
							playerCandidate.issueScore[4] = 4;
						}
						if(playerCandidate.issueScore[4] < -4)
						{
							playerCandidate.issueScore[4] = -4;
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
	this.studentCaring = Math.random(.1,1.0);
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
	this.correctAnswers= 0;
	this.wrongAnswers= 0;
	this.lastMove= "None";
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
	var winPercentage=0;
	var winner ="";
	var lowPercentage=0;
	var loser ="";
	createSample(sampleSize);
	for(var j=0;j<candidates.length; j++)
	{
		for(var i =0; i<sample.length; i++)
		{
			var fame = 0; 
			fame = fameCalc(candidates[j], sample[i]);
			
			var issues = parseInt(sample[i].tuitionScore + candidates[j].issueScore[0]) + parseInt(sample[i].athleticScore + candidates[j].issueScore[1]) + parseInt(sample[i].researchScore+ candidates[j].issueScore[2])+ parseInt(sample[i].eventScore  + candidates[j].issueScore[3])+ parseInt(sample[i].medicalScore+ candidates[j].issueScore[4]);
			
			candWinPer = fame + (issues*sample[i].studentCaring) + candidates[j].consMod;
			if(candWinPer > winPercentage ||winPercentage==0)
			{
				winPercentage = candWinPer;
				winner = candidates[j].name;
			}
			else if((candWinPer < lowPercentage || lowPercentage==0) && winner != candidates[j].name)
			{
				lowPercentage = candWinPer;
				loser = candidates[j].name;
			}
		}
	}
	var results =
	{
		winPer: winPercentage,
		win: winner,
		losPer: lowPercentage,
		los:loser
	};
	return results;
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
	prevTable.innerHTML = "<table id = 'pollTable'></table>";
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
	var res = votePercentage(sampleSize);
	//Gets the results of each question
	for(var i = 0; i < pollChoices.length ;i++)
	{
		for(var j=0;j<sample.length;j++)
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
					tableArrays[2].push(res.win);
				break;
				
				case "candOpp":
					tableArrays[3].push(res.los);
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
					tableArrays[7].push(fameCalc(playerCandidate));
				break;
				
				case "playTrust":
					tableArrays[8].push(playerCandidate.consMod);
				break;
				
			}
			for(var k = 0;k<positions.length;k++)
			{
				if(pollChoices[i] == "issue" + positionsLower[k])
				{
					switch(pollChoices[i])
					{
						case "issuetuition":
							tableArrays[9].push(parseInt(sample[j].tuitionScore));
						break;
						
						case "issueathletic":
							tableArrays[10].push(parseInt(sample[j].athleticScore));
						break;
						
						case "issueresearch":
							tableArrays[11].push(parseInt(sample[j].researchScore));
						break;
						
						case "issueevents":
							tableArrays[12].push(parseInt(sample[j].eventScore));
						break;
						
						case "issuemedical":
							tableArrays[13].push(parseInt(sample[j].medicalScore));
						break;
					}
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candFame" + candidates[k].name)
				{
					var counter = 13 +k;
					tableArrays[counter].push(candidates[k].consMod);
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candTrust" + candidates[k].name)
				{
					var counter = 18 +k;
					tableArrays[counter].push(fameCalc(candidates[k]));
				}
			}
		}
	}
	tableBuilder(pollChoices, tableArrays, sampleSize,false);
}

//Builds a table by looping through the Array created by pollCalc and putting each value into a cell.
function tableBuilder(pollChoices, tableArray2, sSize, review)
{
	var rowCounter = 0;
	var cellCounter = 0;
	var studentCounter = 0;
	
	
	var table = document.getElementById("pollTable");
	var row;
	for(var h = -1; h<sSize; h++)
	{
		row = table.insertRow(rowCounter);
		for(var i = 0; i < pollChoices.length ;i++)
		{
			switch(pollChoices[i])
			{
				case "issFav":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[0];
						cellCounter++;
					}
					else
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableArray2[0][studentCounter];
						cellCounter++;
						studentCounter++;
						
					}
				break;
				
				case "issOpp":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[1];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[1][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "candFav":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[2];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[2][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "candOpp":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[3];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[3][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "major":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[4];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[4][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "class":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[5];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[5][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "group":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[6];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[6][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "fame":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[7];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[7][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				break;
				
				case "playTrust":
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						cell.innerHTML = tableHeaders[8];
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							cell.innerHTML = tableArray2[8][studentCounter];
						cellCounter++;
						studentCounter++;
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
						if(h == -1)
						{
							var cell = row.insertCell(cellCounter);
							var posInfo = tableHeaders[9] + positions[0];
							cell.innerHTML = posInfo;
							cellCounter++;
						}
						else
						{
								var cell = row.insertCell(cellCounter);
								cell.innerHTML = tableArray2[9][studentCounter];
						cellCounter++;
						studentCounter++;
						}
						break;
						
						case "issueathletic":
							if(h == -1)
						{
							var cell = row.insertCell(cellCounter);
							var posInfo = tableHeaders[9] + positions[1];
							cell.innerHTML = posInfo;
							cellCounter++;
						}
						else
						{
								var cell = row.insertCell(cellCounter);
								cell.innerHTML = tableArray2[10][studentCounter];
						cellCounter++;
						studentCounter++;
						}
						
						case "issueresearch":
							if(h == -1)
						{
							var cell = row.insertCell(cellCounter);
							var posInfo = tableHeaders[9] + positions[2];
							cell.innerHTML = posInfo;
							cellCounter++;
						}
						else
						{
							cell = row.insertCell(cellCounter);
								cell.innerHTML = tableArray2[11][studentCounter];
						cellCounter++;
						studentCounter++;
						}
						break;
						
						case "issueevents":
							if(h == -1)
						{
							var cell = row.insertCell(cellCounter);
							var posInfo = tableHeaders[9] + positions[3];
							cell.innerHTML = posInfo;
							cellCounter++;
						}
						else
						{
								var cell = row.insertCell(cellCounter);
								cell.innerHTML = tableArray2[12][studentCounter];
						cellCounter++;
						studentCounter++;
						}
						break;
						
						case "issuemedical":
							if(h == -1)
						{
							var cell = row.insertCell(cellCounter);
							var posInfo = tableHeaders[9] + positions[4];
							cell.innerHTML = posInfo;
							cellCounter++;
						}
						else
						{
								var cell = row.insertCell(cellCounter);
								cell.innerHTML = tableArray2[13][studentCounter];
								cellCounter++;
								studentCounter++;
						}
						break;
					}
				}
			}
			for(var k = 1;k<candidates.length;k++)
			{
				if(pollChoices[i] == "candFame" + candidates[k].name)
				{
					if(h == -1)
					{
						var cell = row.insertCell(cellCounter);
						var candInfo = tableHeaders[10] + candidates[k].name;
						cell.innerHTML = candInfo;
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							var counter = 13+k;
							cell.innerHTML = tableArray2[counter][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				}
			}
			for(var k = 1;k<candidates.length;k++)
				if(pollChoices[i] == "candTrust" + candidates[k].name)
			{
				{
					if(h == -1)
					{
						var cell = row.insertCell(rowCounter);
						var candInfo = tableHeaders[11] + candidates[k].name;
						cell.innerHTML = candInfo;
						cellCounter++;
					}
					else
					{
							var cell = row.insertCell(cellCounter);
							var counter = 18+k;
							cell.innerHTML = tableArray2[counter][studentCounter];
						cellCounter++;
						studentCounter++;
					}
				}
			}
			if(studentCounter==sSize)
			{
			studentCounter=0;
			}
		}
			rowCounter++;
			cellCounter = 0;
	}
	if(!review)
	{
		pastPollResults.push(tableArray2);
		pastPollSizes.push(sSize);
		pastPollChoices.push(pollChoices);
		tableArrays =  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
		pollTime(sSize, pollChoices);
	}
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
	playerCandidate.focus = positions[f];
	playerCandidate.focusnum = f;
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
	var text = "We have asked the sample you've taken of "+ sample.length+ " out of 1000 students.  We asked them how they feel about " + playerCandidate.focus; + "and they have answered..."
	var paratext = document.createTextNode(text);
	para.appendChild(paratext);
	document.getElementById("gameInfo").appendChild(para);

	//lets find out how they feel about your position
	var r = samplePositions(playerCandidate.focusnum);
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
		var textNode = "You created posters and were able to raise people's standing for " + playerCandidate.focus + ".";
		
	}
	else if(num == .4){
		var textNode = "You created a newsletter and were able to raise people's standing for " + playerCandidate.focus + ".";
	}
	else if(num == .6){
		var textNode = "You spent time setting up a table in the Student Union and were able to raise people's standing for " + playerCandidate.focus + ".";
	}
	
	switch(playerCandidate.focusnum){
		case 0:
			playerCandidate.issueScore[0] += num;
			break;
		case 1:
			playerCandidate.issueScore[1] += num;
			break;
		
		case 2:
			playerCandidate.issueScore[2] += num;
			break;
		
		case 3:
			playerCandidate.issueScore[3] += num;
			break;
		
		case 4:
			playerCandidate.issueScore[4] += num;
			break;
		
	}
	
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
	playerPosition = playerCandidate.focusnum;


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



