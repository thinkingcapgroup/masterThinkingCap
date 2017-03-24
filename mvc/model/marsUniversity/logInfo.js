module.exports = function(req, data, next){
  		
		var db = req.db;
		var SavetoLog = 'INSERT INTO logFiles (id,username,type,action,date,gameSession) VALUES (?,?,?,?,?,?)'; 
		
		error = false;
		
		db.query(SavetoLog, [data.userID,data.username,data.action,data.description, data.date, data.gameSession] ,function(err, result) {
		if (err) {
		error = err.toString();
			next(err, result)
		}
		else 
		{
			next(err, result);
		}
  });
}