
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

function GameObject(){
  this.currentCandidates = [];
  this.graphData = [];
  this.days = 0;
  this.totalDays = 0;
  this.remainingHoursDay = 0;
  this.remainingHoursTotal = 0;
  
  this.gameSession = globals.gameSession;
  this.firstPoll = globals.firstPoll;
  this.firstState = globals.firstState;
  this.gameOver = globals.gameOver;

  this.candidates = globals.candidates;
  this.pastPollChoices = globals.pastPollChoices;
  this.pastPollResults = globals.pastPollResults;
  this.pastPollSizes = globals.pastPollSizes;
  this.pastGraphData = globals.pastGraphData;
  this.pastGraphLabels = globals.pastGraphLabels;
  this.studentBiases = globals.studentBiases;
  this.studentTypes = globals.studentTypes;
}

//starts the game
function startGame()
{
    globals.playerCandidate= new Candidate("ph");
    globals.opponentCandidate= new Candidate("Karma");
    fakeCandidateYou = new Candidate('Candidate1');
    fakeCandidateOther = new Candidate('Candidate2');
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
    
    preloadEventImages(globals.events);
    //preloadUI();  
  
    createAreas();
    createTutorialPages();
    
    loadViews(50);
    preloadImages(54);
    generateStudentBiases();
}

function resetGame(){
  
}

function BiasDistribution(mean, stdDeviation){
    this.mean = mean;
    this.stdDeviation = stdDeviation;
    if(this.stdDeviation < 0) this.stdDeviation = 0;
}

function StudentType(name, id, type, medical, budget, tuition, functions){
  this.name = name;
  this.id = id;
  this.type = type;
  this.medical = medical;
  this.budget = budget;
  this.tuition = tuition;
  this.functions = functions;
}

function loadGroupBiases(){
  let groupBiases = {};
  groupBiases["business"] = {
    budgetMeanBias: new BiasDistribution(3, .4),
    budgetDeviationBias: new BiasDistribution(2, .5),
    medicalMeanBias: new BiasDistribution(-3, 2),
    medicalDeviationBias: new BiasDistribution(3, .2),
    functionsMeanBias: new BiasDistribution(3, .2),
    functionsDeviationBias: new BiasDistribution(3, 1),
    tuitionMeanBias: new BiasDistribution(1, 2),
    tuitionDeviationBias: new BiasDistribution(1, 1)
  };
  groupBiases["socialite"] = {
    budgetMeanBias: new BiasDistribution(0, .5),
    budgetDeviationBias: new BiasDistribution(3, 1),
    medicalMeanBias: new BiasDistribution(-3, 2),
    medicalDeviationBias: new BiasDistribution(2, 1),
    functionsMeanBias: new BiasDistribution(4, .2),
    functionsDeviationBias: new BiasDistribution(3, 1),
    tuitionMeanBias: new BiasDistribution(3, 2),
    tuitionDeviationBias: new BiasDistribution(3, 1)
  };
  
  return groupBiases;
}

const studentTypes = {};

function getBiasValue(bias, property, defaults, presets){
  //Check if the value is a string aka either a default or a preset
  if(typeof(bias[property]) == "string" ){
    
    //If shortcuts were passed in and the value isn't "default"
    //get that shortcut value from the list
    if(presets && bias[property] != "default"){
      return presets[bias[property]];
    }
    
    //otherwise, return the default value
    //Even if the value wasn't actually "default", returning the default is the best solution
    return defaults[property];
  }
  
  //If it's a normal number, just return that
  return bias[property];
}

//Normal Distribution based off the Box-Muller Transform
function normalDistribution (mu, sigma) {
    var u1 = Math.random();
    var u2 = Math.random();
  
    //U1 will probably never be 0, but it COULD be. 
    //Math.log(0) = infinity, so that would be very bad.
    while(u1 == 0){
      u1 = Math.random();
    }

    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI*2 * u2);
    var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(Math.PI*2 * u2);
  
    /*So basically the issue behind only using z0 or z1 is that Math.Random() doesn't include 1, so if you only use cosine the value is less likely to equal 0. If you only use sine, the value is less likely to equal 1. 
    
    On a unit circle, each cosine/sine value reoccurs twice. Cosine is .8777 at .5 rad and at -.5 rad and 1 at 0 rad and 2PI rad. That second one can't ever happen, since it requires u2 to equal 1. The Box Muller's solution is to change between cosine and sine, so that it lessens the flaw (I'm sure that to some extent, it still exists).
    
    In our implementation, the function is used for a lot of different cases, so using a static flip boolean isn't really a fix. We could pass in a lot of different flip booleans, but that'd be a lot of extra code and doesn't work for some situations. So, we are just doing a coin flip. It's kind of hacksy and is probably secretly biased, but it is unlikely that the minutia of variance and probability will actually affect gameplay.*/
    
    if(Math.floor(Math.random() * 2) == 0){
      return z1 * sigma + mu;
    }
    
    return z0 * sigma + mu;
} 

function generateStudentBiases(){
  let json;
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e){
      json = JSON.parse(this.responseText);
      
      let defaults = json.biasDefaults;
      let meanOfMeanPresets = json.meanOfMeanPresets;
      let deviationOfMeanPresets = json.deviationOfMeanPresets;
      let meanOfDeviationPresets = json.meanOfDeviationPresets;
    
      let studentTypes = json.studentTypes;
      
      for(let i = 0; i < studentTypes.length; i++){
        let name = studentTypes[i].name;
        let id = studentTypes[i].id;
        let type = studentTypes[i].type;

        
        let studentBiases = {};
        let biasValues = studentTypes[i].biases;
        
        for(let j = 0; j < biasValues.length; j++){
          let issue = biasValues[j].issue;
          let meanOfMean = getBiasValue(biasValues[j], "meanOfMean", defaults, meanOfMeanPresets);
          let deviationOfMean = getBiasValue(biasValues[j], "deviationOfMean", defaults, deviationOfMeanPresets);
          let meanOfDeviation = getBiasValue(biasValues[j], "meanOfDeviation", defaults, meanOfDeviationPresets);
          let deviationOfDeviation = getBiasValue(biasValues[j], "deviationOfDeviation", defaults);
          
          let biasMean = normalDistribution(meanOfMean, deviationOfMean);
          let biasDeviation = normalDistribution(meanOfDeviation, deviationOfDeviation);
          studentBiases[issue] = new BiasDistribution(biasMean, biasDeviation);
        }
        globals.studentTypes[id] = new StudentType(name, id, type, studentBiases["medical"], studentBiases["budget"], studentBiases["tuition"], studentBiases["functions"]);
        
      }
    
      console.log(globals.studentTypes);
  }
      
    
  oReq.open("get", "json/studentTypes.json", true);
  oReq.send();
}


