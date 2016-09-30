var auth = require('../model/auth');

module.exports = function(app) {
  app.get('/', function(req, res){
  	var model = {};
    
  	model.title = 'Mars University';

  	model.loggedIn = req.isAuthenticated();

  	res.render('index', model);
  });
};