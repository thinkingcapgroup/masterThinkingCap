module.exports = function(req, res, next){
  var userData = {},
  errorMessage;

  // If passport authenticated
  if (req.isAuthenticated()) {

    userData.email = req.user.emails[0].value;

    require('./authUserByEmail')(req, userData.email, function(err, result) {
      if (err) {
        errorMessage = 'Unable to authenticate you by your Google account.';
        clearUserCookiesAndReturnToLogin(res, errorMessage);
      }
      else {
        if (result.passportType === 'google') {
          req.user = result;
          return next();
        }

        // Redirect to login
        else {
          errorMessage = 'This account does not authenticate with a Google Account. Please log in using your username and password.';
          clearUserCookiesAndReturnToLogin(res, errorMessage);
        }
      }
    });
  }
  // Else local authentication
  else if ((req.cookies.username && req.cookies.password) || (req.user.userName && req.user.password)) {

    if (req.cookies.username && req.cookies.password) {
      userData.username = req.cookies.username;
      userData.password = req.cookies.password;
    }

    else if (req.user.userName && req.user.password) {
      userData.username = req.user.userName;
      userData.password = req.user.password;
    }


    else {
      errorMessage = 'Unable to log you in. Please try again.';
      clearUserCookiesAndReturnToLogin(res, errorMessage);
    }

    // Get user by password
    require('./authUserByPassword')(req, userData, function (err, result) {
      if (err) {
        errorMessage = 'Unable to authenticate. Please verify if your username and password are correct.';
        clearUserCookiesAndReturnToLogin(res, errorMessage);
      }
      else {
        res.cookie('username', result.userName);
        res.cookie('email', result.email);
        res.cookie('displayName', result.displayName);
        req.user = result;
        return next();
      }
    }) /// End
  }
  // Else
  else {
    errorMessage = 'Please enter your username and password. Or login using your Google Account';
    clearUserCookiesAndReturnToLogin(res, errorMessage);
  }

  function clearUserCookiesAndReturnToLogin (res, msg) {
    res.cookie('loginErrorMessage', msg)
    res.clearCookie('username');
    res.clearCookie('password');
    res.clearCookie('email');
    res.redirect('/login');
  }
}
