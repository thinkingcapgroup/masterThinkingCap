module.exports = function(app) {
  app.post('/bugreport', function(req, res){
    var report = {},
        rb = req.body,
        currentRoute = req.header('Referer') || '/';

    // If user clicked submit button
    if (rb.submitBugReport) {
      // Put the fields in the object
      report.subject = rb.bugSubject;
      report.category = rb.bugCategory;
      report.description = rb.bugDescription;

      // Call the model to insert bug
      require('../model/insertBugReport')(req, report, function(err, success) {
        if (err) {
          console.log(err);
        }
        else {
        }
      });
    }

    // Redirect to our current route
    res.redirect(currentRoute);
  });
};
