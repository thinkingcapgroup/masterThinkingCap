$(document).on('click','.logEventPoll', function(){
      //grab event ID
      //userAction
      //$.post('/game/loggerPoll', {q1: theJSONEvents[0], q2: theJSONEvents[1], q3: theJSONEvents[2], q4: theJSONEvents[3], q5:theJSONEvents[4], q6:theJSONEvents[5], eventType: 'poll', module: 1, session: globals.gameSession});


 });
 
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
 
