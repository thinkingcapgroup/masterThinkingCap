// Require Express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our index route '/'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function(req, res) {
  // Call the renderIndex function to render index
  renderIndex(req, res);
});

/**
 * renderIndex - Renders our index view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderIndex (req, res) {
  // Require the global app model
  var model = require('../model/global')(req, res);

  // Render /index using our 'index' view and model
  if(req.cookies.username != null){
  	res.redirect('/dashboard');
  }
  else{
  	res.render('index', model)
  }
}

// Export index router
module.exports = router;
