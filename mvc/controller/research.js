// Require express
var express = require('express'),
    fs = require('fs');
    // Get the express Router
    router = express.Router(),
    // Require the Auth middleware
    auth = require('../model/auth/auth');
    lineArray = [];
    holderArray = [];

/**
 * router - GET method for dashboard route '/dashboard'
 * @param  {String} '/'    - local route string
 * @param  {Function} auth - authentication middleware
 * @param  {Object} req    - Express Request Object
 * @param  {Object} res    - Express Response Object
 */
router.get('/', auth, function (req, res) {
  // If user account is activated
    holderArray = [];
  if (req.user.role > 5) {
    // Render dashboard view
    readLines();
    renderResearch(req, res);
  }

  // Otherwise
  else {
    // Redirect to accountactivation
    res.redirect('/accountactivation');
  }
});


function readLines(){

  lineArray = [];
  holderArray = [];
  holderArray = fs.readFileSync('logInfo/userAction.txt').toString().split('\n');

  for(var x= 0; x < holderArray.length; x++){
    var objectHolder = [];
    var newHolderArray = holderArray[x].split("-");
    if(newHolderArray[1] == 'userAction'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = newHolderArray[1];
      objectHolder.action = newHolderArray[2];
      objectHolder.timeStamp = newHolderArray[3];
    }
    else if(newHolderArray[1] == 'endGame'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = newHolderArray[1];
      objectHolder.action = newHolderArray[2] + " " + newHolderArray[3];
      objectHolder.timeStamp = newHolderArray[4];
    }
    else if(newHolderArray[1] == 'poll'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = newHolderArray[1];
      objectHolder.action = newHolderArray[2];
      objectHolder.timeStamp = newHolderArray[3];
    }
    else if(newHolderArray[1] == 'minigameScore'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = "Minigame " + newHolderArray[1];
      objectHolder.action = "Score: " + newHolderArray[2];
      objectHolder.timeStamp = newHolderArray[3];
    }

    if(objectHolder.length >=0){
      lineArray.push(objectHolder);
    }
  }
}

/**
 * renderDashboard - renders the user dashboard view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderResearch (req, res) {
  // Require the global app model
  var model = require('../model/global/global')(req, res),
      username = req.user.userName,
      displayName = req.user.displayName;

  console.log(req.user)      

  model.content.pageTitle = 'Thinking Cap';
  model.researchArray = lineArray;
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  // Render /dashboard using the 'dashboard' view and model
  res.render('research', model);
}


// Export dashboard router
module.exports = router;
