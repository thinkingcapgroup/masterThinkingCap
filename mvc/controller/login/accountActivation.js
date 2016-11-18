var auth = require('../../model/auth'),
    nodemailer = require('nodemailer'),
    errorNotifications = [], successNotifications = [];

module.exports = function(app){
  var routePattern = '[a-z0-9]+',
      accountActivationRoute = '/accountactivation/',
      userAccountActivationRoute = accountActivationRoute + ':link(' + routePattern + ')';

  app.get('/accountactivation', auth, function(req,res) {
    renderUserAccountActivation(req, res);
  });

  app.post('/accountactivation', auth, function(req,res) {
    var rb = req.body;

    errorNotifications.length = 0;
    successNotifications.length = 0;

    if (rb.activationEmailState) {
      renderAccountActivation(req, res);
    }

    else if (rb.activateAccountState) {
      renderUserAccountActivation(req, res);
    }

    else if (rb.activateAccount) {
      if (rb.activationCode) {
        var data = {
          userId: req.user.userId,
          activationCode: rb.activationCode
        };

        require('../../model/activateUserAccount')(req, data, function (err, accountData) {
          if (err) {
            console.error(err);
            errorNotifications.push(err);
            renderUserAccountActivation(req, res);
          }

          else {
            // new user data
            var newUserData = {
              userId: accountData.userId,
              column: 'role',
              value: 2
            };

            require('../../model/updateUserColumnById')(req, newUserData, function (errr, success) {
              if (errr) {
                console.error(err);
                errorNotifications.push(errr);
                renderUserAccountActivation(req, res);
              }
              else {
                res.redirect('/dashboard');
              }
            });
          }
        });
      }

      else {
        errorNotifications.push('Please enter the activation code emailed to you.');
        renderUserAccountActivation(req, res);
      }
    }

    else if (rb.resendActivationEmail) {
      if (rb.email) {
        // get the account with that email
        var email = rb.email;

        require('../../model/getAccountActivationCodeByEmail')(req, email, function (err, userData) {
          if (err) {
            console.error(err);
            errorNotifications.push('It seems an account with that email has already been activated or your account hasn\'t been created yet.');

            renderAccountActivation(req, res);
          }
          else {
            resendActivationEmail(req, res, userData);
          }
        });
      }
      else {
        errorNotifications.push('Please enter an email to send the activation code.');
        renderAccountActivation(req, res);
      }
    }
    else {
      res.redirect('/accountactivation');
    }
  });

  // app.get('/accountactivation:link([a-z0-9]+)', function (req, res) {
  //   console.log(req.params.link);
  //   renderAccountActivation(req, res);
  // });

  /*
   * Account Activation no code
   */

  function renderAccountActivation (req, res) {
    var model = require('../../model/global')(req, res);

    model.content.pageTitle += ' Account Activation';

    // Display the email State form
    model.codeState = false;

    // Display notifications if there are any
    model.errorNotifications = (errorNotifications)? errorNotifications : null;
    model.successNotifications = (successNotifications)? successNotifications : null;

    res.render('login/accountActivation', model);
  }

  function renderUserAccountActivation (req, res) {
    var model = require('../../model/global')(req, res);

    model.content.pageTitle += ' Account Activation';

    // Display the code State form
    model.codeState = true;

    // Display notifications if there are any
    model.errorNotifications = (errorNotifications)? errorNotifications : null;
    model.successNotifications = (successNotifications)? successNotifications : null;

    res.render('login/accountActivation', model);
  }

  function resendActivationEmail (req, res, data) {
      var authConfig = require('../../../config/auth'),
          transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: authConfig.thinkingcapMail
          }),
          pageUrl = '',
          mailOptions = {
            from: authConfig.thinkingcapMail.user,
            to: data.email,
            subject: 'Thinking Cap Activation Email',
            html: ''
          };

      // pageUrl = req.protocol + '://' + req.get('host') + accountActivationRoute + data.activationCode;
      pageUrl = req.protocol + '://' + req.get('host') + accountActivationRoute;

      if (data.displayName && data.displayName !== '') {
        mailOptions.html = '<h1>Welcome to Thinking Cap Again, ' + data.displayName + '!</h1>';
      }
      else {
        mailOptions.html = '<h1>Welcome to Thinking Cap Again, ' + data.userName + '!</h1>';
      }

      mailOptions.html += '<p>It looks like a black hole sucked your last activation email. Don\'t worry! To activate you Thinking Cap account simply access the following page: <a href="';
      mailOptions.html += pageUrl + '" target="_blank">' + pageUrl + '</a> and enter the following code: <span style="background: #e4e4e4; padding: 5px;">' + data.activationCode + '</span>.</p>';

      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          console.error(err);
          errorNotifications.push('There was a problem resending you the activation email. Please try again.');
          renderAccountActivation(req, res);
        }
        else {
          //res.cookie('loginSuccessMessage', 'Your account have been activated! Feel free to login and access Thinking Cap.');
          successNotifications.push('An email has been sent to you. Please verify it and click the link to activate your account.');
          // Allow user to login
          renderAccountActivation(req, res);
        }
      });
    }
};
