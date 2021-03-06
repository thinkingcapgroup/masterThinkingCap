// Require express
var express = require('express'),
   // Get the express Router
   router = express.Router(),
   // Require the Auth middleware
   auth = require('../../model/auth/auth'),
   // Require body-parser module
   bodyParser = require('body-parser'),
   // Require fs module
   fs = require('fs'),
   moment = require('moment'),
   momentTZ = require('moment-timezone'),
   object;

/**
 * router - GET method for game route 'marsUniversity/game'
 * @param  {String} 'marsuniversity/game' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  // Render Mars University game
  if (req.user.role > 3) {
    // Render dashboard view
      renderMarsUniversityGame(req, res);
  }

  // Otherwise
  else {
    // Redirect to accountactivation
    res.redirect('/dashboard');
  }


});

/**
 * router - GET method for game ajax route 'marsUniversity/ajax'
 * @param  {String} 'marsuniversity/ajax' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/ajax', function (req, res) {
  // Send data obtained
  res.send(getData());
});

/**
 * router - POST method for Mars University game route '/logger'
 * @param  {String} '/logger' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 * @param  {Function} next - Indicates next function
 */
router.post('/logger', auth, function (req, res, next) {
  // Get the name of the event
  var event = req.body.eventName,
      // Get user id
      id = req.user.userId,
      username = req.user.userName,
      type = req.body.eventType,
      modulenum = req.body.module,
      gameSession = req.body.session,
      gameID = id+"_"+modulenum+"_"+gameSession,
      date = moment().format('MMMM Do YYYY, h:mm:ss a'); 
      // Concatenate information
      stringTem = "\n" + id + "-"+type+ "-"+ event + "-" + date + "-" +username +"-" + gameID;

    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"




  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
  // Append stringTem to file 'logInfo/useraction.txt'


    require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // End the response
  res.end();
});

router.post('/loggerHelp', auth, function (req, res, next) {
  // Get the name of the event
  var event = req.body.eventName,
      // Get user id
      id = req.user.userId,
      username = req.user.userName,
      type = req.body.eventType,
      modulenum = req.body.module,
      gameSession = req.body.session,
      gameID = id+"_"+modulenum+"_"+gameSession,
      date =moment().format('MMMM Do YYYY, h:mm:ss a'),
      // Concatenate information
      stringTem = "\n" + id + "-"+type+ "-"+ event + "-" + date + "-" +username +"-" + gameID;
	

     var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
   var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }


      require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // End the response
  res.end();
});

router.post('/loggerHelpEnd', auth, function (req, res, next) {
  // Get the name of the event
  var event = req.body.eventName,
      // Get user id
      id = req.user.userId,
      username = req.user.userName,
      type = req.body.eventType,
      modulenum = req.body.module,
      gameSession = req.body.session,
      gameID = id+"_"+modulenum+"_"+gameSession,
      date = moment().format('MMMM Do YYYY, h:mm:ss a'),
      // Concatenate information
      stringTem = "\n" + id + "-"+type+ "-"+ event + "-" + date + "-" +username +"-" + gameID;

   var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
  // Append stringTem to file 'logInfo/useraction.txt'

  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
  require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // End the response
  res.end();
});

router.post('/loggerHelpEndTutorial', auth, function (req, res, next) {
  // Get the name of the event
  var event = req.body.eventName + " at section " + req.body.part,
      // Get user id
      id = req.user.userId,
      username = req.user.userName,
      type = req.body.eventType,
      modulenum = req.body.module,
      gameSession = req.body.session,
      gameID = id+"_"+modulenum+"_"+gameSession,
            date = moment().format('MMMM Do YYYY, h:mm:ss a'),
      // Concatenate information
      stringTem = "\n" + id + "-"+type+ "-"+ event + "-" + Date.now() + "-" +username +"-" + gameID;

  console.log(gameID);
  // Append stringTem to file 'logInfo/useraction.txt'
     var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
  
  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
  
  require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // End the response
  res.end();
});

