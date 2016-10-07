var passport = require('passport');

module.exports = function(app){
  // Get /auth/google/callback
  // If authentication fails, we redirect back to login
  // Otherwise if authentication is successful we redirect to the home page
  app.get('/auth/google/callback',
    passport.authenticate('google',
    { successRedirect: '/dashboard',
     failureRedirect: '/'
    }
  ));
}
