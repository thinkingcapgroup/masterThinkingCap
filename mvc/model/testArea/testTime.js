module.exports = function(req, data, next)
{
    var db = req.db;
    var saveTest = 'INSERT INTO testTime (userId, startTime,endTime,totalTime, testId,correctTotal) VALUES (?,?,?,?,?,?)'; 
    
    error = false;
    
    db.query(saveTest, [data.userId, data.startTime, data.endTime, data.timeSpent, data.testId, data.correctTotal] ,function(err, result) 
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