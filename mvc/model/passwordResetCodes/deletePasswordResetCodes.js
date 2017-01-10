function deletePasswordResetCodes (req, data, next){
  var db = req.db,
      deletePasswordResetCode = 'DELETE FROM passwordResetCodes WHERE id = ? AND userEmail = ? AND passwordCode = ? AND startTime = ? AND endTime = ?;',
      resultRow,
      error = false;

  db.query(deletePasswordResetCode, [data.id, data.userEmail, data.passwordCode, data.startTime, data.endTime], function(err, result) {
    if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else if (!result) {
      error = 'Unable to delete password reset code.';
      next(error, result);
    }
    else {
      next(err, result);
    }
  });
}

module.exports = deletePasswordResetCodes;
