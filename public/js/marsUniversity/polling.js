var theJSONEvents = []
var theQuestionBools = [];

const POLL_STATES = {
    TUTORIAL: 1,
    PRACTICE_AREA: 2,
    IN_GAME_PRACTICE: 3,
    END_OF_DAY: 0,
    IN_GAME: 5,
    FIRST: 4
}

$(document).on('change', '.totalTimeTracker', function(){


  var samp = document.getElementById('sample').value;
  var qLength = 0;
  for (var x = 0; x < 6; x++){
    var qpVar = document.getElementById('poll'+x+'').value;

    theQuestionBools[x] = false;

    //If the question isn't empty
    if(qpVar != ""){
        //If there's a subquestion involved
        //Aka if the subpoll element has options
        if(document.getElementById('subpoll'+x+'').options.length){
            //If the subquestion isn't empty
            if(document.getElementById('subpoll'+x+'').value != ""){
                theQuestionBools[x] = true;
                qLength++;
            }
        }
        else{
            theQuestionBools[x] = true;
            qLength++;
        }

    }
  }

//  for (var y = 0; y < 6; y++){
//    if(theQuestionBools[y] == true){
//      qLength++;
//
//    }
//  }

  var timeHolder = returnTotalPollTime(samp, qLength);

  document.getElementById('timeParagraph').innerHTML = 'Total Time: ' + timeHolder + ' hours';

})

function onPollChange(pollThing){
  var pollQuestion = document.getElementById($(this).attr('id')).value;
  var questionNumber = $(this).attr('id').charAt(4);

  //Record question for logging
  theJSONEvents[questionNumber] = pollQuestion;

  var subQuestionId = "subpoll" + questionNumber;
  var subQuestion = document.getElementById(subQuestionId)

  //Check if this question has subquestions
  let jsonObj = getQuestionById(pollQuestion);

  if(jsonObj && jsonObj.subQuestions){

       subQuestion.style = "display:block";

      $('#' + subQuestionId).empty();

      let noneOption = new Option("None", "");
      noneOption.setAttribute("class", "defaultSubOption");
      subQuestion.options.add(noneOption);

      if(jsonObj.subQuestions == "[ISSUES]"){
          for(var x = 0; x < 4; x++){
          let newOption = new Option(globals.positions[x], globals.positionsLower[x]);
          newOption.setAttribute("class", "defaultSubOption");
          subQuestion.options.add(newOption);
        }
      }
      if(jsonObj.subQuestions == "[CANDIDATES]"){
        for(var x = 0; x < globals.candidates.length; x++){
            let newOption;
            if(x == 0 && globals.candidates[0].name != "Karma"){
              newOption = new Option(globals.candidates[x].name, "Player");
            }
            else{
                newOption = new Option(globals.candidates[x].name, globals.candidates[x].name);
            }

            newOption.setAttribute("class", "defaultSubOption");
            subQuestion.options.add(newOption);
        }
      }
  }
  else{
    subQuestion.style = "display:none"
  }

  dupChecker();
}

$(document).on('change', '.pollQ', onPollChange);

$(document).on('change','.subPollQ',function(){
      document.getElementById("subpoll0").style.color = "black"
      document.getElementById("subpoll1").style.color = "black"
	  if(document.getElementById("subpoll2") != null)
      document.getElementById("subpoll2").style.color = "black"
	  if(document.getElementById("subpoll3") != null)
      document.getElementById("subpoll3").style.color = "black"
	  if(document.getElementById("subpoll4") != null)
      document.getElementById("subpoll4").style.color = "black"
	  if(document.getElementById("subpoll5") != null)
      document.getElementById("subpoll5").style.color = "black"
      document.getElementById("duplicateParagraph").style.display = "none"
	  dupChecker();
 });

//Subtracts time required to take a poll based on both sample size and the number of questions
function pollTime(sSize, pollQuestions)
{
  let timeRequired;
	if(pollQuestions.length%2 == 0)
	{
		timeRequired = sSize/10 + (pollQuestions.length*.5);
	}
	else
	{
		timeRequired = sSize/10 + (pollQuestions.length*0.5) +0.5;
	}
	globals.remainingHoursTotal -= timeRequired;
	globals.remainingHoursDay -= timeRequired;
}

