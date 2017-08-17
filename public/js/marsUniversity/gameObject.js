//Sets the variables for game length and opposing candidates
function initNewGame(isFromTut){

    
	var tutHolder = isFromTut
	clearScreen();
	GameObject.candidates = [];	
	globals.population = 1000;
	globals.sample = [];
	globals.days = 1; 
	GameObject.remainingHoursDay = 12; 
    //Generates the student biases for this game
    generateStudentBiases();
	
	//Decides the opponents focus which cannot be the same as the player
    
    opponentFame = (.05 * GameObject.totalDays);
	globals.opponentCandidate.fame = [1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2];
	globals.opponentCandidate.consMod = 0;
	//////CONSOLE.LOG(oppFocus);
	assignIssue(globals.opponentCandidate,[],1,false);
	GameObject.candidates.push(globals.opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new Candidate("Boof");
	issueCand1.focus = globals.positions[0];
	issueCand1.focusnum = 0;
	assignRank(issueCand1,globals.chosenCandRanks,true);
	GameObject.candidates.push(issueCand1);
	var issueCand2 = new Candidate("Zrap Bannigan");
	issueCand2.focus = globals.positions[1];
	issueCand2.focusnum = 1;
	assignRank(issueCand2,globals.chosenCandRanks,true);
	GameObject.candidates.push(issueCand2);
	var issueCand3 = new Candidate("C1AMP");
	issueCand3.focus = globals.positions[2];
	issueCand3.focusnum = 2;
	assignRank(issueCand3,globals.chosenCandRanks,true);
	GameObject.candidates.push(issueCand3);
	var issueCand4 = new Candidate("Simon");
	issueCand4.focus = globals.positions[3];
	issueCand4.focusnum = 3;
	assignRank(issueCand4,globals.chosenCandRanks,true);
	GameObject.candidates.push(issueCand4);	
  
  
    //Set the currentCandidateArrayHolder to the right data
    globals.currentCandidateArrayHolder = GameObject.candidates;
  
    GameObject.candidates.splice(0,0,GameObject.playerCandidate);
    loadQuestions();
  
	//map(0,true,true);
    firstPollInfo();
}

//Sets the number of days and time remaining according to the players difficulty choice.
function setDiff(days)
{
    GameObject.totalDays = days;
    globals.inGame = true;
    initNewGame(false);
}

function calcFirstStatement(f)
{
    ////CONSOLE.LOG("calcFirstStatement");
    
    
	GameObject.firstPoll = false;
	GameObject.firstState = false;
	globals.turnCounter = 1
	GameObject.playerCandidate.focus = globals.positions[f];
	GameObject.playerCandidate.focusnum = f;
    
    //Increases issue score based on the players choice for their initial statement
	switch(f)
	{
		case 0:
		GameObject.playerCandidate.issueScore[0]++;
		break;
		case 1:
		GameObject.playerCandidate.issueScore[1]++;
		break;
		case 2:
		GameObject.playerCandidate.issueScore[2]++;
		break;
		case 3:
		GameObject.playerCandidate.issueScore[3]++;
		break;
	}
	
    //Display Updated Top Bar
    //updateTopBar(this);
  
    //Hold onto correct candidates
    globals.currentCandidateArrayHolder = GameObject.candidates;
    
	eventMenu();
};

//Updates the Game Session
function updateSession(gameOver)
{
	//Takes the Whole data and splits it into sections
	//var saveArray = saveState.split("~");
	////CONSOLE.LOG(saveArray[9])
	////CONSOLE.LOG(saveArray[9] !=[] && saveArray[9] != "NaN" && saveArray[9] != undefined && saveArray[9] != "")
    
    let gameSession = "";
    try{
      let saveJSON = JSON.parse(saveState);
      gameSession = saveJSON.gameSession;
    }
    catch(e){
      try{
        var saveArray = saveState.split("~");
        gameSession = saveArray[9];
      }
      catch(e){
        console.log("JSON parsing failed");
      }
    }
  
	if(!GameObject.gameOver){
    	////CONSOLE.LOG(saveArray[9] == "NaN")
    	if(gameSession !=[] && gameSession != "NaN" && gameSession != undefined && gameSession != "")
    	{
        	GameObject.gameSession = gameSession + 1;
        	GameObject.gameOver = false;
        	globals.endReset = false;
    	}
    	else
    	{
        	GameObject.gameSession = 0;
        	GameObject.gameOver = false;
        	globals.endReset = false;
    	}
	}
}

function resetGame()
{
	globals.tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
	globals.pastPollChoices = [];
	globals.pastPollResults = [];
	globals.pastPollSizes = [];
	globals.oppChoice = [];
	globals.currentEvents = [];
	globals.sample = [];
	GameObject.candidates=[];
	globals.chosenCandRanks = [];
	globals.currentEvents = [];
	GameObject.playerCandidate = new Candidate("ph");
    GameObject.playerCandidate.isPlayer = true;
	globals.opponentCandidate = new Candidate("Karma");
  	if(GameObject.gameOver)
    {
        GameObject.gameSession++; 
        GameObject.gameOver = false;
    }
    
}

//Creates the player candidate
function createCharacter(){
	GameObject.playerCandidate.name = document.getElementById("charName").value;
	GameObject.playerCandidate.raceNum = headSheet.frameIndexRace;
	GameObject.playerCandidate.genderNum = bodySheet.frameIndexClothing;
	GameObject.playerCandidate.bodyTypeNum = bodySheet.bodyArrayHolder;
	GameObject.playerCandidate.headNum = headSheet.frameIndex;
	GameObject.playerCandidate.race = globals.lifeformArray[headSheet.frameIndexRace];
	GameObject.playerCandidate.gender = globals.bodyShapeArray[bodySheet.frameIndexClothing];
	GameObject.playerCandidate.bodyType = globals.bodyTypeArray[bodySheet.bodyArrayHolder];
  
    generatePlayerImages();
    
    tutorialChoice();
}

function generatePlayerImages(){
    let canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 555;
    let ctx = canvas.getContext('2d');
  
    //Create player Image
    headSheet = new Sprite({context: ctx, width: 155, height: 171, image: globals.heads});
    headSheet.frameIndex = GameObject.playerCandidate.headNum;
    headSheet.frameIndexRace = GameObject.playerCandidate.raceNum;
    
	bodySheet = new Sprite({context: ctx, width: 164, height: 343, image: globals.thinBody});
    bodySheet.bodyArrayHolder = GameObject.playerCandidate.bodyTypeNum;
    bodySheet.frameIndexClothing = GameObject.playerCandidate.genderNum;
  
    let temp = bodySheet.bodyArrayHolder;
	headSheet.bodyArrayHolder = temp;

	bodySheet.image = globals.imgArrayBody[temp];
	bodySheet.width = globals.imgArrayBodyWidth[temp];
	bodySheet.height = globals.imgArrayBodyHeight[temp];

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);
    
    //Save full size, full body Player image
    let image = new Image();
    image.src = canvas.toDataURL("image/png");
    images["playerImg"] = image;
    
    //Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
    let scale = .3;
    let headWidth = 150; //Width of individual head image
    let headHeight = 160; //Height of individual head image
    canvas.width = 99; //Width of original blank icon image 
    canvas.height = 100; //Height of original blank icon image 
    
    //Draw button background
    ctx.drawImage(images["emptyIcon"],0,0);
  
    //Draw scaled down player head for MyData
    ctx.save();
    //Scale the head to fit the button, subtracting for extra padding
    ctx.scale((canvas.width - 8) / headWidth, (canvas.height - 8) / headHeight)
    headSheet.render(0,0);
    ctx.restore();
  
    //Save Player head
    image = new Image();
    image.src = canvas.toDataURL("image/png");
    images["playerHeadImg"] = image;
}

