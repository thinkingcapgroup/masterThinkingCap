// Require express
var express = require('express'),
    fs = require('fs');
    // Get the express Router
    router = express.Router(),
    json2xls = require('json2xls'),
    // Require the Auth middleware
    auth = require('../model/auth/auth');
    var postArray = [];
    var preArray = [];
    var demoArray = [];
    var preTotalArray = [];
    var postTotalArray = [];
    var errorNotifications = [];
    lineArray = [];
    lineArray2 = [];
    holderArray = [];
    videoArray = [];

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
  if (req.user.role >= 6) {
    // Render dashboard view
    getDatabase(req,res);
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

router.get('/makeExcel', function (req, res) {
  // TextFile Saving

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/researchArea/makeExcel.js')(req, lineArray, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
     var file = __dirname + '/../../upload/data.xlsx'
      res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");

       }
   });
    }
 });

  // End response

});


router.get('/makePreTestExcel', function (req, res) {
  // TextFile Saving

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/researchArea/makePreTestExcel.js')(req, preArray, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
     var file = __dirname + '/../../upload/allPreTestData.xlsx'
      res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");

       }
   });
    }
 });

  // End response

});

router.get('/makePostTestExcel', function (req, res) {
  // TextFile Saving

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/researchArea/makePostExcel.js')(req, postArray, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
     var file = __dirname + '/../../upload/allPostTestData.xlsx'
      res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");

       }
   });
    }
 });

  // End response

});


router.get('/summaryPreTestData', function (req, res) {
  // TextFile Saving

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/researchArea/summaryPreTestExcel.js')(req, preTotalArray, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
     var file = __dirname + '/../../upload/summaryPreTestData.xlsx'
      res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");

       }
   });
    }
 });

  // End response

});


router.get('/summaryPostTestExcel', function (req, res) {
  // TextFile Saving

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/researchArea/summaryPostTestExcel.js')(req, postTotalArray, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
     var file = __dirname + '/../../upload/summaryPostTestData.xlsx'
      res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");

       }
   });
    }
 });


});

router.get('/demographicExcel', function (req, res) {
  // TextFile Saving

  //fs.writeFile('saveFile/userSave.txt', stringTem, function (err)
  //{});

  //Database Saving
  require('../model/researchArea/demographicExcel.js')(req, demoArray, function(err, success) {
    // If there was an error
    if (err) {
      console.error(err);
    }
    // Otherwise
    else {
     var file = __dirname + '/../../upload/demographicData.xlsx'
      res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");

       }
   });
    }
 });


});

function getDatabase(req,res){

   require('../model/researchArea/getAllResearchData.js')(req, function(err, b) {
    // If there is a database error
    if (err) {

      // If there where no bug reports
      if (err === 'No Research Data found!') {
        // Set model to emptyState
     
      }
      // Otherwise
      else {
        // Show user the error message
        errorNotifications.push(err);
      }

      console.error(err);
    }
    // Otherwise bug reports were found
    else {
      // Set the model's bugReports to recieved data
      lineArray = b;
    
    }
  });


 require('../model/researchArea/getAllResearchTestData.js')(req, function(err, b) 
        {
        
            if (err) 
            {
            // If there where no bug reports
            if (err === 'No Research Data found!') 
            {
            // Set model to emptyState
   
            }
            // Otherwise
            else 
            {
            // Show user the error message
            errorNotifications.push(err);
            }
        
            console.error(err);
            }
            // Otherwise bug reports were found
            else 
            {
                // Set the model's bugReports to recieved data
                lineArray2 = b;
                preArray = [];
                postArray = [];
            
                for(var z=0; z < lineArray2.length; z++)
                {
                    var thing = lineArray2[z].testId.split('-')
                    if(thing[0] == 'pre')
                    {
                     
                        preArray.push(lineArray2[z])
                    }
                    else if (thing[0] == 'post')
                    {
                        postArray.push(lineArray2[z])
                    }
                }
            }
          });

  require('../model/researchArea/getAllResearchDemoData.js')(req, function(err, b) 
        {
        
            if (err) 
            {
            // If there where no bug reports
            if (err === 'No Demographic Data found!') 
            {
            // Set model to emptyState

            }
            // Otherwise
            else 
            {
            // Show user the error message
            errorNotifications.push(err);
            }
        
            console.error(err);
            }
            // Otherwise bug reports were found
            else 
            {
                // Set the model's bugReports to recieved data
                demoArray = b;
            }
    });

    require('../model/researchArea/getAllTestTimeData.js')(req, function(err, b) {

    if (err) {

      // If there where no bug reports
      if (err === 'No Research Data found!') {
        // Set model to emptyState

      }
      // Otherwise
      else {
        // Show user the error message
        errorNotifications.push(err);
      }

      console.error(err);
    }
    // Otherwise bug reports were found
    else {
      // Set the model's bugReports to recieved data

        preTotalArray = [];
      postTotalArray = [];


      for(var z=0; z < b.length; z++){
        var thing = b[z].testId.split('-')
        if(thing[0] == 'pre'){

          preTotalArray.push(b[z])
        }
        else if (thing[0] == 'post'){

          postTotalArray.push(b[z])
        }
        
      }


    }
    });

   require('../model/video/getAllVideos.js')(req, function(err, b) {
    // If there is a database error
    if (err) {

      // If there where no bug reports
      if (err === 'No Research Data found!') {
        // Set model to emptyState
     
      }
      // Otherwise
      else {
        // Show user the error message
        errorNotifications.push(err);
      }

      console.error(err);
    }
    // Otherwise bug reports were found
    else {
      // Set the model's bugReports to recieved data
      videoArray = b;
    
    }
  });
    //grab log information
    renderResearch(req, res);
        

    // Render /bugreports using the 'bugReports' view and model

  
};

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
  model.researchArray2 = preArray;
  model.researchArray3 = postArray;
  model.researchArray4 = demoArray;
  model.researchArray5 = preTotalArray;
  model.researchArray6 = postTotalArray;
  model.researchArray7 = videoArray;

  model.layout = 'researchlayout'
  model.globalNavigationMode = require('../model/global/globalNavigationModeAuth')(req, res);

  // Render /dashboard using the 'dashboard' view and model
  res.render('research', model);
}


// Export dashboard router
module.exports = router;
