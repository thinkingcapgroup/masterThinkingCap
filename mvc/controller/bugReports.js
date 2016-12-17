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
  verifyUserIsADev(req, res);
});

/**
 * router - POST method for Mars University game route '/setComplete'
 * @param  {String} '/setComplete' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/setComplete', auth, function (req, res) {
  // TextFile Saving
  var stringTem = req.body.subjectText;

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/bugReports/updateBugReports.js')(req, [stringTem], function(err, success) {
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
 * verifyUserIsADev - verifies if user is a developer
 * and redirects them to appropriate page
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function verifyUserIsADev (req, res) {
  // Wipe out notifications
  errorNotifications.length = successNotifications.length = 0;

  // If user is not a dev
  if (req.user.role !== 5) {
    // Redirect them to dashboard
    res.redirect('/dashboard');
  }

  // If user is a dev
  else {
    // render view
    renderBugReports(req, res);
  }
}

/**
 * renderBugReports - renders the bugReports view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderBugReports(req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res),
      username = req.user.userName,
      bugReports,
      displayName = req.user.displayName;

  model.content.pageTitle = 'Bug Reports';
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);


  // Get every bugReports
  require('../model/bugReports/getAllBugReports')(req, function(err, b) {
    // If there is a database error
    if (err) {

      // If there where no bug reports
      if (err === 'No bug reports found!') {
        // Set model to emptyState
        model.emptyState = true;
      }
      // Otherwise
      else {
        // Show user the error message
        errorNotifications.push(err);
      }

      console.error(err);
    }

    // Otherwise bug reports were found
    else {
      // Set the model's bugReports to recieved data
      model.bugReports = b;
    }

    // If there are errors notifications attach them to model
    model.errorNotifications = (errorNotifications.length > 0) ? errorNotifications : null;

    // If there are success notifications attach them to model
    model.successNotifications = (successNotifications.length > 0) ? successNotifications : null;

    // Render /bugreports using the 'bugReports' view and model
    res.render('bugReports', model);
  });
}

// Export bugreports router
module.exports = router;
