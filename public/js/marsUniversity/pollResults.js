
//Calculates the results of each poll question from each student in the sample and stores them in an array
function pollCalc(pollChoices, sampleSize, bias, state, isFree, isFake)
{	
    
    //Adds the data for Major and Social Group to the graph and label arrays
	let graphData = [];
	graphData.push(globals.questions[4].graph.split(','));
	//graphData.push(globals.questions[5].graph.split(','));
	graphData.push(globals.questions[6].graph.split(','));
	
	globals.tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
	
	var pollLabelArray = [];
	pollLabelArray.push(globals.questions[4].labels.split(','));
	//pollLabelArray.push(globals.questions[5].labels.split(','));
	pollLabelArray.push(globals.questions[6].labels.split(','));
    
    //Goes through each question selected, exapnds the size of graphData by one and pushes the label into the pollLabelArray
  
    console.log("Number of candidates: ");
	for(var i =0; i<pollChoices.length;i++)
	{
		switch(pollChoices[i])
		{
			case "candFav":
              var array =[];
              var array2 =[];
              for(var j =0; j < GameObject.candidates.length;j++ )
              {
                  array.push(0);
                  array2.push(GameObject.candidates[j].name);
              }
              graphData.push(array);
              pollLabelArray.push(array2);
              break;
			case "candOpp":
              var array =[];
              var array2 =[];
              for(var j =0; j < GameObject.candidates.length;j++ )
              {
                  array.push(0);
                  array2.push(GameObject.candidates[j].name);
              }
              graphData.push(array);
              pollLabelArray.push(array2);
              break;
			default:
				for(var j =0; j < globals.questions.length; j++)
				{
					if(pollChoices[i] == globals.questions[j].value)
					{
						graphData.push(globals.questions[j].graph.split(','));
						pollLabelArray.push(globals.questions[j].labels.split(','));
                        console.log("check match");
					}
					else
					{
						if(globals.questions[j].value == "issue")
						{
							for(var k =0; k< globals.positionsLower.length; k++)
							{
								if(pollChoices[i] == "issue" + globals.positionsLower[k])
								{
									graphData.push(globals.questions[j].graph.split(','));
									pollLabelArray.push(globals.questions[j].labels.split(','));
								}
							}
						}
						else if(globals.questions[j].value == "candFame")
						{
							for(var k =0; k< GameObject.candidates.length; k++)
							{
								if(pollChoices[i] == "candFame" + GameObject.candidates[k].name)
								{
									graphData.push(globals.questions[j].graph.split(','));
									pollLabelArray.push(globals.questions[j].labels.split(','));
								}
							}
						}
						else if(globals.questions[j].value == "candTrust")
						{
							for(var k =0; k< GameObject.candidates.length; k++)
							{
								if(pollChoices[i] == "candTrust" + GameObject.candidates[k].name)
								{
									graphData.push(globals.questions[j].graph.split(','));
									pollLabelArray.push(globals.questions[j].labels.split(','));
								}
							}
						}
					}
				}
			break;
		}

	}
    //Creates the sample for the poll
	votePercentage(sampleSize, bias);
  
    ////CONSOLE.LOG(GameObject.candidates);
	//Gets the results of each question and pushes them into the proper sectionof table arrays
	for(var j=0;j<globals.sample.length;j++)
	{
		globals.tableArrays[4].push(globals.sample[j].major);
		var majorHolder = globals.sample[j].major;
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

		globals.tableArrays[6].push(globals.sample[j].group);
		var groupHolder = globals.sample[j].group;
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
		
		//if(state == globals.POLL_STATES.FIRST && j ==0)
		//{
		//	GameObject.candidates.splice(0,0,new Candidate(""));
		//}
        for(var i = 0; i < pollChoices.length ;i++)
        {
            ////CONSOLE.LOG(i)
            switch(pollChoices[i])
            {
                case "issFav":
                    var fav =0;
                    var favName = "";
                    if(fav < globals.sample[j].budgetScore ||fav==0)
                    {
                        fav = globals.sample[j].budgetScore;
                        var favName = "Budget";
                    }
                    if(fav < globals.sample[j].tuitionScore ||fav==0)
                    {
                        fav = globals.sample[j].tuitionScore;
                        var favName = "Tuition";
                    }
                    if(fav < globals.sample[j].functionScore ||fav==0)
                    {
                        fav = globals.sample[j].functionScore;
                        var favName = "Functions";
                    }
                    if(fav < globals.sample[j].medicalScore ||fav==0)
                    {
                        fav = globals.sample[j].medicalScore;
                        var favName = "Medical";
                    }
                    globals.tableArrays[0].push(favName);
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
                    if(opp > globals.sample[j].budgetScore ||opp==0)
                    {
                        opp = globals.sample[j].budgetScore;
                        var oppName = "Budget";
                    }
                    if(opp > globals.sample[j].tuitionScore ||opp==0)
                    {
                        opp = globals.sample[j].tuitionScore;
                        var oppName = "Tuition";
                    }
                    if(opp > globals.sample[j].functionScore ||opp==0)
                    {
                        opp = globals.sample[j].functionScore;
                        var oppName = "Functions";
                    }
                    if(opp > globals.sample[j].medicalScore ||opp==0)
                    {
                        opp = globals.sample[j].medicalScore;
                        var oppName = "Medical";
                    }
                    globals.tableArrays[1].push(oppName);
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
                    globals.tableArrays[2].push(globals.sample[j].results.win);
                    for(var k =0; k< GameObject.candidates.length;k++)
                    {
                        ////CONSOLE.LOG()
                        if(globals.sample[j].results.win == GameObject.candidates[k].name){
                            graphData[i+2][k]++;
                        }
                    }
                    
                    break;
    
                case "candOpp":
                    globals.tableArrays[3].push(globals.sample[j].results.los);
                    for(var k =0; k< GameObject.candidates.length;k++)
                    {
                        if(globals.sample[j].results.los == GameObject.candidates[k].name){
                            graphData[i+2][k]++;
                        }
                    }
                    
                    break;
    
    
    
                case "fame":
                    var playFame = fameCalc(GameObject.candidates[0],globals.sample[j]).toFixed(3);
                    globals.tableArrays[7].push(playFame);
					if(playFame <= 0.2)
					{
                        graphData[i+2][0]++;
					}
					else if(playFame>0.20 && playFame<0.41)
					{
                        graphData[i+2][1]++;
					}
					else if(playFame>0.40 && playFame<0.61)
					{
                        graphData[i+2][2]++;
					}
					else if(playFame>0.60 && playFame<0.81)
					{
                        graphData[i+2][3]++;
					}
					else
					{
                        graphData[i+2][4]++;
					}
                    break;
    
                case "playTrust":
                    globals.tableArrays[8].push(GameObject.candidates[0].consMod);
                    var playConst = GameObject.candidates[0].consMod;
					if(playConst <= 0.2)
					{
                        graphData[i+2][4]++;
					}
					else if(playConst>0.20 && playConst<0.41)
					{
                        graphData[i+2][3]++;
					}
					else if(playConst>0.40 && playConst<0.61)
					{
                        graphData[i+2][2]++;
					}
					else if(playConst>0.60 && playConst<0.81)
					{
                        graphData[i+2][1]++;
					}
					else
					{
                        graphData[i+2][0]++;
					}
                    break;
    
            }
            for(var k = 0;k<globals.positions.length;k++)
            {
                if(pollChoices[i] == "issue" + globals.positionsLower[k])
                {
                    switch(pollChoices[i])
                    {
                        case "issuetuition":
                            globals.tableArrays[9].push(parseFloat(globals.sample[j].tuitionScore).toFixed(2));
							if(globals.sample[j].tuitionScore <= -3)
							{
                                graphData[i+2][0]++;
							}
							else if(globals.sample[j].tuitionScore>-3 && globals.sample[j].tuitionScore<-1)
							{
                                graphData[i+2][1]++;
							}
							else if(globals.sample[j].tuitionScore>-1 && globals.sample[j].tuitionScore<1)
							{
                                graphData[i+2][2]++;
							}
							else if(globals.sample[j].tuitionScore>1 && globals.sample[j].tuitionScore<3)
							{
                                graphData[i+2][3]++;
							}
							else
							{
                                graphData[i+2][4]++;
							}
                        break;
    
                        case "issuebudget":
                            globals.tableArrays[10].push(parseFloat(globals.sample[j].budgetScore).toFixed(2));
							if(globals.sample[j].budgetScore <= -3)
							{
                                graphData[i+2][0]++;
							}
							else if(globals.sample[j].budgetScore>-3 && globals.sample[j].budgetScore<-1)
							{
                                graphData[i+2][1]++;
							}
							else if(globals.sample[j].budgetScore>-1 && globals.sample[j].budgetScore<1)
							{
                                graphData[i+2][2]++;
							}
							else if(globals.sample[j].budgetScore>1 && globals.sample[j].budgetScore<3)
							{
                                graphData[i+2][3]++;
							}
							else
							{
                                graphData[i+2][4]++;
							}
                        break;
    
                        case "issuefunctions":
                            globals.tableArrays[12].push(parseFloat(globals.sample[j].functionScore).toFixed(2));
							if(globals.sample[j].functionScore <= -3)
							{
                                graphData[i+2][0]++;
							}
							else if(globals.sample[j].functionScore>-3 && globals.sample[j].functionScore<-1)
							{
                                graphData[i+2][1]++;
							}
							else if(globals.sample[j].functionScore>-1 && globals.sample[j].functionScore<1)
							{
                                graphData[i+2][2]++;
							}
							else if(globals.sample[j].functionScore>1 && globals.sample[j].functionScore<3)
							{
                                graphData[i+2][3]++;
							}
							else
							{
                                graphData[i+2][4]++;
							}
                        break;
    
                        case "issuemedical":
                            globals.tableArrays[13].push(parseFloat(globals.sample[j].medicalScore).toFixed(2));
							if(globals.sample[j].medicalScore <= -3)
							{
                                graphData[i+2][0]++;
							}
							else if(globals.sample[j].medicalScore>-3 && globals.sample[j].medicalScore<-1)
							{
                                graphData[i+2][1]++;
							}
							else if(globals.sample[j].medicalScore>-1 && globals.sample[j].medicalScore<1)
							{
                                graphData[i+2][2]++;
							}
							else if(globals.sample[j].medicalScore>1 && globals.sample[j].medicalScore<3)
							{
                                graphData[i+2][3]++;
							}
							else
							{
                                graphData[i+2][4]++;
							}
                        break;
                    }
                }
            }
    
            var candCounter = 14;
            for(var k = 1;k<GameObject.candidates.length;k++)
            {
                if(pollChoices[i] == "candFame" + GameObject.candidates[k].name)
                {
                    var calcHolder = fameCalc(GameObject.candidates[k], globals.sample[j]);
                    
                    globals.tableArrays[candCounter].push(calcHolder);				
    
					if(calcHolder <= 0.2)
					{
                        graphData[i+2][0]++;
					}
					else if(calcHolder>0.20 && calcHolder<0.41)
					{
                        graphData[i+2][1]++;
					}
					else if(calcHolder>0.40 && calcHolder<0.61)
					{
                        graphData[i+2][2]++;
					}
					else if(calcHolder>0.60 && calcHolder<0.81)
					{
                        graphData[i+2][3]++;
					}
					else
					{
                        graphData[i+2][4]++;
					}
                }
    
    
                candCounter++;
            }
            for(var k = 1;k<GameObject.candidates.length;k++)
            {
                if(pollChoices[i] == "candTrust" + GameObject.candidates[k].name)
                {
                    globals.tableArrays[candCounter].push(GameObject.candidates[k].consMod);
					
					if(GameObject.candidates[k].consMod <= 0.2)
					{
                        graphData[i+2][4]++;
					}
					else if(GameObject.candidates[k].consMod>0.20 && GameObject.candidates[k].consMod<0.41)
					{
                        graphData[i+2][3]++;
					}
					else if(GameObject.candidates[k].consMod>0.40 && GameObject.candidates[k].consMod<0.61)
					{
                        graphData[i+2][2]++;
					}
					else if(GameObject.candidates[k].consMod>0.60 && GameObject.candidates[k].consMod<0.81)
					{
                        graphData[i+2][1]++;
					}
					else
					{
                        graphData[i+2][0]++;
					}
                }
    
                candCounter++;
    
            }
        }
	}
	
	//////CONSOLE.LOG(globals.tableArrays);
	tableBuilder(pollChoices, globals.tableArrays, sampleSize, graphData, pollLabelArray, isFake, state, isFree, false);
}

