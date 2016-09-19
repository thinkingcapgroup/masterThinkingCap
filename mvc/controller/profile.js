var auth = require('../model/auth');
module.exports = function(app){
  app.get('/profile', auth, function(req, res){
    var model = {};
    model.user = req.user;

    res.render('profile', {user: req.user});
  });
}
