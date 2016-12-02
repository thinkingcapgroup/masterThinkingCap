module.exports = function (req, res) {
  return {
    authenticatedUser: true,
    username: req.user.userName,
    accountDisplay: (req.user.displayName !== '') ? req.user.displayName : 'My Account',
    inactiveUser: (req.user.role === 1) ? true: false,
    adminUser: (req.user.role === 5) ? true : false
  };
};
