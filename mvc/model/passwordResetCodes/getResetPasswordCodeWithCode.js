function getResetPasswordCodesWithCode (req, code, next){
  var db = req.db,
      resultRow = null,
      getResetPasswordCodeWithCode = 'SELECT * FROM `passwordResetCodes` WHERE `passwordCode` = ?;',
      error = false;

  db.query(getResetPasswordCodeWithCode, [code], function (err, result) {
    console.log(result);
    resultRow = result[0];

  	if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else if (!resultRow) {
      error = 'Unable to find account with that reset code. The link may have expired already. Please re-enter your email to send a new reset password link.';
      next(error, resultRow);
    }
    else {
      next(err, resultRow);
    }
  });
}
module.exports = getResetPasswordCodesWithCode;
