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
 * Create the [newPageName].handlebars in mvc/view
  * In that, you can type any html that you need
 * Then Create [newPageName].js in mvc/controller
  * In the js file just created type in the following
    * ```module.exports = function(app){
           app.get('/[newPageName]', auth, function(req,res){
            // Your code here
           	res.render('[newPageName]');
          });
   };```

  ### Folder Structure
  * config
   * auth json file
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
