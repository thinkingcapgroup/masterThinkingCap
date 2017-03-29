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
		document.getElementById("warning").style.display = "none";
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
            document.getElementById("index-section").innerHTML = "<h2> Test Submitted </h2> <br><br><a class = 'btn double remove' href='/dashboard'>Choose Module</a>";
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
	document.getElementById("index-section").innerHTML = "";
    for( var i =0; i < demographics.length; i++)
	{
        var demoNum = questions.length + i;
        document.getElementById("index-section").innerHTML += "<h1 class='question'>"+ demographics[i].question+"</h1>";
        switch(demographics[i].type)
        {
            case 'text':
                document.getElementById("index-section").innerHTML += "<input type='text' name='q"+ demoNum+"' value='' id='q"+ demoNum+"a'><br/>";
            break;
            case 'longtest':
                document.getElementById("index-section").innerHTML += "<input size='75' type='text' name='q"+ demoNum+"' value='' id='q"+ demoNum+"a'><br/>";
            break;
            case 'radio':
            var answers = demographics[i].answers;
                for( var j =0; j < answers.length; j++)
                {
                    console.log(answers.length);
                    switch(j)
                    {
                        case 0:
                            document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ demoNum+"' value='"+ answers[j] +"' id='q"+ demoNum+"a'><label for='q"+ demoNum+"a'> "+ answers[j] +"</label><br/>";
                        break;
                        case 1:
                            document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ demoNum+"' value='"+ answers[j] +"' id='q"+ demoNum+"b'><label for='q"+ demoNum+"b'> "+ answers[j] +"</label><br/>";
                        break;
                        case 2:
                            document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ demoNum+"' value='"+ answers[j] +"' id='q"+ demoNum+"c'><label for='q"+ demoNum+"c'> "+ answers[j] +"</label><br/>";
                        break;
                        case 3:
                            document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ demoNum+"' value='"+ answers[j] +"' id='q"+ demoNum+"d'><label for='q"+ demoNum+"d'> "+ answers[j] +"</label><br/>";
                        break;
                        case 4:
                            document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ demoNum+"' value='"+ answers[j] +"' id='q"+ demoNum+"e'><label for='q"+ demoNum+"e'> "+ answers[j] +"</label><br/>";
                        break;
                }
            }
        }
        document.getElementById("index-section").innerHTML += "<br/><br/>";
    }
	document.getElementById("index-section").innerHTML += "<button onclick = 'checkDemographics()'> Submit Demographics </button>"
}
function checkDemographics()
{
	complete = true;
	for( var i = questions.length; i < playerAnswers.length; i++)
	{
		if(playerAnswers[i] == "" && demographics[i].required == 'true')
				complete = false;
	}
	if(complete)
	{
		document.getElementById("warning").style.display = "none";
		submitDemographics();
	}
	else
	{
		document.getElementById("warning").style.display = "block";
	}
}
function submitDemographics()
{
    for( var i =0; i < demographics.length; i++)
	{
        var demoNum = questions.length + i;
            console.log(demoNum)
        switch(demographics[i].type)
        {
            case 'text':
                playerAnswers.push(document.getElementById('q'+ demoNum + 'a').value);
            break;
            case 'longtest':
                playerAnswers.push(document.getElementById('q'+ demoNum + 'a').value);
            break;
            case 'radio':
               var radios = document.getElementsByName("q"+demoNum);
    
                for (var j = 0, length = radios.length; j < length; j++) {
                    if (radios[j].checked) {
                        // do whatever you want with the checked radio
                        playerAnswers.push(radios[j].value);
                
                        // only one radio can be logically checked, don't check the rest
                        break;
                    }
                }
            break;
        }
    }
    
    for(var j =0; j < questions.length + demographics.length;j++)
    {
        if(j < questions.length)
            $.post('/testArea/recordTest', {questionID: j, studentAnswer: playerAnswers[j], isCorrect: playerResults[j], testId: testID });
        else
            $.post('/testArea/recordTest', {questionID: j, studentAnswer: playerAnswers[j], isCorrect: "N/A", testId: "demo" });
    }
    document.getElementById("index-section").innerHTML = "<h2> Test Submitted </h2><br><br><a class = 'btn double remove' href='/dashboard'>Choose Module</a>";
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
    $.post('/testArea/newTestSession', {});
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
    document.getElementById("index-section").innerHTML = "<section id = 'population'><h2>Population</h2></section><section id = 'category'><h2>Category</h2></section><section id = 'bias'section><h2>Bias</h2></section><section id = 'mean'><h2>Mean</h2></section><section id = 'percentage'><h2>Percentage</h2></section>";
    questions.sort(function(a, b){return 0.5 - Math.random()});
	for( var i =0; i < questions.length; i++)
	{	
		var questionNum = i + 1;
		document.getElementById(questions[i].type).innerHTML += "<br><br><h1 class='question'>"+ questions[i].question+"</h1>";
        if(questions[i].random == "yes")
        {
            var answers = questions[i].answers.sort(function(a, b){return 0.5 - Math.random()});
        }
        else
        {
            var answers = questions[i].answers;
        }
        var answers = questions[i].answers;
        for( var j =0; j < answers.length; j++)
        {
            switch(j)
            {
                case 0:
                    document.getElementById(questions[i].type).innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"a'><label for='q"+ questions[i].id+"a'> A. "+ answers[j] +"</label><br/>";
                break;
                case 1:
                    document.getElementById(questions[i].type).innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"b'><label for='q"+ questions[i].id+"b'> B. "+ answers[j] +"</label><br/>";
                break;
                case 2:
                    document.getElementById(questions[i].type).innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"c'><label for='q"+ questions[i].id+"c'> C. "+ answers[j] +"</label><br/>";
                break;
                case 3:
                    document.getElementById(questions[i].type).innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"d'><label for='q"+ questions[i].id+"d'> D. "+ answers[j] +"</label><br/>";
                break;
                case 4:
                    document.getElementById(questions[i].type).innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"e'><label for='q"+ questions[i].id+"e'> E. "+ answers[j] +"</label><br/>";
                break;
            }
            if(j == answers.length -1)
            { document.getElementById(questions[i].type).innerHTML += "<br>";}
        }
		playerAnswers.push("");
	}
	
	document.getElementById("index-section").innerHTML += "</br></br><button onclick = 'submitAnswers()'> Submit Test </button>";
}

window.onload = start();