
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

//Creates a smaple full of randomly generated students
function createSample(x, bias)
{
	globals.sample = [];
	for (var count= 0; count < x; count++){
		var scoreHolder = getScores(x, bias);
		var holderStudent = new Student(globals.groupList[scoreHolder[0]], globals.majorList[scoreHolder[1]], scoreHolder[2], scoreHolder[3], scoreHolder[4], scoreHolder[5])
		globals.sample.push(holderStudent);
	}
}

//Randomly generates the stats for a student
function getScores(x, bias){

	var groupRandom;
    
    //Lower bias so that it matches group indices
    bias--;

	if(bias > -1){
		var coinFlip = Math.floor(Math.random()*2);
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
  
    //CONSOLE.LOG(groupRandom)
	var majorRandom = Math.floor(Math.random()* 4);
	
    let major = globals.majorList[majorRandom];
    let group = globals.groupList[groupRandom];
  
    let averageMean = (GameObject.studentTypes[major]["tuition"].mean + GameObject.studentTypes[group]["tuition"].mean) / 2;
    let averageDeviation = (GameObject.studentTypes[major]["tuition"].stdDeviation + GameObject.studentTypes[group]["tuition"].stdDeviation) / 2;    
    let tuition = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (GameObject.studentTypes[major]["budget"].mean + GameObject.studentTypes[group]["budget"].mean) / 2;
    averageDeviation = (GameObject.studentTypes[major]["budget"].stdDeviation + GameObject.studentTypes[group]["budget"].stdDeviation) / 2;
    let budget = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (GameObject.studentTypes[major]["functions"].mean + GameObject.studentTypes[group]["tuition"].mean) / 2;
    averageDeviation = (GameObject.studentTypes[major]["functions"].stdDeviation + GameObject.studentTypes[group]["tuition"].stdDeviation) / 2;
    let functions = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (GameObject.studentTypes[major]["medical"].mean + GameObject.studentTypes[group]["medical"].mean) / 2;
    averageDeviation = (GameObject.studentTypes[major]["medical"].stdDeviation + GameObject.studentTypes[group]["medical"].stdDeviation) / 2;
    let medical = normalDistribution(averageMean, averageDeviation);

     tuition = tuition.toFixed(2);
     budget = budget.toFixed(2);
     functions = functions.toFixed(2);
     medical = medical.toFixed(2);
  
	var returnArray = [groupRandom, majorRandom, tuition, budget, functions, medical];
	return returnArray;
}

//Calculates the candidate who would recieve the vote for each student 
function votePercentage(sampleSize, bias)
{
	//////CONSOLE.LOG(candidates);
	createSample(sampleSize, bias);
	var finalWinner = "";
	for(var i=0;i<GameObject.candidates.length; i++)
		{
			GameObject.candidates[i].votes = 0;
		}
	for(var i =0; i<globals.sample.length; i++)
	{
		var winPercentage=0;
		var winner ="";
		var lowPercentage=0;
		var loser ="";
		for(var j=0;j<GameObject.candidates.length; j++)
		{

			//////CONSOLE.LOG(globals.sample[i]);
			var fame = 0;
            
			fame = fameCalc(GameObject.candidates[j], globals.sample[i]);
			//////CONSOLE.LOG(GameObject.candidates[j].name +" Fame: "+ fame);
		    var issues = parseFloat(globals.sample[i].tuitionScore) * parseFloat(GameObject.candidates[j].issueScore[0])
            issues += parseFloat(globals.sample[i].budgetScore) * parseFloat(GameObject.candidates[j].issueScore[1])
		    issues += parseFloat(globals.sample[i].functionScore)* parseFloat(GameObject.candidates[j].issueScore[2])
		    issues += parseFloat(globals.sample[i].medicalScore)  * parseFloat(GameObject.candidates[j].issueScore[3])
		  
            issues = issues/4;

            
            
			/*if(GameObject.candidates[j].name != "Karma")
			{
                if(issues < 0){
                  candWinPer = -10*Math.pow(fame*issues,2) - GameObject.candidates[j].consMod;
                }
                else{
                  candWinPer = 10*Math.pow(fame*issues,2) - GameObject.candidates[j].consMod;
                }
			}
			else
			{
                if(GameObject.totalDays>5)
                {
                    candWinPer = 10*0.4*issues;
                }
                else
                {
                    candWinPer = 10*0.35*issues;
                }
			}*/
          
            let sign = 1;
            let consMod = GameObject.candidates[j].consMod;
          
          
            //If their issues score is less than zero,
            //Hold onto that so we can reapply it after Math.pow
            if(issues < 0){
              sign = -1;
            }
          
            //If this is Karma, she has a lowered modifier
            /*if(GameObject.candidates[j].name == "Karma")
			{
              //Set Karma's fame to (2/Number of total days)
              //This makes karma's score lower when there are more days aka easier difficulty
              fame = (2/GameObject.totalDays);
            }*/
          
            /*
              Fame scale: 0 to 1
              Consistency scale: 0 to .5
            */
          
            //Multiple by the sign to restore the positive/negative
            //Multiple by modifier to boost overall score
            //Square to make the score more extreme
            //Subtract the consistency modifier, which is boosted by a modifier of 8
            let candWinPer = (sign * 10 * Math.pow(fame * issues, 2)) - (8*consMod);

			if(candWinPer > winPercentage|| winPercentage ==0)
			{
				winPercentage = candWinPer;
				winner = GameObject.candidates[j].name;
			}

			if(candWinPer < lowPercentage || lowPercentage ==0)
			{
				lowPercentage = candWinPer;
				loser = GameObject.candidates[j].name;
			}
		}
			////CONSOLE.LOG("Current Winner" + winner + " Current Loser" + loser)
		//////CONSOLE.LOG("Student #" +i);
		//////CONSOLE.LOG("Winner: " + winner + " Vote Percentage: "+ winPercentage);
		//////CONSOLE.LOG("Loser: " + loser + " Vote Percentage: "+ lowPercentage);
		//////CONSOLE.LOG("");
		globals.sample[i].results.winPer = winPercentage;
		globals.sample[i].results.losPer = lowPercentage;
		globals.sample[i].results.win = winner;
		globals.sample[i].results.los = loser;
      
		for(var k=0;k<GameObject.candidates.length; k++)
		{
			if(GameObject.candidates[k].name == winner)
			{
				GameObject.candidates[k].votes++;
			}
		}
	}
}

function TempStudent(bias){
  let groupNumber;
	if(bias > -1){
		var coinFlip = Math.floor(Math.random()*2);
		if(coinFlip == 1){
            groupNumber = bias;
        }
		else{
		  groupNumber = Math.floor(Math.random()* 4);
          while(groupNumber == bias){
		    groupNumber = Math.floor(Math.random()* 4);
		  }
		}
	}
    //If there's no bias, generate a random group
	else{
		groupNumber = Math.floor(Math.random()* 4);
	}
  
    //Generate random major
	var majorRandom = Math.floor(Math.random()* 4);
	
    let major = globals.majorList[majorRandom];
    let group = globals.groupList[groupNumber];
  
    let averageMean = (GameObject.studentTypes[major]["tuition"].mean + GameObject.studentTypes[group]["tuition"].mean) / 2;
    let averageDeviation = (GameObject.studentTypes[major]["tuition"].stdDeviation + GameObject.studentTypes[group]["tuition"].stdDeviation) / 2;    
    let tuition = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (GameObject.studentTypes[major]["budget"].mean + GameObject.studentTypes[group]["budget"].mean) / 2;
    averageDeviation = (GameObject.studentTypes[major]["budget"].stdDeviation + GameObject.studentTypes[group]["budget"].stdDeviation) / 2;
    let budget = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (GameObject.studentTypes[major]["functions"].mean + GameObject.studentTypes[group]["tuition"].mean) / 2;
    averageDeviation = (GameObject.studentTypes[major]["functions"].stdDeviation + GameObject.studentTypes[group]["tuition"].stdDeviation) / 2;
    let functions = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (GameObject.studentTypes[major]["medical"].mean + GameObject.studentTypes[group]["medical"].mean) / 2;
    averageDeviation = (GameObject.studentTypes[major]["medical"].stdDeviation + GameObject.studentTypes[group]["medical"].stdDeviation) / 2;
    let medical = normalDistribution(averageMean, averageDeviation);

    tuition = tuition.toFixedNumber(2);
    budget = budget.toFixedNumber(2);
    functions = functions.toFixedNumber(2);
    medical = medical.toFixedNumber(2);
    
    //Calculate favorite issue
    var fav =0;
    var favName = "";
    if(fav < budget || fav==0)
    {
        fav = budget;
        favName = "budget";
    }
    if(fav < tuition || fav==0)
    {
        fav = tuition;
        favName = "tuition";
    }
    if(fav < functions || fav==0)
    {
        fav = functions;
        favName = "functions";
    }
    if(fav < medical || fav==0)
    {
        fav = medical;
        favName = "medical";
    }
    
    //Calculate least favorite issue
    var leastFav = 0;
    var leastFavName = "";
    if(leastFav > budget || leastFav==0)
    {
        leastFav = budget;
        leastFavName = "budget";
    }
    if(leastFav > tuition || leastFav==0)
    {
        leastFav = tuition;
        leastFavName = "tuition";
    }
    if(leastFav > functions || leastFav==0)
    {
        leastFav = functions;
        leastFavName = "functions";
    }
    if(leastFav > medical || leastFav==0)
    {
        leastFav = medical;
        leastFavName = "medical";
    }  
    
    this.major = major;
    this.group = group;
    this.issueOpinion_tuition = tuition;
    this.issueOpinion_budget = budget;
    this.issueOpinion_functions = functions;
    this.issueOpinion_medical = medical;
    this.issueFav = favName;
    this.issueOpp = leastFavName;
    
}


Number.prototype.toFixedNumber = function(numDigits){
  var poweredNum = Math.pow(10 , numDigits);
  return Math.round(this * poweredNum) / poweredNum ;
}

function getPollStudent(tempStudent, pollChoices){
  let pollStudent = new PollStudent();

  for(let questionId of pollChoices){
    pollStudent.answers[questionId] = tempStudent[questionId];
  }
  return pollStudent;
}


function getAllCompressedStudents(students, pollChoices){
  let compressedStudents = [];
  debugger;
  for(let student of students){
    compressedStudents.push(getCompressedStudent(student, pollChoices));
  }
  return compressedStudents;
}

function createSample2(numStudents, bias, pollChoices)
{
    //Lower bias so that it matches group indices
    bias--;
  
    let newSample = [];
	for (var i = 0; i < numStudents; i++){
      //let tempStudent = new TempStudent(bias);
      newSample.push(new TempStudent(bias));//getPollStudent(tempStudent, pollChoices)); 
    }
    
    return newSample;
}

//Calculates the candidate who would recieve the vote for each student 
function votePercentage2(sampleSize, bias, pollChoices)
{
	//////CONSOLE.LOG(candidates);
	let studentSample = createSample2(sampleSize, bias, pollChoices);
  
	var finalWinner = "";
	for(var i=0;i<GameObject.candidates.length; i++)
    {
        GameObject.candidates[i].votes = 0;
    }
  
	for(let i = 0; i < studentSample.length; i++)
	{
        let student = studentSample[i];
      
		var winPercentage=0;
		var winner ="";
		var lowPercentage=0;
		var loser ="";
      
		for(var j=0;j<GameObject.candidates.length; j++)
		{   
            let candidate = GameObject.candidates[j];
          
			var fame = fameCalc(candidate, student);
            let consMod = candidate.consMod;
            
            //If this candidate is the player, store the fame and trust scores as "Player"
            if(candidate.isPlayer){
              student["candFame_Player"] = fame;
              student["candTrust_Player"] = consMod;
            }
            else{
              student["candFame_"+candidate.name] = fame;
              student["candTrust_"+candidate.name] = consMod;
              
              student["candFameFirst_"+candidate.name] = fame;
              student["candTrustFirst_"+candidate.name] = consMod;
            }
            
			//Calculate similarity of student and candidate issues
		    var issues = parseFloat(student.issueOpinion_tuition) * parseFloat(candidate.issueScore[0])
            issues += parseFloat(student.issueOpinion_budget) * parseFloat(candidate.issueScore[1])
		    issues += parseFloat(student.issueOpinion_functions)* parseFloat(candidate.issueScore[2])
		    issues += parseFloat(student.issueOpinion_medical)  * parseFloat(candidate.issueScore[3])
		  
            issues = issues/4;
          
            
            //If their issues score is less than zero,
            //Hold onto that so we can reapply it after Math.pow
            let sign = 1;
            if(issues < 0){
              sign = -1;
            }
          
            /*
              Fame scale: 0 to 1
              Consistency scale: 0 to .5
            */
          
            //Multiple by the sign to restore the positive/negative
            //Multiple by modifier to boost overall score
            //Square to make the score more extreme
            //Subtract the consistency modifier, which is boosted by a modifier of 8
            let candWinPer = (sign * 10 * Math.pow(fame * issues, 2)) - (8*consMod);

			if(candWinPer > winPercentage|| winPercentage ==0)
			{
				winPercentage = candWinPer;
				winner = candidate.name;
			}

			if(candWinPer < lowPercentage || lowPercentage ==0)
			{
				lowPercentage = candWinPer;
				loser = candidate.name;
			}
		}
        student.candFav = winner;
        student.candOpp = loser;
      
		for(var k=0;k<GameObject.candidates.length; k++)
		{
			if(GameObject.candidates[k].name == winner)
			{
				GameObject.candidates[k].votes++;
			}
		}
      
        
        //Remove unnecessary questions
        studentSample[i] = getPollStudent(student, pollChoices);
	}
    return studentSample;
}

//Calculates the fame of the player's candidate based on a students group
function fameCalc(cand, student)
{
	var fame = 0;
	switch(student.group)
	{
		case globals.groupList[0]:

		fame+= cand.fame[0];
		break;
    
		case globals.groupList[1]:
		
		fame+= cand.fame[1];
		break;
    
		case globals.groupList[2]:
	
		fame+= cand.fame[2];
		break;
    
		case globals.groupList[3]:
	
		fame+= cand.fame[3];
		break;
    
	}
	switch(student.major)
	{
		case globals.majorList[0]:

		fame+= cand.fame[4];
		break;

		case globals.majorList[1]:
	
		fame+= cand.fame[5];
		break;

		case globals.majorList[2]:

		fame+= cand.fame[6];
		break;

		case globals.majorList[3]:

		fame+= cand.fame[7];
		break;

	}
	return fame/4;
}