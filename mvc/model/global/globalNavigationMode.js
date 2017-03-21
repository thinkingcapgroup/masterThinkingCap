function globalNavigationByCookies (req, res) {
  if (req.cookies.username && req.cookies.password) {
    return {
      authenticatedUser: true,
      username: req.cookies.username,
      accountDisplay: (req.cookies.displayName !== '') ? req.cookies.displayName : 'My Account',
      inactiveUser: (parseInt(req.cookies.userRole) === 1) ? true : false,
      adminUser: (parseInt(req.cookies.userRole) >= 5) ? true : false
    };
  }
  else {
    return {
      authenticatedUser: false
    };
  }
};

module.exports = globalNavigationByCookies;
