var q1Answer = "";
var q1Correct = "c";

function checkAnswer()
{
	if(q1Answer != "")
	{
		if(q1Answer == q1Correct)
		{
			document.getElementById("index-section").innerHTML = "<p>Answer Correct</p>";
		}
		else
		{
			document.getElementById("index-section").innerHTML = "<p>Answer Incorrect</p>";
		}
	}
}

function submitAnswer()
{

	q1Answer = "";
	var radios = document.getElementsByName('q1');

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			// do whatever you want with the checked radio
			q1Answer = radios[i].value;
	
			// only one radio can be logically checked, don't check the rest
			break;
		}
	}
	checkAnswer();
}