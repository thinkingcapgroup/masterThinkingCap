function getAccountActivationCode (req, email, next){
  var db = req.db,
      getAccountActivationCodeByEmail = 'SELECT * FROM `accountActivationCodes` LEFT JOIN `users` on (accountActivationCodes.userId = users.userId) WHERE `email` = ?;',
      resultRow = null,
      error = false;

  db.query(getAccountActivationCodeByEmail, [email], function(err, result) {

    resultRow = result[0];

  	if (err) {
      error = err.toString();
  		next(error, resultRow)
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

module.exports = getAccountActivationCode;
