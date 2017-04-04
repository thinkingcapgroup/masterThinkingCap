// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../../model/auth/auth'),
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
router.get('/mod3', auth, function (req, res) {
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
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = 'Thinking Cap - Module 3';
  model.content.gameTitle = 'Module 3';
  model.globalNavigationMode = require('../../model/global/globalNavigationModeAuth')(req, res);

  // Render /marsUniversity using the 'marsUniversity/index' view and model
  res.render('mod3/index', model);
}

// Export marsUniversity router
module.exports = router;
