let questionsTemp = [];

 /*$(document).on('change','.graphFilters', function()
 {
	 console.log(globals.currentPoll)
	var major = document.getElementById("majorSelect").value;
	var group = document.getElementById("groupSelect").value;
	filterGraphData(major, group, globals.pastPollChoices[globals.currentPoll], globals.pastPollResults[globals.currentPoll], globals.pastPollSizes[globals.currentPoll], globals.pastGraphData[globals.currentPoll], globals.pastGraphLabels[globals.currentPoll], false);
 });*/

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


let questionCharts = [];

//Changes the way that data is represented on the poll results screen
function changeDataDisplay(dataButton)
{
    //Show Table
	if(dataButton == 1){
		document.getElementById('table').style.display = 'block';
		document.getElementById('filterArea').style.display = 'block';
		document.getElementById('pieChartDiv').style.display = 'none';
		document.getElementById('barChartDiv').style.display = 'none';
		document.getElementById('pieButton').style.display = 'inline';
		document.getElementById('barButton').style.display = 'inline';
		document.getElementById('dataButton').style.display = 'none';
        document.getElementById('chartFilters').style.display = 'none';
	}
    //Show Bar Charts
	else if (dataButton == 2)
    {
		document.getElementById('table').style.display = 'none';
		document.getElementById('filterArea').style.display = 'none';
		//document.getElementById('pieChartDiv').style.display = 'none';
		//document.getElementById('barChartDiv').style.display = 'block';
		document.getElementById('pieButton').style.display = 'inline';
		document.getElementById('barButton').style.display = 'none';
		document.getElementById('dataButton').style.display = 'inline';
        document.getElementById('chartFilters').style.display = 'inline';
      
        for(let i = 0; i < questionCharts.length; i++){
          questionCharts[i].legend.hide();
          questionCharts[i].transform('bar');
        }
	}
    //Show Pie Charts
	else if (dataButton == 3)
    {
		document.getElementById('table').style.display = 'none';
		document.getElementById('filterArea').style.display = 'none';
      
		//document.getElementById('pieChartDiv').style.display = 'block';
		//document.getElementById('barChartDiv').style.display = 'none';
        for(let i = 0; i < questionCharts.length; i++){
          questionCharts[i].legend.show()
          questionCharts[i].transform('pie');
        }
      
		document.getElementById('pieButton').style.display = 'none';
		document.getElementById('barButton').style.display = 'inline';
		document.getElementById('dataButton').style.display = 'inline';
        document.getElementById('chartFilters').style.display = 'inline';
	}
}

//Allows you to view previous polls at any time.
function viewPollResult(id, isFirst)
{
	clearScreen();
	globals.currentPoll = id;
  //pollChoices, tableArray2, sSize, graphData, graphLabels, isFake, state, isFree, isReview
  tableBuilder_REFACTORED(globals.pastPollResults[id], false, POLL_STATES.IN_GAME, true, true);
	if(!isFirst){
        updateTopBar(pollMenu);
		document.getElementById("back").innerHTML += "<button onclick = 'eventMenu()'>Back to Game Map</button>";
    }
	else
		document.getElementById("back").innerHTML += "<button onclick = 'firstStatement()'> Back to Making Your First Statement </button>";

}

function createStackedAreaChart(categoryId, htmlElementId, allPollResults){
  debugger;
  let graphQuestion = globals.allQuestions[categoryId];
  
  let graphData = [];
  
  for(let pollResult of allPollResults){
    let pollData = {name: pollResult.name};
    for (var k = 0; k < graphQuestion.possibleAnswers.length; k++)
    {
      let possibleAnswer = graphQuestion.possibleAnswers[k];
      let count = getAnswerCount(graphQuestion, possibleAnswer, pollResult.students);
      
      pollData[possibleAnswer.label] = (count/pollResult.students.length);
    }
    
    graphData.push(pollData);
  }
  
  let labelTypes = {}
  let labelKeys = [];
  for(let possibleAnswer of graphQuestion.possibleAnswers){
    labelKeys.push(possibleAnswer.label);
    labelTypes[possibleAnswer.label] = 'area';
  }
  
  var chart = c3.generate({
      bindto: document.getElementById(htmlElementId),
      data: {
        json: graphData,
        keys: {
          x: 'name',
          value: labelKeys
        },
        types: labelTypes,
        groups: [labelKeys],
        selection: {
          enabled: true,
          isselectable: function (d) {

            if(d.value){
              if(d.value > 0){
                return true;
              }
            }            
           return false;
          }
        },
        onselected: function(){console.log("selected");}
      },
      axis: {
        x: {
          type: 'category'
        },
        y: {
          max: 1.05,
          min: 0,
         tick: {
            format: d3.format("%")
          },
          padding: {top: .05, bottom: 0}
        }
      },
    //,
//      legend: {
//        position: 'right',
//        item: {
//          onmouseover: function(d){
//            console.log('test onclick '+d);
//          }
//        }
//      }
      tooltip: {
        //grouped: false
   }
  });
  
  
}

