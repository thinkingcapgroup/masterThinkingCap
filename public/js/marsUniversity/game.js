
var saveState;
let mapBackground;
let myTemplate;

let topBarView;
let splashScreenView;

let loadProgress = 0;

let tutorialPages = [];
let headSheet;
let bodySheet;

$(document).ready(function(){
  startGame();
})

//starts the game
function startGame()
{
    globals.playerCandidate= new CandidateCreate("ph");
    globals.opponentCandidate= new CandidateCreate("Karma");
    fakeCandidateYou = new CandidateCreate('Candidate1');
    fakeCandidateOther = new CandidateCreate('Candidate2');
    fakeCandidateYou.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
    fakeCandidateOther.fame = [1,1,1,1,1,1,1,1];
    fakeCandidateYou.issueScore = [1.5,0.5,1.5,0.5];
    fakeCandidateOther.issueScore = [1,1,1,1];
    globals.spriteHead.src = "../img/spritehead.png";
    globals.heads.src="../img/spritehead.png";
    globals.thinBody.src="../img/thinSpritesheet.png";
    globals.medBody.src="../img/medSpritesheet.png";
    globals.lgBody.src="../img/plusSpritesheet.png";
    globals.chairBody.src="../img/chairSpritesheet.png";
    globals.imgArrayBody = [globals.thinBody, globals.medBody, globals.lgBody, globals.chairBody];
    globals.fakeCandidateHolder.push(fakeCandidateYou);
    globals.fakeCandidateHolder.push(fakeCandidateOther);
	//whatever other things we have to do when initiaKarmaing the game here
	var date = Date.now();

    mapBackground = new Image();
    mapBackground.src = '../../img/map/mapMU600pxW.png';
    
	//Gets the questions and events from the Json
	var Json;
	var oReq = new XMLHttpRequest();
	oReq.onload = function (e)
	{
		Json = JSON.parse(this.responseText);
		globals.events = Json.events;
		globals.questions = Json.questions;
	};
	oReq.open("get", "json/data.json", true);
	oReq.send();
    
    preload(globals.events);
    //preloadUI();  
  
    createAreas();
    createTutorialPages();
    
    loadViews(50);
    preloadImages(54);
}

const views = {
  topBar: "",
  splashScreen: "",
  practice: "",
  help: "",
  tutorial: "",
  trendMenu:"",
  statement:"",
  characterSelect: ""
};
const images = {
  Map: '../../img/map/mapMU600pxW.png',
  CommonsIcon: '../../img/map/icons/CommonsIcon.png',
  GymIcon: '../../img/map/icons/GymIcon.png',
  LabsIcon: '../../img/map/icons/LabsIcon.png',
  LibraryIcon: '../../img/map/icons/LibraryIcon.png',
  QuadIcon: '../../img/map/icons/QuadIcon.png'
};

function preloadImages(totalLoadPercent){
  const imageNames = Object.keys(images);
  let loadPercent = totalLoadPercent / imageNames.length;
  for(let i = 0; i < imageNames.length; i++){
    let image = new Image();
    image.onload = function(){
      
      images[imageNames[i]] = image;
      updateLoadBar(loadPercent);
    }
    image.src = images[imageNames[i]];
  }
}