const views = {
  topBar: "",
  splashScreen: "",
  practice: "",
  help: "",
  tutorial: "",
  trendMenu:"",
  statement:"",
  characterSelect: "",
  takePoll:"",
  userAction: "",
  candidatesHelpPage: "",
  functionsHelpPage: "",
  graphsHelpPage: "",
  mapHelpPage: "",
  minigameHelpPage: "",
  pollHelpPage: "",
  statementsHelpPage: "",
  studentsHelpPage: "",
  trendsHelpPage: "",
  myDataMenu: "",
};
const images = {
  Map: '../../img/map/mapMU600pxW.png',
  CommonsIcon: '../../img/map/icons/CommonsIcon.png',
  GymIcon: '../../img/map/icons/GymIcon.png',
  LabsIcon: '../../img/map/icons/LabsIcon.png',
  LibraryIcon: '../../img/map/icons/LibraryIcon.png',
  QuadIcon: '../../img/map/icons/QuadIcon.png',
  budNeg: '../../img/statement/budNeg.png',
  budPos: '../../img/statement/budPos.png',
  funcPos: '../../img/statement/funcPos.png',
  funcNeg: '../../img/statement/funcNeg.png',
  medNeg: '../../img/statement/medNeg.png',
  medPos: '../../img/statement/medPos.png',
  tuitPos: '../../img/statement/tuitPos.png',
  tuitNeg: '../../img/statement/tuitNeg.png',
  tuitionIcon: '../../img/icons/tuitionIcon.png',
  budgetIcon: '../../img/icons/budgeticon.png',
  medicalIcon: '../../img/icons/medicalIcon.png',
  functionsIcon: '../../img/icons/functionsIcon.png',
  negIcon: '../../img/icons/negIcon.png',
  posIcon: '../../img/icons/posIcon.png',
  statementBackground: '../../img/statement/statementBackground.png',
  statementPodium: '../../img/statement/statementPodium.png',
  emptyIcon: '../../img/menu/emptyICON.png'
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
  Handlebars.registerHelper('ifNotEquals', function(value1, value2, options) {
    if(value1 !== value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  Handlebars.registerHelper('repeat', function(n, block) {
    block.data.index = 0;
    block.data.first = true;
    block.data.last = false;
    let repeated = block.fn(this);
    
    for(var i = 1; i < n; i++){
        block.data.index = i;
        block.data.first = (i === 0);
        block.data.last = (i === (n - 1));
    
        repeated += block.fn(this);
    }
    return repeated;
});
}

function testP(){
  updateLoadBar(10);
}

function setBackToMapBtn(){
  document.getElementById("back").innerHTML = "<button onclick= 'eventMenu()'>Back to Game Map</button>";
}
function setReturnToMapBtn(){
  document.getElementById("next").innerHTML = "<button onclick= 'eventMenu()'>Return to Game Map</button>";
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
  content = "<p>Lets Take a Tour of the school! There are five main places on the Mars U Campus. Each area attracts different people to them.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`mapHelpPage`)'></img>";
  let image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Areas
  title = "Areas - Bias";
  content = "<p>Here is where everybody can be found! <br> Commons: Socialites and Arts Majors <br> Library: Readers and Law Majors<br> Gym: Athletes and Business Majors <br> Labs: Gamers and Technology Majors</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`mapHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates";
  content = "<p>Like in any election you'll have some comptetition. There are five other people running for presisdent at Mars U.</p> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`mapHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates - Issue Candidates";
  content = "<p>There are four candidates who don't do much campaigning. We call them the issue candidates. They're pretty well know and liked around campus so they think they don't need to campaign. Here are the Candidates in there issues. <br>Simon: Improve Medical Services <br> Zrapp: Increase the Budget <br> Boof: Lower Tuition <br> C1AMP: More School Functions</p> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`candidatesHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates - Karma";
  content = "<p>The final candidate also transferred in recently. Karma the Chameleon is very charismatic, but isn't very well known. People like her, but they have noticed that she seems to copy the statements of other candidates.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`candidatesHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Statements and Functions
  title = "Statements and Functions";
  content = "<p>You can win by doing three things: <br>-Statements<br>-Polling<br>-Student Functions <br> You have 12 hours in a day and everything you do takes time.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Statements
  title = "Statements";
  content = "<p>Statements are where you focus on the issues at school. Statements can change the way people feel about the issues. They also tell the population how you feel about the issues.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Statements
  title = "Statements - Continued";
  content = "<p>People are more likely to vote for you if they agree with you on the issues. Be sure to stick to one stance on each issue, because people won't like it if they can't trust you. Statements take an hour to prepare and perform.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Issues
  title = "Issues";
  image = '../img/issues.png';
  content = "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, image));

  //Student Functions
  title = "Student Functions";
  content = "<p>Student Functions are how you get to know the population. Becoming more famous among groups to help get you elected.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`functionsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Student Functions
  title = "Student Functions";
  content = "<p>Functions take a couple hours to set up and you can add an option to that if you like, but it will take an extra hour. Functions can't be held in the quad according to the Univerity Guidelines.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`functionsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Population - Majors
  title = "Population - Majors";
  image = '../img/majors.png';
  content = "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`studentsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Population - Social Groups
  title = "Population - Social Groups";
  image = '../img/interests.png';
  content = "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`studentsHelpPage`)'></img>"
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Polling
  title = "Polling";
  content = "<p>With polls you can see how the populations around the school feel about the candidates, and issues. You take polls in different areas which will have different biases.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`pollHelpPage`)'></img>";
  image = '../img/menu/takeapollicon.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Polling
  title = "Polling - Continued";
  content = "<p> Polls take time to conduct, but the current student government will conduct one for you at the end of each day. These will help you see your effect on the population.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`pollHelpPage`)'></img>";
  image = '../img/menu/takeapollicon.png';
  tutorialPages.push(new TutorialPage(title, content, image));
		
  //Polling Results
  title = "Polling Results";
  content = "<p>After you  take a poll you are given the results from a sample of students. By looking at these results you can determine what moves you should make next. Poll Results can be viewed in 3 ways: Bar Graphs, Pie Graphs and a Table.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Results
  title = "Polling Results - Graphs";
  content = "<p> The Bar and Pie Graphs are for looking at more general data. Each Graph is attributed to a question. There you can see how many students answered each result in a question.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Results
  title = "Polling Results - Table";
  content = "<p> The table is for when you want specific data. In the table you can see how each person who took the sample responded to all the questions. You can even filter by majors, or social groups. So if you only want results from athletes then you can just view those.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Reports
  title = "Old Polling Reports";
  content = "<p>Poll Results are saved for you after you take them so you can go back and view them at the poll menu whenever you like.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Trend Reports
  title = "Trend Reports"
  content = "<p>If you ask the same question more than once, it will appear on the trend report. A place where you can see the summary of all the graphs for that question. This is great for looking quickly at how public opinion has changed. </p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`trendsHelpPage`)'></img>";
  image = '../img/menu/trendreport.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Help Pages
  title = "Help Pages"
  content = "<p>You can return here later or use the help button displayed above to open the help page related to the page you are currently on. From that page you can navigate through the help menu to any other help page or return to the page you were on. I've created when you have questions. </p>";
  image = '../img/menu/QuestionICON.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Practice Area
  title = "Practice Area";
  content = "<p>After this tutorial you will enter a practice polling area where you can create polls and look at polling results. Try it out, but remember, the data does not represent the actual students or candidates. You can start your election or return to the tutorial at any time.</p>";
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


function preloadEventImages(actions) {
	for (let i = 1; i < actions.length; i++) {
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
    this.events = [];
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
    var context = { "totalDays" : globals.totalDays, "dayCycle" : dayCycleIndex, "remainingHours":globals.remainingHoursDay, "playerHeadImg": images["playerHeadImg"]};
    var html = views["topBar"](context);
  
    //$("#templateTest").append(html);
    document.getElementById("playerInfo").innerHTML = html;
  
    //Putting onclick event at the bottom because it won't load otherwise
    document.getElementById("helpIcon").onclick = function(){
      ////CONSOLE.LOG("check help");
      helpScreen(currentScreen);
      
    }
    
    document.getElementById('topBar').style.display = "inline-flex";
}

/*GAME INTRO FUNCTIONS8*/
function mainMenu()
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
	document.getElementById("centerDisplay").innerHTML = "<h2>Welcome to Mars University! </h2> ";
    document.getElementById("centerDisplay").innerHTML += "<center><video id = 'animatic' width='880' height='500' preload='auto' autoplay controls><source src='media/video/MascotAnimaticNEW.mov' type='video/mp4' ></video><br><button onclick = 'startCharacterSelect()'>Skip</button><center>";
    //document.getElementById("centerDisplay").innerHTML += "</br> <a onclick = 'startCharacterSelect()' class = 'btn double remove'>Continue After Animatic Finish</a>";
    
    //Starts the character select after the animatic finishes
    document.getElementById('animatic').addEventListener('ended',myHandler,false);

    function myHandler(e) {
        startCharacterSelect();
    }

  
}

function practiceMenu()
{
    // Shows the practice screen menu
	clearScreen();
	globals.practice = true;
    
    //Generate biases for this practice session
    generateStudentBiases();
  
	document.getElementById("centerDisplay").innerHTML = views["practice"]({}); 

}

function helpScreen(previousScreen)
{
	globals.practice = true;
    //Shows the Help screen 
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
    //Show the top bar
    document.getElementById('topBar').style.display = "inline-flex";
  
	globals.section = 1;
    
    document.getElementById("mainContent").innerHTML = views["help"]({});
    document.getElementById("back").innerHTML = "<button class = 'logHelp' id='helpBack' class = 'logHelpEnd'>Exit </button>";
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

function pollMenu()
{
    //Shows the Poll Menu
    clearScreen();
    updateTopBar(pollMenu);
    hourChecker();
  
    document.getElementById("mainContent").classList.add("center");
  
    if(globals.remainingHoursDay >=3)
    {
        document.getElementById("mainContent").innerHTML += "<h2> Poll a Sample of the Population</h2> <button type='button' class='primaryBtn' onclick='drawPoll("+POLL_STATES.IN_GAME+", false, false)'> Take A Poll </button><br><br>";
        if(globals.pastPollResults.length > 0)
            document.getElementById("mainContent").innerHTML += "<h2> Previous Poll Results</h2>";
    }
    else
    {
        document.getElementById("mainContent").innerHTML += "<h2> Poll</h2> <button type='button' > Cannot Take a Poll </button> ";
        if(globals.pastPollResults.length > 0)
            document.getElementById("mainContent").innerHTML += "<h2> Previous Poll Results</h2>";
    }
    
    //Adds buttons for each poll that has been taken already
	for(var i=0; i<globals.pastPollResults.length;i++)
	{
		globals.num = i+1;
		document.getElementById("mainContent").innerHTML += "<button class='otherBtn' onclick='viewPollResult("+i+")' >View Poll "+ globals.num +" Result </button>";
    }
	document.getElementById("mainContent").innerHTML += "<br>";
	document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`pollHelpPage`)' ></img>";

    setBackToMapBtn();
}
function trendReportMenu()
{
    //Sets up the trend report menu
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
    updateTopBar(trendReportMenu);
    hourChecker();
    
    document.getElementById("mainContent").innerHTML = views["trendMenu"]({"candidates": globals.candidates});
    
	var currentTrendReports = [];


     document.getElementById("mainContent").innerHTML += "</div><br> <div id = 'trendArea' style = 'display:none'> <svg id='visualisation' width='800' height='450'><path id='segments-line' /><path id='gap-line' /><text font-family='sans-serif' font-size='20px'>Blah</text></svg> </div>";
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
   	 document.getElementById("mainContent").innerHTML += "<br>"
     document.getElementById("mainContent").innerHTML += "<button id ='buttonViewer' style = 'display:none'>Choose Another Trend Report</button>";
     document.getElementById("back").innerHTML += "<button onclick= 'eventMenu()'>Back to Game Map</button>";
	 document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`trendHelpPage`)' ></img>";
}
function myDataMenu()
{
    //Sets up the trend report menu
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
    updateTopBar(myDataMenu);
    hourChecker();
    
    document.getElementById("mainContent").innerHTML = views["myDataMenu"]({"playerImg": images["playerImg"], "player": globals.playerCandidate});
  
}

function chooseHelpPage(page)
{
	//Chooses the passed in page
	document.getElementById("helpContent").innerHTML = views[page]({});
	//Display page after filling it.
	displayHelpPage();
}



function startCharacterSelect(){
    clearScreen();
    
	var prevHours = document.getElementById("playerInfo");
	prevHours.innerHTML = "";
 	getSession(globals.gameOver);
	resetGame();
    
    document.getElementById("centerDisplay").innerHTML = views["characterSelect"]({});
  

	globals.c=document.getElementById("myCanvas");
	//creates a sprite for the headsheets
	headSheet = new Sprite({context: globals.c.getContext("2d"), width: 155, height: 171, image: globals.heads});
	bodySheet = new Sprite({context: globals.c.getContext("2d"), width: 164, height: 343, image: globals.thinBody});

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
function createCharacter(){
	globals.playerCandidate.name = document.getElementById("charName").value;
	globals.playerCandidate.raceNum = headSheet.frameIndexRace;
	globals.playerCandidate.genderNum = bodySheet.frameIndexClothing;
	globals.playerCandidate.bodyTypeNum = bodySheet.bodyArrayHolder;
	globals.playerCandidate.headNum = headSheet.frameIndex;
	globals.playerCandidate.race = globals.lifeformArray[headSheet.frameIndexRace];
	globals.playerCandidate.gender = globals.bodyShapeArray[bodySheet.frameIndexClothing];
	globals.playerCandidate.bodyType = globals.bodyTypeArray[bodySheet.bodyArrayHolder];
  
    generatePlayerImages();
    
    tutorialChoice();
}

//Let the player choose whether to do the tutorial
function tutorialChoice(){
    clearScreen();
    document.getElementById("mainContent").classList.add("center");
    
	document.getElementById("mainContent").innerHTML = "<h1>What's Happening</h1>"
	document.getElementById("mainContent").innerHTML += "<p>You are competing against Karma the Chameleon and 4 other candidates for the position of Student Council President. Karma is new student just like you, they call her the Chameleon, because she copies the people she is running against.... and also because, she is a Chameleon. The current student government will give you, a candidate, some information about the students at MarsU.</p>"
	document.getElementById("mainContent").innerHTML += "<p>Do you wish to start the tutorial?</p>"
	document.getElementById("mainContent").innerHTML += "<div style='display:inline-flex' ><button class='primaryBtn' onclick='tutorial("+false+")'>Yes</button><button class='primaryBtn' onclick='chooseDiff()'>No</button></div>"
}

//Sets the variables for game length and opposing candidates
function initNewGame(isFromTut){

    
	var tutHolder = isFromTut
	clearScreen();
	globals.candidates = [];	
	globals.population = 1000;
	globals.sample = [];
	globals.days = 1; 
	globals.remainingHoursDay = 12; 
    //Generates the student biases for this game
    generateStudentBiases();
	
	//Decides the opponents focus which cannot be the same as the player
    
    opponentFame = (.05 * globals.totalDays);
	globals.opponentCandidate.fame = [1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2];
	globals.opponentCandidate.consMod = 0;
	//////CONSOLE.LOG(oppFocus);
	assignIssue(globals.opponentCandidate,[],1,false);
	globals.candidates.push(globals.opponentCandidate);
	
	//Create Issue Candidates
	var issueCand1 = new Candidate("Boof");
	issueCand1.focus = globals.positions[0];
	issueCand1.focusnum = 0;
	assignRank(issueCand1,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand1);
	var issueCand2 = new Candidate("Zrap Bannigan");
	issueCand2.focus = globals.positions[1];
	issueCand2.focusnum = 1;
	assignRank(issueCand2,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand2);
	var issueCand3 = new Candidate("C1AMP");
	issueCand3.focus = globals.positions[2];
	issueCand3.focusnum = 2;
	assignRank(issueCand3,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand3);
	var issueCand4 = new Candidate("Simon");
	issueCand4.focus = globals.positions[3];
	issueCand4.focusnum = 3;
	assignRank(issueCand4,globals.chosenCandRanks,true);
	globals.candidates.push(issueCand4);	
  
    //Set the currentCandidateArrayHolder to the right data
    globals.currentCandidateArrayHolder = globals.candidates;
  
	//map(0,true,true);
    firstPollInfo();
}
function firstPollInfo()
{
    clearScreen();
    document.getElementById("mainContent").classList.add("center");

    document.getElementById("mainContent").innerHTML += "<h1>First Poll</h1> <br><p>Ready to start your Campaign at Mars U? It's time to get that initial data from the Student Government. Let them know what questions you would like to know the answers to.</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick='drawPoll("+POLL_STATES.FIRST+", true, false)'>Take Your First Poll</button>";
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

//Sets up the buttons for the intital statement the player makes in the game.
function firstStatement()
{
    ////CONSOLE.LOG("first statement");
    
	globals.firstPoll = false;
	saveGame();
	globals.first = false;
	clearScreen();
    document.getElementById("mainContent").classList.add("center");

  
	document.getElementById("mainContent").innerHTML = "<h2>First Positive Statement</h2>"
	document.getElementById("mainContent").innerHTML += "<p>It's Time to Make Your First Statement to the Mars U Population! <br>Pick an Issue Below that You Would Like to Support!</p>"
	for (var x=0; x < globals.positions.length; x++){

	 document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = 'calcFirstStatement("+x+")'>"+ globals.positions[x]+"</button>"
	}
	if(globals.pastPollResults.length !=0)
	{
		document.getElementById("mainContent").innerHTML += "<p>Not Sure on What to Choose? Click Below!</p> <button class='otherBtn' type='button' onclick='viewPollResult(0, true)' >View The Results of the Poll You Just Took </button><br>";
	}
		document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`statementsHelpPage`)' ></img>";

}
//Prompts the player to choose a difficulty setting for the game
function chooseDiff()
{
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
	document.getElementById("mainContent").innerHTML = "<h1>Choose Your Difficulty</h1><br>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = setDiff(9)> Easy</button>";
    document.getElementById("mainContent").innerHTML += "<p> In Easy Mode You Have 9 Days to Win the Election.</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = setDiff(7)> Normal</button>";
    document.getElementById("mainContent").innerHTML += "<p> In Normal Mode You Have 7 Days to Win the Election.</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick = setDiff(5)> Hard</button>";
    document.getElementById("mainContent").innerHTML += "<p> In Hard Mode You Have 5 Days to Win the Election.</p>";
}

//Sets the number of days and time remaining according to the players difficulty choice.
function setDiff(days)
{
    globals.remainingHoursTotal = days*12;
    globals.totalDays = days;
    globals.inGame = true;
    initNewGame(false);
}

/*GAME CYCLE FUNCTIONS8*/
function calcFirstStatement(f)
{
    ////CONSOLE.LOG("calcFirstStatement");
    
    
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
    
	eventMenu();
};

//Add events to the Location choice elements
function addLocationEvents(){
	//Adds events to the cooresponding section based on their effect
	for(var i = 1;i<globals.events.length;i++)
	{
        if(areaChoices[globals.events[i].loc]){
          areaChoices[globals.events[i].loc].events.push(globals.events[i]);
        }
	}
    globals.eventsLoaded = true;
}

//Creates the area in which users decide what to do
function eventMenu()
{
    //document.getElementById("gameContents").innerHTML += "<img src='"+globals.playerImg+"' style='display:none'>"
	if(hourChecker()){
    
    globals.loopable = false;
      globals.practice = false;

      //Make sure users are using the correct candidate data
      //Extra fix for the fake data polling bug
      globals.candidates = globals.currentCandidateArrayHolder;

      //Clear previous screen
      clearScreen();
      
      document.getElementById("contentContainer").classList.add("columns")
	  document.getElementById("mainContent").classList.add("left");
      
      if(!globals.back){
          saveGame();
      }


      //Build Game Map buttons

      
      if(!globals.eventsLoaded){
        addLocationEvents();
      }
      
      document.getElementById("map").innerHTML = "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
      globals.c=document.getElementById("myCanvas");
      globals.ctx = globals.c.getContext("2d");
      globals.ctx.fillStyle = '#FFFFFF'

      //Display Updated Top Bar
      updateTopBar(eventMenu);
      document.getElementById('topBar').style.display = "inline-flex";
      
      let timeLeft = true;
      if(globals.remainingHoursDay == 1){
        timeLeft = false;
      }
      
      let context = {timeLeft: timeLeft, mapAreas: areaChoices};
      document.getElementById("mainContent").innerHTML = views["userAction"](context);
      
      //If the hover isn't set, or if it's set to "Quad"
      if(globals.isCurrentAreaHover < 1){
        globals.isCurrentAreaHover = areaChoices["Commons"].id;
      }
      for(let key in areaChoices){
        if(areaChoices[key].id == globals.isCurrentAreaHover){
          document.getElementById(key+"Choice").style.display = "block";
        }
      }


      globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
      globals.c.onmousedown = doMousedownMap;
      globals.c.onmousemove = doMouseoverMap;


      setupMap(false);
    
    
    document.getElementById("map").style.display = "block";
    document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`mapHelpPage`)' ></img>";

    }
};

function chooseEvent(choice)
{
	//Clear previous screen
	//var choice = $('input[name="actionRadio"]:checked').val();
	if(choice != undefined)
	{
        //Decrement choice to match arrayPos
        choice--;
      
		clearScreen();
		updateTopBar(eventMenu);
	
		var nextArea = document.getElementById("next");
		nextArea.innerHTML = "";
		let chosenEvent = globals.events[choice];
		////CONSOLE.LOG(chosenEvent);
		globals.back = false;
		
      
		if(globals.remainingHoursDay >= chosenEvent.timeRequired)
		{   
            document.getElementById("mainContent").classList.add("left");
            document.getElementById("contentContainer").classList.add("columns");
            document.getElementById("mainContent").innerHTML = "<div id='eventInfo'></div>";
          
			chosenEvent = globals.events[choice];
	
			if(chosenEvent.type=="smallEvent")
			{
				
				document.getElementById("eventImg").innerHTML += "<img src = '' id = 'eventbg' width = '600'   > </img>";
				document.getElementById("eventbg").src = chosenEvent.path;
              
              
				//Creates the screen for the event
				var eventHours = parseInt(chosenEvent.timeRequired);
                document.getElementById("eventInfo").innerHTML += "<h3>" + chosenEvent.name + " </h3>";
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
		document.getElementById("eventInfo").innerHTML += "<br> <button class='logEvent primaryBtn' id='"+choice+"' onclick='submitEvent(" + choice + "," + eventHours + ")' > Perform Event </button><br> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'   onclick = 'chooseHelpPage(`functionsHelpPage`)' ></img>";
		}
		else
		{
			document.getElementById("eventInfo").innerHTML += "<h4> You dont have the enough time left to do the selected action. \n Return to the Game Map to select another action or end the game.</h4>";
		}
		document.getElementById("back").innerHTML += "<button type='button' onclick='eventMenu()' >Back to Game Map</button>";
  
		//Show changes to screen
        document.getElementById("eventImg").style.display = "block";
		}
	else
	{
			document.getElementById("infoText").innerHTML = "<h4>You must select an event first!</h4>";
	}
};

//Subtracts from the remaining hours,
function submitEvent(id, eventHours, Pos, Neg)
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
			calcEventScore(globals.candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
			minigamePlayer(parseInt(loaderNum));
		}
		else
			eventResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
	}
		else
			eventResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects);
}

function eventResults(eventHours, chosenEvent, totalPosEffects, totalNegEffects)
{
	////CONSOLE.LOG(globals.remainingHoursTotal)
	globals.remainingHoursTotal-= eventHours;
	globals.remainingHoursDay-= eventHours;

	globals.candidates[1].lastMove = chosenEvent.name;

	//Changes the player's score
	calcEventScore(globals.candidates[0],chosenEvent.scoreInc, totalPosEffects, totalNegEffects);
	saveGame();
	clearScreen();
    updateTopBar(eventMenu);
    
	document.getElementById("centerDisplay").innerHTML += "<div id= 'evRes'><h2>You Positively Affected Your Fame With These Groups: </h2></div>";
	var posText = ""; 
	for (var i =0; i< totalPosEffects.length;i++)
	{
        let affectedStudents = "";
        let imgName = "";
		switch(totalPosEffects[i])
		{
		    
			case "Arts":
                affectedStudents = "Arts Majors";
                imgName = "artisticon";
			    break;
		
			case "Bus":
                affectedStudents = "Business Majors";
                imgName = "businessicon";
			    break;
			case "Law":
                affectedStudents = "Law Majors";
                imgName = "lawicon";
			    break;
			case "Tech":
                affectedStudents = "Technology Majors";
                imgName = "techicon";
			    break;
			case "Soc":
		        affectedStudents = "Socialites";
                imgName = "socialiteicon";
			    break;
			case "Read":
                affectedStudents = "Readers";
                imgName = "readericon";
			    break;
			case "Gam":
                affectedStudents = "Gamers";
                imgName = "gamericon";
                break;
			case "Ath":
		        affectedStudents = "Athletes";
                imgName = "athleteicon";
			    break;
		}
      
        posText += "<div class='effectsHeader'><h3>"+affectedStudents+"</h3><img width = '30' height='30' src = '../img/icons/"+imgName+".png'></div>";
	}
	document.getElementById("evRes").innerHTML += posText;
    
    let eventImg = new Image();
    eventImg.src = chosenEvent.path;
  
    let playerImg = images["playerImg"];
  
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 338;
    let ctx = tempCanvas.getContext('2d');
    ctx.drawImage(eventImg, 0, 0, 600, 338);
    ctx.drawImage(playerImg, 230, 0);
    
    let finalImg = tempCanvas.toDataURL("image/png");
    
	document.getElementById("centerDisplay").innerHTML += "<img class='resolutionImg' width = '600' src = '"+finalImg+"'> </img>";
  
    document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick= 'eventMenu()'>Return to Game Map</button>";
};

//Ends the game
function endGame()
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
    clearScreen();
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
      
        let lowerLimit = 4;
        let upperStart = 8; 
        if(state == POLL_STATES.FIRST){
          lowerLimit = 4;
          upperStart = 11;
        }
        
		//Populates the questions based on the JSON File

			for(var j = 0; j<globals.questions.length; j++)
			{
              if (j < lowerLimit || j > upperStart)
              {
                  //CONSOLE.LOG("pushing");
                  pollQuestions.push(globals.questions[j]);

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

//Draws lines on the map around the buildings
function setupMap(poll)
{
	globals.isPoll = poll;
    
    document.getElementById("map").innerHTML = "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
    globals.c=document.getElementById("myCanvas");
    globals.ctx = globals.c.getContext("2d");
    
    var mouse = globals.canvasMouse;
	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	globals.c.onmousedown = doMousedownMap;
	globals.c.onmousemove = doMouseoverMap;
    
    drawMapAreas();
    drawMapIcons();

}

    
//Sets the clickable zones on the map for the Game Map
 function doMousedownMap(c,e)
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
                    doMouseoverMap();
                }
            }
        }
    }

