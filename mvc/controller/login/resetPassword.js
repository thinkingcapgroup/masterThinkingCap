// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../../model/auth/auth'),
    // Require crypto module
    crypto = require('crypto'),
    // Require nodemailer module
    nodemailer = require('nodemailer'),
    // Require validator
    validator = require('validator'),
    // Require moment
    moment = require('moment'),
    // Notifications
    errorNotifications = [], successNotifications = [],
    // Route Pattern
    routePattern = '[a-z0-9]+',
    // Account Activation Route
    resetPasswordRoute = '/resetpassword/',
    // User account activation route with code
    userResetPasswordRouteRoute = '/:code(' + routePattern + ')';

/**
 * router - GET method for resetpassword route '/resetpassword'
 * @param  {String} '/' - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', function (req, res) {
  // If user is already logged in
  if ((req.cookies.username && req.cookies.password) || (req.cookies.email && req.cookies.password)) {
    // Redirect to dashboard
    res.redirect('/dashboard');
  }
  else {
    errorNotifications.length = successNotifications.length = 0;

    // Render reset password view
    renderResetPasswordEmail(req, res);
  }
});

/**
 * router - POST method for resetpassword route '/resetpassword'
 * @param  {String} '/' - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', function(req,res) {
  // Handles post
  resetPasswordEmailPost(req, res);
});

/**
 * router - GET method for resetpassword route '/resetpassword'
 * @param  {String} '/' - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get(userResetPasswordRouteRoute, function (req, res) {
  validatePasswordCode(req, res);
});

/**
* renderResetPasswordEmail - renders the reset password email view
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
*/
function renderResetPasswordEmail (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = ' Reset Password';
  model.globalNavigationMode = require('../../model/global/globalNavigationMode')(req, res);

  // Display notifications if there are any
  model.errorNotifications = (errorNotifications)? errorNotifications : null;
  model.successNotifications = (successNotifications)? successNotifications : null;

  model.resetPasswordView = false;

  // Render /resetPassword using the 'login/resetPassword' view and model
  res.render('login/resetPassword', model);
}

/**
* renderResetPassword - renders the reset password view
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
*/
function renderResetPassword (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = ' Reset Password';
  model.globalNavigationMode = require('../../model/global/globalNavigationMode')(req, res);

  // Display notifications if there are any
  model.errorNotifications = (errorNotifications)? errorNotifications : null;
  model.successNotifications = (successNotifications)? successNotifications : null;

  model.resetPasswordView = true;

  // Render /resetPassword using the 'login/resetPassword' view and model
  res.render('login/resetPassword', model);
}

/*
 * validatePasswordCode - Validates if the code is in the database
 * and unexpired and redirects user to appropriate view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function validatePasswordCode (req, res) {
  var code = req.params.code,
      currentTime,
      activeLink;

  // If user is already logged in
  if ((req.cookies.username && req.cookies.password) || (req.cookies.email && req.cookies.password)) {
    // Redirect to dashboard
    res.redirect('/dashboard');
  }
  else {
    errorNotifications.length = successNotifications.length = 0;

    // Verify code exists
    require('../../model/passwordResetCodes/getResetPasswordCodeWithCode')(req, code, function (err, result) {
      if (err) {
        errorNotifications.push(err);
        renderResetPasswordEmail(req, res);
      }
      else {
        // Get current time
        currentTime = moment.utc().format();

        // If current time is between start and end time then link is active
        activeLink = moment(currentTime).isBetween(result.startTime, result.endTime, null, '[]');

        // If link is active
        if (activeLink) {
          res.cookie('resetPasswordId', result.id);
          res.cookie('resetPasswordEmail', result.userEmail);
          res.cookie('resetPasswordPasswordCode', result.passwordCode);
          res.cookie('resetPasswordStartTime', result.startTime);
          res.cookie('resetPasswordEndTime', result.endTime);
          renderResetPassword(req, res);
        }
        // Otherwise link is not active
        else {
          // Delete the row
          require('../../model/passwordResetCodes/deletePasswordResetCodes')(req, result, function (errr, success) {
            // If there is an error
            if (errr) {
              // Push error
              errorNotifications.push(errr);
            }

            // Alert user that the link has expired
            errorNotifications.push('It appears the link has expired. Please enter your email below to recieve a new link to reset password.');

            // renderResetPasswordEmail
            renderResetPasswordEmail(req, res);
          });
        }
      }
    });
  }
}

/**
* resetPasswordEmailPost - handles post for submitting user email
* @param  {Object} req - Express Request Object
* @param  {Object} res - Express Response Object
*/
function resetPasswordEmailPost (req, res) {
  // Request body
  var rb = req.body,
      validUserData,
      encrypt = require('../../model/global/encrypt');
      passwordCodeRow = {},
      data = {};

  // Reset notifications
  errorNotifications.length = successNotifications.length = 0;

  // If user is sending the email with link
  if (rb.sendResetPasswordEmail) {
    // If user entered an email
    if (rb.email) {
      // If email entered is a valid email
      if (validator.isEmail(rb.email)) {
        var startTime = moment.utc(),
            endTime = moment.utc().add(15, "m");

        // Create data to send
        data.userEmail = rb.email;
        data.passwordCode = crypto.randomBytes(16).toString('hex');
        data.startTime = startTime.format();
        data.endTime = endTime.format();

        require('../../model/passwordResetCodes/insertResetPasswordCode') (req, data, function (err, success) {
          // If there was an error
          if (err) {
            errorNotifications.push(err);
            renderResetPasswordEmail(req, res);
          }
          else {
            // Call send email function
            sendEmail(req, res, data);
          }
        });
      }
      else {
        // Push an error message
        errorNotifications.push('Please enter a valid email to reset password.');

        // Call render
        renderResetPasswordEmail(req, res);
      }
    }
    else {
      // Push an error message
      errorNotifications.push('Please enter an email to reset password.');

      // Call render
      renderResetPasswordEmail(req, res);
    }
  }
  // Otherwise if user is resetting password
  else if (rb.resetPasswordButton) {
    validUserData = validateUserInput(req);

    // If data entered is valid
    if (validUserData) {
      data = {};
      data.password = encrypt(rb.password);
      data.column = 'email';
      data.columnValue = rb.email;

      require('../../model/users/updatePassword')(req, data, function (err, success) {
        if (err) {
          errorNotifications.push(err);
          renderResetPassword(req, res);
        }
        else {
          passwordCodeRow.id = req.cookies.resetPasswordId;
          passwordCodeRow.userEmail = req.cookies.resetPasswordEmail;
          passwordCodeRow.passwordCode = req.cookies.resetPasswordPasswordCode;
          passwordCodeRow.startTime = req.cookies.resetPasswordStartTime;
          passwordCodeRow.endTime = req.cookies.resetPasswordEndTime;

          require('../../model/passwordResetCodes/deletePasswordResetCodes')(req, passwordCodeRow, function (errr, deleted) {
            if (errr) {
              console.error(errr);
            }

            res.clearCookie('resetPasswordId');
            res.clearCookie('resetPasswordEmail');
            res.clearCookie('resetPasswordPasswordCode');
            res.clearCookie('resetPasswordStartTime');
            res.clearCookie('resetPasswordEndTime');

            res.cookie('loginSuccessMessage', 'Congratulations your password has been updated.');
            res.redirect('/login');
          });
        }
      });
    }
    else {
      renderResetPassword(req, res);
    }
  }
  else {
    res.redirect('/resetpassword');
  }
}

