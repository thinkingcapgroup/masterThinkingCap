module.exports = function(req, data, next)
{
    var db = req.db;
    var saveTest = 'INSERT INTO testTime (userId, startTime,endTime,totalTime, testId,correctTotal,consent) VALUES (?,?,?,?,?,?,?)'; 
    
    console.log('Log working')
    error = false;
    
    db.query(saveTest, [data.userId, data.startTime, data.endTime, data.timeSpent, data.testId, data.correctTotal, data.consent] ,function(err, result) 
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