module.exports = function(app) {
  app.get('/terms', function(req, res){
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Terms of Service';
  	res.render('supportLinks/terms', model);
  });
};