function createDistributionChart(categoryId, htmlElementId, allPollResults){
  debugger;
  let graphQuestion = globals.allQuestions[categoryId];
  
  let graphData = [];
  
  let averageData = [];
  let majorData = [];
  let groupData = [];
  
  for(let pollResult of allPollResults){
    for (var k = 0; k < graphQuestion.possibleAnswers.length; k++)
    {
      let possibleAnswer = graphQuestion.possibleAnswers[k];
      
      let totalCount = getAnswerCount(graphQuestion, possibleAnswer, pollResult.students);
      averageData[possibleAnswer.label] = (totalCount/pollResult.students.length);
      
      //Loop through each major
      /*for(let major of globals.majorList){
        //Filter to just get the students of a particular major
        let majorStudents = filterPollResult(major, "", pollResult);
        
        //Get the answer count of those students
        let majorCount = getAnswerCount(graphQuestion, possibleAnswer, majorStudents);
        majorData[possibleAnswer.label] = (majorCount/majorStudents.length);
      }
      //Loop through each social group
      for(let group of globals.groupList){
        //Filter to just get the students of a particular major
        let groupStudents = filterPollResult("", group, pollResult);
        
        //Get the answer count of those students
        let groupCount = getAnswerCount(graphQuestion, possibleAnswer, groupStudents);
        groupData[possibleAnswer.label] = (groupCount/groupStudents.length);
      }*/
    }
    
  }
  
  let labelTypes = {}
  let labelKeys = [];
  for(let possibleAnswer of graphQuestion.possibleAnswers){
    labelKeys.push(possibleAnswer.label);
    //labelTypes[possibleAnswer.label] = 'area';
  }
  
  var chart = c3.generate({
      bindto: document.getElementById(htmlElementId),
      data: {
        json: graphData,
        keys: {
          x: 'name',
          value: labelKeys
        },
        types: labelTypes,
        groups: [labelKeys],
        selection: {
          enabled: true,
          isselectable: function (d) {

            if(d.value){
              if(d.value > 0){
                return true;
              }
            }            
           return false;
          }
        },
        onselected: function(){console.log("selected");}
      },
      axis: {
        x: {
          type: 'category'
        },
        y: {
          max: 1.05,
          min: 0,
         tick: {
            format: d3.format("%")
          },
          padding: {top: .05, bottom: 0}
        }
      },
    //,
//      legend: {
//        position: 'right',
//        item: {
//          onmouseover: function(d){
//            console.log('test onclick '+d);
//          }
//        }
//      }
      tooltip: {
        //grouped: false
   }
  });
  
  
}

//Creates a trend report based on past polls
//
function createTrendReport_REFACTORED(categoryId, graphType)
{

    document.getElementById('buttonViewer').style = 'display:block';
    document.getElementById('visualisation').innerHTML = "";
  
    let allPollResults = [];
    debugger;
    //Go through each pollResult and see if it included the category
    for(let pollResult of globals.pastPollResults){
      if(pollResult.questionIDs.includes(categoryId)){
        allPollResults.push(pollResult);
      }
    }
  
    //Compile into a graphable format
    createStackedAreaChart(categoryId, 'trendArea', allPollResults);


    document.getElementById('buttonViewer').onclick = function()
    {
        document.getElementById('buttonViewer').style = 'display:none';
        document.getElementById('reportButtons').style = 'display:block';
        document.getElementById('trendArea').style = 'display:none';
    };
    document.getElementById('trendArea').style = 'display:block';
    document.getElementById('reportButtons').style = 'display:none';
}

