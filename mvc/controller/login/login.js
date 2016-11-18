var errorNotifications = [], successNotifications = [];

module.exports = function(app){
  app.get('/login', function(req,res){
    renderLogin(req, res);
  });

  app.post('/login', function(req,res){
    var encrypt = require('../../model/encrypt');

    if (req.body.loginSubmit) {
      req.user = {
        userName: req.body.username,
        password: encrypt(req.body.password)
      };

      res.cookie('username', req.user.userName);
      res.cookie('password', req.user.password);

      res.redirect('/dashboard');
    }
    else {
      res.redirect('/login');
    }
  });

  function renderLogin (req, res) {
    var model = require('../../model/global')(req, res);

    errorNotifications.length = successNotifications = 0;

    if (req.cookies.loginErrorMessage) {
      errorNotifications.push(req.cookies.loginErrorMessage);
      model.errorNotifications = errorNotifications;
    }

    if (req.cookies.loginSuccessMessage) {
      successNotifications.push(req.cookies.loginErrorMessage);
      model.successNotifications = successNotifications;
    }

    res.clearCookie('loginSuccessMessage');
    res.clearCookie('loginErrorMessage');
    res.render('login/login', model);
  }
};
