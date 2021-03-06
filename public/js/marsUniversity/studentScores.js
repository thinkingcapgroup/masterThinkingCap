
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
  
    let averageMean = (globals.studentTypes[major]["tuition"].mean + globals.studentTypes[group]["tuition"].mean) / 2;
    let averageDeviation = (globals.studentTypes[major]["tuition"].stdDeviation + globals.studentTypes[group]["tuition"].stdDeviation) / 2;    
    let tuition = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (globals.studentTypes[major]["budget"].mean + globals.studentTypes[group]["budget"].mean) / 2;
    averageDeviation = (globals.studentTypes[major]["budget"].stdDeviation + globals.studentTypes[group]["budget"].stdDeviation) / 2;
    let budget = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (globals.studentTypes[major]["functions"].mean + globals.studentTypes[group]["tuition"].mean) / 2;
    averageDeviation = (globals.studentTypes[major]["functions"].stdDeviation + globals.studentTypes[group]["tuition"].stdDeviation) / 2;
    let functions = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (globals.studentTypes[major]["medical"].mean + globals.studentTypes[group]["medical"].mean) / 2;
    averageDeviation = (globals.studentTypes[major]["medical"].stdDeviation + globals.studentTypes[group]["medical"].stdDeviation) / 2;
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
	for(var i=0;i<globals.candidates.length; i++)
		{
			globals.candidates[i].votes = 0;
		}
	for(var i =0; i<globals.sample.length; i++)
	{
		var winPercentage=0;
		var winner ="";
		var lowPercentage=0;
		var loser ="";
		for(var j=0;j<globals.candidates.length; j++)
		{

			//////CONSOLE.LOG(globals.sample[i]);
			var fame = 0;
            
			fame = fameCalc(globals.candidates[j], globals.sample[i]);
			//////CONSOLE.LOG(globals.candidates[j].name +" Fame: "+ fame);
		    var issues = parseFloat(globals.sample[i].tuitionScore) * parseFloat(globals.candidates[j].issueScore[0])
            issues += parseFloat(globals.sample[i].budgetScore) * parseFloat(globals.candidates[j].issueScore[1])
		    issues += parseFloat(globals.sample[i].functionScore)* parseFloat(globals.candidates[j].issueScore[2])
		    issues += parseFloat(globals.sample[i].medicalScore)  * parseFloat(globals.candidates[j].issueScore[3])
		  
            issues = issues/4;

            
            
			/*if(globals.candidates[j].name != "Karma")
			{
                if(issues < 0){
                  candWinPer = -10*Math.pow(fame*issues,2) - globals.candidates[j].consMod;
                }
                else{
                  candWinPer = 10*Math.pow(fame*issues,2) - globals.candidates[j].consMod;
                }
			}
			else
			{
                if(globals.totalDays>5)
                {
                    candWinPer = 10*0.4*issues;
                }
                else
                {
                    candWinPer = 10*0.35*issues;
                }
			}*/
          
            let sign = 1;
            let consMod = globals.candidates[j].consMod;
          
          
            //If their issues score is less than zero,
            //Hold onto that so we can reapply it after Math.pow
            if(issues < 0){
              sign = -1;
            }
          
            //If this is Karma, she has a lowered modifier
            /*if(globals.candidates[j].name == "Karma")
			{
              //Set Karma's fame to (2/Number of total days)
              //This makes karma's score lower when there are more days aka easier difficulty
              fame = (2/globals.totalDays);
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
				winner = globals.candidates[j].name;
			}

			if(candWinPer < lowPercentage || lowPercentage ==0)
			{
				lowPercentage = candWinPer;
				loser = globals.candidates[j].name;
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
      
		for(var k=0;k<globals.candidates.length; k++)
		{
			if(globals.candidates[k].name == winner)
			{
				globals.candidates[k].votes++;
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