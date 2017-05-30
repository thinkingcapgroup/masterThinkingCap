module.exports = function(req, next)
{
	var db = req.db;
	var user = req.user.userId;
	var deleteSave = 'DELETE FROM saveData Where userId = ?'; 
	
	error = false;
	
	db.query(deleteSave, [user] ,function(err, result) {
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