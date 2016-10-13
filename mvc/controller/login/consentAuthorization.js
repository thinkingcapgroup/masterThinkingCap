module.exports = function(app) {
  app.get('/consentauthorization', function(req, res){
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Consent Form';
  	res.render('login/consentAuthorization', model);
  });
};
