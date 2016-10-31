module.exports = function(req, email, next){
  var db = req.db,
      resultRow,
      getUserByEmail = 'SELECT * FROM `users` WHERE `email` = ?;',
      error = false;

  db.query(getUserByEmail, [email],function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else if (!result[0]) {
      error = 'No result';
      next(error, result);
    }
    else {
      resultRow = result[0];
      next(err, resultRow);
    }
  });
}
