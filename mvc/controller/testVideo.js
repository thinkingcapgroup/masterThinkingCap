// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our marsUniversity route '/marsUniversity'
 * @param  {String} '/testVideo' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  // Render Mars University index
  renderTestVideo(req, res);
});

/**
 * renderMarsUniversity - renders the Mars University view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderTestVideo (req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res);

  model.content.pageTitle = 'Test Video';
 // model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  res.render('testVideo', model);
}

// Export marsUniversity router
module.exports = router;
