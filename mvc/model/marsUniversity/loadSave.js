module.exports = function(req, next){
	var db = req.db;
	var user = req.user.userId;
	getSaveByID = 'SELECT `saveFile` FROM `saveData` WHERE `userID` = ?;',
	error = false;
	console.log(user);
	var id = user.toString();
	var saveFile = false;
	db.query(getSaveByID, [id], function(err, result) 
	{
		
		if(!result[0]) 
		{
			saveFile = "";
			next(err, result);
		}
		else if (err) 
		{
			error = err.toString();
			next(err, result)
		}
		else 
		{
			saveFile = result[0].saveFile;
			next(err, saveFile);
		}
	});
}