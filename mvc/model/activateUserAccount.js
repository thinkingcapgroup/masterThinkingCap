module.exports = function(req, data, next){
  var db = req.db,
      activateUserAccount = 'SELECT * FROM accountActivationCodes WHERE activationCode = ?;',
      resultRow,
      error = false;

  db.query(activateUserAccount, [data.activationCode], function(err, result) {
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
