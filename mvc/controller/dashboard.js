var auth = require('../model/auth');

module.exports = function(app) {
  app.get('/dashboard', auth, function(req, res){
    renderDashboard(req, res);
  });

  function renderDashboard(req, res) {
    var model = require('../model/global')(req, res),
        userEmail = req.user.emails[0].value;

    console.log('I\'m logged in with: ' + userEmail);

    res.render('dashboard', model);
  }
};
