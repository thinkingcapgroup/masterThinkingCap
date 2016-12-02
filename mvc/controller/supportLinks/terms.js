// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our terms route '/terms'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  // Render terms view
  renderTerms(req, res);
});

/**
 * renderTerms - renders the terms view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderTerms (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = 'Terms of Service';
  model.globalNavigationMode = require('../../model/globalNavigationMode')(req, res);

  // Render /terms using the 'terms' view and model
	res.render('supportLinks/terms', model);
}

// Export terms router
module.exports = router;
