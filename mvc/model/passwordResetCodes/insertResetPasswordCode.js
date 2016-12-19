function insertResetPasswordCodes (req, data, next) {
  var db = req.db,
      insertResetPasswordCode = 'INSERT INTO passwordResetCodes ' +
                                '(userEmail, passwordCode, startTime, endTime) ' +
                                'VALUES (:userEmail, :passwordCode, :startTime, :endTime) ON DUPLICATE KEY UPDATE ' +
                                'userEmail = :userEmail, passwordCode = :passwordCode, startTime = :startTime, endTime = :endTime;',
      error = false;

  db.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };

  db.query(insertResetPasswordCode, data, function (err, result) {
    if (err) {
      console.error(err);
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        error = 'Unable to find an account with email: ' + data.userEmail + '. Please enter the email connected to your account or create a new account.';
      }
      else {
        error = err.toString();
      }
      next (error, result);
    }
    else {
      next(error, result);
    }
  });
}

module.exports = insertResetPasswordCodes;
