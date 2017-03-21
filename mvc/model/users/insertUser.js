function insertUser (req, data, next) {
  var db = req.db,
      insertUserQuery = 'INSERT INTO users ' +
                    '(userName, email, password, displayName, elligibleForTest, research, role) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?);'
      error = false;

  db.query(insertUserQuery, [data.userName, data.email, data.password,
                        data.displayName, data.elligibleForTest, data.research, data.role],
                        function(err, result) {
  	if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else {
      next(err, result);
    }
  });
}

module.exports = insertUser;
