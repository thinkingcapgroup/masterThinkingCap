// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../model/auth/auth'),
    // errorNotifications
    errorNotifications = [],
    // successNotifications
    successNotifications = [];

/**
 * router - GET method for our bugReports route '/bugreports'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function(req, res){
  renderTestArea(req, res);
});

router.post('/recordTest', auth, function (req, res, next) 
{
  // Get user id
  var id = req.user.userId,
  // Get questions afrom test
  question = req.body.questionID,
  answer = req.body.studentAnswer,
  correct = req.body.isCorrect,
  test = req.body.testId;

  var passingObject = {studentId: id, questionId: question, studentAnswer: answer, isCorrect: correct, testId: test }

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
