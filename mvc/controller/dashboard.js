// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../model/auth/auth');

/**
 * router - GET method for dashboard route '/dashboard'
 * @param  {String} '/'    - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req    - Express Request Object
 * @param  {Object} res    - Express Response Object
 */
router.get('/', auth, function (req, res) {
  // If user account is activated
  if (req.user.role > 1) {
    // Render dashboard view
    //renderDashboard(req, res);
     res.redirect('/marsuniversity');
  }

  // Otherwise
  else {
    // Redirect to accountactivation
    res.redirect('/accountactivation');
  }
});

/**
 * renderDashboard - renders the user dashboard view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderDashboard (req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res),
      username = req.user.userName,
      displayName = req.user.displayName;

  model.content.pageTitle = 'Thinking Cap';
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);


  // // Set user to authenticated
  // model.globalNavigationMode.authenticatedUser = true;
  // model.globalNavigationMode.username = req.user.userName;
  // model.globalNavigationMode.accountDisplay = (req.user.displayName !== '') ? req.user.displayName : 'My Account';
  //
  // // If user is an admin
  // if (req.user.role === 5) {
  //   // Allow user to view admin panel
  //   model.globalNavigationMode.adminUser = true;
  // }

  // Render /dashboard using the 'dashboard' view and model
  res.render('dashboard', model);
}

// Export dashboard router
module.exports = router;
