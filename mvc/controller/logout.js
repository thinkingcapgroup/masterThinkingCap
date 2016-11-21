// Require Express
var express = require('express'),
    // Get the express Router
    router = express.Router();

/**
 * router - GET method for our logout route '/logout'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function(req, res){
  // Call logoutUser function which logs user out
  logoutUser(req, res);
});

/**
 * logoutUser - Clears user cookies, logs user out and redirects to index
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function logoutUser (req, res) {
  // Clear user information cookies
  res.clearCookie('username');
  res.clearCookie('email');
  res.clearCookie('displayName');
  res.clearCookie('password');

  // Set our user req to null
  req.user = null;

  // Log out user
  req.logout();

  // Redirect to index
  res.redirect('/');
}

// Export logout router
module.exports = router;
