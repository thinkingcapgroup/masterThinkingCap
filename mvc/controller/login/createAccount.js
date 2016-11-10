var validator = require('validator'),
    recaptcha = require('express-recaptcha'),
    successNotifications = [], errorNotifications = [];

module.exports = function(app){
  app.get('/createaccount', recaptcha.middleware.render, function(req,res) {

      renderCreateAccount(req, res);
  });

  app.post('/createaccount', recaptcha.middleware.verify, function(req, res) {
    var model = {};

    // Reset error notifications
    errorNotifications.length = 0;

    if (!req.recaptcha.error) {
      createUserAccount(req, res);
    }
    else {
      errorNotifications.push(req.captcha.error);
      renderCreateAccount(req, res);
    }
  });

  function renderCreateAccount (req, res) {
    var model = require('../../model/global')(req, res),
        user;

    model.content.pageTitle = 'Create Account';
    model.captcha = req.recaptcha;

    // If we have error notifications
    // attach them to the model so they can be used in the view
    model.errorNotifications = (errorNotifications.length > 0) ? errorNotifications : null;

    res.render('login/createAccount', model);


  }

  function createUserAccount (req, res) {
    var rb = req.body,
        userData = {},
        validUserData,
        encrypt = require('../../model/encrypt');

    // If user submits information
    if (req.body.userInfoSubmit) {
      //
      validUserData = validateUserInput(req);

      if (validUserData) {

        // Make an object for user data
        userData = {
          userName: rb.username,
          email: rb.email,
          password: (rb.password)? encrypt(rb.password) : undefined,
          passportType: 'local',
          displayName: rb.displayName,
          deaf: rb.deaf,
          research: 'opt-in',
          role: 5,
        }

        require('../../model/insertUser')(req, userData, function(err, success) {
          if (err) {
            console.error(err);
            res.redirect('/createaccount');
          }
          else {
            req.user = {
              userName: userData.userName,
              password: userData.password
            };

            res.cookie('username', req.user.userName);
            res.cookie('password', req.user.password);
            // Allow user to login
             res.redirect('/dashboard');
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

  function validateUserInput (req) {
    var valid = true,
        pattern = {
          bool: /no|yes/,
          password: /./
        },
        rb = req.body;

    // Make sure username is alphanumerical
    if (!validator.isAlphanumeric(rb.username)) {
      errorNotifications.push('Please enter a valid username.');
      valid = false;
    }

    // If it passes
    else {
      // Check if passport is local
      if (rb.passportType === 'local') {
        // Verify passwords
        if (!validator.matches(rb.password, pattern.password)) {
          errorNotifications.push('Password must beat least 8 chars long with a mixture of uppercase and lowercase letters.');
          valid = false;
        }

        if (rb.password !== rb.passwordCheck) {
          errorNotifications('Passwords do not match!');
          valid = false;
        }
      }
    }

    // email: not null, email
    if (!validator.isEmail(rb.email)) {
      errorNotifications.push('Please enter a vaid email.');
      valid = false;
    }

    // If user chooses deaf community
    if (rb.deaf) {
      // deaf: yes, no
      if (!validator.matches(rb.deaf, pattern.bool)) {
        errorNotifications.push('There was an issue selecting your affiliation please try again.');
        valid = false;
      }
    }

    return valid;
  }
};
