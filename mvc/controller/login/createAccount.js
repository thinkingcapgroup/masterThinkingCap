// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require crypto module
    crypto = require('crypto'),
    // Require validator module
    validator = require('validator'),
    // Require nodemailer module
    nodemailer = require('nodemailer'),
    // Require express-recaptcha module
    recaptcha = require('express-recaptcha'),
    // Notifications
    successNotifications = [], errorNotifications = [];

/**
 * router - GET method for createaccount route '/createaccount'
 * @param  {String} '/'                         - local route string
 * @param  {Object} recaptcha.middleware.render - recaptcha middleware render object
 * @param  {Object} req                         - Express Request Object
 * @param  {Object} res                         - Express Response Object
 */
router.get('/', recaptcha.middleware.render, function (req,res) {
  errorNotifications.length = successNotifications.length = 0;

  if ((req.cookies.username && req.cookies.password) || (req.cookies.email && req.cookies.password)) {
    // Redirect to dashboard
    res.redirect('/dashboard');
  }
  else {
    // Render createaccount view
    renderCreateAccount(req, res);
  }

});

/**
 * router - POST method for createaccount route '/createaccount'
 * @param  {String} '/createaccount'            - local route string
 * @param  {Object} recaptcha.middleware.render - recaptcha middleware render object
 * @param  {Object} req                         - Express Request Object
 * @param  {Object} res                         - Express Response Object
 */
router.post('/', recaptcha.middleware.verify, function(req, res) {
  // Reset error notifications
  errorNotifications.length = successNotifications.length = 0;

  // If there was an error with the recaptcha tool
  if (req.recaptcha.error) {
    // Push the error notifification
    errorNotifications.push(req.captcha.error);

    // Render create account view
    renderCreateAccount(req, res);
  }

  // Otherwise
  else {
    // Create the user account
    createUserAccount(req, res);
  }
});

/**
 * renderCreateAccount - renders the createaccount view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderCreateAccount (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res),
      // User object
      user;

  model.content.pageTitle = 'Account Creation';

  // Give the model the recaptcha source
  model.captcha = req.recaptcha;

  // If we have error notifications
  // attach them to the model so they can be used in the view
  model.errorNotifications = (errorNotifications.length > 0) ? errorNotifications : null;

  // Render /createaccount using the 'login/createAccount' view and model
  res.render('login/createAccount', model);
}

/**
 * createUserAccount - stores the user information to the database
 * creating their account
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function createUserAccount (req, res) {
  // Request body
  var rb = req.body,
      // User data object
      userData = {},
      // validUserData bool
      validUserData,
      // Require encryption model
      encrypt = require('../../model/global/encrypt');

  // If user submits information
  if (rb.userInfoSubmit) {
    // Validate the user's data
    validUserData = validateUserInput(req);

    // If the data is valid
    if (validUserData) {
      // Store user's data in an object
      userData = {
        userName: rb.username,
        email: rb.email,
        password: encrypt(rb.password),
        displayName: rb.displayName,
        elligibleForTest: rb.elligibleForTest,
        research: 'opt-in',
        role: 1,
      }

      // Call the insertUser model and pass in userData object
      require('../../model/users/insertUser')(req, userData, function(err, success) {
        // If there was an error
        if (err) {
          console.error(err);
          errorNotifications.push(err);
          renderCreateAccount(req, res);
        }

        // Otherwise account was created
        else {
          // Get the new user's id
          userData.userId = success.insertId;

          // Call the createAccountActivationCode function
          createAccountActivationCode(req, res, userData);
        }
      });
    }

    // If user input is invalid
    else {
      // Render create account page again
      renderCreateAccount(req, res);
    }
  }

  // Otherwise
  else {
    // Redirect us back to this page
    res.redirect('/createaccount');
  }
}

/**
 * validateUserInput - validates user input data
 * @param  {Object} req    - Express Request Object
 * @return {Boolean} valid - Returns whether user data is valid
 */
