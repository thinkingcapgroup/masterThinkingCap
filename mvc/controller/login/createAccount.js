var crypto = require('crypto'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
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
          password: encrypt(rb.password),
          displayName: rb.displayName,
          elligibleForTest: rb.elligibleForTest,
          research: 'opt-in',
          role: 1,
        }

        require('../../model/insertUser')(req, userData, function(err, success) {
          if (err) {
            console.error(err);
            res.redirect('/createaccount');
          }
          else {
            userData.userId = success.insertId;
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

    // Verify passwords
    if (!validator.matches(rb.password, pattern.password)) {
      errorNotifications.push('Password must beat least 8 chars long with a mixture of uppercase and lowercase letters.');
      valid = false;
    }

    if (rb.password !== rb.passwordCheck) {
      errorNotifications('Passwords do not match!');
      valid = false;
    }

    // email: not null, email
    if (!validator.isEmail(rb.email)) {
      errorNotifications.push('Please enter a vaid email.');
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

    return valid;
  }

  function createAccountActivationCode (req, res, userData) {
    var accountActivationData = {
      userId: userData.userId,
      activationCode: ''
    };

    accountActivationData.activationCode = crypto.randomBytes(16).toString('hex');

    require('../../model/insertAccountActivationCode')(req, accountActivationData, function(err, success) {

      if (err) {
        console.log(err);
        // If duplicate
        if (err.code === 'ER_DUP_ENTRY') {
          createAccountActivationCode(req, res, userData);
        }
        else {
          errorNotifications.push('Error creating your activation key. Please visit contact and administrator.');
          res.redirect('/createaccount');
        }
      }
      else {
        sendMailToUser(req, res, userData, accountActivationData);
      }
    });
  }

  function sendMailToUser (req, res, userData, accountActivationData) {
    //
    var authConfig = require('../../../config/auth'),
        transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: authConfig.thinkingcapMail
        }),
        pageUrl = '',
        mailOptions = {
          from: authConfig.thinkingcapMail.user,
          to: userData.email,
          subject: 'Thinking Cap Activation Email',
          html: ''
        };

    pageUrl = req.protocol + '://' + req.get('host') + '/accountActivation/' + accountActivationData.activationCode;
    // pageUrl = req.protocol + '://' + req.get('host') + '/accountActivation/' + accountActivationData.activationCode;

    if (userData.displayName && userData.displayName !== '') {
      mailOptions.html = '<h1>Welcome to Thinking Cap, ' + userData.displayName + '!</h1>';
    }
    else {
      mailOptions.html = '<h1>Welcome to Thinking Cap, ' + userData.userName + '!</h1>';
    }

    mailOptions.html += '<p>To activate you Thinking Cap account please access the following page: <a href="';
    mailOptions.html += pageUrl + '" target="_blank">' + pageUrl + '</a> and enter the following code: <span style="background: #e4e4e4; padding: 5px;">' + accountActivationData.activationCode + '</span>.</p>';

    transporter.sendMail(mailOptions, function (err, success) {
      if (err) {
        console.error(err);
        res.redirect('createaccount');
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
};
