// Require express
var express = require('express'),
    fs = require('fs');
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../model/auth/auth'),
    // errorNotifications
    errorNotifications = [],
    lineArray = [],
    // successNotifications
    successNotifications = [];


/**
 * router - GET method for our bugReports route '/bugreports'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function(req, res){
  verifyUserIsResearchDev(req, res);
});

/**
 * router - POST method for Mars University game route '/setComplete'
 * @param  {String} '/setComplete' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */

/**
 * verifyUserIsADev - verifies if user is a developer
 * and redirects them to appropriate page
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function verifyUserIsResearchDev (req, res) {
  // Wipe out notifications
  errorNotifications.length = successNotifications.length = 0;

  // If user is not a dev
  if (req.user.role < 5) {
    // Redirect them to dashboard
    res.redirect('/dashboard');
  }

  // If user is a dev
  else {
    //grab information
    readLines();
    console.log(lineArray)
    // render view
    renderResearchArea(req, res);
  }
}

/**
 * renderBugReports - renders the bugReports view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderResearchArea(req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res),
      username = req.user.userName,
      displayName = req.user.displayName;

  model.content.pageTitle = 'Research Area';
  model.content.researchData = lineArray
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  res.render('researchArea', model)
  // Get every bugReports

}

function readLines(){
  lineArray = fs.readFileSync('logInfo/userAction.txt').toString().split('\n');
}

// Export bugreports router
module.exports = router;
