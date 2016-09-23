//making all the score presets
var groupList = ["socialite", "athlete", "researcher", "mediaLover", "reader"];
var majorList = ["business", "engineering", "tech", "fineArts", "libArts"];
var stuEconomic = ["poverty", "low", "midLow", "midHigh", "high"];

//scores go Socialite/Athlete/MediaLover/Researcher/Reader
//the score goes tuition, tuition var, athletic, athletic var, research, research var, events, events var, medical, medicalvar
var positions = 
[
	"Lowering Tuition",
	"Increase Athletic Budget",
	"Increase Research Budget",
	"More School Events",
	"Improve Medical Services"	
];

var groupIssues = 
[
	[2,2,2,1,0,3,1,1,-1,2],
	[0,2,3,1,0,3,1,1,-1,2],
	[1,1,-1,2,1,2,3,1,-2,3],
	[-1,1,-1,1,2,2,3,1,0,4],
	[0,3,-2,2,0,2,1,3,3,1]
];
//goes Poverty/Low/MediumLow/MediumHigh/High
var classIssues = 
[
	[2,2,0,1,2,1,-2,2,3,1],
	[0,2,-1,1,1,3,1,2,2,1],
	[3,1,1,3,2,2,-1,1,1,1],
	[-2,1,2,1,-1,3,1,2,2,1],
	[-1,1,-2,3,2,-1,3,1,0,4]
];
//goes Business/Engineering/Technology/FineArts/LiberalArts
var majorIssues = 
[
	[-2,1,3,1,1,1,0,3,2,1],
	[-1,2,1,1,1,3,-2,1,3,1],
	[3,1,-1,1,3,1,0,4,0,2],
	[2,2,0,3,-2,2,2,2,2,1],
	[0,3,0,4,-3,1,3,1,-2,1]
]

// Creates an array of events you can perform 
var events = 
[
	{
		name: "Posters", 
		timeRequired: 4, 
		scoreIncrease: 1, 
		type: "smallEvent",
		desc: "Short Description followed by promt to choose options",
		actionChoice:1,
		options: 
		[
			{
				optionName: "Option3", 
				extraTime: 1,
				bonusScore: 1,
			},
			
			{
				optionName: "Option2", 
				extraTime: 2,
				bonusScore: 2
			},
			
			{
				optionName: "Option3", 
				extraTime: 3,
				bonusScore: 3
			}
		]
	},
	
	{
		name: "News Letter", 
		timeRequired: 8, 
		scoreIncrease: 2, 
		type: "smallEvent",
		desc: "Short Description followed by promt to choose options",
		actionChoice:2,
		options: 
		[
			{
				optionName: "Option1", 
				extraTime: 1,
				bonusScore: 1
			},
			
			{
				optionName: "Option2", 
				extraTime: 2,
				bonusScore: 2
			}
		]
	},
	
	{
		name: "Booth", 
		timeRequired: 16, 
		scoreIncrease: 4, 
		type: "smallEvent", 
		desc: "Short Description followed by promt to choose options",
		actionChoice:3,
		options: 
		[
			{
				optionName: "Option1", 
				extraTime: 1,
				bonusScore: 1
			}
		]
		
	}
]
var currentEvents = [];

//sample person
function Student(group, ecoClass, major, tuitionScore, athleticScore, researchScore, eventScore, medicalScore)
{
	this.group = group;
	this.ecoClass = ecoClass;
	this.major = major;
	this.athleticScore = athleticScore + candidate.athleticVar;
	this.researchScore = researchScore + candidate.researchVar;
	this.tuitionScore = tuitionScore + candidate.tuitionVar;
	this.eventScore = eventScore + candidate.eventsVar;
	this.medicalScore = medicalScore + candidate.medicalVar;
};

var candidate;
var opponent;
var turnCounter;
var playerScore;
var population;
var sample;
var startHours; 
var remainingHours;

function gameCycleStart(f)
{
	population = 1000;
	sample = [];
	startHours = 336; 
	remainingHours = startHours;
	turnCounter = 1
	playerScore=0;
	candidate =
	{
		focus: "",
		focusnum: 0,
		tuitionVar: 0,
		athleticVar: 0,
		researchVar: 0,
		eventsVar: 0,
		medicalVar: 0,
		winChance: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	};
	
	opponent =
	{
		focus: "",
		focusnum: 0,
		tuitionVar: 0,
		athleticVar: 0,
		researchVar: 0,
		eventsVar: 0,
		medicalVar: 0,
		winChance: 0,
		lastMove: "None"
	};
	
	candidate.focus = positions[f];
	candidate.focusnum = f;
	
	while(opponent.focus != "")
	{
		var oppFocus = Math.random(0,4);
			if(oppFocus != f)
			{
				opponent.focus = positions[f];
				opponent.focusnum = f;
			}
	}
	
	userAction();
};

