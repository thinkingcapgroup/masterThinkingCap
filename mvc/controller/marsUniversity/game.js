// Require express
var express = require('express'),
   // Get the express Router
   router = express.Router(),
   // Require the Auth middleware
   auth = require('../../model/auth'),
   // Require body-parser module
   bodyParser = require('body-parser'),
   // Require fs module
   fs = require('fs'),
   object;

/**
 * router - GET method for game route 'marsUniversity/game'
 * @param  {String} 'marsuniversity/game' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/', auth, function (req, res) {
  // Render Mars University game
  renderMarsUniversityGame(req, res);
});

/**
 * router - GET method for game ajax route 'marsUniversity/ajax'
 * @param  {String} 'marsuniversity/ajax' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.get('/ajax', function (req, res) {
  // Send data obtained
  res.send(getData());
});

/**
 * router - POST method for Mars University game route '/logger'
 * @param  {String} '/logger' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 * @param  {Function} next - Indicates next function
 */
router.post('/logger', auth, function (req, res, next) {
  // Get the name of the event
  var event = req.body.eventName,
      // Get user id
      id = req.user.userId,
      // Concatenate information
      stringTem = "\n" + id + "-" + event + "-" + Date.now();

  // Append stringTem to file 'logInfo/useraction.txt'
  fs.appendFile('logInfo/useraction.txt', stringTem, function (err) {
    console.log('Student information logged');
  });

  // End the response
  res.end();
});

/**
 * router - POST method for Mars University game route '/saver'
 * @param  {String} '/saver' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
router.post('/saver', auth, function (req, res) {
  // TextFile Saving
  var stringTem = req.body.saveData;

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../../model/marsUniversity/saveUserGame.js')(req, stringTem, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
    }
  });

  // End response
  res.end();
});

/**
 * router - POST method for Mars University game route '/loggerPoll'
 * @param  {String} '/loggerPoll' - local route string
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 * @param  {Function} next - Indicates next function
 */
router.post('/loggerPoll', auth, function (req, res, next) {
  // Get user id
  var id = req.user.userId,
      // Get the 6 questions asked
      q1 = req.body.q1,
      q2 = req.body.q2,
      q3 = req.body.q3,
      q4 = req.body.q4,
      q5 = req.body.q5,
      q6 = req.body.q6,
      // Concatenate information
      stringThing = '\n' + id + '-' + q1 + '-' + q2 + '-' +q3 + '-' + q4 + '-' + q5 + '-' + q6;

  // Append information to 'logInfo/useraction.txt'
  fs.appendFile('logInfo/useraction.txt', stringThing, function (err) {
    console.log('Student information logged with id: ' + id);
  });

  // End response
  res.end();
});

/**
 * renderMarsUniversityGame - renders the Mars University game view
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 */
function renderMarsUniversityGame (req, res) {
  // Require the global app model
  var model = require('../../model/global')(req, res);

  model.content.pageTitle = 'Thinking Cap - Mars University';
  model.content.gameTitle = 'Mars University';

  console.log(req.user.id + " is the id when loading");

  // Get the loadSave model
  require('../../model/marsUniversity/loadSave.js')(req, auth, function (err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }

    // Otherwise
    else {
      // Set saveState to the data obtained
      model.saveState = success;
    }

    // Render marsuniversity/game using the 'marsUniversity/game' view and model
    res.render('marsUniversity/game', model)
  });
}

// Export marsUniversity game router
module.exports = router;
