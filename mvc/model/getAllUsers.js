module.exports = function(req, next){
  var db = req.db,
      getAllUsers = 'SELECT * FROM `users`;',
      error = false;

  db.query(getAllUsers,function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
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
