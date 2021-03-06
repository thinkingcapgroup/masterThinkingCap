
//calculated the effectiveness of your statement & consistancy modifier
function statementCalc()
{
	if(globals.remainingHoursDay > 0)
	{
		var currentStatement = document.getElementById("statements").value;
		var currentPosNeg = document.getElementById("posneg").value;
		//if positive statement
		if(currentPosNeg == 0){
			globals.candidates[0].issueScore[currentStatement] += 0.3;
			if(currentStatement == 0){
				globals.candidates[0].tuitPos += 1;
			}
			else if(currentStatement == 1){
				globals.candidates[0].budPos += 1;
			}
			else if(currentStatement == 3){
				globals.candidates[0].medPos += 1;
			}
			else if(currentStatement == 2){
				globals.candidates[0].funcPos += 1;
			}
		}
		//if negative statement
		else{
		
				globals.candidates[0].issueScore[currentStatement] -= 0.3;
				if(currentStatement == 0){
					globals.candidates[0].tuitNeg += 1;
				}
				else if(currentStatement == 1){
					globals.candidates[0].budNeg += 1;
				}
				else if(currentStatement == 3){
					globals.candidates[0].medNeg += 1;
				}
			else if(currentStatement == 2){
				globals.candidates[0].funcNeg += 1;
				}
	
		}
		//calculate the candidate's constitution mod
	
		var tuitCond,
			athCond,
			medCond,
			eventCond;
	
	
		//check if the issues have anything even in them
		if(globals.candidates[0].tuitPos>0 || globals.candidates[0].tuitNeg > 0){
			tuitCond = (Math.min(globals.candidates[0].tuitPos, globals.candidates[0].tuitNeg))/(globals.candidates[0].tuitPos+globals.candidates[0].tuitNeg);
		}
		else{
			tuitCond = 0;
		}
	
		if(globals.candidates[0].budPos>0 || globals.candidates[0].budNeg>0){
			athCond = (Math.min(globals.candidates[0].budPos, globals.candidates[0].budNeg))/(globals.candidates[0].budPos+globals.candidates[0].budNeg);
		}
		else{
			athCond = 0;
		}
	
		if(globals.candidates[0].medPos>0 || globals.candidates[0].medNeg>0){
			medCond = (Math.min(globals.candidates[0].medPos, globals.candidates[0].medNeg))/(globals.candidates[0].medPos+globals.candidates[0].medNeg);
		}
		else{
			medCond = 0;
		}
	
		if(globals.candidates[0].funcPos>0 || globals.candidates[0].funcNeg>0){
			eventCond = (Math.min(globals.candidates[0].funcPos, globals.candidates[0].funcNeg))/(globals.candidates[0].funcPos+globals.candidates[0].funcNeg);
		}
		else{
			eventCond = 0;
		}
	
		var condHolder = (tuitCond + athCond + medCond + eventCond)/4;
		globals.candidates[0].consMod = condHolder;
		//decrease 1 hour and continue back to user action
		globals.remainingHoursTotal--;
		globals.remainingHoursDay--;
		statementCalcOtherCandidate(1);
	}
    statementResults(currentStatement, currentPosNeg);
}


function statementResults(statement, statementValue)
{
    clearScreen();
    updateTopBar(statementMenu);
  
    if(!globals.back){
        saveGame();
    }
    var state = parseInt(statement); 
    
    let issue;
    let stance;
    let imgIssue;
    let imgStance;
  
    if(statementValue == 0){
      stance = "in favor of";
      imgStance = "pos";
    }
    else{
      stance = "against";
      imgStance = "neg";
    }
    
    switch(state){
      case 0:
        issue = "lowering tuition";
        imgIssue = "tuition";
        break;
      case 1:
        issue = "increasing the budget";
        imgIssue = "budget";
        break;
      case 2:
        issue = "having more school functions";
        imgIssue = "functions";
        break;
      case 3:
        issue = "improving medical services";
        imgIssue = "medical";
        break;
    }
  
    let effectImg = images[imgStance+"Icon"];
    let issueImg = images[imgIssue+"Icon"];
    //let statementImg = images[imgIssue+imgStance];
    let statementBackground = images["statementBackground"];
    let statementPodium = images["statementPodium"];
  
    let playerImg = images["playerImg"];
  
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 338;
    let ctx = tempCanvas.getContext('2d');
    ctx.drawImage(statementBackground, 0, 0, 600, 338);
  
    //ctx.translate(50, 400 + 50)
    //ctx.scale(-1, 1);
    ctx.save();
    ctx.scale(-1, 1)
    ctx.drawImage(playerImg, 40, -25, -250, 278);
    ctx.restore();
    
    ctx.drawImage(statementPodium, 0, 0, 600, 338);
  
    ctx.save();
    ctx.fillStyle = "#93dfef";
    ctx.fillRect(300, 30, 230, 280);
    ctx.restore();
  
    ctx.drawImage(effectImg, 315, 30, 200, 200);
    ctx.drawImage(issueImg, 365, 190, 100, 100);
  
    let finalImg = tempCanvas.toDataURL("image/png");
  
  
    document.getElementById("centerDisplay").innerHTML += "<h2 style='margin-bottom: 1em;'>You made a great speech "+stance+" "+issue+"</h2>";
    document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '"+finalImg+"'> ";
  
	document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick='eventMenu()'>Return to the Game Map</button>";
}

//repeats the statement at a lowered effect for Karma
function statementCalcOtherCandidate(x){
	var currentStatement = document.getElementById("statements").value;
	var currentPosNeg = document.getElementById("posneg").value;

	if(currentPosNeg == 0){
		globals.candidates[x].issueScore[currentStatement] += 0.75;
		if(currentStatement == 0){
			globals.candidates[x].tuitPos += 1;
		}
		else if(currentStatement == 1){
			globals.candidates[x].budPos += 1;
		}
		else if(currentStatement == 3){
			globals.candidates[x].medPos += 1;
		}
		else if(currentStatement == 2){
			globals.candidates[x].funcPos += 1;
		}
	}
	else{
		if(currentPosNeg == 1){
			//globals.candidates[x].issueScore[currentStatement] -= 0.75;
			if(currentStatement == 0){
				globals.candidates[x].tuitNeg += 1;
			}
			else if(currentStatement == 1){
				globals.candidates[x].budNeg += 1;
			}
			else if(currentStatement == 3){
				globals.candidates[x].medNeg += 1;
			}
            else if(currentStatement == 2){
			globals.candidates[x].funcNeg += 1;
			}
		}
	}
	globals.candidates[x].lastMove = "Statement";
}