router.post('/loggerEnd', auth, function (req, res, next) {
  // Get the name of the event
  var event = req.body.eventName + " Player Rank:" + req.body.rank,
      // Get user id
      id = req.user.userId,
      username = req.user.userName,
      type = req.body.eventType,
      modulenum = req.body.module,
      gameSession = req.body.session,
      gameID = id+"_"+modulenum+"_"+gameSession,
      date = moment().format('MMMM Do YYYY, h:mm:ss a'),
      rank = req.body.rank;
  
    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"

  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
  
  require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // Append stringTem to file 'logInfo/useraction.txt'

  // End the response
  res.end();
});

/**
 * router - POST method for Mars University game route '/saver'
 * @param  {String} '/saver' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/saver', auth, function (req, res) {
  // TextFile Saving
  var stringTem = req.body.saveData;

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../../model/marsUniversity/saveUserGame.js')(req, stringTem, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // End response
  res.end();
});

/**
 * router - POST method for Mars University game route '/loggerPoll'
 * @param  {String} '/loggerPoll' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 * @param  {Function} next - Indicates next function
 */
router.post('/loggerPoll', auth, function (req, res, next) {
  // Get user id
  var id = req.user.userId,
       username = req.user.userName,
      // Get the 6 questions asked
      q1 = req.body.q1,
      q2 = req.body.q2,
      q3 = req.body.q3,
      q4 = req.body.q4,
      q5 = req.body.q5,
      q6 = req.body.q6,
      type = req.body.eventType,
      modulenum = req.body.module,
      date = moment().format('MMMM Do YYYY, h:mm:ss a'),
      gameSession = req.body.session,
      gameID = id+"_"+modulenum+"_"+gameSession,
      // Concatenate information
      stringThing = '\n' + id + '-' + type + '-'+ q1 + '*' + q2 + '*' +q3 + '*' + q4 + '*' + q5 + '*' + q6 + "-" + Date.now() + "-" +username +"-" + gameID;
     questions = 'Q: '+ q1 + ' Q: '+ q2 + ' Q: '+ q3 + ' Q: '+ q4 + ' Q: '+ q5 + ' Q: '+ q6;
    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"

  var passingObject = {userID: id, username: username, action: type, description: questions, date: dateString, gameSession: gameID }

  require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // Append information to 'logInfo/useraction.txt'



  // End response
  res.end();
});


router.post('/loggerMinigame', auth, function (req, res, next) {
  // Get user id

  var id = req.user.userId,
      username = req.user.userName,
      // Get the 6 questions asked
      mininumber = req.body.minigameID,
      score = req.body.score,
      modulenum = req.body.module,
      gameSession = req.body.session,
      date = moment().format('MMMM Do YYYY, h:mm:ss a'),
      gameID = id+"_"+modulenum+"_"+gameSession,
      // Concatenate information
      stringThing = '\n' + "MinigameScore" + id + '-'+ mininumber+ "-" + score + "-" + date+ "-" +username +"-" + gameID;

    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"

 var passingObject = {userID: id, username: username, action: "Minigame " + mininumber, description: "Score: " + score, date: dateString, gameSession: gameID }
  


  // Append information to 'logInfo/useraction.txt'

    require('../../model/marsUniversity/logInfo.js')(req, passingObject, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });


 
  // End response
  res.end();
});

/**
 * renderMarsUniversityGame - renders the Mars University game view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderMarsUniversityGame (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = 'Thinking Cap - Mars University';
  model.content.gameTitle = 'Mars University';
  model.layout = 'gamelayout';
  model.globalNavigationMode = require('../../model/global/globalNavigationModeAuth')(req, res);

  // Get the loadSave model
  require('../../model/marsUniversity/loadSave.js')(req, auth, function (err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }

    // Otherwise
    else {
      // Set saveState to the data obtained
      model.saveState = success;
    }

    // Render marsuniversity/game using the 'marsUniversity/game' view and model
    res.render('marsUniversity/game', model)
  });
}

// Export marsUniversity game router
module.exports = router;
