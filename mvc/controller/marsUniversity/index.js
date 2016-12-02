// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../../model/auth'),
    // Require body-parser module
    bodyParser = require('body-parser'),
    // Require fs module
    fs = require('fs'),
    object;

/**
 * router - GET method for our marsUniversity route '/marsUniversity'
 * @param  {String} '/marsUniversity' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/marsuniversity', auth, function (req, res) {
  // Render Mars University index
  renderMarsUniversity(req, res);
});

/**
 * renderMarsUniversity - renders the Mars University view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderMarsUniversity (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = 'Thinking Cap - Mars University';
  model.content.gameTitle = 'Mars University';
  model.globalNavigationMode = require('../../model/globalNavigationModeAuth')(req, res);

  // Render /marsUniversity using the 'marsUniversity/index' view and model
  res.render('marsUniversity/index', model);
}

// Export marsUniversity router
module.exports = router;
