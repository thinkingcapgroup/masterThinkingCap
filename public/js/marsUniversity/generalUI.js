function updateTopBar(currentScreen){
    
    var dayCycleIndex = (GameObject.totalDays + 1) - globals.days;
    var context = { "totalDays" : GameObject.totalDays, "dayCycle" : dayCycleIndex, "remainingHours":GameObject.remainingHoursDay, "playerHeadImg": images["playerHeadImg"]};
    var html = views["topBar"](context);
  
    //$("#templateTest").append(html);
    document.getElementById("playerInfo").innerHTML = html;
  
    //Putting onclick event at the bottom because it won't load otherwise
    document.getElementById("helpIcon").onclick = function(){
      ////CONSOLE.LOG("check help");
      helpScreen(currentScreen);
      
    }
    
    document.getElementById('topBar').style.display = "inline-flex";
}

function mainMenu()
{
	emergencyStop();
    //Shows the title screen
	clearScreen();
	document.getElementById("centerDisplay").innerHTML = views["splashScreen"]({});
}

function practiceMenu()
{
    // Shows the practice screen menu
	clearScreen();
	globals.practice = true;
    
    //Generate biases for this practice session
    generateStudentBiases();
  
	document.getElementById("centerDisplay").innerHTML = views["practice"]({}); 

}

function pollMenu()
{
    //Shows the Poll Menu
    clearScreen();
    
    if(hourChecker()){
      updateTopBar(pollMenu);
      document.getElementById("mainContent").classList.add("center");

      if(GameObject.remainingHoursDay >=3)
      {
          document.getElementById("mainContent").innerHTML += "<h2> Poll a Sample of the Population</h2> <button type='button' class='primaryBtn' onclick='drawPoll("+globals.POLL_STATES.IN_GAME+", false, false)'> Take A Poll </button><br><br>";
          if(globals.pastPollResults.length > 0)
              document.getElementById("mainContent").innerHTML += "<h2> Previous Poll Results</h2>";
      }
      else
      {
          document.getElementById("mainContent").innerHTML += "<h2> Poll</h2> <button type='button' > Cannot Take a Poll </button> ";
          if(globals.pastPollResults.length > 0)
              document.getElementById("mainContent").innerHTML += "<h2> Previous Poll Results</h2>";
      }

      //Adds buttons for each poll that has been taken already
      for(var i=0; i<globals.pastPollResults.length;i++)
      {
          globals.num = i+1;
          document.getElementById("mainContent").innerHTML += "<button class='otherBtn logPollView' onclick='viewPollResult("+i+")' >View Poll "+ globals.num +" Result </button>";
      }
      document.getElementById("mainContent").innerHTML += "<br>";
      document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`pollHelpPage`)' ></img>";

      setBackToMapBtn();
    }
}
function trendReportMenu()
{
    //Sets up the trend report menu
	clearScreen();
  
    if(hourChecker()){
      document.getElementById("mainContent").classList.add("center");
      updateTopBar(trendReportMenu);


      document.getElementById("mainContent").innerHTML = views["trendMenu"]({"candidates": GameObject.candidates});

      var currentTrendReports = [];


       document.getElementById("mainContent").innerHTML += "</div><br> <div id = 'trendArea' style = 'display:none'> <svg id='visualisation' width='800' height='450'><path id='segments-line' /><path id='gap-line' /><text font-family='sans-serif' font-size='20px'>Blah</text></svg> </div>";
        /*for(var x =0; x < globals.pastPollChoices.length; x++){
          for(var y = 0; y < globals.pastPollChoices[x].length; y++){
              if(currentTrendReports.includes(globals.pastPollChoices[x][y])){

              }
              else{
                  currentTrendReports.push(globals.pastPollChoices[x][y])
              }
          }
        }*/
      
      
      
      var thing;
      var buttonHolder = document.getElementsByClassName('trendButton')

      for(var x = 0; x < buttonHolder.length; x++){
          //Each button id corresponds to a poll questions
          var idName = buttonHolder[x].getAttribute('id');
        
          //if one of the past polls included that question, enable the  button
          for(let pollResult of globals.pastPollResults){

              if(pollResult.questionIDs.includes(idName)){    	
                  document.getElementById(idName).disabled = false;
              }
          }
      }
       document.getElementById("mainContent").innerHTML += "<br>"
       document.getElementById("mainContent").innerHTML += "<button id ='buttonViewer' style = 'display:none'>Choose Another Trend Report</button>";
       document.getElementById("back").innerHTML += "<button onclick= 'eventMenu()'>Back to Game Map</button>";
       document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`trendHelpPage`)' ></img>";
    }
}
function myDataMenu()
{
    //Sets up the trend report menu
	clearScreen();
  
    if(hourChecker()){
      document.getElementById("mainContent").classList.add("center");
      updateTopBar(myDataMenu);


      document.getElementById("mainContent").innerHTML = views["myDataMenu"]({"playerImg": images["playerImg"], "player": GameObject.playerCandidate});
    }
  
}

