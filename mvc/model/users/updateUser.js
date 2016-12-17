function updateUser (req, data, next) {
  var db = req.db,
      updateUserQuery = 'UPDATE users SET userName = ? AND email = ? AND password = ? AND displayName = ? AND research = ? AND role = ? WHERE userId = ?;',
      error = false;

  db.query(updateUserQuery, [data.userName, data.email, data.password, data.displayName, data.research, data.role, data.userId], function (err, success) {
    if (err) {
      error = err.toString();
      next(error, success);
    }
    else {
      next(error, success);
    }
  })
}

module.exports = updateUser;
