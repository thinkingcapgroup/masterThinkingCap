module.exports = function(app){
  app.get('/logout', function(req, res){
    logoutUser(req, res);
  });

  function logoutUser (req, res) {
    res.clearCookie('username');
    res.clearCookie('email');
    res.clearCookie('displayName');
    res.clearCookie('password');
    req.user = null;
    req.logout();
    res.redirect('/');
  }
}
