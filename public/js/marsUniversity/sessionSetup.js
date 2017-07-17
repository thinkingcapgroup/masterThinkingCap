let loadProgress = 0;

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

let loadComplete = false;

$(document).ready(function(){
  startSession();
})

//starts the game
function startSession()
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

function preloadEventImages(actions) {
	for (let i = 1; i < actions.length; i++) {
		globals.images[i] = new Image();
		globals.images[i].src = actions[i].path;
	}
}

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