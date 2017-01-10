function deleteAccountActivationCodes (req, data, next){
  var db = req.db,
      deleteAccountActivationCodeQuery = 'DELETE FROM accountActivationCodes WHERE id = ? AND userId = ? AND activationCode = ?;',
      resultRow,
      error = false;

  db.query(deleteAccountActivationCodeQuery, [data.id, data.userId, data.activationCode], function(err, result) {
    if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else if (!result) {
      error = 'Not found';
      next(error, result);
    }
    else {
      next(err, result);
    }
  });
}

module.exports = deleteAccountActivationCodes;