//FROM POLLING.JS, PUT IT BACK WHEN DONE
function pollResults_REFACTORED(state, isFree, isFake)
{
	var bias = document.getElementById('location').value;

	var duplicate = false;
	var dup1;

	var dup2;


    let newPollResult = new PollResult();

	for(var i = 0; i<6 ;i++)
	{
		var selectedQuestion = document.getElementById("poll"+i+"");
		if(selectedQuestion.options[selectedQuestion.selectedIndex].value != "")
		{
			let pollQuestionId = selectedQuestion.options[selectedQuestion.selectedIndex].value;

            let pollQuestion = globals.allQuestions[pollQuestionId];

            //If the question has a subquestion
			if(pollQuestion.subQuestions && pollQuestion.subQuestions.length){
				//grab the sub question
				var selectedSubQuestion = document.getElementById('subpoll' + i + '');
				var subQuestionId = selectedSubQuestion.value;

                if(subQuestionId != ""){
                    //let newQuestion = new PollQuestion(pollQuestionId, subValue, jsonObj);
                    //newPollResult.questions.push(newQuestion);
                    newPollResult.questionIDs.push(pollQuestionId+subQuestionId);

                    //pollVal = pollVal +""+ subValue;
                    //pollChoices.push(pollVal);
                }
			}
            else{
              //let newQuestion = new PollQuestion(pollQuestionId, "", jsonObj);
              //newPollResult.questions.push(newQuestion);
              newPollResult.questionIDs.push(pollQuestionId);
            }

		}
	}
    console.log(newPollResult);

    let pollChoices = newPollResult.questionIDs;

	//Checks for duplicate questions
	for (var i=0; i< pollChoices.length;i++)
	{
		for (var j=0; j< pollChoices.length;j++)
		{
			if(i!=j)
			{
				var val1 = pollChoices[i];
				var val2 = pollChoices[j];

				if(val1 == val2)
				{
					duplicate = true;
					dup1 = i;
					dup2 = j;
				}
			}
		}
	}
    var sample = document.getElementById("sample");
    var sampleSize = parseFloat(sample.options[sample.selectedIndex].value);

	if(duplicate)
    {
		document.getElementById("duplicateParagraph").innerHTML = "You’re asking the same question more than once! Fix this to continue the poll."
		document.getElementById("duplicateParagraph").style.display = "block";

        let question1 = document.getElementById("poll"+dup1+"");
        let question2 = document.getElementById("poll"+dup2+"");

		question1.options[question1.selectedIndex].style.color = "red";
		question2.options[question2.selectedIndex].style.color = "red";
	}
	else if(pollChoices.length < 2)
	{
       ////CONSOLE.LOG("not enough questions: "+pollChoices.length);
		document.getElementById("duplicateParagraph").innerHTML = "Please Select 2 or More Questions";
        document.getElementById("duplicateParagraph").style.display = "block";
	}
    else if(!pollTimeCheck(sampleSize, pollChoices.length) && !isFree){
      ////CONSOLE.LOG("time check 1");
        document.getElementById("duplicateParagraph").innerHTML = "You dont have enough time to ask that many questions. \nPlease reselect an appropriate number of questions.";
        document.getElementById("duplicateParagraph").style.display = "block";
    }
    //If the poll is sucessful
    else
    {
        //Clear previous screen
        clearScreen();

        //Run poll
        pollCalc_REFACTORED(newPollResult, sampleSize, bias, state, isFree, isFake);

        if(state == POLL_STATES.TUTORIAL){
            document.getElementById("back").innerHTML += "<button onclick = 'drawPoll("+state+","+isFree+","+isFake+")'> Back to Tutorial Poll</button>";
        }
        else if(state == POLL_STATES.PRACTICE_AREA)
        {
            document.getElementById("back").innerHTML += "<button onclick = 'practiceMenu()'> Return to Practice Area</button>";
        }
        else if(state == POLL_STATES.FIRST)
        {
            document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";

        }
        else{
            document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick = 'eventMenu()'> Return to the Game Map </button>";
        }
	}

    //Reset candidates back to correct candidates
	globals.candidates = globals.currentCandidateArrayHolder;

};

