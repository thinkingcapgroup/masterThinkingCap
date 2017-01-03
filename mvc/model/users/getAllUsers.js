function getAllUsers (req, next){
  var db = req.db,
      getAllUsersQuery = 'SELECT * FROM `users`;',
      error = false;

  db.query(getAllUsersQuery,function(err, result) {
  	if (err) {
      error = err.toString();
  		next(error, result)
  	}

    else if (!result[0]) {
      error = 'No result';
      next(error, result);
    }

    else {
      next(err, result);
    }
  });
}

module.exports = getAllUsers;
