module.exports = function(app) {
  app.get('/help', function(req, res){
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Support';
  	res.render('supportLinks/help', model);
  });
};