function validateUserInput (req) {
  var valid = true,
      pattern = {
        bool: /no|yes/,
        password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
      },
      rb = req.body;

  // Make sure username is alphanumerical
  if (!validator.isAlphanumeric(rb.username)) {
    errorNotifications.push('Please enter a valid username.');
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

  // Verify email is an email
  if (!validator.isEmail(rb.email)) {
    errorNotifications.push('Please enter a valid email.');
    valid = false;
  }

  // Verify user entered a displayName
  if (validator.isEmpty(rb.displayName)) {
    errorNotifications.push('Please enter a display name');
    valid = false;
  }

  // If user is elligible For Test
  if (rb.elligibleForTest) {
    // elligibleForTest: yes, no
    if (!validator.matches(rb.elligibleForTest, pattern.bool)) {
      errorNotifications.push('There was an issue selecting your affiliation please try again.');
      valid = false;
    }
  }

  // Return whether user data is valid
  return valid;
}

/**
 * createAccountActivationCode - Creates an account activation code
 * @param  {Object} req      - Express Request Object
 * @param  {Object} res      - Express Response Object
 * @param  {Object} userData - User data object
 */
function createAccountActivationCode (req, res, userData) {
  // Create an accountActivationData object
  var accountActivationData = {
    // Pass in userId
    userId: userData.userId,
    activationCode: ''
  };

  // Create an activation code that is 32 characters long using crypto
  accountActivationData.activationCode = crypto.randomBytes(16).toString('hex');

  // Call insertAccountActivationCode model and pass in the accountActivationData
  require('../../model/accountActivationCodes/insertAccountActivationCode')(req, accountActivationData, function (err, success) {
    // If there was an error
    if (err) {
      // If error was that there was a duplicate entry
      if (err.code === 'ER_DUP_ENTRY') {
        // Call this function again so we can create a new activation code
        createAccountActivationCode(req, res, userData);
      }
      // Otherwise another type of error
      else {
        // Create an error notifification
        errorNotifications.push('Error creating your activation key. Please visit contact and administrator.');

        // Redirect to /createaccount
        renderCreateAccount(req, res);
      }
    }

    // Otherwise accountActivationData was inserted successfully,
    else {
      // Call the sendMailToUser function to send the user activation instructions
      sendMailToUser(req, res, userData, accountActivationData);
    }
  });
}

/**
 * sendMailToUser - sends an email to the user
 * @param  {Object} req                   - Express Request Object
 * @param  {Object} res                   - Express Response Object
 * @param  {Object} userData              - User data object
 * @param  {Object} accountActivationData - Account activation data
 */
function sendMailToUser (req, res, userData, accountActivationData) {
  // Get the authentication configuration data
  var authConfig = require('../../../config/auth'),
      // Create a nodemailer transporter
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 465, // port for secure SMTP
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
        to: userData.email,
        // Email Subject
        subject: 'Thinking Cap Activation Email',
        // Email Html
        html: ''
      };

  // Make the page url
  // pageUrl = req.protocol + '://' + req.get('host') + '/accountactivation/' + accountActivationData.activationCode;
  pageUrl = req.protocol + '://' + req.get('host');
  pageUrl += '/accountactivation/' + accountActivationData.activationCode;

  // If user entered a display name
  if (userData.displayName && userData.displayName !== '') {
    // Use that for our mail
    mailOptions.html = '<h1>Welcome to Thinking Cap, ' + userData.displayName + '!</h1>';
  }
  // Otherwise
  else {
    // Use their userName
    mailOptions.html = '<h1>Welcome to Thinking Cap, ' + userData.userName + '!</h1>';
  }

  // Create the html string
  mailOptions.html += '<p>To activate you Thinking Cap account please access the following page: <a href="';
  // mailOptions.html += pageUrl + '" target="_blank">' + pageUrl + '</a> and enter the following code: <span style="background: #e4e4e4; padding: 5px;">' + accountActivationData.activationCode + '</span>.</p>';
  mailOptions.html += pageUrl + '"target="_blank">' + pageUrl + '</a>.';

  // Send mail through transporter with the mailOptions
  transporter.sendMail(mailOptions, function (err, success) {
    // If there was an error
    if (err) {
      errorNotifications.push(err);
      errorNotifications.push(pageUrl);
      // Redirect to /createaccount
      renderCreateAccount(req, res);
    }
    // Otherwise
    else {
      // Set request user object
      req.user = {
        userName: userData.userName,
        password: userData.password
      };

      // Set login credential cookies

      res.cookie('username', req.user.userName);
      res.cookie('password', req.user.password);

      // Redirect to /dashboard
      res.redirect('/dashboard');
    }
  });
}

// Export createAccount router
module.exports = router;
