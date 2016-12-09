# Thinking Cap
### Getting Started:
* Download the program from git
* Make a branch for your name
* Make sure you have some sort of terminal
* In the terminal route to where package.json is
* Type “npm build”, this will install all the dependencies from package.json
* Type “npm start”, this will run server.js - a node server
* Go to localhost:3000 in your web browser, and the application should be there
* If you wish to be in developer mode, run “node-dev server.js”. This will run the server, tell you of errors, and auto update every time you save.

* To add a new package
 * Type npm install [packageName] -save

### Adding new pages:

#### Creating a controller

* Create the [newPageName].js in the appropriate folder inside mvc/controller with the following:

``` js
// Require express
var express = require('express'),
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../model/auth');

/**
 * router - GET method for [NewPageName] route '/[NewPageName]'
 * @param  {String} '/'    - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req    - Express Request Object
 * @param  {Object} res    - Express Response Object
 */
router.get('/', auth, function (req, res) {
  render[NewPageName](req, res);
});

/**
 * router - POST method for [NewPageName] route '/[NewPageName]'
 * @param  {String} '/'    - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req    - Express Request Object
 * @param  {Object} res    - Express Response Object
 */
router.post('/', auth, function (req, res) {
  res.redirect('/[newPageName]');
});

/**
 * render[NewPageName] - renders the [NewPageName] view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function render[NewPageName] (req, res) {
  // Require the global app model
  var model = require('./../model/global')(req, res);

  model.content.pageTitle = 'Thinking Cap';
  model.globalNavigationMode = require('../model/globalNavigationModeAuth')(req, res);

  // Render /[newPageName] using the '[newPageName]' view and model
  res.render('[newPageName]', model);
}

// Export [NewPageName] router
module.exports = router;
```

#### Creating a view

* Create the [newPageName].handlebars in the appropriate folder inside mvc/view with the following:

``` html
<main id='[new-page-name]'>
  <article class='wrapper'>
    <header>
      <h1>Mars University</h1>
    </header>
    <section>
      <p>Lorem ipsum</p>
    </section>
    <footer id='footer'>
      <p>Thinking Cap &copy; 2016</p>
    </footer>
  </article>
</main>
```
#### Creating a model
* Create a [model].js file in the appropriate folder inside mvc/model
* If we are just getting data follow this model

``` js
module.exports = function(req, next) {
  var db = req.db,
      get[X]Data = 'SELECT * FROM `table`;',
      error = false,
      resultRow;

  db.query(get[X]Data, function(err, result){
    resultRow = result[0];

    if (err) {
      error = err.toString();
      next(error, result);
    }

    else if (!resultRow) {
      error = 'No result';
      next(error, result);
    }

    else {
     next(error, result);
    }
  });
};
```

* If we are inserting data follow this model

``` js
module.exports = function(req, data, next) {
  var db = req.db,
      insert[X]Data = 'INSERT INTO `table` (columnOne, columnTwo) VALUES (?, ?);',
      error = false;

  db.query(insert[X]Data, [data.columnOne, data.columnTwo], function(err, result){

    if (err) {
      error = err.toString();
      next(error, result);
    }

    else {
     next(error, result);
    }
  });
};
```
### Creating client-side code not game specific
* Go into ```public/js/dev/```
 * Create a new js file there following the following format:

``` js
function [pageName] () {
  // add your code here
}

module.exports = [pageName];
```

* Then go into ```public/js/dev/thinkingcap.js```
 * Add your new file under the appropriate comment
  * Global is for global components in the app such as the navigation and bug Reports
  * Views are for specific pages like ```/login``` or ```dashboard```
  * Components are for widgets that are not seen on every page such as notifications ect.
 * Follow this format:

``` js
[pageName]: require('./[pageName]')
```
* Finally in ```public/js/dev/main.js```
 * If your file was under global you should simply do the following below the other globals:

``` js
// [pageName]
thinkingcap.[pageName]();
```
 * Otherwise the following:

``` js
else if (document.getElementById('[View/Element ID/]')) {
  thinkingcap.[pageName]();
}
```
  * Now remember to run ```npm run dev``` in your terminal after you change client side code!
   * This runs both ```webpack``` and ```node-dev server.js``` so that it bundles our code and starts the server
   * If you just want to bundle the code you can type ```webpack``` in your terminal

### Adding new styles
* If creating a new component (button, form, input, image, header, etc. something 'universal')
 * Go to ```public/sass/components/``` and create a _[component].scss file there and also in ```public/sass/sass.scss``` import the file

``` scss
.[component] {
  // Your styles here
}
```

* If creating a new view style (for a specific page)
 * Go to ```public/sass/views/``` and create a _[view].scss file there and also in ```public/sass/styles.scss``` import the file

``` scss
#[view] {
  // Your styles here
}
```

* If you want to test code out use the ```public/sass/_test.scss``` file. When it is ready you can move it elsewhere
* If you want to save a variable save it in ```public/sass/partials/_variables.scss```
* If you want to save a mixin save it in ```public/sass/partials/_mixins.scss```
* If you want to save a layout style save it in ```public/sass/partials/_layout.scss```

### Folder Structure
* config
 * auth json file
*db
 * thinking_cap.mysql - database file
* mvc
 * model
 * view - html template
 * controller - js files linked to a view
* public  
 * css - app styles
 * js - client side scripts
 * media - images etc.
 * sass - styles
  * components - global styles (ie. buttons, links)
  * views - specific styles for a view (filename should be same as view)
* .gitignore - ignores node_modules when using git
* package.json - contains game dependencies
* README - this
* server.js - app
