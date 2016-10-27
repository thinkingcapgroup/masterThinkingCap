var passport = require('passport');

module.exports = function(app){
  app.get('/login', function(req,res){
    renderLogin(req, res);
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/dashboard', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : false // allow flash messages
  }));

  function renderLogin (req, res) {
    var model = require('../../model/global')(req, res);

    res.render('login/login', model);
  }
};
