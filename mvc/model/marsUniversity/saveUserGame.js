module.exports = function(req, data, next){
  		
		var db = req.db;
		var user = req.user.id;
		var SavetoID = 'SELECT userId FROM saveData Where userId = ?'; 
		

		
		error = false;
		
		db.query(SavetoID, [user] ,function(err, result) {
		if (err) {
		error = err.toString();
			next(err, result)
		}
		else 
		{
			if(result.length >0)
			{
				var id = user.toString();
				if(id == result[0].userId)
				{
					updateSave = 'UPDATE saveData SET saveFile=? WHERE userID=?;';
						db.query(updateSave, [data, user], function(err, result) 
						{
							if (err) 
							{
								error = err.toString();
								next(err, result)
							}
							else 
							{
								next(err, result);
							}
						});
				}
			}
			else
			{
				createUserSave = 'INSERT INTO saveData (userId,saveFile) VALUES (?,?);';
				db.query(createUserSave, [user, data], function(err, result) 
				{
					if (err) 
					{
						error = err.toString();
						next(err, result)
					}
					else 
					{
						next(err, result);
					}
				});
			}
				
		}
  });
}