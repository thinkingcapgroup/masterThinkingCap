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
 * router - GET method for our editUser route '/editUser'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  verifyUserIsADev(req, res);
});

/**
 * router - GET method for our editUser route '/editUser'
 * @param  {String} '/' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/', auth, function (req, res) {
  errorNotifications.length = successNotifications.length = 0;

  // Post edit user
  editUserPost(req, res);
});

/**
 * renderSelectUserToEdit - renders the editUser view for selecting user
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderSelectUserToEdit (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res);

  model.content.pageTitle = 'Edit User';
  model.globalNavigationMode = require('../../model/global/globalNavigationModeAuth')(req, res);
  // model.displayWithUsername = model.displayWithEmail = model.displayWithDisplayName = false;

  // Set the way we display users
  if (req.cookies.userDisplayMode) {
    if (req.cookies.userDisplayMode === '1') {
      model.displayWithEmail = true;
    }
    else if (req.cookies.userDisplayMode === '2') {
      model.displayWithDisplayName = true;
    }
    else {
      model.displayWithUsername = true;
    }
  }
  else {
    model.displayWithUsername = true;
  }

  require('../../model/users/getAllUsers')(req, function (err, u) {
    if (err) {
      errorNotifications.push(err);
    }
    else {
      model.userList = u;
    }

    model.errorNotifications = (errorNotifications) ? errorNotifications : null;
    model.successNotifications = (successNotifications) ? successNotifications : null;

    // Render /edituser using the 'editUser' view and model
    res.render('admin/editUser', model);
  });
}

/**
 * renderEditUser - renders the editUser view for editing user
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderEditUser (req, res) {
  // Require the global app model
  var model = require('../../model/global/global')(req, res),
      getUserData = {
        column: 'userId',
        value: tempUserData.userId
      };

  model.content.pageTitle = 'Edit User';
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
      res.render('admin/editUser', model);
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

        // Render /edituser using the 'editUser' view and model
        res.render('admin/editUser', model);
      });
    }
  });
}

/**
 * editUserPost - handles post method for submitting forms
 * and redirects them to appropriate page
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function editUserPost (req, res) {
  var rb = req.body,
      validUserData,
      userData = {};

  // If user wants to change the way names are displayed on the list
  if (rb.changeUserDisplayMode) {
    if (validator.isInt(rb.userDisplayType, {min: 0, max: 2})) {
      res.cookie('userDisplayMode', rb.userDisplayType);
      res.redirect('/edituser');
    }
    else {
      errorNotifications.push('Please select an appropriate display mode.');
      editUserPost(req, res);
    }
  }

  // If user wants to choose another user to edit
  else if (rb.editOtherUserSubmit) {
    tempUserData = {};
    res.redirect('/edituser');
  }

  // If user wants to edit a certain user
  else if (rb.selectUserToEdit) {
    if (validator.isInt(rb.selectUserToEdit)) {
      tempUserData.userId = rb.selectUserToEdit;
      renderEditUser(req, res);
    }
    else {
      errorNotifications.push('Unable to select user. Please try again.');
      renderSelectUserToEdit(req, res);
    }
  }
  // If user is submitting edited user info
  else if (rb.userInfoSubmit) {
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
        role: rb.userRole
      };

      require('../../model/users/updateUser')(req, userData, function (err, success) {
        if (err) {
          errorNotifications.push(err);
          renderEditUser(req, res);
        }
        else {
          successNotifications.push('User account has been successfully updated.');
          tempUserData = {}
          renderSelectUserToEdit(req, res);
        }
      });
    }
    else {
      renderEditUser(req, res);
    }
  }
  else {
    res.redirect('/edituser');
  }
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
  tempUserData = {};
  
  // If user is not a dev
  if (req.user.role < 5) {
    // Redirect them to dashboard
    res.redirect('/dashboard');
  }

  // If user is a dev
  else {
    // render view
    renderSelectUserToEdit(req, res);
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

  // For the user role
  if (rb.userRole === '0') {
    rb.userRole = tempUserData.role;
  }

  else if (!validator.isInt(rb.userRole, {min: 1, max: 8})) {
    errorNotifications.push('Please choose a role for the new user.');
    valid = false;
  }

  // Return whether user data is valid
  return valid;
}

module.exports = router;
