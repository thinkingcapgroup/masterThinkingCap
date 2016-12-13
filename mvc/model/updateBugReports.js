module.exports = function(req, data, next){
  var db = req.db,
      updateUser = 'UPDATE `bugReports` SET `status` = "complete" WHERE `subject` = ?;',
      error = false;

	db.query(updateUser, [data], function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}
