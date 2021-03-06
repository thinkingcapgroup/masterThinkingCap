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

  // If user is already logged in
  if ((req.cookies.username && req.cookies.password) || (req.cookies.email && req.cookies.password)) {
    // Redirect to dashboard
    res.redirect('/dashboard');
  }
  // Otherwise
  else {
    // Call the renderIndex function to render index
    renderIndex(req, res);
  }
});

/**
 * renderIndex - Renders our index view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderIndex (req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res);

  model.content.pageTitle = 'Thinking Cap';

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
