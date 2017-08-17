function saveGame()
{ 	
    let saveJSON = new SaveFile();
    //Stringify and escape special characters
    let testString = JSON.stringify(saveJSON);
    let jsonString = JSON.stringify(saveJSON).escapeSpecialChars();
    console.log(jsonString);
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
  this.totalDays = GameObject.totalDays;
  this.gameSession = GameObject.gameSession;
  this.firstPoll = GameObject.firstPoll;
  this.firstState = GameObject.firstState;
  this.gameOver = GameObject.gameOver;
  this.remainingHoursDay = GameObject.remainingHoursDay;
  this.candidates = GameObject.candidates;
  this.pastPollChoices = globals.pastPollChoices;
  this.pastPollSizes = globals.pastPollSizes;
  this.pastGraphData = globals.pastGraphData;
  this.pastGraphLabels = globals.pastGraphLabels;
  this.studentBiases = globals.studentBiases;
  this.studentTypes = GameObject.studentTypes;
  this.playerCandidate = GameObject.playerCandidate;
  //this.allQuestions = globals.allQuestions;
  
  this.pastPollResults = compressPollResults(globals.pastPollResults);
}

function compressPollResults(){
  let compressedResults = [];
  for(let pastPollResult of globals.pastPollResults){
    let result = compressPollResult(pastPollResult);
    compressedResults.push(result);
  }
  
  return compressedResults;
}

function decompressPollResults(compressedResults){
  let pastPollResults = [];
  for(let compressedResult of compressedResults){
    let result = decompressPollResult(compressedResult);
    pastPollResults.push(result);
  }
  
  return pastPollResults;
}


function loadSaveFile(){
  
  let jsonString = saveState;
  //jsonString = jsonString.replace(/&quot;/g,'"');

  let saveJSON = JSON.parse(jsonString.decodeSpecialChars());
  
  
  globals.days = saveJSON.days;
  GameObject.totalDays = saveJSON.totalDays;
  GameObject.gameSession = saveJSON.gameSession;
  GameObject.firstPoll = saveJSON.firstPoll;
  GameObject.firstState = saveJSON.firstState;
  GameObject.gameOver = saveJSON.gameOver;
  GameObject.remainingHoursDay = saveJSON.remainingHoursDay;
  GameObject.candidates = saveJSON.candidates;
  globals.pastPollChoices = saveJSON.pastPollChoices;
  globals.pastPollResults = saveJSON.pastPollResults;
  globals.pastPollSizes = saveJSON.pastPollSizes;
  globals.pastGraphData = saveJSON.pastGraphData;
  globals.pastGraphLabels = saveJSON.pastGraphLabels;
  GameObject.studentTypes = saveJSON.studentTypes;
  GameObject.playerCandidate = saveJSON.playerCandidate;
  //globals.allQuestions = saveJSON.allQuestions;
  
  globals.pastPollResults = decompressPollResults(saveJSON.pastPollResults)
  
  loadQuestions();
  
  
}

function compressPollResult(pollResult){
  let compressedResult = {};
  compressedResult.students = [];
  compressedResult.questionIDs = pollResult.questionIDs;
  compressedResult.name = pollResult.name;
  
  for(let student of pollResult.students){
    compressedResult.students.push(getCompressedStudent(student, pollResult.questionIDs));
  }
  
  return compressedResult;
}

function getCompressedStudent(student, pollChoices){
  let compressedStudent = {};
  compressedStudent.answers = [];

  for(let questionId of pollChoices){
    compressedStudent.answers.push(student.answers[questionId]);
  }
  return compressedStudent;
}

function decompressPollResult(compressedResult){
  let pollResult = new PollResult();
  pollResult.questionIDs = compressedResult.questionIDs;
  pollResult.name = compressedResult.name;
  
  for(let student of compressedResult.students){
    pollResult.students.push(getDecompressedStudent(student, pollResult.questionIDs));
  }
  
  return pollResult;
}

function getDecompressedStudent(compressedStudent, pollChoices){
  let student = new PollStudent();

  for(let i = 0; i < pollChoices.length; i++){
    let questionId = pollChoices[i];
    student.answers[questionId] = compressedStudent.answers[i];
  }
  return student;
}

function loadGame()
{
	$.post('/game/logRetriever', {});
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
    globals.currentCandidateArrayHolder = GameObject.candidates;
  
	saveState = "";
    preloadEventImages(globals.events);
  
    generatePlayerImages();
  
    globals.inGame = true;
	if(GameObject.firstPoll)
	{
		firstPollInfo();
	}
	else if(GameObject.firstState)
	{
		firstStatement();
	}
	else{eventMenu();}

}