function userAction()
{
	//Clear previous screen
	var gameOutput = document.getElementById("mainOutput");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("event");
	gameOutput.innerHTML = "";
	prevChoices.innerHTML = "";
	prevEvent.innerHTML = "";
	
	
	//Build User Action Area buttons
	document.getElementById("choices").innerHTML += "<button type='button' onclick='reportViewer()' >View Result Reports</button>"
	document.getElementById("choices").innerHTML += "<button type='button'> Poll for My Influence </button>"
	document.getElementById("mainOutput").innerHTML += "<p> Opponent\'s Last Move:" + opponent.lastMove + "</p>"
	document.getElementById("choices").innerHTML += "<button type='button'>Poll For Opponent\'s Influence </button>"
	
	//Adds events to button list randomly from those available Prevents Duplicates	
	for(var i = 0;i<2;i++)
	{
		currentEvents = []
		var addEvent = true;
		var random = Math.floor(Math.random() * 3);
		var currentEvent = events[random];
		console.log(currentEvent);
		for(var j = 0;j<currentEvents.length;j++)
		{
			if(currentEvent.name == currentEvents[j].name)
			{
				addEvent = false;
			}
			
		}
		
		if(addEvent)
		{
			var actionCall = currentEvent ;
			currentEvents.push(currentEvent);
			var eventDescription =currentEvent.name + " - " + currentEvent.timeRequired;
			document.getElementById("choices").innerHTML += "<button onclick='action( "+ currentEvent.actionChoice+" )'>" + eventDescription + " hours </button>"
		}
		else
		{
			i--;
		}
	}
	
	//Show changes to screen
	document.getElementById("choices").style.display = "block";
};

function action(choice)
{
	chosenEvent = events[choice];
	//Clear previous screen
	document.getElementById("choices").style.display = "none";
	
	if(chosenEvent.type=="mini")
	{
		//Call the function of the minigame from the DB
	}
	else if(chosenEvent.type=="smallEvent")
	{
		var eventHours = chosenEvent.timeRequired;
		var eventDisplay = document.createElement("p");
		var paratext = document.createTextNode(chosenEvent.desc);
		eventDisplay.appendChild(paratext);
		document.getElementById("event").appendChild(eventDisplay);
		
		for(var i =0; i<chosenEvent.options.length; i++)
		{
			document.getElementById("event").innerHTML += "<p>" + chosenEvent.options[i].optionName + ": </p>";
			document.getElementById("event").innerHTML += "<input type='checkbox' id = " + chosenEvent.options[i].optionName+" >"
		}
		document.getElementById("event").innerHTML += "<br> <button type='button' onclick='submitAction(" + choice + "," + eventHours + ")' > Perform Event </button>"
	}
	else if(chosenEvent.type=="largeEvent")
	{
			
	}
	

	//Show changes to screen
	document.getElementById("event").style.display = "block";
};

function submitAction(choice, eventHours)
{
	chosenEvent = events[choice];
	for(var j =0; j<chosenEvent.options.length-1; j++)
	{
		if(document.getElementById(chosenEvent.options[j].optionName).checked == true)
		{
			eventHours+= chosenEvent.options[j].extraTime;
		}
	}
	remainingHours-= eventHours;
	playerScore++;
	if(remainingHours<4)
	{
		gameCycleEnd(0);
	}
	else
	{
		userAction();
	}
};

function reportViewer()
{
	
};

function gameCycleEnd()
{
	var gameOutput = document.getElementById("mainOutput");
	
	while(gameOutput.firstChild){
		gameOutput.removeChild(gameOutput.firstChild);
	}
	
	document.getElementById("next").style.display = "none";
	document.getElementById("choices").style.display = "none";
	var para4 = document.createElement("p");
	//Displays the results of the election - To be update once win state is calculable
	var text = "You Win/Lose";
	var para4text = document.createTextNode(text);
	para4.appendChild(para4text);
	document.getElementById("mainOutput").appendChild(para4);
}