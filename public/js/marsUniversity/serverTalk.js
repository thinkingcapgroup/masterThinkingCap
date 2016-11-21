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

     	    $.post('/game/logger', {eventName: name});
     } )
 });

$(document).on('change', '.totalTimeTracker', function(){
  var samp = document.getElementById('sample').value;
  var qLength = 0;
  for (var x = 0; x < 6; x++){
    var qpVar = document.getElementById('poll'+x+'').value;

    if(qpVar != ""){
      theQuestionBools[x] = true;
    }
    else{
      theQuestionBools[x] = false;
    }
  }

  for (var y = 0; y < 6; y++){
    if(theQuestionBools[y] == true){
      qLength++;

    }
  }

  var timeHolder = returnTotalPollTime(samp, qLength);

  document.getElementById('timeParagraph').innerHTML = 'Total Time: ' + timeHolder + ' hours';

})

$(document).on('change', '.sampleOptions', function(){
  var optionIndex = $(this).val();
  document.getElementById('sample').value = optionIndex;
  document.getElementById('rooms').value = optionIndex;
  document.getElementById('timeSpent').value = optionIndex;
})

$(document).on('change', '.pollQ', function(){
  var pollThing =$(this).attr('id');
  var place = pollThing.charAt(4);
  var subQuestion = "subpoll" + place;
  if(document.getElementById(pollThing).value == "issue" || document.getElementById(pollThing).value == "candFame" || document.getElementById(pollThing).value == "candTrust"){
       document.getElementById(subQuestion).style = "display:block";

      if(document.getElementById(pollThing).value == "issue"){

         $('#' + subQuestion).empty();
        for(var x = 0; x < 5; x++){
            document.getElementById(subQuestion).options.add(new Option(positions[x], positionsLower[x]));
        }
      }
      if(document.getElementById(pollThing).value == "candFame" || document.getElementById(pollThing).value == "candTrust" ){

         $('#' + subQuestion).empty();
        for(var x = 1; x < 7; x++){
            document.getElementById(subQuestion).options.add(new Option(candidates[x].name, candidates[x].name));
        }
      }
  }
  else{
    document.getElementById(subQuestion).style = "display:none"
  }
})

$(document).on('change','.pollQ', function(req, res, next){
      var quest = $(this).val();
      var place = $(this).attr('id');
      var x = place.charAt(4);
      theJSONEvents[x] = quest;
      console.log(theJSONEvents);
 });

$(document).on('click','.logEventPoll', function(req, res, next){
      //grab event ID
      //userAction
      $.post('/game/loggerPoll', {q1: theJSONEvents[0], q2: theJSONEvents[1], q3: theJSONEvents[2], q4: theJSONEvents[3], q5:theJSONEvents[4], q6:theJSONEvents[5]});


 });
