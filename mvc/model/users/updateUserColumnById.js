module.exports = function(req, data, next){
  var db = req.db,
      updateUser = 'UPDATE users SET ?? = ? WHERE userId = ?',
      error = false;

  db.query(updateUser, [data.column, data.value, data.userId], function(err, result) {
  	if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else {
      next(err, result);
    }
  });
}