//Chooses what issue each candidate represents
function assignIssue(candidate, chosenIssues, issueVal, issueCand)
{
	var counter;
	globals.oppChoice=[0,1,2,3];

	for(var i =0; i <chosenIssues.length;i++)
	{
		globals.oppChoice.splice(globals.oppChoice.indexOf(chosenIssues[i]),1);
	}


	//Decides the opponents focus which cannot be the same as the player
	var oppFocus = Math.floor(Math.random()*(4-chosenIssues.length));
	candidate.focus = globals.positions[globals.oppChoice[oppFocus]];
	candidate.focusnum = globals.oppChoice[oppFocus];
	switch(globals.oppChoice[oppFocus])
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
		globals.chosenCandRanks.push(globals.oppChoice[oppFocus]);
	}
}

//Chooses how well the candidate ranks
function assignRank(candidate, chosenRanks, issueCand)
{
	var counter;
	globals.oppChoice=[0,1,2,3];
	
	for(var i =0; i <chosenRanks.length;i++)
	{
		globals.oppChoice.splice(globals.oppChoice.indexOf(chosenRanks[i]),1);
	}
	
	
	//Decides the opponents focus which cannot be the same as the player
	var oppRank = Math.floor(Math.random()*(4-chosenRanks.length));
    
  
	switch(globals.oppChoice[oppRank])
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
			candidate.fame = [1.35,1.35,1.35,1.35,1.35,1.35,1.35,1.35];
			candidate.consMod = 0.45;
			candidate.issueScore[candidate.focusnum] = 2.5;
		break;
		case 4:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.45;
			candidate.issueScore[candidate.focusnum] = 2.25;
		break;
	}
	
	if(issueCand)
	{
		chosenRanks.push(globals.oppChoice[oppRank]);
	}
}

GameObject = 
{
    candidates:[],
    playerCandidate: null,
    studentTypes: {},
    gameSession:0, 
    gameOver:false,
    firstPoll: false,
	firstState: false,
    totalDays: 0,
    remainingHoursDay: 0
}