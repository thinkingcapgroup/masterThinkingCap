function authenticateUserByEmail (req, data, next) {
  var db = req.db,
      resultRow,
      getUserByPassword = 'SELECT * FROM `users` WHERE `email` = ? AND `password` = ?;',
      error = false;

  db.query(getUserByPassword, [data.email, data.password],function(err, result) {
    resultRow = result[0];

    if (err) {
      error = err.toString();
  		next(error, result)
  	}

    else if (!resultRow) {
      error = 'No user with that email and password combination was found.';
      next(error, result);
    }

    else {
      next(err, resultRow);
    }
  });
}

module.exports = authenticateUserByEmail;