//Creates the area in which users decide what to do
function eventMenu()
{
    //document.getElementById("gameContents").innerHTML += "<img src='"+globals.playerImg+"' style='display:none'>"
	if(hourChecker()){
    
    globals.loopable = false;
      globals.practice = false;

      //Make sure users are using the correct candidate data
      //Extra fix for the fake data polling bug
      GameObject.candidates = globals.currentCandidateArrayHolder;

      //Clear previous screen
      clearScreen();
      
      document.getElementById("contentContainer").classList.add("columns")
	  document.getElementById("mainContent").classList.add("left");
      
      saveGame();
      


      //Build Game Map buttons

      
      if(!globals.eventsLoaded){
        addLocationEvents();
      }
      
      document.getElementById("map").innerHTML = "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
      globals.c=document.getElementById("myCanvas");
      globals.ctx = globals.c.getContext("2d");
      globals.ctx.fillStyle = '#FFFFFF'

      //Display Updated Top Bar
      updateTopBar(eventMenu);
      document.getElementById('topBar').style.display = "inline-flex";
      
      let timeLeft = true;
      if(GameObject.remainingHoursDay == 1){
        timeLeft = false;
      }
      
      let context = {timeLeft: timeLeft, mapAreas: areaChoices};
      document.getElementById("mainContent").innerHTML = views["userAction"](context);
      
      //If the hover isn't set, or if it's set to "Quad"
      if(globals.isCurrentAreaHover < 1){
        globals.isCurrentAreaHover = areaChoices["Commons"].id;
      }
      for(let key in areaChoices){
        if(areaChoices[key].id == globals.isCurrentAreaHover){
          document.getElementById(key+"Choice").style.display = "block";
        }
      }


      globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
      globals.c.onmousedown = doMousedownMap;
      globals.c.onmousemove = doMouseoverMap;


      setupMap(false);
    
    
    document.getElementById("map").style.display = "block";
    document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`mapHelpPage`)' ></img>";

    }
};


function statementMenu(){
    
	clearScreen();
    
    
    if(hourChecker()){
      document.getElementById("mainContent").classList.add("center");
      updateTopBar(statementMenu);
      
      document.getElementById("mainContent").innerHTML = views["statement"]({"issues":globals.positions});

      document.getElementById("mainContent").innerHTML += "<button class='primaryBtn logStatement' onclick='statementCalc()' > Make Statement </button>";
      document.getElementById("back").innerHTML += "<button type='button' onclick='eventMenu()' >Back to Game Map</button>";
      document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`statementsHelpPage`)' ></img>";
    }

}

function helpScreen(previousScreen)
{
	globals.practice = true;
    //Shows the Help screen 
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
    //Show the top bar
    document.getElementById('topBar').style.display = "inline-flex";
  
	globals.section = 1;
    
    document.getElementById("mainContent").innerHTML = views["help"]({});
    document.getElementById("back").innerHTML = "<button class = 'logHelp' id='helpBack' class = 'logHelpEnd'>Exit </button>";
    document.getElementById("helpBack").onclick = previousScreen;
    
}

//Clears the previous screen
function clearScreen()
{
  
	var gameOutput = document.getElementById("centerDisplay");
	var prevTable = document.getElementById("table");
  
	document.getElementById('next').innerHTML = "";
    document.getElementById('back').innerHTML = "";

	gameOutput.innerHTML = "";
    
    if(document.getElementById('topBar')){
        document.getElementById('topBar').style.display = "none";
    }
    
   // document.getElementById("map").innerHTML = "";
    document.getElementById("map").style.display = "none";
    
    document.getElementById("contentContainer").className = "";
	document.getElementById("mainContent").className = "";
    
    
    document.getElementById("eventImg").innerHTML = "";
    document.getElementById("mainContent").innerHTML = "";
    //document.getElementById("statementMenu").innerHTML = "";
	prevTable.innerHTML = "<table id = 'tab' class='sortable'><thead id='tableHead'></thead><tbody id='pollTable'></tbody></table>";
}

function dayPollInfo()
{
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
    document.getElementById("mainContent").innerHTML = "<h1>End of Day Poll</h1> <br><p>Phew! After a hard day of campaigning the current electoral office will conduct a poll for each candidate. <br>You just have to fill out the questions and decide how many people they'll talk to.<br> It wont take any time on our part!</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick='drawPoll("+globals.POLL_STATES.END_OF_DAY+",true, false)'>Take Your End of Day Poll</button>";
}

function endGame()
{
	//Clear previous screen
	clearScreen();
    votePercentage(1000, -1);

	var winner;
	var winvotes = 0;
	globals.ranking = GameObject.candidates.slice();
	globals.ranking.sort(function(a, b){return b.votes-a.votes})
	document.getElementById("centerDisplay").innerHTML = "<h1> Rankings: </h1>";
	for(var i = 0; i<globals.ranking.length;i++)
	{
		document.getElementById("centerDisplay").innerHTML += "<h1>" + (i+1) + ". " + globals.ranking[i].name + " Votes: " + globals.ranking[i].votes + "</h1><br>";
	}
    globals.endReset = true; 
    GameObject.gameOver = true;
	document.getElementById("centerDisplay").innerHTML += "<h1> Winner: "+ globals.ranking[0].name +"</h1> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};

//Returns whether there are hours left in the current day
//If there are not, it advances the day
function hourChecker()
{
    //Always save the game
    saveGame()
  
    //If the current day is over
    if(GameObject.remainingHoursDay < 1){
      //If this isn't the last day, show the end of day poll
      if(globals.days < GameObject.totalDays){
        globals.days++;
        GameObject.remainingHoursDay = 12;
        dayPollInfo();
      }
      //Otherwise the game ends
      else{
        endGame();
      }
      return false;
    }
  
  //Return that there are hours left in the current day
  return true;
}

function setBackToMapBtn(){
  document.getElementById("back").innerHTML = "<button onclick= 'eventMenu()'>Back to Game Map</button>";
}
function setReturnToMapBtn(){
  document.getElementById("next").innerHTML = "<button onclick= 'eventMenu()'>Return to Game Map</button>";
}

