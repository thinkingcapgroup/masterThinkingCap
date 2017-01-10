function updateUser (req, data, next) {
  var db = req.db,
      updateUserQuery = 'UPDATE users SET userName = ?, email = ?, password = ?, displayName = ?, research = ?, role = ? WHERE userId = ?',
      error = false;

  db.query(updateUserQuery, [data.userName, data.email, data.password, data.displayName, data.research, data.role, data.userId], function (err, result) {
    if (err) {
      error = err.toString();
      next(error, result);
    }
    else {
      next(error, result);
    }
  })
}

module.exports = updateUser;
