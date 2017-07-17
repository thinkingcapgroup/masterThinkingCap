function startAnimatic()
{
	globals.firstPoll = true;
	globals.firstState = true;
	
    //Shows the animatic
	document.getElementById("centerDisplay").innerHTML = "<h2>Welcome to Mars University! </h2> ";
    document.getElementById("centerDisplay").innerHTML += "<center><video id = 'animatic' width='880' height='500' preload='auto' autoplay controls><source src='media/video/MascotAnimaticNEW.mov' type='video/mp4' ></video><br><button onclick = 'startCharacterSelect()'>Skip</button><center>";
    //document.getElementById("centerDisplay").innerHTML += "</br> <a onclick = 'startCharacterSelect()' class = 'btn double remove'>Continue After Animatic Finish</a>";
    
    //Starts the character select after the animatic finishes
    document.getElementById('animatic').addEventListener('ended',myHandler,false);

    function myHandler(e) {
        startCharacterSelect();
    }

  
}

function startCharacterSelect(){
    clearScreen();
    
	var prevHours = document.getElementById("playerInfo");
	prevHours.innerHTML = "";
 	getSession(globals.gameOver);
	resetGame();
    
    document.getElementById("centerDisplay").innerHTML = views["characterSelect"]({});
  

	globals.c=document.getElementById("myCanvas");
	//creates a sprite for the headsheets
	headSheet = new Sprite({context: globals.c.getContext("2d"), width: 155, height: 171, image: globals.heads});
	bodySheet = new Sprite({context: globals.c.getContext("2d"), width: 164, height: 343, image: globals.thinBody});

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);
}

//Let the player choose whether to do the tutorial
function tutorialChoice(){
    clearScreen();
    document.getElementById("mainContent").classList.add("center");
    
	document.getElementById("mainContent").innerHTML = "<h1>What's Happening</h1>"
	document.getElementById("mainContent").innerHTML += "<p>You are competing against Karma the Chameleon and 4 other candidates for the position of Student Council President. Karma is new student just like you, they call her the Chameleon, because she copies the people she is running against.... and also because, she is a Chameleon. The current student government will give you, a candidate, some information about the students at MarsU.</p>"
	document.getElementById("mainContent").innerHTML += "<p>Do you wish to start the tutorial?</p>"
	document.getElementById("mainContent").innerHTML += "<div style='display:inline-flex' ><button class='primaryBtn' onclick='tutorial("+false+")'>Yes</button><button class='primaryBtn' onclick='chooseDiff()'>No</button></div>"
}

function firstPollInfo()
{
    clearScreen();
    document.getElementById("mainContent").classList.add("center");

    document.getElementById("mainContent").innerHTML += "<h1>First Poll</h1> <br><p>Ready to start your Campaign at Mars U? It's time to get that initial data from the Student Government. Let them know what questions you would like to know the answers to.</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick='drawPoll("+POLL_STATES.FIRST+", true, false)'>Take Your First Poll</button>";
}

//Sets up the buttons for the intital statement the player makes in the game.
function firstStatement()
{
    ////CONSOLE.LOG("first statement");
    
	globals.firstPoll = false;
	saveGame();
	globals.first = false;
	clearScreen();
    document.getElementById("mainContent").classList.add("center");

  
	document.getElementById("mainContent").innerHTML = "<h2>First Positive Statement</h2>"
	document.getElementById("mainContent").innerHTML += "<p>It's Time to Make Your First Statement to the Mars U Population! <br>Pick an Issue Below that You Would Like to Support!</p>"
	for (var x=0; x < globals.positions.length; x++){

	 document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = 'calcFirstStatement("+x+")'>"+ globals.positions[x]+"</button>"
	}
	if(globals.pastPollResults.length !=0)
	{
		document.getElementById("mainContent").innerHTML += "<p>Not Sure on What to Choose? Click Below!</p> <button class='otherBtn' type='button' onclick='viewPollResult(0, true)' >View The Results of the Poll You Just Took </button><br>";
	}
		document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`statementsHelpPage`)' ></img>";

}

//Prompts the player to choose a difficulty setting for the game
function chooseDiff()
{
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
	document.getElementById("mainContent").innerHTML = "<h1>Choose Your Difficulty</h1><br>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = setDiff(9)> Easy</button>";
    document.getElementById("mainContent").innerHTML += "<p> In Easy Mode You Have 9 Days to Win the Election.</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = setDiff(7)> Normal</button>";
    document.getElementById("mainContent").innerHTML += "<p> In Normal Mode You Have 7 Days to Win the Election.</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = setDiff(5)> Hard</button>";
    document.getElementById("mainContent").innerHTML += "<p> In Hard Mode You Have 5 Days to Win the Election.</p>";
}

//used for making Player Candidate & Opponent Candidate
function Candidate(name){
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