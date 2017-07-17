var theJSONEvents = []
var theQuestionBools = [];

$(document).on('click','.logEvent', function(req, res, next){
      //grab event ID
      //userAction
     var name;
     var time;
     var eventID = $(this).get(0).id;
     $.getJSON("json/data.json", function(data){
     	name = data.events[eventID].name;
     	time = data.events[eventID].timeRequired;

     }).then( function(){

     	    //$.post('/game/logger', {eventName: name, eventType: 'userAction', module: 1, session: globals.gameSession});
     } )
 });

$(document).on('click','.logEventEnd', function(req, res, next){
      //grab event ID
      //userAction

     setTimeout(function(){
      var winning = 'Winner: ' + ranking[0].name;
      var sessionID = globals.gameSession;
      var playerRank = 0;
      for(var q = 0; q < ranking.length; q++){
        if(ranking[q].name == globals.candidates[0].name){
          playerRank = q+1;
        }
      }
    
        //$.post('/game/loggerEnd', {eventName: winning, rank: playerRank, eventType: 'endGame', module: 1, session: sessionID });
      
      }, 1000);
 });

$(document).on('click','.logHelp', function(req, res, next){
      //grab event ID
      //userAction

    
    //$.post('/game/loggerHelp', {eventName: 'Enter Help', eventType:'Help Area', module: 1, session: globals.gameSession});
      

 });

$(document).on('click','.logHelpEnd', function(req, res, next){
      //grab event ID
      //userAction
    //$.post('/game/loggerHelpEnd', {eventName: 'Leave Help', eventType:'Help Area', module: 1, session: globals.gameSession});
      

 });

$(document).on('click','.logHelpEndTutorial', function(req, res, next){
      //grab event ID
      //userAction
    //$.post('/game/loggerHelpEndTutorial', {eventName: 'Leave Help', eventType:'Help Area', module: 1, part:globals.section, session: globals.gameSession});
      

 });

$(document).on('change', '.totalTimeTracker', function(){
  
  var samp = document.getElementById('sample').value;
  var qLength = 0;
  for (var x = 0; x < 6; x++){
    var qpVar = document.getElementById('poll'+x+'').value;
    
    theQuestionBools[x] = false;
      
    //If the question isn't empty
    if(qpVar != ""){
        //If there's a subquestion involved
        //Aka if the subpoll element has options
        if(document.getElementById('subpoll'+x+'').options.length){
            //If the subquestion isn't empty
            if(document.getElementById('subpoll'+x+'').value != ""){
                theQuestionBools[x] = true;
                qLength++;
            }
        }
        else{
            theQuestionBools[x] = true;
            qLength++;
        }

    }
  }

//  for (var y = 0; y < 6; y++){
//    if(theQuestionBools[y] == true){
//      qLength++;
//
//    }
//  }

  var timeHolder = returnTotalPollTime(samp, qLength);

  document.getElementById('timeParagraph').innerHTML = 'Total Time: ' + timeHolder + ' hours';

})

$(document).on('change', '.sampleOptions', function(){
  var optionIndex = $(this).val();
  document.getElementById('sample').value = optionIndex;
  //document.getElementById('timeSpent').value = optionIndex;
})

function onPollChange(pollThing){
  var pollQuestion = document.getElementById($(this).attr('id')).value;
  var questionNumber = $(this).attr('id').charAt(4);
  
  //Record question for logging
  theJSONEvents[questionNumber] = pollQuestion;
  
  var subQuestionId = "subpoll" + questionNumber;
  var subQuestion = document.getElementById(subQuestionId)
  
  if(pollQuestion == "issue" || pollQuestion == "candFame" || pollQuestion == "candTrust"){
       subQuestion.style = "display:block";
      
      $('#' + subQuestionId).empty();
      
      let noneOption = new Option("None", "");
      noneOption.setAttribute("class", "defaultSubOption");
      subQuestion.options.add(noneOption);
      
      if(pollQuestion == "issue"){
        
        for(var x = 0; x < 4; x++){
            let newOption = new Option(globals.positions[x], globals.positionsLower[x]);
            newOption.setAttribute("class", "defaultSubOption");
            subQuestion.options.add(newOption);
        }
      }
      if(pollQuestion == "candFame" || pollQuestion == "candTrust" ){
          
        for(var x = 0; x < globals.candidates.length; x++){
            let newOption;
            if(x == 0 && globals.candidates[0].name != "Karma"){
              newOption = new Option(globals.candidates[x].name, "Player");
            }               
            else{
                newOption = new Option(globals.candidates[x].name, globals.candidates[x].name);
            }
            
            newOption.setAttribute("class", "defaultSubOption");
            subQuestion.options.add(newOption);
        }
      }
  }
  else{
    subQuestion.style = "display:none"
  }
  
  dupChecker();
}

$(document).on('change', '.pollQ', onPollChange);

$(document).on('change','.subPollQ',function(){
      document.getElementById("subpoll0").style.color = "black"
      document.getElementById("subpoll1").style.color = "black"
	  if(document.getElementById("subpoll2") != null)
      document.getElementById("subpoll2").style.color = "black"
	  if(document.getElementById("subpoll3") != null)
      document.getElementById("subpoll3").style.color = "black"
	  if(document.getElementById("subpoll4") != null)
      document.getElementById("subpoll4").style.color = "black"
	  if(document.getElementById("subpoll5") != null)
      document.getElementById("subpoll5").style.color = "black"
      document.getElementById("duplicateParagraph").style.display = "none"
	  dupChecker();
 });

$(document).on('click','.logEventPoll', function(){
      //grab event ID
      //userAction
      //$.post('/game/loggerPoll', {q1: theJSONEvents[0], q2: theJSONEvents[1], q3: theJSONEvents[2], q4: theJSONEvents[3], q5:theJSONEvents[4], q6:theJSONEvents[5], eventType: 'poll', module: 1, session: globals.gameSession});


 });
 $(document).on('change','.graphFilters', function()
 {
	 console.log(globals.currentPoll)
	var major = document.getElementById("majorSelect").value;
	var group = document.getElementById("groupSelect").value;
	filterGraphData(major, group, globals.pastPollChoices[globals.currentPoll], globals.pastPollResults[globals.currentPoll], globals.pastPollSizes[globals.currentPoll], globals.pastGraphData[globals.currentPoll], globals.pastGraphLabels[globals.currentPoll], false);
 });

$(document).on('change','.filterChecklist', function(){
  var clearEverything = false;
  var numberFlag = 0;

  $('input[type=checkbox]:checked').each(function(){
    numberFlag++;
  })

  if(numberFlag > 0){
    clearEverything = true;
  }

  if(clearEverything){
    console.log("clearing everything");
  var $lis = $('table tbody > tr').hide();

    $('input[type=checkbox]:checked').each(function(){
        var box = $(this);
        var attrCheck = capitalStr(box.attr('rel'));
        var flag;

         $('table > tbody > tr').each(function() {
          flag = false;
           $.each(this.cells, function(){         
            var row = $(this).text();
            if (row == attrCheck){
             flag = true;
           }
          });
           if(flag){
           $(this).show();
         }
      });
       
    });
  }
  else{
    var $lis = $('table tbody > tr').show();
  }

document.body.scrollTop = document.documentElement.scrollTop = 0
 });