//Creates a trend report based on past polls
function createTrendReport(category)
{

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
                            globals.candidates.forEach(function(element2)
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

//FROM POLLING.JS, PUT IT BACK WHEN DONE
function pollResults_REFACTORED(state, isFree, isFake)
{
	var bias = document.getElementById('location').value;

	var duplicate = false;
	var dup1;

	var dup2;


    let newPollResult = new PollResult();
    newPollResult.name += (globals.pastPollResults.length + 1);

	for(var i = 0; i<6 ;i++)
	{
		var selectedQuestion = document.getElementById("poll"+i+"");
		if(selectedQuestion.options[selectedQuestion.selectedIndex].value != "")
		{
			let pollQuestionId = selectedQuestion.options[selectedQuestion.selectedIndex].value;

            let pollQuestion = globals.allQuestions[pollQuestionId];

            //If the question has a subquestion
			if(pollQuestion.subQuestions && pollQuestion.subQuestions.length){
				//grab the sub question
				var selectedSubQuestion = document.getElementById('subpoll' + i + '');
				var subQuestionId = selectedSubQuestion.value;

                if(subQuestionId != ""){
                    //let newQuestion = new PollQuestion(pollQuestionId, subValue, jsonObj);
                    //newPollResult.questions.push(newQuestion);
                    newPollResult.questionIDs.push(pollQuestionId+subQuestionId);

                    //pollVal = pollVal +""+ subValue;
                    //pollChoices.push(pollVal);
                }
			}
            else{
              //let newQuestion = new PollQuestion(pollQuestionId, "", jsonObj);
              //newPollResult.questions.push(newQuestion);
              newPollResult.questionIDs.push(pollQuestionId);
            }

		}
	}
    console.log(newPollResult);

    let pollChoices = newPollResult.questionIDs;

	//Checks for duplicate questions
	for (var i=0; i< pollChoices.length;i++)
	{
		for (var j=0; j< pollChoices.length;j++)
		{
			if(i!=j)
			{
				var val1 = pollChoices[i];
				var val2 = pollChoices[j];

				if(val1 == val2)
				{
					duplicate = true;
					dup1 = i;
					dup2 = j;
				}
			}
		}
	}
    var sample = document.getElementById("sample");
    var sampleSize = parseFloat(sample.options[sample.selectedIndex].value);

	if(duplicate)
    {
		document.getElementById("duplicateParagraph").innerHTML = "You’re asking the same question more than once! Fix this to continue the poll."
		document.getElementById("duplicateParagraph").style.display = "block";

        let question1 = document.getElementById("poll"+dup1+"");
        let question2 = document.getElementById("poll"+dup2+"");

		question1.options[question1.selectedIndex].style.color = "red";
		question2.options[question2.selectedIndex].style.color = "red";
	}
	else if(pollChoices.length < 2)
	{
       ////CONSOLE.LOG("not enough questions: "+pollChoices.length);
		document.getElementById("duplicateParagraph").innerHTML = "Please Select 2 or More Questions";
        document.getElementById("duplicateParagraph").style.display = "block";
	}
    else if(!pollTimeCheck(sampleSize, pollChoices.length) && !isFree){
      ////CONSOLE.LOG("time check 1");
        document.getElementById("duplicateParagraph").innerHTML = "You dont have enough time to ask that many questions. \nPlease reselect an appropriate number of questions.";
        document.getElementById("duplicateParagraph").style.display = "block";
    }
    //If the poll is sucessful
    else
    {
        //Clear previous screen
        clearScreen();

        //Run poll
        pollCalc_REFACTORED(newPollResult, sampleSize, bias, state, isFree, isFake);

        if(state == POLL_STATES.TUTORIAL){
            document.getElementById("back").innerHTML += "<button onclick = 'drawPoll("+state+","+isFree+","+isFake+")'> Back to Tutorial Poll</button>";
        }
        else if(state == POLL_STATES.PRACTICE_AREA)
        {
            document.getElementById("back").innerHTML += "<button onclick = 'practiceMenu()'> Return to Practice Area</button>";
        }
        else if(state == POLL_STATES.FIRST)
        {
            document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";

        }
        else{
            document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick = 'eventMenu()'> Return to the Game Map </button>";
        }
	}

    //Reset candidates back to correct candidates
	globals.candidates = globals.currentCandidateArrayHolder;

};

function pollCalc_REFACTORED(newPollResult, sampleSize, bias, state, isFree, isFake)
{
    //Add question for student group
    //let groupObj = getQuestionById("group");
    //newPollResult.questions.push(new PollQuestion("group", "", groupObj));
    newPollResult.questionIDs.push("group");
    
    //Add question for student major
    //let majorObj = getQuestionById("major");
    //newPollResult.questions.push(new PollQuestion("major", "", majorObj));
    newPollResult.questionIDs.push("major");
    
    //newPollResult.questions = newPollResult.questions.reverse();
    newPollResult.questionIDs = newPollResult.questionIDs.reverse();
    

    newPollResult.students = votePercentage2(sampleSize, bias, newPollResult.questionIDs);
  
    //If the data isn't fake
    //Store it, subtract the time if necessary, and save
	if(!isFake)
	{
        console.log("pushing");
		globals.pastPollResults.push(newPollResult);
		if(!isFree){
		  pollTime(newPollResult.students.length, newPollResult.questionIDs.length);
        }
        //saveGame();
	}
    else if(isFake){
      //Result the fake data back to normal
      globals.candidates = globals.currentCandidateArrayHolder;
    }

	tableBuilder_REFACTORED(newPollResult, isFake, state, isFree, false);

}



function tableBuilder_REFACTORED(pollResult, isFake, state, isFree, isReview)
{
	var table = document.getElementById("pollTable");
	var tableHead = document.getElementById("tableHead");
	var headRow = tableHead.insertRow(0);

    //Makes the table headers based on the chosen questions
    for(let i = 0; i < pollResult.questionIDs.length; i++){
        let id = pollResult.questionIDs[i];
        let question = globals.allQuestions[id];

        var cell = headRow.insertCell();
		cell.innerHTML = question.tableHeader;
    }

    //Creates the contents of the table based on the results of PollCalc
	for(var rowNum = 0; rowNum < pollResult.students.length; rowNum++)
	{

        //Inserts a row into the table for each member of the sample
		row = table.insertRow(rowNum);

        let student = pollResult.students[rowNum];

        //For each student answer, create a separate cell within the same row
        for(var i = 0; i < pollResult.questionIDs.length;i++)
		{
          let id = pollResult.questionIDs[i];
          let question = globals.allQuestions[id];

          //Grab the answer to this specific question
          let studentAnswer = student.answers[question.id+question.subId];

          let searchParams = {"studentAnswer": studentAnswer, "type": question.type};
          let matchingAnswer = question.possibleAnswers.find(findIsMatchingAnswer, searchParams);
          

          let answerText = studentAnswer;//capitalStr(studentAnswer);
          if(matchingAnswer){
            answerText = capitalStr(matchingAnswer.label);
          }

          var cell = row.insertCell();
          cell.innerHTML = answerText;
        }
	}


	sorttable.makeSortable(document.getElementById('tab'));
	document.getElementById("next").innerHTML += "<div id = 'filterArea'></div>"
	document.getElementById("centerDisplay").innerHTML += "<div id = 'barChartDiv' style = 'display:block'></div>";
	document.getElementById("centerDisplay").innerHTML += "<div id = 'pieChartDiv' style = 'display:none'></div>";


    document.getElementById("centerDisplay").innerHTML += "<div id = 'chartFilters' style = 'display:block'> Filters: </div>";
    document.getElementById("chartFilters").innerHTML += "<br>Major: <select class = 'graphFilters' id = 'majorSelect'></select>   Social Group: <select class = 'graphFilters' id = 'groupSelect'></select>";

    document.getElementById("majorSelect").onchange = function(){
      updateGraphs(pollResult);
    }
    document.getElementById("groupSelect").onchange = function(){
      updateGraphs(pollResult);
    }

    var noneOp = document.createElement("option");
    noneOp.text = "None";
    noneOp.value = "";
    var noneOp2 = document.createElement("option");
    noneOp2.text = "None";
    noneOp2.value = "";

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


	document.getElementById("next").innerHTML += "<button id = 'barButton' class='otherBtn' onclick = 'changeDataDisplay(2)' style = 'display:none'>Show Bar Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'pieButton' class='otherBtn' onclick = 'changeDataDisplay(3)'>Show Pie Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'dataButton' class='otherBtn' onclick = 'changeDataDisplay(1)'>Show Data Table</button><br>";
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
  
	if (state == POLL_STATES.TUTORIAL){
        document.getElementById('back').innerHTML += "<button onclick = 'drawPoll("+state+",false, true)'>Back to Start</button>" ;
	}
  
  	makeGraphs_C3(pollResult);
    changeDataDisplay(2);

}

function updateGraphs(currentPoll){
  var major = document.getElementById("majorSelect").value;
  var group = document.getElementById("groupSelect").value;
  
  let filteredPoll = filterPollResult(major, group, currentPoll);
  makeGraphs_C3(filteredPoll);
}

function filterPollResult(matchingMajor, matchingGroup, pollResult)
{
    if(matchingMajor || matchingGroup){
      let filteredResult = Object.assign({}, pollResult);
      let filterArgs = {"major":matchingMajor, "group":matchingGroup};
      filteredResult.students = filteredResult.students.filter(filterByStudentType, filterArgs);
      
      
      return filteredResult;
    }
  return pollResult;
}



function makeGraphs_C3(pollResult)
{
	document.getElementById("barChartDiv").innerHTML = "";
	document.getElementById("pieChartDiv").innerHTML = "";
	var counter = 0;
	//graph dat table
	for (var i=0;i<pollResult.questionIDs.length;i++)
	{
	document.getElementById("barChartDiv").innerHTML += "<div id = 'q"+i+"text'><br></div><div id = 'barChart"+i+"' class= 'chart'></div>";
    document.getElementById("pieChartDiv").innerHTML += "<div id = 'bq"+i+"text'><br></div><div class = 'pieChart"+i+"'></div>";
		if(i==1){
			document.getElementById("barChartDiv").innerHTML += "<hr>";
			document.getElementById("pieChartDiv").innerHTML += "<hr>";
		}
		else if( i == 5){

		}
    }

	for(var i = 0; i < pollResult.questionIDs.length; i++){

		var counter = 0;
		var x = 0;
        
        let id = pollResult.questionIDs[i];
        let currentQuestion =  globals.allQuestions[id];
      
        document.getElementById("q"+i+"text").innerHTML = currentQuestion.question;
        document.getElementById("bq"+i+"text").innerHTML = currentQuestion.question;

        var dataset =  [];
        let graphData = [];
        for (var k = 0; k < currentQuestion.possibleAnswers.length; k++)
        {
            let possibleAnswer = currentQuestion.possibleAnswers[k];
            let count = getAnswerCount(currentQuestion, possibleAnswer, pollResult.students);
            dataset.push ({label: capitalStr(possibleAnswer.label), count: count});
            graphData.push([capitalStr(possibleAnswer.label), count]);
		}
      
        let graphLabels = dataset.map(function(x){
          return x.label;
        });
        let graphCounts = dataset.map(function(x){
          return x.count;
        });

    var chart = c3.generate({
      bindto: document.getElementById('barChart'+i),
      data: {
        columns: graphData,
        type: 'bar',
        labels: {
            format: function (v, id, i, j) { return id + " - " + v; }
          },
        },
        axis: {
          rotated: true,
          x: {
            show:false
          },
          y: {
            show: false
          }
        },
        tooltip: {
          grouped: false, // Default true
          format: {
            title: function (labelId) { return 'Data ' + labelId; },
            value: function (value, ratio, id) {
                var format = id === 'data1' ? d3.format(',') : d3.format('$');
                return format(value);
            }
            //value: d3.format(',') // apply this format to both y and y2
        },
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            console.log(d[0]);
            
            //console.log(studentsMap[d[0].id]);
            //let matchingStudents = studentsMap[d[0].id];
            
            let string = '<div class="c3-tooltip-container"><table class="c3-tooltip"><tbody>'
            string += '<tr><th colspan="2">'+d[0].id+' | '+d[0].value+' Students</th></tr>';
            // for(let i = 0; i < matchingStudents.length; i++){
            //     string += '<tr class="student"><td class="name">Student '+(i+1)+'</td>';
            //     string += '<td class="value">'+matchingStudents[i]+'</td></tr>';
            // }
            
//            for(let i = 0; i < majors.length; i++){
//                for(let j = 0; j < groups.length; j++){
//                    if(counts[i][j] > 0){
//                    
//                    string += '<tr class="student"><td class="value">'+majors[i]+' '+groups[j]+'</td>';
//                    string += '<td class="name">'+counts[i][j]+'</td></tr>';
//                    }
//                }
//                
//                
//            }
            
            string+= '</tbody></table></div>';
            return string;
        }
        
    },
    legend: {
        show: false
    }
    //onrendered:
    });
      questionCharts.push(chart);
      
      document.getElementById('table').style.display = 'none';
      document.getElementById('filterArea').style.display = 'none';
      document.getElementById('pieButton').style.display = 'inline';
      document.getElementById('barButton').style.display = 'none';
      document.getElementById('dataButton').style.display = 'inline';
      document.getElementById('chartFilters').style.display = 'inline';
      
    }
	
}

function makeGraphs_REFACTORED(pollResult)
{
	document.getElementById("barChartDiv").innerHTML = "";
	document.getElementById("pieChartDiv").innerHTML = "";
	var counter = 0;
	//graph dat table
	for (var i=0;i<pollResult.questionIDs.length;i++)
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

	for(var i = 0; i < pollResult.questionIDs.length; i++){

		var counter = 0;
		var x = 0;
        
        let id = pollResult.questionIDs[i];
        let currentQuestion =  globals.allQuestions[id];
      
        document.getElementById("q"+i+"text").innerHTML = currentQuestion.question;
        document.getElementById("bq"+i+"text").innerHTML = currentQuestion.question;

        var dataset =  [];
        for (var k = 0; k < currentQuestion.possibleAnswers.length; k++)
        {
            let possibleAnswer = currentQuestion.possibleAnswers[k];
            let count = getAnswerCount(currentQuestion, possibleAnswer, pollResult.students);
            dataset.push ({label: capitalStr(possibleAnswer.label), count: count});
		}
      
        let graphLabels = dataset.map(function(x){
          return x.label;
        });
        let graphCounts = dataset.map(function(x){
          return x.count;
        });

        //Creates the bar graphs based on the questions
		var dataCounter = 0;
		x = d3.scaleLinear()
		.domain([0, d3.max(graphCounts)])
		.range([0, 420]);


		d3.select(".barChart" + i)
		.selectAll("div")
		.data(graphCounts)
		.enter().append("div")
		.style("width", function(d) { return x(d) + "px"; })
		.text(function(d)
		{
			var zid = graphLabels[dataCounter] + "-" + d;
			//////CONSOLE.LOG(zid);
			dataCounter++;

			return zid;
		});


        

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

function PollResult(){
  this.students = [];
  this.questionIDs = [];
  this.compressedResult = {};
  this.name = "Poll #";
}

function PollStudent(){
  this.answers = {};
}

function PollQuestion(id, subId, jsonObj, subQuestions){

  this.id = id;
  this.subId = subId;

  this.type = jsonObj.type;
  this.question = jsonObj.question;
  this.tableHeader = jsonObj.tableHeader;
  this.possibleAnswers = [];
  this.subQuestions = subQuestions;
  this.isSubQuestion = false;
  
  if(this.subId){
    this.isSubQuestion = true;
  }


  //If this question has a subquestion, then within the JSON, the specific subquestion text has the placeholder "[VALUE]"
  //So we need to replace [VALUE] with the accurate subquestion
  if(this.subId){
    //Replace the combined question text (displayed in bar and pie graphs)
    this.question = jsonObj.combinedQuestion.replace("[VALUE]", this.subId);

    //Replace tableHeader text (displayed in data table)
    this.tableHeader = this.tableHeader.replace("[VALUE]", this.subId);
  }

  //Unless this question uses the current candidates (candFav and candOpp),
  //The possibleAnswers can be read in from the JSON object
  if(jsonObj.labels == "[CANDIDATES]"){
    for(var i = 0; i < globals.candidates.length; i++)
    {
      this.possibleAnswers.push({"label": globals.candidates[i].name, "count":0});
    }
  }
  else{
    //Give each possible answer a count property and initialize it to 0
    for(var i = 0; i < jsonObj.labels.length; i++){
      this.possibleAnswers.push(jsonObj.labels[i]);
      this.possibleAnswers[i].count = 0;
    }
  }

}

function getAnswerCount(question, possibleAnswer, students){
  let count = 0;
  //Find each student's answer for this question
  for(let i = 0; i < students.length; i++){
      let student = students[i];
      let studentAnswer = student.answers[question.id+question.subId];

      if(isMatchingAnswer(possibleAnswer, studentAnswer, question.type)){
        count++;
      }
  }
  return count;
}

function countAnswers(question, students){
  //Reset the counts for all possible answers
  for(let i = 0; i < question.possibleAnswers.length; i++){
    question.possibleAnswers[i].count = 0;
  }
  
  //Find each student's answer for this question
  for(let i = 0; i < students.length; i++){
      let student = students[i];
      let studentAnswer = student.answers[question.id+question.subId];

      let searchParams = {"studentAnswer": studentAnswer, "type": question.type};
      let matchingAnswer = question.possibleAnswers.find(findIsMatchingAnswer, searchParams);

      //Increment the corresponding answer count
      if(matchingAnswer){
        matchingAnswer.count++;
      }
  }
}

function findIsMatchingAnswer(possibleAnswer){
    let studentAnswer = this.studentAnswer;
    let type = this.type;

    return isMatchingAnswer(possibleAnswer, studentAnswer, type);
}

function isMatchingAnswer(possibleAnswer, studentAnswer, type){
    //If this is a categorical question, the answers are a direct match
    if(type == "categorical"){
      if(studentAnswer == possibleAnswer.label){
        return true;
      }
    }
    //If it's a numerical question, the answers correspond to ranges
    if(type == "numerical"){
      //If this answer has no lower limit, it includes anything lower than its upperLimit
      if(!possibleAnswer.lowerLimit){
        //If the answer is below the lefthand threshold
        if(studentAnswer < possibleAnswer.upperLimit){
          return true;
        }
      }
      //If this answer has no upper limit, it includes anything higher than its lowerLimit
      else if(!possibleAnswer.upperLimit){
        //If the answer is above the righthand threshold
        if(studentAnswer >= possibleAnswer.lowerLimit){
          return true;
        }
      }
      else{
        if(studentAnswer >= possibleAnswer.lowerLimit && studentAnswer < possibleAnswer.upperLimit){
          return true;
        }
      }
    }

  return false;
}

function inAnswerRange(possibleAnswer, answer){

  //If this answer has no lower limit, it includes anything lower than its upperLimit
    if(!possibleAnswer.lowerLimit){
      //If the answer is below the lefthand threshold
      if(answer < possibleAnswer.upperLimit){
        return true;
      }
    }
    //If this answer has no upper limit, it includes anything higher than its lowerLimit
    else if(!possibleAnswer.upperLimit){
      //If the answer is above the righthand threshold
      if(answer > possibleAnswer.lowerLimit){
        return true;
      }
    }
    else{
      if(answer > possibleAnswer.lowerLimit && answer < possibleAnswer.upperLimit){
        return true;
      }
    }

  return false;
}

function filterByStudentType(element){
  let filterMajor = this.major;
  let filterGroup = this.group;
  
  if(filterMajor){
    if(element.answers["major"] == filterMajor){
      return true;
    }
  }
  if(filterGroup){
    if(element.answers["group"] == filterGroup){
      return true;
    }
  }
  return false;
}

function filterByStudentType_ALTERNATE(element){
  let filterMajor = this.major;
  let filterGroup = this.group;
  let type = this.type;
  
  if(type == "intersect"){
    if(filterMajor && filterGroup){
      return true;
    }
  }
  else{
    if(filterMajor){
      if(element.answers["major"] == filterMajor){
        return true;
      }
    }
    if(filterGroup){
      if(element.answers["group"] == filterGroup){
        return true;
      }
    }
  }
  return false;
}


function loadQuestionsJSON(){
  
}

function getQuestionById2(id, subId){
  return globals.questions.find(getById, {"id": id});
}

function getQuestionById(id){
  return globals.questions.find(getById, {"id": id});
}

function getById(element){
  //Using array.prototype.find or filter, we'll pass in the id as an argument
  //But since Javascript callbacks are weird, we pass in the id as the "thisArg"
  let id = this.id;

  return element.id === id;
}