function returnTotalPollTime(sSize, pollQuestions){
  let timeRequired;
	if(pollQuestions% 2 == 0)
	{
		timeRequired = sSize/10 + (pollQuestions*.5);
	}
	else
	{
		timeRequired = sSize/10 + (pollQuestions*0.5) +0.5;
	}
	return timeRequired;
}

function pollTimeCheck(sSize, pollQuestions)
{
    let timeRequired;

	if(pollQuestions.length%2 == 0)
	{
		timeRequired = sSize/10 + (pollQuestions.length*.5);
	}
	else
	{
		timeRequired = sSize/10 + (pollQuestions.length*0.5) +0.5;
	}

	return (timeRequired <= globals.remainingHoursDay);
}

// Loops through the current questions and checks for duplicates
function dupChecker()
{

	var duplicate = false;
	var dup1;
	var dup2;
	var pollChoices = [];

    let questionIndex;
    //let subQuestionIndex;


    resetPollStyling();

	for(var i = 0; i<6 ;i++)
	{
        let subQuestionIndex;

		var selectedQuestion = document.getElementById("poll"+i+"");
		if(selectedQuestion.value != "")
		{
			var pollVal = selectedQuestion.value;

			if(pollVal == 'issue'||pollVal == 'candFame'||pollVal == 'candTrust'){
				//grab the sub question
				var selectedSubQuestion = document.getElementById('subpoll' + i + '');
				var subValue = selectedSubQuestion.value;

                if(subValue != ""){
                    subQuestionIndex = selectedSubQuestion.selectedIndex;
                    pollVal = pollVal +","+ subValue;
                }
                else{
                    pollVal = subValue;
                }
			}
            if(pollVal){
                pollChoices.push(pollVal);

                questionIndex = selectedQuestion.selectedIndex;

                //Make the option in all other dropdowns red
                for(var j = 0; j < 6; j++){
                    //If it's not the same dropdown
                    if(j != i){
                        let question = document.getElementById("poll"+j+"");
                        debugger;
                        //If the poll value involves a subquestion
                        if(subQuestionIndex != null && subQuestionIndex > -1){
                            ////CONSOLE.LOG("is subquestion");
                            //If it's the same question
                            if(questionIndex == question.selectedIndex){
                                //Highlight the sub question
                                let subQuestion = document.getElementById("subpoll"+j+"");
                                //subQuestion.options[subQuestionIndex].setAttribute("class", "duplicateOption3")
                                subQuestion.options[subQuestionIndex].disabled = true;
                            }
                        }
                        else{

                            //if(question.indexOf())
                            //question.options[questionIndex].setAttribute("class", "duplicateOption2")
                            question.options[questionIndex].disabled = true;
                        }

                    }
                }
            }


		}

	}

}

// Loops through the current questions and checks for duplicates
function dupChecker_REFACTORED()
{

	var duplicate = false;
	var dup1;
	var dup2;
	var pollChoices = [];

  let questionIndex;
    //let subQuestionIndex;


    resetPollStyling();

    for(var i = 0; i<6 ;i++)
  	{
  		var selectedQuestion = document.getElementById("poll"+i+"");
  		if(selectedQuestion.value != "")
  		{
  			let pollValue = selectedQuestion.value;
        let jsonObj = getQuestionById(pollValue);

        //If the question has a subquestion
  			if(jsonObj.subQuestions){
          var selectedSubQuestion = document.getElementById('subpoll' + i + '');
  				var subValue = selectedSubQuestion.value;

          if(subValue != ""){
              subQuestionIndex = selectedSubQuestion.selectedIndex;
              pollVal = pollVal +","+ subValue;
          }
          else{
              pollVal = subValue;
          }
  		   }
  	   }

    if(pollVal){

        questionIndex = selectedQuestion.selectedIndex;

        //Make the option in all other dropdowns red
        for(var j = 0; j < 6; j++){
            //If it's not the same dropdown
            if(j != i){
                let question = document.getElementById("poll"+j+"");
                debugger;
                //If the poll value involves a subquestion
                if(subQuestionIndex != null && subQuestionIndex > -1){
                    ////CONSOLE.LOG("is subquestion");
                    //If it's the same question
                    if(questionIndex == question.selectedIndex){
                        //Highlight the sub question
                        let subQuestion = document.getElementById("subpoll"+j+"");
                        //subQuestion.options[subQuestionIndex].setAttribute("class", "duplicateOption3")
                        subQuestion.options[subQuestionIndex].disabled = true;
                    }
                }
                else{

                    //if(question.indexOf())
                    //question.options[questionIndex].setAttribute("class", "duplicateOption2")
                    question.options[questionIndex].disabled = true;
                }

            }
        }
    }
  }

}






