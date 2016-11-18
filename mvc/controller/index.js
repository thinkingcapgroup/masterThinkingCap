module.exports = function(app) {
  app.get('/', function(req, res){
    var model = require('../model/global')(req, res);
    
  	res.render('index', model);
  });
};
