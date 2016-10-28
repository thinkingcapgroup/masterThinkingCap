var auth = require('../model/auth');

module.exports = function(app) {
  app.get('/dashboard', auth, function(req, res){
    renderDashboard(req, res);
  });

  function renderDashboard(req, res) {
    var model = require('../model/global')(req, res),
        username = req.user.userName,
        displayName = req.user.displayName;

    console.log('I\'m logged in with: ' + username);
    console.log(req.user);
    res.render('dashboard', model);
  }
};
