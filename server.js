(function() {
	'use strict';

	//modules
	var express = require('express'),
			app = express(),
			bodyParser = require('body-parser'),
			// Database
			db,
			// Database credentials
			dbCredentials,
			handlebars = require('express-handlebars').create(
				{
					defaultLayout:'main',
					layoutsDir: './mvc/view/layouts',
					partialsDir: './mvc/view/partials'
				}),
			fs = require("fs"),
			// Passport Authentication file
			passportAuth = require('./config/passportAuth'),
			// Gets our routes
			routes,
			// Controllers are js files which contain routes
			routeDir="./mvc/controller/",
			sassMiddleware = require('node-sass-middleware'),
			port = process.env.PORT || 3000,
			cookieParser = require('cookie-parser'),
			session = require('express-session');

	/**
	 * Configure Express
	 */

	//security app disable
	app.disable('x-powered-by');

	//setting up the port and engine
	app.set('port', port);

	app.use(sassMiddleware({
		src: __dirname + '/public/sass',
		dest: __dirname + '/public/css',
		outputStyle: 'compressed',
		prefix: '/css'
	}));
	
	app.use(bodyParser.urlencoded());
	app.use(bodyParser.json());

	app.use(express.static(__dirname + '/public'));

	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');
	app.set('views', './mvc/view');

	app.use(cookieParser());
	app.use(session({
		secret: 'cookie_secret',
		resave: true,
		saveUninitialized: true
	}));

	// Initialize passport
	passportAuth(app);

	/**
	 * Routes
	 */
	// Routes function
	routes = function(dir, filelist) {
    var route,
				routesPattern = /.js$/,
        fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    // If filelist exists, use it otherwise create new array
    filelist = filelist || [];

    // Loop through files
    files.forEach(function(file) {
      // If file is a directory
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        // call this function again in that directory
        filelist = routes(dir + '/' + file, filelist);
      }
      else {
        // If it is a javascript file
        if (routesPattern.test(file)) {
          // Get the route
          route = dir + '/' + file;

          // Require file
          require(route)(app);
        }
      }
    });
  };

	// Call routes
	routes(routeDir);

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
		res.render('errors/404');
	});

	//500 error - server error
	app.use(function(err, req,res, next){
		console.log(err.stack);
		res.status(500);
		res.render('errors/500');
	});
}());
