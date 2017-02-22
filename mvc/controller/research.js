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

router.get('/search', auth, function (req, res) {
  // TextFile Saving
  stringTem = 'Hi'
  var objectPasser = {search: req.query.search, type: req.query.type}

  //Database Saving
 
  require('../model/researchArea/researchDatabase.js')(req, objectPasser, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
      res.end();
    }
    // Otherwise
    else {
      var holder = [];
      for(var x =0; x < success.length; x++){
        var placeHolder = {};
        placeHolder.id = success[x].userId;
        placeHolder.username = success[x].userName;
        placeHolder.role = success[x].role;
        holder.push(placeHolder);
      }

      res.json(holder);
    }
  });

  // End response

});


function readLines(){

  lineArray = [];
  holderArray = [];
  holderArray = fs.readFileSync('logInfo/userAction.txt').toString().split('\n');

  for(var x= 0; x < holderArray.length; x++){
    var objectHolder = [];
    objectHolder.isPoll = false;
    var newHolderArray = holderArray[x].split("-");
    if(newHolderArray[1] == 'userAction'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = newHolderArray[1];
      objectHolder.action = newHolderArray[2];
      objectHolder.username = newHolderArray[4];
      objectHolder.timeStamp =  new Date(newHolderArray[3] * 1).toLocaleString()
    }
    else if(newHolderArray[1] == 'endGame'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = newHolderArray[1];
      objectHolder.action = newHolderArray[2] + " " + newHolderArray[3];
      objectHolder.username = newHolderArray[5];
      objectHolder.timeStamp =  new Date(newHolderArray[4] * 1).toLocaleString()
    }
    else if(newHolderArray[1] == 'poll'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = newHolderArray[1];
      objectHolder.action = newHolderArray[2];
      objectHolder.timeStamp =  new Date(newHolderArray[3] * 1).toLocaleString();
      objectHolder.username = newHolderArray[4];
      objectHolder.isPoll = true;
      //do the questions

      var questionHolder = newHolderArray[2].split('*')
      var objectQuestion = [];      
      questionHolder.forEach(function(element){
        var hold = "";
        if(element == 'undefined'){
          hold = "NA"
        }
        else{
          hold = element;
        }
        objectQuestion.push(hold)
      })
      objectHolder.questions = objectQuestion;


    }
    else if(newHolderArray[1] == 'minigameScore'){
      objectHolder.id = newHolderArray[0];
      objectHolder.type = "Minigame " + newHolderArray[1];
      objectHolder.action = "Score: " + newHolderArray[2];
      objectHolder.timeStamp =  new Date(newHolderArray[3] * 1).toLocaleString()
      objectHolder.username = newHolderArray[4];
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
  

  model.content.pageTitle = 'Thinking Cap';
  model.researchArray = lineArray;
  model.layout = 'researchlayout'
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  // Render /dashboard using the 'dashboard' view and model
  res.render('research', model);
}


// Export dashboard router
module.exports = router;
