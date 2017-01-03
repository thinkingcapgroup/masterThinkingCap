function activateUserAccount (req, data, next){
  var db = req.db,
      activateUserAccountQuery = 'SELECT * FROM accountActivationCodes WHERE activationCode = ?;',
      resultRow,
      error = false;

  db.query(activateUserAccountQuery, [data.activationCode], function(err, result) {
    resultRow = result[0];

    if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else if (!resultRow) {
      error = 'Not found';
      next(error, resultRow);
    }
    else {
      next(err, resultRow);
    }
  });
}

module.exports = activateUserAccount;
