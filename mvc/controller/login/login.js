// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Notifications
    errorNotifications = [], successNotifications = [];

/**
 * router - GET method for login route '/login'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req,res) {
  // If user is already logged in
  if (req.cookies.username && req.cookies.password) {
    // Redirect to dashboard
    res.redirect('/dashboard');
  }
  else {
    // Render login view
    renderLogin(req, res);
  }
});

/**
 * router - POST method for login route '/login'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', function (req,res) {
  // Verify user login info
  loginUser(req, res);
});

/**
 * renderLogin - renders the login view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderLogin (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = 'Login';
  // Reset Notifications
  errorNotifications.length = successNotifications.length = 0;

  // If there is a login error notifification
  if (req.cookies.loginErrorMessage) {
    // push to the array
    errorNotifications.push(req.cookies.loginErrorMessage);

    // add to the model
    model.errorNotifications = errorNotifications;
  }

  // If there is a login success notifification
  if (req.cookies.loginSuccessMessage) {
    // push to the array
    successNotifications.push(req.cookies.loginSuccessMessage);

    // add to the model
    model.successNotifications = successNotifications;
  }

  // Clear notifification cookies
  res.clearCookie('loginSuccessMessage');
  res.clearCookie('loginErrorMessage');

  // Render /login using the 'login/login' view and model
  res.render('login/login', model);
}

/**
 * loginUser - verifies user credentials and logs them in
 * if they are valid, otherwise redirects to /login
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function loginUser (req, res) {
  // Require our encryption model
  var encrypt = require('../../model/encrypt'),
      // Request body
      rb = req.body;

  // If user pressed loginSubmit button
  if (rb.loginSubmit) {
    // Set request user
    req.user = {
      // userName as the typed username
      userName: rb.username,
      // password as the encrypted version of typed password
      password: encrypt(rb.password)
    };

    // Set cookies for user credentials
    res.cookie('username', req.user.userName);
    res.cookie('password', req.user.password);

    // Redirect to /dashboard where they will go through authentication
    res.redirect('/dashboard');
  }

  // Otherwise
  else {
    // Redirect to /login
    res.redirect('/login');
  }
}

// Export login router
module.exports = router;
