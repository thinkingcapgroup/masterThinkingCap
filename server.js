//modules
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var fs = require("fs");

//security app disable
app.disable('x-powered-by');

//setting up the port and engine
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//pages
app.get('/', function(req,res){
	res.render('home');
});


//port starting and listening
app.listen(app.get('port'), function(){
	console.log('Server started at 3000');
});

//looking for page
app.use(function(req,res,next){
	console.log("Looking for "+ req.url);
	next();
});

//404 error - page not found
app.use(function(req,res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});

//500 error - server error
app.use(function(err, req,res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});