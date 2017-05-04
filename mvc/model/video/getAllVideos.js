function getAllBugReports (req, next) {
  var db = req.db,
      getAllBugReportsQuery = 'SELECT * FROM `videoLog` where active = "active";',
      error = false;

  db.query(getAllBugReportsQuery, function(err, result) {
  	if (err) {
      console.error(err.toString());
      error = 'There was an error retrieving the bug reports.';
  		next(error, result)
  	}

    else if (!result[0]) {
      error = 'No Research Data found!';
      next(error, result);
    }

    else {
      next(err, result);
    }
  });
}

module.exports = getAllBugReports;
