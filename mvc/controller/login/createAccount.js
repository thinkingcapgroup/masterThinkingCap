module.exports = function(app){
  app.get('/createaccount', function(req,res){
    renderNewUser(req, res);
  });

  app.post('/createaccount', function(req, res) {
    var model = {},
        rb = req.body,
        userData = {};

    // If user submits information
    if (req.body.userInfoSubmit) {
      var race = '';
          //raceLength = rb.race.length;

      if (rb.race === Array) {
        // TODO: Fix this
        rb.race.forEach(function(r) {
          race += r + ',';
        });
      }

      userData = {
        userName: rb.username,
        email: req.user.emails[0].value,
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
      // TODO: form validation

      require('../../model/insertUser')(req, userData, function(err, success) {

        if (err) {
          console.log(err);
          res.redirect('/createaccount');
        }
        else {
          console.log(success);
          // Allow user to login
           res.redirect('/dashboard');
        }
      });

    }

    // Otherwise
    else {
      // Redirect us back to this page
      res.redirect('/createaccount');
    }
  });

  function renderNewUser (req, res) {
    var model = require('../../model/global')(req, res),
        user;
    model.content.pageTitle = 'Create Account';

    // if user hasn't logged in redirect to auth/google
    // so they can log in
    if (!req.user) {
      res.redirect('/auth/google');
    }
    // Otherwise if user logged in with a google account
    else {
      user = req.user;

      model.user = {
        username: user.emails[0].value,
        email: user.emails[0].value,
        displayName: user.displayName,
        firstName: user.name.givenName,
        lastName: user.name.familyName
      }
      res.render('login/createAccount', model);

    }
  }

  function validateUserInput () {
    var valid = true;

    return valid;
  }
};
