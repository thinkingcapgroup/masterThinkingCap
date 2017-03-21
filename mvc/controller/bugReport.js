// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - POST method for our bugreport route '/bugreport'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', function (req, res) {
  // Submits bug report
  submitBugReport(req, res);
});

/**
 * submitBugReport - If user has entered a bug report,
 * submits the bug report to our database
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function submitBugReport (req, res) {
  // Bug report variable
  var report = {},
      // Req.body
      rb = req.body,
      // Gets the currentRoute
      currentRoute = req.header('Referer') || '/';

  // If user clicked submit button
  if (rb.submitBugReport) {
    // fill the report fields
    report.subject = rb.bugSubject;
    report.category = rb.bugCategory;
    report.description = rb.bugDescription;
    report.username = req.cookies.username;
    report.date = new Date();

    if(req.cookies.username == "" || req.cookies.username == null){
      report.username = 'Guest';
    }

    // Call the model to insert bug
    require('../model/bugReports/insertBugReport')(req, report, function (err, success) {
      // If there was an error submiting the bug report
      if (err) {
        console.error(err);
      }
      else {
        // Redirect to our current route
        res.redirect(currentRoute);
      }
    });
  }
  // Otherwise
  else {
    // Redirect to our current route
    res.redirect(currentRoute);
  }
}

// Export bugreport router
module.exports = router;
