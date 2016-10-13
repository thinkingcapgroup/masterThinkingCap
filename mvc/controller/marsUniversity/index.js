var auth = require('../../model/auth');

module.exports = function(app) {
  app.get('/marsUniversity', function(req, res){

    renderMarsUniversity(req, res);
  });

  function renderMarsUniversity(req, res) {
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Thinking Cap - Mars University';
    model.content.gameTitle = 'Mars University';
    
    res.render('marsUniversity/index', model);
  }
};
