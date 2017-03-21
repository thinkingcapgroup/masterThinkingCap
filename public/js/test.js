var questions;
var playerAnswers =[];

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
		document.getElementById("index-section").innerHTML += "<br/>Not All Questions have been Answered."
	}
}

function showResults()
{
	document.getElementById("index-section").innerHTML = "";
	for( var i =0; i < questions.length; i++)
	{	
		var questionNum = parseInt(questions[i].id) + 1;
		document.getElementById("index-section").innerHTML += "<p class='question'>"+ questionNum +". " +questions[i].question+"?</p>";
		if(questions[i].correct == playerAnswers[i])
		{
			document.getElementById("index-section").innerHTML += "<p>Answer Correct</p>";
		}
		else
		{
			document.getElementById("index-section").innerHTML += "<p>Answer Incorrect</p>";
		}
	}
}
function submitAnswer(question)
{

	var radios = document.getElementsByName("q"+question);

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			// do whatever you want with the checked radio
			playerAnswers.splice(question,1, radios[i].value)
	
			// only one radio can be logically checked, don't check the rest
			break;
		}
	}
}

function start()
{
	var Json;
	var oReq = new XMLHttpRequest();
	oReq.onload = function (e)
	{
		Json = JSON.parse(this.responseText);
		questions = Json.questions;
	};
	oReq.open("get", "json/test.json", true);
	oReq.send();
	
}
function  buildTests ()
{
	document.getElementById("index-section").innerHTML = "";
	for( var i =0; i < questions.length; i++)
	{	
		var questionNum = parseInt(questions[i].id) + 1;
		document.getElementById("index-section").innerHTML += "<p class='question'>"+ questionNum +". " +questions[i].question+"?</p>";
		var answers = questions[i].answers.sort(function(a, b){return 0.5 - Math.random()});
		for( var j =0; j < answers.length; j++)
		{
			switch(j)
			{
				case 0:
					document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"a'><label for='q"+ questions[i].id+"a'> "+ answers[j] +"</label><br/>";
				break;
				case 1:
					document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"b'><label for='q"+ questions[i].id+"b'> "+ answers[j] +"</label><br/>";
				break;
				case 2:
					document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"c'><label for='q"+ questions[i].id+"c'> "+ answers[j] +"</label><br/>";
				break;
				case 3:
					document.getElementById("index-section").innerHTML += "<input type='radio' name='q"+ questions[i].id+"' value='"+ answers[j] +"' id='q"+ questions[i].id+"d'><label for='q"+ questions[i].id+"d'> "+ answers[j] +"</label><br/>";
				break;
			}
		}
		document.getElementById("index-section").innerHTML += "<button onclick = 'submitAnswer("+questions[i].id+")'> Submit Answer </button>";
		playerAnswers.push("");
	}
	
	document.getElementById("index-section").innerHTML += "</br></br><button onclick = 'checkAnswers()'> Submit Test </button>";
}

window.onload = start();