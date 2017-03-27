var questions;
var demographics;
var playerAnswers =[];
var playerResults = [];
var playerDemographicss =[];
var testID;
var postTest = false;

function checkAnswers()
{
	complete = true;
	for( var i =0; i < playerAnswers.length; i++)
	{
		if(playerAnswers[i] == "")
				complete = false;
	}
	if(complete)
	{
		showResults();
	}
	else
	{
		document.getElementById("warning").style.display = "block";
	}
}

function showResults()
{
	document.getElementById("index-section").innerHTML = "";
	for( var i =0; i < questions.length; i++)
	{	
		if(questions[i].correct == playerAnswers[i])
		{
			playerResults.push("Answer Correct");
		}
		else
		{
			playerResults.push("Answer Incorrect");
		}
	}
    //Send the data to database
    for(var j =0; j < questions.length;j++)
    {
        switch(testID)
        {
            case 'pre':
            $.post('/testArea/recordTest', {questionID: j, studentAnswer: playerAnswers[j], isCorrect: playerResults[j], testId: testID });
            break;
            case 'post':
            postTest = true;
            break;
        }
    }
    if(postTest)
        showDemographics();
}
function showDemographics()
{
    
}
function submitAnswers()
{
    for(var i =0; i < questions.length; i++)
    {
        var radios = document.getElementsByName("q"+i);
    
        for (var j = 0, length = radios.length; j < length; j++) {
            if (radios[j].checked) {
                // do whatever you want with the checked radio
                playerAnswers.splice(i,1, radios[j].value)
        
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
    }
    checkAnswers();
}

function start()
{
	var Json;
	var oReq = new XMLHttpRequest();
	oReq.onload = function (e)
	{
		Json = JSON.parse(this.responseText);
		questions = Json.questions;
		demographics = Json.demographic;
	};
	oReq.open("get", "json/test.json", true);
	oReq.send();
	
}
function  buildTests (type)
{
	document.getElementById("index-section").innerHTML = "";
    testID = type;
    switch(testID)
    {
        case 'pre':
        document.getElementById("index-section").innerHTML += "<h2>Pre-Test</h2>";
        break;
        case 'post':
        document.getElementById("index-section").innerHTML += "<h2>Post-Test</h2>";
        break;
    }
	for( var i =0; i < questions.length; i++)
	{	
		var questionNum = parseInt(questions[i].id) + 1;
		document.getElementById("index-section").innerHTML += "<h1 class='question'>"+ questionNum +". " +questions[i].question+"</h1>";
        if(questions[i].random == "yes")
        {
            var answers = questions[i].answers.sort(function(a, b){return 0.5 - Math.random()});
        }
        else
        {
            var answers = questions[i].answers;
        }
        for( var j =0; j < answers.length; j++)
        {
            switch(j)
            {
                case 0:
                    document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"a'><label for='q"+ questions[i].id+"a'> A. "+ answers[j] +"</label><br/>";
                break;
                case 1:
                    document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"b'><label for='q"+ questions[i].id+"b'> B. "+ answers[j] +"</label><br/>";
                break;
                case 2:
                    document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"c'><label for='q"+ questions[i].id+"c'> C. "+ answers[j] +"</label><br/>";
                break;
                case 3:
                    document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"d'><label for='q"+ questions[i].id+"d'> D. "+ answers[j] +"</label><br/>";
                break;
                case 4:
                    document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"e'><label for='q"+ questions[i].id+"e'> E. "+ answers[j] +"</label><br/>";
                break;
            }
        }

		document.getElementById("index-section").innerHTML += "<br><br>";
		playerAnswers.push("");
	}
	
	document.getElementById("index-section").innerHTML += "</br></br><button onclick = 'submitAnswers()'> Submit Test </button>";
}

window.onload = start();