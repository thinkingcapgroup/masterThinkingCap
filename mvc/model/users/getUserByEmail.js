function getUserByEmail (req, email, next){
  var db = req.db,
      resultRow,
      getUserByEmailQuery = 'SELECT * FROM `users` WHERE `email` = ?;',
      error = false;

  db.query(getUserByEmailQuery, [email], function(err, result) {
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

module.exports = getUserByEmail;
