var passport = require('passport'),
    authConfig = require('./auth'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app) {
  /**
   * Passport Authentication
   */
  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(obj, done){
    done(null, obj);
  });

  passport.use(new GoogleStrategy(
    authConfig.google,
    function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));

  // Initialize Passport
  app.use(passport.initialize());

  // Restore Passport Session, if any
  app.use(passport.session());
};