//Fills the zone over the building that the mouse if hovering over
	function doMouseoverMap(c,e){


        globals.c=document.getElementById("myCanvas");
        globals.ctx = globals.c.getContext("2d");
		var mouse = globals.canvasMouse;
        ////CONSOLE.LOG(mouse);
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
function statementMenu(){
    
	globals.back = false;
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
    updateTopBar(statementMenu);
    hourChecker();
    
    document.getElementById("mainContent").innerHTML = views["statement"]({"issues":globals.positions});
  
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick='statementCalc()' > Make Statement </button>";
    document.getElementById("back").innerHTML += "<button type='button' onclick='eventMenu()' >Back to Game Map</button>";
	document.getElementById("mainContent").innerHTML += "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`statementsHelpPage`)' ></img>";

}

//Minigame
function minigamePlayer(id){
		//Clear previous screen
	globals.lastMinigame = id;
	clearScreen();

	document.getElementById("centerDisplay").innerHTML += "<div id = 'centerCanvas'><canvas id='myCanvas' width='880px' height = '500px' style = 'margin: 0 auto; float:none;'></canvas></div><br>";
	globals.c=document.getElementById("myCanvas");
	globals.ctx = globals.c.getContext("2d");


	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	////CONSOLE.LOG(id);
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
	
	document.getElementById("centerDisplay").innerHTML += "<canvas id='myCanvas' width='900px' height = '500px' style='float:none'></canvas><br>";

	globals.c=document.getElementById("myCanvas");
	globals.ctx = globals.c.getContext("2d");
	if(globals.inGame)
	{
		document.getElementById("back").innerHTML += "<button onclick = 'helpScreen(eventMenu)'> Back to Help Menu</button>";
	}
	else
	{
		document.getElementById("back").innerHTML += "<button onclick = 'practiceMenu()'> Back to Practice Area</button>";
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

function helpMinigamePlayer(id){
	globals.loopable=true;
	switch(id)
	{
		case 1:
		document.getElementById("coffeerundemoplayer").style.height = '500px';
			document.getElementById("coffeerundemoplayer").innerHTML = "<canvas id='myCanvas1' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas1");
		break;
		case 2:
		document.getElementById("photobombdemoplayer").style.height = '500px';
			document.getElementById("photobombdemoplayer").innerHTML = "<canvas id='myCanvas2' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas2");
		break;
		case 3:
		document.getElementById("secretstickerdemoplayer").style.height = '500px';
			document.getElementById("secretstickerdemoplayer").innerHTML = "<canvas id='myCanvas3' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas3");
		break;
		case 4:
		document.getElementById("meanmovesdemoplayer").style.height = '500px';
			document.getElementById("meanmovesdemoplayer").innerHTML = "<canvas id='myCanvas4' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas4");
		break;
		case 5:
		document.getElementById("tshirtdemoplayer").style.height = '500px';
			document.getElementById("tshirtdemoplayer").innerHTML = "<canvas id='myCanvas5' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas5");
		break;
	}	
	globals.ctx = globals.c.getContext("2d");
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

