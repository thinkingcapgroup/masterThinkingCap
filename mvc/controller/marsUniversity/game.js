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
   Client = require('ftp'),
   JSFtp = require("jsftp"),
   object, 
   str = "";
 
var ftp = new JSFtp({
  host: "ec2-13-59-136-55.us-east-2.compute.amazonaws.com",
  port: 21, // defaults to 21 
  user: "MarsUstorage", // defaults to "anonymous" 
  pass: "MartianD0g" // defaults to "@anonymous" 
});

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

//Retrieves the Log File from the public FTP
router.post('/logRetriever', auth, function (req, res, next) 
{
  var id = req.user.userId;
  //var recievingClient = new Client();
  //recievingClient.on('ready', function() {
  //  recievingClient.get('User_'+id+'_logFile.txt', function(err, stream) {
  //    if (err) throw err;
  //    stream.once('close', function() { recievingClient.end(); });
  //    stream.pipe(fs.createWriteStream('logs/User_'+id+'_logFile.txt'));
  //  });
  //});
  //recievingClient.connect({host: 'ec2-13-59-136-55.us-east-2.compute.amazonaws.com', user:'MarsUstorage', password: 'MartianD0g'});
  
  console.log("Pulling file");
  ftp.get('User_'+id+'_logFile.txt', function(err, socket) {
    if (err) return;
 
    socket.on("data", function(d) { str += d.toString(); console.log(str);})
    socket.on("close", function(hadErr) {
      if (hadErr)
        console.error('There was an error retrieving the file.');
    });
    socket.resume();
  });
  res.end();
});

//Uploads the Log File to the public FTP
function saveNewLog(req,res, logStr){
  var id = req.user.userId;
  //var sendingClient = new Client();
  //sendingClient.on('ready', function() 
  //{
  //  sendingClient.put('logs/User_'+id+'_logFile.txt', 'User_'+id+'_logFile.txt', function(err) 
	//{
  //    if (err) throw err;
  //    sendingClient.end();
  //  });
  //});
  //sendingClient.connect({host: 'ec2-13-59-136-55.us-east-2.compute.amazonaws.com', user:'MarsUstorage', password: 'MartianD0g'});
  console.log("Saving to FTP ");
  var buf = Buffer.from(logStr, 'utf8');
  ftp.put(buf, 'User_'+id+'_logFile.txt', function(hadError) {
  if (!hadError)
    console.log("File transferred successfully!");
  });
}


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

    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
;

  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
  
  //updates the file
  console.log("Updating File");
  var stringTem = "\nUsername: " +username + " ID: "+ id + " Type of Event: "+ type + " Event: "+ event + " Date: " + dateString + " Game Session: " + gameID +"\n";
  str += stringTem;
  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringTem, function (err) {
    console.log('Student information logged');
  });

  
  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
      date =moment().format('MMMM Do YYYY, h:mm:ss a');
	

     var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
   var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
	
  var stringTem = "\nUsername: " +username + " ID: "+ id + " Type of Event: "+ type + " Event: "+ event + " Date: " + dateString + " Game Session: " + gameID +"\n";
  str += stringTem;
  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringTem, function (err) {
    console.log('Student information logged');
  });


  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
      date = moment().format('MMMM Do YYYY, h:mm:ss a');

   var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
  // Append stringTem to file 'logs/useraction.txt'

  
  var stringTem = "\nUsername: " +username + " ID: "+ id + " Type of Event: "+ type + " Event: "+ event + " Date: " + dateString + " Game Session: " + gameID +"\n";
  str += stringTem;
  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringTem, function (err) {
    console.log('Student information logged');
  });
  
  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }

  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
  // End the response
  res.end();
});

router.post('/defaultLogger', auth, function (req, res, next) {
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

   var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
  // Append stringTem to file 'logs/useraction.txt'

  
  var stringTem = "\nUsername: " +username + " ID: "+ id + " Type of Event: "+ type + " Event: "+ event + " Date: " + dateString + " Game Session: " + gameID +"\n";
  str += stringTem;
  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringTem, function (err) {
    console.log('Student information logged');
  });
  
  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }

  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
      date = moment().format('MMMM Do YYYY, h:mm:ss a');

  console.log(gameID);
  // Append stringTem to file 'logs/useraction.txt'
     var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"
  
  var passingObject = {userID: id, username: username, action: type, description: event, date: dateString, gameSession: gameID }
  
  var stringTem = "\nUsername: " +username + " ID: "+ id + " Type of Event: "+ type + " Event: "+ event + " Date: " + dateString + " Game Session: " + gameID +"\n";
  str += stringTem;
  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringTem, function (err) {
    console.log('Student information logged');
  });
  

  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
  
  var stringTem = "\nUsername: " +username + " ID: "+ id + " Type of Event: "+ type + " Event: "+ event + " Date: " + dateString + " Game Session: " + gameID +"\n";
  str += stringTem;
  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringTem, function (err) {
    console.log('Student information logged');
  });
  
  // Append stringTem to file 'logs/useraction.txt'

  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
      stringThing = '\nUsername: ' +username +" ID: " + id + ' Event Type: ' + type + ' Q1: '+ q1 + ' Q2: ' + q2 + ' Q3: ' +q3 + ' Q4: ' + q4 + ' Q5: ' + q5 + ' Q6: ' + q6 + " Date: " + Date.now() + " Game Session: " + gameID +"\n";
     questions = 'Q: '+ q1 + ' Q: '+ q2 + ' Q: '+ q3 + ' Q: '+ q4 + ' Q: '+ q5 + ' Q: '+ q6;
    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"

  var passingObject = {userID: id, username: username, action: type, description: questions, date: dateString, gameSession: gameID }

  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringThing, function (err) {
    console.log('Student information logged');
  });


  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
      stringThing = '\nUsername: ' +username +" ID: " + id + ' Event Type: ' + type  + " Minigame: " + mininumber+  "Score: " + score + " Date: " + Date.now() + " Game Session: " + gameID +"\n";

    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    var dateString =  moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC"

 var passingObject = {userID: id, username: username, action: "Minigame " + mininumber, description: "Score: " + score, date: dateString, gameSession: gameID }
  


  // Append stringTem to file 'logs/useraction.txt'
  fs.appendFile('logs/User_'+id+'_logFile.txt', stringThing, function (err) {
    console.log('Student information logged');
  });

  //Saves the new Log FIle to the Private FTP Server
  saveNewLog(req,res,str);
  
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
