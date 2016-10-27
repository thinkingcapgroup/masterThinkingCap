var auth = require('../../model/auth');
var object;
var fs = require('fs');
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.get('/game', auth, function(req, res){

    renderMarsUniversityGame(req, res);
  });
  
	app.get('/ajax', function(req, res) {
	res.send(getData());
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
	
  app.post('/saver',  function (req, res) 
	{
		//TextFile Saving
		var stringTem = req.body.saveData;
	 	//fs.writeFile('saveFile/userSave.txt', stringTem, function (err) 
		//{});
		
		//Database Saving
	
		require('../../model/marsUniversity/saveUserGame.js')(req, stringTem, function(err, success) {
         if (err) {
            console.error(err);
         }
        else {
           
         }
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

/*
  function renderMarsUniversityGame(req, res) {
    var model = require('../../model/global')(req, res);
	model.saveState = getData(req,res);
    model.content.pageTitle = 'Thinking Cap - Mars University';
    model.content.gameTitle = 'Mars University';
	console.log(model.saveState);
    res.render('marsUniversity/game', model);
  }

 var getData = function(req,res) 
 {
	//var holder = fs.readFileSync('saveFile/userSave.txt', "utf8")
	var holder;
	
	//Database Loading
		require('../../model/marsUniversity/loadSave.js')(req, function(err, success) 
{
          if (err) {
            console.error(err);
          }
          else {
            return success;
          }
        });
 }
 */
 
 function renderMarsUniversityGame(req, res) {
	var model = require('../../model/global')(req, res);
    model.content.pageTitle = 'Thinking Cap - Mars University';
    model.content.gameTitle = 'Mars University';
	require('../../model/marsUniversity/loadSave.js')(req, function(err, success) 
		 {
          if (err) {
            console.error(err);
          }
          else {
            model.saveState = success;
			console.log(model.safeState);
          }
		  res.render('marsUniversity/game', model)
        });
	
  }
};
