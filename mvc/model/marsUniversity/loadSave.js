module.exports = function(req, next){
	var db = req.db;
	var user = req.user.id;
	getSaveByID = 'SELECT `saveFile` FROM `saveData` WHERE `userID` = ?;',
	error = false;
	var id = user.toString();
	var saveFile = false;
	db.query(getSaveByID, [id], function(err, result) 
	{
		if (err) 
		{
			error = err.toString();
			next(err, result)
		}
		else if (!result[0]) 
		{
			error = 'No result';
			next(error, result);
		}
		else 
		{
			saveFile = result[0].saveFile;
			next(err, saveFile);
		}
	});
}