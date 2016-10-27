module.exports = function(req, data, next){
  var db = req.db,
      getUserByPassword = 'SELECT * FROM `users` WHERE `userName` = ?, `password` = ?;',
      error = false;

  db.query(getUserByPassword, [data.username, data.password],function(err, result) {
  	if (err) {
      error = err.toString();
      console.log(error);
  		next(err, result)
  	}
    else if (!result[0]) {
      error = 'No user with that password was found';
      console.log(error);
      next(error, result);
    }
    else {
      next(err, result);
    }
  });
}
