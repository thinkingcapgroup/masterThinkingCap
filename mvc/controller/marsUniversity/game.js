var auth = require('../../model/auth');
var object;
var fs = require('fs');
var bodyParser = require('body-parser');

module.exports = function(app) {


  app.get('/game', auth, function(req, res){

    renderMarsUniversityGame(req, res);
  });

  app.post('/logger',  function (req, res, next) {
 
    var event = req.body.eventName;
    var id = req.user.id
    var stringTem = "\n" + id + " has preformed action " + event + " at " + Date.now();
	 	fs.appendFile('logInfo/useraction.txt', stringTem, function (err) {

      console.log('Student information logged');
    });
  

	 	res.end();
 

 
 	});

  function renderMarsUniversityGame(req, res) {
    var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Thinking Cap - Mars University';
    model.content.gameTitle = 'Mars University';

    res.render('marsUniversity/game', model);
  }

 
};
