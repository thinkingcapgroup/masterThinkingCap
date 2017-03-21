function getUserByColumn (req, data, next){
  var db = req.db,
      resultRow,
      getUserByColumnQuery = 'SELECT * FROM `users` WHERE ?? = ?;',
      error = false;

  db.query(getUserByColumnQuery, [data.column, data.value], function(err, result) {
    resultRow = result[0];

  	if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else {
      next(err, resultRow);
    }
  });
}

module.exports = getUserByColumn;
