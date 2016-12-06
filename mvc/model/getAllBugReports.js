module.exports = function(req, next){
  var db = req.db,
      getAllBugReports = 'SELECT * FROM `bugReports` WHERE status = "incomplete";',
      error = false;

  db.query(getAllBugReports,function(err, result) {
  	if (err) {
      console.error(err.toString());
      error = 'There was an error retrieving the bug reports.';
  		next(error, result)
  	}

    else if (!result[0]) {
      error = 'No bug reports found!';
      next(error, result);
    }

    else {
      next(err, result);
    }
  });
}
