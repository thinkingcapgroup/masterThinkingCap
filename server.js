function mainApp() {
	//modules
	var express = require('express'),
			app = express(),
			// Database
			db,
			// Database credentials
			dbCredentials,
			handlebars = require('express-handlebars').create({defaultLayout:'main', layoutsDir: './mvc/view/layouts', partialsDir: './mvc/view/partials'}),
			fs = require("fs"),
			// Holds routes
			route,
			// Controllers are js files which contain routes
			routePath="./mvc/controller/",
			sassMiddleware = require('node-sass-middleware'),
			port = process.env.PORT || 3000,
			cookieParser = require('cookie-parser'),
			session = require('express-session'),
			authConfig = require('./config/auth'),
			passport = require('passport'),
			GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


	
			
	/**
	 * Passport Authentication
	 */
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new GoogleStrategy(
		authConfig.google,
		function(request, accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	));

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

	// Initialize Passport
	app.use(passport.initialize());

	// Restore Passport Session, if any
	app.use(passport.session());

	/**
	 * Routes
	 */
	// Automatically gets our routes in 'mvc/controller'
	// Goes through each file in 'mvc/controller'
	console.log(fs.readdirSync(routePath).length);
	fs.readdirSync(routePath).forEach(function(file) {
		var jsPattern = /.js$/;

		if (jsPattern.test(file)) {
			// Creates a new route var using the file
			route = routePath + file;
			console.log(route);
			// Requires the route
			require(route)(app);
		}
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

	function ensureAuthenticated(req, res, next){
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}
}

mainApp();
