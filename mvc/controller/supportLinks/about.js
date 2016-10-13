module.exports = function(app) {
  app.get('/about', function(req, res){
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'About';
  	res.render('supportLinks/about', model);
  });
};
