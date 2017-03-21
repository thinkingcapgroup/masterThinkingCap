// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our consentAuthorization route '/consentAuthorization'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  if ((req.cookies.username && req.cookies.password) || (req.cookies.email && req.cookies.password)) {
    // Redirect to dashboard
    res.redirect('/dashboard');
  }
  else {
    // Render consentAuthorization view
    renderConsentAuthorization(req, res);
  }
});

/**
 * renderConsentAuthorization - renders the consentAuthorization view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderConsentAuthorization (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = 'Consent Authorization';

  // Render /consentAuthorization using the 'login/consentAuthorization' view and model
	res.render('login/consentAuthorization', model);
}

// Export consentAuthorization router
module.exports = router;
