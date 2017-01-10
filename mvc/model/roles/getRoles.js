function getRoles (req, next){
  var db = req.db,
      getRolesQuery = 'SELECT * FROM `roles`;',
      error = false;

  db.query(getRolesQuery, function(err, result) {
  	if (err) {
      error = err.toString();
  		next(error, result)
  	}

    else if (!result[0]) {
      error = 'No roles found';
      next(error, result);
    }

    else {
      next(err, result);
    }
  });
}

module.exports = getRoles;
