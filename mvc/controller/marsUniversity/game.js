var auth = require('../../model/auth');

module.exports = function(app) {
  app.get('/game', function(req, res){

    renderMarsUniversityGame(req, res);
  });

  function renderMarsUniversityGame(req, res) {
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Thinking Cap - Mars University';
    model.content.gameTitle = 'Mars University';

    res.render('marsUniversity/game', model);
  }
};
