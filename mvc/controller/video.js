// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    moment = require('moment'),
    startTime = "",
    startTimeUnix = "",
    // Require the Auth middleware
    auth = require('../model/auth/auth');

/**
 * router - GET method for video route '/video'
 * @param  {String} '/'    - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req    - Express Request Object
 * @param  {Object} res    - Express Response Object
 */

router.get('/', auth, function (req, res) {
  startTimeUnix = Date.now();
  startTime = moment().format('MMMM Do YYYY h:mm:ss a');
  // If user account is activated
  if (req.user.role > 2) {
    // Render dashboard view
    renderVideo(req, res);
  }

  // Otherwise
  else {
    // Redirect to accountactivation
    res.redirect('/dashboard');
  }
});

/**
 * router - POST method for [NewPageName] route '/[NewPageName]'
 * @param  {String} '/'    - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req    - Express Request Object
 * @param  {Object} res    - Express Response Object
 */
router.post('/', auth, function (req, res) {
  res.redirect('/video');
});
router.post('/change', auth, function (req, res, next) {
  startTimeUnix = Date.now();
  startTime = moment().format('MMMM Do YYYY h:mm:ss a');
});
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

    require('../model/video/videolog.js')(req, passingObject2, function(err, success) {
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
/**
 * render[NewPageName] - renders the [NewPageName] view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderVideo (req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res);
    model.layout = 'videolayout'
  model.content.pageTitle = 'Thinking Cap';
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  // Render /[newPageName] using the '[newPageName]' view and model
  res.render('video', model);
}

// Export [NewPageName] router
module.exports = router;