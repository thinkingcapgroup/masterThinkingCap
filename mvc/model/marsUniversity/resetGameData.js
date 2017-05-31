module.exports = function(req, next)
{
	var db = req.db;
	var user = req.user.userId;
	var deleteSaves = 'DELETE FROM saveData'; 
	
	error = false;
	
	db.query(deleteSaves, [user] ,function(err, result) {
    if (err) {
      error = err.toString();
  		next(error, result)
  	}
    else if (!result) {
      error = 'Unable to delete save data.';
      next(error, result);
    }
    else {
      next(err, result);
    }
  });
}