var bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/newuser', function(req,res){
    renderNewUser(req, res);
  });

  app.post('/newuser', urlencodedParser, function(req, res) {
    var model = {};

    // If user submits information
    if (req.body.userInfoSubmit) {
      // TODO: form validation

      // Allow user to login
      res.redirect('/auth/google');
    }

    // Otherwise
    else {
      // Redirect us back to this page
      res.redirect('/newUser');
    }
  });

  function renderNewUser (req, res) {
    var model = {};

    res.render('newuser/newuser', model);
  }
};
