module.exports = function(req, data, next){
  var db = req.db,
      insertBugReport = 'INSERT INTO bugReports (subject, category, description) VALUES (?, ?, ?);'
      error = false;


  db.query(insertBugReport, [data.subject, data.category, data.description],function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}
