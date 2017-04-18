module.exports = function(req, data, next)
{
    var db = req.db;
    var saveTest = 'INSERT INTO videoLog (userId, startTime,endTime,totalTime, videoId) VALUES (?,?,?,?,?)'; 
    
    error = false;
    
    db.query(saveTest, [data.userId, data.startTime, data.endTime, data.timeSpent, data.videoID] ,function(err, result) 
    {
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