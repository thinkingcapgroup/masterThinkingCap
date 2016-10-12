var auth = require('../model/auth');
var fs = require('fs');

module.exports = function(app) {
  
  app.post('/logger', function (req, res, next) {
    	console.log(req.body.ID);
    	var stream = fs.createWriteStream("my_file.txt");
	stream.once('open', function(fd) {
  	stream.write("TESTEST\n");
  	stream.write("My second row\n");
  	stream.end();
	res.end();
		});

	});

  app.get('/home', auth, function(req, res){
  	var model = {};
  	model.title = 'Mars University';

  	model.loggedIn = req.isAuthenticated();

  	res.render('home', model);
  });

  


};
