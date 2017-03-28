function updateTestSession (req, data, next) {
  var db = req.db,
      updateUserQuery = 'UPDATE users SET testSession = ? Where userId = ?',
      error = false;

  db.query(updateUserQuery, [data.testSession, data.user], function (err, result) {
    if (err) {
      error = err.toString();
      next(error, result);
    }
    else {
      next(error, result);
    }
  })
}

module.exports = updateTestSession;
