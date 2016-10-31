module.exports = function(req, auth, next){
	var db = req.db;
	var user = req.user.userId;

	console.log(req.user.userId + "IS THE USER ID FROM THE LOADING FILE");
	getSaveByID = 'SELECT `saveFile` FROM `saveData` WHERE `userID` = ?;',
	error = false;
	//var id = user.toString();
	var saveFile = false;
	db.query(getSaveByID, [user], function(err, result) 
	{		
		if(err) 
		{
			var error = err.toString();
			next(error, result);
		}
		else if (!result[0]) 
		{
			error = "No Results";
			next(error, result)
		}
		else 
		{
			saveFile = result[0].saveFile;
			next(err, saveFile);
		}
	});
}