function loadViews(totalLoadPercent){

  
  const viewNames = Object.keys(views);
  let loadPercent = totalLoadPercent / viewNames.length;
  
  for(let i = 0; i < viewNames.length; i++){
    let viewName = viewNames[i];
    
    //Load in each view template
    $.get('/views/'+viewName+'.handlebars', function(data) {
      views[viewName] = Handlebars.compile(data);
      updateLoadBar(loadPercent);
      }, 'html');
  }
  
  Handlebars.registerHelper('ifEquals', function(value1, value2, options) {
    if(value1 === value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
}

function testP(){
  updateLoadBar(10);
}

let loadComplete = false;

function updateLoadBar(amount){
  loadProgress += amount;
  
  if(loadProgress >= 100 && !loadComplete){
    loadComplete = true;
    setTimeout(function(){
      document.getElementById("centerDisplay").innerHTML = views["splashScreen"]({});
      document.getElementById("loadContainer").style.display = 'none';
    }, 1000)

  }
  
  if(document.getElementById("loadBar")){
    document.getElementById("loadBar").value = loadProgress;
  }
}

function TutorialPage(title, content, image){
  this.title = title;
  this.content = content;
  this.image = image;
  this.previous = "Previous";
  this.next = "Next";
}

function createTutorialPages(){
  //Page 1: How To Play
  let title = "How To Play";
  let content = "<p>Hi, my name is Gui’De. I will help you find your way around Mars University. You’re a new student, and we need your help now. It’s time for the student president election and all the candidates won't do a good job. You should run for president of the Student Council!</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Areas
  title = "Areas";
  content = "<p>Lets Take a Tour of the school! There are five main places on the Mars U Campus. Each area attracts different people to them.</p>";
  let image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Areas
  title = "Areas - Bias";
  content = "<p>Here is where everybody can be found! <br> Commons: Socialites and Arts Majors <br> Library: Readers and Law Majors<br> Gym: Athletes and Business Majors <br> Labs: Gamers and Technology Majors</p>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates";
  content = "<p>Like in any election you'll have some comptetition. There are five other people running for prresisdent at Mars U.</p>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates - Issue Candidates";
  content = "<p>There are four candidates who don't do much campaigning. We call them the issue candidates. They're pretty well know and liked around campus so they think they don't need to campaign. Here are the Candidates in there issues. <br>Simon: Improve Medical Services <br> Zrapp: Increase the Budget <br> Boof: Lower Tuition <br> C1AMP: More School Functions</p>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates - Karma";
  content = "<p>The final candidate also transferred in recently. Karma the Chameleon is a charismatic, but untrustworthy candidate. People like her, but they have noticed that she seems to copy the statements of other candidates.</p>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Statements and Functions
  title = "Statements and Functions";
  content = "<p>You can win by doing three things: <br>-Statements<br>-Polling<br>-Student Functions <br> You have 12 hours in a day and everything you do takes time.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Statements
  title = "Statements";
  content = "<p>Statements are where you focus on the issues at school. Statements can change the way people feel about the issues. They also tell the population how you feel about the issues.</p>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Statements
  title = "Statements Continued";
  content = "<p>People are more likely to vote for you if they agree with you on the issues. Be sure to stick to one stance on each issue, because people won't like it if they can't trust you. Statements take an hour to prepare and perform.</p>";
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Issues
  title = "Issues";
  image = '../img/issues.png';
  tutorialPages.push(new TutorialPage(title, "", image));

  //Student Functions
  title = "Student Functions";
  content = "<p>Student Functions are how you get to know the population. Becoming more famous among groups to help get you elected.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Student Functions
  title = "Student Functions";
  content = "<p>Functions take a couple hours to set up and you can add an option to that if you like, but it will take an extra hour. Functions can't be held in the quad according to the Univerity Guidelines.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Population - Majors
  title = "Population - Majors";
  image = '../img/majors.png';
  tutorialPages.push(new TutorialPage(title, "", image));
  
  //Population - Social Groups
  title = "Population - Social Groups";
  image = '../img/interests.png';
  tutorialPages.push(new TutorialPage(title, "", image));
  
  //Polling
  title = "Polling";
  content = "<p>With polls you can see how the populations around the school feel about the candidates, and issues. You take polls in different areas which will have different biases. Polls take time to conduct, but the current student government will conduct one for you at the end of each day. These will help you see your effect on the population.</p>";
  image = '../img/menu/takeapollicon.png';
  tutorialPages.push(new TutorialPage(title, content, image));
		
  //Polling Results
  title = "Polling Results";
  content = "<p>After you  take a poll you are given the results from a sample of students. By looking at these results you can determine what moves you should make next. Poll Results can be viewed in 3 ways: Bar Graphs, Pie Graphs and a Table.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Results
  title = "Polling Results - Graphs";
  content = "<p> The Bar and Pie Graphs are for looking at more general data. Each Graph is attributed to a question. There you can see how many students answered each result in a question.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Results
  title = "Polling Results - Table";
  content = "<p> The table is for when you want specific data. In the table you can see how each person who took the sample responded to all the questions. You can even filter by majors, or social groups. So if you only want results from athletes then you can just view those.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Reports
  title = "Old Polling Reports";
  content = "<p>Poll Results are saved for you after you take them so you can go back and view them at the poll menu whenever you like.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Trend Reports
  title = "Trend Reports"
  content = "<p>If you ask the same question more than once, it will appear on the trend report. A place where you can see the summary of all the graphs for that question. This is great for looking quickly at how public opinion has changed. </p>";
  image = '../img/menu/trendreport.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Practice Area
  title = "Practice Area";
  content = "<p>And that’s it. I said polls were important, so I've created a practice polling area where you can create polls and look at polling results. Try it out, but remember, the data is not real and does not represent the actual students or candidates. You can start your election at any time, and you can return here or go to one of the help pages I've created when you have questions.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Set previous and nexts
  for(let i = 0; i < tutorialPages.length; i++){
    if(i > 0){
      tutorialPages[i].previous = tutorialPages[i-1].title;
    }
    if(i < tutorialPages.length - 1){
      tutorialPages[i].next = tutorialPages[i+1].title;
    }
  }
}


const POLL_STATES = {
    TUTORIAL: 1,
    PRACTICE_AREA: 2,
    IN_GAME_PRACTICE: 3,
    END_OF_DAY: 0,
    IN_GAME: 5,
    FIRST: 4
}


function preload(actions) {
	for (i = 1; i < actions.length; i++) {
		globals.images[i] = new Image();
		globals.images[i].src = actions[i].path;
	}
}

const areaChoices = {};

function MapArea(name, id, labelX, labelY, coordinates, collisionRects){
    this.name = name;
    this.labelX = labelX;
    this.labelY = labelY;
    this.id = id;
    this.coordinates = coordinates;
    this.collisionRects = collisionRects;
}

function Rectangle(x1, x2, y1, y2){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
}

function createAreas(){    
    
    //Create Gym Object
    let coords = [
        [360, 15],
        [585, 15],
        [585, 235],
        [485, 235],
        [485, 120],
        [360, 120]
    ];
    
    let rects = [new Rectangle(360, 585, 15, 120), new Rectangle(480, 590, 115, 235)];
    areaChoices["Gym"] = new MapArea("Gym", 2, 475, 50, coords, rects);
    
    //Create Labs
    coords = [
        [148, 15],
        [255, 15],
        [255, 135],
        [226, 135],
        [226, 165],
        [180, 165],
        [180, 135],
        [148, 135]
    ];
    rects = [new Rectangle(145, 255, 15, 135), new Rectangle(180, 230, 135, 165)];
    areaChoices["Labs"] = new MapArea("Labs", 3, 145, 30, coords, rects);
    
    //Create Commons
    coords = [
        [90, 275],
        [207, 275],
        [207, 397],
        [90, 397]
    ];
    
    rects = [new Rectangle(90, 205, 275, 395)];
    areaChoices["Commons"] = new MapArea("Commons", 1, 90, 285, coords, rects);
    
    //Create Library
    coords = [
        [400, 275],
        [588, 275],
        [588, 399],
        [400, 399]
    ];
    
    rects = [new Rectangle(400, 590, 255, 400)];
    areaChoices["Library"] = new MapArea("Library", 4, 435, 270, coords, rects);
    
    //Create Quad
    coords = [
        [135, 190],
        [305, 190],
        [305, 246],
        [135, 246]
    ];
    
    rects = [new Rectangle(135, 300, 190, 250)];
    areaChoices["Quad"] = new MapArea("Quad", -1, 160, 160, coords, rects);
}

function isPointInRect(pointX, pointY, rect){
    return ((pointX >= rect.x1 && pointX <= rect.x2) && (pointY >= rect.y1 && pointY <= rect.y2));
}

function isPointInArea(pointX, pointY, mapArea){
    
    //If one of the area rectangles contains the point, return true
    for(let i = 0; i < mapArea.collisionRects.length; i++){
        if(isPointInRect(pointX, pointY, mapArea.collisionRects[i])){
            return true;
        }
    }
    return false;
}

function drawAreaPath(mapArea){
    
    globals.ctx.beginPath();
    globals.ctx.moveTo(mapArea.coordinates[0][0], mapArea.coordinates[0][1]);
    for(let i = 1; i < mapArea.coordinates.length; i++){
        globals.ctx.lineTo(mapArea.coordinates[i][0], mapArea.coordinates[i][1]);
    }
    globals.ctx.closePath();
}

function updateTopBar(currentScreen){
  
    var dayCycleIndex = (globals.totalDays + 1) - globals.days;
    var context = { "totalDays" : globals.totalDays, "dayCycle" : dayCycleIndex, "remainingHours":globals.remainingHoursDay };
    var html = views["topBar"](context);
  
    //$("#templateTest").append(html);
    document.getElementById("playerInfo").innerHTML = html;
  
    //Putting onclick event at the bottom because it won't load otherwise
    document.getElementById("helpIcon").onclick = function(){
      //console.log("check help");
      helpScreen(currentScreen);
      
    }
    
    document.getElementById('topBar').style.display = "inline-flex";
}

/*GAME INTRO FUNCTIONS8*/
function splashScreen()
{
    //Shows the title screen
	clearScreen();
	document.getElementById("centerDisplay").innerHTML = views["splashScreen"]({});
}

function startAnimatic()
{
	globals.firstPoll = true;
	globals.firstState = true;
	
    //Shows the animatic
	document.getElementById("centerDisplay").innerHTML = "<p>Welcome to Mars University! <br></p> ";
    document.getElementById("centerDisplay").innerHTML += "<center><video id = 'animatic' width='880' height='500' preload='auto' autoplay controls><source src='media/video/MascotAnimaticNEW.mov' type='video/mp4' ></video><br><button onclick = 'startCharacterSelect()'>Skip</button><center>";
    //document.getElementById("centerDisplay").innerHTML += "</br> <a onclick = 'startCharacterSelect()' class = 'btn double remove'>Continue After Animatic Finish</a>";
    
    //Starts the character select after the animatic finishes
    document.getElementById('animatic').addEventListener('ended',myHandler,false);

    function myHandler(e) {
        startCharacterSelect();
    }

  
}

function startPractice()
{
    // Shows the practice screen menu
	clearScreen();
	globals.practice = true;
	document.getElementById("centerDisplay").innerHTML = views["practice"]({}); 
	document.getElementById("eventInfo").style.height = "10px";

}

function helpScreen(previousScreen)
{
	globals.practice = true;
    //Shows the Help screen 
	clearScreen();
  
    //Show the top bar
    document.getElementById('topBar').style.display = "inline-flex";
  
	globals.section = 1;
    
    document.getElementById("centerDisplay").innerHTML = views["help"]({});
    document.getElementById("helpBack").onclick = previousScreen;
    
}

function backToHelp(){
  document.getElementById('mapIcons').style.display = 'none';
  document.getElementById('helpfulIcons').style.display = 'none';
  document.getElementById('quickReference').style.display = 'none';
  document.getElementById('showCandidates').style.display = 'none';
  document.getElementById('backToHelp').style.display = 'none';
  
  document.getElementById('mainHelp').style.display = 'block';
}

function displayHelpPage(elementId){
  document.getElementById(elementId).style.display = 'block';
  document.getElementById('backToHelp').style.display = 'block';
  
  document.getElementById('mainHelp').style.display = 'none';
}

function pollMenu()
{
    //Shows the Poll Menu
    clearScreen();
    updateTopBar(pollMenu);
    hourChecker();
  
    if(globals.remainingHoursDay >=3)
    {
        document.getElementById("centerDisplay").innerHTML += "<h2> Poll a Sample of the Population</h2> <button type='button' onclick='drawPoll("+POLL_STATES.IN_GAME+", false, false)'> Take A Poll </button><br><br>";
        if(globals.pastPollResults.length > 0)
            document.getElementById("centerDisplay").innerHTML += "<h2> Previous Poll Results</h2>";
    }
    else
    {
        document.getElementById("centerDisplay").innerHTML += "<h2> Poll</h2> <button type='button' > Cannot Take a Poll </button>";
        if(globals.pastPollResults.length > 0)
            document.getElementById("centerDisplay").innerHTML += "<h2> Previous Poll Results</h2>";
    }
    
    //Adds buttons for each poll that has been taken already
	for(var i=0; i<globals.pastPollResults.length;i++)
	{
		globals.num = i+1;
		document.getElementById("centerDisplay").innerHTML += "<button type='button' onclick='reportViewer("+i+")' >View Poll "+ globals.num +" Result </button>";
    }
     document.getElementById("back").innerHTML += "<br><br><button onclick= 'userAction()'>Back to Game Map</button>";
}
function trendReportMenu()
{
    //Sets up the trend report menu
	clearScreen();
    updateTopBar(trendReportMenu);
    hourChecker();
    
    document.getElementById("centerDisplay").innerHTML = views["trendMenu"]({"candidates": globals.candidates});
    
	var currentTrendReports = [];
	//document.getElementById("playerInfo").style.display = "none";
	/*document.getElementById("centerDisplay").innerHTML = "<div id= 'reportButtons' > <h1> Trend Reports</h1><br><div><h2> General</h2><button onclick= 'trendReporter(`issFav`)' class = 'trendButton' id = 'issFav' disabled>Favored Issue Report</button><button onclick= 'trendReporter(`issOpp`)' class = 'trendButton' id = 'issOpp' disabled>Opposed Issue Report</button><button onclick= 'trendReporter(`candFav`)' class = 'trendButton' id = 'candFav' disabled>Favored Candidate Report</button><button onclick= 'trendReporter(`candOpp`)' class = 'trendButton' id = 'candOpp' disabled>Opposed Candidate Report</button></div><br><div><h2> Support For Issues</h2><button onclick= 'trendReporter(`issuetuition`)' class = 'trendButton' id = 'issuetuition' disabled>Lowering Tuition Report</button><button onclick= 'trendReporter(`issuebudget`)' class = 'trendButton' id = 'issuebudget' disabled>Increse Budget Report</button><button onclick= 'trendReporter(`issuefunctions`)' class = 'trendButton' id = 'issuefunctions' disabled>More School Functions Report</button><button onclick= 'trendReporter(`issuemedical`)' class = 'trendButton' id = 'issuemedical'  disabled>Improve Medical Services</button></div><br><div id = 'candReportsFame'><h2>Candidate Stats - Fame</h2></div><br><div id = 'candReportsTrust'><h2>Candidate Stats - Trust</h2></div>"
    document.getElementById("candReportsFame").innerHTML += "<button onclick= 'trendReporter(`fame`)' class = 'trendButton' id = 'fame' disabled>Fame - " + globals.candidates[0].name +"</button>"
    
    //Disables the buttons that cooresponds to polls that havent been taken yet.
    for(var k = 1;k<globals.candidates.length;k++)
	{
        var method = "candFame" + globals.candidates[k].name;
		document.getElementById("candReportsFame").innerHTML += "<button onclick= 'trendReporter(`"+method+"`)' class = 'trendButton' id = '"+method+"' disabled>Fame - " + globals.candidates[k].name +"</button>";
	}
    document.getElementById("candReportsTrust").innerHTML += "<button onclick= 'trendReporter(`playTrust`)' class = 'trendButton' id = 'playTrust' disabled>Trust - " + globals.candidates[0].name +"</button>"
	for(var k = 1;k<globals.candidates.length;k++)
	{
        var method = "candTrust" + globals.candidates[k].name;
        document.getElementById("candReportsTrust").innerHTML += "<button onclick= 'trendReporter(`"+method+"`)' class = 'trendButton' id = '"+method+"' disabled>Trust - " + globals.candidates[k].name +"</button>";
	}*/


     document.getElementById("centerDisplay").innerHTML += "</div><br> <div id = 'trendArea' style = 'display:none'> <svg id='visualisation' width='800' height='450'><path id='segments-line' /><path id='gap-line' /><text font-family='sans-serif' font-size='20px'>Blah</text></svg> </div>";
      for(var x =0; x < globals.pastPollChoices.length; x++){
      	for(var y = 0; y < globals.pastPollChoices[x].length; y++){
      		if(currentTrendReports.includes(globals.pastPollChoices[x][y])){

      		}
      		else{
      			currentTrendReports.push(globals.pastPollChoices[x][y])
      		}
      	}
      }
    var thing;
    var buttonHolder = document.getElementsByClassName('trendButton')

    for(var x = 0; x < buttonHolder.length; x++){
    	var idName = buttonHolder[x].getAttribute('id');   
    
    	for(var y =0; y < currentTrendReports.length; y++){
    	
    		if(currentTrendReports[y] == idName){    	
    			document.getElementById(idName).disabled = false;
    		}
    	}
    }
   	 document.getElementById("centerDisplay").innerHTML += "<br>"
     document.getElementById("centerDisplay").innerHTML += "<button id ='buttonViewer' style = 'display:none'>Choose Another Trend Report</button>";
     document.getElementById("back").innerHTML += "<button onclick= 'userAction()'>Back to Game Map</button>";
}

function openGlossary()
{
    //Shows the glossary
	clearScreen();
	document.getElementById("topBar").style.display = "block";
  
	document.getElementById("centerDisplay").innerHTML = "<h1> Glossary</h1> <hr> <ul style='list-style-type:none'><li>Data: Specific Information about a group of people or objects.</li> <li>Population: The Data for ALL people or objects. </li> <li>Sample: The Data that is measured, counted, or designated as a category for SELECTED people or objects.</li>  </ul> <button onclick= 'userAction()'>Return to Game Map</button>"
  
}



function startCharacterSelect(){
	var prevHours = document.getElementById("playerInfo");
	prevHours.innerHTML = "";
 	getSession(globals.gameOver);
	resetGame();
    
    document.getElementById("centerDisplay").innerHTML = views["characterSelect"]({});
  

	globals.c=document.getElementById("myCanvas");
	//creates a sprite for the headsheets
	headSheet = new Sprite({context: globals.c.getContext("2d"), width: 155, height: 171, image: globals.heads});
	bodySheet = new Sprite({context: globals.c.getContext("2d"), width: 164, height: 343, image: globals.thinBody});

	//sets up all the buttons for changing the canvas
	/*document.getElementById("headbutton").addEventListener("click", function(){
			headChange(headSheet)
			drawOnCanvas(headSheet, bodySheet);
            
	});
	document.getElementById("racebutton").addEventListener("click", function(){
			raceChange(headSheet);
			drawOnCanvas(headSheet, bodySheet);
	});
	document.getElementById("clothingbutton").addEventListener("click", function(){
			clothingChange(bodySheet);
			drawOnCanvas(headSheet, bodySheet);
	});
	document.getElementById("bodybutton").addEventListener("click", function(){
			bodyChange(headSheet, bodySheet);
	});*/

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);
}

function drawOnCanvas(headsheet,bodysheet){
	//clear the canvas
	//globals.c = document.getElementById("myCanvas");
	//globals.ctx = globals.c.getContext("2d")
    
  
    let ctx = bodysheet.context;
    let canvas = ctx.canvas;
	//clears everything
	//globals.ctx.clearRect(0,0,globals.c.width,globals.c.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
	//draw the body
	drawBody(bodysheet);
	//draws the head
	drawHeads(headsheet,bodysheet)
};

//draws the head
function drawHeads(heads,body){
	//fixes the head coordinates
	var x = fixHeadCord(heads,body);
	heads.render(x[0],x[1]);
}

function drawBody(body){
	body.renderBody(150,200);
}

function fixHeadCord(heads, body){

	//head coords
	var xCord = 156;
	var yCord = 40;
	//array that holds all th
	var coordChange = [

	[
		[
		//thin body NB
			[
				[[3,1]],
				[[2,-1]],
				[[-7,0]],
				[[-7,0]],
				[[2,2]],
				[[2,2]]
			],
			[
				[[3,-1]],
				[[5,-2]],
				[[-2,-2]],
				[[-2,-2]],
				[[1,0]],
				[[2,1]]
			],
			[
				[[5,-1]],
				[[7,-1]],
				[[-8,0]],
				[[-8,0]],
				[[2,-2]],
				[[2,-2]]
			]
		],
		[//thin body female
			[
				[[3,1]],
				[[2,-1]],
				[[-7,0]],
				[[-7,0]],
				[[2,2]],
				[[2,2]]
			],
			[
				[[3,-1]],
				[[5,-2]],
				[[-4,-3]],
				[[-4,-3]],
				[[-1,0]],
				[[-1,1]]
			],
			[
				[[4,-1]],
				[[5,-1]],
				[[-10,0]],
				[[-8,0]],
				[[0,-2]],
				[[0,-2]]
			]
		],//thin body male
		[
			[
				[[10,1]],
				[[10,-1]],
				[[-1,0]],
				[[-1,0]],
				[[8,2]],
				[[9,2]]
			],
			[
				[[8,-1]],
				[[10,-2]],
				[[4,-2]],
				[[4,-2]],
				[[5,0]],
				[[7,1]]
			],
			[
				[[10,-1]],
				[[12,-2]],
				[[-2,-2]],
				[[0,-2]],
				[[8,-1]],
				[[8,-1]]
			]
		]
	],
	[
		[
			[
				[[17,0]],
				[[15,0]],
				[[10,0]],
				[[10,0]],
				[[17,2]],
				[[17,2]]
			],
			[
				[[17,0]],
				[[17,-1]],
				[[10,-2]],
				[[10,0]],
				[[15,2]],
				[[16,2]]
			],
			[
				[[18,0]],
				[[18,0]],
				[[7,0]],
				[[10,0]],
				[[15,-1]],
				[[15,-1]]
			]
		],
		[
			[
				[[17,0]],
				[[15,0]],
				[[8,0]],
				[[8,0]],
				[[15,2]],
				[[15,2]]
			],
			[
				[[17,0]],
				[[17,-2]],
				[[10,-3]],
				[[10,-2]],
				[[13,0]],
				[[14,0]]
			],
			[
				[[18,-2]],
				[[18,-2]],
				[[3,0]],
				[[8,0]],
				[[12,-3]],
				[[12,-3]]
			]
		],
		[
			[
				[[19,0]],
				[[17,0]],
				[[8,0]],
				[[8,0]],
				[[17,2]],
				[[17,2]]
			],
			[
				[[18,0]],
				[[18,-4]],
				[[12,-4]],
				[[10,-3]],
				[[13,0]],
				[[16,0]]
			],
			[
				[[19,-2]],
				[[19,-2]],
				[[4,-1]],
				[[9,-1]],
				[[14,-3]],
				[[14,-3]]
			]
		]
	],
	[
		[
			[
				[[46,3]],
				[[44,3]],
				[[38,3]],
				[[38,3]],
				[[44,5]],
				[[44,5]]
			],
			[
				[[46,3]],
				[[46,1]],
				[[38,1]],
				[[38,3]],
				[[44,3]],
				[[45,4]]
			],
			[
				[[46,3]],
				[[44,3]],
				[[35,3]],
				[[38,3]],
				[[44,2]],
				[[44,2]]
			]
		],
		[
			[
				[[46,5]],
				[[44,4]],
				[[36,3]],
				[[38,5]],
				[[44,5]],
				[[44,5]]
			],
			[
				[[46,3]],
				[[46,1]],
				[[38,1]],
				[[38,3]],
				[[44,4]],
				[[45,5]]
			],
			[
				[[46,3]],
				[[44,3]],
				[[32,3]],
				[[38,3]],
				[[44,2]],
				[[44,2]]
			]
		],
		[
			[
				[[52,0]],
				[[50,0]],
				[[43,0]],
				[[43,0]],
				[[50,3]],
				[[52,3]]
			],
			[
				[[52,0]],
				[[54,-3]],
				[[46,-1]],
				[[46,-1]],
				[[50,0]],
				[[52,0]]
			],
			[
				[[52,-2]],
				[[54,-3]],
				[[42,-1]],
				[[44,-1]],
				[[50,-2]],
				[[50,-2]]
			]
		]
	],
	[
		[
			[
				[[53,30]],
				[[53,30]],
				[[45,30]],
				[[45,30]],
				[[53,32]],
				[[53,32]]
			],
			[
				[[53,29]],
				[[54,27]],
				[[45,27]],
				[[45,29]],
				[[50,31]],
				[[53,31]]
			],
			[
				[[53,29]],
				[[54,27]],
				[[40,27]],
				[[45,29]],
				[[50,29]],
				[[50,29]]
			]
		],
		[
			[
				[[58,40]],
				[[55,40]],
				[[48,40]],
				[[48,40]],
				[[56,42]],
				[[56,42]]
			],
			[
				[[58,40]],
				[[58,40]],
				[[49,38]],
				[[49,38]],
				[[53,42]],
				[[53,42]]
			],
			[
				[[57,36]],
				[[58,36]],
				[[45,40]],
				[[50,41]],
				[[55,37]],
				[[55,37]],
			]
		],
		[
			[
				[[65,37]],
				[[64,37]],
				[[58,37]],
				[[58,37]],
				[[65,39]],
				[[65,39]],
			],
			[
				[[65,37]],
				[[65,35]],
				[[55,34]],
				[[57,34]],
				[[63,37]],
				[[63,39]],
			],
			[
				[[65,35]],
				[[67,35]],
				[[51,36]],
				[[55,35]],
				[[61,35]],
				[[61,36]],
			]
		]
	]

	];
	var txc = coordChange[body.bodyArrayHolder][body.frameIndexClothing][heads.frameIndexRace][heads.frameIndex][0];
	//the adjustments for that specific head/race/gender/bodytype
	xCord += txc[0];
	yCord += txc[1];

	var ret = [xCord, yCord];
	return ret;
}

//changes gender
function clothingChange(amount){
    bodySheet.updateClothing(amount);
    drawOnCanvas(headSheet,bodySheet);
  
    let shapeOptions = globals.bodyShapeArray;
    document.getElementById("clothingType").innerHTML = shapeOptions[bodySheet.frameIndexClothing];
}

//changes head
function headChange(amount){
	headSheet.update(amount);
    drawOnCanvas(headSheet,bodySheet);
    
    document.getElementById("headType").innerHTML = "Head "+(headSheet.frameIndex+1);
}

//changes race
function raceChange(amount){
	headSheet.raceUpdate(amount);
    drawOnCanvas(headSheet,bodySheet);
  
    let lifeformOptions = globals.lifeformArray;
    document.getElementById("raceType").innerHTML = lifeformOptions[headSheet.frameIndexRace];
}

//changes the body type
function bodyChange(amount){
  
	bodySheet.bodyArrayHolder+= amount;
	if(bodySheet.bodyArrayHolder > 3){
      bodySheet.bodyArrayHolder = 0;
	}
    else if(bodySheet.bodyArrayHolder < 0){
      bodySheet.bodyArrayHolder = 3;
    }
  
    let z = bodySheet.bodyArrayHolder;
	headSheet.bodyArrayHolder = z;

	bodySheet.image = globals.imgArrayBody[z];
	bodySheet.width = globals.imgArrayBodyWidth[z];
	bodySheet.height = globals.imgArrayBodyHeight[z];
    drawOnCanvas(headSheet,bodySheet);
  
    let bodyTypeOptions = globals.bodyTypeArray;
    document.getElementById("bodyType").innerHTML = bodyTypeOptions[bodySheet.bodyArrayHolder];
}

//sprite function
function Sprite(options){
	var that = {};
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.frameIndex = 0,
	that.frameIndexRace = 2,
	that.frameIndexClothing = 0,
	that.bodyArrayHolder = 0,
	that.isMale = 0,


	that.render = function (x,y) {

        // Draw the animation
        that.context.drawImage(
           that.image,
           that.width * that.frameIndex,
           that.height* that.frameIndexRace ,
           that.width,
           that.height,
           x,
           y,
           that.width,
           that.height);
    };

    that.renderBody = function (x,y) {

        // Draw the animation
        that.context.drawImage(
           that.image,
           (0 + (globals.imgArrayBodyWidth[that.bodyArrayHolder] * that.frameIndexClothing) + that.isMale),
           0,
           that.width,
           that.height,
           x,
           y,
           that.width + that.isMale,
           that.height);
    };

    that.update = function(amount){
    	that.frameIndex += amount;
    	if (that.frameIndex > 5){
    		that.frameIndex = 0;
    	}
        else if(that.frameIndex < 0){
          that.frameIndex = 5;
        }

    };

     that.updateClothing = function(amount){
    	that.frameIndexClothing += amount;
    	if (that.frameIndexClothing > 2){
    		that.frameIndexClothing = 0;
    	}
       else if(that.frameIndexClothing < 0){
         that.frameIndexClothing = 2;
       }

    };


    that.raceUpdate = function(amount){
    	that.frameIndexRace += amount;
    	if (that.frameIndexRace > 2){
    		that.frameIndexRace = 0;
    	}
        else if(that.frameIndexRace < 0){
          that.frameIndexRace = 2;
        }
        
    	that.height = globals.imgArrayHeadHeight[that.frameIndexRace];
    };

	return that;
}

//Creates the player candidate
function startOtherCandidates(){
	globals.playerCandidate.name = document.getElementById("charName").value;
	globals.playerCandidate.raceNum = headSheet.frameIndexRace;
	globals.playerCandidate.genderNum = bodySheet.frameIndexClothing;
	globals.playerCandidate.bodyTypeNum = bodySheet.bodyArrayHolder;
	globals.playerCandidate.headNum = headSheet.frameIndex;
	globals.playerCandidate.race = globals.lifeformArray[headSheet.frameIndexRace];
	globals.playerCandidate.gender = globals.bodyShapeArray[bodySheet.frameIndexClothing];
	globals.playerCandidate.bodyType = globals.bodyTypeArray[bodySheet.bodyArrayHolder];
  
    
    globals.playerImg = document.getElementById("myCanvas").toDataURL("image/png");
  
	document.getElementById("centerDisplay").innerHTML = "<h1>What's Happening</h1>"
	document.getElementById("centerDisplay").innerHTML += "<p>You are competing against Karma the Chameleon and 4 other candidates for the position of Student Council President. Karma is new student just like you, they call her the Chameleon, because she copies the people she is running against.... and also because, she is a Chameleon. The current student government will give you, a candidate, some information about the students at MarsU.</p>"
	document.getElementById("centerDisplay").innerHTML += "<p>Do you wish to start the tutorial?</p>"
	document.getElementById("centerDisplay").innerHTML += "<button onclick='tutorial("+false+")'>Yes</button><button onclick='chooseDiff()'>No</button>";

}

//Sets the variables for game length and opposing candidates
function actualSessionStart(isFromTut){

    
	var tutHolder = isFromTut
	clearScreen();
	globals.candidates = [];	
	globals.population = 1000;
	globals.sample = [];
	globals.days = 1; 
	globals.remainingHoursDay = 12; 
	
	//Decides the opponents focus which cannot be the same as the player
	globals.opponentCandidate.fame = [1,1,1,1,1,1,1,1];
	globals.opponentCandidate.consMod = 0;
	////console.log(oppFocus);
	chooseIssue(globals.opponentCandidate,[],1,false);
	globals.candidates.push(globals.opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new CandidateCreate("Boof");
	issueCand1.focus = globals.positions[0];
	issueCand1.focusnum = 0;
	chooseRank(issueCand1,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand1);
	var issueCand2 = new CandidateCreate("Zrap Bannigan");
	issueCand2.focus = globals.positions[1];
	issueCand2.focusnum = 1;
	chooseRank(issueCand2,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand2);
	var issueCand3 = new CandidateCreate("C1AMP");
	issueCand3.focus = globals.positions[2];
	issueCand3.focusnum = 2;
	chooseRank(issueCand3,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand3);
	var issueCand4 = new CandidateCreate("Simon");
	issueCand4.focus = globals.positions[3];
	issueCand4.focusnum = 3;
	chooseRank(issueCand4,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand4);	
  
    //Set the currentCandidateArrayHolder to the right data
    globals.currentCandidateArrayHolder = globals.candidates;
  
	//map(0,true,true);
    bufferZone();
}
function bufferZone()
{
    clearScreen();

    document.getElementById("centerDisplay").innerHTML += "<h1>First Poll</h1> <br><p>Ready to start your Campaign at Mars U? It's time to get that initial data from the Student Government. Let them know what questions you would like to know the answers to.</p>";
    document.getElementById("centerDisplay").innerHTML += "<button onclick='drawPoll("+POLL_STATES.FIRST+", true, false)'>Take Your First Poll</button>";
}
//takes the player into a poll with fake candidates to test out polling
function practicePoll()
{
	

	globals.candidates = [];
	
	globals.population = 1000;
	globals.sample = [];
	globals.startHours = 84; 
	globals.remainingHoursTotal = globals.startHours;
	globals.days = 1; 
	globals.remainingHoursDay = 12; 
	
	//Decides the opponents focus which cannot be the same as the player
	globals.opponentCandidate.fame = [1,1,1,1,1,1,1,1];
	globals.opponentCandidate.consMod = 0;
	////console.log(oppFocus);
	chooseIssue(globals.opponentCandidate,[],1,false);
	globals.candidates.push(globals.opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new CandidateCreate("Zrap Bannigan");
	var oppRank = Math.floor(Math.random()*4);
	issueCand1.focus = globals.positions[oppRank];
	issueCand1.focusnum = oppRank;
	chooseRank(issueCand1,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand1);

	
	drawPoll(POLL_STATES.PRACTICE_AREA, false, true);
}

//Sets up the buttons for the intital statement the player makes in the game.
function firstStatement()
{
    //console.log("first statement");
    
	globals.firstPoll = false;
	saveGameState();
	globals.first = false;
	clearScreen();

  
	document.getElementById("centerDisplay").innerHTML = "<h1>First Positive Statement</h1>"
	document.getElementById("centerDisplay").innerHTML += "<p>It's Time to Make Your First Statement to the Mars U Population! <br>Pick an Issue Below that You Would Like to Support!</p>"
	for (var x=0; x < globals.positions.length; x++){

	document.getElementById("centerDisplay").innerHTML += "<button onclick = 'gameCycleStart("+x+")'>"+ globals.positions[x]+"</button>"
	}
	if(globals.pastPollResults.length !=0)
	{
		document.getElementById("centerDisplay").innerHTML += "<p>Not Sure on What to Choose? Click Below!</p> <button type='button' onclick='firstReport()' >View The Results of the Poll You Just Took </button>";
	}
}

function firstReport()
{
	globals.first = true;
	reportViewer(0);
}
//Prompts the player to choose a difficulty setting for the game
function chooseDiff()
{
	clearScreen();

	document.getElementById("centerDisplay").innerHTML = "<h1>Choose Your Difficulty</h1><br>";
    document.getElementById("centerDisplay").innerHTML += "<button onclick = setDiff(9)> Easy</button>";
    document.getElementById("centerDisplay").innerHTML += "<p> In Easy Mode You Have 9 Days to Win the Election.</p>";
    document.getElementById("centerDisplay").innerHTML += "<button onclick = setDiff(7)> Normal</button>";
    document.getElementById("centerDisplay").innerHTML += "<p> In Normal Mode You Have 7 Days to Win the Election.</p>";
    document.getElementById("centerDisplay").innerHTML += "<button onclick = setDiff(5)> Hard</button>";
    document.getElementById("centerDisplay").innerHTML += "<p> In Hard Mode You Have 5 Days to Win the Election.</p>";
}

//Sets the number of days and time remaining according to the players difficulty choice.
function setDiff(days)
{
	globals.startHours = days*12; 
    globals.remainingHoursTotal = globals.startHours;
    globals.totalDays = days;
    globals.inGame = true;
    actualSessionStart(false);
}

/*GAME CYCLE FUNCTIONS8*/
function gameCycleStart(f)
{
    //console.log("gameCycleStart");
    
    
	globals.firstPoll = false;
	globals.firstState = false;
	globals.turnCounter = 1
	globals.playerCandidate.focus = globals.positions[f];
	globals.playerCandidate.focusnum = f;
    
    //Increases issue score based on the players choice for their initial statement
	switch(f)
	{
		case 0:
		globals.playerCandidate.issueScore[0]++;
		break;
		case 1:
		globals.playerCandidate.issueScore[1]++;
		break;
		case 2:
		globals.playerCandidate.issueScore[2]++;
		break;
		case 3:
		globals.playerCandidate.issueScore[3]++;
		break;
	}
	globals.candidates.splice(0,0,globals.playerCandidate);
	
    //Display Updated Top Bar
    //updateTopBar(this);
  
    //Hold onto correct candidates
    globals.currentCandidateArrayHolder = globals.candidates;
    
	userAction();
};

//Add events to the Location choice elements
function addLocationEvents(){
    globals.currentEvents = [];
    
    document.getElementById("CommonsChoice").innerHTML += "<h2>Commons</h2>";
    document.getElementById("LabsChoice").innerHTML += "<h2>Labs</h2>";
    document.getElementById("GymChoice").innerHTML += "<h2>Gym</h2>";
    document.getElementById("LibraryChoice").innerHTML += "<h2>Library</h2>";
    
	//Adds events to the cooresponding section based on their effect
	for(var i = 1;i<globals.events.length;i++)
	{
		globals.currentEvents.push(globals.events[i]);
		var eventDescription =globals.events[i].name + " - " + globals.events[i].timeRequired;
		var arrayPos = globals.events[i].id -1;
        
        //Add event to the location element that it is in
        var locationName = globals.events[i].loc + "Choice";
        document.getElementById(locationName).innerHTML += "<input type = 'radio' name = 'actionRadio' id = 'actionRadio"+i+"' value = " + arrayPos + ">" + eventDescription + " Hours<br>";
      
	}
    
    document.getElementById("eventInput").innerHTML = "<button id = 'eventSelect' onclick='action()'>Perform Action</button>";
}

//Creates the area in which users decide what to do
function userAction()
{
  
	if(hourChecker()){
    
    
      globals.practice = false;

      //Make sure users are using the correct candidate data
      //Extra fix for the fake data polling bug
      globals.candidates = globals.currentCandidateArrayHolder;


      //If the events aren't loaded in, add them
      if(!globals.currentEvents || !globals.currentEvents.length){
          //console.log("check");
          addLocationEvents();
      }


      //Clear previous screen
      clearScreen();

      if(!globals.back){
          saveGameState();
      }


      //Build Game Map buttons
      //If the hover isn't set, or if it's set to "Quad"
      if(globals.isCurrentAreaHover < 1){
        globals.isCurrentAreaHover = areaChoices["Commons"].id;
      }


      document.getElementById("map").innerHTML = "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
      globals.c=document.getElementById("myCanvas");
      globals.ctx = globals.c.getContext("2d");
      globals.ctx.fillStyle = '#FFFFFF'

      //Display Updated Top Bar
      updateTopBar(userAction);
      document.getElementById('topBar').style.display = "inline-flex";

      if(globals.remainingHoursDay == 1)
          document.getElementById("infoText").innerHTML += "   <br><span style = 'font-weight: bold'>   You Have Time To Make A Statment!</span>";
      //document.getElementById("iconBar").innerHTML += "<button  class='logEventEnd' onclick='gameCycleEnd()'> Skip to the End </button><br>";
      document.getElementById("centerDisplay").innerHTML += "<h3 class='lastMove'> Your Last Move: " + globals.candidates[1].lastMove + "</h3>";
      //document.getElementById("choices").innerHTML += "<br>";





      globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
      globals.c.onmousedown = doMousedownMain;
      globals.c.onmousemove = doMouseOver;


      drawMap(false);

      for(let key in areaChoices){
        //If the area is currently selected, display the radio buttons
        if(areaChoices[key].id == globals.isCurrentAreaHover){
          document.getElementById(areaChoices[key].name+"Choice").style.display = "block";
        }
        else{
          //There is no element for quad choices
          if(areaChoices[key].name != "Quad"){
            document.getElementById(areaChoices[key].name+"Choice").style.display = "none";
          }

      }
    }
    
    
    document.getElementById("map").style.display = "block";
    document.getElementById("eventInput").style.display = "block";
    
	//document.getElementById("actionRadio1").checked = true;

      //Show changes to screen
      document.getElementById("choices").style.display = "block";
    }
};

function action()
{
	//Clear previous screen
	var choice = $('input[name="actionRadio"]:checked').val();
	if(choice != undefined)
	{
		clearScreen();
		updateTopBar(action);
	
		var nextArea = document.getElementById("next");
		nextArea.innerHTML = "";
		chosenEvent = globals.events[choice];
		//console.log(chosenEvent);
		globals.back = false;
		
		//document.getElementById("choices").innerHTML += "<button type='button' onclick='userAction()' >View Poll "+ num +" Result </button>";
		if(globals.remainingHoursDay >= chosenEvent.timeRequired)
		{
			chosenEvent = globals.events[choice];
	
			if(chosenEvent.type=="smallEvent")
			{
				
				document.getElementById("eventImg").innerHTML += "<img src = '' id = 'eventbg' width = '600'   > </img>";
				document.getElementById("eventbg").src = chosenEvent.path;
              
              
				//Creates the screen for the event
				var eventHours = parseInt(chosenEvent.timeRequired);
				document.getElementById("eventInfo").innerHTML += "<h4>" + chosenEvent.text + " </h4>";
				
	
				if(chosenEvent.groupPos != [])
				{
					var effects = chosenEvent.groupPos.split(',');
					var posText =  "<h4> These Groups will be affected positively: ";
					for (var i =0; i< effects.length;i++)
					{
					switch(effects[i])
					{
						case "Arts":
							posText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
						break;
						case "Bus":
							posText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
						break;
						case "Law":
							posText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
						break;
						case "Tech":
							posText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
						break;
	
						case "Gam":
							posText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
						break;
						case "Soc":
							posText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
						break;
						case "Read":
							posText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
						break;
						case "Ath":
							posText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
						break;
					}
					if(i != effects.length-1)
					{
						posText += ", ";
					}
					else{
						posText += " ";
					}
				}
					document.getElementById("eventInfo").innerHTML += posText+ " </h4>";
				}
				if(chosenEvent.groupNeg != [])
				{
					var negEffects = chosenEvent.groupNeg.split(',');
					var negText =  "<h4> These Groups will be affected negatively: ";
					for (var i =0; i< negEffects.length;i++)
					{
					switch(negEffects[i])
					{
						case "Arts":
							negText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
						break;
						case "Bus":
							negText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
						break;
						case "Law":
							negText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
						break;
						case "Tech":
							negText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
						break;
	
						case "Gam":
							negText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
						break;
						case "Soc":
							negText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
						break;
						case "Read":
							negText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
						break;
						case "Ath":
							negText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
						break;
					}
					if(i != negEffects.length-1)
					{
						negText += ", ";
					}
					else{
						negText += " ";
					}
				}
					document.getElementById("eventInfo").innerHTML += negText+ " </h4>";
				}
				
				for(var i =0; i<chosenEvent.options.length; i++)
				{
					var totalText = "";
					if( (eventHours + parseInt(chosenEvent.options[i].extraTime)) <= globals.remainingHoursDay)
					{
						if(i == 0)
						{
							document.getElementById("eventInfo").innerHTML += "<br><span style = 'font-weight: bold' > Additional Options: <br></span>";
							document.getElementById("eventInfo").innerHTML += "<input type='radio' name = 'option' id = 'none' checked>None<br>";
	
						}
						var posText ="";
						var negText = "";
						if(chosenEvent.options[i].posEffects != [])
						{
							var effects = chosenEvent.options[i].posEffects.split(',');
							posText =  " -  Extra Positive Effects: ";
							for (var j =0; j< effects.length;j++)
							{
								switch(effects[j])
								{
									case "Arts":
										posText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
									break;
									case "Bus":
										posText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
									break;
									case "Law":
										posText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
									break;
									case "Tech":
										posText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
									break;
				
									case "Gam":
										posText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
									break;
									case "Soc":
										posText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
									break;
									case "Read":
										posText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
									break;
									case "Ath":
										posText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
									break;
								}
								if(j != effects.length-1)
								{
									posText += ", ";
								}
								else{
									posText += " ";
								}
							}
						}
						totalText += posText;
						if(chosenEvent.options[i].negEffects != [])
						{
							var negEffects = chosenEvent.options[i].negEffects.split(',');
							negText =  " -  Extra Negative Effects: ";
							for (var j =0; j< negEffects.length;j++)
							{
								switch(negEffects[j])
								{
									case "Arts":
										negText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
									break;
									case "Bus":
										negText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
									break;
									case "Law":
										negText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
									break;
									case "Tech":
										negText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
									break;
				
									case "Gam":
										negText += "Gamer Group <img width = '30' src = '../img/icons/gamericon.png'>";
									break;
									case "Soc":
										negText += "Socialite Group <img width = '30' src = '../img/icons/socialsquare.png'>";
									break;
									case "Read":
										negText += "Reader Group <img width = '30' src = '../img/icons/readericon.png'>";
									break;
									case "Ath":
										negText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
									break;
								}
								if(j != negEffects.length-1)
								{
									negText += ", ";
								}
								else{
									negText += " ";
								}
							}
						}
						totalText += negText;
						document.getElementById("eventInfo").innerHTML += "<input type='radio' name = 'option' id = " + chosenEvent.options[i].optionID + ">" + chosenEvent.options[i].optionName + " - 3 Hours Total" +totalText+"<br> ";
					}
				}
			}
		document.getElementById("eventInfo").innerHTML += "<br> <button type='button' class='logEvent' id='"+choice+"' onclick='submitAction(" + choice + "," + eventHours + ")' > Perform Event </button><br>";
		}
		else
		{
			document.getElementById("eventInfo").innerHTML += "<h4> You dont have the enough time left to do the selected action. \n Return to the Game Map to select another action or end the game.</h4>";
		}
		document.getElementById("back").innerHTML += "<br> <button type='button' onclick='backtoUA()' >Back to Game Map</button>";
  
		//Show changes to screen
		document.getElementById("eventInfo").style.display = "block";
    		document.getElementById("eventImg").style.display = "block";
		}
	else
	{
			document.getElementById("infoText").innerHTML = "<h4>You must select an event first!</h4>";
	}
};

//Subtracts from the remaining hours,
function submitAction(id, eventHours, Pos, Neg)
{

	//Subtracts hours from the remaining hours in the game
	chosenEvent = globals.events[id];
	var totalPosEffects = [];
	totalPosEffects = chosenEvent.groupPos.split(",");
	var totalNegEffects = [];
	totalNegEffects = chosenEvent.groupNeg.split(",");

	if(chosenEvent.options.length > 0)
	{
		var playGame = false;
		var radio = document.getElementsByName("option");
		var check;
		var loaderNum;
		for (i = 0; i < radio.length; i++) 
		{
				if(radio[i].checked == true)
					check = radio[i].id;
		}

		for(var j =0; j<chosenEvent.options.length; j++)
		{
			if( check == chosenEvent.options[j].optionID)
			{
				if(chosenEvent.options[j].type == "boost")
				{
					eventHours+= parseFloat(chosenEvent.options[j].extraTime);
					//Add Positive/Negative Effects to event based on JSOn
					var optionPosEffects = chosenEvent.options[j].posEffects.split(",");
					var optionNegEffects = chosenEvent.options[j].negEffects.split(",");
					for(var i =0;i<optionPosEffects.length;i++)
					{totalPosEffects.push(optionPosEffects[i]);}

					for(var k =0;k<optionNegEffects.length;k++)
					{totalNegEffects.push(optionNegEffects[k]);}
				}
				else if (chosenEvent.options[j].type == "game")
				{
					playGame = true;
					loaderNum =chosenEvent.options[j].loader;
				}
			}
		}
		
		if(playGame)
		{
			globals.remainingHoursTotal-= eventHours;
			globals.remainingHoursDay-= eventHours;
			scoreChanger(globals.candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
			minigamePlayer(parseInt(loaderNum));
		}
		else
			actionResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
	}
		else
			actionResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
}

function actionResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects)
{
	//console.log(globals.remainingHoursTotal)
	globals.remainingHoursTotal-= eventHours;
	globals.remainingHoursDay-= eventHours;

	globals.candidates[1].lastMove = chosenEvent.name;

	//Changes the player's score
	scoreChanger(globals.candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
	saveGameState();
	clearScreen();
    updateTopBar(userAction);
    
	document.getElementById("centerDisplay").innerHTML += "<h1 id= 'evRes'> You Positively Affected Your Fame With These Groups: ";
	var posText = ""; 
	for (var i =0; i< totalPosEffects.length;i++)
	{
		switch(totalPosEffects[i])
		{
		
			case "Arts":
				posText += "Arts Major <img width = '30' src = '../img/icons/artisticon.png'>";
			break;
		
			case "Bus":
				posText += "Business Major <img width = '30' src = '../img/icons/businessicon.png'>";
			break;
			case "Law":
				posText += "Law Major <img width = '30' src = '../img/icons/lawicon.png'>";
			break;
			case "Tech":
				posText += "Technology Major <img width = '30' src = '../img/icons/techicon.png'>";
			break;
		
			case "Soc":
				posText += "Socialite Group <img width = '30' src = '../img/icons/gamericon.png'>";
		
			break;
			case "Read":
				posText += "Reader Group <img width = '30' src = '../img/icons/socialsquare.png'>";
		
			break;
			case "Gam":
				posText += "Gamer Group <img width = '30' src = '../img/icons/readericon.png'>";
		
			break;
			case "Ath":
				posText += "Athlete Group <img width = '30' src = '../img/icons/sportssquare.png'>";
		
			break;
		}
		if(i != totalPosEffects.length-1)
		{
			posText += ", ";
		}
		else{
			posText += " ";
		}
	}
	document.getElementById("evRes").innerHTML += posText;	
	document.getElementById("evRes").innerHTML += "</h1>";
	document.getElementById("centerDisplay").innerHTML += "<img class='resolutionImg' width = '600' src = '../img/nicework.png'> </img>";
  
    document.getElementById("next").innerHTML += "<button onclick= 'userAction()'>Return to Game Map</button>";
};

//Ends the game
function gameCycleEnd()
{
	//Clear previous screen
	clearScreen();
    votePercentage(1000, -1);

	var winner;
	var winvotes = 0;
	globals.ranking = globals.candidates.slice();
	globals.ranking.sort(function(a, b){return b.votes-a.votes})
	document.getElementById("centerDisplay").innerHTML = "<h1> Rankings: </h1>";
	for(var i = 0; i<globals.ranking.length;i++)
	{
		document.getElementById("centerDisplay").innerHTML += "<h1>" + (i+1) + ". " + globals.ranking[i].name + " Votes: " + globals.ranking[i].votes + "</h1><br>";
	}
    globals.endReset = true; 
    globals.gameOver = true;
	document.getElementById("centerDisplay").innerHTML += "<h1> Winner: "+ globals.ranking[0].name +"</h1> <button onclick = 'startCharacterSelect()'> Play Again? </button>";
};



/*Special Action Pages*/
function tutorial (help)
{
	document.getElementById("centerDisplay").innerHTML ="";
    showTutorialPage(0, help);
}

function showTutorialPage(currentPage, help){
    let context = {"tutorialPages":tutorialPages, "currentPage":currentPage, "isHelp":help};
    document.getElementById("centerDisplay").innerHTML = views["tutorial"](context);
}

function nextSection(currentPage, help)
{
  if(currentPage < tutorialPages.length-1){
    showTutorialPage(currentPage+1,help);
  }
  else{
    if(!help){
      globals.remainingHoursDay = 12;
      globals.days = 1;
      drawPoll(POLL_STATES.TUTORIAL, false, true);
    }
    else{
      drawPoll(POLL_STATES.IN_GAME_PRACTICE, true, true);
    }
  }
	
}

function lastSection(currentPage, help)
{
  showTutorialPage(currentPage-1, help);
}

//ELaborates on a highlighted term when clicked
function explainTerm(term, help){
	document.getElementById("centerDisplay").innerHTML ="";
	document.getElementById("centerDisplay").innerHTML += "<h3>Term ID: "+term+"</h3><hr>";
	document.getElementById("centerDisplay").innerHTML += "<p>Term explination here....</p>"
	document.getElementById("centerDisplay").innerHTML += "<button onclick = 'tutorial("+help+")'>Back</button>"

}

function printTest(){
    //console.log("Print test");
}

function drawPoll(state, isFree, isFake){
    
	clearScreen();
  
    if(isFake){
      globals.currentCandidateArrayHolder = globals.candidates;
      globals.candidates = globals.fakeCandidateHolder;
    }
    else{
      saveGameState();
    }
	
	if(state == POLL_STATES.IN_GAME)
    {
        //Display Updated Top Bar
        updateTopBar(pollMenu);
        document.getElementById('topBar').style.display = "inline-flex";
    }
  
    //Calculates poll time
	var timeForPoll = returnTotalPollTime(20,0);
    
	globals.qPollHolder = 2;
    
	document.getElementById("eventInfo").style = "display:block;";
    if(!isFree){
      document.getElementById("eventInfo").innerHTML += "<h4> Poll Questions Every set of one or two questions you add will equal an hour. </h4> <br>";
    }
    document.getElementById("eventInfo").innerHTML += "<h4>Select an area where you wish to poll.</h4><div id = 'questionArea'></div>";
    document.getElementById("map").style.display = "block";
    
    //Waits for the map to load before drawing on the canvas
    drawMap(true);
    
	document.getElementById("questionArea").innerHTML +="<h4>Population & Sample</h4><br>";
    
	document.getElementById("questionArea").innerHTML += "<label>Location: </label><select id = 'location'></select><br>";

    for(let key in areaChoices){
      document.getElementById("location").options.add(new Option(areaChoices[key].name,areaChoices[key].id));
    }
    
	document.getElementById("questionArea").innerHTML += "<label>Sample Size: </label><select id = 'sample' class = 'sampleOptions totalTimeTracker'><br></select><br>";
	globals.back = false;
    
    //If it's a free poll or if there's enough time
	if(isFree || globals.remainingHoursDay>= 3 )
	{
        
		document.getElementById("sample").options.add(new Option("Sample 20 Students", 20));
		
        //If there's enough time to sample more students, add the option
        if(isFree || globals.remainingHoursDay > 5 ){
			document.getElementById("sample").options.add(new Option("Sample 40 Students", 40));
        }


      
        
		//Populates the questions based on the JSON File
		for(var i = 0; i<6 ;i++)
		{
            
			var none = "";
			document.getElementById("questionArea").innerHTML += " <select class = 'totalTimeTracker pollQ' id =\"poll"+i+ "\"> </select> ";
			document.getElementById("questionArea").innerHTML += " <select class = 'subPollQ totalTimeTracker' style = 'display:none' id =\"subpoll"+i+ "\"> </select> ";
            
            let noneOption = new Option("None", none);
            noneOption.setAttribute("class", "defaultOption")
			document.getElementById("poll"+i+"").options.add(noneOption);
            
			for(var j = 0; j<globals.questions.length; j++)
			{
                //If this is not the first poll
				if(state != POLL_STATES.FIRST)
				{
                    //Only provide questions 0-3 and 9-11
					if (j < 4 || j > 8)
					{
                        let option = new Option(globals.questions[j].question, globals.questions[j].value);
                        option.setAttribute("class", "defaultOption");
						//document.getElementById("poll"+i+"").options.add(new Option(globals.questions[j].question, globals.questions[j].value));
                        document.getElementById("poll"+i+"").options.add(option);
					
					}
				}
				else
				{
                    //Only provide questions 0-3 and 10-11
					if (j < 4 || j > 11)
					{
						let option = new Option(globals.questions[j].question, globals.questions[j].value);
                        option.className = "defaultOption";
						//document.getElementById("poll"+i+"").options.add(new Option(globals.questions[j].question, globals.questions[j].value));
                        document.getElementById("poll"+i+"").options.add(option);
					
					}
				}
			}
		}
	}
	else
	{
		document.getElementById("eventInfo").innerHTML += "<h4> You do not have enough time remaining to take a poll.</h4>";
	}
    
    //If the poll is not free, display the time it will take
	if(!isFree)
	{
		document.getElementById("questionArea").innerHTML += "<br> <p id = 'timeParagraph'>Total Time: "+ timeForPoll +" Hours</p>";
	}
    //Otherwise hide the "amount of time" paragraph
	else
	{
		document.getElementById("questionArea").innerHTML += "<br> <p id = 'timeParagraph' style = 'display:none'></p><br>";
	}
	if(state == POLL_STATES.FIRST || globals.remainingHoursDay >= 4 )
		addMoreQuestions();
	if(state != POLL_STATES.FIRST && globals.remainingHoursDay >= 5)
		{addMoreQuestions();}
    
		
	//Displays the screen for this event
	document.getElementById("questionArea").innerHTML += "<p id = 'duplicateParagraph'></p><br><button class = 'logEventPoll' onclick = 'pollResults("+state+", " +isFree+","+isFake+")'> Submit Poll </button><br>";
	
    //Tutorial's practice poll
	if(state == POLL_STATES.TUTORIAL){
		document.getElementById("next").innerHTML += "<br> <button type='button' onclick='chooseDiff()'> Start the Game </button>";
	}
    //Poll within Practice Area
	else if (state == POLL_STATES.PRACTICE_AREA){
		document.getElementById("back").innerHTML += "<br> <button type='button' onclick='startPractice()'> Back to Practice Area </button>";
	}
    //Poll when you retake the tutorial from within the main game
	else if(state == POLL_STATES.IN_GAME_PRACTICE)
	{
		document.getElementById("back").innerHTML += "<br> <button type='button' onclick='userAction()'> Back to Game </button>";
	}
    //First poll in the game
	else if(state == POLL_STATES.FIRST){
		document.getElementById("next").innerHTML += "<br> <button onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";
	}
    //End of day poll
	else if(state == POLL_STATES.END_OF_DAY){
      
        document.getElementById("next").innerHTML += "<br> <button type='button' onclick='userAction()' > Choose Not to Take the Poll  </button>";
    }
    //It's a poll the user has chosen to take
    else if(state == POLL_STATES.IN_GAME){
        document.getElementById("back").innerHTML += "<br> <button type='button' onclick='backtoUA()' >Back to Game Map</button>";
    }

	document.getElementById("questionArea").style.display = "block";
    
    //Set event listeners last, after all elements have been loaded
    //Set onchange event for the location dropdown
    document.getElementById("location").onchange = function(){
        globals.isCurrentAreaHover = document.getElementById("location").value;
        
        //Redraw map
        drawMapAreas();
        drawMapIcons();
    }

//	document.getElementById("moreQuestionButton").addEventListener("click", function(){
//			addMoreQuestions();
//	});
    
}

//Draws lines on the map around the buildings
function drawMap(poll)
{
	globals.isPoll = poll;
    
    document.getElementById("map").innerHTML = "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
    globals.c=document.getElementById("myCanvas");
    globals.ctx = globals.c.getContext("2d");
    
    var mouse = globals.canvasMouse;
	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	globals.c.onmousedown = doMousedownMain;
	globals.c.onmousemove = doMouseOver;
    
    drawMapAreas();
    drawMapIcons();

}

    
//Sets the clickable zones on the map for the Game Map
 function doMousedownMain(c,e)
	{
		var mouse = globals.canvasMouse;
        
        //Loop through map areas
        for(let key in areaChoices){
            let mapArea = areaChoices[key];
            
            //Only check for quad icon during Polling
            if(mapArea.name != "Quad" || globals.isPoll){
                
                if(isPointInArea(mouse.x, mouse.y, mapArea)){
                    
                    //If it's during a poll, update the input value
                    if(globals.isPoll){
                        document.getElementById("location").value = mapArea.id;
                    }
                    //Otherwise display the selected choice element
                    else{
                        //Hide all Choice Elements
                        document.getElementById("GymChoice").style.display = 'none';
                        document.getElementById("LibraryChoice").style.display = 'none';
                        document.getElementById("LabsChoice").style.display = 'none';
                        document.getElementById("CommonsChoice").style.display = 'none';
                        
                        //Display only the selected area
                        document.getElementById(mapArea.name+"Choice").style.display = 'block';
                    }
                    
                    globals.isCurrentAreaHover = mapArea.id;
                    
                    //Redraw screen with new outline
                    doMouseOver();
                }
            }
        }
    }

//Fills the zone over the building that the mouse if hovering over
	function doMouseOver(c,e){


        globals.c=document.getElementById("myCanvas");
        globals.ctx = globals.c.getContext("2d");
		var mouse = globals.canvasMouse;
        //console.log(mouse);
		globals.ctx.fillStyle = 'rgba(0,255,255,0.5)';
        
        drawMapAreas();
        
        //Draw Hover shapes
        
		//Loop through map areas
        for(let key in areaChoices){
            let mapArea = areaChoices[key];
            
            //Only check for quad icon during Polling
            if(mapArea.name != "Quad" || globals.isPoll){
                
                if(isPointInArea(mouse.x, mouse.y, mapArea)){
                    drawAreaPath(mapArea);
                    globals.ctx.fill();
                }
            }
        }
        
        drawMapIcons();
	}
    

    //Draws lines on the map around the buildings
    function drawMapAreas()
    {
        
        globals.ctx.drawImage(images["Map"], 0,0,600,414);
        
        globals.ctx.strokeStyle = '#00FFFF';
        globals.ctx.lineWidth = 3;
        
        
        //Draw outlines of map areas
        for(let key in areaChoices){
            globals.ctx.save();
            let mapArea = areaChoices[key];

            //Only draw the quad icon during Polling
            if(mapArea.name != "Quad" || globals.isPoll){
                
                if(globals.isCurrentAreaHover == mapArea.id){
                    globals.ctx.strokeStyle = '#FFFF00';
        	        globals.ctx.lineWidth = 6;
                }
                drawAreaPath(mapArea);
                globals.ctx.stroke();
            }
            globals.ctx.restore();
        }

    }
function drawMapIcons(){
    
    //Draw area icons
    for(let key in areaChoices){
        let mapArea = areaChoices[key];
        //Only draw the quad icon during Polling
        if(mapArea.name != "Quad" || globals.isPoll){
            let areaIcon = images[mapArea.name+"Icon"];
            globals.ctx.drawImage(areaIcon, mapArea.labelX, mapArea.labelY,113,75)
        }
    }
}
    
//makes the statement screen
function statement(){
    
	globals.back = false;
	clearScreen();
  
    updateTopBar(statement);
    hourChecker();
    
    document.getElementById("centerDisplay").innerHTML = views["statement"]({"issues":globals.positions});
    /*document.getElementById("centerDisplay").innerHTML += "<h4>People want to know how you feel on certain issues. Why not make a statement?</h4>";
    document.getElementById("centerDisplay").innerHTML += " <select id = 'statements'> </select> ";
    document.getElementById("centerDisplay").innerHTML += " <select id = 'posneg'> </select> ";

    for(var x = 0; x < globals.positions.length; x++){
        document.getElementById("statements").options.add(new Option(globals.positions[x], x))
    }

    document.getElementById("posneg").options.add(new Option('Positive', 0))
    document.getElementById("posneg").options.add(new Option('Negative', 1))
    document.getElementById("centerDisplay").innerHTML += "<p>Time Required: 1 Hour</p>";*/
    document.getElementById("next").innerHTML += "<button type='button' onclick='statementCalc()' > Make Statement </button>";
    document.getElementById("back").innerHTML += "<button type='button' onclick='backtoUA()' >Back to Game Map</button>";

}

//Minigame
function minigamePlayer(id){
		//Clear previous screen
	globals.lastMinigame = id;
	clearScreen();

	document.getElementById("eventInfo").innerHTML += "<div id = 'centerCanvas'><canvas id='myCanvas' width='880px' height = '500px' style = 'margin: 0 auto;'></canvas></div><br>";
	globals.c=document.getElementById("myCanvas");
	globals.ctx = globals.c.getContext("2d");


	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	//console.log(id);
	switch(id)
	{
		case 1:
		runningGame.main.init(globals.c,globals.ctx);
		break;
		case 2:
		runningGame2.main.init(globals.c,globals.ctx);
		break;
		case 3:
		secretSticker.main.init(globals.c,globals.ctx);
		break;
		case 4:
		runningGame4.main.init(globals.c,globals.ctx);
		break;
		case 5:
		tshirtCannon.main.init(globals.c,globals.ctx);
		break;
	}	
}

function practiceGame(id){
		//Clear previous screen
	clearScreen();
	
	document.getElementById("eventInfo").style = "display:block";
	document.getElementById("eventInfo").innerHTML += "<canvas id='myCanvas' width='900px' height = '500px'></canvas><br>";
	document.getElementById("eventInfo").style.height = "500px";
	globals.c=document.getElementById("myCanvas");
	globals.ctx = globals.c.getContext("2d");
	if(globals.inGame)
	{
		document.getElementById("back").innerHTML += "<button onclick = 'helpScreen(userAction)'> Back to Help Menu</button>";
	}
	else
	{
		document.getElementById("back").innerHTML += "<button onclick = 'startPractice()'> Back to Practice Area</button>";
	}

	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	switch(id)
	{
		case 1:
		runningGame.main.init(globals.c,globals.ctx);
		break;
		case 2:
		runningGame2.main.init(globals.c,globals.ctx);
		break;
		case 3:
		secretSticker.main.init(globals.c,globals.ctx);
		break;
		case 4:
		runningGame4.main.init(globals.c,globals.ctx);
		break;
		case 5:
		tshirtCannon.main.init(globals.c,globals.ctx);
		break;
	}	
}


//calculated the effectiveness of your statement & consistancy modifier
function statementCalc()
{
	if(globals.remainingHoursDay > 0)
	{
		var currentStatement = document.getElementById("statements").value;
		var currentPosNeg = document.getElementById("posneg").value;
		//if positive statement
		if(currentPosNeg == 0){
			globals.candidates[0].issueScore[currentStatement] += 0.2;
			if(currentStatement == 0){
				globals.candidates[0].tuitPos += 1;
			}
			else if(currentStatement == 1){
				globals.candidates[0].budPos += 1;
			}
			else if(currentStatement == 3){
				globals.candidates[0].medPos += 1;
			}
			else if(currentStatement == 2){
				globals.candidates[0].funcPos += 1;
			}
		}
		//if negative statement
		else{
		
				globals.candidates[0].issueScore[currentStatement] -= 0.2;
				if(currentStatement == 0){
					globals.candidates[0].tuitNeg += 1;
				}
				else if(currentStatement == 1){
					globals.candidates[0].budNeg += 1;
				}
				else if(currentStatement == 3){
					globals.candidates[0].medNeg += 1;
				}
			else if(currentStatement == 2){
				globals.candidates[0].funcNeg += 1;
				}
	
		}
		//calculate the candidate's constitution mod
	
		var tuitCond,
			athCond,
			resCond,
			medCond,
			eventCond;
	
	
		//check if the issues have anything even in them
		if(globals.candidates[0].tuitPos>0 || globals.candidates[0].tuitNeg > 0){
			tuitCond = (Math.min(globals.candidates[0].tuitPos, globals.candidates[0].tuitNeg))/(globals.candidates[0].tuitPos+globals.candidates[0].tuitNeg);
		}
		else{
			tuitCond = 0;
		}
	
		if(globals.candidates[0].budPos>0 || globals.candidates[0].budNeg>0){
			athCond = (Math.min(globals.candidates[0].budPos, globals.candidates[0].budNeg))/(globals.candidates[0].budPos+globals.candidates[0].budNeg);
		}
		else{
			athCond = 0;
		}
	
		if(globals.candidates[0].resPos>0 || globals.candidates[0].resNeg>0){
			resCond = (Math.min(globals.candidates[0].resPos, globals.candidates[0].resNeg))/(globals.candidates[0].resPos+globals.candidates[0].resNeg);
		}
	
		else{
			resCond = 0;
		}
	
		if(globals.candidates[0].medPos>0 || globals.candidates[0].medNeg>0){
			medCond = (Math.min(globals.candidates[0].medPos, globals.candidates[0].medNeg))/(globals.candidates[0].medPos+globals.candidates[0].medNeg);
		}
		else{
			medCond = 0;
		}
	
		if(globals.candidates[0].funcPos>0 || globals.candidates[0].funcNeg>0){
			eventCond = (Math.min(globals.candidates[0].funcPos, globals.candidates[0].funcNeg))/(globals.candidates[0].funcPos+globals.candidates[0].funcNeg);
		}
		else{
			eventCond = 0;
		}
	
		var condHolder = (tuitCond + athCond + resCond + medCond + eventCond)/5;
		globals.candidates[0].consMod = condHolder;
		//decrease 1 hour and continue back to user action
		globals.remainingHoursTotal--;
		globals.remainingHoursDay--;
		statementCalcOtherCandidate(1);
	}
    statementResults(currentStatement, currentPosNeg);
}



function statementResults(statement, statementValue)
{
    clearScreen();
    var state = parseInt(statement); 
    
    let issue;
    let stance;
    let imgIssue;
    let imgStance;
  
    if(statementValue == 0){
      stance = "in favor of";
      imgStance = "Pos";
    }
    else{
      stance = "against";
      imgStance = "Neg";
    }
    
    switch(state){
      case 0:
        issue = "lowering tuition";
        imgIssue = "tuit";
        break;
      case 1:
        issue = "increasing the budget";
        imgIssue = "bud";
        break;
      case 2:
        issue = "having more school functions";
        imgIssue = "func";
        break;
      case 3:
        issue = "improving medical services";
        imgIssue = "med";
        break;
    }
  
    document.getElementById("centerDisplay").innerHTML += "<h4>You made a great speech "+stance+" "+issue+"</h4>";
    document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/statement/"+imgIssue+imgStance+".png'> ";
  
	document.getElementById("next").innerHTML += "<button onclick='userAction()'>Return to the Game Map</button>";
}
//repeats the statement at a lowered effect for Karma
function statementCalcOtherCandidate(x){
	var currentStatement = document.getElementById("statements").value;
	var currentPosNeg = document.getElementById("posneg").value;

	if(currentPosNeg == 0){
		globals.candidates[x].issueScore[currentStatement] += 0.75;
		if(currentStatement == 0){
			globals.candidates[x].tuitPos += 1;
		}
		else if(currentStatement == 1){
			globals.candidates[x].budPos += 1;
		}
		else if(currentStatement == 3){
			globals.candidates[x].medPos += 1;
		}
		else if(currentStatement == 2){
			globals.candidates[x].funcPos += 1;
		}
	}
	else{
		if(currentPosNeg == 1){
			//globals.candidates[x].issueScore[currentStatement] -= 0.75;
			if(currentStatement == 0){
				globals.candidates[x].tuitNeg += 1;
			}
			else if(currentStatement == 1){
				globals.candidates[x].budNeg += 1;
			}
			else if(currentStatement == 3){
				globals.candidates[x].medNeg += 1;
			}
            else if(currentStatement == 2){
			globals.candidates[x].funcNeg += 1;
			}
		}
	}
	globals.candidates[x].lastMove = "Statement";
}

function resetQuestions(){
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


// Loops through the current questions and checks for duplicates
function dupChecker()
{
    
	var duplicate = false;
	var dup1;
	var dup2;
	var pollChoices = [];
    
    let questionIndex;
    //let subQuestionIndex;
    
    
    resetQuestions();
    
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

                        //If the poll value involves a subquestion
                        if(subQuestionIndex != null && subQuestionIndex > -1){
                            //console.log("is subquestion");
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
       //console.log("not enough questions: "+pollChoices.length);
		document.getElementById("duplicateParagraph").innerHTML = "Please Select 2 or More Questions";
        document.getElementById("duplicateParagraph").style.display = "block";
	}
    else if(!pollTimeCheck(sampleSize, pollChoices) && !isFree){
      //console.log("time check 1");
        document.getElementById("duplicateParagraph").innerHTML = "You dont have enough time to ask that many questions. \nPlease reselect an appropriate number of questions.";
        document.getElementById("duplicateParagraph").style.display = "block";
    }
    //If the poll is sucessful
    else
    {
		document.getElementById("eventInfo").style.display = "none";

        //Clear previous screen
        clearScreen();
      
        //Run poll
        pollCalc(pollChoices, sampleSize, bias, state, isFree, isFake);
    
        if(state == POLL_STATES.TUTORIAL){
            document.getElementById("back").innerHTML += "<button onclick = 'drawPoll("+state+","+isFree+","+isFake+")'> Back to Tutorial Poll</button>";
        }
        else if(state == POLL_STATES.PRACTICE_AREA)
        {
            document.getElementById("next").innerHTML += "<button onclick = 'startPractice()'> Return to Practice Area</button>";
        }
        else if(state == POLL_STATES.FIRST)
        {
            document.getElementById("next").innerHTML += "<button onclick = 'firstStatement()'> Make your Initial Statement on an Issue </button>";
    
        }
        else{
            document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the Game Map </button>";
        }
	}

    //Reset candidates back to correct candidates
	globals.candidates = globals.currentCandidateArrayHolder;

};




/* Helper Functions*/

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

//Takes in an Arrays of Groups to affect with the score increase, and parses through each adding the specified increase in score
function scoreChanger(candidate, scoreInc, groupPos, groupNeg)
{

	////console.log(candidate.issueScore);
	////console.log(scoreInc);
	for(var i=0;i<groupPos.length;i++)
	{

		switch (groupPos[i])
		{
			case "Soc":
				candidate.fame[0]+=parseFloat(scoreInc);
				if(candidate.fame[0] > 2)
				{
					candidate.fame[0] = 2;
				}
				if(candidate.fame[0] < .1)
				{
					candidate.fame[0] = .1;
				}
				break;

			case "Ath":
				candidate.fame[1]+=parseFloat(scoreInc);
				if(candidate.fame[1] > 2)
				{
					candidate.fame[1] = 2;
				}
				if(candidate.fame[1] < .1)
				{
					candidate.fame[1] = .1;
				}
				break;

			case "Gam":
				candidate.fame[2]+=parseFloat(scoreInc);
				if(candidate.fame[2] > 2)
				{
					candidate.fame[2] = 2;
				}
				if(candidate.fame[2] < .1)
				{
					candidate.fame[2] = .1;
				}
				break;

			case "Read":
				candidate.fame[3]+=parseFloat(scoreInc);
				if(candidate.fame[3] > 2)
				{
					candidate.fame[3] = 2;
				}
				if(candidate.fame[3] < .1)
				{
					candidate.fame[3] = .1;
				}
				break;

			case "Bus":
				candidate.fame[4]+=parseFloat(scoreInc);
				if(candidate.fame[4] > 2)
				{
					candidate.fame[4] = 2;
				}
				if(candidate.fame[4] < .1)
				{
					candidate.fame[4] = .1;
				}
				break;

			case "Law":
				candidate.fame[5]+=parseFloat(scoreInc);
				if(candidate.fame[5] > 2)
				{
					candidate.fame[5] = 2;
				}
				if(candidate.fame[5] < .1)
				{
					candidate.fame[5] = .1;
				}
				break;

			case "Tech":
				candidate.fame[6]+=parseFloat(scoreInc);
				if(candidate.fame[6] > 2)
				{
					candidate.fame[6] = 2;
				}
				if(candidate.fame[6] < .1)
				{
					candidate.fame[6] = .1;
				}
				break;

			case "Arts":
				candidate.fame[7]+=parseFloat(scoreInc);
				if(candidate.fame[7] > 2)
				{
					candidate.fame[7] = 2;
				}
				if(candidate.fame[7] < .1)
				{
					candidate.fame[7] = .1;
				}
				break;


			case "tuition":
				candidate.issueScore[0]+=parseFloat(scoreInc);
						if(candidate.issueScore[0] > 4)
						{
							candidate.issueScore[0] = 4;
						}
						if(candidate.issueScore[0] < -4)
						{
							candidate.issueScore[0] = -4;
						}
				break;

			case "budget":
				candidate.issueScore[1]+=parseFloat(scoreInc);
						if(candidate.issueScore[1] > 4)
						{
							candidate.issueScore[1] = 4;
						}
						if(candidate.issueScore[1] < -4)
						{
							candidate.issueScore[1] = -4;
						}
				break;

			case "functions":
				candidate.issueScore[2]+=parseFloat(scoreInc);
						if(candidate.issueScore[2] > 4)
						{
							candidate.issueScore[2] = 4;
						}
						if(candidate.issueScore[2] < -4)
						{
							candidate.issueScore[2] = -4;
						}
				break;

			case "medical":
				candidate.issueScore[3]+=parseFloat(scoreInc);
						if(candidate.issueScore[3] > 4)
						{
							candidate.issueScore[3] = 4;
						}
						if(candidate.issueScore[3] < -4)
						{
							candidate.issueScore[3] = -4;
						}
				break;

			case "Fame":

				break;

			case "Opp Focus":

				break;

			case "Opp Fame":

				break;

		}
	}

	for(var j=0;j<groupNeg.length;j++)
	{
		switch (groupNeg[i])
		{
			case "Soc":
				candidate.fame[0]-=parseFloat(scoreInc);
				if(candidate.fame[0] > 2)
				{
					candidate.fame[0] = 2;
				}
				if(candidate.fame[0] < .1)
				{
					candidate.fame[0] = .1;
				}
				break;

			case "Ath":
				candidate.fame[1]-=parseFloat(scoreInc);
				if(candidate.fame[1] > 2)
				{
					candidate.fame[1] = 2;
				}
				if(candidate.fame[1] < .1)
				{
					candidate.fame[1] = .1;
				}
				break;

			case "Gam":
				candidate.fame[2]-=parseFloat(scoreInc);
				if(candidate.fame[2] > 2)
				{
					candidate.fame[2] = 2;
				}
				if(candidate.fame[2] < .1)
				{
					candidate.fame[2] = .1;
				}
				break;

			case "Read":
				candidate.fame[3]-=parseFloat(scoreInc);
				if(candidate.fame[3] > 2)
				{
					candidate.fame[3] = 2;
				}
				if(candidate.fame[3] < .1)
				{
					candidate.fame[3] = .1;
				}
				break;

			case "Bus":
				candidate.fame[4]-=parseFloat(scoreInc);
				if(candidate.fame[4] > 2)
				{
					candidate.fame[4] = 2;
				}
				if(candidate.fame[4] < .1)
				{
					candidate.fame[4] = .1;
				}
				break;

			case "Law":
				candidate.fame[5]-=parseFloat(scoreInc);
				if(candidate.fame[5] > 2)
				{
					candidate.fame[5] = 2;
				}
				if(candidate.fame[5] < .1)
				{
					candidate.fame[5] = .1;
				}
				break;

			case "Tech":
				candidate.fame[6]-=parseFloat(scoreInc);
				if(candidate.fame[6] > 2)
				{
					candidate.fame[6] = 2;
				}
				if(candidate.fame[6] < .1)
				{
					candidate.fame[6] = .1;
				}
				break;

			case "Arts":
				candidate.fame[7]-=parseFloat(scoreInc);
				if(candidate.fame[7] > 2)
				{
					candidate.fame[7] = 2;
				}
				if(candidate.fame[7] < .1)
				{
					candidate.fame[7] = .1;
				}
				break;


			case "tuition":
				candidate.issueScore[0]-=parseFloat(scoreInc);
						if(candidate.issueScore[0] > 4)
						{
							candidate.issueScore[0] = 4;
						}
						if(candidate.issueScore[0] < -4)
						{
							candidate.issueScore[0] = -4;
						}
				break;

			case "budget":
				candidate.issueScore[1]-=parseFloat(scoreInc);
						if(candidate.issueScore[1] > 4)
						{
							candidate.issueScore[1] = 4;
						}
						if(candidate.issueScore[1] < -4)
						{
							candidate.issueScore[1] = -4;
						}
				break;

			case "functions":
				candidate.issueScore[2]-=parseFloat(scoreInc);
						if(candidate.issueScore[2] > 4)
						{
							candidate.issueScore[2] = 4;
						}
						if(candidate.issueScore[2] < -4)
						{
							candidate.issueScore[2] = -4;
						}
				break;

			case "medical":
				candidate.issueScore[3]-=parseFloat(scoreInc);
						if(candidate.issueScore[3] > 4)
						{
							candidate.issueScore[3] = 4;
						}
						if(candidate.issueScore[3] < -4)
						{
							candidate.issueScore[3] = -4;
						}
				break;

			case "Fame":

				break;

			case "Opp Focus":

				break;

			case "Opp Fame":

				break;

		}
	////console.log(globals.candidates[0].issueScore);
	}
}

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

//used for making Player Candidate & Opponent Candidate
function CandidateCreate(name){
	this.name = name;
	this.fame= [0,0,0,0,0,0,0,0];
	this.issueScore= [0,0,0,0];
	this.consMod= 0;
	this.focus= "";
	this.focusnum= 0;
	this.winChance= 0;
	this.votes= 0;
	this.lastMove= "Unknown";
	this.raceNum = 1;
	this.genderNum = 1;
	this.bodyTypeNum = 1;
	this.headNum = 1;
	this.correctAnswers = 0;
	this.wrongAnswers = 0;
	//statement choices

	this.tuitPos= 0;
	this.tuitNeg= 0;
	this.budPos= 0;
	this.budNeg= 0;
	this.medPos= 0;
	this.medNeg= 0;
	this.funcPos= 0;
	this.funcNeg= 0;
};

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
    console.log(groupRandom)
	var majorRandom = Math.floor(Math.random()* 4);
	var ath =0;
	var res = 0;
	var tuit = 0;
	var med = 0;
	var event = 0;
	//SCORE calculated by (group issue + variable) + (major issue + variable)  + (class issue + variable)
	tuit = (((globals.groupIssues[groupRandom][0]) + (Math.floor(Math.random() * (globals.groupIssues[groupRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((globals.majorIssues[majorRandom][0]) + (Math.floor(Math.random() * (globals.groupIssues[majorRandom][1]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	bud =  (((globals.groupIssues[groupRandom][2]) + (Math.floor(Math.random() * (globals.groupIssues[groupRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((globals.majorIssues[majorRandom][2]) + (Math.floor(Math.random() * (globals.groupIssues[majorRandom][3]) ) )) * ( Math.random() < 0.5 ? -1 : 1));
	event =  (((globals.groupIssues[groupRandom][6]) + (Math.floor(Math.random() * (globals.groupIssues[groupRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((globals.majorIssues[majorRandom][6]) + (Math.floor(Math.random() * (globals.groupIssues[majorRandom][7]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) ;
	med =  (((globals.groupIssues[groupRandom][8]) + (Math.floor(Math.random() * (globals.groupIssues[groupRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1)) + (((globals.majorIssues[majorRandom][8]) + (Math.floor(Math.random() * (globals.groupIssues[majorRandom][9]) ) )) * ( Math.random() < 0.5 ? -1 : 1));

  
	 tuit = tuit/2;
     bud = bud/2;
     event = event/2;
     med = med/2;

     tuit = tuit.toFixed(2);
     bud = bud.toFixed(2);
     event = event.toFixed(2);
     med = med.toFixed(2);

    console.log("Tuition: "+tuit);
    console.log("Budget: "+bud);
    console.log("Event: "+event);
    console.log("Med:"+med);
  
	var returnArray = [groupRandom, majorRandom, tuit, bud, event, med];
	return returnArray;
}

//Calculates the candidate who would recieve the vote for each student 
function votePercentage(sampleSize, bias)
{
	////console.log(candidates);
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

			////console.log(globals.sample[i]);
			var fame = 0;
			fame = fameCalc(globals.candidates[j], globals.sample[i]);
			////console.log(globals.candidates[j].name +" Fame: "+ fame);
			if(j != 1)
			{
				var issues = parseFloat(globals.sample[i].tuitionScore) * parseFloat(globals.candidates[j].issueScore[0])
				issues += parseFloat(globals.sample[i].budgetScore) * parseFloat(globals.candidates[j].issueScore[1])
				issues += parseFloat(globals.sample[i].functionScore)* parseFloat(globals.candidates[j].issueScore[2])
				issues += parseFloat(globals.sample[i].medicalScore)  * parseFloat(globals.candidates[j].issueScore[3])
				issues = issues/4;
			}
			else
			{
				var issues = parseFloat(globals.sample[i].tuitionScore) * parseFloat(globals.candidates[j].issueScore[0])
				issues += parseFloat(globals.sample[i].budgetScore) * parseFloat(globals.candidates[j].issueScore[1])
				issues += parseFloat(globals.sample[i].functionScore)* parseFloat(globals.candidates[j].issueScore[2])
				issues += parseFloat(globals.sample[i].medicalScore)  * parseFloat(globals.candidates[j].issueScore[3])
				issues = issues/4;
			}
			////console.log(globals.candidates[j].name +" Issue Score: "+ issues);
			//console.log(globals.candidates[j].name + " Issues:"  + issues)
			if(globals.candidates[j].name != "Karma")
			{
				var candWinPer = 10*Math.pow(fame*issues,2) - globals.candidates[j].consMod;
			}
			else
			{
                if(globals.totalDays>5)
                {
                    var candWinPer = 10*0.4*issues;
                }
                else
                {
                    var candWinPer = 10*0.35*issues;
                }
			}
			
			
			
			////console.log(globals.candidates[j].name +" Win Percentage: "+ candWinPer);
			////console.log("");


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
			//console.log("Current Winner" + winner + " Current Loser" + loser)
		////console.log("Student #" +i);
		////console.log("Winner: " + winner + " Vote Percentage: "+ winPercentage);
		////console.log("Loser: " + loser + " Vote Percentage: "+ lowPercentage);
		////console.log("");
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

//Clears the previous screen
function clearScreen()
{
    document.getElementById("holo").src = "../../img/holopad-topbar.png";
  
	var gameOutput = document.getElementById("centerDisplay");
	var prevChoices = document.getElementById("choices");
	var prevEvent = document.getElementById("eventInfo");
	var prevTable = document.getElementById("table");
  
	document.getElementById('next').innerHTML = "";
    document.getElementById('back').innerHTML = "";

	gameOutput.innerHTML = "";
    
    if(document.getElementById('topBar')){
        document.getElementById('topBar').style.display = "none";
    }
    
    //Hide all area choices
    document.getElementById("LabsChoice").style.display = "none";
    
    document.getElementById("GymChoice").style.display = "none";

    document.getElementById("CommonsChoice").style.display = "none";
    
    //document.getElementById("LibraryChoice").innerHTML = "";
    document.getElementById("LibraryChoice").style.display = "none";
    
   // document.getElementById("map").innerHTML = "";
    document.getElementById("map").style.display = "none";
    
   //document.getElementById("eventInput").innerHTML = "";
    document.getElementById("eventInput").style.display = "none";
    
    document.getElementById('infoText').innerHTML = "";
    
	//prevChoices.innerHTML = "<div id = 'Header' style = 'display:block;'> </div></div><div id = 'LabChoice' style = 'display:none;'></div><div id = 'GymChoice' style = 'display:none;'></div><div id = 'CommonsChoice' style = 'display:block;'> </div><div id = 'LibraryChoice' style = 'display:none;'></div><div id = 'map' style = 'display:block;'></div><div id = 'eventInput' style = 'display:block;'></div>";
	prevEvent.innerHTML = "";
    document.getElementById("eventImg").innerHTML = "";
	prevTable.innerHTML = "<table id = 'tab' class='sortable'><thead id='tableHead'></thead><tbody id='pollTable'></tbody></table>";
}

//Resets the game to the characters select screen.
function resetGame()
{
	globals.tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
	globals.pastPollChoices = [];
	globals.pastPollResults = [];
	globals.pastPollSizes = [];
	globals.oppChoice = [];
	globals.currentEvents = [];
	globals.sample = [];
	globals.candidates=[];
	globals.chosenCandRanks = [];
	globals.currentEvents = [];
	globals.playerCandidate = new CandidateCreate("ph");
	globals.opponentCandidate = new CandidateCreate("Karma");
  	if(globals.gameOver)
    {
        globals.gameSession++; 
        globals.gameOver = false;
    }
    
}

//Allows you to view previous polls at any time.
function reportViewer(id)
{
	clearScreen();

	//pollChoices, tableArray2, sSize, graphData, graphLabels, review, state, isFree
    console.log(globals.pastGraphData);
	tableBuilder(globals.pastPollChoices[id],globals.pastPollResults[id],globals.pastPollSizes[id],globals.pastGraphData[id],globals.pastGraphLabels[id], 1, 0, false, false);
	if(!globals.first){
        updateTopBar(pollMenu);
		document.getElementById("back").innerHTML += "<button onclick = 'userAction()'>Back to Game Map</button>";
    }
	else
		document.getElementById("back").innerHTML += "<button onclick = 'firstStatement()'> Back to Making Your First Statement </button>";
	
}

//Calculates the results of each poll question from each student in the sample and stores them in an array
function pollCalc(pollChoices, sampleSize, bias, state, isFree, isFake)
{	
    
    //Adds the data for Major and Social Group to the graph and label arrays
	globals.graphData = [];
	globals.graphData.push(globals.questions[4].graph.split(','));
	//globals.graphData.push(globals.questions[5].graph.split(','));
	globals.graphData.push(globals.questions[6].graph.split(','));
	
	globals.tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
	
	var pollLabelArray = [];
	pollLabelArray.push(globals.questions[4].labels.split(','));
	//pollLabelArray.push(globals.questions[5].labels.split(','));
	pollLabelArray.push(globals.questions[6].labels.split(','));
    
    //Goes through each question selected, exapnds the size of graphData by one and pushes the label into the pollLabelArray
	for(var i =0; i<pollChoices.length;i++)
	{
		switch(pollChoices[i])
		{
			case "candFav":
			var array =[];
			var array2 =[];
			for(var j =0; j < globals.candidates.length;j++ )
			{
				array.push(0);
				array2.push(globals.candidates[j].name);
			}
			globals.graphData.push(array);
			pollLabelArray.push(array2);
			break;
			case "candOpp":
			var array =[];
			var array2 =[];
			for(var j =0; j < globals.candidates.length;j++ )
			{
				array.push(0);
				array2.push(globals.candidates[j].name);
			}
			globals.graphData.push(array);
			pollLabelArray.push(array2);
			break;
			default:
				for(var j =0; j < globals.questions.length; j++)
				{
					if(pollChoices[i] == globals.questions[j].value)
					{
						globals.graphData.push(globals.questions[j].graph.split(','));
						pollLabelArray.push(globals.questions[j].labels.split(','));
					}
					else
					{
						if(globals.questions[j].value == "issue")
						{
							for(var k =0; k< globals.positionsLower.length; k++)
							{
								if(pollChoices[i] == "issue" + globals.positionsLower[k])
								{
									globals.graphData.push(globals.questions[j].graph.split(','));
									pollLabelArray.push(globals.questions[j].labels.split(','));
								}
							}
						}
						if(globals.questions[j].value == "candFame")
						{
							for(var k =0; k< globals.candidates.length; k++)
							{
								if(pollChoices[i] == "candFame" + globals.candidates[k].name)
								{
									globals.graphData.push(globals.questions[j].graph.split(','));
									pollLabelArray.push(globals.questions[j].labels.split(','));
								}
							}
						}
						if(globals.questions[j].value == "candTrust")
						{
							for(var k =0; k< globals.candidates.length; k++)
							{
								if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
								{
									globals.graphData.push(globals.questions[j].graph.split(','));
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
  
    //console.log(globals.candidates);
	//Gets the results of each question and pushes them into the proper sectionof table arrays
	for(var j=0;j<globals.sample.length;j++)
	{
		globals.tableArrays[4].push(globals.sample[j].major);
		var majorHolder = globals.sample[j].major;
		if(majorHolder == "business"){
			globals.graphData[0][0]++;
		}
		else if(majorHolder == "law"){
			globals.graphData[0][1]++;
		}
		else if(majorHolder == "tech"){
			globals.graphData[0][2]++;
		}
		else if(majorHolder == "arts"){
			globals.graphData[0][3]++;
		}

		globals.tableArrays[6].push(globals.sample[j].group);
		var groupHolder = globals.sample[j].group;
		if(groupHolder == "socialite"){
			globals.graphData[1][0]++;
		}
		else if(groupHolder == "athlete"){
			globals.graphData[1][1]++;
		}
		else if(groupHolder == "gamer"){
			globals.graphData[1][2]++;
		}
		else if(groupHolder == "reader"){
			globals.graphData[1][3]++;
		}
		
		//if(state == POLL_STATES.FIRST && j ==0)
		//{
		//	globals.candidates.splice(0,0,new CandidateCreate(""));
		//}
        for(var i = 0; i < pollChoices.length ;i++)
        {
            //console.log(i)
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
                    globals.graphData[i+2][0]++;
                }
                else if(favName == "Budget"){
                    globals.graphData[i+2][1]++;
                }
                else if(favName == "Functions"){
                    globals.graphData[i+2][2]++;
                }
                else if(favName == "Medical"){
                    globals.graphData[i+2][3]++;
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
                    globals.graphData[i+2][0]++;
                }
                else if(oppName == "Budget"){
                    globals.graphData[i+2][1]++;
                }
                else if(oppName == "Functions"){
                    globals.graphData[i+2][2]++;
                }
                else if(oppName == "Medical"){
                    globals.graphData[i+2][3]++;
                }
    
                break;
    
                case "candFav":
				if(globals.candidates.length==2)
				{
                    globals.tableArrays[2].push(globals.sample[j].results.win);
					for(var k =0; k< globals.candidates.length;k++)
					{
						if(globals.sample[j].results.win == globals.candidates[k].name){
							globals.graphData[i+2][k]++;
						}
					}
				}
				else
				{
                    globals.tableArrays[2].push(globals.sample[j].results.win);
					for(var k =0; k< globals.candidates.length;k++)
					{
						//console.log()
						if(globals.sample[j].results.win == globals.candidates[k].name){
							globals.graphData[i+2][k]++;
						}
					}
				}
                break;
    
                case "candOpp":
				if(globals.candidates.length==2)
				{
                    globals.tableArrays[3].push(globals.sample[j].results.los);
					for(var k =0; k< globals.candidates.length;k++)
					{
						if(globals.sample[j].results.los == globals.candidates[k].name){
							globals.graphData[i+2][k]++;
						}
					}
				}
				else
				{
                    globals.tableArrays[3].push(globals.sample[j].results.los);
					for(var k =0; k< globals.candidates.length;k++)
					{
						if(globals.sample[j].results.los == globals.candidates[k].name){
							globals.graphData[i+2][k]++;
						}
					}
				}
                break;
    
    
    
                case "fame":
                    var playFame = fameCalc(globals.candidates[0],globals.sample[j]).toFixed(3);
                    globals.tableArrays[7].push(playFame);
                    if(playFame > 0.69){
                        globals.graphData[i+2][0]++;
                    }
                    else if(playFame > 0.36){
                        globals.graphData[i+2][1]++;
                    }
                    else{
                        globals.graphData[i+2][2]++;
                    }
                break;
    
                case "playTrust":
                    globals.tableArrays[8].push(globals.candidates[0].consMod);
                    var playConst = globals.candidates[0].consMod;
                    if(playConst > 0.69){
                        globals.graphData[i+2][2]++;
                    }
                    else if(playConst > 0.36){
                        globals.graphData[i+2][1]++;
                    }
                    else{
                        globals.graphData[i+2][0]++;
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
                            if(globals.sample[j].tuitionScore >=2){
                                globals.graphData[i+2][0]++;
                            }
                            else if(globals.sample[j].tuitionScore >=-1){
                                globals.graphData[i+2][1]++;
                            }
                            else{
                                globals.graphData[i+2][2]++;
                            }
                        break;
    
                        case "issuebudget":
                            globals.tableArrays[10].push(parseFloat(globals.sample[j].budgetScore).toFixed(2));
                            if(globals.sample[j].budgetScore>=2){
                                globals.graphData[i+2][0]++;
                            }
                            else if(globals.sample[j].budgetScore >=-1){
                                globals.graphData[i+2][1]++;
                            }
                            else{
                                globals.graphData[i+2][2]++;
                            }
                        break;
    
                        case "issuefunctions":
                            globals.tableArrays[12].push(parseFloat(globals.sample[j].functionScore).toFixed(2));
                            if(globals.sample[j].functionScore >=2){
                                globals.graphData[i+2][0]++;
                            }
                            else if(globals.sample[j].functionScore >=-1){
                                globals.graphData[i+2][1]++;
                            }
                            else{
                                globals.graphData[i+2][2]++;
                            }
                        break;
    
                        case "issuemedical":
                            globals.tableArrays[13].push(parseFloat(globals.sample[j].medicalScore).toFixed(2));
                            if(globals.sample[j].medicalScore >=2){
                                globals.graphData[i+2][0]++;
                            }
                            else if(globals.sample[j].medicalScore >=-1){
                                globals.graphData[i+2][1]++;
                            }
                            else{
                                globals.graphData[i+2][2]++;
                            }
                        break;
                    }
                }
            }
    
            var candCounter = 14;
            for(var k = 1;k<globals.candidates.length;k++)
            {
                if(pollChoices[i] == "candFame" + globals.candidates[k].name)
                {
                    var calcHolder = fameCalc(globals.candidates[k], globals.sample[j]);
                    
                    globals.tableArrays[candCounter].push(calcHolder);				
    
                    if(calcHolder> 0.66){
                        globals.graphData[i+2][0]++;
                    }
                    else if(calcHolder > 0.33){
                        globals.graphData[i+2][1]++;
                    }
                    else{
                        globals.graphData[i+2][2]++;
                    }
    
    
                }
    
    
                candCounter++;
            }
            for(var k = 1;k<globals.candidates.length;k++)
            {
                if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
                {
    
                    globals.tableArrays[candCounter].push(globals.candidates[k].consMod);
    
                    if(globals.candidates[k].consMod> 0.66){
                        globals.graphData[i+2][2]++;
                    }
                    else if(globals.candidates[k].consMod > 0.33){
                        globals.graphData[i+2][1]++;
                    }
                    else{
                        globals.graphData[i+2][0]++;
                    }
                }
    
                candCounter++;
    
            }
        }
	}
	
	////console.log(globals.tableArrays);
	tableBuilder(pollChoices, globals.tableArrays, sampleSize, globals.graphData, pollLabelArray, isFake, state, isFree);
}

//Builds a table by looping through the Array created by pollCalc and putting each value into a cell.
function tableBuilder(pollChoices, tableArray2, sSize, graphData, graphLabels, isFake, state, isFree)
{   
	//console.log(tableArray2);
	var rowCounter = 0;
	var cellCounter = 0;
	var graphQuestions = [];
	var h = 0;

	var table = document.getElementById("pollTable");
	var tableHead = document.getElementById("tableHead");
	var headRow = tableHead.insertRow(0);
	
	
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
					var cell = headRow.insertCell(h);
					cell.innerHTML = globals.tableHeaders[0];
					graphQuestions.push("issFav");
				break;

				case "issOpp":
						var cell = headRow.insertCell(h);
						cell.innerHTML = globals.tableHeaders[1];
						graphQuestions.push("issOpp");
				break;

				case "candFav":
						var cell = headRow.insertCell(h);
						cell.innerHTML = globals.tableHeaders[2];
						graphQuestions.push("candFav");
				break;

				case "candOpp":
						var cell = headRow.insertCell(h);
						cell.innerHTML = globals.tableHeaders[3];
						graphQuestions.push("candOpp");
				break;

				case "fame":
						var cell = headRow.insertCell(h);
						cell.innerHTML = globals.tableHeaders[7];
						graphQuestions.push("fame");
				break;

				case "playTrust":
						var cell = headRow.insertCell(h);
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
							var cell = headRow.insertCell(h);
							var posInfo = globals.tableHeaders[9] + globals.positions[0];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuetuition");

						break;

						case "issuebudget":
							var cell = headRow.insertCell(h);
							var posInfo = globals.tableHeaders[9] + globals.positions[1];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuebudget");
						break;

						case "issuefunctions":
							var cell = headRow.insertCell(h);
							var posInfo = globals.tableHeaders[9] + globals.positions[3];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuefunctions");
						break;

						case "issuemedical":
							var cell = headRow.insertCell(h);
							var posInfo = globals.tableHeaders[9] + globals.positions[4];
							cell.innerHTML = posInfo;
							graphQuestions.push("issuemedical");
						break;
					}
				}
			}
			for(var k = 1;k<globals.candidates.length;k++)
			{
				if(pollChoices[h] == "candFame" + globals.candidates[k].name)
				{
						var cell = headRow.insertCell(h);
						var candInfo = globals.tableHeaders[10] + globals.candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candFame" + globals.candidates[k].name);
				}
			}
			for(var k = 1;k<globals.candidates.length;k++)
			{
				if(pollChoices[h] == "candTrust" + globals.candidates[k].name)
				{
					////console.log(h);
						var cell = headRow.insertCell(h);
						var candInfo = globals.tableHeaders[11] + globals.candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candTrust" + globals.candidates[k].name);
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
							var cell = row.insertCell(i);
							cell.innerHTML = tableArray2[0][h];
					break;

					case "issOpp":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[1][h];
					break;

					case "candFav":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[2][h];
					break;

					case "candOpp":
								var cell = row.insertCell(i);
								cell.innerHTML = tableArray2[3][h];
					break;

					case "fame":
								var cell = row.insertCell(i);
								if(parseFloat(tableArray2[7][h]).toFixed(2) <= 0.33)
									{
										cell.innerHTML = "Candidate Unknown";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[7][h]).toFixed(2)>0.33 && parseFloat(tableArray2[7][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Aware of Candidate";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Candidate Known";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[7][h]).toFixed(2);
									}
					break;

					case "playTrust":
								var cell = row.insertCell(i);
								if(parseFloat(tableArray2[8][h]).toFixed(2) >= 0.66)
									{
										cell.innerHTML = "Not Trustworthy";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[8][h]).toFixed(2)>0.33 && parseFloat(tableArray2[8][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Sort Of Trustworthy";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Very Trustworthy";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[8][h]).toFixed(2);
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
									var cell = row.insertCell(i);
									if(tableArray2[9][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else if(tableArray2[9][h]>-2 && tableArray2[9][h]<2)
									{
										cell.innerHTML = "Issue Neutral";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Liked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[9][h]).toFixed(2);
									}
							break;

							case "issuebudget":
									var cell = row.insertCell(i);
									if(tableArray2[10][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[10][h]).toFixed(2);
									}
									else if(tableArray2[10][h]>-2 && tableArray2[10][h]<2)
									{
										cell.innerHTML = "Issue Neutral";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[10][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Liked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[10][h]).toFixed(2);
									}
							break;


							case "issuefunctions":
									var cell = row.insertCell(i);
									if(tableArray2[12][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[12][h]).toFixed(2);
									}
									else if(tableArray2[12][h]>-2 && tableArray2[12][h]<2)
									{
										cell.innerHTML = "Issue Neutral";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[12][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Liked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[12][h]).toFixed(2);
									}
							break;

							case "issuemedical":
									var cell = row.insertCell(i);
									if(tableArray2[13][h] <= -2)
									{
										cell.innerHTML = "Issue Disliked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[13][h]).toFixed(2);
									}
									else if(tableArray2[13][h]>-2 && tableArray2[13][h]<2)
									{
										cell.innerHTML = "Issue Neutral";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[13][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Issue Liked";
										cell.innerHTML += "Score: " + parseFloat(tableArray2[13][h]).toFixed(2);
									}
							break;
						}
					}
				}


				canCounter = 14;

				for(var k = 1;k<globals.candidates.length;k++)
				{
					if(pollChoices[i] == "candFame" + globals.candidates[k].name)
					{
								var cell = row.insertCell(i);
								var counter = canCounter;
									if(parseFloat(tableArray2[counter][h]).toFixed(2) <= 0.33)
									{
										cell.innerHTML = "Candidate Unknown";
										cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.33 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.66)
									{
										cell.innerHTML = "Aware of Candidate";
										cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
									else
									{
										cell.innerHTML = "Candidate Known:";
										cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
									}
					}
						canCounter++;
				}
				for(var k = 1;k<globals.candidates.length;k++)
				{
					if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
					{
								var cell = row.insertCell(i);
								var counter = canCounter;
								if(parseFloat(tableArray2[counter][h]).toFixed(2) >= 0.66)
								{
									cell.innerHTML = "Not Trustworthy";
										cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else if(parseFloat(tableArray2[counter][h]).toFixed(2)>0.33 && parseFloat(tableArray2[counter][h]).toFixed(2)<0.66)
								{
									cell.innerHTML = "Sort Of Trustworthy";
										cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}
								else
								{
									cell.innerHTML = "Very Trustworthy";
										cell.innerHTML += "Score: "  + parseFloat(tableArray2[counter][h]).toFixed(2);
								}		
					}

					canCounter++;

				}
			}
		}

		var cell = row.insertCell(0);
		cell.innerHTML = tableArray2[4][h];

		//var cell = row.insertCell(1);
		//cell.innerHTML = tableArray2[5][h];

		var cell = row.insertCell(1);
		cell.innerHTML = tableArray2[6][h];
	}
	
	
	sorttable.makeSortable(document.getElementById('tab'));
	document.getElementById("next").innerHTML += "<div id = 'filterArea'></div>"
	document.getElementById("centerDisplay").innerHTML += "<div id = 'barChartDiv' style = 'display:block'></div>";
	document.getElementById("centerDisplay").innerHTML += "<div id = 'pieChartDiv' style = 'display:none'></div>";
	document.getElementById("next").innerHTML += "<button id = 'dataButton' onclick = 'changeData(1)'>Show Data Table</button>";
	document.getElementById("next").innerHTML += "<button id = 'barButton' onclick = 'changeData(2)' style = 'display:none'>Show Bar Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'pieButton' onclick = 'changeData(3)'>Show Pie Graphs</button><br>";
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
	
	////console.log(graphQuestions);
	for(var u =0; u < graphQuestions.length; u++){		
		document.getElementById("q"+u+"text").innerHTML = "";
	}


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
			for(var k = 1;k<globals.candidates.length;k++)
			{
				if(graphQuestions[i] == "candFame" + globals.candidates[k].name)
				{
					name = globals.candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = globals.questions[10].question + " " + name;
					document.getElementById("bq"+i+"text").innerHTML = globals.questions[10].question + " " + name;
				}
			}

			for(var k = 1;k<globals.candidates.length;k++)
			{
				if(graphQuestions[i] == "candTrust" + globals.candidates[k].name)
				{
					name = globals.candidates[k].name;
					document.getElementById("q"+i+"text").innerHTML = globals.questions[11].question + " " + name;
					document.getElementById("bq"+i+"text").innerHTML = globals.questions[11].question + " " + name;
				}
			}
		}
		
		////console.log("Question "+graphQuestions[i] + " has a length of: " + graphData[i].length);
		////console.log(graphData[questionNum]);
        
        //GRAPH DATA BUG: for stefen
        for (var j = 0; j < graphData[i].length; j++)
        {
			////console.log(globals.graphData[questionNum], " AT ", questions[qID].question)					
			data2[j]=graphData[i][j];
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
			////console.log(zid);
			dataCounter++;
	
			return zid; 
		});
        
        var dataset =  [];
        for (var k = 0; k < graphData[i].length; k++)
        {	
			//console.log(graphLabels);
			//console.log(graphData);
			if(graphLabels[i][k] != "undefined-NaN")
            dataset.push ({label: graphLabels[i][k], count: graphData[i][k]})
		}
        //console.log(dataset)
        
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
        
        function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
        } 
	}
	
		//if(state == POLL_STATES.FIRST)
		//{
		//	globals.candidates.splice(0,1);
		//}
	document.getElementById('table').style.display = 'none';
	if (state == POLL_STATES.TUTORIAL){
        document.getElementById('eventInfo').innerHTML += "<button onclick = 'drawPoll("+state+",false, true)'>Back to Start</button>" ;
	}
	if(!isFake)
	{
		globals.pastPollResults.push(tableArray2);
		globals.pastPollSizes.push(sSize);
		globals.pastPollChoices.push(pollChoices);
		globals.pastGraphData.push(graphData);
		globals.pastGraphLabels.push(graphLabels);
		globals.tableArrays = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]];
		if(!isFree)
			pollTime(sSize, pollChoices);
	}
    else{
      //Result the fake data back to normal
      globals.candidates = globals.currentCandidateArrayHolder;
    }

}

//Changes the way that data is represented on the poll results screen
function changeData(dataButton)
{
	if(dataButton == 1){
		document.getElementById('table').style.display = 'block';
		document.getElementById('filterArea').style.display = 'block';
		document.getElementById('pieChartDiv').style.display = 'none';
		document.getElementById('barChartDiv').style.display = 'none';
		document.getElementById('pieButton').style.display = 'inline';
		document.getElementById('barButton').style.display = 'inline';
		document.getElementById('dataButton').style.display = 'none';
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
	}
}

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

function backtoUA()
{
	globals.back = true;

	userAction();
}

function saveGameState()
{
	globals.textContents="";
   //Save contents of globals.pastPollChoices into the text file
	for(var i=0; i<globals.pastPollChoices.length;i++)
	{
		for(var j=0; j<globals.pastPollChoices[i].length;j++)
		{
				globals.textContents+= globals.pastPollChoices[i][j];
				if(j!=globals.pastPollChoices[i].length-1)
				globals.textContents+="*";
		}
		if(i!=globals.pastPollChoices.length-1)
			globals.textContents+="_";
	}
	globals.textContents+="~";
    //Save contents of globals.pastPollResults into the text file
	for(var i=0; i<globals.pastPollResults.length;i++)
	{
		for(var j=0; j<globals.pastPollResults[i].length;j++)
		{
			globals.textContents+= globals.pastPollResults[i][j];
				if(j!=globals.pastPollResults[i].length-1)
				globals.textContents+="*";
		}
		if(i!=globals.pastPollResults.length-1)
			globals.textContents+="_";
	}
	globals.textContents+="~";

	// Save contents of globals.pastPollSizes   into the text file
	for(var i=0; i<globals.pastPollSizes.length;i++)
	{
		globals.textContents+=globals.pastPollSizes[i];
			if(i!=globals.pastPollSizes.length-1)
				globals.textContents+="*";
	}
	globals.textContents+="~";
	//Save globals.candidates array
	for(var i=0; i<globals.candidates.length;i++)
	{
		globals.textContents+=globals.candidates[i].name;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].fame;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].issueScore;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].consMod;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].focus;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].focusnum;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].winChance;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].votes;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].correctAnswers;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].wrongAnswers;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].lastMove;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].raceNum;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].genderNum;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].bodyTypeNum;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].headNum;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].tuitPos;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].tuitNeg;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].budPos;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].budNeg;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].resPos;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].resNeg;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].medPos;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].medNeg;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].funcPos;
			globals.textContents+="*";
		globals.textContents+=globals.candidates[i].funcNeg;

			if(i!=globals.candidates.length-1)
				globals.textContents+="_";
	}
	globals.textContents+="~";

	//Save globals.remainingHoursTotal
	globals.textContents+=globals.remainingHoursTotal;
	globals.textContents+="~";

	//save graph data
	for (var z =0; z < globals.pastGraphData.length; z++){
		if(z !=0){
			globals.textContents+="_";
		}
		for(var a = 0; a < globals.pastGraphData[z].length;a++){
			globals.textContents+=globals.pastGraphData[z][a];
			if(a != globals.pastGraphData[z].length -1){
				globals.textContents+="*";
			}
		}
	}
	globals.textContents+="~";

	//Save contents of globals.pastGraphLabels into the text file
	for(var i=0; i<globals.pastGraphLabels.length;i++)
	{
		for(var j=0; j<globals.pastGraphLabels[i].length;j++)
		{
			globals.textContents+= globals.pastGraphLabels[i][j];
				if(j!=globals.pastGraphLabels[i].length-1)
				globals.textContents+="*";
		}
		if(i!=globals.pastGraphLabels.length-1)
			globals.textContents+="_";
	}
	////console.log(globals.pastGraphLabels);
	globals.textContents+="~";
	
	//Save globals.remainingHoursDay
	globals.textContents+=globals.remainingHoursDay;
	globals.textContents+="~";
	
	//Save days
	globals.textContents+=globals.days;
	globals.textContents+="~";
    
	//Save GameSession
	globals.textContents+=globals.gameSession;
	globals.textContents+="~";
    
	//Save GameOver
	globals.textContents+=globals.gameOver.toString();
	globals.textContents+="~";
    
	//Saves Total Number of Days
	globals.textContents+=globals.totalDays;
	globals.textContents+="~";
	
	//Save FIrstPoll
	globals.textContents+=globals.firstPoll.toString();
	globals.textContents+="~";
	
	//Save FIrstState
	globals.textContents+=globals.firstState.toString();
	globals.textContents+="~";
	
	//post all that information
	$.post('/game/saver', {saveData: globals.textContents});
    
    
}

function loadGame()
{
	//Takes the Whole data and splits it into sections
	var saveArray = saveState.split("~");
	////console.log(saveArray);
	
	//Past Poll Choices Section
	if(saveArray[0] != [])
	{
		var ppcOuterArray = saveArray[0].split("_");
		for(var i =0; i < ppcOuterArray.length; i++)
		{
			globals.pastPollChoices.push(ppcOuterArray[i].split("*"));
		}
	}

	// Past Poll Results Section
	if(saveArray[1] != [])
	{
		var pprOuterArray = saveArray[1].split("_");
		for(var i =0; i < pprOuterArray.length; i++)
		{
			var pprResults =[];
			var tempResults = pprOuterArray[i].split("*");
			for(var j = 0; j< tempResults.length; j++)
			{
				if(tempResults[j] != "")
				{
					var currentResults = tempResults[j].split(",");
					pprResults.push(currentResults);
				}
				else
				{
					pprResults.push([]);
				}
			}
			globals.pastPollResults.push(pprResults);
		}
	}

	//Past Poll Sizes Section
	if(saveArray[2] != [])
	{
		var ppsArray = saveArray[2].split("_");
		globals.pastPollSizes = ppsArray[0].split("*");
	}

	//Candidates Section
	var candArray = saveArray[3].split("_");
	var candAtts=[];
	for( var i= 0; i < candArray.length; i++)
	{
		candAtts.push(candArray[i].split("*"));
	}
	for( var i= 0; i < candAtts.length; i++)
	{
		var cand = new CandidateCreate(candAtts[i][0]);
		var tempfame = candAtts[i][1].split(",");
		cand.fame =[];
		for(var j =0; j< tempfame.length; j++)
		{
			cand.fame.push(parseFloat(tempfame[j]));
		}
		cand.issueScore = candAtts[i][2].split(",");		
		var tempissue = candAtts[i][2].split(",");
		cand.issueScore =[];
		for(var j =0; j< tempissue.length; j++)
		{
			cand.issueScore.push(parseFloat(tempissue[j]));
		}
		cand.consMod = parseFloat(candAtts[i][3]);
		cand.focus = candAtts[i][4];
		cand.focusnum = parseInt(candAtts[i][5]);
		cand.winChance = parseInt(candAtts[i][6]);
		cand.votes = parseInt(candAtts[i][7]);
		cand.correctAnswers = parseInt(candAtts[i][8]);
		cand.wrongAnswers = parseInt(candAtts[i][9]);
		cand.lastMove = candAtts[i][10];
		cand.raceNum = parseInt(candAtts[i][11]);
		cand.genderNum = parseInt(candAtts[i][12]);
		cand.bodyTypeNum = parseInt(candAtts[i][13]);
		cand.headNum = parseInt(candAtts[i][14]);
		cand.tuitPos = parseInt(candAtts[i][15]);
		cand.tuitNeg = parseInt(candAtts[i][16]);
		cand.budPos = parseInt(candAtts[i][17]);
		cand.budNeg = parseInt(candAtts[i][18]);
		cand.resPos = parseInt(candAtts[i][19]);
		cand.resNeg = parseInt(candAtts[i][20]);
		cand.medPos = parseInt(candAtts[i][21]);
		cand.medNeg = parseInt(candAtts[i][22]);
		cand.funcPos = parseInt(candAtts[i][23]);
		cand.funcNeg = parseInt(candAtts[i][24]);



		globals.candidates.push(cand);
	}
    

    //Set the currentCandidateArrayHolder to the right data
    globals.currentCandidateArrayHolder = globals.candidates;
    
    //Set player candidate
    globals.playerCandidate = globals.candidates[0];

	//console.log(candAtts);

	//Remaining Hours Section
	globals.remainingHoursTotal = parseInt(saveArray[4]);

	//past graph saveData

	var graph = [];
	var multiGraphData = saveArray[5].split("_");
	////console.log(multiGraphData);
	for(var z = 0; z < multiGraphData.length; z++){
		var questionData = multiGraphData[z].split("*");
		////console.log(questionData);
		for(var y = 0; y < questionData.length; y++){
			var holderHolder = questionData[y].split(",")
			var holdArray = [];
			for(var x = 0; x < holderHolder.length; x++){
				holdArray[x] = parseFloat(holderHolder[x]);
			}
		graph.push(holdArray);
		}
		////console.log(graph);
	globals.pastGraphData.push(graph);	
	graph = [];
	}

	// Past Graph Labels Section
	if(saveArray[6] != [])
	{
		var pglOuterArray = saveArray[6].split("_");
		for(var i =0; i < pglOuterArray.length; i++)
		{
			var pglResults =[];
			var tempResults = pglOuterArray[i].split("*");
			for(var j = 0; j< tempResults.length; j++)
			{
				if(tempResults[j] != "")
				{
					var currentResults = tempResults[j].split(",");
					pglResults.push(currentResults);
				}
				else
				{
					pglResults.push([]);
				}
			}
			globals.pastGraphLabels.push(pglResults);
			////console.log(pglResults);
		}
	}

	//Remaining Hours in the Day Section
	globals.remainingHoursDay = parseInt(saveArray[7]);
	
	//Current Day Section
	globals.days = parseInt(saveArray[8]);
    
	//Game Session Number
	globals.gameSession = parseInt(saveArray[9]);

    
	//Game Over Boolean
	if(saveArray[10] == "true")
    {
        globals.gameOver = true;
    }
    else
    {
        globals.gameOver = false;
    }
	
	//Total Number of Days
	globals.totalDays = parseInt(saveArray[11]);
	
	//Whether the First poll has been passed
	if(saveArray[12] == "true")
    {
        globals.firstPoll = true;
    }
    else
    {
        globals.firstPoll = false;
    }
	
	//Whether the First statement has been passed
	if(saveArray[13] == "true")
    {
        globals.firstState = true;
    }
    else
    {
        globals.firstState = false;
    }
    
	globals.back=true;
	saveState = "";
    preload(globals.events);
  
    
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
  
    //Create player Image
    headSheet = new Sprite({context: ctx, width: 155, height: 171, image: globals.heads});
	bodySheet = new Sprite({context: ctx, width: 164, height: 343, image: globals.thinBody});

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);
  
    globals.playerImg = canvas.toDataURL("image/png");
    globals.inGame = true;
	if(globals.firstPoll)
	{
		bufferZone();
	}
	else if(globals.firstState)
	{
		firstStatement();
	}
	else{userAction();}

}

//Updates the Game Session
function getSession(gameOver)
{
	//Takes the Whole data and splits it into sections
	var saveArray = saveState.split("~");
	//console.log(saveArray[9])
	//console.log(saveArray[9] !=[] && saveArray[9] != "NaN" && saveArray[9] != undefined && saveArray[9] != "")

	if(!globals.gameOver){
    	//console.log(saveArray[9] == "NaN")
    	if(saveArray[9] !=[] && saveArray[9] != "NaN" && saveArray[9] != undefined && saveArray[9] != "")
    	{
        	globals.gameSession = parseInt(saveArray[9]) + 1;
        	globals.gameOver = false;
        	globals.endReset = false;
    	}
    	else
    	{
        	globals.gameSession = 0;
        	globals.gameOver = false;
        	globals.endReset = false;
    	}
	}
    
}
/* Back Button Prevention code */

//Chooses what issue each candidate represents
function chooseIssue(candidate, chosenIssues, issueVal, issueCand)
{
	var counter;
	globals.oppChoice=[0,1,2,3];

	for(var i =0; i <chosenIssues.length;i++)
	{
		globals.oppChoice.splice(globals.oppChoice.indexOf(chosenIssues[i]),1);
	}


	//Decides the opponents focus which cannot be the same as the player
	var oppFocus = Math.floor(Math.random()*(4-chosenIssues.length));
	candidate.focus = globals.positions[globals.oppChoice[oppFocus]];
	candidate.focusnum = globals.oppChoice[oppFocus];
	switch(globals.oppChoice[oppFocus])
	{
		case 0:
		candidate.issueScore[0]=issueVal;
		break;
		case 1:
		candidate.issueScore[1]=issueVal;
		break;
		case 2:
		candidate.issueScore[2]=issueVal;
		break;
		case 3:
		candidate.issueScore[3]=issueVal;
		break;
	}

	if(issueCand)
	{
		globals.chosenCandRanks.push(globals.oppChoice[oppFocus]);
	}
}

//Chooses how well the candidate ranks
function chooseRank(candidate, chosenRanks, issueCand)
{
	var counter;
	globals.oppChoice=[0,1,2,3];
	
	for(var i =0; i <chosenRanks.length;i++)
	{
		globals.oppChoice.splice(globals.oppChoice.indexOf(chosenRanks[i]),1);
	}
	
	
	//Decides the opponents focus which cannot be the same as the player
	var oppRank = Math.floor(Math.random()*(4-chosenRanks.length));
    
  
	switch(globals.oppChoice[oppRank])
	{
		case 0:
			candidate.fame = [1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6];
			candidate.consMod = 0.25;
			candidate.issueScore[candidate.focusnum] = 3;
		break;
		case 1:
			candidate.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
			candidate.consMod = 0.30;
			candidate.issueScore[candidate.focusnum] = 2.75;
		break;
		case 2:
			candidate.fame = [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];
			candidate.consMod = 0.35;
			candidate.issueScore[candidate.focusnum] = 2.5;
		break;
		case 3:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.45;
			candidate.issueScore[candidate.focusnum] = 2.5;
		break;
		case 4:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.50;
			candidate.issueScore[candidate.focusnum] = 2.25;
		break;
	}
	
	if(issueCand)
	{
		chosenRanks.push(globals.oppChoice[oppRank]);
	}
}

//Gets the posiiton of the mouse relative to the canvas
function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
	x: evt.clientX - rect.left,
	y: evt.clientY - rect.top
	};
}

//Shows the results of a minigame after it's completed
function gameResults(scores, tutorial)
{
	clearScreen();
	var scoreToLog = scores.score;

	if(!tutorial)
	{
		globals.remainingHoursTotal-=1;
		globals.remainingHoursDay-=1;
		var pos = chosenEvent.groupPos.split(',');
		//console.log(pos);
		var posText =  "<h4>You completed the minigame with a score of "+scores.score+" <br>You increased your popularity with these groups: ";
		for (var i =0; i< pos.length;i++){
			switch(pos[i])
			{
		
				case "Arts":
					posText += "Arts Major";
				break;
		
				case "Bus":
					posText += "Business Major";
				break;
				case "Law":
					posText += "Law Major";
				break;
				case "Tech":
					posText += "Technology Major";
				break;
		
				case "Soc":
					posText += "Socialite Group";
		
				break;
				case "Read":
					posText += "Reader Group";
		
				break;
				case "Gam":
					posText += "Gamer Group";
		
				break;
				case "Ath":
					posText += "Athlete Group";
		
				break;
			}
			if(i != pos.length-1)
			{
				posText += ", ";
			}
			else{
				posText += " ";
			}
		}
		if(scores.score <= scores.tier1)
		{			
			document.getElementById("eventInfo").innerHTML = posText;
			document.getElementById("eventInfo").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			scoreChanger(globals.candidates[0], 0.1,pos,[]);
		}
		else if(scores.score <= scores.tier2 && scores.score >scores.tier1)
		{
			document.getElementById("eventInfo").innerHTML = posText;
			document.getElementById("eventInfo").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			scoreChanger(globals.candidates[0], 0.2,pos,[]);
		}
		else if(scores.score <= scores.tier3 && scores.score >scores.tier2)
		{
			document.getElementById("eventInfo").innerHTML = posText;
			document.getElementById("eventInfo").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			scoreChanger(globals.candidates[0], 0.3,pos,[]);
		}
		else if(scores.score > scores.tier3)
		{
			if( scores.score> scores.tier4)
				scores.score = scores.tier4;
			var x = .3 + (.01*(scores.score-scores.tier3));
			x = x.toFixed(2);
			document.getElementById("eventInfo").innerHTML = posText;
			document.getElementById("eventInfo").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			scoreChanger(globals.candidates[0], x,pos,[]);
		}
		else{
			document.getElementById("eventInfo").innerHTML = posText;
			document.getElementById("eventInfo").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			scoreChanger(globals.candidates[0], (scores * .1),pos,[]);
		}
		
			saveGameState();
     	$.post('/game/loggerMinigame', {minigameID: globals.lastMinigame, score: scoreToLog, module: '1', session: globals.gameSession });
			document.getElementById("next").innerHTML += "<button onclick = 'userAction()'> Return to the Game Map </button>";
	}
	else
	{
		var posText =  "<h4>You completed the minigame with a score of "+ (scores.score) + ". <br>If you had trouble with this minigame you can replay it to practice in the help menu without using your time.</h4>"; 
		document.getElementById("eventInfo").innerHTML = posText;
		document.getElementById("eventInfo").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
		if(globals.inGame)
		{
					document.getElementById("next").innerHTML += "<button onclick = 'helpScreen(userAction)'> Return to the Practice Screen </button>";
		}
		else
		document.getElementById("next").innerHTML += "<button onclick = 'startPractice()'> Return to the Practice Screen </button>";
	}
}

//Creates a trend report based on past polls
function trendReporter(category)
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
        tempGraphData = [];
        globals.pastGraphData[i].forEach(function(e)
        {
            tempGraphData.push(e);
        
        });
        //removes the first 2 answers from each pastGraph data
        tempGraphData.splice(0,2);
        
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
                            	//console.log(answers);
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

                    switch(k)
                    {
                        case 0:
                        data0.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
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
                        data1.push(
                        {
                            count: (tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                     
                        break;
                        case 2:
                        data2.push(
                        {
                            count: (tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                       
                        break;
                        case 3:
                        data3.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                     
                        break;
                        case 4:
                        data4.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 5:
                        data5.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
                            poll: i,
                            key: answers[k]
                        });
                        break;
                        case 6:
                        data6.push(
                        {
                            count:(tempGraphData[j][k]/tempGraphTotal) * 100,
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
        //console.log(data5)
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

//Checks whether or not the time is up in a day and if so advances it.
function hourChecker()
{

	if (globals.days < globals.totalDays)
	{

		if(globals.remainingHoursDay < 1)
		{
			globals.days++;
			globals.remainingHoursDay = 12;
			dayPollBuffer();
		}
		else
		{
			saveGameState();
            return true;
            
		}
	}
	else
	{
		if(globals.remainingHoursTotal<1)
		{
			gameCycleEnd();
		}
		else
		{
			saveGameState();
            return true;
		}
	}
  return false;
}

function dayPollBuffer()
{
	clearScreen();

    document.getElementById("centerDisplay").innerHTML += "<h1>End of Day Poll</h1> <br><p>Phew! After a hard day of campaigning the current electoral office will conduct a poll for each candidate. <br>You just have to fill out the questions and decide how many people they'll talk to.<br> It wont take any time on our part!</p>";
    document.getElementById("centerDisplay").innerHTML += "<button onclick='drawPoll("+POLL_STATES.END_OF_DAY+",true, false)'>Take Your End of Day Poll</button>";
}
//window.onload = startGame();

/* Console Disabling Code */

//Disable Console Logging
//window.//console.log = function(){
//    console.error('The ability to view the console is disabled for security purposes.');
//    window.//console.log = function() {
//        return false;
//    }
//}

//Disable Console Funntions
Object.defineProperty(window, "console", {
    value: console,
    writable: false,
    configurable: false
});

var i = 0;
function showWarningAndThrow() {
    if (!i) {
        setTimeout(function () {
            //console.log("%cWarning message", "font: 2em sans-serif; color: yellow; background-color: red;");
        }, 1);
        i = 1;
    }
    throw "Console is disabled";
}

var l, n = {
        set: function (o) {
            l = o;
        },
        get: function () {
            showWarningAndThrow();
            return l;
        }
    };
Object.defineProperty(console, "_commandLineAPI", n);
Object.defineProperty(console, "__commandLineAPI", n);
