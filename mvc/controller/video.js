// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
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
  // If user account is activated
  if (req.user.role > 1) {
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

/**
 * render[NewPageName] - renders the [NewPageName] view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderVideo (req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res);

  model.content.pageTitle = 'Thinking Cap';
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  // Render /[newPageName] using the '[newPageName]' view and model
  res.render('video', model);
}

// Export [NewPageName] router
module.exports = router;