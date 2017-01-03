function updateBugReport (req, data, next) {
  var db = req.db,
      updateBugReportQuery = 'UPDATE `bugReports` SET `status` = "complete" WHERE `subject` = ?;',
      error = false;

	db.query(updateBugReportQuery, [data], function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}

module.exports = updateBugReport;
