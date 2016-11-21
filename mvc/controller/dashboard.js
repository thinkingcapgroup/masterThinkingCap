// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../model/auth');

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
    renderDashboard(req, res);
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
  var model = require('../model/global')(req, res),
      username = req.user.userName,
      displayName = req.user.displayName;

  // Render /dashboard using the 'dashboard' view and model
  res.render('dashboard', model);
}

// Export dashboard router
module.exports = router;
