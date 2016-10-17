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