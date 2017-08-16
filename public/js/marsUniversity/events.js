function chooseEvent(choice)
{
	//Clear previous screen
	//var choice = $('input[name="actionRadio"]:checked').val();
	if(choice != undefined)
	{
        //Decrement choice to match arrayPos
        choice--;
      
		clearScreen();
		updateTopBar(eventMenu);
	
		var nextArea = document.getElementById("next");
		nextArea.innerHTML = "";
		let chosenEvent = globals.events[choice];
		////CONSOLE.LOG(chosenEvent);
		globals.back = false;
		
      
		if(GameObject.remainingHoursDay >= chosenEvent.timeRequired)
		{   
            document.getElementById("mainContent").classList.add("left");
            document.getElementById("contentContainer").classList.add("columns");
            document.getElementById("mainContent").innerHTML = "<div id='eventInfo'></div>";
          
			chosenEvent = globals.events[choice];
	
			if(chosenEvent.type=="smallEvent")
			{
				
				document.getElementById("eventImg").innerHTML += "<img src = '' id = 'eventbg' width = '600'   > </img>";
				document.getElementById("eventbg").src = chosenEvent.path;
              
              
				//Creates the screen for the event
				var eventHours = parseInt(chosenEvent.timeRequired);
                document.getElementById("eventInfo").innerHTML += "<h3>" + chosenEvent.name + " </h3>";
				document.getElementById("eventInfo").innerHTML += "<h4>" + chosenEvent.text + " </h4>";
				
	
				if(chosenEvent.groupPos != [])
				{
					var effects = chosenEvent.groupPos.split(',');
					var posText =  "<h4> These Groups will be affected positively: ";
					for (var i =0; i< effects.length;i++)
					{
					switch(effects[i])
					{
						case "Arts":
							posText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
						break;
						case "Bus":
							posText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
						break;
						case "Law":
							posText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
						break;
						case "Tech":
							posText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
						break;
	
						case "Gam":
							posText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
						break;
						case "Soc":
							posText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
						break;
						case "Read":
							posText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
						break;
						case "Ath":
							posText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
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
					document.getElementById("eventInfo").innerHTML += posText+ " </h4>";
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
							negText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
						break;
						case "Bus":
							negText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
						break;
						case "Law":
							negText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
						break;
						case "Tech":
							negText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
						break;
	
						case "Gam":
							negText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
						break;
						case "Soc":
							negText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
						break;
						case "Read":
							negText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
						break;
						case "Ath":
							negText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
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
					document.getElementById("eventInfo").innerHTML += negText+ " </h4>";
				}
				
				for(var i =0; i<chosenEvent.options.length; i++)
				{
					var totalText = "";
					if( (eventHours + parseInt(chosenEvent.options[i].extraTime)) <= GameObject.remainingHoursDay)
					{
						if(i == 0)
						{
							document.getElementById("eventInfo").innerHTML += "<br><span style = 'font-weight: bold' > Additional Options: <br></span>";
							document.getElementById("eventInfo").innerHTML += "<input type='radio' name = 'option' id = 'none' checked>None<br>";
	
						}
						var posText ="";
						var negText = "";
						if(chosenEvent.options[i].posEffects != [])
						{
							var effects = chosenEvent.options[i].posEffects.split(',');
							posText =  " -  Extra Positive Effects: ";
							for (var j =0; j< effects.length;j++)
							{
								switch(effects[j])
								{
									case "Arts":
										posText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
									break;
									case "Bus":
										posText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
									break;
									case "Law":
										posText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
									break;
									case "Tech":
										posText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
									break;
				
									case "Gam":
										posText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
									break;
									case "Soc":
										posText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
									break;
									case "Read":
										posText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
									break;
									case "Ath":
										posText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
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
							negText =  " -  Extra Negative Effects: ";
							for (var j =0; j< negEffects.length;j++)
							{
								switch(negEffects[j])
								{
									case "Arts":
										negText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
									break;
									case "Bus":
										negText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
									break;
									case "Law":
										negText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
									break;
									case "Tech":
										negText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
									break;
				
									case "Gam":
										negText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
									break;
									case "Soc":
										negText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
									break;
									case "Read":
										negText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
									break;
									case "Ath":
										negText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
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
						document.getElementById("eventInfo").innerHTML += "<input type='radio' name = 'option' id = " + chosenEvent.options[i].optionID + ">" + chosenEvent.options[i].optionName + " - 3 Hours Total" +totalText+"<br> ";
					}
				}
			}
		document.getElementById("eventInfo").innerHTML += "<br> <button class='logEvent primaryBtn' id='"+choice+"' onclick='submitEvent(" + choice + "," + eventHours + ")' > Perform Event </button><br> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'   onclick = 'chooseHelpPage(`functionsHelpPage`)' ></img>";
		}
		else
		{
			document.getElementById("eventInfo").innerHTML += "<h4> You dont have the enough time left to do the selected action. \n Return to the Game Map to select another action or end the game.</h4>";
		}
		document.getElementById("back").innerHTML += "<button type='button' onclick='eventMenu()' >Back to Game Map</button>";
  
		//Show changes to screen
        document.getElementById("eventImg").style.display = "block";
		}
	else
	{
			document.getElementById("infoText").innerHTML = "<h4>You must select an event first!</h4>";
	}
};

//Subtracts from the remaining hours,
function submitEvent(id, eventHours, Pos, Neg)
{

	//Subtracts hours from the remaining hours in the game
	chosenEvent = globals.events[id];
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
			globals.remainingHoursTotal-= eventHours;
			GameObject.remainingHoursDay-= eventHours;
			calcEventScore(GameObject.candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
			minigamePlayer(parseInt(loaderNum));
		}
		else
			eventResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
	}
		else
			eventResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
}

function eventResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects)
{
	////CONSOLE.LOG(globals.remainingHoursTotal)
	globals.remainingHoursTotal-= eventHours;
	GameObject.remainingHoursDay-= eventHours;

	GameObject.candidates[1].lastMove = chosenEvent.name;

	//Changes the player's score
	calcEventScore(GameObject.candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
	saveGame();
	clearScreen();
    updateTopBar(eventMenu);
    
	document.getElementById("centerDisplay").innerHTML += "<div id= 'evRes'><h2>You Positively Affected Your Fame With These Groups: </h2></div>";
	var posText = ""; 
	for (var i =0; i< totalPosEffects.length;i++)
	{
        let affectedStudents = "";
        let imgName = "";
		switch(totalPosEffects[i])
		{
		    
			case "Arts":
                affectedStudents = "Arts Majors";
                imgName = "artisticon";
			    break;
		
			case "Bus":
                affectedStudents = "Business Majors";
                imgName = "businessicon";
			    break;
			case "Law":
                affectedStudents = "Law Majors";
                imgName = "lawicon";
			    break;
			case "Tech":
                affectedStudents = "Technology Majors";
                imgName = "techicon";
			    break;
			case "Soc":
		        affectedStudents = "Socialites";
                imgName = "socialiteicon";
			    break;
			case "Read":
                affectedStudents = "Readers";
                imgName = "readericon";
			    break;
			case "Gam":
                affectedStudents = "Gamers";
                imgName = "gamericon";
                break;
			case "Ath":
		        affectedStudents = "Athletes";
                imgName = "athleteicon";
			    break;
		}
      
        posText += "<div class='effectsHeader'><h3>"+affectedStudents+"</h3><img width = '30' height='30' src = '../img/icons/"+imgName+".png'></div>";
	}
	document.getElementById("evRes").innerHTML += posText;
    
    let eventImg = new Image();
    eventImg.src = chosenEvent.path;
  
    let playerImg = images["playerImg"];
  
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 338;
    let ctx = tempCanvas.getContext('2d');
    ctx.drawImage(eventImg, 0, 0, 600, 338);
    ctx.drawImage(playerImg, 230, 0);
    
    let finalImg = tempCanvas.toDataURL("image/png");
    
	document.getElementById("centerDisplay").innerHTML += "<img class='resolutionImg' width = '600' src = '"+finalImg+"'> </img>";
  
    document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick= 'eventMenu()'>Return to Game Map</button>";
};

//Takes in an Arrays of Groups to affect with the score increase, and parses through each adding the specified increase in score
function calcEventScore(candidate, scoreInc, groupPos, groupNeg)
{

	//////CONSOLE.LOG(candidate.issueScore);
	//////CONSOLE.LOG(scoreInc);
	for(var i=0;i<groupPos.length;i++)
	{
        candidate.fame[groupPos[i]] += parseFloat(scoreInc);
        if(candidate.fame[groupPos[i]] > 2)
        {
            candidate.fame[groupPos[i]] = 2;
        }
        if(candidate.fame[groupPos[i]] < .1)
        {
            candidate.fame[groupPos[i]] = .1;
        }

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
	//////CONSOLE.LOG(GameObject.candidates[0].issueScore);
	}
}

//Shows the results of a minigame after it's completed
function minigameResults(scores, tutorial, loop)
{
	if(!loop)
	{
		clearScreen();
		var scoreToLog = scores.score;
		if(!tutorial)
		{
			globals.remainingHoursTotal-=1;
			GameObject.remainingHoursDay-=1;
			var pos = chosenEvent.groupPos.split(',');
			////CONSOLE.LOG(pos);
			var posText =  "<h4>You completed the minigame with a score of "+scores.score+" <br>You increased your popularity with these groups: ";
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
			posText += "<br>If you had trouble with this minigame you can replay it to practice in the help menu without using your time.</h4> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`minigameHelpPage`)' ></img><br>";
			if(scores.score <= scores.tier1)
			{			
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(GameObject.candidates[0], 0.1,pos,[]);
			}
			else if(scores.score <= scores.tier2 && scores.score >scores.tier1)
			{
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(GameObject.candidates[0], 0.2,pos,[]);
			}
			else if(scores.score <= scores.tier3 && scores.score >scores.tier2)
			{
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(GameObject.candidates[0], 0.3,pos,[]);
			}
			else if(scores.score > scores.tier3)
			{
				if( scores.score> scores.tier4)
					scores.score = scores.tier4;
				var x = .3 + (.01*(scores.score-scores.tier3));
				x = x.toFixed(2);
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(GameObject.candidates[0], x,pos,[]);
			}
			else{
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(GameObject.candidates[0], (scores * .1),pos,[]);
			}
			
			saveGame();
			$.post('/game/loggerMinigame', {minigameID: globals.lastMinigame, score: scoreToLog, module: '1', session: GameObject.gameSession });
				document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick = 'eventMenu()'> Return to the Game Map </button>";
		}
		else
		{
			var posText =  "<h4>You completed the minigame with a score of "+ (scores.score) + ". <br>If you had trouble with this minigame you can replay it to practice in the help menu without using your time.</h4> "; 
			document.getElementById("centerDisplay").innerHTML = posText;
			document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			if(globals.inGame)
			{
						document.getElementById("next").innerHTML += "<button onclick = 'helpScreen(eventMenu)'> Return to the Practice Screen </button>";
			}
			else
			document.getElementById("next").innerHTML += "<button onclick = 'practiceMenu()'> Return to the Practice Screen </button>";
		}
	}
	else
	{
		globals.loopable = false;
	}
}

//Minigame
function minigamePlayer(id){
		//Clear previous screen
	globals.lastMinigame = id;
	clearScreen();

	document.getElementById("centerDisplay").innerHTML += "<div id = 'centerCanvas'><canvas id='myCanvas' width='880px' height = '500px' style = 'margin: 0 auto; float:none;'></canvas></div><br>";
	globals.c=document.getElementById("myCanvas");
	globals.ctx = globals.c.getContext("2d");


	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	////CONSOLE.LOG(id);
	switch(id)
	{
		case 1:
		runningGame.main.init(globals.c,globals.ctx);
		break;
		case 2:
		runningGame2.main.init(globals.c,globals.ctx);
		break;
		case 3:
		secretSticker.main.init(globals.c,globals.ctx);
		break;
		case 4:
		runningGame4.main.init(globals.c,globals.ctx);
		break;
		case 5:
		tshirtCannon.main.init(globals.c,globals.ctx);
		break;
	}	
}

function practiceGame(id){
		//Clear previous screen
	clearScreen();
	
	document.getElementById("centerDisplay").innerHTML += "<canvas id='myCanvas' width='900px' height = '500px' style='float:none'></canvas><br>";

	globals.c=document.getElementById("myCanvas");
	globals.ctx = globals.c.getContext("2d");
	if(globals.inGame)
	{
		document.getElementById("back").innerHTML += "<button onclick = 'helpScreen(eventMenu)'> Back to Help Menu</button>";
	}
	else
	{
		document.getElementById("back").innerHTML += "<button onclick = 'practiceMenu()'> Back to Practice Area</button>";
	}

	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	switch(id)
	{
		case 1:
		runningGame.main.init(globals.c,globals.ctx);
		break;
		case 2:
		runningGame2.main.init(globals.c,globals.ctx);
		break;
		case 3:
		secretSticker.main.init(globals.c,globals.ctx);
		break;
		case 4:
		runningGame4.main.init(globals.c,globals.ctx);
		break;
		case 5:
		tshirtCannon.main.init(globals.c,globals.ctx);
		break;
	}	
}
