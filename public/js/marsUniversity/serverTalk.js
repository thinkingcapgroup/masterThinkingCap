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

$(document).on('click','.logEventEnd', function(req, res, next){
      //grab event ID
      //userAction
     setTimeout(function(){
      var winning = 'End Game Winner - ' + ranking[0].name;
      var playerRank = 0;
      for(var q = 0; q < ranking.length; q++){
        if(ranking[q].name == candidates[0].name){
          playerRank = q+1;
        }
      }
    
        $.post('/game/loggerEnd', {eventName: winning, rank: playerRank });
      
      }, 1000);
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
        console.log(candidates);
        for(var x = 0; x < candidates.length; x++){
            if(x == 0){
              document.getElementById(subQuestion).options.add(new Option(candidates[x].name, "Player"));
            }               
            else{document.getElementById(subQuestion).options.add(new Option(candidates[x].name, candidates[x].name));
            }
        }
      }
  }
  else{
    document.getElementById(subQuestion).style = "display:none"
  }
})

$(document).on('change','.pollQ', function(){
      var quest = $(this).val();
      var place = $(this).attr('id');
      var x = place.charAt(4);
      theJSONEvents[x] = quest;
      console.log(theJSONEvents);
 });

$(document).on('click','.logEventPoll', function(){
      //grab event ID
      //userAction
      $.post('/game/loggerPoll', {q1: theJSONEvents[0], q2: theJSONEvents[1], q3: theJSONEvents[2], q4: theJSONEvents[3], q5:theJSONEvents[4], q6:theJSONEvents[5]});


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


 });