var passport = require('passport');

module.exports = function(app) {
  // GET /auth/google
  // Passport will authenticate using Google
  app.get('/auth/google',
    passport.authenticate('google',
                          { scope:
                            ['https://www.googleapis.com/auth/plus.login',
                              'https://www.googleapis.com/auth/plus.profile.emails.read'
                            ]
                          }
                        ));
};
