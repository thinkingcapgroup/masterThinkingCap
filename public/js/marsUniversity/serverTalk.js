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

     	    $.post('/game/logger', {eventName: name, eventType: 'userAction', module: 1, session: globals.gameSession});
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
    
        $.post('/game/loggerEnd', {eventName: winning, rank: playerRank, eventType: 'endGame', module: 1, session: sessionID });
      
      }, 1000);
 });

$(document).on('click','.logHelp', function(req, res, next){
      //grab event ID
      //userAction

    
    $.post('/game/loggerHelp', {eventName: 'Enter Help', eventType:'Help Area', module: 1, session: globals.gameSession});
      

 });

$(document).on('click','.logHelpEnd', function(req, res, next){
      //grab event ID
      //userAction
    $.post('/game/loggerHelpEnd', {eventName: 'Leave Help', eventType:'Help Area', module: 1, session: globals.gameSession});
      

 });

$(document).on('click','.logHelpEndTutorial', function(req, res, next){
      //grab event ID
      //userAction
    $.post('/game/loggerHelpEndTutorial', {eventName: 'Leave Help', eventType:'Help Area', module: 1, part:globals.section, session: globals.gameSession});
      

 });

$(document).on('change', '.totalTimeTracker', function(){
  
  //If it's a pollQ, it needs to update subquestions first
  if($(this).is('.pollQ')){
      var pollThing =$(this).attr('id');
      pollOnchange(pollThing);
  }
  
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

function pollOnchange(pollThing){
    var place = pollThing.charAt(4);
  var subQuestion = "subpoll" + place;
  
  if(document.getElementById(pollThing).value == "issue" || document.getElementById(pollThing).value == "candFame" || document.getElementById(pollThing).value == "candTrust"){
       document.getElementById(subQuestion).style = "display:block";
      
      $('#' + subQuestion).empty();
      
      let noneOption = new Option("None", "");
      noneOption.setAttribute("class", "defaultSubOption");
      document.getElementById(subQuestion).options.add(noneOption);
      
      if(document.getElementById(pollThing).value == "issue"){
        
          
       
        
        for(var x = 0; x < 4; x++){
            let newOption = new Option(globals.positions[x], globals.positionsLower[x]);
            newOption.setAttribute("class", "defaultSubOption");
            document.getElementById(subQuestion).options.add(newOption);
        }
      }
      if(document.getElementById(pollThing).value == "candFame" || document.getElementById(pollThing).value == "candTrust" ){
          
        for(var x = 0; x < globals.candidates.length; x++){
            let newOption;
            if(x == 0 && globals.candidates[0].name != "Karma"){
              newOption = new Option(globals.candidates[x].name, "Player");
            }               
            else{
                newOption = new Option(globals.candidates[x].name, globals.candidates[x].name);
            }
            
            newOption.setAttribute("class", "defaultSubOption");
            document.getElementById(subQuestion).options.add(newOption);
        }
      }
  }
  else{
    document.getElementById(subQuestion).style = "display:none"
  }
}

$(document).on('change', '.pollQ', function(){
    console.log("pollQ change");
    
  var pollThing =$(this).attr('id');
    pollOnchange(pollThing);

});

$(document).on('change','.pollQ', function(){
      var quest = $(this).val();
      var place = $(this).attr('id');
      var x = place.charAt(4);
      theJSONEvents[x] = quest;
 });

$(document).on('change','.pollQ', function(){
      var quest = $(this).val();
      var place = $(this).attr('id');
      var x = place.charAt(4);
      theJSONEvents[x] = quest;
 });
 
$(document).on('change','.pollQ',function(){
      document.getElementById("poll0").style.color = "black"
      document.getElementById("poll1").style.color = "black"
	  if(document.getElementById("poll2") != null)
      document.getElementById("poll2").style.color = "black"
	  if(document.getElementById("poll3") != null)
      document.getElementById("poll3").style.color = "black"
	  if(document.getElementById("poll4") != null)
      document.getElementById("poll4").style.color = "black"
	  if(document.getElementById("poll5") != null)
      document.getElementById("poll5").style.color = "black"
      document.getElementById("duplicateParagraph").style.display = "none"
	  dupChecker();
 });

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
      $.post('/game/loggerPoll', {q1: theJSONEvents[0], q2: theJSONEvents[1], q3: theJSONEvents[2], q4: theJSONEvents[3], q5:theJSONEvents[4], q6:theJSONEvents[5], eventType: 'poll', module: 1, session: globals.gameSession});


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
  var $lis = $('table tbody > tr').hide();

    $('input[type=checkbox]:checked').each(function(){
        var box = $(this);
        var attrCheck = box.attr('rel');
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