var questions;
var orderedQuestions = [];
var demographics;
var playerAnswers =[];
var playerResults = [];
var playerDemographicss =[];
var playerConfidence = [];
var testID;
var postTest = false;
var confidencetouched = [];
 
function checkAnswers()
{
	complete = true;
	for( var i =0; i < playerAnswers.length; i++)
	{
		if(playerAnswers[i] == "")
		{
			complete = false;
			var currentQuestion = "question" +i+"";
			document.getElementById(currentQuestion).style.border = "thick solid";
			document.getElementById(currentQuestion).style.borderColor = "red";
		}
		else
		{
			var currentConf = "question"+i+"";
			document.getElementById(currentConf).style.borderColor = "transparent";
		}
		if(!confidencetouched[i])
		{
			complete = false;
			var currentConf = "rightCol"+i+"";
			document.getElementById(currentConf).style.border = "thick solid";
			document.getElementById(currentConf).style.borderColor = "red";
			
		}
		else
		{
			var currentConf = "rightCol"+i+"";
			document.getElementById(currentConf).style.borderColor = "transparent";
		}
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
function preTestConsent()
{
		document.getElementById("consentForms").style.display = "block";
		document.getElementById("testChoice").style.display = "none";
}
function showResults()
{
	document.getElementById("index-section").innerHTML = "";
	for( var i =0; i < orderedQuestions.length; i++)
	{	
		if(orderedQuestions[i].correct == playerAnswers[i])
		{
			playerResults.push("Answer Correct");
		}
		else
		{
			playerResults.push("Answer Incorrect");
		}
	}
    //Send the data to database
    for(var j =0; j < orderedQuestions.length;j++)
    {
        switch(testID)
        {
            case 'pre':
            $.post('/testArea/recordTest', {questionID: j, studentAnswer: playerAnswers[j], isCorrect: playerResults[j], testId: testID, confidence: playerConfidence[j]});
            document.getElementById("index-section").innerHTML = "<h2> Test Submitted </h2> <br><br><a class = 'btn double remove' href='/marsUniversity'>Choose Module</a>";
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
    for( var i =1; i < demographics.length; i++)
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
	for( var i = 1; i < demographics.length; i++)
	{
        var demoNum = questions.length + i;
        switch(demographics[i].type)
        {
            case 'text':
            case 'longtest':
            if(document.getElementById('q'+ demoNum + 'a').value == "" && demographics[i].required == 'true')
				complete = false;
            break;
            case 'radio':
               var radios = document.getElementsByName("q"+demoNum);
                var selected = false;
                for (var j = 0, length = radios.length; j < length; j++) {
                    if (radios[j].checked ) {
                        selected == true;
                        break;
                    }
                }
                if(!selected && demographics[i].required == 'true')
                {
                    complete = false;
                }
            break;
        }
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
    var _name = "N/A"; 
    var _age = document.getElementById('q'+ (questions.length + 1) + 'a').value; 
    var _year = document.getElementById('q'+ (questions.length + 2) + 'a').value; 
    var radios = document.getElementsByName('q'+ (questions.length + 3));
    var _classTaken ="";
    console.log(radios);
    for (var j = 0, length = radios.length; j < length; j++) {
        if (radios[j].checked ) {
            if(radios[j].value == 'No')
                _classTaken = 'None';
            else if(radios[j].value == 'Yes')
                _classTaken = document.getElementById('q'+ (questions.length + 4) + 'a').value;
            break;
        }
    } 
    radios = document.getElementsByName('q'+ (questions.length + 5));
    for (var j = 0, length = radios.length; j < length; j++) {
        if (radios[j].checked ) {
            var _gender = radios[j].value; 
            break;
        }
    } 
    radios = document.getElementsByName('q'+ (questions.length + 6));
    for (var j = 0, length = radios.length; j < length; j++) {
        if (radios[j].checked ) {
            var _hearingStatus = radios[j].value; 
            break;
        }
    } 
    var _ethnicity="";
    console.log(radios);
    radios = document.getElementsByName('q'+ (questions.length + 7));
    for (var j = 0, length = radios.length; j < length; j++) {
        if (radios[j].checked ) {
            if(radios[j].value != 'Other')
                _ethnicity = radios[j].value; 
            else
                _ethnicity = document.getElementById('q'+ (questions.length + 8) + 'a').value;
            break;
        }
    } 
    var _language ="";
    console.log(radios);
    radios = document.getElementsByName('q'+ (questions.length + 9));
    for (var j = 0, length = radios.length; j < length; j++) {
        if (radios[j].checked ) {
            if(radios[j].value != 'Other')
                _language = radios[j].value; 
            else
                 _language = document.getElementById('q'+ (questions.length + 10) + 'a').value;
            break;
        }
    } 
    console.log(_classTaken);
    console.log(_ethnicity);
    console.log(_language);
    $.post('/testArea/recordDemo', {name: _name, age: _age, year: _year, classTaken: _classTaken, gender: _gender, hearingStatus: _hearingStatus, ethnicity: _ethnicity, language: _language});
    for(var j =0; j < questions.length;j++)
    {
        $.post('/testArea/recordTest', {questionID: j, studentAnswer: playerAnswers[j], isCorrect: playerResults[j], testId: testID, confidence: playerConfidence[j]  });
    }
    document.getElementById("index-section").innerHTML = "<h2> Test Submitted </h2><br><br><a class = 'btn double remove' href='/marsUniversity'>Choose Module</a>";
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
				console.log(playerAnswers);
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
    }
    for(var z =0; z < questions.length; z++){
        var sliderID = "sliderValue" + z
        var confAnswer = document.getElementById(sliderID).value
        playerConfidence.push(confAnswer)
    }

    //console.log(playerConfidence)
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
$(document).on('change','.consent',function(){
	checkConsent();
});
function checkConsent()
{
	if(	document.getElementById("name").value != "")
	{
		if(document.getElementById("date").value != "")
		{
			if(document.getElementById("stuID").value != "")
			{
				document.getElementById("postConsent").style.display = "block";
				document.getElementById("postConsentPrompt").style.display = "none";
			}
		}
	}
}

function  buildTests (type)
{
	document.body.scrollTop = document.documentElement.scrollTop = 0
    $.post('/testArea/recordConsent', {name: document.getElementById("name").value, date: document.getElementById("date").value, stuID: document.getElementById("stuID").value});
    $.post('/testArea/newTestSession', {});
    document.getElementById('sectionHolder').style.backgroundColor = 'white'
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
    document.getElementById("index-section").innerHTML = "<section id = 'population'><h2>POPULATION AND SAMPLE</h2></section><section id = 'category'><h2>CATEGORICAL AND NUMERICAL</h2> <p> Another word for categorical is “qualitative”. Another word for numerical is “quantitative”</p></section><section id = 'bias'section><h2>SAMPLING AND BIAS</h2></section><section id = 'mean'><h2>MEAN AND STANDARD DEVIATION</h2></section><section id = 'percentage'><h2>PROPORTION/PERCENTAGE</h2></section>";
    questions.forEach(function(element) {
		orderedQuestions.push(element);
	});
	questions.sort(function(a, b){return 0.5 - Math.random()});
	for( var i =0; i < questions.length; i++)
	{	
		var questionNum = i + 1;
		document.getElementById(questions[i].type).innerHTML += "<br><br><h1 class='question' id = 'question"+questions[i].id+"'>"+ questions[i].question+"</h1><br>";
        document.getElementById(questions[i].type).innerHTML += "<div class = 'rightCol' id = 'rightCol"+i+"'><p>    Confidence: <br><i class='fa fa-frown-o fa-2x'></i> <input id = 'sliderValue"+i+"'type = 'range' min='1' max='10'  value = '5'> <i class='fa fa-smile-o fa-2x'></p></div>"
        confidencetouched.push(false);
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
	
	for(let j =0; j < questions.length; j++)
	{
		var confidenceBar = "rightCol"+j+"";
		document.getElementById(confidenceBar).onmousedown = function(){
			confidencetouched[j] = true;
		}
	}
}

window.onload = start();