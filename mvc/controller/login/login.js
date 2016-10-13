module.exports = function(app){
  app.get('/login', function(req,res){
    renderLogin(req, res);
  });

  app.post('/login', function(req, res) {
    console.log(req.body);
    res.redirect('/login');
  });

  function renderLogin (req, res) {
    var model = require('../../model/global')(req, res);

    res.render('login/login', model);
  }
};
