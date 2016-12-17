module.exports = function(req, email, next){
  var db = req.db,
      resultRow,
      getUserByEmail = 'SELECT * FROM `users` WHERE `email` = ?;',
      error = false;

  db.query(getUserByEmail, [email], function(err, result) {
    resultRow = result[0];

  	if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else if (!resultRow) {
      error = 'No result';
      next(error, resultRow);
    }
    else {
      next(err, resultRow);
    }
  });
}
