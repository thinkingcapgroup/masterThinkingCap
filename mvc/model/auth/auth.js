module.exports = function(req, res, next){
  var userData = {},
      errorMessage;

  // Authenticate user
  if ((req.cookies.username && req.cookies.password) || (req.cookies.email && req.cookies.password) || (req.user)) {

    if (req.cookies.username && req.cookies.password) {
      userData.username = req.cookies.username;
      userData.password = req.cookies.password;
    }

    else if (req.cookies.email && req.cookies.password) {
      userData.email = req.cookies.email;
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

    // If we are login in with username and password
    if (userData.username && userData.password) {
      // Get user with username and password
      require('./authUserByPassword')(req, userData, function (err, result) {
        if (err) {
          errorMessage = err;
          clearUserCookiesAndReturnToLogin(res, errorMessage);
        }
        else {
          res.cookie('username', result.userName);
          res.cookie('email', result.email);
          res.cookie('displayName', result.displayName);
          res.cookie('userRole', result.role);
          req.user = result;
          return next();
        }
      });
    }

    // Else if we are login in with email and password
    else if (userData.email && userData.password) {
      // Get user with email and password
      require('./authUserWithEmail')(req, userData, function (err, result) {
        if (err) {
          errorMessage = err;
          clearUserCookiesAndReturnToLogin(res, errorMessage);
        }
        else {
          res.cookie('username', result.userName);
          res.cookie('email', result.email);
          res.cookie('displayName', result.displayName);
          res.cookie('userRole', result.role);
          req.user = result;
          return next();
        }
      });
    }
  }

  // Else
  else {
    errorMessage = 'Please enter your username or email and password.';
    clearUserCookiesAndReturnToLogin(res, errorMessage);
  }

  function clearUserCookiesAndReturnToLogin (res, msg) {
    res.cookie('loginErrorMessage', msg)
    res.clearCookie('username');
    res.clearCookie('password');
    res.clearCookie('email');
    res.clearCookie('userRole');
    res.clearCookie('displayName');
    res.redirect('/login');
  }
}