function showMiniHelp(id)
{
	switch(id)
	{
		case 1:
		document.getElementById("coffeerundemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		break;
		case 2:
		document.getElementById("photobombdemo").style.display = "block"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
		case 3:
		document.getElementById("secretstickerdemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
		case 4:
		document.getElementById("meanmovesdemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
		case 5:
		document.getElementById("tshirtdemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
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
			globals.candidates[0].issueScore[currentStatement] += 0.3;
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
		
				globals.candidates[0].issueScore[currentStatement] -= 0.3;
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
	
		var condHolder = (tuitCond + athCond + medCond + eventCond)/4;
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
    updateTopBar(statementMenu);
  
    if(!globals.back){
        saveGame();
    }
    var state = parseInt(statement); 
    
    let issue;
    let stance;
    let imgIssue;
    let imgStance;
  
    if(statementValue == 0){
      stance = "in favor of";
      imgStance = "pos";
    }
    else{
      stance = "against";
      imgStance = "neg";
    }
    
    switch(state){
      case 0:
        issue = "lowering tuition";
        imgIssue = "tuition";
        break;
      case 1:
        issue = "increasing the budget";
        imgIssue = "budget";
        break;
      case 2:
        issue = "having more school functions";
        imgIssue = "functions";
        break;
      case 3:
        issue = "improving medical services";
        imgIssue = "medical";
        break;
    }
  
    let effectImg = images[imgStance+"Icon"];
    let issueImg = images[imgIssue+"Icon"];
    //let statementImg = images[imgIssue+imgStance];
    let statementBackground = images["statementBackground"];
    let statementPodium = images["statementPodium"];
  
    let playerImg = images["playerImg"];
  
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 338;
    let ctx = tempCanvas.getContext('2d');
    ctx.drawImage(statementBackground, 0, 0, 600, 338);
  
    //ctx.translate(50, 400 + 50)
    //ctx.scale(-1, 1);
    ctx.save();
    ctx.scale(-1, 1)
    ctx.drawImage(playerImg, 40, -25, -250, 278);
    ctx.restore();
    
    ctx.drawImage(statementPodium, 0, 0, 600, 338);
  
    ctx.save();
    ctx.fillStyle = "#93dfef";
    ctx.fillRect(300, 30, 230, 280);
    ctx.restore();
  
    ctx.drawImage(effectImg, 315, 30, 200, 200);
    ctx.drawImage(issueImg, 365, 190, 100, 100);
  
    let finalImg = tempCanvas.toDataURL("image/png");
  
  
    document.getElementById("centerDisplay").innerHTML += "<h2 style='margin-bottom: 1em;'>You made a great speech "+stance+" "+issue+"</h2>";
    document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '"+finalImg+"'> ";
  
	document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick='eventMenu()'>Return to the Game Map</button>";
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
function calcEventScore(candidate, scoreInc, groupPos, groupNeg)
{

	//////CONSOLE.LOG(candidate.issueScore);
	//////CONSOLE.LOG(scoreInc);
	for(var i=0;i<groupPos.length;i++)
	{
        candidate.fame[groupPos[i]] += parseFloat(scoreInc);
        if(candidate.fame[groupPos[i]] > 2)
        {
            candidate.fame[groupPos[i]] = 2;
        }
        if(candidate.fame[groupPos[i]] < .1)
        {
            candidate.fame[groupPos[i]] = .1;
        }

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
	//////CONSOLE.LOG(globals.candidates[0].issueScore);
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
function Candidate(name){
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
  
    //CONSOLE.LOG(groupRandom)
	var majorRandom = Math.floor(Math.random()* 4);
	
    let major = globals.majorList[majorRandom];
    let group = globals.groupList[groupRandom];
  
    let averageMean = (globals.studentTypes[major]["tuition"].mean + globals.studentTypes[group]["tuition"].mean) / 2;
    let averageDeviation = (globals.studentTypes[major]["tuition"].stdDeviation + globals.studentTypes[group]["tuition"].stdDeviation) / 2;    
    let tuition = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (globals.studentTypes[major]["budget"].mean + globals.studentTypes[group]["budget"].mean) / 2;
    averageDeviation = (globals.studentTypes[major]["budget"].stdDeviation + globals.studentTypes[group]["budget"].stdDeviation) / 2;
    let budget = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (globals.studentTypes[major]["functions"].mean + globals.studentTypes[group]["tuition"].mean) / 2;
    averageDeviation = (globals.studentTypes[major]["functions"].stdDeviation + globals.studentTypes[group]["tuition"].stdDeviation) / 2;
    let functions = normalDistribution(averageMean, averageDeviation);
      
    averageMean = (globals.studentTypes[major]["medical"].mean + globals.studentTypes[group]["medical"].mean) / 2;
    averageDeviation = (globals.studentTypes[major]["medical"].stdDeviation + globals.studentTypes[group]["medical"].stdDeviation) / 2;
    let medical = normalDistribution(averageMean, averageDeviation);

     tuition = tuition.toFixed(2);
     budget = budget.toFixed(2);
     functions = functions.toFixed(2);
     medical = medical.toFixed(2);
  
	var returnArray = [groupRandom, majorRandom, tuition, budget, functions, medical];
	return returnArray;
}

//Calculates the candidate who would recieve the vote for each student 
function votePercentage(sampleSize, bias)
{
	//////CONSOLE.LOG(candidates);
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

			//////CONSOLE.LOG(globals.sample[i]);
			var fame = 0;
            
			fame = fameCalc(globals.candidates[j], globals.sample[i]);
			//////CONSOLE.LOG(globals.candidates[j].name +" Fame: "+ fame);
		    var issues = parseFloat(globals.sample[i].tuitionScore) * parseFloat(globals.candidates[j].issueScore[0])
            issues += parseFloat(globals.sample[i].budgetScore) * parseFloat(globals.candidates[j].issueScore[1])
		    issues += parseFloat(globals.sample[i].functionScore)* parseFloat(globals.candidates[j].issueScore[2])
		    issues += parseFloat(globals.sample[i].medicalScore)  * parseFloat(globals.candidates[j].issueScore[3])
		  
            issues = issues/4;

            
            
			/*if(globals.candidates[j].name != "Karma")
			{
                if(issues < 0){
                  candWinPer = -10*Math.pow(fame*issues,2) - globals.candidates[j].consMod;
                }
                else{
                  candWinPer = 10*Math.pow(fame*issues,2) - globals.candidates[j].consMod;
                }
			}
			else
			{
                if(globals.totalDays>5)
                {
                    candWinPer = 10*0.4*issues;
                }
                else
                {
                    candWinPer = 10*0.35*issues;
                }
			}*/
          
            let sign = 1;
            let consMod = globals.candidates[j].consMod;
          
          
            //If their issues score is less than zero,
            //Hold onto that so we can reapply it after Math.pow
            if(issues < 0){
              sign = -1;
            }
          
            //If this is Karma, she has a lowered modifier
            /*if(globals.candidates[j].name == "Karma")
			{
              //Set Karma's fame to (2/Number of total days)
              //This makes karma's score lower when there are more days aka easier difficulty
              fame = (2/globals.totalDays);
            }*/
          
            /*
              Fame scale: 0 to 1
              Consistency scale: 0 to .5
            */
          
            //Multiple by the sign to restore the positive/negative
            //Multiple by modifier to boost overall score
            //Square to make the score more extreme
            //Subtract the consistency modifier, which is boosted by a modifier of 8
            let candWinPer = (sign * 10 * Math.pow(fame * issues, 2)) - (8*consMod);

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
			////CONSOLE.LOG("Current Winner" + winner + " Current Loser" + loser)
		//////CONSOLE.LOG("Student #" +i);
		//////CONSOLE.LOG("Winner: " + winner + " Vote Percentage: "+ winPercentage);
		//////CONSOLE.LOG("Loser: " + loser + " Vote Percentage: "+ lowPercentage);
		//////CONSOLE.LOG("");
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
  
	var gameOutput = document.getElementById("centerDisplay");
	var prevTable = document.getElementById("table");
  
	document.getElementById('next').innerHTML = "";
    document.getElementById('back').innerHTML = "";

	gameOutput.innerHTML = "";
    
    if(document.getElementById('topBar')){
        document.getElementById('topBar').style.display = "none";
    }
    
   // document.getElementById("map").innerHTML = "";
    document.getElementById("map").style.display = "none";
    
    document.getElementById("contentContainer").className = "";
	document.getElementById("mainContent").className = "";
    
    
    document.getElementById("eventImg").innerHTML = "";
    document.getElementById("mainContent").innerHTML = "";
    //document.getElementById("statementMenu").innerHTML = "";
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
	globals.playerCandidate = new Candidate("ph");
	globals.opponentCandidate = new Candidate("Karma");
  	if(globals.gameOver)
    {
        globals.gameSession++; 
        globals.gameOver = false;
    }
    
}

//Allows you to view previous polls at any time.
function viewPollResult(id, isFirst)
{
	clearScreen();
	globals.currentPoll = id;
  //pollChoices, tableArray2, sSize, graphData, graphLabels, isFake, state, isFree, isReview
  tableBuilder(globals.pastPollChoices[id],globals.pastPollResults[id],globals.pastPollSizes[id],globals.pastGraphData[id],globals.pastGraphLabels[id], false, POLL_STATES.IN_GAME, true, true);
	if(!isFirst){
        updateTopBar(pollMenu);
		document.getElementById("back").innerHTML += "<button onclick = 'eventMenu()'>Back to Game Map</button>";
    }
	else
		document.getElementById("back").innerHTML += "<button onclick = 'firstStatement()'> Back to Making Your First Statement </button>";
	
}

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
              for(var j =0; j < globals.candidates.length;j++ )
              {
                  array.push(0);
                  array2.push(globals.candidates[j].name);
              }
              graphData.push(array);
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
							for(var k =0; k< globals.candidates.length; k++)
							{
								if(pollChoices[i] == "candFame" + globals.candidates[k].name)
								{
									graphData.push(globals.questions[j].graph.split(','));
									pollLabelArray.push(globals.questions[j].labels.split(','));
								}
							}
						}
						else if(globals.questions[j].value == "candTrust")
						{
							for(var k =0; k< globals.candidates.length; k++)
							{
								if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
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
  
    ////CONSOLE.LOG(globals.candidates);
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
		
		//if(state == POLL_STATES.FIRST && j ==0)
		//{
		//	globals.candidates.splice(0,0,new Candidate(""));
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
                    for(var k =0; k< globals.candidates.length;k++)
                    {
                        ////CONSOLE.LOG()
                        if(globals.sample[j].results.win == globals.candidates[k].name){
                            graphData[i+2][k]++;
                        }
                    }
                    
                    break;
    
                case "candOpp":
                    globals.tableArrays[3].push(globals.sample[j].results.los);
                    for(var k =0; k< globals.candidates.length;k++)
                    {
                        if(globals.sample[j].results.los == globals.candidates[k].name){
                            graphData[i+2][k]++;
                        }
                    }
                    
                    break;
    
    
    
                case "fame":
                    var playFame = fameCalc(globals.candidates[0],globals.sample[j]).toFixed(3);
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
                    globals.tableArrays[8].push(globals.candidates[0].consMod);
                    var playConst = globals.candidates[0].consMod;
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
            for(var k = 1;k<globals.candidates.length;k++)
            {
                if(pollChoices[i] == "candFame" + globals.candidates[k].name)
                {
                    var calcHolder = fameCalc(globals.candidates[k], globals.sample[j]);
                    
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
            for(var k = 1;k<globals.candidates.length;k++)
            {
                if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
                {
                    globals.tableArrays[candCounter].push(globals.candidates[k].consMod);
					
					if(globals.candidates[k].consMod <= 0.2)
					{
                        graphData[i+2][4]++;
					}
					else if(globals.candidates[k].consMod>0.20 && globals.candidates[k].consMod<0.41)
					{
                        graphData[i+2][3]++;
					}
					else if(globals.candidates[k].consMod>0.40 && globals.candidates[k].consMod<0.61)
					{
                        graphData[i+2][2]++;
					}
					else if(globals.candidates[k].consMod>0.60 && globals.candidates[k].consMod<0.81)
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
			for(var k = 1;k<globals.candidates.length;k++)
			{
				if(pollChoices[h] == "candFame" + globals.candidates[k].name)
				{
						var cell = headRow.insertCell();
						var candInfo = globals.tableHeaders[10] + globals.candidates[k].name;
						cell.innerHTML = candInfo;
						graphQuestions.push("candFame" + globals.candidates[k].name);
				}
			}
			for(var k = 1;k<globals.candidates.length;k++)
			{
				if(pollChoices[h] == "candTrust" + globals.candidates[k].name)
				{
					//////CONSOLE.LOG(h);
						var cell = headRow.insertCell();
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
				for(var k = 1;k<globals.candidates.length;k++)
				{
					if(pollChoices[i] == "candFame" + globals.candidates[k].name)
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
				for(var k = 1;k<globals.candidates.length;k++)
				{
					if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
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
	
	document.getElementById("next").innerHTML += "<button id = 'barButton' class='otherBtn' onclick = 'changeDataDisplay(2,"+isFake+")' style = 'display:none'>Show Bar Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'pieButton' class='otherBtn' onclick = 'changeDataDisplay(3,"+isFake+")'>Show Pie Graphs</button>";
	document.getElementById("next").innerHTML += "<button id = 'dataButton' class='otherBtn' onclick = 'changeDataDisplay(1,"+isFake+")'>Show Data Table</button><br>";
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
		//	globals.candidates.splice(0,1);
		//}
	document.getElementById('table').style.display = 'none';
	if (state == POLL_STATES.TUTORIAL){
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
      globals.candidates = globals.currentCandidateArrayHolder;
    }

}
function capitalStr(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
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

function saveGame()
{ 	
    let saveJSON = new SaveFile();
    //Stringify and escape special characters
    let jsonString = JSON.stringify(saveJSON).escapeSpecialChars();
    
    //post all that information
	$.post('/game/saver', {saveData: jsonString});
    
    
}
//Escapes special characters for JSON encoding
String.prototype.escapeSpecialChars = function() {
  return this.replace(/[\\]/g, '\\\\') //Back slash
      .replace(/[\"]/g, '\\\"') //Double quote
      .replace(/[\/]/g, '\\/') //Forward slash
      .replace(/[\b]/g, '\\b') //Backspace
      .replace(/[\f]/g, '\\f') //Form feed
      .replace(/[\n]/g, '\\n') //New line
      .replace(/[\r]/g, '\\r') //Carriage return
      .replace(/[\t]/g, '\\t'); //Tab
};

//Decodes special characters
String.prototype.decodeSpecialChars = function() {
    return this.replace(/&quot;/g, '\"') //Double quote
      .replace(/&gt;/g, '\>') //Forward slash
      .replace(/&lt;/g, '\<') //Backspace
      .replace(/&amp;/g, '&') //Form feed
      .replace(/&#39;/g, "\'") //single quote
      .replace(/&#x27;/g, "\'"); //single quote
};

function SaveFile(){
  this.days = globals.days;
  this.totalDays = globals.totalDays;
  this.gameSession = globals.gameSession;
  this.firstPoll = globals.firstPoll;
  this.firstState = globals.firstState;
  this.gameOver = globals.gameOver;
  this.remainingHoursDay = globals.remainingHoursDay;
  this.remainingHoursTotal = globals.remainingHoursTotal;
  this.candidates = globals.candidates;
  this.pastPollChoices = globals.pastPollChoices;
  this.pastPollResults = globals.pastPollResults;
  this.pastPollSizes = globals.pastPollSizes;
  this.pastGraphData = globals.pastGraphData;
  this.pastGraphLabels = globals.pastGraphLabels;
  this.studentBiases = globals.studentBiases;
  this.studentTypes = globals.studentTypes;
}


function loadSaveFile(){
  
  let jsonString = saveState;
  //jsonString = jsonString.replace(/&quot;/g,'"');

  let saveJSON = JSON.parse(jsonString.decodeSpecialChars());
  
  
  globals.days = saveJSON.days;
  globals.totalDays = saveJSON.totalDays;
  globals.gameSession = saveJSON.gameSession;
  globals.firstPoll = saveJSON.firstPoll;
  globals.firstState = saveJSON.firstState;
  globals.gameOver = saveJSON.gameOver;
  globals.remainingHoursDay = saveJSON.remainingHoursDay;
  globals.remainingHoursTotal = saveJSON.remainingHoursTotal;
  globals.candidates = saveJSON.candidates;
  globals.pastPollChoices = saveJSON.pastPollChoices;
  globals.pastPollResults = saveJSON.pastPollResults;
  globals.pastPollSizes = saveJSON.pastPollSizes;
  globals.pastGraphData = saveJSON.pastGraphData;
  globals.pastGraphLabels = saveJSON.pastGraphLabels;
  globals.studentTypes = saveJSON.studentTypes;
  
  console.log(globals.studentTypes);
  
}

function loadGame()
{
    try{ 
      loadSaveFile(); 
    }
    //If the save file doesn't work, have the player start a new game
    catch(e){
      console.log("File could not be loaded");
      startAnimatic();
      return 0;
    }
  
    
    //Set the currentCandidateArrayHolder to the right data
    globals.currentCandidateArrayHolder = globals.candidates;
    
    //Set player candidate
    globals.playerCandidate = globals.candidates[0];
  
	globals.back=true;
	saveState = "";
    preloadEventImages(globals.events);
  
    
    /*let canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 555;
    let ctx = canvas.getContext('2d');
  

    
    //Create player Image
    headSheet = new Sprite({context: ctx, width: 155, height: 171, image: globals.heads});
    headSheet.frameIndex = globals.playerCandidate.headNum;
    headSheet.frameIndexRace = globals.playerCandidate.raceNum;
    
	bodySheet = new Sprite({context: ctx, width: 164, height: 343, image: globals.thinBody});
    bodySheet.bodyArrayHolder = globals.playerCandidate.bodyTypeNum;
    bodySheet.frameIndexClothing = globals.playerCandidate.genderNum;
  
    let temp = bodySheet.bodyArrayHolder;
	headSheet.bodyArrayHolder = temp;

	bodySheet.image = globals.imgArrayBody[temp];
	bodySheet.width = globals.imgArrayBodyWidth[temp];
	bodySheet.height = globals.imgArrayBodyHeight[temp];

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);
  
    let image = new Image();
    image.src = canvas.toDataURL("image/png");
    images["playerImg"] = image;*/
  
    generatePlayerImages();
  
    globals.inGame = true;
	if(globals.firstPoll)
	{
		firstPollInfo();
	}
	else if(globals.firstState)
	{
		firstStatement();
	}
	else{eventMenu();}

}

function generatePlayerImages(){
    let canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 555;
    let ctx = canvas.getContext('2d');
  
    //Create player Image
    headSheet = new Sprite({context: ctx, width: 155, height: 171, image: globals.heads});
    headSheet.frameIndex = globals.playerCandidate.headNum;
    headSheet.frameIndexRace = globals.playerCandidate.raceNum;
    
	bodySheet = new Sprite({context: ctx, width: 164, height: 343, image: globals.thinBody});
    bodySheet.bodyArrayHolder = globals.playerCandidate.bodyTypeNum;
    bodySheet.frameIndexClothing = globals.playerCandidate.genderNum;
  
    let temp = bodySheet.bodyArrayHolder;
	headSheet.bodyArrayHolder = temp;

	bodySheet.image = globals.imgArrayBody[temp];
	bodySheet.width = globals.imgArrayBodyWidth[temp];
	bodySheet.height = globals.imgArrayBodyHeight[temp];

	//draws on the canvas
	drawOnCanvas(headSheet, bodySheet);
    
    //Save full size, full body Player image
    let image = new Image();
    image.src = canvas.toDataURL("image/png");
    images["playerImg"] = image;
    
    //Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
    let scale = .3;
    let headWidth = 150; //Width of individual head image
    let headHeight = 160; //Height of individual head image
    canvas.width = 99; //Width of original blank icon image 
    canvas.height = 100; //Height of original blank icon image 
    
    //Draw button background
    ctx.drawImage(images["emptyIcon"],0,0);
  
    //Draw scaled down player head for MyData
    ctx.save();
    //Scale the head to fit the button, subtracting for extra padding
    ctx.scale((canvas.width - 8) / headWidth, (canvas.height - 8) / headHeight)
    headSheet.render(0,0);
    ctx.restore();
  
    //Save Player head
    image = new Image();
    image.src = canvas.toDataURL("image/png");
    images["playerHeadImg"] = image;
}

//Updates the Game Session
function getSession(gameOver)
{
	//Takes the Whole data and splits it into sections
	//var saveArray = saveState.split("~");
	////CONSOLE.LOG(saveArray[9])
	////CONSOLE.LOG(saveArray[9] !=[] && saveArray[9] != "NaN" && saveArray[9] != undefined && saveArray[9] != "")
    
    let gameSession = "";
    try{
      let saveJSON = JSON.parse(saveState);
      gameSession = saveJSON.gameSession;
    }
    catch(e){
      try{
        var saveArray = saveState.split("~");
        gameSession = saveArray[9];
      }
      catch(e){
        console.log("JSON parsing failed");
      }
    }
  
	if(!globals.gameOver){
    	////CONSOLE.LOG(saveArray[9] == "NaN")
    	if(gameSession !=[] && gameSession != "NaN" && gameSession != undefined && gameSession != "")
    	{
        	globals.gameSession = gameSession + 1;
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
function assignIssue(candidate, chosenIssues, issueVal, issueCand)
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
function assignRank(candidate, chosenRanks, issueCand)
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
			candidate.fame = [1.35,1.35,1.35,1.35,1.35,1.35,1.35,1.35];
			candidate.consMod = 0.45;
			candidate.issueScore[candidate.focusnum] = 2.5;
		break;
		case 4:
			candidate.fame = [1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25];
			candidate.consMod = 0.45;
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
function minigameResults(scores, tutorial, loop)
{
	if(!loop)
	{
		clearScreen();
		var scoreToLog = scores.score;
		if(!tutorial)
		{
			globals.remainingHoursTotal-=1;
			globals.remainingHoursDay-=1;
			var pos = chosenEvent.groupPos.split(',');
			////CONSOLE.LOG(pos);
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
			posText += "<br>If you had trouble with this minigame you can replay it to practice in the help menu without using your time.</h4> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px'  onclick = 'chooseHelpPage(`minigameHelpPage`)' ></img><br>";
			if(scores.score <= scores.tier1)
			{			
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(globals.candidates[0], 0.1,pos,[]);
			}
			else if(scores.score <= scores.tier2 && scores.score >scores.tier1)
			{
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(globals.candidates[0], 0.2,pos,[]);
			}
			else if(scores.score <= scores.tier3 && scores.score >scores.tier2)
			{
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(globals.candidates[0], 0.3,pos,[]);
			}
			else if(scores.score > scores.tier3)
			{
				if( scores.score> scores.tier4)
					scores.score = scores.tier4;
				var x = .3 + (.01*(scores.score-scores.tier3));
				x = x.toFixed(2);
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(globals.candidates[0], x,pos,[]);
			}
			else{
				document.getElementById("centerDisplay").innerHTML = posText;
				document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
				calcEventScore(globals.candidates[0], (scores * .1),pos,[]);
			}
			
			saveGame();
			//$.post('/game/loggerMinigame', {minigameID: globals.lastMinigame, score: scoreToLog, module: '1', session: globals.gameSession });
				document.getElementById("next").innerHTML += "<button class='primaryBtn' onclick = 'eventMenu()'> Return to the Game Map </button>";
		}
		else
		{
			var posText =  "<h4>You completed the minigame with a score of "+ (scores.score) + ". <br>If you had trouble with this minigame you can replay it to practice in the help menu without using your time.</h4> <button  onclick = 'chooseHelpPage('minigameHelpPage')' >Minigames</button>"; 
			document.getElementById("centerDisplay").innerHTML = posText;
			document.getElementById("centerDisplay").innerHTML += "<img width = '600' src = '../img/nicework.png'> </img>";
			if(globals.inGame)
			{
						document.getElementById("next").innerHTML += "<button onclick = 'helpScreen(eventMenu)'> Return to the Practice Screen </button>";
			}
			else
			document.getElementById("next").innerHTML += "<button onclick = 'practiceMenu()'> Return to the Practice Screen </button>";
		}
	}
	else
	{
		globals.loopable = false;
	}
}

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

//Checks whether or not the time is up in a day and if so advances it.
function hourChecker()
{
	if (globals.days < globals.totalDays)
	{

		if(globals.remainingHoursDay < 1)
		{
			globals.days++;
			globals.remainingHoursDay = 12;
			dayPollInfo();
		}
		else
		{
			saveGame();
            return true;
            
		}
	}
	else
	{
		if(globals.remainingHoursTotal<1)
		{
			endGame();
		}
		else
		{
			saveGame();
            return true;
		}
	}
  return false;
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
	
	var graphQuestions = pollChoices;
	if(pollChoices[0] != "major")
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
			for(var i = 2; i < pollChoices.length+1;i++)
			{
				if(pollChoices[i] != null)
				{
					switch(pollChoices[i])
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
							for(var k =0; k< globals.candidates.length;k++)
							{
								////CONSOLE.LOG()
								if(resultsArray[2][h] == globals.candidates[k].name){
									filteredData[i][k]++;
								}
							}
						break;
	
						case "candOpp":
							for(var k =0; k< globals.candidates.length;k++)
							{
								////CONSOLE.LOG()
								if(resultsArray[3][h] == globals.candidates[k].name){
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
						if(pollChoices[i] == "issue" + globals.positionsLower[k])
						{
							switch(pollChoices[i])
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
					for(var k = 1;k<globals.candidates.length;k++)
					{
						if(pollChoices[i] == "candFame" + globals.candidates[k].name)
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
					for(var k = 1;k<globals.candidates.length;k++)
					{
						if(pollChoices[i] == "candTrust" + globals.candidates[k].name)
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


function dayPollInfo()
{
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
    document.getElementById("mainContent").innerHTML = "<h1>End of Day Poll</h1> <br><p>Phew! After a hard day of campaigning the current electoral office will conduct a poll for each candidate. <br>You just have to fill out the questions and decide how many people they'll talk to.<br> It wont take any time on our part!</p>";
    document.getElementById("mainContent").innerHTML += "<button class='primaryBtn' onclick='drawPoll("+POLL_STATES.END_OF_DAY+",true, false)'>Take Your End of Day Poll</button>";
}


  // Shows the bug report modal
  function displayHelpPage () {
    document.getElementById('helpPage').classList.remove('hide');
  }

  // Hides the bug report modal
  function hideHelpPage () {
	  globals.loopable = false;
    document.getElementById('helpPage').classList.add('hide');
  }
  
//window.onload = startGame();

/* Console Disabling Code */

//Disable Console Logging
//window.////CONSOLE.LOG = function(){
//    console.error('The ability to view the console is disabled for security purposes.');
//    window.////CONSOLE.LOG = function() {
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
            ////CONSOLE.LOG("%cWarning message", "font: 2em sans-serif; color: yellow; background-color: red;");
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
