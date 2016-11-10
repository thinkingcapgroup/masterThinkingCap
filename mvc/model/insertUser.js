module.exports = function(req, data, next){
  var db = req.db,
      insertUser = 'INSERT INTO users ' +
                    '(userName, email, password, passportType, displayName, deaf, research, role) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
      error = false;

  db.query(insertUser, [data.userName, data.email, data.password, data.passportType,
                        data.displayName, data.deaf, data.research, data.role],
                        function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}
