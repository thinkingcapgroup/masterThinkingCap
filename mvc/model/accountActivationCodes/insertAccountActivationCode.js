function insertAccountActivationCode (req, data, next){
  var db = req.db,
      insertAccountActivationCodeQuery = 'INSERT INTO accountActivationCodes (userId, activationCode) VALUES (?, ?);'
      error = false;

  db.query(insertAccountActivationCodeQuery, [data.userId, data.activationCode],function(err, result) {
  	if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else {
      next(err, result);
    }
  });
}

module.exports = insertAccountActivationCode;
