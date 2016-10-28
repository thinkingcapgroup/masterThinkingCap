var validator = require('validator'),
successNotifications = [], errorNotifications = [];

module.exports = function(app){
  app.get('/createaccount', function(req,res){
    // If user hasn't logged in
    if (!req.user) {
      // Redirect to auth/google so they can log in
      res.redirect('/auth/google');
    }

    // Otherwise render page
    else {
      renderCreateAccount(req, res);
    }
  });

  app.post('/createaccount', function(req, res) {
    var model = {},
        rb = req.body,
        userData = {},
        userRace = '',
        userRaceLength,
        validUserData,
        encrypt = require('../../model/encrypt');

    // Reset error notifications
    errorNotifications.length = 0;

    // If user submits information
    if (req.body.userInfoSubmit) {
      //
      validUserData = validateUserInput(req);

      if (validUserData) {

        // Make an object for user data
        userData = {
          userName: rb.username,
          email: req.user.emails[0].value,
          password: (rb.password)? encrypt(rb.password) : undefined,
          passportType: rb.passportType,
          firstName: rb.firstName,
          lastName: rb.lastName,
          displayName: rb.displayName,
          gender: rb.gender,
          ethnicity: rb.latino,
          race: rb.race,
          major: rb.major,
          schoolYear: rb.schoolYear,
          deafCommunity: rb.deafCommunity,
          languages: rb.languages,
          mathCoursesTaken: rb.mathCoursesTaken,
          statisticsCoursesTaken: rb.statsCoursesTaken,
          readingLevel: rb.readingLevel,
          research: 'opt-in',
          role: 5,
        }
        console.log(userData);
        require('../../model/insertUser')(req, userData, function(err, success) {
          if (err) {
            console.error(err);
            res.redirect('/createaccount');
          }
          else {
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
  });

  function renderCreateAccount (req, res) {
    var model = require('../../model/global')(req, res),
        user;

    model.content.pageTitle = 'Create Account';

    // Otherwise if user logged in with a google account
      user = req.user;

      model.user = {
        email: user.emails[0].value,
        displayName: user.displayName,
        firstName: user.name.givenName,
        lastName: user.name.familyName
      }

      // If we have error notifications
      // attach them to the model so they can be used in the view
      model.errorNotifications = (errorNotifications.length > 0) ? errorNotifications : null;

      res.render('login/createAccount', model);


  }

  function validateUserInput (req) {
    var valid = true,
        pattern = {
          bool: /no|yes/,
          gender: /female|male|other/,
          year: /\d|grad/,
          reading: /none|beginner|intermediate|advanced/
        },
        rb = req.body;

    // Make sure username is alphanumerical
    if (!validator.isAlphanumeric(rb.username)) {
      errorNotifications.push('Please enter a valid username.');
      valid = false;
    }

    // email: not null, email
    if (!validator.isEmail(req.user.emails[0].value)) {
      errorNotifications.push('Please enter a vaid email.');
      valid = false;
    }

    // // school year: 1-5 or grad
    if (!validator.matches(rb.schoolYear, pattern.year)) {
      errorNotifications.push('Incorrect school year please try again.');
      valid = false;
    }

    // If stats was checked
    if (rb.statsCoursesTaken) {
      // Check if value is yes or no
      if (!validator.matches(rb.statsCoursesTaken, pattern.bool)) {
        errorNotifications.push('There was an issue selecting your statistic courses please try again.');
        valid = false;
      }
    }

    // If reading level does not match pattern
    if (!validator.matches(rb.readingLevel, pattern.reading)) {
      errorNotifications.push('There was an issue selecting your reading level please try again.');
      valid = false;
    }

    // If gender was selected
    if (rb.gender) {
      // gender: male, female, other
      if (!validator.matches(rb.gender, pattern.gender)) {
        errorNotifications.push('There was an issue selecting your gender please try again.');
        valid = false;
      }
    }

    // If user chooses deaf community
    if (rb.deafCommunity) {
      // deaf: yes, no
      if (!validator.matches(rb.deafCommunity, pattern.bool)) {
        errorNotifications.push('There was an issue selecting your affiliation please try again.');
        valid = false;
      }
    }

    // If latino ethnicity is chosen
    if (rb.latino) {
      // latino: yes, no
      if (!validator.matches(rb.latino, pattern.bool)) {
        errorNotifications.push('There was an issue selecting your ethnicity please try again.');
        valid = false;
      }
    }

    return valid;
  }
};
