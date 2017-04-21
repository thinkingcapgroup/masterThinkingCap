// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../../model/auth/auth'),
    // Require body-parser module
    bodyParser = require('body-parser'),
    moment = require('moment'),
    startTime = "",
    startTimeUnix = "",
    // Require fs module
    fs = require('fs'),
    object;

/**
 * router - GET method for our marsUniversity route '/marsUniversity'
 * @param  {String} '/marsUniversity' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  // Render Mars University index
   startTimeUnix = Date.now();
  startTime = moment().format('MMMM Do YYYY h:mm:ss a');
  renderMarsUniversity(req, res);
});

/**
 * renderMarsUniversity - renders the Mars University view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderMarsUniversity (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);
  
  model.layout = 'videolayout'
  model.content.pageTitle = 'Thinking Cap - Module 3';
  model.content.gameTitle = 'Module 3';
  model.globalNavigationMode = require('../../model/global/globalNavigationModeAuth')(req, res);

  // Render /marsUniversity using the 'marsUniversity/index' view and model
  res.render('mod3/biasvideo', model);
}


router.post('/back', auth, function (req, res, next) {
  // Get user id
  var id = req.user.userId,
  // Get questions afrom test
  time = 0,
  videoid = req.body.videoNum,
  endTime = "";

  endTimeUnix = Date.now();
  endTime = moment().format('MMMM Do YYYY h:mm:ss a');
  timeSpent = endTimeUnix - startTimeUnix;
  timeSpent = timeSpent / 1000
  var minutes = Math.floor(timeSpent / 60);
  var seconds = Math.floor(timeSpent - minutes * 60);
  time = minutes + " minutes and " + seconds + " seconds"
  var passingObject2 = {userId: id, startTime: startTime, endTime: endTime, timeSpent: time, videoID: videoid}

    require('../../model/video/videolog.js')(req, passingObject2, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
      
    });
  // End response

});

// Export marsUniversity router
module.exports = router;
