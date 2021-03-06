function authententicateUserByUserName (req, data, next) {
  var db = req.db,
      resultRow,
      getUserByPassword = 'SELECT * FROM `users` WHERE `userName` = ? AND `password` = ?;',
      error = false;

  db.query(getUserByPassword, [data.username, data.password],function(err, result) {
    resultRow = result[0];

    if (err) {
      error = err.toString();
      console.error(error);
  		next(err, result)
  	}

    else if (!resultRow) {
      error = 'No user with that username and password combination was found.';
      next(error, result);
    }

    else {
      next(err, resultRow);
    }
  });
}

module.exports = authententicateUserByUserName;
