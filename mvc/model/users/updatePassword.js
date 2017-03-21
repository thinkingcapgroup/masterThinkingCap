/**
 * updatePasswordWithEmail - Updates a users password by a column and a value
 * such as column: 'id' columnValue: 1
 * or column: 'email' columnValue:'user@rit.edu'
 * or column: 'userName' columnValue: 'user'
 * @param  {Object} req  - Express request object
 * @param  {Object} data - Data object containing a password, column, and columnValue
 * @param  {Object} next - Return
 */
function updatePasswordWithEmail (req, data, next) {
  var db = req.db,
      updatePassword = 'UPDATE `users` SET `password` = ? WHERE ?? = ?;',
      error = false;

	db.query(updatePassword, [data.password, data.column, data.columnValue], function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}

module.exports = updatePasswordWithEmail;
