module.exports = function(req, res, next){
  var userData = {},
      errorMessage;

  // Authenticate user
  if ((req.cookies.username && req.cookies.password) || (req.user)) {

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
        res.cookie('userRole', result.role);
        req.user = result;
        return next();
      }
    }) /// End
  }
  // Else
  else {
    errorMessage = 'Please enter your username and password.';
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
