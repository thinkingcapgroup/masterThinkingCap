module.exports = function(app) {
  app.get('/credits', function(req, res){
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Credits';
  	res.render('supportLinks/credits', model);
  });
};
