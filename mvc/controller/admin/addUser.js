// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../../model/auth/auth'),
    // Require nodemailer
    nodemailer = require('nodemailer'),
    // Require validator
    validator = require('validator'),
    // Require encryption
    encrypt = require('../../model/global/encrypt'),
    // Notifications
    successNotifications = [], errorNotifications = [];

/**
 * router - GET method for our addUser route '/addUser'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  verifyUserIsADev(req, res);
});

/**
 * router - POST method for our addUser route '/addUser'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', auth, function (req, res) {
  errorNotifications.length = successNotifications.length = 0;

  // Render addUser view
  createNewUser(req, res);
});

/**
 * renderAddUser - renders the addUser view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderAddUser (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = 'Add User';
  model.globalNavigationMode = require('../../model/global/globalNavigationModeAuth')(req, res);

  require('../../model/roles/getRoles')(req, function (err, r) {
    if (err) {
      errorNotifications.push(err);
    }
    else {
      model.userRoles = r;
    }

    model.errorNotifications = (errorNotifications) ? errorNotifications : null;
    model.successNotifications = (successNotifications) ? successNotifications : null;

    // Render /adduser using the 'addUser' view and model
    res.render('admin/addUser', model);
  });
}

/**
 * createNewUser - creates a new user
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function createNewUser (req, res) {
  var rb = req.body,
      userData = {},
      validUserData;

  if (rb.userInfoSubmit) {
    // Validate user data
    validUserData = validateUserInput(req);

    // If the data is valid
    if (validUserData) {
      userData = {
        userName: rb.username,
        email: rb.email,
        password: encrypt(rb.password),
        // 🚨🚨🚨 UNENCRYPTED PASSWORD 🚨🚨🚨
        cleanPassword: rb.password,
        displayName: rb.displayName,
        elligibleForTest: rb.elligibleForTest,
        research: 'opt-in',
        role: rb.userRole
      };

      require('../../model/users/insertUser')(req, userData, function (err, success) {
        if (err) {
          console.error(err);
          errorNotifications.push(err);
          renderAddUser(req, res);
        }
        else {
          userData.userId = success.insertId;

          if (userData.role !== 1) {
            // send email without activation code
            sendMailToUser(req, res, userData, null);
          }
          else {
            // send activation code
            createAccountActivationCode(req, res, userData);
          }
        }
      });
    }

    // If user input is invalid
    else {
        // Render create account page again
        renderAddUser(req, res);
    }
  }
  else {
    // Redirect us back to this page
    res.redirect('/adduser');
  }
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
        renderAddUser(req, res);
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
 * verifyUserIsADev - verifies if user is a developer
 * and redirects them to appropriate page
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function verifyUserIsADev (req, res) {
  // Wipe out notifications
  errorNotifications.length = successNotifications.length = 0;

  // If user is not a dev
  if (req.user.role < 5) {
    // Redirect them to dashboard
    res.redirect('/dashboard');
  }

  // If user is a dev
  else {
    // render view
    renderAddUser(req, res);
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
      errorNotifications.push('There was an issue selecting the user\'s affiliation please try again.');
      valid = false;
    }
  }

  // For the user role
  if (!validator.isInt(rb.userRole, {min: 1, max: 8})) {
    errorNotifications.push('Please choose a role for the new user.');
    valid = false;
  }

  // Return whether user data is valid
  return valid;
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
        host: 'smtp-mail.outlook.com', // hostname
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
        to: userData.email,
        // Email Subject
        subject: 'Thinking Cap Activation Email',
        // Email Html
        html: ''
      };

  pageUrl = req.protocol + '://' + req.get('host');

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

  // Make the page url
  if (accountActivationData !== null) {
    pageUrl += '/accountactivation/' + accountActivationData.activationCode;

    // Create the html string
    mailOptions.html += '<p style=\'line-height: 1.6;\'>We have created your new Thinking Cap account. To activate you Thinking Cap account please access the following page: <a href="';
    mailOptions.html += pageUrl + '"target="_blank">' + pageUrl + '</a>.';
  }
  else {
    mailOptions.html += '<p style=\'line-height: 1.6;\'>We have created your new Thinking Cap account. You can now access Thinking Cap at <a href="' + pageUrl + '"target="_blank">' + pageUrl + '</a>.';
  }

  mailOptions.html += 'You can log in using this email or your new username: <span style=\'padding: 0.5em 0.8em; background: #e4e4e4;\'>' + userData.userName + '</span> and your new password: <span style=\'padding: 0.5em 1em; background: #e4e4e4;\'>' + userData.cleanPassword + '</span>.';

  // Send mail through transporter with the mailOptions
  transporter.sendMail(mailOptions, function (err, success) {
    // If there was an error
    if (err) {
      errorNotifications.push(err);
      errorNotifications.push(pageUrl);
      // Redirect to /addUser
      renderAddUser(req, res);
    }
    // Otherwise
    else {
      successNotifications.push('User ' + userData.displayName + ' (@' + userData.userName + ') has been added!');
      renderAddUser(req, res);
    }
  });
}

// Export about router
module.exports = router;
