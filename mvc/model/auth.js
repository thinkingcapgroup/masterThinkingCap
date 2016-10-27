module.exports = function(req, res, next){
  var userEmail;

  if (req.isAuthenticated()) {

    userEmail = req.user.emails[0].value;

    require('./authUserByEmail')(req, userEmail, function(err, result) {
      if (err) {
        console.log(err);
        res.redirect('/consentauthorization');
      }
      else {
        return next();
      }
    });
  }
  else {
    res.redirect('/login');
  }
}
