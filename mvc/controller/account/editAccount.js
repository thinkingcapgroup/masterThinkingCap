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
    successNotifications = [], errorNotifications = [],
    // tempUserData
    tempUserData = {};

/**
 * router - GET method for our editAccount route '/editAccount'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  // Wipe out notifications
  errorNotifications.length = successNotifications.length = 0;

  tempUserData.userId = req.user.userId;
  renderEditAccount(req, res);
});

/**
 * router - GET method for our editAccount route '/editAccount'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', auth, function (req, res) {
  errorNotifications.length = successNotifications.length = 0;

  // Post edit user
  editAccountPost(req, res);
});

/**
 * renderEditAccount - renders the editUser view for editing user
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderEditAccount (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res),
      getUserData = {
        column: 'userId',
        value: tempUserData.userId
      };

  model.content.pageTitle = 'Edit Account';
  model.globalNavigationMode = require('../../model/global/globalNavigationModeAuth')(req, res);

  model.editingUser = true;

  require('../../model/roles/getRoles')(req, function (errr, r) {
    if (errr) {
      errorNotifications.push(err);
    }
    else {
      model.userRoles = r;
    }

    if (tempUserData.userName) {
      model.errorNotifications = (errorNotifications) ? errorNotifications : null;
      model.successNotifications = (successNotifications) ? successNotifications : null;
      model.userData = tempUserData;
      // Render /edituser using the 'editUser' view and model
      res.render('account/editAccount', model);
    }
    else {
      require('../../model/users/getUserByColumn')(req, getUserData, function (err, u) {
        if (err) {
          errorNotifications.push(err);
        }
        else {
          tempUserData = u;
          model.userData = tempUserData;
        }

        model.errorNotifications = (errorNotifications) ? errorNotifications : null;
        model.successNotifications = (successNotifications) ? successNotifications : null;

        // Render /editaccount using the 'editAccount' view and model
        res.render('account/editAccount', model);
      });
    }
  });
}

/**
 * editAccountPost - handles post method for submitting forms
 * and redirects them to appropriate page
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function editAccountPost (req, res) {
  var rb = req.body,
      validUserData,
      userData = {};

  //If user is submitting edited user info
  if (rb.userInfoSubmit) {
    validUserData = validateUserInput(req);

    if (validUserData) {
      userData = {
        userId: tempUserData.userId,
        userName: rb.username,
        email: rb.email,
        password: (rb.password) ? encrypt(rb.password) : tempUserData.password,
        displayName: rb.displayName,
        elligibleForTest: rb.elligibleForTest,
        research: 'opt-in',
        role: tempUserData.role
      };

      require('../../model/users/updateUser')(req, userData, function (err, success) {
        if (err) {
          errorNotifications.push(err);
          renderEditAccount(req, res);
        }
        else {
          successNotifications.push('Your account has been successfully updated!');
          tempUserData = {}
          renderEditAccount(req, res);
        }
      });
    }
    else {
      renderEditAccount(req, res);
    }
  }
  else {
    res.redirect('/editaccount');
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

  if (validator.isEmpty(rb.username)) {
    // Set to original
    rb.username = tempUserData.userName;
  }

  // Make sure username is alphanumerical
  if (!validator.isAlphanumeric(rb.username)) {
    errorNotifications.push('Please enter a valid username.');
    valid = false;
  }

  if (validator.isEmpty(rb.password)) {
    rb.password = null;
  }

  // Verify password matches our pattern
  else if (!validator.matches(rb.password, pattern.password)) {
    errorNotifications.push('Password must beat least 8 chars long with a mixture of uppercase and lowercase letters.');
    valid = false;
  }

  if (validator.isEmpty(rb.passwordCheck)) {
    rb.passwordCheck = null;
  }

  // Verify passwords match
  if (rb.password !== rb.passwordCheck) {
    errorNotifications.push('Passwords do not match!');
    valid = false;
  }

  if (validator.isEmpty(rb.email)) {
    rb.email = tempUserData.email;
  }

  // Verify email is an email
  if (!validator.isEmail(rb.email)) {
    errorNotifications.push('Please enter a valid email.');
    valid = false;
  }

  // Verify user entered a displayName
  if (validator.isEmpty(rb.displayName)) {
    rb.displayName = tempUserData.displayName;
  }

  // If user is elligible For Test
  if (rb.elligibleForTest) {
    // elligibleForTest: yes, no
    if (!validator.matches(rb.elligibleForTest, pattern.bool)) {
      errorNotifications.push('There was an issue selecting the user\'s affiliation please try again.');
      valid = false;
    }
  }

  // Return whether user data is valid
  return valid;
}

module.exports = router;
