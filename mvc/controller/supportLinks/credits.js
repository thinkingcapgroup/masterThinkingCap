// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our credits route '/credits'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  // Render credits view
  renderCredits(req, res);
});

/**
 * renderCredits - renders the credits view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderCredits (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = 'Credits';

  // Render /credits using the 'credits' view and model
	res.render('supportLinks/credits', model);
}

// Export credits router
module.exports = router;
