var theJSONEvents = []

$(document).on('click','.logEvent', function(req, res, next){
      //grab event ID
      //userAction
     var name;
     var time;
     var eventID = $(this).get(0).id;
     $.getJSON("json/events.json", function(data){
     	name = data.events[eventID].name;
     	time = data.events[eventID].timeRequired;
     	
     }).then( function(){
    
     	    $.post('/logger', {eventName: name});
     } )
 });

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
      $.post('/loggerPoll', {q1: theJSONEvents[0], q2: theJSONEvents[1], q3: theJSONEvents[2], q4: theJSONEvents[3], q5:theJSONEvents[4]});

   
 });
