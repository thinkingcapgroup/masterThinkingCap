// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../../model/auth'),
    // Require nodemailer module
    nodemailer = require('nodemailer'),
    // Notifications
    errorNotifications = [], successNotifications = [],
    // Route Pattern
    routePattern = '[a-z0-9]+',
    // Account Activation Route
    accountActivationRoute = '/accountactivation/',
    // User account activation route with code
    userAccountActivationRoute = '/:code(' + routePattern + ')';

/**
 * router - GET method for accountactivation route '/accountactivation'
 * @param  {String} '/' - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  errorNotifications.length = successNotifications.length = 0;

  // Render user account activation view
  renderAccountActivation(req, res);
});

/**
 * router - POST method for accountactivation route '/accountactivation'
 * @param  {String} '/accountactivation' - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', auth, function(req,res) {
  // Handles post
  accountActivationPost(req, res);
});

router.get(userAccountActivationRoute, function (req, res) {
  activateUserAccount(req, res);
});

/**
* renderAccountActivation - renders the account activation view
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
*/
function renderAccountActivation (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = ' Account Activation';
  model.globalNavigationMode = require('../../model/globalNavigationModeAuth')(req, res);

  // Display notifications if there are any
  model.errorNotifications = (errorNotifications)? errorNotifications : null;
  model.successNotifications = (successNotifications)? successNotifications : null;

  // Render /accountactivation using the 'login/accountActivation' view and model
  res.render('login/accountActivation', model);
}

/**
* accountActivationPost - handles post for submitting user email
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
*/
function accountActivationPost (req, res) {
  // Request body
  var rb = req.body;

  // Reset notifications
  errorNotifications.length = successNotifications.length = 0;

  if (rb.resendActivationEmail) {
    // If user entered an email address
    if (rb.email) {

      // Get the account with that email
      var email = rb.email;

      // Get the account activation code by the emal entered
      require('../../model/getAccountActivationCodeByEmail')(req, email, function (err, userData) {
        // If there was an error getting the code
        if (err) {
          console.error(err);
          // Push an error message
          errorNotifications.push('It seems an account with that email has already been activated or your account hasn\'t been created yet.');

          // Call renderAccountActivation
          renderAccountActivation(req, res);
        }

        // Otherwise we recieved data
        else {
          // Resend activation email
          resendActivationEmail(req, res, userData);
        }
      });
    }

    // Otherwise user did not enter an email address
    else {
      // Push message
      errorNotifications.push('Please enter an email to send the activation code.');

      // Call renderAccountActivation
      renderAccountActivation(req, res);
    }
  }

  // Otherwise
  else {
    // Redirect to /accountactivation
    res.redirect('/accountactivation');
  }
}

/**
* activateUserAccount - activates the user account
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
*/
function activateUserAccount (req, res) {
  var data = {
    activationCode: req.params.code
  };

  // Call activateUserAccount and send in the data
  require('../../model/activateUserAccount')(req, data, function (err, accountData) {
    // If there was an error
    if (err) {
      console.error(err);
      // Push error message
      errorNotifications.push(err);

      // Call renderUserAccountActivation
      renderAccountActivation(req, res);
    }

    // Otherwise we recieved data
    else {

      data = accountData;

      // Create new user data object
      var newUserData = {
        // Use user id
        userId: accountData.userId,
        // Set column to update to role
        column: 'role',
        // Set value to update to 2
        value: 2
      };

      // Call updateUserColumnById and send in newUserData
      require('../../model/updateUserColumnById')(req, newUserData, function (errr, success) {
        // If there was an error
        if (errr) {
          console.error(err);
          // Push error message
          errorNotifications.push(errr);

          // Call renderUserAccountActivation
          renderAccountActivation(req, res);
        }

        // Otherwise update was successful
        else {
          require('../../model/deleteAccountActivationCode')(req, data, function (errrr, deleted) {
            if (errrr) {
              console.error(errrr);
              errorNotifications.push(errrr);
              renderAccountActivation(req, res);
            }
            else {
              // Add a success message
              res.cookie('loginSuccessMessage', 'Congratulations your account has been activated!');
              successNotifications.push('Your account has been activated!');

              // Redirect to /login
              res.redirect('/login');
            }
          });
        }
      });
    }
  });
}

/**
* resendActivationEmail - resends the activation email to user
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
* @param  {Object} data - User data object
*/
function resendActivationEmail (req, res, data) {
  // Get the authentication configuration data
  var authConfig = require('../../../config/auth'),
      // Create a nodemailer transporter
      transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        // auth will be our Developer email
        auth: authConfig.thinkingcapMail
      }),
      // Page Url
      pageUrl = '',
      // mailOptions Object
      mailOptions = {
        // Email will be sent from our gmail account
        from: authConfig.thinkingcapMail.user,
        // Reciever will be the user's email
        to: data.email,
        // Email Subject
        subject: 'Thinking Cap Activation Email',
        // Email Html
        html: ''
      };

  // Make the page url
  pageUrl = req.protocol + '://' + req.get('host') + accountActivationRoute + data.activationCode;

  // If user entered a display name
  if (data.displayName && data.displayName !== '') {
    // Use that for our mail
    mailOptions.html = '<h1>Welcome to Thinking Cap Again, ' + data.displayName + '!</h1>';
  }
  // Otherwise
  else {
    // Use their userName
    mailOptions.html = '<h1>Welcome to Thinking Cap Again, ' + data.userName + '!</h1>';
  }

  // Create the html string
  mailOptions.html += '<p>It looks like a black hole sucked your last activation email. Don\'t worry! To activate you Thinking Cap account simply access the following page: <a href="';
  // mailOptions.html += pageUrl + '" target="_blank">' + pageUrl + '</a> and enter the following code: <span style="background: #e4e4e4; padding: 5px;">' + data.activationCode + '</span>.</p>';
  mailOptions.html += pageUrl + '"target="_blank">' + pageUrl + '</a>.';


  // Send mail through transporter with the mailOptions
  transporter.sendMail(mailOptions, function (err, success) {
    // If there was an error
    if (err) {
      console.error(err);
      // Push error message
      errorNotifications.push('There was a problem resending you the activation email. Please try again.');

      // renderAccountActivation view
      renderAccountActivation(req, res);
    }

    // Otherwise
    else {
      // Push notifification message
      successNotifications.push('An email has been sent to you. Please verify it and click the link to activate your account.');
      // Allow user to login
      renderAccountActivation(req, res);
    }
  });
}

// Export accountactivation router
module.exports = router;
