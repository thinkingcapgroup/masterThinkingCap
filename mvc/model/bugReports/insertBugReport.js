function insertBugReport (req, data, next) {
  var db = req.db,
      insertBugReportQuery = 'INSERT INTO bugReports (subject, category, description, status, date, username) VALUES (?, ?, ?, ?, ?, ?);'
      error = false;

  data.status = 'incomplete';

  db.query(insertBugReportQuery, [data.subject, data.category, data.description, data.status, data.date, data.username],function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}

module.exports = insertBugReport;
