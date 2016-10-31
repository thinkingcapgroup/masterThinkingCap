var auth = require('../model/auth');

module.exports = function(app) {

  var errorNotifications = [], successNotifications = [];

  app.get('/bugreports', auth, function(req, res){
    // Wipe out notifications
    errorNotifications.length = successNotifications.length = 0;

    // If user is not a dev
    if (req.user.role !== 5) {
      // Redirect them
      res.redirect('/dashboard');
    }
    // If user is a dev
    else {
      // Show page
      renderBugReports(req, res);
    }
  });

  function renderBugReports(req, res) {
    var model = require('../model/global')(req, res),
        username = req.user.userName,
        bugReports,
        displayName = req.user.displayName;

    model.content.appTitle = 'Bug Reports';

    require('../model/getAllBugReports')(req, function(err, b) {
      if (err) {
        if (err === 'No bug reports found!') {
          model.emptyState = true;
        }
        else {
          errorNotifications.push(err);
        }
        console.log(err);
      }
      else {
        model.bugReports = b;
        console.log(model.bugReports);
      }

      // If there are errors notifications attach them to model
      model.errorNotifications = (errorNotifications.length > 0) ? errorNotifications : null;

      // If there are success notifications attach them to model
      model.successNotifications = (successNotifications.length > 0) ? successNotifications : null;
      res.render('bugReports', model);
    });
  }
};