/**
 * sendMailToUser - sends email to the user
 * @param  {Object} req  - Express Request Object
 * @param  {Object} res  - Express Response Object
 * @param  {Object} data - Data object
 */
function sendEmail (req, res, data) {
  var authConfig = require('../../../config/auth'),
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 465, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        // auth will be our Developer email
        auth: authConfig.thinkingcapGmail
      }),
      expirationDate = '',
      pageUrl = '',
      mailOptions = {
        // Email will be sent from our gmail account
        from: authConfig.thinkingcapMail.user,
        // Reciever will be the user's email
        to: data.userEmail,
        // Email Subject
        subject: 'Thinking Cap Password Reset',
        // Email Html
        html: ''
      };

      pageUrl = req.protocol + '://' + req.get('host') + resetPasswordRoute + data.passwordCode;

      expirationDate = moment(data.endTime).local().format('MMMM Do, YYYY') + ' at ' + moment(data.endTime).local().format('hh:mm:ss a');

      mailOptions.html = '<h1>Reset your Thinking Cap account password</h1>';
      mailOptions.html += '<p>Hello, you are recieveing this email because you have requested a password reset. Please visit <a target=\'_blank\' href=\'' + pageUrl + '\'>' + pageUrl + '</a> to reset your password.';
      mailOptions.html += 'Note that the following link will only be available until ' + expirationDate + '. If you did not send a request to reset your password please ignore this email.</p>';

      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          errorNotifications.push(err);
          errorNotifications.push(pageUrl);
          renderResetPasswordEmail(req, res);
        }
        else {
          successNotifications.push('A link to reset your password has been sent to your email.');
          renderResetPasswordEmail(req, res);
        }
      });
}

/**
 * validateUserInput - validates user input data
 * @param  {Object} req    - Express Request Object
 * @return {Boolean} valid - Returns whether user data is valid
 */
function validateUserInput (req) {
  var valid = true,
      pattern = {
        password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
      },
      rb = req.body;

  // Verify email is an email
  if (!validator.isEmail(rb.email)) {
    errorNotifications.push('Please enter a valid email.');
    valid = false;
  }

  // If email entered doesn't match email tied to link
  if (rb.email !== req.cookies.resetPasswordEmail) {
    errorNotifications.push('Email entered does not match the email this link was sent to.');
    valid = false;
  }

  // Verify password matches our pattern
  if (!validator.matches(rb.password, pattern.password)) {
    errorNotifications.push('Password must beat least 8 chars long with a mixture of uppercase and lowercase letters.');
    valid = false;
  }

  // Verify passwords match
  if (rb.password !== rb.passwordCheck) {
    errorNotifications('Passwords do not match!');
    valid = false;
  }

  // Return whether user data is valid
  return valid;
}
module.exports = router;