//Builds a table by looping through the Array created by pollCalc and putting each value into a cell.
function tableBuilder(pollChoices, tableArray2, sSize, graphData, graphLabels, isFake, state, isFree, isReview)
{   
  
	////CONSOLE.LOG(tableArray2);
	var rowCounter = 0;
	var cellCounter = 0;
	var graphQuestions = [];
	var h = 0;

	var table = document.getElementById("pollTable");
	var tableHead = document.getElementById("tableHead");
	var headRow = tableHead.insertRow(0);
	
		//console.log("in");
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
					var cell = headRow.insertCell();
					cell.innerHTML = globals.tableHeaders[0];
					graphQuestions.push("issFav");
				break;
                
				case "issOpp":
						var cell = headRow.insertCell();
						cell.innerHTML = globals.tableHeaders[1];
						graphQuestions.push("issOpp");
				break;

				case "candFav":
						var cell = headRow.insertCell();
						cell.innerHTML = globals.tableHeaders[2];
						graphQuestions.push("candFav");
				break;

				case "candOpp":
						var cell = headRow.insertCell();
						cell.innerHTML = globals.tableHeaders[3];
						graphQuestions.push("candOpp");
				break;

				case "fame":
						var cell = headRow.insertCell();
						cell.innerHTML = globals.tableHeaders[7];
						graphQuestions.push("fame");
				break;

				case "playTrust":
						var cell = headRow.insertCell();
						cell.innerHTML = globals.tableHeaders[8];
						graphQuestions.push("playTrust");
				break;
			}

            
			for(var k = 0;k<globals.positions.length;k++)
			{

				if(pollChoices[h] == "issue" + globals.positionsLower[k])
				{
                  switch(pollChoices[h])
					{
						case "issuetuition":
							var cell = headRow.insertCell();
							var posInfo = globals.tableHeaders[9] + globals.positions[0];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuetuition");

						break;

						case "issuebudget":
							var cell = headRow.insertCell();
							var posInfo = globals.tableHeaders[9] + globals.positions[1];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuebudget");
						break;

						case "issuefunctions":
							var cell = headRow.insertCell();
							var posInfo = globals.tableHeaders[9] + globals.positions[2];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuefunctions");
						break;

						case "issuemedical":
							var cell = headRow.insertCell();
							var posInfo = globals.tableHeaders[9] + globals.positions[3];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuemedical");
						break;
					}
				}
			}
			for(var k = 1;k<GameObject.candidates.length;k++)
			{
				if(pollChoices[h] == "candFame" + GameObject.candidates[k].name)
				{
						var cell = headRow.insertCell();
						var candInfo = globals.tableHeaders[10] + GameObject.candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candFame" + GameObject.candidates[k].name);
				}
			}
			for(var k = 1;k<GameObject.candidates.length;k++)
			{
				if(pollChoices[h] == "candTrust" + GameObject.candidates[k].name)
				{
					//////CONSOLE.LOG(h);
						var cell = headRow.insertCell();
						var candInfo = globals.tableHeaders[11] + GameObject.candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candTrust" + GameObject.candidates[k].name);
				}
			}
			if(h==pollChoices.length-1)
			{
				var cell = headRow.insertCell(0);
				cell.innerHTML = globals.tableHeaders[4];

				//var cell = headRow.insertCell(1);
				//cell.innerHTML = globals.tableHeaders[5];

				var cell = headRow.insertCell(1);
				cell.innerHTML = globals.tableHeaders[6];
			}
		}
	}
    
    //Creates the contents of the table based on the results of PollCalc
	for(var h = 0; h<sSize; h++)
	{
        //Inserts a row into the table for each member of the sample
		row = table.insertRow(h);


		for(var i = 0; i < pollChoices.length+1;i++)
		{
			if(pollChoices[i] != null)
			{
				switch(pollChoices[i])
				{
                    
					case "issFav":
							var cell = row.insertCell();
							cell.innerHTML = tableArray2[0][h];
					break;

					case "issOpp":
								var cell = row.insertCell();
								cell.innerHTML = tableArray2[1][h];
					break;

					case "candFav":
								var cell = row.insertCell();
								cell.innerHTML = tableArray2[2][h];
					break;

					case "candOpp":
								var cell = row.insertCell();
								cell.innerHTML = tableArray2[3][h];
					break;

					case "fame":
								var cell = row.insertCell();
								if(parseFloat(tableArray2[7][h]).toFixed(2) <= 0.2)
								{
									cell.innerHTML = "Candidate Unknown";
									//cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[7][h]).toFixed(2)>0.20 && parseFloat(tableArray2[7][h]).toFixed(2)<0.41)
								{
									cell.innerHTML = "Slightly Aware of Candidate";
									//cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[7][h]).toFixed(2)>0.40 && parseFloat(tableArray2[7][h]).toFixed(2)<0.61)
								{
									cell.innerHTML = "Aware of Candidate";
									//cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[7][h]).toFixed(2)>0.60 && parseFloat(tableArray2[7][h]).toFixed(2)<0.81)
								{
									cell.innerHTML = "Very Aware of Candidate";
									//cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
								}
								else
								{
									cell.innerHTML = "Candidate Known";
									//cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
								}
					break;

					case "playTrust":
								var cell = row.insertCell();
								if(parseFloat(tableArray2[8][h]).toFixed(2) <= 0.2)
									{
										cell.innerHTML = "Very Trustworthy";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[8][h]).toFixed(2)>0.2 && parseFloat(tableArray2[8][h]).toFixed(2)<0.41)
									{
										cell.innerHTML = "Fairly Trustworthy";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[8][h]).toFixed(2)>0.4 && parseFloat(tableArray2[8][h]).toFixed(2)<0.61)
									{
										cell.innerHTML = "Sort Of Trustworthy";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[8][h]).toFixed(2)>0.6 && parseFloat(tableArray2[8][h]).toFixed(2)<0.81)
									{
										cell.innerHTML = "Untrustworthy";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Very Untrustworthy";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
					break;
				}
				for(var k = 0;k<globals.positions.length;k++)
				{
					if(pollChoices[i] == "issue" + globals.positionsLower[k])
					{
                        let issueOpinion;
						switch(pollChoices[i])
						{
                            
							case "issuetuition":
									var cell = row.insertCell();
									if(tableArray2[9][h] <= -3)
									{
										cell.innerHTML = "Issue Hated";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[9][h]>-3 && tableArray2[9][h]<-1)
									{
										cell.innerHTML = "Issue Disliked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[9][h]>-1 && tableArray2[9][h]<1)
									{
										cell.innerHTML = "Issue Neutral";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[9][h]>1 && tableArray2[9][h]<3)
									{
										cell.innerHTML = "Issue Liked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Loved";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
							break;

							case "issuebudget":
									var cell = row.insertCell();
									if(tableArray2[10][h] <= -3)
									{
										cell.innerHTML = "Issue Hated";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[10][h]>-3 && tableArray2[10][h]<-1)
									{
										cell.innerHTML = "Issue Disliked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[10][h]>-1 && tableArray2[10][h]<1)
									{
										cell.innerHTML = "Issue Neutral";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[10][h]>1 && tableArray2[10][h]<3)
									{
										cell.innerHTML = "Issue Liked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Loved";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
							break;

							case "issuefunctions":
									var cell = row.insertCell();
									if(tableArray2[12][h] <= -3)
									{
										cell.innerHTML = "Issue Hated";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[12][h]>-3 && tableArray2[12][h]<-1)
									{
										cell.innerHTML = "Issue Disliked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[12][h]>-1 && tableArray2[12][h]<1)
									{
										cell.innerHTML = "Issue Neutral";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[12][h]>1 && tableArray2[12][h]<3)
									{
										cell.innerHTML = "Issue Liked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Loved";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
							break;

							case "issuemedical":
                                    var cell = row.insertCell();
									if(tableArray2[13][h] <= -3)
									{
										cell.innerHTML = "Issue Hated";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[13][h]>-3 && tableArray2[13][h]<-1)
									{
										cell.innerHTML = "Issue Disliked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[13][h]>-1 && tableArray2[13][h]<1)
									{
										cell.innerHTML = "Issue Neutral";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[13][h]>1 && tableArray2[13][h]<3)
									{
										cell.innerHTML = "Issue Liked";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Loved";
										//cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
							break;
						}
					}
				}


				canCounter = 14;
				for(var k = 1;k<GameObject.candidates.length;k++)
				{

					if(pollChoices[i] == "candFame" + GameObject.candidates[k].name)
					{

								var cell = row.insertCell();
								var counter = canCounter;
									if(parseFloat(tableArray2[counter][h]).toFixed(2) <= 0.2)
									{
										cell.innerHTML = "Candidate Unknown";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.2 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.41)
									{
										cell.innerHTML = "Slightly Aware of Candidate";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.4 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.61)
									{
										cell.innerHTML = "Aware of Candidate";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.6 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.81)
									{
										cell.innerHTML = "Very Aware of Candidate";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Candidate Known";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
					}
						canCounter++;
				}
				for(var k = 1;k<GameObject.candidates.length;k++)
				{
					if(pollChoices[i] == "candTrust" + GameObject.candidates[k].name)
					{
								var cell = row.insertCell();
								var counter = canCounter;
								if(parseFloat(tableArray2[counter][h]).toFixed(2) <= 0.2)
								{
									cell.innerHTML = "Very Trustworthy";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.2 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.41)
								{
									cell.innerHTML = "Fairly Trustworthy";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.4 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.61)
								{
									cell.innerHTML = "Sort Of Trustworthy";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.6 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.81)
								{
									cell.innerHTML = "Untrustworthy";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else
								{
									cell.innerHTML = "Very Untrustworthy";
										//cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}		
					}

					canCounter++;

				}
			}
		}
        
		var cell = row.insertCell(0);
		cell.innerHTML = capitalStr(tableArray2[4][h]);

		//var cell = row.insertCell(1);
		//cell.innerHTML = tableArray2[5][h];

		var cell = row.insertCell(1);
		cell.innerHTML = capitalStr(tableArray2[6][h]);
	}
	
	
	sorttable.makeSortable(document.getElementById('tab'));
	document.getElementById("next").innerHTML += "<div id = 'filterArea'></div>"
	document.getElementById("centerDisplay").innerHTML += "<div id = 'barChartDiv' style = 'display:block'></div>";
	document.getElementById("centerDisplay").innerHTML += "<div id = 'pieChartDiv' style = 'display:none'></div>";
    
  
    //Only display the filters if this isn't fake data
    //Quick fix for a bug when changing filter options
    if(!isFake){
      document.getElementById("centerDisplay").innerHTML += "<div id = 'chartFilters' style = 'display:block'> Filters: </div>";
      document.getElementById("chartFilters").innerHTML += "<br>Major: <select class = 'graphFilters' id = 'majorSelect'></select>   Social Group: <select class = 'graphFilters' id = 'groupSelect'></select>";

      var noneOp = document.createElement("option");
      noneOp.text = "None";
      noneOp.value = "None";
      var noneOp2 = document.createElement("option");
      noneOp2.text = "None";
      noneOp2.value = "None";

      var majors = document.getElementById('majorSelect');
      majors.options.add(noneOp2);
      for(var i =0; i<globals.majorList.length; i++)
      {
          var newOp = document.createElement("option");
          newOp.text = capitalStr(globals.majorList[i]);
          newOp.value = globals.majorList[i];
          majors.options.add(newOp);
      }

      var groups = document.getElementById('groupSelect');
      groups.options.add(noneOp);
      for(var i =0; i<globals.groupList.length; i++)
      {
          var newOp = document.createElement("option");
          newOp.text = capitalStr(globals.groupList[i]);
          newOp.value = globals.groupList[i];
          groups.options.add(newOp);
      }
    }
	
	document.getElementById("next").innerHTML += "<button id = 'barButton'  class='otherBtn logBarView' onclick = 'changeDataDisplay(2,"+isFake+")' style = 'display:none'>Show Bar Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'pieButton'  class='otherBtn logPieView' onclick = 'changeDataDisplay(3,"+isFake+")'>Show Pie Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'dataButton' class='otherBtn logTableView' onclick = 'changeDataDisplay(1,"+isFake+")'>Show Data Table</button><br>";
	for (var x = 0; x < globals.groupList.length; x++){
		document.getElementById('filterArea').innerHTML += "<input type = 'checkbox' class = 'filterChecklist' rel = '"+ globals.groupList[x] +"'> "+ globals.groupList[x] +" ";
	}
	document.getElementById('filterArea').innerHTML +='<br>'
	document.getElementById('filterArea').innerHTML +='<br>'
	for (var x = 0; x < globals.groupList.length; x++){
		document.getElementById('filterArea').innerHTML += "<input type = 'checkbox' class = 'filterChecklist' rel = '"+ globals.majorList[x] +"'> "+ globals.majorList[x] +" ";
	}
	document.getElementById('filterArea').innerHTML +='<br>'
	document.getElementById('filterArea').style.display = "none";

	makeGraphs(graphData, graphQuestions,graphLabels);
		//if(state == POLL_STATES.FIRST)
		//{
		//	GameObject.candidates.splice(0,1);
		//}
	document.getElementById('table').style.display = 'none';
	if (state == globals.POLL_STATES.TUTORIAL){
        document.getElementById('back').innerHTML += "<button onclick = 'drawPoll("+state+",false, true)'>Back to Start</button>" ;
	}
    //If the data isn't fake and it isn't a past poll report
	if(!isFake && !isReview)
	{
        console.log("pushing");
		globals.pastPollResults.push(tableArray2);
		globals.pastPollSizes.push(sSize);
		globals.pastPollChoices.push(pollChoices);
		globals.pastGraphData.push(graphData);
		globals.pastGraphLabels.push(graphLabels);
		globals.tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
		if(!isFree)
			pollTime(sSize, pollChoices);
		globals.currentPoll = (globals.pastPollResults.length - 1);
	}
    else if(isFake){
      //Result the fake data back to normal
      GameObject.candidates = globals.currentCandidateArrayHolder;
    }

}

 $(document).on('change','.graphFilters', function()
 {
	 console.log(globals.currentPoll)
	var major = document.getElementById("majorSelect").value;
	var group = document.getElementById("groupSelect").value;
	filterGraphData(major, group, globals.pastPollChoices[globals.currentPoll], globals.pastPollResults[globals.currentPoll], globals.pastPollSizes[globals.currentPoll], globals.pastGraphData[globals.currentPoll], globals.pastGraphLabels[globals.currentPoll], false);
 });

$(document).on('change','.filterChecklist', function(){
  var clearEverything = false;
  var numberFlag = 0;

  $('input[type=checkbox]:checked').each(function(){
    numberFlag++;
  })

  if(numberFlag > 0){
    clearEverything = true;
  }

  if(clearEverything){
    console.log("clearing everything");
  var $lis = $('table tbody > tr').hide();

    $('input[type=checkbox]:checked').each(function(){
        var box = $(this);
        var attrCheck = capitalStr(box.attr('rel'));
        var flag;

         $('table > tbody > tr').each(function() {
          flag = false;
           $.each(this.cells, function(){         
            var row = $(this).text();
            if (row == attrCheck){
             flag = true;
           }
          });
           if(flag){
           $(this).show();
         }
      });
       
    });
  }
  else{
    var $lis = $('table tbody > tr').show();
  }

document.body.scrollTop = document.documentElement.scrollTop = 0
 });

function makeGraphs(graphData, graphQuestions, graphLabels)
{
	document.getElementById("barChartDiv").innerHTML = "";
	document.getElementById("pieChartDiv").innerHTML = "";
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
	
	//////CONSOLE.LOG(graphQuestions);
	for(var u =0; u < graphQuestions.length; u++){		
		document.getElementById("q"+u+"text").innerHTML = "";
	}

    console.log("GraphQuestions: ")
    console.log(graphQuestions);
	for(var i = 0; i < graphQuestions.length; i++){

		var counter = 0;
		var data = [];
		var data2 = [];
		var x = 0;
		var qID = "";

		switch(graphQuestions[i])
		{
			case "issFav":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[0].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[0].question;
			break;
			case "issOpp":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[1].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[1].question;
			break;
			case "candFav":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[2].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[2].question;
			break;
			case "candOpp":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[3].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[3].question;
			break;
			case "major":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[4].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[4].question;
			break;
			case "group":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[6].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[6].question;
			break;
			case "fame":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[7].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[7].question;
			break;
			case "playTrust":
				document.getElementById("q"+i+"text").innerHTML = globals.questions[8].question;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[8].question;
			break;
			case "issuetuition":
				name = 	"Lowering Tuition";
				document.getElementById("q"+i+"text").innerHTML = globals.questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[9].question + " " + name;
			break;

			case "issuebudget":
				name = 	"Increase Budget";
				document.getElementById("q"+i+"text").innerHTML = globals.questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[9].question + " " + name;
			break;


			case "issuefunctions":
				name = 	"More School Events";
				document.getElementById("q"+i+"text").innerHTML = globals.questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[9].question + " " + name;
			break;

			case "issuemedical":
				name = 	"Improve Medical Services";
				document.getElementById("q"+i+"text").innerHTML = globals.questions[9].question + " " + name;
				document.getElementById("bq"+i+"text").innerHTML = globals.questions[9].question + " " + name;
			break;

			default:
			for(var k = 1;k<GameObject.candidates.length;k++)
			{
				if(graphQuestions[i] == "candFame" + GameObject.candidates[k].name)
				{
					name = GameObject.candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = globals.questions[10].question + " " + name;
					document.getElementById("bq"+i+"text").innerHTML = globals.questions[10].question + " " + name;
				}
			}

			for(var k = 1;k<GameObject.candidates.length;k++)
			{
				if(graphQuestions[i] == "candTrust" + GameObject.candidates[k].name)
				{
					name = GameObject.candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = globals.questions[11].question + " " + name;
					document.getElementById("bq"+i+"text").innerHTML = globals.questions[11].question + " " + name;
				}
			}
		}
		
		//////CONSOLE.LOG("Question "+graphQuestions[i] + " has a length of: " + graphData[i].length);
		//////CONSOLE.LOG(graphData[questionNum]);
        
		if(graphData[i] != null)
		{
			//GRAPH DATA BUG: for stefen
			for (var j = 0; j < graphData[i].length; j++)
			{
				//////CONSOLE.LOG(graphData[questionNum], " AT ", questions[qID].question)					
				data2[j]=graphData[i][j];
			}
		}
        else{
          console.log("Null data at: "+i);
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
			//////CONSOLE.LOG(zid);
			dataCounter++;
	
			return zid; 
		});
        
        var dataset =  [];
        for (var k = 0; k < graphData[i].length; k++)
        {	
			////CONSOLE.LOG(graphLabels);
			////CONSOLE.LOG(graphData);
			if(graphLabels[i][k] != "undefined-NaN")
            dataset.push ({label: graphLabels[i][k], count: graphData[i][k]})
		}
        ////CONSOLE.LOG(dataset)
        
        //Creates the pie charts based on the questions
        var width = 120;
        var height = 120;
        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
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
        
	}
}

//Changes the way that data is represented on the poll results screen
function changeDataDisplay(dataButton, isFake)
{
	if(dataButton == 1){
		document.getElementById('table').style.display = 'block';
		document.getElementById('filterArea').style.display = 'block';
		document.getElementById('pieChartDiv').style.display = 'none';
		document.getElementById('barChartDiv').style.display = 'none';
		document.getElementById('pieButton').style.display = 'inline';
		document.getElementById('barButton').style.display = 'inline';
		document.getElementById('dataButton').style.display = 'none';
        
        if(!isFake){
          document.getElementById('chartFilters').style.display = 'none';
        }
		$.post('/game/defaultLogger', {eventName: 'Viewed Data Table', eventType:'Poll Style Change', module: 1, session: GameObject.gameSession});

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
		
        if(!isFake){
          document.getElementById('chartFilters').style.display = 'inline';
        }
		$.post('/game/defaultLogger', {eventName: 'Viewed Bar Graph', eventType:'Poll Style Change', module: 1, session: GameObject.gameSession});

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
		
        if(!isFake){
          document.getElementById('chartFilters').style.display = 'inline';
        }
		$.post('/game/defaultLogger', {eventName: 'Viewed Pie Graph', eventType:'Poll Style Change', module: 1, session: GameObject.gameSession});

	}
}

//Allows you to view previous polls at any time.
function viewPollResult(id, isFirst)
{
	clearScreen();
	globals.currentPoll = id;
  //pollChoices, tableArray2, sSize, graphData, graphLabels, isFake, state, isFree, isReview
    $.post('/game/defaultLogger', {eventName: 'Viewed Poll Result', eventType:'Past Poll Result', module: 1, session: GameObject.gameSession});
  tableBuilder(globals.pastPollChoices[id],globals.pastPollResults[id],globals.pastPollSizes[id],globals.pastGraphData[id],globals.pastGraphLabels[id], false, globals.POLL_STATES.IN_GAME, true, true);
	if(!isFirst){
        updateTopBar(pollMenu);
		document.getElementById("back").innerHTML += "<button onclick = 'eventMenu()'>Back to Game Map</button>";
    }
	else
		document.getElementById("back").innerHTML += "<button onclick = 'firstStatement()'> Back to Making Your First Statement </button>";
	
}

//Creates a trend report based on past polls
function createTrendReport(category)
{
    $.post('/game/defaultLogger', {eventName: 'Viewed Trend Report', eventType:'Trend Report', module: 1, session: GameObject.gameSession});
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
    
    //for(var i =0; i< globals.pastPollChoices.length;i++)
    //{
    //        data0.push(
    //        {
    //            count: null,
    //            poll: i
    //        });
    //}
    
    
    for(var i =0; i< globals.pastPollChoices.length;i++)
    {
		var limit = false;
        tempGraphData = [];
        globals.pastGraphData[i].forEach(function(e)
        {
            tempGraphData.push(e);
        
        });
        //removes the first 2 answers from each pastGraph data
        tempGraphData.splice(0,2);
        
		if(globals.pastPollSizes[i] == 40)
		{
			limit=true;
		}
		
        //GOes through each question choesn by the player
        for(var j =0; j< globals.pastPollChoices[i].length; j++)
        {
            //Sets the labels using the past poll data
            if(category == globals.pastPollChoices[i][j])
            {
                globals.questions.forEach( function(element)
                {
                    if(element.value == category)
                    {
                        answers = element.labels.split(",")
                        if(element.value == "candFav" ||element.value == "candOpp")
                        {
                            answers = [];
                            GameObject.candidates.forEach(function(element2)
                            {
                            	answers.push(element2.name);
                            	////CONSOLE.LOG(answers);
                            });
                        }
                    }
                    else if(element.value == category.substring(0,5))
                    {
                        answers = element.labels.split(",")
                    }
                });
                var tempGraphTotal = 0;
              
                //GRAPH DATA BUG: for Stefen
                for(var x =0; x < tempGraphData[j].length; x++){
                	tempGraphTotal = tempGraphTotal + tempGraphData[j][x]
                }

                
                
                //For each answer to the current question pushes the count of people who had this answer into a cooresponding array
                for (var k =0; k< tempGraphData[j].length; k++)
                {
					var countAlt;
                    switch(k)
                    {
                        case 0:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data0.push(
                        {
							count: countAlt,
                            poll: i,
                            key: answers[k]
							
                        });

                        //data0.splice(i,1,
                        //{
                        //    count: globals.pastGraphData[i][j][k],
                        //    poll: i
                        //});
                        break;
                        case 1:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data1.push(
                        {
                            count: countAlt,
                            poll: i,
                            key: answers[k]
                        });
                     
                        break;
                        case 2:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data2.push(
                        {
                            count: countAlt,
                            poll: i,
                            key: answers[k]
                        });
                       
                        break;
                        case 3:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data3.push(
                        {
                            count: countAlt,
                            poll: i,
                            key: answers[k]
                        });
                     
                        break;
                        case 4:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data4.push(
                        {
                            count: countAlt,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 5:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data5.push(
                        {
                            count: countAlt,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 6:
						if(!limit)
							countAlt=(tempGraphData[j][k]/tempGraphTotal) * 100;
						else
							countAlt=((tempGraphData[j][k]/tempGraphTotal) * 100)/2;
                        data6.push(
                        {
                            count: countAlt,
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
        ////CONSOLE.LOG(data5)
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

function filterGraphData(matchingMajor, matchingGroup, pollChoices, resultsArray, sSize, graphData, graphLabels, resetter)
{
	var studentResponses =[];
	var canAdd = true;
	if(matchingMajor == "None" && matchingGroup== "None")
	{
		for(var i =0; i< sSize; i++)
		{
			studentResponses.push(i);
		}
	}
	else
	{
		for(var i=0; i <resultsArray[4].length;i++)
		{
			if(resultsArray[4][i] == matchingMajor)
			{
				studentResponses.push(i);
			}
		}
		for(var i=0; i <resultsArray[6].length;i++)
		{
			if(resultsArray[6][i] == matchingGroup)
			{
				studentResponses.forEach(function(element)
				{
					if(resultsArray[6][i] == element)
					{
						canAdd = false;
					}
				});
				if(canAdd)
				{studentResponses.push(i);}
			}
		}
	}
  
    var graphQuestions = [];
    for(var i = 0; i < pollChoices.length; i++){
      graphQuestions.push(pollChoices[i]);
    }
	
	
	if(graphQuestions[0] != "major")
		graphQuestions.splice(0,0,"major","group");
	
    let filteredData = [];
	for(var i =0;i < graphData.length; i++)
	{
        filteredData.push([]);
		for(var j =0;j < graphData[i].length; j++)
		{
            filteredData[i].push(0);
		}
	}
	console.log(graphData);
	for(var h = 0; h<sSize; h++)
	{
		var response = false;
		studentResponses.forEach(function(element)
			{
				if(h == element)
				{
					response = true;
				}
			});
		if(response)
		{
			var majorHolder = resultsArray[4][h];
			if(majorHolder == "business"){
				filteredData[0][0]++;
			}
			else if(majorHolder == "law"){
				filteredData[0][1]++;
			}
			else if(majorHolder == "tech"){
				filteredData[0][2]++;
			}
			else if(majorHolder == "arts"){
				filteredData[0][3]++;
			}
				console.log ("i = " + 0)
	
			var groupHolder =  resultsArray[6][h];
			if(groupHolder == "socialite"){
				filteredData[1][0]++;
			}
			else if(groupHolder == "athlete"){
				filteredData[1][1]++;
			}
			else if(groupHolder == "gamer"){
				filteredData[1][2]++;
			}
			else if(groupHolder == "reader"){
				filteredData[1][3]++;
			}
		    console.log ("i = " + 1)
			for(var i = 2; i < graphQuestions.length+1;i++)
			{
				if(graphQuestions[i] != null)
				{
					switch(graphQuestions[i])
					{
						
						case "issFav":
							var favName = resultsArray[0][h];
							if(favName == "Tuition"){
								filteredData[i][0]++;
							}
							else if(favName == "Budget"){
								filteredData[i][1]++;
							}
							else if(favName == "Functions"){
								filteredData[i][2]++;
							}
							else if(favName == "Medical"){
								filteredData[i][3]++;
							}
						break;
	
						case "issOpp":
							var oppName = resultsArray[1][h];
							if(oppName == "Tuition"){
								filteredData[i][0]++;
							}
							else if(oppName == "Budget"){
								filteredData[i][1]++;
							}
							else if(oppName == "Functions"){
								filteredData[i][2]++;
							}
							else if(oppName == "Medical"){
								filteredData[i][3]++;
							}
						break;
	
						case "candFav":
							for(var k =0; k< graphLabels[i].length;k++)
							{
								////CONSOLE.LOG()
								if(resultsArray[2][h] == graphLabels[i][k]){
									filteredData[i][k]++;
								}
							}
						break;
	
						case "candOpp":
							for(var k =0; k< graphLabels[i].length;k++)
							{
								////CONSOLE.LOG()
								if(resultsArray[3][h] == graphLabels[i][k]){
									filteredData[i][k]++;
								}
							}
						break;
	
						case "fame":
							if(parseFloat(resultsArray[7][h]).toFixed(2) <= 0.2)
							{
								filteredData[i][0]++;
							}
							else if(parseFloat(resultsArray[7][h]).toFixed(2)>0.20 && parseFloat(resultsArray[7][h]).toFixed(2)<0.41)
							{
								filteredData[i][1]++;
							}
							else if(parseFloat(resultsArray[7][h]).toFixed(2)>0.40 && parseFloat(resultsArray[7][h]).toFixed(2)<0.61)
							{
								filteredData[i][2]++;
							}
							else if(parseFloat(resultsArray[7][h]).toFixed(2)>0.60 && parseFloat(resultsArray[7][h]).toFixed(2)<0.81)
							{
								filteredData[i][3]++;
							}
							else
							{
								filteredData[i][4]++;
							}
						break;
	
						case "playTrust":
							if(parseFloat(resultsArray[8][h]).toFixed(2) <= 0.2)
							{
								filteredData[i][0]++;
							}
							else if(parseFloat(resultsArray[8][h]).toFixed(2)>0.2 && parseFloat(resultsArray[8][h]).toFixed(2)<0.41)
							{
								filteredData[i][1]++;
							}
							else if(parseFloat(resultsArray[8][h]).toFixed(2)>0.4 && parseFloat(resultsArray[8][h]).toFixed(2)<0.61)
							{
								filteredData[i][2]++;
							}
							else if(parseFloat(resultsArray[8][h]).toFixed(2)>0.6 && parseFloat(resultsArray[8][h]).toFixed(2)<0.81)
							{
								filteredData[i][3]++;
							}
							else
							{
								filteredData[i][4]++;
							}
						break;
					}
                   
                  
					for(var k = 0;k<globals.positions.length;k++)
					{
						if(graphQuestions[i] == "issue" + globals.positionsLower[k])
						{
							switch(graphQuestions[i])
							{
								case "issuetuition":
									if(resultsArray[9][h] <= -3)
									{
										filteredData[i][0]++;
									}
									else if(resultsArray[9][h]>-3 && resultsArray[9][h]<-1)
									{
										filteredData[i][1]++;
									}
									else if(resultsArray[9][h]>-1 && resultsArray[9][h]<1)
									{
										filteredData[i][2]++;
									}
									else if(resultsArray[9][h]>1 && resultsArray[9][h]<3)
									{
										filteredData[i][3]++;
									}
									else
									{
										filteredData[i][4]++;
									}
								break;
	
								case "issuebudget":
									if(resultsArray[10][h] <= -3)
									{
										filteredData[i][0]++;
									}
									else if(resultsArray[10][h]>-3 && resultsArray[10][h]<-1)
									{
										filteredData[i][1]++;
									}
									else if(resultsArray[10][h]>-1 && resultsArray[10][h]<1)
									{
										filteredData[i][2]++;
									}
									else if(resultsArray[10][h]>1 && resultsArray[10][h]<3)
									{
										filteredData[i][3]++;
									}
									else
									{
										filteredData[i][4]++;
									}
								break;
	
	
								case "issuefunctions":
									if(resultsArray[12][h] <= -3)
									{
										filteredData[i][0]++;
									}
									else if(resultsArray[12][h]>-3 && resultsArray[12][h]<-1)
									{
										filteredData[i][1]++;
									}
									else if(resultsArray[12][h]>-1 && resultsArray[12][h]<1)
									{
										filteredData[i][2]++;
									}
									else if(resultsArray[12][h]>1 && resultsArray[12][h]<3)
									{
										filteredData[i][3]++;
									}
									else
									{
										filteredData[i][4]++;
									}
								break;
	
								case "issuemedical":
									if(resultsArray[13][h] <= -3)
									{
										filteredData[i][0]++;
									}
									else if(resultsArray[13][h]>-3 && resultsArray[13][h]<-1)
									{
										filteredData[i][1]++;
									}
									else if(resultsArray[13][h]>-1 && resultsArray[13][h]<1)
									{
										filteredData[i][2]++;
									}
									else if(resultsArray[13][h]>1 && resultsArray[13][h]<3)
									{
										filteredData[i][3]++;
									}
									else
									{
										filteredData[i][4]++;
									}
								break;
							}
						}
					}
	
	
					canCounter = 14;
					for(var k = 1;k<GameObject.candidates.length;k++)
					{
						if(graphQuestions[i] == "candFame" + GameObject.candidates[k].name)
						{
							var counter = canCounter;
							if(parseFloat(resultsArray[counter][h]).toFixed(2) <= 0.2)
							{
								filteredData[i][0]++;
							}
							else if(parseFloat(resultsArray[counter][h]).toFixed(2)>0.2 && parseFloat(resultsArray[counter][h]).toFixed(2)<0.41)
							{
								filteredData[i][1]++;
							}
							else if(parseFloat(resultsArray[counter][h]).toFixed(2)>0.4 && parseFloat(resultsArray[counter][h]).toFixed(2)<0.61)
							{
								filteredData[i][2]++;
							}
							else if(parseFloat(resultsArray[counter][h]).toFixed(2)>0.6 && parseFloat(resultsArray[counter][h]).toFixed(2)<0.81)
							{
								filteredData[i][3]++;
							}
							else
							{
								filteredData[i][4]++;
							}
						}
						canCounter++;
					}
					for(var k = 1;k<GameObject.candidates.length;k++)
					{
						if(graphQuestions[i] == "candTrust" + GameObject.candidates[k].name)
						{
							var counter = canCounter;
							if(parseFloat(resultsArray[counter][h]).toFixed(2) <= 0.2)
							{
								filteredData[i][0]++;
							}
							else if(parseFloat(resultsArray[counter][h]).toFixed(2)>0.2 && parseFloat(resultsArray[counter][h]).toFixed(2)<0.41)
							{
								filteredData[i][1]++;
							}
							else if(parseFloat(resultsArray[counter][h]).toFixed(2)>0.4 && parseFloat(resultsArray[counter][h]).toFixed(2)<0.61)
							{
								filteredData[i][2]++;
							}
							else if(parseFloat(resultsArray[counter][h]).toFixed(2)>0.6 && parseFloat(resultsArray[counter][h]).toFixed(2)<0.81)
							{
								filteredData[i][3]++;
							}
							else
							{
								filteredData[i][4]++;
							}		
						}
						canCounter++;
					}
				}
			}
		}
	}
	
	if(!resetter)
	{
		document.getElementById("centerDisplay").innerHTML += "<div id = 'barChartDiv' style = 'display:block'></div>";
		document.getElementById("centerDisplay").innerHTML += "<div id = 'pieChartDiv' style = 'display:none'></div>";
		
		makeGraphs(filteredData, graphQuestions, graphLabels);
		document.getElementById("majorSelect").value = matchingMajor;
		document.getElementById("groupSelect").value = matchingGroup;
		document.getElementById('table').style.display = 'none';
		//filterGraphData("None", "None", pollChoices, resultsArray, sSize, graphData, graphLabels, true)
	}
}







