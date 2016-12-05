// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our help route '/help'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  // Render help view
  renderHelp(req, res);
});

/**
 * renderHelp - renders the help view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderHelp (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = 'Help';
  model.globalNavigationMode = require('../../model/globalNavigationMode')(req, res);

  // Render /help using the 'help' view and model
	res.render('supportLinks/help', model);
}

// Export help router
module.exports = router;