function resetPollStyling(){
    //Set all selects and options to default styling
    //Loop through all questions
    for(let i = 0; i < 6; i++){
        let question = document.getElementById("poll"+i+"");
        question.style.color = "black";

        //Enable all options
        for(let j = 0; j < question.options.length; j++){
            question.options[j].disabled = false;
        }

        let subQuestion = document.getElementById("subpoll"+i+"");

        if(subQuestion){
            subQuestion.style.color = "black";

            //Enable all options
            for(let j = 0; j < subQuestion.options.length; j++){
                subQuestion.options[j].disabled = false;
            }
        }

    }
}

//Displays the result of a poll immediately after it end and then saves the report for later viewing
function pollResults(state, isFree, isFake)
{
	var bias = document.getElementById('location').value;

	var duplicate = false;
	var dup1;
	var dup2;
	var pollChoices = [];
	for(var i = 0; i<6 ;i++)
	{
		var selectedQuestion = document.getElementById("poll"+i+"");
		if(selectedQuestion.options[selectedQuestion.selectedIndex].value != "")
		{
			var pollVal = selectedQuestion.options[selectedQuestion.selectedIndex].value;


			if(pollVal == 'issue'||pollVal == 'candFame'||pollVal == 'candTrust'){
				//grab the sub question
				var selectedSubQuestion = document.getElementById('subpoll' + i + '');
				var subValue = selectedSubQuestion.value;

                if(subValue != ""){
                    pollVal = pollVal +""+ subValue;
                    pollChoices.push(pollVal);
                }
			}
            else{
              pollChoices.push(pollVal);
            }

		}
	}


	for (var i=0; i< pollChoices.length;i++)
	{
		if(pollChoices[i] == "candFamePlayer"){
			pollChoices[i] = "fame";
		}
		else if (pollChoices[i] == "candTrustPlayer"){
			pollChoices[i] = "playTrust";
		}
	}

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
    else if(!pollTimeCheck(sampleSize, pollChoices) && !isFree){
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
        pollCalc(pollChoices, sampleSize, bias, state, isFree, isFake);

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

function addMoreQuestions(){
	if(globals.qPollHolder <= 4){
		qh2 = globals.qPollHolder + 1;
		document.getElementById('poll' + globals.qPollHolder + '').style = "display:block";
		document.getElementById('poll' + qh2 + '').style = "display:block";
		globals.qPollHolder = globals.qPollHolder + 2;
		if(globals.qPollHolder == 6 && document.getElementById("moreQuestionButton") != null)
		document.getElementById("moreQuestionButton").style.display = "none";
	}
}

function drawPoll(state, isFree, isFake){

	clearScreen();
    document.getElementById("contentContainer").classList.add("columns");
    document.getElementById("mainContent").classList.add("left");

    if(isFake){
      globals.currentCandidateArrayHolder = globals.candidates;
      globals.candidates = globals.fakeCandidateHolder;
    }
    else{
      saveGame();
    }

	if(state == POLL_STATES.IN_GAME)
    {
        //Display Updated Top Bar
        updateTopBar(pollMenu);
    }

	globals.qPollHolder = 2;

    let pollQuestions = [];
    let enoughTime = false;

    //If it's a free poll or if there's enough time
	if(isFree || globals.remainingHoursDay>= 3 )
	{
        enoughTime = true;

		//Populates the questions based on the JSON File
        for(var i = 0; i<globals.questions.length; i++)
        {
          //As long as it's not major or social group, push the question
          if(globals.questions[i].id != "major" &&  globals.questions[i].id != "group"){
            pollQuestions.push(globals.questions[i]);
          }
        }

	}
    //CONSOLE.LOG("pollQuestions length "+pollQuestions.length);

    let context = {
      state: state,
      free: isFree,
      fake: isFake,
      areas: areaChoices,
      allow40: (isFree || globals.remainingHoursDay > 5),
      allow80: (isFree || globals.remainingHoursDay >= 9),
      numQuestions: 6,
      questions: pollQuestions,
      enoughTime: enoughTime
    }

    document.getElementById("mainContent").innerHTML = views["takePoll"](context);
    document.getElementById('map').style.display = "block";
    globals.isCurrentAreaHover = areaChoices["Quad"].id;
    setupMap(true);

    if(state == POLL_STATES.FIRST || globals.remainingHoursDay >= 4 )
		addMoreQuestions();
	if(state != POLL_STATES.FIRST && globals.remainingHoursDay >= 5)
		{addMoreQuestions();}

//	//Displays the screen for this event
//	document.getElementById("questionArea").innerHTML += "<p id = 'duplicateParagraph'></p><br><button class = 'logEventPoll' onclick = 'pollResults("+state+", " +isFree+","+isFake+")'> Submit Poll </button><br>";

    //Tutorial's practice poll
	if(state == POLL_STATES.TUTORIAL){
		document.getElementById("next").innerHTML += "<br> <button class='primaryBtn' type='button' onclick='chooseDiff()'> Start the Game </button>";
		document.getElementById("back").innerHTML = "<button type='button' onclick='tutorial("+false+")'>Return to Tutorial </button>";
	}
    //Poll within Practice Area
	else if (state == POLL_STATES.PRACTICE_AREA){
		document.getElementById("back").innerHTML += "<br> <button type='button' onclick='practiceMenu()'> Back to Practice Area </button>";
	}
    //First poll in the game
	else if(state == POLL_STATES.FIRST){
		document.getElementById("next").innerHTML += "<br> <button class='primaryBtn' onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";
	}
    //End of day poll
	else if(state == POLL_STATES.END_OF_DAY){
		document.getElementById("sample").value = "80";
        document.getElementById("next").innerHTML += "<br> <button class='otherBtn' type='button' onclick='eventMenu()' > Choose Not to Take the Poll  </button>";
    }
    //It's a poll the user has chosen to take or [oll when you retake the tutorial from within the main game
    else if(state == POLL_STATES.IN_GAME || state == POLL_STATES.IN_GAME_PRACTICE){
        setBackToMapBtn();
    }

    //Set event listeners last, after all elements have been loaded
    //Set onchange event for the location dropdown
    document.getElementById("location").onchange = function(){
        globals.isCurrentAreaHover = document.getElementById("location").value;

        //Redraw map
        drawMapAreas();
        drawMapIcons();
    }

}

//takes the player into a poll with fake candidates to test out polling
function setupPracticePoll()
{


	globals.candidates = [];

	globals.population = 1000;
	globals.sample = [];
	globals.remainingHoursTotal = 84;
	globals.days = 1;
	globals.remainingHoursDay = 12;

	//Decides the opponents focus which cannot be the same as the player
	globals.opponentCandidate.fame = [.7,.7,.7,.7,.7,.7,.7,.7];
	globals.opponentCandidate.consMod = 0;
	//////CONSOLE.LOG(oppFocus);
	assignIssue(globals.opponentCandidate,[],.7,false);
	globals.candidates.push(globals.opponentCandidate);

	//Create Issue Candidates
	var issueCand1 = new Candidate("Zrap Bannigan");
	var oppRank = Math.floor(Math.random()*4);
	issueCand1.focus = globals.positions[oppRank];
	issueCand1.focusnum = oppRank;
	assignRank(issueCand1,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand1);


	drawPoll(POLL_STATES.PRACTICE_AREA, false, true);
}
