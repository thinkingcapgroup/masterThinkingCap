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
    var stringTem = "\n" + id + "-" + event + "-" + Date.now();
	 	fs.appendFile('logInfo/useraction.txt', stringTem, function (err) {

      console.log('Student information logged');
    });
	 	res.end();
 	});
	
  app.post('/saver',  function (req, res, next) 
	{
	console.log(req.body);
    var stringTem = req.body.saveData;
	 	fs.writeFile('saveFile/userSave.txt', stringTem, function (err) 
		{
			console.log('Save File Updated logged');
		});
	 	res.end();
 	});

  app.post('/loggerPoll',  function (req, res, next) {
     var id = req.user.id
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var stringThing ="\n"+id+"-"+ q1 + "-" + q2 + "-" +q3 + "-" +q4 + "-" +q5;
      fs.appendFile('logInfo/useraction.txt', stringThing, function (err) {

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
