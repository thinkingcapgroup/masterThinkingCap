// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our about route '/about'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  // Render about view
  renderAbout(req, res);
});

/**
 * renderAbout - renders the about view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderAbout (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = 'About';
  model.globalNavigationMode = require('../../model/global/globalNavigationMode')(req, res);

  // Render /about using the 'about' view and model
	res.render('supportLinks/about', model);
}

// Export about router
module.exports = router;
