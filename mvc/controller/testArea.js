// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    moment = require('moment'),
    // Require the Auth middleware
    auth = require('../model/auth/auth'),
    // errorNotifications
    errorNotifications = [],
    startTimeUnix = 0;
    // successNotifications
    successNotifications = [];

var correctTotal = 0;

/**
 * router - GET method for our bugReports route '/bugreports'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function(req, res){
  startTimeUnix = Date.now();
    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
  startTime = moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC";
  renderTestArea(req, res);
});

router.post('/recordDemo', auth, function (req, res, next) 
{
  // Get user id
  var id = req.user.userId,
  userName = req.body.name, 
  userAge = req.body.age, 
  userYear = req.body.year, 
  userClassTaken = req.body.classTaken, 
  userGender = req.body.gender, 
  userHearingStatus = req.body.hearingStatus, 
  userEthnicity = req.body.ethnicity, 
  userLanguage = req.body.language,
  test = "Demo-" + req.user.userId + "-" + req.user.testSession;
  var passingObject = {userId: id, name: userName, age: userAge, schoolYear: userYear, statisticCoursesTaken: userClassTaken, gender: userGender, deaf: userHearingStatus, ethnicity: userEthnicity, nativeLanguage: userLanguage, testId: test  }


  require('../model/testArea/demoLog.js')(req, passingObject, function(err, success) {
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

router.post('/recordConsent', auth, function (req, res, next) 
{
  // Get user id
  var id = req.user.userId,
  nameText = req.body.name, 
  dateText = req.body.date, 
  IDText = req.body.stuID;
  var passingObject = {userId: id, name: nameText, date: dateText, stuID: IDText}


  require('../model/testArea/consent.js')(req, passingObject, function(err, success) {
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

router.post('/recordTest', auth, function (req, res, next) 
{
  // Get user id
  var id = req.user.userId,
  // Get questions afrom test
  question = req.body.questionID,
  answer = req.body.studentAnswer,
  time = 0,
  confidence = req.body.confidence,
  endTime = "",
  correct = req.body.isCorrect,
  test = req.body.testId + "-" + req.user.userId + "-" + req.user.testSession;
  if(correct == "Answer Correct"){
    console.log('correct')
    correctTotal++;
  }


  if(question == 19){
    endTimeUnix = Date.now();
    var timestamp = new Date().toISOString()
    var x = timestamp.split('-')
    endTime = moment(timestamp).format('MMMM Do YYYY') + " " + x[2].substr(3,8) + " UTC";
    timeSpent = endTimeUnix - startTimeUnix;
    timeSpent = timeSpent / 1000
    var minutes = Math.floor(timeSpent / 60);
    var seconds = Math.floor(timeSpent - minutes * 60);
	var playerConsent = "Yes";

    time = minutes + " minutes and " + seconds + " seconds"
      var passingObject2 = {userId: id, startTime: startTime, endTime: endTime, timeSpent: time, testId: test, correctTotal:correctTotal, consent: playerConsent}

     require('../model/testArea/testTime.js')(req, passingObject2, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
      
    });


    if(question >= 19){
      correctTotal = 0;
    }
  }
 

  var passingObject = {studentId: id, questionId: question, studentAnswer: answer, isCorrect: correct, testId: test, start: startTime, end: endTime, totalTime: time, confidence: confidence}


  require('../model/testArea/testLog.js')(req, passingObject, function(err, success) {
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

router.post('/newTestSession', auth, function (req, res, next) 
{
  // Get user id
  var test = parseInt(req.user.testSession) + 1,
  userId = req.user.userId;

  var passingObject = {testSession: test, user: userId}

  require('../model/users/updateTestSession.js')(req, passingObject, function(err, success) {
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
 * renderBugReports - renders the bugReports view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderTestArea(req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res),
      username = req.user.userName,
      displayName = req.user.displayName;

  model.content.pageTitle = 'Test Area';
  model.layout = 'test';
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  res.render('testArea', model)
  // Get every bugReports

}

// Export bugreports router
module.exports = router;
