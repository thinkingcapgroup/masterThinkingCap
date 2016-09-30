//making all the score presets
var groupList = ["socialite", "athlete", "researcher", "mediaLover", "reader"];
var majorList = ["business", "engineering", "tech", "fineArts", "libArts"];
var stuEconomic = ["poverty", "low", "midLow", "midHigh", "high"];
var playerCandidate = new CandidateCreate("ph","ph", "ph", "ph")
var opponentCandidate = new CandidateCreate("Liz", "Lizard", "Non-Binary", "Average");

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
var currentEvents = [];

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
};
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
// player

var playerScore = [];

var population = 1000;
var sample = [];

var events;
var questions;






//Starts the game
function startGame(){
	hours = 60;
	playerScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	//whatever other things we have to do when initializing the game here
	console.log("Game initialized and loaded!");
	fileLoader(events, "json/events.json", events);
	//fileLoader(questions, "json/questions.json", questions);
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
	console.log(playerCandidate);
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
	//Creates player and main opponent
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
	//Decides the opponents focus which cannot be the same as the player
	while(opponent.focus != "")
	{
		var oppFocus = Math.random(0,4);
			if(oppFocus != f)
			{
				opponent.focus = positions[f];
				opponent.focusnum = f;
			}
	}
	
	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + candidate.focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours :" + remainingHours + "</h3>";
	userAction();
};

function userAction()
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	var prevHours = document.getElementById("playerInfo");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	prevHours.innerHTML = "";
	currentEvents = []
	
	//Build User Action Area buttons
	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + candidate.focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours :" + remainingHours + "</h3>";
	document.getElementById("choices").innerHTML += "<button type='button' onclick='reportViewer()' >View Result Reports</button>";
	document.getElementById("choices").innerHTML += "<button type='button'  onclick='poll()'> Poll for My Influence </button>";
	document.getElementById("gameInfo").innerHTML += "<h4> Opponent\'s Last Move:" + opponent.lastMove + "</h4>";
	document.getElementById("choices").innerHTML += "<button type='button'  onclick='poll()'>Poll For Opponent\'s Influence </button>";
	
	//Adds events to button list randomly from those available and Prevents Duplicates and events with more time than is available	
	for(var i = 0;i<2;i++)
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
			var eventDescription =currentEvent.name + " - " + currentEvent.timeRequired;
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
		//Creates the screen for the event
		var eventHours = chosenEvent.timeRequired;
		document.getElementById("event").innerHTML += "<h4>" + chosenEvent.text + " </h4>";
		
		for(var i =0; i<chosenEvent.options.length; i++)
		{
			document.getElementById("event").innerHTML += "<h4>" + chosenEvent.options[i].optionName + ": </h4>";
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
	for(var j =0; j<chosenEvent.options.length; j++)
	{
		if(document.getElementById(chosenEvent.options[j].optionID).checked == true)
		{
			eventHours+= chosenEvent.options[j].extraTime;
		}
	}
	remainingHours-= eventHours;
	
	
	//Changes the player's score
	scoreChanger(chosenEvent.scoreInc, chosenEvent.groupPos.split(","), chosenEvent.groupNeg.split(","))
	
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
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	var prevHours = document.getElementById("playerInfo");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	prevHours.innerHTML = "";
	
	document.getElementById("playerInfo").innerHTML += "<h2> Focus Issue: " + candidate.focus + "</h2>";
	document.getElementById("playerInfo").innerHTML += "<h3> Remaining Hours :" + remainingHours + "</h3>";
	document.getElementById("gameInfo").innerHTML += "<p> You Win/Lose </p> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};

/*Special Action Pages*/
//Allows the viewing of Poll Reports you have already taken
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

//Allows the user to give a poll ith questions they choose to a sample of the population
function poll(subject)
{
	//Clear previous screen
	var gameOutput = document.getElementById("gameInfo");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	for(var i = 0; i<5 ;i++)
	{
	document.getElementById("event").innerHTML += "<h4> Select the questions you want to ask on the poll </h4>";
	}
	document.getElementById("gameInfo").innerHTML += "<p> Poll Question Selector Here </p> <button onclick = 'pollResults()'> Poll the Sample </button>";
};

//Displays the result of a poll immediately after it end and then saves the report for later viewing
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


/* Helper Functions*/
//Takes in an Arrays of Groups to affect with the score increase, and parses through each adding the specified increase in score
function scoreChanger(scoreInc, groupPos, groupNeg)
{
	for(var i=0;i<groupPos.length;i++)
	{
		switch (groupPos[i]) 
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
	}
	
	for(var j=0;j<groupNeg.length;j++)
	{
		switch (groupNeg[i]) 
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
}


function fileLoader(target,jsonLoc,value)
{
	var Json;
	var oReq = new XMLHttpRequest();
	oReq.onload = function (e) 
	{
		Json = JSON.parse(this.responseText);
		target = Json.value;
	};
	oReq.open("get", jsonLoc, true);
	oReq.send();
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

function createSample(x)
{
	for (var count= 0; count < x; count++){
		var scoreHolder = getScores();
		var holderStudent = new Student(groupList[scoreHolder[0]], majorList[scoreHolder[1]], stuEconomic[scoreHolder[2]], scoreHolder[3], scoreHolder[4], scoreHolder[5], scoreHolder[6], scoreHolder[7])
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

window.onload = startGame();

//Uncomment this to disable the console.
//window.console.log = function(){
//    console.error('The ability to view the console is disabled for security purposes.');
//    window.console.log = function() {
//        return false;
//    }
//}



