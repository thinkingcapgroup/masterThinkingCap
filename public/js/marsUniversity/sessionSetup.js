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
  socialIcon: '../../img/icons/socialiteicon.png',
  medicalIcon: '../../img/icons/medicalIcon.png',
  athleteIcon: '../../img/icons/athleteicon.png',
  gamerIcon: '../../img/icons/gamericon.png',
  readerIcon: '../../img/icons/readericon.png',
  functionsIcon: '../../img/icons/functionsIcon.png',
  artIcon: '../img/icons/artisticon.png',
  businessIcon: '../img/icons/businessicon.png',
  lawIcon: '../img/icons/lawicon.png',
  techIcon: '../img/icons/techicon.png',
  negIcon: '../../img/icons/negIcon.png',
  posIcon: '../../img/icons/posIcon.png',
  statementBackground: '../../img/statement/statementBackground.png',
  statementPodium: '../../img/statement/statementPodium.png',
  emptyIcon: '../../img/menu/emptyICON.png',
  coffeeRunInstructions: '../img/minigame1/instruction.png',
  photobombInstructions: '../img/minigame2/instruction1.png',
  photobombInstructions2: '../img/minigame2/instruction2.png',
  secretStickerInstructions: '../img/minigame3/instruction1.png',
  secretStickerInstructions2: '../img/minigame3/instruction2.png',
  meanMovesInstructions: '../img/minigame4/instruction1.png',
  meanMovesInstructions2: '../img/minigame4/instruction2.png',
  tShirtInstructions: '../img/minigame5/instruction.png',
  coffeeRunTitle: '../img/minigame1/titlescreen.png',
  photobombTitle: '../img/minigame2/titlescreen.png',
  secretStickerTitle: '../img/minigame3/titlescreen.png',
  meanMovesTitle: '../img/minigame4/titlescreen.png',
  tShirtTitle: '../img/minigame5/titlescreen.png',
  backButton: '../img/backbutton.png',
  blueBar: '../img/bluebar.png',
  blueBarSmall: '../img/bluebarsmall.png',
  cameraIcon: '../img/minigame3/cameraicon.png',
  awesomePic: '../img/AwesomePicture.png',
  studentID: '../img/studentid.png',
  headSheet: '../img/spriteheadlong.png',
  playerAvatar: "../img/minigame1/headspritesheettop.png",
  enemyAvatar: "../img/minigame1/spriteFlip/flipheadtopsprite.png",
  thinBodyCycle: "../img/minigame1/thinwalkcyclesheet.png",
  medBodyCycle: "../img/minigame1/medwalkcycletop.png",
  largeBodyCycle: "../img/minigame1/largewalkcycletop.png",
  chairBodyCycle: "../img/minigame1/chairwalkcycletop.png",
  enemythinBodyCycle: "../img/minigame1/spriteFlip/flipthinkwalkcyclesheet.png",
  enemymedBodyCycle: "../img/minigame1/spriteFlip/flipmedwalkcyclesheet.png",
  enemylargeBodyCycle: "../img/minigame1/spriteFlip/fliplargewalkcyclesheet.png",
  enemychairBodyCycle: "../img/minigame1/spriteFlip/flipchairwalkcyclesheet.png",
  animationAssets: "../img/minigame1/assetscafe.png",
  meanMovesBG: '../img/minigame4/dancebg.png',
  meanMovesBG2: '../img/minigame4/arieldance.png',
  coffeeRunBG: "../img/minigame1/cafebg.png",
  tShirtBG: '../img/minigame5/background.png',
  thinwalk: '../img/minigame5/thinwalkcyclesheet.png',
  chairwalk: '../img/minigame5/chairwalkcycletop.png',
  pluswalk: '../img/minigame5/largewalkcycletop.png',
  medwalk: '../img/minigame5/medwalkcycletop.png',
  happy: '../img/minigame5/happyreaction.png',
  neutral: '../img/minigame5/neutralreaction.png',
  angry: '../img/minigame5/angryreaction.png',
  superHappy: '../img/minigame5/superhapyreaction.png',
  superAngry: '../img/minigame5/superangryreaction.png',
  tshirt1: '../img/minigame5/tshirt1.png',
  tshirt2: '../img/minigame5/tshirt2.png',
  tshirt3: '../img/minigame5/tshirt3.png',
  thinFemale: '../img/minigame4/thinfemaledancesheet.png',
  thinMale: '../img/minigame4/thinmaledancesheet.png',
  thinNB: '../img/minigame4/thinnbdancesheet.png',
  medFemale: '../img/minigame4/medfemaledance.png',
  medMale: '../img/minigame4/medmaledance.png',
  medNB: '../img/minigame4/mednbdance.png',
  plusFemale: '../img/minigame4/plusfemaledance.png',
  plusMale: '../img/minigame4/plusmaledance.png',
  plusNB: '../img/minigame4/plusnbdance.png',
  chairFemale: '../img/minigame4/chairfemaledance.png',
  chairMale: '../img/minigame4/chairmaledance.png',
  chairNB: '../img/minigame4/chairnbdance.png',
  rightArrow: '../img/minigame4/rightarrowgreyed.png',
  rightArrowGlow: '../img/minigame4/rightarrowGREEN.png',
  leftArrow: '../img/minigame4/leftarrowgreyed.png',
  leftArrowGlow: '../img/minigame4/leftarrowGREEN.png',
  upArrow: '../img/minigame4/uparrowgreyed.png',
  upArrowGlow: '../img/minigame4/uparrowGREEN.png',
  downArrow: '../img/minigame4/downarrowgreyed.png',
  downArrowGlow: '../img/minigame4/downarrowGREEN.png',
  getReady: '../img/minigame4/getready.png',
  oops: '../img/minigame4/oops.png',
  great: '../img/minigame4/great.png',
  smallGroup: '../img/minigame4/group2.png',
  medGroup: '../img/minigame4/group4.png',
  largeGroup: '../img/minigame4/group6.png',
  stageRed: '../img/minigame4/stagelightbeamred.png',
  stageBlue: '../img/minigame4/stagelightbeamblue.png',
  stageGreen: '../img/minigame4/stagelightbeamgreen.png',
  stageLampRed: '../img/minigame4/stagelightred.png',
  stageLampBlue: '../img/minigame4/stagelightblue.png',
  stageLampGreen: '../img/minigame4/stagelightgreen.png',
  poster: '../img/minigame3/VotePosterProp.png',
  sticker: '../img/minigame3/Stickerasset.png',
  libWall: '../img/minigame3/Librarywallbg.png',
  labWall: '../img/minigame3/labwall.png',
  quadWall: '../img/minigame3/posterwallbg.png',
  gymWall: '../img/minigame3/WallforGymBG.png',
  mediaWall: '../img/minigame3/WallforMediaRoomBG.png',
  cafeWall: '../img/minigame3/WallforCafeBG.png',
  hoverBack: "../img/minigame3/chairback.png",
  thinBack: "../img/minigame3/thinback.png",
  medBack: "../img/minigame3/medback.png",
  plusBack: "../img/minigame3/plusback.png",
  hoverPeace1: "../img/minigame2/hover1peace.png",
  hoverPeace2: '../img/minigame2/hover2peace.png',
  hoverStrong: '../img/minigame2/hoverstrong.png',
  thinPeace1: '../img/minigame2/thinpeace1.png',
  thinPeace2: '../img/minigame2/thinpeace2.png',
  thinStrong: '../img/minigame2/thinstrong.png',
  medPeace1: '../img/minigame2/medpeace.png',
  medPeace2: '../img/minigame2/medpeace2.png',
  medStrong: '../img/minigame2/medstrong.png',
  plusPeace1: '../img/minigame2/pluspeace1.png',
  plusPeace2: '../img/minigame2/pluspeace2.png',
  plusStrong: '../img/minigame2/plusstrong.png',
  cafebg: '../img/minigame2/backgroundcafe.png',
  quadbg: '../img/minigame2/quadpicturebgNEW.png',
  gymbg: '../img/minigame2/photobombgymbg.png',
  libbg: '../img/minigame2/Librarusnapshotbg.png',
  labsbg: '../img/minigame2/labsbg.png',
  minigameMap: '../img/map/map.png'
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
		globals.opinionValues = Json.opinionValues;
		globals.opinionLimits = Json.opinionLimits;
		globals.helpPage = Json.helpPage;
		globals.majorIssues = Json.majorIssues;
		globals.groupIssues = Json.groupIssues;
		globals.positions = Json.positions;
		globals.positionsLower = Json.positionsLower;
		globals.lifeformArray = Json.lifeformArray;
		globals.bodyShapeArray = Json.bodyShapeArray;
		globals.bodyTypeArray = Json.bodyTypeArray;
		globals.tableHeaders = Json.tableHeaders;
		globals.groupList = Json.groupList;
		globals.majorList = Json.majorList;
		globals.imgArrayBodyWidth = Json.imgArrayBodyWidth;
		globals.imgArrayBodyHeight = Json.imgArrayBodyHeight;
		globals.imgArrayHeadHeight = Json.imgArrayHeadHeight;
		globals.dayCycleImage = Json.dayCycleImage;
		globals.population = Json.population;
		globals.POLL_STATES = Json.POLL_STATES;
		globals.tutorialPages = Json.tutorialPages;
	};
	oReq.open("get", "json/data.json", true);
	oReq.send();
    
    preloadEventImages(globals.events);
    //preloadUI();  
  
    createAreas();
    
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